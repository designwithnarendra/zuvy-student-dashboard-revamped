
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Video, 
  BookOpen, 
  FileText, 
  Clock, 
  Play, 
  CheckCircle2, 
  Circle,
  ArrowLeft,
  Calendar,
  User,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { mockCourses, Module, Topic, TopicItem } from "@/lib/mockData";
import Header from "@/components/Header";

const CurriculumPage = () => {
  const { courseId, moduleId, topicId } = useParams();
  const course = mockCourses.find(c => c.id === courseId);
  const [selectedModule, setSelectedModule] = useState(moduleId || course?.modules[0]?.id || "");
  const [selectedTopic, setSelectedTopic] = useState(topicId || "");
  const [expandedModules, setExpandedModules] = useState<string[]>([selectedModule]);

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

  const getItemIcon = (type: string, status: string) => {
    const baseClasses = "w-4 h-4";
    switch (type) {
      case 'live-class':
        return <Video className={`${baseClasses} ${status === 'completed' ? 'text-success' : 'text-primary'}`} />;
      case 'recording':
        return <Video className={`${baseClasses} ${status === 'completed' ? 'text-success' : 'text-muted-foreground'}`} />;
      case 'video':
        return <Play className={`${baseClasses} ${status === 'completed' ? 'text-success' : 'text-primary'}`} />;
      case 'article':
        return <FileText className={`${baseClasses} ${status === 'completed' ? 'text-success' : 'text-accent'}`} />;
      case 'assignment':
        return <FileText className={`${baseClasses} ${status === 'completed' ? 'text-success' : 'text-secondary'}`} />;
      case 'assessment':
        return <BookOpen className={`${baseClasses} ${status === 'completed' ? 'text-success' : 'text-accent'}`} />;
      case 'quiz':
        return <BookOpen className={`${baseClasses} ${status === 'completed' ? 'text-success' : 'text-warning'}`} />;
      case 'feedback':
        return <User className={`${baseClasses} ${status === 'completed' ? 'text-success' : 'text-info'}`} />;
      default:
        return <Circle className={`${baseClasses} text-muted-foreground`} />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-warning" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="text-success border-success">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="text-warning border-warning">In Progress</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground">Not Started</Badge>;
    }
  };

  const currentModule = course.modules.find(m => m.id === selectedModule);
  const currentTopic = currentModule?.topics.find(t => t.id === selectedTopic);

  const formatDueDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  // Enhanced topic items with videos and articles for Module 1, Topic 1
  const getEnhancedItems = (topic: Topic, moduleId: string): TopicItem[] => {
    if (moduleId === "1" && topic.id === "1") {
      return [
        ...topic.items,
        {
          id: "video-1",
          title: "Introduction to React Components",
          type: "video" as const,
          status: "not-started" as const,
          duration: "15 min"
        },
        {
          id: "article-1", 
          title: "Understanding JSX Syntax",
          type: "article" as const,
          status: "not-started" as const,
          duration: "8 min read"
        },
        {
          id: "video-2",
          title: "Props and State Management",
          type: "video" as const,
          status: "completed" as const,
          duration: "22 min"
        }
      ];
    }
    return topic.items;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {/* Left Panel - Module Navigation */}
        <div className="w-80 bg-card border-r border-border shadow-4dp">
          <div className="p-6 border-b border-border">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link to={`/course/${courseId}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Link>
            </Button>
            <h2 className="text-lg font-heading font-semibold">Course Curriculum</h2>
            <p className="text-sm text-muted-foreground mt-1">{course.name}</p>
          </div>
          
          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="p-4 space-y-4">
              {course.modules.map((module: Module) => (
                <div key={module.id} className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-left h-auto p-3"
                    onClick={() => toggleModule(module.id)}
                  >
                    <div>
                      <div className="font-medium">Module {module.id}: {module.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {module.topics.length} topics
                      </div>
                    </div>
                    {expandedModules.includes(module.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>
                  
                  {expandedModules.includes(module.id) && (
                    <div className="ml-4 space-y-1">
                      {module.topics.map((topic: Topic) => (
                        <Button
                          key={topic.id}
                          variant={selectedTopic === topic.id ? "secondary" : "ghost"}
                          size="sm"
                          className="w-full justify-start text-left"
                          onClick={() => {
                            setSelectedModule(module.id);
                            setSelectedTopic(topic.id);
                          }}
                        >
                          {topic.name}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {currentTopic ? (
              /* Topic Items View */
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl font-heading font-bold mb-2">
                    {currentTopic.name}
                  </h1>
                  <p className="text-muted-foreground">
                    Module {selectedModule}: {currentModule?.name}
                  </p>
                </div>

                <div className="space-y-4">
                  {getEnhancedItems(currentTopic, selectedModule).map((item: TopicItem, index) => {
                    // Add recording after completed live class
                    const items = [item];
                    if (item.type === 'live-class' && item.status === 'completed') {
                      items.push({
                        id: `${item.id}-recording`,
                        title: `${item.title} - Recording`,
                        type: 'recording' as const,
                        status: 'completed' as const,
                        duration: item.duration
                      });
                    }

                    return items.map((currentItem, itemIndex) => (
                      <Card key={`${currentItem.id}-${itemIndex}`} className="hover:shadow-md transition-shadow shadow-4dp">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                              {getItemIcon(currentItem.type, currentItem.status)}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <h3 className="text-lg font-medium">{currentItem.title}</h3>
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(currentItem.status)}
                                  {getStatusBadge(currentItem.status)}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                {currentItem.duration && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {currentItem.duration}
                                  </div>
                                )}
                                {currentItem.dueDate && (
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Due: {formatDueDate(currentItem.dueDate)}
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="capitalize">
                                    {currentItem.type.replace('-', ' ')}
                                  </Badge>
                                </div>
                                
                                <div className="flex gap-2">
                                  {currentItem.type === 'live-class' && currentItem.meetLink && (
                                    <Button size="sm" variant="outline" asChild>
                                      <a href={currentItem.meetLink} target="_blank" rel="noopener noreferrer">
                                        Join Class
                                      </a>
                                    </Button>
                                  )}
                                  {currentItem.type === 'recording' && currentItem.status === 'completed' && (
                                    <Button size="sm" variant="outline">
                                      <Play className="w-4 h-4 mr-2" />
                                      Watch Recording
                                    </Button>
                                  )}
                                  {currentItem.type === 'recording' && currentItem.status !== 'completed' && (
                                    <div className="text-sm text-muted-foreground">
                                      Recording will be available after live class
                                    </div>
                                  )}
                                  {(currentItem.type === 'video' || currentItem.type === 'article') && (
                                    <Button size="sm" asChild>
                                      <Link to={`/content/${currentItem.type}/${currentItem.id}`}>
                                        <Play className="w-4 h-4 mr-2" />
                                        {currentItem.status === 'completed' ? 'Review' : 'Start'}
                                      </Link>
                                    </Button>
                                  )}
                                  {(currentItem.type === 'assignment' || currentItem.type === 'assessment' || currentItem.type === 'quiz') && (
                                    <Button size="sm" variant={currentItem.status === 'completed' ? 'outline' : 'default'}>
                                      {currentItem.status === 'completed' ? 'View Submission' : 'Start'}
                                    </Button>
                                  )}
                                  {currentItem.type === 'feedback' && (
                                    <Button size="sm" variant="outline">
                                      Give Feedback
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ));
                  })}
                </div>
              </div>
            ) : currentModule ? (
              /* Module Overview */
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl font-heading font-bold mb-2">
                    Module {selectedModule}: {currentModule.name}
                  </h1>
                  <p className="text-muted-foreground">
                    Select a topic from the left panel to view its content
                  </p>
                </div>

                <div className="grid gap-6">
                  {currentModule.topics.map((topic: Topic) => (
                    <Card key={topic.id} className="hover:shadow-md transition-shadow cursor-pointer shadow-4dp"
                          onClick={() => setSelectedTopic(topic.id)}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-heading font-semibold">{topic.name}</h3>
                          <div className="text-sm text-muted-foreground">
                            {getEnhancedItems(topic, selectedModule).length} items
                          </div>
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                          {getEnhancedItems(topic, selectedModule).slice(0, 3).map((item: TopicItem) => (
                            <Badge key={item.id} variant="outline" className="capitalize">
                              {item.type.replace('-', ' ')}
                            </Badge>
                          ))}
                          {getEnhancedItems(topic, selectedModule).length > 3 && (
                            <Badge variant="outline">
                              +{getEnhancedItems(topic, selectedModule).length - 3} more
                            </Badge>
                          )}
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {getEnhancedItems(topic, selectedModule).filter(item => item.status === 'completed').length} of {getEnhancedItems(topic, selectedModule).length} completed
                          </div>
                          <Button size="sm" variant="outline">
                            View Topic
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              /* Course Overview */
              <div>
                <h1 className="text-3xl font-heading font-bold mb-2">Course Curriculum</h1>
                <p className="text-muted-foreground mb-8">
                  Select a module from the left panel to get started
                </p>
                
                <div className="grid gap-6">
                  {course.modules.map((module: Module) => (
                    <Card key={module.id} className="hover:shadow-md transition-shadow cursor-pointer shadow-4dp"
                          onClick={() => {
                            setSelectedModule(module.id);
                            setExpandedModules(prev => [...prev, module.id]);
                          }}>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-heading font-semibold mb-2">
                          Module {module.id}: {module.name}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {module.topics.length} topics • {module.topics.reduce((acc, topic) => acc + getEnhancedItems(topic, module.id).length, 0)} items
                        </p>
                        <Button size="sm" variant="outline">
                          Enter Module
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumPage;
