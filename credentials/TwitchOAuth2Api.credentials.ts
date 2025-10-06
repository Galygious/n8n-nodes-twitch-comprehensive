import {
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class TwitchOAuth2Api implements ICredentialType {
    name = 'twitchOAuth2Api';
    displayName = 'Twitch OAuth2 API';
    documentationUrl = 'https://dev.twitch.tv/docs/authentication/';
    extends = ['oAuth2Api'];
    properties: INodeProperties[] = [
        {
            displayName: 'Scope',
            name: 'scope',
            type: 'string',
            default: '',
            description: 'Space-separated scopes to request for the user access token',
        },
        {
            displayName: 'Auth URL',
            name: 'authUrl',
            type: 'hidden',
            default: 'https://id.twitch.tv/oauth2/authorize',
        },
        {
            displayName: 'Access Token URL',
            name: 'accessTokenUrl',
            type: 'hidden',
            default: 'https://id.twitch.tv/oauth2/token',
        },
        {
            displayName: 'Authentication',
            name: 'authentication',
            type: 'hidden',
            default: 'header',
        },
    ];
}


