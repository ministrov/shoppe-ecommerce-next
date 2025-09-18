'use client';

import { Button } from '@/components/button/Button';
import { incCount, decCount } from '@/store/features/counter/counterSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function Cart() {
  const counter = useAppSelector((state) => state.counter.counter);
  const dispatch = useAppDispatch();
  return (
    <div>

      Cart

      <Button onClick={() => dispatch(incCount())}>
        +
      </Button>

      {counter}

      <Button onClick={() => dispatch(decCount())}>
        -
      </Button>
    </div>
  );
};
