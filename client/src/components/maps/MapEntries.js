import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import { useHistory } from 'react-router-dom';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';

const MapEntries = (props) => {
    const history = useHistory();
    const { data } = props;


    const name = data.name;
    const [editingName, toggleNameEdit] = useState(false);
    const [preEdit, setPreEdit] = useState(props.data.name);

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
    let id = props.data._id
    let redirect = "/regions/"+id
    return (
        <WMMain style={{width:"600px", fontSize: "20px", display: "flex"}} onDoubleClick={handleEditing} 
            onClick={
                ()=>history.push(redirect)}
            /*onClick={() => { props.handleSetActive(props.id, props._id) }}*/
            hoverAnimation="lighten"
        >
            {
                editingName ? <WInput className="list-item-edit" inputClass="list-item-edit-input" wType="lined" 
                    barAnimation="solid" name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.data.name} />
                    :   <div className='list-text'>
                            {props.data.name}
                        </div>
            }
            <div onClick={()=>props.deleteMap(props.data._id)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X</div>
        </WMMain>
    );
};

export default MapEntries;