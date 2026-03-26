<script setup lang="ts">
import BaseCard from '../common/BaseCard.vue'
import type { Nsset } from '../../types/domainDetail'

type Props = {
    nsset: Nsset
}

const props = defineProps<Props>()
</script>

<template>
    <BaseCard>
        <div class="card">
            <h2 class="card-title">Nsset:</h2>

            <dl>
                <div class="nsset-card__row">
                    <dt class="card-label">Handle</dt>
                    <dd class="card-link">{{ props.nsset.handle }}</dd>
                </div>

                <div class="nsset-card__row">
                    <dt class="card-label">Registrar</dt>
                    <dd class="card-link">{{ props.nsset.registrar }}</dd>
                </div>

                <div class="nsset-card__row">
                    <dt class="card-label">DNS servers</dt>
                    <div class="card-value">
                        <dd v-for="server in props.nsset.dns" :key="`${server.name}-${server.ip_address}`"
                            class="card-value">
                            {{ server.name }} ({{ server.ip_address }})
                        </dd>
                    </div>
                </div>


            </dl>
        </div>
    </BaseCard>
</template>

<style scoped>
.nsset-card__row {
    display: grid;
    grid-template-columns: minmax(140px, 180px) 1fr;
    gap: 12px;
    padding: 12px 0;
    border-top: 1px solid #e6edf3;
}

.nsset-card__row:last-child {
    padding-bottom: 0;
}

@media (max-width: 640px) {
    .nsset-card__row {
        grid-template-columns: 1fr;
        gap: 6px;
    }
}
</style>