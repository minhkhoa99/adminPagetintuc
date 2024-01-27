import React, { useEffect, useState } from "react";
import SearchUpdatePages from "./SearchUpdatePages";
import "./updatePages.css";
import TableUpdatePages from "./TableUpdatePages";
import { axiosInstance } from "../../js/auth.config";

const UpdatePostPages = () => {
  const [getData, setGetData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const getAllData = async () => {
    await axiosInstance
      .get("http://localhost:8000/new")
      .then((response) => {
        setGetData(response.data.data);
        setFilteredData(response.data.data);
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

    // // Pass the filtered data to HomePages
    setFilteredData(filteredData);
    return filteredData;
  };

  return (
    <React.Fragment>
      <main className='content px-3 py-2'>
        <div className='container-fluid'>
          <div className='container-search-page'>
            <div className='search-update'>
              <SearchUpdatePages searchData={handleSearch} />
            </div>
          </div>

          <div className='card border-0 table-update-pages'>
            <TableUpdatePages getDataPages={filteredData} />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default UpdatePostPages;
