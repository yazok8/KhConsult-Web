// hooks/useIsMounted.ts

import { useEffect, useRef } from 'react';

export function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    console.log('Component mounted');

    return () => {
      isMounted.current = false;
      console.log('Component unmounted');
    };
  }, []);

  return isMounted;
}
