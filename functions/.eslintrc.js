module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"google",
	],
	rules: {
		"quotes": ["error", "double"],
		"indent": [2, "tab"],
		"no-tabs": 0,
		"max-len": 0,
	},
};
