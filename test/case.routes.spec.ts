import request from 'supertest';
const server = require('../index');

import { createOfficer, removeAllCases, removeAllOfficers } from './helper';
import { CaseFixture } from './fixtures';

const endpoint = "http://localhost:3000/api";

afterAll(() => {
	return Promise.all([removeAllOfficers, removeAllCases]);
});

describe("Testing Cases API [routes]", () => {
	it('post endpoint creates a case', async () => {
		const response = await request(endpoint)
			.post('/cases')
			.send(CaseFixture)
			.set('Accept', 'application/json');
		
		expect(response.status).toBe(200);
		expect(response.body.id).toBe(1);
		expect(response.body.reporter).toBe(CaseFixture.reporter);
		expect(response.body.status).toBe("PENDING");
	});

	it("get endpoint returns an array of cases", async () => {

		const response = await request(endpoint).get('/cases');

		expect(response.status).toBe(200);
		expect(response.body).toBeInstanceOf(Array);
		expect(response.body).toHaveLength(1);
	});

	it("get:id endpoint returns case with officer included", async () => {
		await createOfficer();
		
		const createdCase = await request(endpoint)
			.post('/cases')
			.send(CaseFixture)
			.set('Accept', 'application/json');

		const response = await request(endpoint).get(`/cases/${createdCase.body.id}`);

		expect(response.status).toBe(200);
		expect(response.body.Officer).toHaveProperty('id');
		expect(response.body.Officer).toHaveProperty('name');
	});

	it("resolve endpoint resolves a case and returns it with updated status", async () => {		
		const cases: any = await request(endpoint).get('/cases');

		const response = await request(endpoint).post(`/cases/${cases.body[0].id}/resolve`);

		expect(response.status).toBe(200);
		expect(response.body.status).toBe('RESOLVED');
		expect(response.body.officerId).toBeNull();
	});
});