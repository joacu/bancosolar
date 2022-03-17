const express = require('express')

const {
    consultar,
    transferencias,
    insertar_usuario,
    realizar_transferencia,
    eliminar_usuario,
    actualizar_usuario
} = require('./db.js');

const app = express()
app.use(express.static('static'))

app.post('/usuario', async(req, res) => {
    let body = ""
    req.on("data", (data) => {
        body += data
    })

    req.on("end", async() => {
        try {
            const datos = JSON.parse(body);
            await insertar_usuario(datos.nombre, datos.balance);
            res.json({ datos });
        } catch (error) {
            console.log("Error al realizar la consulta es: " + error);
            res.status(400).send({ error });
        }
    })
});

app.get('/usuarios', async(req, res) => {
    try {
        let allusers = await consultar();
        res.send(JSON.stringify(allusers));
    } catch (error) {
        console.log("Error al realizar la consulta es: " + error);
    }
});

app.get('/transferencias', async(req, res) => {
    try {
        let allTransferencias = await transferencias();
        res.send(JSON.stringify(allTransferencias));
    } catch (error) {
        console.log("Error al realizar la consulta es: " + error);
    }
});

app.post('/transferencia', async(req, res) => {
    let body = ""
    req.on("data", (data) => {
        body += data
    })
    req.on("end", async() => {
        try {
            const datos = JSON.parse(body);
            await realizar_transferencia(datos.emisor, datos.receptor, datos.monto);
            res.json({ datos });
        } catch (error) {
            console.log("El error al realizar la transferencia es: " + error);
        }
    })
});

app.delete('/usuario', async(req, res) => {
    try {
        await eliminar_usuario(parseInt(req.query.id));
        res.send('usuario eliminado de forma satisfactoria');
    } catch (error) {
        console.log("El error producido es el siguiente: " + error);
    }
});

app.put('/usuario', async(req, res) => {
    let body = ""
    req.on("data", (data) => {
        body += data
    })
    req.on("end", async() => {
        try {
            const datos = JSON.parse(body);
            /* console.log(datos);
            console.log(req.query.id); */
            await actualizar_usuario(datos.name, datos.balance, req.query.id);
            res.json({ datos });
        } catch (error) {
            console.log("Error al realizar la consulta es: " + error);
        }
    });
});

app.listen(3000, () => console.log('servidor ejecutando puerto 3000'))