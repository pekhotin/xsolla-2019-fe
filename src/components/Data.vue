<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-data-table
                :headers="headers"
                :items="transactions"
                class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.transaction.id }}</td>
            <td class="text-xs-right">{{ props.item.transaction.project.name }}</td>
            <td class="text-xs-right">{{ props.item.transaction.payment_method.name }}</td>
            <td class="text-xs-right">{{ props.item.transaction.transfer_date }}</td>
            <td class="text-xs-right">{{ props.item.user.name }}</td>
            <td class="text-xs-right">{{ props.item.transaction.status }}</td>
          </template>
        </v-data-table>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      transactions: require('../assets/data.json'),
      headers: [
        { text: 'Код', align: 'left', value: 'transaction.id' },
        { text: 'Проект', value: 'transaction.project.name' },
        { text: 'Метод', value: 'transaction.payment_method.name' },
        { text: 'Дата', value: 'transaction.transfer_date' },
        { text: 'Пользователь', value: 'user.name' },
        { text: 'Статус', value: 'transaction.status' }
      ],
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
