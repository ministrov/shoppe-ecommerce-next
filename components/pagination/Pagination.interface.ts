export interface PaginationProps {
  page: number;
  total: number;
  onClick: (page: number) => void;
  limit?: number;
}
