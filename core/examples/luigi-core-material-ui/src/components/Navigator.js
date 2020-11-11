import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
          Custom Luigi
        </ListItem>
        {leftNav.categories.map(({ label, children }) => (
          <div key={label}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary
                }}
              >
                {label}
              </ListItemText>
            </ListItem>

            {children.map(({ label: childLabel, active, pathSegment }) => (
              <ListItem
                key={childLabel}
                button
                className={clsx(classes.item, active && classes.itemActiveItem)}
                selected={leftNav.leftNavData.selectedNode.label === childLabel}
                onClick={() => navigateTo(pathSegment)}
              >
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary
                  }}
                >
                  {childLabel}
                </ListItemText>
              </ListItem>
            ))}

            <Divider className={classes.divider} />
          </div>
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
