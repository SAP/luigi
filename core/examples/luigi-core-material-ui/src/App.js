import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './scss/index.scss';

import PropTypes from 'prop-types';
import {
  createMuiTheme,
  ThemeProvider,
  withStyles
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from './components/Navigator';
import Header from './components/Header';

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3'
    }
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5
    }
  },
  shape: {
    borderRadius: 8
  },
  props: {
    MuiTab: {
      disableRipple: true
    }
  },
  mixins: {
    toolbar: {
      minHeight: 48
    }
  }
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c'
      }
    },
    MuiButton: {
      label: {
        textTransform: 'none'
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none'
        }
      }
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1)
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white
      }
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0
        }
      }
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1)
      }
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854'
      }
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20
        }
      }
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32
      }
    }
  }
};

const drawerWidth = 256;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1'
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1'
  }
};

const listeners = [];
const removeListeners = () =>
  listeners.forEach(id => window.Luigi.navigation().removeEventListener(id));
function App(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [leftNav, setLeftNav] = useState({ categories: [] });
  const [topNav, setTopNav] = useState({ topNavData: { children: [] } });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const prepareCategories = childrenObj => {
    const categories = [];
    for (const category in childrenObj) {
      if (!category.startsWith('__')) {
        categories.push({
          label: category,
          children: childrenObj[category]
        });
      }
    }
    return categories;
  };

  const handleLuigiEvents = (name, data) => {
    if (!data) {
      return;
    }

    if (name.endsWith('topNav')) {
      setTopNav(data);
    }
    if (name.endsWith('leftNav')) {
      data.categories = prepareCategories(data.leftNavData.children);
      setLeftNav(data);
    }
  };

  useEffect(() => {
    removeListeners();
    listeners.push(
      window.Luigi.navigation().addEventListener('leftNav', data =>
        handleLuigiEvents('leftNav', data)
      )
    );
    listeners.push(
      window.Luigi.navigation().addEventListener('topNav', data =>
        handleLuigiEvents('topNav', data)
      )
    );
    // listeners.push(
    //   window.Luigi.navigation().addEventListener('tabNav', data =>
    //     handleLuigiEvents('tabNav', data)
    //   )
    // );
    window.onbeforeunload = () => removeListeners();
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              leftNav={leftNav}
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator
              leftNav={leftNav}
              PaperProps={{ style: { width: drawerWidth } }}
            />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header topNav={topNav} onDrawerToggle={handleDrawerToggle} />
        </div>
      </div>
    </ThemeProvider>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
