import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			name
			password
		}
	}
`;
	
export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $name: String!) {
		register(email: $email, password: $password, name: $name) {
			email
			password
			name
		}
	}
`;
export const UPDATE_ACCOUNT = gql`
	mutation UpdateAccount($email: String!, $password: String!, $name: String!) {
		updateAccount(email: $email, password: $password, name: $name) {
			_id
			email
			password
			name
		}
	}
`;
export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;

export const ADD_ITEM = gql`
	mutation AddItem($item: ItemInput!, $_id: String!, $index: Int!) {
		addItem(item: $item, _id: $_id, index: $index)
	}
`;

export const DELETE_ITEM = gql`
	mutation DeleteItem($itemId: String!, $_id: String!) {
		deleteItem(itemId: $itemId, _id: $_id) {
			_id
			id
			description
			due_date
			assigned_to
			completed
		}
	}
`;
// export const CREATE_NEW_MAP = gql`
// 	mutation CreateNewMap($map : MapInput!){
// 		createNewMap(map: $map){
// 			_id
// 			id
// 			owner
// 			subregions
// 		}
// 	}
// 	`;
export const CREATE_NEW_MAP = gql`
	mutation CreateNewMap($map : MapInput!){
		createNewMap(map: $map)
	}
	`;
export const CREATE_NEW_REGION = gql`
	mutation CreateNewRegion($region: RegionInput!, $parentId: String!){
		createNewRegion(region: $region, parentId: $parentId)
	}
	`;
export const DELETE_MAP = gql`
	mutation DeleteMap($_id: String!) {
		deleteMap(_id: $_id)
	}
`;
export const DELETE_REGION = gql`
	mutation DeleteRegion($_id: String!, $parentId: String!) {
		deleteRegion(_id: $_id, parentId: $parentId)
	}
`;
export const UPDATE_REGION_NAME = gql`
	mutation UpdateRegionName($_id: String!, $value: String!) {
		updateRegionName(_id: $_id, value: $value)
	}
`;
export const UPDATE_REGION_LANDMARK = gql`
	mutation UpdateRegionLandmark($_id: String!, $value: String!) {
		updateRegionLandmark(_id: $_id, value: $value)
	}
`;
export const DELETE_REGION_LANDMARK = gql`
	mutation DeleteRegionLandmark($_id: String!, $value: String!) {
		deleteRegionLandmark(_id: $_id, value: $value)
	}
`;
export const UPDATE_ITEM_FIELD = gql`
	mutation UpdateItemField($_id: String!, $itemId: String!, $field: String!, $value: String!, $flag: Int!) {
		updateItemField(_id: $_id, itemId: $itemId, field: $field, value: $value, flag: $flag) {
			_id
			id
			description
			due_date
			assigned_to
			completed
		}
	}
`;
export const UPDATE_REGION_FIELD = gql`
	mutation UpdateRegionField( $itemId: String!, $field: String!, $value: String!) {
		updateRegionField(itemId: $itemId, field: $field, value: $value) 
		
	}
`;

export const REORDER_ITEMS = gql`
	mutation ReorderItems($_id: String!, $itemId: String!, $direction: Int!) {
		reorderItems(_id: $_id, itemId: $itemId, direction: $direction) {
			_id
			id
			description
			due_date
			assigned_to
			completed
		}
	}
`;
export const REORDER_REGION_NAME = gql`
	mutation ReorderRegionName($_id: String!) {
		reorderRegionName(_id: $_id)
	}
`;
export const REORDER_REGION_FLIPPER = gql`
	mutation ReorderRegionFlipper($_id: String!, $prevRegions: [String]!) {
		reorderRegionFlipper(_id: $_id, prevRegions: $prevRegions)
	}
`;
export const REORDER_REGION_CAPITAL = gql`
	mutation ReorderRegionCapital($_id: String!) {
		reorderRegionCapital(_id: $_id)
	}
`;
export const REORDER_REGION_LEADER= gql`
	mutation ReorderRegionLeader($_id: String!) {
		reorderItemsLeader(_id: $_id)
	}
`;
export const REORDER_ITEMS_ASSIGN = gql`
	mutation ReorderItemsAssign($_id: String!) {
		reorderItemsAssign(_id: $_id) {
			_id
			id
			description
			due_date
			assigned_to
			completed
		}
	}
`;
export const LIST_TOP = gql`
	mutation MoveListToTop($_id: String!) {
		moveListToTop(_id: $_id){
			_id
			id
			name
			owner
		} 
	}
`;

export const ADD_TODOLIST = gql`
	mutation AddTodolist($todolist: TodoInput!) {
		addTodolist(todolist: $todolist) 
	}
`;

export const DELETE_TODOLIST = gql`
	mutation DeleteTodolist($_id: String!) {
		deleteTodolist(_id: $_id)
	}
`;

export const UPDATE_TODOLIST_FIELD = gql`
	mutation UpdateTodolistField($_id: String!, $field: String!, $value: String!) {
		updateTodolistField(_id: $_id, field: $field, value: $value)
	}
`;
