
export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  instructor: {
    name: string;
    avatar: string;
  };
  image: string;
  progress: number;
  status: 'enrolled' | 'completed';
  batchName: string;
  duration: string;
  studentsEnrolled: number;
  upcomingItems: UpcomingItem[];
  modules: Module[];
  attendanceStats: {
    percentage: number;
    attended: number;
    total: number;
    recentClasses: RecentClass[];
  };
  currentModule: {
    id: string;
    name: string;
    currentChapter: string;
    isJustStarting: boolean;
  };
}

export interface UpcomingItem {
  id: string;
  type: 'class' | 'assessment' | 'assignment';
  title: string;
  description: string;
  dateTime: Date;
  tag: string;
  actionText: string;
  canStart: boolean;
  daysUntil?: number;
}

export interface RecentClass {
  id: string;
  name: string;
  status: 'attended' | 'absent';
  date: Date;
  instructor: string;
}

export interface Module {
  id: string;
  name: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  name: string;
  items: TopicItem[];
}

export interface TopicItem {
  id: string;
  type: 'live-class' | 'recording' | 'video' | 'article' | 'assignment' | 'assessment' | 'quiz' | 'feedback';
  title: string;
  status: 'not-started' | 'in-progress' | 'completed';
  duration?: string;
  meetLink?: string;
  videoUrl?: string;
  content?: string;
  dueDate?: Date;
}

// Mock Data
export const mockStudent: Student = {
  id: "1",
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
};

export const mockCourses: Course[] = [
  {
    id: "1",
    name: "Full Stack JavaScript Development",
    description: "Master modern web development with React, Node.js, and MongoDB",
    instructor: {
      name: "Dr. Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150&h=150&fit=crop&crop=face"
    },
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
    progress: 68,
    status: 'enrolled',
    batchName: "FSB-2024-A",
    duration: "6 months",
    studentsEnrolled: 45,
    upcomingItems: [
      {
        id: "1",
        type: 'class',
        title: "Live Class: Advanced React Patterns",
        description: "Learn about render props, higher-order components, and hooks patterns",
        dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        tag: "Upcoming Live Class",
        actionText: "Class starts in 2 days",
        canStart: false,
        daysUntil: 2
      },
      {
        id: "2",
        type: 'assessment',
        title: "Assessment: React Fundamentals Quiz",
        description: "Test your knowledge of React hooks, state management, and lifecycle methods",
        dateTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
        tag: "Upcoming Assessment",
        actionText: "Assessment starts in 12 hours",
        canStart: false
      },
      {
        id: "3",
        type: 'assignment',
        title: "Assignment: Build a Todo App",
        description: "Create a fully functional todo application using React and local storage",
        dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Due in 2 days
        tag: "Upcoming Assignment",
        actionText: "Start Assignment",
        canStart: true
      }
    ],
    attendanceStats: {
      percentage: 85,
      attended: 17,
      total: 20,
      recentClasses: [
        {
          id: "1",
          name: "Introduction to React Hooks",
          status: 'attended',
          date: new Date(Date.now() - 24 * 60 * 60 * 1000),
          instructor: "Dr. Sarah Chen"
        },
        {
          id: "2",
          name: "State Management Basics",
          status: 'attended',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          instructor: "Dr. Sarah Chen"
        },
        {
          id: "3",
          name: "Component Composition",
          status: 'absent',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          instructor: "Dr. Sarah Chen"
        }
      ]
    },
    currentModule: {
      id: "3",
      name: "Advanced React Concepts",
      currentChapter: "Custom Hooks and Context API",
      isJustStarting: false
    },
    modules: [
      {
        id: "1",
        name: "JavaScript Fundamentals",
        topics: [
          {
            id: "1-1",
            name: "ES6+ Features",
            items: [
              {
                id: "1-1-1",
                type: 'video',
                title: "Arrow Functions and Template Literals",
                status: 'completed',
                duration: "25 min"
              },
              {
                id: "1-1-2",
                type: 'live-class',
                title: "Destructuring and Spread Operator",
                status: 'completed',
                meetLink: "https://meet.google.com/abc-defg-hij"
              }
            ]
          },
          {
            id: "1-2",
            name: "Async JavaScript",
            items: [
              {
                id: "1-2-1",
                type: 'video',
                title: "Promises and Async/Await",
                status: 'completed',
                duration: "30 min"
              }
            ]
          }
        ]
      },
      {
        id: "2",
        name: "React Fundamentals",
        topics: [
          {
            id: "2-1",
            name: "Getting Started with React",
            items: [
              {
                id: "2-1-1",
                type: 'video',
                title: "What is React?",
                status: 'completed',
                duration: "20 min"
              },
              {
                id: "2-1-2",
                type: 'live-class',
                title: "Setting up React Environment",
                status: 'completed',
                meetLink: "https://meet.google.com/react-setup-123"
              }
            ]
          }
        ]
      },
      {
        id: "3",
        name: "Advanced React Concepts",
        topics: [
          {
            id: "3-1",
            name: "Custom Hooks and Context API",
            items: [
              {
                id: "3-1-1",
                type: 'video',
                title: "Creating Custom Hooks",
                status: 'in-progress',
                duration: "35 min"
              },
              {
                id: "3-1-2",
                type: 'live-class',
                title: "Context API Deep Dive",
                status: 'not-started',
                meetLink: "https://meet.google.com/context-api-456"
              },
              {
                id: "3-1-3",
                type: 'assignment',
                title: "Build a Theme Switcher",
                status: 'not-started',
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              }
            ]
          }
        ]
      },
      {
        id: "4",
        name: "Backend Development",
        topics: [
          {
            id: "4-1",
            name: "Node.js Basics",
            items: [
              {
                id: "4-1-1",
                type: 'video',
                title: "Introduction to Node.js",
                status: 'not-started',
                duration: "40 min"
              }
            ]
          }
        ]
      },
      {
        id: "5",
        name: "Database Integration",
        topics: [
          {
            id: "5-1",
            name: "MongoDB Fundamentals",
            items: [
              {
                id: "5-1-1",
                type: 'video',
                title: "Database Design Principles",
                status: 'not-started',
                duration: "45 min"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Python for Data Science",
    description: "Learn Python programming for data analysis and machine learning",
    instructor: {
      name: "Prof. Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
    progress: 100,
    status: 'completed',
    batchName: "PDS-2024-B",
    duration: "4 months",
    studentsEnrolled: 32,
    upcomingItems: [],
    attendanceStats: {
      percentage: 95,
      attended: 19,
      total: 20,
      recentClasses: []
    },
    currentModule: {
      id: "1",
      name: "Course Completed",
      currentChapter: "All chapters completed",
      isJustStarting: false
    },
    modules: []
  }
];
