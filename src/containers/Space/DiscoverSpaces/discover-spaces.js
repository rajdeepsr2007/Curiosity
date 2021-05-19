import React , { Component } from 'react';
import PageTitle from '../../../components/PageTitle/page-title';

class DiscoverSpaces extends Component{
    state = {
        loading : false,
        error : null,
        success : null
    }

    render(){
        return (
           <PageTitle>Discover Space</PageTitle>
        )
    }
}

export default DiscoverSpaces;