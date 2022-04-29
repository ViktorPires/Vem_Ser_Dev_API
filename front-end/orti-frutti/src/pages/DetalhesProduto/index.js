import React, { useEffect, useState } from "react";
import api from '../../services/api';

import { useParams, useHistory } from "react-router-dom";
import './styles.css'

import { Button, Card, message, Modal } from 'antd';
import { ExclamationCircleOutlined, EditOutlined, RollbackOutlined, DeleteOutlined } from '@ant-design/icons';

export default function DetalhesProduto(){

    const [produto, setProduto] = useState([])
    const history = useHistory()
    let {id} = useParams();

    const { confirm } = Modal;

        function showConfirm(produto) {
            confirm({
                title: 'Você realmente deseja deletar esse produto?',
                icon: <ExclamationCircleOutlined/>,
                content: produto.name,
                onOk() {
                    handleDelete(produto.id);
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        } 

    function handleDelete(id){
        api.delete(`/item/${id}`)
        .then((response) => {
            if(response.status === 200){
                message.success("O produto foi excluído com sucesso!")
                history.push('/produtos')
            }
        })
        .catch((err) => {
            message.error("Aconteceu um erro inesperado")
        })
    }

    useEffect(() => {
        api.get(`/item/${id}`)
        .then((response) => {
        setProduto(response.data)
        })
        .catch((err) => {
            message.error("Aconteceu um erro inesperado")
        })
    }, [])

    return(
        <div className="produto_container">
            <h1>Detalhes do produto</h1>
            <br/>
            <div className="produto_container">
                <Card className="produto_card_detalhe" key={produto.id} tittle={produto.name} bordered={false}>
                    <p>Nome: {produto.name}</p>
                    <p>Id: {produto.id}</p>
                    <p>UpdatedAt: {produto.updatedAt}</p>
                    <p>Descrição: {produto.description}</p>
                    <p>Quantidade: {produto.quantity}</p>
                    <hr/>
                    <div className="produto_card--actions">
                        <Button className="produto_card_button" type="default" icon={<RollbackOutlined/>} onClick={() => history.push(`/produtos`)}>Voltar</Button>
                        <Button className="produto_card_button" type="primary" success icon={<EditOutlined/>} onClick={() => history.push(`/editar/${produto.id}`, produto)}>Editar</Button>
                        <Button className="produto_card_button" type="primary" danger icon={<DeleteOutlined/>} onClick={() => showConfirm(produto)}>Excluir</Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}