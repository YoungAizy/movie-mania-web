import React,{useState, useEffect} from 'react';
import './ContentModal.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import { Button, IconButton } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
    paper: {
    width: '80%',
    height: '90%',
    borderRadius: 8,
    backgroundColor: 'rgba(127, 128, 129, 0.8)',
    border: '1px solid darkgray',
    padding: theme.spacing(2, 2, 1, 1),
    color: 'white'
  },
}));

export default function ContentModal({children, type, id, faves, stored, contentStyle}) {
  const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState([]);
    const [video, setVideo] = useState('')

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const fetchData = async() => {
      if (stored) {
        setContent(stored)
      } else {
        const { data } = await axios(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setContent(data)
      }
    }
    
    const fetchVideo = async() => {
        const { data } = await axios(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setVideo(data.results[0]?.key)
    }
    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line 
    },[])

  const saveToStorage = (e, newFave) => {

        if (faves.id) {
            // If the selected person is already favourited, remove them from favourite list
            delete faves[id];
            sessionStorage.setItem(newFave, JSON.stringify(faves))
            e.target.style.color = "black"

        } else {
            // Add a new favourite person 
            faves[id] = content;
            sessionStorage.setItem(newFave,JSON.stringify(faves))
            e.target.style.color = "rgb(235, 222, 47)"
        }     
    }

  const saveFave = (e) => {
    switch (type) {
      case 'movie':
        saveToStorage(e, "faveMovies")
        break;
    
      case 'tv':
        saveToStorage(e, 'faveShows')
        break;
      
      default:
        break;
    }
    
  }
    

  return (
    <>
      <div className={contentStyle} style={{cursor:'pointer'}} color='inherit' onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
              { content &&  (<div className='ContentModal'>
                          <img  src={content.poster_path ? `${img_500}${content.poster_path}` : unavailable} alt={content.name || content.title} className="ContentModal-portrait" />
                          <img src={content.backdrop_path ? `${img_500}${content.backdrop_path}` : unavailableLandscape} alt={content.name || content.title} className="ContentModal-landscape" />
                          <div className="ContentModal-about">
                              <span className='ContentModal-title span-dark'>
                                  {content.name || content.title}({(content.first_air_date || content.release_date || '....').substring(0, 4)})</span>
                              {content.tagline && (<i className='tagline span-dark'>{content.tagline}</i>)}
                              <span className="ContentModal-description span-dark">{content.overview}</span>
                              <div style={{display:'flex', flexFlow: "row nowrap", justifyContent:'space-between'}}>
                                
                              <Button style={{width:'60%'}} size='medium' variant='contained' startIcon={<YouTubeIcon />} color='secondary' target='_blank' href={`https://www.youtube.com/watch?v=${video}`} >
                                  WatchThe Trailer
                              </Button>
                  <IconButton onClick={e => saveFave(e)} style={{ justifySelf: 'end' }}><StarIcon style={{ color: `${faves[id] ? "rgb(235, 222, 47)":'black'}`}}/></IconButton>
                              </div>
                          </div>
                </div>)}
          </div>
        </Fade>
      </Modal>
    </>
  );
}
