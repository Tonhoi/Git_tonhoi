import React from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);
const Button = ({ children, to, href, onClick, className, onChange }) => {
  let Comp = "button";
  const prop = {
    onClick,
    onChange,
  };

  if (to) {
    prop.to = to;
    Comp = "button";
  } else if (href) {
    prop.href = href;
    Comp = "a";
  }
  const classes = cx("wrapper", {
    [className]: className,
  });

  return (
    <Comp {...prop} className={classes}>
      {children}
    </Comp>
  );
};

export default Button;
