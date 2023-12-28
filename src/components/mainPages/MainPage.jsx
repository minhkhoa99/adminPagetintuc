import React from "react";
import HomePages from "./HomePages";
import Search from "./Search";
import './css/mainpage.css';
const MainPages = () => {

    return (
        <React.Fragment>
               <main className="content px-3 py-2">
                <div className="container-fluid">
                    <div className="mb-3 span-head view-pages">
                        <h4>Tìm kiếm bài viết</h4>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 d-flex">
                            <div className="cards flex-fill border-0 illustration">
                           <Search></Search>
                            </div>
                        </div>
                    </div>
                    <div className="card border-0">
                        
                           <HomePages></HomePages>               
                    </div>
                </div>
            </main>

            
        </React.Fragment>
    )
}

export default MainPages;