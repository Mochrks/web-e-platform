'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import {
  StickyNote,
  Plus,
  Search,
  Grid,
  List,
  Tag,
  Clock,
  Star,
  Share2,
  ArrowUpDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import NoteCard from './components/NoteCard';
import NoteModal from './components/NoteModal';
import { useNotesPageHook } from './NotesPageHook';

export default function NotesPageUI() {
  const {
    notes,
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
    collections,
  } = useNotesPageHook();

  return (
    <div className="space-y-10 pb-20 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center bg-card border border-border p-10 rounded-[3rem] shadow-sm gap-8 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        />
        <div className="relative z-10">
          <h1 className="text-4xl font-black tracking-tight mb-2 text-center md:text-left">
            My Notes
          </h1>
          <p className="text-muted-foreground font-medium text-lg leading-relaxed font-bold max-w-xl text-center md:text-left">
            Capture interview concepts, mentor feedback, and your personal study
            guides.
          </p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold h-16 px-10 shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 text-xl relative z-20"
        >
          <Plus className="w-6 h-6 mr-3" aria-hidden="true" /> New Note
        </Button>
      </div>

      <div className="flex flex-col xl:flex-row gap-10">
        {/* Sidebar: Collections */}
        <div className="w-full xl:w-72 space-y-8">
          <div className="bg-muted/30 p-4 rounded-2xl flex items-center gap-3 border border-border focus-within:border-primary/50 transition-all shadow-sm">
            <Search
              className="w-4 h-4 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search notes..."
              className="bg-transparent border-none text-sm focus:outline-none w-full font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search notes"
            />
          </div>

          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest px-4 mb-4">
              Collections
            </div>
            {collections.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveCollection(item.label)}
                className={`
                    w-full flex items-center justify-between p-4 rounded-xl transition-all group 
                    ${activeCollection === item.label ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}
                   `}
                aria-current={
                  activeCollection === item.label ? 'page' : undefined
                }
              >
                <div className="flex items-center gap-3">
                  {(() => {
                    switch (item.label) {
                      case 'All Notes':
                        return <StickyNote className="w-4 h-4" />;
                      case 'Technical Prep':
                        return <Star className="w-4 h-4" />;
                      case 'Behavioral Tips':
                        return <Tag className="w-4 h-4" />;
                      default:
                        return <Share2 className="w-4 h-4" />;
                    }
                  })()}
                  <span className="text-sm font-bold tracking-tight">
                    {item.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Note Grid */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              <Clock className="w-4 h-4" aria-hidden="true" />{' '}
              {searchQuery
                ? `Searching: "${searchQuery}"`
                : 'Sorted by ' + sortBy}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSortBy(sortBy === 'recent' ? 'starred' : 'recent')
                }
                className="rounded-xl font-bold text-xs gap-2"
              >
                <ArrowUpDown className="w-3 h-3" /> Sort:{' '}
                {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
              </Button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-muted text-primary'}`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-muted text-muted-foreground'}`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            className={`
               ${
                 viewMode === 'grid'
                   ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-8'
                   : 'flex flex-col gap-4'
               }
            `}
          >
            {filteredAndSortedNotes.map((note: any) => (
              <NoteCard
                key={note.id}
                note={note}
                viewMode={viewMode}
                onEdit={handleOpenDialog}
                onDelete={handleDeleteNote}
                onToggleStar={handleToggleStar}
              />
            ))}

            <Card
              onClick={() => handleOpenDialog()}
              className="p-8 rounded-[2.5rem] border-2 border-dashed border-border flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/50 transition-all min-h-[320px]"
              role="button"
              tabIndex={0}
              aria-label="Add new note"
            >
              <div className="w-16 h-16 rounded-3xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all mb-6">
                <Plus className="w-8 h-8" aria-hidden="true" />
              </div>
              <h4 className="text-lg font-black tracking-tight text-muted-foreground group-hover:text-foreground">
                Add New Guide
              </h4>
            </Card>
          </div>
        </div>
      </div>

      <NoteModal
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingNote={editingNote}
        onSave={handleSaveNote}
        onUpdateEditingNote={(note) => setEditingNote(note)}
        isExisting={
          !!(editingNote?.id && notes.some((n) => n.id === editingNote.id))
        }
      />
    </div>
  );
}
