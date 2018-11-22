<template>
  <div class="hello">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h1 class="title">Quon't - Save your quotes</h1>
        </div>
        <div class="column is-narrow">
          <span @click="newTodo" class="icon has-text-success add-todo">
            <i
              :class="[
                addingTodo ? 'fa-minus-circle' : 'fa-plus-circle',
                'fas fa-2x'
              ]"
            ></i>
          </span>
        </div>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div v-if="addingTodo">
          <h1 class="title">Add a quote.</h1>
          <h2 class="subtitle">or wait for a random quote</h2>
          <form @submit.prevent="addTodo">
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label for="title" class="label">Author</label>
                  <input
                    name="title"
                    type="text"
                    class="input is-primary"
                    placeholder="some sweet author name"
                    v-model="newAuthor"
                  />
                </div>
              </div>
              <div class="column">
                <div class="field">
                  <label for="title" class="label">Category</label>
                  <input
                    name="title"
                    type="text"
                    class="input is-primary"
                    placeholder="some sweet category"
                    v-model="newCat"
                  />
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div class="field">
                  <label for="todo-text" class="label">Quote</label>
                  <div
                    :class="[quoteLoading ? 'control is-loading' : 'control']"
                  >
                    <textarea
                      v-model="newText"
                      class="textarea is-primary"
                      placeholder="Loading random quote... please wait"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column is-offset-11 is-1">
                <button class="button is-link">Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="container">
        <draggable
          v-model="items"
          :options="{ group: 'projects', delay: 150 }"
          @start="drag = true;"
          @end="drag = false;"
          class="group-1"
        >
          <div
            v-for="(item, index) in items.slice().reverse()"
            v-bind:key="item.id"
            class="the-item"
          >
            <article class="message is-info">
              <div class="message-header">
                {{ index + 1 }}
                <button @click="removeTodo(index);" class="delete"></button>
              </div>
              <div class="message-body">
                <div class="columns">
                  <div class="column is-1">
                    <i class="fas fa-arrows-alt-v fa-lg"></i>
                  </div>
                  <div class="column">
                    <div v-if="editing == 0 || editing != index + 1">
                      {{ item.text }}
                    </div>
                    <form
                      v-if="editing == index + 1"
                      @submit.prevent="commitEdit(index);"
                    >
                      <div class="columns">
                        <div class="column">
                          <textarea v-model="editText" class="input" />
                        </div>
                        <div class="column is-narrow">
                          <button class="button is-small is-primary">
                            save
                          </button>
                        </div>
                        <div class="column is-narrow">
                          <button
                            @click="cancelEdit"
                            class="button is-small is-warning"
                          >
                            cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="column is-1">
                    <button
                      @click="editTodo(index);"
                      class="button is-small is-white edit-button"
                    >
                      <i class="fas fa-pencil-alt fa-lg is-light"></i>
                    </button>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <span class="tag is-light"
                      >Date Added: {{ item.date }}</span
                    >
                  </div>

                  <div class="column is-narrow">
                    <div class="field is-grouped is-grouped-multiline">
                      <div class="control">
                        <div class="tags has-addons">
                          <span class="tag is-dark">{{ item.author }}</span>
                          <span class="tag is-info">{{ item.cat }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </draggable>
      </div>
    </section>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import moment from "moment";
export default {
  name: "HelloWorld",
  components: {
    draggable
  },
  data() {
    return {
      items: [
        {
          text: "test text a",
          author: "Some Author",
          cat: "A category",
          date: moment().format("MMMM Do YYYY, h:mm:ss a")
        },
        {
          text: "test text b",
          author: "Some Author",
          cat: "A category",
          date: moment().format("MMMM Do YYYY, h:mm:ss a")
        },
        {
          text: "test text c",
          author: "Some Author",
          cat: "A category",
          date: moment().format("MMMM Do YYYY, h:mm:ss a")
        }
      ],
      items2: [],
      newAuthor: "",
      newCat: "",
      newText: "",
      editText: "",
      editing: 0,
      addingTodo: false,
      quoteLoading: true
    };
  },

  methods: {
    newTodo() {
      this.addingTodo = this.addingTodo === true ? false : true;
      if (this.addingTodo === true) {
        this.$http.get("https://talaikis.com/api/quotes/random/").then(
          response => {
            // get body data
            this.newText = response.body.quote;
            this.newAuthor = response.body.author;
            this.newCat = response.body.cat;
            this.quoteLoading = false;
          },
          response => {
            // error callback
          }
        );
      }
    },
    addTodo() {
      this.items.push({
        text: this.newText,
        date: new Date(),
        author: this.newAuthor,
        cat: this.newCat
      });
      this.quoteLoading = true;
      this.$http.get("https://talaikis.com/api/quotes/random/").then(
        response => {
          // get body data
          this.newText = response.body.quote;
          this.newAuthor = response.body.author;
          this.newCat = response.body.cat;
          this.quoteLoading = false;
        },
        response => {
          // error callback
        }
      );
    },
    removeTodo(index) {
      this.items.splice(index, 1);
    },
    editTodo(index) {
      this.editing = this.editing === 0 ? index + 1 : 0;
      this.editText = this.items[index].text;
    },
    commitEdit(index) {
      this.items[index].text = this.editText;
      this.editText = "";
      this.editing = 0;
    },
    cancelEdit() {
      this.editing = 0;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.group-1,
.group-2 {
  border: dotted 2px gray;
  margin: 10px;
  padding: 15px;
  border-radius: 10px;
}
h1,
h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}

.the-item {
  padding: 10px;
}

.sortable-chosen {
  padding: 30px;
}

.sortable-ghost {
  padding: 30px;
  border-radius: 10px;
  animation-name: color;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

.sortable-drag {
  padding: 30px;
}

.the-item .fa-arrows-alt-v,
.the-item .edit-button {
  opacity: 0;
  transition: 0.4s;
}

.the-item:hover .fa-arrows-alt-v,
.the-item:hover .edit-button {
  opacity: 1;
}

@keyframes color {
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #31cf65;
  }
  100 {
    background-color: #fff;
  }
}
</style>
