import { useEffect, useState } from "react";

interface IProducts {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
}

export const Products = () => {
  const [products, setProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/products");
      const data = await response.json();
      console.log(data); // vilket data får vi tillbaka?

      const productList = data.data;
      setProducts(productList);
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  return (
    <>
      <h3>Utforska våra produkter</h3>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h4>{product.name}</h4>
            <p>{product.price} kr</p>
            <p>{product.description}</p>
            {product.images &&
              product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.name}
                  style={{ width: "200px" }}
                />
              ))}
          </div>
        ))}
      </div>
    </>
  );
};
