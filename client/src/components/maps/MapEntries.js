import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useHistory } from 'react-router-dom';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import DeleteMap 							from '../modals/DeleteMap';

const MapEntries = (props) => {
    const history = useHistory();
    const { data } = props;


    const name = data.name;
    const [editingName, toggleNameEdit] = useState(false);
    const [preEdit, setPreEdit] = useState(props.data.name);
	const [showDelete, toggleDelete] 		= useState(false);

    const handleEditing = (e) => {
        e.stopPropagation();
        setPreEdit(props.data.name);
        toggleNameEdit(!editingName);
    };

    const handleSubmit = (e) => {
        handleEditing(e);
        const { name, value } = e.target;
        props.updateMapName(props.data._id, value, preEdit);
    };

    const setShowDelete = (e) => {
		toggleDelete(!showDelete);
	};
    const handleDelete = (e) =>{
        props.deleteMap(props.data._id);
        toggleDelete(!showDelete)
    }
    let id = props.data._id
    let redirect = "/regions/"+id
    return (
        <WMMain style={{width:"600px", fontSize: "20px", display: "flex"}} onDoubleClick={handleEditing} 
            
            /*onClick={() => { props.handleSetActive(props.id, props._id) }}*/
            hoverAnimation="lighten"
        >
            {
                editingName ? <WInput className="list-item-edit" inputClass="list-item-edit-input" wType="lined" 
                    barAnimation="solid" name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.data.name} />
                    :   <div className='list-text'onClick={
                        ()=>history.push(redirect)}>
                            {props.data.name}
                        </div>
            }
            <button onClick={()=>toggleDelete(!showDelete)} style={{marginLeft: "100px"}}>X</button>
            {
            showDelete && (<DeleteMap fetchUser={props.fetchUser} setShowDelete={setShowDelete}
                deleteMap={handleDelete}/>)
            }
        </WMMain>
        
    );
};

export default MapEntries;