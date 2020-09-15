import React, { useEffect, useState } from "react";
import Posts from '../components/Post_list'
import { Container, Row, Col, Spinner } from "reactstrap";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showLoader, hideLoader } from '../redux/actions/loader.js'

const postsAPI = "https://bcv-fe-interview-api.azapata.io/api/posts";
const usersAPI = "https://bcv-fe-interview-api.azapata.io/api/users";
const propertiesAPI = "https://bcv-fe-interview-api.azapata.io/api/properties/";

const Home = ({loading, showLoader, hideLoader}) => {
    const [error, setError] = useState(false);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            showLoader();
            let [posts, users, properties] = await Promise.all([
              (await fetch(postsAPI)).json(),
              (await fetch(usersAPI)).json(),
              (await fetch(propertiesAPI)).json()
            ]);
            setPosts(posts);
            setUsers(users);
            setProperties(properties);
            console.log('data')
            hideLoader();
          }
          catch(err) {
              setError(true);
              hideLoader();
          }
    };
    return (
      <>
        <Container className="mt-5">
          <Row>
            <Col xs="12" className="text-center">
                <h2>Latest Posts</h2>
            </Col>
          </Row>
          <Row>
            <Col xs="12" 
                 className="d-flex flex-column justify-content-center align-items-center"
                 style={{minHeight:'200px'}}>
                {loading?<Spinner type="grow" color="primary" />:
                  !error?<Posts posts={posts} users={users} properties={properties}/>:''}
                {error?<div className="p-3 alert-danger rounded text-center w-full">
                         <p className="font-weight-bold">Something went wrong</p>
                         <p>Click <span className="cursor-pointer" onClick={getPosts}>
                             <strong>here</strong></span> to try again</p>
                       </div>:''}
            </Col>
          </Row>
        </Container>
      </>
    );
};
const mapStateToProps = (state) => {
    return { loading: state.loader };
  };
  
  const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
      showLoader,
      hideLoader,
    },
    dispatch,
  );
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);