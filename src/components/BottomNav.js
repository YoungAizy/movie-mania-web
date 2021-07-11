import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MovieIcon from '@material-ui/icons/Movie';
import PersonIcon from '@material-ui/icons/Person';
import FavouriteIcon from '@material-ui/icons/Favorite';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    background: "#2d314a",
    color:"white",
    zIndex: 10,
  },
});

export default function BottomNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [windowWidth, setWidth] = React.useState();
  const history = useHistory();

  useEffect(() => {
    setWidth(window.innerWidth);
    if(value===0) history.push("/")
    else if(value===1) history.push("/people")
    else if(value===2) history.push("/favourites")
  },[value, history, setWidth])

  if (windowWidth > 720) {
    return null;
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    > 
      <BottomNavigationAction label="Movies/Series" icon={< MovieIcon />} />
      <BottomNavigationAction label="People" icon={< PersonIcon />} />
      <BottomNavigationAction label="Favourites" icon={< FavouriteIcon />} />
    </BottomNavigation>
  );
}