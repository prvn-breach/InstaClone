const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Controllers
const { addUserToChat, removeUserFromChat, sendMessage, deleteMessage, getConversation } = require('../../controllers/ChatController');

router.get('/chats/get_conversation', passport.authenticate('jwt', { session: false }), getConversation);
router.post('/chats/add_user_to_chat', passport.authenticate('jwt', { session: false }), addUserToChat);
router.post('/chats/remove_user_from_chat', passport.authenticate('jwt', { session: false }), removeUserFromChat);
router.post('/chats/send_message', passport.authenticate('jwt', { session: false }), sendMessage);
router.post('/chats/delete_message', passport.authenticate('jwt', { session: false }), deleteMessage);

module.exports = router;