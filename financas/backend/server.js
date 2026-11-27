import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
//import dns from 'node:dns';

// tive um problema com o dns do windows que nao está mantendo a conexão, então em pesquisa que fiz achei essa opção
// tive que fazer o import do DNS do node para poder rodar o server.js
// (erro "querySrv ECONNREFUSED") dentro do Node.

//dns.setServers(['8.8.8.8','1.1.1.1']);

const app = express();
app.use(express.json()); // API aceitando JSON

//Conexão com o MongoDB Atlas

mongoose.connect(process.env.MONGODB_URI,{ dbName:'financas' })
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.log('Erro de Conexçao com o MongoDB:', err.message));


//Modelo Financas

const FinancasSchema = new mongoose.Schema({
    descricao: { type: String, required: true, trim: true, minlength: 3 },
    valor: { type: Number, required: true, min: 0 },
    tipo: { type: String, required: true, enum: ['receita', 'despesa'] },
    categoria: { type: String, required: true, trim: true },
    data: { type: Date, required: true } }, { collection:'GestaoFinanceira',timestamps:true }
);
const Financas = mongoose.model('Financas', FinancasSchema);


//Rotas inicial

app.get('/', (req, res) => res.json ({msg:'API rodando'}));

//Criando uma nova entrada de finanças

app.post('/financas', async (req, res) => {
   const financa = await Financas.create(req.body);
   res.status(201).json(financa);
  });

//Listando todas as finanças

app.get('/financas',async (req, res) => {
  const finances = await Financas.find ();
  res.json(finances);
});

//iniciando o servidor
app.listen(process.env.PORT, () =>
 console.log(`Servidor rodando em http://localhost:${process.env.PORT}`));
