import React, {Component} from 'react'
import {Link, useParams} from "react-router-dom";

const Dashboard=()=>{
    let { id } = useParams();
        let postsa= [ {id:1,
                title:'post 1',
                body: 'this is the first post',
                catId:1
            },
                {id:2,
                    title:'post 2',
                    body: 'this is the second post',
                    catId:1
                },
                {id:3,
                    title:'post 3',
                    body: 'this is the first post',
                    catId:1
                },
                {id:4,
                    title:'post 4',
                    body: 'this is the first post',
                    catId:2
                }];


    /*async getPost() {
        const { errors } = this.state;
        axios.get('/')
        .then(response => {
            console.log(response.data)
            this.setState({
                errors:{
                    ...errors,
                    succ: "Success!",
                    style:{
                        fontSize: 13,
                        marginLeft: 14,
                        color: 'black'

                    }
                },
                posts:response.data
            })
        })
        .catch(error => {
            console.log(error.response)
            this.setState({
                errors:{
                    ...errors,
                    succ: "Username or password wrong!",
                    style:{
                        fontSize: 13,
                        marginLeft: 14,
                        color: 'red'

                    }
                }
            })
        });

    this.setState({errors: {}}) ;
};

    componentDidMount() {
        this.getPost();
    }*/


        const posts =  Array.from(postsa);
        let posts1=[];
        for(let i=0;i<posts.length;i++){
            if(posts[i].catId==id){
                posts1[i]=posts[i];
            }
        }
        return (
            <div>
                <div className="container px-4 py-5" id="featured-3">
                    <h2 className="pb-2 border-bottom">Posts</h2>
                    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                        {posts1.map((post) =>
                            <div className="feature col" key={post.id}>
                                <h2>{post.title}</h2>
                                <p>{post.body}</p>
                                <Link to={'/posts/' + post.id} key={post.id}>See more</Link>
                                <h2 className="pb-2 border-bottom"></h2>
                                <br/>
                            </div>)}
                    </div>
                </div>
            </div>)
    }


export default Dashboard;

                /*
                    const postCards = posts.map(post => (
                    <ul>
                        <li>
                            key={post.id}
                            post={post}
                            deletePost={this.props.requestDeletePost}
                        </li></ul>))*/

/*  let posts = postsSelector.posts.map((post) => {
    return (
      <div  className="mt-2 style-card" key={post.id}>
         <Link to={'/posts/' + post.id} key={post.id}>
          <Post post={post} key={post.id} />
        </Link>
      </div>
    );
  })*/