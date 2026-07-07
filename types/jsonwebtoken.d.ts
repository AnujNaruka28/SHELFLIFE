declare module "jsonwebtoken" {
  export interface JwtPayload {
    [key: string]: any;
  }

  export interface SignOptions {
    expiresIn?: string | number;
    algorithm?: string;
  }

  export interface VerifyOptions {
    algorithms?: string[];
  }

  export function sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: string,
    options?: SignOptions
  ): string;

  export function verify(
    token: string,
    secretOrPublicKey: string,
    options?: VerifyOptions
  ): string | JwtPayload;

  export function decode(
    token: string
  ): string | JwtPayload | null;

  const jwt: {
    sign: typeof sign;
    verify: typeof verify;
    decode: typeof decode;
  };

  export default jwt;
}