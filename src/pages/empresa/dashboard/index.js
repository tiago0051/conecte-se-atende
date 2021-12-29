import { parseCookies } from "nookies"

export default function Dashboard(){
    return (
        <div>
            Dashboard
        </div>
    )
}

export async function getServerSideProps(ctx){
    const {token} = parseCookies(ctx)
    if(!token){
        return {
            redirect: {
                destination: '/empresa/login',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}