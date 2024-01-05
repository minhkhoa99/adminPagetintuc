import {React, useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FormUpdatePages from "./FormUpdatePages";
import axios from 'axios';
import moment from 'moment';

export default function TableUpdatePages() {
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
              Nội dung bài viết
            </TableCell>
            <TableCell align="right" style={{ minWidth: 170 }}>
              Sự kiện
            </TableCell>
            <TableCell align="right" style={{ minWidth: 170 }}>
              Ngày tạo
            </TableCell>
            <TableCell align="right" style={{ minWidth: 170 }}>
              Cập nhật bài viết
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="right">{row.shortTitle}</TableCell>
                <TableCell align="right">{row.content}</TableCell>
                <TableCell align="right">{row.CategoryId}</TableCell>
                <TableCell align="right">
                  {moment(row.createdAt).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <FormUpdatePages postId={row.id}/>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={getData.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Paper>
  );
}