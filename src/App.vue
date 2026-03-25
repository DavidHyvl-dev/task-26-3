<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAsyncData } from './composables/useAsyncData'
import { getUserErrorMessage } from './utils/errorMessages'
import { getDomainDetail } from './services/domainService'

const {
  data: domainDetail,
  isLoading,
  error,
  execute,
} = useAsyncData(getDomainDetail, 'Unable to load domain detail.')

const userErrorMessage = computed(() =>
  error.value ? getUserErrorMessage(error.value) : ''
)

onMounted(() => {
  execute()
})
</script>

<template>
  <main>
    <div v-if="isLoading">Loading domain detail...</div>
    <div v-else-if="error">{{ userErrorMessage }}</div>
    <pre v-else-if="domainDetail">{{ domainDetail }}</pre>
  </main>
</template>