import React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import {
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
} from "../../../components/Icons/Icons";

const cx = classNames.bind(styles);
const Footer = () => {
  return (
    <footer className={cx("footer")}>
      <div className={cx("container")}>
        <div className={cx("heading")}>
          <h3>
            Phim chất lượng cao online của <a href="/">XemPhim</a> khác gì so
            với các trang phim khác?
          </h3>
        </div>
        <ul className={cx("list")}>
          <li className={cx("item")}>
            Là phim bluray (reencoded), có độ phân giải thấp nhất là Full HD
            (1080p), trong khi hầu hết các trang phim khác chỉ có tới độ phân
            giải HD (720p) là cao nhất
          </li>
          <li className={cx("item")}>
            Chất lượng cao, lượng dữ liệu trên giây (bitrate) gấp từ 5 - 10 lần
            phim online thông thường - đây là yếu tố quyết định độ nét của phim
            (thậm chí còn quan trọng hơn độ phân giải)
          </li>
          <li className={cx("item")}>
            Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang
            phim khác (kể cả Youtube)
          </li>
          <li className={cx("item")}>
            Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân giải
            cao
          </li>
          <li className={cx("item")}>
            Nếu không hài lòng với phụ đề có sẵn, bạn có thể tự upload phụ đề
            của riêng mình để xem online
          </li>
          <li className={cx("item")}>
            Có lựa chọn hiện phụ đề song ngữ (tức hiện đồng thời cả tiếng Anh &
            tiếng Việt), phù hợp với những người muốn học tiếng Anh qua phụ đề
            phim
          </li>
        </ul>
        <div className={cx("layout-contacts")}>
          <a
            href="https://www.facebook.com/profile.php?id=100037037197396 "
            rel="noreferrer"
            className={cx("icon-link-block")}
          >
            <EmailIcon className={cx("icon")} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100037037197396"
            rel="noreferrer"
            target="_blank"
            className={cx("icon-link-block")}
          >
            <FacebookIcon className={cx("icon")} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100037037197396 "
            rel="noreferrer"
            className={cx("icon-link-block")}
          >
            <InstagramIcon className={cx("icon")} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
