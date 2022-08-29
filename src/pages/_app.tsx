import type { AppProps } from 'next/app';
import '../styles/global.css';

import AuthProvider from '../context/AuthContext';
import VehicleProvider from '../context/vehicleContext';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
        <VehicleProvider>
            <Component {...pageProps} />
        </VehicleProvider>
    </AuthProvider>
  )
}

export default MyApp
