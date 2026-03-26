<script setup lang="ts">
import { GlobeIcon } from 'lucide-vue-next';

const items = ['Registry']
</script>

<template>
    <aside class="sidebar">
        <div class="sidebar-header">
            <span class="sidebar-title">APPLICATIONS</span>
        </div>
        <nav>
            <ul class="nav-list">
                <li v-for="item in items" :key="item" class="nav-item">
                    <button type="button" class="nav-button" :class="{ 'nav-button--active': item === 'Registry' }">
                        <GlobeIcon />
                        {{ item }}
                    </button>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<style scoped>
.sidebar {
    background: #f4f7fa;
    border-right: 1px solid #d9e0e7;
}

.sidebar-header {
    padding: 10px 16px;
    background: #ffffff;
    border-right: 1px solid #d9e0e7;
}

.sidebar-title {
    margin: 0;
    line-height: 1.2;
    color: #24364b;
    font-size: 15px;
    font-weight: 600;
}

.nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-item+.nav-item {
    margin-top: 8px;
}

.nav-button {
    display: inline-flex;
    align-items: center;
    width: 100%;
    gap: 20px;
    text-align: left;
    padding: 10px 12px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 14px;
    color: #24364b;
}

.nav-button--active {
    background: #fdce26cc;
    font-weight: 600;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
</style>