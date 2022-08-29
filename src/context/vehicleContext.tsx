import type { Vehicles } from "../types";
import { createContext, useState, useContext, useEffect } from "react";
import { handleVehicles } from "../services/findVehicles";


interface VehicleContext {
   placas:string[] | null,
   vehicles:Vehicles[] | null
}

const VehicleContext = createContext<VehicleContext >({} as VehicleContext);

const VehicleProvider = ({children}:any):JSX.Element => {

    const 
        [ loadding, setLoadding ] = useState(true),
        [ vehicles, setVehicles ] = useState<Vehicles[] | null>(null),
        [ placas, setPlacas ] = useState<string[] | null>(null);

    useEffect(()=>{
        const findVehicles = async () => {
            const { vehicles, placas } = await handleVehicles();
            setVehicles(vehicles)
            setPlacas(placas)
        }
        findVehicles();
        setLoadding(false);
    },[]);

    return (
        <VehicleContext.Provider value={{vehicles, placas}}>
            {children}
        </VehicleContext.Provider>
    )
}

export const useVehicles = () => {

    const ctx = useContext(VehicleContext);
    return ctx;
}

export default VehicleProvider;