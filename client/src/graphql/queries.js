export const ME_QUERY = `
query{
  me{
    _id
    name
    email
    picture
  }
}
`;

export const GET_PINS_QUERY = `
query{
  getPins {
  _id
  createdAt
  title
  image
  content
  latitude
  longitude
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
      _id
      name
      email
      picture
    }
  }
}
}
`;
