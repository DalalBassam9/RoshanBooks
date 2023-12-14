import { Provider } from 'react-redux';
import React from 'react';
import store from '../redux/store'; // Assuming the store file is in the same directory
import '../styles/globals.css';
interface MyAppProps {
    Component: React.ComponentType;
    pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp;