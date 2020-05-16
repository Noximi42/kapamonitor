import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Header from '../components/Header';
import BottomNavigationBar from '../components/BottomNavigationBar';

const drawerWidth = 240;

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        //marginBottom: theme.spacing(3),
        overflowX: 'hidden',
    },
    contentShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
});

class MainLayout extends Component {
    state = {
        open: false,
    };

    handleToggleDrawer = () => {
        this.setState((prevState) => {
            return { open: !prevState.open };
        });
    };

    render() {
        const { classes, children } = this.props;
        return (
            <Fragment>
                <div className={classes.root}>
                    <Header handleToggleDrawer={this.handleToggleDrawer} />
                    <main
                        className={classNames(classes.content, {
                            [classes.contentShift]: this.state.open,
                        })}
                    >
                        {children}
                    </main>
                </div>
                {/*<Sidebar open={this.state.open} drawerWidth={drawerWidth} />*/}
                <BottomNavigationBar />
            </Fragment>
        );
    }
}

export default withStyles(styles)(MainLayout);
