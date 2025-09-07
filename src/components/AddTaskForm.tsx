import React, { useState, useEffect } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AddTaskFormProps {
  onAdd: (text: string) => void;
  onClose: () => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd, onClose }) => {
  const [taskText, setTaskText] = useState('');
  const [suggestedCategory, setSuggestedCategory] = useState<string | null>(null);

  // Simple AI-like category suggestion (will be replaced with real AI later)
  const suggestCategory = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('work') || lowerText.includes('project') || lowerText.includes('meeting')) {
      setSuggestedCategory('Work');
    } else if (lowerText.includes('urgent') || lowerText.includes('asap') || lowerText.includes('important')) {
      setSuggestedCategory('Urgent');
    } else {
      setSuggestedCategory('Personal');
    }
  };

  useEffect(() => {
    if (taskText.length > 5) {
      suggestCategory(taskText);
    } else {
      setSuggestedCategory(null);
    }
  }, [taskText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAdd(taskText.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md cyber-border bg-cyber-surface/95 backdrop-blur-sm animate-slide-up">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Plus className="w-5 h-5 text-neon-blue" />
              <h3 className="text-lg font-semibold">Add New Task</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="w-8 h-8 p-0 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="What needs to be done?"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="cyber-border bg-cyber-bg/50 text-foreground placeholder:text-muted-foreground"
                autoFocus
              />
              
              {/* AI Category Suggestion */}
              {suggestedCategory && (
                <div className="flex items-center space-x-2 p-2 rounded-lg bg-cyber-bg/30 border border-neon-blue/20">
                  <Sparkles className="w-4 h-4 text-neon-blue animate-cyber-flicker" />
                  <span className="text-sm text-muted-foreground">AI suggests:</span>
                  <Badge variant="outline" className="text-neon-blue border-neon-blue">
                    {suggestedCategory}
                  </Badge>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="flex-1 cyber-border hover:bg-cyber-surface"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!taskText.trim()}
                className="flex-1 bg-gradient-neon hover:shadow-glow-blue text-cyber-bg hover:text-cyber-bg border-none"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </form>

          {/* Tips */}
          <div className="mt-6 p-3 rounded-lg bg-cyber-bg/20 border border-cyber-border/50">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Tip:</strong> Connect to Supabase for AI-powered task categorization and real-time sync across devices.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};