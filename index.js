const express = require("express")
const bodyParser = require("body-parser")
const studentsRouter = require("./student")
const departmentsRouter = require("./department")
const app = express()
const port = 3000

app.use(bodyParser.json())

app.use("/students", studentsRouter)
app.use("/departments", departmentsRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
