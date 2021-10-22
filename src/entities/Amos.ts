class Amos {

    // A titre indicatif
    private static typesEN: Array<string> = ['Mammal', 'Bird', 'Fish', 'Amphibian', 'Reptile', 'Invertebrate'];
    private static typesFR: Array<string> = ['Mammifère', 'Oiseau', 'Poisson', 'Amphibien', 'Reptile', 'Invertébré'];

	// Currently registered animals/amos
    public static families: Array<string> = ['Félin', 'Canin', 'Colombidé', 'Laridée', 'Cyprinidé', 'Ranidae', 'Helicidae', 'Testudinidé', 'Testudinidé'];
    public static order: Array<string> = ['Carnivore', 'Rongeur', 'Columbiforme', 'Charadriiformes', 'Anoure', 'Testudine', 'Stylommatophore'];

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

    constructor(species: string, type: string,name: string, level: number, date: string) {
        this.species = species.charAt(0).toUpperCase();
        this.type = type;
        this.name = name === this.species ? this.species : name;
        this.level = level > 1 ? level : 1;
        this.date = new Date();
    }

    public serialize(): Object {
        return {
          id: this.id,
          species: this.species,
          type: this.type,
          name: this.name,
          level: this.level,
          capturedAt: this.capturedAt(),
        }
    }

    private capturedAt(): string {
        let dmy: Array<String> = this.formattedDate(); 
        return `${dmy[0]}/${dmy[1]}/${dmy[2]}`;
    }

    private formattedDate(): Array<String> {
        let day: string = String(this.date.getDate()).padStart(2, '0'); 
        let month: string = String(this.date.getMonth() + 1).padStart(2, '0'); 
        let year: string = String(this.date.getFullYear());
        return [day, month, year];
    }

}

export default Amos;