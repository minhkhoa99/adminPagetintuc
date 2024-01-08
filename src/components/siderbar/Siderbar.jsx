import React from "react";

const Siderbar = () => {
  return (
    <aside id="sidebar" className="js-sidebar">
      <div className="h-100">
        <div className="sidebar-logo">
          <a href="#">Wellcome</a>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-header">Menu</li>
          <li className="sidebar-item">
            <a href="http://localhost:3000/admin/home-page" className="sidebar-link">
              <i className="fa-solid fa-list pe-2"></i>
              Trang chủ
            </a>
          </li>
          <li className="sidebar-item">
            <a
              href="#"
              className="sidebar-link collapsed"
              data-bs-target="#pages"
              data-bs-toggle="collapse"
              aria-expanded="false"
            >
              <i className="fa-solid fa-file-lines pe-2"></i>
              Bài viết
            </a>
            <ul
              id="pages"
              className="sidebar-dropdown list-unstyled collapse"
              data-bs-parent="#sidebar"
            >
              <li className="sidebar-item">
                <a
                  href={"http://localhost:3000/admin/pages/postPages"}
                  className="sidebar-link"
                >
                  Tạo bài viết
                </a>
              </li>
              <li className="sidebar-item">
                <a
                  href="http://localhost:3000/admin/pages/updatePages"
                  className="sidebar-link"
                >
                  Cập nhật bài viết
                </a>
              </li>
            </ul>
          </li>

          <li className="sidebar-item">
            <a
              href="#"
              className="sidebar-link collapsed"
              data-bs-target="#multi"
              data-bs-toggle="collapse"
              aria-expanded="false"
            >
              <i className="fa-solid fa-share-nodes pe-2"></i>
              Cài đặt
            </a>
            <ul
              id="multi"
              className="sidebar-dropdown list-unstyled collapse"
              data-bs-parent="#sidebar"
            >
              <li className="sidebar-item">
                <a
                  href="#"
                  className="sidebar-link collapsed"
                  data-bs-target="#level-1"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                >
                  Tài khoản
                </a>
                <ul
                  id="level-1"
                  className="sidebar-dropdown list-unstyled collapse"
                >
                  <li className="sidebar-item">
                    <a href="/admin/user" className="sidebar-link">
                     Quản lý tài khoản
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="/admin/register/" className="sidebar-link">
                      Tạo tài khoản
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#" className="sidebar-link">
                      Đổi mật khẩu
                    </a>
                  </li>
                </ul>
              </li>
             
            </ul>
          </li>
          <li className="sidebar-item">
              <a
                  href="/admin/image/"
                  className="sidebar-link collapsed"
                >
                  List Image
                </a>
              </li>
              <li className="sidebar-item">
              <a
                  href="/admin/image-slider/"
                  className="sidebar-link collapsed"
                >
                  List Image Slider
                </a>
              </li>
              
        </ul>
      </div>
    </aside>
  );
};

export default Siderbar;
