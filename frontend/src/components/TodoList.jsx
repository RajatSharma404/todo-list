import React from 'react';
import { useTodo } from '../context/TodoContext';
import TodoItem from './TodoItem';
import FilterBar from './FilterBar';

const TodoList = () => {
  const { todos, loading } = useTodo();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 text-lg mb-2">
          No tasks found
        </div>
        <div className="text-gray-400 dark:text-gray-500">
          Add your first task to get started!
        </div>
      </div>
    );
  }

  return (
    <div>
      <FilterBar />
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
