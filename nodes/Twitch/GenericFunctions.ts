import {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	IWebhookFunctions
} from 'n8n-workflow';

export async function twitchApiRequest(
	this:
		| IExecuteFunctions
		| IWebhookFunctions
		| IHookFunctions
		| ILoadOptionsFunctions,
	method: string,
	resource: string,
	body: any = {},
	query: IDataObject = {},
	option: IDataObject = {},
): Promise<any> {
	// tslint:disable-line:no-any

	// Determine authentication mode: 'app' (client credentials) or 'user' (OAuth2)
	let authMode: 'app' | 'user' = 'app';
	const endpoint = 'https://api.twitch.tv/helix';

	// Allow explicit override via option.authMode
	if (option && typeof option === 'object' && (option as IDataObject).authMode) {
		const override = (option as IDataObject).authMode as string;
		if (override === 'app' || override === 'user') {
			authMode = override;
		}
	} else {
		// Try to read node parameter when available
		try {
			const selected = (this as unknown as { getNodeParameter?: (name: string, index?: number) => unknown }).getNodeParameter?.('authentication', 0) as string | undefined;
			if (selected === 'user' || selected === 'app') authMode = selected;
		} catch {}
	}

	if (authMode === 'user') {
		// Use OAuth2 user token via n8n's requestWithAuthentication
		const oauthCreds = (await this.getCredentials('twitchOAuth2Api')) as IDataObject;
		const clientId = oauthCreds.clientId as string;
		const options: IHttpRequestOptions = {
			headers: {
				'Content-Type': 'application/json',
				'Client-Id': clientId,
			},
			method: method as IHttpRequestMethods,
			body,
			qs: query,
			url: `${endpoint}${resource}`,
			json: true,
		};
		if (!Object.keys(body).length) {
			delete (options as IHttpRequestOptions).body;
		}
		if (!Object.keys(query).length) {
			delete (options as IHttpRequestOptions).qs;
		}
		try {
			// This injects Authorization: Bearer <user token> and handles refresh
			return await (this as unknown as { helpers: { requestWithAuthentication: (name: string, options: IHttpRequestOptions) => Promise<any> } }).helpers.requestWithAuthentication('twitchOAuth2Api', options);
		} catch (errorObject: any) {
			if (errorObject.error) {
				const errorMessage = errorObject.error.message;
				throw new Error(
					`Twitch API (user) error response [${errorObject.error.status}]: ${errorMessage}`,
				);
			}
			throw errorObject;
		}
	}

	// Default: app access token (client credentials)
	const credentials = (await this.getCredentials('twitchApi')) as IDataObject;
	const clientId = credentials.clientId as string;
	const clientSecret = credentials.clientSecret as string;

	const optionsForAppToken: IHttpRequestOptions = {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
		qs: {
			client_id: clientId,
			client_secret: clientSecret,
			grant_type: 'client_credentials',
		},
		url: 'https://id.twitch.tv/oauth2/token',
		json: true,
	};

	let appTokenResponse = null;

	try {
		appTokenResponse = await this.helpers.httpRequest(optionsForAppToken);
	} catch (errorObject: any) {
		if (errorObject.error) {
			const errorMessage = errorObject.error.message;
			throw new Error(
				`Twitch API App Token error response [${errorObject.error.status}]: ${errorMessage}`,
			);
		}
		throw errorObject;
	}

	const options: IHttpRequestOptions = {
		headers: {
			'Content-Type': 'application/json',
			'Client-Id': clientId,
			Authorization: 'Bearer ' + (appTokenResponse as IDataObject).access_token,
		},
		method: method as IHttpRequestMethods,
		body,
		qs: query,
		url: `${endpoint}${resource}`,
		json: true,
	};
	if (!Object.keys(body).length) {
		delete options.body;
	}
	if (!Object.keys(query).length) {
		delete options.qs;
	}

	try {
		return await this.helpers.httpRequest(options);
	} catch (errorObject: any) {
		if (errorObject.error) {
			const errorMessage = errorObject.error.message;
			throw new Error(
				`Twitch API error response [${errorObject.error.status}]: ${errorMessage}`,
			);
		}
		throw errorObject;
	}
}

export async function getChannels(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const returnData: INodePropertyOptions[] = [];
	const channels = await twitchApiRequest.call(this, 'GET', '/search/channels', {}, { query: this.getNodeParameter('userLogin', 0) as string});

	if (channels.data === undefined) {
		throw new Error('No channels found');
	}

	for (const channel of channels.data) {
		const channelName = channel.display_name;
		const channelId = channel.id;

		returnData.push({
			name: channelName,
			value: channelId,
		});
	}

	return returnData;
}
