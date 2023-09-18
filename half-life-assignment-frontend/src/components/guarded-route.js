import {Navigate, Outlet} from 'react-router-dom'
import {getLoggedUserAccessToken} from "../util/local-storage-util";

const GuardedRoute = ({isPrivate}) => {
    if (isPrivate) {
        return getLoggedUserAccessToken()
            ? <Outlet />
            : <Navigate to='/login' replace/>
    } else {
        return !getLoggedUserAccessToken()
            ? <Outlet />
            : <Navigate to='/' replace/>
    }
}

export default GuardedRoute
