import React, {useEffect, useState} from 'react';
import useStyles from './styles'; 
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles(); 
  const dispatch = useDispatch()
  const [timeFromNow, setTimeFromNow] = useState(moment(post.createdAt).fromNow())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeFromNow(moment(post.createdAt).fromNow())
    }, 60000)
    return () => clearInterval(interval)

  }, [post.createdAt])
  return (
    <div className={classes.borderRadius}>

      <Card className={classes.card}>

        <CardMedia className={classes.media} image={post.selectedFile} title={post.title}>
          <div className={classes.overlay}>
            <Typography variant='h6'>{post.creator}</Typography>
            <Typography variant='body2'>{timeFromNow}</Typography>

          </div>
          <div className={classes.overlay2}> 
          <Button style={{color:'white'}} size="small" onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon fontSize='default'/>
          </Button>
          </div>
        </CardMedia>
        <div className={classes.details}>
            <Typography variant='body2' color="textSecondary" >{post.tags.map((tag) => `#${tag} `)}</Typography>
          </div>
          <Typography className={classes.title} variant='h5' gutterBottom>{post.message}</Typography>

          <CardContent>
            <Typography  variant='body2' color="textSecondary" component='p'>{post.title}</Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button size='small' color='secondary' onClick={() => dispatch(likePost(post._id))}>
             <ThumbUpAltIcon fontSize='small'/>
            &nbsp; Like &nbsp; 
             {post.likeCount}
            </Button>
            <Button size='small' color='secondary' onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon/>
              delete
            </Button>
          </CardActions>
      </Card>
      </div>

  )
}

export default Post