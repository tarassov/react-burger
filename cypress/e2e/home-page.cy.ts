describe("drags ingredients", function () {
	beforeEach(() => {
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
		cy.get('[data-test-id="ingredient"]')
			.contains("Краторная булка")
			.trigger("dragstart");
		cy.get('[data-test-id="drop-target"]').trigger("drop").trigger("dragend");

		cy.get('[data-test-id="ingredient"]')
			.contains("Соус Spicy-X")
			.trigger("dragstart");
		cy.get('[data-test-id="drop-target"]').trigger("drop").trigger("dragend");

		cy.get('[data-test-id="ingredient"]')
			.contains("Сыр с астероидной плесенью")
			.trigger("dragstart");
		cy.get('[data-test-id="drop-target"]').trigger("drop").trigger("dragend");

		cy.get('[data-test-id="burger-element"]')
			.contains("Соус Spicy-X")
			.should("exist");
		cy.get('[data-test-id="burger-element"]')
			.contains("Сыр с астероидной плесенью")
			.should("exist");
		cy.get('[data-test-id="burger-element"]').should("have.length", 2);
		cy.get('[data-test-id="burger-bun-element"]').should("have.length", 2);
	});

	it("reorders burger elements by drgaging the last one up", function () {
		cy.get('[data-test-id="burger-element"]')
			.contains("Сыр с астероидной плесенью")
			.within((list) => {
				const elText = list.text;
			});
		// 	cy.get('[data-test-id="burger-element-drag"]')
		// 	.trigger("dragstart");)
		// cy.get('[data-test-id="burger-element"]')
		// 	.contains("Соус Spicy-X90")
		// 	.trigger("drop")
		// 	.trigger("dragend");

		// cy.get('[data-test-id="burger-element"]')
		// 	.last()
		// 	.should("contain.text", "Соус Spicy-X90");
	});
});
export {};
