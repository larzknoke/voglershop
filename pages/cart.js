import React, { useEffect, useState } from "react";
import { useShoppingCartContext } from "../context/cartContext";
import { formatCurrency } from "../utils/curreny";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function Cart() {
  const {
    cartItems,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useShoppingCartContext();
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const ids = cartItems.map((i) => i.id).join(",");
    fetch(`http://0.0.0.0:4000/shop/produkts.json?ids=${ids}`)
      .then((res) => res.json())
      .then((data) => {
        setCartProducts(data);
      });
  }, [cartItems]);

  function getTotalwithVAT() {
    const cartTotal = cartItems.reduce((total, cartItem) => {
      const item = cartProducts.find((i) => i.id === cartItem.id);
      return total + (item?.preis || 0) * cartItem.quantity;
    }, 0);
    return cartTotal;
  }

  function getTotalWithoutVat() {
    return getTotalwithVAT() * 0.81;
  }
  function VAT() {
    return (19 * getTotalwithVAT()) / 100;
  }

  return (
    <main className="flex flex-col z-50 w-full flex-1  text-vogler-yellow2 bg-vogler-green  p-20 pt-8">
      <div className="container mx-auto">
        <h1 className="mb-5">Warenkorb</h1>
        <div className="flex items-start gap-12">
          <div className="box w-4/6">
            {cartProducts.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Produkt</th>
                    <th className="text-center">Menge</th>
                    <th className="text-right">Preis</th>
                    <th className="text-right">Summe</th>
                    <th className="text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.length &&
                    cartProducts.map((product) => {
                      return (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td className="text-center">
                            <MinusIcon
                              onClick={() => decreaseCartQuantity(product.id)}
                              className="h-4 w-4 text-vogler-green inline mx-3 hover:cursor-pointer"
                            />
                            {getItemQuantity(product.id)}
                            <PlusIcon
                              onClick={() => increaseCartQuantity(product.id)}
                              className="h-4 w-4 text-vogler-green inline mx-3 hover:cursor-pointer"
                            />
                          </td>
                          <td className="text-right">
                            {formatCurrency(product.preis)}
                          </td>
                          <td className="text-right">
                            {formatCurrency(
                              cartItems.find((item) => item.id === product.id)
                                .quantity * product.preis
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <p>
                Ihr Warenkorb ist leer. Bitte fügen Sie Produkte zum Warenkorb
                hinzu.
              </p>
            )}
          </div>
          <div className="flex flex-col w-2/6 gap-8">
            <div className="box ">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Gesamt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1">Summe Netto</td>
                    <td className="text-right py-1">
                      {formatCurrency(getTotalWithoutVat())}
                    </td>
                  </tr>
                  <tr className="text-sm">
                    <td className="py-1">MwSt. 19%</td>
                    <td className="py-1 text-right">{formatCurrency(VAT())}</td>
                  </tr>
                  <tr className="font-bold uppercase">
                    <td>
                      Gesamt <span className="text-xs">inkl. MwSt.</span>
                    </td>
                    <td className="text-right">
                      {formatCurrency(getTotalwithVAT())}
                    </td>
                  </tr>
                </tbody>
              </table>
              <Link href="/checkout">
                <a className="button">Zur Kasse</a>
              </Link>
              <a
                className="text-vogler-orange block text-center font-serif hover:underline"
                href="#"
              >
                Warenkorb speichen
              </a>
            </div>
            <div className="box">
              <h2 className="text-vogler-green">Gutschein vorhanden?</h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                <input
                  type="coupon"
                  id="coupon"
                  className="block w-full p-3 rounded border border-gray-300 bg-vogler-yellow"
                  placeholder="Gutschein Code"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2 rounded bg-vogler-green  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-1.5 hover:bg-vogler-orange transition-all font-serif "
                >
                  Einlösen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
