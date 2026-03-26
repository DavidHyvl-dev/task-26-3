<template>
    <div class="domain-detail-columns">
        <div class="domain-detail-columns__column">
            <slot name="left" />
        </div>

        <div class="domain-detail-columns__column">
            <slot name="right" />
        </div>
    </div>
</template>

<style scoped>
.domain-detail-columns {
    display: grid;
    grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
    gap: 16px;
    margin-top: 16px;
    align-items: start;
}

.domain-detail-columns__column {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
}

@media (max-width: 1024px) {
    .domain-detail-columns {
        grid-template-columns: 1fr;
    }
}
</style>