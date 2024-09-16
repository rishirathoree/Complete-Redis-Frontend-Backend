import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    patientModal : false,
    categoriesModal : false,
    subcategoriesModal : false,
    diagnosisDetails : null,
    managementModal : false,
}

const ModalSlice = createSlice({
    name: "ModalSlice",
    initialState,
    reducers:{
        togglePatientModal: (state) => {
            state.patientModal = !state.patientModal
        },
        setDiagnosisDetails: (state, action) => {
            state.diagnosisDetails = action.payload
        },
        toggleCategoriesModal: (state) => {
            state.categoriesModal = !state.categoriesModal
        },
        toggleSubCategoriesModal: (state) => {
            state.subcategoriesModal = !state.subcategoriesModal
        },
        toggleManagementModal: (state) => {
            state.managementModal =!state.managementModal
        },
    },
})

export const { togglePatientModal,setDiagnosisDetails,toggleCategoriesModal,toggleSubCategoriesModal,toggleManagementModal } = ModalSlice.actions;
export default ModalSlice.reducer;