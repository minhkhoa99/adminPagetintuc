import React, { useEffect, useState } from "react";
import HomePages from "./HomePages";
import Search from "./Search";
import "./css/mainpage.css";
import axios from "axios";
const MainPages = () => {
  const [getData, setGetData] = useState([]);

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

  const handleSearch = (searchTerm) => {
    // Filter data based on the search term
    const filteredData = getData.filter((row) => {
      return row.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    console.log(searchTerm);
    // // Pass the filtered data to HomePages
    setGetData(filteredData);
    return filteredData;
  };

  return (
    <React.Fragment>
      <main className='content px-3 py-2'>
        <div className='container-fluid'>
          <div className='mb-3 span-head view-pages'>
            <h4>Tìm kiếm bài viết</h4>
          </div>
          <div className='row'>
            <div className='col-12 col-md-6 d-flex'>
              <div className='cards flex-fill border-0 illustration'>
                <Search searchData={handleSearch}></Search>
              </div>
            </div>
          </div>
          <div className='border-0'>
            <HomePages getDataPages={getData}></HomePages>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default MainPages;
