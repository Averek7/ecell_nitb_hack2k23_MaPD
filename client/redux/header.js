import { createSlice } from "@reduxjs/toolkit";

export const headerSlice = createSlice({
  name: "header",
  initialState: {
    navbarMobile: false,
    walletAddress: null,
    signer: null,
    instances: null,
    DL_contract_address: null,
    nft_contract_address: null,
  },
  reducers: {
    changeNavbarState: (state) => {
      state.navbarMobile = !state.navbarMobile;
    },
    saveAddressAndSigner: (state, action) => {
      state.walletAddress = action.payload.address;
      state.signer = action.payload.signer;
      state.instances = action.payload.instances;
    },
    addContractAddresses: (state, action) => {
      state.DL_contract_address = action.payload.DL_contract_address;
      state.nft_contract_address = action.payload.nft_contract_address;
    },
  },
});

export const { changeNavbarState, saveAddressAndSigner, addContractAddresses } =
  headerSlice.actions;

export default headerSlice.reducer;
