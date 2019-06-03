export const CREATE_PIN_MUTATION = `
  mutation($title: String!, $image: String!, $content: String!, $latitude: Float!, $longitude: Float!){
    createPin(input: {
      title: $title,
      image: $image,
      content: $content,
      latitude: $latitude,
      longitude: $longitude
    }){
      _id
      createdAt
      title
      image
      content
      longitude
      latitude
      author{
        _id
        name
        email
        picture
      }
    }
  }
`;

export const DELETE_PIN_MUTATION = `
  mutation($pinId: ID!){
    deletePin(pinId: $pinId){
      _id
    }
  }
`;

export const CREATE_COMMENT_MUTATION = `
  mutation($pinId: ID!, $text:String!){
    createComment(pinId: $pinId, text:$text){
      _id
      createdAt
      title
      image
      content
      longitude
      latitude
      author{
        _id
        name
        email
        picture
      }
      comments{
        text
        createdAt
        author{
        name
        picture
        }
      }
    }
  }
`;
