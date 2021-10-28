import { colorForType } from "../style/theme";
import amosIcons from "../../assets/amosIcons";
import { content } from "../../locales/fr"

class Amos {
  private static readonly AVAILABLE_PROPS = [
    'idAmos', 'idOwner', 'id', 
    'name', 'imagePath', 'level', 
    'type', 'name', 'species', 'date'
  ];
  private static readonly EXPECTED_PROPS = ['name'];

  private static validate(data: Object): void {
    let keys = Object.keys(data);

    Amos.EXPECTED_PROPS.forEach(el => {
      if (!keys.includes(el)) throw new Error(`Expected key ${el} is missing`);
    });

    keys.forEach(el => {
      if (!Amos.AVAILABLE_PROPS.includes(el)) throw new Error(`Unexpected extra property ${el}`);
    });
  }

  public idAmos: number;
  public idOwner: number;
  public id: number;
  public imagePath: string;
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

  constructor(data: Object) {
    Amos.validate(data);
    
    Object.assign(this, {...data});
    this.name = data['name'];
    this.level = data['level'] > 1 ? data['level'] : 1;
    this.date = (!!data['date'] ? new Date(data['date']) : new Date());
  }

  public serialize(): Object {
    let val = {...this};
    val['icon'] = amosIcons[val.species];
    val['typeColor'] = colorForType[val.type];
    val.species = this.capitalize(content.species[val.species]);
    val.type = this.capitalize(content.types[val.type]);
    val['capturedAt'] = this.capturedAt();
    delete val.date;

    return { ...val }
  }

  private capitalize(str: string): string {
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
