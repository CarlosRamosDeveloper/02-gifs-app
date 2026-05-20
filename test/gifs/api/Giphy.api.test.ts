import { describe, expect, test } from 'vitest';

import { giphyApi } from '../../../src/gifs/api/Giphy.api'

describe('GiphyApi', () => {
  test('should be configured correctly', () => {
    const testUrl = "https://api.giphy.com/v1/gifs"
    const testLang = "en"
    const apikey = import.meta.env.VITE_GYPHY_API_KEY

    expect(giphyApi.defaults.baseURL).toBe(testUrl)
    expect(giphyApi.defaults.params.lang).toBe(testLang)
    expect(giphyApi.defaults.params.api_key).toBe(apikey)
  });
});
