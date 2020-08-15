const PORT = process.env.PORT || 3333;
import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);


app.listen(PORT, ()=>{
    console.log(`server running on port: ${PORT}`)
})