import { TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./postpage.css";

import ButtonCheck from "./ButtonCheck";
import ButtonUploadFile from "./ButtonUploadFile";

function FormCreatePosts() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const currencies = [
    {
      value: "Tin Tức-Sự Kiện",
      label: "Tin Tức-Sự Kiện",
    },
    {
      value: "Tuyên truyền Cổ Động",
      label: "Tuyên truyền Cổ Động",
    },
    {
      value: "Nghệ Thuật Quần Chúng ",
      label: "Nghệ Thuật Quần Chúng",
    },
    {
      value: "Tuyên Truyền Lưu Động",
      label: "Tuyên Truyền Lưu Động",
    },
    {
      value: "Chiếu Phim-Lưu Động",
      label: "Chiếu Phim-Lưu Động",
      },
  ];

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
            <div className="title-form">
              <TextField
                id="outlined-multiline-flexible"
                label="Nhập chủ đề sự kiện"
                multiline
                maxRows={4}
              />

              <TextField
                id="filled-select-currency"
                select
                label="Thể loại"
                defaultValue="Tin Tức-Sự Kiện"
                helperText="Chọn sự kiện"
                variant="filled"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
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
      </Modal>
    </>
  );
}

export default FormCreatePosts;
