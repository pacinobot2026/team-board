'use client';

import { useState } from 'react';

type TaskType = 'team' | 'openclaw';
type TaskStatus = 'todo' | 'in-progress' | 'done';

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  type: TaskType;
  assignee?: string;
}

const PASSWORD = 'chad2026';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<TaskType | 'all'>('all');
  const [tasks] = useState<Task[]>([
    { id: '1', title: 'Sample Team Task', status: 'todo', type: 'team' },
    { id: '2', title: 'Sample OpenClaw Task', status: 'in-progress', type: 'openclaw' },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Wrong password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-lg shadow-xl w-80">
          <h2 className="text-2xl font-bold text-white mb-4">Team Board</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full bg-slate-700 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  const filteredTasks = tasks.filter(task => 
    filter === 'all' ? true : task.type === filter
  );

  const getTasksByStatus = (status: TaskStatus) => 
    filteredTasks.filter(task => task.status === status);

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Team Project Board</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-slate-400 hover:text-white"
          >
            Logout
          </button>
        </div>

        {/* Filter Toggle */}
        <div className="flex gap-2 mb-8">
          {(['all', 'team', 'openclaw'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {f === 'all' ? 'All Tasks' : f === 'team' ? 'Team' : 'OpenClaw'}
            </button>
          ))}
        </div>

        {/* Kanban Columns */}
        <div className="grid grid-cols-3 gap-6">
          {(['todo', 'in-progress', 'done'] as const).map((status) => (
            <div key={status} className="bg-slate-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-white mb-4 capitalize">
                {status.replace('-', ' ')}
              </h2>
              <div className="space-y-3">
                {getTasksByStatus(status).map((task) => (
                  <div key={task.id} className="bg-slate-700 p-3 rounded-lg">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.type === 'team' ? 'bg-purple-600' : 'bg-blue-600'
                    } text-white`}>
                      {task.type}
                    </span>
                    <p className="text-white mt-2">{task.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
