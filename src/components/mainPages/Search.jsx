import { Fragment, React } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function Search(handleSearch) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission on Enter key
    }
  };
  return (
    <Fragment>
      <Paper
        component='form'
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <IconButton sx={{ p: "10px" }} aria-label='menu'></IconButton>
        <InputBase
          className='input-search'
          sx={{ ml: 1, flex: 1 }}
          onKeyDown={handleKeyDown}
          onChange={(event) => handleSearch.searchData(event.target.value)}
          placeholder='Nhập tiêu đề bài viết'
          inputProps={{ "aria-label": "search bài viết" }}
        />
        <IconButton type='button' sx={{ p: "10px" }} aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Paper>
    </Fragment>
  );
}
