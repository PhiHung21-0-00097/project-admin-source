const express = require("express");
const mongoose = require("mongoose");
const Product = require("./model/model");
const app = express();
const cors = require("cors");
const { authPage } = require("../UI/src/components/Middware/basicAuth");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://hungnhp:v3HjcKXYJDIrAsVQ@backendb.eldaipm.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackenDB"
  )
  .then(() => {
    console.log("Kết nối thành công");
  })
  .catch(() => {
    console.log("Thất bại");
  });

app.get("/", (req, res) => {
  res.send("Hello");
});
//=============================================================== GET
app.get("/api/product", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//================================================================ POST
app.post("/api/product", async (req, res) => {
  try {
    console.log(req.body);
    // const { base64 } = req.body;
    const product = await Product.create({
      image: req.body.image,
      username: req.body.name,
      password: req.body.pass,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//================================================================ PUT
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Not Found" });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//================================================================ DELETE
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json({ message: "Perfish" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.listen(5000, () => {
  console.log("Đang chạy trên port 5000");
});
