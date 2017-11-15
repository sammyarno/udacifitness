export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';
export const ADD_ENTRIES = 'ADD_ENTRIES';

export function receiveEntries (entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries,
  }
}

export function addEntries (entry) {
  return {
    type: ADD_ENTRIES,
    entries,
  }
}
