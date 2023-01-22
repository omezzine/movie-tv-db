import { render, screen } from '@testing-library/react';
import React from 'react';
import { Spinner } from '../../src/components/spinner';

test('displays spinner', async () => {
  // ARRANGE
  render(<Spinner />);
  // ACT
  await screen.findByRole('alert');
  // ASSERT
  expect(screen.getByRole('alert')).toBeDefined();
});
