
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Loader2, Edit, FileX } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { SavedLetter, listLettersFromGoogleDrive } from "@/lib/googleDrive";
import Navbar from "@/components/Navbar";
import LetterCard from "@/components/LetterCard";

const MyLetters = () => {
  const navigate = useNavigate();
  const { user, getAccessToken } = useAuth();
  const [letters, setLetters] = useState<SavedLetter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
      toast({
        title: "Authentication Required",
        description: "Please sign in to view your letters",
        variant: "destructive",
      });
    }
  }, [user, navigate]);

  // Fetch letters from Google Drive
  useEffect(() => {
    const fetchLetters = async () => {
      if (!user) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const accessToken = await getAccessToken();
        
        if (!accessToken) {
          throw new Error("Failed to get access token");
        }
        
        const fetchedLetters = await listLettersFromGoogleDrive(accessToken);
        setLetters(fetchedLetters);
      } catch (error) {
        console.error("Error fetching letters:", error);
        setError("Failed to fetch your letters from Google Drive");
        toast({
          title: "Error",
          description: "There was a problem retrieving your letters",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLetters();
  }, [user, getAccessToken]);

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Letters</h1>
            
            <Button onClick={() => navigate("/write")} className="gap-2">
              <Edit size={16} />
              Write New Letter
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Loading your letters...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 p-6 rounded-lg text-center">
              <p className="text-destructive font-medium">{error}</p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : letters.length === 0 ? (
            <div className="bg-muted/50 p-8 rounded-lg text-center">
              <FileX className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">No Letters Found</h3>
              <p className="text-muted-foreground mb-6">
                You haven't saved any letters to Google Drive yet.
              </p>
              <Button onClick={() => navigate("/write")}>
                Write Your First Letter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {letters.map((letter) => (
                <LetterCard key={letter.id} letter={letter} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyLetters;
