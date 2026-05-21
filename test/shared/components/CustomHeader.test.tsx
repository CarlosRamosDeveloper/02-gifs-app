import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { CustomHeader } from '@/shared/components/CustomHeader';

describe('CustomHeader', () => {
  test('should render the title correctly', () => {
    const testSubject = 'Test Subject';

    render(<CustomHeader title={testSubject} />);

    expect(screen.getByText(testSubject)).toBeDefined();
  });

  test('should render the description when provided', () => {
    const testSubject = 'Test Subject';

    render(<CustomHeader title={'Test Title'} description={testSubject} />);

    expect(screen.getByText(testSubject)).toBeDefined();
    expect(screen.getByRole('paragraph')).toBeDefined();
    expect(screen.getByRole('paragraph').innerHTML).toBe(testSubject);
  });

  test('should not render the description when not provided', () => {
    const testSubject = 'Test Subject';

    const { container } = render(<CustomHeader title={testSubject} />);
    const divElement = container.querySelector('.content-center');
    const p = divElement?.querySelector('p');

    expect(p).toBeNull();
  });
});
