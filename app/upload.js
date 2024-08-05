import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
const Upload = () => {
  const [file, setFile] = useState(null); // State to store the selected file
  const [uploading, setUploading] = useState(false); // State to indicate the upload status
  const [uploadedUrl, setUploadedUrl] = useState(null); // State to store the uploaded image URL

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set the selected file
  };
};
export default Upload;
