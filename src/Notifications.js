import React from "react";
import PropTypes from "prop-types";

const Notification = props => {
  return (
    <div className="notification">
      {props.isErrorMessage ? props.errorString : props.lastExecutedString}
    </div>
  );
};

Notification.propTypes = {
  lastExecutedString: PropTypes.string
};

export default Notification;
