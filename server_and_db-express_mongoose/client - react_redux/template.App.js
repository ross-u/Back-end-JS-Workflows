import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AddTopic from './components/AddTopic';
import TopicList from './components/TopicList';

const BASE_URL = 'http://localhost:3001/topics';

class App extends Component {
  state = {
    topics: [],
    apiMethods: {}
  }

  getAllTopics = () => {
    fetch(BASE_URL)
      .then( data => data.json())
      .then( topics => this.setState({topics : topics}));
      console.log('TOPICS',this.state.topics);
  }

  voteUp = (id) => {
    fetch(`${BASE_URL}/${id}/up`, {method: 'PUT'})
      .then(response => console.log(response))
      .then(this.getAllTopics);
  }

  voteDown = (id) => {
    fetch(`${BASE_URL}/${id}/down`, {method: 'PUT'})
      .then(response => console.log(response))
      .then(this.getAllTopics);
  }

  deleteTopic = (id) => {
    fetch(`${BASE_URL}/${id}`, {method: 'DELETE'})
      .then(response => console.log(response))
      .then(this.getAllTopics);
  }

  addTopic = (title) => {
    

    fetch(BASE_URL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({title: title})
      }
    )
    .then(this.getAllTopics);
  }

  
  componentDidMount() {
    this.setState({apiMethods:{
      getAllTopics: this.getAllTopics,
      voteUp: this.voteUp,
      voteDown: this.voteDown,
      deleteTopic: this.deleteTopic
    }});

    this.getAllTopics();

    /* this.addTopic({published_at: "2017-01-08T21:00:11.620Z",
    score: 10,
    title: "asdasd",
    _id: "sdk92k20elked202doe4"}); */
  }

  render() {
    
    const {topics} = this.state;
    const {apiMethods} = this.state;
    return (
      <div className='App'>
      
        <div className="EventsScreen">
          
          <div className="NextEvent">
          
          </div>

          <div className="EventsList">

              <div className="Event"></div>
        
          </div>


        </div>

        <div className="EventsForm"></div>


      </div>
    );
  }
}

export default App;
