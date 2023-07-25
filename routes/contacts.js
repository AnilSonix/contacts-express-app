var express = require("express");
const { db } = require("../db");
var router = express.Router();

router.get("/", function (req, res, next) {
  db.all("SELECT rowid , name , phone from contacts;", [], (err, rows) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json({ errors: [err.message] });
    }
    console.log(rows);
    res.json(rows.map((c) => ({ id: c.rowid, name: c.name, phone: c.phone })));
  });
});

router.get("/:id", function (req, res, next) {
  db.get(
    "SELECT rowid , name , phone from contacts where rowid = ?  limit 1;",
    [req.params.id],
    (err, row) => {
      if (err) {
        console.log(err.message);
        return res.status(500).json({ errors: [err.message] });
      }
      console.log(row);
      if (!row) {
        return res.status(400).json({ errors: ["Bad contact id"] });
      }
      res.json({ id: row.rowid, name: row.name, phone: row.phone });
    }
  );
});

router.post("/", function (req, res, next) {
  contacts.push(contact);
  db.run(
    "INSERT INTO contacts values (?,?)",
    [req.body.name, req.body.phone],
    function (err) {
      if (err) {
        console.log(err.message);
        return res.status(500).json({ errors: [err.message] });
      }
      console.log(`A row has been inserted with rowid`, this);
      res.status(201).json({ id: this.lastID });
    }
  );
});

router.put("/:id", function (req, res, next) {
  db.run(
    "UPDATE contacts SET name = ? , phone = ?  WHERE ROWID = ?",
    [req.body.name, req.body.phone, req.params.id],
    function (err) {
      if (err) {
        console.log(err.message);
        return res.status(500).json({ errors: [err.message] });
      }
      console.log(this);
      if (this.changes != 1) {
        return res.status(400).json({ errors: ["Bad contact id"] });
      }
      res.json({
        id: +req.params.id,
        name: req.body.name,
        phone: req.body.phone,
      });
    }
  );
});

router.delete("/:id", function (req, res, next) {
  db.run(
    "DELETE FROM contacts  WHERE ROWID = ?",
    [req.params.id],
    function (err) {
      if (err) {
        console.log(err.message);
        return res.status(500).json({ errors: [err.message] });
      }
      console.log(this);
      if (this.changes != 1) {
        return res.status(400).json({ errors: ["Bad contact id"] });
      }
      res.json({
        id: +req.params.id,
        name: req.body.name,
        phone: req.body.phone,
      });
    }
  );
});

module.exports = router;
