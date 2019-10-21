// Declarative Rendering
var app = new Vue({ 
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
      message: 'You loaded this page on ' + new Date().toLocaleString()
    }
})

// Conditionals and Loops
var app3 = new Vue({
    el: '#app-3',
    data: {
      seen: true
    }
})

var app4 = new Vue({
    el: '#app-4',
    data: {
      todos: [
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue' },
        { text: 'Build something awesome' }
      ]
    }
})

// Handling User Input
var app5 = new Vue({
    el: '#app-5',
    data: {
      message: 'Hello Vue.js!'
    },
    methods: {
      reverseMessage: function () {
        this.message = this.message.split('').reverse().join('')
      }
    }
})

var app6 = new Vue({
    el: '#app-6',
    data: {
      message: 'Hello Vue!'
    }
})

// Composing with Components
Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})
  
var app7 = new Vue({
    el: '#app-7',
    data: {
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ]
    }
})

// Computed Properties and Watchers
var app8 = new Vue({
    el: '#app-8',
    data: {
      message: 'Hello'
    },
    methods: {
        reverseMessageMethod: function () {
            console.log('run reverseMessageMethod');
            return this.message.split('').reverse().join('')
        }
    },
    computed: {
        // a computed getter
        reversedMessage: function () {
            console.log('run reversedMessage');
            // `this` points to the vm instance
            return this.message.split('').reverse().join('')
        }
    }
})

// Watchers 
var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
      question: '',
      answer: 'I cannot give you an answer until you ask a question!'
    },
    watch: {
      // whenever question changes, this function will run
      question: function (newQuestion, oldQuestion) {
        this.answer = 'Waiting for you to stop typing...'
        this.debouncedGetAnswer()
      }
    },
    created: function () {
      // _.debounce is a function provided by lodash to limit how
      // often a particularly expensive operation can be run.
      // In this case, we want to limit how often we access
      // yesno.wtf/api, waiting until the user has completely
      // finished typing before making the ajax request. To learn
      // more about the _.debounce function (and its cousin
      // _.throttle), visit: https://lodash.com/docs#debounce
      this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
    },
    methods: {
      getAnswer: function () {
        if (this.question.indexOf('?') === -1) {
          this.answer = 'Questions usually contain a question mark. ;-)'
          return
        }
        this.answer = 'Thinking...'
        var vm = this
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer)
          })
          .catch(function (error) {
            vm.answer = 'Error! Could not reach the API. ' + error
          })
      }
    }
})

// Conditional Rendering
var conditionalRendering = new Vue({
  el: "#conditional-rendering",
  data: {
    random: 0
  }
})

// Control reusable elements
var reusableElements = new Vue({
  el: "#control-reusable-elements",
  data: {
    loginType: "username"
  },
  methods: {
    toggle: function(evt) {
      console.log("toggle", evt);
      this.loginType = this.loginType === "username" ? "email" : "username"
    }
  }
})

// v-for with a component 
Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Remove</button>\
    </li>\
  ',
  props: ['title']
})

new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    todos: [
      {
        id: 1,
        title: 'Do the dishes',
      },
      {
        id: 2,
        title: 'Take out the trash',
      },
      {
        id: 3,
        title: 'Mow the lawn'
      }
    ],
    nextTodoId: 4
  },
  methods: {
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})

// Event Handling
new Vue({
  el: "#listening-to-events",
  data: {
    counter: 0
  }
})

var exampleMethodEventHandlers = new Vue({
  el: '#method-event-handlers',
  data: {
    name: 'Vue.js'
  },
  // define methods under the `methods` object
  methods: {
    greet: function (event) {
      // `this` inside methods points to the Vue instance
      alert('Hello ' + this.name + '!')
      // `event` is the native DOM event
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
})

// you can invoke methods in JavaScript too
// exampleMethodEventHandlers.greet() // => 'Hello Vue.js!'

new Vue({
  el: '#method-in-event-handlers',
  methods: {
    say: function (message) {
      alert(message)
    },
    warn: function (message, event) {
      // now we have access to the native event
      if (event) event.preventDefault()
      alert(message)
    }
  }
})

new Vue({
  el: "#event-modifiers",
  methods: {
    doThat: function (event) {
      console.log(event);
      if (event) {
        alert(event.target.innerHTML)
      }
    },
    doThis: function (event) {
      console.log(event);
      if (event) {
        alert(event.target.innerHTML)
      }
    },
    onSubmit: function(event) {
      var data = serialize(event.target);
      // var data = $(event.target).serialize();
      console.log(data);
    },
    onEnter: function(event) {
      console.log(event);
      if (event) {
        alert(event.target.value)
      }
    }
  }
})

// Component Basics
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button v-on:click="$emit('enlarge-text', 0.1)">
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `
})
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
new Vue({
  el: '#blog-post',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ],
    postFontSize: 1,
    searchText: "Hello"
  }
})


// Content Distribution with Slots
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
new Vue({el: "#slots-demo"})

