import React, { useState } 	from 'react';
import { LOGIN } 			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol  } from 'wt-frontend';

const Login = (props) => {
	const [input, setInput] = useState({ email: '', password: '' });
	const [loading, toggleLoading] = useState(false);
	const [showErr, displayErrorMsg] = useState(false);
	const errorMsg = "Email/Password not found.";
	const [Login] = useMutation(LOGIN);
    const history = useHistory();

	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	}

	const handleLogin = async (e) => {

		const { loading, error, data } = await Login({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (data.login._id === null) {
			displayErrorMsg(true);
			return;
		}
		if (data) {
			props.fetchUser();
			///props.refetchTodos();
			toggleLoading(false)
            history.push("/maps")
			//props.setShowLogin(false)
		};
	};


	return (
       
		<WModal visible={true}  style={{padding: '20px', backgroundColor: 'gray'}}>
            <WMHeader style={{color: "white", backgroundColor: '#f87f0f', borderRadius: '6px', textAlign: 'center',
                fontSize: '30px'}}>
				
                <div onClick={()=> history.push("/home")}>
                <strong>Login</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X
                </div>
			</WMHeader>

			{
				loading ? <div />
					: <div className="main-login-modal">

						<WInput className="modal-input" onBlur={updateInput} name='email' labelAnimation="up" barAnimation="solid" 
							labelText="Email Address" wType="outlined" inputType='text' style={{height: "50px"}}/>
						<div className="modal-spacer">&nbsp;</div>
						<WInput className="modal-input" onBlur={updateInput} name='password' labelAnimation="up" barAnimation="solid" 
							labelText="Password" wType="outlined" inputType='password' />

						{
							showErr ? <div className='modal-error'>
								{errorMsg}
							</div>
								: <div className='modal-error'>&nbsp;</div>
						}

					</div>
			}
                <WRow>
                    <WCol size="6">
                        <WButton className="modal-button" onClick={handleLogin} span clickAnimation="ripple-light" 
                            hoverAnimation="darken" shape="rounded" color="primary" style={{width: "80%", marginLeft: '25px'}}>
                            Login
                        </WButton>
                    </WCol>
                    <WCol size="6">
                        <WButton className="modal-button" onClick={()=> history.push("/home")} span clickAnimation="ripple-light" 
                            hoverAnimation="darken" shape="rounded" color="primary" style={{width: "80%", marginLeft: '25px'}}>
                            Cancel
                        </WButton>
                    </WCol>
                </WRow>
		</WModal>
	);
}

export default Login;