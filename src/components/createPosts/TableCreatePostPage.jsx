import { React, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { message } from "antd";
import { axiosInstance } from "../../js/auth.config";
import { Button, Modal } from "react-bootstrap";

export default function TableCreatePostPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [getData, setGetData] = useState([]);
  const [deleteNew, setDeleteNew] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAllData = async () => {
    setIsFetching(true);
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL_APP}/new`
      );

      setGetData(response.data.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    if (!isFetching) {
      getAllData();
    }
  }, [getData]);

  const handleDelete = async (postId) => {
    try {
      // Gửi yêu cầu xóa bài viết đến server
      await axiosInstance.delete(
        `${process.env.REACT_APP_API_URL_APP}/new/${postId}`
      );

      // Cập nhật state hoặc gọi lại hàm lấy dữ liệu mới (nếu cần)
      const updatedData = getData.filter((post) => post.id !== postId);
      setGetData(updatedData);
    } catch (error) {
      console.log(error);

      return message.error("Xóa bài viết thất bại");
      // Xử lý lỗi xóa bài viết nếu cần
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 170 }}>Bài viết mới nhất</TableCell>
              <TableCell align="right" style={{ minWidth: 170 }}>
                Tiêu đề ngắn
              </TableCell>
              <TableCell align="right" style={{ minWidth: 170 }}>
                Sự kiện
              </TableCell>
              <TableCell align="right" style={{ minWidth: 170 }}>
                Ngày tạo
              </TableCell>
              <TableCell align="right" style={{ minWidth: 170 }}>
                Xóa bài viết
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  <TableCell
                    align="left"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxHeight: "40px",
                    }}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxHeight: "40px",
                    }}
                  >
                    {row.short_title}
                  </TableCell>

                  <TableCell
                    align="right"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxHeight: "40px",
                    }}
                  >
                    {row.category_name}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxHeight: "40px",
                    }}
                  >
                    {moment(row.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    <Button variant="primary" onClick={handleShow}>
                    <DeleteIcon />
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Xóa bài viết</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Bạn có chắc chắn muốn xóa ?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Đóng
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => handleDelete(row.id)}
                        >
                          Xác nhận
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100, 1000, 5000]}
        component="div"
        count={getData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
        footer={
          <div>
            <Button
              ghost
              type="primary" danger
              onClick={() => {
                setDeleteNew(false);
              }}
            >
              HỦY
            </Button>

            <Button
              type="primary"
              ghost
              onClick={() => {
                setDeleteNew(false);

                handleDelete();
              }}
            >
              OK
            </Button>
          </div>
        }
        title="DELETE BÀI VIẾT"
        open={deleteNew}
        onCancel={() => {
          setDeleteNew(false);
        }}
      >
        <p>Bạn có chắc chắn muốn xóa bài viết này ?</p>
      </Modal>
    </Paper>
  );
}
