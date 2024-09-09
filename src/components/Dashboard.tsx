import { Navigate, Outlet } from "react-router-dom";

function Dashboard ({signed}) {
    if (signed) {
        return (
            <h1>Dashboard!</h1>
        )
    } else {
        console.log(signed)
        return <Navigate to="/login" replace></Navigate>
    }
}

export default Dashboard;