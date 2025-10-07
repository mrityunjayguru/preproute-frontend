import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your state
interface UserDataState {
  AllSubscriber: any; // Store login user data
  userTableData: any; // Store user table data
  singleSubscriber:any
  singleDevice:any
  groupSubscriber:any
  ExPDevices:any
  userDevices:any,
  subscribeType:any,
  globalFormData:any,
  formData:any,
  singleDelearUser:any,
  DelearCode:any,
  reneqrequest:any,
  userImei:any
}

// Initial state for the slice
const initialState: UserDataState = {
  AllSubscriber: null,
  userTableData: null,
  singleSubscriber:null,
  singleDevice:null,
  groupSubscriber:null,
  ExPDevices:null,
  userDevices:null,
  subscribeType:null,
  globalFormData:[],
  formData:{},
  singleDelearUser:null,
  DelearCode:[],
  reneqrequest:null,
  userImei:null
};

// Create the user data slice
export const subscriberSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setAllSubscriber: (state, action: PayloadAction<any>) => {
      state.AllSubscriber=[]
      state.AllSubscriber = action.payload; // Set login user data
    },
    setUserTableData: (state, action: PayloadAction<any>) => {
      state.userTableData = action.payload; // Set user table data
    },
    singleSubscriber: (state, action: PayloadAction<any>) => {
        state.singleSubscriber = action.payload; // Set user table data
      },
      singleDevices: (state, action: PayloadAction<any>) => {
        state.singleDevice = action.payload; // Set user table data
      },
      updateDevice: (state, action: PayloadAction<any>) => {
        state.singleDevice = {
            ...state.singleDevice, // Retain existing properties
            subscriptionexp: action.payload.subscriptionexp // Update subscription expiry
        };
    },
    
      groupSubscriber: (state, action: PayloadAction<any>) => {
        state.groupSubscriber = action.payload; // Set user table data
      },
      ExPDevices: (state, action: PayloadAction<any>) => {
        state.ExPDevices = action.payload; // Set user table data
      },
      
      userDevices: (state, action: PayloadAction<any>) => {
        state.userDevices = action.payload; // Set user table data
      },
      setSearchType: (state, action: PayloadAction<any>) => {
        state.subscribeType = action.payload; // Set user table data
      },
      
      setFormData: (state, action: PayloadAction<any>) => {
        state.globalFormData=[...action.payload,...state.globalFormData]
        // state.globalFormData=[]
      },
      setBlank: (state, action: PayloadAction<any>) => {
        state.globalFormData=[]
        // state.globalFormData=[]
      },
      handleFormData: (state, action: PayloadAction<any>) => {
        state.formData=action.payload
        // state.globalFormData=[]
      },
      singleDelearSubscriber: (state, action: PayloadAction<any>) => {
        state.singleDelearUser=action.payload
        // state.globalFormData=[]
      },
      dealearCode: (state, action: PayloadAction<any>) => {
        state.DelearCode=action.payload
        // state.globalFormData=[]
      },
      renewRequest: (state, action: PayloadAction<any>) => {
        state.reneqrequest=action.payload
        // state.globalFormData=[]
      },
      deviceImei: (state, action: PayloadAction<any>) => {
        state.userImei=action.payload
        // state.globalFormData=[]
      },
    clearUserData: (state) => {
      state.AllSubscriber = null; // Clear login user data
      state.userTableData = null; // Clear user table data
    },

   
  },
});

// Export actions
export const {deviceImei,singleDelearSubscriber,handleFormData,setBlank,setFormData,dealearCode,setAllSubscriber,singleSubscriber, clearUserData,singleDevices,groupSubscriber,userDevices,ExPDevices,setSearchType,updateDevice,renewRequest } = subscriberSlice.actions;

// Export reducer
export default subscriberSlice.reducer;
