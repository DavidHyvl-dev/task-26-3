<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppTopBar from './components/layout/AppTopbar.vue'
import AppSidebar from './components/layout/AppSidebar.vue'
import DomainHeader from './components/domain/DomainHeader.vue'
import DomainOverviewCard from './components/domain/DomainOverviewCard.vue'
import OwnerCard from './components/domain/OwnerCard.vue'
import ContactsCard from './components/domain/ContactsCard.vue'
import NssetCard from './components/domain/NssetCard.vue'
import KeysetCard from './components/domain/KeysetCard.vue'
import EventsCard from './components/domain/EventsCard.vue'
import StateFlagsCard from './components/domain/StateFlagsCard.vue'
import DomainDetailColumns from './components/domain/DomainDetailsColumns.vue'
import ContactsSummaryCard from './components/domain/ContactsSummaryCard.vue'
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
const isSidebarOpen = ref(true)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const userErrorMessage = computed(() =>
  error.value ? getUserErrorMessage(error.value) : ''
)

onMounted(() => {
  execute()
})
</script>

<template>
  <div class="app">
    <AppTopBar @toggle-sidebar="toggleSidebar" />

    <div class="app-layout" :class="{ 'app-layout--sidebar-open': isSidebarOpen }">
      <AppSidebar v-if="isSidebarOpen" />

      <main class="app-main">
        <div v-if="isLoading">Loading domain detail...</div>

        <div v-else-if="error">{{ userErrorMessage }}</div>

        <template v-else-if="domainDetail">
          <DomainHeader :fqdn="domainDetail.fqdn" v-model:verbose="isVerbose" />

          <DomainDetailColumns>
            <template #left>
              <DomainOverviewCard :sponsoring-registrar="domainDetail.sponsoring_registrar"
                :expires-at="domainDetail.expires_at" />

              <EventsCard :events="domainDetail.events" />

              <StateFlagsCard :state-flags="domainDetail.state_flags" :verbose="isVerbose" />
            </template>

            <template #right>
              <OwnerCard :owner="domainDetail.owner" :verbose="isVerbose" />

              <ContactsSummaryCard v-if="!isVerbose" :contacts="domainDetail.administrative_contacts" />

              <ContactsCard v-else v-for="contact in domainDetail.administrative_contacts" :key="contact.handle"
                :contact="contact" :verbose="isVerbose" />

              <NssetCard :nsset="domainDetail.nsset" />

              <KeysetCard :keyset="domainDetail.keyset" />

            </template>
          </DomainDetailColumns>
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
  grid-template-columns: 1fr;
  min-height: calc(100vh - 64px);
}

.app-layout--sidebar-open {
  grid-template-columns: 240px 1fr;
}

.app-main {
  padding: 24px;
}

@media (max-width: 1024px) {

  .app-layout,
  .app-layout--sidebar-open {
    grid-template-columns: 1fr;
  }

  .app-main {
    padding: 16px;
  }
}
</style>