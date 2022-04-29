import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Produtos from './pages/Produtos';
import Inicio from './pages/Inicio';
import AdicionarProduto from "./pages/AdicionarProdutos";
import DetalhesProduto from "./pages/DetalhesProduto";
import EditarProduto from "./pages/EditarProduto";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function Routes() {

    const location = useLocation();
    
    return(
        <TransitionGroup>
            <CSSTransition key={location.key} timeout={300} classNames="transition">
                <Switch location={location}>
                    <Route path='/'exact component={Inicio}/>
                    <Route path='/produtos' component={Produtos}/>
                    <Route path='/adicionar' component={AdicionarProduto}/>
                    <Route path='/detalhes/:id' component={DetalhesProduto}/>
                    <Route path='/editar/:id'component={EditarProduto}/>
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}