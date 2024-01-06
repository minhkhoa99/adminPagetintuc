import { TextField, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./postpage.css";
import ButtonUploadFile from "./ButtonUploadFile";
import { message } from "antd";

function FormCreatePosts() {
  const [values, setvalue] = useState("");

  const [category, setCategory] = useState([]);

  const [createNews, setCreateNews] = useState({
    title: "",
    shortTitle: "",
    host_new: "0",
    image: "",
    video: "",
    content: "",
    status: "0",
    CategoryId: "",
  });

  const [show, setShow] = useState(false);

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
  }, []);

  const handleImageUpload = (title, isImage, isVideo) => {
    if (isImage.includes(title.type)) {
      setCreateNews((prevCreateNews) => ({
        ...prevCreateNews,
        image: title.name,
      }));
    } else if (isVideo.includes(title.type)) {
      setCreateNews((prevCreateNews) => ({
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

      setCreateNews({ ...createNews, CategoryId: id });
    }

    setvalue(selectedValue);
  };
  useEffect(() => {
    if (createNews.title !== "") {
      createNews.status = "1";
      setCreateNews({ ...createNews, status: createNews.status });
    }
  }, [values]);

  const handleChange = async (events) => {
    try {
      const postClone = { ...createNews };
      postClone[events.target.name] = events.target.value;
      setCreateNews(postClone);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleCreateNews = async (events) => {
    try {
      events.preventDefault();

      if(!createNews.status || !createNews.CategoryId ||!createNews.title) {
        console.log(createNews.CategoryId);
        message.error('Tiêu đề hoặc sự kiện không được để trống')
        return false
      }
   
    const newsCreate = await axios.post("http://localhost:8000/new", {
        title: createNews.title,
        shortTitle: createNews.shortTitle,
        image: createNews.image,
        video: createNews.video,
        content: createNews.content,
        status: createNews.status,
        CategoryId: createNews.CategoryId,
      });

      if(!newsCreate) {
        return false
      }

      message.success("Tạo mới bài viết thành công");

      handleClose();
    } catch (error) {
      console.log(error);
      message.error("Tạo mới bài viết thất bại");
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
                value={createNews.title}
                onChange={handleChange}
                multiline
                maxRows={4}
              />

              <TextField
                id="filled-select-currency"
                select
                label="Sự kiện"
                defaultValue="Chọn sự kiện"
                helperText="Chọn sự kiện"
                onChange={handleEvent}
                variant="filled"
              >
                {category.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="short-title">
              <TextField
                id="outlined-multiline-flexible"
                label="Nhập tiêu đề ngắn"
                multiline
                maxRows={4}
                name="shortTitle"
                value={createNews.shortTitle}
                onChange={handleChange}
              />
            </div>

            <div className="uploadfile-btn">
              <ButtonUploadFile onFileUpload={handleImageUpload} />
            </div>

            <Form.Group
              className="mb-3 form-text-data"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Nội dung sự kiện</Form.Label>

              <Form.Control
                as="textarea"
                rows={10}
                name="content"
                value={createNews.content}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleCreateNews}>
            Tạo mới
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormCreatePosts;
