import {Episode} from '../interfaces/episode';

export interface Personaje{
    id: number,
    name: string;
    status: string;
    species: string;
    image:string;
    location: string;
    episode: Episode[];
    pages: string;
}
