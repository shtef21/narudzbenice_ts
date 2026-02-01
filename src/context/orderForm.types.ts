
type SupplierType = {
    oib: string
    name: string
    address: string
}

type CustomerType = SupplierType & {
    email: string
}

export type DeliveryType = 'Packet delivery' | 'Supplier delivery' | 'Customer delivery' | 'Other' | ''

export type OrderType = 'Goods' | 'Services' | ''

export type ItemType = {
    uuid: string
    name: string
    amount: number | null
    priceNoPdv: number | null
    pdvPtc: number | null
}

export type OrderFormContextType = {
    id: number
    customer: CustomerType
    supplier: SupplierType
    registryNumber: string
    class: string
    delivery: DeliveryType
    orderType: OrderType
    recordNumber: string
    budgetPosition: string
    approvedBy: string
    items: ItemType[]
}

export type OrderFormAction =
    | { type: 'setId'; payload: number }
    | { type: 'setCustomerOib'; payload: string }
    | { type: 'setCustomerName'; payload: string }
    | { type: 'setCustomerAddress'; payload: string }
    | { type: 'setCustomerEmail'; payload: string }
    | { type: 'setSupplierOib'; payload: string }
    | { type: 'setSupplierName'; payload: string }
    | { type: 'setSupplierAddress'; payload: string }
    | { type: 'setRegistryNumber'; payload: string }
    | { type: 'setClass'; payload: string }
    | { type: 'setDelivery'; payload: DeliveryType }
    | { type: 'setOrderType'; payload: OrderType }
    | { type: 'setRecordNumber'; payload: string }
    | { type: 'setBudgetPosition'; payload: string }
    | { type: 'setApprovedBy'; payload: string }
    | { type: 'addItem' }
    | { type: 'deleteItem'; payload: string }
    | { type: 'setItems'; payload: ItemType[] }
    | { type: 'resetForm' }

    
export type OrderFormContextValue = {
    state: OrderFormContextType
    dispatch: React.Dispatch<OrderFormAction>
}

export type FormContextPropsType = {
    children: React.ReactNode
}
