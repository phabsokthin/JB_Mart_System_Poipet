import React, { useState } from "react";
import MessageError from "../message/MessageError";

interface ImageUploadProps {
  maxSizeMB: number;
  allowedTypes: string[];
  setImageUrl: (url: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  maxSizeMB,
  allowedTypes,
  setImageUrl,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null); // Holds error message

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes

    // Reset error message for new file selection
    setErrMsg(null);

    if (file) {
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        setErrMsg("សូមបញ្ចូលរូបភាព PNG, JPG");
        setSelectedImage(null); // Reset image preview
        setImageUrl(null); // Reset image URL in parent component
        return; // Early return on error
      }
    
      // Validate file size
      if (file.size > maxSize) {
        setErrMsg(`រូបភាពមិនអាចលើសពី ${maxSizeMB} MB`);
        setSelectedImage(null); // Reset image preview
        setImageUrl(null); // Reset image URL in parent component
        return; // Early return on error
      }

      // Create a URL for the selected image and update state
      const objectUrl = URL.createObjectURL(file);
      setSelectedImage(objectUrl); // Set the local image preview
      setImageUrl(objectUrl); // Pass the URL to the parent component
    } else {
      // If no file is chosen, reset image preview and URL
      setSelectedImage(null);
      setImageUrl(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center w-[200px]">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed cursor-pointer h-36 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {selectedImage ? (
              <img src={selectedImage} alt="Preview" className="w-auto h-32" />
            ) : (
              <div>
                <div className="flex justify-center text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500 lucide lucide-image"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  បញ្ជូលរូបភាព
                </p>
              </div>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {errMsg && <MessageError message={errMsg} />}
    </div>
  );
};

export default ImageUpload;
