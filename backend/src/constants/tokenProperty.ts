const ACCESS_TOKEN_TIME = 15 * 60 * 1000;
const REFRESH_TOKEN_TIME = 60 * 60 * 1000;

const ACCESS_TOKEN_EXPIRED = new Date(Date.now() + ACCESS_TOKEN_TIME);
const REFRESH_TOKEN_EXPIRED = new Date(Date.now() + REFRESH_TOKEN_TIME);

export { ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME, ACCESS_TOKEN_EXPIRED, REFRESH_TOKEN_EXPIRED };
