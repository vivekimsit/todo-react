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
var TodoList = React.createClass({
  render: function() {
    var createItem = function(text) {
      return <li>{text}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});


var TodoApp = React.createClass({
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
      <div>
        <header>
          <h1>TODO</h1>
        </header>
      </div>
    );

    if (todos.length) {
      main = (
        <section id="main">
          <TodoList items={todos}/>
        </section>
      );
    }

    var footer = (
      <form onSubmit={this.handleSubmit} id="form-submit">
        <input id="newValue"
               onChange={this.onChange}
               value={this.state.newEntry}
               placeholder="I need do..."
        />
        <button>Add</button>
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
    <TodoApp model={app.TodoVM} />,
    document.getElementById('todoapp')
  );
};


render();
