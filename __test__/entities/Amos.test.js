import Amos from "../../src/entities/Amos";

describe('constructor', () => {
  it('return error with extra property toto', () => {
    expect(() => new Amos(
      {idAmos: 5, idOwner: "DaUser", id: 1,
      imagePath: "https://imgur.com/toto.jpg",
      species: "cat", type: "mammal", name: "Pitichat",
      level: 22, date: "Tue Oct 26 2021 20:57:16", toto: 42}
    )).toThrowError();
  });

  it('return error with missing property name', () => {
    expect(() => new Amos(
      {idAmos: 5, idOwner: "DaUser", id: 1,
      imagePath: "https://imgur.com/toto.jpg",
      species: "cat", type: "mammal",
      level: 22, date: "Tue Oct 26 2021 20:57:16"}
    )).toThrowError();
  });

  it('return error with unknow type', () => {
    expect(() => new Amos(
      {idAmos: 5, idOwner: "DaUser", id: 1,
      imagePath: "https://imgur.com/toto.jpg",
      species: "cat", type: "toto", name: "Pitichat",
      level: 22, date: "Tue Oct 26 2021 20:57:16"}
    )).toThrowError();
  });


  it('return error with unknow species', () => {
    expect(() => new Amos(
      {idAmos: 5, idOwner: "DaUser", id: 1,
      imagePath: "https://imgur.com/toto.jpg",
      species: "toto", type: "mammal", name: "Pitichat",
      level: 22, date: "Tue Oct 26 2021 20:57:16"}
    )).toThrowError();
  });
});

describe('#serialize()', () => {
  it('return serialized Amos', () => {
    let cat = new Amos(
      {idAmos: 5, idOwner: "DaUser", id: 1,
      imagePath: "https://imgur.com/toto.jpg",
      species: "cat", type: "mammal", name: "Pitichat",
      level: 22, date: "Tue Oct 26 2021 20:57:16"}
    )
    expect(cat.serialize()).toEqual({capturedAt: "26/10/2021", icon: 1, id: 1, idAmos: 5, idOwner: "DaUser", imagePath: "https://imgur.com/toto.jpg", level: 22, name: "Pitichat", species: "Chat", type: "Mammifère", typeColor: "#F887B0"});
  });
});
