import React from 'react';
import axios from 'axios';
import Highlighter from "react-highlight-words";
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      results: [],
      searchQuery: ''
    }
  }

  handleInputChange = (event) => {
    var searchQuery = event.target.value.toLowerCase();
    if (searchQuery) {
      var results = this.state.articles.filter((el) => {
        return el.title.toLowerCase().indexOf(searchQuery) !== -1;
      })
    } else {
      var results = this.state.articles;
    }
    this.setState({
      results: results,
      searchQuery: searchQuery
    });
  }

  componentDidMount() {
    axios.get(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=38be583cb06748129671194eadf17de0`)
      .then(res => {
        const articles = res.data.articles;
        this.setState({
          articles: articles,
          results: articles 
        });
      });
  }

  render(){
    return(
      <div className="App">
        <div className="header">
          <form>
            <input 
              className="header__search"
              placeholder="Search articles"
              onChange={this.handleInputChange}   
            />
          </form>
        </div>
        <div className="articles">
          { this.state.results ? this.state.results.map((article, index) => (
            <div className="article" key={index}>
              <a className="article__link" target="_blank" href={article.url}>
                <Highlighter
                  highlightClassName="YourHighlightClass"
                  searchWords={[this.state.searchQuery]}
                  autoEscape={true}
                  textToHighlight={article.title}
                />
              </a>
            </div> 
          )) : null }
        </div>
      </div>
    )
  }
}

export default App;
