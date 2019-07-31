import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const ToolTip = props => (
  <div
    className={`tt-fs ${props.className} ${props.sticky &&
      props.message &&
      'sticky'}`}
  >
    <div className="tooltip-wrap">
      <span className="tooltip-text">{props.message}</span>
    </div>
    {props.children}
  </div>
);
ToolTip.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
  sticky: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({}),
  ]),
};

ToolTip.defaultProps = {
  message: '',
  className: '',
  sticky: false,
};

export default ToolTip;
