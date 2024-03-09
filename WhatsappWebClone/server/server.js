const PORT = process.env.PORT || 8000;
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const token = require('jsonwebtoken');
const multer = require('multer');
const upload = multer();

app.use(cors());
app.use(express.json());

//signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        await pool.query('INSERT INTO users (email, hashed_password) VALUES ($1, $2)', [email, hashedPassword]);
        const accessToken = token.sign({ email: email }, "secret", { expiresIn: "1h" });
        res.json({ email: email, accessToken: accessToken });
    } catch (error) {
        console.error(error);
    }

});
//login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (users.rows.length === 0) {
            return res.json({ message: "User does not exist" });
        }
        const success = await bcrypt.compare(password, users.rows[0].hashed_password)
        const accessToken = token.sign({ email: email }, "secret", { expiresIn: "1h" });
        if (success) {
            res.json({ 'email': users.rows[0].email, accessToken: accessToken, 'url': users.rows[0].url, 'name': users.rows[0].name, 'status': users.rows[0].status })
        } else {
            res.json({ message: "Wrong password" })
        }
    } catch (error) {
        console.error(error);
    }
});

app.patch('/users/:email', upload.none(), async (req, res) => {
    const { email } = req.params;
    const { name, status } = req.body;
    try {
        await pool.query('UPDATE users SET name = $1, status = $2 WHERE email = $3', [name, status, email]);
        res.json({ message: "User updated successfully" });
    } catch (error) {
        console.error(error);
    }
});

/* //get existing files
app.get('/files/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const files = await pool.query('SELECT * FROM files WHERE email = $1', [email]);
        res.json(files.rows);
    } catch (error) {
        console.error(error);

    };
});

//get existing folders
app.get('/folders/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const folders = await pool.query('SELECT * FROM folders WHERE email = $1', [email]);
        res.json(folders.rows);
    } catch (error) {
        console.error(error);
    };
});

//create new file
app.post('/files', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'File upload error' });
        }
        const { email, title, description, lat, lon, date, folder_id } = req.body;
        const file_id = uuidv4();
        try {
            const file = req.file;
            const fileRef = ref(storage, Date.now() + file.originalname);
            const uploadTask = uploadBytesResumable(fileRef, file.buffer);
            await uploadTask;
            const url = await getDownloadURL(fileRef);
            await pool.query('INSERT INTO files (file_id, email, title, description, lat, lon, date, folder_id, url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                [file_id, email, title, description, lat, lon, date, folder_id, url]);
            res.status(200).json({ message: 'File uploaded successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    });
});

//create new folder
app.post('/folders', async (req, res) => {
    const { email, folder_name, date } = req.body;
    const folder_id = uuidv4();
    try {
        await pool.query('INSERT INTO folders (folder_id, email, folder_name, date) VALUES ($1, $2, $3, $4)',
            [folder_id, email, folder_name, date]);
    } catch (error) {
        console.error(error);
    }
});

//update user image
app.patch('/users/:email', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'File upload error' });
        }
        const { email } = req.params;
        try {
            const file = req.file;
            const fileRef = ref(storage, Date.now() + file.originalname);
            const uploadTask = uploadBytesResumable(fileRef, file.buffer);
            await uploadTask;
            const fileUrl = await getDownloadURL(fileRef);
            await pool.query('UPDATE users SET url = $1 WHERE email = $2', [fileUrl, email]);
            res.status(200).json({ message: 'User image updated successfully', fileUrl: fileUrl });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    });
}); */

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
