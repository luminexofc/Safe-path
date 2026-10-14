import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { formatPlaceLabel, emptyPointMessage } from "./geo.js";

// One test per risky branch: suggestion labels and the empty-field error.
// Both decide what users see on the Navigate screen.

describe("formatPlaceLabel", () => {
  it("shortens a display name to three parts with spaces", () => {
    assert.equal(
      formatPlaceLabel("Gulshan, Dhaka, Bangladesh, Asia"),
      "Gulshan, Dhaka, Bangladesh"
    );
  });

  it("falls back when the display name is missing", () => {
    assert.equal(formatPlaceLabel("", "typed text"), "typed text");
    assert.equal(formatPlaceLabel(null, "typed text"), "typed text");
  });
});

describe("emptyPointMessage", () => {
  it("names the field that is actually empty", () => {
    assert.equal(emptyPointMessage("destination"), "Type a destination.");
    assert.equal(emptyPointMessage("starting point"), "Type a starting point.");
  });
});
