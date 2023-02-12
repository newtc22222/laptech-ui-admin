import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoiceList: null,
  isFetching: false,
  error: false
}

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    fetchInvoiceStart: (state) => {
      state.isFetching = true;
    },
    fetchInvoiceFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getInvoiceSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.invoiceList = action.payload;
    },
    createInvoiceSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.invoiceList = [...state.invoiceList, action.payload];
    },
    updateInvoiceSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.invoiceList = state.invoiceList.map((invoice) => {
        if (invoice.id === action.payload.id) {
          return action.payload;
        }
        return invoice;
      });
    },
    deleteInvoiceSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.invoiceList = state.invoiceList.filter(invoice => invoice.id !== action.payload);
    },
  },
});

export const {
  fetchInvoiceStart,
  fetchInvoiceFailed,
  getInvoiceSuccess,
  createInvoiceSuccess,
  updateInvoiceSuccess,
  deleteInvoiceSuccess,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;