import React, { useEffect, useState } from "react";
import api from '../../services/api';

import { useHistory } from "react-router-dom";

import '../Produtos/style.css'

import Carrinho from '../Produtos/assets/carrinho.png'

import { Button, Card } from 'antd';

export default function Produtos(){
    const [produtos, setProduto] = useState([])
    const history = useHistory()

    useEffect(() => {
        api.get('/item')
        .then((response) => {
        setProduto(response.data)
        })
        .catch((err) => {
            console.log("Aconteceu um erro inesperado" + err)
        })
    }, [])

    return(
        <div className="produto_container"> 
            <h1>Relação de todos os Produtos
            <img src={Carrinho} alt='logo' className='carrinho'/>
            </h1>
            <div className="produto_card_container">
                {produtos.map(produto => (
                    <Card key={produto.id} tittle={produto.name} bordered={false} style={{width: 300}}>
                        <p>{produto.name}</p>
                        <p>Descrição: {produto.description}</p>
                        <p>Quantidade: {produto.quantity}</p>
                        <Button onClick={() => history.push(`/detalhes/${produto.id}`)}>Detalhes</Button>
                    </Card>  
                ))} 
            </div>
        </div>
    )
} 