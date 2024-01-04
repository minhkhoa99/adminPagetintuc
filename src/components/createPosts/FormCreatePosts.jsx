import { TextField, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios"
import "./postpage.css";

import ButtonCheck from "./ButtonCheck";
import ButtonUploadFile from "./ButtonUploadFile";

function FormCreatePosts() {


  const [value, setvalue] = useState('')

  const [category, setCategory] = useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    axios.get('http://localhost:8000/category')
      .then(data => {
        setCategory(data.data.data)
      })
      .catch(err => console.log(err))
  }, [])
  console.log(category);

  const handleEvent = (e) => {
    setvalue(e.target)
    console.log(value);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="span-btn-create">
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
                multiline
                maxRows={4}
              />

              <TextField
                id="filled-select-currency menu-items"
                select
                label="Thể loại"
                defaultValue="Tin Tức-Sự Kiện"
                helperText="Chọn sự kiện"
                onChange={handleEvent}
                variant="filled"
              >
                {category.map((option) => (

                  < MenuItem key={option.id} value={option.name} >
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
              <Form.Control as="textarea" rows={10} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Tạo mới
          </Button>
        </Modal.Footer>
      </Modal >
    </>
  );
}

export default FormCreatePosts;
