import React, {useEffect, useState} from 'react'
import useStyles from './styles'; 
import { TextField, Button, Paper, Typography } from '@mui/material';
import FilebBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
// import { createPost } from '../../api';
import { createPost, updatePost } from '../../actions/posts';
import Post from '../Posts/Post/Post';

const Form = ({currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({creator:'', title:'', message:'', tags:'', selectedFile:''})
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)
  const classes = useStyles();   
  const dispatch = useDispatch()

  useEffect (() => {
    if(post) setPostData(post)
  }, [post])



  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(currentId) {
      dispatch(updatePost(currentId, postData))
    }else{
      dispatch(createPost(postData))
      
    }

  }
 const clear = () => {
  setPostData({
    creator:'',
    title:'',
    message:'',
    tags:'',
    selectedFile:''
  })
 }
  return (
    <Paper className={classes.paper}>
          <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
           <Typography variant='h6' >Creating a Memory </Typography>
           <TextField
            name='creator'
            variant='outlined'
            label='Creator'
            fullWidth
            required
            value={postData.creator}
            onChange={(e) => setPostData({ ...postData, creator: e.target.value})}
           />
           <TextField
            name='title'
            variant='outlined'
            label='Title'
            fullWidth
            required
            value={postData.title}
            onChange={(e) => setPostData({ ...postData, title: e.target.value})}
           />
           <TextField
            name='message'
            variant='outlined'
            label='Message'
            fullWidth
            required
            value={postData.message}
            onChange={(e) => setPostData({ ...postData, message: e.target.value})}
              
           />
           <TextField
            name='tags'
            variant='outlined'
            label='Tags'
            fullWidth
            required
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}
           />
           <div className={classes.fileInput}>
           <FilebBase
            type="false"
            multiple={false}
            onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}
           />
           </div>
           <Button sx={{ marginBottom:'10px'}}  variant='contained' color='primary'size='large' type='submit'  fullWidth onClick={handleSubmit} >Submit</Button>
           <Button variant='contained'sx={{
           backgroundColor: '#F5026A',
            color: '#fff',
            '&:hover': {
            backgroundColor: '#f50057', 
            },
           }}size='small' fullWidth onClick={clear}>clear</Button>
          </form>
    </Paper>
  )
}

export default Form


