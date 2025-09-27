import {
    IDataObject,
    IExecuteFunctions,
    INodeType,
    INodeTypeDescription,
    NodeOperationError,
} from 'n8n-workflow';

import { twitchApiRequest } from './GenericFunctions';

export class Twitch implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Twitch',
        name: 'twitch',
        icon: 'file:twitch.svg',
        group: ['transform'],
        version: 1,
        description: 'Interact with Twitch',
        defaults: {
            name: 'Twitch',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'twitchApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                default: 'getChannelStreams',
                options: [
                    {
                        name: 'Analytics - Get Extension Analytics',
                        value: 'getExtensionAnalytics',
                        action: 'Get extension analytics',
                    },
                    {
                        name: 'Analytics - Get Game Analytics',
                        value: 'getGameAnalytics',
                        action: 'Get game analytics',
                    },
                    {
                        name: 'Bits - Get Bits Leaderboard',
                        value: 'getBitsLeaderboard',
                        action: 'Get bits leaderboard',
                    },
                    {
                        name: 'Bits - Get Cheermotes',
                        value: 'getCheermotes',
                        action: 'Get cheermotes',
                    },
                    {
                        name: 'Bits - Get Extension Transactions',
                        value: 'getExtensionTransactions',
                        action: 'Get extension transactions',
                    },
                    {
                        name: 'Users - Block User',
                        value: 'blockUser',
                        action: 'Block user',
                    },
                    {
                        name: 'Chat - Get Channel Chat Badges',
                        value: 'getChannelChatBadges',
                        action: 'Get channel chat badges',
                    },
                    {
                        name: 'Chat - Get Channel Emotes',
                        value: 'getChannelEmotes',
                        action: 'Get channel emotes',
                    },
                    {
                        name: 'Chat - Get Chat Settings',
                        value: 'getChatSettings',
                        action: 'Get chat settings',
                    },
                    {
                        name: 'Chat - Get Chatters',
                        value: 'getChatters',
                        action: 'Get chatters',
                    },
                    {
                        name: 'Chat - Get Emote Sets',
                        value: 'getEmoteSets',
                        action: 'Get emote sets',
                    },
                    {
                        name: 'Chat - Get Global Chat Badges',
                        value: 'getGlobalChatBadges',
                        action: 'Get global chat badges',
                    },
                    {
                        name: 'Chat - Get Global Emotes',
                        value: 'getGlobalEmotes',
                        action: 'Get global emotes',
                    },
                    {
                        name: 'Chat - Get User Chat Color',
                        value: 'getUserChatColor',
                        action: 'Get user chat color',
                    },
                    {
                        name: 'Chat - Send Chat Announcement',
                        value: 'sendChatAnnouncement',
                        action: 'Send chat announcement',
                    },
                    {
                        name: 'Chat - Update Chat Settings',
                        value: 'updateChatSettings',
                        action: 'Update chat settings',
                    },
                    {
                        name: 'Chat - Update User Chat Color',
                        value: 'updateUserChatColor',
                        action: 'Update user chat color',
                    },
                    {
                        name: 'Clips - Create Clip',
                        value: 'createClip',
                        action: 'Create clip',
                    },
                    {
                        name: 'Clips - Get Clips',
                        value: 'getClips',
                        action: 'Get clips',
                    },
                    {
                        name: 'Games - Get Game Details',
                        value: 'getGameDetails',
                        action: 'Get game details',
                    },
                    {
                        name: 'Games - Get Top Games',
                        value: 'getTopGames',
                        action: 'Get top games',
                    },
                    {
                        name: 'Games - Search Categories',
                        value: 'searchCategories',
                        action: 'Search categories',
                    },
                    {
                        name: 'Users - Get User Active Extensions',
                        value: 'getUserActiveExtensions',
                        action: 'Get user active extensions',
                    },
                    {
                        name: 'Users - Get User Block List',
                        value: 'getUserBlockList',
                        action: 'Get user block list',
                    },
                    {
                        name: 'Users - Get User Extensions',
                        value: 'getUserExtensions',
                        action: 'Get user extensions',
                    },
                    {
                        name: 'Users - Get Users',
                        value: 'getUsers',
                        action: 'Get users',
                    },
                    {
                        name: 'Users - Get Users Follows',
                        value: 'getUsersFollows',
                        action: 'Get users follows',
                    },
                    {
                        name: 'Schedule - Create Channel Stream Schedule Segment',
                        value: 'createChannelStreamScheduleSegment',
                        action: 'Create channel stream schedule segment',
                    },
                    {
                        name: 'Schedule - Delete Channel Stream Schedule Segment',
                        value: 'deleteChannelStreamScheduleSegment',
                        action: 'Delete channel stream schedule segment',
                    },
                    {
                        name: 'Schedule - Get Channel Stream Schedule',
                        value: 'getChannelStreamSchedule',
                        action: 'Get channel stream schedule',
                    },
                    {
                        name: 'Schedule - Update Channel Stream Schedule',
                        value: 'updateChannelStreamSchedule',
                        action: 'Update channel stream schedule',
                    },
                    {
                        name: 'Schedule - Update Channel Stream Schedule Segment',
                        value: 'updateChannelStreamScheduleSegment',
                        action: 'Update channel stream schedule segment',
                    },
                    {
                        name: 'Streams - Create Stream Marker',
                        value: 'createStreamMarker',
                        action: 'Create stream marker',
                    },
                    {
                        name: 'Streams - Get Channel Streams',
                        value: 'getChannelStreams',
                        action: 'Get channel streams',
                    },
                    {
                        name: 'Streams - Get Followed Streams',
                        value: 'getFollowedStreams',
                        action: 'Get followed streams',
                    },
                    {
                        name: 'Streams - Get Stream Markers',
                        value: 'getStreamMarkers',
                        action: 'Get stream markers',
                    },
                    {
                        name: 'Streams - Get Streams',
                        value: 'getStreams',
                        action: 'Get streams',
                    },
                    {
                        name: 'Streams - Search Channels',
                        value: 'searchChannels',
                        action: 'Search channels',
                    },
                    {
                        name: 'Users - Unblock User',
                        value: 'unblockUser',
                        action: 'Unblock user',
                    },
                    {
                        name: 'Users - Update User',
                        value: 'updateUser',
                        action: 'Update user',
                    },
                    {
                        name: 'Users - Update User Extensions',
                        value: 'updateUserExtensions',
                        action: 'Update user extensions',
                    },
                ],
            },
            {
                displayName: 'Broadcaster ID',
                name: 'broadcaster_id',
                type: 'string',
                required: true,
                default: '',
                description: 'The ID of the broadcaster whose schedule you want to get',
                displayOptions: {
                    show: {
                        operation: ['getChannelStreamSchedule', 'updateChannelStreamSchedule', 'createChannelStreamScheduleSegment', 'updateChannelStreamScheduleSegment', 'deleteChannelStreamScheduleSegment'],
                    },
                },
            },
            {
                displayName: 'User ID',
                name: 'user_id',
                type: 'string',

                default: '',
                description: 'A user ID used to filter the list of streams',
                displayOptions: {
                    show: {
                        operation: ['getStreams'],
                    },
                },
            },
            {
                displayName: 'User Login',
                name: 'user_login',
                type: 'string',

                default: '',
                description: 'A user login name used to filter the list of streams',
                displayOptions: {
                    show: {
                        operation: ['getStreams'],
                    },
                },
            },
            {
                displayName: 'Game ID',
                name: 'game_id',
                type: 'string',

                default: '',
                description: 'A game ID used to filter the list of streams',
                displayOptions: {
                    show: {
                        operation: ['getStreams'],
                    },
                },
            },
            {
                displayName: 'Language',
                name: 'language',
                type: 'string',

                default: '',
                description: 'A language code used to filter the list of streams',
                displayOptions: {
                    show: {
                        operation: ['getStreams'],
                    },
                },
            },
            {
                displayName: 'Type',
                name: 'type',
                type: 'options',

                default: 'all',
                options: [
                    {
                        name: 'All',
                        value: 'all',
                    },
                    {
                        name: 'Live',
                        value: 'live',
                    },
                ],
                description: 'The type of stream to filter by',
                displayOptions: {
                    show: {
                        operation: ['getStreams'],
                    },
                },
            },
            {
                displayName: 'First',
                name: 'first',
                type: 'number',
                typeOptions: { minValue: 1, maxValue: 100 },

                default: 20,
                description: 'The maximum number of items to return per page',
                displayOptions: {
                    show: {
                        operation: ['getStreams', 'getFollowedStreams'],
                    },
                },
            },
            {
                displayName: 'After',
                name: 'after',
                type: 'string',

                default: '',
                description: 'The cursor used to get the next page of results',
                displayOptions: {
                    show: {
                        operation: ['getStreams', 'getFollowedStreams'],
                    },
                },
            },
            {
                displayName: 'Before',
                name: 'before',
                type: 'string',

                default: '',
                description: 'The cursor used to get the previous page of results',
                displayOptions: {
                    show: {
                        operation: ['getStreams', 'getFollowedStreams'],
                    },
                },
            },
            {
                displayName: 'Broadcaster ID',
                name: 'broadcaster_id_marker',
                type: 'string',
                required: true,
                default: '',
                description: 'The ID of the broadcaster whose stream you want to mark',
                displayOptions: {
                    show: {
                        operation: ['createStreamMarker'],
                    },
                },
            },
            {
                displayName: 'Description',
                name: 'description',
                type: 'string',

                default: '',
                description: 'A short description of the marker to help the user identify it',
                displayOptions: {
                    show: {
                        operation: ['createStreamMarker'],
                    },
                },
            },
            {
                displayName: 'User ID',
                name: 'user_id_marker',
                type: 'string',
                required: true,
                default: '',
                description: 'The ID of the user whose stream markers you want to get',
                displayOptions: {
                    show: {
                        operation: ['getStreamMarkers'],
                    },
                },
            },
            {
                displayName: 'Video ID',
                name: 'video_id',
                type: 'string',

                default: '',
                description: 'A video ID used to filter the list of markers',
                displayOptions: {
                    show: {
                        operation: ['getStreamMarkers'],
                    },
                },
            },
            {
                displayName: 'Extension ID',
                name: 'extension_id',
                type: 'string',
                required: true,
                default: '',
                description: 'The extension ID to get analytics for',
                displayOptions: {
                    show: {
                        operation: ['getExtensionAnalytics'],
                    },
                },
            },
            {
                displayName: 'Started At',
                name: 'started_at',
                type: 'dateTime',
                required: true,
                default: '',
                description: 'The start date for the analytics report (ISO 8601 format)',
                displayOptions: {
                    show: {
                        operation: ['getExtensionAnalytics', 'getGameAnalytics'],
                    },
                },
            },
            {
                displayName: 'Ended At',
                name: 'ended_at',
                type: 'dateTime',
                required: true,
                default: '',
                description: 'The end date for the analytics report (ISO 8601 format)',
                displayOptions: {
                    show: {
                        operation: ['getExtensionAnalytics', 'getGameAnalytics'],
                    },
                },
            },
            {
                displayName: 'Type',
                name: 'type',
                type: 'options',
                required: true,
                default: 'overview_v2',
                options: [
                    {
                        name: 'Overview V2',
                        value: 'overview_v2',
                    },
                ],
                description: 'The type of analytics report to get',
                displayOptions: {
                    show: {
                        operation: ['getExtensionAnalytics'],
                    },
                },
            },
            {
                displayName: 'Game ID',
                name: 'game_id',
                type: 'string',
                required: true,
                default: '',
                description: 'The game ID to get analytics for',
                displayOptions: {
                    show: {
                        operation: ['getGameAnalytics'],
                    },
                },
            },
            {
                displayName: 'First',
                name: 'first_analytics',
                type: 'number',
                typeOptions: { minValue: 1, maxValue: 100 },

                default: 20,
                description: 'The maximum number of items to return per page',
                displayOptions: {
                    show: {
                        operation: ['getExtensionAnalytics', 'getGameAnalytics'],
                    },
                },
            },
            {
                displayName: 'After',
                name: 'after_analytics',
                type: 'string',

                default: '',
                description: 'The cursor used to get the next page of results',
                displayOptions: {
                    show: {
                        operation: ['getExtensionAnalytics', 'getGameAnalytics'],
                    },
                },
            },
            {
                displayName: 'Broadcaster ID',
                name: 'broadcaster_id_bits',
                type: 'string',
                required: true,
                default: '',
                description: 'The ID of the broadcaster whose leaderboard you want to get',
                displayOptions: {
                    show: {
                        operation: ['getBitsLeaderboard'],
                    },
                },
            },
            {
                displayName: 'Count',
                name: 'count',
                type: 'number',
                typeOptions: { minValue: 1, maxValue: 100 },

                default: 10,
                description: 'The number of results to be returned',
                displayOptions: {
                    show: {
                        operation: ['getBitsLeaderboard'],
                    },
                },
            },
            {
                displayName: 'Period',
                name: 'period',
                type: 'options',

                default: 'all',
                options: [
                    {
                        name: 'All',
                        value: 'all',
                    },
                    {
                        name: 'Day',
                        value: 'day',
                    },
                    {
                        name: 'Month',
                        value: 'month',
                    },
                    {
                        name: 'Week',
                        value: 'week',
                    },
                    {
                        name: 'Year',
                        value: 'year',
                    },
                ],
                description: 'The time period over which data is aggregated',
                displayOptions: {
                    show: {
                        operation: ['getBitsLeaderboard'],
                    },
                },
            },
            {
                displayName: 'Started At',
                name: 'started_at_bits',
                type: 'dateTime',

                default: '',
                description: 'The start date for the leaderboard (ISO 8601 format)',
                displayOptions: {
                    show: {
                        operation: ['getBitsLeaderboard'],
                    },
                },
            },
            {
                displayName: 'User ID',
                name: 'user_id_bits',
                type: 'string',

                default: '',
                description: 'The ID of the user whose rank you want to get',
                displayOptions: {
                    show: {
                        operation: ['getBitsLeaderboard'],
                    },
                },
            },
            {
                displayName: 'Broadcaster ID',
                name: 'broadcaster_id_cheermotes',
                type: 'string',

                default: '',
                description: 'The ID of the broadcaster whose Cheermotes you want to get',
                displayOptions: {
                    show: {
                        operation: ['getCheermotes'],
                    },
                },
            },
            {
                displayName: 'Extension ID',
                name: 'extension_id_transactions',
                type: 'string',
                required: true,
                default: '',
                description: 'The ID of the extension whose list of transactions you want to get',
                displayOptions: {
                    show: {
                        operation: ['getExtensionTransactions'],
                    },
                },
            },
            {
                displayName: 'ID',
                name: 'id',
                type: 'string',

                default: '',
                description: 'The ID of a specific transaction to look up',
                displayOptions: {
                    show: {
                        operation: ['getExtensionTransactions'],
                    },
                },
            },
            {
                displayName: 'First',
                name: 'first_bits',
                type: 'number',
                typeOptions: { minValue: 1, maxValue: 100 },

                default: 20,
                description: 'The maximum number of items to return per page',
                displayOptions: {
                    show: {
                        operation: ['getExtensionTransactions'],
                    },
                },
            },
            {
                displayName: 'After',
                name: 'after_bits',
                type: 'string',

                default: '',
                description: 'The cursor used to get the next page of results',
                displayOptions: {
                    show: {
                        operation: ['getExtensionTransactions'],
                    },
                },
            },
            {
                displayName: 'Broadcaster ID',
                name: 'broadcaster_id_chat',
                type: 'string',
                required: true,
                default: '',
                description: 'The ID of the broadcaster whose chat you want to get',
                displayOptions: {
                    show: {
                        operation: ['getChatters', 'getChatSettings', 'updateChatSettings', 'sendChatAnnouncement', 'getChannelEmotes', 'getChannelChatBadges'],
                    },
                },
            },
            {
                displayName: 'Moderator ID',
                name: 'moderator_id',
                type: 'string',
                required: true,
                default: '',
                description: 'The ID of the moderator or the broadcaster requesting information',
                displayOptions: {
                    show: {
                        operation: ['getChatters', 'getChatSettings', 'updateChatSettings', 'sendChatAnnouncement'],
                    },
                },
            },
            {
                displayName: 'First',
                name: 'first_chat',
                type: 'number',
                typeOptions: { minValue: 1, maxValue: 1000 },

                default: 100,
                description: 'The maximum number of items to return per page',
                displayOptions: {
                    show: {
                        operation: ['getChatters'],
                    },
                },
            },
            {
                displayName: 'After',
                name: 'after_chat',
                type: 'string',

                default: '',
                description: 'The cursor used to get the next page of results',
                displayOptions: {
                    show: {
                        operation: ['getChatters'],
                    },
                },
            },
            {
                displayName: 'Emote Mode',
                name: 'emote_mode',
                type: 'boolean',

                default: false,
                description: 'Whether emote-only mode is enabled',
                displayOptions: {
                    show: {
                        operation: ['updateChatSettings'],
                    },
                },
            },
            {
                displayName: 'Follower Mode',
                name: 'follower_mode',
                type: 'boolean',

                default: false,
                description: 'Whether follower-only mode is enabled',
                displayOptions: {
                    show: {
                        operation: ['updateChatSettings'],
                    },
                },
            },
            {
                displayName: 'Follower Mode Duration',
                name: 'follower_mode_duration',
                type: 'number',

                default: 0,
                description: 'The length of time, in minutes, that users must follow the broadcaster before being able to participate in the chat room',
                displayOptions: {
                    show: {
                        operation: ['updateChatSettings'],
                    },
                },
            },
            {
                displayName: 'Non Moderator Chat Delay',
                name: 'non_moderator_chat_delay',
                type: 'boolean',

                default: false,
                description: 'Whether non-moderator chat delay is enabled',
                displayOptions: {
                    show: {
                        operation: ['updateChatSettings'],
                    },
                },
            },
            {
                displayName: 'Non Moderator Chat Delay Duration',
                name: 'non_moderator_chat_delay_duration',
                type: 'number',

                default: 0,
                description: 'The amount of time, in seconds, that messages are delayed from appearing in chat',
                displayOptions: {
                    show: {
                        operation: ['updateChatSettings'],
                    },
                },
            },
            {
                displayName: 'Slow Mode',
                name: 'slow_mode',
                type: 'boolean',

                default: false,
                description: 'Whether slow mode is enabled',
                displayOptions: {
                    show: {
                        operation: ['updateChatSettings'],
                    },
                },
            },
            {
                displayName: 'Slow Mode Wait Time',
                name: 'slow_mode_wait_time',
                type: 'number',

                default: 0,
                description: 'The amount of time, in seconds, that users need to wait between sending messages',
                displayOptions: {
                    show: {
                        operation: ['updateChatSettings'],
                    },
                },
            },
            {
                displayName: 'Subscriber Mode',
                name: 'subscriber_mode',
                type: 'boolean',

                default: false,
                description: 'Whether subscriber-only mode is enabled',
                displayOptions: {
                    show: {
                        operation: ['updateChatSettings'],
                    },
                },
            },
            {
                displayName: 'Unique Chat Mode',
                name: 'unique_chat_mode',
                type: 'boolean',

                default: false,
                description: 'Whether unique chat mode is enabled',
                displayOptions: {
                    show: {
                        operation: ['updateChatSettings'],
                    },
                },
            },
            {
                displayName: 'Message',
                name: 'message',
                type: 'string',
                required: true,
                default: '',
                description: 'The announcement to make in the broadcaster\'s chat room',
                displayOptions: {
                    show: {
                        operation: ['sendChatAnnouncement'],
                    },
                },
            },
            {
                displayName: 'Color',
                name: 'color',
                type: 'options',

                default: 'primary',
                options: [
                    {
                        name: 'Blue',
                        value: 'blue',
                    },
                    {
                        name: 'Green',
                        value: 'green',
                    },
                    {
                        name: 'Orange',
                        value: 'orange',
                    },
                    {
                        name: 'Primary',
                        value: 'primary',
                    },
                    {
                        name: 'Purple',
                        value: 'purple',
                    },
                ],
                description: 'The color used to highlight the announcement',
                displayOptions: {
                    show: {
                        operation: ['sendChatAnnouncement'],
                    },
                },
            },
            {
                displayName: 'User ID',
                name: 'user_id_chat',
                type: 'string',
                required: true,
                default: '',
                description: 'The ID of the user whose chat color you want to get or update',
                displayOptions: {
                    show: {
                        operation: ['getUserChatColor', 'updateUserChatColor'],
                    },
                },
            },
            {
                displayName: 'Chat Color',
                name: 'chat_color',
                type: 'options',
                required: true,
                default: 'blue',
                options: [
                    {
                        name: 'Blue',
                        value: 'blue',
                    },
                    {
                        name: 'Blue Violet',
                        value: 'blue_violet',
                    },
                    {
                        name: 'Cadet Blue',
                        value: 'cadet_blue',
                    },
                    {
                        name: 'Chocolate',
                        value: 'chocolate',
                    },
                    {
                        name: 'Coral',
                        value: 'coral',
                    },
                    {
                        name: 'Dodger Blue',
                        value: 'dodger_blue',
                    },
                    {
                        name: 'Firebrick',
                        value: 'firebrick',
                    },
                    {
                        name: 'Golden Rod',
                        value: 'golden_rod',
                    },
                    {
                        name: 'Green',
                        value: 'green',
                    },
                    {
                        name: 'Hot Pink',
                        value: 'hot_pink',
                    },
                    {
                        name: 'Orange Red',
                        value: 'orange_red',
                    },
                    {
                        name: 'Red',
                        value: 'red',
                    },
                    {
                        name: 'Sea Green',
                        value: 'sea_green',
                    },
                    {
                        name: 'Spring Green',
                        value: 'spring_green',
                    },
                    {
                        name: 'Yellow Green',
                        value: 'yellow_green',
                    },
                ],
                description: 'The color to use for the user\'s name in chat',
                displayOptions: {
                    show: {
                        operation: ['updateUserChatColor'],
                    },
                },
            },
            {
                displayName: 'Emote Set ID',
                name: 'emote_set_id',
                type: 'string',

                default: '',
                description: 'An emote set ID',
                displayOptions: {
                    show: {
                        operation: ['getEmoteSets'],
                    },
                },
            },
            {
                displayName: 'Broadcaster ID',
                name: 'broadcaster_id_clips',
                type: 'string',
                required: true,
                default: '',
                description: 'The ID of the broadcaster whose stream you want to clip',
                displayOptions: {
                    show: {
                        operation: ['createClip'],
                    },
                },
            },
            {
                displayName: 'Has Delay',
                name: 'has_delay',
                type: 'boolean',

                default: false,
                description: 'Whether the clip should be created with a delay',
                displayOptions: {
                    show: {
                        operation: ['createClip'],
                    },
                },
            },
            {
                displayName: 'Clip ID',
                name: 'clip_id',
                type: 'string',

                default: '',
                description: 'A clip ID',
                displayOptions: {
                    show: {
                        operation: ['getClips'],
                    },
                },
            },
            {
                displayName: 'Broadcaster ID',
                name: 'broadcaster_id_clips_get',
                type: 'string',

                default: '',
                description: 'The ID of the broadcaster whose clips you want to get',
                displayOptions: {
                    show: {
                        operation: ['getClips'],
                    },
                },
            },
            {
                displayName: 'Game ID',
                name: 'game_id_clips',
                type: 'string',

                default: '',
                description: 'A game ID',
                displayOptions: {
                    show: {
                        operation: ['getClips'],
                    },
                },
            },
            {
                displayName: 'Started At',
                name: 'started_at_clips',
                type: 'dateTime',

                default: '',
                description: 'The start date for the clips (ISO 8601 format)',
                displayOptions: {
                    show: {
                        operation: ['getClips'],
                    },
                },
            },
            {
                displayName: 'Ended At',
                name: 'ended_at_clips',
                type: 'dateTime',

                default: '',
                description: 'The end date for the clips (ISO 8601 format)',
                displayOptions: {
                    show: {
                        operation: ['getClips'],
                    },
                },
            },
            {
                displayName: 'First',
                name: 'first_clips',
                type: 'number',
                typeOptions: { minValue: 1, maxValue: 100 },

                default: 20,
                description: 'The maximum number of items to return per page',
                displayOptions: {
                    show: {
                        operation: ['getClips'],
                    },
                },
            },
            {
                displayName: 'After',
                name: 'after_clips',
                type: 'string',

                default: '',
                description: 'The cursor used to get the next page of results',
                displayOptions: {
                    show: {
                        operation: ['getClips'],
                    },
                },
            },
            {
                displayName: 'Before',
                name: 'before_clips',
                type: 'string',

                default: '',
                description: 'The cursor used to get the previous page of results',
                displayOptions: {
                    show: {
                        operation: ['getClips'],
                    },
                },
            },
            {
                displayName: 'User ID',
                name: 'user_id_users',
                type: 'string',

                default: '',
                description: 'User ID(s) to fetch',
                displayOptions: {
                    show: {
                        operation: ['getUsers'],
                    },
                },
            },
            {
                displayName: 'User Login',
                name: 'user_login_users',
                type: 'string',

                default: '',
                description: 'Username(s) to fetch',
                displayOptions: {
                    show: {
                        operation: ['getUsers'],
                    },
                },
            },
            {
                displayName: 'From User ID',
                name: 'from_user_id',
                type: 'string',

                default: '',
                description: 'User ID of the follower',
                displayOptions: {
                    show: {
                        operation: ['getUsersFollows'],
                    },
                },
            },
            {
                displayName: 'To User ID',
                name: 'to_user_id',
                type: 'string',

                default: '',
                description: 'User ID of the followed user',
                displayOptions: {
                    show: {
                        operation: ['getUsersFollows'],
                    },
                },
            },
            {
                displayName: 'First',
                name: 'first_users',
                type: 'number',
                typeOptions: { minValue: 1, maxValue: 100 },

                default: 20,
                description: 'The maximum number of items to return per page',
                displayOptions: {
                    show: {
                        operation: ['getUsersFollows'],
                    },
                },
            },
            {
                displayName: 'After',
                name: 'after_users',
                type: 'string',

                default: '',
                description: 'The cursor used to get the next page of results',
                displayOptions: {
                    show: {
                        operation: ['getUsersFollows'],
                    },
                },
            },
            {
                displayName: 'Description',
                name: 'description',
                type: 'string',
                required: true,
                default: '',
                description: 'New description for the user',
                displayOptions: {
                    show: {
                        operation: ['updateUser'],
                    },
                },
            },
            {
                displayName: 'First',
                name: 'first_blocks',
                type: 'number',
                typeOptions: { minValue: 1, maxValue: 100 },

                default: 20,
                description: 'The maximum number of items to return per page',
                displayOptions: {
                    show: {
                        operation: ['getUserBlockList'],
                    },
                },
            },
            {
                displayName: 'After',
                name: 'after_blocks',
                type: 'string',

                default: '',
                description: 'The cursor used to get the next page of results',
                displayOptions: {
                    show: {
                        operation: ['getUserBlockList'],
                    },
                },
            },
            {
                displayName: 'Target User ID',
                name: 'target_user_id',
                type: 'string',
                required: true,
                default: '',
                description: 'User ID of the user to block',
                displayOptions: {
                    show: {
                        operation: ['blockUser'],
                    },
                },
            },
            {
                displayName: 'Source Context',
                name: 'source_context',
                type: 'options',
                options: [
                    {
                        name: 'Chat',
                        value: 'chat',
                    },
                    {
                        name: 'Whisper',
                        value: 'whisper',
                    },
                ],

                default: 'chat',
                description: 'Source context for blocking the user',
                displayOptions: {
                    show: {
                        operation: ['blockUser'],
                    },
                },
            },
            {
                displayName: 'Reason',
                name: 'reason',
                type: 'options',
                options: [
                    {
                        name: 'Harassment',
                        value: 'harassment',
                    },
                    {
                        name: 'Spam',
                        value: 'spam',
                    },
                    {
                        name: 'Other',
                        value: 'other',
                    },
                ],

                default: 'other',
                description: 'Reason for blocking the user',
                displayOptions: {
                    show: {
                        operation: ['blockUser'],
                    },
                },
            },
            {
                displayName: 'Target User ID',
                name: 'target_user_id_unblock',
                type: 'string',
                required: true,
                default: '',
                description: 'User ID of the user to unblock',
                displayOptions: {
                    show: {
                        operation: ['unblockUser'],
                    },
                },
            },
            {
                displayName: 'Extension Type',
                name: 'extension_type',
                type: 'options',
                options: [
                    {
                        name: 'All',
                        value: '',
                    },
                    {
                        name: 'Component',
                        value: 'component',
                    },
                    {
                        name: 'Mobile',
                        value: 'mobile',
                    },
                    {
                        name: 'Panel',
                        value: 'panel',
                    },
                    {
                        name: 'Overlay',
                        value: 'overlay',
                    },
                ],

                default: '',
                description: 'Type of extension to retrieve',
                displayOptions: {
                    show: {
                        operation: ['getUserExtensions'],
                    },
                },
            },
            {
                displayName: 'Extension Configuration',
                name: 'extension_config',
                type: 'json',
                required: true,
                default: '{}',
                description: 'Extension configuration data (JSON format)',
                displayOptions: {
                    show: {
                        operation: ['updateUserExtensions'],
                    },
                },
            },
            {
                displayName: 'Channel Name',
                name: 'channel_name',
                type: 'string',
                required: true,
                default: '',
                description: 'Name of the channel whose streams to retrieve',
                displayOptions: {
                    show: {
                        operation: ['getChannelStreams'],
                    },
                },
            },
            {
                displayName: 'Query',
                name: 'query',
                type: 'string',
                required: true,
                default: '',
                description: 'Search query',
                displayOptions: {
                    show: {
                        operation: ['searchChannels', 'searchCategories'],
                    },
                },
            },
            {
                displayName: 'Game Name',
                name: 'game_name',
                type: 'string',
                required: true,
                default: '',
                description: 'Name of the game',
                displayOptions: {
                    show: {
                        operation: ['getGameDetails'],
                    },
                },
            },
            {
                displayName: 'Limit',
                name: 'limit',
                type: 'number',
                typeOptions: { minValue: 1 },
                default: 50,
                description: 'Max number of results to return',
                displayOptions: {
                    show: {
                        operation: ['getTopGames'],
                    },
                },
            },
            {
                displayName: 'Start Time',
                name: 'start_time',
                type: 'dateTime',

                default: '',
                description: 'The start time of the segment (ISO 8601 format)',
                displayOptions: {
                    show: {
                        operation: ['createChannelStreamScheduleSegment', 'updateChannelStreamScheduleSegment'],
                    },
                },
            },
            {
                displayName: 'Duration',
                name: 'duration',
                type: 'string',
                required: true,
                default: '',
                description: 'The duration of the segment (ISO 8601 duration format, e.g., PT2H30M)',
                displayOptions: {
                    show: {
                        operation: ['createChannelStreamScheduleSegment', 'updateChannelStreamScheduleSegment'],
                    },
                },
            },
            {
                displayName: 'Category ID',
                name: 'category_id',
                type: 'string',

                default: '',
                description: 'The ID of the category/game for the segment',
                displayOptions: {
                    show: {
                        operation: ['createChannelStreamScheduleSegment', 'updateChannelStreamScheduleSegment'],
                    },
                },
            },
            {
                displayName: 'Title',
                name: 'title',
                type: 'string',

                default: '',
                description: 'The title of the segment',
                displayOptions: {
                    show: {
                        operation: ['createChannelStreamScheduleSegment', 'updateChannelStreamScheduleSegment'],
                    },
                },
            },
            {
                displayName: 'Is Recurring',
                name: 'is_recurring',
                type: 'boolean',

                default: false,
                description: 'Whether the segment is recurring',
                displayOptions: {
                    show: {
                        operation: ['createChannelStreamScheduleSegment', 'updateChannelStreamScheduleSegment'],
                    },
                },
            },
            {
                displayName: 'Timezone',
                name: 'timezone',
                type: 'string',

                default: 'UTC',
                description: 'The timezone for the schedule (IANA timezone format)',
                displayOptions: {
                    show: {
                        operation: ['updateChannelStreamSchedule'],
                    },
                },
            },
            {
                displayName: 'Is Vacation Enabled',
                name: 'is_vacation_enabled',
                type: 'boolean',

                default: false,
                description: 'Whether vacation mode is enabled',
                displayOptions: {
                    show: {
                        operation: ['updateChannelStreamSchedule'],
                    },
                },
            },
            {
                displayName: 'Vacation Start Time',
                name: 'vacation_start_time',
                type: 'dateTime',

                default: '',
                description: 'The start time of the vacation (ISO 8601 format)',
                displayOptions: {
                    show: {
                        operation: ['updateChannelStreamSchedule'],
                    },
                },
            },
            {
                displayName: 'Vacation End Time',
                name: 'vacation_end_time',
                type: 'dateTime',

                default: '',
                description: 'The end time of the vacation (ISO 8601 format)',
                displayOptions: {
                    show: {
                        operation: ['updateChannelStreamSchedule'],
                    },
                },
            },
            {
                displayName: 'Segment ID',
                name: 'segment_id',
                type: 'string',
                required: true,
                default: '',
                description: 'The ID of the segment to update or delete',
                displayOptions: {
                    show: {
                        operation: ['updateChannelStreamScheduleSegment', 'deleteChannelStreamScheduleSegment'],
                    },
                },
            },
        ],
    };

    async execute(this: IExecuteFunctions) {
        const items = this.getInputData();
        const returnData: IDataObject[] = [];

        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter('operation', i) as string;

            if (operation === 'getChannelStreamSchedule') {
                const broadcasterId = this.getNodeParameter('broadcaster_id', i) as string;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/schedule',
                    {},
                    { broadcaster_id: broadcasterId },
                );

                if (response.data) {
                    returnData.push(response.data);
                }
            }

            if (operation === 'updateChannelStreamSchedule') {
                const broadcasterId = this.getNodeParameter('broadcaster_id', i) as string;
                const timezone = this.getNodeParameter('timezone', i) as string;
                const isVacationEnabled = this.getNodeParameter('is_vacation_enabled', i) as boolean;
                const vacationStartTime = this.getNodeParameter('vacation_start_time', i) as string;
                const vacationEndTime = this.getNodeParameter('vacation_end_time', i) as string;

                const body: IDataObject = {};
                if (timezone) body.timezone = timezone;
                if (isVacationEnabled !== undefined) body.is_vacation_enabled = isVacationEnabled;
                if (vacationStartTime) body.vacation_start_time = vacationStartTime;
                if (vacationEndTime) body.vacation_end_time = vacationEndTime;

                const response = await twitchApiRequest.call(
                    this,
                    'PATCH',
                    '/schedule/settings',
                    body,
                    { broadcaster_id: broadcasterId },
                );

                if (response.data) {
                    returnData.push(response.data);
                }
            }

            if (operation === 'createChannelStreamScheduleSegment') {
                const broadcasterId = this.getNodeParameter('broadcaster_id', i) as string;
                const startTime = this.getNodeParameter('start_time', i) as string;
                const duration = this.getNodeParameter('duration', i) as string;
                const categoryId = this.getNodeParameter('category_id', i) as string;
                const title = this.getNodeParameter('title', i) as string;
                const isRecurring = this.getNodeParameter('is_recurring', i) as boolean;

                const body: IDataObject = {
                    start_time: startTime,
                    duration: duration,
                };
                if (categoryId) body.category_id = categoryId;
                if (title) body.title = title;
                if (isRecurring !== undefined) body.is_recurring = isRecurring;

                const response = await twitchApiRequest.call(
                    this,
                    'POST',
                    '/schedule/segment',
                    body,
                    { broadcaster_id: broadcasterId },
                );

                if (response.data) {
                    returnData.push(response.data);
                }
            }

            if (operation === 'updateChannelStreamScheduleSegment') {
                const broadcasterId = this.getNodeParameter('broadcaster_id', i) as string;
                const segmentId = this.getNodeParameter('segment_id', i) as string;
                const startTime = this.getNodeParameter('start_time', i) as string;
                const duration = this.getNodeParameter('duration', i) as string;
                const categoryId = this.getNodeParameter('category_id', i) as string;
                const title = this.getNodeParameter('title', i) as string;
                const isRecurring = this.getNodeParameter('is_recurring', i) as boolean;

                const body: IDataObject = {};
                if (startTime) body.start_time = startTime;
                if (duration) body.duration = duration;
                if (categoryId) body.category_id = categoryId;
                if (title) body.title = title;
                if (isRecurring !== undefined) body.is_recurring = isRecurring;

                const response = await twitchApiRequest.call(
                    this,
                    'PATCH',
                    '/schedule/segment',
                    body,
                    { broadcaster_id: broadcasterId, id: segmentId },
                );

                if (response.data) {
                    returnData.push(response.data);
                }
            }

            if (operation === 'deleteChannelStreamScheduleSegment') {
                const broadcasterId = this.getNodeParameter('broadcaster_id', i) as string;
                const segmentId = this.getNodeParameter('segment_id', i) as string;

                const response = await twitchApiRequest.call(
                    this,
                    'DELETE',
                    '/schedule/segment',
                    {},
                    { broadcaster_id: broadcasterId, id: segmentId },
                );

                if (response.data) {
                    returnData.push(response.data);
                }
            }

            if (operation === 'getStreams') {
                const userId = this.getNodeParameter('user_id', i) as string;
                const userLogin = this.getNodeParameter('user_login', i) as string;
                const gameId = this.getNodeParameter('game_id', i) as string;
                const language = this.getNodeParameter('language', i) as string;
                const type = this.getNodeParameter('type', i) as string;
                const first = this.getNodeParameter('first', i) as number;
                const after = this.getNodeParameter('after', i) as string;
                const before = this.getNodeParameter('before', i) as string;

                const query: IDataObject = {};
                if (userId) query.user_id = userId;
                if (userLogin) query.user_login = userLogin;
                if (gameId) query.game_id = gameId;
                if (language) query.language = language;
                if (type) query.type = type;
                if (first) query.first = first;
                if (after) query.after = after;
                if (before) query.before = before;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/streams',
                    {},
                    query,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getFollowedStreams') {
                const first = this.getNodeParameter('first', i) as number;
                const after = this.getNodeParameter('after', i) as string;
                const before = this.getNodeParameter('before', i) as string;

                const query: IDataObject = {};
                if (first) query.first = first;
                if (after) query.after = after;
                if (before) query.before = before;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/streams/followed',
                    {},
                    query,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'createStreamMarker') {
                const broadcasterId = this.getNodeParameter('broadcaster_id_marker', i) as string;
                const description = this.getNodeParameter('description', i) as string;

                const body: IDataObject = {
                    user_id: broadcasterId,
                };
                if (description) body.description = description;

                const response = await twitchApiRequest.call(
                    this,
                    'POST',
                    '/streams/markers',
                    body,
                );

                if (response.data) {
                    returnData.push(response.data);
                }
            }

            if (operation === 'getStreamMarkers') {
                const userId = this.getNodeParameter('user_id_marker', i) as string;
                const videoId = this.getNodeParameter('video_id', i) as string;

                const query: IDataObject = {
                    user_id: userId,
                };
                if (videoId) query.video_id = videoId;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/streams/markers',
                    {},
                    query,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getExtensionAnalytics') {
                const extensionId = this.getNodeParameter('extension_id', i) as string;
                const startedAt = this.getNodeParameter('started_at', i) as string;
                const endedAt = this.getNodeParameter('ended_at', i) as string;
                const type = this.getNodeParameter('type', i) as string;
                const first = this.getNodeParameter('first_analytics', i) as number;
                const after = this.getNodeParameter('after_analytics', i) as string;

                const query: IDataObject = {
                    extension_id: extensionId,
                    started_at: startedAt,
                    ended_at: endedAt,
                    type: type,
                };
                if (first) query.first = first;
                if (after) query.after = after;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/analytics/extensions',
                    {},
                    query,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getGameAnalytics') {
                const gameId = this.getNodeParameter('game_id', i) as string;
                const startedAt = this.getNodeParameter('started_at', i) as string;
                const endedAt = this.getNodeParameter('ended_at', i) as string;
                const first = this.getNodeParameter('first_analytics', i) as number;
                const after = this.getNodeParameter('after_analytics', i) as string;

                const query: IDataObject = {
                    game_id: gameId,
                    started_at: startedAt,
                    ended_at: endedAt,
                };
                if (first) query.first = first;
                if (after) query.after = after;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/analytics/games',
                    {},
                    query,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getBitsLeaderboard') {
                const broadcasterId = this.getNodeParameter('broadcaster_id_bits', i) as string;
                const count = this.getNodeParameter('count', i) as number;
                const period = this.getNodeParameter('period', i) as string;
                const startedAt = this.getNodeParameter('started_at_bits', i) as string;
                const userId = this.getNodeParameter('user_id_bits', i) as string;

                const query: IDataObject = {
                    broadcaster_id: broadcasterId,
                };
                if (count) query.count = count;
                if (period) query.period = period;
                if (startedAt) query.started_at = startedAt;
                if (userId) query.user_id = userId;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/bits/leaderboard',
                    {},
                    query,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getCheermotes') {
                const broadcasterId = this.getNodeParameter('broadcaster_id_cheermotes', i) as string;

                const query: IDataObject = {};
                if (broadcasterId) query.broadcaster_id = broadcasterId;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/bits/cheermotes',
                    {},
                    query,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getExtensionTransactions') {
                const extensionId = this.getNodeParameter('extension_id_transactions', i) as string;
                const id = this.getNodeParameter('id', i) as string;
                const first = this.getNodeParameter('first_bits', i) as number;
                const after = this.getNodeParameter('after_bits', i) as string;

                const query: IDataObject = {
                    extension_id: extensionId,
                };
                if (id) query.id = id;
                if (first) query.first = first;
                if (after) query.after = after;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/extensions/transactions',
                    {},
                    query,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getChatters') {
                const broadcasterId = this.getNodeParameter('broadcaster_id_chat', i) as string;
                const moderatorId = this.getNodeParameter('moderator_id', i) as string;
                const first = this.getNodeParameter('first_chat', i) as number;
                const after = this.getNodeParameter('after_chat', i) as string;

                const query: IDataObject = {
                    broadcaster_id: broadcasterId,
                    moderator_id: moderatorId,
                };
                if (first) query.first = first;
                if (after) query.after = after;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/chat/chatters',
                    {},
                    query,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getChatSettings') {
                const broadcasterId = this.getNodeParameter('broadcaster_id_chat', i) as string;
                const moderatorId = this.getNodeParameter('moderator_id', i) as string;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/chat/settings',
                    {},
                    { broadcaster_id: broadcasterId, moderator_id: moderatorId },
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'updateChatSettings') {
                const broadcasterId = this.getNodeParameter('broadcaster_id_chat', i) as string;
                const moderatorId = this.getNodeParameter('moderator_id', i) as string;
                const emoteMode = this.getNodeParameter('emote_mode', i) as boolean;
                const followerMode = this.getNodeParameter('follower_mode', i) as boolean;
                const followerModeDuration = this.getNodeParameter('follower_mode_duration', i) as number;
                const nonModeratorChatDelay = this.getNodeParameter('non_moderator_chat_delay', i) as boolean;
                const nonModeratorChatDelayDuration = this.getNodeParameter('non_moderator_chat_delay_duration', i) as number;
                const slowMode = this.getNodeParameter('slow_mode', i) as boolean;
                const slowModeWaitTime = this.getNodeParameter('slow_mode_wait_time', i) as number;
                const subscriberMode = this.getNodeParameter('subscriber_mode', i) as boolean;
                const uniqueChatMode = this.getNodeParameter('unique_chat_mode', i) as boolean;

                const body: IDataObject = {};
                if (emoteMode !== undefined) body.emote_mode = emoteMode;
                if (followerMode !== undefined) body.follower_mode = followerMode;
                if (followerModeDuration !== undefined) body.follower_mode_duration = followerModeDuration;
                if (nonModeratorChatDelay !== undefined) body.non_moderator_chat_delay = nonModeratorChatDelay;
                if (nonModeratorChatDelayDuration !== undefined) body.non_moderator_chat_delay_duration = nonModeratorChatDelayDuration;
                if (slowMode !== undefined) body.slow_mode = slowMode;
                if (slowModeWaitTime !== undefined) body.slow_mode_wait_time = slowModeWaitTime;
                if (subscriberMode !== undefined) body.subscriber_mode = subscriberMode;
                if (uniqueChatMode !== undefined) body.unique_chat_mode = uniqueChatMode;

                const response = await twitchApiRequest.call(
                    this,
                    'PATCH',
                    '/chat/settings',
                    body,
                    { broadcaster_id: broadcasterId, moderator_id: moderatorId },
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'sendChatAnnouncement') {
                const broadcasterId = this.getNodeParameter('broadcaster_id_chat', i) as string;
                const moderatorId = this.getNodeParameter('moderator_id', i) as string;
                const message = this.getNodeParameter('message', i) as string;
                const color = this.getNodeParameter('color', i) as string;

                const body: IDataObject = {
                    message: message,
                };
                if (color) body.color = color;

                const response = await twitchApiRequest.call(
                    this,
                    'POST',
                    '/chat/announcements',
                    body,
                    { broadcaster_id: broadcasterId, moderator_id: moderatorId },
                );

                if (response.data) {
                    returnData.push(response.data);
                }
            }

            if (operation === 'getUserChatColor') {
                const userId = this.getNodeParameter('user_id_chat', i) as string;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/chat/color',
                    {},
                    { user_id: userId },
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'updateUserChatColor') {
                const userId = this.getNodeParameter('user_id_chat', i) as string;
                const chatColor = this.getNodeParameter('chat_color', i) as string;

                const response = await twitchApiRequest.call(
                    this,
                    'PUT',
                    '/chat/color',
                    {},
                    { user_id: userId, color: chatColor },
                );

                if (response.data) {
                    returnData.push(response.data);
                }
            }

            if (operation === 'getChannelEmotes') {
                const broadcasterId = this.getNodeParameter('broadcaster_id_chat', i) as string;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/chat/emotes',
                    {},
                    { broadcaster_id: broadcasterId },
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getGlobalEmotes') {
                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/chat/emotes/global',
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getEmoteSets') {
                const emoteSetId = this.getNodeParameter('emote_set_id', i) as string;

                const query: IDataObject = {};
                if (emoteSetId) query.emote_set_id = emoteSetId;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/chat/emotes/set',
                    {},
                    query,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getChannelChatBadges') {
                const broadcasterId = this.getNodeParameter('broadcaster_id_chat', i) as string;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/chat/badges',
                    {},
                    { broadcaster_id: broadcasterId },
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getGlobalChatBadges') {
                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/chat/badges/global',
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'createClip') {
                const broadcasterId = this.getNodeParameter('broadcaster_id_clips', i) as string;
                const hasDelay = this.getNodeParameter('has_delay', i) as boolean;

                const body: IDataObject = {
                    broadcaster_id: broadcasterId,
                };
                if (hasDelay !== undefined) body.has_delay = hasDelay;

                const response = await twitchApiRequest.call(
                    this,
                    'POST',
                    '/clips',
                    body,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getClips') {
                const clipId = this.getNodeParameter('clip_id', i) as string;
                const broadcasterId = this.getNodeParameter('broadcaster_id_clips_get', i) as string;
                const gameId = this.getNodeParameter('game_id_clips', i) as string;
                const startedAt = this.getNodeParameter('started_at_clips', i) as string;
                const endedAt = this.getNodeParameter('ended_at_clips', i) as string;
                const first = this.getNodeParameter('first_clips', i) as number;
                const after = this.getNodeParameter('after_clips', i) as string;
                const before = this.getNodeParameter('before_clips', i) as string;

                const query: IDataObject = {};
                if (clipId) query.id = clipId;
                if (broadcasterId) query.broadcaster_id = broadcasterId;
                if (gameId) query.game_id = gameId;
                if (startedAt) query.started_at = startedAt;
                if (endedAt) query.ended_at = endedAt;
                if (first) query.first = first;
                if (after) query.after = after;
                if (before) query.before = before;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/clips',
                    {},
                    query,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getUsers') {
                const userId = this.getNodeParameter('user_id_users', i) as string;
                const userLogin = this.getNodeParameter('user_login_users', i) as string;

                const query: IDataObject = {};
                if (userId) query.id = userId;
                if (userLogin) query.login = userLogin;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/users',
                    {},
                    query,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getUsersFollows') {
                const fromUserId = this.getNodeParameter('from_user_id', i) as string;
                const toUserId = this.getNodeParameter('to_user_id', i) as string;
                const first = this.getNodeParameter('first_users', i) as number;
                const after = this.getNodeParameter('after_users', i) as string;

                const query: IDataObject = {};
                if (fromUserId) query.from_id = fromUserId;
                if (toUserId) query.to_id = toUserId;
                if (first) query.first = first;
                if (after) query.after = after;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/users/follows',
                    {},
                    query,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'updateUser') {
                const description = this.getNodeParameter('description', i) as string;

                const body: IDataObject = {
                    description: description,
                };

                const response = await twitchApiRequest.call(
                    this,
                    'PUT',
                    '/users',
                    body,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getUserBlockList') {
                const first = this.getNodeParameter('first_blocks', i) as number;
                const after = this.getNodeParameter('after_blocks', i) as string;

                const query: IDataObject = {};
                if (first) query.first = first;
                if (after) query.after = after;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/users/blocks',
                    {},
                    query,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'blockUser') {
                const targetUserId = this.getNodeParameter('target_user_id', i) as string;
                const sourceContext = this.getNodeParameter('source_context', i) as string;
                const reason = this.getNodeParameter('reason', i) as string;

                const query: IDataObject = {
                    target_user_id: targetUserId,
                };
                if (sourceContext) query.source_context = sourceContext;
                if (reason) query.reason = reason;

                const response = await twitchApiRequest.call(
                    this,
                    'PUT',
                    '/users/blocks',
                    {},
                    query,
                );

                if (response.data) {
                    returnData.push(response.data);
                }
            }

            if (operation === 'unblockUser') {
                const targetUserId = this.getNodeParameter('target_user_id_unblock', i) as string;

                const response = await twitchApiRequest.call(
                    this,
                    'DELETE',
                    '/users/blocks',
                    {},
                    { target_user_id: targetUserId },
                );

                if (response.data) {
                    returnData.push(response.data);
                }
            }

            if (operation === 'getUserExtensions') {
                const extensionType = this.getNodeParameter('extension_type', i) as string;

                const query: IDataObject = {};
                if (extensionType) query.extension_type = extensionType;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/users/extensions',
                    {},
                    query,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getUserActiveExtensions') {
                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/users/extensions',
                    {},
                );

                if (response.data) {
                    returnData.push(response.data);
                }
            }

            if (operation === 'updateUserExtensions') {
                const extensionConfig = this.getNodeParameter('extension_config', i) as string;

                let configData: IDataObject;
                try {
                    configData = JSON.parse(extensionConfig);
                } catch (error) {
                    throw new NodeOperationError(this.getNode(), 'Invalid JSON in extension configuration');
                }

                const response = await twitchApiRequest.call(
                    this,
                    'PUT',
                    '/users/extensions',
                    configData,
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getChannelStreams') {
                const channelName = this.getNodeParameter('channel_name', i) as string;

                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/streams',
                    {},
                    { user_login: channelName },
                );

                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'searchChannels') {
                const query = this.getNodeParameter('query', i) as string;
                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/search/channels',
                    {},
                    { query },
                );
                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'searchCategories') {
                const query = this.getNodeParameter('query', i) as string;
                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/search/categories',
                    {},
                    { query },
                );
                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getGameDetails') {
                const gameName = this.getNodeParameter('game_name', i) as string;
                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/games',
                    {},
                    { name: gameName },
                );
                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }

            if (operation === 'getTopGames') {
                const limit = this.getNodeParameter('limit', i) as number;
                const response = await twitchApiRequest.call(
                    this,
                    'GET',
                    '/games/top',
                    {},
                    { first: limit },
                );
                if (Array.isArray(response.data)) {
                    returnData.push(...response.data);
                }
            }
        }

        return [this.helpers.returnJsonArray(returnData)];
    }
}
