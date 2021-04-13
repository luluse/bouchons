import React from "react";
import { Link } from "react-router-dom";
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Post from './components/Post'
import styled from 'styled-components'


const Title = styled.h2`
font-weight: bold;
color: green; 
/* margin: 0 auto; */
justify-self: start;
align-self: center;
`

const Button = styled.button`
justify-self: end;
align-self: center;
color: #2CA58D;
font-size: 20px;

padding: 10px 30px; 
transition: 1s;

border: solid 1px #EE3769; 
background: #222;
border-radius: 30px;
transition: #EE3769 0.3s 0.1s ease-out;

a{
  color: #EE3769;
  text-decoration: none;
}

  &:hover {
    color: #fff;
    box-shadow: inset 0 0 0 10px rgba(#EE3769,1);
    /* box-shadow: 0 20px 40px rgba(#EE3769, 0.15); */
       transform: translateY(-3px);

}
`

const Header = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-gap: 20px;
padding: 10px 20px;
background: #222;
`

const classes = {
  h2: "text-sm font-semibold",
  header:
    "bg-gray-300 text-gray-700 py-3 px-4 flex items-center justify-between",
  newPost:
    "bg-green-500 text-white rounded px-4 text-xs py-2 uppercase font-semibold tracking-wide",
  link: "text-blue-500 underline hover:text-blue-700"
};

function Empty() {
  return (
    <div className="text-center">
      {"No posts yet. "}
      <Link to="/new" className={classes.link}>
        Create one?
      </Link>
    </div>
  );
}

const GET_POSTS = gql`{
      posts {
          id
          body
          title
          createdAt
          }
        }
`


function App() {
  
  const { loading, data, refetch } = useQuery(GET_POSTS, {
    fetchPolicy: 'network-only'
  });

  if (loading) return <div>Loading...</div>;
  console.log(data)

  return (
    <>
      <Header >
        <Title>All Posts</Title>
        <Button>
        <Link to="/new" >
          New Post
        </Link></Button>
      </Header>
      {data.posts.length === 0 && <Empty />}
      {data.posts.map(post => (
        < Post key={post.id} post={post} refetch={refetch}/>
      ))}

    </>
  );
}

export default App;
