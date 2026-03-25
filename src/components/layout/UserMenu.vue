<script setup lang="ts">
import { UserCircle2Icon, LucideLogOut } from 'lucide-vue-next'
</script>

<template>
    <div class="user-menu">
        <ul class="user-menu__list">
            <li class="user-menu__item">
                <div class="user-menu__button">
                    <UserCircle2Icon class="user-icon" />
                    <div class="user-menu__user-details">
                        <span>John Doe</span>
                        <span>Admin</span>
                    </div>
                </div>
            </li>
            <li class="user-menu__item">
                <span class="separator"></span>
            </li>
            <li class="user-menu__item">
                <button type="button" class="user-menu__button">
                    <LucideLogOut class="user-icon" />
                    <span>Logout</span>
                </button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.separator {
    display: block;
    background: #d9e0e7;
    width: 100%;
    height: 1px;
    background: #000000;
}

.user-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    min-width: 180px;
    padding: 8px;
    background: #ffffff;
    border: 1px solid #d9e0e7;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    z-index: 20;
}

.user-menu__user-details {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 14px;
    color: #24364b;
}

.user-menu__list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.user-menu__item+.user-menu__item {

    margin-top: 4px;
}

.user-menu__button {
    display: flex;
    flex-direction: row;
    width: 100%;
    text-align: left;
    padding: 10px 12px;
    border: none;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    color: #24364b;
}

.user-menu__button:hover {
    background: #f4f7fa;
}
</style>