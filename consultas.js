const { Pool } = require("pg")
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1313",
    port: 5432,
    database: "repertorio"
})

const insertar = async (datos) => {

    const consulta = {
        text: "INSERT INTO repertorio (cancion, artista, tono) values($1, $2, $3) RETURNING *",
        values: datos,
    }
    try {
        const result = await pool.query(consulta)
        return result.rows[0]
    } catch (error) {
        console.log(error.code)
        return error
    }
}

const consultar = async () => {
    try {
        const result = await pool.query(`SELECT * FROM repertorio`)
        return result.rows
    } catch (error) {
        console.log(error.code)
        return error
    }
}

const editar = async (datos) => {
    const consulta = {
        text: `UPDATE repertorio SET cancion = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *`,
        values: datos,
    }

    try {
        const result = await pool.query(consulta)
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
        return error
    }
}

const eliminar = async (id) => {
    // Paso 2
    try {
        const result = await pool.query(
            `DELETE FROM repertorio WHERE id = '${id}'`
        )
        return result
    } catch (error) {
        console.log(error.code)
        return error
    }
}

module.exports = { insertar, editar, consultar, eliminar }
