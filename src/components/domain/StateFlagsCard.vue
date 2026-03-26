<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '../common/BaseCard.vue'
import type { StateFlags, StateFlag } from '../../types/domainDetail'

type Props = {
    stateFlags: StateFlags
    verbose: boolean
}

const props = defineProps<Props>()

const flagsByName = computed(() => {
    return new Map(props.stateFlags.flags.map((flag) => [flag.name, flag]))
})

const groupNames = computed(() => props.stateFlags.groups ?? [])

const groupedNamesSet = computed(() => {
    return new Set(groupNames.value.flat())
})

const getFlagsForGroup = (names: string[]): StateFlag[] => {
    return names
        .map((name) => flagsByName.value.get(name))
        .filter((flag): flag is StateFlag => Boolean(flag))
}

const remainingFlags = computed(() => {
    return props.stateFlags.flags.filter(
        (flag) => !groupedNamesSet.value.has(flag.name)
    )
})

const verboseColumns = computed(() => {
    const firstColumn = getFlagsForGroup(groupNames.value[0] ?? [])
    const secondColumn = getFlagsForGroup(groupNames.value[1] ?? [])
    const thirdColumn = remainingFlags.value

    return [firstColumn, secondColumn, thirdColumn]
})

const activeFlags = computed(() => {
    return props.stateFlags.flags.filter((flag) => flag.active)
})
</script>

<template>
    <BaseCard>
        <div class="state-flags-card">
            <h2 class="state-flags-card__title">State flags:</h2>

            <div v-if="props.verbose" class="state-flags-card__columns">
                <div v-for="(column, columnIndex) in verboseColumns" :key="columnIndex"
                    class="state-flags-card__column">
                    <ul class="state-flags-card__list">
                        <li v-for="flag in column" :key="flag.name" class="state-flags-card__item">
                            <span class="state-flags-card__badge" :class="{
                                'state-flags-card__badge--active': flag.active,
                                'state-flags-card__badge--inactive': !flag.active,
                            }">
                                {{ flag.description }}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <ul v-else class="state-flags-card__active-list">
                <li v-for="flag in activeFlags" :key="flag.name" class="state-flags-card__item">
                    <span class="state-flags-card__badge state-flags-card__badge--active">
                        {{ flag.description }}
                    </span>
                </li>
            </ul>
        </div>
    </BaseCard>
</template>

<style scoped>
.state-flags-card {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.state-flags-card__title {
    margin: 0;
    font-size: 20px;
    line-height: 1.2;
    color: #24364b;
}

.state-flags-card__columns {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    align-items: start;
}

.state-flags-card__column {
    min-width: 0;
}

.state-flags-card__list,
.state-flags-card__active-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.state-flags-card__item+.state-flags-card__item {
    margin-top: 10px;
}

.state-flags-card__badge {
    display: inline-flex;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    padding: 8px 12px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.35;
}

.state-flags-card__badge--active {
    background: #e7f7ee;
    color: #1d7a46;
}

.state-flags-card__badge--inactive {
    background: #fdb9b9c0;
    color: #ff0000;
}

@media (max-width: 1024px) {
    .state-flags-card__columns {
        grid-template-columns: 1fr;
    }
}
</style>