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
var TodoItem = React.createClass({displayName: "TodoItem",
  getInitialState: function() {
    return {item: this.props.todo};
  },

  render: function() {
    var model = this.state.item;
    return (
      React.createElement("li", {className: model.done ? 'done' : ''}, 
        React.createElement("input", {id: model.id, type: "checkbox", 
            checked: model.done, 
            onChange: this.props.onToggle}), 
        React.createElement("label", {htmlFor: model.id}, model.text)
      )
    );
  }
});


var TodoApp = React.createClass({displayName: "TodoApp",
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
        React.createElement("header", null, 
          React.createElement("h2", null, "TODO")
        )
    );

    if (todos.length) {
      todoItems = todos.map(function(todo) {
        return (
          React.createElement(TodoItem, {
              key: todo.id, 
              todo: todo, 
              onToggle: this.toggle.bind(this, todo)})
        );
      }, this);
      main = (
        React.createElement("section", {id: "main"}, 
          React.createElement("ul", {className: "todo"}, 
            todoItems
          )
        )
      );
    }

    var footer = (
      React.createElement("div", null, 
        React.createElement("form", {id: "form-submit", 
              className: "pure-form", 
              onSubmit: this.handleSubmit}, 
          React.createElement("input", {id: "newValue", 
                onChange: this.onChange, 
                value: this.state.newEntry, 
                placeholder: "I need do..."}), 
          React.createElement("button", {className: "pure-button pure-button-primary"}, "Add")
        ), 
        React.createElement("button", {className: "pure-button button-error", 
                onClick: this.remove}, "Remove")
      )
    );

    return (
      React.createElement("div", null, 
        header, 
        main, 
        footer
      )
    );
  }
});


function render() {
  React.render(
    React.createElement(TodoApp, {model: app.Todos}),
    document.getElementById('todoapp')
  );
};


render();
