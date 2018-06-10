import React from "react";
import "./index.css";
import PropTypes from "prop-types";

const Notification = props => {
  return <div className="notification">{props.lastExecutedString}</div>;
};

Notification.propTypes = {
  lastExecutedString: PropTypes.string
};

export default Notification;
