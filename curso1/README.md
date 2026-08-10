1. ESTE COMANDO PARA USAR NODE SIN INSTALARLO EN LA MAQUINA PS D:\PORTAFOLIO\docker1> docker run -it --rm -v "${PWD}:/app" -w /app node:22 bash AQUI REDIREIGE A UNA TERMINAL Y PUEDO HACER LOS COMANDOS DE NODE  COMO NPM INIT -Y

1.1 bash es para entrar a la terminal de cualquier imagen

2. para manejar el pruerto docker run -p [puerto pc]]:[puerto docker] [nombre contenedor]

3.  docker compose exec -it db psql -U postgres -d postgres --> mirar la terminal de postgres  docker compose exec -it [nombre e docker file] psql -U [usuario] -d [base de datos a conectar]

4. # 1. Apaga y elimina los contenedores y volúmenes anteriores
docker compose down -v

# 2. Obliga a Docker a construir 'app' desde cero usando tu Dockerfile de Node.js
docker compose build --no-cache

# 3. Levanta los servicios
docker compose up

#4 eliminar TODOS los contenedores que no esta siendo usados
docker container prune

#5 eliminar TODOS las imagenes que no esta siendo usados
docker image prune

#5 eliminar TODOS LOS RECURSOS que no esta siendo usados
docker system prune -a 