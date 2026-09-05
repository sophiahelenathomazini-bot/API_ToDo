const TaskModel = require('../models/TaskModel');

async function listar(req, res) {
    try{
        const tarefas = await TaskModel.listarTodas();
        res.json(tarefas);
    } catch (e) {
        res.status(500).json({erro: 'Falha ao listar tarefas'});
    }
};

async function criar(req, res) {
    const {titulo, descricao, categoria, data_prazo} = req.body;
    try{
        const id = await TaskModel.criarTarefa(titulo, descricao, categoria, data_prazo);
        res.status(201).json({id, titulo, descricao, categoria, concluida: false, data_prazo});
    } catch (e) {
        res.status(500).json({erro: 'Falha ao criar tarefa'});
    }
};

async function buscar_id(req, res) {
    try {
        const {id} = req.params;
        const tarefa = await TaskModel.buscarPorId(id);

        if (!tarefa) {
            return res.status(404).json({ erro: 'Tarefa não encontrada' });
        }

        res.json(tarefa);
    } catch (e) {
        res.status(500).json({erro: 'Falha ao buscar tarefa'});
    }
};

async function buscar_cat(req, res) {
    try{
        const {categoria} = req.params;
        const tarefa = await TaskModel.buscarPorCat(categoria);
        res.status(200).json(tarefa);
    } catch (e) {
        res.status(500).json({erro: 'Falha ao buscar tarefa'});
    }
};

async function buscar_criacao(req, res) {
    try{
        const {inicio, fim} = req.query;
        const tarefas = await TaskModel.buscarCriacao(inicio, fim);

        if(!inicio || !fim) {
            return res.status(400).json({erro: 'Os parâmentros são obrigatórios'})
        }

        res.json(tarefas);
    } catch (e) {
        res.status(500).json({erro: 'Falha ao buscar tarefas'})
    }
}

async function atualizar(req, res) {
    try{
        const {id} =  req.params;
        const dados = req.body;
        const result = await TaskModel.atualizarTarefa(id, dados);

        if(!result.affectedRows) {
            return res.status(404).json({erro: 'Tarefa não encontrado'});
        }

        res.status(200).json({mensagem: 'Tarefa atualizado com sucesso'});
    } catch (e) {
        return res.status(500).json({erro: 'Falha ao atualizar tarefa'});
    }
};

async function excluir(req, res) {
    try{
        const {id} = req.params;
        const result = await TaskModel.deletarTarefa(id);

        if(!result.affectedRows){
            return res.status(404).json({erro: 'Tarefa não encontrada'});
        }
        res.status(200).json('Tarefa deletada com sucesso');
    } catch (e) {
        console.log(e);
        res.status(500).json({erro: 'Falha ao deletar tarefa'})
    }
};

module.exports = {listar, criar, buscar_id, buscar_cat, buscar_criacao, atualizar, excluir};