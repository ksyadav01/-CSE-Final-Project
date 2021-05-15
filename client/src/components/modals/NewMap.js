import React, { useState } 	from 'react';

import { WModal, WMHeader, WMMain, WButton, WInput } from 'wt-frontend';

const NewMap = (props) => {
	const [input, setInput] = useState({ MapName: ''});

	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	}

    const handleNewMap = async (e) => {
        console.log(input.MapName)
        console.log(input.MapName)
        console.log("test test test")
        props.createNewMap(input.MapName);
        props.setShowCreateMap();
    }

    return (
        <WModal visible={true}>
        <WMHeader onClose={() => props.setShowCreateMap()} style={{color: "white"}}>
            Create New Map
        </WMHeader>

        {
            <div className="main-login-modal">

                    <WInput className="modal-input" onBlur={updateInput} name='MapName' labelAnimation="up" barAnimation="solid" 
                        labelText="New Map Name" wType="outlined" inputType='text' style={{height: "50px"}}/>
                    <div className="modal-spacer">&nbsp;</div>
                </div>
        }
        <div>
            <WButton className="modal-button" onClick={handleNewMap} span clickAnimation="ripple-light" 
                hoverAnimation="darken" shape="rounded" color="primary">
                Create Map
            </WButton>
        </div>
    </WModal>
    );
}

export default NewMap;