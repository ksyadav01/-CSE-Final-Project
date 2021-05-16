import React, { useState, useEffect } 	from 'react';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import Logo 							from '../navbar/Logo';
import NavbarOptions 					from '../navbar/NavbarOptions';
import { WLayout, WLHeader, WLMain, WLSide, WNavbar, WNavItem  } from 'wt-frontend';
import { useHistory, useParams } from 'react-router-dom';
import WInput from 'wt-frontend/build/components/winput/WInput';
import { GET_DB_REGION } 				from '../../cache/queries';
import { GET_DB_MAPS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
import WButton from 'wt-frontend/build/components/wbutton/WButton';
import StonyFlag from "./stonybrook.jpg"
import { EditItem_Transaction,
	ReorderRegionName_Transaction,
	ReorderRegionCapital_Transaction, 
	ReorderRegionLeader_Transaction } from '../../utils/jsTPS';
import WRow from 'wt-frontend/build/components/wgrid/WRow';

const RegionViewer = (props) => {
    console.log("DOES IT WORK MANNN")
    const history = useHistory();

	const [UpdateRegionLandmark] 		= useMutation(mutations.UPDATE_REGION_LANDMARK);
	const [DeleteRegionLandmark] 		= useMutation(mutations.DELETE_REGION_LANDMARK);
	//const [UpdateNameMap] 	= useMutation(mutations.UPDATE_MAP_NAME);
    const {ids} = useParams();
    console.log(ids)
    let currentRegionMap;
    let maps; // All maps
    let regions; // All Regions
    let subregionsIndex; //All Subregion Indexes
    let theSubregions; // All subregions
    let totalLandmarks;
    let parentReg;
    const { loading, error, data, refetch } = useQuery(GET_DB_REGION);
        if(loading) { console.log(loading, 'loading'); }
        if(error) { console.log(error, 'error'); }
        let temp
		if(data) { 
            console.log("works")
            theSubregions=[]
            totalLandmarks = []
            maps = []
            regions = []
            temp = data.getAllRegions
            for(let places of temp){
                console.log(places)
                if(places.types=="map"){
                    maps.push(places)
                }
                regions.push(places)
                if(places._id==ids){
                    console.log("joemamamama")
                    currentRegionMap = places
                    subregionsIndex = places.subregions
                }
            }
            console.log(subregionsIndex)
            for(let tempId of subregionsIndex){
                for(let placess in temp){
                    if(temp[placess]._id==tempId){
                        theSubregions.push(temp[placess])
                        if(temp[placess].landmarks.length>0){
                            for(let landmark in temp[placess].landmarks){
                                totalLandmarks.push(landmark)
                            }
                        }
                    }
                }
                console.log(tempId)
            }
            for(let vals in temp){
                if(temp[vals].subregions.includes(currentRegionMap._id)){
                    parentReg = temp[vals]
                    break
                }
            }
        }
    console.log(regions)

	const auth = props.user === null ? false : true;
    const refetchRegions = async (refetch) => {
		const { loading, error, data } = await refetch();
        if(loading) { console.log(loading, 'loading'); }
        if(error) { console.log(error, 'error'); }
        let temp
		if(data) { 
            theSubregions=[]
            totalLandmarks = []
            maps = []
            regions = []
            temp = data.getAllRegions
            for(let places of temp){
                if(places.types=="map"){
                    maps.push(places)
                }
                regions.push(places)
                if(places._id==ids){
                    currentRegionMap = places
                    subregionsIndex = places.subregions
                }
            }
            for(let tempId of subregionsIndex){
                for(let placess in temp){
                    if(temp[placess]._id==tempId){
                        theSubregions.push(temp[placess])
                        if(temp[placess].landmarks.length>0){
                            for(let landmark in temp[placess].landmarks){
                                totalLandmarks.push(landmark)
                            }
                        }
                    }
                    if(temp[placess].subregions.includes(currentRegionMap._id)){
                        parentReg = temp[placess]
                    }
                }
            }
        }
        console.log("Doing a quick refetch")
        console.log(theSubregions)
        console.log(subregionsIndex)
        //history.push(redirect)        
    }

    const addLandmark = async (name) =>{
        console.log("Creating landmark")
        // let regions = {
        //     _id: "",
        //     id: 1123,
        //     name: "Enter Name",
        //     capital: "Enter Capital",
        //     types: "region",
        //     leader: "Enter Leader",
        //     owner: props.user._id,
        //     flag: "Insert Flag Here",
        //     landmarks: [],
        //     subregions: []
        // }
        const { data } = await UpdateRegionLandmark({variables: {value: name, _id: currentRegionMap._id}, 
            refetchQueries: {query: GET_DB_REGION}});
        
        await refetchRegions(refetch)
        // if(data) {
        //     setActiveMap(data.CREATE_NEW_REGION);
        // }
    }
	
	const deleteLandmark = async (name) => {
		//props.tps.clearAllTransactions();
		//DeleteRegion({ variables: { _id: _id, parentId: currentRegionMap._id}, refetchQueries: [{ query: GET_DB_REGION }] });
        const { data } = await DeleteRegionLandmark({variables: {value: name, _id: currentRegionMap._id}, 
            refetchQueries: {query: GET_DB_REGION}});
        
		refetchRegions(refetch);
        console.log("Landmark Deleted")
		//setActiveList({});

	};
	const tpsUndo = async () => {
		const retVal = await props.tps.undoTransaction();
		refetchRegions(refetch);
		return retVal;
	}

	const tpsRedo = async () => {
		const retVal = await props.tps.doTransaction();
		refetchRegions(refetch);
		return retVal;
	}

	const updateMapName = async (_id, value) => {
		//UpdateNameMap({variables: { _id: _id, value: value }});
		refetchRegions(refetch);

	};
    //console.log(JSON.stringify(subregions,undefined,2))
    const entries = theSubregions ? theSubregions : null;
    console.log("heh2")
    console.log(maps)
    //refetchRegions(refetch)
    console.log("heh2")
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
                <div style={{width: "100%", height: "800px", border: "5px solid red"}}>
                    <div style={{marginleft: "100px", width: "500px", height: "600px", border: "5px solid black", color: "white"}}>
                        <img style={{width: "400px", marginLeft:"50px"}} src={StonyFlag}></img>
                        <br></br><br></br><br></br>
                        <div style={{fontSize: "20", marginLeft: "20px"}}>
                            Region Name: {currentRegionMap.name}
                            <br></br><br></br><br></br>
                            Parent Region: {parentReg.name}
                            <br></br><br></br><br></br>
                            Region Capital: {currentRegionMap.capital}
                            <br></br><br></br><br></br>
                            Region Leader: {currentRegionMap.leader}
                            <br></br><br></br><br></br>
                            Number of Sub Regions: {currentRegionMap.subregions.length}
                        </div>
                    </div>
                </div>
                {/* <div style={{display: 'flex', justifyContent: "center", alignItems: "center"}}>
                    <div style={{marginTop: "10px", width: "100%", height: "900px", border: "5px solid black",
                        backgroundColor: "#d48f53"}}>
                        <div style={{width: "100%", height: "75px", backgroundColor: "black", textAlign: "center", 
                            color: "white", fontSize: "30px"}}>
                            Your Maps
                            
                            
                        </div>
                        
                        <RegionHeader
                                 createNewRegion = {createNewRegion}tps={props.tps} reorderName={reorderName} 
                                 reorderCapital={reorderCapital} reorderLeader={reorderLeader} undo = {tpsUndo} redo = {tpsRedo}
                        >

                        </RegionHeader>
                        <RegionContents subregions={theSubregions} deleteRegion={deleteRegion} updateMapName = {updateMapName}
                            editRegion = {editRegion} createNewRegion = {createNewRegion}
                            style={{border: "10px solid red", width: '600px', height: 'auto', zIndex: '1'}}>
                        </RegionContents>
                    </div>
                    
                </div> */}
            </WMMain>
            {/* {
				showCreateMap && (<NewMap fetchUser={props.fetchUser} createNewMap={createNewMap} setShowCreateMap={setShowCreateMap} />)
			} */}
        </WLayout>
    );
};

export default RegionViewer;