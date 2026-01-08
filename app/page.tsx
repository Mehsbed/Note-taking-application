'use client';

import { useState, useEffect } from 'react';
import NotesSidebar from '@/components/NotesSidebar';
import NoteEditor from '@/components/NoteEditor';
import ThemeToggle from '@/components/ThemeToggle';
import { getNotes, createNote, updateNote, deleteNote } from '@/app/actions/notes';
import { toast } from 'sonner';
import type { INote } from '@/models/Note';

export default function Home() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
      if (fetchedNotes.length > 0 && !selectedNote) {
        setSelectedNote(fetchedNotes[0]);
      }
    } catch (error) {
      console.error('Failed to load notes:', error);
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectNote = (note: INote) => {
    setSelectedNote(note);
  };

  const handleNewNote = () => {
    setSelectedNote(null);
  };

  const handleSave = async (title: string, content: string): Promise<boolean> => {
    try {
      if (selectedNote) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        const result = await updateNote(selectedNote._id, formData);
        if (result.success) {
          const updatedNotes = await getNotes();
          setNotes(updatedNotes);
          const updatedNote = updatedNotes.find(n => n._id === selectedNote._id);
          if (updatedNote) {
            setSelectedNote(updatedNote);
          }
          toast.success('Note saved!');
          return true;
        } else {
          toast.error(result.error || 'Failed to update note');
          return false;
        }
      } else {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        const result = await createNote(formData);
        if (result.success && result.note) {
          const updatedNotes = await getNotes();
          setNotes(updatedNotes);
          setSelectedNote(result.note);
          toast.success('Note created!');
          return true;
        } else {
          toast.error(result.error || 'Failed to create note');
          return false;
        }
      }
    } catch (error) {
      console.error('Error saving note:', error);
      toast.error('An error occurred while saving');
      return false;
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const result = await deleteNote(id);
      if (result.success) {
        if (selectedNote?._id === id) {
          const remainingNotes = notes.filter(n => n._id !== id);
          setSelectedNote(remainingNotes.length > 0 ? remainingNotes[0] : null);
        }
        await loadNotes();
        toast.success('Note deleted');
      } else {
        toast.error(result.error || 'Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('An error occurred while deleting');
    }
  };

  if (loading) {
    return (
      <div
        className="h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2"
          style={{ borderColor: 'var(--accent-primary)' }}
        ></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <NotesSidebar
        notes={notes}
        selectedNoteId={selectedNote?._id || null}
        onSelectNote={handleSelectNote}
        onNewNote={handleNewNote}
        onDeleteNote={handleDeleteNote}
      />
      <div className="flex-1 relative">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
        <NoteEditor
          note={selectedNote}
          onSave={handleSave}
          onNewNote={handleNewNote}
        />
      </div>
    </div>
  );
}
