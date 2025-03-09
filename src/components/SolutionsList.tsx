import React, { useState } from 'react';
import { LayoutGrid, LayoutList, Bookmark, Clock, ArrowRight, Lightbulb, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useInView } from '../lib/animations';
import { Vote } from './icons/CustomIcons';

// Sample solution data
const solutionsData = [
  {
    id: 1,
    title: 'AI Customer Support Agent',
    description: 'An AI-powered assistant that handles common customer inquiries 24/7, reducing response times and freeing up your team for complex issues.',
    imageUrl: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    tags: ['Retail', 'Customer Support', 'Automation'],
    status: 'active',
    businessTypes: ['retail', 'technology', 'finance'],
    businessGoals: ['customer-support', 'automation'],
    complexity: 'medium',
    implementationTime: '2-4 weeks',
    resourceRequirements: 'Minimal technical expertise required'
  },
  {
    id: 2,
    title: 'Predictive Inventory Management',
    description: 'Uses historical data and machine learning to predict optimal inventory levels, reducing stockouts and overstock situations.',
    imageUrl: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    tags: ['Retail', 'Data Analysis', 'Automation'],
    status: 'development',
    progress: 75,
    estimatedRelease: 'Q3 2023',
    businessTypes: ['retail'],
    businessGoals: ['automation', 'data-analysis'],
    complexity: 'high',
    implementationTime: '4-8 weeks',
    resourceRequirements: 'Integration with existing inventory systems'
  },
  {
    id: 3,
    title: 'Healthcare Appointment Scheduler',
    description: 'An intelligent scheduler that optimizes appointment times based on provider availability, patient preferences, and urgency of care.',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    tags: ['Healthcare', 'Automation', 'Productivity'],
    status: 'development',
    progress: 40,
    estimatedRelease: 'Q4 2023',
    businessTypes: ['healthcare'],
    businessGoals: ['automation', 'productivity'],
    complexity: 'medium',
    implementationTime: '3-6 weeks',
    resourceRequirements: 'Integration with existing calendar systems'
  },
  {
    id: 4,
    title: 'Financial Document Analyzer',
    description: 'Extracts key information from financial documents, categorizes data, and generates summary reports for easier decision-making.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1011&q=80',
    tags: ['Finance', 'Data Analysis', 'Automation'],
    status: 'active',
    businessTypes: ['finance'],
    businessGoals: ['data-analysis', 'automation'],
    complexity: 'high',
    implementationTime: '3-5 weeks',
    resourceRequirements: 'Document templates and sample data'
  },
  {
    id: 5,
    title: 'Educational Content Generator',
    description: 'AI-powered tool that creates educational content, quizzes, and learning materials based on curriculum requirements.',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    tags: ['Education', 'Productivity', 'Content'],
    status: 'planned',
    businessTypes: ['education'],
    businessGoals: ['productivity'],
    complexity: 'medium',
    implementationTime: 'TBD',
    resourceRequirements: 'Curriculum guidelines and learning objectives'
  },
  {
    id: 6,
    title: 'Voice-Activated Retail Assistant',
    description: 'In-store voice assistant that helps customers find products, check prices, and learn about promotions.',
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    tags: ['Retail', 'Customer Support', 'Innovation'],
    status: 'concept',
    businessTypes: ['retail'],
    businessGoals: ['customer-support'],
    complexity: 'high',
    implementationTime: 'TBD',
    resourceRequirements: 'Hardware installation and network infrastructure'
  }
];

type SolutionCardProps = {
  solution: typeof solutionsData[0];
  isListView: boolean;
};

