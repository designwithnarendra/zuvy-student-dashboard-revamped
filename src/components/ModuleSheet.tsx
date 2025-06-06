
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, ChevronRight } from "lucide-react";
import { Module, Topic } from "@/lib/mockData";

interface ModuleSheetProps {
  modules: Module[];
  selectedModule: string;
  selectedTopic: string;
  onTopicSelect: (moduleId: string, topicId: string) => void;
  courseName: string;
}

const ModuleSheet = ({ modules, selectedModule, selectedTopic, onTopicSelect, courseName }: ModuleSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          <BookOpen className="w-4 h-4 mr-2" />
          Module List
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Course Curriculum</SheetTitle>
          <p className="text-sm text-muted-foreground">{courseName}</p>
        </SheetHeader>
        <ScrollArea className="h-[calc(100%-80px)] mt-4">
          <div className="space-y-4 pb-4">
            {modules.map((module: Module) => (
              <div key={module.id} className="space-y-2">
                <h3 className="font-bold text-base">
                  Module {module.id}: {module.name}
                </h3>
                <div className="ml-4 space-y-1">
                  {module.topics.map((topic: Topic) => (
                    <Button
                      key={topic.id}
                      variant={selectedModule === module.id && selectedTopic === topic.id ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-between text-left"
                      onClick={() => onTopicSelect(module.id, topic.id)}
                    >
                      <span>{topic.name}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default ModuleSheet;
