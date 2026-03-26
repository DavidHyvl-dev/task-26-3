<script setup lang="ts">
import BaseCard from '../common/BaseCard.vue'
import type { PublishableContact } from '../../types/domainDetail'

type Props = {
    contacts: PublishableContact[]
}

const props = defineProps<Props>()
</script>

<template>
    <BaseCard>
        <div class="card">
            <h2 class="card-title">Administrative contacts:</h2>

            <dl>
                <div v-for="contact in props.contacts" :key="contact.handle" class="contacts-summary-card__row">
                    <dt class="card-label">{{ contact.name }}</dt>
                    <dd class="card-link">{{ contact.handle }}</dd>
                </div>
            </dl>
        </div>
    </BaseCard>
</template>

<style scoped>
.contacts-summary-card__row {
    display: grid;
    grid-template-columns: minmax(140px, 180px) 1fr;
    gap: 12px;
    padding: 12px 0;
    border-top: 1px solid #e6edf3;
}

.contacts-summary-card__row:last-child {
    padding-bottom: 0;
}

@media (max-width: 640px) {
    .contacts-summary-card__row {
        grid-template-columns: 1fr;
        gap: 6px;
    }
}
</style>