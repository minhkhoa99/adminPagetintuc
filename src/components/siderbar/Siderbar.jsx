import React from "react";

const Siderbar = () => {
    return (
      
       <aside id="sidebar" className="js-sidebar">
        
            <div className="h-100">
                <div className="sidebar-logo">
                    <a href="#">Wellcome</a>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-header">
                       Menu
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                            <i className="fa-solid fa-list pe-2"></i>
                            Trang chủ
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link collapsed" data-bs-target="#pages" data-bs-toggle="collapse"
                            aria-expanded="false"><i className="fa-solid fa-file-lines pe-2"></i>
                            Bài viết
                        </a>
                        <ul id="pages" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link">Tạo bài viết</a>
                            </li>
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link">Cập nhật bài viết</a>
                            </li>
                        </ul>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link collapsed" data-bs-target="#posts" data-bs-toggle="collapse"
                            aria-expanded="false"><i className="fa-solid fa-sliders pe-2"></i>
                            Lịch làm việc
                        </a>
                        <ul id="posts" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link">Tạo lịch làm việc</a>
                            </li>
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link">Cập nhật lịch làm việc</a>
                            </li>
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link">Xóa lịch làm việc</a>
                            </li>
                        </ul>
                    </li>

                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link collapsed" data-bs-target="#multi" data-bs-toggle="collapse"
                            aria-expanded="false"><i className="fa-solid fa-share-nodes pe-2"></i>
                            Cài đặt
                        </a>
                        <ul id="multi" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li className="sidebar-item">
                                <a href="#" className="sidebar-link collapsed" data-bs-target="#level-1"
                                    data-bs-toggle="collapse" aria-expanded="false">Tài khoản</a>
                                <ul id="level-1" className="sidebar-dropdown list-unstyled collapse">
                                    <li className="sidebar-item">
                                        <a href="#" className="sidebar-link">Đổi mật khẩu</a>
                                    </li>
                                    <li className="sidebar-item">
                                        <a href="#" className="sidebar-link">Tạo tài khoản</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>

    );
  }
  
  export default Siderbar;