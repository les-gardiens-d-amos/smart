class Amos {
  // A titre indicatif

  private static typesEN: Array<string> = [
    "Mammal",
    "Bird",
    "Fish",
    "Amphibian",
    "Reptile",
    "Invertebrate",
  ];
  private static typesFR = {
    mammal: "Mammifère",
    bird: "Oiseau",
    fish: "Poisson",
    amphibian: "Amphibien",
    reptile: "Reptile",
    invertebrate: "Invertébré",
  };

  private static speciesFR = {
    cat: "Chat",
    dog: "Chien",
    squirrel: "Ecureuil",
    pigeon: "Pigeon",
    seagull: "Mouette",
    goeland: "Goéland",
    cormoran: "Cormoran",
    turtle: "Tortue",
    frog: "Grenouille",
    snail: "Escargot",
  };

  // Currently registered animals/amos
  public static families: Array<string> = [
    "Félin",
    "Canin",
    "Colombidé",
    "Laridée",
    "Cyprinidé",
    "Ranidae",
    "Helicidae",
    "Testudinidé",
    "Testudinidé",
  ];
  public static order: Array<string> = [
    "Carnivore",
    "Rongeur",
    "Columbiforme",
    "Charadriiformes",
    "Anoure",
    "Testudine",
    "Stylommatophore",
  ];

  public idAmos: number;
  public idOwner: number;
  public id: number;
  public level: number;
  public type: string;
  public name: string;
  public species: string;
  public date: Date;

  public static isRegistered(name: string) {
    // Check if the animal is registered in the database and return its data, returns undefined otherwise
    // for now uses amosData dictionary
    // return Amos.amosData[name];
  }

  constructor(
    idAmos: number,
    idOwner: number,
    id: number,
    species: string,
    type: string,
    name: string,
    level: number,
    date: string
  ) {
    this.idAmos = idAmos;
    this.id = id;
    this.idOwner = idOwner;
    this.species = species;
    this.type = type;
    this.name = name === this.species ? this.species : name;
    this.level = level > 1 ? level : 1;
    this.date = new Date(date);
  }

  public serialize(): Object {
    return {
      idAmos: this.idAmos,
      idOwner: this.idOwner,
      id: this.id,
      species: this.capitalize(Amos.speciesFR[this.species]),
      type: this.capitalize(Amos.typesFR[this.type]),
      name: this.name,
      level: this.level,
      capturedAt: this.capturedAt(),
    };
  }

  private capitalize(str): string {
    let capi = str.charAt(0).toUpperCase();
    return capi + str.slice(1);
  }

  private capturedAt(): string {
    let dmy: Array<String> = this.formatDate();
    return `${dmy[0]}/${dmy[1]}/${dmy[2]}`;
  }

  private formatDate(): Array<String> {
    let day: string = String(this.date.getDate()).padStart(2, "0");
    let month: string = String(this.date.getMonth() + 1).padStart(2, "0");
    let year: string = String(this.date.getFullYear());
    return [day, month, year];
  }
}

export default Amos;
