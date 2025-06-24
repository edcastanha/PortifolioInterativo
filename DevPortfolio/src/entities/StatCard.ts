import { IconType } from 'react-icons';

export interface StatCardProps {
  icon: IconType;
  label: string;
  value: string;
  details?: string;
  iconBgColor?: string;
}
