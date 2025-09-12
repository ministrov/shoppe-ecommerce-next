'use client';

import { Button } from '@/components/button/Button';
import { RootState } from '@/store/store';
import { incCount, decCount } from '@/store/features/counter/counterSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Cart() {
  const counter = useSelector((state: RootState) => state.counter.counter);
  const dispatch = useDispatch();
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
