import { useMemo, useState } from "react";
import { useOrderFormContext } from "../context/OrderFormContext"
import type { OrderFormCalculatedType, OrderFormContextBaseType } from "../context/orderForm.types";
import { formatDate } from "./utils";

export const useGenerator = () => {
    const { state: form } = useOrderFormContext();
    const calculatedForm = useMemo<OrderFormCalculatedType>(() => {
        const calculatedItems = form.items.map((item) => {
            const totalNoPdv = item.priceNoPdv * item.amount
            const totalPdvAmount = totalNoPdv * (item.pdvPtc / 100)
            const totalWithPdv = totalNoPdv + totalPdvAmount
            return {
                ...item,
                totalNoPdv,
                totalPdvAmount,
                totalWithPdv,
            }
        })
        const formTotalNoPdv = calculatedItems.reduce((sum, item) => sum + item.totalNoPdv, 0)
        const formTotalPdvAmount = calculatedItems.reduce((sum, item) => sum + item.totalPdvAmount, 0)
        const formGrandTotal = calculatedItems.reduce((sum, item) => sum + item.totalWithPdv, 0)
        return {
            ...(form as OrderFormContextBaseType),
            calculatedItems,
            formTotalNoPdv,
            formTotalPdvAmount,
            formGrandTotal,
            createdAt: new Date(),
        }
    }, [form])
    const [previewText, setPreviewText] = useState('')

    const generateText = () => setPreviewText(`
        NARUDŽBENICA ${calculatedForm.id}/${calculatedForm.class}

        Naručitelj: ${calculatedForm.customer.name}
            OIB: ${calculatedForm.customer.oib}
            Adresa: ${calculatedForm.customer.address}
            E-mail: ${calculatedForm.customer.email}
        Dobavljač: ${calculatedForm.supplier.name}
            OIB: ${calculatedForm.supplier.oib}
            Adresa: ${calculatedForm.supplier.address}

        STAVKE:
        ${calculatedForm.calculatedItems.map(
            (cItem) => ` - ${cItem.name} | $${cItem.priceNoPdv}/kom. | ${cItem.amount} kom. | ${cItem.pdvPtc}% PDV`
                + ` | Uk. (bez PDVa): €${cItem.totalNoPdv} | Ukupno s PDVom: €${cItem.totalWithPdv}`
        ).join('\n')}

        Urudžbeni broj: ${calculatedForm.registryNumber}
        Klasa: ${calculatedForm.class}
        Dostava: ${calculatedForm.delivery}
        Tip narudžbe: ${calculatedForm.orderType}
        Evidencijski broj iz plana nabave: ${calculatedForm.recordNumber}
        Pozicija iz proračuna: ${calculatedForm.budgetPosition}

        Ukupni iznos bez PDVa: €${calculatedForm.formTotalNoPdv}
        Ukupni PDV: €${calculatedForm.formTotalPdvAmount}
        UKUPNO ZA PLATITI: €${calculatedForm.formGrandTotal}

        Narudžbu inicirao i odobrio: ${calculatedForm.approvedBy}
        Datum: ${formatDate(calculatedForm.createdAt)}
        `.trim().replaceAll(/\n        /g, '\n'))

    const generatePdf = () => ''

    return {
        previewText,
        generateText,
        generatePdf
    }
}
