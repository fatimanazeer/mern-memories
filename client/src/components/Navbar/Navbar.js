import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Corrected import statement
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import memories from '../../images/memories.png';
import useStyles from './styles';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')) || {})

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/auth')
  }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('profile'));
    if (storedUser?.access_token !== user?.access_token) {
      setUser(storedUser);
    }
  }, [location, user?.access_token]);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
        <img src={memories} alt="memories" height="60"/>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.userInfo ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.userInfo?.name} src={user?.userInfo?.imageUrl}>
              {user?.userInfo?.name?.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>{user?.userInfo?.name}</Typography>
            <Button variant='contained' className={classes.logout} onClick={logout} color="secondary">Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color='secondary'>Sign in</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
