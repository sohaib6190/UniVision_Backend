const connection = require('../database');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const admin = require('firebase-admin');


const upload = multer({ dest: 'uploads/' });

async function readBlogs(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const email = decodedToken.email;

        const sql = "SELECT * FROM Blogs WHERE email_as_id = ?";
        connection.query(sql, [email], (err, results) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.send(results);
        });
    } catch (error) {
        console.error('Error verifying ID token:', error);
        res.status(401).json({ error: 'Unauthorized token' });
    }
}

async function readAllBlogs(req, res) {
    const sql = "SELECT * FROM Blogs ";
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.send(results);
    });
}

async function readSingleBlog(req, res) {
    const sql = "SELECT * FROM Blogs";
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}

async function addBlog(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const email_as_id = decodedToken.email;

        const { blog_heading, blog_content } = req.body;
        let image_url = null;

        if (req.file) {
            const fileExtension = path.extname(req.file.originalname);
            const newFileName = `uploads/${Date.now()}${fileExtension}`;

            fs.rename(req.file.path, newFileName, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'File upload failed' });
                }
                image_url = newFileName;

                const sql = 'INSERT INTO Blogs (blog_heading, blog_content, email_as_id, image_url) VALUES (?, ?, ?, ?)';
                connection.query(sql, [blog_heading, blog_content, email_as_id, image_url], (err, results) => {
                    if (err) {
                        console.error('Error executing SQL query:', err);
                        res.status(500).json({ error: 'Internal Server Error' });
                        return;
                    }
                    res.send(results);
                });
            });
        } else {
            const sql = 'INSERT INTO Blogs (blog_heading, blog_content, email_as_id, image_url) VALUES (?, ?, ?, ?)';
            connection.query(sql, [blog_heading, blog_content, email_as_id, image_url], (err, results) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                res.send(results);
            });
        }
    } catch (error) {
        console.error('Error verifying ID token:', error);
        res.status(401).json({ error: 'Unauthorized token' });
    }
}

async function updateBlog(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const email_as_id = decodedToken.email;

        const { id } = req.params;
        const { blog_heading, blog_content } = req.body;

        let sql, queryParams;

        if (req.file) {
            const fileExtension = path.extname(req.file.originalname);
            const newFileName = `uploads/${Date.now()}${fileExtension}`;

            fs.rename(req.file.path, newFileName, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'File upload failed' });
                }

                const image_url = newFileName;
                sql = 'UPDATE Blogs SET blog_heading = ?, blog_content = ?, image_url = ? WHERE blog_id = ? AND email_as_id = ?';
                queryParams = [blog_heading, blog_content, image_url, id, email_as_id];

                connection.query(sql, queryParams, (err, results) => {
                    if (err) {
                        console.error('Error executing SQL query:', err);
                        res.status(500).json({ error: 'Internal Server Error' });
                        return;
                    }

                    if (results.affectedRows === 0) {
                        res.status(404).send('Blog not found');
                        return;
                    }

                    res.status(200).json({
                        blog_id: id,
                        blog_heading,
                        blog_content,
                        image_url
                    });
                });
            });
        } else {
            sql = 'UPDATE Blogs SET blog_heading = ?, blog_content = ? WHERE blog_id = ? AND email_as_id = ?';
            queryParams = [blog_heading, blog_content, id, email_as_id];

            connection.query(sql, queryParams, (err, results) => {
                if (err) {
                    console.error('Error executing SQL query:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }

                if (results.affectedRows === 0) {
                    res.status(404).send('Blog not found');
                    return;
                }

                res.status(200).json({
                    blog_id: id,
                    blog_heading,
                    blog_content
                });
            });
        }
    } catch (error) {
        console.error('Error verifying ID token:', error);
        res.status(401).json({ error: 'Unauthorized token' });
    }
}

async function deleteBlog(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const email_as_id = decodedToken.email;

        const { id } = req.params;

        const sql = 'DELETE FROM Blogs WHERE blog_id = ? AND email_as_id = ?';
        connection.query(sql, [id, email_as_id], (err, results) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                return res.status(500).json({ error: 'An error occurred while deleting the blog' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Blog not found' });
            }

            res.status(200).json({ message: 'Blog deleted successfully' });
        });
    } catch (error) {
        console.error('Error verifying ID token:', error);
        res.status(401).json({ error: 'Unauthorized token' });
    }
}

module.exports = {
    readBlogs,
    readAllBlogs,
    readSingleBlog,
    addBlog,
    updateBlog,
    deleteBlog,
    upload
};
