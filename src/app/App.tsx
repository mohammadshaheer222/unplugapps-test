import { Provider } from 'react-redux';

import SalesEntry from '@/app/sales/page';

import './style/index.css';
import { store } from '@/store';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen h-screen w-full">
        <SalesEntry />
      </div>
    </Provider>
  );
}

export default App;
