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
  pageGlobal: number  = 1;
  nextPage: string = "";
  previousPage: string = "";
  constructor(public http: HttpClient) {
    this.getData(this.pageGlobal);
   }
  async getData(page:number) {
    if(page === 1){
      await this.getCharacters("");
    }
    else{
      await this.getCharacters("?page=" + page.toString());
    }
     
  }

  private async getCharacters(page?: string) {
    await this.http.get<any>(environment.apiUrl + '/character' + page)
      .subscribe((res) => {
        this.nextPage = res.info.next;
        this.previousPage = res.info.prev;
        this.personajes = res.results.map(({ id, name, status, species, image, location, episode }: Personaje) => {
          return {
            id: id,
            name: name,
            status: status,
            species: species,
            image: image,
            location: location,
            episode: episode
          };
        });
        console.table(res);
        this.personajesCopy = this.personajes;
      });
  }

  private async getCharactersByName(name?: string){
    await this.http.get<any>(environment.apiUrl + '/character?name=' + name)
    .subscribe((res)=>{
      console.log({res})
      this.nextPage = res.info.next;
      this.previousPage = res.info.prev;

      this.personajes = res.results.map(({ id, name, status, species, image, location, episode }: Personaje)=>{
        return {
          id: id,
          name: name,
          status: status,
          species: species,
          image: image,
          location: location,
          episode: episode
        }
      });
      this.personajesCopy = this.personajes;
    })
  }

  filter2(e: any){
    const search: string = e.target.value;
    console.log({search});
    this.personajes = this.personajesCopy?.filter(({name}: Personaje)=>{
      return name.toLowerCase().includes(search.toLowerCase());
    })

  }

  async filter(e: any){
    const search: string = e.target.value;
    console.log({search});
        const res = await this.getCharactersByName(search);
        console.log({res})
        return res;


  }
  goToNextPage(e: any){
    const search: string = e.target.value;
   /* if(search){
      console.log({search})
      this.getCharactersByName(search);
    }else{
      /*this.pageGlobal += 1;
      this.getData(this.pageGlobal);
    }*/
    console.log("inside goToNextPage")
    this.simpleHttpCall(this.nextPage);

  }

  async simpleHttpCall(url: string){
     await this.http.get<any>(url).subscribe((res)=>{

      this.nextPage = res.info.next;
      this.previousPage = res.info.prev;

      //control if nextPage or previousPage is null
      this.personajes = res.results.map(({ id, name, status, species, image, location, episode }: Personaje)=>{
        return {
          id: id,
          name: name,
          status: status,
          species: species,
          image: image,
          location: location,
          episode: episode
        }
      });
      this.personajesCopy = this.personajes;
    })
  }

  goToPreviousPage(e: any){
    /*if(this.pageGlobal > 1){
      this.pageGlobal -= 1;
    }
    this.getData(this.pageGlobal);
    */
    this.simpleHttpCall(this.previousPage);
  }

}
