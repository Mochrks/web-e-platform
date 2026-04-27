'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Edit3, Trash2 } from 'lucide-react';

interface Note {
  id: number;
  title: string;
  content: string;
  date: Date;
  tag: string;
  color: string;
  isStarred: boolean;
}

interface NoteCardProps {
  note: Note;
  viewMode: 'grid' | 'list';
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  onToggleStar: (id: number) => void;
}

export default function NoteCard({
  note,
  viewMode,
  onEdit,
  onDelete,
  onToggleStar,
}: Readonly<NoteCardProps>) {
  const isGrid = viewMode === 'grid';

  return (
    <Card
      onClick={() => onEdit(note)}
      className={`
         rounded-[2.5rem] border group hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden bg-card
         ${isGrid ? 'p-8 min-h-[320px] flex flex-col justify-between' : 'p-6 flex flex-row items-center gap-6'}
         ${note.color}
      `}
    >
      <div
        className={`relative z-10 ${isGrid ? '' : 'flex-1 flex flex-row items-center gap-6'}`}
      >
        {isGrid ? (
          <>
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-50">
                {note.date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStar(note.id);
                }}
                className="p-2 -mt-2 -mr-2 hover:bg-white/20 rounded-xl transition-all"
                aria-label={note.isStarred ? 'Unstar' : 'Star'}
              >
                <Star
                  className={`w-5 h-5 ${note.isStarred ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                />
              </button>
            </div>
            <h3 className="text-2xl font-black mb-4 tracking-tight leading-snug group-hover:text-primary transition-colors">
              {note.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-6 font-bold leading-relaxed">
              {note.content}
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4 min-w-[100px]">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-50">
                {note.date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleStar(note.id);
                }}
                className="p-2 hover:bg-white/20 rounded-xl transition-all"
                aria-label={note.isStarred ? 'Unstar' : 'Star'}
              >
                <Star
                  className={`w-5 h-5 ${note.isStarred ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-black tracking-tight group-hover:text-primary transition-colors">
                {note.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-1 font-bold">
                {note.content}
              </p>
            </div>
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest border-border/50 bg-background/50"
            >
              {note.tag}
            </Badge>
          </>
        )}
      </div>

      {isGrid ? (
        <div className="pt-6 border-t border-border/10 mt-8 flex justify-between items-center relative z-10">
          <Badge
            variant="outline"
            className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest border-border/50 bg-background/50"
          >
            {note.tag}
          </Badge>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(note);
              }}
              className="p-2.5 hover:bg-background rounded-xl text-muted-foreground"
              aria-label="Edit note"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              className="p-2.5 hover:bg-rose-500/10 rounded-xl text-rose-500"
              aria-label="Delete note"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
            className="p-2 hover:bg-background rounded-xl text-muted-foreground"
            aria-label="Edit note"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            className="p-2 hover:bg-rose-500/10 rounded-xl text-rose-500"
            aria-label="Delete note"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </Card>
  );
}
