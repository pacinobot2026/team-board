'use client';

import { useState } from 'react';
import NavigationSidebar from './components/NavigationSidebar';

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
    // TODO - Team Tasks
    { id: '1', title: 'Migrate PopLinks database to AWS RDS', status: 'todo', type: 'team', assignee: 'Gaurav' },
    { id: '2', title: 'Set up SSL certificates for new domains', status: 'todo', type: 'team', assignee: 'Pranay' },
    { id: '3', title: 'Configure Cloudflare DNS for mintbird.com', status: 'todo', type: 'team', assignee: 'Dev Team' },
    { id: '4', title: 'Update Course Sprout API rate limiting', status: 'todo', type: 'team', assignee: 'Backend Team' },
    
    // TODO - OpenClaw Tasks
    { id: '5', title: 'Add Docker container support for OpenClaw', status: 'todo', type: 'openclaw', assignee: 'Gaurav' },
    { id: '6', title: 'Build agent marketplace integration', status: 'todo', type: 'openclaw', assignee: 'Pacino' },
    { id: '7', title: 'Implement session memory persistence', status: 'todo', type: 'openclaw', assignee: 'Dev Team' },
    
    // IN PROGRESS - Team Tasks
    { id: '8', title: 'Deploy Global Control Center v2.1', status: 'in-progress', type: 'team', assignee: 'Pranay' },
    { id: '9', title: 'Fix Letterman image upload bug', status: 'in-progress', type: 'team', assignee: 'Frontend Team' },
    { id: '10', title: 'Optimize MintBird funnel loading speed', status: 'in-progress', type: 'team', assignee: 'Gaurav' },
    { id: '11', title: 'Configure backup server in Singapore', status: 'in-progress', type: 'team', assignee: 'DevOps' },
    
    // IN PROGRESS - OpenClaw Tasks
    { id: '12', title: 'Build Chrome extension relay v2', status: 'in-progress', type: 'openclaw', assignee: 'Pacino' },
    { id: '13', title: 'Add multi-node support for agents', status: 'in-progress', type: 'openclaw', assignee: 'Dev Team' },
    { id: '14', title: 'Update OpenClaw docs for v1.5', status: 'in-progress', type: 'openclaw', assignee: 'Pacino' },
    
    // DONE - Team Tasks
    { id: '15', title: 'Renew coursesprout.com domain registration', status: 'done', type: 'team', assignee: 'Chad' },
    { id: '16', title: 'Set up monitoring for all VPS servers', status: 'done', type: 'team', assignee: 'DevOps' },
    { id: '17', title: 'Implement Vizard API integration', status: 'done', type: 'team', assignee: 'Pacino' },
    { id: '18', title: 'Deploy Article Board to production', status: 'done', type: 'team', assignee: 'Pacino' },
    
    // DONE - OpenClaw Tasks
    { id: '19', title: 'Add Telegram channel support', status: 'done', type: 'openclaw', assignee: 'Dev Team' },
    { id: '20', title: 'Build cron job scheduler UI', status: 'done', type: 'openclaw', assignee: 'Pacino' },
    { id: '21', title: 'Integrate Post Bridge API', status: 'done', type: 'openclaw', assignee: 'Pacino' },
    { id: '22', title: 'Create NavigationSidebar component', status: 'done', type: 'openclaw', assignee: 'Pacino' },
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
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <NavigationSidebar />
        <div className="min-h-screen bg-slate-900 flex items-center justify-center" style={{ flex: 1 }}>
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
      </div>
    );
  }

  const filteredTasks = tasks.filter(task => 
    filter === 'all' ? true : task.type === filter
  );

  const getTasksByStatus = (status: TaskStatus) => 
    filteredTasks.filter(task => task.status === status);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f172a' }}>
      <NavigationSidebar />
      <div className="min-h-screen bg-slate-900 p-8" style={{ flex: 1 }}>
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
                  <div key={task.id} className="bg-slate-700 p-3 rounded-lg hover:bg-slate-600 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.type === 'team' ? 'bg-purple-600' : 'bg-blue-600'
                      } text-white font-medium`}>
                        {task.type}
                      </span>
                      {task.assignee && (
                        <span className="text-xs text-slate-400">
                          {task.assignee}
                        </span>
                      )}
                    </div>
                    <p className="text-white text-sm leading-relaxed">{task.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
