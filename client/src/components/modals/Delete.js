import React from 'react';

import { WModal, WMHeader, WMMain, WButton } from 'wt-frontend';

const Delete = (props) => {

    const handleDelete = async () => {
        props.deleteList(props.activeid);
        props.setShowDelete(false);
    }

    return (
        /*
        <div className="delete-modal">
            <div className="modal-header" onClose={() => props.setShowDelete(false)}>
                Delete List?
			</div>

            <div>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowDelete(false)} wType="texted">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={handleDelete} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Delete
				</WButton>
            </div>

        </div>
        */
       <WModal visible={true}>
            <WMHeader onClose={() => props.setShowDelete(false)} style={{color: "#e9edf0", fontWeight: 700, fontSize: 20}}>
                Delete List?
			</WMHeader>

            <WMMain>
                <WButton className="modal-button cancel-button" onClick={() => props.setShowDelete(false)} 
                    clickAnimation="ripple-light"shape="rounded" color="white" style={{color: "black"}}>
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={handleDelete} clickAnimation="ripple-light" 
                    hoverAnimation="darken" shape="rounded" color="danger">
                    Delete
				</WButton>
            </WMMain>

        </WModal>
    );
}

export default Delete;