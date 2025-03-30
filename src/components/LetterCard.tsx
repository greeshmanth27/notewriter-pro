
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { SavedLetter } from "@/lib/googleDrive";
import { FileText, ExternalLink } from "lucide-react";

interface LetterCardProps {
  letter: SavedLetter;
}

const LetterCard = ({ letter }: LetterCardProps) => {
  const formattedDate = formatDistanceToNow(new Date(letter.modifiedTime), {
    addSuffix: true,
  });

  return (
    <Card className="animate-scale-in hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <FileText size={18} className="text-primary" />
          <span className="truncate">{letter.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <p>Last modified: {formattedDate}</p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-primary" 
          onClick={() => window.open(letter.webViewLink, '_blank')}
        >
          <ExternalLink size={14} className="mr-2" />
          Open in Google Docs
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LetterCard;
