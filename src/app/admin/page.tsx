
"use client"
import Layout from './components/AdminLayout';

export default function Page() {
 
    useAuth({ middleware: 'auth' })

    return (
        <div>
            <Layout>Hello Admin</Layout>
        </div>
    );
}