import { decodeToken } from "react-jwt";

function getIdFromToken() {
    const authData = localStorage.getItem("Auth");
        let userId = '';
        if (authData) {
            const token = JSON.parse(authData)['accessToken'];
            const myDecodedToken = decodeToken(token);
            userId = myDecodedToken.sub;
        }
    return userId;
}

export default getIdFromToken;