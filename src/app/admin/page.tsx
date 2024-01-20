
"use client"
import Layout from './components/AdminLayout';// Replace with your actual content component
import useAuth from './useAuth';

export default function Page() {
 
    useAuth({ middleware: 'auth' })

    return (
        <div>
            <Layout>Hello Admin</Layout>
        </div>
    );
}