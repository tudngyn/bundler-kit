import Loading from './../Loading';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectGlobalLoadingStatus } from '../../redux/selectors/layout';
import './style.scss';

const LoadingBackdrop = props => {
  const { isGlobalLoadingOpen } = props;

  if (!isGlobalLoadingOpen) {
    document.body.style.overflowY = '';
    return null;
  }

  document.body.style.overflowY = 'hidden';
  return (
    <div className="loading-bdrop flex align-center justify-center">
      <Loading />
    </div>
  );
};

LoadingBackdrop.propTypes = {
  isGlobalLoadingOpen: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isGlobalLoadingOpen: selectGlobalLoadingStatus(),
});

export default connect(
  mapStateToProps,
  null
)(LoadingBackdrop);
