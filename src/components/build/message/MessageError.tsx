import { useEffect, useState } from "react";

interface MessageErrorProps {
  message: string;
  onClear: () => void; 
}

function MessageError({ message, onClear }: MessageErrorProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClear(); 
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, onClear]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed right-0 z-[2] -top-20 w-2/3">
      <div
        className="flex items-center w-full max-w-xs p-4 text-white rounded-full shadow-2xl bg-red-500/80 animate-fade-down dark:bg-gray-800"
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-white bg-red-400 rounded-full dark:bg-blue-800 dark:text-blue-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
        <div className="text-lg font-NotoSansKhmer ms-3">{message}</div>
      </div>
    </div>
  );
}

export default MessageError;
