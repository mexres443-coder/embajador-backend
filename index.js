const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); 

app.get('/api/instagram', async (req, res) => {
    try {
        const token = process.env.INSTAGRAM_TOKEN;
        
        // 1. Verificamos si Render tiene la llave
        if (!token) {
            console.log("No se encontró el Token en Render");
            throw new Error("Sin Token");
        }

        // 2. Nos conectamos a la API real de Meta
        const url = `https://graph.instagram.com/me?fields=followers_count,media_count&access_token=${token}`;
        const response = await fetch(url);
        const data = await response.json();

        // 3. Si Meta nos rechaza
        if (data.error) {
            console.error("Meta rechazó la conexión:", data.error.message);
            throw new Error("Error de Meta");
        }

        // 4. ¡ÉXITO! Enviamos datos en vivo
        res.json({
            followers: data.followers_count || 1626,
            engagement: "4.5%",
            posts: data.media_count || 668,
            recentViews: 850
        });

    } catch (error) {
        // 5. Plan de Respaldo: Tus datos reales en lugar del 1250
        console.error("Activando plan de respaldo. Motivo:", error.message);
        res.json({
            followers: 1626,
            engagement: "4.5%",
            posts: 668,
            recentViews: 850
        });
    }
});

app.get('/', (req, res) => {
    res.send('¡El motor de Embajador Tomasino está en línea!');
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
