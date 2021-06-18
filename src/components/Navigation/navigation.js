import React, { Fragment } from 'react';
import Logo from '../UI/Logo/logo';
import {HomeOutlined,Menu,Add,QuestionAnswerOutlined, CreateOutlined,List,ExploreOutlined, AccountCircleOutlined,Create, ExitToApp} from '@material-ui/icons/';
import classes from './navigation.module.css';
import Sidebar from './Sidebar/sidebar';
import {NavLink} from 'react-router-dom';
import baseURL from '../../baseURL';
import {MenuItem} from '@material-ui/core';
import MenuWrapper from '@material-ui/core/Menu';
import {Link} from 'react-router-dom';

const Navigation = (props) => {

    const { toggleSidebar , showSidebar} = props;
    const menuIcon = <Menu />
    const sideBar = showSidebar ? <Sidebar onClick={toggleSidebar} /> : null;

    return (
        <Fragment>
            <header className={classes.header}>
                <div className={classes.logo} >
                    <Logo />
                </div>
                <div className={classes.hamburger} onClick={toggleSidebar} >
                    {menuIcon}
                </div>
                <div className={classes.nav} >
                    <ul>
                        <li>
                            <NavLink to="/home" exact activeClassName={classes.active} >
                                <div className={classes.link} >
                                    <HomeOutlined /> Home
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/question/add"  activeClassName={classes.active}>
                                <div className={classes.link} >
                                    <QuestionAnswerOutlined /> Add Question
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/answer/"  activeClassName={classes.active}>
                                <div className={classes.link} >
                                    <CreateOutlined /> Answer
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/following/spaces"  activeClassName={classes.active}>
                                <div className={classes.link} >
                                    <List /> Following
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/spaces/add" exact activeClassName={classes.active}>
                                <div className={classes.link} >
                                    <Add /> Add Space
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/spaces/discover" exact activeClassName={classes.active}>
                                <div className={classes.link} >
                                    <ExploreOutlined /> Discover Spaces
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className={classes.controls} >
                   <img 
                   id="menu"
                   src={baseURL + props.user.picture}
                   alt={props.user.username}
                   onClick={props.toggleMenu}
                   />
                   <MenuWrapper
                    id="menu"
                    keepMounted
                    open={Boolean(props.anchorEl)}
                    onClose={props.closeMenu}
                    anchorEl={props.anchorEl}
                    >
                    <MenuItem onClick={() => props.closeMenu(`/user/${props.user._id}/followers`)} >
                        <div className={classes.option} >
                            <span><AccountCircleOutlined /></span> 
                            My Profile
                        </div>
                    </MenuItem>
                    <MenuItem onClick={() => props.closeMenu(`/user/edit-topics`)} >
                        <div className={classes.option} >
                            <span><Create /></span>
                            Edit 
                        </div>
                    </MenuItem>
                    <MenuItem onClick={() => props.closeMenu(`/auth/logout`)} >
                        <div className={classes.option} >
                            <span><ExitToApp /></span>
                            Logout
                        </div>
                    </MenuItem>
                    </MenuWrapper>
                </div>
            </header>
            {sideBar}
        </Fragment>
    )
}

export default  Navigation;