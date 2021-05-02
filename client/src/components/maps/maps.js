import React, { useState, useEffect } 	from 'react';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import Logo 							from '../navbar/Logo';
import NavbarOptions 					from '../navbar/NavbarOptions';
import { WLayout, WLHeader, WLMain, WLSide, WNavbar, WNavItem  } from 'wt-frontend';
import { useHistory } from 'react-router-dom';
import WInput from 'wt-frontend/build/components/winput/WInput';
import { GET_DB_TODOS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';

const maps = (props) => {
    const { loading, error, data, refetch } = useQuery(GET_DB_TODOS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }

	const auth = props.user === null ? false : true;
    return (
        <WLayout>
            <WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo' />
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} auth={auth}
							refetchTodos={refetch}
						/>
					</ul>
				</WNavbar>
			</WLHeader>
            <WMMain>
                <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                    <div style={{marginTop: "100px", width: "800px", height: "600px", border: "5px solid black", backgroundColor: "#d48f53"}}>
                        <div style={{width: "790px", height: "100px", backgroundColor: "black", textAlign: "center", 
                            color: "white", fontSize: "30px"}}>
                            Your Maps
                        </div>
                    </div>
                </div>
            </WMMain>
        
        </WLayout>
        // <div >
        //     <TableHeader
        //         disabled={!props.activeList._id} addItem={props.addItem}
        //         setShowDelete={props.setShowDelete} setActiveList={props.setActiveList}
        //         reorderDescription={props.reorderDescription}
        //         reorderDate = {props.reorderDate}
        //         reorderStatus={props.reorderStatus}
        //         reorderAssign={props.reorderAssign}
        //         closeList={props.closeList}
        //         undo={props.undo} redo={props.redo} 
        //         tps={props.tps}
        //         ></TableHeader>
        //     <TableContents
        //         key={props.activeList._id} activeList={props.activeList}
        //         deleteItem={props.deleteItem} reorderItem={props.reorderItem}
        //         editItem={props.editItem}
        //     />
        // </div>
    );
};

export default maps;