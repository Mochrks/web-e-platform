'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface Note {
  id: number;
  title: string;
  content: string;
  date: Date;
  tag: string;
  color: string;
  isStarred: boolean;
}

interface NoteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingNote: Note | null;
  onSave: () => void;
  onUpdateEditingNote: (note: Note) => void;
  isExisting: boolean;
}

export default function NoteModal({
  isOpen,
  onOpenChange,
  editingNote,
  onSave,
  onUpdateEditingNote,
  isExisting,
}: Readonly<NoteModalProps>) {
  if (!editingNote) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl rounded-[2.5rem] border-border p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-tight">
            {isExisting ? 'Edit Note' : 'Create New Note'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="space-y-2">
            <label
              htmlFor="note-title"
              className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1"
            >
              Title
            </label>
            <Input
              id="note-title"
              placeholder="Enter note title..."
              className="h-14 rounded-2xl border-border bg-muted/30 font-bold"
              value={editingNote.title}
              onChange={(e) =>
                onUpdateEditingNote({ ...editingNote, title: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="note-content"
              className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1"
            >
              Content
            </label>
            <Textarea
              id="note-content"
              placeholder="Write your note content here..."
              className="min-h-[200px] rounded-2xl border-border bg-muted/30 font-medium leading-relaxed resize-none p-4"
              value={editingNote.content}
              onChange={(e) =>
                onUpdateEditingNote({ ...editingNote, content: e.target.value })
              }
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label
                htmlFor="note-tag"
                className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1"
              >
                Category
              </label>
              <select
                id="note-tag"
                className="w-full h-12 rounded-xl bg-muted/30 border border-border px-4 text-sm font-bold appearance-none"
                value={editingNote.tag}
                onChange={(e) =>
                  onUpdateEditingNote({ ...editingNote, tag: e.target.value })
                }
              >
                <option>Technical</option>
                <option>Behavioral</option>
                <option>Mentor</option>
                <option>Study</option>
              </select>
            </div>
          </div>
        </div>
        <DialogFooter className="pt-8">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="rounded-xl font-bold px-8"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            className="rounded-xl bg-primary text-white font-black px-8 h-12 shadow-lg shadow-primary/20"
          >
            {isExisting ? 'Update Note' : 'Save Note'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
