import React, { useState } from 'react'
import { OrderFormContextProvider } from './context/OrderFormContext'
import { OrderForm } from './order/OrderForm'
import { IconButton, Snackbar, type SnackbarCloseReason } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
// import reactLogo from './assets/react.svg'

export const App = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const openSnackbar = (message: string) => {
    setSnackbarMessage(message)
    setSnackbarOpen(true)
  }

  const handleSnackbarClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
    setSnackbarMessage('')
  }

  return (
    <OrderFormContextProvider>
      <OrderForm openSnackbar={openSnackbar} />
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </OrderFormContextProvider>
  )
}
