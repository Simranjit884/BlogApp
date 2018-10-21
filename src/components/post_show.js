import React,{Component} from 'react';
import {fetchpost,deletePost} from '../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class postNew extends Component{
    componentDidMount(){
        const { id }=this.props.match.params;
        this.props.fetchpost(id);
    }

    onDeleteClick(){
        const { id }=this.props.match.params;
        this.props.deletePost(id,()=>{
            this.props.history.push('/');
        });
    }
    render(){
        const { post }=this.props;
        if(!post){
            return <div>Loading...</div>
        } 
        return (
            <div>
                <Link to="/">Back to Index</Link>

                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                    >
                    Delete Post!
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps({posts},ownProps){
    return {post:posts[ownProps.match.params.id]}
}
export default connect(mapStateToProps,{fetchpost,deletePost})(postNew);
