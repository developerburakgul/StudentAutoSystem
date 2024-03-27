const express = require("express")
const studentRouter = express.Router()
const pool = require("./db")

// Öğrenci Ekleme
studentRouter.post("/", async (req, res) => {
  const { name, email, deptid } = req.body
  try {
    const checkDept = await pool.query(
      "SELECT * FROM Student WHERE deptid = $1",
      [deptid]
    )
    if (checkDept.rows.length > 0) {
      return res.status(400).send("Bu bölümde zaten bir öğrenci var.")
    }
    const department = await pool.query(
      "SELECT * FROM Department WHERE id = $1",
      [deptid]
    )

    if (department.rows.length === 0) {
      return res.status(404).send("Bölüm bulunamadı.")
    }
    const newStudent = await pool.query(
      "INSERT INTO Student (name, email, deptid) VALUES ($1, $2, $3) RETURNING *",
      [name, email, deptid]
    )
    res.json(newStudent.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// Öğrenci Silme
studentRouter.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    await pool.query("DELETE FROM Student WHERE id = $1", [id])
    res.json("Öğrenci silindi.")
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// Öğrenci Güncelleme
studentRouter.put("/:id", async (req, res) => {
  const { id } = req.params
  const { name, email, deptid } = req.body
  try {
     const student = await pool.query('SELECT * FROM Student WHERE id = $1', [id]);

        if (student.rows.length === 0) {
            return res.status(404).send('Öğrenci bulunamadı.');
        }
        const checkDept = await pool.query(
          "SELECT * FROM Student WHERE deptid = $1",
          [deptid]
        )
        if (checkDept.rows.length > 0) {
          return res.status(400).send("Bu bölümde zaten bir öğrenci var.")
        }
        const department = await pool.query(
          "SELECT * FROM Department WHERE id = $1",
          [deptid]
        )
    const updateStudent = await pool.query(
      "UPDATE Student SET name = $1, email = $2, deptid = $3 WHERE id = $4 RETURNING *",
      [name, email, deptid, id]
    )
    res.json(updateStudent.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// Öğrencilerin Tümünü Getir
studentRouter.get('/', async (req, res) => {
    try {
        const allStudents = await pool.query('SELECT * FROM Student');
        res.json(allStudents.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Spesifik Öğrenciyi Getir
studentRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await pool.query('SELECT * FROM Student WHERE id = $1', [id]);

        if (student.rows.length === 0) {
            return res.status(404).send('Öğrenci bulunamadı.');
        }

        res.json(student.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = studentRouter
