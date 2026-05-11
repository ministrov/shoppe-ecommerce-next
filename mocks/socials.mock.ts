/**
 * Интерфейс, описывающий социальную сеть.
 */
export interface Social {
  /** Уникальный идентификатор социальной сети */
  id: number;
  /** Название социальной сети (например, "Facebook") */
  name: string;
  /** Ключ иконки (Linkedin, Facebook, Instagram, Twitter) для сопоставления с компонентом иконки */
  icon: string;
  /** URL-адрес страницы социальной сети */
  url: string;
}

export const socials: Social[] = [
  {
    id: 1,
    icon: 'Linkedin',
    name: 'LinkedIn',
    url: "#"
  },
  { id: 2, icon: 'Facebook', name: 'Facebook', url: '#' },
  { id: 3, icon: 'Instagram', name: 'Instagram', url: '#' },
  { id: 4, icon: 'Twitter', name: 'Twitter', url: '#' },
];