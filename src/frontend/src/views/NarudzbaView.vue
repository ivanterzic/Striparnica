<template>
    <div>
        <p>The parameter value is: {{ id }}</p>
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            required: true,
        },
    },
};
</script>
