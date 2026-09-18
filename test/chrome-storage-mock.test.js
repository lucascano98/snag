import {store, get, set} from './mocks/chrome-storage-mock.js'

describe('chrome.storage.sync.get() - Issue #0 Regression Test', () => {
    beforeEach(() => {
        Object.keys(store).forEach(key => delete store[key]);
    });

    test('should return an empty object {} when keys is an empty array []', async () => {
        Object.assign(store, {
            blacklist: ['facebook.com', 'youtube.com', 'reddit.com'],
            timeframe: {
                start: '09:00',
                end: '17:00'
            }
        });

        const result = await get([]);

        expect(result).toEqual({});
        expect(Object.keys(result).length).toBe(0);

        expect(result.blacklist).toBeUndefined();
        expect(result.timeframe).toBeUndefined();
    });

    test('get(string) - single key exists vs missing key', async () => {
        Object.assign(store, {
            blacklist: ['facebook.com', 'youtube.com'],
            timeframe: {
                start: '09:00',
                end: '17:00'
            }
        });

        const blacklistResult = await get('blacklist');
        expect(blacklistResult).toEqual({
            blacklist: ['facebook.com', 'youtube.com']
        });

        const missingResult = await get('activeDays');
        expect(missingResult).toEqual({});
    });

    test('get(array) - multiple keys including a missing key', async() => {
        Object.assign(store, {
            blacklist: ['reddit.com', 'twitter.com'],
            timeframe: {start: '08:00', end: '16:00'}
        });

        const result = await get(['blacklist', 'timeframe', 'allowlist']);

        expect(result).toEqual({
            blacklist: ['reddit.com', 'twitter.com'],
            timeframe: {start: '08:00', end: '16:00'}
        });
        expect(result).not.toHaveProperty('allowlist');
    });

    test('get(object) - object defaults with fallback and override', async() => {
        Object.assign(store, {
            timeframe: {start: '10:00', end: '18:00'}
        });

        const defaultSettings = {
            blacklist: ['instagram.com', 'tiktok.com'], //default site list
            timeframe: {start: '09:00', end: '17:00'} //default active hours
        };

        const result = await get(defaultSettings);

        expect(result).toEqual({
            blacklist: ['instagram.com', 'tiktok.com'], //falls back to default
            timeframe: {start: '10:00', end: '18:00'} //overridden by store
        });
    });

    test('get(null) and get() - returns full store', async() => {
        const fullConfig = {
            blacklist: ['twitch.tv', 'netflix.com'],
            timeframe: {start: '22:00', end: '06:00'}
        };
        Object.assign(store, fullConfig);

        const nullResult = await get(null);
        expect(nullResult).toEqual(fullConfig);

        const undefinedResult = await get();
        expect(undefinedResult).toEqual(fullConfig);
    });

    test('set() - shallow merge retains sibling keys', async() => {
        Object.assign(store, {
            blacklist: ['facebook.com'],
            timeframe: {start: '09:00', end: '17:00'}
        });

        //update the timeframe without passing the blacklist key
        await set({
            timeframe: {start: '10:00'}
        });

        expect(store).toEqual({
            blacklist: ['facebook.com'], //untouched sibling key
            timeframe: {start: '10:00'} //updated timeframe
        });
    });
});