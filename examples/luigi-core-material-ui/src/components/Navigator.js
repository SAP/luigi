import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';

import { Icon } from '@rmwc/icon';

// let categories = [
// {
//   label: 'Develop',
//   children: [
//     { label: 'Authentication', icon: <PeopleIcon />, active: true },
//     { label: 'Database', icon: <DnsRoundedIcon /> },
//     { label: 'Storage', icon: <PermMediaOutlinedIcon /> },
//     { label: 'Hosting', icon: <PublicIcon /> },
//     { label: 'Functions', icon: <SettingsEthernetIcon /> },
//     { label: 'ML Kit', icon: <SettingsInputComponentIcon /> },
//   ],
// },
// {
//   label: 'Quality',
//   children: [
//     { label: 'Analytics', icon: <SettingsIcon /> },
//     { label: 'Performance', icon: <TimerIcon /> },
//     { label: 'Test Lab', icon: <PhonelinkSetupIcon /> },
//   ],
// },
// ];

const styles = theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)'
    }
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white
  },
  itemActiveItem: {
    color: '#4fc3f7'
  },
  itemPrimary: {
    fontSize: 'inherit'
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(2)
  }
});

function Navigator(props) {
  const { classes, leftNav, PaperProps } = props;
  console.log('Navigator leftNav', leftNav);

  const navigateTo = pathSegment => {
    window.Luigi.navigation()
      .fromClosestContext()
      .navigate(pathSegment);
  };

  return (
    <Drawer variant="permanent" PaperProps={PaperProps}>
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          Paperbase
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary
            }}
          >
            Project Overview
          </ListItemText>
        </ListItem>
        {leftNav.categories.map(({ label, children }) => (
          <React.Fragment key={label}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary
                }}
              >
                {label}
              </ListItemText>
            </ListItem>

            {children.map(
              ({ label: childLabel, icon, active, pathSegment }) => (
                <ListItem
                  key={childLabel}
                  button
                  className={clsx(
                    classes.item,
                    active && classes.itemActiveItem
                  )}
                  selected={
                    leftNav.leftNavData.selectedNode.label === childLabel
                  }
                  onClick={() => navigateTo(pathSegment)}
                >
                  <ListItemIcon className={classes.itemIcon}>
                    <Icon icon={icon} />
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary
                    }}
                  >
                    {childLabel}
                  </ListItemText>
                </ListItem>
              )
            )}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
  leftNav: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigator);
