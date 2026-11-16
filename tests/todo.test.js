import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Todo App", () => {
  it("should add, complete, and filter todo items", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://demo.playwright.dev/todomvc" });

    // Add first item
    await testdriver.find('"What needs to be done?" input field').click();
    await testdriver.type("Buy groceries");
    await testdriver.pressKeys(["Enter"]);

    // Add second item
    await testdriver.type("Schedule appointment");
    await testdriver.pressKeys(["Enter"]);

    // Complete first item
    await testdriver.find('circular checkbox next to "Buy groceries"').click();

    // Verify first item completed
    const assertCompleted = await testdriver.assert('"Buy groceries" is marked completed and 1 item left is shown');
    expect(assertCompleted).toBeTruthy();

    // Filter by completed
    await testdriver.find('"Completed" filter link in footer').click();

    // Verify only completed item is shown
    const assertFiltered = await testdriver.assert('Only the completed todo "Buy groceries" is displayed in the list');
    expect(assertFiltered).toBeTruthy();
  });
});
