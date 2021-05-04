import React, { useState } 	from 'react';
import { REGISTER }			from '../../cache/mutations';
import { useQuery, useMutation, useApolloClient }     from '@apollo/client';
import { useHistory } from 'react-router-dom';
import * as mutations 					from '../../cache/mutations';
import { GET_DB_USER } 				from '../../cache/queries';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const UpdateAccountScreen = (props) => {
	const [input, setInput] = useState({ email: '', password: '', name: ''});
	const [loading, toggleLoading] = useState(false);
	const [Register] = useMutation(REGISTER);
	const [UpdateAccount] 	= useMutation(mutations.UPDATE_ACCOUNT);
    let user
    const { loadings, errors, data, refetch } = useQuery(GET_DB_USER);
	if(loadings) { console.log(loading, 'loading'); }
	if(errors) { console.log(errors, 'error'); }
	if(data) { user = data.getCurrentUser; }
    const history = useHistory();
	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleUpdateAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		}
		const { loading, error, data } = await UpdateAccount({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			console.log(data)
			toggleLoading(false);
			props.fetchUser();
            history.push("/maps")

		};
	};

	return (
        // Replace div with WModal

		<WModal visible={true} style={{padding: '20px', backgroundColor: 'gray'}}>
			<WMHeader style={{color: "white", backgroundColor: '#f87f0f', borderRadius: '6px', textAlign: 'center',
                fontSize: '30px'}}>
				
                <div onClick={()=> history.push("/maps")}>
                <strong>Update Account</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                            barAnimation="solid" wType="outlined" inputType="text"
                            style={{backgroundColor: "white", color: "black"}} defaultValue={user.name ? user.name : "user"}
                        />
						<div className="modal-spacer">&nbsp;</div>
						<WInput 
							className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
							barAnimation="solid" wType="outlined" inputType="text"
                            style={{backgroundColor: "white", color: "black"}} defaultValue={user.email ? user.email : "user"}
						/>
						<div className="modal-spacer">&nbsp;</div>
						<WInput 
							className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
							barAnimation="solid"  wType="outlined" inputType="password"
                            style={{backgroundColor: "white", color: "black"}} defaultValue="********"
						/>
						<div className="modal-spacer">&nbsp;</div>
					</div>
			}
            <WRow>
                <WCol size="6">
                    <WButton className="modal-button" onClick={handleUpdateAccount} span clickAnimation="ripple-light" 
                        hoverAnimation="darken" shape="rounded" color="primary" style={{width: "80%", marginLeft: '25px'}}>
                        Update
                    </WButton>
                </WCol>
                <WCol size="6">
                    <WButton className="modal-button" onClick={()=> history.push("/maps")} span clickAnimation="ripple-light" 
                        hoverAnimation="darken" shape="rounded" color="primary" style={{width: "80%", marginLeft: '25px'}}>
                        Cancel
                    </WButton>
                </WCol>
            </WRow>
		</WModal>
	);
}

export default UpdateAccountScreen;
