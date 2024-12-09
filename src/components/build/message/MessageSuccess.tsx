import { useEffect, useState } from "react";

interface MessageSuccessProps {
  message: string; // Message to display in the toast
  onClear: () => void; // Callback to notify when the toast is cleared
}

function MessageSuccess({ message, onClear }: MessageSuccessProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;

    // Show the toast
    setVisible(true);

    // Hide the toast after 4 seconds and call onClear
    const timer = setTimeout(() => {
      setVisible(false);
      onClear();
    }, 4000);

    return () => clearTimeout(timer);
  }, [message, onClear]);

  if (!visible) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <div className="fixed z-10 top-3">
        <div
          className="flex items-center w-full max-w-xs p-4 text-white rounded-full shadow-2xl bg-green-500/80 animate-fade-down dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-white bg-green-400 rounded-full dark:bg-blue-800 dark:text-blue-200">
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
              className="lucide lucide-check"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <div className="text-lg font-NotoSansKhmer ms-3">{message}</div>
        </div>
      </div>
    </div>
  );
}

export default MessageSuccess;
