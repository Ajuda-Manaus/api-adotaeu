module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "rules": {
    "semi": 2,
    "import/no-extraneous-dependencies": [
      "error", {
        "devDependencies": true
      }],
      "indent": [2, 2, {"SwitchCase": 1}]

  },
  "globals": {

  }
};