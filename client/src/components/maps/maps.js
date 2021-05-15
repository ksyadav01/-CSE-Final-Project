import React, { useState, useEffect } 	from 'react';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import Logo 							from '../navbar/Logo';
import NavbarOptions 					from '../navbar/NavbarOptions';
import { WLayout, WLHeader, WLMain, WLSide, WNavbar, WNavItem  } from 'wt-frontend';
import { useHistory } from 'react-router-dom';
import WInput from 'wt-frontend/build/components/winput/WInput';
import { GET_DB_MAPS } 				from '../../cache/queries';
import { GET_DB_REGION } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
import NewMap 							from '../modals/NewMap';
import MapContents   from './MapContents';
import Globe from "./globe.jpg"
import WButton from 'wt-frontend/build/components/wbutton/WButton';

const Maps = (props) => {
    const history = useHistory();
	const [showCreateMap, toggleCreateMap] 	= useState(false);
	const [CreateNewRegion] 		= useMutation(mutations.CREATE_NEW_REGION);
	const [DeleteMap] 		= useMutation(mutations.DELETE_MAP);
	const [UpdateNameMap] 	= useMutation(mutations.UPDATE_REGION_NAME);
    let maps = []
    let regions = []
    const { loading, error, data, refetch } = useQuery(GET_DB_REGION);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
        for(let places of data.getAllRegions){
            if(places.types=="map"){
                maps.push(places)
            }
            regions.push(places)
        }
    }

	const auth = props.user === null ? false : true;
    const refetchRegions = async (refetch) => {
		const { loading, error, data } = await refetch();
		if (data) {
            for(let places of data.getAllRegions){
                if(places.types=="map"){
                    maps.push(places)
                }
                regions.push(places)
            }
		}
        history.push("/maps")
    }

    const createNewMap = async (name) =>{
        console.log("peasd")
        let regions = {
            _id: "",
            id: 1123,   
            name: name,
            capital: "Enter Capital",
            types: 'map',
            leader: "Enter Leader",
            owner: props.user._id,
            flag: "Insert Flag Here",
            landmarks: [],
            subregions: []
        }
        const { data } = await CreateNewRegion({variables: {region: regions, parentId: "kekw"}, refetchQueries: {query: GET_DB_REGION}});
        await refetchRegions(refetch)
        // if(data) {
        //     setActiveMap(data.CREATE_NEW_MAP);
        // }
        
        history.push("/maps")
    }
	
	const deleteMap = async (_id) => {
		//props.tps.clearAllTransactions();
        console.log('Attempt to delete')
		DeleteMap({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_REGION }] });
        console.log("Deleted")
		refetchRegions(refetch)
		//setActiveList({});

	};
    const setShowCreateMap = () => {
		toggleCreateMap(!showCreateMap);
	};
	const updateMapName = async (_id, value) => {
		UpdateNameMap({variables: { _id: _id, value: value }});
		refetchRegions(refetch)

	};
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
                                    alignItems: "center", fontSize: "50px"}} onClick={setShowCreateMap} >
                                        Create New Map
                                    </div>
                            </div>
                            
                            
                        </div>
                        <MapContents maps={maps} deleteMap={deleteMap} updateMapName={updateMapName}
                        style={{border: "10px solid red", width: '600px', height: 'auto', zIndex: '1'}}>
                        </MapContents>
                    </div>
                    
                </div>
            </WMMain>
            {
				showCreateMap && (<NewMap fetchUser={props.fetchUser} createNewMap={createNewMap} setShowCreateMap={setShowCreateMap} />)
			}
        </WLayout>
    );
};

export default Maps;