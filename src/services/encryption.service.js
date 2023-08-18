const crypto = require('crypto');

exports.sha256 = (data) => {
    return crypto
        .createHmac('sha256', process.env.HASH_SECRET)
        .update(data)
        .digest('hex');
};
