import { useEffect, useState } from "react";

interface MessageSuccessProps {
  message: string;
  onClear: () => void;
}


function MessagWarning({ message, onClear }: MessageSuccessProps) {
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
      <div className="fixed z-10 top-3 ">
        <div
          className="flex items-center w-full max-w-xs p-4 text-black bg-yellow-400 rounded-full shadow-2xl text-bal animate-fade-down dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-black bg-yellow-500 rounded-full dark:bg-blue-800 dark:text-blue-200">
            <div>
              !
            </div>
          </div>
          <div className="text-lg font-NotoSansKhmer ms-3">{message}</div>
        </div>
      </div>
    </div>
  );
}

export default MessagWarning;
