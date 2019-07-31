import { createSelector } from 'reselect';
import { MODULE_NAME } from './../constants/popup';

const getState = state => state[MODULE_NAME];

const selectModalStatus = () =>
  createSelector(
    getState,
    state => state.isModalOpen
  );

const selectPopupCallback = () =>
  createSelector(
    getState,
    state => state.renderCallback
  );

const selectPopupClassName = () =>
  createSelector(
    getState,
    state => state.className
  );

const selectPopupStyles = () =>
  createSelector(
    getState,
    state => state.styles
  );

const selectModalContent = () =>
  createSelector(
    getState,
    state => state.modalContent
  );

const selectPopupIsShowLoading = () =>
  createSelector(
    getState,
    state => state.isShowLoading
  );

export {
  selectModalStatus,
  selectPopupCallback,
  selectPopupClassName,
  selectPopupStyles,
  selectModalContent,
  selectPopupIsShowLoading,
};
