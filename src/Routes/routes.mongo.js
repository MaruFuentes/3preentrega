import { Router } from 'express';
import ActionsMongo from '../Controllers/controller.mongo.js'
import { generateProduct } from '../utils/Mock/mock.products.js';


const mnrouter = Router();


mnrouter.get('/all', async (req, res) => {
    try {
        const products = await ActionsMongo.getAll(req, res, req.query)
        res.status(200).json({ status: 200, data: products })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})



mnrouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ActionsMongo.getOne(id)
        res.json({ status: 200, data: product })
    }
    catch (err) {
        res.json({ status: 500, err: err.message })
    }
})


mnrouter.post("/", async (req, res) => {
    const { name, description, code, thumbnail, price, stock } = req.body;
    if (!name || !description || !code || !thumbnail || !price || !stock) {
        return res.json({ status: 400, err: "Faltan datos" })
    }
    const product = req.body;
    await ActionsMongo.createProduct(product)
    res.json({ status: 200, data: product })
})


mnrouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, code, thumbnail, price, stock } = req.body;
    const product = req.body;
    await ActionsMongo.updateProduct(id, product)
    res.json({ status: 200, data: product })
})


mnrouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await ActionsMongo.deleteProduct(id)
    res.send(204)
})

mnrouter.get("/", (req, res) => {
    try {
        const products = [];
        for (let i = 0; i < 100; i++) {
            products.push(generateProduct());
        }       
        console.log(products)
        res.send({ status: 200 })
    } catch (error) {     
        console.error("Error al generar productos:", error);
        res.status(500).json({ status: 500, err: "Error al generar productos" });
    }
});






//Export Modulo
export default mnrouter 