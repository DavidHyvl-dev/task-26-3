<template>
    <section class="base-card">
        <slot />
    </section>
</template>

<style scoped>
.base-card {
    padding: 24px;
    background: #ffffff;
    border: 1px solid #d9e0e7;
    border-radius: 12px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
</style>
