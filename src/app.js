'use strict';

var app = app || {};


/* Models */
app.TodoModel = function(opts) {
  this.text = !!opts ? opts.text : '';
  this.done = !!opts ? opts.done : false;
};


app.Todos = Array;


/* Views */
var TodoItem = React.createClass({
  getInitialState: function() {
    return {item:  this.props, done: 0};
  },

  render: function() {
    function counter() {
      var x = 0;
      return function() {
        return x++;
      };
    }
    var counter = counter();
    var createItem = function(model) {
      var id = 'todo-input' + counter();
      return (
      <li>
        <input id={id} type="checkbox"
               checked={model.done}
               onChange={this.props.onToggle}/>
        <label htmlFor={id}>{model.text}</label>
      </li>);
    };
  }
});

var TodoList = React.createClass({
  getInitialState: function() {
    return {items: this.props.items, done: 0};
  },

  render: function() {
    var createItem = function(model) {
      var id = 'todo-input' + counter();
      return (
      <li>
        <input id={id} type="checkbox"
               checked={model.done}
               onChange={this.props.onToggle}/>
        <label htmlFor={id}>{model.text}</label>
      </li>);
    };
    return <ul className="todo">{this.props.items.map(createItem, this)}</ul>;
  }
});


var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: new this.props.model(), newEntry: '', done: 0};
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var newEntry = this.state.newEntry;
    this.setState({
      items: this.state.items.concat([new app.TodoModel({text: newEntry})]),
      newEntry: ''
    });
  },

  onChange: function(e) {
    this.setState({
      newEntry: e.target.value
    });
  },

  toggle: function() {
    this.done = this.state.items.reduce(function(acc, todo) {
      todo.done ? acc : acc++;
    }, 0);
  },

  render: function() {
    var main;
    var todos = this.state.items;

    var header = (
      <div>
        <header>
          <h1>TODO {this.state.done}</h1>
        </header>
      </div>
    );

    if (todos.length) {
      main = (
        <section id="main">
          <TodoList items={todos} onToggle={this.toggle.bind(this)}/>
        </section>
      );
    }

    var footer = (
      <form onSubmit={this.handleSubmit} id="form-submit" className="pure-form">
        <input id="newValue"
               onChange={this.onChange}
               value={this.state.newEntry}
               placeholder="I need do..."
        />
        <button className="pure-button pure-button-primary">Add</button>
      </form>
    );

    return (
      <div>
        {header}
        {main}
        {footer}
      </div>
    );
  }
});


function render() {
  React.render(
    <TodoApp model={app.Todos} />,
    document.getElementById('todoapp')
  );
};


render();
