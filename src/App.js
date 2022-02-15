import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AllCategories from './components/AllCategories';
import BlogList from './components/BlogList';
import Header from './components/Header';
import Single from './components/Single';
import data from './data/MOCK_DATA.json';

function App() {

  const [category, setCategory] = useState();

  let arr = [];

  for (let i = 0; i < data.length; i++) {
      const genres = data[i].genres.split("|");
      arr = [...arr, ...genres];
  }

  const uniqueArr = [...new Set(arr)];

  const getCatHandler = (e) => {
      setCategory(e.target.innerHTML.replace(/[^A-Z0-9]/ig, ""));
  }

  useEffect(() => {
    const getCat = localStorage.getItem('Category');
    if (getCat) {
      setCategory((getCat)) ;
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('Category', (category));
  })

  function shuffle(array) {
    var counter = array.length, temp, index;

    while (counter--) {

        index = (Math.random() * counter) | 0;

        temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }

    const getRandomCats = uniqueArr;

    var randoms = shuffle(getRandomCats.slice(0));

    randoms.length = 3;
  
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path={'https://abhimanyusoni.github.io/react-blog/'} render={() => (<AllCategories allcats={uniqueArr} getCatHandler={getCatHandler} />)} />
          <Route exact path={`https://abhimanyusoni.github.io/react-blog/${category}`} render={() => (<BlogList data={data} related={randoms} passedCat={category} />)} />
          <Route exact path={`https://abhimanyusoni.github.io/react-blog/${category}/:id`} render={() => (<Single allcats={uniqueArr} location={window.location.pathname} passedCat={category} />)} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
