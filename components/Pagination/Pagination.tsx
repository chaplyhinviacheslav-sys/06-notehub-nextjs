'use client';

import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <ul className={css.pagination}>
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <li key={page} className={page === currentPage ? css.active : ''}>
            <a
              href="#"
              onClick={event => {
                event.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
