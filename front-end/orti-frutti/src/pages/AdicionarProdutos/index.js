import './styles.css'

import React, { useState } from 'react'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'

import { message, Form, Input, Button, InputNumber } from 'antd'

export default function AdicionarProduto(){

    const [disabled, setDisabled] = useState(false)
    const history = useHistory()

    async function handleSubmit(produto){
        setDisabled(true)
        api.post('/item', produto)
            .then((response) => {
                if(response.status === 201){
                    message.success("Produto adicionado com sucesso!", 5);
                    history.push('/produtos')
                }
            })
            .catch((err) => {
                message.error("Aconteceu um erro ao adicionar o produto  " + err.response.data.message, 5);
            })
    }
    return(
        <div className="produto_container">
                <h1>Adicionar Novo Produto</h1>
                <br/>
            <div>
                <Form 
                className="produto_submit"
                name='submitProduto'
                labelCol={{span:8}}
                wrapperCol={{span:16}}
                onFinish={handleSubmit}
                autoComplete="off"
                > 
                <Form.Item
                    label='Nome'
                    name="name"
                    rules={[{required: true, message: "Insira o nome do item" }]}
                >
                    <Input className='produto_input'/>
                </Form.Item>

                <Form.Item
                    label='Descrição'
                    name="description"
                    rules={[{required: true, message: "Insira a descrição do item" }]}
                >
                    <Input className='produto_input'/>
                </Form.Item>

                <Form.Item
                    label='Quantidade'
                    name="quantity"
                >
                    <InputNumber/>
                </Form.Item>
            
                <Form.Item className='submit'>
                    <Button className='adicionar--botao'type='primary' htmlType='submit' disabled={disabled}>
                        Adicionar
                    </Button> 
                </Form.Item>
                </Form>
            </div>
        </div>
    )
}