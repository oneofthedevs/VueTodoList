<template>
  <div class="border-card fb-300 mx-2 mb-1">
    <i id="btn-edit" class="icon fa fa-edit" @click="onEdit(item)"></i>
    <i id="btn-del" class="icon fa fa-trash" @click="onDelete(item.id)"></i>
    <i
      id="btn-completed"
      class="icon fa fa-check"
      @click="onCompleted(item)"
    ></i>
    <h3 class="title-text">{{ item.todoData.title }}</h3>
    <p class="desc">{{ item.todoData.description }}</p>
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
      this.$emit("Checked", element);
    },
  },
};
</script>

<style lang="scss">
@import "../common/styles/style.scss";

.border-card {
  transition: 250ms ease-in-out;
  background: $light;
  position: relative;
  @include box-shadow(4px);
  &:hover {
    @include box-shadow(7px);
    transform: scale(1.02);
  }
}
.title {
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0 0 14px 0;
}

.title-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.4rem;
  font-weight: 700;
  margin: 0 0 10px 0;
}
.desc {
  text-align: justify;
  font-size: 0.9rem;
  font-weight: 100;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  margin: 0 !important;
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  font-size: 0.7rem;
  border-radius: 50%;
  background: rgb(206, 206, 206);
  color: rgb(66, 66, 66);
  visibility: hidden;
  cursor: pointer;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    visibility: visible;
  }
}
#btn-edit {
  position: absolute;
  bottom: 14px;
  right: 80px;
  z-index: 12;
}

#btn-del {
  position: absolute;
  bottom: 14px;
  right: 50px;
  z-index: 12;
}

#btn-completed {
  position: absolute;
  bottom: 14px;
  right: 20px;
  z-index: 12;
}

.bg-low {
  border-top: 10px solid #80d8ff;
}

.bg-medium {
  border-top: 10px solid #ffff8d;
}

.bg-high {
  border-top: 10px solid #ef5350;
}

.bg-completed {
  border-top: 10px solid var(--clr-green);
  transition: 250ms ease-in-out;
}

@keyframes card-in-from-top {
  0% {
    transform: translateY(-10px);
    opacity: 0.7;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
