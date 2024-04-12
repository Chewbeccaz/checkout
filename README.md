![Skärmavbild 2024-04-12 kl  14 42 46](https://github.com/Chewbeccaz/checkout/assets/144778875/6f31a4da-5ff4-4dda-9ee1-0ea0d5bbff07)

---

### WEBSHOP - Checkout Session and Payment Service with Stripe Integration

#### Description

This webshop is a school project created for order placement and payment through integration with Stripe.
Users can register, log in, and make purchases of products managed through Stripe.

#### Requirements

- [x] _Products_: Listing of products on a page, fetched from Stripe.
- [x] _Shopping Cart_: Ability to add (and remove) products to a shopping cart.
- [x] _Order through Stripe_: Ability to place an order through Stripe based on the contents of the shopping cart.
- [x] _Registration_: Ability to register as a user on the webshop, creating a "Customer" in Stripe and saving the user in a JSON file.
- [x] _Login_: Ability to log in as a customer using a custom-built login system with cookie-session.
- [x] _Saved Orders_: All placed orders are saved to a list in a JSON file.
- [x] _Payment Validation_: The order is only saved if payment through Stripe has been completed.

#### Additional - to be added further along the project..

- [ ] _Discount Code_: Ability to enter a discount code to receive a discount on purchases, through Stripe.
- [ ] _Order History_: Logged-in users should be able to view their previously placed orders.
- [ ] _Address and Pickup Point_: Users must fill in their address and choose a pickup point before payment, integrated with PostNord API.

#### Before You Start

- Make sure you have node.js installed
- Register your test account at [Stripe](https://stripe.com/se) and save your API-key
- Create your shop and your products in Stripe
- When the repository is cloned and set up is done:
- Create an .env file in client with following:

plaintext
STRIPE_KEY={YOUR_KEY}
STRIPE_PUBLIC_KEY={YOUR KEY}

#### Building and Running the Project

To build and run the project, follow these steps:

- Clone this repository
- New Terminal for Client: First cd client then run npm i and npm run dev
- New Terminal for Server: First`cd server` Run npm i and npm start test or node server.js
- Make sure your express server is running
- Navigate to http://localhost:5173/ in your browser to use the app

#### Stripe Test Cards

Use the following test cards from Stripe to process payments during development: [Stripe Test Cards](https://stripe.com/docs/testing).
