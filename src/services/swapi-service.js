export default class SwapiService {

  _apiBase = 'https://swapi.dev/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  }

  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results;
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  }

  _transformPerson(person){
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor
    };
  }

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results;
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }

  _transformPlanet(planet){
    return {
      id: this._extractId(planet), 
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }

  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results;
  }

  async getStarship(id) {
    const starship = await this.getResource(`/starships/${id}/`);
    return this._transformStarship(starship);
  }

  _transformStarship(starship){
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    };
  }

  _extractId(model){
    const idRegExp = /\/([0-9]*)\/$/;
    const id = model.url.match(idRegExp)[1];
    return id;
  }
}
