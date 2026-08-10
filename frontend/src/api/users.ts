export interface User {
  id: number;
  nombre: string;
  correo: string;
  createdAt?: string;
}

export interface CreateUserPayload {
  nombre: string;
  correo: string;
}

export interface UpdateUserPayload {
  nombre?: string;
  correo?: string;
}

const API_BASE = '/api/users';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message?.[0] || error.message || 'Error en la solicitud');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const usersApi = {
  getAll: () => fetch(API_BASE).then(handleResponse<User[]>),

  create: (data: CreateUserPayload) =>
    fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse<User>),

  update: (id: number, data: UpdateUserPayload) =>
    fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse<User>),

  remove: (id: number) =>
    fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    }).then(handleResponse<void>),
};
