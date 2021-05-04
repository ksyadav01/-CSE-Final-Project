import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';

const MapEntries = (props) => {
    const { data } = props;


    const name = data.name;
    const [editingName, toggleNameEdit] = useState(false);

    // const handleDateEdit = (e) => {
    //     toggleDateEdit(false);
    //     const newDate = e.target.value ? e.target.value : 'No Date';
    //     const prevDate = due_date;
    //     props.editItem(data._id, 'due_date', newDate, prevDate);
    // };


    return (
        <WMMain style={{width:"600px", fontSize: "20px"}}>
            {props.data.name}
        </WMMain>
    );
};

export default MapEntries;