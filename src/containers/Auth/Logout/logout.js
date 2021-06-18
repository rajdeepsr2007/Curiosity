import React , {Component} from 'react';
import Loader from '../../../components/UI/Loader/loader';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';

class Logout extends Component{

    componentDidMount = () => {
        this.props.onLogout();
    }

    render(){
        return(
            <div>
                <Loader />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogout : () => dispatch(actions.logout())
    }
}

export default connect(null , mapDispatchToProps)(Logout);