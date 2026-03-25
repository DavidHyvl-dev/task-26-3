<script setup lang="ts">
type Props = {
    fqdn: string
    verbose: boolean
}

type Emits = {
    (e: 'update:verbose', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const onVerboseChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:verbose', target.checked)
}
</script>

<template>
    <section class="domain-header">
        <div class="domain-header__top">
            <h1 class="domain-title">{{ props.fqdn }}</h1>
        </div>

        <label class="verbose-toggle">
            <input class="verbose-toggle__input" type="checkbox" :checked="props.verbose" @change="onVerboseChange" />
            <span class="verbose-toggle__slider" aria-hidden="true"></span>
            <span class="verbose-toggle__label">Verbose view</span>
        </label>
    </section>
</template>

<style scoped>
.domain-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    background: #ffffff;
    border: 1px solid #d9e0e7;
    border-radius: 12px;
}

.domain-header__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
}

.domain-title {
    margin: 0;
    font-size: 30px;
    line-height: 1.2;
    color: #24364b;
}

.verbose-toggle {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #4a5a6a;
    cursor: pointer;
}

.verbose-toggle__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

.verbose-toggle__slider {
    position: relative;
    width: 44px;
    height: 24px;
    background: #cbd5e1;
    border-radius: 999px;
    transition: background 0.2s ease;
    flex-shrink: 0;
}

.verbose-toggle__slider::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: #ffffff;
    border-radius: 50%;
    transition: transform 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.verbose-toggle__input:checked+.verbose-toggle__slider {
    background: #2563eb;
}

.verbose-toggle__input:checked+.verbose-toggle__slider::before {
    transform: translateX(20px);
}

.verbose-toggle__input:focus-visible+.verbose-toggle__slider {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
}

.verbose-toggle__label {
    line-height: 1;
}

@media (max-width: 768px) {
    .domain-header__top {
        flex-direction: column;
        align-items: flex-start;
    }

    .domain-title {
        font-size: 24px;
    }
}
</style>