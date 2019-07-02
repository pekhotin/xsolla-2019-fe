<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        Здесь будут данные
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      info: require('../assets/data.json')
    }),
    created() {
      this.init()
    },
    methods: {
      init () {

      }
    }
  }
</script>

<style>

</style>
