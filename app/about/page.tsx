'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import styles from './page.module.css';

export default function About() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  return (
    <section className={styles.about}>
      <h1 className={styles.about__title}>О нас</h1>

      <h2 className={styles.about__subtitle}>Мы делаем шикарные украшения для вас</h2>

      <p className={styles.about__text}>
        Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam, sollicitudin ante a, gravida arcu. Nam fringilla
        molestie velit, eget pellentesque risus scelerisque a. Nam ac urna maximus, tempor magna et, placerat urna.
        Curabitur eu magna enim. Proin placerat tortor lacus, ac sodales lectus placerat quis.
      </p>

      <ul className={styles.about__list}>
        <li className={styles.about__item}>
          <article className={styles.about__itemContent}>
            <h3 className={styles.about__itemTitle}>Тренды в украшениях</h3>
            <div className={styles.about__imageBlock}>
              <Image src={'/about-1.jpg'} width='670' height='300' alt={'about-img-1'} />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit,
              sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis
              consequat sed eu felis.
            </p>

            <ul>
              <li>consectetur adipiscing elit. Aliquam placerat</li>
              <li>Lorem ipsum dolor sit amet consectetur</li>
            </ul>
          </article>
        </li>
        <li className={styles.about__item}>
          <article className={styles.about__itemContent}>
            <h3 className={styles.about__itemTitle}>Сделано с любовью</h3>
            <div className={styles.about__imageBlock}>
              <Image src={'/about-2.jpg'} width='670' height='300' alt={'about-img-2'} />
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit,
              sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis
              consequat sed eu felis. Nunc sed porta augue. Morbi porta tempor odio, in molestie diam bibendu.ss
            </p>
          </article>
        </li>
      </ul>
    </section>
  );
}
