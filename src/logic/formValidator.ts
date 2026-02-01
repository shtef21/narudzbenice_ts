import { useState } from "react"
import { useOrderFormContext } from "../context/OrderFormContext"

export const useFormValidator = () => {
    const { state: _form } = useOrderFormContext()
    const [snackbarMessage, _setSnackbarMessage] = useState('Form aint correct\n\nPlease make it correct')

    const validateForm = () => {
        return Math.random() < 0.5
    }

    return {
        snackbarMessage,
        validateForm,
    }
}
