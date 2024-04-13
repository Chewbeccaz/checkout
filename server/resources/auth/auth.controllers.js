const initStripe = require("../../stripe");
const fetchUsers = require("../../utils/fetchUsers");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");

const isValidEmail = (email) => {
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return regex.test(email);
};

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).json("Invalid email address");
  }

  const users = await fetchUsers();
  const userAlreadyExists = users.find((u) => u.email === email);

  if (userAlreadyExists) {
    return res.status(400).json("User already exists");
  }

  const stripe = initStripe();

  try {
    const customer = await stripe.customers.create({
      email,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    //Spara till databasen
    const newUser = {
      email,
      password: hashedPassword,
      stripeId: customer.id,
    };
    users.push(newUser);
    await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));

    res.status(201).json(newUser.email);
  } catch (error) {
    console.error("Error creating customer in Stripe:", error);
    res.status(500).json("Error processing your request");
  }
};

//********************************************************** */

const login = async (req, res) => {
  const { email, password } = req.body;

  const users = await fetchUsers();
  const userExists = users.find((u) => u.email === email);

  //Kolla så lösenordet stämmer
  if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
    return res.status(400).json("Wrong user or password");
  }
  req.session.user = userExists;
  res.status(200).json(userExists);
};

const logout = (req, res) => {
  req.session = null;
  res.status(200).json("Logged out");
};

const authorize = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json("You are not logged in");
  }
  res.status(200).json(req.session.user.email);
};

module.exports = { register, login, logout, authorize };
