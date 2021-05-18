import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useHistory } from 'react-router-dom';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import { GET_DB_REGION_ID } 				from '../../cache/queries';
import { GET_DB_REGION } 				from '../../cache/queries';
import { useMutation, useQuery, useLazyQuery } 		from '@apollo/client';

import DeleteRegion 							from '../modals/DeleteRegion';
const ViewerEntries = (props) => {
    //const { data } = props;

    //const completeStyle = data.completed ? ' complete-task' : ' incomplete-task';
    let region = props.data
    const history = useHistory();
    const name = region.name;
    const capital = region.capital
    const leader = region.leader
    const landmarks = region.landmarks
    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);
	const [showDelete, toggleDelete] 		= useState(false);
    let landmarkDisplay
    if(region.length==0){
        landmarkDisplay = "..."
    }
    else{
        landmarkDisplay = region[0] + ", ..."
    }
    let redirect = "/regionViewer/"+region._id
    

    const setShowDelete = () => {
		toggleDelete(!showDelete);
	};
    const handleDelete = () =>{
        props.deleteRegion(region._id)
        toggleDelete(!showDelete)
    }

    return (
        <WMMain>
        <WRow className='table-entry'>
            <WCol size="10">
                <div className="table-text"
                            onClick={()=>history.push(redirect)}
                        >{region}
                        
                    </div>
            </WCol>
            <WCol size="2">
                <div className='button-group'>
                    <WButton className="table-entry-buttons" onClick={()=>props.deleteLandmark} wType="texted">
                        <i className="material-icons">close</i>
                    </WButton>
                </div>
            </WCol>
        </WRow>
        </WMMain>
    );
};

export default ViewerEntries;