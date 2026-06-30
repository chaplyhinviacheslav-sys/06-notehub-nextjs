'use client';

import { FormEvent, useState } from 'react';
import type { CreateNotePayload, NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

interface NoteFormProps {
  onSubmit: (payload: CreateNotePayload) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function NoteForm({
  onSubmit,
  onCancel,
  isSubmitting,
}: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState<NoteTag>('Todo');
  const [titleError, setTitleError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }

    setTitleError('');
    onSubmit({ title: title.trim(), content: content.trim(), tag });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.formGroup}>
        Title
        <input
          className={css.input}
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        {titleError && <span className={css.error}>{titleError}</span>}
      </label>

      <label className={css.formGroup}>
        Content
        <textarea
          className={css.textarea}
          rows={8}
          value={content}
          onChange={event => setContent(event.target.value)}
        />
      </label>

      <label className={css.formGroup}>
        Tag
        <select
          className={css.select}
          value={tag}
          onChange={event => setTag(event.target.value as NoteTag)}
        >
          {tags.map(tagItem => (
            <option key={tagItem} value={tagItem}>
              {tagItem}
            </option>
          ))}
        </select>
      </label>

      <div className={css.actions}>
        <button className={css.cancelButton} type="button" onClick={onCancel}>
          Cancel
        </button>
        <button
          className={css.submitButton}
          type="submit"
          disabled={isSubmitting}
        >
          Create
        </button>
      </div>
    </form>
  );
}
