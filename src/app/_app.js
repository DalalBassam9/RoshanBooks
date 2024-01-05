import { useRouter } from 'next/router';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    if (router.asPath == '/admin/cities') {
        return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        ); 
        
    }

    return (
            <Component {...pageProps} />
    );
}
export default MyApp;