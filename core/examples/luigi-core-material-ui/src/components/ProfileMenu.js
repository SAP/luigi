import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SendIcon from '@material-ui/icons/Send';
import AccessibilityIcon from '@material-ui/icons/Accessibility';

const styles = theme => ({
  iconButtonAvatar: {
    padding: 4
  }
});

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const listeners = [];
const removeListeners = () =>
  listeners.forEach(id => window.Luigi.navigation().removeEventListener(id));

function ProfileMenu(props) {
  const { classes } = props;
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    removeListeners();
    listeners.push(
      window.Luigi.navigation().addEventListener('userInfo', data => {
        setUserInfo(data);
      })
    );
    window.onbeforeunload = () => removeListeners();
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = item => {
    if (item && item.link) {
      window.Luigi.navigation().navigate(item.link);
    }
    setAnchorEl(null);
  };
  const handleLogout = () => {
    console.error('Logout is not yet implemented.');
    setAnchorEl(null);
  };

  const profile = window.Luigi.getConfigValue('navigation.profile') || {
    items: []
  };

  /* eslint-disable no-mixed-operators */
  return (
    <div>
      <IconButton
        color="inherit"
        className={classes.iconButtonAvatar}
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar src={userInfo.picture} alt={userInfo.name} />
      </IconButton>
      <StyledMenu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem key={userInfo.name} onClick={handleClose}>
          <ListItemIcon>
            <AccessibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={userInfo.name} />
        </StyledMenuItem>

        {profile.items.map(item => (
          <StyledMenuItem key={item.label} onClick={() => handleClose(item)}>
            <ListItemIcon>
              <SendIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </StyledMenuItem>
        ))}

        <StyledMenuItem onClick={() => handleLogout()}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={
              (profile && profile.logout && profile.logout.label) || 'Logout'
            }
          />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
  /* eslint-enable no-mixed-operators */
}

ProfileMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileMenu);
