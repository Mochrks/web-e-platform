'use client';

import { useState, useMemo } from 'react';
import { initialNotes, type Note, noteCollections } from '@/data/notesData';

export const useNotesPageHook = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCollection, setActiveCollection] = useState('All Notes');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'starred'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedNotes = useMemo(() => {
    let result = notes.filter((n) => {
      const matchesSearch =
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCollection =
        activeCollection === 'All Notes' ||
        n.tag === activeCollection.split(' ')[0];
      return matchesSearch && matchesCollection;
    });

    if (sortBy === 'starred') {
      result.sort((a, b) => {
        if (a.isStarred === b.isStarred)
          return b.date.getTime() - a.date.getTime();
        return a.isStarred ? -1 : 1;
      });
    } else {
      result.sort((a, b) => b.date.getTime() - a.date.getTime());
    }

    return result;
  }, [notes, searchQuery, activeCollection, sortBy]);

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const handleToggleStar = (id: number) => {
    setNotes(
      notes.map((n) => (n.id === id ? { ...n, isStarred: !n.isStarred } : n))
    );
  };

  const handleOpenDialog = (note: Note | null = null) => {
    setEditingNote(
      note || {
        id: Date.now(),
        title: '',
        content: '',
        date: new Date(),
        tag: 'Technical',
        color: 'bg-primary/5 border-primary/20',
        isStarred: false,
      }
    );
    setIsDialogOpen(true);
  };

  const handleSaveNote = () => {
    if (!editingNote || !editingNote.title.trim()) return;

    if (notes.find((n) => n.id === editingNote.id)) {
      setNotes(notes.map((n) => (n.id === editingNote.id ? editingNote : n)));
    } else {
      setNotes([editingNote, ...notes]);
    }
    setIsDialogOpen(false);
    setEditingNote(null);
  };

  return {
    notes,
    setNotes,
    searchQuery,
    setSearchQuery,
    activeCollection,
    setActiveCollection,
    isDialogOpen,
    setIsDialogOpen,
    editingNote,
    setEditingNote,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    filteredAndSortedNotes,
    handleDeleteNote,
    handleToggleStar,
    handleOpenDialog,
    handleSaveNote,
    collections: noteCollections,
  };
};