const SolutionCard: React.FC<SolutionCardProps> = ({ solution, isListView }) => {
  const [expanded, setExpanded] = useState(false);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/80 hover:bg-green-500">Active</Badge>;
      case 'development':
        return <Badge className="bg-yellow-500/80 hover:bg-yellow-500">In Development</Badge>;
      case 'planned':
        return <Badge className="bg-blue-500/80 hover:bg-blue-500">Planned</Badge>;
      case 'concept':
        return <Badge variant="outline">Concept</Badge>;
      default:
        return null;
    }
  };

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "group glass-card overflow-hidden transition-all duration-500 hover:shadow-md",
        isListView ? "flex flex-col md:flex-row gap-6" : "flex flex-col",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div 
        className={cn(
          "overflow-hidden relative",
          isListView ? "md:w-1/3" : "w-full h-48"
        )}
      >
        <img 
          src={solution.imageUrl} 
          alt={solution.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          {getStatusBadge(solution.status)}
        </div>
      </div>
      
      <div className={cn(
        "flex flex-col",
        isListView ? "md:w-2/3 p-6" : "p-6"
      )}>
        <div className="flex flex-wrap gap-2 mb-3">
          {solution.tags.map(tag => (
            <span key={tag} className="text-xs bg-accent px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-medium mb-2">{solution.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{solution.description}</p>
        
        {solution.status === 'development' && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Development Progress</span>
              <span>{solution.progress}%</span>
            </div>
            <Progress value={solution.progress} className="h-1.5" />
            <div className="flex items-center text-xs mt-1 text-muted-foreground">
              <Clock size={12} className="mr-1" />
              Estimated release: {solution.estimatedRelease}
            </div>
          </div>
        )}
        
        <div className={cn(
          "mt-auto transition-all duration-300 overflow-hidden",
          expanded ? "max-h-96" : "max-h-0"
        )}>
          <div className="pt-4 border-t mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Implementation Time</p>
                <p className="text-sm font-medium flex items-center">
                  <Clock size={14} className="mr-1.5" />
                  {solution.implementationTime}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Complexity</p>
                <p className="text-sm font-medium capitalize">
                  {solution.complexity}
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-1">Resources Required</p>
              <p className="text-sm">{solution.resourceRequirements}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <Button 
            variant="ghost"
            size="sm"
            className="px-0 text-muted-foreground hover:text-foreground transition-colors text-xs"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Show Details"}
          </Button>
          
          <div>
            {solution.status === 'active' && (
              <Button size="sm" className="gap-1">
                Learn More <ArrowRight size={14} />
              </Button>
            )}
            
            {solution.status === 'development' && (
              <Button size="sm" variant="outline" className="gap-1">
                Notify Me <Bookmark size={14} />
              </Button>
            )}
            
            {solution.status === 'planned' && (
              <Button size="sm" variant="outline" className="gap-1">
                Vote <Vote size={14} />
              </Button>
            )}
            
            {solution.status === 'concept' && (
              <Button size="sm" variant="outline" className="gap-1">
                Suggest Features <Lightbulb size={14} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SolutionsList = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div>
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`flex items-center justify-between mb-6 transition-all duration-700 delay-400 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <p className="text-muted-foreground">
          Showing <span className="font-medium text-foreground">{solutionsData.length}</span> solutions
        </p>
        
        <div className="flex items-center border rounded-md overflow-hidden">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-none h-9 px-3",
              viewMode === 'grid' && "bg-accent"
            )}
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-none h-9 px-3",
              viewMode === 'list' && "bg-accent"
            )}
            onClick={() => setViewMode('list')}
          >
            <LayoutList size={18} />
          </Button>
        </div>
      </div>
      
      <div className={cn(
        "grid gap-6",
        viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}>
        {solutionsData.map((solution, index) => (
          <SolutionCard 
            key={solution.id} 
            solution={solution} 
            isListView={viewMode === 'list'} 
          />
        ))}
      </div>
      
      {solutionsData.length === 0 && (
        <div className="text-center py-16">
          <div className="mb-4 flex justify-center">
            <AlertCircle size={48} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium mb-2">No solutions found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to see more results
          </p>
        </div>
      )}
    </div>
  );
};

export default SolutionsList;
