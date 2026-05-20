const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

// Esta es tu ruta de API que consulta Instagram
app.get('/api/instagram', async (req, res) => {
    try {
        // Tu token de Meta actual
        const TOKEN = process.env.ACCESS_TOKEN; 
        const IG_ID = '17841411497191235'; 

        // Consulta usando business_discovery como te recomendé
        const url = `https://graph.facebook.com/v25.0/${IG_ID}?fields=business_discovery.username(ing_industrial_usta){followers_count,media_count}&access_token=${TOKEN}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.business_discovery) {
            res.json({
                followers: data.business_discovery.followers_count,
                status: "Real-time 🟢"
            });
        } else {
            throw new Error("Respuesta inválida de Meta");
        }
    } catch (error) {
        // 🚀 AQUÍ ESTÁ EL BLINDAJE: Si falla, devuelve un valor fijo y no el error
        console.error("Error en API:", error);
        res.json({
            followers: 1630, // Valor de respaldo para tu sustentación
            status: "Respaldo 🟡"
        });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
