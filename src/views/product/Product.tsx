import React, { useState, useEffect } from "react";
import ImageUpload from "../../components/build/uploadImage/UploadImage";
import MessageSuccess from "../../components/build/message/MessageSuccess";
import MessageError from "../../components/build/message/MessageError";
import MessageWarning from "../../components/build/message/MessageWarning"; // Make sure the import name is correct

const ParentComponent: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showWarning, setShowWarning] = useState(false); // State for warning message

  useEffect(() => {
    if (imageUrl) {
      console.log("Selected Image URL:", imageUrl.slice(0, 100) + "..."); // Log only the first 100 characters
    }
  }, [imageUrl]);

  const handleShowSuccess = () => {
    setShowSuccess(true);
    setShowError(false);
    setShowWarning(false); // Hide warning when showing success
    // Hide the success message after 2 seconds
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleShowError = () => {
    setShowError(true);
    setShowSuccess(false);
    setShowWarning(false); // Hide warning when showing error
    // Hide the error message after 2 seconds
    setTimeout(() => setShowError(false), 2000);
  };

  const handleShowWarning = () => {
    setShowWarning(true);
    setShowSuccess(false); // Hide success when showing warning
    setShowError(false); // Hide error when showing warning
    // Hide the warning message after 2 seconds
    setTimeout(() => setShowWarning(false), 2000);
  };

  return (
    <div>
      <ImageUpload
        maxSizeMB={2}
        allowedTypes={["image/jpeg", "image/png"]}
        setImageUrl={setImageUrl}
      />
      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt="Selected Preview"
            className="w-auto h-32 mt-4 rounded-lg"
          />
        </div>
      )}
      
      <div className="mt-4">
        <button
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          onClick={handleShowSuccess}
        >
          Show Success Message
        </button>
        <button
          className="px-4 py-2 ml-2 text-white bg-red-500 rounded hover:bg-red-600"
          onClick={handleShowError}
        >
          Show Error Message
        </button>
        <button
          className="px-4 py-2 ml-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
          onClick={handleShowWarning}
        >
          Show Warning Message
        </button>
      </div>
      
      {showSuccess && (
        <div className="mt-4">
          <MessageSuccess message="បានរក្សាទុកដោយជោគជ័យ" />
        </div>
      )}
      {showError && (
        <div className="mt-4">
          <MessageError message="បរាជ័យនៅក្នុងការបញ្ចូលទិន្ន័យ" />
        </div>
      )}
      {showWarning && (
        <div className="mt-4">
          <MessageWarning message="បម្រាប់ក្នុងការបញ្ជូលទិន្ន័យ" />
        </div>
      )}
    </div>
  );
};

export default ParentComponent;
