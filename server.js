import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Books from "./books.js"
import books from "./books.js";

dotenv.config();

const app = express();
const PORT = 3000;
app.use(express.json())

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado com o MONGODB")

    } catch (error) {
        console.log("Erro ao conectar com o MONGODB", error)
    }
}

connectDB()

app.post("/books", async (req, res) => {
    try {

        const newBook = await books.create(req.body)

        res.json(newBook)

    } catch (error) {

        res.json({ error: error.message })

    }
})

app.get("/books", async (req, res) => {
    try {

        const books = await Books.find()
        res.json(books)
    } catch (error) {
        res.json({ error: error.message })

    }
})
// BUSCAR POR ID

app.put("/books/:id/", async (req, res) => {

    try {

        const books = await Books.findById(
            req.params.id,
            req.body
        )
        res.json(books)

    } catch (error) {
        res.json({ error: error.message })
    }
})

app.put("/books/:id", async (req, res) => {

    try {
        const bookAtualizado = await Books.findByIdAndUpdate(
            req.params.id,
            req.body
        )
        res.json(bookAtualizado)
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.delete("/books/:id/delete", async (req, res) => {

    try {
        const bookDeletado = await Books.findByIdAndDelete(req.params.id)
        res.json(bookDeletado)

    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/books/available", async (req, res) => {

    try {
        const listarBook = await Books.find()
        res.json(listarBook)
    } catch (error) {
        res.json({ error: error.message })
    }

})

app.get("/books/genre/:genero", async (req, res) => {

    try {
        const books = await Books.find({
            genero: req.params.genero
        })
        res.json(books)

    } catch (error) {
        res.json({ error: error.message })

    }
})

app.get("/books/before/:ano", async (req, res) => {

    try {
        const ano = Number(req.params.ano)


        if (ano < 0) {
            res.json({ error: "Ano inválido" })

        }

        const books = await Books.find({
            anoPublicacao: { $lt: ano }

        })

        res.json(books)

    } catch (error) {
        res.json({ error: error.message })

    }
})

app.patch("/books/:id/availability", async (req, res) => {

    try {
        const book = await Books.findByIdAndUpdate(
            req.params.id,
            { disponivel: req.body.disponivel },
            { new: true }
        )
        res.json(book)

    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/books/long", async (req, res) => {
    try {
        const books = await Books.find({
            paginas: { $gt: 300 }
        })
        res.json(books)

    } catch (error) {
        res.json({ error: error.messsage })
    }
})

app.get("/books/author/:autor", async (req, res) => {

    try {
        const books = await Books.find({
            autor: req.params.autor
        })
        res.json(books)

    } catch (error) {
        res.json({ error: error.message })

    }
})

app.get("/books/count", async (req, res) => {

    try {
        const total = await Books.countDocuments()
        res.json({ totalLivros: total })
    } catch (error) {
        res.json({ error: error.message })
    }
})


app.listen(PORT, () => {
    console.log("O servidor está rodando na porta: ", PORT)
})


