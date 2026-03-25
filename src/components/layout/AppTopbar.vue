<script setup lang="ts"></script>

<template>
  <header class="topbar">
    <div class="topbar__left">
      <button class="icon-button" type="button">- Ferda</button>
    </div>
    <div class="topbar__right">
      <button class="user-button" type="button">John Doe ▾</button>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  padding: 0 20px;
  background: #ffffff;
  border-bottom: 1px solid #d9e0e7;
}

.topbar__left,
.topbar__right {
  display: flex;
  align-items: center;
}

.icon-button,
.user-button {
  border: 1px solid #c7d0d9;
  background: #fff;
  border-radius: 6px;
  padding: 8px 10px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .topbar {
    flex-wrap: wrap;
    padding: 12px 16px;
  }
}
</style>