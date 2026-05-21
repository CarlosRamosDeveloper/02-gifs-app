import { describe, expect, test } from 'vitest';

import AxiosMockAdapter from 'axios-mock-adapter';

import { getGifsByQuery } from '../../../src/gifs/actions/get-gifs-by-query.action';
import { giphyApi } from '../../../src/gifs/api/Giphy.api';
import { giphyResponseDataMock } from '../../mocks/giphy.response.data';

describe('Get gifs by query', () => {
  const mock = new AxiosMockAdapter(giphyApi);

  test('should return a list of gifs', async () => {
    mock.onGet('/search').reply(200, giphyResponseDataMock);
    const gifs = await getGifsByQuery('Golden sun');

    expect(gifs.length).toBe(10);

    gifs.forEach((gif) => {
      expect(typeof gif.id).toBe('string');
      expect(typeof gif.title).toBe('string');
      expect(typeof gif.url).toBe('string');
      expect(typeof gif.height).toBe('number');
      expect(typeof gif.width).toBe('number');
    });
  });
});
