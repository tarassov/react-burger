describe("drags ingredients", function () {
	beforeEach(() => {
		// reset and seed the database prior to every test
		cy.exec("npm start");
	});

	it("should be available on localhost", function () {
		cy.visit("/");
	});

	it("opens modal with ingredients details", function () {
		cy.get('[data-test-id="ingredient"]').first().click();
		cy.contains("Детали ингредиента");
	});

	it("closes modal on close button click", function () {
		cy.get('[data-test-id="modal-close-button"]').click();
		cy.contains("Детали ингредиента").should("not.exist");
	});

	it("drags ingredients to constructor area", function () {
		cy.get('[data-test-id="ingredient"]').first().trigger("dragstart");
		cy.get('[data-test-id="drop-target"]').trigger("drop");
		cy.get('[data-test-id="drop-target"]').trigger("dragend");

		cy.get('[data-test-id="ingredient"]').eq(2).trigger("dragstart");
		cy.get('[data-test-id="drop-target"]').trigger("drop");
		cy.get('[data-test-id="drop-target"]').trigger("dragend");

		cy.get('[data-test-id="ingredient"]').last().trigger("dragstart");
		cy.get('[data-test-id="drop-target"]').trigger("drop");
		cy.get('[data-test-id="drop-target"]').trigger("dragend");

		cy.get('[data-test-id="burger-element"]').should("have.length", 2);
		cy.get('[data-test-id="burger-bun-element"]').should("have.length", 2);
	});
});
