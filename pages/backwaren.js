import React, { useState, useEffect } from "react";

function Backwaren() {
  const [products, setProducts] = useState([{ id: 1, name: "foo" }]);
  const [errors, setErrors] = useState();

  async function fetchData() {
    return await fetch("http://0.0.0.0:4000/shop/kategorie/1.json")
      .then((resp) => {
        if (!resp.ok) {
          throw `Server error: [${resp.status}] [${resp.statusText}] [${resp.url}]`;
        }
        return resp.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.debug("Error in fetch", err);
        setErrors(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex flex-col z-50 w-full flex-1 px-20 text-vogler-yellow2 bg-vogler-green p-8">
      <p>Backwaren</p>
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((obj) => (
            <div key={obj.id} className="bg-vogler-yellow2 rounded p-5 text-vogler-orange font-serif space-y-4">
              <p className="text-xl uppercase">{obj.name}</p>
              <div className="text-vogler-green flex justify-between">
                <p className="text-lg">2,00 EURO</p>
                <p className="text-lg">Zum Warenkorb</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Backwaren;
