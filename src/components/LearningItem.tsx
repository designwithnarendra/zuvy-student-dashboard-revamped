
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  BookOpen, 
  FileText, 
  Clock, 
  Play, 
  CheckCircle2, 
  Circle,
  Calendar,
  User
} from "lucide-react";
import { TopicItem } from "@/lib/mockData";

interface LearningItemProps {
  item: TopicItem;
  index: number;
  onContentClick: (type: string, title: string, id: string) => void;
}

const LearningItem = ({ item, index, onContentClick }: LearningItemProps) => {
  const getItemIcon = (type: string, status: string) => {
    const getIconComponent = () => {
      switch (type) {
        case 'live-class':
          return <Video className="w-4 h-4" />;
        case 'recording':
          return <Video className="w-4 h-4" />;
        case 'video':
          return <Play className="w-4 h-4" />;
        case 'article':
          return <FileText className="w-4 h-4" />;
        case 'assignment':
          return <FileText className="w-4 h-4" />;
        case 'assessment':
          return <BookOpen className="w-4 h-4" />;
        case 'quiz':
          return <BookOpen className="w-4 h-4" />;
        case 'feedback':
          return <User className="w-4 h-4" />;
        default:
          return <Circle className="w-4 h-4" />;
      }
    };

    const getIconColor = () => {
      switch (type) {
        case 'live-class':
        case 'video':
          return status === 'completed' ? 'text-success' : 'text-primary';
        case 'recording':
          return status === 'completed' ? 'text-success' : 'text-muted-foreground';
        case 'article':
        case 'assessment':
          return status === 'completed' ? 'text-success' : 'text-accent';
        case 'assignment':
          return status === 'completed' ? 'text-success' : 'text-secondary';
        case 'quiz':
          return status === 'completed' ? 'text-success' : 'text-warning';
        case 'feedback':
          return status === 'completed' ? 'text-success' : 'text-info';
        default:
          return 'text-muted-foreground';
      }
    };

    const getBgColor = () => {
      switch (type) {
        case 'live-class':
        case 'video':
          return 'bg-primary-light';
        case 'recording':
          return 'bg-muted/20';
        case 'article':
        case 'assessment':
          return 'bg-accent-light';
        case 'assignment':
          return 'bg-secondary-light';
        case 'quiz':
          return 'bg-warning-light';
        case 'feedback':
          return 'bg-info-light';
        default:
          return 'bg-muted-light';
      }
    };

    return (
      <div className={`w-10 h-10 rounded-full ${getBgColor()} flex items-center justify-center flex-shrink-0`}>
        <div className={getIconColor()}>
          {getIconComponent()}
        </div>
      </div>
    );
  };

  const getStatusBadge = (status: string, type: string, item: TopicItem) => {
    if (type === 'live-class') {
      if (item.scheduledDateTime && new Date() < item.scheduledDateTime) {
        const timeRemaining = getTimeRemaining(item.scheduledDateTime);
        return <Badge variant="outline" className="text-muted-foreground">{timeRemaining}</Badge>;
      } else if (status === 'completed') {
        return (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <Badge variant="outline" className="text-success border-success">Completed</Badge>
            {item.attendanceStatus && (
              <Badge variant="outline" className={item.attendanceStatus === 'present' ? "text-success border-success" : "text-destructive border-destructive"}>
                {item.attendanceStatus === 'present' ? 'Present' : 'Absent'}
              </Badge>
            )}
          </div>
        );
      }
    }

    if (type === 'video') {
      if (status === 'completed') {
        return <Badge variant="outline" className="text-success border-success">Watched</Badge>;
      } else {
        return <Badge variant="outline" className="text-muted-foreground">Not Watched</Badge>;
      }
    }

    if (type === 'article') {
      if (status === 'completed') {
        return <Badge variant="outline" className="text-success border-success">Read</Badge>;
      } else {
        return <Badge variant="outline" className="text-muted-foreground">Not Started</Badge>;
      }
    }

    if (type === 'feedback') {
      if (status === 'completed') {
        return <Badge variant="outline" className="text-success border-success">Feedback Shared</Badge>;
      } else {
        return <Badge variant="outline" className="text-muted-foreground">Not Started</Badge>;
      }
    }

    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="text-success border-success">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="text-warning border-warning">In Progress</Badge>;
      case 'not-started':
        return <Badge variant="outline" className="text-muted-foreground">Not Started</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground">Not Started</Badge>;
    }
  };

  const getTimeRemaining = (scheduledDate: Date) => {
    const now = new Date();
    const timeDiff = scheduledDate.getTime() - now.getTime();
    
    if (timeDiff <= 0) return "Time passed";
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `Starts in ${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `Starts in ${hours} hour${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `Starts in ${minutes} minute${minutes > 1 ? 's' : ''}`;
    
    return "Starting soon";
  };

  const formatScheduledDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getActionButton = (item: TopicItem) => {
    const isLiveClass = item.type === 'live-class';
    const isRecording = item.type === 'recording';
    const isVideo = item.type === 'video';
    const isArticle = item.type === 'article';
    const isAssignment = item.type === 'assignment';
    const isAssessment = item.type === 'assessment';
    const isFeedback = item.type === 'feedback';

    if (isLiveClass) {
      if (item.scheduledDateTime && new Date() < item.scheduledDateTime) {
        const tenMinutesBefore = new Date(item.scheduledDateTime.getTime() - 10 * 60 * 1000);
        const canJoin = new Date() >= tenMinutesBefore;
        
        return (
          <Button 
            size="sm" 
            disabled={!canJoin} 
            className={canJoin ? "" : "opacity-50 cursor-not-allowed"}
          >
            Join Class
          </Button>
        );
      } else if (item.status === 'completed') {
        return null;
      }
    }

    if (isRecording) {
      if (item.status === 'completed') {
        return (
          <Button 
            size="sm" 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            onClick={() => onContentClick('recording', item.title, item.id)}
          >
            Watch Recording
          </Button>
        );
      } else {
        return (
          <span className="text-sm text-muted-foreground">
            Live class recording will be available after the live class
          </span>
        );
      }
    }

    if (isVideo) {
      return (
        <Button 
          size="sm" 
          variant="outline" 
          className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
          onClick={() => onContentClick('video', item.title, item.id)}
        >
          {item.status === 'completed' ? 'Watch Again' : 'Watch Video'}
        </Button>
      );
    }

    if (isArticle) {
      return (
        <Button 
          size="sm" 
          variant="outline" 
          className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
          onClick={() => onContentClick('article', item.title, item.id)}
        >
          {item.status === 'completed' ? 'Read Again' : 'Read Article'}
        </Button>
      );
    }

    if (isAssignment) {
      return (
        <Button 
          size="sm"
          onClick={() => onContentClick('assignment', item.title, item.id)}
        >
          {item.status === 'completed' ? 'View Submission' : 'Start Assignment'}
        </Button>
      );
    }

    if (isAssessment) {
      const canStart = item.scheduledDateTime ? new Date() >= item.scheduledDateTime : true;
      
      if (!canStart) {
        return null;
      }
      
      return (
        <Button 
          size="sm"
          onClick={() => onContentClick('assessment', item.title, item.id)}
        >
          {item.status === 'completed' ? 'View Results' : 'Start Assessment'}
        </Button>
      );
    }

    if (isFeedback) {
      const canGiveFeedback = true;
      
      if (!canGiveFeedback) {
        return null;
      }
      
      return (
        <Button size="sm">
          {item.status === 'completed' ? 'View Feedback' : 'Share Feedback'}
        </Button>
      );
    }

    return null;
  };

  return (
    <Card key={`${item.id}-${index}`} className="hover:shadow-md transition-shadow shadow-4dp">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start gap-4">
          {getItemIcon(item.type, item.status)}
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-4 mb-3">
              <h3 className="text-base md:text-lg font-medium break-words leading-relaxed">
                {item.type === 'live-class' ? `Live Class: ${item.title}` :
                 item.type === 'recording' ? `Recording: ${item.title}` :
                 item.type === 'video' ? `Video: ${item.title}` :
                 item.type === 'article' ? `Article: ${item.title}` :
                 item.type === 'assignment' ? `Assignment: ${item.title}` :
                 item.type === 'assessment' ? `Assessment: ${item.title}` :
                 item.type === 'feedback' ? `Feedback Form: ${item.title}` :
                 item.title}
              </h3>
              <div className="flex-shrink-0">
                {getStatusBadge(item.status, item.type, item)}
              </div>
            </div>
            
            {item.description && (
              <p className="text-sm text-muted-foreground mb-3 break-words leading-relaxed">
                {item.description}
              </p>
            )}
            
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-muted-foreground mb-4">
              {item.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>Duration: {item.duration}</span>
                </div>
              )}
              {item.scheduledDateTime && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>Start Date: {formatScheduledDate(item.scheduledDateTime)}</span>
                </div>
              )}
              {item.type === 'assessment' && item.endDateTime && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>End Date: {formatScheduledDate(item.endDateTime)}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end">
              <div className="flex gap-2">
                {getActionButton(item)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningItem;
