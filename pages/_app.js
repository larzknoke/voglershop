import "../styles/globals.css";
import Layout from "../components/layout";
import { ShoppingCartContextProvider } from "../context/cartContext";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <ShoppingCartContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ShoppingCartContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
