import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {Provider} from "react-redux";
import {store} from "./store/store";

// Создаем клиент для запросов к базе данных graphql
const client = new ApolloClient({
    uri: 'http://player.node.ed.asmer.org.ua/graphql',
    cache: new InMemoryCache(),
});


// Отправляем всю страницу в index.html в качестве корневого элемента
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ApolloProvider>
);
