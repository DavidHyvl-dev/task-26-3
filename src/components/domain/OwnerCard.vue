<script setup lang="ts">
import BaseCard from '../common/BaseCard.vue'
import type { PublishableContact } from '../../types/domainDetail'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'

type Props = {
    owner: PublishableContact
    verbose: boolean
}

const props = defineProps<Props>()

const getDisplayValue = (value: string, isVisible: boolean) => {
    if (!props.verbose && !isVisible) {
        return 'Hidden'
    }

    return value
}
</script>

<template>
    <BaseCard>
        <div class="card">
            <h2 class="card-title">Owner:</h2>
            <dl>
                <div class="owner-card__row">
                    <dt class="card-label">Handle</dt>
                    <dd class="card-link">{{ props.owner.handle }}</dd>
                </div>

                <div class="owner-card__row">

                    <dt class="card-label__wrap">
                        <EyeOffIcon v-if="props.owner.publish.organization === false" class="icon-red" />
                        <EyeIcon v-if="props.owner.publish.organization === true" class="icon-green" />
                        <span class="card-label">Organization</span>
                    </dt>
                    <dd class="card-value">
                        {{ getDisplayValue(props.owner.organization, props.owner.publish.organization) }}
                    </dd>
                </div>

                <div class="owner-card__row">
                    <dt class="card-label__wrap">
                        <EyeOffIcon v-if="props.owner.publish.name === false" class="icon-red" />
                        <EyeIcon v-if="props.owner.publish.name === true" class="icon-green" />
                        <span class="card-label">Name</span>
                    </dt>
                    <dd class="card-value">
                        {{ getDisplayValue(props.owner.name, props.owner.publish.name) }}
                    </dd>
                </div>
            </dl>
        </div>
    </BaseCard>
</template>

<style scoped>
.owner-card__row {
    display: grid;
    grid-template-columns: minmax(140px, 180px) 1fr;
    gap: 12px;
    padding: 12px 0;
    border-top: 1px solid #e6edf3;
}

.owner-card__row:last-child {
    padding-bottom: 0;
}

@media (max-width: 640px) {
    .owner-card__row {
        grid-template-columns: 1fr;
        gap: 6px;
    }
}

.icon-green {
    color: #28a745;
}

.icon-red {
    color: #dc3545;
}
</style>