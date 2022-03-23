const express = require('express');
const router = express.Router();
const data = require('../../data');

router.get('/', (req, res) => {
	res.json({ users: data.users });
});

router.delete('/:id', (req, res) => {
	const userId = parseInt(req.params.id);
	const userToDelete = data.users.find((user) => user.id === userId);
	if (!userToDelete) {
		res.status(404);
		res.json({ error: 'User not found' });
		return;
	}
	data.users = data.users.filter((user) => user !== userToDelete);
	res.json({ user: userToDelete });
});

router.put('/:id', (req, res) => {
	const userId = parseInt(req.params.id);
	const existingUser = data.users.find((user) => user.id === userId);
	if (!existingUser) {
		res.status(404);
		res.json({ error: 'user not found' });
		return;
	}
	if (!req.body.email) {
		res.status(400);
		res.json({ error: 'email not provided' });
		return;
	}
	existingUser.email = req.body.email;
	res.json({ user: existingUser });
});

module.exports = router;
