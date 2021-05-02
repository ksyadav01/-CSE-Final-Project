import React, { useState } 	from 'react';
import { REGISTER }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const CreateAccount = (props) => {
	const [input, setInput] = useState({ email: '', password: '', name: ''});
	const [loading, toggleLoading] = useState(false);
	const [Register] = useMutation(REGISTER);
    
    const history = useHistory();
	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleCreateAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		}
		const { loading, error, data } = await Register({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
			if(data.register.email === 'already exists') {
				alert('User with that email already registered');
			}
			else {
				props.fetchUser();
                history.push("/home")
			}

		};
	};

	return (
        // Replace div with WModal

		<WModal visible={true} style={{padding: '20px', backgroundColor: 'gray'}}>
			<WMHeader style={{color: "white", backgroundColor: '#f87f0f', borderRadius: '6px', textAlign: 'center',
                fontSize: '30px'}}>
				
                <div onClick={()=> history.push("/home")}>
                <strong>Sign Up</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X
                </div>
			</WMHeader>

			{
				loading ? <div />
					: <div style={{alignItems: 'center'}}>

                        <div className="modal-spacer">&nbsp;</div>
                        <WInput 
                            className="modal-input" onBlur={updateInput} name="name" labelAnimation="up" 
                            barAnimation="solid" labelText="Name" wType="outlined" inputType="text"
                            style={{backgroundColor: "white", color: "black"}}
                        />
						<div className="modal-spacer">&nbsp;</div>
						<WInput 
							className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
							barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text"
						/>
						<div className="modal-spacer">&nbsp;</div>
						<WInput 
							className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
							barAnimation="solid" labelText="Password" wType="outlined" inputType="password" 
						/>
						<div className="modal-spacer">&nbsp;</div>
					</div>
			}
            <WRow>
                <WCol size="6">
                    <WButton className="modal-button" onClick={handleCreateAccount} span clickAnimation="ripple-light" 
                        hoverAnimation="darken" shape="rounded" color="primary" style={{width: "80%", marginLeft: '25px'}}>
                        Submit
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

export default CreateAccount;
