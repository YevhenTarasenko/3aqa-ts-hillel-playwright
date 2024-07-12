import { test, expect } from '@playwright/test';

test.use({ storageState: 'setup/session-storage.json' });
test('[Valid] Create AUDI TT with min mileage car', async ({ request }) => {
	// Create car
	const response = await request.post('api/cars', {
		data: { carBrandId: 1, carModelId: 1, mileage: 0 },
	});

	const body = await response.json();
	const carId = body.data.id;

	await expect.soft(body.status, 'check status').toBe('ok');
	await expect.soft(body.data.carBrandId, 'check carBrandId').toBe(1);
	await expect.soft(body.data.carModelId, 'check carModelId').toBe(1);
	await expect.soft(body.data.mileage, 'check mileage').toBe(0);
	await expect.soft(body.data.brand, 'check brand').toBe('Audi');
	await expect.soft(body.data.model, 'check model').toBe('TT');

	// Postcondition: Delete car
	const deleteResponse = await request.delete(`api/cars/${carId}`);
	const deleteBody = await deleteResponse.json();
	await expect.soft(deleteBody.status, 'status').toBe('ok');
	await expect.soft(deleteBody.data.carId, 'id').toBe(carId);
});

test('[Valid] Create AUDI A8 with min mileage car', async ({ request }) => {
	// Create car
	const response = await request.post('api/cars', {
		data: { carBrandId: 1, carModelId: 5, mileage: 0 },
	});

	const body = await response.json();
	const carId = body.data.id;

	await expect.soft(body.status, 'check status').toBe('ok');
	await expect.soft(body.data.carBrandId, 'check carBrandId').toBe(1);
	await expect.soft(body.data.carModelId, 'check carModelId').toBe(5);
	await expect.soft(body.data.mileage, 'check mileage').toBe(0);
	await expect.soft(body.data.brand, 'check brand').toBe('Audi');
	await expect.soft(body.data.model, 'check model').toBe('A8');

	// Postcondition: Delete car
	const deleteResponse = await request.delete(`api/cars/${carId}`);
	const deleteBody = await deleteResponse.json();
	await expect.soft(deleteBody.status, 'status').toBe('ok');
	await expect.soft(deleteBody.data.carId, 'id').toBe(carId);
});

test('[Valid] Create BMW X5 car', async ({ request }) => {
	// Create car
	const response = await request.post('api/cars', {
		data: { carBrandId: 2, carModelId: 8, mileage: 1500 },
	});

	const body = await response.json();
	const carId = body.data.id;

	await expect.soft(body.status, 'check status').toBe('ok');
	await expect.soft(body.data.carBrandId, 'check carBrandId').toBe(2);
	await expect.soft(body.data.carModelId, 'check carModelId').toBe(8);
	await expect.soft(body.data.mileage, 'check mileage').toBe(1500);
	await expect.soft(body.data.brand, 'check brand').toBe('BMW');
	await expect.soft(body.data.model, 'check model').toBe('X5');

	// Postcondition: Delete car
	const deleteResponse = await request.delete(`api/cars/${carId}`);
	const deleteBody = await deleteResponse.json();
	await expect.soft(deleteBody.status, 'status').toBe('ok');
	await expect.soft(deleteBody.data.carId, 'id').toBe(carId);
});

test('[Invalid] Create invalid car with carBrandId = 0', async ({ request }) => {
	// Create car
	const response = await request.post('api/cars', {
		data: { carBrandId: 0, carModelId: 8, mileage: 1500 },
	});

	const body = await response.json();

	await expect.soft(body.status, 'check status').toBe('error');
	await expect.soft(body.message, 'check error message').toBe('Brand not found');
});

test('[Invalid] Create invalid car with carBrandId = 6', async ({ request }) => {
	// Create car
	const response = await request.post('api/cars', {
		data: { carBrandId: 6, carModelId: 8, mileage: 1500 },
	});

	const body = await response.json();

	await expect.soft(body.status, 'check status').toBe('error');
	await expect.soft(body.message, 'check error message').toBe('Brand not found');
});

test('[Invalid] Create invalid car with carModelId = 0', async ({ request }) => {
	// Create car
	const response = await request.post('api/cars', {
		data: { carBrandId: 1, carModelId: 0, mileage: 1500 },
	});

	const body = await response.json();

	await expect.soft(body.status, 'check status').toBe('error');
	await expect.soft(body.message, 'check error message').toBe('Model not found');
});

test('[Invalid] Create invalid car with mileage = -1', async ({ request }) => {
	// Create car
	const response = await request.post('api/cars', {
		data: { carBrandId: 1, carModelId: 0, mileage: -1 },
	});

	const body = await response.json();

	await expect.soft(body.status, 'check status').toBe('error');
	await expect.soft(body.message, 'check error message').toBe('Mileage has to be from 0 to 999999');
});

test('[Invalid] Create invalid car with mileage = 1000000', async ({ request }) => {
	// Create car
	const response = await request.post('api/cars', {
		data: { carBrandId: 1, carModelId: 0, mileage: 1000000 },
	});

	const body = await response.json();

	await expect.soft(body.status, 'check status').toBe('error');
	await expect.soft(body.message, 'check error message').toBe('Mileage has to be from 0 to 999999');
});
