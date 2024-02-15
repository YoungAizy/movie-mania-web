import React, { useEffect } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MovieIcon from '@mui/icons-material/Movie';
import { Home } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import FavouriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';



export default function BottomNav() {
  const [value, setValue] = React.useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    switch (value) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/people");
        break;
      case 2:
        navigate("/favourites");
        break;
      default:
        break;
    }
  },[value])

  // if (windowWidth > 720) {
  //   return null;
  // }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        console.log("BottomNav event:", event)
        setValue(newValue);
      }}
      showLabels
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: "#2d314a",
        color:"white",
        zIndex: 10,
      }}
    > 
      <BottomNavigationAction label="Movies/Series" icon={< MovieIcon />} />
      <BottomNavigationAction label="People" icon={< PersonIcon />} />
      <BottomNavigationAction label="Favourites" icon={< FavouriteIcon />} />
    </BottomNavigation>
  );
}