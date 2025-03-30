
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const TextEditor = ({ value, onChange, placeholder = "Start writing your letter..." }: TextEditorProps) => {
  const [mounted, setMounted] = useState(false);
  
  // This prevents hydration issues with ReactQuill
  useEffect(() => {
    setMounted(true);
  }, []);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
  ];

  if (!mounted) {
    return (
      <div className="animate-pulse bg-muted h-[60vh] rounded-md"></div>
    );
  }

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
      theme="snow"
    />
  );
};

export default TextEditor;
