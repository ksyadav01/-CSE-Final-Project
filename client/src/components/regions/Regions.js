import React, { useState, useEffect } 	from 'react';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import Logo 							from '../navbar/Logo';
import NavbarOptions 					from '../navbar/NavbarOptions';
import RegionContents 					from '../regions/RegionContents';
import { WLayout, WLHeader, WLMain, WLSide, WNavbar, WNavItem  } from 'wt-frontend';
import { useHistory, useParams } from 'react-router-dom';
import WInput from 'wt-frontend/build/components/winput/WInput';
import { GET_DB_REGION } 				from '../../cache/queries';
import { GET_DB_MAPS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
import WButton from 'wt-frontend/build/components/wbutton/WButton';

const Regions = (props) => {
    console.log("DOES IT WORK MANNN")
    const history = useHistory();
	const [activeMap, setActiveMap] 		= useState({});
	const [CreateNewRegion] 		= useMutation(mutations.CREATE_NEW_REGION);
	const [DeleteRegion] 		= useMutation(mutations.DELETE_REGION);
	//const [UpdateNameMap] 	= useMutation(mutations.UPDATE_MAP_NAME);
    const {id} = useParams();
    let regions = [];
    let currentRegionMap;
    let isMapBool = false;
    const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
        for(let places of data.getAllMaps){
            console.log(id)
            if (places._id==id){
                isMapBool=true
                regions.push(places.subregions)
                currentRegionMap = places
                console.log("This region viewer is for a map")
            }
        }
    }
    const { loading1, error1, data1, refetch1 } = useQuery(GET_DB_REGION);
    if(loading1) { console.log(loading1, 'loading'); }
    if(error1) { console.log(error1, 'error'); }
    if(data1) { 
        if(!isMapBool){
            let places = data.getAllRegions
            let lst = places.find(list => list._id === id);
            regions.push(lst.subregions)
            currentRegionMap = places
            isMapBool = false;
            console.log("This region viewer is for a region")
        }
    }
    

	const auth = props.user === null ? false : true;
    const refetchRegions = async (refetch) => {
        console.log("Fetching Regions")
		const { loading, error, data } = await refetch();
		if (data) {
            if(!isMapBool){
                let places = data.getAllRegions
                let lst = places.find(list => list._id === id);
                regions.push(lst.subregions)
                currentRegionMap = places
                isMapBool = false;
                console.log("This region viewer is for a region refetch")
            }
            console.log("This region viewer is for a region refetch outside if")
        }
        else{
            const { loading, error, data } = await refetch1();
            for(let places of data.getAllMaps){
                if (places._id==id){
                    isMapBool=true
                    regions.push(places.subregions)
                    currentRegionMap = places
                    console.log("This region viewer is for a map refetch")
                }
                console.log("This region viewer is for a map refetch outside if")
            }
        }
    }

    const createNewRegion = async (name) =>{
        console.log("Creating New Region")
        console.log(currentRegionMap)
        let regions = {
            _id: "",
            id: 1123,
            name: "Enter Name",
            capital: "Enter Capital",
            leader: "Enter Leader",
            flag: "Insert Flag Here",
            landmarks: [],
            subregions: []
        }
        const { data } = await CreateNewRegion({variables: {region: regions, parentId: currentRegionMap._id}, refetchQueries: {query: GET_DB_REGION}});
        
        console.log("Before refetch region")
        await refetchRegions(refetch)
        console.log("After refetch region")
        if(data) {
            setActiveMap(data.CREATE_NEW_REGION);
        }
    }
	
	const deleteRegion = async (_id) => {
		//props.tps.clearAllTransactions();
		DeleteRegion({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_REGION }] });
		refetchRegions(refetch);
        console.log("Region Deleted")
		//setActiveList({});

	};
	const updateMapName = async (_id, value) => {
		//UpdateNameMap({variables: { _id: _id, value: value }});
		refetchRegions(refetch);

	};

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
				                <img style={{width: "400px"}} ></img>
                                <div style={{border: "5px solid black", backgroundColor: "#f87f0f", width: "405px", height: "95px",
                                    marginTop: "-7px", textAlign: "center", display: "flex", justifyContent: "center", 
                                    alignItems: "center", fontSize: "50px"}} onClick={createNewRegion} >
                                        Create New Map
                                    </div>
                            </div>
                            
                            
                        </div>
                        <RegionContents subregions={regions} currentRegionMap={currentRegionMap} deleteRegion={deleteRegion}
                            allRegions={data1.getAllRegions} 
                            style={{border: "10px solid red", width: '600px', height: 'auto', zIndex: '1'}}>
                        </RegionContents>
                    </div>
                    
                </div>
            </WMMain>
            {/* {
				showCreateMap && (<NewMap fetchUser={props.fetchUser} createNewMap={createNewMap} setShowCreateMap={setShowCreateMap} />)
			} */}
        </WLayout>
    );
};

export default Regions;