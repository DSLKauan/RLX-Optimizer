/**
 * One UI Haptic Feedback utility for touch screens
 * Works natively on Android Samsung devices with Vibration API
 */
export function triggerHaptic(type: 'light' | 'medium' | 'success' | 'toggle' = 'light') {
  if (typeof window === 'undefined' || !('vibrate' in navigator)) {
    return;
  }

  try {
    switch (type) {
      case 'light':
        navigator.vibrate(10);
        break;
      case 'medium':
        navigator.vibrate(20);
        break;
      case 'toggle':
        navigator.vibrate([12, 20, 15]);
        break;
      case 'success':
        navigator.vibrate([15, 30, 20]);
        break;
    }
  } catch {
    // Vibration ignored if browser policy blocks it without prior user gesture
  }
}
