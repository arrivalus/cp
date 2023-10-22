import {parseJwt} from "./parseJwt";

export const tokenExpiredDiff = (token) => {
    if (!token) return null
    const expiry = parseJwt(token).exp;

    const now = new Date();
    return (expiry * 1000 - now.getTime()) / 1000;
};
