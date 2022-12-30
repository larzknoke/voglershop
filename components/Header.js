import Link from "next/link";
import CartIcon from "../assets/Cart.svg";
import Tippy from "@tippyjs/react/headless"; // different import path!
import "tippy.js/animations/shift-toward.css";
import { useShoppingCartContext } from "../context/cartContext";

function Header() {
  const { cartQuantity } = useShoppingCartContext();

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
          interactive={true}
          render={(attrs) => (
            <div
              className="box bg-vogler-yellow text-vogler-orange p-4 rounded-md"
              tabIndex="-1"
              {...attrs}
            >
              Mein Warenkorb
            </div>
          )}
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
      </nav>
    </header>
  );
}

export default Header;
