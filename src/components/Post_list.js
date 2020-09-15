import React from "react";
import { Table } from "reactstrap";
import Moment from 'moment';
import SanitizedHTML from 'react-sanitized-html';
const regEx = /(@[^\s]+)/gim

const Posts = (props) => {
  const { users, posts, properties } = props;
  const getUser = (user_id) => {
    let user = users.filter((user) => user.id === user_id);
    if (user.length)
      return { name: user[0].name, profile_pic: user[0].profile_picture };

    return { name: "Unknown", profile_pic: null };
  };
  const getProperty = (propery_id) => {
    let propery = properties.filter((propery) => propery.id === propery_id);
    if (propery.length) return propery[0].name;

    return "Unknown";
  };
  const mentionText = (post_content) => {
     if(post_content.length){
        let convertedText = post_content.toLowerCase();
        return convertedText.replace(regEx, function(val){
            return `<p id='mention'><b>${val}</b></p>`
        })
     }else {
         return "";
     }
  }
  return (
    <>
      <Table dark bordered striped className="posts_table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Property</th>
            <th>User</th>
            <th>Network</th>
            <th>Date</th>
            <th>Image</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{getProperty(item.property_id)}</td>
                <td>
                  <div className="d-flex flex-column">
                    <span>{getUser(item.user_id)["name"]}</span>
                    <div className="border d-flex flex-row justify-content-center p-2">
                      <img
                        src={getUser(item.user_id)["profile_pic"]}
                      />
                    </div>
                  </div>
                </td>
                <td>
                    <span className={
                        (item.social_network!=="null" && item.social_network.length)?`icon socicon-${item.social_network}`:'icon socicon-default'}>
                    </span>
                </td>
                <td>
                    <div className="d-flex flex-column">
                        <span>{Moment(item.post_date).format('dddd')}</span>
                        <span>{Moment(item.post_date).format('MMM DD')}</span>
                        <span>{Moment(item.post_date).format('YYYY')}</span>
                    </div>
                </td>
                <td>
                    <div className={
                        item.post_media!=="null"?'d-flex flex-row justify-content-center'
                        :'border d-flex flex-row justify-content-center h-80'}>
                      {item.post_media!=="null"?<img
                        src={item.post_media}
                      />:''}
                    </div>
                </td>
                <td className="post_content">
                    <SanitizedHTML html={ mentionText(item.post_content) } />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
export default Posts;
