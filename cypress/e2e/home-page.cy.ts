import { BASE_URL } from "../../src/api";

const INGREDIENT_ID = "60d3b41abdacab0026a733d0";
describe("drags ingredients", function () {
	it("should open ingredient without modal", function () {
		cy.visit(`ingredients/${INGREDIENT_ID}`);
		cy.contains("Детали ингредиента");
		cy.get('[data-test-id="modal"]').should("not.exist");
		cy.location().should((loc) => {
			expect(loc.pathname).to.contain(`ingredients/${INGREDIENT_ID}`);
		});
	});

	it("should be available on localhost", function () {
		cy.visit("/");
	});

	it("opens modal with ingredients details", function () {
		cy.get('[data-test-id="ingredient"]')
			.first()
			.then(($el) => {
				cy.wrap($el).click();
				const id = $el.attr("data-test-key");
				cy.contains("Детали ингредиента");
				cy.get('[data-test-id="modal"]').should("exist");
				cy.location().should((loc) => {
					expect(loc.pathname).to.contain(`ingredients/${id}`);
				});
			});
	});

	it("closes modal on close button click", function () {
		cy.get('[data-test-id="modal-close-button"]').click();
		cy.contains("Детали ингредиента").should("not.exist");
		cy.get('[data-test-id="modal"]').should("not.exist");
	});

	it("drags bun to constructor", function () {
		cy.get('[data-test-id="ingredient"]')
			.first()
			.then(($el) => {
				const elText1 = $el.find('[data-test-id="ingredient-name"]').text();
				cy.wrap($el).trigger("dragstart");
				cy.get('[data-test-id="drop-target"]')
					.trigger("drop")
					.trigger("dragend");
				cy.get('[data-test-id="burger-bun-element"]')
					.contains(elText1)
					.should("exist");
			});
		cy.get('[data-test-id="burger-bun-element"]').should("have.length", 2);
	});
	it("drags element to constructor", function () {
		cy.get('[data-test-id="ingredient"]')
			.eq(3)
			.then(($el) => {
				const elText = $el.find('[data-test-id="ingredient-name"]').text();
				cy.wrap($el).trigger("dragstart");
				cy.get('[data-test-id="drop-target"]')
					.trigger("drop")
					.trigger("dragend");
				cy.get('[data-test-id="burger-element"]')
					.contains(elText)
					.should("exist");
				cy.get('[data-test-id="burger-element"]').should("have.length", 1);
			});
	});
	it("drags element to constructor", function () {
		cy.get('[data-test-id="ingredient"]')
			.last()
			.then(($el) => {
				const elText = $el.find('[data-test-id="ingredient-name"]').text();
				cy.wrap($el).trigger("dragstart");
				cy.get('[data-test-id="drop-target"]')
					.trigger("drop")
					.trigger("dragend");
				cy.get('[data-test-id="burger-element"]')
					.contains(elText)
					.should("exist");
				cy.get('[data-test-id="burger-element"]').should("have.length", 2);
			});
	});

	it("reorders burger elements by drgaging the last one up", function () {
		cy.get('[data-test-id="burger-element"]')
			.last()
			.then(($el) => {
				const elText = $el.text();
				cy.wrap($el)
					.find('[data-test-id="burger-element-drag"]')
					.trigger("dragstart");
				cy.get('[data-test-id="burger-element"]')
					.first()
					.trigger("drop")
					.trigger("dragend");

				cy.get('[data-test-id="burger-element"]')
					.first()
					.should("contain.text", elText);
			});
	});

	it("redirects to login when posting", function () {
		cy.contains("Оформить заказ").click();
		cy.location().should((loc) => {
			expect(loc.pathname).to.equal(`/login`);
		});
	});
	it("logins", function () {
		cy.get("input").first().type("cap@avengers.ru");
		cy.get("input").eq(1).type("123");
		cy.contains("Войти").click();
	});

	it("opens modal after successful order post", function () {
		cy.intercept("POST", `${BASE_URL}/orders`).as("postOrder");
		cy.contains("Оформить заказ").click();
		cy.wait("@postOrder");
		cy.get('[data-test-id="modal"]').should("exist");
		cy.get('[data-test-id="order-response"]').should("exist");
	});
});
export {};
