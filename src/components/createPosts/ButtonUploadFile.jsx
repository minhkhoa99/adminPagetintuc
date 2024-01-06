import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import axios from "axios";

const uploadFile = async (options) => {
  const { onSuccess, onError, file, onProgress } = options;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      "http://localhost:8000/upload-image",
      formData,
      {
        // Configure other Axios options if needed
        onUploadProgress: (progressEvent) => {
          const percent = Math.floor(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          onProgress({ percent });
        },
      }
    );

    // Handle success
    onSuccess(response.data);
    message.success("File uploaded successfully");
  } catch (error) {
    // Handle error
    onError(error);
    message.error("File upload failed");
  }
};

const customRequest = async ({ onSuccess, onError, file, onProgress }) => {
  // Simulate an asynchronous upload
  await uploadFile({ onSuccess, onError, file, onProgress });
};

const ButtonUploadFile = () => (
  <Upload customRequest={customRequest}>
    <Button icon={<UploadOutlined />}>Tải ảnh hoặc video</Button>
  </Upload>
);
export default ButtonUploadFile;
