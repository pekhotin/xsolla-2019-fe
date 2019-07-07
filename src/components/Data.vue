<template>
  <v-container>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Xsolla summer school 2019 FE</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
              flat
              target="_blank"
              @click="dialogProjects = true"
      >
        <span class="mr-2" >Проекты</span>
      </v-btn>
      <v-btn
              flat
              target="_blank"
              @click="openDialog"
      >
        <span class="mr-2">Рейтинг платежных систем</span>
      </v-btn>
    </v-toolbar>
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
            <td>{{ props.item.transaction.transfer_date | formatDate}}</td>
            <td>{{ props.item.user.name }} ({{ props.item.user.id }})</td>
            <td><v-icon>{{ getStatus(props.item.transaction.status) }}</v-icon></td>
          </template>
        </v-data-table></v-card>
      </v-flex>

      <v-dialog v-model="dialogProjects" max-width="400px">
        <v-card>
          <v-card-title>
            <span class="headline">Проекты</span>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-tile
                      v-for="(item, index) in getProjects()"
                      :key="index"
              >
                <v-list-tile-action>
                  {{ index + 1 }}.
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title v-text="item.name"></v-list-tile-title>
                </v-list-tile-content>

              </v-list-tile>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialogProjects = false">Закрыть</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogPaymentMethods" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Платежные системы</span>
          </v-card-title>
          <v-card-text>

            <v-list>
              <v-list-tile
                      v-for="(item, index) in getPaymentMethods()"
                      :key="index"
              >
                <v-list-tile-action>
                  {{ index + 1 }}.
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title v-text="item.name"></v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-avatar>
                  {{ item.count }}
                </v-list-tile-avatar>

              </v-list-tile>
            </v-list>

            <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialogPaymentMethods = false">Закрыть</v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>


    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialogProjects: false,
      dialogPaymentMethods: false,
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
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'Количество использований',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }),
    created() {
      this.init()
    },
    methods: {
      init () {
        this.options.xaxis = this.getPaymentMethods().map(el => el.name)
        this.series.data = this.getPaymentMethods().map(el => el.count)
      },
      getStatus (status) {
        switch (status) {
          case 'created':  return 'hourglass_empty'
          case 'canceled': return 'highlight_off'
        }
        return status
      },
      getProjects () {
        return this.transactions.map(el => el.transaction.project).filter((value, index, self) => {
          return self.findIndex(el => el.id == value.id) === index
        })
      },
      getPaymentMethods () {
        let paymentMethods = []

        this.transactions.forEach(transaction => {
          let p = paymentMethods.find(method => method.id == transaction.transaction.payment_method.id);
          if (!p) {
            paymentMethods.push({
              id: transaction.transaction.payment_method.id,
              name: transaction.transaction.payment_method.name,
              count: 0
            })
          } else {
            p.count++
          }
        })

        return paymentMethods.sort((a, b) => a.count < b.count ? 1 : -1)

      },
      openDialog() {
        this.dialogPaymentMethods = true

        this.options.xaxis = this.getPaymentMethods().map(el => el.name)
        this.series.data = this.getPaymentMethods().map(el => el.count)
      }
    }
  }
</script>

<style>

</style>