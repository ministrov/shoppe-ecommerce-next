import { InputField } from '@/components/inputField/InputField';
import styles from './CartForm.module.css';

export const CartForm = () => {
  return (
    <div className={styles.form}>
      <form action="#">
        <fieldset className={styles.fieldset}>
          <legend className="visually-hidden">Обязательные поля</legend>

          <InputField
            type="email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            variant="gray"
            name="email"
            id="email"
            placeholder="Email"
            required
            aria-required="true"
            autoComplete="email"
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" // ← Валидация email
            title="Пожалуйста, введите корректный email адрес"
          />

          <InputField
            type="password"
            name="userPassword"
            variant="gray"
            // value={userName}
            // onChange={(e) => setUserName(e.target.value)}
            id="password"
            placeholder="Пароль"
            required
            aria-required="true"
          />

          <InputField
            type="text"
            name="address"
            variant="gray"
            // value={userName}
            // onChange={(e) => setUserName(e.target.value)}
            id="address"
            placeholder="Адрес доставки"
            required
            aria-required="true"
          />

          <InputField
            type="text"
            name="userName"
            variant="gray"
            // value={userName}
            // onChange={(e) => setUserName(e.target.value)}
            id="userName"
            placeholder="Имя"
            required
            aria-required="true"
          />

          <InputField
            type="phone"
            name="userPhone"
            variant="gray"
            // value={userName}
            // onChange={(e) => setUserName(e.target.value)}
            id="userPhone"
            placeholder="Телефон"
            required
            aria-required="true"
          />

        </fieldset>
      </form>
    </div>
  )
}
