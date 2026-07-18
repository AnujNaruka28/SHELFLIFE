declare module 'swagger-ui-express' {
  import { RequestHandler } from 'express';

  export interface SwaggerOptions {
    explorer?: boolean;
    customCss?: string;
    customSiteTitle?: string;
    swaggerOptions?: {
      docExpansion?: string;
      persistAuthorization?: boolean;
      displayOperationId?: boolean;
      filter?: boolean;
      showRequestDuration?: boolean;
    };
    customfavIcon?: string;
    customJs?: string;
  }

  export const serve: RequestHandler;

  export function setup(
    swaggerDoc: object,
    options?: SwaggerOptions
  ): RequestHandler;
}
