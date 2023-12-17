export const getTokenFromHeader = (req) => {
    const token = req?.headers?.authorization?.split(' ')[1];
    if(!token) return 'No token found in the header';
    return token;
}

export default getTokenFromHeader;