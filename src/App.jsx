import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [users, myUser] = useState([]);
  const [studySessions, myStudySession] = useState([]);
  const [sessionNotes, session__notes] = useState([]);
  
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [newSession, setNewSession] = useState({ title: '', date: '', duration: '', user_id: '' });
  const [newNote, setNewNote] = useState({ note_context: '', session_id: '' });

  const [editUser, setEditUser] = useState(null);
  const [editSession, setEditSession] = useState(null);
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const usersResponse = await fetch('http://127.0.0.1:8001/users/');
    const sessionsResponse = await fetch('http://127.0.0.1:8001/study_sessions/');
    const notesResponse = await fetch('http://127.0.0.1:8001/session_notes/');
    
    const usersData = await usersResponse.json();
    const sessionsData = await sessionsResponse.json();
    const notesData = await notesResponse.json();

    myUser(usersData);
    myStudySession(sessionsData);
    session__notes(notesData);
  };

  // Add functionality
  const handleAddUser = async () => {
    const response = await fetch('http://127.0.0.1:8001/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });

    if (response.ok) {
      fetchData();
      setNewUser({ name: '', email: '', password: '' });
    }
  };

  const handleAddSession = async () => {
    const response = await fetch('http://127.0.0.1:8001/study_sessions/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSession)
    });

    if (response.ok) {
      fetchData();
      setNewSession({ title: '', date: '', duration: '', user_id: '' });
    }
  };

  const handleAddNote = async () => {
    const response = await fetch('http://127.0.0.1:8001/session_notes/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote)
    });

    if (response.ok) {
      fetchData();
      setNewNote({ note_context: '', session_id: '' });
    }
  };

  // Update functionality
  const handleUpdateUser = async () => {
    if (!editUser) return;
    const response = await fetch(`http://127.0.0.1:8001/users/${editUser.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editUser)
    });

    if (response.ok) {
      fetchData();
      setEditUser(null);
    }
  };

  const handleUpdateSession = async () => {
    if (!editSession) return;
    const response = await fetch(`http://127.0.0.1:8001/study_sessions/${editSession.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editSession)
    });

    if (response.ok) {
      fetchData();
      setEditSession(null);
    }
  };

  const handleUpdateNote = async () => {
    if (!editNote) return;
    const response = await fetch(`http://127.0.0.1:8001/session_notes/${editNote.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editNote)
    });

    if (response.ok) {
      fetchData();
      setEditNote(null);
    }
  };

  // Delete functionality
  const handleDeleteUser = async (userId) => {
    const response = await fetch(`http://127.0.0.1:8001/users/${userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchData();
    }
  };

  const handleDeleteSession = async (sessionId) => {
    const response = await fetch(`http://127.0.0.1:8001/study_sessions/${sessionId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchData();
    }
  };

  const handleDeleteNote = async (noteId) => {
    const response = await fetch(`http://127.0.0.1:8001/session_notes/${noteId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchData();
    }
  };

  // Forms
  return (
    <div className="container">
      <h1  style={{color:'brown'}}>Manage Users, Study Sessions, and Notes</h1>

      {/* Add User Form */}
      <div>
        <h2 style={{color:'brown'}}>Add User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      {/* Update User Form */}
      {editUser && (
        <div>
          <h2 style={{color:'brown'}}>Edit User</h2>
          <input
            type="text"
            value={editUser.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
          />
          <input
            type="email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
          <input
            type="password"
            value={editUser.password}
            onChange={(e) => setEditUser({ ...editUser, password: e.target.value })}
          />
          <button onClick={handleUpdateUser}>Update User</button>
        </div>
      )}

      {/* Display Users */}
      <div>
        <h2 style={{color:'brown'}}>Users</h2>
        {users.map((user) => (
          <div key={user.id} className="card">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <button onClick={() => setEditUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Add Study Session Form */}
      <div>
        <h2 style={{color:'brown'}}>Add Study Session</h2>
        <input
          type="text"
          placeholder="Session Title"
          value={newSession.title}
          onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
        />
        <input
          type="date"
          value={newSession.date}
          onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
        />
        <input
          type="number"
          placeholder="Duration (min)"
          value={newSession.duration}
          onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
        />
        <input
          type="number"
          placeholder="User ID"
          value={newSession.user_id}
          onChange={(e) => setNewSession({ ...newSession, user_id: e.target.value })}
        />
        <button onClick={handleAddSession}>Add Session</button>
      </div>

      {/* Update Session Form */}
      {editSession && (
        <div>
          <h2 style={{color:'brown'}}>Edit Study Session</h2>
          <input
            type="text"
            value={editSession.title}
            onChange={(e) => setEditSession({ ...editSession, title: e.target.value })}
          />
          <input
            type="date"
            value={editSession.date}
            onChange={(e) => setEditSession({ ...editSession, date: e.target.value })}
          />
          <input
            type="number"
            value={editSession.duration}
            onChange={(e) => setEditSession({ ...editSession, duration: e.target.value })}
          />
          <input
            type="number"
            value={editSession.user_id}
            onChange={(e) => setEditSession({ ...editSession, user_id: e.target.value })}
          />
          <button onClick={handleUpdateSession}>Update Session</button>
        </div>
      )}

      {/* Display Study Sessions */}
      <div>
        <h2 style={{color:'brown'}}>Study Sessions</h2>
        {studySessions.map((session) => (
          <div key={session.id} className="card">
            <p>{session.title}</p>
            <p>{session.date}</p>
            <p>Duration: {session.duration} min</p>
            <button onClick={() => setEditSession(session)}>Edit</button>
            <button onClick={() => handleDeleteSession(session.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Add Session Note Form */}
      <div>
        <h2 style={{color:'brown'}}>Add Session Note</h2>
        <textarea
          placeholder="Note Content"
          value={newNote.note_context}
          onChange={(e) => setNewNote({ ...newNote, note_context: e.target.value })}
        />
        <input
          type="number"
          placeholder="Session ID"
          value={newNote.session_id}
          onChange={(e) => setNewNote({ ...newNote, session_id: e.target.value })}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      {/* Update Note Form */}
      {editNote && (
        <div>
          <h2 style={{color:'brown'}}>Edit Note</h2>
          <textarea
            value={editNote.note_context}
            onChange={(e) => setEditNote({ ...editNote, note_context: e.target.value })}
          />
          <input
            type="number"
            value={editNote.session_id}
            onChange={(e) => setEditNote({ ...editNote, session_id: e.target.value })}
          />
          <button onClick={handleUpdateNote}>Update Note</button>
        </div>
      )}

      {/* Display Session Notes */}
      <div>
        <h2 style={{color:'brown'}}>Session Notes</h2>
        {sessionNotes.map((note) => (
          <div key={note.id} className="card">
            <p>{note.note_context}</p>
            <button onClick={() => setEditNote(note)}>Edit</button>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
