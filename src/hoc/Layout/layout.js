import React , { Component , Fragment } from 'react';
import Navigation from '../../components/Navigation/navigation';
import classes from './layout.module.css';

class Layout extends Component{

    state = {
        showSidebar : false,
        anchorEl : null
    }

    toggleMenu = (event) => {
        this.setState(prevState => {
            return{
                ...prevState ,
                anchorEl : event.target
            }
        })
    }

    closeMenu = () => {
        this.setState({ anchorEl : null })
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
                { this.props.user ? <Navigation 
                    toggleSidebar={this.toggleSidebar} 
                    showSidebar={this.state.showSidebar} 
                    user={this.props.user}
                    anchorEl={this.state.anchorEl}
                    closeMenu={this.closeMenu}
                    toggleMenu={this.toggleMenu}
                /> : null }
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