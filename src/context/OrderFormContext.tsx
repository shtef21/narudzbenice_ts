import { createContext, useContext, useReducer } from "react";
import type { FormContextPropsType, ItemType, OrderFormAction, OrderFormContextType, OrderFormContextValue } from "./orderForm.types";

const generateEmptyItem = (): ItemType => ({
    uuid: crypto.randomUUID(),
    name: '',
    amount: 0,
    priceNoPdv: 0,
    pdvPtc: 0
})

const initialValue: OrderFormContextType = {
    id: 1,
    customer: {
        oib: '',
        name: '',
        address: '',
        email: ''
    },
    supplier: {
        oib: '',
        name: '',
        address: '',
    },
    registryNumber: '',
    class: '',
    delivery: '',
    orderType: '',
    recordNumber: '',
    budgetPosition: '',
    approvedBy: '',
    items: [generateEmptyItem()],
}

export const reducer = (state: OrderFormContextType, action: OrderFormAction): OrderFormContextType => {
    switch (action.type) {
    case 'setId':
        return { ...state, id: action.payload }
    case 'setCustomerOib':
        return {
            ...state,
            customer: { ...state.customer, oib: action.payload },
        }
    case 'setCustomerName':
        return {
            ...state,
            customer: { ...state.customer, name: action.payload },
        }
    case 'setCustomerAddress':
        return {
            ...state,
            customer: { ...state.customer, address: action.payload },
        }
    case 'setCustomerEmail':
        return {
            ...state,
            customer: { ...state.customer, email: action.payload },
        }
    case 'setSupplierOib':
        return {
            ...state,
            supplier: { ...state.supplier, oib: action.payload },
        }
    case 'setSupplierName':
        return {
            ...state,
            supplier: { ...state.supplier, name: action.payload },
        }
    case 'setSupplierAddress':
        return {
            ...state,
            supplier: { ...state.supplier, address: action.payload },
        }
    case 'setRegistryNumber':
        return { ...state, registryNumber: action.payload }
    case 'setClass':
        return { ...state, class: action.payload }
    case 'setDelivery':
        return { ...state, delivery: action.payload }
    case 'setOrderType':
        return { ...state, orderType: action.payload }
    case 'setRecordNumber':
        return { ...state, recordNumber: action.payload }
    case 'setBudgetPosition':
        return { ...state, budgetPosition: action.payload }
    case 'setApprovedBy':
        return { ...state, approvedBy: action.payload }
    case 'addItem':
        return { ...state, items: [...state.items, generateEmptyItem() ]}
    case 'deleteItem':
        return { ...state, items: state.items.filter((item) => item.uuid !== action.payload)}
    case 'setItems':
        return { ...state, items: action.payload }
    case 'mockForm':
        return {
            id: 1,
            customer: {
                oib: '124124124',
                name: 'Ericsson d.o.o',
                address: 'Krapinska ul. 45, Zagreb',
                email: 'info@ericsson.com',
            },
            supplier: {
                oib: '123123123',
                name: 'Infobip d.o.o',
                address: 'Ulica hrvatskog proljeća 10, Rijeka'
            },
            registryNumber: 'Urbr-1',
            class: new Date().getFullYear().toString(),
            delivery: 'Prijevoz isporučitelja',
            orderType: 'Roba',
            recordNumber: 'Evbroj-23',
            budgetPosition: 'Poz-124',
            approvedBy: 'Stjepan S.',
            items: [
                {
                    uuid: crypto.randomUUID(),
                    name: 'Toner',
                    amount: 1,
                    priceNoPdv: 10,
                    pdvPtc: 25,
                },
            ]
        }
    case 'resetForm':
        return initialValue
    default:
        return state
  }
}


const OrderFormContext = createContext<OrderFormContextValue | null>(null)

export const useOrderFormContext = () => {
    const context = useContext(OrderFormContext)
    if (!context) {
        throw new Error (
            'useOrderFormContext must be used within OrderFormContextProvider'
        )
    }
    return context
}

export const OrderFormContextProvider = ({ children }: FormContextPropsType) => {
    const [state, dispatch] = useReducer(reducer, initialValue)
    return (
        <OrderFormContext.Provider value={{state, dispatch}}>
            {children}
        </OrderFormContext.Provider>
    )
}
