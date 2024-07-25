const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

require('dotenv').config();
const connection = require('./database');

const app = express();

// Import route files
const programBachelorsRoutes = require('./routes/programBachelorsRoutes');
const scholarshipRoutes = require('./routes/scholarshipRoutes');
const eventAndWorkshopRoutes = require('./routes/eventAndWorkshopRoutes');
const blogRoutes = require('./routes/blogRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const emailRoutes = require('./routes/emailRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');

// Initialize Firebase Admin
const admin = require('firebase-admin');
const serviceAccount = require('./Firebase.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Static File Serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Routes
app.use('/api/programBachelors', programBachelorsRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/eventsAndWorkshops', eventAndWorkshopRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/recommendation', recommendationRoutes);


app.get('/authorizeToken', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (req.headers.email === decodedToken.email) {
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (error) {
        console.error('Error verifying ID token:', error);
        res.status(401).json({ error: 'Unauthorized token' });
    }
});

app.post('/token', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, email } = decodedToken;
        const currentTime = new Date();
        res.status(200).json({ uid, email, currentTime: currentTime.toString() });
    } catch (error) {
        console.error('Error verifying ID token:', error);
        res.status(401).json({ error: 'Unauthorized token' });
    }
});



app.get('/compare-universities', (req, res) => {
    let sql = 'SELECT * FROM university_details';

    connection.query(sql, function (err, results) {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}
)






// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
