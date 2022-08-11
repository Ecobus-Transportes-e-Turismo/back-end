import  { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { parseCookies } from 'nookies'

const Dashboard: NextPage = ({props}:InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return (
        <div className="container">
            <h2>Dashboard</h2>
        </div>
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