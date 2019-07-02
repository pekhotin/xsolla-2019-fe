<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Xsolla summer school 2019 FE</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
              flat
              target="_blank"
      >
        <span class="mr-2">Я кнопка</span>
      </v-btn>
      <v-btn
              flat
              target="_blank"
      >
        <span class="mr-2">Я кнопка</span>
      </v-btn>
    </v-toolbar>

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
