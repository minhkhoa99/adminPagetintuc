import React from "react";
import HomePages from "./HomePages";
const MainPages = () => {

    return (
        <React.Fragment>
                        <main className="content px-3 py-2">
                <div className="container-fluid">
                    <div className="mb-3">
                        <h4>Admin Dashboard</h4>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 d-flex">
                            <div className="card flex-fill border-0 illustration">
                                <div className="card-body p-0 d-flex flex-fill">
                                    <div className="row g-0 w-100">
                                        <div className="col-6">
                                            <div className="p-3 m-1">
                                                <h4>Welcome Back, Admin</h4>
                                                <p className="mb-0">Admin Dashboard, CodzSword</p>
                                            </div>
                                        </div>
                                        <div className="col-6 align-self-end text-end">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-flex">
                            <div className="card flex-fill border-0">
                                <div className="card-body py-4">
                                    <div className="d-flex align-items-start">
                                        <div className="flex-grow-1">
                                            <h4 className="mb-2">
                                                $ 78.00
                                            </h4>
                                            <p className="mb-2">
                                                Total Earnings
                                            </p>
                                            <div className="mb-0">
                                                <span className="badge text-success me-2">
                                                    +9.0%
                                                </span>
                                                <span className="text-muted">
                                                    Since Last Month
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
  
                    <div className="card border-0">
                        
                           <HomePages></HomePages>
                       
                    </div>
                </div>
            </main>
            <a href="#" className="theme-toggle">
                <i className="fa-regular fa-moon"></i>
                <i className="fa-regular fa-sun"></i>
            </a>
            
        </React.Fragment>
    )
}

export default MainPages;