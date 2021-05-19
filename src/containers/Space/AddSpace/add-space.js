import React , { Component } from 'react';
import PageTitle from '../../../components/PageTitle/page-title';

class AddSpace extends Component{
    state = {
        loading : false,
        error : null,
        success : null
    }

    render(){
        return (
           <PageTitle>Create Space</PageTitle>
        )
    }
}

export default AddSpace;