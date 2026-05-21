import { describe, expect, test, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useGifs } from '@/gifs/hooks/useGifs';
import * as gifActions from '@/gifs/actions/get-gifs-by-query.action';

describe('useGifs', () => {
  test('should return default values and methods', () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifList.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermClicked).toBeDefined();
  });

  test('should return a list of gifs', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch('Golden Sun');
    });

    expect(result.current.gifList.length).toBe(5);
  });

  test('should return a list of gifs when handleTermClicked is called', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked('Golden Sun');
    });

    expect(result.current.gifList.length).toBe(5);
  });

  test('should return a list of gifs from cache', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked('Golden Sun');
    });

    await act(async () => {
      await result.current.handleTermClicked('Golden Sun');
    });

    vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(
      new Error('Test Error'),
    );

    expect(result.current.gifList.length).toBe(5);
  });

  test('should return no more than 7 previous terms', async () => {
    const testArray = ['9', '8', '7', '6', '5', '4', '3'];
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);
    await act(async () => {
      await result.current.handleSearch('0');
    });
    await act(async () => {
      await result.current.handleSearch('1');
    });
    await act(async () => {
      await result.current.handleSearch('2');
    });
    await act(async () => {
      await result.current.handleSearch('3');
    });
    await act(async () => {
      await result.current.handleSearch('4');
    });
    await act(async () => {
      await result.current.handleSearch('5');
    });
    await act(async () => {
      await result.current.handleSearch('6');
    });
    await act(async () => {
      await result.current.handleSearch('7');
    });
    await act(async () => {
      await result.current.handleSearch('8');
    });
    await act(async () => {
      await result.current.handleSearch('9');
    });

    expect(result.current.previousTerms.length).toBe(7);
    expect(result.current.previousTerms).toStrictEqual(testArray);
  });
});
