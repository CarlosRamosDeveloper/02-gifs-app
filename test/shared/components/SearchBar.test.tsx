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

  test('should show the proper placeholder value', () => {
    const testValue = 'test';

    render(<SearchBar onSearchFunction={() => {}} placeholder={testValue} />);

    expect(screen.getByPlaceholderText(testValue)).toBeDefined();
  });

  test('should call onSearchFunction with the correct value after 700ms', async () => {
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

  test('should call only once with the last value (debounce)', async () => {
    const onSearchFunction = vi.fn();
    render(<SearchBar onSearchFunction={onSearchFunction} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 't' } });
    fireEvent.change(input, { target: { value: 'te' } });
    fireEvent.change(input, { target: { value: 'tes' } });
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(onSearchFunction).toHaveBeenCalledTimes(1);
      expect(onSearchFunction).toHaveBeenCalledWith('test');
    });
  });

  test('should call onSearchFunction when button clicked with the input value', async () => {
    const testValue = 'test';
    const onSearchFunction = vi.fn();
    render(<SearchBar onSearchFunction={onSearchFunction} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: testValue } });
    fireEvent.click(button);

    expect(onSearchFunction).toHaveBeenCalledTimes(1);
    expect(onSearchFunction).toHaveBeenCalledWith(testValue);
  });
});
