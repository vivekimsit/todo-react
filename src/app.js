'use strict';
var app = app || {};


/* Models */
app.TodoModel = function(opts) {
  this.description = !!opts ? opts.description : '';
  this.done = !!opts ? opts.done : false;
};


app.TodoList = Array;


/* View model */
app.TodoVM = (function(){
  var vm = {};
  vm.init = function() {
    vm.list = new todo.TodoList();

    vm.description = '';

    vm.add = function() {
      if (vm.description) {
        vm.list.push(new app.Todo({description: vm.description}));
        vm.description = '';
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
var TodoList = React.createClass({});


var TodoApp = React.creatClass({
  getInitialState: function() {
    var vm = vm.init();
    return {items: vm.list, newItem: vm.description};
  },
  handleSubmit: function() {},
  render: function() {
    

    return ;
  }
});


function render() {
  React.render(
    <TodoApp model={model}/>,
    document.getElementById('todoapp');
  );
};


render();
