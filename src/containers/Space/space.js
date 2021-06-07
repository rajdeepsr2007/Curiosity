import React , { Component } from 'react';
import AddSpace from './AddSpace/add-space';
import DiscoverSpaces from './DiscoverSpaces/discover-spaces';
import CompleteSpace from './Complete Space/complete-space';
import {Route , Switch} from 'react-router-dom';

class Space extends Component{

    render(){
        return (
            <Switch>
                <Route path='/spaces/add' exact component={AddSpace} />
                <Route path='/spaces/discover' exact component={DiscoverSpaces} />
                <Route path='/spaces/:id' component={CompleteSpace} />
            </Switch>
        )
    }
}

export default Space;