import { Tab } from '@/interfaces/tabs.interface';

/**
 * Свойства компонента вкладок (табов).
 */
export interface TabsProps {
  /** Массив вкладок для отображения */
  tabs: Tab[];
  /** Текущий путь (pathname) для определения активной вкладки */
  pathname: string;
}
