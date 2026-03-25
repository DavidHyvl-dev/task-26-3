<script setup lang="ts">
const items = ['* Registry']
</script>

<template>
  <aside class="sidebar">
    <nav>
      <ul class="nav-list">
        <li v-for="item in items" :key="item" class="nav-item">
          <button
            type="button"
            class="nav-button"
            :class="{ 'nav-button--active': item === '* Registry' }"
          >
            {{ item }}
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  padding: 24px 16px;
  background: #f4f7fa;
  border-right: 1px solid #d9e0e7;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item + .nav-item {
  margin-top: 8px;
}

.nav-button {
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  color: #24364b;
}

.nav-button--active {
  background: #ffffff;
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
</style>