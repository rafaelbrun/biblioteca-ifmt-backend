const crypto = require('crypto');

const DADOS = {
  algoritmo: 'aes256',
  segredo: segredo('keysegredo'),
  tipo: 'hex',
};

function segredo(secret) {
  return crypto
    .createHash('sha256')
    .update(String(secret))
    .digest('base64')
    .substr(0, 32);
}

module.exports = DADOS;
