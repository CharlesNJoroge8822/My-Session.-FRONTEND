import React, { useState, useEffect } from 'react';
import './App.css'

const App = () => {
  const [users, myUser] = useState([]);
  const [studySessions, myStudySession] = useState([]);
  const [sessionNotes, session__notes] = useState([]);
  
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [newSession, setNewSession] = useState({ title: '', date: '', duration: '', user_id: '' });
  const [newNote, setNewNote] = useState({ note_context: '', session_id: '' });

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

  return (
    <div className="container">
      <h1>Manage Users, Study Sessions, and Notes</h1>

      <div>
        <h2>Add User</h2>
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

      <div>
        <h2>Users</h2>
        {users.map((user) => (
          <div key={user.id} className="card">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </div>

      <div>
        <h2>Add Study Session</h2>
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

      <div>
        <h2>Study Sessions</h2>
        {studySessions.map((session) => (
          <div key={session.id} className="card">
            <p>{session.title}</p>
            <p>{session.date}</p>
            <p>Duration: {session.duration} min</p>
            <button onClick={() => handleDeleteSession(session.id)}>Delete</button>
          </div>
        ))}
      </div>

      <div>
        <h2>Add Session Note</h2>
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

      <div>
        <h2>Session Notes</h2>
        {sessionNotes.map((note) => (
          <div key={note.id} className="card">
            <p>{note.note_context}</p>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
