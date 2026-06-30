import axios, { type AxiosResponse } from 'axios';
import type { Note, NoteTag } from '@/types/note';

const noteHubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

noteHubApi.interceptors.request.use(config => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function fetchNotes(
  params: FetchNotesParams
): Promise<NotesResponse> {
  const response: AxiosResponse<NotesResponse> = await noteHubApi.get(
    '/notes',
    {
      params: {
        page: params.page,
        perPage: params.perPage,
        search: params.search || undefined,
      },
    }
  );

  return response.data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response: AxiosResponse<Note> = await noteHubApi.post(
    '/notes',
    payload
  );

  return response.data;
}

export async function deleteNote(noteId: Note['id']): Promise<Note> {
  const response: AxiosResponse<Note> = await noteHubApi.delete(
    `/notes/${noteId}`
  );

  return response.data;
}

export async function fetchNoteById(noteId: Note['id']): Promise<Note> {
  const response: AxiosResponse<Note> = await noteHubApi.get(
    `/notes/${noteId}`
  );

  return response.data;
}
