import React , { Component } from 'react';
import {withRouter} from  'react-router';

class Home extends Component{

    componentDidMount = () => {
        this.props.history.push('/user/edit-picture')
    }

    render(){
        return(
            <button onClick={this.click} >picture</button>
        )
    }
}

export default withRouter(Home);