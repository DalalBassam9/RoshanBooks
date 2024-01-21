
"use client"
import Layout from './components/AdminLayout';
import useAuth from './useAuth';

export default function Page() {
 
    useAuth({ middleware: 'auth' })

    return (
        <div>
            <Layout>Hello Admin</Layout>
        </div>
    );
}