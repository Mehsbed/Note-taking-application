'use client';

import { useState, useEffect, useRef } from 'react';
import { Save, Loader2 } from 'lucide-react';
import type { INote } from '@/models/Note';

interface NoteEditorProps {
  note: INote | null;
  onSave: (title: string, content: string) => Promise<boolean>;
  onNewNote: () => void;
}

export default function NoteEditor({ note, onSave, onNewNote }: NoteEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    }
  }, [note]);

  useEffect(() => {
    if (!note && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [note]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      return;
    }

    setIsSaving(true);
    const success = await onSave(title.trim(), content.trim());
    setIsSaving(false);

    if (success && !note) {
      setTitle('');
      setContent('');
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div
      className="h-screen flex flex-col transition-colors duration-300 ease-in-out"
      style={{
        width: '70%',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      {!note && (
        <div className="p-6 border-b transition-colors duration-300 ease-in-out" style={{ borderColor: 'var(--border-color)' }}>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            New Note
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Start typing to create a new note
          </p>
        </div>
      )}

      {note && (
        <div className="p-6 border-b transition-colors duration-300 ease-in-out" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {note.title || 'Untitled'}
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                Last edited {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving || !title.trim() || !content.trim()}
              className="flex items-center gap-2 px-6 py-2 rounded-2xl font-medium transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--bg-primary)',
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
              }}
            >
              {isSaving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6" onKeyDown={handleKeyDown}>
        <div className="max-w-4xl mx-auto">
          <input
            ref={titleInputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            className="w-full mb-6 px-4 py-3 text-2xl font-bold rounded-2xl outline-none transition-all duration-300 ease-in-out"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: 'transparent',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.boxShadow = '0 0 0 3px var(--glow-color)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your note here..."
            className="w-full px-4 py-3 rounded-2xl outline-none resize-none transition-all duration-300 ease-in-out"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: 'transparent',
              minHeight: 'calc(100vh - 300px)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.boxShadow = '0 0 0 3px var(--glow-color)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />

          {!note && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSave}
                disabled={isSaving || !title.trim() || !content.trim()}
                className="flex items-center gap-2 px-6 py-2 rounded-2xl font-medium transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--bg-primary)',
                }}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
                }}
              >
                {isSaving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Save Note</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
