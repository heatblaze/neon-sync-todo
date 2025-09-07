import React from 'react';
import { Brain, TrendingUp, Calendar, Zap, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Task } from '@/pages/Index';

interface AIPanelProps {
  tasks: Task[];
}

export const AIPanel: React.FC<AIPanelProps> = ({ tasks }) => {
  const completedToday = tasks.filter(task => 
    task.completed && 
    task.createdAt.toDateString() === new Date().toDateString()
  ).length;

  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((tasks.filter(t => t.completed).length / totalTasks) * 100) : 0;

  const suggestions = [
    "Break down large tasks into smaller ones",
    "Set specific deadlines for better focus",
    "Group similar tasks together",
    "Take breaks between intensive work sessions"
  ];

  const insights = [
    {
      icon: TrendingUp,
      title: "Productivity Score",
      value: `${completionRate}%`,
      description: "Tasks completed overall",
      color: "text-neon-blue"
    },
    {
      icon: Calendar,
      title: "Today's Progress",
      value: completedToday.toString(),
      description: "Tasks completed today",
      color: "text-neon-pink"
    },
    {
      icon: Star,
      title: "Active Tasks",
      value: tasks.filter(t => !t.completed).length.toString(),
      description: "Tasks remaining",
      color: "text-neon-purple"
    }
  ];

  return (
    <div className="space-y-6">
      {/* AI Header */}
      <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Brain className="w-5 h-5 text-neon-blue animate-cyber-flicker" />
            <h3 className="font-semibold text-foreground">AI Insights</h3>
            <Badge variant="outline" className="text-xs text-neon-blue border-neon-blue">
              Beta
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Connect to Supabase to unlock AI-powered productivity insights and suggestions.
          </p>
        </div>
      </Card>

      {/* Quick Stats */}
      <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
        <div className="p-4">
          <h4 className="font-medium mb-4 text-foreground">Quick Stats</h4>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <insight.icon className={`w-4 h-4 ${insight.color}`} />
                  <span className="text-sm text-muted-foreground">{insight.title}</span>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${insight.color}`}>{insight.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* AI Suggestions */}
      <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-4 h-4 text-neon-pink" />
            <h4 className="font-medium text-foreground">AI Suggestions</h4>
          </div>
          
          <div className="space-y-3">
            {suggestions.slice(0, 2).map((suggestion, index) => (
              <div key={index} className="p-3 rounded-lg bg-cyber-bg/30 border border-cyber-border/50">
                <p className="text-sm text-muted-foreground">{suggestion}</p>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-4 text-neon-blue hover:text-neon-blue hover:bg-neon-blue/10"
            disabled
          >
            <Brain className="w-4 h-4 mr-2" />
            Get More AI Insights
          </Button>
        </div>
      </Card>

      {/* Daily Summary */}
      <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm">
        <div className="p-4">
          <h4 className="font-medium mb-3 text-foreground">Daily Summary</h4>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              You've completed <span className="text-neon-blue font-medium">{completedToday}</span> tasks today.
            </div>
            {completedToday > 0 && (
              <div className="text-sm text-muted-foreground">
                Great job! Keep up the momentum 🚀
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-4 text-neon-pink hover:text-neon-pink hover:bg-neon-pink/10"
            disabled
          >
            Generate Full Report
          </Button>
        </div>
      </Card>

      {/* Connection Status */}
      <Card className="cyber-border bg-cyber-surface/30 backdrop-blur-sm border-neon-blue/30">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-amber-500">AI Features Disabled</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Connect to Supabase to enable OpenAI-powered task categorization and productivity insights.
          </p>
          <Button size="sm" className="w-full bg-gradient-neon hover:shadow-glow-blue text-cyber-bg hover:text-cyber-bg">
            Connect Supabase
          </Button>
        </div>
      </Card>
    </div>
  );
};