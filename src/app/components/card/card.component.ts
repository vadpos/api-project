import { Component, Input, input } from '@angular/core';
import { Personaje } from '../../interfaces/personaje';
import { Episode } from '../../interfaces/episode'
import { NgClass, NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',

})
export class CardComponent {
  isShown: boolean = false;
  inicial: string = "";
  cadenaFinal: string = "";
  @Input() personaje!: Personaje


  showEpisodes() {
    this.isShown = !this.isShown;
  }

  sumChars(personaje: Personaje) {
    let cadena: string = "";
    personaje.episode.forEach(element => {
      cadena = (this.separateEpisode(element, true)).concat(", ", cadena);
    });

    let arrCadena = cadena.split(",");
    arrCadena.sort(this.comparar);
    arrCadena.shift(); //eliminamos el espacio en blanco
    cadena="";
    for(let i=0; i < arrCadena.length; i++){
      if(i=== 0) {
        cadena = (this.separateEpisode(arrCadena[arrCadena.length-(i+1)], false)).concat(cadena);
      }else{
        cadena = (this.separateEpisode(arrCadena[arrCadena.length-(i+1)], false)).concat(", ", cadena);
      }
      
    }
  
    return cadena;
  }

  comparar(a:any, b:any) {
    return a - b;
  }

  separateEpisode(text: any, isEpisodeType: boolean) {

    let textString = "";
    if(isEpisodeType){
      textString = text.toString();
    }else{
      textString = text;
    }

    let arrChars = textString.split("/");
    let lastChar = arrChars.pop();
    return lastChar!;

  }

}
