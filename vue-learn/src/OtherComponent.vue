<script setup>
    const props = defineProps ({
        msg: String
    })

    const emit = defineEmits(['response'])
    emit('response', 'hello from child')
</script>

<template>
    <h3>Hello I'm other component!</h3>
    <h4>{{ msg || 'No props passed yet' }}</h4>
    <!-- Step 14 -->
    <slot>Fallback</slot>
</template>