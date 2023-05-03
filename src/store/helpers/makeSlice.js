import { createSlice } from '@reduxjs/toolkit';

/**
 * @param {string} objectName
 */
function makeSlice(objectName) {
  const initialState = {
    data: null,
    isFetching: false,
    error: false
  };

  return createSlice({
    name: objectName,
    initialState,
    reducers: {
      fetchStart: state => {
        state.isFetching = true;
      },
      fetchFailed: state => {
        state.isFetching = false;
        state.error = true;
      },
      getSuccess: (state, action) => {
        state.isFetching = false;
        state.error = false;
        state.data = action.payload;
      },
      createSuccess: (state, action) => {
        state.isFetching = false;
        state.error = false;
        state.data = [...state.data, action.payload];
      },
      updateSuccess: (state, action) => {
        state.isFetching = false;
        state.error = false;
        state.data = state.data.map(object => {
          if (object.id === action.payload.id) {
            return { ...object, ...action.payload };
          }
          return object;
        });
      },
      deleteSuccess: (state, action) => {
        state.isFetching = false;
        state.error = false;
        state.data = state.data.filter(object => object.id !== action.payload);
      }
    }
  });
}

export default makeSlice;
