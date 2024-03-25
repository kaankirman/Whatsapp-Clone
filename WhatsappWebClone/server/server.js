require('dotenv').config();
const PORT = process.env.PORT;
const SOCKET_PORT = process.env.SOCKET_PORT;
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
const bcrypt = require('bcrypt');
const token = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const io = require('socket.io')(SOCKET_PORT, {
    cors: {
        origin: [`http://localhost:5173`],
    }

})

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//socket.io
io.on('connection', (socket) => {
    socket.on('send-message', (message, conversationId) => {
        socket.to(conversationId).emit('receive-message', message, conversationId);
    })
    socket.on('join-conversation', (conversationId) => {
        socket.join(conversationId);
    })
});

//signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        await pool.query('INSERT INTO users (email, hashed_password, name, status, url) VALUES ($1, $2, $3, $4, $5)', [email, hashedPassword,"user","Hey there! I am using get2connect!","uploads/default.jpg"]);
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
            res.json({ 'email': users.rows[0].email, accessToken: accessToken })
        } else {
            res.json({ message: "Wrong password" })
        }
    } catch (error) {
        console.error(error);
    }
});

//logout
app.post('/logout', (req, res) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({ message: "Logged out successfully" });
});

//get user
app.get('/users/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const users = await pool.query('SELECT name, status, url FROM users where email = $1', [email]);
        res.json(users.rows[0]);
    } catch (error) {
        console.error(error);
    }
});

//modify user
app.patch('/users/:email', upload.single('image'), async (req, res) => {
    const { email } = req.params;
    const { name, status } = req.body;
    const imagePath = req.file ? req.file.path : null;

    try {
        let updateFields = [];
        let queryParams = [];
        let queryIndex = 1;

        const prevImageResult = await pool.query('SELECT url FROM users WHERE email = $1', [email]);
        const prevImage = prevImageResult.rows[0].url;

        if (name) {
            updateFields.push(`name = $${queryIndex}`);
            queryParams.push(name);
            queryIndex++;
        }

        if (status) {
            updateFields.push(`status = $${queryIndex}`);
            queryParams.push(status);
            queryIndex++;
        }

        if (imagePath) {
            updateFields.push(`url = $${queryIndex}`);
            queryParams.push(imagePath);
            queryIndex++;

            if (prevImage) {
                fs.unlinkSync(path.join(__dirname, prevImage));
            }
        }
        const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE email = $${queryIndex}`;
        await pool.query(updateQuery, [...queryParams, email]);

        if (imagePath) {
            res.json({ message: "User updated successfully", url: imagePath });
        } else {
            return res.json({ message: "User updated successfully" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

//send friend request
app.post('/friendRequests', async (req, res) => {
    const { senderId, receiverId, senderName } = req.body;

    try {
        // Check if receiverId exists in the users table
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [receiverId]);
        if (userCheck.rows.length === 0) {
            return res.status(400).json({ error: 'Receiver user not found' });
        }

        // Check if there is an entry in the friends table
        const friendsCheck = await pool.query(
            'SELECT * FROM friends WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)',
            [senderId, receiverId]
        );
        if (friendsCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Friendship already exists' });
        }

        // Check if there is an existing request in friend_requests table
        const existingRequestCheck = await pool.query(
            'SELECT * FROM friend_requests WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)',
            [senderId, receiverId]
        );
        if (existingRequestCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Friend request already exists' });
        }

        // Insert the friend request into the friend_requests table
        const result = await pool.query(
            'INSERT INTO friend_requests (sender_id, receiver_id, status, sender_name) VALUES ($1, $2, $3, $4) RETURNING *',
            [senderId, receiverId, 'pending', senderName]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error adding friend request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get friend requests
app.get('/friendRequests/:receiverId', async (req, res) => {
    const { receiverId } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM friend_requests WHERE receiver_id = $1 AND status = $2',
            [receiverId, 'pending']
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Error retrieving friend requests:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//delete friend request
app.delete('/friendRequests/:request_id', async (req, res) => {
    const requestId = parseInt(req.params.request_id);

    try {
        const result = await pool.query('DELETE FROM friend_requests WHERE request_id = $1 RETURNING *', [requestId]);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Friend request not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error deleting friend request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//accept friend request
app.post('/friends', async (req, res) => {
    const { senderId, receiverId } = req.body;
    let conversationId = null;

    try {
        const conversationResult = await pool.query('INSERT INTO conversations (title, conversation_type) VALUES ($1, $2) RETURNING *', ["none", "private"]);
        conversationId = conversationResult.rows[0].conversation_id;

        const result = await pool.query(
            'INSERT INTO friends (sender_id, receiver_id, status, conversation_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [senderId, receiverId, 'accepted', conversationId]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error adding friend request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//get friends
app.get('/friends/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const friendDataResult = await pool.query(
            `SELECT f.sender_id AS friend_email, f.conversation_id 
             FROM friends f 
             WHERE f.receiver_id = $1 
             UNION 
             SELECT f.receiver_id AS friend_email, f.conversation_id 
             FROM friends f 
             WHERE f.sender_id = $1;`,
            [userId]
        );

        const friendData = friendDataResult.rows;

        const userDataPromises = friendData.map(async (friend) => {
            const userDataResult = await pool.query(
                'SELECT email, name, status, url FROM users WHERE email = $1',
                [friend.friend_email]
            );
            return {
                email: userDataResult.rows[0].email,
                name: userDataResult.rows[0].name,
                status: userDataResult.rows[0].status,
                url: userDataResult.rows[0].url,
                conversationId: friend.conversation_id
            };
        });

        const userData = await Promise.all(userDataPromises);

        res.json(userData);
    } catch (error) {
        console.error('Error retrieving friend data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//send message
app.post('/messages', async (req, res) => {
    const { senderId, conversationId, message } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO messages (sender_id, conversation_id, message_text) VALUES ($1, $2, $3) RETURNING *',
            [senderId, conversationId, message]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get messages
app.get('/messages/:conversationId', async (req, res) => {
    const { conversationId } = req.params;
    try {
        const result = await pool.query(
            'SELECT sender_id, message_text, send_at FROM messages WHERE conversation_id = $1',
            [conversationId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
