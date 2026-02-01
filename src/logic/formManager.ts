import { useOrderFormContext } from "../context/OrderFormContext"
import type { SelectChangeEvent } from "@mui/material"
import type { DeliveryType, OrderType } from "../context/orderForm.types"

export const useFormManager = () => {
    const { state: form, dispatch } = useOrderFormContext()

    const setFormId = (event: React.ChangeEvent<HTMLInputElement>) => dispatch({
    type: 'setId',
    payload: parseInt(event.target.value)
    })

    // Customer
    const setCustomerOib = (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'setCustomerOib', payload: event.target.value })
    const setCustomerName = (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'setCustomerName', payload: event.target.value })
    const setCustomerAddress = (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'setCustomerAddress', payload: event.target.value })
    const setCustomerEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'setCustomerEmail', payload: event.target.value })

    // Supplier
    const setSupplierOib = (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'setSupplierOib', payload: event.target.value })
    const setSupplierName = (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'setSupplierName', payload: event.target.value })
    const setSupplierAddress = (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'setSupplierAddress', payload: event.target.value })

    // Others
    const setRegistryNumber = (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'setRegistryNumber', payload: event.target.value })
    const setFormClass = (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'setClass', payload: event.target.value })
    const setRecordNumber = (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'setRecordNumber', payload: event.target.value })
    const setBudgetPosition = (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'setBudgetPosition', payload: event.target.value })
    const setApprovedBy = (event: React.ChangeEvent<HTMLInputElement>) =>
        dispatch({ type: 'setApprovedBy', payload: event.target.value })

    // DeliveryType (select)
    const setDelivery = (event: SelectChangeEvent) =>
        dispatch({ type: 'setDelivery', payload: event.target.value as DeliveryType })

    // OrderType (select)
    const setOrderType = (event: SelectChangeEvent) =>
        dispatch({ type: 'setOrderType', payload: event.target.value as OrderType })

    // Item actions
    const addItem = () => dispatch({ type: 'addItem' })
    const deleteItem = (uuid: string) => dispatch({ type: 'deleteItem', payload: uuid })

    // Reset form (button click)
    const resetForm = () => dispatch({ type: 'resetForm' })

    return {
        ...form,
        setFormId,
        setCustomerOib,
        setCustomerName,
        setCustomerAddress,
        setCustomerEmail,
        setSupplierOib,
        setSupplierName,
        setSupplierAddress,
        setRegistryNumber,
        setFormClass,
        setRecordNumber,
        setBudgetPosition,
        setApprovedBy,
        setDelivery,
        setOrderType,
        addItem,
        deleteItem,
        resetForm,
    }
}
