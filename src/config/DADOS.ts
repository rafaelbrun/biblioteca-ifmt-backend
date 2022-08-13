import crypto from 'crypto';

const segredo = (secret: string): string => {
  return crypto
    .createHash('sha256')
    .update(String(secret))
    .digest('base64')
    .substr(0, 32);
};

const DADOS = {
  algoritmo: 'aes256',
  segredo: segredo('keysegredo'),
  tipo: 'hex',
};

export default DADOS;
