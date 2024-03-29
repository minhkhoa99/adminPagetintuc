import { TextField, MenuItem } from "@mui/material";
import { useState, useEffect, useRef, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { axiosInstance } from "../../js/auth.config";
import "./postpage.css";
import { message } from "antd";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats, uploadImageToServer, uploadVideoToServer } from "../../js/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
import ButtonUploadFileCreate from "../createPosts/ButtonUploadFileCreate";

 function FormCreatePosts() {
  const [values, setvalue] = useState("");

  const [category, setCategory] = useState([]);

  const reactQuillRef = useRef(null)

  const [createNews, setCreateNews] = useState({
    title: "",
    shortTitle: "",
    host_new: "",
    avatar: "",
    content: "",
    status: "0",
    CategoryId: 0,
  });
  const dataNew = [
    {
      id: 0,
      label: "Tin Thường",
      value: "0",
    },
    {
      id: 1,
      label: "Tin Hot",
      value: "1",
    },
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  }, []);

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

  const handleHotNew = (e) => {
    const selectedValue = e.target.value;
    const selectedMenuItem = dataNew.find(
      (option) => option.id === selectedValue
    );

    if (selectedMenuItem) {
      const { id } = selectedMenuItem;
      setCreateNews({ ...createNews, host_new: JSON.stringify(id) });
    }
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

      if (!createNews.status || !createNews.CategoryId || !createNews.title) {
        message.error("Tiêu đề hoặc sự kiện không được để trống");
        return false;
      }

      if (createNews.content.length < 50) {
        message.error("Vui lòng nhập tối đa 50 ký tự");
        return false;
      }

      const newsCreate = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL_APP}/new`,
        {
          title: createNews.title,
          shortTitle: createNews.shortTitle,
          avatar: createNews.avatar,
          host_new: createNews.host_new,
          content: createNews.content,
          status: createNews.status,
          category_id: createNews.CategoryId,
        }
      );

      if (!newsCreate) {
        message.success("Không thể tạo bài viết");
      }

      message.success("Tạo mới bài viết thành công");

      handleClose();
    } catch (error) {
      console.log(error);
      message.error("Tạo mới bài viết thất bại");
      return false
    }
  };

  const handleImageUpload = (title, isImage) => {
    if (isImage.includes(title.type)) {
      setCreateNews((prevCreateNews) => ({
        ...prevCreateNews,
        avatar: title.link,
      }));
    }
  };

  const ondescription = (value) => {
    setCreateNews({ ...createNews, content: value });
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

            <div className='short-title title-form '>
              <TextField
                id='outlined-multiline-flexible'
                label='Nhập tiêu đề ngắn'
                multiline
                maxRows={4}
                name='shortTitle'
                value={createNews.shortTitle}
                onChange={handleChange}
              />
              <TextField
                id='filled-select-currency'
                select
                label='Loại Tin'
                defaultValue='Chọn sự kiện'
                helperText='Chọn sự kiện'
                value={createNews.host_new}
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
              <ButtonUploadFileCreate onFileUpload={handleImageUpload} />
            </div>
            
            <Form.Group
              className='mb-3 form-text-data'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>Nội dung sự kiện</Form.Label>
              <EditorToolbar toolbarId={"t1"} />
              <ReactQuill
                ref={reactQuillRef}
                theme='snow'
                value={createNews.content}
                onChange={ondescription}
                placeholder={"Nhập nội dung bài viết...."}
                modules={modules("t1", imageHandler, VideoHandler)}
                formats={formats}
              />

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
