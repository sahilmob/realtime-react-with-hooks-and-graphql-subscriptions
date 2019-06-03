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
