import mongoose from "mongoose";

const LivrosSchema = new mongoose.Schema(
    {
        titulo: String,
        autor: String,
        genero: String,
        anoPublicacao: Number,
        paginas: Number,
        disponivel: Boolean
    },
    { collection: "livros"}
);

export default mongoose.model("Livros", LivrosSchema)