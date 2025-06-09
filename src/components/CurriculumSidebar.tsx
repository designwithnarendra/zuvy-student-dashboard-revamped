
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { Module, Topic } from "@/lib/mockData";

interface CurriculumSidebarProps {
  courseId: string;
  courseName: string;
  modules: Module[];
  selectedModule: string;
  selectedTopic: string;
  onTopicSelect: (moduleId: string, topicId: string) => void;
}

const CurriculumSidebar = ({
  courseId,
  courseName,
  modules,
  selectedModule,
  selectedTopic,
  onTopicSelect,
}: CurriculumSidebarProps) => {
  const [expandedModules, setExpandedModules] = useState<string[]>([selectedModule]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleTopicSelect = (moduleId: string, topicId: string) => {
    onTopicSelect(moduleId, topicId);
    if (!expandedModules.includes(moduleId)) {
      setExpandedModules(prev => [...prev, moduleId]);
    }
  };

  return (
    <div className="w-80 bg-card border-r border-border shadow-4dp fixed h-full">
      <div className="p-6 border-b border-border">
        <Button variant="link" size="sm" asChild className="mb-4 p-0 h-auto text-foreground hover:text-foreground hover:no-underline">
          <Link to={`/course/${courseId}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Link>
        </Button>
        <h2 className="text-lg font-heading font-semibold">Course Curriculum</h2>
        <p className="text-sm text-muted-foreground mt-1 break-words">{courseName}</p>
      </div>
      
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="p-4 space-y-4">
          {modules.map((module: Module) => (
            <div key={module.id} className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-left h-auto p-3 hover:bg-primary-light hover:text-charcoal"
                onClick={() => toggleModule(module.id)}
              >
                <div className="flex w-full justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm break-words leading-relaxed whitespace-normal">
                      Module {module.id}: {module.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {module.topics.length} topics
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-0.5">
                    {expandedModules.includes(module.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </Button>
              
              {expandedModules.includes(module.id) && (
                <div className="space-y-1 pl-0">
                  {module.topics.map((topic: Topic) => (
                    <Button
                      key={topic.id}
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start text-left h-auto p-2 text-sm break-words leading-relaxed whitespace-normal ${
                        selectedModule === module.id && selectedTopic === topic.id 
                          ? "bg-primary-light border-l-4 border-primary text-charcoal" 
                          : "hover:bg-primary-light hover:text-charcoal"
                      }`}
                      onClick={() => handleTopicSelect(module.id, topic.id)}
                    >
                      <span className="break-words whitespace-normal text-left">{topic.name}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CurriculumSidebar;
