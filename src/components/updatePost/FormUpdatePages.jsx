import { TextField, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ButtonUploadFile from "./ButtonUploadFile";
import { axiosInstance } from "../../js/auth.config";

import { message } from "antd";
import "./updatePages.css";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../../js/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";

function FormUpdatePosts(props) {
  const [show, setShow] = useState(false);
  const [values, setvalue] = useState("");
  const [category, setCategory] = useState([]);
  const [editNews, setEditNews] = useState({
    id: null,
    title: "",
    shortTitle: "",
    image: "",
    video: "",
    content: "",
    status: "",
    CategoryId: "",
  });
  const [getIdNews, setGetIdNews] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function getData() {
      await axiosInstance
        .get("http://localhost:8000/category")
        .then((fetchData) => {
          setCategory(fetchData.data.data);
        })
        .catch((err) => console.log(err));
    }
    getData();

    async function getById() {
      await axiosInstance
        .get(`http://localhost:8000/new/${props.postId}`)
        .then((fetchData) => {
          setGetIdNews(fetchData.data.data.id);
        })
        .catch((err) => console.log(err));
    }

    getById();
  }, []);

  const handleImageUpload = (title, isImage, isVideo) => {
    if (isImage.includes(title.type)) {
      setEditNews((prevCreateNews) => ({
        ...prevCreateNews,
        image: title.name,
      }));
    } else if (isVideo.includes(title.type)) {
      setEditNews((prevCreateNews) => ({
        ...prevCreateNews,
        video: title.name,
      }));
    }
  };
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

  const handleeditNews = async (events) => {
    try {
      events.preventDefault();

      if (editNews.content.length < 50) {
        message.error("Vui lòng nhập tối đa 50 ký tự");
        return false;
      }

      if (!getIdNews) {
        message.error("Không tìm thấy id bài viết");
        return false;
      }

      if (!editNews.status || !editNews.CategoryId || !editNews.title) {
        console.log(editNews.CategoryId);
        message.error("Tiêu đề hoặc sự kiện không được để trống");
        return false;
      }

      const updateNews = await axiosInstance.put(
        `http://localhost:8000/new/${getIdNews}`,
        {
          title: editNews.title,
          shortTitle: editNews.shortTitle,
          image: editNews.image,
          video: editNews.video,
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

  const ondescription = (value) => {
    setEditNews({ ...editNews, content: value });
  };
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
                label='Nhập chủ đề sự kiện'
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

            <div className='short-title'>
              <TextField
                id='outlined-multiline-flexible'
                name='shortTitle'
                value={editNews.shortTitle}
                onChange={handleChange}
                label='Nhập tiêu đề ngắn'
                multiline
                maxRows={4}
              />
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
                theme='snow'
                value={editNews.content}
                onChange={ondescription}
                placeholder={"Nhập nội dung bài viết...."}
                modules={modules("t1")}
                formats={formats}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Đóng
          </Button>
          <Button variant='primary' onClick={handleeditNews}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormUpdatePosts;
