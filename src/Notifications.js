import React from "react";
import PropTypes from "prop-types";

const Notification = props => {
  return (
    <div className="notification">
      {props.isErrorShow ? props.errorMessage : props.message}
    </div>
  );
};

Notification.propTypes = {
  key: PropTypes.number,
  isErrorShow: PropTypes.boolean,
  errorMessage: PropTypes.string,
  message: PropTypes.string
};

export default Notification;
