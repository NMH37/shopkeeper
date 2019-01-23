
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

const productRoutes = require('./routes/product');


const app = express();

// connect database
mongoose.connect('mongodb+srv://nayyer:DW2UkliwVlrAKG18@cluster0-eta6h.mongodb.net/products?retryWrites=true'

  , {
    useCreateIndex: true,
    useNewUrlParser: true,
  }
).then(() => console.log("connected to db"))
  .catch(() => console.log("errors occured"));


app.use('/api/products', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Accept, Content-Type, X-Requested-With, Authorization ,Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "angular")));
app.use("/api/products", productRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'));
});


app.listen(port, () => console.log(`listening on port ${port}`));



// mongodb://localhost:27017/pet-shelter or shopkeeper
// mongodb+srv://nayyer:DW2UkliwVlrAKG18@cluster0-eta6h.mongodb.net/products?retryWrites=true
