import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FilterTabsProps {
  activeFilter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all' as const, label: 'All', description: 'Show all tasks' },
    { id: 'active' as const, label: 'Active', description: 'Show pending tasks' },
    { id: 'completed' as const, label: 'Completed', description: 'Show finished tasks' }
  ];

  return (
    <div className="flex space-x-1 p-1 bg-cyber-surface/30 rounded-lg border border-cyber-border/50 backdrop-blur-sm">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "flex-1 relative transition-all duration-300 text-sm font-medium",
            activeFilter === filter.id
              ? "bg-gradient-neon text-cyber-bg shadow-glow-blue/50 hover:text-cyber-bg"
              : "text-muted-foreground hover:text-foreground hover:bg-cyber-surface/50"
          )}
          title={filter.description}
        >
          {filter.label}
          {activeFilter === filter.id && (
            <div className="absolute inset-0 rounded-lg border border-neon-blue/30 pointer-events-none" />
          )}
        </Button>
      ))}
    </div>
  );
};