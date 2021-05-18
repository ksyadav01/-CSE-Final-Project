import React, { useState, useEffect } 	from 'react';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import Logo 							from '../navbar/Logo';
import NavbarOptions 					from '../navbar/NavbarOptions';
import RegionContents 					from '../regions/RegionContents';
import DeleteRegion 							from '../modals/DeleteRegion';
import { WLayout, WLHeader, WLMain, WLSide, WNavbar, WNavItem  } from 'wt-frontend';
import { useHistory, useParams } from 'react-router-dom';
import WInput from 'wt-frontend/build/components/winput/WInput';
import { GET_DB_REGION } 				from '../../cache/queries';
import { GET_DB_MAPS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
import WButton from 'wt-frontend/build/components/wbutton/WButton';
import RegionEntries   from './RegionEntries';
import RegionHeader   from './RegionHeader';
import { EditItem_Transaction,
	ReorderRegionName_Transaction,
	ReorderRegionCapital_Transaction, 
	ReorderRegionLeader_Transaction } from '../../utils/jsTPS';

const Regions = (props) => {
    console.log("DOES IT WORK MANNN")
    const history = useHistory();
	const [activeMap, setActiveMap] 		= useState(false);
	const [CreateNewRegion] 		= useMutation(mutations.CREATE_NEW_REGION);
	const [DeleteRegion] 		= useMutation(mutations.DELETE_REGION);
	const [UpdateRegionField] 	= useMutation(mutations.UPDATE_REGION_FIELD);
	const [ReorderRegionName] 		= useMutation(mutations.REORDER_REGION_NAME);
	const [ReorderRegionFlipper] 		= useMutation(mutations.REORDER_REGION_FLIPPER);
	const [ReorderRegionCapital] 		= useMutation(mutations.REORDER_REGION_CAPITAL);
	const [ReorderRegionLeader] 		= useMutation(mutations.REORDER_REGION_LEADER);
	//const [UpdateNameMap] 	= useMutation(mutations.UPDATE_MAP_NAME);
    const {id} = useParams();
    let currentRegionMap
    let maps = []
    let regions = []
    let subregionsIndex = []
    let theSubregions = []
    const { loading, error, data, refetch } = useQuery(GET_DB_REGION, {fetchPolicy:"network-only"});
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
    let temp
	if(data) { 
        theSubregions=[]
        maps = []
        regions = []
        subregionsIndex = []
        temp = data.getAllRegions
        for(let places of temp){
            if(places.types=="map"){
                maps.push(places)
            }
            regions.push(places)
            if(places._id==id){
                currentRegionMap = places
                subregionsIndex = places.subregions
            }
        }
        for(let tempId of subregionsIndex){
            for(let placess in temp){
                if(temp[placess]._id==tempId){
                    theSubregions.push(temp[placess])
                }
            }
        }
    }

	const auth = props.user === null ? false : true;
    const refetchRegions = async (refetch) => {
		const { loading, error, data } = await refetch();
        if(loading) { console.log(loading, 'loading'); }
        if(error) { console.log(error, 'error'); }
        let temp
		if(data) { 
            theSubregions=[]
            maps = []
            regions = []
            subregionsIndex = []
            temp = data.getAllRegions
            for(let places of temp){
                if(places.types=="map"){
                    maps.push(places)
                }
                regions.push(places)
                if(places._id==id){
                    currentRegionMap = places
                    subregionsIndex = places.subregions
                }
            }
            for(let tempId of subregionsIndex){
                for(let placess in temp){
                    if(temp[placess]._id==tempId){
                        theSubregions.push(temp[placess])
                    }
                }
            }
        }
        console.log("Doing a quick refetch")
        console.log(theSubregions)
        console.log(subregionsIndex)
        
        let redirect = "/regions/"+id
        //history.push(redirect)        
    }

    const createNewRegion = async (name) =>{
        console.log("Creating New Region")
        console.log(currentRegionMap)
        let regions = {
            _id: "",
            id: 1123,
            name: "Enter Name",
            capital: "Enter Capital",
            types: "region",
            leader: "Enter Leader",
            owner: props.user._id,
            flag: "Insert Flag Here",
            landmarks: [],
            subregions: []
        }
        const { data } = await CreateNewRegion({variables: {region: regions, parentId: currentRegionMap._id}, refetchQueries: {query: GET_DB_REGION}});
        
        await refetchRegions(refetch)
        // if(data) {
        //     setActiveMap(data.CREATE_NEW_REGION);
        // }
    }
	
	const deleteRegion = async (_id) => {
		//props.tps.clearAllTransactions();
		DeleteRegion({ variables: { _id: _id, parentId: currentRegionMap._id}, refetchQueries: [{ query: GET_DB_REGION }] });

		refetchRegions(refetch);
        console.log("Region Deleted")
		//setActiveList({});

	};
    const editRegion = async (itemID, field, value, prev) => {
		let transaction = new EditItem_Transaction(itemID, field, prev, value, UpdateRegionField);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};
	const reorderName = async () => {
		let regionId = currentRegionMap._id
		let transaction = new ReorderRegionName_Transaction(regionId, subregionsIndex, ReorderRegionName, ReorderRegionFlipper);
		props.tps.addTransaction(transaction);
        await refetchRegions(refetch);
		tpsRedo();

	};
	const reorderCapital = async () => {
		let regionId = currentRegionMap._id
		let transaction = new ReorderRegionCapital_Transaction(regionId, subregionsIndex,  ReorderRegionCapital, ReorderRegionFlipper);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};
	const reorderLeader = async () => {
		let regionId = currentRegionMap._id
		let transaction = new ReorderRegionLeader_Transaction(regionId, subregionsIndex,  ReorderRegionLeader, ReorderRegionFlipper);
		props.tps.addTransaction(transaction);
		tpsRedo();

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
    console.log("heh")
    console.log(theSubregions)
    console.log("heh")
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
                    <div style={{marginTop: "10px", width: "100%", height: "900px", border: "5px solid black",
                        backgroundColor: "#d48f53"}}>
                        <div style={{width: "100%", height: "75px", backgroundColor: "black", textAlign: "center", 
                            color: "white", fontSize: "30px"}}>
                            Your Maps
                            {/* <div style={{marginLeft: "590px", marginTop: "63px"}}>
				                <img style={{width: "400px"}} ></img>
                                <div style={{border: "5px solid black", backgroundColor: "#f87f0f", width: "405px", height: "95px",
                                    marginTop: "-7px", textAlign: "center", display: "flex", justifyContent: "center", 
                                    alignItems: "center", fontSize: "50px"}} onClick={createNewRegion} >
                                        Create New Map
                                    </div>
                            </div> */}
                            
                            
                        </div>
                        {/* {entries} ? <div>
                            {
                                entries.map((entry, index) => (
                                    <RegionEntries
                                        data={entry}
                                        key={entry._id}
                                        index={index}
                                        deleteRegion={props.deleteRegion}
                                        updateMapName={props.updateMapName}
                                    />
                                ))
                            }

                            </div>
                            : <div className='container-primary' /> */}
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
                    
                </div>
            </WMMain>
            {/* {
				showCreateMap && (<NewMap fetchUser={props.fetchUser} createNewMap={createNewMap} setShowCreateMap={setShowCreateMap} />)
			} */}
        </WLayout>
    );
};

export default Regions;