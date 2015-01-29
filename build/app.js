'use strict';

var app = app || {};


/* Models */
app.TodoModel = function(opts) {
  this.text = !!opts ? opts.text : '';
  this.done = !!opts ? opts.done : false;
};


app.TodoList = Array;


/* View model */
app.TodoVM = (function(){
  var vm = {};
  vm.init = function() {
    vm.list = new app.TodoList();

    vm.newEntry = '';

    vm.add = function() {
      if (vm.newEntry) {
        vm.list.push(new app.Todo({text: vm.newEntry}));
        vm.newEntry = '';
      }
    };

    vm.remove = function() {
      vm.list = vm.list.filter(function(task) {
        return !task.done;
      });
    }
  }
  return vm;
}());


/* Views */
var TodoList = React.createClass({displayName: "TodoList",
  render: function() {
    var createItem = function(text) {
      return React.createElement("li", null, text);
    };
    return React.createElement("ul", null, this.props.items.map(createItem));
  }
});


var TodoApp = React.createClass({displayName: "TodoApp",
  getInitialState: function() {
    console.log(this.props);
    var model = this.props.model;
    model.init();
    return {items: model.list, newEntry: model.newEntry};
  },

  handleKeyDown: function(e) {
    if (e.which === 1) {
      return;
    }

    e.preventDefault();
    this.setState({
      items: this.state.items.add(),
      newEntry: ''
    });
  },

  onChange: function() {
    console.log('In onchange');
  },

  render: function() {
    var main;
    var todos = this.state.items;

    var header = (
      React.createElement("div", null, 
        React.createElement("header", null, 
          React.createElement("h1", null, "TODO")
        )
      )
    );

    if (todos.length) {
      main = (
        React.createElement("section", {id: "main"}, 
          React.createElement(TodoList, {items: todos})
        )
      );
    }

    var footer = (
      React.createElement("form", {onSubmit: this.handleSubmit, id: "form-submit"}, 
        React.createElement("input", {id: "newValue", 
               onChange: this.onChange, 
               value: this.state.newEntry, 
               placeholder: "I need do..."}
        ), 
        React.createElement("button", null, "Add")
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
    React.createElement(TodoApp, {model: app.TodoVM}),
    document.getElementById('todoapp')
  );
};


render();
