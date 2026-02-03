
type SupplierType = {
    oib: string
    name: string
    address: string
}

type CustomerType = SupplierType & {
    email: string
}

export type DeliveryType = 'Paketna dostava' | 'Prijevoz isporučitelja' | 'Prijevoz naručitelja' | 'Ostalo' | ''

export type OrderType = 'Roba' | 'Usluga' | ''

export type ItemType = {
    uuid: string
    name: string
    amount: number | null
    priceNoPdv: number | null
    pdvPtc: number | null
}

type ItemCalculatedType = ItemType & {
    totalNoPdv: number
    totalPdvAmount: number
    totalWithPdv: number
}

// Base class for order forms
export type OrderFormContextBaseType = {
    id: number                 // Broj
    customer: CustomerType     // Naručitelj
    supplier: SupplierType     // Dobavljač
    registryNumber: string     // Ur. broj
    class: string              // Klasa
    delivery: DeliveryType     // Dostava
    orderType: OrderType       // Tip narudžbe
    recordNumber: string       // Evidencijski broj
    budgetPosition: string     // Pozicija iz proračuna
    approvedBy: string         // Odobrio
}

// Used in OrderFormContext
export type OrderFormContextType = OrderFormContextBaseType & {
    items: ItemType[]
}

// Used in form calculations
export type OrderFormCalculatedType = OrderFormContextBaseType & {
    calculatedItems: ItemCalculatedType[]
    formTotalNoPdv: number
    formTotalPdvAmount: number
    formGrandTotal: number
    createdAt: Date
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
    | { type: 'mockForm' }
    | { type: 'resetForm' }

    
export type OrderFormContextValue = {
    state: OrderFormContextType
    dispatch: React.Dispatch<OrderFormAction>
}

export type FormContextPropsType = {
    children: React.ReactNode
}
