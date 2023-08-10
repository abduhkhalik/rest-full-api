const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Products");
const app = express();

// Input By Json
app.use(express.json());
// Input By Form
app.use(express.urlencoded({ extended: false }));

// Connection To Mongo Db
mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(() => console.log("Connect!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Menampilkan product
app.get("/Products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ massage: err.massage });
  }
});

// Mencari Product berdasarka id
app.get("/Product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ massage: err.massage });
  }
});

// Create Product
app.post("/Products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ massage: err.massage });
  }
});

// Update Product By Id
app.put("/Product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res
        .status(404)
        .json({ massage: `Product dengan id ${id} tidak di temukan` });
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    res.status(500).json({ massage: err.massage });
  }
});

// Delete Product
app.delete("/Product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res
        .status(404)
        .json({ massage: `product dengan id ${id} tidak di temukan` });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ massage: err.massage });
  }
});

app.listen(8000, () => {
  console.log(`Server Berjalan di Port 8000`);
});
