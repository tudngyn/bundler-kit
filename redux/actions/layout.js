import * as types from './../constants/layout';

export const showLoading = () => dispatch => {
  dispatch({
    type: types.SHOW_LOADING,
  });
};

export const hideLoading = () => dispatch => {
  dispatch({
    type: types.HIDE_LOADING,
  });
};
