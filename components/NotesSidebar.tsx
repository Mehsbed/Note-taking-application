'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { INote } from '@/models/Note';
import { formatRelativeTime, getPreview } from '@/lib/utils';

interface NotesSidebarProps {
  notes: INote[];
  selectedNoteId: string | null;
  onSelectNote: (note: INote) => void;
  onNewNote: () => void;
  onDeleteNote: (id: string) => void;
}

export default function NotesSidebar({
  notes,
  selectedNoteId,
  onSelectNote,
  onNewNote,
  onDeleteNote,
}: NotesSidebarProps) {
  const [hoveredNoteId, setHoveredNoteId] = useState<string | null>(null);

  const handleDelete = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this note?')) {
      onDeleteNote(noteId);
    }
  };

  return (
    <div
      className="h-screen overflow-y-auto border-r transition-colors duration-300 ease-in-out"
      style={{
        width: '30%',
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="p-6 sticky top-0 z-10" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <button
          onClick={onNewNote}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-medium transition-all duration-300 ease-in-out"
          style={{
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--bg-primary)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
          }}
        >
          <Plus size={20} />
          <span>New Note</span>
        </button>
      </div>

      <div className="px-4 pb-4">
        {notes.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
              No notes yet. Create your first note!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {notes.map((note) => {
              const isSelected = selectedNoteId === note._id;
              const isHovered = hoveredNoteId === note._id;

              return (
                <div
                  key={note._id}
                  onClick={() => onSelectNote(note)}
                  onMouseEnter={() => setHoveredNoteId(note._id)}
                  onMouseLeave={() => setHoveredNoteId(null)}
                  className="p-4 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out relative"
                  style={{
                    backgroundColor: isSelected
                      ? 'var(--accent-primary)'
                      : isHovered
                      ? 'var(--bg-primary)'
                      : 'transparent',
                    borderWidth: isSelected ? '2px' : '1px',
                    borderStyle: 'solid',
                    borderColor: isSelected
                      ? 'var(--accent-primary)'
                      : 'transparent',
                  }}
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3
                      className="font-semibold text-sm truncate flex-1"
                      style={{
                        color: isSelected
                          ? 'var(--bg-primary)'
                          : 'var(--text-primary)',
                      }}
                    >
                      {note.title || 'Untitled'}
                    </h3>
                    {isHovered && (
                      <button
                        onClick={(e) => handleDelete(e, note._id)}
                        className="p-1.5 rounded-lg transition-colors duration-300 ease-in-out flex-shrink-0"
                        style={{
                          color: isSelected
                            ? 'var(--bg-primary)'
                            : 'var(--text-secondary)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isSelected
                            ? 'rgba(255, 255, 255, 0.2)'
                            : 'var(--bg-secondary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        aria-label="Delete note"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <p
                    className="text-xs mb-2 line-clamp-1"
                    style={{
                      color: isSelected
                        ? 'var(--bg-primary)'
                        : 'var(--text-secondary)',
                      opacity: isSelected ? 0.9 : 0.7,
                    }}
                  >
                    {getPreview(note.content)}
                  </p>
                  <span
                    className="text-xs"
                    style={{
                      color: isSelected
                        ? 'var(--bg-primary)'
                        : 'var(--text-secondary)',
                      opacity: isSelected ? 0.8 : 0.6,
                    }}
                  >
                    {formatRelativeTime(note.createdAt)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
