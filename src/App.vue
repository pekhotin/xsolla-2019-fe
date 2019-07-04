<template>
  <v-app>
    <v-content>
      <Data/>
    </v-content>
  </v-app>
</template>

<script>
import Data from './components/Data'

export default {
  name: 'App',
  components: {
    Data
  },
  data () {
    return {
      //
    }
  }
}
</script>
