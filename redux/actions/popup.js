import * as types from './../constants/popup';

export const openModal = () => dispatch =>
  dispatch({
    type: types.OPEN_MODAL,
  });

export const closeModal = () => dispatch =>
  dispatch({
    type: types.CLOSE_MODAL,
  });

export const changeRenderContent = callback => dispatch =>
  dispatch({
    type: types.CHANGE_CONTENT_RENDER_MODAL,
    payload: callback,
  });

export const changeModalContent = (component, options) => dispatch => {
  dispatch({
    type: types.CHANGE_MODAL_CONTENT,
    payload: {
      component,
      options,
    },
  });
};

export const changeStyles = styles => dispatch =>
  dispatch({
    type: types.CHANGE_MODAL_STYLES,
    payload: styles,
  });

export const addClasses = className => dispatch =>
  dispatch({
    type: types.ADD_CLASSES,
    payload: className,
  });

export const showLoadingContent = component => dispatch => {
  dispatch({
    type: types.SHOW_LOADING_CONTENT,
    payload: component,
  });
};
