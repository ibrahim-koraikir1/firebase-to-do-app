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

      
  const handelsubmit = (e)=>{
      e.preventDefault()
  }
  return (
    <div className="app">
       <h1> to do lest app </h1>
       <form className="form"  onSubmit={handelsubmit}>
         <div className="add">
            <input type='text' placeholder="add to do" ></input>
            <button >+</button> 
         </div>

         <div className="">
            {todo.map((todo)=>
            <Todo todo={todo} toggleComplete={toggleComplete}/>
             
            )}
         </div>
          
       </form>
    </div>
  );
}

export default App;
