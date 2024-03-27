const express = require("express")
const departmentRouter = express.Router()
const pool = require("./db")

// Bölüm Ekleme
departmentRouter.post("/", async (req, res) => {
  const { name } = req.body
  try {
    const newDepartment = await pool.query(
      "INSERT INTO Department (name) VALUES ($1) RETURNING *",
      [name]
    )
    res.json(newDepartment.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// Bölüm Silme
departmentRouter.delete("/:id", async (req, res) => {
  const { id } = req.params
  
  try {
    const department = await pool.query(
      "SELECT * FROM Department WHERE id = $1",
      [id]
    )

    if (department.rows.length === 0) {
      return res.status(404).send("Bölüm bulunamadı.")
    }
    await pool.query("DELETE FROM Department WHERE id = $1", [id])
    res.json("Bölüm silindi.")
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// Bölüm Güncelleme
departmentRouter.put("/:id", async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  try {
    const department = await pool.query(
      "SELECT * FROM Department WHERE id = $1",
      [id]
    )

    if (department.rows.length === 0) {
      return res.status(404).send("Bölüm bulunamadı.")
    }
    const updateDepartment = await pool.query(
      "UPDATE Department SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    )
    res.json(updateDepartment.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// Bölümlerin Tümünü Getir
departmentRouter.get('/', async (req, res) => {
    try {
        const allDepartments = await pool.query('SELECT * FROM Department');
        res.json(allDepartments.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Spesifik Bölümü Getir
departmentRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const department = await pool.query('SELECT * FROM Department WHERE id = $1', [id]);

        if (department.rows.length === 0) {
            return res.status(404).send('Bölüm bulunamadı.');
        }

        res.json(department.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = departmentRouter
