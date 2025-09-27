import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../api/authenticate'

const Home = ({createdNote}) => {
  const baseURL= 'http://127.0.0.1:8000/api'
  const {user, loginUser, authToken}= useContext(AuthContext)
  const [notes, setNotes]= useState([])
  const [content, setContent]= useState("")
  const [title, setTitle]= useState("")

  useEffect(() => {
    document.title = "Home | My App";
  }, []);

  useEffect(() => {
    if (user) {
      getNotes()
    }
  }, [user])

  // we are using permission_classes in views.py for this request, so we 1st have to check if user is logged in
  const getNotes= async ()=> {
      try {
        const authToken = localStorage.getItem('authToken');
        const authData = JSON.parse(authToken);
        const accessToken = authData.access;

        const check= await fetch(`${baseURL}/create/`, {
          method: 'GET',
          headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${accessToken}`,
          }
        })

        if (!check) {
          throw new Error(`Something went wrong. ${check.status}`)
        }

        const data= await check.json()
        setNotes(data)
        console.log(data)
      }

      catch (error) {
        console.error("Something wennt wrong. Error:", error)
      }
  }

  const createNotes= async (e)=> {
    e.preventDefault()
      try {
        const authToken = localStorage.getItem('authToken');
        const authData = JSON.parse(authToken);
        const accessToken = authData.access;
        
        const check= await fetch(`${baseURL}/create/`, {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${accessToken}`,
          },
          body: JSON.stringify({title, content})
        })

        if (check.status===201) {
          const data= await check.json()
          console.log("Notes are: ", data)
          setTitle("")
          setContent("")
          setNotes((prevNotes)=> [...prevNotes, data]);

          if (createdNote) {
            createdNote(data)
          }
        }
        else {
          const errorData = await check.json();
          console.error("Error:", errorData);
          alert("Failed to create note");
        }
      }

      catch (error) {
        console.error("Something wennt wrong. Error:", error)
      }
  }

  const deleteNotes= async (id)=> {
    try {
        const authToken = localStorage.getItem('authToken');
        const authData = JSON.parse(authToken);
        const accessToken = authData.access;

        const check= await fetch(`${baseURL}/delete/${id}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${accessToken}`
          }
        })

        if (check.status===204) {
          alert("Note deleted.")
          setNotes(notes.filter((note)=> note.id !== id))
        }
    }
    
    catch (error) {
      console.error("Something wennt wrong. Error:", error)
    }
  }

  return (
        <div className="bg-light py-3 min-vh-100">
            <div className="container">
                
                <header className="mb-3 p-2 bg-white rounded-2 shadow-sm border-start border-5 border-primary">
                    <h1 className="display-7 fw-bold text-dark">
                        Notes Dashboard
                    </h1>
                    <p className="lead text-secondary">
                        Welcome, <span className="text-primary fw-bold">{user?.username || loginUser?.email || "User"}</span>
                    </p>
                </header>

                <div className="row g-4">
                    
                    <div className="col-lg-4">
                        <div className="card shadow sticky-top" style={{ top: '20px' }}>
                            <div className="card-body p-4">
                                <h2 className="card-title h4 fw-bold mb-3 border-bottom pb-2">
                                    Create New Note
                                </h2>
                                <form onSubmit={createNotes}>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                            className="form-control form-control-lg rounded-3"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            placeholder="Content"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            required
                                            className="form-control rounded-3"
                                            rows={5}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-md w-100 rounded-3 shadow"
                                    >
                                        Add Note
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <h2 className="h4 fw-bold mb-4 text-dark">Your Notes ({notes.length})</h2>
                        
                        {notes.length > 0 ? (
                            <div className="list-group">
                                {notes.map((note) => (
                                    <div
                                        key={note.id}
                                        className="list-group-item list-group-item-action mb-3 p-4 rounded-3 shadow-sm d-flex justify-content-between align-items-start border-start border-4 border-success"
                                    >
                                        <div>
                                            <h3 className="h6 fw-bold text-dark mb-1">{note.title}</h3>
                                            <p className="mb-0 text-secondary small" style={{ whiteSpace: 'pre-wrap' }}>{note.content}</p>
                                        </div>
                                        
                                        <button
                                            onClick={() => deleteNotes(note.id)}
                                            className="btn btn-danger btn-sm ms-3 flex-shrink-0 rounded-pill"
                                            title="Delete Note"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13V3a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v1H1.5a1 1 0 0 1 0-2h13a1 1 0 0 1 1 1v1zM11 2H5a1 1 0 0 0-1 1v1h8V3a1 1 0 0 0-1-1zM2 5v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5H2z"/>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-5 text-center bg-white rounded-3 shadow-sm border border-dashed border-secondary">
                                <p className="lead text-secondary mb-0">No notes yet. Start writing your first note!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home