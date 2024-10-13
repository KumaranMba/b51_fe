import axios from 'axios';
import React, { useState } from 'react';

function LoggedInPage({user,setUser,token,setToken,isRegister,setIsRegister}) {

  const [newNote,setNewNote] = useState('');
  const [notes,setNotes] = useState([]);

  const fetchNotes = async()=>{
    // prepare the token object
    const config = {
      headers:{
        'Authorization':`Bearer ${token}`
      }
    };

    console.log(`Fetching notes...`);
    try{
      const response= await axios.get(`http://localhost:3001/api/notes`,config);
      console.log(`Notes fetching successfully`);
      console.log('Note fetching successfully');
      console.log(response.data);
      setNotes(response.data);
    }catch(e) {
        console.log(`Error fetching notes`,e);
    }
  }

  useEffect(()=>{
    fetchNotes();
  },[])
    const onLogout = () =>{
        setUser(null);
        setToken(null);

        window.localStorage.removeItem('user');
        window.localStorage.removeItem('token');

        setIsRegister(true);
        fetchNotes();
    }
    
    const addNote = async (e) =>{
      e.preventDefault();

      // prepare the token object (authorization header)
        const config= {
          headers:{
            'Authorization':`Bearer ${token}`
          }
        };

        const newNoteObject = {
          content:newNote
        }

      console.log("Adding new note...");
      try{
        const response = await axios.post('http://localhost:3001/api/notes',newNoteObject,config);
        console.log('Note added successfully');
        console.log(response.data);
        setNewNote('');
      }catch(e){
        console.log(`Error adding note`,e); 
      }
    }
    
    
  return (
    <div>
       <p>welcome,{user.name} <button onClick={onLogout}>logout</button> </p>

      <form onSubmit={addNote}>
        <input
        type='text' 
        placeholder='Enter a new note...'
        value={newNote}
        onChange={(e)=>setNewNote(e.target.value)}
        required
         />
         <button type='submit'>Save</button>
      </form>

      <ul>{
        notes.map((note)=><li key={note._id}>{note.content}</li>)
      }</ul>

    </div>
  )
}

export default LoggedInPage;