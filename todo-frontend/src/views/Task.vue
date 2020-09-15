<template>
  <div class="row">
    <div v-if="dataReady" class="col s6 offset-s3">
      <h1>{{ currentTask.title }}</h1>

      <form>
        <div class="input-field">
          <textarea
            style="min-height: 150px"
            v-model="currentTask.description"
            id="description"
            class="materialize-textarea"
          ></textarea>
          <label for="description" class="active">Description</label>
          <span
            class="character-counter"
            style="float: right; font-size: 12px;"
          >{{ currentTask.description.length }}/2048</span>
        </div>

        <div v-if="currentTask.status !== 'completed'">
          <button @click="updateTask" class="btn" style="margin-right: 1rem;">Update</button>
          <button @click="completeTask" class="btn blue" type="button">Complete Task</button>
        </div>
        <div v-else>
          <button @click="deleteTask" class="btn red" type="button">Delete Task</button>
        </div>
      </form>
    </div>
    <h4 v-else>{{ `Task with id: ` + this.$route.params.id + ` not found`}}</h4>
  </div>
</template>

<script>
import { server } from "../utils/helper";
import axios from "axios";
export default {
  name: "task",
  data: () => ({
    dataReady: false,
    currentTask: null,
    message: "",
  }),

  methods: {
    async getTodo(id) {
      await axios.get(`${server.baseURL}/todo/${id}`).then((response) => {
        this.currentTask = JSON.parse(JSON.stringify(response.data));
      });
      this.dataReady = true;
      this.currentTask.chips = M.Chips.init(this.$refs.chips, {
        placeholder: "Add tags :)",
        data: this.currentTask.tags,
      });
    },

    completeTask() {
      var todoData = {
        _id: this.currentTask._id,
        title: this.currentTask.title,
        description: this.currentTask.description,
        status: "completed",
        tags: this.currentTask.tags,
        date: this.currentTask.date,
      };

      axios
        .put(`${server.baseURL}/edit?todoID=${this.currentTask._id}`, todoData)
        .then((data) => {
          this.$router.push("/list");
        });
    },

    updateTask() {
      axios
        .put(
          `${server.baseURL}/edit?todoID=${this.currentTask._id}`,
          this.currentTask
        )
        .then((response) => {
          this.$router.push("/list");
        });
    },

    deleteTask() {
      console.log("task deleted now");
    },
  },

  created() {
    this.tags = M.Chips.init(this.$refs.chips, {
      placeholder: "Add tags :)",
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(),
      setDefaultDate: true,
    });
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },

  mounted() {
    (this.message = ""), this.getTodo(this.$route.params.id);
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

<style></style>
