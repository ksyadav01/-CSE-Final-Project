import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const RegionHeader = (props) => {

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
                <WButton className='table-header-section' wType="texted" onClick={props.reorderName} >Name</WButton>
            </WCol>

            <WCol size="3">
                <WButton className='table-header-section' wType="texted" onClick={props.reorderCapital} >&nbsp;Capital</WButton>
            </WCol>

            <WCol size="2">
                <WButton className='table-header-section' wType="texted" onClick={props.reorderLeader} >&nbsp;&nbsp;&nbsp;Leader</WButton>
            </WCol>

            <WCol size="1">
                <WButton className='table-header-section' wType="texted" >&nbsp;&nbsp;Landmarks</WButton>
            </WCol>


            
            {/* <WCol size="2">
                <WButton className='table-header-section' wType="texted" onClick={props.reorderAssign}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Assigned To</WButton>
            </WCol> */}

           
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
                    <WButton onClick={props.createNewRegion} wType="texted" className={`${buttonStyle}`}
                        style={{color:"green"}}>
                        <i className="material-icons">add_box</i>
                    </WButton>
                </div>
            </WCol>

        </WRow>
    );
};

export default RegionHeader;