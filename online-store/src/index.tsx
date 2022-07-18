import ReactDOM from 'react-dom/client';
import './index.css';
import * as redux from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './app/reducer';
import { AppView } from './App';
import cards from './app/cards';
import Immutable from 'immutable';

const store = redux.createStore(reducer);

const storedCategory = localStorage.getItem('category');
const category = storedCategory ? storedCategory : 'all';

const storedFiltersSettings = localStorage.getItem('filtersSettings');
const filtersSettings = storedFiltersSettings
    ? JSON.parse(storedFiltersSettings)
    : {
          sizes: [],
          colors: [],
          price: { minValue: 39, maxValue: 199 },
          brands: [],
          popular: false,
          quantity: { minValue: 0, maxValue: 30 },
          year: { minValue: 2018, maxValue: 2022 },
      };

const storedSortSettings = localStorage.getItem('sortSettings');
const sortSettings = storedSortSettings
    ? JSON.parse(storedSortSettings)
    : {
          field: null,
          order: null,
      };

const storedShoppingCart = localStorage.getItem('shoppingCart');
const shoppingCart = storedShoppingCart
    ? JSON.parse(storedShoppingCart)
    : {
          items: [],
      };

store.dispatch({
    type: 'INITIALIZE_STORE',
    state: Immutable.Map<string, unknown>({
        cards: cards,
        shoppingCart: shoppingCart,
        filtersSettings: filtersSettings,
        category: category,
        sortSettings: sortSettings,
        searchString: '',
    }),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <AppView />
    </Provider>
);
