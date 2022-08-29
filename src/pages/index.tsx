import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { parseCookies } from 'nookies'
import { useAuth } from '../context/AuthContext';
import Admin from '../components/Dashboard/admin'



const Dashboard: NextPage = ({props}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { user } = useAuth();

    return (
        <>
            { user?.office === 'Administrador' ? <Admin/> : null }
        </>
    )
    
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
    const { ecobus_token:token } = parseCookies(ctx);

    if(!token) {
        return {
            redirect:{
                destination:'/Login',
                permanent:false,
            }
        }
    } else {
        return{
            props:{}
        }
    }
}

export default Dashboard;