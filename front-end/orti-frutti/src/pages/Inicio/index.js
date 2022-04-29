import { useHistory } from 'react-router-dom'
import './styles.css'

import Logo from '../Inicio/assets/logo.png'
import { Button } from 'antd'
import { EyeOutlined } from '@ant-design/icons'

export default function Inicio(){

    const history = useHistory()

    async function listarProdutos(event){
        event.preventDefault();
        history.push('/produtos')
    }

    return(
        <div className="inicio_container">
            <section>
                <img src={Logo} alt='logo' className='logo'/>
                <br/>
                <Button className='botao' icon={<EyeOutlined/>} onClick={listarProdutos}>Ver Produtos</Button>
            </section>
        </div>
    )
}
