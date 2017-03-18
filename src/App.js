import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const API = 'https://api.github.com/users'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'sobiecki-marcin',
      name:'',
      avatar:'',
      location:'',
      repos:'',
      followers: '',
      following:'',
      homeUrl:'',
      notFound:''
    }
  }
fetchProfile(username) { 
    let url = `${API}/${username}`;
    fetch(url)
      .then((res) => res.json() )
      .then((data) => {
        this.setState({
          username: data.login,
          name: data.name,
          avatar: data.avatar_url,
          location: data.location,
          repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          homeUrl: data.html_url,
          notFound: data.message
        })
        console.log(data.html_url);
      })
      .catch((error) => console.log('Oops! . There Is A Problem') )
  }
  componentDidMount() {
    this.fetchProfile(this.state.username);
  }
  render() {
    return (
      <div>
        <h2 className="header-message">Welcome to Github-card</h2>
         <section id="card">
           <SearchProfile fetchProfile={this.fetchProfile.bind(this)}/>
           <Profile data={this.state} />
         </section>
      </div>
    )
  }
}
class SearchProfile extends React.Component {
  render() {
    return (
      <div className="search--box">
         <form onSubmit={this.handleForm.bind(this)}>
           <label><input type="search" ref="username" placeholder="Type Username + Enter"/></label>
         </form>
      </div>
    )
  }
  
  handleForm(e) {
   e.preventDefault();
    let username = this.refs.username.value
    this.props.fetchProfile(username);
    this.refs.username.value = '';
  }
}

class Profile extends React.Component {
  render() {
    let data = this.props.data;
    let followers = `${data.homeUrl}/followers`;
    let repositories = `${data.homeUrl}?tab=repositories`;
    let following = `${data.homeUrl}/following`;
    if (data.notFound === 'Not Found')
      return (
         <div className="notfound">
            <h2>Oops !!!</h2>
            <p>The Component Couldn't Find The You Were Looking For . Try Again </p>
         </div>
      );
      else
      return (
        <section className="github--profile">
          <div className="github--profile__info">
            <a href={data.homeUrl} target="_blank" title={data.name || data.username}><img src={data.avatar} alt={data.username}/></a>
            <h2><a href={data.homeUrl} title={data.username} target="_blank">{data.name || data.username}</a></h2>
            <h3>{data.location || 'I Live In My Mind'}</h3>
          </div>
          <div className="github--profile__state">
            <ul>
               <li>
                  <a href={followers} target="_blank" title="Number Of Followers"><i>{data.followers}</i><span>Followers</span></a>
               </li>
               <li>
                  <a href={repositories} target="_blank" title="Number Of Repositoriy"><i>{data.repos}</i><span>Repositoriy</span></a>
               </li>
               <li>
                  <a href={following} target="_blank" title="Number Of Following"><i>{data.following}</i><span>Following</span></a>
               </li>
            </ul>
          </div>
        </section>
      );
  }
}

export default App;
