import React 			from 'react';
import Homescreen 		from './components/homescreen/Homescreen';
import CreateAccountScreen 		from './components/CreateAccountScreen/CreateAccountScreen';
import LoginScreen 		from './components/LoginScreen/LoginScreen';
import Maps 		from './components/maps/Maps';
import { useQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';
 
const App = () => {
	let user = null;
    let transactionStack = new jsTPS();
	
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);

    if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
    }
	let history = useHistory();
	let handleAcctCreateClick = async ()=> {
		console.log("ffsddf")
		history.push("/create_account");
	  }
	return(
		<BrowserRouter>
			<Switch>
				<Redirect exact from="/" to={ {pathname: "/home"} } />
				<Route 
					path="/home" 
					name="home" 
					render={() => 
						<Homescreen tps={transactionStack} fetchUser={refetch} user={user} />
					} 
				/>
				<Route 
					path="/create_account" 
					name="create_account" 
					render={() => 
						<CreateAccountScreen fetchUser={refetch} user={user} />
					} 
				/>
				<Route 
					path="/login" 
					name="login" 
					render={() => 
						<LoginScreen fetchUser={refetch} user={user} />
					} 
				/>
				<Route 
					path="/maps" 
					name="maps" 
					render={() => 
						<Maps fetchUser={refetch} user={user} />
					} 
				/>
				<Route/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;