<script>
export default {
  props: ["code", "name"],
};
</script>
<template>
  <button class="localebutton" @click="this.$emit('return-code', code)">
    {{ name }}
  </button>
</template>
