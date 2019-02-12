import {
  TOGGLE_NAV_BASEBALL,
  TOGGLE_NAV_BASKETBALL,
  TOGGLE_NAV_FOOTBALL,
  TOGGLE_NAV_HOCKEY,
  TOGGLE_NAV_BASEBALL_2010_OLDER,
  TOGGLE_NAV_BASKETBALL_2010_OLDER,
  TOGGLE_NAV_FOOTBALL_2010_OLDER,
  TOGGLE_NAV_HOCKEY_2010_OLDER,
} from '../actions/nav-bar';

const initialState = {
  toggleNavBaseball: false,
  toggleNavBasketball: false,
  toggleNavFootball: false,
  toggleNavHockey: false,
  toggleNavBaseball2010Older: false,
  toggleNavBasketball2010Older: false,
  toggleNavFootball2010Older: false,
  toggleNavHockey2010Older: false,
}

export default function reducer(state = initialState, action) {
  if (action.type === TOGGLE_NAV_BASEBALL) {
    return {
      ...state,
      toggleNavBaseball: !state.toggleNavBaseball,
    }
  } else if (action.type === TOGGLE_NAV_BASKETBALL) {
    return {
      ...state,
      toggleNavBasketball: !state.toggleNavBasketball,
    }
  } else if (action.type === TOGGLE_NAV_FOOTBALL) {
    return {
      ...state,
      toggleNavFootball: !state.toggleNavFootball,
    }
  } else if (action.type === TOGGLE_NAV_HOCKEY) {
    return {
      ...state,
      toggleNavHockey: !state.toggleNavHockey,
    }
  } else if (action.type === TOGGLE_NAV_BASEBALL_2010_OLDER) {
    return {
      ...state,
      toggleNavBaseball2010Older: !state.toggleNavBaseball2010Older,
    }
  } else if (action.type === TOGGLE_NAV_BASKETBALL_2010_OLDER) {
    return {
      ...state,
      toggleNavBasketball2010Older: !state.toggleNavBasketball2010Older,
    }
  } else if (action.type === TOGGLE_NAV_FOOTBALL_2010_OLDER) {
    return {
      ...state,
      toggleNavFootball2010Older: !state.toggleNavFootball2010Older,
    }
  } else if (action.type === TOGGLE_NAV_HOCKEY_2010_OLDER) {
    return {
      ...state,
      toggleNavHockey2010Older: !state.toggleNavHockey2010Older,
    }
  }
  return state;
}