import React,{useState, useEffect, useContext} from 'react';
import './ContentModal.css'
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import { img_logo, img_500, unavailable, unavailableLandscape } from '../../config/config.ts';
import { Badge, Button} from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext.tsx';
import { isLoggedIn } from '../../myhooks/useAuth.ts';
import StarBadge from '../StarBadge.tsx';
import useCollections from '../../myhooks/useCollections.ts';

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

export default function ContentModal({children, type, id, faves= {}, stored, contentStyle, isSearch, title}:props) {
  const classes = useStyles;
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState(null);
    const [video, setVideo] = useState('');
    const [streamProviders, setStreamProviders] = useState([]);

    const loggedIn = isLoggedIn();
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
    const fetchStreamProviders = async ()=>{
      const {data: {results}} = await axios(`https://api.themoviedb.org/3/${type}/${id}}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&locale=US`);
      console.log("Watch Providers:",results);
      setStreamProviders(results.US?.flatrate);
    }
    useEffect(() => {
        if(open){
          fetchData();
          fetchVideo();
          fetchStreamProviders();
        }
        // eslint-disable-next-line 
    },[open])
  const collections = useCollections();
  const saveToStorage = (e, newFave,itemType) => {

        if (faves.id) {
            // If the selected person is already favourited, remove them from favourite list
            delete faves[id];
            sessionStorage.setItem(newFave, JSON.stringify(faves))
            e.target.style.color = "black"

        } else {
            // Add a new favourite person
            const data = {[id]:content};
            faves[id] = data;
            console.log("faves", faves);
            const updateStorage = (error=null)=>{
              if(error) {
                e.target.style.color = "black";
                return;
              }
              sessionStorage.setItem(newFave,JSON.stringify(faves));
              e.target.style.color = "gold";
            }
            collections.save(data,itemType,updateStorage);
            e.target.style.color = "lightgoldenrodyellow";
        }     
    }

  const saveFave = (e) => {
    console.log("new fave", content)
    switch (type) {
      case 'movie':
        saveToStorage(e, "movies",'movies')
        break;
    
      case 'tv':
        saveToStorage(e, 'shows','shows')
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
            { content &&  (<>
                <Badge invisible={loggedIn} sx={{display:'initial'}}  anchorOrigin={{ vertical: 'top', horizontal: 'right',}}
                badgeContent={<StarBadge faves={faves} saveFave={saveFave} id={id}/> } >
              <div className='ContentModal'>
                        <img  src={content.poster_path ? `${img_500}${content.poster_path}` : unavailable} alt={content.name || content.title} className="ContentModal-portrait" />
                        <img src={content.backdrop_path ? `${img_500}${content.backdrop_path}` : unavailableLandscape} alt={content.name || content.title} className="ContentModal-landscape" />
                        <div className="ContentModal-about">
                            <span className='ContentModal-title'>
                                {title} ({(content.first_air_date || content.release_date || '....').substring(0, 4)})</span>
                            {content.tagline && (<i className='tagline'>{content.tagline}</i>)}
                            <span className="ContentModal-description">{content.overview}</span>
                            <div style={{display:'flex', flexFlow: "row nowrap", justifyContent:'space-between'}}>
                              <div>
                              {streamProviders && streamProviders.map(provider=>( 
                                <img style={{marginRight:'12px'}} key={provider.provider_id} src={img_logo+provider.logo_path} alt={provider.provider_name} /> ))}
                              </div>
                              {video && <Button size='medium' variant='contained' startIcon={<YouTubeIcon />} color='secondary' target='_blank' href={`https://www.youtube.com/watch?v=${video}`} >
                                  Trailer
                              </Button>}
                              
                              {/* {content && (<IconButton onClick={e => saveFave(e)} style={{ justifySelf: 'end' }} size="large">
                                <StarIcon style={{ color: `${faves?.hasOwnProperty(id) ? "rgb(235, 222, 47)":'black'}`}}/>
                              </IconButton>)} */}
                            </div>
                        </div>
              </div></Badge></>)}
        </div>
      </Fade>
    </Modal>
  </>;
}
