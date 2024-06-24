/*function test(){
  const score = 0;

  return(
    <div className="justify-items-center">
      <h3>score: {score}</h3>
      <h1>shake me</h1>
    </div>
  )
}
export default test
*/
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
    </div>
  );
};

export default ShakeGame;



