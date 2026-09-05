const pool = require('../config/db');

async function listarTodas(){
    const [rows] = await pool.query(
        'SELECT * FROM tasks ORDER BY data_criacao DESC'
    );
    return rows;
}

async function criarTarefa(titulo, descricao, categoria, data_prazo){
    const [result] = await pool.query(
        'INSERT INTO tasks (titulo, descricao, categoria, data_prazo) VALUES(?, ?, ?, ?)',
         [titulo, descricao, categoria, data_prazo]
    );
    return result.insertId;
}

async function buscarPorId(id) {
    const [rows] = await pool.query(
        'SELECT * FROM tasks WHERE id = ?',
        [id]
    );
    return rows[0];
}

async function buscarPorCat(categoria) {
    const [rows] = await pool.query(
        'SELECT * FROM tasks WHERE categoria = ?',
        [categoria]
    );
    return rows;
}

async function buscarCriacao(inicio, fim) {
    const [rows] = await pool.query(
        'SELECT * FROM tasks WHERE DATE(data_criacao) BETWEEN ? AND ?',
        [inicio, fim]
    );
    return rows;
}

async function atualizarTarefa(id, dados) {
    const {titulo, descricao, categoria, concluida, data_prazo} = dados;
    const [result] = await pool.query(
        'UPDATE tasks SET titulo = COALESCE(?, titulo), descricao = COALESCE(?, descricao), categoria = COALESCE(?, categoria), concluida = COALESCE(?, concluida), data_prazo = COALESCE(?, data_prazo) WHERE id = ?',
        [
            titulo || null,
            descricao || null,
            categoria || null,
            concluida ?? null,
            data_prazo || null,
            id
        ]
    );
    return result;
}

async function deletarTarefa(id) {
    const [result] = await pool.query(
        'DELETE FROM tasks WHERE id=?',
        [id]
    );
    return result;
}

module.exports = {
    listarTodas,
    criarTarefa,
    buscarPorId,
    atualizarTarefa,
    deletarTarefa,
    buscarPorCat,
    buscarCriacao,
}