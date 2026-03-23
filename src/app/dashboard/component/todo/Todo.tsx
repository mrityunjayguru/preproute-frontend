"use client"

import TaskForm from "./Component/TodoForm"
import TodosTable from "./Component/TodosTable"

function Todo() {
  return (
    <div className='min-h-screen'>
     <div className="mx-10">
      <TaskForm/>
      <TodosTable/>
     </div>
    </div>
  )
}

export default Todo
