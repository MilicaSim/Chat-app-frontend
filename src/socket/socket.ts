const io = require("socket.io-client");
const socket = io('http://localhost:3003');

export default socket;