const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/* ================== MongoDB Connection ================== */

// ⚠️ Replace with your actual MongoDB URL
mongoose.connect("mongodb+srv://jiyarohilla46_db_user:Jiyap%402547@cluster0.qfmjc7t.mongodb.net/todoDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ================== Schema ================== */

const TodoSchema = new mongoose.Schema({
  text: String,
  completed: {
    type: Boolean,
    default: false
  }
});

const Todo = mongoose.model("Todo", TodoSchema);

/* ================== Routes ================== */

// Test route (optional)
app.get("/", (req, res) => {
  res.send("API Running...");
});

// GET all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD todo
app.post("/todos", async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text
    });
    await newTodo.save();
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE todo
app.put("/todos/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE todo
app.delete("/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================== Start Server ================== */

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
