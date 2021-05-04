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
// 			regionList
// 		}
// 	}
// 	`;
export const CREATE_NEW_MAP = gql`
	mutation CreateNewMap($map : MapInput!){
		createNewMap(map: $map)
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
export const REORDER_ITEMS_DESC = gql`
	mutation ReorderItemsDescription($_id: String!) {
		reorderItemsDescription(_id: $_id) {
			_id
			id
			description
			due_date
			assigned_to
			completed
		}
	}
`;
export const REORDER_ITEMS_DESC1 = gql`
	mutation ReorderItemsDescription1($_id: String!, $originalItems: [ItemInput]!) {
		reorderItemsDescription1(_id: $_id, originalItems: $originalItems) {
			_id
			id
			description
			due_date
			assigned_to
			completed
		}
	}
`;
export const REORDER_ITEMS_DATE = gql`
	mutation ReorderItemsDate($_id: String!) {
		reorderItemsDate(_id: $_id) {
			_id
			id
			description
			due_date
			assigned_to
			completed
		}
	}
`;
export const REORDER_ITEMS_STATUS= gql`
	mutation ReorderItemsStatus($_id: String!) {
		reorderItemsStatus(_id: $_id) {
			_id
			id
			description
			due_date
			assigned_to
			completed
		}
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
