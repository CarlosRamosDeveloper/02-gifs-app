import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { SearchBar } from '@/shared/components/SearchBar';

describe('SearchBar', () => {
  test('should render searchbar properly', () => {
    const { container } = render(<SearchBar onSearchFunction={() => {}} />);

    expect(container).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toBeDefined();
    expect(screen.getByRole('button')).toBeDefined();
  });

  test('should call onQuery with the correct value after 1000ms', async () => {
    const onSearchFunction = vi.fn();
    const testValue = 'test';
    render(<SearchBar onSearchFunction={onSearchFunction} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: testValue } });

    await waitFor(() => {
      expect(onSearchFunction).toHaveBeenCalled();
      expect(onSearchFunction).toHaveBeenCalledWith(testValue);
    });
  });
});
