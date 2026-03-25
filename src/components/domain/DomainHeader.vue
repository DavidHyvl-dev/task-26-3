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
      <input
        type="checkbox"
        :checked="props.verbose"
        @change="onVerboseChange"
      />
      <span>Verbose view</span>
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