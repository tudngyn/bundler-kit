import Immutable from 'seamless-immutable';
import * as types from './../constants/popup';
const initialState = Immutable.from({
  isModalOpen: false,
  styles: null,
  className: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_MODAL: {
      return state.set('isModalOpen', true);
    }
    case types.CLOSE_MODAL: {
      return state.set('isModalOpen', false);
    }
    case types.CHANGE_CONTENT_RENDER_MODAL: {
      const newState = {
        isModalOpen: true,
        renderCallback: action.payload,
      };
      return state.merge(newState);
    }
    case types.CHANGE_MODAL_STYLES: {
      return state.set('styles', Immutable.from(action.payload));
    }
    case types.ADD_CLASSES: {
      return state.set('className', Immutable.from(action.payload));
    }
    case types.CHANGE_MODAL_CONTENT: {
      const { component, options } = action.payload;
      return state
        .set('isModalOpen', true)
        .set('modalContent', component)
        .set('modalOptions', options || {})
        .set('isShowLoading', false);
    }
    case types.SHOW_LOADING_CONTENT: {
      return state
        .set('isModalOpen', true)
        .set('modalContent', action.payload)
        .set('isShowLoading', true);
    }
    default: {
      return state;
    }
  }
};
