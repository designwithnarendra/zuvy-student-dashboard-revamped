
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { mockCourses, Module } from "@/lib/mockData";
import Header from "@/components/Header";
import ModuleSheet from "@/components/ModuleSheet";
import ContentBottomSheet from "@/components/ContentBottomSheet";
import CurriculumSidebar from "@/components/CurriculumSidebar";
import TopicContent from "@/components/TopicContent";

const CurriculumPage = () => {
  const { courseId, moduleId, topicId } = useParams();
  const course = mockCourses.find(c => c.id === courseId);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [contentSheet, setContentSheet] = useState({
    isOpen: false,
    contentType: '',
    contentTitle: '',
    contentId: ''
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (course) {
      const initialModule = moduleId || course.currentModule.id;
      const moduleExists = course.modules.find(m => m.id === initialModule);
      
      if (moduleExists) {
        setSelectedModule(initialModule);
        
        const initialTopic = topicId || moduleExists.topics[0]?.id || "";
        setSelectedTopic(initialTopic);
      }
    }
  }, [course, moduleId, topicId]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold mb-2">Course Not Found</h1>
          <Button asChild>
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleTopicSelect = (moduleId: string, topicId: string) => {
    setSelectedModule(moduleId);
    setSelectedTopic(topicId);
  };

  const handleContentClick = (type: string, title: string, id: string) => {
    setContentSheet({
      isOpen: true,
      contentType: type,
      contentTitle: title,
      contentId: id
    });
  };

  const currentModule = course.modules.find(m => m.id === selectedModule);
  const currentTopic = currentModule?.topics.find(t => t.id === selectedTopic);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-80px)]">
        {/* Desktop Left Panel - Module Navigation */}
        {!isMobile && (
          <CurriculumSidebar
            courseId={courseId!}
            courseName={course.name}
            modules={course.modules}
            selectedModule={selectedModule}
            selectedTopic={selectedTopic}
            onTopicSelect={handleTopicSelect}
          />
        )}

        {/* Main Content Area */}
        <div className={`flex-1 p-4 md:p-8 overflow-y-auto ${!isMobile ? 'ml-80' : ''}`}>
          <div className="max-w-4xl mx-auto">
            <TopicContent
              currentModule={currentModule}
              currentTopic={currentTopic}
              selectedModule={selectedModule}
              onContentClick={handleContentClick}
            />

            {/* Mobile Bottom Navigation */}
            {isMobile && (
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
                <ModuleSheet
                  modules={course.modules}
                  selectedModule={selectedModule}
                  selectedTopic={selectedTopic}
                  onTopicSelect={(moduleId, topicId) => {
                    handleTopicSelect(moduleId, topicId);
                  }}
                  courseName={course.name}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Bottom Sheet */}
      <ContentBottomSheet
        isOpen={contentSheet.isOpen}
        onClose={() => setContentSheet({ ...contentSheet, isOpen: false })}
        contentType={contentSheet.contentType}
        contentTitle={contentSheet.contentTitle}
        contentId={contentSheet.contentId}
      />
    </div>
  );
};

export default CurriculumPage;
