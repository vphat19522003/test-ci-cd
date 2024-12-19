import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VITE API Documentation',
      version: '1.0.0',
      description: 'API documentation for VITE SHOP'
    },
    servers: [
      {
        url: 'http://localhost:3022/api',
        description: 'Local development server'
      }
    ]
  },
  apis: ['./src/routes/location/location.swagger.ts'] // Đường dẫn tới file Swagger cho locationRouter
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
