import makeSlice from '../common/makeSlice';

const labelSlice = makeSlice('label');

export const action = labelSlice.actions;
export default labelSlice.reducer;
