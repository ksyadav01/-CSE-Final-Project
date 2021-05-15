import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useHistory } from 'react-router-dom';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import { GET_DB_REGION_ID } 				from '../../cache/queries';
import { GET_DB_REGION } 				from '../../cache/queries';
import { useMutation, useQuery, useLazyQuery } 		from '@apollo/client';

const RegionEntries = (props) => {
    console.log(props.data)
    const history = useHistory();
    //const { loading, error, data, refetch } = useQuery(GET_DB_REGION_ID, {variables: {_id: props.data},fetchPolicy: "no-cache"});
    const { loading3, error3, data3 } = useQuery(GET_DB_REGION);
    let region
	if(loading3) { console.log(loading3, 'loading'); }
	if(error3) { console.log(error3, 'error'); }
    console.log("pp")
    console.log(data3)
    console.log(props.allRegions)
    console.log("pp")
    if(data3){
        for(let places of data3.getAllRegions){
            if(places._id==props.data){
                region = places
            }
        }
    }
    console.log(region)
    //const { data } = props;

    //const completeStyle = data.completed ? ' complete-task' : ' incomplete-task';

    const name = region.name;
    const capital = region.capital
    const leader = region.leader
    const landmarks = region.landmarks
    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);

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

    return (
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

            <WCol size="3">
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
    );
};

export default RegionEntries;