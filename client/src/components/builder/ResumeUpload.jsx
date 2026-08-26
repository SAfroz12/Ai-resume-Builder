import { useRef, useState } from "react";
import axios from "axios";

function ResumeUpload() {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setError("");

    // Frontend validation
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    // 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB");
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/resume/upload",
        formData
      );

      console.log("Backend response:", response.data);

      console.log("File name:", response.data.fileName);

      console.log("Extracted text:", response.data.text);

    } catch (error) {
      console.error("Upload error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to upload resume"
      );
    } finally {
      setLoading(false);

      // allows selecting the same file again
      e.target.value = "";
    }
  };

  return (
    <>
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Uploading..." : "Upload Resume"}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {error && (
        <p>{error}</p>
      )}
    </>
  );
}

export default ResumeUpload;