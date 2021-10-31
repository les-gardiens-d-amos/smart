import { colorForType } from "../style/theme";
import amosIcons from "../../assets/amosIcons";
import { content } from "../../locales/fr"

class Amos {
  private static readonly AVAILABLE_PROPS = [
    'id', 'user_id', 'animal_id', 
    'name', 'image_path', 'level', 
    'amos_type', 'name', 'species', 'created_at', 'updated_at'
  ];
  private static readonly EXPECTED_PROPS = ['name', 'species', 'amos_type'];

  private static validate(data: Object): void {

	// Object {
	// 	"amos_type": "invertebrate",
	// 	"animal_id": 10,
	// 	"created_at": "2021-10-29T15:59:17.721Z",
	// 	"id": "95f1ee39-3d70-4673-95ac-aad2e417cc55",
	// 	"image_path": "https://i.imgur.com/ufJaTfH.jpeg",
	// 	"level": 1,
	// 	"name": "snail",
	// 	"species": "snail",
	// 	"updated_at": "2021-10-29T15:59:17.721Z",
	// 	"user_id": "10888037-76d5-4329-aec9-9d1dccc6dd2b",
	//   },

    let keys = Object.keys(data);
    let speciesKeys = Object.keys(content.species);
    let typesKeys = Object.keys(content.types);

    Amos.EXPECTED_PROPS.forEach(el => {
      if (!keys.includes(el)) throw new Error(`Expected key ${el} is missing`);
    });

    keys.forEach(el => {
      if (!Amos.AVAILABLE_PROPS.includes(el)) throw new Error(`Unexpected extra property ${el}`);
    });

    if(!speciesKeys.includes(data.species)) throw new Error(`Unexpected species ${data.species}`)

    if(!typesKeys.includes(data.amos_type)) throw new Error(`Unexpected types ${data.amos_type}`)
  }

  public id: string;
  public user_id: number;
  public animal_id: number;
  public image_path: string;
  public level: number;
  public amos_type: string;
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
    this.date = (!!data['created_at'] ? new Date(data['created_at']) : new Date());
  }

  public serialize(): Object {
    let val = {...this};

    val['icon'] = amosIcons[val.species];
    val['typeColor'] = colorForType[val.amos_type];
    val.species = content.species[val.species];
    val['amos_type'] = content.types[val.amos_type];
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
