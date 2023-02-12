import { createSlice } from "@reduxjs/toolkit"

export const headerSlice = createSlice({
  name: "header",
  initialState: {
    navbarMobile: false,
    walletAddress: null,
    signer: null,
    instances: null,
    nftInstances: null,
    DL_contract_address: null,
    nft_contract_address: null,
    savedId: null
  },
  reducers: {
    changeNavbarState: (state) => {
      state.navbarMobile = !state.navbarMobile
    },
    saveAddressAndSigner: (state, action) => {
      state.walletAddress = action.payload.address
      state.signer = action.payload.signer
      state.instances = action.payload.instances
      state.nftInstances = action.payload.nftInstances
    },
    addContractAddresses: (state, action) => {
      state.DL_contract_address = action.payload.DL_contract_address
      state.nft_contract_address = action.payload.nft_contract_address
    },
    saveId: (state, action) => {
      state.savedId = action.payload
    },
    deleteId: (state) => {
      state.savedId = null
    }
  }
})

export const {
  changeNavbarState,
  saveAddressAndSigner,
  addContractAddresses,
  saveId,
  deleteId
} = headerSlice.actions

export default headerSlice.reducer
