"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (text) => {
    // Convert the text to lowercase
    text = text.toLowerCase();
    // Replace whitespace with a hyphen using regular expressions
    text = text.replace(/\s+/g, '-');
    // Remove any remaining non-alphanumeric characters
    text = text.replace(/[^a-zA-Z0-9-]/g, '-');
    text = text.replace('--', '-');
    return text;
};
//# sourceMappingURL=Slugify.js.map