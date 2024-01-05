import 'dotenv/config';
const express = require('express');
const cors = require('cors');
const mongo = require("./servicos/mongodb");
const bodyparser = require('body-parser');
const rotaHabitos = require('./rotas/habitos');
const rotaDiario = require("./rotas/diario");

const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));
app.use(bodyparser.urlencoded({extended: true}));
const PORT = 3001;
mongo.run();
app.use('/api/habitos',rotaHabitos);
app.use('/api/diario',rotaDiario);

//mongo.client.close();
app.listen(PORT,()=>{
    console.log(`Escutando na porta ${PORT}`);
})