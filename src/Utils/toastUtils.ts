// toastUtils.ts
import {toast,ToastOptions} from 'react-hot-toast'

const defaultOptions: ToastOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

export const ToastError = (message: string, options?: ToastOptions) => {
  toast.error(message, { ...defaultOptions, ...options });
};

export const ToastSuccess = (message: string, options?: ToastOptions) => {
  toast.success(message, { ...defaultOptions, ...options });
};

export const ToastWarning = (message: string, options?: ToastOptions) => {
  toast.warn(message, { ...defaultOptions, ...options });
};
