import React from "react";
import classNames from "classnames/bind";
import styles from "./FaqPage.module.scss";

const cx = classNames.bind(styles);
const FaqPage = () => {
  return (
    <div className={cx("wrapper")}>
      <span className={cx("title")}>Câu hỏi thường gặp</span>
      <div className={cx("container")}>
        <div className={cx("heading")}>
          <span className={cx("first-child")}>
            1. Xem phim bị chậm, mặc dù đã kích hoạt VIP Mode cho phim đó?
          </span>
          <span>
            Nếu phim chạy nhưng cứ một đoạn lại bị dừng để chờ load tiếp (dù đã
            thử chọn các server khác nhau), cần xác định do thiết bị hay do mạng
            của bạn.
          </span>
        </div>
        <div className={cx("content")}>
          <ul className={cx("list")}>
            <li>
              Hãy thử xem phim trên một thiết bị khác (máy tính / điện thoại /
              TV...). Nếu đổi sang thiết bị khác phim lại chạy mượt =&gt; do
              thiết bị cũ của bạn. Nếu đó là TV, hãy kiểm tra thiết lập TV và
              tắt giao thức kết nối mạng IPv6. Nếu đó là một thiết bị chạy iOS,
              thì hãy thử dùng một trình duyệt khác (chẳng hạn Chrome) thay vì
              trình duyệt Safari mặc định, nhưng nói chung player trên iOS rất
              hay có vấn đề với phim bitrate cao + âm thanh 5.1.
            </li>
            <li>
              Nếu phim chạy chậm trên tất cả các thiết bị mà bạn thử, với tất cả
              các server mà trang web cung cấp (bật chế độ VIP mới có), thì đó
              là do băng thông đường truyền quốc tế mạng của bạn bị bóp (do
              đường truyền quốc tế bị nghẽn vào giờ cao điểm hoặc đứt cáp...).
              Có 2 cách giải quyết: 1. Gọi điện phản ánh với nhà mạng; 2. Sử
              dụng một VPN (mạng riêng ảo) để tăng tốc độ cho mạng của bạn.
              Chúng tôi <strong>đề xuất bạn dùng ứng dụng WARP</strong> =&gt;
              <a href="https://1.1.1.1/" target="_blank" rel="noreferrer">
                <span> download tại đây</span>
              </a>{" "}
              ( hoặc tải WARP+{" "}
              <a
                href="https://apkcombo.com/vi/vpn/"
                target="_blank"
                rel="noreferrer"
              >
                tại đây
              </a>
              ).
            </li>
          </ul>
          <div>
            <span>
              Lưu ý: việc bật VPN sẽ làm thay đổi tuyến đường truyền dữ liệu từ
              máy chủ tới thiết bị của bạn, và không phải cứ bật VPN mạng sẽ
              nhanh hơn - đôi khi bật VPN sẽ khiến mạng bạn chậm hơn! Cũng giống
              như có lúc tuyến đường này tắc, giao thông ùn trệ, thì nên đổi
              sang tuyến đường khác thông thoáng hơn, nhưng lúc khác thì ngược
              lại!
            </span>
            <span>
              Do đó, lúc nào xem phim bị lag hãy làm như sau để tìm được tuyến
              đường truyền dữ liệu nhanh nhất:
            </span>
            <ul className={cx("list-sub")}>
              <li>
                <strong>Tắt</strong> VPN rồi thử đổi từng server trên trang web
              </li>
              <li>
                <strong>Bật</strong> VPN rồi thử đổi từng server trên trang web
              </li>
            </ul>
            <span>
              ...cho tới khi tìm được sự kết hợp nào giúp xem phim mượt nhất. Và
              hãy nhớ, sự kết hợp đó chưa chắc đã là tốt nhất mọi lúc. Nên lúc
              nào bị lag, hãy lặp lại các bước thử trên!
            </span>
          </div>
        </div>
        <div>
          <div className={cx("heading")}>
            <span className={cx("first-child")}>
              2. Gặp vấn đề về âm thanh: phim không có tiếng, mất tiếng nhân
              vật, hoặc âm thanh bị rè?
            </span>
          </div>
          <ul className={cx("list")}>
            <li>
              Nếu xem trên điện thoại: Lỗi âm thanh là do trình duyệt của bạn
              (thường là Chrome). Hãy{" "}
              <a
                href="https://play.google.com/store/apps/details?id=org.mozilla.firefox"
                target="_blank"
                rel="noreferrer"
              >
                cài và dùng trình duyệt Firefox!
              </a>
            </li>
            <li>
              Nếu bạn xem trên PC: Khác với phim / clip trên các web khác (kể cả
              Youtube), phim trên XemPhim sử dụng âm thanh 5.1 (6 channel) thay
              vì âm thanh stereo (2 channel). Nếu thiết bị bạn xem chỉ có 2 loa,
              bạn cần thiết lập chương trình quản lý âm thanh trên thiết bị cho
              đúng: chọn đúng chế độ với số loa mình có (stereo), đừng chọn
              nhiều hơn, nếu không thiết bị của bạn sẽ cố gắng xuất âm thanh ra
              những loa không tồn tại =&gt; mất tiếng. Ví dụ đây là phần chọn
              các chế độ âm thanh của Realtek HD Audio Manager:{" "}
              <a
                href="https://imgur.com/a/D6nPGcl"
                target="_blank"
                rel="noreferrer"
              >
                click vào đây
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className={cx("heading")}>
            <span className={cx("first-child")}>
              3. Làm sao để xem phim trên TV?
            </span>
          </div>
          <div>
            <p>
              Để xem phim trên TV, TV bạn phải có trình duyệt web. Hầu hết các
              loại Smart TV những năm gần đây đều có cài sẵn trình duyệt. Nếu TV
              bạn không có sẵn trình duyệt, bạn có thể cài trình duyệt từ cửa
              hàng ứng dụng (Google Play Store / CH Play / App Store) trên TV.
              Với TV Android, bạn nên cài trình duyệt Puffin. Sau khi cài trình
              duyệt, truy cập trang web như bạn vẫn làm trên máy tính / điện
              thoại và xem phim.
            </p>
            <p>
              Nếu bạn không thể xem phim bằng trình duyệt trên TV, bạn có thể
              kết nối máy tính với TV (thường qua cổng HDMI) rồi phát từ máy
              tính lên TV.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
