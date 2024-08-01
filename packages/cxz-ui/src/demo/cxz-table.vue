<template>
  <cxz-table :tableData="tableData" :columns="columnData">
    <template #left="scope">
      <cxz-button btnType="primary" size="default" @click.stop="leftClick(scope)">
        click
      </cxz-button>
    </template>
    <template #right="scope">
      <cxz-button btnType="primary" size="default" @click.stop="handleClick(scope)">
        click
      </cxz-button>
    </template>
  </cxz-table>
</template>

<script lang="ts" setup>
import { CxzTable } from '@cxz-ui/components/cxz-table'
import { CxzButton } from '@cxz-ui/components/cxz-button'
import { reactive } from 'vue'

const leftClick = ({ scope = {} } : any) => {
  console.log('leftClick', scope.row.name)
}

const handleClick = ({ scope = {} } : any) => {
  console.log('click', scope.row)
}

const data = [
 {
    date: '2016-05-01',
    name: 'Tomt',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-02',
    name: 'Toms',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Toma',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tomc',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]

const columns = [
  {
    prop: 'date',
    label: 'Date',
    width: 150,
    slot: 'left',
  },
  {
    prop: 'name',
    label: 'Name',
    width: 120,
  },
  {
    prop: 'state',
    label: 'State',
    width: 200,
  },
  {
    prop: 'city',
    label: 'City',
    width: 200,
  },
  {
    prop: 'address',
    label: 'Address',
  },
  {
    prop: 'zip',
    label: 'Zip',
    width: 200,
  },
  {
    fixed: 'right',
    label: 'Operations',
    minWidth: 200,
    slot: 'right',
  }
]

const tableData = reactive(data)

const columnData = reactive(columns)
</script>