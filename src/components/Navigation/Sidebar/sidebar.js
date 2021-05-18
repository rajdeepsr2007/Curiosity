import React , { Fragment } from 'react';
import Backdrop from '../../UI/Modal/Backdrop/backdrop';
import {NavLink} from 'react-router-dom';
import {HomeOutlined,QuestionAnswerOutlined,CreateOutlined,Add,ExploreOutlined,List} from '@material-ui/icons';
import classes from './sidebar.module.css';
import Logo from '../../UI/Logo/logo';

const Sidebar = (props) => {

    return (
        <Fragment>
            <Backdrop show={true} onClick={props.onClick} />
            <div className={classes.sidebar} onClick={props.onClick}  >
            <div className={classes.logo} >
                <Logo />
            </div>
            <div className={classes.nav} >
                    <ul>
                        <li>
                            <NavLink to="/user/edit-topics" exact activeClassName={classes.active} >
                                <div className={classes.link} >
                                    <HomeOutlined /> Home
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/home" exact>
                                <div className={classes.link} >
                                    <QuestionAnswerOutlined /> Add Question
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/home" exact>
                                <div className={classes.link} >
                                    <CreateOutlined /> Answer
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/home" exact>
                                <div className={classes.link} >
                                    <List /> Following
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/home" exact>
                                <div className={classes.link} >
                                    <Add /> Add Space
                                </div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/home" exact>
                                <div className={classes.link} >
                                    <ExploreOutlined /> Discover Spaces
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </Fragment>
        
    )
}

export default Sidebar;