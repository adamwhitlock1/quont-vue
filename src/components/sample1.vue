<template>
  <div class="hello">
    <section class="section">
      <div class="container">
        <h1 class="title">Todon't</h1>
        <form @submit.prevent="addTodo">
          <input
            type="text"
            class="input"
            placeholder="add an item"
            v-model="newText"
          />
          <button class="button is-link">Add</button>
        </form>
        <hr />
        <ul v-for="(item, index) in items" v-bind:key="item.id">
          <li>
            ID: {{ index + 1 }}<br />
            Text: {{ item.text }}<br />
            Date Added: {{ item.date }}<br />
            <form
              v-if="editing == index + 1"
              @submit.prevent="commitEdit(index);"
            >
              <input v-model="editText" class="input is-small" />
              <button class="button is-small is-primary">Save</button>
            </form>

            <button @click="editTodo(index);" class="button is-small is-info">
              Edit
            </button>
            <button
              @click="removeTodo(index);"
              class="button is-small is-warning"
            >
              Remove
            </button>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      items: [
        {
          text: "test text",
          date: new Date()
        }
      ],
      newText: "",
      editText: "",
      editing: 0
    };
  },

  methods: {
    addTodo() {
      this.items.push({ text: this.newText, date: new Date() });
      this.newText = "";
    },
    removeTodo(index) {
      this.items.splice(index, 1);
    },
    editTodo(index) {
      this.editing = index + 1;
      this.editText = this.items[index].text;
    },
    commitEdit(index) {
      this.items[index].text = this.editText;
      this.editText = "";
      this.editing = 0;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
