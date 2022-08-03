import { Route, Routes} from 'react-router-dom'
import Header from './layout/Header'
import Articles from './views/Articles/Articles'
import Article from './views/Article/Article'
import Errors from './views/Errors/Erros'
import Footer from './layout/Footer'


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />}/>
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="*" element={<Errors httpCode={404} message="Page not found"/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
