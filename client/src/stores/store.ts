import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "./slices/state.slice";
import { applicationSlice, AuthSlice, BrandSlice, BreedsSlice, CategoriesSlice, citiesSlice, countriesSlice, ManagementSlice, ModalSlice, PetSlice, ProductSlice, statesSlice, SubcategoriesSlice, } from "./slices/index.slice";
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer: {
        state: stateSlice,
        apps: applicationSlice,
        countries: countriesSlice,
        states: statesSlice,
        cities: citiesSlice,
        modal: ModalSlice,
        pets:PetSlice,
        breeds: BreedsSlice,
        brands:BrandSlice,
        categories:CategoriesSlice,
        subcategories: SubcategoriesSlice,
        products: ProductSlice,
        auth: AuthSlice,
        management: ManagementSlice,
    }
})
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>


export default store;