import { beforeEach, describe, expect, test, vi } from 'vitest';

import AxiosMockAdapter from 'axios-mock-adapter';

import { getGifsByQuery } from '../../../src/gifs/actions/get-gifs-by-query.action';
import { giphyApi } from '../../../src/gifs/api/Giphy.api';
import { giphyResponseDataMock } from '../../mocks/giphy.response.data';

describe('Get gifs by query', () => {
  let mock = new AxiosMockAdapter(giphyApi);

  beforeEach(() => {
    mock = new AxiosMockAdapter(giphyApi);
  });

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

  test('should return an empty list of gifs if query is empty', async () => {
    mock.restore();
    const gifs = await getGifsByQuery('');

    expect(gifs.length).toBe(0);
  });

  test('should handle error when API returns error', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mock.onGet('/search').reply(400, {
      data: {
        message: 'Bad Request',
      },
    });

    const gifs = await getGifsByQuery('Golden sun');

    expect(gifs.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
  });
});
