import { useOrderFormContext } from "../context/OrderFormContext"

export const useFormValidator = () => {
    const { state: form } = useOrderFormContext()

    const validateForm = (): string => {
        const mainErrors: string[] = []
        const itemErrors: string[] = []

        const { customer } = form
        if(!customer.oib || !customer.name || !customer.address || !customer.email) {
            mainErrors.push('- Nepotpuni podaci naručitelja')
        }

        const { supplier } = form
        if (!supplier.oib || !supplier.name || !supplier.address) {
            mainErrors.push('- Nepotpuni podaci dobavljača')
        }

        if (!form.registryNumber) {
            mainErrors.push('- Nedostaje urudžbeni broj')
        }
        if (!form.class) {
            mainErrors.push('- Nedostaje klasa narudžbe')
        }
        if (!form.delivery) {
            mainErrors.push('- Nedostaje dostava')
        }
        if (!form.orderType) {
            mainErrors.push('- Nedostaje tip narudžbe')
        }
        if (!form.recordNumber) {
            mainErrors.push('- Nedostaje evidencijski broj')
        }
        if (!form.budgetPosition) {
            mainErrors.push('- Nedostaje pozicija iz proračuna')
        }
        if (!form.approvedBy) {
            mainErrors.push('- Nedostaje osoba koja odobrava narudžbu')
        }

        form.items.forEach((item, index) => {
            if (!item.name || item.amount === null || item.priceNoPdv === null || item.pdvPtc === null) {
                itemErrors.push(`- Nedostaju naziv ili iznosi stavke ${index + 1}`)
            }
        })

        const finalErrorList = [...mainErrors, ...itemErrors]
        const validationMessage = finalErrorList.length === 0
            ? ''
            : 'Nisu uneseni svi podaci!\n\n' + finalErrorList.join('\n')
        return validationMessage
    }

    return {
        validateForm,
    }
}
