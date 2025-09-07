import React, { useState } from 'react';
import { Check, Edit2, Trash2, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Task } from '@/pages/Index';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
  className,
  style
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'Work':
        return 'border-neon-blue text-neon-blue';
      case 'Personal':
        return 'border-neon-pink text-neon-pink';
      case 'Urgent':
        return 'border-destructive text-destructive';
      default:
        return 'border-muted-foreground text-muted-foreground';
    }
  };

  return (
    <Card 
      className={cn(
        "group cyber-border transition-all duration-300 hover:shadow-glow-blue/20",
        task.completed && "task-completed",
        className
      )}
      style={style}
    >
      <div className="p-4">
        <div className="flex items-center space-x-3">
          {/* Checkbox */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggle(task.id)}
            className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center p-0 transition-all duration-300",
              task.completed 
                ? "bg-neon-blue border-neon-blue text-cyber-bg hover:bg-neon-blue/80" 
                : "border-cyber-border hover:border-neon-blue hover:shadow-glow-blue/50"
            )}
          >
            {task.completed && <Check className="w-3 h-3" />}
          </Button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleSave}
                className="cyber-border bg-cyber-surface/50"
                autoFocus
              />
            ) : (
              <div className="space-y-2">
                <p className={cn(
                  "task-text text-sm font-medium transition-all duration-300",
                  task.completed && "line-through text-muted-foreground"
                )}>
                  {task.text}
                </p>
                
                <div className="flex items-center space-x-2">
                  {task.category && (
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs py-0 px-2", getCategoryColor(task.category))}
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {task.category}
                    </Badge>
                  )}
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    {task.createdAt.toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          {!isEditing && (
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="w-8 h-8 p-0 hover:text-neon-blue hover:bg-neon-blue/10"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.id)}
                className="w-8 h-8 p-0 hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};