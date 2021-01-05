import React from "react";
import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: []
    };
  }

   componentMount() {
    this.reload();
    window.addEventListener(
      "beforeunload",
      this.save.bind(this)
    );
  }

  componentUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.save.bind(this)
    );
    this.save();
  }

  reload() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  save() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    this.setState({ [key]: value });
  }

  addItem() {
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
 
    };
    const list = [...this.state.list];
    list.push(newItem);
    this.setState({
      list,
      newItem: ""
    });
  }

  deleteItem(id) {
    const list = [...this.state.list];
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }
  
  render() {
    return (
      <div>
      <h1 className="app-title">Tasks for the Day!</h1>
        <div className="container">
        <div
          style={{
            padding: 30,
            textAlign: "left",
            maxWidth: 500,
            margin: "auto"
          }}
        >
          <span
            style={{
                color:"white",
            padding: 10,
            textAlign: "center",
            maxWidth: 500,
            margin: "auto"
          }}>
            Create your Schedule!
          </span>
          <br />
          <input
            type="text"
            placeholder="Type item here"
            value={this.state.newItem}
            style={{
                height:"20px",
                borderRadius:"6px"
          }}
            onChange={e => this.updateInput("newItem", e.target.value)}
          />
          <span id="buttonup">
            <button
            className="add-btn btn-floating"
            onClick={() => this.addItem()}
            disabled={!this.state.newItem.length}
          >
            <span class="material-icons">
                  note_add
                    </span>
          </button>
          </span>
          
          <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>
                  {item.value}
                  <span
                  style={{
                    align:"right"
                  }}>
                    <button className="btn btn-floating" onClick={() => this.deleteItem(item.id)}>
                    x
                  </button>
                  </span>
                 
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      </div>
    );
  }
}

export default App