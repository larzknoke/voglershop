import Header from "./header";
import Footer from "./footer";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Voglershop</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,700|Arvo:400,700"
          rel="stylesheet"
        />
      </Head>
      <div className="antialiased">
        <Header />

        {children}

        <Footer />
      </div>
    </>
  );
}
