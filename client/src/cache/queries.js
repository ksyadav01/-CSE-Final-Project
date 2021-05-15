import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			name
			email
		}
	}
`;

export const GET_DB_TODOS = gql`
	query GetDBTodos {
		getAllTodos {
			_id
			id
			name
			owner
			items {
				_id
				id
				description
				due_date
				assigned_to
				completed
			}
		}
	}
`;

export const GET_DB_MAPS = gql`
	query GetDBMaps {
		getAllMaps {
			_id
			id
			name
			owner
			subregions
		}
	}
`;
export const GET_DB_REGION = gql`
	query GetDBRegion {
		getAllRegions {
			_id
			id
			name
			capital
			owner
			types
			leader
			flag
			landmarks
			subregions
		}
	}
`;
export const GET_DB_REGION_ID = gql`
	query GetDBRegionID($_id: String!) {
		getRegionById(_id: $_id) {
			_id
			id
			name
			capital
			owner
			types
			leader
			flag
			landmarks
			subregions
		}
	}
`;
