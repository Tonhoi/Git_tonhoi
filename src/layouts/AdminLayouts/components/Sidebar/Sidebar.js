import React from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import { routes } from "../../../../configs";
import styles from "./Sidebar.module.scss";
import {
  ChatIcon,
  DisplayListIcon,
  HomeIcon,
  UserIcon,
} from "../../../../components/Icons";
import { Link } from "react-router-dom";
import MenuItem from "./Menu/MenuItem";

const cx = classNames.bind(styles);
const Sidebar = () => {
  const toggleSideBarAdmin = useSelector(
    (prev) => prev.root.toggleSideBarAdmin
  );
  return (
    <div
      className={cx("sidebar", {
        active: toggleSideBarAdmin,
      })}
    >
      <div className={cx("image-block")}>
        <img src="https://xemphim.fun/static/skin/logo-full.png" alt="" />
      </div>
      <div className={cx("list")}>
        <MenuItem
          to={routes.dashboard}
          icon={<HomeIcon />}
          title="Dashboards"
        />

        <h4>phim</h4>
        <MenuItem
          to={routes.managerComment}
          icon={<DisplayListIcon className={cx("icon")} />}
          title="Phân loại"
        />

        <h4>Quản lí</h4>

        <MenuItem
          to={routes.managerComment}
          icon={<ChatIcon />}
          title="Quản lí bình luận"
        />

        <MenuItem
          to={routes.managerUser}
          icon={<UserIcon />}
          title="Quản lí người dùng"
        />

        <h4>Authentication</h4>

        <MenuItem to={routes.managerUser} icon={<UserIcon />} title="Users" />

        <MenuItem to={routes.managerUser} icon={<UserIcon />} title="role" />
      </div>
    </div>
  );
};

export default Sidebar;
