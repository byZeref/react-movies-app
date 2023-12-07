import { toast } from 'react-toastify';


export const notify = (type) => {
  const msg = type === 'success' ? 'Muy bien! Películas obtenidas.' : 'Error! Algo salió mal.'
  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    pauseOnFocusLoss: false,
  }
  // toast.info(msg, options)
  type === 'success' ? toast.success(msg, options) : toast.error(msg, options)
}