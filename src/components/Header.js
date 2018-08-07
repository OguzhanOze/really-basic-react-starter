import React from "react";

const style = {
    container: {
        borderBottom: '4px solid AliceBlue',
        backgroundColor: 'SkyBlue',
        padding: 10
    },
    title: {
        color: 'white',
        textAlign: 'center'
    }
}

class Header extends React.Component {

    render(){
        return(
            <header style={style.container}>
                <h1 style={style.title}>{this.props.title}</h1>
            </header>
        )
    }
}

export default Header
