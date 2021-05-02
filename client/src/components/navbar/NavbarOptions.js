import React                                from 'react';
import { LOGOUT }                           from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import { WButton, WNavItem }                from 'wt-frontend';
import { useHistory } from 'react-router-dom';

const LoggedIn = (props) => {
    const client = useApolloClient();
	const [Logout] = useMutation(LOGOUT);

    const handleLogout = async (e) => {
        Logout();
        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
            if (reset) props.setActiveList({});
        }
    };

    return (
        <WNavItem hoverAnimation="lighten">
            <WButton className="navbar-options" style={{color: '#F15ABF'}} onClick={handleLogout} wType="texted" hoverAnimation="text-primary"> 
                Logout
            </WButton>
        </WNavItem >
    );
};

const LoggedOut = (props) => {
	let history = useHistory();
    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" style={{color: '#F15ABF'}} onClick={()=>history.push("/login")} wType="texted" hoverAnimation="text-primary">
                    Login
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten">
                <WButton className="navbar-options" style={{color: '#F15ABF'}} onClick={()=>history.push("/create_account")} wType="texted" hoverAnimation="text-primary"> 
                    Sign Up 
                </WButton>
            </WNavItem>
        </>
    );
};


const NavbarOptions = (props) => {
    return (
        <>
            {
                props.auth === false ? <LoggedOut setShowLogin={props.setShowLogin} setShowCreate={props.setShowCreate} />
                : <LoggedIn fetchUser={props.fetchUser} setActiveList={props.setActiveList} logout={props.logout} />
            }
        </>

    );
};

export default NavbarOptions;