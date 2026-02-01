import { useState } from "react";
import { useOrderFormContext } from "../context/OrderFormContext"

export const useGenerator = () => {
    const { state: form } = useOrderFormContext();
    const [previewText, setPreviewText] = useState('')

    const generateText = () => setPreviewText('hello! ' + form.id)

    const generatePdf = () => ''

    return {
        previewText,
        generateText,
        generatePdf
    }
}
