import React , { Component , Fragment } from 'react';
import Navigation from '../../components/Navigation/navigation';
import Sidebar from '../../components/Sidebar/sidebar';
import classes from './layout.module.css';

class Layout extends Component{
    render(){
        return(
            <Fragment>
                <Navigation />
                {/* <Sidebar /> */}
                <main className={classes.content} >
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}

export default Layout;