import './styles.css'

import React, { useEffect, useState } from 'react'
import api from '../../services/api'

import { useHistory, useLocation } from 'react-router-dom'
import { message, Input, Button, InputNumber } from 'antd'
import { EditOutlined, RollbackOutlined } from '@ant-design/icons';

export default function EditarProduto(){

    const history = useHistory()
    const location = useLocation()
    const [disabled, setDisabled] = useState(false)

    const[produtoEdit, setProdutoEdit] = useState({})

    useEffect(() => {
        console.log(location.state)
        setProdutoEdit({...location.state})
    }, [location])


    async function handleSubmitEdit(produto){
        setDisabled(true)
        api.patch(`/item/${produto.id}`, produto)
        .then((response) => {
            if(response.status === 200){
                message.success("Produto editado com Sucesso!", 5)
                history.push('/produtos')
            }
        })
        .catch((err) => {
            message.error("Aconteceu um erro inesperado  " + err.response.data.message[0], 5)
        })
    }

    return(

            <div className="produto_container">
                <h1>Editar Produto</h1>
                <br/>
                <div className="produto_edit">
                    <div className="produto_campo">
                        <span className='produto_label'>Nome:</span>
                        <Input className='produto_input'value={produtoEdit?.name} onChange={(event) => {
                            setProdutoEdit((produtoEdit) => {
                                return {...produtoEdit, name: event.target.value}
                            })
                        }}/>
                    </div>

                    <div className="produto_campo">
                        <span className='produto_label'>Descrição:</span>
                        <Input className='produto_input'value={produtoEdit?.description} onChange={(event) => {
                            setProdutoEdit((produtoEdit) => {
                                return {...produtoEdit, description: event.target.value}
                            })
                        }}/>
                    </div>

                    <div className="produto_campo">
                        <span className='produto_label'>Quantidade:</span>
                        <InputNumber value={produtoEdit?.quantity} onChange={(event) => {
                            setProdutoEdit((produtoEdit) => {
                                return {...produtoEdit, quantity: event}
                            })
                        }}/>
                    </div>

                    <Button type='primary' className="editar--botao" icon={<EditOutlined/>} disabled={disabled} onClick={() => handleSubmitEdit(produtoEdit)}>Editar</Button>
                    <Button type="default" className="editar--botao" icon={<RollbackOutlined/>} onClick={() => history.push(`/detalhes/${produtoEdit.id}`)}>Voltar</Button>
                </div>
            </div>
    )
}
