import makeSlice from '../helpers/makeSlice';

const brandSlice = makeSlice('brand');

export const action = brandSlice.actions;

const brandReducer = brandSlice.reducer;
export default brandReducer;
