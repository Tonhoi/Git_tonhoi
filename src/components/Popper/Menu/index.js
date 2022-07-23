import PropTypes from "prop-types";
import React, { useState } from "react";
import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";

import styles from "./MenuItem.module.scss";
import Wrapper from "../Wrapper";
import MenuItem from "./MenuItem";
import Header from "./Header";
const cx = classNames.bind(styles);
const Menu = ({ children, items = [], onChange }) => {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  const RenderItem = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      // console.log(item);
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={(e) => {
            if (isParent) {
              setHistory((prev) => {
                return [...prev, item.children];
              });
            } else {
              onChange(item);
            }
          }}
        ></MenuItem>
      );
    });
  };
  return (
    // Interactive tippy element may not be accessible via keyboard navigation because it is not directly after the reference element in the DOM source order. Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context. Specifying `appendTo: document.body` silences this warning, but it assumes you are using a focus management solution to handle keyboard navigation
    <div>
      <HeadlessTippy
        interactive
        placement="bottom-end"
        delay={[50, 100]}
        hideOnClick="false"
        render={(attrs) => (
          <div className={cx("list")} tabIndex="-1" {...attrs}>
            <Wrapper>
              {history.length > 1 && (
                <Header
                  title="Language"
                  onBack={(e) => {
                    setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
                  }}
                />
              )}
              {/* {renderItem()} */}
              <RenderItem />
            </Wrapper>
          </div>
        )}
        onHidden={() => {
          setHistory((prev) => prev.slice(0, 1));
        }}
      >
        <div>{children}</div>
      </HeadlessTippy>
    </div>
  );
};

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  onChange: PropTypes.func,
};

export default Menu;
