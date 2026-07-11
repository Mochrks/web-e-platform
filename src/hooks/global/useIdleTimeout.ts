import { useState, useEffect, useCallback, useRef } from 'react';

export function useIdleTimeout(timeoutMinutes = 15) {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    setIsIdle(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Set new timeout (minutes -> milliseconds)
    timeoutRef.current = setTimeout(
      () => {
        setIsIdle(true);
      },
      timeoutMinutes * 60 * 1000
    );
  }, [timeoutMinutes]);

  useEffect(() => {
    const events = [
      'mousemove',
      'mousedown',
      'keydown',
      'touchstart',
      'scroll',
    ];

    // Attach event listeners
    const handleActivity = () => resetTimer();
    events.forEach((event) => window.addEventListener(event, handleActivity));

    // Initialize timer
    resetTimer();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, [resetTimer]);

  return { isIdle, resetTimer, setIsIdle };
}
