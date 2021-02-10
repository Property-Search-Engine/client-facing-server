const MOCK_EMPLOYEE_ID = "QFjmud29ILafHvqQicIYQodNsFD2";
const mockAuth = require("../../mock/middleware/auth-middleware")(MOCK_EMPLOYEE_ID, "testing8@test.com");
jest.mock('../../middleware/auth-middleware.js', () => mockAuth);

const supertest = require("supertest");
const testServer = require("../../mock/db-test-server");
const { getTestAuthUser, getHome, getMyHome, getMyOffice } = require("../../mock/seedTestDB");
const app = require("../../server");

const request = supertest(app);

beforeAll(async () => {
    await testServer.initTestServer();
});

afterAll(async () => {
    await testServer.clearCollections();
    await testServer.stopTestServer();
});

describe("user route", () => {
    const testUser = getTestAuthUser();

    it("can sign up a new user", async () => {
        const res = await request
            .post("/user/register")
            .send(testUser);
        expect(res.status).toBe(200);
        expect(res.body.data._id).toBeDefined();
        expect(res.body.data.email).toBe(testUser.email);
        expect(res.body.error).toBeUndefined();
    });

    it("can login", async () => {
        const loginRes = await request.post("/user/login");
        expect(loginRes.status).toBe(200);
        expect(loginRes.body.data.email).toBe(testUser.email);
        expect(loginRes.body.data.firstname).toEqual(testUser.firstname);
        expect(loginRes.body.data.lastname).toEqual(testUser.lastname);
        expect(loginRes.body.error).toBeUndefined();
    });

    it("can update", async () => {
        const loginRes = await request.put("/user/profile")
            .send({ firstname: "Changed", lastname: "Changed" });
        expect(loginRes.status).toBe(201);
        expect(loginRes.body.data.firstname).toEqual("Changed");
        expect(loginRes.body.data.lastname).toEqual("Changed");
        expect(loginRes.body.error).toBeUndefined();
    });

    it("can delete user", async () => {
        const deletedRes = await request.delete("/user/");
        expect(deletedRes.status).toBe(202);
        expect(deletedRes.body.message).toEqual("Employee deleted");
        expect(deletedRes.body.error).toBeNull();
    });

    it("can't login", async () => {
        const notloginRes = await request.post("/user/login");
        expect(notloginRes.status).toBe(404);
        expect(notloginRes.body.error).toEqual("User not found.");
    });
});