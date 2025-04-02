<template>
  <div>
    <message v-show="msg" :msg="msg" />
    <div>
      <form class="form" @submit="createBurger">
        <div class="form__c-input">
          <label for="name">Nome do cliente:</label>
          <input id="name" v-model="name" type="text" placeholder="Digite o seu nome" />
        </div>
        <div class="form__c-input">
          <label for="pao">Escolha o pão:</label>
          <select id="pao" v-model="pao" name="pao">
            <option value="">Selecione o seu pão</option>
            <option v-for="select in paes" :key="select.id" :value="select.tipo">
              {{ select.tipo }}
            </option>
          </select>
        </div>
        <div class="form__c-input">
          <label for="carne">Escolha a carne do seu Burger:</label>
          <select id="carne" v-model="carne" name="carne">
            <option value="">Selecione o tipo de carne</option>
            <option v-for="select in carnes" :key="select.id" :value="select.tipo">
              {{ select.tipo }}
            </option>
          </select>
        </div>
        <div id="opcionais-container" class="form__c-input">
          <label for="opcionais">Selecione os opcionais:</label>
          <div
            v-for="opcional in opcionaisdata"
            :key="opcional.id"
            class="form__c-input__c-checkbox"
          >
            <input v-model="opcionais" type="checkbox" name="opcionais" :value="opcional.tipo" />
            <span>{{ opcional.tipo }}</span>
          </div>
        </div>
        <div class="form__c-input">
          <input type="submit" class="form__c-input__button" value="Criar meu Burger!" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import message from './message.vue';

export default {
  name: 'BurguerForm',
  components: {
    message
  },

  data() {
    return {
      paes: null,
      carnes: null,
      opcionaisdata: null,
      name: null,
      pao: null,
      carne: null,
      opcionais: [],
      msg: null
    };
  },

  mounted() {
    this.getIngredientes();
  },

  methods: {
    async getIngredientes() {
      try {
        const req = await fetch('https://67ed707f4387d9117bbda35a.mockapi.io/ingredientes');

        if (!req.ok) {
          throw new Error(`Erro na requisição: ${req.status} ${req.statusText}`);
        }

        const data = await req.json();

        // Filtrando ingredientes por categoria
        this.paes = data.filter((item) => item.categoria === 'pao');
        this.carnes = data.filter((item) => item.categoria === 'carne');
        this.opcionaisdata = data.filter((item) => item.categoria === 'opcional');
      } catch (error) {
        console.error('Erro ao buscar ingredientes:', error);
      }
    },

    async createBurger(e) {
      e.preventDefault();

      // Validação dos campos obrigatórios
      if (!this.name || !this.pao || !this.carne) {
        this.msg = 'Por favor, preencha todos os campos obrigatórios!';
        setTimeout(() => (this.msg = ''), 3000);
        return;
      }

      const data = {
        name: this.name,
        carne: this.carne,
        pao: this.pao,
        opcionais: this.opcionais, // Não precisa do `Array.from()`
        status: 'Solicitado'
      };

      try {
        const req = await fetch('https://67ed707f4387d9117bbda35a.mockapi.io/burgers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (!req.ok) {
          throw new Error(`Erro ao criar pedido: ${req.status} ${req.statusText}`);
        }

        const res = await req.json();
        this.msg = `Pedido Nº ${res.id} realizado com sucesso`;
        console.log('Mensagem definida:', this.msg);

        setTimeout(() => {
          this.msg = '';
        }, 3000);

        // Resetando os campos do formulário
        this.name = '';
        this.carne = '';
        this.pao = '';
        this.opcionais = [];

        console.log('Campos resetados:', this.name, this.carne, this.pao, this.opcionais);
      } catch (error) {
        console.error('Erro ao criar burger:', error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  max-width: 400px;
  margin: 0 auto;

  &__c-input {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    label {
      font-weight: bold;
      color: $primary;
      border-left: 4px solid $tertiary;
      margin-bottom: 15px;
      padding: 5px 10px;
    }

    input,
    select {
      width: 300px;
      padding: 5px 10px;
    }

    &__c-checkbox {
      display: flex;
      align-items: flex-start;
      width: 50%;
      margin-bottom: 20px;

      span,
      input {
        width: auto;
      }

      span {
        margin-left: 6px;
        font-weight: bold;
      }
    }

    &__button {
      font-size: 16px;
      font-weight: bold;
      color: $tertiary;
      background-color: $primary;
      border: 2px solid $primary;
      padding: 10px;
      cursor: pointer;
      transition: 0.5s;

      &:hover {
        background-color: transparent;
        color: $primary;
      }
    }
  }

  #opcionais-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    label {
      width: 100%;
    }
  }
}
</style>
