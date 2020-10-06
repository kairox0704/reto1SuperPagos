<template>
  <div>
    <table>
      <tr>
        {{menor}}
        {{joven}}
        {{adulto}}  
        <div id="Candlet"></div>
        <div id="ranking"></div>
        <div id="ranking2"></div>
        
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
      adulto :0,
      ciudades:[],
      canPCit:[],
      ciudadG:[],
      canPCG:[]
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
        for(var todo in this.todos){
          var Exist = false;
          if(this.ciudades.length === 0){
            this.ciudades.push(this.todos[todo].ciudad_de_ubicaci_n);
            this.canPCit.push(1);
          }

          if(this.ciudades.length !== 0){
            for (let i = 0; i < this.ciudades.length; i++) {
              if(this.ciudades[i] == this.todos[todo].ciudad_de_ubicaci_n){
                Exist = true;
                this.canPCit[i] = this.canPCit[i] + 1;
              }
            }
            if(Exist === false){
              this.ciudades.push(this.todos[todo].ciudad_de_ubicaci_n);
              this.canPCit.push(1);
            }
            Exist = false;
          }

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
        for (let mayores = 0; mayores < 4; mayores++) {
          var lex = 0;
          var aux = 0;
          for (let ciudad = 0; ciudad < this.ciudades.length; ciudad++) {
            if(this.canPCit[ciudad]>=lex){
              lex = this.canPCit[ciudad];
              aux = ciudad;
            }
          }
          this.ciudadG.push(this.ciudades[aux]);
          this.canPCG.push(this.canPCit[aux]);
          this.canPCit[aux] = 0;
        }
        console.log(this.ciudades.length);
        console.log(this.canPCit.length);
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

        var trace1 = {
          type: 'bar',
          x: this.ciudadG,
          y: this.canPCG,
          marker: {
              color: '#C8A2C8',
              line: {
                  width: 2.5
              }
          }
        };

        var data = [ trace1 ];

        var layout = { 
          title: 'Ranking de ciudades con mas contagios',
          font: {size: 18}
        };

        var config = {responsive: true}

        Plotly.newPlot('ranking', data, layout, config );

        var gd = document.getElementById('ranking2');
        var data = [{type: 'funnel',
                     y: this.ciudadG, 
                     x: this.canPCG, 
        }];
        var layout = {margin: {l: 150}, width:600, height: 500}
        Plotly.newPlot('ranking2', data, layout);
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