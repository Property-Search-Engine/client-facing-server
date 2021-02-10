// Mock Firebase Auth
const MOCK_CLIENT_ID = "5d6ede6a0ba62570afcedd3a";
const mockAuth = require("../../mock/middleware/auth-middleware")(MOCK_CLIENT_ID, "pepe@mail.com");
jest.mock('../../middleware/auth-middleware.js', () => mockAuth);
// Require everything else
const supertest = require("supertest");
const testServer = require("../../mock/db-test-server");
const app = require("../../server");
const setupTestDB = require("../../mock/seedTestDB");

const mockHome = setupTestDB.getHome();

jest.mock("../../controllers/property-controller", () => ({
    getPropertyById: () => mockHome
}))

const request = supertest(app);

beforeAll(async () => {
    await testServer.initTestServer();
    await setupTestDB.seedTestBookingsDB();
});

afterAll(async () => {
    await testServer.clearCollections();
    await testServer.stopTestServer();
});

describe("Private bookings routes", () => {
    it("can get property by Id", async () => {
        const postData = {
            propertyId: "spjdvbdfkgjfjhdsfhjds",
            contactInfo: {
                message: "Hey buddy how are you",
                name: "Jaster rogue"
            }
        };
        //insert into db test_property with create property
        const res = await request.post("/bookings").send(postData);
        const booking = res.body.data;
        expect(booking.status).toBe("pending");
        expect(booking.contactInfo).toMatchObject(postData.contactInfo);
    });
});