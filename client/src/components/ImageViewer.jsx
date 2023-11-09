// components/ImageViewer.js
import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
const ImageViewer = () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3450/api/images/profilePic`,
          {
            headers: {
              Authorization: cookie.get("token"),
            },
          }
        );
        console.log(response.data.imageUrl);
        setImageUrl(response.data.imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="mb-4">
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" width={"160px"} height={"auto"} />
      )}
    </div>
  );
};

export default ImageViewer;
