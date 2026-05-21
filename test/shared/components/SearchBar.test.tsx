import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { SearchBar } from '@/shared/components/SearchBar';

describe('SearchBar', () => {
  test('should render searchbar properly', () => {
    const { container } = render(<SearchBar onSearchFunction={() => {}} />);

    expect(container).toMatchSnapshot();
    expect(screen.getByRole('textbox')).toBeDefined();
    expect(screen.getByRole('button')).toBeDefined();
  });
});
