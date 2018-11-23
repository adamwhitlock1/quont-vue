<template>
  <div class="hello">
    <div :class="[modalActive ? 'modal is-active' : 'modal']">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Welcome back to quon't.</p>
        </header>
        <section class="modal-card-body">
          <h2 class="title">
            We have found existing quotes from the past that you have saved.
            Would you like to load these quotes or start with new, fresh quotes?
          </h2>
        </section>
        <footer class="modal-card-foot">
          <button @click="loadSavedQuotes" class="button is-success">
            Load em up
          </button>
          <button @click="loadFreshies" class="button">
            Start with freshies
          </button>
        </footer>
      </div>
    </div>

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
          :options="{ group: 'projects', delay: 50 }"
          @start="drag = true;"
          @end="drag = false;"
          class="group-1"
        >
          <div
            v-for="(item, index) in items"
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
                    <div
                      @click="editTodo(index);"
                      v-if="editing == 0 || editing != index + 1"
                    >
                      {{ item.text }}
                    </div>
                    <form
                      v-if="editing == index + 1"
                      @submit.prevent="commitEdit(index);"
                    >
                      <div class="columns">
                        <div class="column">
                          <textarea v-model="editText" class="textarea" />
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
      <div class="container">
        <div class="column is-4 is-offset-8">
          <button @click="loadFreshies" class="button is-danger">
            Delete all your quotes and get 3 new quotes.
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import moment from "moment";

export default {
  name: "HelloWorld",

  watch: {
    items: function(newVal, oldVal) {
      console.log(`\n New Items \n `);
      console.log(newVal);
      console.log("-----------------------------");
      this.$vf.setItem("quotes", this.items);
    }
  },

  mounted() {
    this.$vf.config({
      name: "vue-forage"
    });

    this.$vf
      .getItem("quotes")
      .then(value => {
        // This code runs once the value has been loaded
        // from the offline store.
        console.log(value);
        if (value === null) {
          console.log("No local storage entries present");
        } else {
          this.modalActive = true;
        }
      })
      .catch(err => {
        // This code runs if there were any errors
        console.log(err);
      });

    // this.$vf.setItem("app", "Vue Forage");
  },

  components: {
    draggable
  },
  data() {
    return {
      items: [],
      newAuthor: "",
      newCat: "",
      newText: "",
      editText: "",
      editing: 0,
      addingTodo: false,
      quoteLoading: true,
      modalActive: false
    };
  },

  methods: {
    openLoadQuotesModal() {
      this.$modal.show("load-quotes-modal");
    },

    loadFreshies() {
      this.items = [];
      for (let i = 0; i < 3; i++) {
        this.$http.get("https://talaikis.com/api/quotes/random/").then(
          response => {
            // get body data
            let quote = {
              text: response.body.quote,
              author: response.body.author,
              cat: response.body.cat,
              date: moment().format("MMMM Do YYYY, h:mm:ss a")
            };

            this.items.push(quote);
          },
          response => {
            // error callback
          }
        );
      }
      this.$vf.setItem("quotes", this.items);
      this.modalActive = false;
    },

    loadSavedQuotes() {
      console.log("Loading saved quotes");
      this.$vf
        .getItem("quotes")
        .then(value => {
          // This code runs once the value has been loaded
          // from the offline store.
          console.log(value);
          if (value === null) {
            console.log("No local storage entries present");
          } else {
            this.items = value;
          }
        })
        .catch(err => {
          // This code runs if there were any errors
          console.log(err);
        });

      this.modalActive = false;
    },

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
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
        author: this.newAuthor,
        cat: this.newCat
      });
      this.$vf.setItem("quotes", this.items);
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
      console.log(index);

      this.items.splice(index, 1);
      this.$vf.setItem("quotes", this.items);
    },
    editTodo(index) {
      this.editing = this.editing === 0 ? index + 1 : 0;
      this.editText = this.items[index].text;
    },
    commitEdit(index) {
      this.items[index].text = this.editText;
      this.editText = "";
      this.editing = 0;
      this.$vf.setItem("quotes", this.items);
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
