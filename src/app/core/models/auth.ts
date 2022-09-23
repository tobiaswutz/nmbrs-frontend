export interface AuthResponseTokenObj {
    access_token: string;
}

export class JWTDecoded {
    sub: string | undefined;
    email: string | undefined;
    exp: number | undefined;
    iat: number | undefined;
}