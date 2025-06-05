
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";

const ContentViewer = () => {
  const { type, contentId } = useParams();

  const getContent = () => {
    switch (contentId) {
      case 'video-1':
        return {
          title: "Introduction to React Components",
          type: "video",
          content: (
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Video Player - Introduction to React Components</p>
            </div>
          )
        };
      case 'article-1':
        return {
          title: "Understanding JSX Syntax",
          type: "article",
          content: (
            <div className="prose max-w-none">
              <h2>Understanding JSX Syntax</h2>
              <p>JSX is a syntax extension to JavaScript. It produces React "elements". JSX may remind you of a template language, but it comes with the full power of JavaScript.</p>
              <h3>Why JSX?</h3>
              <p>React embraces the fact that rendering logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display.</p>
              <p>Instead of artificially separating technologies by putting markup and logic in separate files, React separates concerns with loosely coupled units called "components" that contain both.</p>
              <h3>Embedding Expressions in JSX</h3>
              <p>You can put any valid JavaScript expression inside the curly braces in JSX.</p>
            </div>
          )
        };
      case 'video-2':
        return {
          title: "Props and State Management",
          type: "video",
          content: (
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Video Player - Props and State Management</p>
            </div>
          )
        };
      default:
        return {
          title: "Content Not Found",
          type: "unknown",
          content: <p>The requested content could not be found.</p>
        };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to={`/course/1/curriculum`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Curriculum
            </Link>
          </Button>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-heading font-bold">{content.title}</h1>
            <Button variant="outline" size="sm">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark as Complete
            </Button>
          </div>
        </div>

        <Card className="shadow-8dp">
          <CardContent className="p-8">
            {content.content}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentViewer;
