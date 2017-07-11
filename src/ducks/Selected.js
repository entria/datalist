/* @flow */

// Actions
const SELECT: string = 'datalist/Selected/SELECT';
const UNSELECT: string = 'datalist/Selected/UNSELECT';

// Reducer
type State = {
  selected: Object,
};

type Action = {
  type: string,
  payload: any,
};

const initialState: State = {
  selected: {},
};

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case SELECT: {
      const { item, key } = action.payload;

      const selected = state.selected[key] || [];
      selected.push(item);

      const newState = {
        ...state,
      };
      newState.selected[key] = selected;

      return newState;
    }
    case UNSELECT: {
      const { item, key } = action.payload;

      const newState = {
        ...state,
      };

      const selected = state.selected[key] || [];
      newState.selected[key] = selected.filter(selectedItem => selectedItem.id !== item.id);

      return newState;
    }
    default:
      return state;
  }
}

// Action Creators
export function select(item: any, key: string): Action {
  return {
    type: SELECT,
    payload: {
      item,
      key,
    },
  };
}

export function unselect(item: any, key: string): Action {
  return {
    type: SELECT,
    payload: {
      item,
      key,
    },
  };
}
