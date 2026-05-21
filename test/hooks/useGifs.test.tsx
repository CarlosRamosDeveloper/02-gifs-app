import { describe, expect, test } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useGifs } from '../../src/gifs/hooks/useGifs';

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
});
