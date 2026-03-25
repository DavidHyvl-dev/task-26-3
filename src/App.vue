<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppTopBar from './components/layout/AppTopbar.vue'
import AppSidebar from './components/layout/AppSidebar.vue'
import DomainHeader from './components/domain/DomainHeader.vue'
import { useAsyncData } from './composables/useAsyncData'
import { getUserErrorMessage } from './utils/errorMessages'
import { getDomainDetail } from './services/domainService'

const {
  data: domainDetail,
  isLoading,
  error,
  execute,
} = useAsyncData(getDomainDetail, 'Unable to load domain detail.')

const isVerbose = ref(false)

const userErrorMessage = computed(() =>
  error.value ? getUserErrorMessage(error.value) : ''
)

onMounted(() => {
  execute()
})
</script>

<template>
  <div class="app">
    <AppTopBar />

    <div class="app-layout">
      <AppSidebar />

      <main class="app-main">
        <div v-if="isLoading">Loading domain detail...</div>

        <div v-else-if="error">{{ userErrorMessage }}</div>

        <template v-else-if="domainDetail">
          <DomainHeader
            :fqdn="domainDetail.fqdn"
            v-model:verbose="isVerbose"
          />

          <div class="debug-box">
            <strong>Verbose view:</strong> {{ isVerbose ? 'ON' : 'OFF' }}
          </div>
        </template>
      </main>
    </div>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: #eef3f7;
  color: #24364b;
}

.app-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  min-height: calc(100vh - 64px);
}

.app-main {
  padding: 24px;
}

.debug-box {
  margin-top: 16px;
  padding: 16px;
  border: 1px dashed #b8c4cf;
  border-radius: 12px;
  background: #ffffff;
}

@media (max-width: 1024px) {
  .app-layout {
    grid-template-columns: 1fr;
  }

  .app-main {
    padding: 16px;
  }
}
</style>