import './App.css';
import Routes from './routes'

import { Menu } from 'antd';
import { PlusCircleOutlined, UnorderedListOutlined, HomeOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom'

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

function App() {
  const history = useHistory();
  return (
    <div className="main">
      <Layout className="main_content">
        <Header className='header'>
        Lista de Produtos
        </Header>
        <Layout>
          <Sider className="menu">
            <Menu className="menu_section">
              <Menu.Item key={1} icon={<HomeOutlined/>} className='home' onClick={() => history.push('/')}>
              Home
              </Menu.Item>
              <Menu.Item key={2} icon={<PlusCircleOutlined />} className='addProduto' onClick={() => history.push('/adicionar')}>
                Adicionar Produto
              </Menu.Item>
              <Menu.Item key={3} icon={<UnorderedListOutlined />} className='listProduto' onClick={() => history.push('/produtos')}>
                Listar Produtos
              </Menu.Item>
            </Menu>
          </Sider>
          <Content className="content">
            <Routes />
          </Content>
          </Layout>      
          <Footer className="footer">Todos os Direitos Reservados</Footer>
        </Layout>
    </div>
  );
}

export default App;
