interface Social {
  id: number,
  name: string,
  icon: string,
  url: string
}

export const socials: Social[] = [
  {
    id: 1, icon: '/in.svg',
    name: 'In',
    url: "#"
  },
  { id: 2, icon: '/facebook.svg', name: 'Facebook', url: '#' },
  { id: 3, icon: '/insta.svg', name: 'Instagram', url: '#' },
  { id: 4, icon: '/twitter.svg', name: 'Twitter', url: '#' },
];