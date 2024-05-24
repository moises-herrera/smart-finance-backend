# Smart Finance API

## Requisitos

- [Node.js](https://nodejs.org/en)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Uso

```
git clone https://github.com/moises-herrera/smart-finance-backend.git
cd smart-finance-backend
```

## Instalación

```
npm install
```

## Configurar variables de entorno

```
cp .env.example .env.development
```

## Levantar la base de datos
```
docker-compose up -d
```

## Ejecutar seed

```
npm run seed
```

## Iniciar servidor de desarrollo

```
npm run dev
```
