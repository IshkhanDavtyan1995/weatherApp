import './App.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Main from './components/main/Main';

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
