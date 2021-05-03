import React, { useState, useEffect } 	from 'react';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import Logo 							from '../navbar/Logo';
import NavbarOptions 					from '../navbar/NavbarOptions';
import { WLayout, WLHeader, WLMain, WLSide, WNavbar, WNavItem  } from 'wt-frontend';
import { useHistory } from 'react-router-dom';
import WInput from 'wt-frontend/build/components/winput/WInput';
import { GET_DB_MAPS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
import MapContents   from './MapContents';
import Globe from "./globe.jpg"

const Maps = (props) => {
	const [activeMap, setActiveMap] 		= useState({});
    let maps
    const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { maps = data.getAllMaps; }

	const auth = props.user === null ? false : true;
    const refetchMaps = async (refetch) => {
		const { loading, error, data } = await refetch();
		if (data) {
			maps = data.getAllMaps;
			setActiveMap(maps);
			console.log(maps)
		}
    }
	
    console.log(activeMap)
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
                    <div style={{marginTop: "100px", width: "1000px", height: "600px", border: "5px solid black",
                        backgroundColor: "#d48f53"}}>
                        <div style={{width: "990px", height: "100px", backgroundColor: "black", textAlign: "center", 
                            color: "white", fontSize: "30px"}}>
                            Your Maps
                            <div style={{marginLeft: "590px", marginTop: "63px"}}>
				                <img style={{width: "400px"}} src={Globe}></img>
                                <div style={{border: "5px solid black", backgroundColor: "#f87f0f", width: "405px", height: "95px",
                                    marginTop: "-7px", textAlign: "center", display: "flex", justifyContent: "center", 
                                    alignItems: "center", }} >
                                        Create New Map
                                    </div>
                            </div>
                            <MapContents activeMap={activeMap}>

                            </MapContents>
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

export default Maps;