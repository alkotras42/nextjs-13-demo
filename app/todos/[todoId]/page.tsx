import React from 'react';
import {Todo} from '../../../typings';

export interface TodoPageProps {
  params: {
    todoId: string;
  };
}

const fetchTodo = async (todoId: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
    // ISR
    next: {
      revalidate: 60,
    },
  });
  const todo: Todo = await res.json();
  return todo;
};

async function TodoPage({params: {todoId}}: TodoPageProps) {
  const todo = await fetchTodo(todoId);

  return (
    <div className='p-10 bg-yellow-200 border-2 m-2 shadow-lg'>
      <p>
        #{todo.id}: {todo.title}
      </p>
      <p>Completed: {todo.completed ? 'Yes' : 'No'} </p>
      <p className='border-t border-black mt-5 text-right'>By User: {todo.userId}</p>
    </div>
  );
}

export default TodoPage

export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos: Todo[] = await res.json();

  // Avoid rate limit by API
  const trimmedTodos = todos.splice(0, 10);

  return todos.map((todo) => ({
    todoId: todo.id.toString(),
  }));
}
