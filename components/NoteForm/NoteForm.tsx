'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { createNote } from '@/lib/api';
import type { CreateNotePayload, NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

interface NoteFormProps {
  onCancel: () => void;
}

const initialValues: CreateNotePayload = {
  title: '',
  content: '',
  tag: 'Todo',
};

const noteValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),
  content: Yup.string().max(500, 'Content must be at most 500 characters'),
  tag: Yup.string()
    .oneOf(tags, 'Choose a valid tag')
    .required('Tag is required'),
});

export default function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (payload: CreateNotePayload) => createNote(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['notes'] });
      onCancel();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={noteValidationSchema}
      onSubmit={values => {
        createMutation.mutate({
          title: values.title.trim(),
          content: values.content.trim(),
          tag: values.tag,
        });
      }}
    >
      <Form className={css.form}>
        <label className={css.formGroup}>
          Title
          <Field className={css.input} name="title" type="text" />
          <ErrorMessage className={css.error} component="span" name="title" />
        </label>

        <label className={css.formGroup}>
          Content
          <Field
            as="textarea"
            className={css.textarea}
            name="content"
            rows={8}
          />
          <ErrorMessage className={css.error} component="span" name="content" />
        </label>

        <label className={css.formGroup}>
          Tag
          <Field as="select" className={css.select} name="tag">
            {tags.map(tagItem => (
              <option key={tagItem} value={tagItem}>
                {tagItem}
              </option>
            ))}
          </Field>
          <ErrorMessage className={css.error} component="span" name="tag" />
        </label>

        <div className={css.actions}>
          <button className={css.cancelButton} type="button" onClick={onCancel}>
            Cancel
          </button>
          <button
            className={css.submitButton}
            type="submit"
            disabled={createMutation.isPending}
          >
            Create
          </button>
        </div>
      </Form>
    </Formik>
  );
}
