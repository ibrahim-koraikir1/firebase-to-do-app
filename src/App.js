import React , { useState , useEffect} from "react";
import {
  query,
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
 
} from 'firebase/firestore';
import { storage } from "./firebase.config";
import Todo from "./Todo";
function App() {
   
  const [todo , settodo] = useState([])
  const [input, setInput] = useState('');

 // Create todo
 const createTodo = async (e) => {
  e.preventDefault(e);
  if (input === '') {
    alert('Please enter a valid todo');
    return;
  }
  await addDoc(collection(storage, 'todos'), {
    text: input,
    completed: false,
  });
  setInput('');
};
 
  
  useEffect(()=> {
   const  q = query(collection(storage , 'todo'))
   const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let todosArr = [];
    querySnapshot.forEach((doc) => {
      todosArr.push({ ...doc.data(), id: doc.id });
    });
    settodo(todosArr);
  });
  return () => unsubscribe();
  },   
  [])
    
  const toggleComplete = async (todo) => {
    await updateDoc(doc(storage, 'todo', todo.id), {
      completed: !todo.completed,
    });
  };

        // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(storage, 'todos', id));
  };
 
  return (
    <div className="app">
       <h1> to do lest app </h1>
       <form className="form"  onSubmit={createTodo}>
         <div className="add">
            <input 
            type='text' 
            placeholder="add to do" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ></input>
            <button >+</button> 
         </div>

         <div className="">
            {todo.map((todo)=>
            <Todo todo={todo}   deleteTodo={deleteTodo} toggleComplete={toggleComplete}/>
             
            )}
         </div>
          
       </form>
    </div>
  );
}

export default App;
