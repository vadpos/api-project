import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Personaje } from '../../interfaces/personaje';
import { CardComponent } from "../../components/card/card.component";
import { CommonModule, NgFor } from '@angular/common';
//import { environment } from '../../../environments/environment';
environment
@Component({
    selector: 'app-main-page',
    standalone: true,
    templateUrl: './main-page.component.html',
    styles: ``,
    imports: [CardComponent, NgFor]
})
export class MainPageComponent  {
  personajes: Personaje[]  | undefined;
  personajesCopy: Personaje[] | undefined;
  constructor(public http: HttpClient) {
    this.getData();
   }
  async getData() {
      await this.http.get<any>(environment.apiUrl + '/character')
      .subscribe((res)=>{
        this.personajes = res.results.map(({id,name, status, species, image, location, episode}: Personaje) => {
          return {
            id: id,
            name: name,
            status: status,
            species: species,
            image: image,
            location: location,
            episode: episode
          }
        })
        console.table(res)
        this.personajesCopy = this.personajes;
      });
  }

  filter(e: any){
    const search: string = e.target.value;
    console.log({search});
    this.personajes = this.personajesCopy?.filter(({name}: Personaje)=>{
      return name.toLowerCase().includes(search.toLowerCase());
    })

  }

}
