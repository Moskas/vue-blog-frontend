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
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>

  <main>
    <center>
      <h2 :class="titleClass">Testing</h2>
      <p>Count is: {{ counter.count }}</p>
      <button @click="counter.count++">Click me</button>
      <br />
      <input :value="text" @input="onInput" />
      <p :class="titleClass">{{ text }}</p>
      <button @click="toggle">Editor?</button>
      <p v-if="editor">Emacs!</p>
      <p v-else>Vim :(</p>
    </center>
  </main>
</template>

<style scoped>
* {
  font-family: 'Iosevka Nerd Font';
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
