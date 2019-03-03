const env = process.env.NODE_ENV || 'development'; // 'development' or 'production'

const development = {
	socketServerHost: "http://localhost:5000"
}

const production = {
	socketServerHost: "https://socket-server-node.herokuapp.com"
}

const config = {
	development,
	production
};

module.exports = config[env];