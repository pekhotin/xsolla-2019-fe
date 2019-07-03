<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-card>
          <v-card-title>
            Транзакции
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Поиск"
                    single-line
                    hide-details
            ></v-text-field>
          </v-card-title>

        <v-data-table
                :headers="headers"
                :items="transactions"
                :search="search"
                class="elevation-1"
                rows-per-page-text="Записей на странице"
                :rows-per-page-items="rowPerPageItems"
                no-results-text="По вашему запросу ничего не найдено"
                :pagination.sync="pagination"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.transaction.id }}</td>
            <td>{{ props.item.transaction.project.name }}</td>
            <td>{{ props.item.transaction.payment_method.name }}</td>
            <td>{{ props.item.transaction.transfer_date }}</td>
            <td>{{ props.item.user.name }}</td>
            <td>{{ props.item.transaction.status }}</td>
          </template>
        </v-data-table></v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      search: '',
      rowPerPageItems: [25, 50, 100, {'text': 'Все', 'value': -1}],
      pagination: {
        rowsPerPage: {'text': 'Все', 'value': -1}
      },
      transactions: require('../assets/data.json'),
      headers: [
        { text: 'Код', align: 'center', value: 'transaction.id' },
        { text: 'Проект', align: 'center', value: 'transaction.project.name' },
        { text: 'Метод', align: 'center', value: 'transaction.payment_method.name' },
        { text: 'Дата', align: 'center', value: 'transaction.transfer_date' },
        { text: 'Пользователь', align: 'center', value: 'user.name' },
        { text: 'Статус', align: 'center', value: 'transaction.status' }
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
