import React from "react";
import axios from 'axios';

const style = {
    container: {
        padding: 10
    },
    title: {
        color: 'SkyBlue',
        textAlign: 'center'
    },
    sendBtn: {
        color: 'SkyBlue'
    }
}

const reactiveUrl = 'http://'+ window.location.hostname +':8080/';

let evtSource;

class CommentBox extends React.Component {

    state = {
        comments : []
    }

    componentWillReceiveProps(nextProps){
        if (!nextProps.channel || nextProps === this.props) {
            return false;
        }

        this.setState({
            comments: []
        });
    }

    changeName(e){
        this.setState({
            name: e.target.value
        })
    }

    changeComment(e){
        this.setState({
            comment: e.target.value
        })
    }

    sendComment(){
        let newComments = self.state.comments;
        newComments.unshift({text:this.state.comment, author:this.state.name});
        this.setState({
            comments: newComments
        })
    }

    render(){

        let title = this.props.channel || this.props.children;

        return(
            <div style={style.container}>
                <h2 style={style.title}>{title}</h2>
                {
                    this.props.channel &&
                        <div>
                            <p>
                                Your Name: <input type="text" onChange={this.changeName.bind(this)}/>
                            </p>
                            <p>
                                Comment: <input type="text" onChange={this.changeComment.bind(this)}/>
                            </p>
                            <p>
                                <a style={style.sendBtn} onClick={this.sendComment.bind(this)}>Send Comment</a>
                            </p>
                        </div>
                }

                {
                    this.state.comments.length > 0 &&
                        <div>
                            {
                                this.state.comments.map((item,index) => {
                                    return (
                                        <p key={index}>
                                            <i>{item.author} says that: </i>
                                            <span>{item.text}</span>

                                        </p>
                                    )
                                })
                            }
                        </div>
                }
            </div>
        )
    }
}

export default CommentBox
