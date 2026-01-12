import { useState } from 'react';

export function usePagination<T>(items: T[], pageSize: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / pageSize);

  let validatedPage = currentPage;
  if (currentPage > totalPages && totalPages > 0) {
    validatedPage = totalPages;
  }

  const startIndex = (validatedPage - 1) * pageSize;
  const paginatedItems = items.slice(startIndex, startIndex + pageSize);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage: validatedPage,
    totalPages,
    paginatedItems,
    goToPage,
  };
}
