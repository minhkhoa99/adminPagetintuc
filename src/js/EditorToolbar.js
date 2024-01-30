import React from "react";
import { Quill } from "react-quill";
import { axiosInstance } from "./auth.config";
import { message } from "antd";

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const allowedImageFormats = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];
const allowedVideoFormats = [
  "video/mp4",
  "video/avi",
  "video/mkv",
  "video/mov",
];
const CustomUndo = () => (
  <svg viewBox='0 0 18 18'>
    <polygon className='ql-fill ql-stroke' points='6 10 4 12 2 10 6 10' />
    <path
      className='ql-stroke'
      d='M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9'
    />
  </svg>
);

//getImageURL

export const uploadImageToServer = async (file) =>{
  
  if(!allowedImageFormats.includes(file.type)){
    message.error(`Vui lòng chọn ảnh đúng định dạng`);
  }

  const formData = new FormData();
  formData.append("file", file); // Tên 'image' phải khớp với tên bạn sử dụng trong upload.single('image').

  try {
    let uploadEndpoint = `${process.env.REACT_APP_API_URL_APP}/upload-image`; // Endpoint mặc định cho ảnh

    const response = await axiosInstance.post(uploadEndpoint, formData);

    return response.data.data.link;
  } catch (error) {
    console.error(error);
    message.error("Lỗi tải lên hình ảnh")
    return false
  }
}

export const uploadVideoToServer = async (file) =>{

  if(!allowedVideoFormats.includes(file.type)){
    message.error(`Vui lòng chọn ảnh đúng định dạng`);
  }

  const formData = new FormData();
  formData.append("file", file); // Tên 'image' phải khớp với tên bạn sử dụng trong upload.single('image').
  formData.append("title",file.name)
  try {
    let uploadEndpoint = `${process.env.REACT_APP_API_URL_APP}/upload-video`; // Endpoint mặc định cho ảnh

    const response = await axiosInstance.post(uploadEndpoint, formData);

    return response.data.data.link;
  } catch (error) {
    console.error(error);
    message.error("Lỗi tải lên Video")
    return false
  }
}

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox='0 0 18 18'>
    <polygon className='ql-fill ql-stroke' points='12 10 14 12 16 10 12 10' />
    <path
      className='ql-stroke'
      d='M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5'
    />
  </svg>
);

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "Inter",
  "lucida",
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = (props, imageHandler, VideoHandler) => ({
  toolbar: {
    container: "#" + props,
    handlers: {
      undo: undoChange,
      redo: redoChange,
      image: imageHandler,
      video: VideoHandler
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
});

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "code-block",
];

// Quill Toolbar component
export const QuillToolbar = (props) => {

  return (
    <>
      {props.toolbarId !== undefined && (
        <div id={props.toolbarId}>
          <span className='ql-formats'>
            <button className='ql-bold' />
            <button className='ql-italic' />
            <button className='ql-underline' />
            <button className='ql-strike' />
          </span>
          <span className='ql-formats'>
            <select className='ql-font'>
              <option value='arial'> Arial </option>
              <option value='comic-sans'>Comic Sans</option>
              <option value='courier-new'>Courier New</option>
              <option value='georgia'>Georgia</option>
              <option value='helvetica'>Helvetica</option>
              <option value='Inter' selected>
                Inter
              </option>
              <option value='lucida'>Lucida</option>
            </select>
            <select className='ql-size'>
              <option value='extra-small'>Extra Small</option>
              <option value='small'>Small</option>
              <option value='medium' selected>
                Medium
              </option>
              <option value='large'>Large</option>
            </select>
            <select className='ql-header'>
              <option value='1'>Heading 1</option>
              <option value='2'>Heading 2</option>
              <option value='3'>Heading 3</option>
              <option value='4'>Heading 4</option>
              <option value='5'>Heading 5</option>
              <option value='6'>Heading 6</option>
              <option value='' selected>
                Normal
              </option>
            </select>
          </span>
          <span className='ql-formats'>
            <button className='ql-list' value='ordered' />
            <button className='ql-list' value='bullet' />
            <button className='ql-indent' value='-1' />
            <button className='ql-indent' value='+1' />
          </span>
          <span className='ql-formats'>
            <button className='ql-script' value='super' />
            <button className='ql-script' value='sub' />
            <button className='ql-blockquote' />
            <button className='ql-direction' />
          </span>
          <span className='ql-formats'>
            <select className='ql-align' />
            <select className='ql-color' />
            <select className='ql-background' />
          </span>
          <span className='ql-formats'>
            <button className='ql-link' />
            <button className='ql-image' />
            <button className='ql-video' />
          </span>
          <span className='ql-formats'>
            <button className='ql-formula' />
            <button className='ql-code-block' />
            <button className='ql-clean' />
          </span>
          <span className='ql-formats'>
            <button className='ql-undo'>
              <CustomUndo />
            </button>
            <button className='ql-redo'>
              <CustomRedo />
            </button>
          </span>
        </div>
      )}
    </>
  );
};
export default QuillToolbar;
