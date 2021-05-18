import React, { Fragment } from 'react';
import Logo from '../UI/Logo/logo';
import {HomeOutlined,Menu,Add} from '@material-ui/icons/';
import classes from './navigation.module.css';
import Sidebar from './Sidebar/sidebar';

const Navigation = (props) => {

    const { toggleSidebar , showSidebar} = props;
    const menuIcon = <Menu />
    const sideBar = showSidebar ? <Sidebar /> : null;

    return (
        <Fragment>
            <header className={classes.header}>
                <div className={classes.logo} >
                    <Logo />
                </div>
                <div className={classes.hamburger} onClick={toggleSidebar} >
                    {menuIcon}
                </div>
            </header>
            {sideBar}
        </Fragment>
    )
}

export default  Navigation;