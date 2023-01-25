import { ContextProvider, StoreData } from './hooks/useStore';
import { AppStore } from './stores/AppStore';
import { OrderStore } from './stores/OrderStore';
import { FirebaseApi } from './api/FirebaseApi';
import { LandingPage } from './components/LandingPage';

const api = new FirebaseApi();

const stores: StoreData = {
  appStore: new AppStore(api),
  orderStore: new OrderStore()
}

stores.orderStore.getOrders(api);

//stores.appStore.init(stores)

function App() {
  
  return (
    <ContextProvider store={stores}>
      <div className="App">
        <LandingPage/>
      </div>
    </ContextProvider>
  )
}

export default App
