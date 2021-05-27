import React, { Fragment } from 'react';
import Logo from '../UI/Logo/logo';
import {HomeOutlined,Menu,Add,QuestionAnswerOutlined, CreateOutlined,List,ExploreOutlined} from '@material-ui/icons/';
import classes from './navigation.module.css';
import Sidebar from './Sidebar/sidebar';
import {NavLink} from 'react-router-dom';

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
                            <NavLink to="/user/following"  activeClassName={classes.active}>
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
            </header>
            {sideBar}
        </Fragment>
    )
}

export default  Navigation;