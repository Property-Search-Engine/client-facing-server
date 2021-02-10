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
    let booking = {};
    it("can create a booking", async () => {
        const postData = {
            propertyId: "spjdvbdfkgjfjhdsfhjds",
            contactInfo: {
                message: "Hey buddy how are you",
                name: "Jaster rogue"
            }
        };
        //insert into db test_property with create property
        const res = await request.post("/bookings").send(postData);
        booking = res.body.data;
        expect(booking.status).toBe("pending");
        expect(booking.contactInfo).toMatchObject(postData.contactInfo);
    });
    
    it("can get my bookings", async () => {
        //insert into db test_property with create property
        const res = await request.get("/bookings/all");
        const bookings = res.body.data;
        expect(bookings).toHaveLength(1);
        expect(bookings[0].contactInfo).not.toBeDefined();
    });

    it("can cancel a booking", async () => {
        //insert into db test_property with create property
        const res = await request.delete(`/bookings/${booking.property.id}`);
        let book = res.body.data;
        expect(book).toMatchObject(booking);
    });
});