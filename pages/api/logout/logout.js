export default function handler(req, res) {
    // Set the `authToken` cookie to expire in the past
    res.setHeader('Set-Cookie', 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict');
    res.status(200).json({ message: 'Logged out successfully' });
}
