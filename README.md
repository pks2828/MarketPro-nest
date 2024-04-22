<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Market Pro API

1. Clonar proyecto
2. Npm install
3. Clonar archivo ```.env.template``` y renombrar la copia a ```.env```
4. Cambiar variables de entorno
5. Tener Docker Desktop instalado
6. Levantar base de datos
```
docker-compose up -d
```
6. Levantar: ```npm start:dev```

# ENDPOINTS

## Inventary

- **POST** `http://localhost:3000/api/inventary`
- **GET** `http://localhost:3000/api/inventary`
- **GET** `http://localhost:3000/api/inventary/{id}`
- **PATCH** `http://localhost:3000/api/inventary/{id}`
- **DEL** `http://localhost:3000/api/inventary/{id}`