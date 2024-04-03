const initStripe = require("../stripe");

const createCheckoutSession = async (req, res) => {
  //Tänk på hur line-items ser ut, vi behöver bygga vår backend så att
  //Den matchar hur vår kundkorg ser ut. Datan jag skickar iväg till backend..
  //Quantity behöver uppdateras till 2, och inte bli två exempel av samma produkt i korgen.

  const stripe = initStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: "price_1P14mpRuDPufONRtFKOWeKCj",
        quantity: 2,
      },
    ],
    success_url: "http://localhost:5173/confirmation", //efter router implementeras lägg till en sida för confirmation.
    cancel_url: "http://localhost:5173/",
  });
  res.status(200).json({ url: session.url });
};
module.exports = { createCheckoutSession };
