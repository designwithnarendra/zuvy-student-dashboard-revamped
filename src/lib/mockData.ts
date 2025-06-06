
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
    currentItem: string;
    nextItem: {
      type: string;
      name: string;
      scheduledTime?: string;
      dueDate?: string;
    };
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
  description: string;
  items: TopicItem[];
}

export interface TopicItem {
  id: string;
  type: 'live-class' | 'recording' | 'video' | 'article' | 'assignment' | 'assessment' | 'quiz' | 'feedback';
  title: string;
  status: 'not-started' | 'in-progress' | 'completed';
  description?: string;
  duration?: string;
  meetLink?: string;
  videoUrl?: string;
  content?: string;
  dueDate?: Date;
  scheduledDateTime?: Date;
  attendanceStatus?: 'present' | 'absent';
  watchStatus?: 'not-watched' | 'watched';
  readStatus?: 'not-started' | 'read';
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
        dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
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
        dateTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
        tag: "Upcoming Assessment",
        actionText: "Assessment starts in 12 hours",
        canStart: false
      },
      {
        id: "3",
        type: 'assignment',
        title: "Assignment: Build a Todo App",
        description: "Create a fully functional todo application using React and local storage",
        dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
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
      currentItem: "Creating Custom Hooks",
      nextItem: {
        type: "video",
        name: "Creating Custom Hooks",
        scheduledTime: "Available now"
      },
      isJustStarting: false
    },
    modules: [
      {
        id: "1",
        name: "JavaScript Fundamentals",
        topics: [
          {
            id: "1",
            name: "ES6+ Features",
            description: "Learn modern JavaScript features including arrow functions, template literals, destructuring, and more.",
            items: [
              {
                id: "1-1-1",
                type: 'live-class',
                title: "Introduction to ES6",
                status: 'completed',
                duration: "90 min",
                scheduledDateTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                meetLink: "https://meet.google.com/abc-defg-hij",
                attendanceStatus: 'present'
              },
              {
                id: "1-1-1-rec",
                type: 'recording',
                title: "Introduction to ES6",
                status: 'completed',
                duration: "90 min"
              },
              {
                id: "1-1-2",
                type: 'video',
                title: "Arrow Functions and Template Literals",
                status: 'completed',
                duration: "25 min",
                watchStatus: 'watched'
              },
              {
                id: "1-1-3",
                type: 'article',
                title: "Understanding Destructuring",
                status: 'completed',
                duration: "8 min read",
                readStatus: 'read'
              },
              {
                id: "1-1-4",
                type: 'assignment',
                title: "ES6 Practice Exercises",
                status: 'completed',
                description: "Complete a series of JavaScript exercises using ES6 features"
              }
            ]
          },
          {
            id: "2",
            name: "Async JavaScript",
            description: "Master asynchronous programming with promises, async/await, and error handling.",
            items: [
              {
                id: "1-2-1",
                type: 'video',
                title: "Promises and Async/Await",
                status: 'completed',
                duration: "30 min",
                watchStatus: 'watched'
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
            id: "1",
            name: "Getting Started with React",
            description: "Introduction to React library, JSX, and creating your first React application.",
            items: [
              {
                id: "2-1-1",
                type: 'video',
                title: "What is React?",
                status: 'completed',
                duration: "20 min",
                watchStatus: 'watched'
              },
              {
                id: "2-1-2",
                type: 'live-class',
                title: "Setting up React Environment",
                status: 'completed',
                duration: "90 min",
                meetLink: "https://meet.google.com/react-setup-123",
                attendanceStatus: 'present'
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
            id: "1",
            name: "Custom Hooks and Context API",
            description: "Learn to create reusable logic with custom hooks and manage global state with Context API.",
            items: [
              {
                id: "3-1-1",
                type: 'video',
                title: "Creating Custom Hooks",
                status: 'in-progress',
                duration: "35 min",
                watchStatus: 'not-watched'
              },
              {
                id: "3-1-2",
                type: 'live-class',
                title: "Context API Deep Dive",
                status: 'not-started',
                duration: "90 min",
                scheduledDateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                meetLink: "https://meet.google.com/context-api-456"
              },
              {
                id: "3-1-3",
                type: 'assignment',
                title: "Build a Theme Switcher",
                status: 'not-started',
                description: "Create a theme switcher using Context API and custom hooks",
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              },
              {
                id: "3-1-4",
                type: 'assessment',
                title: "React Advanced Concepts Quiz",
                status: 'not-started',
                description: "Test your understanding of hooks, context, and performance optimization",
                duration: "45 min",
                scheduledDateTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
              },
              {
                id: "3-1-5",
                type: 'feedback',
                title: "Module Feedback",
                status: 'not-started',
                description: "Share your feedback about the Advanced React Concepts module"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Android App Development with Kotlin",
    description: "Build native Android applications using Kotlin and modern Android development tools",
    instructor: {
      name: "Prof. Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
    progress: 35,
    status: 'enrolled',
    batchName: "AND-2024-B",
    duration: "5 months",
    studentsEnrolled: 38,
    upcomingItems: [
      {
        id: "1",
        type: 'class',
        title: "Live Class: Activity Lifecycle",
        description: "Understanding Android activity lifecycle and state management",
        dateTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        tag: "Upcoming Live Class",
        actionText: "Class starts in 1 day",
        canStart: false,
        daysUntil: 1
      }
    ],
    attendanceStats: {
      percentage: 90,
      attended: 9,
      total: 10,
      recentClasses: [
        {
          id: "1",
          name: "Kotlin Fundamentals",
          status: 'attended',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          instructor: "Prof. Michael Rodriguez"
        }
      ]
    },
    currentModule: {
      id: "2",
      name: "Android UI Development",
      currentChapter: "Layouts and Views",
      currentItem: "Linear and Relative Layouts",
      nextItem: {
        type: "live-class",
        name: "Activity Lifecycle",
        scheduledTime: "Tomorrow at 3:00 PM"
      },
      isJustStarting: false
    },
    modules: [
      {
        id: "1",
        name: "Kotlin Programming",
        topics: [
          {
            id: "1",
            name: "Kotlin Basics",
            description: "Introduction to Kotlin programming language and its syntax.",
            items: [
              {
                id: "1-1-1",
                type: 'live-class',
                title: "Introduction to Kotlin",
                status: 'completed',
                duration: "90 min",
                attendanceStatus: 'present'
              }
            ]
          }
        ]
      },
      {
        id: "2",
        name: "Android UI Development",
        topics: [
          {
            id: "1",
            name: "Layouts and Views",
            description: "Learn about different layout types and view components in Android.",
            items: [
              {
                id: "2-1-1",
                type: 'video',
                title: "Linear and Relative Layouts",
                status: 'in-progress',
                duration: "30 min",
                watchStatus: 'not-watched'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "3",
    name: "Python for Data Science",
    description: "Learn Python programming for data analysis and machine learning",
    instructor: {
      name: "Dr. Emily Watson",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
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
      currentItem: "All content completed",
      nextItem: {
        type: "completed",
        name: "Course Certificate Available"
      },
      isJustStarting: false
    },
    modules: []
  }
];
