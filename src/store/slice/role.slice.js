import makeSlice from '../common/makeSlice';

const roleSlice = makeSlice('role');

export const action = roleSlice.actions;
export default roleSlice.reducer;
