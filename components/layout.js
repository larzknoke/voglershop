import { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import Head from "next/head";
import Sidebar from "react-sidebar";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onSetSidebarOpen = (open) => {
    setSidebarOpen(open);
  };
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
      <Toaster
        toastOptions={{
          className: "",
          style: {
            backgroundColor: "#FFFEF2",
            color: "#467F40",
            borderRadius: "4px",
          },
          success: {
            iconTheme: {
              primary: "#467F40",
            },
          },
        }}
      />
      <div className="antialiased">
        {/* <Sidebar
          sidebar={<b>Sidebar content</b>}
          open={sidebarOpen}
          onSetOpen={onSetSidebarOpen}
          pullRight={true}
          overlayClassName="cart-overlay"
          sidebarClassName="cartbox-sidebar"
          styles={{ sidebar: { transition: "transform 300ms ease-in-out" } }}
        > */}
        <Header />

        {/* <a
            href="#"
            className="no-hover"
            onClick={() => onSetSidebarOpen(true)}
          >
            Sidebar
          </a> */}
        {children}

        <Footer />
        {/* </Sidebar> */}
      </div>
    </>
  );
}
