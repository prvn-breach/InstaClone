const users = {};

const addUser = ( user_id, socket_client) => {
    users[user_id] = socket_client;
}

const removeUser = (user_id) => {
   delete users[user_id];
}

const getUser = (user_id) => users[user_id];

const getUsers = () => users;

module.exports = { addUser, removeUser, getUser, getUsers };