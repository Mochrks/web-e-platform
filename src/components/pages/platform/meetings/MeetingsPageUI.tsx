'use client';

import React from 'react';
import { useMeetingsPageHook } from './MeetingsPageHook';

export default function MeetingsPageUI() {
  const {} = useMeetingsPageHook();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <h1 className="text-4xl font-black">Video Meetings</h1>
      <p className="text-muted-foreground max-w-md">
        This is a placeholder for the Video Meetings functionality. Integrate
        Zoom or WebRTC here.
      </p>
    </div>
  );
}
