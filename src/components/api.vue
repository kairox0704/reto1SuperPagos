<template>
  <div>
    <table>
      <tr>
        {{menor}}
        {{joven}}
        {{adulto}}  
        <div id="Candlet"></div>
      </tr>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id_de_caso"> 
          <td v-if="todo.edad<20">    
          </td>
        </tr>  
      </tbody>
    </table>
  </div>
</template>



<script>
import axios from'axios'
import Plotly from 'plotly.js-dist'

export default {
  name: 'api',
  data(){
    return{
      todos:null,
      menor : 0,
      joven : 0,
      adulto :0
    }
  },
  mounted(){
    this.getTodos();
    
  },
  methods: {
    getTodos(){
      axios.get
      ('https://www.datos.gov.co/resource/gt2j-8ykr.json')
      .then( Response =>{
        this.todos = Response.data
        console.log(this.todos)
        for(var todo in this.todos){
          if(this.todos[todo].edad <= 20){
            this.menor = this.menor + 1;
          }
          if(this.todos[todo].edad <= 40 && this.todos[todo].edad>=20){
            this.joven = this.joven + 1;
          }
          if(this.todos[todo].edad >= 40){
            this.adulto = this.adulto + 1;
          }
        }
        var data = [{
          values: [this.menor, this.joven, this.adulto],
          labels: ['0 - 20', '20 - 40', '40 o mas'],
          type: 'pie'
        }];

        var layout = {
          height: 400,
          width: 500
        }
        Plotly.newPlot('Candlet', data, layout);
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