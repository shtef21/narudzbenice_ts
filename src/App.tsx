import React, { useMemo } from 'react'
import { OrderForm } from './order/OrderForm'
import { Alert, IconButton, Snackbar, type SnackbarCloseReason } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useFormValidator } from './logic/formValidator';
// import reactLogo from './assets/react.svg'

export const App = () => {
  const { snackbarMessage, clearSnackbarMessage } = useFormValidator()
  const snackbarOpen = useMemo(
    () => snackbarMessage?.length > 0,
    [snackbarMessage],
  )

  const handleSnackbarClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return
    }
    clearSnackbarMessage()
  }

  return (
    <>
      <OrderForm />
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
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
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
