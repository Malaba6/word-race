import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure(1000);
const notify = (msg, type) => {
  switch (type) {
    case 'error':
      return toast.error(msg)
    case 'warning':
      return toast.warn(msg)
    case 'success':
      return toast.success(msg)
    default:
      return toast(msg)
  }
}

export const Toast = () => <ToastContainer position="bottom-right" />

export default notify
