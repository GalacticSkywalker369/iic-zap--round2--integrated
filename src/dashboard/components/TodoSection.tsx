import React, { useState } from 'react';
import { Plus, Check, Bell, X, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  reminder?: string;
  priority: 'low' | 'medium' | 'high';
}

const TodoSection = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: 'Check irrigation system', completed: false, reminder: 'Tomorrow 8:00 AM', priority: 'high' },
    { id: 2, text: 'Apply fertilizer to wheat crops', completed: false, reminder: 'Today 6:00 PM', priority: 'medium' },
    { id: 3, text: 'Inspect for pest damage', completed: true, priority: 'high' },
    { id: 4, text: 'Order seeds for next season', completed: false, priority: 'low' }
  ]);
  
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false,
        priority: 'medium'
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-700 border-red-500/30';
      case 'medium': return 'bg-farm-accent/20 text-orange-700 border-farm-accent/30';
      case 'low': return 'bg-farm-secondary/20 text-green-700 border-farm-secondary/30';
      default: return 'bg-muted';
    }
  };

  return (
    <section id="reminders" className="py-20 bg-gradient-to-br from-farm-light/10 to-farm-highlight/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 brand-gradient">Farming Tasks & Reminders</h2>
            <p className="text-xl text-muted-foreground">
              Stay organized with your daily farming activities
            </p>
          </div>

          <div className="feature-card shadow-elegant">
            <div className="flex gap-3 mb-8">
              <Input
                placeholder="Add a new farming task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                className="flex-1 h-12 transition-smooth focus:shadow-brand"
              />
              <Button 
                onClick={addTodo}
                className="h-12 px-6 transition-bounce hover-lift glow-primary"
                disabled={!newTodo.trim()}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover-lift ${
                    todo.completed 
                      ? 'bg-muted/50 border-muted' 
                      : 'bg-card border-border hover:border-primary/30'
                  }`}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      todo.completed
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-muted-foreground hover:border-primary'
                    }`}
                  >
                    {todo.completed && <Check className="h-4 w-4" />}
                  </Button>

                  <div className="flex-1">
                    <div className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {todo.text}
                    </div>
                    {todo.reminder && (
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Bell className="h-3 w-3" />
                        {todo.reminder}
                      </div>
                    )}
                  </div>

                  <Badge className={`${getPriorityColor(todo.priority)} text-xs`}>
                    {todo.priority}
                  </Badge>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="hover-lift">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => deleteTodo(todo.id)}
                      className="hover-lift text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {todos.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <div className="text-6xl mb-4">🌱</div>
                <p>No tasks yet. Add your first farming reminder!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodoSection;


