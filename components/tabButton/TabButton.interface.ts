export interface TabButtonProps {
  label: string;
  isActive: boolean;
  count?: number;
  onClick: () => void;
  layoutId: string;
}
