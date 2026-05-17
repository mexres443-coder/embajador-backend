const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); 

app.get('/api/instagram', (req, res) => {
    res.json({
        followers: 1250,
        engagement: "4.5%",
        posts: 45,
        recentViews: 850
    });
});

app.get('/', (req, res) => {
    res.send('¡El motor de Embajador Tomasino está en línea!');
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
