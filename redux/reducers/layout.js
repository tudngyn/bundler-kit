import * as layoutTypes from './../constants/layout';

const initialState = {
  showModal: false,
  showBackdrop: false,
  isGlobalLoadingOpen: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case layoutTypes.SHOW_LOADING: {
      return {
        ...state,
        isGlobalLoadingOpen: true,
      };
    }
    case layoutTypes.HIDE_LOADING: {
      return {
        ...state,
        isGlobalLoadingOpen: false,
      };
    }
    default:
      return state;
  }
}
