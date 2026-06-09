'use client';

import React from 'react';

interface SkillItemProps {
  label: string;
  percent: number;
}

export default function SkillItem({
  label,
  percent,
}: Readonly<SkillItemProps>) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-semibold text-muted-foreground">
        <span>{label}</span>
        <span className="text-primary font-bold">{percent}%</span>
      </div>
      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-1000"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
