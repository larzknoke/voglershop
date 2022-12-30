import "../styles/globals.css";
import Layout from "../components/layout";
import { ShoppingCartContextProvider } from "../context/cartContext";

function MyApp({ Component, pageProps }) {
  return (
    <ShoppingCartContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ShoppingCartContextProvider>
  );
}

export default MyApp;
