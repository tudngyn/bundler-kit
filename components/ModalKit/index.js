import * as popupActions from 'sdk-redux/actions/popup';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  selectModalStatus,
  selectPopupCallback,
  selectPopupClassName,
  selectPopupStyles,
  selectModalContent,
  selectPopupIsShowLoading,
} from 'sdk-redux/selectors/popup';
import './style.scss';
import Loading from 'sdk-components/Loading';

class ModalKit extends Component {
  static propTypes = {
    styles: PropTypes.shape(),
    className: PropTypes.string,
    isModalOpen: PropTypes.bool,
    openModal: PropTypes.func,
    renderChildren: PropTypes.func,
    popupActions: PropTypes.shape(),
    renderCallback: PropTypes.func,
    shouldCloseOnEsc: PropTypes.bool,
    modalContent: PropTypes.element,
    isShowLoading: PropTypes.bool,
  };

  static defaultProps = {
    styles: {},
    className: '',
    isModalOpen: false,
    openModal: undefined,
    renderChildren: undefined,
    renderCallback: () => {},
    shouldCloseOnEsc: true,
    isShowLoading: false,
  };

  componentWillMount() {
    Modal.setAppElement('body');
  }

  _renderChildren = () => {
    const { modalContent, isShowLoading } = this.props;

    if (isShowLoading) {
      return (
        <div className="sdk-scaffolding flex align-center justify-center">
          <Loading />
        </div>
      );
    }

    if (typeof modalContent === 'function') {
      modalContent();
    }

    return modalContent;
  };

  _closeModal = () => {
    this.props.popupActions.closeModal();
  };

  render() {
    var { className, styles, isModalOpen, shouldCloseOnEsc } = this.props;
    return (
      <Modal
        style={styles || {}}
        className={`modal-kit ${className}`}
        isOpen={isModalOpen}
        overlayClassName="modal-kit-overlay"
        onRequestClose={this._closeModal}
        shouldCloseOnEsc={shouldCloseOnEsc}
        closeTimeoutMS={150}
        center
      >
        {this._renderChildren()}
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isModalOpen: selectModalStatus(),
  renderCallback: selectPopupCallback(),
  className: selectPopupClassName(),
  styles: selectPopupStyles(),
  modalContent: selectModalContent(),
  isShowLoading: selectPopupIsShowLoading(),
});

export default connect(
  mapStateToProps,
  dispatch => ({
    popupActions: bindActionCreators(popupActions, dispatch),
  })
)(ModalKit);
