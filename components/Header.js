import { useSession, signIn, signOut } from "next-auth/react";

import Link from "next/link";
import CartIcon from "../assets/Cart.svg";
import FarmerIcon from "../assets/Farmer.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/shift-toward.css";
import { useShoppingCartContext } from "../context/cartContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

function Header() {
  const { data: session } = useSession();
  const { cartQuantity } = useShoppingCartContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    console.log(data);
    try {
      await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      toast.success("Erfolgreich angemeldet.");
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <header className="overscroll-y-auto	">
      <div className="logo">
        <img src="/header/logo.png" className="h-56 m-auto p-8 z-10" />
      </div>
      <nav className="nav">
        <Link href="/">
          <a>Hofladen</a>
        </Link>
        <Link href="/kategorie/susse-brotchen-kleingeback">
          <a>Backwaren</a>
        </Link>
        <Link href="/kategorie/broetchen">
          <a>Obst/Gemüse</a>
        </Link>
        <Link href="/kategorie/brot">
          <a>Fleisch/Wurst</a>
        </Link>
        <a href="#">Milchprodukte</a>
        <a href="#">Sonstiges</a>

        <Tippy
          placement={"bottom"}
          animation={"shift-toward"}
          interactive={true}
          offset={[10, 25]}
          content={
            <div className="box" tabIndex="-1">
              <h2>Mein Warenkorb</h2>
              {cartQuantity > 0 ? (
                <p className="text-vogler-green  font-serif mt-1 text-center hover:underline cursor-pointer">
                  Warenkorb hat {cartQuantity} Produkte
                </p>
              ) : (
                <p className="text-vogler-green  font-serif mt-1 text-center hover:underline cursor-pointer">
                  Warenkorb ist leer
                </p>
              )}
            </div>
          }
        >
          <div>
            <Link href="/cart">
              <div className="relative" suppressHydrationWarning={true}>
                <div>
                  <CartIcon className="h-8 ml-6 cursor-pointer text-vogler-green hover:text-vogler-orange" />
                </div>
                {cartQuantity > 0 && (
                  <div className="absolute cursor-pointer flex items-center justify-center right-0 bottom-[-5px] rounded-full bg-vogler-orange w-5 h-5 text-xs text-vogler-yellow text-center">
                    <span>{cartQuantity}</span>
                  </div>
                )}
              </div>
            </Link>
          </div>
        </Tippy>
        <Tippy
          placement={"bottom"}
          interactive={true}
          animation="shift-toward"
          offset={[10, 25]}
          content={
            session ? (
              <div className="box tippy-box" tabIndex="-1">
                <h2>Mein Konto</h2>
                <p className="border-b border-vogler-yellow2 py-1 font-serif mt-1 text-left hover:underline cursor-pointer text-vogler-green">
                  Bestellungen
                </p>
                <p className="border-b border-vogler-yellow2 py-1 font-serif mt-1 text-left hover:underline cursor-pointer text-vogler-green">
                  Einstellungen
                </p>
                <p
                  onClick={() => signOut()}
                  className=" py-1 font-serif mt-1 text-left hover:underline cursor-pointer text-vogler-green"
                >
                  Logout
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="box tippy-box" tabIndex="-1">
                  <div className="space-y-5">
                    <h2 className="uppercase text-center">Mein Konto</h2>
                    <div className="form-group">
                      <input
                        id="email"
                        {...register("email", {
                          required: "Bitte Email eingeben.",
                        })}
                        type="text"
                        placeholder="Email"
                      />
                      {errors.email && (
                        <span className="text-vogler-orange">
                          {errors.email?.message}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        id="password"
                        {...register("password", {
                          required: "Bitte Passwort eingeben.",
                        })}
                        type="password"
                        placeholder="Passwort"
                      />
                      {errors.password && (
                        <span className="text-vogler-orange">
                          {errors.password?.message}
                        </span>
                      )}
                    </div>
                    <input
                      className="button block w-full text-left cursor-pointer"
                      type="submit"
                      value={"Login"}
                    />
                    <p className="font-serif mt-1 text-center hover:underline cursor-pointer">
                      Passwort vergessen?
                    </p>
                  </div>
                </div>
              </form>
            )
          }
        >
          <div className="!ml-6">
            <Link href="/cart">
              <div className="relative" suppressHydrationWarning={true}>
                <div>
                  <FarmerIcon className="h-8 ml-0 cursor-pointer text-vogler-green hover:text-vogler-orange" />
                </div>
              </div>
            </Link>
          </div>
        </Tippy>
      </nav>
    </header>
  );
}

export default Header;
