/// <reference types="cypress" />

describe("Map page", () => {
  it("should navigate to the map page", () => {
    cy.visit("/");
    cy.get("nav").should("exist");
    cy.get("a").contains("Map").click();
    cy.url().should("include", "/map");
  });
  it("should render the map", () => {
    cy.visit("/map");
    const mapObject = cy.get("[data-testid=google-maps]");
    mapObject.should("exist");
    mapObject.should("be.visible");
  });
});
