<template>
  <div class="table">
    <message v-show="msg" :msg="msg" />

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
      <div v-for="burger in burgers" :key="burger.id" class="table__rows__row">
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
          <select v-model="burger.status" class="table__status" @change="updateBurger(burger)">
            <option value="Solicitado">Solicitado</option>
            <option value="Em Produção">Em Produção</option>
            <option value="Finalizado">Finalizado</option>
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
  components: {
    Message
  },

  data() {
    return {
      burgers: [], // Inicializando como array vazio
      msg: null
    };
  },

  mounted() {
    this.getPedidos();
  },

  methods: {
    async getPedidos() {
      try {
        const req = await fetch('https://67ed707f4387d9117bbda35a.mockapi.io/burgers/');
        if (!req.ok) throw new Error('Erro ao buscar pedidos');

        this.burgers = await req.json();
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    },

    async deleteBurger(id) {
      try {
        const req = await fetch(`https://67ed707f4387d9117bbda35a.mockapi.io/burgers/${id}`, {
          method: 'DELETE'
        });

        if (!req.ok) throw new Error('Erro ao deletar pedido');

        this.msg = 'Pedido removido com sucesso';
        setTimeout(() => (this.msg = ''), 3000);

        // Removendo o item do array localmente sem precisar recarregar a API
        this.burgers = this.burgers.filter((burger) => burger.id !== id);
      } catch (error) {
        console.error('Erro ao deletar pedido:', error);
      }
    },

    async updateBurger(burger) {
      try {
        const req = await fetch(
          `https://67ed707f4387d9117bbda35a.mockapi.io/burgers/${burger.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: burger.status })
          }
        );

        if (!req.ok) throw new Error(`Erro ao atualizar status: ${req.status}`);

        const res = await req.json();

        this.msg = `O pedido Nº ${res.id} foi atualizado para ${res.status}`;
        setTimeout(() => (this.msg = ''), 3000);
      } catch (error) {
        console.error('Erro ao atualizar status:', error);
      }
    }
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
    color: #fff;
    background-color: #333;
    border: 2px solid #ffa500;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
      background-color: transparent;
      color: #ffa500;
    }
  }
}
</style>
