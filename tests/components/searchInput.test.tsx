import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchInput from '../../src/components/searchInput';
import React from 'react';
import renderer from 'react-test-renderer';

describe('DB Card test', () => {
  test('Should match snapshot', () => {
    const search = renderer
      .create(<SearchInput defaultValue={{}} onInputChange={(e) => ({})} onTypeChange={(e) => ({})} />)
      .toJSON();
    expect(search).toMatchSnapshot();
  });

  test('Should render correctly', () => {
    const { container } = render(
      <SearchInput defaultValue={{}} onInputChange={(e) => ({})} onTypeChange={(e) => ({})} />,
    );
    expect(container.querySelector('input')).toBeDefined();
    expect(container.querySelector('select')).toBeDefined();
  });
  test('Should call fn when input change', () => {
    const onInputChange = vi.fn();
    const onTypeChange = vi.fn();
    const { container } = render(
      <SearchInput defaultValue={{}} onInputChange={onInputChange} onTypeChange={onTypeChange} />,
    );
    fireEvent.change(container.querySelector('input') as HTMLElement, { target: { value: 'matrix' } });
    expect(onInputChange).toHaveBeenCalledWith({ query: 'matrix', page: '1' });
  });
  test('Should call fn when select change', () => {
    const onInputChange = vi.fn();
    const onTypeChange = vi.fn();
    const { container } = render(
      <SearchInput defaultValue={{}} onInputChange={onInputChange} onTypeChange={onTypeChange} />,
    );
    fireEvent.change(container.querySelector('select') as HTMLElement, { target: { value: 'tv' } });
    expect(onTypeChange).toHaveBeenCalledWith({ type: 'tv', page: '1' });
  });
});
