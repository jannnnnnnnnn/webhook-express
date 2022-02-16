require("dotenv").config();
const express = require("express");
const axios = require("axios").default;

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => res.send(`
  <html>
    <head><title>Webhook Project!</title></head>
    <body>
      <h1>My Quick Webhook Setup Project!</h1>
    </body>
  </html>
`));

app.post("/:id", (req, res) => {
  const id = req.params.id
  const message = "Stoked about this project";
  axios
    .post(process.env.WEBHOOK_URL, {
      id,
      message,
    })
    .then((response) => {
      console.log("Success!");
      res.status(204).send();
    })
    .catch((err) => console.error(`Error sending to API: ${err}`));
});

app.use((error, req, res, next) => {
  res.status(500)
  res.send({error: error})
  console.error(error.stack)
  next(error)
})

app.listen(port, () =>
  console.log(`App running at http://localhost:${port}`)
);
