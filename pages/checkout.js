import React, { useEffect, useState } from "react";
import { useShoppingCartContext } from "../context/cartContext";
import { formatCurrency } from "../utils/curreny";
import PayPalIcon from "../assets/paypal.svg";
import axios from "axios";
import ConfirmationOrder from "../components/confirmationOrder";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

function Checkout() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { cartItems } = useShoppingCartContext();
  const [confirmationOrder] = useState({});
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const ids = cartItems.map((i) => i.id).join(",");
    fetch(`http://localhost:4000/shop/produkts.json?ids=${ids}`)
      .then((res) => res.json())
      .then((data) => {
        setCartProducts(data);
      });
  }, [cartItems]);

  // function handleCheckoutData(e) {
  //   const { name, value } = e.target;
  //   setCheckoutData((prevState) => {
  //     return {
  //       ...prevState,
  //       [name]: value,
  //     };
  //   });
  // }

  // const onSubmit = (data) => console.log(data);
  async function onSubmit(data) {
    const checkoutDataWithItems = { ...data, cartItems };
    console.log(checkoutDataWithItems);
    // const res = await axios.post(
    //   "http://localhost:4000/shop/checkout",
    //   { checkoutDataWithItems },
    //   {
    //     // withCredentials: true,
    //     headers: {
    //       "content-type": "application/json",
    //       Accept: "application/json",
    //     },
    //   }
    // );
    // if (res.data.success) {
    //   setConfirmationOrder(res.data);
    //   setCartItems([]);
    // }
    // console.log("res", res);
  }

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
        {confirmationOrder.success ? (
          <ConfirmationOrder confirmationOrder={confirmationOrder} />
        ) : (
          <>
            <h1 className="mb-5">Kasse</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-start gap-12">
                <div className="flex flex-col w-4/6 gap-8">
                  <div className="box">
                    <h3 className="border-b border-vogler-green py-3">
                      Besteller
                    </h3>
                    <div className="flex w-full gap-10">
                      <div className="form-group">
                        <label htmlFor="vorname">Vorname</label>
                        <input
                          id="vorname"
                          {...register("vorname")}
                          type="text"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="nachname">Name</label>
                        <input
                          id="nachname"
                          {...register("nachname", { required: true })}
                          type="text"
                        />
                        {errors.nachname && (
                          <span className="text-vogler-orange">
                            Bitte füllen Sie das Feld aus.
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full gap-10">
                      <div className="form-group">
                        <label htmlFor="telefon">Telefon</label>
                        <input
                          id="telefon"
                          {...register("telefon")}
                          type="text"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          {...register("email", { required: true })}
                          type="text"
                        />
                        {errors.email && (
                          <span className="text-vogler-orange">
                            Bitte füllen Sie das Feld aus.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="box">
                    <div className="flex w-full gap-8">
                      <div className="w-1/2">
                        <div className="form-group">
                          <h3 className="border-b border-vogler-green py-3 mb-3">
                            Info
                          </h3>
                          <label htmlFor="abholdatum">Abholdatum</label>
                          <input
                            id="abholdatum"
                            {...register("abholdatum", {
                              required: "Bitte wählen Sie ein Abholdatum aus.",
                            })}
                            type="date"
                            className="w-full"
                            placeholder="13.12.2022"
                          />
                          {errors.abholdatum && (
                            <span className="text-vogler-orange">
                              {errors.abholdatum?.message}
                            </span>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="notiz">Notiz</label>
                          <textarea
                            id="notiz"
                            {...register("notiz")}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="w-1/2">
                        <h3 className="border-b border-vogler-green py-3">
                          Bezahlung
                        </h3>
                        <div className="flex items-center mb-3">
                          <input
                            id="bar"
                            type="radio"
                            value="bar"
                            {...register("bezahlung", {
                              required: "Bitte wählen Sie eine Bezahlung.",
                            })}
                            className="w-4 h-4"
                          />
                          <label htmlFor="bar" className="ml-2">
                            Barzahlung vor Ort
                          </label>
                        </div>
                        <div className="flex items-center mb-3">
                          <input
                            id="ueberweisung"
                            type="radio"
                            value="ueberweisung"
                            name="bezahlung"
                            className="w-4 h-4 "
                          />
                          <label htmlFor="ueberweisung" className="ml-2">
                            Vorabüberweisung
                          </label>
                        </div>
                        <div className="flex items-center mb-3">
                          <input
                            id="paypal"
                            type="radio"
                            value="paypal"
                            name="bezahlung"
                            className="w-4 h-4 "
                          />
                          <label htmlFor="paypal" className="ml-2">
                            <PayPalIcon className="h-8 ml-1 cursor-pointer text-vogler-green hover:text-vogler-orange" />
                          </label>
                        </div>
                        {errors.bezahlung && (
                          <span className="text-vogler-orange">
                            {errors.bezahlung?.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-2/6 gap-8">
                  <div className="box">
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
                          <td className="py-1 text-right">
                            {formatCurrency(VAT())}
                          </td>
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
                    <input
                      className="button block w-full text-left cursor-pointer"
                      type="submit"
                      value={"Bestellen"}
                    />
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
            </form>
          </>
        )}
      </div>
    </main>
  );
}

export default Checkout;
