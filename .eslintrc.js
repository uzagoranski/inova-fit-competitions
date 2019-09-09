module.exports =  {
    parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
    extends: ["airbnb-typescript"],
    parserOptions:  {
      ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
      sourceType:  'module',  // Allows for the use of imports
    },
    rules: {
        "@typescript-eslint/indent": "off",
        "padded-blocks": "off",
        "class-methods-use-this": "off",
        "max-len": "off",
        "object-curly-newline": "off",
        "comma-dangle": "off",
        "no-underscore-dangle": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "no-plusplus": "off",
        "array-callback-return": "off"
      } 
};