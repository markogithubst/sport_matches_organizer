require('dotenv').config();
const server = require('./app');


// eslint-disable-next-line no-undef
const PORT = process.env.PORT;


server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});




