
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Edit, Save, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  const { user, signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="max-w-4xl mx-auto text-center py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Write Beautiful Letters <br className="hidden md:block" />
            <span className="text-primary">Save to Google Drive</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            A distraction-free writing experience with seamless Google Drive integration. 
            Write, save, and access your letters anywhere.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            {user ? (
              <>
                <Link to="/write">
                  <Button size="lg" className="gap-2">
                    <Edit size={18} />
                    Start Writing
                  </Button>
                </Link>
                
                <Link to="/letters">
                  <Button size="lg" variant="outline" className="gap-2">
                    <FileText size={18} />
                    My Letters
                  </Button>
                </Link>
              </>
            ) : (
              <Button size="lg" onClick={signInWithGoogle} className="gap-2">
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                Sign in with Google to Start
              </Button>
            )}
          </div>
        </section>
        
        <section className="max-w-5xl mx-auto py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="mb-4 bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <Edit className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Distraction-Free Writing</h3>
              <p className="text-muted-foreground">Focus on your words with our clean and minimal writing interface designed for concentration.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="mb-4 bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <Save className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Auto-Save Drafts</h3>
              <p className="text-muted-foreground">Never lose your work with automatic draft saving to your local storage as you write.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="mb-4 bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                <FileText className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Google Drive Integration</h3>
              <p className="text-muted-foreground">Save your finished letters directly to Google Drive and access them from anywhere.</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NoteWriter Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
