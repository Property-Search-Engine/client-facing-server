const db = require("../models");

const property = {
  price: 200000,
  description: "This is the house of your dreams",
  filters: ["petsAllowed"],
  images: ["https://geekculture.co/wp-content/uploads/2019/12/Pickle-Rick-3.jpeg"],
  surface: 200,
  contactInfo: {
    phone: "827948827",
    email: "pepe@mail.com"
  },
}

const PROPERTIES = [
  {
    employee_id: "5d6ede6a0ba62570afcedd3a",
    kind: "Home",
    homeType: "house",
    bedRooms: 3,
    bathRooms: 2,
    equipment: "full",
    condition: "newHome",
    address: {
      street: "C/Sant Antoni",
      number: 50,
      city: "Cerdañola del Vallés",
      state: "Catalonia",
      country: "Spain",
      coordinates: {
        lat: 0.1234,
        long: 1.2314
      }
    },
    ...property
  },
  {
    employee_id: "5d6ede6a0ba62570afcedd3a",
    kind: "Office",
    buildingUse: "coWorking",
    address: {
      street: "C/Sant Antoni",
      number: 50,
      city: "Barcelona",
      state: "Catalonia",
      country: "Spain",
      coordinates: {
        lat: 0.1234,
        long: 1.2314
      }
    },
    ...property
  },
  {
    employee_id: "10m0nAK1ipeJHDnyBDNsKPWjBJR2",
    kind: "Home",
    homeType: "house",
    bedRooms: 3,
    bathRooms: 2,
    equipment: "full",
    condition: "newHome",
    surface: 200,
    address: {
      street: "C/Sant Antoni",
      number: 50,
      city: "Cerdañola de Vallés",
      state: "Catalonia",
      country: "Spain",
      coordinates: {
        lat: 0.1234,
        long: 1.2314
      }
    },
    ...property
  },
  {
    employee_id: "10m0nAK1ipeJHDnyBDNsKPWjBJR2",
    kind: "Office",
    buildingUse: "coWorking",
    address: {
      street: "C/Sant a Antoni",
      number: 50,
      city: "Barcelona",
      state: "Catalonia",
      country: "Spain",
      coordinates: {
        lat: 0.1234,
        long: 1.2314
      }
    },
    ...property
  }
];

const USERS = [
  {
    _id: "5d6ede6a0ba62570afcedd3a",
    firstname: "Pepe",
    lastname: "Martinez",
    email: "pepe@mail.com",
  },
  {
    _id: "5d6ede6a0ba62570afcedd3b",
    firstname: "Home",
    lastname: "house",
    email: "qsdfsdfg@asdasd.com",
  },
  {
    _id: "QFjmud29ILafHvqQicIYQodNsFD2",
    firstname: "Test",
    lastname: "Test",
    email: "testing8@test.com",
  }
];

async function seedTestPropertiesDB() {
  const user1 = USERS[0];
  const user2 = USERS[2];

  await db.User.create(user1);
  await db.User.create(user2);

  await db.Property.insertMany(PROPERTIES);
}

function getHome() {
  return {
    ...PROPERTIES[0]
  };
}

function getOffice() {
  return {
    ...PROPERTIES[1]
  };;
}
function getMyHome() {
  return {
    ...PROPERTIES[2]
  };
}

function getMyOffice() {
  return {
    ...PROPERTIES[3]
  };
}

function getTestUser1() {
  return { ...USERS[0] };
}

function getTestUser2() {
  return { ...USERS[1] };
}

function getTestAuthUser() {
  return { ...USERS[2] };
}

module.exports = {
  getHome,
  getOffice,
  getMyHome,
  getMyOffice,
  getTestUser1,
  getTestUser2,
  seedTestPropertiesDB,
  getTestAuthUser
};
