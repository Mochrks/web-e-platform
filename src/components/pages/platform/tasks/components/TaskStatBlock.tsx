'use client';

import React from 'react';

interface TaskStatBlockProps {
  label: string;
  value: string;
  color: string;
}

export default function TaskStatBlock({
  label,
  value,
  color,
}: Readonly<TaskStatBlockProps>) {
  return (
    <div className="p-6 bg-muted/30 border border-border rounded-[2rem] min-w-[140px] text-center">
      <span className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </span>
      <span className={`text-3xl font-black ${color}`}>{value}</span>
    </div>
  );
}
