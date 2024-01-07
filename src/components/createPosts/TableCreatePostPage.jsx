import { React, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import moment from "moment";
import { message } from "antd";

export default function TableCreatePostPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [getData, setGetData] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAllData = async () => {
    await axios
      .get("http://localhost:8000/new")
      .then((response) => {
        setGetData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  const handleDelete = async (postId) => {
    try {
      // Gửi yêu cầu xóa bài viết đến server
      await axios.delete(`http://localhost:8000/new/${postId}`);

      // Cập nhật state hoặc gọi lại hàm lấy dữ liệu mới (nếu cần)
      const updatedData = getData.filter((post) => post.id !== postId);
      setGetData(updatedData);

      message.success("Xóa bài viết thành công");
    } catch (error) {
      console.log(error);
      // Xử lý lỗi xóa bài viết nếu cần
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 170 }}>Bài viết mới nhất</TableCell>
              <TableCell align='right' style={{ minWidth: 170 }}>
                Tiêu đề ngắn
              </TableCell>
              <TableCell align='right' style={{ minWidth: 170 }}>
                Sự kiện
              </TableCell>
              <TableCell align='right' style={{ minWidth: 170 }}>
                Ngày tạo
              </TableCell>
              <TableCell align='right' style={{ minWidth: 170 }}>
                Xóa bài viết
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  <TableCell
                    align='left'
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxHeight: "40px",
                    }}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell
                    align='right'
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxHeight: "40px",
                    }}
                  >
                    {row.short_title}
                  </TableCell>

                  <TableCell
                    align='right'
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxHeight: "40px",
                    }}
                  >
                    {row.category_name}
                  </TableCell>
                  <TableCell
                    align='right'
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxHeight: "40px",
                    }}
                  >
                    {moment(row.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align='right'>
                    {" "}
                    <IconButton
                      aria-label='delete'
                      size='large'
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100, 1000, 5000]}
        component='div'
        count={getData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
