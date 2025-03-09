
import React, { useState } from 'react';
import { Check, ChevronDown, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useInView } from '../lib/animations';

// Filter categories and options
const filterOptions = {
  businessType: [
    { id: 'retail', label: 'Retail' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'finance', label: 'Finance' },
    { id: 'education', label: 'Education' },
    { id: 'technology', label: 'Technology' }
  ],
  businessGoal: [
    { id: 'automation', label: 'Automation' },
    { id: 'customer-support', label: 'Customer Support' },
    { id: 'data-analysis', label: 'Data Analysis' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'productivity', label: 'Productivity' }
  ],
  complexity: [
    { id: 'low', label: 'Low' },
    { id: 'medium', label: 'Medium' },
    { id: 'high', label: 'High' }
  ],
  status: [
    { id: 'active', label: 'Active' },
    { id: 'development', label: 'In Development' },
    { id: 'planned', label: 'Planned' },
    { id: 'concept', label: 'Concept' }
  ]
};

const SolutionsFilter = () => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    businessType: [],
    businessGoal: [],
    complexity: [],
    status: []
  });
  
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const handleFilterChange = (category: string, value: string) => {
    setActiveFilters(prev => {
      const categoryFilters = [...prev[category]];
      
      // Toggle the filter value
      const index = categoryFilters.indexOf(value);
      if (index === -1) {
        categoryFilters.push(value);
      } else {
        categoryFilters.splice(index, 1);
      }
      
      return {
        ...prev,
        [category]: categoryFilters
      };
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      businessType: [],
      businessGoal: [],
      complexity: [],
      status: []
    });
  };

  const hasActiveFilters = Object.values(activeFilters).some(category => category.length > 0);

  const FilterPopover = ({ category, title }: { category: string; title: string }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className={cn(
            "flex items-center gap-2 hover:bg-accent transition-all duration-300",
            activeFilters[category].length > 0 && "bg-accent border-accent text-accent-foreground"
          )}
        >
          {title}
          {activeFilters[category].length > 0 && (
            <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {activeFilters[category].length}
            </span>
          )}
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <div className="space-y-2">
          <div className="font-medium text-sm">{title}</div>
          <div className="space-y-1">
            {filterOptions[category as keyof typeof filterOptions].map(option => (
              <div 
                key={option.id}
                className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-muted cursor-pointer text-sm"
                onClick={() => handleFilterChange(category, option.id)}
              >
                <div className={cn(
                  "w-4 h-4 border rounded-sm flex items-center justify-center transition-colors",
                  activeFilters[category].includes(option.id) 
                    ? "bg-primary border-primary" 
                    : "border-input"
                )}>
                  {activeFilters[category].includes(option.id) && (
                    <Check className="h-3 w-3 text-primary-foreground" />
                  )}
                </div>
                {option.label}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div 
      ref={ref}
      className={`mb-12 transition-all duration-700 delay-200 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-medium">Find Your Solution</h2>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            className="text-muted-foreground gap-2"
            onClick={clearFilters}
          >
            <X size={16} />
            Clear Filters
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3">
        <FilterPopover category="businessType" title="Business Type" />
        <FilterPopover category="businessGoal" title="Business Goal" />
        <FilterPopover category="complexity" title="Complexity" />
        <FilterPopover category="status" title="Status" />
      </div>
      
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([category, values]) => (
            values.map(value => {
              const option = filterOptions[category as keyof typeof filterOptions].find(opt => opt.id === value);
              if (!option) return null;
              
              return (
                <div 
                  key={`${category}-${value}`}
                  className="flex items-center gap-1.5 text-xs py-1 px-2.5 rounded-full bg-muted hover:bg-muted/80 transition-colors cursor-pointer"
                  onClick={() => handleFilterChange(category, value)}
                >
                  {option.label}
                  <X size={12} />
                </div>
              );
            })
          ))}
        </div>
      )}
    </div>
  );
};

export default SolutionsFilter;
