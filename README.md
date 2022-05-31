# Desafio mi-repertorio

## Requerimiento
1. Crear una ruta POST /cancion que reciba los datos correspondientes a una canción y
realice a través de una función asíncrona la inserción en la tabla repertorio.

2. Crear una ruta GET /canciones que devuelva un JSON con los registros de la tabla
repertorio.

3. Crear una ruta PUT /cancion que reciba los datos de una canción que se desea
editar, ejecuta una función asíncrona para hacer la consulta SQL correspondiente y
actualice ese registro de la tabla repertorio.

4. Crear una ruta DELETE /cancion que reciba por queryString el id de una canción y
realiza una consulta SQL a través de una función asíncrona para eliminarla de la
base de datos.

## Base de Datos
``
CREATE DATABASE repertorio ;
CREATE TABLE repertorio (id SERIAL, cancion VARCHAR(50), artista
VARCHAR(50), tono VARCHAR(10));
``
## Dependencias

> pg: 8.7.3 
> 
> pg-cursor: 2.7.3 
