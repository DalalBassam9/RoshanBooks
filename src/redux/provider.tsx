"use client";
import store from '../redux/store';
import { Provider } from "react-redux";
import Navigation from '../components/Navigation';
import HeaderSection from '../components/HeaderSection';

export function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>
   
        {children}
    </Provider>;
}