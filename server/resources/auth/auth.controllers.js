const fetchUsers = require("../../utils/fetchUsers");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  //Innehåller användarens data, mail och lösenord.
  const { email, password } = req.body;

  //Kolla så användare inte redan finns
  const users = await fetchUsers();
  const userAlreadyExists = users.find((u) => u.email === email);

  if (userAlreadyExists) {
    return res.status(400).json("User already exists");
  }

  //skapa kund i stripe.
  //när man får tillbaa en kund från stripe spara id - den används för att koppla och beteala. etc.

  //Kryptera lösenord
  const hashedPassword = await bcrypt.hash(password, 10);

  //Spara till databasen
  const newUser = {
    email,
    password: hashedPassword,
  };
  users.push(newUser);
  await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));

  //Skicka tillbaka ett svar
  res.status(201).json(newUser.email);
};

const login = async (req, res) => {
  //Kolla så användaren finns (mest troligt validering med joi också sen)
  const { email, password } = req.body;

  const users = await fetchUsers();
  const userExists = users.find((u) => u.email === email);

  //Kolla så lösenordet stämmer

  if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
    return res.status(400).json("Wrong user or password");
  }

  //Logga in anvädaren, starta en session
  req.session.user = userExists;

  //Skicka tillbaka ett svar
  res.status(200).json("Logged in " + userExists.email);
};

const logout = (req, res) => {
  req.session = null; //Rensa och döda sessionen.
  res.status(200).json("Logged out");
};

const authorize = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json("You are not logged in");
  }
  //Denna man ska kunna knyta till isAuthenticated.
  res.status(200).json(req.session.user.email);
};

module.exports = { register, login, logout, authorize };
