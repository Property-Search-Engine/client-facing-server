// Mock Firebase Auth
const MOCK_CLIENT_ID = "5d6ede6a0ba62570afcedd3a";
const mockAuth = require("../../mock/middleware/auth-middleware")(MOCK_CLIENT_ID, "pepe@mail.com");
jest.mock('../../middleware/auth-middleware.js', () => mockAuth);
// Require everything else
const supertest = require("supertest");
const testServer = require("../../mock/db-test-server");
const app = require("../../server");
const setupTestDB = require("../../mock/seedTestDB");
const { parseQueryParams } = require("../../utils/properties");

const request = supertest(app);

beforeAll(async () => {
    await testServer.initTestServer();
    await setupTestDB.seedTestBookingsDB();
});

afterAll(async () => {
    await testServer.clearCollections();
    await testServer.stopTestServer();
});

describe("Properties routes", () => {
    it("Query params conversion", () => {
        const queryParams = {
            name: "Patata",
            age: 19,
            homeType: ["patata", "queso", "macarrones"],
            names: ["Victor", "Martinez", "Montané"],
            sold: true
        };
        //insert into db test_property with create property
        const string = parseQueryParams(queryParams);
        expect(string).toEqual("name=Patata&age=19&homeType[]=patata&homeType[]=queso&homeType[]=macarrones&names[]=Victor&names[]=Martinez&names[]=Montané&sold=true&");
    });
});