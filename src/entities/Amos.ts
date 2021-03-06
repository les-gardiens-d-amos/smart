import amosIcons from "../../assets/amosIcons";
import AmosData from "../app/data/AmosData.json";
import AmosIconColors from "../app/data/AmosIconColors.json";
import { Utils } from "../app/Utils";

class Amos {
  private static readonly AVAILABLE_PROPS = [
    "id",
    "user_id",
    "animal_id",
    "name",
    "image_path",
    "level",
    "amos_type",
    "name",
    "species",
    "location",
    "image_id",
    "created_at",
    "updated_at"
  ];
  private static readonly EXPECTED_PROPS = ["name", "species", "amos_type"];

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
    // 	"location": "9f5d65d",
    // 	"updated_at": "2021-10-29T15:59:17.721Z",
    // 	"user_id": "10888037-76d5-4329-aec9-9d1dccc6dd2b",
    //   },

    let keys = Object.keys(data);
    let speciesKeys = Object.keys(AmosData.amos);
    let typesKeys = Object.keys(AmosData.types);

    Amos.EXPECTED_PROPS.forEach((el) => {
      if (!keys.includes(el)) throw new Error(`Expected key ${el} is missing`);
    });

    keys.forEach((el) => {
      if (!Amos.AVAILABLE_PROPS.includes(el))
        throw new Error(`Unexpected extra property ${el}`);
    });

    if (!speciesKeys.includes(data.species))
      throw new Error(`Unexpected species ${data.species}`);

    if (!typesKeys.includes(data.amos_type))
      throw new Error(`Unexpected types ${data.amos_type}`);
  }

  public id: string;
  public user_id: number;
  public animal_id: number;
  public image_path: string;
  public level: number;
  public amos_type: string;
  public name: string;
  public species: string;
  public location: string;
  public image_id: string;
  public date: Date;

  constructor(data: Object) {
    Amos.validate(data);

    Object.assign(this, { ...data });
    this.name = data["name"];
    this.level = data["level"] > 1 ? data["level"] : 1;
    this.date = !!data["created_at"]
      ? new Date(data["created_at"])
      : new Date();
  }

  public serialize(): Object {
    let val = { ...this };

    // Traduction file will be potentially dynamic later, for now french file is used
    const speciesLocal = Utils.capitalize(AmosData.amos[val.species].species);
    const typeLocal = Utils.capitalize(AmosData.amos[val.species].type);

    val["icon"] =
      amosIcons[val.species] == undefined
        ? amosIcons.default
        : amosIcons[val.species];
    val["typeColor"] = AmosIconColors[val.amos_type];
    val.species = speciesLocal;
    val["amos_type"] = typeLocal;
    val["location"] = this.location;
    val["image_id"] = this.image_id
    val["capturedAt"] = this.capturedAt();
    delete val.date;

    return { ...val };
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
