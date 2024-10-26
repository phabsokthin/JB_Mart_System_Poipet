import { useEffect, useState } from "react";

interface MessageErrorProps {
  message: string; // Define the prop type
}

function MessageError({ message }: MessageErrorProps) {
  const [visible, setVisible] = useState(false); // Start as not visible

  useEffect(() => {
    if (message) {
      setVisible(true); // Show the message when it changes
      const timer = setTimeout(() => {
        setVisible(false); // Hide after 5 seconds
      }, 2000);

      return () => clearTimeout(timer); // Cleanup on unmount or message change
    } else {
      setVisible(false); // Hide if no message is present
    }
  }, [message]); // Dependency array includes message

  // If not visible, return null
  if (!visible) {
    return null;
  }

  return (
    <div className="fixed right-0 z-[2] -top-2 w-2/3">
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
          <span className="sr-only">Error icon</span>
        </div>
        <div className="text-lg font-NotoSansKhmer ms-3">{message}</div>
      </div>
    </div>
  );
}

export default MessageError;
