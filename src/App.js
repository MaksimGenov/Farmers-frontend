import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import PageLayout from './components/PageLayout'
import Home from './pages/home/Home'
import './styles/main.css'
import FarmerDetailsPage from './pages/farmer-details/FarmerDetailsPage'

const AppoloClient = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:5000/graphql' }),
  cache: new InMemoryCache()
})

function App (props) {
  return (
    <ApolloProvider client={AppoloClient}>
      <BrowserRouter>
        <Switch>
          <PageLayout>
            <Route path='/' exact component={Home} />
            <Route path='/farmer/:id' component={FarmerDetailsPage} />
          </PageLayout>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
