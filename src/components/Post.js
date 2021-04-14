import React from "react";
import { Link } from "react-router-dom";
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks'
import './post.css'

// const classes = {
//   container: "bg-white border rounded-lg overflow-hidden",
//   tr: "odd:bg-gray-100 even:bg-white border-t",
//   td: "font-semibold p-3 text-right md:w-1/5",
//   edit:
//     "text-xs bg-blue-600 text-white hover:bg-blue-700 rounded px-4 py-2 uppercase font-semibold tracking-wide",
//   delete:
//     "text-xs bg-red-600 text-white hover:bg-red-700 rounded px-4 py-2 uppercase font-semibold tracking-wide",
//   li: "inline-block ml-2",
//   nav: "my-4 mx-2 text-center"
// };

const DELETE_POST = gql`
mutation DeletePost($id: uuid!) {
  delete_posts(where: {id: {_eq: $id}}) {
    affected_rows
  }
}
`

function Post( { post, refetch }) {

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted:() => refetch()
  });

  function handleDeletePost(id){
    if (window.confirm("Are you sure you want to delete this post?"))
    deletePost({ variables: {id}})
  }

  return (
    <>
      <div className="container">
        <table className="w-full text-sm">
          <tbody>
            <tr className="tr">
              <td className="td">id</td>
              <td className="p-3">{post.id}</td>
            </tr>
            <tr className="tr">
              <td className="td">title</td>
              <td className="p-3">{post.title}</td>
            </tr>
            <tr className="tr">
              <td className="td">body</td>
              <td className="p-3">{post.body}</td>
            </tr>
            <tr className="tr">
              <td className="td">createdAt</td>
              <td className="p-3">{post.createdAt}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="nav">
        <ul>
          <li className="li">
            <Link to={`/edit/${post.id}`} className="edit">
              Edit
            </Link>
          </li>
          <li className="li">
            <button onClick={() => handleDeletePost(post.id)} className="delete">Delete</button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Post;
