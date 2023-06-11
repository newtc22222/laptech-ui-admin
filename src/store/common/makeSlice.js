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
        state.error = false;
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
    // extraReducers: thunk
    //   ? builder => {
    //       builder
    //         .addCase(thunk['pending'], state => {
    //           state.isFetching = true;
    //           state.error = false;
    //         })
    //         .addCase(thunk['fulfilled'], (state, action) => {
    //           state.isFetching = false;
    //           state.data = action.payload;
    //         })
    //         .addCase(thunk['rejected'], (state, action) => {
    //           state.isFetching = false;
    //           state.error = true;
    //         })
    //         .addMatcher(
    //           action =>
    //             action.type.endsWith('/rejected') &&
    //             action.error?.message === '401',
    //           (state, { dispatch }) => {
    //             dispatch(refreshAccessToken())
    //               .then(() => {
    //                 dispatch(thunk()); // Retry the user data request
    //               })
    //               .catch(error => {
    //                 state.loading = false;
    //                 state.error = 'Failed to refresh access token.';
    //               });
    //           }
    //         );
    //     }
    //   : () => {}
  });
}

export default makeSlice;
