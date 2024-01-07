import { TextField, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { axiosInstance } from "../../js/auth.config";
import "./postpage.css";
import { message } from "antd";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../../js/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";

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

  const [data, setData] = useState("");

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
      console.log("ids: ", id);
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
      if (createNews.content.length < 50) {
        message.error("Vui lòng nhập tối đa 50 ký tự");
        return false;
      }

      if (!createNews.status || !createNews.CategoryId || !createNews.title) {
        message.error("Tiêu đề hoặc sự kiện không được để trống");
        return false;
      }

      const newsCreate = await axiosInstance.post("http://localhost:8000/new", {
        title: createNews.title,
        shortTitle: createNews.shortTitle,
        image: createNews.image,
        video: createNews.video,
        content: createNews.content,
        status: createNews.status,
        category_id: createNews.CategoryId,
      });

      if (!newsCreate) {
        return false;
      }

      message.success("Tạo mới bài viết thành công");

      handleClose();
    } catch (error) {
      console.log(error);
      message.error("Tạo mới bài viết thất bại");
      throw error;
    }
  };

  const ondescription = (value) => {
    setCreateNews({ ...createNews, content: value });
  };
  return (
    <>
      <Button
        variant='primary'
        onClick={handleShow}
        className='span-btn-create'
      >
        Thêm sự kiện
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
                value={createNews.title}
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
                label='Nhập tiêu đề ngắn'
                multiline
                maxRows={4}
                name='shortTitle'
                value={createNews.shortTitle}
                onChange={handleChange}
              />
            </div>

            <Form.Group
              className='mb-3 form-text-data'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>Nội dung sự kiện</Form.Label>
              <EditorToolbar toolbarId={"t1"} />
              <ReactQuill
                theme='snow'
                value={createNews.content}
                onChange={ondescription}
                placeholder={"Nhập nội dung bài viết...."}
                modules={modules("t1")}
                formats={formats}
              />

              {/* <ButtonUploadFile onFileUpload={handleImageUpload} /> */}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Đóng
          </Button>
          <Button variant='primary' onClick={handleCreateNews}>
            Tạo mới
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormCreatePosts;
