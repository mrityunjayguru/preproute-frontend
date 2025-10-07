import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDataState {
  registerUserData: any;
  loginUserData: any;
  questionaireData: any;
  checkProfileValue: any;
  productData: any;
  serviceData: any;
  productCategoryData: any;
  serviceCategoryData: any;
  orderId: any;
  totalAmount: any;
}

const initialState: UserDataState = {
  registerUserData: null,
  loginUserData: null,
  questionaireData: null,
  checkProfileValue: null,
  productData: null,
  serviceData: null,
  productCategoryData: null,
  serviceCategoryData: null,
  orderId: null,
  totalAmount: null,
};

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setRegisterUserData: (state, action: PayloadAction<any>) => {
            state.registerUserData = action.payload;
        },
        setLoginUsersData: (state, action: PayloadAction<any>) => {
            state.loginUserData = action.payload;
        },
        setQuestionaireData: (state, action: PayloadAction<any>) => {
            state.questionaireData = action.payload;
        },
        setCheckProfileValue: (state, action: PayloadAction<any>) => {
            state.checkProfileValue = action.payload;
        },
        setProductData: (state, action: PayloadAction<any>) => {
            state.productData = action.payload;
        },
        setServiceData: (state, action: PayloadAction<any>) => {
            state.serviceData = action.payload;
        },
        setProductCategoryData: (state, action: PayloadAction<any>) => {
            state.productCategoryData = action.payload;
        },
        setServiceCategoryData: (state, action: PayloadAction<any>) => {
            state.serviceCategoryData = action.payload;
        },
        setOrderId: (state, action: PayloadAction<any>) => {
            state.orderId = action.payload;
        },
        setTotalAmount: (state, action: PayloadAction<any>) => {
            state.totalAmount = action.payload;
        }
    }
});

export const { setRegisterUserData, setLoginUsersData, setQuestionaireData, setCheckProfileValue, setProductData, setServiceData, setProductCategoryData, setServiceCategoryData, setOrderId, setTotalAmount } = userDataSlice.actions;

export default userDataSlice.reducer;


