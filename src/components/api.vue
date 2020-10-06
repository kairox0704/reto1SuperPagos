<template>
  <div>
    <table>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id_de_caso"> 
          <td> {{todo.id_de_caso}} </td>
          <td> {{todo.edad}} </td>
          <td> {{todo.estado}} </td>
          <td> {{todo.ciudad_de_ubicaci_n}} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from'axios'
export default {
  name: 'api',
  data (){
    return{
      todos:null
    }
  },
  mounted(){
    this.getTodos();
  },
  methods: {
    getTodos(){
      axios
          .get('https://www.datos.gov.co/resource/gt2j-8ykr.json')
            .then( Response =>{
              this.todos = Response.data
            })
            .catch( e=> console.log(e))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
