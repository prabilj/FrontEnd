import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {

    let utoken = localStorage.getItem('token')
    console.log("utoken",utoken)

    return (

        utoken ? <Outlet/> : <Navigate to='/signin' />
    )
}

export default PrivateRoutes