<script>
export default {
  data() {
    return {

    }
  },
  props: ['tagname']
}
</script>
<template>
  <button @click="this.$emit('return-name', tagname)">{{ tagname }}</button>
</template>