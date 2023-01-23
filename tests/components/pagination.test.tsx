import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';
import Pagination from '../../src/components/pagination';
import renderer from 'react-test-renderer';

describe('Pagination Component', () => {
  test('Should match snapshot', () => {
    const pagination = renderer
      .create(<Pagination pageCount={10} currentPage={'1'} offset={1} onChange={() => vi.fn()} />)
      .toJSON();
    expect(pagination).toMatchSnapshot();
  });

  it('display Pagination', async () => {
    const onPaginationCHange = vi.fn();
    const { container } = render(
      <Pagination pageCount={10} currentPage={'1'} offset={1} onChange={onPaginationCHange} />,
    );
    // screen.debug();
    fireEvent.click(container.querySelector('a[rel="next"]') as HTMLElement, {});
    expect(onPaginationCHange).toHaveBeenCalledWith('2');
    fireEvent.click(container.querySelector('a[rel="next"]') as HTMLElement, {});
    expect(onPaginationCHange).toHaveBeenCalledWith('3');
    fireEvent.click(container.querySelector('a[rel="prev"]') as HTMLElement, {});
    expect(onPaginationCHange).toHaveBeenCalledWith('2');
  });

  test('Should have selected page', () => {
    const onPaginationCHange = vi.fn();
    const { container } = render(
      <Pagination pageCount={10} currentPage={'5'} offset={1} onChange={onPaginationCHange} />,
    );
    fireEvent.click(container.querySelector('a[rel="next"]') as HTMLElement, {});
    expect(onPaginationCHange).toHaveBeenCalledWith('6');
  });
});
