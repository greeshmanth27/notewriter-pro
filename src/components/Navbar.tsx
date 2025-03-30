
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Edit, Save, FileText, User } from "lucide-react";

const Navbar = () => {
  const { user, signInWithGoogle, signOut } = useAuth();

  return (
    <nav className="border-b shadow-sm py-3 px-4 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Edit size={24} className="text-primary" />
          <span className="font-semibold text-xl">NoteWriter Pro</span>
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/write">
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit size={16} />
                  <span>Write</span>
                </Button>
              </Link>
              
              <Link to="/letters">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText size={16} />
                  <span>My Letters</span>
                </Button>
              </Link>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      <User size={16} />
                    </div>
                  )}
                  <span className="text-sm font-medium hidden md:inline">
                    {user.displayName || user.email?.split('@')[0] || "User"}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={signInWithGoogle} className="flex items-center gap-2">
              <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              Sign in with Google
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
