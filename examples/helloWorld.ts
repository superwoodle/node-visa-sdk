import * as path from 'path';

const CERTIFICATE_FILE = process.env.CERTIFICATE_FILE;
if (!CERTIFICATE_FILE) throw new Error('Missing process.env.CERTIFICATE_FILE');

const CERTIFICATE_PASSPHRASE = process.env.CERTIFICATE_PASSPHRASE;
if (!CERTIFICATE_PASSPHRASE) throw new Error('Missing process.env.CERTIFICATE_PASSPHRASE');

const VISA_USER_ID = process.env.VISA_USER_ID;
if (!VISA_USER_ID) throw new Error('Missing process.env.VISA_USER_ID');

const VISA_PASSWORD = process.env.VISA_PASSWORD;
if (!VISA_PASSWORD) throw new Error('Missing process.env.VISA_PASSWORD');

import { Visa } from '../';

const credentials = {
    userId: VISA_USER_ID,
    password: VISA_PASSWORD,
    certificate_passphrase: CERTIFICATE_PASSPHRASE,
    certificate_file_path: path.resolve(__dirname, '../', CERTIFICATE_FILE)
};

const visa = new Visa(credentials);
visa.helloWorld().then(({ body, response }) => {
    console.log(response.statusCode);
    console.log(body);
});
