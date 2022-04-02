module.exports = {
  babel: {
    presets: [
      [
        "@babel/preset-react",
        { runtime: "automatic", importSource: "@emotion/react" },
      ],
    ],
    plugins: ["@emotion/babel-plugin"],
  },
  eslint: {
    enable: false,
  },
  jest: {
    configure: {
      setupFilesAfterEnv: "./tests/setup.ts",
      roots: ["<rootDir>/tests"],
      testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)",
      ],
    },
  },
};
