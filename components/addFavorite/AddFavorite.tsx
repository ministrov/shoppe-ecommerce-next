import Image from 'next/image';
import { AddFavoriteProps } from './AddFavorite.interface';
import styles from './AddFavorite.module.css';

export const AddFavorite = ({ id, isShown }: AddFavoriteProps) => {
  console.log(id, isShown);
  return (
    <button
      // v-show="isShown || favoriteStore.isFavorite(id)"
      className={styles.favButton}
    // @click.stop.prevent="() => favoriteStore.toggleFavorite(id)"
    >
      {/* <Icon name="icons:add-favorite" size="18px" /> */}
      <Image src={'/favorite.svg'} width={18} height={18} alt={''} />
    </button>
  )
}
