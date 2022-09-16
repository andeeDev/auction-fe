import '../styles/globals.css';
import Layout from './Layout';
import '../public/DateTimePicker.css';
import '../public/Calendar.css';
import '../public/Clock.css';

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
