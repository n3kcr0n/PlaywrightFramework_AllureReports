import CryptrHelper from "../credentialsHelper/credsHelper";

interface qaCartUserConfig {
    username: string;
    lastname: string;
    password: string;
    email: string;
    url: string;
}
export const config: { processEnv: qaCartUserConfig } = {
    processEnv: {
        username: process.env.USER_USERNAME || 'defaultUsername',
        lastname: process.env.USER_LASTNAME || 'defaultLastname',
        password: new CryptrHelper().encrypt(process.env.USER_PASS || ''),
        email: process.env.USER_EMAIL || 'defaultEmail',
        url: process.env.QACART_BASEURL || 'defaultUrl'
    },
};
