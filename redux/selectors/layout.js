import { createSelector } from 'reselect';
import { MODULE_NAME } from './../constants/layout';

const getState = state => state[MODULE_NAME];

const selectGlobalLoadingStatus = () =>
  createSelector(
    getState,
    state => state.isGlobalLoadingOpen
  );

export { selectGlobalLoadingStatus };
