const os = require('os');

module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "browser": true
    },
    "extends": [
        "eslint:recommended"
    ],
    "globals": {
        // 测试相关
        "describe": true,
        "it": true,
        "wx": true,
        "XLSX": true,
        "before": true,
        "after": true,
        "window": true,
        "CustomEvent": true,
        "WeixinJSBridge": true,
        "location": true,
        "navigator": true,
        "document": true,
    },
    "parserOptions": {
        "parser": "babel-eslint",
        // 默认设置为 3，5（默认）， 你可以使用 6、7、8 或 9 来指定你想要使用的 ECMAScript 版本。你也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）
        "ecmaVersion": 2018,
        // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
        "sourceType": "module"
    },
    // 规则解释：
    // https://cn.eslint.org/docs/rules/
    "rules": {
        'accessor-pairs': 'off',
        /**
            * Enforces return statements in callbacks of following array’s methods
            *
            * ```js
            * Array.from
            * Array.prototype.every
            * Array.prototype.filter
            * Array.prototype.find
            * Array.prototype.findIndex
            * Array.prototype.map
            * Array.prototype.reduce
            * Array.prototype.reduceRight
            * Array.prototype.some
            * Array.prototype.sort
            * ```
        */
        'array-callback-return': 0,
        /**
            * Disallows the usage of variables outside of their binding context and
            * emulate traditional block scope from other languages.
            * @since 3.0.0
        */
        'block-scoped-var': 'error',
        complexity: 'off',
        /**
            * Doesn't require `return` statements to either always or never specify values
            * @example
            *
            * ```js
            * // correct
            * function doSomething(condition) {
            *   if (condition) {
            *     return true;
            *   }
            * }
            * ```
        */
        'consistent-return': 'off',
        /**
            * Requires following curly brace conventions
            *
            * 1. You can relax the rule to allow brace-less single-line `if`,
            * `else if`, `else`, `for`, `while`, or `do`, while still enforcing the use
            * of curly braces for other instances.
            *
            * @example
            *
            * ```js
            * // incorrect
            * if (foo)
            *   doSomething();
            * else
            *   doSomethingElse();
            *
            * // correct
            * if (foo) doSomething();
            *
            * if (foo) doSomething();
            * else doSomethingElse();
            *
            * do something();
            * while (foo);
            * ```
        */
        curly: [ 'error', 'multi-line' ],
        /**
            * Requires default case in switch statements.
            * You may optionally include a `// no default` after the last case
            * if there is no default case
            * @since 3.0.0
            * @example
            *
            * ```js
            * // correct
            * switch (foo) {
            *   case 1:
            *     doSomething();
            *     break;
            *
            *   case 2:
            *     doSomething();
            *     break;
            *
            *   // no default
            * }
            * ```
        */
        'default-case': [ 'error', { commentPattern: '^no default$' }],
        /**
            * Encouraging use of the dot notation style whenever possible
            * @since 3.0.0
            * @example
            *
            * ```js
            * // incorrect
            * const x = foo['bar'];
            *
            * // correct
            * const obj = foo.bar;
            * const y = foo[arg];
            *
            * // Specially, to avoid dot notation for reserved word properties,
            * // following pattern is accepted
            * const foo = bar['class'];
            * ```
        */
        'dot-notation': [ 'error', { allowKeywords: true }],
        /**
            * Doesn't enforce newline before and after dot
            * @example
            *
            * ```js
            * // correct
            * const a = foo.
            *         bar;
            *
            * const b = foo
            *         .bar;
            * ```
        */
        'dot-location': 'off',
        /**
            * Enforces using the type-safe equality operators `===` and
            * `!==` instead of their regular counterparts `==` and `!=`.
            * Tt permits comparing to null to check for `null` or `undefined`
            * in a single expression
            * @example
            *
            * ```js
            * // correct
            * a === b
            * foo === true
            * bananas !== 1
            * value === undefined
            * typeof foo === 'undefined'
            * 'hello' !== 'world'
            * 0 === 0
            * true === true
            * foo === null
            * foo == null
            *
            * // incorrect
            * a == b
            * foo == true
            * bananas != 1
            * value == undefined
            * typeof foo == 'undefined'
            * 'hello' != 'world'
            * 0 == 0
            * true == true
            * ```
        */
        'eqeqeq': [ 'error', 'allow-null' ],
        /**
            * Doesn't require filtering the results in the loop for
            * preventing unexpected behavior
        */
        'guard-for-in': 'off',
        'no-alert': 'warn',
        'no-caller': 'error',
        /**
            * Disallow lexical declarations in case/default clauses
            * @example
            *
            * ```js
            * // incorrect
            * switch (foo) {
            *   case 1:
            *     let x = 1;
            *     break;
            *   case 2:
            *     const y = 2;
            *     break;
            *   // no default
            *
            * // correct
            * switch (foo) {
            *   case 1: {
            *     let x = 1;
            *     break;
            *   }
            *   case 2: {
            *     const y = 2;
            *     break;
            *   }
            *   // no default
            * ```
        */
        'no-case-declarations': 'error',
        'no-div-regex': 'off',
        /**
            * Disallow return before else
            * @since 3.0.0
        */
        'no-else-return': 'error',
        /**
            * Disallow empty functions
            * @example
            *
            * Specially, these following patterns are permitted
            *
            * #### `arrowFunctions`
            *
            * ```js
            * const foo = () => {};
            * ```
            *
            * #### `functions`
            *
            * ```js
            * function foo() {}
            *
            * const foo = function() {};
            *
            * const obj = {
            *   foo: function() {}
            * };
            * ```
            *
            * #### `methods`
            *
            * ```js
            * const obj = {
            *   foo() {}
            * };
            *
            * class A {
            *   foo() {}
            *   static foo() {}
            * }
            * ```
            *
            * Codes bellow are not permitted
            *
            * ```js
            * // generatorFunctions
            * function* foo() {}
            * const foo = function*() {};
            *
            * // generatorMethods
            * const obj = {
            *   foo: function*() {},
            *   *foo() {},
            * };
            *
            * // getters or setters
            * const obj = {
            *   get foo() {},
            *   set foo(value) {},
            * };
            *
            * // constructors
            * class A {
            *   constructor() {}
            * }
            *
            * // mixed
            * const obj = {
            *   bar: 123,
            *   foo: () => this.bar,
            *   *foo() {},
            * }
            * ```
        */
        'no-empty-function': [ 'error', {allow: ['arrowFunctions', 'functions', 'methods', ]}],
        /**
            * Disallow empty destructuring patterns
            * @example
            *
            * ```js
            * // incorrect
            * const {} = foo;
            * const [] = foo;
            * const {a: {}} = foo;
            * const {a: []} = foo;
            * function foo({}) {}
            * function foo([]) {}
            * function foo({a: {}}) {}
            * function foo({a: []}) {}
            * ```
        */
        'no-empty-pattern': 'error',
        'no-eq-null': 'off',
        'no-eval': 'error',
        /**
            * Disallows directly modifying the prototype of builtin objects
            * @example
            *
            * ```js
            * // incorrect
            * Object.prototype.a = "a";
            * Object.defineProperty(Array.prototype, "times", { value: 999 });
            * ```
        */
        'no-extend-native': 0,
        'no-extra-bind': 'error',
        /**
            * If a loop contains no nested loops or switches,
            * labeling the loop is unnecessary
        */
        'no-extra-label': 'error',
        'no-fallthrough': 'error',
        /**
            * Disallow floating decimals
            * @since 3.0.0
        */
        'no-floating-decimal': 'error',
        /**
            * Allow the type conversion with shorter notations
            * @example
            *
            * ```js
            * // correct
            * const b = !!foo;
            * const b = ~foo.indexOf(".");
            * const n = +foo;
            * const n = 1 * foo;
            * const s = "" + foo;
            * foo += "";
            * ```
        */
        'no-implicit-coercion': 'off',
        'no-implicit-globals': 'off',
        'no-implied-eval': 'error',
        'no-invalid-this': 'off',
        'no-iterator': 'off',
        'no-labels': [ 'error', { allowLoop: false, allowSwitch: false }],
        'no-lone-blocks': 'error',
        'no-loop-func': 'error',
        'no-magic-numbers': 'off',
        'no-multi-spaces': 'error',
        'no-multi-str': 'error',
        'no-native-reassign': 'error',
        /**
            * Doesn't require storing the object created by `new` with
            * a constructor in a variable
            * @example
            *
            * ```js
            * // correct
            * new Thing();
            *
            * const thing = new Thing();
            *
            * Thing();
            * ```
        */
        'no-new': 'off',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': 'off',
        'no-proto': 'error',
        'no-redeclare': 'error',
        'no-script-url': 'error',
        'no-self-assign': 'error',
        /**
            * Disallow self comparison
            * @since 3.0.0
        */
        'no-self-compare': 'error',
        'no-sequences': 'warn',
        'no-throw-literal': 'off',
        'no-unmodified-loop-condition': 'off',
        /**
            * Disallow unused expressions
            * @since 3.0.0
        */
        'no-unused-expressions': 'off',
        'no-unused-labels': 'error',
        'no-useless-call': 'off',
        'no-useless-concat': 'error',
        'no-useless-escape': 'error',
        'no-void': 'off',
        'no-warning-comments': 'off',
        'no-with': 'error',
        'radix': 'off',
        'vars-on-top': 'off',
        'wrap-iife': 'off',
        'yoda': 'error',
        'comma-dangle': [ 'error', {arrays: 'always-multiline', objects: 'always-multiline', imports: 'always-multiline', exports: 'always-multiline', functions: 'never', }],
        /**
            * @example
            *
            * ```js
            * // Incorrect
            * function setHeight(someNode) {
            *   do {
            *       someNode.height = '100px';
            *   } while (someNode = someNode.parentNode);
            * }
            *
            * // correct
            * function setHeight(someNode) {
            *   do {
            *       someNode.height = '100px';
            *   } while ((someNode = someNode.parentNode));
            * }
            * ```
        */
        'no-cond-assign': [ 'error', 'except-parens' ],
        'no-console': 'off',
        'no-constant-condition': 'error',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-dupe-args': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-empty': 'error',
        'no-empty-character-class': 'error',
        'no-ex-assign': 'error',
        'no-extra-boolean-cast': 'error',
        /**
            * disallow unnecessary parentheses
            *
            * @example
            *
            * // allow
            * module.export = app => (
            *   // some js docs
            *   class Test extends app.Proxy {
            *
            *   }
            * );
            *
        */
        'no-extra-parens': [ 'error', 'functions' ],
        'no-extra-semi': 'error',
        'no-func-assign': 'error',
        'no-inner-declarations': [ 'error', 'functions' ],
        'no-invalid-regexp': 'error',
        'no-irregular-whitespace': 'error',
        'no-negated-in-lhs': 'error',
        'no-obj-calls': 'error',
        'no-regex-spaces': 'error',
        'no-sparse-arrays': 'error',
        'no-unexpected-multiline': 'off',
        'no-unreachable': 'error',
        'no-unsafe-finally': 'error',
        'use-isnan': 'error',
        /**
            * This rule has deprecated https://eslint.org/blog/2018/11/jsdoc-end-of-life
            * ensure JSDoc comments are valid
        */
        'valid-jsdoc': 'off',
        'valid-typeof': 'off',
        /**
            * This rule allows the use of braces around arrow function body, even if they can be omitted
            * @since 3.0.0
            * @example
            *
            * ```js
            * // correct
            * let foo = () => {
            *   return 0;
            * };
            *
            * let foo = () => {
            *   return {
            *     bar: {
            *       foo: 1,
            *       bar: 2,
            *     }
            *   };
            * };
            *
            * let foo = () => 0;
            *
            * let foo = () => ({
            *   bar: {
            *     foo: 1,
            *     bar: 2,
            *   }
            * });
            ** ```
        */
        'arrow-body-style': 'off',
        'arrow-parens': [ 'error', 'as-needed' ],
        'arrow-spacing': [ 'error', { before: true, after: true }],
        'constructor-super': 'off',
        /**
            * This rule enforces spacing after the `*` of generator functions, but omitting before that
            * @since 3.0.0
            * @example
            *
            * ```js
            * function* generator() {
            *   yield '44';
            *   yield '55';
            * }
            * ```
        */
        'generator-star-spacing': [ 'error', { before: false, after: true }],
        'no-class-assign': 'error',
        /**
            * Disallow arrow functions where they could be confused with comparisons
            * @example
            *
            * ```js
            * var x = a => 1 ? 2 : 3; // incorrect
            * var x = a => (1 ? 2 : 3); // correct
            * ````
        */
        'no-confusing-arrow': [ 'error', {allowParens: true, }],
        'no-const-assign': 'error',
        'no-dupe-class-members': 'error',
        'no-new-symbol': 'off',
        /**
            * Disallow use of this/super before calling super() in constructors
            * @since 3.0.0
        */
        'no-this-before-super': 'error',
        /**
            * Disallow unnecessary computed property keys on objects
            * @example
            *
            * ```js
            * foo = { ['a' + 'b']: 'foo' }; // correct
            * foo = { ['a']: 'bar' }; // incorrect
            * ```
        */
        'no-useless-computed-key': 'error',
        'no-useless-constructor': 'error',
        'no-var': 'error',
        /**
            * Require Object Literal Shorthand Syntax
            * @since 3.0.0
            * @example
            *
            * ```js
            * // correct
            * // properties
            * const foo = { x, y, z };
            *
            * // methods
            * const foo = {
            *   a() {},
            *   b() {}
            * };
            *
            * const bar = {
            *  ConstructorFunction: function() {}
            * };
            *
            * // incorrect
            * const foo = {
            *  'a-b'() {}
            * };
            * ```
        */
        'object-shorthand': [ 'error', 'always', {avoidQuotes: true, ignoreConstructors: false, }],
        /**
            * If a variable is never reassigned, using the `const` declaration is better
            * @since 3.0.0
            * @example
            *
            * 1. Specially, if all variables in destructuring should be `const`,
            * this rule warns the variables
            *
            * ```js
            * // incorrect
            * let { a, b } = obj;
            * console.log(a, b);
            *
            * // correct
            * let { a, b } = obj;
            * a = a + 1;
            * console.log(a, b);
            * ```
        */
        'prefer-const': [ 'error', {destructuring: 'all', ignoreReadBeforeAssign: true, }],
        'prefer-reflect': 'off',
        /**
            * This rule doesn't prefer using the rest parameters instead of `arguments`
            * @since 3.0.0
        */
        'prefer-rest-params': 'off',
        'prefer-spread': 'off',
        'prefer-template': 'off',
        'require-yield': 'off',
        /**
            * This rule disallows usage of spacing in template strings
            * @example
            *
            * ```js
            * // incorrect
            * `${ bar }`;
            * `hello, ${ people.name}!`;
            * `hello, ${people.name }!`;
            *
            * // correct
            * `${bar}`;
            * `hello, ${people.name}!`;
            *
            * // specially, this is correct
            * `${
            *   bar
            * }`;
            * ```
        */
        'template-curly-spacing': 'error',
        'yield-star-spacing': [ 'error', { before: false, after: true }],
        'prefer-promise-reject-errors': 0,
        'callback-return': 'off',
        'global-require': 'off',
        'handle-callback-err': 'off',
        'no-mixed-requires': 'off',
        'no-new-require': 'off',
        'no-path-concat': 'off',
        'no-process-env': 'off',
        'no-process-exit': 'off',
        'no-restricted-modules': 'off',
        'no-sync': 'off',
        /**
            * enforce spaces inside of brackets
            * @since 3.0.0
        */
        'array-bracket-spacing': [ 'error', 'always', {objectsInArrays: false, arraysInArrays: false, }],
        'block-spacing': [ 'error', 'always' ],
        camelcase: 'off',
        'comma-spacing': [ 'error', { before: false, after: true }],
        /**
            * enforce one true comma style
            * @since 3.0.0
            * @example
            *
            * ```js
            * // incorrect
            * var foo = 1
            * ,
            * bar = 2;
            *
            * var foo = 1
            * , bar = 2;
            *
            * var foo = ["apples"
            * , "oranges"];
            *
            * function bar() {
            *   return {
            *     "a": 1
            *     ,"b:": 'error
            *   };
            * }
            * ```
        */
        'comma-style': [ 'error', 'last' ],
        'computed-property-spacing': 'off',
        'consistent-this': 'off',
        'eol-last': 'error',
        'func-names': 'off',
        'func-style': 'off',
        'id-blacklist': 'off',
        /**
            * not enforces minimum and maximum identifier lengths
            * (variable names, property names etc.)
        */
        'id-length': 'off',
        'id-match': 'off',
        'key-spacing': [ 'error', { beforeColon: false, afterColon: true }],
        'keyword-spacing': [ 'error', {before: true, after: true, overrides: {return: { after: true }, throw: { after: true }, case: { after: true }, }, }],
        'linebreak-style': [ (os.platform() === 'win32' ? 'off' : 'error'), 'unix' ],
        'lines-around-comment': 'off',
        'max-depth': 'off',
        /**
            * not specify the maximum length of a line in your program
            * @since 3.0.0
        */
        'max-len': 'off',
        'max-nested-callbacks': 'off',
        'max-params': 'off',
        'max-statements': 'off',
        /**
            * restrict the number of statements per line
            * @since 3.0.0
        */
        'max-statements-per-line': 'off',
        'new-cap': 'off',
        'new-parens': 'error',
        'newline-after-var': 'off',
        /**
        */
        'newline-before-return': 'off',
        /**
            * enforces new line after each method call in the chain to make it
            * more readable and easy to maintain
        */
        'newline-per-chained-call': [ 'error', { ignoreChainWithDepth: 3 }],
        'no-array-constructor': 'error',
        'no-continue': 'off',
        'no-inline-comments': 'off',
        'no-lonely-if': 'off',
        'no-mixed-spaces-and-tabs': [ 'error', false ],
        /**
            * disallow multiple empty lines and only one newline at the end
            * @since 3.0.0
        */
        'no-multiple-empty-lines': [ 'error', { max: 2, maxEOF: 1 }],
        'no-negated-condition': 'off',
        'no-negated-in-lhs': 'error',
        'no-nested-ternary': 'off',
        'no-new-object': 'error',
        'no-plusplus': 'off',
        'no-restricted-syntax': [2, 'WithStatement', ],
        'no-spaced-func': 'error',
        'no-ternary': 'off',
        'no-trailing-spaces': 'error',
        'no-underscore-dangle': 'off',
        /**
            * allow the use of Boolean literals in conditional expressions
            * also, prefer `a || b` over `a ? a : b`
        */
        'no-unneeded-ternary': 'error',
        'no-whitespace-before-property': 'error',
        /**
            * require padding inside curly braces
            * @since 3.0.0
            * @example
            *
            * ```js
            * // incorrect
            * var obj = {'foo': 'bar'};
            * var obj = {'foo': 'bar' };
            * var obj = { baz: {'foo': 'qux'}, bar};
            * var obj = {baz: { 'foo': 'qux' }, bar};
            * var obj = {'foo': 'bar'
            * };
            * ```
        */
        'object-curly-spacing': [ 'error', 'always' ],
        'object-property-newline': 'off',
        'one-var': 'off',
        /**
            * require a newline around variable declaration
            * @since 3.0.0
        */
        'one-var-declaration-per-line': [ 'error', 'always' ],
        'operator-assignment': 'off',
        'operator-linebreak': 'off',
        'padded-blocks': 'off',
        'quote-props': [ 'error', 'as-needed', { keywords: false }],
        'quotes': [ 'error', 'single', { avoidEscape: true }],
        'require-jsdoc': 'off',
        'semi': [ 'error', 'always' ],
        'semi-spacing': [ 'error', { before: false, after: true }],
        'sort-vars': 'off',
        'space-before-blocks': 'error',
        'space-before-function-paren': [ 'error', {anonymous: 'never', named: 'never', }],
        'space-in-parens': [ 'error', 'never' ],
        'space-infix-ops': 'error',
        'space-unary-ops': [ 'error', {words: true, nonwords: false, }],
        'spaced-comment': [ 'error', 'always', {exceptions: [ '-', '+' ], markers: [ '*!' ], }],
        'wrap-regex': 'off',
        'no-useless-escape': 'off',
        'init-declarations': 'off',
        /**
            * allow the catch clause parameter name being the same as a variable in the outer scope
            * @since 3.0.0
        */
        'no-catch-shadow': 'off',
        'no-delete-var': 'error',
        'no-label-var': 'error',
        /**
            * disallow specific globals
            * @since 3.0.0
        */
        'no-restricted-globals': 'off',
        'no-shadow': 'off',
        'no-shadow-restricted-names': 'error',
        'no-undef': 'error',
        'no-undef-init': 'error',
        'no-undefined': 'off',
        /**
            * disallow declaration of variables that are not used in the code
            * @since 3.0.0
        */
        'no-unused-vars': [ 'error', { vars: 'local', args: 'after-used' }],
        'no-use-before-define': [ 'error', 'nofunc' ],
        'no-var': 'off',
        "no-return-assign" : 0,
        "indent" : ["warn", 4],
        "brace-style" : 0,
        "no-bitwise" : 0,  
        "no-async-promise-executor" : 0,  
    }
};
