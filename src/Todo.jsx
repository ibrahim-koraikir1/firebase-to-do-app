import React from 'react'

export default function Todo({todo , toggleComplete , deleteTodo}) {
  return (
    <div className='todo'>
    <li className={todo.completed ? 'completed list' : 'list'}>
        <input type='checkbox' onChange={()=> toggleComplete(todo)} />
        <p >{todo.text} </p>
        <button onClick={deleteTodo}>+</button>
    </li>
    </div>
  )
}
