import express from "express"

const app = express()

const PORT = process.env.PORT || 3000
const HOSTNAME = "127.0.0.1"

app.use(express.json())

let teaData = []
let nextId = 1

// add a tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body
  const newTea = { id: nextId++, name, price }
  teaData.push(newTea)
  res.status(201).send(newTea)
})

// view a tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData)
})

// view a tea with id
app.get("/teas/:id", (req, res) => {
  const teaId = teaData.find((t) => t.id === parseInt(req.params.id))
  if (!teaId) {
    return res.status(404).send("Tea Not Found(Get)")
  }
  res.status(200).send(teaId)
})

// Update the tea with id
app.put("/teas/:id", (req, res) => {
  const teaId = teaData.find((t) => t.id === parseInt(req.params.id))
  if (!teaId) {
    return res.status(404).send("Tea Not Found To Update...")
  }
  const { name, price } = req.body
  teaId.name = name
  teaId.price = price
  res.status(200).send(teaId)
})

// Delete the tea with id
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id))
  if (index === -1) {
    return res.status(404).send("Tea Not Found....(Delete)")
  }
  teaData.splice(index, 1)
  return res.status(200).send("Deleted...")
})

app.get("/", (req, res) => {
  console.log("Hello this is Yogesh")
  res.end("This is End")
})

app.listen(PORT, () => {
  console.log(`Port running is http://${HOSTNAME}:${PORT}/`)
})
