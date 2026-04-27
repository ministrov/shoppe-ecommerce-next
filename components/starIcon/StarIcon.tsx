import Image from 'next/image';
import { StarIconProps } from './StarIcon.inteface';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StarIcon = ({ isEditable }: StarIconProps) => {
  return (
    <Image src={'/star.svg'} width={18} height={18} alt={''} />
  )
}
