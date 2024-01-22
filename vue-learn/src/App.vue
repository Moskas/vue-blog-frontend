<script setup>
import { reactive, ref } from 'vue'

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
const todos = ref([{ id: id++, text: 'Learn Vue', done: false}])

function addTodo() {
  if (newTodo.value != "") {
  todos.value.push({ id: id++, text: newTodo.value, done: false})
  newTodo.value = ''
  }
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo)
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/nix.webp" width="125" height="125" />
  </header>

  <main>
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
            <span :class="{ done: todo.done }">{{ todo.text }} </span>
            <button @click="removeTodo(todo)">X</button>
          </li>
        </ul>
      </p>
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
