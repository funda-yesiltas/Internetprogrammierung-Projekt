const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser')
const db = new sqlite3.Database('./db/Kochbuch.db');

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));



//--------------------------------START: Buecher hinzufuegen--------------------------------------------------------------
app.get("/", async (req, res) => {
  db.all("SELECT * FROM Books", (err, Books) => {
    res.render("pages/addBooks", { Books })
  });
});

app.get("/api/Books", async (req, res) => {
  db.all("SELECT * FROM Books", (err, Books) => {
    res.json(Books);
  });
});

app.post('/api/Books', (req, res) => {
  if (req.body.booktitel-input) {
    db.run('INSERT INTO Books(titel) VALUES (?);', [req.body.booktitel-input], function (err) {
      if(err) {
        res.json({error: err});
      } else {
        res.json({
          ...req.body,
          id: this.lastID,

        });
      } 
    });
    /*
    if(req.body.hauptgericht){
      db.run('INSERT INTO Books(kategorie) VALUES ("Hauptgericht");', [req.body.hauptgericht], function (err) {
        if(err) {
          res.json({error: err});
        } else {
          res.json({
            ...req.body,
            id: this.lastID,
  
          });
        } 
      });
    }
    if(req.body.snacks){
      db.run('INSERT INTO Books(kategorie) VALUES ("Snacks");', [req.body.snacks], function (err) {
        if(err) {
          res.json({error: err});
        } else {
          res.json({
            ...req.body,
            id: this.lastID,
  
          });
        } 
      });
    }*/



  } else {
    res.json({error:"Request body is not correct"});  
  }
});
//--------------------------------ENDE: Buecher hinzufuegen--------------------------------------------------------------



//--------------------------------START: Rezepte hinzufuegen--------------------------------------------------------------
/*
app.get("/", async (req, res) => {
  db.all("SELECT * FROM Recipes", (err, Recipes) => {
    res.render("pages/addRecipes", { Recipes })
  });
});

app.get("/api/Recipes", async (req, res) => {
  db.all("SELECT * FROM Recipes", (err, Recipes) => {
    res.json(Recipes);
  });
});

app.post('/api/Recipes', (req, res) => {
  if (req.body.titel && req.body.zubereitung) {
    db.run('INSERT INTO Recipes(titel, zubereitung) VALUES (?, ?);', [req.body.titel, req.body.zubereitung], function (err) {
      if(err) {
        res.json({error: err});
      } else {
        res.json({
          ...req.body,
          id: this.lastID,

        });
      }
    });
  } else {
    res.json({error:"Request body is not correct"});  
  }
});
*/
//--------------------------------ENDE: Rezepte hinzufuegen--------------------------------------------------------------

const server = app.listen(port, () => {
 console.log(`Server listening on port ${port}…`)
});

module.exports = server
