import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, User, LogOut, Zap, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TaskItem } from '@/components/TaskItem';
import { AddTaskForm } from '@/components/AddTaskForm';
import { FilterTabs } from '@/components/FilterTabs';
import { AIPanel } from '@/components/AIPanel';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  category?: 'Work' | 'Personal' | 'Urgent';
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      text: 'Complete cyberpunk todo app',
      completed: false,
      createdAt: new Date(),
      category: 'Work'
    },
    {
      id: '2',
      text: 'Setup Supabase integration',
      completed: false,
      createdAt: new Date(),
      category: 'Work'
    },
    {
      id: '3',
      text: 'Add AI-powered features',
      completed: true,
      createdAt: new Date(),
      category: 'Personal'
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      activeFilter === 'all' || 
      (activeFilter === 'active' && !task.completed) ||
      (activeFilter === 'completed' && task.completed);
    
    return matchesSearch && matchesFilter;
  });

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
      category: 'Personal' // AI will suggest category later
    };
    setTasks([newTask, ...tasks]);
    setShowAddForm(false);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id: string, newText: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  return (
    <div className="min-h-screen bg-cyber-bg relative overflow-hidden">
      {/* Cyberpunk Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-pink/5" />
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-neon animate-glow-pulse" />
      
      {/* Header */}
      <header className="relative z-10 px-6 py-4 border-b border-cyber-border/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap className="w-8 h-8 text-neon-blue animate-cyber-flicker" />
            <h1 className="text-2xl font-bold gradient-text">CyberTasks</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="cyber-border text-neon-blue">
              <Brain className="w-4 h-4 mr-1" />
              AI Ready
            </Badge>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-neon-pink">
              <User className="w-4 h-4 mr-2" />
              Connect Supabase
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Task Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 cyber-border bg-cyber-surface/50 backdrop-blur-sm"
                />
              </div>
              
              <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            </div>

            {/* Task List */}
            <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    {activeFilter === 'all' && 'All Tasks'}
                    {activeFilter === 'active' && 'Active Tasks'}
                    {activeFilter === 'completed' && 'Completed Tasks'}
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({filteredTasks.length})
                    </span>
                  </h2>
                </div>

                <div className="space-y-3">
                  {filteredTasks.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No tasks found</p>
                      <p className="text-sm mt-1">
                        {searchQuery ? 'Try a different search term' : 'Add your first task to get started'}
                      </p>
                    </div>
                  ) : (
                    filteredTasks.map((task, index) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                        onEdit={editTask}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        className="animate-slide-up"
                      />
                    ))
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* AI Suggestions Panel */}
          <div className="lg:col-span-1">
            <AIPanel tasks={tasks} />
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <Button
        onClick={() => setShowAddForm(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full floating-action border-none text-cyber-bg hover:text-cyber-bg z-50"
        size="icon"
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Add Task Modal */}
      {showAddForm && (
        <AddTaskForm
          onAdd={addTask}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {/* Supabase Connection Notice */}
      <div className="fixed bottom-4 left-4 max-w-sm">
        <Card className="cyber-border bg-cyber-surface/90 backdrop-blur-sm border-neon-blue/30">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-neon-blue rounded-full animate-glow-pulse" />
              <span className="text-sm font-medium text-neon-blue">Backend Ready</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Connect to Supabase for authentication, real-time sync, and AI features.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;