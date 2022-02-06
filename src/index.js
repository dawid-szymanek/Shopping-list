import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import update from 'react-addons-update';

let madeList;
let madeForm;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
      {name: "apple", category: "fruit", amount: '1', bought: false},
      {name: "orange", category: "fruit", amount: '1', bought: false},
      {name: "banana", category: "fruit", amount: '1', bought: false},
      {name: "carrot", category: "vegetable", amount: '1', bought: false},
      {name: "pepper", category: "vegetable", amount: '1', bought: false},
      {name: "cucumber", category: "vegetable", amount: '1', bought: false},
      {name: "milk", category: "dairy", amount: '1', bought: false},
      {name: "cheese", category: "dairy", amount: '1', bought: false},
      {name: "yogurt", category: "dairy", amount: '1', bought: false}],
      fruitShown: true, vegetableShown: true, dairyShown: true
    }
    this.makeList = this.makeList.bind(this);
    this.makeForm = this.makeForm.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
    this.updateBought = this.updateBought.bind(this);
    this.updateFruit = this.updateFruit.bind(this);
    this.updateVegetable = this.updateVegetable.bind(this);
    this.updateDairy = this.updateDairy.bind(this);
  }
  makeList() {
    let temp = [...this.state.list];
    for(let i=0; i<temp.length; i++)
    {
      if(!temp[i].bought)
      {
        temp.splice(i,1);
        i--;
      }
      else if(temp[i].category=="fruit" && !this.state.fruitShown)
      {
        temp.splice(i,1);
        i--;
      }
      else if(temp[i].category=="vegetable" && !this.state.vegetableShown)
      {
        temp.splice(i,1);
        i--;
      }
      else if(temp[i].category=="dairy" && !this.state.dairyShown)
      {
        temp.splice(i,1);
        i--;
      }
    }
    madeList = temp.map((element, index) =>
    <li key={index}>{element.name}, amount: {element.amount}</li>);
    return madeList;
  }
  makeForm() {
    let temp = [...this.state.list];
    madeForm = temp.map((element, index) =>
    <li key={index}>{element.name}, amount: 
    <input type='number' min='1' onChange={(e)=>{this.updateAmount(e, index)}} defaultValue={element.amount}/>, buying: 
    <input type='checkbox' defaultChecked={element.bought} onChange={(e)=>{this.updateBought(e, index)}}/></li>);
    return madeForm;
  }
  updateAmount(e, index) {
    let temps = [...this.state.list];
    let temp = temps[index];
    temp.amount = e.target.value;
    temps[index] = temp;
    this.setState({list: temps});
    console.log(temp);
  }
  updateBought(e, index) {
    let temps = [...this.state.list];
    let temp = temps[index];
    temp.bought = e.target.checked;
    temps[index] = temp;
    this.setState({list: temps});
    console.log(temp);
  }
  updateFruit(e) {
    this.setState({fruitShown: e.target.checked})
  }
  updateVegetable(e) {
    this.setState({vegetableShown: e.target.checked})
  }
  updateDairy(e) {
    this.setState({dairyShown: e.target.checked})
  }
  render() {
    let a = this.makeList();
    let b = this.makeForm();
    return(
      <>
        <form>
          <ul>{b}</ul>
        </form>
        Fruits<input type="checkbox" defaultChecked={this.state.fruitShown} onChange={this.updateFruit}/>&nbsp;
        Vegetables<input type="checkbox" defaultChecked={this.state.vegetableShown} onChange={this.updateVegetable}/>&nbsp;
        Dairy<input type="checkbox" defaultChecked={this.state.dairyShown} onChange={this.updateDairy}/>&nbsp;
        <ul>{a}</ul>
      </>
    );
  }
}

ReactDOM.render(
  <List />,
  document.getElementById('root')
);

reportWebVitals();
