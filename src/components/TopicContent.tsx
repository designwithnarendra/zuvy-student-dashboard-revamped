
import { Topic, TopicItem, Module } from "@/lib/mockData";
import LearningItem from "./LearningItem";

interface TopicContentProps {
  currentModule: Module | undefined;
  currentTopic: Topic | undefined;
  selectedModule: string;
  onContentClick: (type: string, title: string, id: string) => void;
}

const TopicContent = ({ 
  currentModule, 
  currentTopic, 
  selectedModule, 
  onContentClick 
}: TopicContentProps) => {
  const getEnhancedItems = (topic: Topic, moduleId: string): TopicItem[] => {
    const baseItems = [...topic.items];
    
    // Add recordings after completed live classes
    const enhancedItems: TopicItem[] = [];
    baseItems.forEach(item => {
      enhancedItems.push(item);
      if (item.type === 'live-class' && item.status === 'completed') {
        enhancedItems.push({
          id: `${item.id}-recording`,
          title: item.title,
          type: 'recording' as const,
          status: 'completed' as const,
          duration: item.duration
        });
      }
    });

    return enhancedItems;
  };

  if (!currentTopic) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2">Course Curriculum</h1>
        <p className="text-muted-foreground mb-8">
          Select a module from the left panel to get started
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2 break-words leading-relaxed">
          {currentTopic.name}
        </h1>
        <p className="text-muted-foreground mb-2">
          Module {selectedModule}: {currentModule?.name}
        </p>
        <p className="text-sm text-muted-foreground break-words leading-relaxed">
          {currentTopic.description}
        </p>
      </div>

      <div className="space-y-4">
        {getEnhancedItems(currentTopic, selectedModule).map((item: TopicItem, index) => 
          <LearningItem 
            key={`${item.id}-${index}`}
            item={item} 
            index={index} 
            onContentClick={onContentClick}
          />
        )}
      </div>
    </div>
  );
};

export default TopicContent;
