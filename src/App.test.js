import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render( <App /> , div);
});

it('renders welcome message', () => {
  const wrapper = shallow(<App />)
   .findWhere(n => n.hasClass('header-message'));
  const welcome = <h2 className="header-message">Welcome to Github-card</h2>;
  // expect(wrapper.contains(welcome)).to.equal(true);
  expect(wrapper.contains(welcome)).toEqual(true);
});


it('renders the SearchBox', () => {
  const wrapper = shallow(<App />)
 .findWhere(n => n.hasClass('search--box'));   
});

