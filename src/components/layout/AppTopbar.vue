<script setup lang="ts">
import { UserCircle2Icon,Menu } from 'lucide-vue-next'
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
                <span class="app-title">
                    Ferda
                </span>
            </button>
        </div>

        <div ref="topbarRightRef" class="topbar__right">
            <button class="user-button" type="button" aria-haspopup="menu" :aria-expanded="isUserMenuOpen"
                @click="toggleUserMenu">
                <UserCircle2Icon class="user-icon" />
                <span class="user-name">John Doe</span>
            </button>

            <UserMenu v-if="isUserMenuOpen" />
        </div>
    </header>
</template>

<style scoped>
.app-title {
    display: inline;
    color: #24364b;
}
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

.topbar__right {
    position: relative;
}

.icon-button {
    display: inline-flex;
    gap: 30px;
    border: none;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
    color: #24364b;
}
.user-button:hover,
.icon-button:hover {
    background: #f4f7fa;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-icon {
  width: 18px;
  height: 18px;
}

.user-name{
        margin-left: 8px;
        text-transform: uppercase;
}

@media (max-width: 768px) {
    .topbar {
        padding: 12px 16px;
    }
}
</style>