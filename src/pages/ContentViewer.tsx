
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { mockCourses } from "@/lib/mockData";
import Header from "@/components/Header";

const ContentViewer = () => {
  const { type, id } = useParams();
  const courseId = "1"; // For demo purposes, assuming we're in course 1

  // Mock content data
  const getContent = () => {
    if (type === "video" || type === "recording") {
      return {
        title: type === "recording" ? "JavaScript Fundamentals - Class Recording" : "Introduction to Variables",
        type: "video",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      };
    } else if (type === "article") {
      return {
        title: "Understanding JavaScript Data Types",
        type: "article",
        content: `
          <h2>JavaScript Data Types</h2>
          <p>JavaScript has several built-in data types that are essential to understand...</p>
          <h3>Primitive Types</h3>
          <ul>
            <li><strong>String:</strong> Text data</li>
            <li><strong>Number:</strong> Numeric data</li>
            <li><strong>Boolean:</strong> True or false values</li>
            <li><strong>Undefined:</strong> Variable declared but not assigned</li>
            <li><strong>Null:</strong> Intentional absence of value</li>
          </ul>
          <p>Understanding these types is crucial for effective JavaScript programming...</p>
        `
      };
    }
    return null;
  };

  const content = getContent();

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold mb-2">Content Not Found</h1>
          <Button asChild>
            <Link to={`/course/${courseId}/curriculum`}>Back to Curriculum</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="mb-6">
          <Button variant="link" size="sm" asChild className="mb-4 p-0 h-auto text-foreground hover:text-foreground hover:no-underline">
            <Link to={`/course/${courseId}/curriculum`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Curriculum
            </Link>
          </Button>
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2">{content.title}</h1>
        </div>

        {content.type === "video" && (
          <div className="aspect-video mb-8">
            <iframe
              src={content.embedUrl}
              title={content.title}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        )}

        {content.type === "article" && (
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
            <div className="flex justify-center">
              <Button>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark as Read
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentViewer;
