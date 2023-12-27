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
      value: "Chuyển đổi số",
      label: "Chuyển đổi số",
    },
    {
      value: "Văn hóa",
      label: "Văn hóa",
    },
    {
      value: "Thể thao",
      label: "Du lịch",
    },
    {
      value: "Gia đình",
      label: "Gia đình",
    },
    {
      value: "Đoàn thể",
      label: "Đoàn thể",
      },
  ];

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
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
                defaultValue="Chuyển đổi số"
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
