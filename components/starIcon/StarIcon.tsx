import Image from 'next/image';
import { StarIconProps } from './StarIcon.inteface';

export const StarIcon = ({ isEditable }: StarIconProps) => {
  console.log(isEditable);
  return (
    <Image src={'/star.svg'} width={18} height={18} alt={''} />
  )
}
