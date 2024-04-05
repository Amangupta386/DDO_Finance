const crypto = require('crypto');

// Generate a random 64-bit key (8 bytes)
const randomKey = crypto.randomBytes(32).toString('hex');

('Random Security Key:', randomKey);