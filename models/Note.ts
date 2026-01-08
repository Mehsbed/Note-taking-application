import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INote extends Document {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
}

const NoteSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

const Note: Model<INote> = mongoose.models.Note || mongoose.model<INote>('Note', NoteSchema);

export default Note;
