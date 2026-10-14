import { useState, useEffect } from 'react';

export interface DeviceHardwareInfo {
  detectedHz: number;
  cpuCores: number;
  deviceRamGb: number | null;
  androidVersion: string;
  isCalibratingHz: boolean;
  batteryLevel: number | null;
  isCharging: boolean | null;
}

export function useDeviceHardware() {
  const [hardware, setHardware] = useState<DeviceHardwareInfo>({
    detectedHz: 120, // optimistic default
    cpuCores: typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 8 : 8,
    deviceRamGb: typeof navigator !== 'undefined' && 'deviceMemory' in navigator ? (navigator as any).deviceMemory : 8,
    androidVersion: 'Android',
    isCalibratingHz: true,
    batteryLevel: null,
    isCharging: null,
  });

  useEffect(() => {
    // 1. Detect Android Version from User Agent
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent;
      const androidMatch = ua.match(/Android\s([0-9.]+)/i);
      const androidVer = androidMatch ? `Android ${androidMatch[1]}` : 'Android';

      // 2. Sample Display Refresh Rate using requestAnimationFrame
      let frameCount = 0;
      let startTime = performance.now();
      let animId: number;

      const sampleFrames = (now: number) => {
        frameCount++;
        if (frameCount < 50) {
          animId = requestAnimationFrame(sampleFrames);
        } else {
          const totalDuration = now - startTime;
          const measuredFps = (frameCount / totalDuration) * 1000;

          // Bucket to nearest standard refresh rate
          let resolvedHz = 60;
          if (measuredFps >= 135) {
            resolvedHz = 144;
          } else if (measuredFps >= 105) {
            resolvedHz = 120;
          } else if (measuredFps >= 75) {
            resolvedHz = 90;
          } else {
            resolvedHz = 60;
          }

          setHardware((prev) => ({
            ...prev,
            detectedHz: resolvedHz,
            androidVersion: androidVer,
            isCalibratingHz: false,
          }));
        }
      };

      animId = requestAnimationFrame(sampleFrames);

      // 3. Optional Battery API
      if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          setHardware((prev) => ({
            ...prev,
            batteryLevel: Math.round(battery.level * 100),
            isCharging: battery.charging,
          }));

          battery.addEventListener('levelchange', () => {
            setHardware((prev) => ({ ...prev, batteryLevel: Math.round(battery.level * 100) }));
          });
        }).catch(() => {
          // Battery API not permitted
        });
      }

      return () => {
        cancelAnimationFrame(animId);
      };
    }
  }, []);

  return hardware;
}
