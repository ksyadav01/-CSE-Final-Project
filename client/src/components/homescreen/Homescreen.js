import React, { useState, useEffect } 	from 'react';
import Logo 							from '../navbar/Logo';
import NavbarOptions 					from '../navbar/NavbarOptions';
import MainContents 					from '../main/MainContents';
import SidebarContents 					from '../sidebar/SidebarContents';
import Login 							from '../modals/Login';
import Delete 							from '../modals/Delete';
import CreateAccount 					from '../modals/CreateAccount';
import { GET_DB_TODOS } 				from '../../cache/queries';
import * as mutations 					from '../../cache/mutations';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { UpdateListField_Transaction, 
	UpdateListItems_Transaction, 
	ReorderItems_Transaction,
	ReorderItemsDescription_Transaction, 
	ReorderItemsDate_Transaction, 
	ReorderItemsStatus_Transaction, 
	ReorderItemsAssign_Transaction, 
	EditItem_Transaction,
	clearAllTransactions } 				from '../../utils/jsTPS';
import WInput from 'wt-frontend/build/components/winput/WInput';
import WMMain from 'wt-frontend/build/components/wmodal/WMMain';
import Home_Image from "./home_image.jpg"

const Homescreen = (props) => {

	let todolists 							= [];
	const [activeList, setActiveList] 		= useState({});
	const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);



	const auth = props.user === null ? false : true;


	const tpsUndo = async () => {
		const retVal = await props.tps.undoTransaction();
		return retVal;
	}

	const tpsRedo = async () => {
		const retVal = await props.tps.doTransaction();
		return retVal;
	}


	
	/*
		Since we only have 3 modals, this sort of hardcoding isnt an issue, if there
		were more it would probably make sense to make a general modal component, and
		a modal manager that handles which to show.
	*/
	const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};

	const setShowDelete = () => {
		//props.tps.clearAllTransactions();
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(!showDelete)
	}
	const handleUndoRedoKey = (e) => {
	  if(e.keyCode==90 && e.ctrlKey){
		tpsUndo();
	  }
	  if(e.keyCode==89 && e.ctrlKey){
		tpsRedo();
	  }
	}
	return (
		<WLayout wLayout="header"
		onKeyDown={handleUndoRedoKey}
		tabIndex={0}>
			<WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo' />
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} auth={auth} user={props.user}
							setShowCreate={setShowCreate} setShowLogin={setShowLogin}
							setActiveList={setActiveList}
						/>
					</ul>
				</WNavbar>
			</WLHeader>
			<WMMain style={{textAlign: 'center', color: "white", fontSize: "30px"}}>
				<br></br><br></br><br></br>
				<img src={Home_Image}></img>
				<h1>Welcome to the <br></br>World Data Mapper</h1>
			</WMMain>
			{/* <WLSide side="left">
				<WSidebar>
					{
						activeList ?
							<SidebarContents
								todolists={todolists} activeid={activeList.id} auth={auth}
								handleSetActive={handleSetActive} createNewList={createNewList}
								undo={tpsUndo} redo={tpsRedo}
								updateListField={updateListField}
							/>
							:
							<></>
					}
				</WSidebar>
			</WLSide>
			<WLMain>
				{
					activeList ? 
							<div className="container-secondary">
								<MainContents
									addItem={addItem} deleteItem={deleteItem}
									editItem={editItem} reorderItem={reorderItem}
									reorderDescription={reorderItemDescription}
									reorderDate={reorderItemDate}
									reorderStatus={reorderItemStatus}
									reorderAssign={reorderItemAssign}
									setShowDelete={setShowDelete}
									activeList={activeList} setActiveList={setActiveList}
									closeList={props.tps.clearAllTransactions}
									tps={props.tps}
									undo={tpsUndo} redo={tpsRedo}
								/>
							</div>
						:
							<div className="container-secondary" >
							
								
							</div>
				}

			</WLMain> */}

			{
				//showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
				//showCreate && (<div onclick={()=>{history.push'/create_account}}> </div>)
			}

			{
				//showLogin && (<Login fetchUser={props.fetchUser} refetchTodos={refetch}setShowLogin={setShowLogin} />)
			}

		</WLayout>
	);
};

export default Homescreen;