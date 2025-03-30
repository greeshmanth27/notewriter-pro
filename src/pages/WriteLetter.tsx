
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useDraft } from "@/hooks/use-draft";
import { saveLetterToGoogleDrive } from "@/lib/googleDrive";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import TextEditor from "@/components/TextEditor";
import Navbar from "@/components/Navbar";
import { Save, FileText, AlertCircle } from "lucide-react";

const WriteLetter = () => {
  const navigate = useNavigate();
  const { user, getAccessToken } = useAuth();
  const { draft, updateTitle, updateContent, saveDraft, isSaving } = useDraft();
  
  const [isSavingToGDrive, setIsSavingToGDrive] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
      toast({
        title: "Authentication Required",
        description: "Please sign in to write letters",
        variant: "destructive",
      });
    }
  }, [user, navigate]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (!autoSaveEnabled || !draft.content) return;
    
    const autoSaveInterval = setInterval(() => {
      saveDraft();
    }, 30000);
    
    return () => clearInterval(autoSaveInterval);
  }, [autoSaveEnabled, draft.content, saveDraft]);

  // Handle content change with debounce
  const handleContentChange = useCallback((content: string) => {
    updateContent(content);
  }, [updateContent]);

  // Save to Google Drive
  const handleSaveToGoogleDrive = async () => {
    if (!draft.title) {
      toast({
        title: "Title Required",
        description: "Please add a title to your letter",
        variant: "destructive",
      });
      return;
    }
    
    if (!draft.content.trim()) {
      toast({
        title: "Content Required",
        description: "Your letter is empty. Please write something before saving.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSavingToGDrive(true);
    
    try {
      const accessToken = await getAccessToken();
      
      if (!accessToken) {
        throw new Error("Failed to get access token");
      }
      
      await saveLetterToGoogleDrive(accessToken, draft.title, draft.content);
      
      toast({
        title: "Letter Saved",
        description: "Your letter has been successfully saved to Google Drive",
      });
      
      navigate("/letters");
    } catch (error) {
      console.error("Error saving to Google Drive:", error);
      toast({
        title: "Save Failed",
        description: "There was an error saving your letter to Google Drive",
        variant: "destructive",
      });
    } finally {
      setIsSavingToGDrive(false);
    }
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <Input
                type="text"
                value={draft.title}
                onChange={(e) => updateTitle(e.target.value)}
                placeholder="Letter Title"
                className="text-xl font-medium"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                onClick={saveDraft} 
                variant="outline" 
                size="sm" 
                className="gap-2" 
                disabled={isSaving}
              >
                <Save size={16} />
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
              
              <Button 
                onClick={handleSaveToGoogleDrive} 
                size="sm" 
                className="gap-2" 
                disabled={isSavingToGDrive}
              >
                <FileText size={16} />
                {isSavingToGDrive ? "Saving..." : "Save to Google Drive"}
              </Button>
            </div>
          </div>
          
          {draft.lastSaved && (
            <div className="text-xs text-muted-foreground mb-2">
              Last saved locally: {new Date(draft.lastSaved).toLocaleString()}
            </div>
          )}
          
          <TextEditor
            value={draft.content}
            onChange={handleContentChange}
          />
          
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle size={14} />
            <span>
              Changes are automatically saved to your browser's local storage every 30 seconds.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WriteLetter;
