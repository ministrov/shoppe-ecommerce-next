export interface PaginationProps {
  page: number;
  total: number;
  onClick: (value: number) => void;
}
