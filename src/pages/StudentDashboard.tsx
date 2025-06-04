
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Calendar, BookOpen, Users, Play, RotateCcw, CheckCircle, Video, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { mockStudent, mockCourses, Course } from "@/lib/mockData";

const StudentDashboard = () => {
  const [filter, setFilter] = useState<'enrolled' | 'completed'>('enrolled');

  const filteredCourses = mockCourses.filter(course => course.status === filter);

  const getActionButton = (course: Course) => {
    if (course.status === 'completed') {
      return (
        <Button variant="outline" size="sm" asChild>
          <Link to={`/course/${course.id}`}>
            <CheckCircle className="w-4 h-4 mr-2" />
            View Course
          </Link>
        </Button>
      );
    }
    
    if (course.progress === 0) {
      return (
        <Button size="sm" asChild>
          <Link to={`/course/${course.id}`}>
            <Play className="w-4 h-4 mr-2" />
            Start Learning
          </Link>
        </Button>
      );
    }
    
    return (
      <Button size="sm" asChild>
        <Link to={`/course/${course.id}`}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Resume Learning
        </Link>
      </Button>
    );
  };

  const formatUpcomingItem = (item: any) => {
    const now = new Date();
    const itemDate = new Date(item.dateTime);
    const diffTime = itemDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

    if (diffHours < 24) {
      return `${diffHours} hours`;
    } else {
      return `${diffDays} days`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">
            Welcome back, {mockStudent.name}!
          </h1>
          <p className="text-lg text-muted-foreground">
            What will you be learning today?
          </p>
        </div>

        {/* My Courses Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-heading font-semibold mb-6">My Courses</h2>
          
          {/* Filter Chips */}
          <div className="flex gap-3 mb-6">
            <Button
              variant={filter === 'enrolled' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('enrolled')}
              className="rounded-full"
            >
              Enrolled
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('completed')}
              className="rounded-full"
            >
              Completed
            </Button>
          </div>
        </div>

        {/* Course Cards */}
        <div className="space-y-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="w-full hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex gap-6 mb-6">
                  {/* Course Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  </div>
                  
                  {/* Course Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-semibold mb-2">
                      {course.name}
                    </h3>
                    <p className="text-muted-foreground mb-3 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={course.instructor.avatar} />
                        <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {course.instructor.name}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0 flex items-start">
                    {getActionButton(course)}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                {/* Separator */}
                <div className="border-t border-border mb-6"></div>

                {/* Upcoming Items */}
                {course.upcomingItems.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {course.upcomingItems.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="flex-shrink-0 mt-1">
                          {item.type === 'class' && <Video className="w-4 h-4 text-primary" />}
                          {item.type === 'assessment' && <BookOpen className="w-4 h-4 text-accent" />}
                          {item.type === 'assignment' && <FileText className="w-4 h-4 text-secondary" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-sm font-medium line-clamp-1">
                              {item.title.replace(/^(Live Class|Assessment|Assignment): /, '')}
                            </h4>
                            <Badge variant="secondary" className="text-xs px-2 py-0.5 whitespace-nowrap">
                              {item.type === 'class' && 'Live Class'}
                              {item.type === 'assessment' && 'Assessment'}
                              {item.type === 'assignment' && 'Assignment'}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            {item.type === 'assignment' ? 'Due' : 'Starts'} in {formatUpcomingItem(item)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">
                No {filter} courses found
              </h3>
              <p className="text-muted-foreground">
                {filter === 'enrolled' 
                  ? "You haven't enrolled in any courses yet." 
                  : "You haven't completed any courses yet."
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
