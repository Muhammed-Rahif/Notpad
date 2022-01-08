module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: { "\\.(css|less|scss)$": "identity-obj-proxy" },
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!screenfull)"],
};
