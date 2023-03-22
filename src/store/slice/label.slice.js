import makeSlice from '../helpers/makeSlice';

const labelSlice = makeSlice('label');

export const action = labelSlice.actions;
export default labelSlice.reducer;
