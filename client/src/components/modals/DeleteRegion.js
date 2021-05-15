import React, { useState } 	from 'react';

import { WModal, WMHeader, WRow, WCol, WMMain, WButton, WInput } from 'wt-frontend';

const DeleteRegion = (props) => {

    const handleDeleteRegion = async (e) => {
        props.deleteRegion();
    }

    return (
        <WModal visible={true}>
        <WMHeader onClose={() => props.setShowDelete()} style={{color: "white"}}>
            Would you like to delete this region?
        </WMHeader>
        <WRow>
            <WCol size="6">
                <WButton className="modal-button" onClick={handleDeleteRegion} span clickAnimation="ripple-light" 
                    hoverAnimation="darken" shape="rounded" color="primary" style={{width: "80%", marginLeft: '25px'}}>
                    Delete
                </WButton>
            </WCol>
            <WCol size="6">
                <WButton className="modal-button" onClick={()=> props.setShowDelete()} span clickAnimation="ripple-light" 
                    hoverAnimation="darken" shape="rounded" color="primary" style={{width: "80%", marginLeft: '25px'}}>
                    Cancel
                </WButton>
            </WCol>
        </WRow>
    </WModal>
    );
}

export default DeleteRegion;