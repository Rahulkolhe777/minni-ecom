import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ToastContainer, toast } from 'react-toastify';



createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <AppRoutes/>
        <ToastContainer />
    </AuthProvider>
)
