import React from "react";
import { Link } from "react-router-dom";
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Post from './components/Post'
import styled from 'styled-components'


const Title = styled.h2`
font-weight: bold;
color: #fff; 
justify-self: start;
align-self: center;
`

const Button = styled.button`
justify-self: end;
align-self: center;
font-size: 20px;
transition: 1s;
background: #222;
transition: #EE3769 0.5s 0.3s ease-out;
border: none;

a{
  padding: 10px 30px;
  border-radius: 30px;
  border: solid 1px #EE3769;
  color: #EE3769;
  text-decoration: none;

  &:hover {
    color: #fff;
    border: solid 1px #fff;
    }
  }
  
&:hover{
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


function Empty() {
  return (
    <div className="text-center">
      {"No posts yet. "}
      <Link to="/new">
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
        < Post key={post.id} post={post} refetch={refetch} />
      ))}

    </>
  );
}

export default App;
