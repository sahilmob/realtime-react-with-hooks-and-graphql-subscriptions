import gql from "graphql-tag";

export const PIN_ADDED_SUBSCRIPTION = gql`
	subscription {
		pinAdded {
			_id
			createdAt
			title
			image
			content
			longitude
			latitude
			author {
				_id
				name
				email
				picture
			}
			comments {
				text
			}
		}
	}
`;

export const PIN_UPDATED_SUBSCRIPTION = gql`
	subscription {
		pinUpdated {
			_id
			createdAt
			title
			image
			content
			longitude
			latitude
			author {
				_id
				name
				email
				picture
			}
			comments {
				text
				createdAt
				author {
					name
					picture
				}
			}
		}
	}
`;

export const PIN_DELETED_SUBSCRIPTION = gql`
	subscription {
		pinDeleted {
			_id
		}
	}
`;
