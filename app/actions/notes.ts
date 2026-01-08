'use server';

import connectDB from '@/lib/mongodb';
import Note from '@/models/Note';
import { revalidatePath } from 'next/cache';

export async function getNotes() {
  try {
    await connectDB();
    const notes = await Note.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(notes));
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
}

export async function getNote(id: string) {
  try {
    await connectDB();
    const note = await Note.findById(id).lean();
    if (!note) return null;
    return JSON.parse(JSON.stringify(note));
  } catch (error) {
    console.error('Error fetching note:', error);
    return null;
  }
}

export async function createNote(formData: FormData) {
  try {
    await connectDB();
    
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title || !content) {
      const errorMsg = 'Title and content are required';
      console.error('[createNote] Validation failed:', { title: !!title, content: !!content });
      throw new Error(errorMsg);
    }

    const noteData = {
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date(),
    };

    console.log('[createNote] Attempting to create note with data:', { title: noteData.title, contentLength: noteData.content.length });

    const note = await Note.create(noteData);

    if (!note) {
      throw new Error('Note creation returned null');
    }

    console.log('[createNote] Successfully created note:', note._id);

    revalidatePath('/');
    return { success: true, note: JSON.parse(JSON.stringify(note)) };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = error instanceof Error ? error.stack : String(error);
    console.error('[createNote] Failed to create note:', {
      message: errorMessage,
      details: errorDetails,
      errorType: error?.constructor?.name,
    });
    return { success: false, error: errorMessage };
  }
}

export async function updateNote(id: string, formData: FormData) {
  try {
    await connectDB();
    
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title || !content) {
      throw new Error('Title and content are required');
    }

    const note = await Note.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        content: content.trim(),
      },
      { new: true }
    );

    if (!note) {
      throw new Error('Note not found');
    }

    revalidatePath('/');
    return { success: true, note: JSON.parse(JSON.stringify(note)) };
  } catch (error) {
    console.error('Error updating note:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to update note' };
  }
}

export async function deleteNote(id: string) {
  try {
    await connectDB();
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      throw new Error('Note not found');
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting note:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to delete note' };
  }
}
