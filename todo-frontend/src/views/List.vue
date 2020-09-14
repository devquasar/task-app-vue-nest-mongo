<template>
  <div>
    <h1>List</h1>
    <div class="row">
      <div class="input-field s6 col">
        <select ref="select" v-model="filter">
          <option value disabled selected>Choose your option</option>
          <option value="active">Active</option>
          <option value="outdated">Outdated</option>
          <option value="completed">Completed</option>
        </select>
        <label>Status filter</label>
      </div>
    </div>
    <button v-if="filter" class="btn btn-small red" @click="filter = null">Clear filter</button>

    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Date</th>
          <th>Description</th>
          <th>Status</th>
          <th>Open</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(task, idx) of displayTasks" :key="task.id">
          <td>{{idx + 1}}</td>
          <td>{{task.title}}</td>
          <td>{{ new Date(task.date).toLocaleDateString() }}</td>
          <td class="description-parent">
            <div class="description">{{task.description}}</div>
          </td>
          <td>{{task.status}}</td>
          <td>
            <router-link tag="button" class="btn btn-small" :to="'/task/' + task._id">Open</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No tasks</p>
  </div>
</template>

<script>
import { server } from "@/utils/helper";
import axios from "axios";

export default {
  data: () => ({
    filter: null,
    tasks: [],
  }),

  computed: {
    displayTasks() {
      return this.tasks.filter((t) => {
        if (!this.filter) {
          return true;
        }
        return t.status === this.filter;
      });
    },
  },

  methods: {
    fetchTodo() {
      axios
        .get(`${server.baseURL}/todos`)
        .then((data) => (this.tasks = data.data));
    },
  },

  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    this.fetchTodo();
  },
};
</script>

<style lang="scss" scoped>
.description {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.description-parent {
  max-width: 400px;
}
</style>
