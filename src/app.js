'use strict';

var app = app || {};


/* Models */
app.TodoCounter = 0;

app.TodoModel = function(opts) {
  var opts = opts || {};
  this.text = !!opts.text ? opts.text : '';
  this.done = !!opts.done ? opts.done : false;
  this.id = app.TodoCounter++;
};

app.Todos = Array;


/* Views */
var TodoItem = React.createClass({
  getInitialState: function() {
    return {item: this.props.todo};
  },

  render: function() {
    var model = this.state.item;
    return (
      <li className={model.done ? 'done' : ''}>
        <input id={model.id} type="checkbox"
            checked={model.done}
            onChange={this.props.onToggle}/>
        <label htmlFor={model.id}>{model.text}</label>
      </li>
    );
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

  toggle: function(todo) {
    todo.done = todo.done ? false : true;
    this.setState({
      done: this.state.items.reduce(function(accum, todo) {
        return todo.done ? accum + 1 : accum;
      }, 0)
    });
  },

  remove: function() {
    this.setState({
      items: this.state.items.filter(function(todo) {
        return !todo.done;
      })
    });
  },

  render: function() {
    var main, todoItems;
    var todos = this.state.items;

    var header = (
        <header>
          <h2>TODO</h2>
        </header>
    );

    if (todos.length) {
      todoItems = todos.map(function(todo) {
        return (
          <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={this.toggle.bind(this, todo)}/>
        );
      }, this);
      main = (
        <section id="main">
          <ul className="todo">
            {todoItems}
          </ul>
        </section>
      );
    }

    var footer = (
      <div>
        <form id="form-submit"
              className="pure-form"
              onSubmit={this.handleSubmit}>
          <input id="newValue"
                onChange={this.onChange}
                value={this.state.newEntry}
                placeholder="I need do..."/>
          <button className="pure-button pure-button-primary">Add</button>
        </form>
        <button className="pure-button button-error"
                onClick={this.remove}>Remove</button>
      </div>
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
