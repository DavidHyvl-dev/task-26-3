<script setup lang="ts">
import BaseCard from '../common/BaseCard.vue'
import type { Keyset } from '../../types/domainDetail'
type Props = {
    keyset: Keyset
}
const props = defineProps<Props>()
</script>

<template>
    <BaseCard>
        <div class="card">
            <h2 class="card-title">Keyset:</h2>

            <dl>
                <div class="keyset-card__row">
                    <dt class="card-label">Handle</dt>
                    <dd class="card-link">{{ props.keyset.handle }}</dd>
                </div>

                <div class="keyset-card__row">
                    <dt class="card-label">Registrar</dt>
                    <dd class="card-link">{{ props.keyset.registrar }}</dd>
                </div>
                <div class="keyset-card__row">
                    <dt class="card-label">DNS keys</dt>
                    <div class="card-value">
                        <dd v-for="dnsKey in props.keyset.dns_keys" :key="dnsKey" class="card-value">
                            {{ dnsKey }}
                        </dd>
                    </div>
                </div>
            </dl>
        </div>
    </BaseCard>
</template>

<style scoped>
.keyset-card__row {
    display: grid;
    grid-template-columns: minmax(140px, 180px) 1fr;
    gap: 12px;
    padding: 12px 0;
    border-top: 1px solid #e6edf3;
}

.keyset-card__row:last-child {
    padding-bottom: 0;
}

@media (max-width: 640px) {
    .keyset-card__row {
        grid-template-columns: 1fr;
        gap: 6px;
    }
}
</style>