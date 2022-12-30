import React, { forwardRef, useContext } from "react";
import Image from "next/image";
import CartIcon from "../assets/Cart.svg";
import Tippy from "@tippyjs/react";
// import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import { useShoppingCartContext } from "../context/cartContext";
import { useState } from "react";
import { toast } from "react-hot-toast";

function Product({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { increaseCartQuantity } = useShoppingCartContext();

  const addToCart = () => {
    increaseCartQuantity(product.id, quantity);
    toast.success("Produkt hinzugefügt.");
    setQuantity("1");
  };

  return (
    <div className="bg-vogler-yellow2 rounded p-5 text-vogler-orange font-serif relative">
      <Image
        className="hover:scale-[1.03] transition duration-300 linear"
        src="/product.png"
        alt="product image"
        width="400"
        height="230"
        objectFit="cover"
      />
      <p className="text-xl uppercase mt-4">{product.name}</p>
      <div className="text-vogler-green flex justify-between items-center mt-3">
        <p className="text-lg flex-grow">{product.preis.toFixed(2)} EURO</p>
        <select
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <Tippy
          content="In den Warenkorb"
          interactive={true}
          className="bg-vogler-orange text-vogler-yellow px-2 py-1 border-1 rounded-sm"
          animation={"shift-away"}
        >
          <div>
            <CartIcon
              onClick={addToCart}
              className="h-8 ml-6 cursor-pointer text-vogler-green hover:text-vogler-orange"
            />
          </div>
        </Tippy>
      </div>
    </div>
  );
}

export default Product;
