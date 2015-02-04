'use strict';

var app = app || {};


/* Models */
app.TodoModel = function(opts) {
  this.text = !!opts ? opts.text : '';
  this.done = !!opts ? opts.done : false;
};


app.Todos = Array;


/* Views */
var TodoItem = React.createClass({displayName: "TodoItem",
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
      React.createElement("li", null, 
        React.createElement("input", {id: id, type: "checkbox", 
               checked: model.done, 
               onChange: this.props.onToggle}), 
        React.createElement("label", {htmlFor: id}, model.text)
      ));
    };
  }
});

var TodoList = React.createClass({displayName: "TodoList",
  getInitialState: function() {
    return {items: this.props.items, done: 0};
  },

  render: function() {
    var createItem = function(model) {
      var id = 'todo-input' + counter();
      return (
      React.createElement("li", null, 
        React.createElement("input", {id: id, type: "checkbox", 
               checked: model.done, 
               onChange: this.props.onToggle}), 
        React.createElement("label", {htmlFor: id}, model.text)
      ));
    };
    return React.createElement("ul", {className: "todo"}, this.props.items.map(createItem, this));
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

  toggle: function() {
    this.done = this.state.items.reduce(function(acc, todo) {
      todo.done ? acc : acc++;
    }, 0);
  },

  render: function() {
    var main;
    var todos = this.state.items;

    var header = (
      React.createElement("div", null, 
        React.createElement("header", null, 
          React.createElement("h1", null, "TODO ", this.state.done)
        )
      )
    );

    if (todos.length) {
      main = (
        React.createElement("section", {id: "main"}, 
          React.createElement(TodoList, {items: todos, onToggle: this.toggle.bind(this)})
        )
      );
    }

    var footer = (
      React.createElement("form", {onSubmit: this.handleSubmit, id: "form-submit", className: "pure-form"}, 
        React.createElement("input", {id: "newValue", 
               onChange: this.onChange, 
               value: this.state.newEntry, 
               placeholder: "I need do..."}
        ), 
        React.createElement("button", {className: "pure-button pure-button-primary"}, "Add")
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
