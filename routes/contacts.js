var express = require("express");
var router = express.Router();

const contacts = [
  {
    id: 1,
    name: "anil",
    phone: "8602408135",
  },
];

router.get("/", function (req, res, next) {
  res.json(contacts);
});

router.get("/:id", function (req, res, next) {
  const contact = contacts.find((c) => c.id == req.params.id);
  if (!contact) {
    return res.sendStatus(400);
  }
  res.json(contact);
});

router.post("/", function (req, res, next) {
  const contact = {
    id: Date.now(),
    name: req.body.name,
    phone: req.body.phone,
  };
  contacts.push(contact);
  res.json(contact);
});

router.put("/:id", function (req, res, next) {
  const index = contacts.findIndex((c) => c.id == req.params.id);
  if (index == -1) {
    return res.sendStatus(400);
  }
  contacts[index].name = req.body.name;
  contacts[index].phone = req.body.phone;

  res.json(contacts[index]);
});

router.delete("/:id", function (req, res, next) {
  const index = contacts.findIndex((c) => c.id == req.params.id);
  if (index == -1) {
    return res.sendStatus(400);
  }
  contacts.splice(index, 1);
  res.json(contacts);
});

module.exports = router;
