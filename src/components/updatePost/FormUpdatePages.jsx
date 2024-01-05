import { TextField, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ButtonUploadFile from "./ButtonUploadFile";
import ButtonCheck from "./ButtonCheck";
import axios from "axios";

function FormUpdatePosts(props) {
  const [show, setShow] = useState(false);
  const [values, setvalue] = useState("");
  const [category, setCategory] = useState([]);
  const [editNews, setEditNews] = useState({
    id:null,
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
      await axios
        .get("http://localhost:8000/category")
        .then((fetchData) => {
          setCategory(fetchData.data.data);
          
        })
        .catch((err) => console.log(err));
    }
    getData();

    async function getById() {
      await axios
      .get(`http://localhost:8000/new/${props.postId}`)
      .then((fetchData) => {
        setGetIdNews(fetchData.data.data.id);
        
      })
      .catch((err) => console.log(err));
    }

    getById()
  }, []);

  const handleEvent = (e) => {
    e.preventDefault();

    const selectedValue = e.target.value;
    const selectedMenuItem = category.find((option) => option.id === selectedValue);

    if(selectedMenuItem) {
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
      if(getIdNews) {
         await axios.put(`http://localhost:8000/new/${getIdNews}`, {
          title: editNews.title,
          shortTitle: editNews.shortTitle,
          image: editNews.image,
          video: editNews.video,
          content: editNews.content,
          status: editNews.status,
          CategoryId: editNews.CategoryId,
        });
      }
    
      handleClose();
     
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <>
    <Button
      variant="primary"
      onClick={handleShow}
      className="span-btn-create"
    >
      Thêm sự kiện
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm sự kiện</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="title-form ">
            <TextField
              id="outlined-multiline-flexible"
              label="Nhập chủ đề sự kiện"
              name="title"
              value={editNews.title}
              onChange={handleChange}
              multiline
              maxRows={4}
            />

            <TextField
              id="filled-select-currency menu-items"
              select
              label="Sự kiện"
              defaultValue="Chọn sự kiện"
              helperText="Chọn sự kiện"
              onChange={handleEvent}
              variant="filled"
            >
              {category.map((option) => (
                <MenuItem key={option.id} value={option.id } >
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className="short-title">
            <TextField
              id="outlined-multiline-flexible"
              name="shortTitle"
              value={editNews.shortTitle}
              onChange={handleChange}
              label="Nhập tiêu đề ngắn"
              multiline
              maxRows={4}
            />
          </div>

          <div className="uploadfile-btn">
            <ButtonUploadFile />
          </div>

          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Nội dung sự kiện</Form.Label>
            <ButtonCheck />
            <Form.Control
              as="textarea"
              rows={10}
              name="content"
              value={editNews.content}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleeditNews}>
          Cập nhật
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  );
}

export default FormUpdatePosts;
