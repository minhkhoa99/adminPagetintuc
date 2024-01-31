import React from "react";
import './siderbar.css'
const Siderbar = () => {
  return (
    <aside id='sidebar' className='js-sidebar'>
      <div className='h-100'>
        <div className='sidebar-logo'>
          <p className="title-sidlebar">Wellcome</p>
        </div>
        <ul className='sidebar-nav'>
          <li className='sidebar-header'>Menu</li>
          <li className='sidebar-item'>
            <a
              href={`${process.env.REACT_APP_URL_LINK}/admin/home-page`}
              className='sidebar-link'
            >
              <i className='fa-solid fa-list pe-2'></i>
              Trang chủ
            </a>
          </li>
          <li className='sidebar-item'>
            <a
              href='#'
              className='sidebar-link collapsed'
              data-bs-target='#pages'
              data-bs-toggle='collapse'
              aria-expanded='false'
            >
              <i className='fa-solid fa-file-lines pe-2'></i>
              Bài viết
            </a>
            <ul
              id='pages'
              className='sidebar-dropdown list-unstyled collapse'
              data-bs-parent='#sidebar'
            >
              <li className='sidebar-item'>
                <a
                  href={`${process.env.REACT_APP_URL_LINK}/admin/pages/postPages`}
                  className='sidebar-link'
                >
                  Tạo bài viết
                </a>
              </li>
              <li className='sidebar-item'>
                <a
                  href={`${process.env.REACT_APP_URL_LINK}/admin/pages/updatePages`}
                  className='sidebar-link'
                >
                  Cập nhật bài viết
                </a>
              </li>
            </ul>
          </li>
          <li className={`${process.env.REACT_APP_URL_LINK}/sidebar-item`}>
            <a href='/admin/image/' className='sidebar-link collapsed'>
              Danh sách đơn vị liên kết
            </a>
          </li>
          <li className='sidebar-item'>
            <a
              href={`${process.env.REACT_APP_URL_LINK}/admin/sdile/`}
              className='sidebar-link collapsed'
            >
              Hình ảnh tiêu biểu
            </a>
          </li>
          <li className='sidebar-item'>
            <a
              href='#'
              className='sidebar-link collapsed'
              data-bs-target='#multi'
              data-bs-toggle='collapse'
              aria-expanded='false'
            >
              <i className='fa-solid fa-share-nodes pe-2'></i>
              Cài đặt
            </a>
            <ul
              id='multi'
              className='sidebar-dropdown list-unstyled collapse'
              data-bs-parent='#sidebar'
            >
              <li className='sidebar-item'>
                <a
                  href='#'
                  className='sidebar-link collapsed'
                  data-bs-target='#level-1'
                  data-bs-toggle='collapse'
                  aria-expanded='false'
                >
                  Tài khoản
                </a>
                <ul
                  id='level-1'
                  className='sidebar-dropdown list-unstyled collapse'
                >
                  <li className='sidebar-item'>
                    <a
                      href={`${process.env.REACT_APP_URL_LINK}/admin/user`}
                      className='sidebar-link'
                    >
                      Quản lý tài khoản
                    </a>
                  </li>
                  <li className='sidebar-item'>
                    <a
                      href={`${process.env.REACT_APP_URL_LINK}/admin/register/`}
                      className='sidebar-link'
                    >
                      Tạo tài khoản
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Siderbar;
