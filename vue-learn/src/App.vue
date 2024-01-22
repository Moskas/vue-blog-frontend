<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import OtherComponent from './OtherComponent.vue'
import BlogList from './BlogList.vue';

const counter = reactive({ count: 0 })
const titleClass = ref('test')

const text = ref('')
function onInput(e) {
  text.value = e.target.value
}

const editor = ref(true)
function toggle() {
  editor.value = !editor.value
}

let id = 0
const newTodo = ref('')
const hideCompleted = ref(false)
const todos = ref([
  { id: id++, text: 'Get trough the Vue tutorial', done: true },
  { id: id++, text: 'Learn Vue', done: false },
  { id: id++, text: 'Transplant existing blog structure to Vue', done: false },
])

function addTodo() {
  if (newTodo.value != "") {
    todos.value.push({ id: id++, text: newTodo.value, done: false })
    newTodo.value = ''
  }
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo)
}

/* Step 9 */
const pElementRef = ref(null)

onMounted(() => {
  pElementRef.value.textContent = 'DOM mounted!'
})

/* Step 10 */
/* Async data fetching using fetch and watch */
const todoId = ref(1)
const todoData = ref(null)

async function fetchData() {
  todoData.value = null
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  todoData.value = await res.json()
}

fetchData()
watch(todoId, fetchData)
/* Step 12 */
const greeting = ref('Hello from parent')
/* Step 13 */
const childMsg = ref('Nothing')
</script>

<template>
  <header>
    <span class="logo">Moskas' Website</span>
    <a href="index.html">Home</a><a href="blog.html">Blog</a>
    <a href="about.html">About Me</a><a href="projects.html">Projects</a><a href="cats.html">Cats</a>
    <a href="vsrg.html">Rhythm games</a>
  </header>

  <main>
    <p ref="pElementRef">Hi</p>
    <h2 :class="titleClass">Testing</h2>
    <p>Count is: {{ counter.count }}</p>
    <button @click="counter.count++">+</button>
    <button @click="counter.count--">-</button>
    <input :value="text" @input="onInput" />
    <p :class="titleClass">{{ text }}</p>
    <button @click="toggle">Editor?</button>
    <p v-if="editor">Emacs :)</p>
    <p v-else>Vim :(</p>
    <p>
    <h1>Todo-list</h1>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo">
      <button>Add Todo</button>
    </form>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.done">
        <span :class="{ done: todo.done }"> {{ todo.text }} </span>
        <button @click="removeTodo(todo)">X</button>
      </li>
    </ul>
    </p>
    <p>Todo id: {{ todoId }}</p>
    <button @click="todoId++" :disabled="!todoData">Fetch next todo</button>
    <p v-if="!todoData">Loading...</p>
    <pre v-else>{{ todoData }}</pre>
    <OtherComponent :msg="greeting" @response="(msg) => childMsg = msg">{{ msg }}</OtherComponent>
    <p>{{ childMsg }}</p>

    <BlogList></BlogList>
  </main>
</template>

<style scoped>
* {
  font-family: 'JetBrainsMono Nerd Font';
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.test {
  color: #ebdbb2;
}

.done {
  text-decoration: line-through;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
