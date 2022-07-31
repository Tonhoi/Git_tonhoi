import React from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "./Button.module.scss";

const cx = classNames.bind(styles);
const Button = ({ children, to, href, onClick, className, id }) => {
  let Comp = "button";
  const prop = {
    onClick,
  };

  if (to) {
    prop.to = to;
    Comp = Link;
  } else if (href) {
    prop.href = href;
    Comp = "a";
  }
  const classes = cx("wrapper", {
    [className]: className,
  });

  return (
    <Comp className={classes} id={id} {...prop}>
      {children}
    </Comp>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
