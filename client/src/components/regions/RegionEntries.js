import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useHistory } from 'react-router-dom';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import { GET_DB_REGION_ID } 				from '../../cache/queries';
import { GET_DB_REGION } 				from '../../cache/queries';
import { useMutation, useQuery, useLazyQuery } 		from '@apollo/client';

import DeleteRegion 							from '../modals/DeleteRegion';
const RegionEntries = (props) => {
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
    if(landmarks.length==0){
        landmarkDisplay = "..."
    }
    else{
        landmarkDisplay = landmarks[0] + ", ..."
    }
    let redirect = "/regionViewer/"+region._id
    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : 'No Name';
        const prevName = name;
        props.editRegion(region._id, 'name', newName, prevName);
    };

    const handleCapitalEdit = (e) => {
        toggleCapitalEdit(false);
        const newCapital = e.target.value ? e.target.value : 'No Capital';
        const prevCapital = capital;
        props.editRegion(region._id, 'capital', newCapital, prevCapital);
    };

    const handleLeaderEdit = (e) => {
        toggleLeaderEdit(false);
        const newLeader = e.target.value ? e.target.value : 'No Leader';
        const prevLeader = leader;
        props.editRegion(region._id, 'leader', newLeader, prevLeader);
    };

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
            <WCol size="3">
                {
                    editingName || name === ''
                        ? <WInput
                            className='table-input' onBlur={handleNameEdit}
                            autoFocus={true} defaultValue={name} type='text'
                            wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => toggleNameEdit(!editingName)}
                        >{name}
                        </div>
                }
            </WCol>

            <WCol size="3">
                {
                    editingCapital ? <input
                        className='table-input' onBlur={handleCapitalEdit}
                        autoFocus={true} defaultValue={capital} type='text'
                        wType="outlined" barAnimation="solid" inputClass="table-input-class"
                    />
                        : <div className="table-text"
                            onClick={() => toggleCapitalEdit(!editingCapital)}
                        >{capital}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingLeader ? <input
                        className='table-input' onBlur={handleLeaderEdit}
                        autoFocus={true} defaultValue={leader} type='text'
                        wType="outlined" barAnimation="solid" inputClass="table-input-class"
                    />
                        : <div className="table-text"
                            onClick={() => toggleLeaderEdit(!editingLeader)}
                        >{leader}
                        </div>
                }
            </WCol>
            <WCol size="3">
                <div className="table-text"
                            onClick={()=>history.push(redirect)}
                        >{landmarkDisplay}
                    </div>
            </WCol>
            <WCol size="1">
                <div className='button-group'>
                    <WButton className="table-entry-buttons" onClick={setShowDelete} wType="texted">
                        <i className="material-icons">close</i>
                    </WButton>
                </div>
            </WCol>
{/* 
            <WCol size="3">
                <div className='button-group'>
                    <WButton className="table-entry-buttons" onClick={() => props.reorderItem(data._id, -1)} wType="texted"
                        style={props.currentList.items[0]==props.data ? {color: "black", pointerEvents:"none"} :  {color: "white", pointerEvents:"auto"}}>
                        <i className="material-icons">expand_less</i>
                    </WButton>
                    <WButton className="table-entry-buttons" onClick={() => props.reorderItem(data._id, 1)} wType="texted"
                        style={props.currentList.items[props.currentList.items.length-1]==props.data ? {color: "black", pointerEvents:"none"} :  {color: "white", pointerEvents:"auto"}}>
                        <i className="material-icons">expand_more</i>
                    </WButton>
                    <WButton className="table-entry-buttons" onClick={() => props.deleteItem(data, props.index)} wType="texted">
                        <i className="material-icons">close</i>
                    </WButton>
                </div>
            </WCol> */}
        </WRow>
        
        {
            showDelete && (<DeleteRegion fetchUser={props.fetchUser} setShowDelete={setShowDelete}
                deleteRegion={handleDelete}/>)
        }
        </WMMain>
    );
};

export default RegionEntries;