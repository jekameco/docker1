import { useEffect, useState } from 'react';
import { usersApi, User } from './api/users';
import './App.css';

const emptyForm = { nombre: '', correo: '' };

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudieron cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (editingId) {
        await usersApi.update(editingId, form);
      } else {
        await usersApi.create(form);
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el usuario');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setForm({ nombre: user.nombre, correo: user.correo });
    setError(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este usuario?')) return;

    try {
      setError(null);
      await usersApi.remove(id);

      if (editingId === id) {
        setEditingId(null);
        setForm(emptyForm);
      }

      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el usuario');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Gestión de Usuarios</h1>
        <p>Base de datos: docker1 · Tabla: users</p>
      </header>

      <main className="content">
        <section className="card form-card">
          <h2>{editingId ? 'Actualizar usuario' : 'Registrar usuario'}</h2>
          <form onSubmit={handleSubmit} className="form">
            <label>
              Nombre
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Nombre completo"
                required
              />
            </label>
            <label>
              Correo
              <input
                type="email"
                value={form.correo}
                onChange={(e) => setForm({ ...form, correo: e.target.value })}
                placeholder="correo@ejemplo.com"
                required
              />
            </label>
            <div className="form-actions">
              <button type="submit" disabled={submitting}>
                {submitting ? 'Guardando...' : editingId ? 'Actualizar' : 'Registrar'}
              </button>
              {editingId && (
                <button type="button" className="secondary" onClick={handleCancel}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="card list-card">
          <div className="list-header">
            <h2>Lista de usuarios</h2>
            <button type="button" className="secondary" onClick={loadUsers}>
              Recargar
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          {loading ? (
            <p className="muted">Cargando usuarios...</p>
          ) : users.length === 0 ? (
            <p className="muted">No hay usuarios registrados.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nombre}</td>
                    <td>{user.correo}</td>
                    <td className="actions">
                      <button type="button" onClick={() => handleEdit(user)}>
                        Editar
                      </button>
                      <button
                        type="button"
                        className="danger"
                        onClick={() => handleDelete(user.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
