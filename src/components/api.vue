<template>
  <div class="holle">
    <div class="row">
      <div class="col-md-6">
        <div id="Candlet"></div>
      </div>
      <div class="col-md-6">
        <div id="ranking"></div>
      </div>
      <div class="col-md-4">
      </div>
      <div class="col-md-4">
        <div id="ranking2"></div>
      </div>
      <div class="col-md-4">
      </div>
    </div>
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
      canPCG:[],
      femenino: 0,
      masculino: 0
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

          if(this.todos[todo].sexo === 'M'){
            this.masculino = this.masculino + 1;
          }else{
            this.femenino = this.femenino + 1;
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
        var data = [{
          values: [this.menor, this.joven, this.adulto],
          labels: ['0 - 20', '20 - 40', '40 o mas'],
          type: 'pie'
        }];

        var layout = {
          title: 'grafica de contagios por edad',
          height: 600,
          width: 800
        }
        Plotly.newPlot('Candlet', data, layout);

        var trace1 = {
          type: 'bar',
          x: ['Hombres','Mujeres'],
          y: [this.masculino,this.femenino],
          
          marker: {
              color: '#C8A2C8',
              line: {
                  width: 2.5
              }
          }
        };

        var data = [ trace1 ];

        var layout = { 
          title: 'Grafica de contagios por genero',
          font: {size: 18}
        };

        var config = {responsive: true}

        Plotly.newPlot('ranking', data, layout, config );

        var gd = document.getElementById('ranking2');
        var data = [{type: 'funnel',
                     y: this.ciudadG, 
                     x: this.canPCG, 
        }];
        var layout = {
          title: 'Ranking de ciudades con mas contagios',
          margin: {l: 150}, width:800, height: 600}
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
principalCon {
    height: 200pt;
    margin:  10px;
}
</style>