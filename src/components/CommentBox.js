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
        let self = this;

        if (!nextProps.channel || nextProps === this.props) {
            return false;
        }

        if (this.props.channel !== nextProps.channel && evtSource) {
            evtSource.close();
        }

        this.setState({
            comments: []
        });

        evtSource = new EventSource( reactiveUrl +'subject-comment/all/' + nextProps.channel);

        evtSource.onmessage = function(e) {
            let newComments = self.state.comments;
            newComments.unshift(JSON.parse(e.data));
            self.setState({
                comments: newComments
            })
        }
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
        let url = reactiveUrl + 'subject-comment/add-new/';
        url += this.props.channel + "/" + this.state.name + "/" + this.state.comment;
        axios.get(url);
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
