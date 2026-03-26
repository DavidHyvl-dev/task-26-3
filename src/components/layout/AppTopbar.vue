<script setup lang="ts">
import { UserCircle2Icon, Menu } from 'lucide-vue-next'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import UserMenu from './UserMenu.vue'

type Emits = {
    (e: 'toggle-sidebar'): void
}

const emit = defineEmits<Emits>()

const isUserMenuOpen = ref(false)
const topbarRightRef = ref<HTMLElement | null>(null)

const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value
}

const closeUserMenu = () => {
    isUserMenuOpen.value = false
}

const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as Node | null

    if (
        topbarRightRef.value &&
        target &&
        !topbarRightRef.value.contains(target)
    ) {
        closeUserMenu()
    }
}

const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        closeUserMenu()
    }
}

onMounted(() => {
    document.addEventListener('click', handleDocumentClick)
    document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleDocumentClick)
    document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
    <header class="topbar">
        <div class="topbar__left">
            <button class="icon-button" type="button" aria-label="Toggle sidebar" @click="emit('toggle-sidebar')">
                <Menu class="menu-icon" />
            </button>
            <span class="app-title">
                Ferda
            </span>
        </div>

        <div ref="topbarRightRef" class="topbar__right">
            <button class="user-button" type="button" aria-haspopup="menu" :aria-expanded="isUserMenuOpen"
                @click="toggleUserMenu">
                <UserCircle2Icon class="user-icon" />
                <span class="user-name">Jan Musílek</span>
            </button>

            <UserMenu v-if="isUserMenuOpen" />
        </div>
    </header>
</template>

<style scoped>
.app-title {
    display: inline;
    color: #ffffff;
    font-weight: 600;
    font-size: larger;
}

.topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 64px;
    padding: 0 20px;
    background: #027cff;
    border-bottom: 1px solid #d9e0e7;
}

.topbar__left,
.topbar__right {
    display: flex;
    flex-direction: row;
    gap: 30px;
    min-height: 64px;
    align-items: center;
}

.topbar__right {
    position: relative;
    padding-right: 30px;
}

.icon-button {
    display: flex;
    border: 1px solid transparent;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    color: #ffffff;
}

.user-button {
    display: flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: #ffffff;
    padding: 2px;
    border: none;
}

.icon-button:hover,
.user-button:hover {
    scale: 1.1;
}

.user-icon,
.menu-icon {
    align-self: center;
    width: 23px;
    height: 23px;
}

.user-name {
    margin-left: 10px;
    text-transform: uppercase;
}

@media (max-width: 768px) {
    .topbar {
        padding: 12px 16px;
    }
}
</style>