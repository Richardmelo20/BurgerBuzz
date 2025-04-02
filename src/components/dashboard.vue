<template>
  <div class="table">
    <message :msg="msg" v-show="msg" />
    <div>
      <div class="table__heading">
        <div class="table__heading__order-id">#</div>
        <div class="product">Cliente:</div>
        <div class="product">Pão:</div>
        <div class="product">Carne:</div>
        <div class="product">Opcionais:</div>
        <div class="product">Ações:</div>
      </div>
    </div>
    <div class="table__rows">
      <div class="table__rows__row" v-for="burger in burgers" :key="burger.id">
        <div class="table__rows__row__order-number">
          {{ burger.id }}
        </div>
        <div class="product">
          {{ burger.name }}
        </div>
        <div class="product">
          {{ burger.pao }}
        </div>
        <div class="product">
          {{ burger.carne }}
        </div>
        <div class="product">
          <ul>
            <li v-for="(option, idx) in burger.opcionais" :key="idx">
              {{ option }}
            </li>
          </ul>
        </div>
        <div class="product">
          <select name="status" class="table__status" @change="updateBurger($event, burger.id)">
            <option value="">Selecionar</option>
            <option
              v-for="s in status"
              :key="s.id"
              :value="s.tipo"
              :selected="burger.status == s.tipo"
            >
              {{ s.tipo }}
            </option>
          </select>
          <button class="table__button" @click="deleteBurger(burger.id)">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from './message.vue';
export default {
  name: 'Dashboard',
  data() {
    return {
      burgers: null,
      burger_id: null,
      status: [],
      msg: null
    };
  },
  components: {
    Message
  },
  methods: {
    async getPedidos() {
      const req = await fetch('https://67ed707f4387d9117bbda35a.mockapi.io/burgers/');
      const data = await req.json();
      this.burgers = data;

      this.getStatus();
    },
    async getStatus() {
      const req = await fetch('https://67ed707f4387d9117bbda35a.mockapi.io/status');
      const data = await req.json();
      this.status = data;
    },
    async deleteBurger(id) {
      const req = await fetch(`https://67ed707f4387d9117bbda35a.mockapi.io/burgers/${id}`, {
        method: 'DELETE'
      });

      const res = await req.json();

      console.log(res);

      this.msg = 'Pedido removido com sucesso';

      setTimeout(() => {
        this.msg = '';
      }, 3000);

      this.getPedidos();
    },
    async updateBurger(event, id) {
      const option = event.target.value;

      const dataJson = JSON.stringify({ status: option });

      const req = await fetch(`https://67ed707f4387d9117bbda35a.mockapi.io/burgers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: dataJson
      });

      const res = await req.json();

      console.log(res);

      this.msg = `O pedido Nº ${res.id} foi atualizado para ${res.status}`;

      setTimeout(() => {
        this.msg = '';
      }, 3000);
    }
  },

  mounted() {
    this.getPedidos();
  }
};
</script>

<style lang="scss" scoped>
.table {
  max-width: 1200px;
  margin: 0 auto;

  &__rows,
  &__heading,
  &__rows__row {
    display: flex;
    flex-wrap: wrap;

    &__row {
      width: 100%;
      padding: 12px;
      border-bottom: 1px solid #ccc;

      &__order-number {
        width: 5%;
      }
    }
  }

  &__heading {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;

    &__order-id {
      width: 5%;
    }
  }

  .product {
    width: 19%;
  }

  select {
    padding: 12px 6px;
    margin-right: 12px;
  }

  &__button {
    font-size: 16px;
    font-weight: bold;
    margin: 0 auto;
    padding: 10px;
    color: $tertiary;
    background-color: #333;
    border: 2px solid $primary;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
      background-color: transparent;
      color: $primary;
    }
  }
}
</style>
