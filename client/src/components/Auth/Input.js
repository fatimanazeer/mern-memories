import React from 'react'
import { InputAdornment, IconButton, Grid, TextField } from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import useStyles from './styles'; 



const Input = ({ half, name, handleChange, label, autoFocus, type, handleShowPassword}) => {
  const classes = useStyles(); 
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
     <TextField
      name={name}
      onChange={handleChange}
      variant='outlined'
      required
      fullWidth
      label={label}
      className={classes.root}
      autoFocus={autoFocus}
      type={type}
      InputProps={name === 'password' ? {
        endAdornment: (
            <InputAdornment position='end'>
                <IconButton onClick={handleShowPassword}>
                    {type === 'password' ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon/>}
                </IconButton>
            </InputAdornment>
        ),
      }: null}/>
    </Grid>
  )
}

export default Input