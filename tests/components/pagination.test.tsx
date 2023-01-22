import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';
import Pagination from '../../src/components/pagination';

describe('Pagination Component', () => {
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
});
