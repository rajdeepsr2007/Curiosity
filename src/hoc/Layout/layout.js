import React , { Component , Fragment } from 'react';
import Navigation from '../../components/Navigation/navigation';
import classes from './layout.module.css';

class Layout extends Component{

    state = {
        showSidebar : false
    }

    toggleSidebar = () => {
        this.setState((prevState , props) => {
            return {
                ...prevState,
                showSidebar : !prevState.showSidebar
            }
        } )
    }

    render(){
        return(
            <Fragment>
                <Navigation 
                    toggleSidebar={this.toggleSidebar} 
                    showSidebar={this.state.showSidebar} 
                />
                {/* <Sidebar /> */}
                <main className={classes.main} >
                    <div className={classes.content}>
                        {this.props.children}
                    </div>
                </main>
            </Fragment>
        )
    }
}

export default Layout;