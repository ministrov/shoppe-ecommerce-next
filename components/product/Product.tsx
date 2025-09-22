import styles from './Product.module.css';

type ProductProps = {
  id: string;
}

export const Product = ({ id }: ProductProps) => {
  return (
    <div className={styles.product}>
      <h1>Product Page</h1>
      <p>Product ID: {id}</p>
    </div>
  )
}
