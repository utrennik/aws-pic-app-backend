/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/handlers/getProducts.ts":
/*!*************************************!*\
  !*** ./src/handlers/getProducts.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getProducts\": () => (/* binding */ getProducts)\n/* harmony export */ });\n/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @service */ \"./src/service/service.ts\");\n\nconst getProducts = async (event) => {\n    const products = await (0,_service__WEBPACK_IMPORTED_MODULE_0__.getAllProducts)();\n    return {\n        statusCode: 200,\n        body: JSON.stringify({\n            products: products,\n        }, null, 2),\n    };\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaGFuZGxlcnMvZ2V0UHJvZHVjdHMudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBSUE7QUFJQTtBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvZHVjdC1zZXJ2aWNlLy4vc3JjL2hhbmRsZXJzL2dldFByb2R1Y3RzLnRzPzdiNzgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0QWxsUHJvZHVjdHMgfSBmcm9tICdAc2VydmljZSc7XG5pbXBvcnQgeyBJUHJvZHVjdCB9IGZyb20gJy4vLi4vbW9kZWxzL3R5cGVzJztcblxuY29uc3QgZ2V0UHJvZHVjdHMgPSBhc3luYyAoZXZlbnQ6IGFueSkgPT4ge1xuICBjb25zdCBwcm9kdWN0czogSVByb2R1Y3RbXSA9IGF3YWl0IGdldEFsbFByb2R1Y3RzKCk7XG5cbiAgcmV0dXJuIHtcbiAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoXG4gICAgICB7XG4gICAgICAgIHByb2R1Y3RzOiBwcm9kdWN0cyxcbiAgICAgIH0sXG4gICAgICBudWxsLFxuICAgICAgMlxuICAgICksXG4gIH07XG5cbiAgLy8gVXNlIHRoaXMgY29kZSBpZiB5b3UgZG9uJ3QgdXNlIHRoZSBodHRwIGV2ZW50IHdpdGggdGhlIExBTUJEQS1QUk9YWSBpbnRlZ3JhdGlvblxuICAvLyByZXR1cm4geyBtZXNzYWdlOiAnR28gU2VydmVybGVzcyB2MS4wISBZb3VyIGZ1bmN0aW9uIGV4ZWN1dGVkIHN1Y2Nlc3NmdWxseSEnLCBldmVudCB9O1xufTtcblxuZXhwb3J0IHsgZ2V0UHJvZHVjdHMgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/handlers/getProducts.ts\n");

/***/ }),

/***/ "./src/mocks/products.ts":
/*!*******************************!*\
  !*** ./src/mocks/products.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst products = [\n    {\n        id: 1,\n        name: 'Hare',\n        price: 20,\n        image: 'hare.jpg',\n    },\n    {\n        id: 2,\n        name: 'Fox',\n        price: 30,\n        image: 'fox.jpg',\n    },\n];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (products);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9ja3MvcHJvZHVjdHMudHMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2R1Y3Qtc2VydmljZS8uL3NyYy9tb2Nrcy9wcm9kdWN0cy50cz8yNzJmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElQcm9kdWN0IH0gZnJvbSAnLi8uLi9tb2RlbHMvdHlwZXMnO1xuXG5jb25zdCBwcm9kdWN0czogSVByb2R1Y3RbXSA9IFtcbiAge1xuICAgIGlkOiAxLFxuICAgIG5hbWU6ICdIYXJlJyxcbiAgICBwcmljZTogMjAsXG4gICAgaW1hZ2U6ICdoYXJlLmpwZycsXG4gIH0sXG4gIHtcbiAgICBpZDogMixcbiAgICBuYW1lOiAnRm94JyxcbiAgICBwcmljZTogMzAsXG4gICAgaW1hZ2U6ICdmb3guanBnJyxcbiAgfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IHByb2R1Y3RzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/mocks/products.ts\n");

/***/ }),

/***/ "./src/service/service.ts":
/*!********************************!*\
  !*** ./src/service/service.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getAllProducts\": () => (/* binding */ getAllProducts)\n/* harmony export */ });\n/* harmony import */ var _mocks_products__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/mocks/products */ \"./src/mocks/products.ts\");\n\nconst getAllProducts = async () => {\n    return _mocks_products__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZS9zZXJ2aWNlLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2R1Y3Qtc2VydmljZS8uL3NyYy9zZXJ2aWNlL3NlcnZpY2UudHM/NzJlNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcHJvZHVjdHMgZnJvbSAnQC9tb2Nrcy9wcm9kdWN0cyc7XG5cbmNvbnN0IGdldEFsbFByb2R1Y3RzID0gYXN5bmMgKCkgPT4ge1xuICByZXR1cm4gcHJvZHVjdHM7XG59O1xuXG5leHBvcnQgeyBnZXRBbGxQcm9kdWN0cyB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/service/service.ts\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/handlers/getProducts.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;