<script setup lang="ts">
import BaseCard from '../common/BaseCard.vue'
import type { DomainDetail } from '../../types/domainDetail'
import { formatDateTime } from '../../utils/dateFormatter'

type EventValue = DomainDetail['events'][keyof DomainDetail['events']]

type Props = {
    events: DomainDetail['events']
}

const props = defineProps<Props>()

const eventLabels: Record<keyof DomainDetail['events'], string> = {
    registered: 'Registered',
    transferred: 'Transferred',
    updated: 'Updated',
    unregistered: 'Delete date:',
}

const getEventDate = (event: EventValue) => {
    if (!event) {
        return '—'
    }
    return `${formatDateTime(event.timestamp)}`
}

const getEventRegistrar = (event: EventValue) => {
    if (!event) {
        return '—'
    }
    return `${event.registrar_handle}`
}
</script>

<template>
    <BaseCard>
        <div class="card">
            <h2 class="card-title">Events:</h2>

            <dl>
                <div v-for="(label, key) in eventLabels" :key="key" class="events-card__row">
                    <dt class="card-label">{{ label }}</dt>
                    <dd class="card-value">
                        {{ getEventDate(props.events[key]) }}
                    </dd>
                    <template v-if="props.events[key]">
                        <dt class="card-label">Registrar:</dt>
                        <dd class="card-link">
                            {{ getEventRegistrar(props.events[key]) }}
                        </dd>
                    </template>
                </div>
            </dl>
        </div>
    </BaseCard>
</template>

<style scoped>
.events-card__row {
    display: grid;
    grid-template-columns: minmax(140px, 180px) 1fr minmax(140px, 180px) 1fr;
    gap: 12px;
    padding: 12px 0;
    border-top: 1px solid #e6edf3;
}

.events-card__row:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
}

@media (max-width: 640px) {
    .events-card__row {
        grid-template-columns: 1fr;
        gap: 6px;
    }
}
</style>