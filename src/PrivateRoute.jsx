import { Route, Navigate,Outlet   } from 'react-router-dom';
import { useRecoilValue} from 'recoil';

// import { authAtom } from '_state';



export const PrivateRoute = ({ component: Component, ...rest })=> {
    // const auth = useRecoilValue(authAtom);
    const auth = window.auth_token;
    return (
        <Route {...rest} render={props => {
            if (!auth) {
                // not logged in so redirect to login page with the return url
                return <Navigate  to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // authorized so return component
            return <Outlet />
        }} />
    );
}