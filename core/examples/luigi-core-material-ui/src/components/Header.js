import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import ProfileMenu from './ProfileMenu';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
  secondaryBar: {
    zIndex: 0
  },
  menuButton: {
    marginLeft: -theme.spacing(1)
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white
    }
  },
  button: {
    borderColor: lightColor
  }
});

function Header(props) {
  const { classes, onDrawerToggle, topNav } = props;

  const navigateTo = pathSegment => {
    window.Luigi.navigation().navigate('/' + pathSegment);
    console.log('Header navigate to', '/' + pathSegment);
  };

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              {topNav.topNavData.children.map(({ label, pathSegment }) => (
                <React.Fragment key={label}>
                  <Link
                    className={classes.link}
                    variant="body2"
                    onClick={() => navigateTo(pathSegment)}
                  >
                    {label}
                  </Link>
                </React.Fragment>
              ))}
            </Grid>
            <Grid item>
              <ProfileMenu />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      ></AppBar>
      {/*<AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs value={0} textColor="inherit">
          <Tab textColor="inherit" label="Users" />
          <Tab textColor="inherit" label="Sign-in method" />
          <Tab textColor="inherit" label="Templates" />
          <Tab textColor="inherit" label="Usage" />
        </Tabs>
      </AppBar> */}
    </React.Fragment>
  );
}

Header.propTypes = {
  topNav: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
