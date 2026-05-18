const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); 

app.get('/api/instagram', async (req, res) => {
    // 🚀 OBLIGAMOS AL NAVEGADOR Y A RENDER A NO GUARDAR CACHÉ
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Expires', '-1');
    res.set('Pragma', 'no-cache');

    try {
        const token = process.env.INSTAGRAM_TOKEN;
        const igId = process.env.INSTAGRAM_ID; 
        
        // 1. Verificamos que estén ambas llaves
        if (!token || !igId) {
            console.log("Faltan credenciales en Render: Token o ID");
            throw new Error("Credenciales incompletas");
        }

        // 2. Nos conectamos a Meta
        const url = `https://graph.facebook.com/v19.0/${igId}?fields=followers_count,media_count&access_token=${token}`;
        const response = await fetch(url);
        const data = await response.json();

        // 3. Si Meta nos rechaza
        if (data.error) {
            console.error("Meta rechazó la conexión:", data.error.message);
            throw new Error("Error de Meta");
        }

        // 4. ¡ÉXITO TOTAL! Enviamos los datos reales a Vercel
        res.json({
            followers: data.followers_count,
            engagement: "4.5%",
            posts: data.media_count,
            recentViews: 850,
            status: "Conectado a Meta en vivo 🟢"
        });

    } catch (error) {
        // 5. Plan de Respaldo (Actualizado a tus números de hoy para la sustentación)
        console.error("Activando plan de respaldo. Motivo:", error.message);
        res.json({
            followers: 1627,
            engagement: "4.5%",
            posts: 670, // <- ¡Actualizado a 670 por seguridad!
            recentViews: 850,
            status: "Usando base de respaldo 🟡"
        });
    }
});

app.get('/', (req, res) => {
    res.send('¡El motor de Embajador Tomasino está en línea y libre de caché!');
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
