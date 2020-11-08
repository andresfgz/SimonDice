      const celeste = document.getElementById('celeste')
      const violeta = document.getElementById('violeta') //Tomamos los ids de los triangulos 
      const naranja = document.getElementById('naranja')
      const verde = document.getElementById('verde')
      const btnEmpezar = document.getElementById('btnEmpezar')
      const ultimoNivel = 10
      
      class Juego {
        constructor() {
          setTimeout(() =>{
            this.inicializar()
            this.generarSecuencia()
            setTimeout(this.siguienteNivel(),1000)
          },500)
          
        }

        inicializar() {
          this.ElegirColor = this.ElegirColor.bind(this)
          this.toggleBtnEmpezar()
          this.nivel = 1
          this.colores = {
            celeste,
            violeta,
            naranja,
            verde
          }
        }
        toggleBtnEmpezar() {
          if(btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
          } else {
            btnEmpezar.classList.add('hide')
      
          }
        }

        

        generarSecuencia(){
          //con array definitimo en size ,fill llenamos el array de 0
          //ya que el metodo map necesita que tenga valores
          //multiplicamos el defimal de random x4 
          //math floor redondea el numero a bajao
          this.secuencia = new Array(ultimoNivel).fill(0).map(n => Math.floor(Math.random()*4))
        }

        siguienteNivel() {
          this.subnivel = 0
          this.iluminarSecuencia()
          this.agregarEvenClick()
          
        }

        transformNumeroAColor(numero) {
            switch (numero){
              case 0: 
                  return 'celeste'
              case 1:
                  return 'violeta'
              case 2:
                  return 'naranja'
              case 3:
                  return 'verde'
          }
        }

        transformColorANum(color) {
          switch (color){
            case 'celeste': 
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
      }
        iluminarSecuencia() {
          for (let i=0; i < this.nivel; i++){
            const color = this.transformNumeroAColor(this.secuencia[i])
            setTimeout(()=> this.iluminarColor(color),1000 * i)
          }
        }

        iluminarColor(color) {
          this.colores[color].classList.add('light')
          setTimeout(()=> this.apagarColor(color),450)
        }

        apagarColor(color){
          this.colores[color].classList.remove('light')
        }

        agregarEvenClick() {
          this.colores.celeste.addEventListener('click',this.ElegirColor)
          this.colores.verde.addEventListener('click',this.ElegirColor)
          this.colores.violeta.addEventListener('click',this.ElegirColor)
          this.colores.naranja.addEventListener('click',this.ElegirColor)
        }

        eliminarEvenClick() {
          this.colores.celeste.removeEventListener('click',this.ElegirColor)
          this.colores.verde.removeEventListener('click',this.ElegirColor)
          this.colores.violeta.removeEventListener('click',this.ElegirColor)
          this.colores.naranja.removeEventListener('click',this.ElegirColor)
        }

        ElegirColor(ev) {
          const nombreColor = ev.target.dataset.color
          const numeroColor = this.transformColorANum(nombreColor)
          this.iluminarColor(nombreColor)
          if (numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if (this.subnivel === this.nivel){
              this.nivel++
              this.eliminarEvenClick()
              if(this.nivel === (ultimoNivel+1)){
                this.ganoElJuego()
              }else {
               setTimeout(this.siguienteNivel.bind(this),1500) 
              }

            }
          } else {
              this.perdioElJuego()
          }
          
        }

        ganoElJuego() {
          swal('Simon Dice', 'Felicidades, Has ganado!', 'success')
          .then(this.inicializar.bind(this))
        }

        perdioElJuego() {
          swal('Simon Dice', 'Has perdido el juego!', 'error')
            .then(()=> {
              this.eliminarEvenClick()
              this.inicializar()
            })

        }
      }
      
      function empezarJuego() { //creamos un nuevo juego
         window.juego = new Juego()
      }

