import "../styles/header.css";
import Navigation from "./Navigation";

export const Header = () => {
  const scrollToProduct = () => {
    const productBoxElement = document.querySelector(".product-box");
    if (productBoxElement) {
      productBoxElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="header">
        <div className="logga">
          <h3>WEBSHOP</h3>
        </div>
        <div className="navigation">
          <Navigation />
        </div>

        <div className="header-text">
          <h2>Låt inte dina bilder ligga på ett dammigt usb-minne</h2>
          <button onClick={scrollToProduct} className="shop-now">
            SHOP NOW
          </button>
        </div>
      </div>
    </>
  );
};
