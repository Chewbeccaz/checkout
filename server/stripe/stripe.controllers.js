const initStripe = require("../stripe");
const fs = require("fs").promises;

const createCheckoutSession = async (req, res) => {
  //Tänk på hur line-items ser ut, vi behöver bygga vår backend så att
  //Den matchar hur vår kundkorg ser ut. Datan jag skickar iväg till backend..
  //Quantity behöver uppdateras till 2, och inte bli två exempel av samma produkt i korgen.

  const cart = req.body;

  const stripe = initStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: "cus_PruqNBRaUCCWqk", //hårdkodat från början in med req.session.user.stripeId, här ska vi lägga in det vi får av req.session
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
  res.status(200).json({ url: session.url, sessionId: session.id });
};

const verifySession = async (req, res) => {
  const stripe = initStripe();

  const sessionId = req.body.sessionId;

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status === "paid") {
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

    const order = {
      orderNumber: Math.floor(Math.random() * 10000000), //Här skulle vi kunna installera guid
      customerName: session.customer_details.name,
      products: lineItems.data.map((item) => ({
        description: item.description,
        quantity: item.quantity,
      })),
      total: (session.amount_total / 100).toFixed(2), //Ta bort ören
      date: new Date(),
    };

    const orders = JSON.parse(await fs.readFile("./data/orders.json"));
    orders.push(order);
    await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 4));

    res.status(200).json({ verified: true });
  }
};
module.exports = { createCheckoutSession, verifySession };
