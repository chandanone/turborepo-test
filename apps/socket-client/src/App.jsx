import { useEffect, useMemo, useState } from 'react'
import {io} from 'socket.io-client'
import {Container, Typography, Button, TextField, Box} from '@mui/material'

function App() {  

  const socket = useMemo(
    () =>
      io("http://localhost:4000", {
        withCredentials: true,
      }),
    []
  );

  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id)
    })

    socket.on("welcome", (s)=>{
      console.log(s)
    })

    socket.on("get started", (s)=>{
      console.log(s)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const handleSubmit = (e) =>{
    e.preventDefault();
    socket.emit("message", message)
    setMessage("") 
  }
  return (
    <Container maxWidth="sm">
      <Box sx={{ height: 100 }}/>
      <Typography variant='h6' component="div" gutterBottom>
        Welcome to Socket.io
      </Typography>
      <h1>socket client</h1>
      <form onSubmit={handleSubmit}>
        <TextField 
          value={message}
          onChange={(e) => setMessage(e.target.value) }
          id='outlined-basic'
          label='Outlined'
          variant='outlined' 
          placeholder='enter message'/>
        <Button type='submit' variant='contained' color='primary'>Send</Button>
      </form>
    </Container>
  )
}

export default App
