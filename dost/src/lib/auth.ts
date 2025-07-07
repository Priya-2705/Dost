import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret'; // fallback for dev

interface UserTokenPayload {
  _id: string;
  email: string;
  role: string;
}

export function getUserFromToken(req: Request): Promise<UserTokenPayload | null> {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) return Promise.resolve(null);

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as UserTokenPayload;

    return Promise.resolve(decoded);
  } catch (err) {
    return Promise.resolve(null);
  }
}