const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")

const port = 3000
const app = express()
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/officesolutions", {
    useNewURlParser : true,
    useUnifiedTopology : true
})


const UsuarioSchema = new mongoose.Schema({
    nome : {type: String},
    email : {type : String, required : true},
    senha : {type: String}
})

const Usuario = mongoose.model("usuario", UsuarioSchema)

const produtoSchema = new mongoose.Schema({
    Codigo : {type : String, required : true},
    Descrição : {type : String},
    Fornecedor : {type: String},
    DataFabricacao : {type: Date},
    QuantidadeEstoque : {type: Number},
})

const Produto = mongoose.model("produto", produtoSchema)


app.post("/cadastrousuario", async (req , res)=>{
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

   

    const usuario = new Usuario({
        nome : nome,
        email : email,
        senha : senha
    })
    
    try{
        const newUsuario = await usuario.save();
    
        res.json({error : null, msg : "Cadastro de usuario feito com sucesso", usuarioId : newUsuario._id})
    }
    catch(error){
        res.status(400).json({error});
    }
});


app.post("/cadastroprodutolivro", async (req , res)=>{
    const Codigo = req.body.Codigo;
    const Descricao = req.body.Descricao;
    const Fornecedor = req.body.Fornecedor;
    const DataFabricacao = req.body.DataFabricacao;
    const QuantidadeEstoque = req.body.QuantidadeEstoque;

  
    const produtolivro = new Produto({
        Codigo : Codigo,
        Descricao : Descricao,
        Fornecedor : Fornecedor,
        DataFabricacao : DataFabricacao,
        QuantidadeEstoque : QuantidadeEstoque


    });
    
        try{
            const newProdutolivro = await produtolivro.save();
    
            res.json({ error: null, msg: "Cadastro de produto feito com sucesso", produtoCod: newProdutolivro._id });
        }
        catch(error){
            res.status(400).json({error});
        }
})


app.get("/cadastrousuario", async (req, res) => {
    res.sendFile(__dirname + "/cadastrousuario.html");
  });
  
  app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
  app.get("/cadastroprodutoescritorio", async (req, res) => {
    res.sendFile(__dirname + "/cadastroprodutolivro.html");
  });
app.listen(port, ()=>{
    console.log(`servidor rodando na porta ${port}`)
})