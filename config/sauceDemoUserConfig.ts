import CryptrHelper from "../credentialsHelper/credsHelper";

interface sauceDemoUserConfig {
    username: string;
    password: string;
    url: string;
}

export const config: { processEnv: sauceDemoUserConfig } = {
    processEnv: {
        username: process.env.SAUCEDEMO_USERNAME || 'defaultUsername',
        password: new CryptrHelper().encrypt(process.env.SAUCEDEMO_PASS || ''),
        url: process.env.SAUCEDEMO_URL || 'defaultUrl'
    },
};