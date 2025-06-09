
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { X, Play, FileText, BookOpen } from "lucide-react";

interface ContentBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: string;
  contentTitle: string;
  contentId: string;
}

const ContentBottomSheet = ({
  isOpen,
  onClose,
  contentType,
  contentTitle,
  contentId,
}: ContentBottomSheetProps) => {
  const renderContent = () => {
    switch (contentType) {
      case 'video':
      case 'recording':
        return (
          <div className="space-y-4">
            <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Video Player</p>
                <p className="text-xs text-muted-foreground">Content ID: {contentId}</p>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{contentTitle}</h3>
              <p className="text-muted-foreground">
                This is a placeholder for the video content. In a real implementation, 
                this would contain the actual video player with the content.
              </p>
            </div>
          </div>
        );
      
      case 'article':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{contentTitle}</h3>
                <p className="text-sm text-muted-foreground">Article Content</p>
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              <p>This is a placeholder for the article content. In a real implementation, this would contain the actual article text, images, and formatting.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </div>
        );
      
      case 'assignment':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary-light flex items-center justify-center">
                <FileText className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{contentTitle}</h3>
                <p className="text-sm text-muted-foreground">Assignment Details</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-2">Assignment Instructions</h4>
                <p className="text-sm text-muted-foreground">
                  This is a placeholder for assignment instructions. In a real implementation, 
                  this would contain the actual assignment details, requirements, and submission guidelines.
                </p>
              </div>
              <div className="flex gap-2">
                <Button>Start Assignment</Button>
                <Button variant="outline">Download Resources</Button>
              </div>
            </div>
          </div>
        );
      
      case 'assessment':
      case 'quiz':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-warning-light flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{contentTitle}</h3>
                <p className="text-sm text-muted-foreground">Assessment Details</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-2">Assessment Information</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  This assessment contains multiple choice questions and will test your understanding 
                  of the topics covered in this module.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Duration:</span> 30 minutes
                  </div>
                  <div>
                    <span className="font-medium">Questions:</span> 15
                  </div>
                  <div>
                    <span className="font-medium">Attempts:</span> 3
                  </div>
                  <div>
                    <span className="font-medium">Passing Score:</span> 70%
                  </div>
                </div>
              </div>
              <Button>Start Assessment</Button>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Content type not supported</p>
          </div>
        );
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[70vh] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="flex flex-row items-center justify-between space-y-0 p-6 border-b">
            <SheetTitle className="text-left">
              {contentType === 'video' ? 'Video' :
               contentType === 'recording' ? 'Recording' :
               contentType === 'article' ? 'Article' :
               contentType === 'assignment' ? 'Assignment' :
               contentType === 'assessment' ? 'Assessment' :
               contentType === 'quiz' ? 'Quiz' :
               'Content'}
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </SheetHeader>
          
          <ScrollArea className="flex-1 p-6">
            {renderContent()}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ContentBottomSheet;
