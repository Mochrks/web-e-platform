'use client';

import React from 'react';
import { useMeetingsPageHook } from './MeetingsPageHook';

export default function MeetingsPageUI() {
  const {} = useMeetingsPageHook();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <h1 className="text-4xl font-black tracking-tight mb-2">
        Video Meetings
      </h1>
      <p className="text-muted-foreground font-medium text-lg font-bold">
        This is a placeholder for the Video Meetings functionality. Integrate
        Zoom or WebRTC here.
      </p>
    </div>
  );
}
