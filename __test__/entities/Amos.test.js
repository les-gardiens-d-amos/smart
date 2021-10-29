import Amos from "../../src/entities/Amos";

describe('constructor', () => {
  it('return error with extra property toto', () => {
    expect(() => new Amos(
      {id: 12, animal_id: 5, user_id: 55,
      image_path: "https://imgur.com/toto.jpg",
      species: "cat", amos_type: "mammal", name: "Pitichat",
      level: 22, created_at: "Tue Oct 26 2021 20:57:16", toto: 42}
    )).toThrowError();
  });

  it('return error with missing property name', () => {
    expect(() => new Amos(
      {id: 12, animal_id: 5, user_id: 55,
      image_path: "https://imgur.com/toto.jpg",
      species: "cat", amos_type: "mammal",
      level: 22, created_at: "Tue Oct 26 2021 20:57:16"}
    )).toThrowError();
  });

  it('return error with unknow type', () => {
    expect(() => new Amos(
      {id: 12, animal_id: 5, user_id: 55,
      image_path: "https://imgur.com/toto.jpg",
      species: "cat", amos_type: "toto", name: "Pitichat",
      level: 22, created_at: "Tue Oct 26 2021 20:57:16"}
    )).toThrowError();
  });


  it('return error with unknow species', () => {
    expect(() => new Amos(
      {id: 12, animal_id: 5, user_id: 55,
      image_path: "https://imgur.com/toto.jpg",
      species: "toto", amos_type: "mammal", name: "Pitichat",
      level: 22, created_at: "Tue Oct 26 2021 20:57:16"}
    )).toThrowError();
  });
});

describe('#serialize()', () => {
  it('return serialized Amos', () => {
    let cat = new Amos(
      {id: 12, animal_id: 5, user_id: 55,
      image_path: "https://imgur.com/toto.jpg",
      species: "cat", amos_type: "mammal", name: "Pitichat",
      level: 22, created_at: "2021-10-29T15:59:17.721Z",}
    )
    expect(cat.serialize()).toEqual({capturedAt: "29/10/2021", icon: 1, id: 12, animal_id: 5, user_id: 55, image_path: "https://imgur.com/toto.jpg", level: 22,created_at: "2021-10-29T15:59:17.721Z", name: "Pitichat", species: "Chat", amos_type: "Mammifère", typeColor: "#F887B0"});
  });
});
