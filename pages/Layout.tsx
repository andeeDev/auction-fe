import Header from './components/Header/Header';
import { store } from '../logic/store';
import { Provider } from 'react-redux';
import HtmlHead from './components/Head/Head';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let persistor = persistStore(store);


export default function Layout({ children }) {
    return (
        <>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <HtmlHead />
                    <Header />
                    <main>{children}</main>
                    <ToastContainer />
                </PersistGate>
            </Provider>
        </>
    );
}