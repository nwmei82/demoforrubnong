import { useEffect, useState } from 'react';

const getOS = (): string => {
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return 'iOS';
  }

  return 'unknown';
};

const useShakeDetection = () => {
  const [shakeCount, setShakeCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [os, setOs] = useState<string>('unknown');

  useEffect(() => {
    const os = getOS();
    setOs(os);

    const requestPermission = async () => {
      if (os === 'iOS' && typeof DeviceMotionEvent !== 'undefined' && 'requestPermission' in DeviceMotionEvent) {
        try {
          const permissionState = await (DeviceMotionEvent as any).requestPermission();
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', handleMotion as EventListener);
          } else {
            alert('Permission to access motion sensors is required.');
          }
        } catch (e) {
          console.error('Error while requesting motion sensor permission:', e);
        }
      } else {
        window.addEventListener('devicemotion', handleMotion as EventListener);
      }
    };

    const handleMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.acceleration;
      if (acceleration && acceleration.x !== null && acceleration.y !== null && acceleration.z !== null) {
        const totalAcceleration = Math.abs(acceleration.x) + Math.abs(acceleration.y) + Math.abs(acceleration.z);
        if (totalAcceleration > 25) {
          if (!isShaking) {
            setShakeCount((prevCount) => prevCount + 1);
            setIsShaking(true);
          }
        } else {
          setIsShaking(false);
        }
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener('devicemotion', handleMotion as EventListener);
    };
  }, [isShaking]);

  return { shakeCount, os };
};

export default useShakeDetection;
