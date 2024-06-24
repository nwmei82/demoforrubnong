"use client"

import { FC } from 'react';
import useShakeDetection from './shake';

const ShakeGame: FC = () => {
  const { shakeCount, os } = useShakeDetection();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Shake Game</h1>
      <h2>Shake Count: {shakeCount}</h2>
      <h3>Operating System: {os}</h3>
      <h3>again</h3>
    </div>
  );
};

export default ShakeGame;



