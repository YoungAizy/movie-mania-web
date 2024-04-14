import React,{useState, useEffect, useContext} from 'react';
import './ContentModal.css'
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config.ts';
import { Button, IconButton } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext.tsx';

const useStyles = {
    paper: {
    width: '80%',
    height: '90%',
    borderRadius: 12,
    backgroundColor: '#41445bf2',
    border: '1px solid darkgray',
    // padding: theme.spacing(2, 2, 1, 1),
    color: 'white'
  },
};

type props ={
  children: React.ReactNode;
  type: string; 
  id: number;
  title: string;
  faves: any;
  // faves: [{}] | null; 
  stored?: any; 
  contentStyle?: any;
  isSearch?: boolean
}

export default function ContentModal({children, type, id, faves, stored, contentStyle, isSearch, title}:props) {
  const classes = useStyles;
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState(null);
    const [video, setVideo] = useState('')
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get('search');
    const {setSelected} = useContext(AppContext)
    // const content = searchContent ?  searchContent[id]: null;

  const onCardClick = () => {
    if(isSearch){
      setSelected(content);
      navigate(`/search?query=${searchText}&selection_name=${title}&type=${type}&id=${id}`);
    }else{
      setOpen(true);
    }
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
        if(open){
          fetchData();
          fetchVideo();
        }
        // eslint-disable-next-line 
    },[open])

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
    

  return <>
    <div className={contentStyle} style={{cursor:'pointer'}} color='inherit' onClick={onCardClick}>
      {children}
    </div>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <div style={classes.paper}>
            { content &&  (<div className='ContentModal'>
                        <img  src={content.poster_path ? `${img_500}${content.poster_path}` : unavailable} alt={content.name || content.title} className="ContentModal-portrait" />
                        <img src={content.backdrop_path ? `${img_500}${content.backdrop_path}` : unavailableLandscape} alt={content.name || content.title} className="ContentModal-landscape" />
                        <div className="ContentModal-about">
                            <span className='ContentModal-title'>
                                {title} ({(content.first_air_date || content.release_date || '....').substring(0, 4)})</span>
                            {content.tagline && (<i className='tagline'>{content.tagline}</i>)}
                            <span className="ContentModal-description">{content.overview}</span>
                            <div style={{display:'flex', flexFlow: "row nowrap", justifyContent:'space-between'}}>
                              
                            <Button style={{width:'60%'}} size='medium' variant='contained' startIcon={<YouTubeIcon />} color='secondary' target='_blank' href={`https://www.youtube.com/watch?v=${video}`} >
                                WatchThe Trailer
                            </Button>
                            {content && (<IconButton onClick={e => saveFave(e)} style={{ justifySelf: 'end' }} size="large">
                              <StarIcon style={{ color: `${faves?.hasOwnProperty(id) ? "rgb(235, 222, 47)":'black'}`}}/>
                            </IconButton>)}
                            </div>
                        </div>
              </div>)}
        </div>
      </Fade>
    </Modal>
  </>;
}
