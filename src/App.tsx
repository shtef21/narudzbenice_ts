import React, { useState } from 'react'
import { OrderForm } from './order/OrderForm'
import { Alert, IconButton, Snackbar, type SnackbarCloseReason } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { OrderFormContextProvider } from './context/OrderFormContext';
// import reactLogo from './assets/react.svg'

export const App = () => {
  const [alertMessage, setAlertMessage] = useState('')
  
  const showAlert = (message: string) => setAlertMessage(message)

  const handleSnackbarClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setAlertMessage('')
  }

  return (
    <OrderFormContextProvider>
      <OrderForm showAlert={showAlert} />
      <Snackbar
        open={alertMessage.length > 0}
        onClose={handleSnackbarClose}
        sx={{ whiteSpace: 'pre-line' }}
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
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </OrderFormContextProvider>
  )
}
