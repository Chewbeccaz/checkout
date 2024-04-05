import { useEffect, useState } from "react";

interface IProducts {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  default_price: {
    unit_amount: number;
  };
}

export const Products = () => {
  const [products, setProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/products");
      const fetchedData = await response.json();
      console.log(fetchedData); // vilket data får vi tillbaka?

      const productList: IProducts[] = fetchedData.data.map(
        (product: IProducts) => ({
          ...product,
          price: product.default_price.unit_amount / 100, // Stripe använder cent som standardenhet, så vi delar med 100 för att få priset i SEK
        })
      );

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
