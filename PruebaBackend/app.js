const express = require("express");
const crypto = require("node:crypto");
const users = require("./usuarios.json");
const { validateUser, validatePartialUser} = require("./schemas/users");

const app = express();

app.use(express.json());

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({ message: "hola mundo" });
});

app.get("/users", (req, res) => {
  const { medicGroup } = req.query;
  if (medicGroup) {
    const filteredMedicGroup = users.filter(
      (user) => user.medicGroup === medicGroup
    );
    return res.json(filteredMedicGroup);
  }

  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (user) return res.json(user);
  res.status(404).json({ message: "User not found" });
});

app.post("/users", (req, res) => {
  const result = validateUser(req.body);
  if (result.error) {
    return res.status(400).json({error: result.error});
  }

  //Esto se remplaza con base de datos
  const newUser = {
    id: crypto.randomUUID(),
    ...result.data
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const result = validatePartialUser(req.body);
  if (result.error) {
    return res.status(400).json({error: result.error});
  }

  const updateUser = {
    ...users[userIndex],
    ...result.data
  };
  users[userIndex] = updateUser;
  return res.json(updateUser);
})

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
