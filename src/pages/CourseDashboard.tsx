
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Video, BookOpen, FileText, Clock, Calendar, Users, Play, CheckCircle2, XCircle } from "lucide-react";
import { mockCourses, RecentClass } from "@/lib/mockData";
import Header from "@/components/Header";

const CourseDashboard = () => {
  const { courseId } = useParams();
  const course = mockCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold mb-2">Course Not Found</h1>
          <p className="text-muted-foreground mb-4">The course you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'class': return <Video className="w-5 h-5 text-primary" />;
      case 'assessment': return <BookOpen className="w-5 h-5 text-accent" />;
      case 'assignment': return <FileText className="w-5 h-5 text-secondary" />;
      default: return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const AttendanceModal = ({ classes }: { classes: RecentClass[] }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto text-primary mx-auto">
          View Full Attendance
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Full Attendance Record</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Mock additional classes for demo */}
          {[...classes, 
            { id: "4", name: "JavaScript Fundamentals", status: 'attended' as const, date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), instructor: "Dr. Sarah Chen" },
            { id: "5", name: "HTML & CSS Basics", status: 'attended' as const, date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), instructor: "Dr. Sarah Chen" },
            { id: "6", name: "Web Development Intro", status: 'absent' as const, date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), instructor: "Dr. Sarah Chen" }
          ].map((classItem) => (
            <div key={classItem.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{classItem.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {formatDate(classItem.date)} • {classItem.instructor}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {classItem.status === 'attended' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <Badge variant="outline" className="text-success border-success">
                      Present
                    </Badge>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-destructive" />
                    <Badge variant="outline" className="text-destructive border-destructive">
                      Absent
                    </Badge>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Course Information Banner */}
        <Card className="mb-8 shadow-8dp">
          <CardContent className="p-6">
            <div className="flex items-start gap-6 mb-6">
              <img
                src={course.image}
                alt={course.name}
                className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-heading font-bold mb-2">{course.name}</h1>
                <p className="text-lg text-muted-foreground mb-4">{course.description}</p>
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={course.instructor.avatar} />
                    <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{course.instructor.name}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <img
                  src="/lovable-uploads/afe.png"
                  alt="AFE Brand"
                  className="h-12"
                />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{course.progress}%</span>
              </div>
              <div className="bg-primary-light rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            {/* Batch Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="p-2">
                  <BookOpen className="w-4 h-4" />
                </Badge>
                <div>
                  <p className="text-sm text-muted-foreground">Batch</p>
                  <p className="font-medium">{course.batchName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="p-2">
                  <Clock className="w-4 h-4" />
                </Badge>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{course.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="p-2">
                  <Users className="w-4 h-4" />
                </Badge>
                <div>
                  <p className="text-sm text-muted-foreground">Students</p>
                  <p className="font-medium">{course.studentsEnrolled} enrolled</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Current Module & What's Next */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Module Section - Moved Above */}
            <Card className="shadow-4dp">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-heading font-semibold mb-2">
                      Current Module: {course.currentModule.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {course.currentModule.currentChapter}
                    </p>
                  </div>
                  <Button asChild>
                    <Link to={`/course/${courseId}/curriculum`}>
                      <Play className="w-4 h-4 mr-2" />
                      {course.currentModule.isJustStarting ? 'Start Learning' : 'Continue Learning'}
                    </Link>
                  </Button>
                </div>
                {/* Current Module Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Module Progress</span>
                    <span className="text-sm text-muted-foreground">65%</span>
                  </div>
                  <div className="bg-primary-light rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: '65%' }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's Next Section */}
            <Card className="shadow-4dp">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">What's Next?</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    Next 7 days
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                {course.upcomingItems.length > 0 ? (
                  <div className="space-y-4">
                    {course.upcomingItems.map((item, index) => (
                      <div key={item.id}>
                        <div className="flex items-start gap-4 p-4 rounded-lg">
                          <div className="flex-shrink-0 mt-1">
                            {getItemIcon(item.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <h4 className="font-medium text-base">{item.title}</h4>
                              <Badge 
                                variant="outline" 
                                className={`whitespace-nowrap ${
                                  item.type === 'class' 
                                    ? 'bg-secondary-light text-foreground border-secondary-light' 
                                    : item.type === 'assessment'
                                    ? 'bg-accent-light text-foreground border-accent-light'
                                    : 'bg-info-light text-foreground border-info-light'
                                }`}
                              >
                                {item.tag}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">
                                {formatDate(item.dateTime)}
                              </p>
                              {item.canStart ? (
                                <Button size="sm" variant="default">
                                  {item.actionText}
                                </Button>
                              ) : (
                                <span className="text-sm text-muted-foreground">
                                  {item.actionText}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        {index < course.upcomingItems.length - 1 && (
                          <div className="border-t border-border"></div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No upcoming items</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Attendance */}
          <div>
            <Card className="shadow-4dp">
              <CardHeader>
                <CardTitle>Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {course.attendanceStats.percentage}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {course.attendanceStats.attended} of {course.attendanceStats.total} classes attended
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <h4 className="font-medium text-sm">Recent Classes</h4>
                  {course.attendanceStats.recentClasses.map((classItem) => (
                    <div key={classItem.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{classItem.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(classItem.date)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {classItem.status === 'attended' ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-success" />
                            <Badge variant="outline" className="text-xs text-success border-success">
                              Present
                            </Badge>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-destructive" />
                            <Badge variant="outline" className="text-xs text-destructive border-destructive">
                              Absent
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <AttendanceModal classes={course.attendanceStats.recentClasses} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDashboard;
