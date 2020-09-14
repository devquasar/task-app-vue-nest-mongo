<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Create Task</h1>
      <form id="create-todo-form" @submit.prevent="submitHandler">
        <div class="input-field">
          <input v-model="title" id="title" type="text" class="validate" required />
          <label for="title">Title</label>
          <span class="helper-text" data-error="Title is required"></span>
        </div>

        <div class="chips mb-4" ref="chips"></div>
        <div class="input-field">
          <textarea v-model="description" id="description" class="materialize-textarea"></textarea>
          <label for="description">Description</label>
          <span
            class="character-counter"
            style="float: right; font-size: 12px;"
          >{{ description.length }}/2048</span>
        </div>

        <input type="text" ref="datepicker" />
        <button class="btn" type="submit">Create Task</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../utils/helper";
export default {
  name: "create",

  data: () => ({
    description: "",
    title: "",
    chips: null,
    date: null,
  }),

  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "Add tags :)",
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(),
      setDefaultDate: true,
    });
  },

  methods: {
    submitHandler() {
      const task = {
        _id: Date.now(),
        title: this.title,
        description: this.description,
        status: "active",
        tags: this.chips.chipsData,
        date: this.date.date,
      };
      this.__submitToServer(task);
      this.$router.push("/list");
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/todo`, data);
    },
  },

  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy();
    }

    if (this.chips && this.chips.destroy) {
      this.chips.destroy();
    }
  },
};
</script>
