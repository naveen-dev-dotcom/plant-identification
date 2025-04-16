import React, { useState } from "react";
import PlantDetails from "./PlantDetails"; // Make sure the path is correct
import { CameraIcon } from '@heroicons/react/24/solid';



const ImageUpload = () => {
  const [imagePreview, setImagePreview] = useState(null); // For display
  const [base64Image, setBase64Image] = useState(null); // For passing to PlantDetails

  // Convert image to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result); // Save base64 value
      };
      reader.readAsDataURL(file); // Convert to base64
    }
  };

  return (
    <div className="flex flex-col items-center mb-6 space-y-6">
      {/* Image Upload Button */}
      <div className="flex flex-col items-center space-y-4">
  {/* Hidden file input */}
  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="hidden"
    id="imageUpload"
  />
  
  {/* Custom button with icon */}
  <label 
    htmlFor="imageUpload" 
    className="cursor-pointer bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg text-xl hover:bg-gray-700 transition duration-300 transform hover:scale-105 flex items-center space-x-3"
  >
    {/* Camera Icon with a color that fits the dark theme */}
    <CameraIcon className="h-6 w-6 text-gray-300" />
    <span className="text-gray-300">Upload Image</span>
  </label>
</div>

      {/* Display Uploaded Image */}
      {imagePreview && (
        <div className="mt-6">
          <img src={imagePreview} alt="Uploaded" className="w-64 h-64 object-cover rounded-lg shadow-lg" />
        </div>
      )}

      {/* Pass base64 to PlantDetails */}
      {base64Image && (
        <div className="mt-6 w-full max-w-md">
          <PlantDetails base64Image={base64Image} />
        </div>
      )}
      {/* Show only when no image is uploaded */}
      {!base64Image && (
        <p className="text-gray-500 mb-4">Please upload an image to identify the plant.</p>
      )}
    </div>
  );
};

export default ImageUpload;
