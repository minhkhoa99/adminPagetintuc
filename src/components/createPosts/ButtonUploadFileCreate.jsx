import { Button, Upload, message } from "antd";
import { axiosInstance } from "../../js/auth.config";
import { UploadOutlined } from "@mui/icons-material";
import unidecode from "unidecode";

const ButtonUploadFileCreate = ({ onFileUpload }) => {
  const allowedImageFormats = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
  ];

  const handleChange = async (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (
      info.file.status === "error" ||
      !allowedImageFormats.includes(info.file.type)
    ) {
      message.error(`${info.file.name} file upload failed.`);
    }

    onFileUpload(info.file, allowedImageFormats);
  };

  const handleImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const formData = new FormData();
    formData.append("file", file); // Tên 'image' phải khớp với tên bạn sử dụng trong upload.single('image').

    try {
      let uploadEndpoint = `${process.env.REACT_APP_API_URL_APP}/upload-image`; // Endpoint mặc định cho ảnh

      const response = await axiosInstance.post(uploadEndpoint, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress({ percent: percentCompleted });
        },
      });

      onSuccess(response.data, file);
    } catch (error) {
      console.error(
        `Error uploading ${allowedImageFormats.includes(file.type)}:`,
        error
      );
      onError(error);
    }
  };

  return (
    <Upload
      showUploadList={{ showRemoveIcon: true }}
      customRequest={handleImage}
      onChange={handleChange}
    >
      <Button icon={<UploadOutlined />}>Tải avatar</Button>
    </Upload>
  );
};
export default ButtonUploadFileCreate;
