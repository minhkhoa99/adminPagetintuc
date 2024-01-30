import { TextField, MenuItem } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { axiosInstance } from "../../js/auth.config";

import { message } from "antd";
import "./updatePages.css";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats, uploadVideoToServer, uploadImageToServer } from "../../js/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
import ButtonUploadFile from "./ButtonUploadFile";
import axios from "axios";

function FormUpdatePosts(props) {
  const [show, setShow] = useState(false);
  const [values, setvalue] = useState("");
  const reactQuillRef = useRef(null)
  const [category, setCategory] = useState([]);
  const [editNews, setEditNews] = useState({
    title: "",
    shortTitle: "",
    host_new: "",
    avatar: "",
    content: "",
    status: "",
    CategoryId: "",
  });
  const dataNew = [
    {
      id: 1,
      label: "Tin Hot",
      value: "1",
    },
    {
      id: 0,
      label: "Tin Thường",
      value: "0",
    },
  ];
  const [getIdNews, setGetIdNews] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [getNewId, setGetNewId] = useState()

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL_APP}/new/${props.postId}`)
    .then((data) => setGetNewId(data.data.data) )
    .catch((err) => console.log(err))
  }, [])
  console.log(getNewId);

  useEffect(() => {
    async function getData() {
      await axiosInstance
        .get(`${process.env.REACT_APP_API_URL_APP}/category`)
        .then((fetchData) => {
          setCategory(fetchData.data.data);
        })
        .catch((err) => console.log(err));
    }
    getData();

    async function getById() {
      await axiosInstance
        .get(`${process.env.REACT_APP_API_URL_APP}/new/${props.postId}`)
        .then((fetchData) => {
          setGetIdNews(fetchData.data.data.id);
        })
        .catch((err) => console.log(err));
    }

    getById();
  }, []);

  const handleEvent = (e) => {
    e.preventDefault();

    const selectedValue = e.target.value;
    const selectedMenuItem = category.find(
      (option) => option.id === selectedValue
    );

    if (selectedMenuItem) {
      const { id } = selectedMenuItem;

      setEditNews({ ...editNews, CategoryId: id });
    }

    setvalue(selectedValue);
  };
  const handleHotNew = (e) => {
    const selectedValue = e.target.value;
    const selectedMenuItem = dataNew.find(
      (option) => option.id === selectedValue
    );

    if (selectedMenuItem) {
      const { id } = selectedMenuItem;
      setEditNews({ ...editNews, host_new: JSON.stringify(id) });
    }
  };
  useEffect(() => {
    if (editNews.title !== "") {
      editNews.status = "1";
      setEditNews({ ...editNews, status: editNews.status });
    }
  }, [values]);

  const handleChange = async (events) => {
    try {
      const postClone = { ...editNews };
      postClone[events.target.name] = events.target.value;
      setEditNews(postClone);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleEditNews = async (events) => {
    try {
      events.preventDefault();

      if (!getIdNews) {
        message.error("Không tìm thấy id bài viết");
        return false;
      }

      if (!editNews.status || !editNews.CategoryId || !editNews.title) {
        message.error("Tiêu đề hoặc sự kiện không được để trống");
        return false;
      }

      if (editNews.content.length < 50) {
        message.error("Vui lòng nhập tối đa 50 ký tự");
        return false;
      }


      const updateNews = await axiosInstance.put(
        `${process.env.REACT_APP_API_URL_APP}/new/${getIdNews}`,
        {
          title: editNews.title,
          shortTitle: editNews.shortTitle,
          avatar: editNews.avatar,
          host_new: editNews.host_new,
          content: editNews.content,
          status: editNews.status,
          CategoryId: editNews.CategoryId,
        }
      );

      if (!updateNews) {
        return false;
      }
      message.success("Cập nhật bài viết thành công");

      handleClose();
    } catch (error) {
      console.log(error);
      message.error("Cập nhật bài viết thất bại");
      throw error;
    }
  };

  const handleImageUpload = (title, isImage) => {
    if (isImage.includes(title.type)) {
      setEditNews((prevCreateNews) => ({
        ...prevCreateNews,
        avatar: title.link,
      }));
    }
  };

  const ondescription = (value) => {
    setEditNews({ ...editNews, content: value });
  };

  const imageHandler = useCallback((ref)=>{
  
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const getUrl = await uploadImageToServer(file)
       
        const quill = await reactQuillRef.current;
      
        if (quill) {
          const urlImg = `${process.env.REACT_APP_API_URL_APP}/${getUrl}`
          const range = quill.getEditorSelection();
          range && quill.getEditor().insertEmbed(range.index, "image", urlImg);
        }
      }
    };
  }, [])

  const VideoHandler = useCallback((ref)=>{
  
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/*");
    input.click();
    input.onchange = async () => {
      
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const getUrl = await uploadVideoToServer(file)
      
        const quill = await reactQuillRef.current;
      
        if (quill) {
          const urlImg = `${process.env.REACT_APP_API_URL_APP}/${getUrl}`
          const range = quill.getEditorSelection();
          range && quill.getEditor().insertEmbed(range.index, "video", urlImg);
        }
      }
    };
  }, [])

  return (
    <>
      <Button
        variant='primary'
        onClick={handleShow}
        className='span-btn-create'
      >
        Cập nhật bài viết
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm sự kiện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className='title-form '>
              <TextField
                id='outlined-multiline-flexible'
                label={getNewId.title}
                name='title'
                value={editNews.title}
                onChange={handleChange}
                multiline
                maxRows={4}
              />

              <TextField
                id='filled-select-currency'
                select
                label='Sự kiện'
                defaultValue='Chọn sự kiện'
                helperText='Chọn sự kiện'
                onChange={handleEvent}
                variant='filled'
              >
                {category.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className='short-title title-form '>
              <TextField
                id='outlined-multiline-flexible'
                label={getNewId.shortTitle}
                multiline
                maxRows={4}
                name='shortTitle'
                value={editNews.shortTitle}
                onChange={handleChange}
              />
              <TextField
                id='filled-select-currency'
                select
                label='Loại Tin'
                defaultValue='Chọn sự kiện'
                helperText='Chọn sự kiện'
                value={editNews.host_new}
                onChange={handleHotNew}
                variant='filled'
              >
                {dataNew.map((option) => {
                  return (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  );
                })}
              </TextField>
            </div>

            <div className='uploadfile-btn'>
              <ButtonUploadFile onFileUpload={handleImageUpload} />
            </div>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>Nội dung sự kiện</Form.Label>
              <EditorToolbar toolbarId={"t1"} />
              <ReactQuill
              ref={reactQuillRef}
                theme='snow'
                value={editNews.content}
                onChange={ondescription}
                placeholder={"Nhập nội dung bài viết...."}
                modules={modules("t1",imageHandler,VideoHandler)}

                formats={formats}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Đóng
          </Button>
          <Button variant='primary' onClick={handleEditNews}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormUpdatePosts;
