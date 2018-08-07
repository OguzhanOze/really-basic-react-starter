import React from "react";

import CommentBox from './CommentBox'

const style = {
    container: {
        padding: 10
    },
    nav: {
        margin: "10px auto",
        maxWidth: 300,
        border: '2px solid SkyBlue',
        textAlign: "center"
    },
    navItem: {
        display: "inline-block",
        fontSize: 22,
        color: "SkyBlue",
        margin: 10
    },
    title: {
        color: 'white',
        textAlign: 'center'
    }
}

class Content extends React.Component {
    state = {
        selectedChannel: null
    }


    channelSelect(channelCode) {
        this.setState({
            selectedChannel: channelCode
        })
    }

    render(){
        return(
            <main style={style.container}>
                <nav style={style.nav}>
                    <a style={style.navItem} onClick={this.channelSelect.bind(this, "TV-1")}>TV-1</a>
                    <a style={style.navItem} onClick={this.channelSelect.bind(this, "TV-2")}>TV-2</a>
                    <a style={style.navItem} onClick={this.channelSelect.bind(this, "TV-3")}>TV-3</a>
                </nav>
                <CommentBox channel={this.state.selectedChannel}>
                    Please select a channel...
                </CommentBox>
            </main>
        )
    }
}

export default Content
