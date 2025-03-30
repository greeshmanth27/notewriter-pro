
import { useEffect, useState } from "react";

interface DraftState {
  title: string;
  content: string;
  lastSaved: string | null;
}

const DRAFT_KEY = "letterWriterDraft";

export function useDraft() {
  const [draft, setDraft] = useState<DraftState>({
    title: "",
    content: "",
    lastSaved: null,
  });

  const [isSaving, setIsSaving] = useState(false);
  
  // Load draft from localStorage on initial render
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        setDraft(JSON.parse(savedDraft));
      }
    } catch (error) {
      console.error("Error loading draft:", error);
    }
  }, []);

  // Update title
  const updateTitle = (title: string) => {
    setDraft((prev) => ({ ...prev, title }));
  };

  // Update content
  const updateContent = (content: string) => {
    setDraft((prev) => ({ ...prev, content }));
  };

  // Save draft to localStorage
  const saveDraft = () => {
    setIsSaving(true);
    try {
      const now = new Date().toISOString();
      const updatedDraft = { ...draft, lastSaved: now };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(updatedDraft));
      setDraft(updatedDraft);
    } catch (error) {
      console.error("Error saving draft:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Clear draft
  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    setDraft({
      title: "",
      content: "",
      lastSaved: null,
    });
  };

  return {
    draft,
    updateTitle,
    updateContent,
    saveDraft,
    clearDraft,
    isSaving,
  };
}
