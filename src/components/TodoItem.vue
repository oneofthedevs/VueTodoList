<template>
  <div
    class="card"
    :class="{
      'bg-low': item.todoData.priority === 1,
      'bg-medium': item.todoData.priority === 2,
      'bg-high': item.todoData.priority === 3,
      'bg-completed': item.todoData.completed === true,
    }"
  >
    <i id="btn-edit" class="icon fa fa-edit" @click="onEdit(item)"></i>
    <i id="btn-del" class="icon fa fa-times" @click="onDelete(item.id)"></i>
    <i
      id="btn-completed"
      class="icon fa fa-check"
      @click="onCompleted(item)"
    ></i>
    <h3 class="title">{{ item.todoData.title }}</h3>
    <p class="desc">{{ item.todoData.description }}</p>
    <p></p>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    onEdit(element) {
      this.$emit("Edit", element);
    },
    onDelete(element) {
      this.$emit("Delete", element);
    },
    onCompleted(element) {
      if (element.todoData.completed === true)
        element.todoData.completed = false;
      else {
        element.todoData.completed = true;
      }
      console.log(element);
      this.$emit("Checked", element);
    },
  },
};
</script>

<style lang="scss">
.card {
  display: flex;
  flex-direction: column;
  flex-basis: 300px;
  max-width: 600px;
  position: relative;
  border-radius: var(--br);
  padding: 30px 20px 40px 20px;
  margin: 0 10px 10px 10px;
  flex-grow: 1;
}

.title {
  font-size: 1.6rem;
  font-weight: 500;
  margin: 0 0 14px 0;
}

.desc {
  text-align: justify;
}
.icon {
  display: none;
  cursor: pointer;
}

.card:hover .icon {
  display: inline-block;
  transition: 500ms;
}
#btn-edit {
  position: absolute;
  top: 10px;
  left: 20px;
}

#btn-del {
  position: absolute;
  top: 10px;
  right: 20px;
}

#btn-completed {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
}

.bg-low {
  background: #80d8ff;
}

.bg-medium {
  background: #ffff8d;
}

.bg-high {
  background: #ef5350;
}

.bg-completed {
  background: var(--clr-green);
  transition: 250ms ease-in-out;
  // background: #81c784;
}
</style>
