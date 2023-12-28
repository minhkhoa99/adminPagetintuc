import React from "react";
import SearchUpdatePages from "./SearchUpdatePages";
import './updatePages.css';
import TableUpdatePages from "./TableUpdatePages";

const UpdatePostPages = () => {
return (
    <React.Fragment>
    <main className="content px-3 py-2">
    <div className="container-fluid">
        <div className="container-search-page">
    
        <div className="search-update">
            <SearchUpdatePages/>
        </div>
        </div>
       
        <div className="card border-0 table-update-pages">
            
           <TableUpdatePages/>
        </div>
    </div>
</main>

</React.Fragment>
)
}

export default UpdatePostPages;