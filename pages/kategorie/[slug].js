import React, { useEffect, useState } from "react";
import Product from "../../components/product";

function Kategorie({ products, catname }) {
  // const [products, setProducts] = useState([]);
  // const [errors, setErrors] = useState();

  // async function fetchData() {
  //   return await fetch("http://localhost:4000/shop/kategorie/1.json")
  //     .then((resp) => {
  //       if (!resp.ok) {
  //         throw `Server error: [${resp.status}] [${resp.statusText}] [${resp.url}]`;
  //       }
  //       return resp.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setProducts(data);
  //     })
  //     .catch((err) => {
  //       console.debug("Error in fetch", err);
  //       setErrors(err);
  //     });
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <main className="flex flex-col w-full flex-1  text-vogler-yellow2 bg-vogler-green  p-20 pt-8">
      <div className="container mx-auto">
        <p className="mb-4">{catname}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const res = await fetch(`http://localhost:4000/shop/kategorie/${slug}.json`);
  if (!res.ok) {
    throw `Server error: [${res.status}] [${res.statusText}] [${res.url}]`;
  }
  const response = await res.json();
  const products = response.produkts;
  const catname = response.name;

  return {
    props: {
      products,
      catname,
    },
  };
}

export default Kategorie;
