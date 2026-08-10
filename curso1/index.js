const express = require('express');
const { Pool } = require('pg');
const pool = new Pool({
    user:  process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'postgres',
    password: process.env.PGPASSWORD || '123456',
    port: process.env.PGPORT || 5432,
});
const app  = express();
app.get('/', async (req,res) => {
    //res.send('funcionando'));
    try {
        const result = await pool.query('SELECT * from users');
        res.send(result.rows);
    } catch (error) {
        console.error('Error al conectar a la base de datos', error);
        res.status(500).send('Error al conectar a la base de datos');
    }
});

app.listen(3000,()=> console.log('puerto 3000 up '))