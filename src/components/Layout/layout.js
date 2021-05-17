import React , { Fragment } from 'react';
import classes from './layout.module.css';
import Navigation from './Navigation/navigation';

const Layout = (props) => {
    return (
        <Fragment>
            <Navigation auth={props.auth} />
            <main className={classes.main}>
                {props.children}
            </main>
        </Fragment>
    )
}

export default Layout;