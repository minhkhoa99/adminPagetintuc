import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import axios from "axios";


const ButtonUploadFile = ({onFileUpload }) => {
  const allowedImageFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  const allowedVideoFormats = ['video/mp4', 'video/avi', 'video/mkv', 'video/mov'];

  const handleChange = async (info) => {
    
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);

    } else if (info.file.status === 'error' || (!allowedImageFormats.includes(info.file.type) && !allowedVideoFormats.includes(info.file.type))) {
      message.error(`${info.file.name} file upload failed.`);
    }

    onFileUpload(info.file, allowedImageFormats, allowedVideoFormats);
  };

  const handleImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const formData = new FormData();
    formData.append('link', file); // Tên 'image' phải khớp với tên bạn sử dụng trong upload.single('image').
    formData.append('title', file.name)
    try {
      let uploadEndpoint = 'http://localhost:8000/upload-image'; // Endpoint mặc định cho ảnh
  
      if (allowedVideoFormats.includes(file.type)) {
        uploadEndpoint = 'http://localhost:8000/upload-video'; // Endpoint cho video nếu là video
      }
  
      const response = await axios.post(uploadEndpoint, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress({ percent: percentCompleted });
        },
      });
  
      onSuccess(response.data, file);
    } catch (error) {
      console.error(`Error uploading ${allowedVideoFormats.includes(file.type) ? 'video' : 'image'}:`, error);
      onError(error);
    }
  };

  return (
    <Upload
      showUploadList={{ showRemoveIcon: true }}
      customRequest={handleImage}
      onChange={handleChange}
    >
      <Button icon={<UploadOutlined />}>Tải ảnh hoặc video</Button>
    </Upload>
  );
  
  };
export default ButtonUploadFile;
