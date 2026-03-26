<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { formatDateTime } from '../../utils/dateFormatter'
import BaseCard from '../common/BaseCard.vue'
import { CopyIcon } from 'lucide-vue-next'

type Props = {
    expiresAt: string
}

const props = defineProps<Props>()

const isSecretVisible = ref(false)
const secretPassword = ref('')
const secondsLeft = ref(0)
const isCopied = ref(false)

let countdownInterval: number | null = null
let hideTimeout: number | null = null

const countdownLabel = computed(() => `${secondsLeft.value}s`)

const clearTimers = () => {
    if (countdownInterval !== null) {
        window.clearInterval(countdownInterval)
        countdownInterval = null
    }

    if (hideTimeout !== null) {
        window.clearTimeout(hideTimeout)
        hideTimeout = null
    }
}

const generateRandomSecret = (length = 20) => {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    const array = new Uint32Array(length)
    crypto.getRandomValues(array)

    return Array.from(array, (number) => chars[number % chars.length]).join('')
}

const hideSecret = () => {
    clearTimers()
    isSecretVisible.value = false
    secretPassword.value = ''
    secondsLeft.value = 0
    isCopied.value = false
}

const showSecret = () => {
    clearTimers()

    secretPassword.value = generateRandomSecret()
    isSecretVisible.value = true
    isCopied.value = false
    secondsLeft.value = 30

    countdownInterval = window.setInterval(() => {
        if (secondsLeft.value > 0) {
            secondsLeft.value -= 1
        }
    }, 1000)

    hideTimeout = window.setTimeout(() => {
        hideSecret()
    }, 30000)
}

const copySecret = async () => {
    try {
        await navigator.clipboard.writeText(secretPassword.value)
        isCopied.value = true
    } catch (error) {
        console.error('Failed to copy secret password:', error)
    }
}

onBeforeUnmount(() => {
    clearTimers()
})
</script>

<template>
    <BaseCard>
        <div class="card">
            <dl>
                <div class="overview-card__row">
                    <dt class="card-label">AuthInfo:</dt>

                    <dd class="card-value">
                        <button v-if="!isSecretVisible" class="overview-card__button" type="button" @click="showSecret">
                            SHOW
                        </button>

                        <div v-else class="secret-inline">
                            <span class="card-link">
                                {{ secretPassword }}
                            </span>

                            <button class="copy-button" type="button"
                                :aria-label="isCopied ? 'Copied' : 'Copy secret password'" @click="copySecret">
                                <CopyIcon :size="16" />
                            </button>

                            <span class="card-value">
                                Visible for {{ countdownLabel }}
                            </span>
                        </div>
                    </dd>
                </div>

                <div class="overview-card__row">
                    <dt class="card-label">Expires at:</dt>
                    <dd class="card-value">{{ formatDateTime(props.expiresAt) }}</dd>
                </div>
            </dl>
        </div>
    </BaseCard>
</template>

<style scoped>
.overview-card__button {
    min-width: 80px;
    padding: 8px 12px;
    background: #027cff;
    border: 1px solid transparent;
    color: #ffffff;
    cursor: pointer;
    font-size: 14px;
    border-radius: 8px;
}

.overview-card__button:hover {
    background: #ffffff;
    border: 1px solid #027cff;
    color: #027cff;
}

.overview-card__row {
    display: grid;
    grid-template-columns: minmax(140px, 180px) 1fr;
    gap: 12px;
    padding: 12px 0;
    align-items: center;
}

.overview-card__row:first-child {
    border-top: none;
    padding-top: 0;
    margin-top: 0;
}

.overview-card__row:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
}

.secret-inline {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    flex-wrap: wrap;
}

.copy-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    background: #ffffff;
    border: 1px solid #c7d0d9;
    color: #24364b;
    cursor: pointer;
    border-radius: 8px;
    flex-shrink: 0;
}

@media (max-width: 640px) {
    .overview-card__row {
        grid-template-columns: 1fr;
        gap: 6px;
    }

    .secret-inline {
        align-items: flex-start;
    }
}
</style>