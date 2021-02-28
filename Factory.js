const { v4: uuid } = require('uuid');

const createMessage = (message = '', sender = '',channel_id='',senderName='') => ({
	id: uuid(),
	channel_id,
	time: getTime(new Date(Date.now())),
	message,
	sender,
	senderName
});

const getTime = (date) => {
	return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`;
};

module.exports = {
	createMessage,
};
