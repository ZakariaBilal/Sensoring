import { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux'
import './App.scss';
import routes from './routes/routes';



function App() {
  //Getting isAuthenticated store value from Authentication slice.
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated)

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          {routes.map(({ element: Element, path, exact }, index) => (
            <Route path={`/${path}`} key={index} exact={exact} element={<div className="App"><Element /></div>} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
}





export default App;
