import { OrderFormContextProvider } from './context/OrderFormContext'
import OrderForm from './order/OrderForm'
// import reactLogo from './assets/react.svg'

function App() {

  return (
    <OrderFormContextProvider>
      <OrderForm />
    </OrderFormContextProvider>
  )
}

export default App
