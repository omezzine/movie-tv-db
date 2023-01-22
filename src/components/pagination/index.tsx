

import { useState } from 'react';
import ReactPaginate from 'react-paginate';

export interface PaginationPropsI {
  offset?: number | string;
  pageCount: number;
  onChange: (newOffset: string) => void;
  currentPage?: string;
}
interface PageClickEvent {
    selected: number
}
const Pagination: React.FC<PaginationPropsI> = ({
  offset,
  pageCount,
  onChange,
  currentPage
}) => {
  const [, setItemOffset] = useState(offset);

  const handlePageClick = (event: PageClickEvent) => {
    onChange(String(event.selected + 1));
    setItemOffset(event.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        forcePage={Number(currentPage || 1) - 1}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={undefined}
      />
    </>
  );
};
export default Pagination;