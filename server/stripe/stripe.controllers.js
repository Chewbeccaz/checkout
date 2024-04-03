const initStripe = require("../stripe");

const createCheckoutSession = async (req, res) => {
  //Tänk på hur line-items ser ut, vi behöver bygga vår backend så att
  //Den matchar hur vår kundkorg ser ut. Datan jag skickar iväg till backend..
  //Quantity behöver uppdateras till 2, och inte bli två exempel av samma produkt i korgen.

  const cart = req.body;

  const stripe = initStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: cart.map((item) => {
      return {
        price: item.product,
        quantity: item.quantity,
      };
    }),
    success_url: "http://localhost:5173/confirmation", //efter router implementeras lägg till en sida för confirmation.
    cancel_url: "http://localhost:5173/",
  });

  //Detta kan man spara i local storage som jag kan hämta ut i Confirmation för att komma åt information om sessionen.
  //Om payment_status = payed, så är det klart typ.
  //(Lägg till detta om du vill ha infon, sessionId: session.id )
  res.status(200).json({ url: session.url });
};
module.exports = { createCheckoutSession };
