import { render, screen } from '@testing-library/react';
import React from 'react';
import { Spinner } from '../../src/components/spinner';
import renderer from 'react-test-renderer';

test('should match snapshot spinner', async () => {
  const spinner = renderer.create(<Spinner />).toJSON();
  expect(spinner).toMatchSnapshot();
});

test('displays spinner', async () => {
  render(<Spinner />);
  await screen.findByRole('alert');
  expect(screen.getByRole('alert')).toBeDefined();
});
