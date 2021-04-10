import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const TableHeader = (props) => {

    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    const clickDisabled = () => {
        //props.tps.clearAllTransactions();
     };
     const closeList = () =>{
        props.tps.clearAllTransactions();
        console.log("pepe")
     };
    return (
        <WRow className="table-header">
            <WCol size="3">
                <WButton className='table-header-section' wType="texted" onClick={props.reorderDescription} >Task</WButton>
            </WCol>

            <WCol size="2">
                <WButton className='table-header-section' wType="texted" onClick={props.reorderDate} >&nbsp;&nbsp;&nbsp;Due Date</WButton>
            </WCol>

            <WCol size="2">
                <WButton className='table-header-section' wType="texted" onClick={props.reorderStatus} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Status</WButton>
            </WCol>

            
            <WCol size="2">
                <WButton className='table-header-section' wType="texted" onClick={props.reorderAssign}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Assigned To</WButton>
            </WCol>

           
            <WCol size="2">
                <div className="table-header-buttons">
                    <WButton className="sidebar-buttons undo-redo" onClick={props.undo} wType="texted" clickAnimation="ripple-light" 
                        shape="rounded" style={props.tps.getUndoSize()==0 ? {color: "black", pointerEvents:"none"} 
                            : {color: "white", pointerEvents:"auto"}}>
                        <i className="material-icons">undo</i>
                    </WButton>
                    <WButton className="sidebar-buttons undo-redo" onClick={props.redo} wType="texted" clickAnimation="ripple-light"
                     shape="rounded" style={props.tps.getRedoSize()==0 ? {color: "black", pointerEvents:"none"} 
                     : {color: "white", pointerEvents:"auto"}}>
                        <i className="material-icons">redo</i>
                    </WButton>
                </div>
            </WCol>
            <WCol size="1">
                <div className="table-header-buttons">
                    <WButton onClick={props.disabled ? clickDisabled : props.addItem} wType="texted" className={`${buttonStyle}`}>
                        <i className="material-icons">add_box</i>
                    </WButton>
                    <WButton onClick={props.disabled ? clickDisabled : props.setShowDelete} wType="texted" className={`${buttonStyle}`}>
                        <i className="material-icons">delete_outline</i>
                    </WButton>
                    <WButton onClick={props.disabled ? clickDisabled : () => props.setActiveList({})} wType="texted" className={`${buttonStyle}`}>
                        <i className="material-icons">close</i>
                    </WButton>
                </div>
            </WCol>

        </WRow>
    );
};

export default TableHeader;