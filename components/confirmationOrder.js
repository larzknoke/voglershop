import React from "react";
import dateformater from "../utils/dateFormater";
import Link from "next/link";

function ConfirmationOrder({ confirmationOrder }) {
  return (
    <>
      <h1 className="mb-5">Vielen Dank für Ihre Bestellung.</h1>
      <div className="flex items-start gap-12">
        <div className="flex flex-col w-4/6 gap-8">
          <div className="box">
            <h3 className="border-b border-vogler-green py-3">
              Bestellinformationen
            </h3>
            <p>
              <strong>
                Sie erhalten gleichzeitig eine Bestellbestätigung per Email mit
                allen Daten zu Ihrer Bestellung.
              </strong>
            </p>
            <table className="my-5">
              <tr>
                <td>Bestell-Nr.</td>
                <td>{confirmationOrder.order.id}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{confirmationOrder.order.email}</td>
              </tr>
              <tr>
                <td>Abholdatum</td>
                <td>{dateformater(confirmationOrder.order.abholdatum)}</td>
              </tr>
              <tr>
                <td>Notiz</td>
                <td>{confirmationOrder.order.notiz || "-"}</td>
              </tr>
              <tr>
                <td>Bezahlung</td>
                <td>{confirmationOrder.order.zahlungsmethode}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="flex flex-col w-2/6 gap-8">
          <div className="box">
            <h2 className="text-vogler-green">Newsletter abonieren?</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
              <input
                type="coupon"
                id="coupon"
                className="block w-full p-3 rounded border border-gray-300 bg-vogler-yellow"
                placeholder="Email"
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2 rounded bg-vogler-green  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-1.5 hover:bg-vogler-orange transition-all font-serif "
              >
                Abnonieren
              </button>
            </div>
          </div>
          <div className="box">
            <Link href="/">
              <a className="button">Zurück zum Shop</a>
            </Link>
            <a
              className="text-vogler-orange block text-center font-serif hover:underline"
              href="#"
            >
              Meine Konto
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmationOrder;
