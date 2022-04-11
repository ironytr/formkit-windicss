'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plugin = require('windicss/plugin');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var plugin__default = /*#__PURE__*/_interopDefaultLegacy(plugin);

/**
 * The FormKit plugin for Tailwind
 * @public
 */
//  const formKitVariants = plugin(({ addVariant }) => {
//   addVariant('pointer-group-hover', ({ modifySelectors }) => {
//     return modifySelectors(({ className }) => {
//       return `.no-touch .group:hover .${className}`
//     })
//   })
// })
const formKitVariants = plugin__default["default"](({ addVariant }) => {
    [
        'disabled',
        'invalid',
        'errors',
        'complete',
        'loading',
        'submitted',
        'multiple',
    ].forEach((attribute) => {
        addVariant(`formkit-${attribute}`, ({ modifySelectors }) => {
            const x = modifySelectors(({ className }) => {
                console.log(`formkit-${attribute}`);
                const y = `.${className}[data-${attribute}], [data-${attribute}] .${className}, [data-${attribute}].${className}`;
                console.log('y', y);
                return y;
            });
            return x;
        });
    });
});
/**
 * A function to generate FormKit class functions from a javascript object
 * @param classes - An object of input types with nested objects of sectionKeys and class lists
 * @returns FormKitClassFunctions
 * @public
 */
function generateClasses(classes) {
    const classesBySectionKey = {};
    Object.keys(classes).forEach((type) => {
        Object.keys(classes[type]).forEach((sectionKey) => {
            if (!classesBySectionKey[sectionKey]) {
                classesBySectionKey[sectionKey] = {
                    [type]: classes[type][sectionKey],
                };
            }
            else {
                classesBySectionKey[sectionKey][type] = classes[type][sectionKey];
            }
        });
    });
    Object.keys(classesBySectionKey).forEach((sectionKey) => {
        const classesObject = classesBySectionKey[sectionKey];
        classesBySectionKey[sectionKey] = function (node, sectionKey, sectionClassList) {
            return formKitStates(node, sectionKey, sectionClassList, classesObject);
        };
    });
    return classesBySectionKey;
}
function formKitStates(node, _sectionKey, _sectionClassList, classesByType) {
    const type = node.props.type;
    let classList = '';
    if (classesByType.global) {
        classList += classesByType.global + ' ';
    }
    if (classesByType[type]) {
        classList += classesByType[type];
    }
    return classList.trim();
}

exports["default"] = formKitVariants;
exports.generateClasses = generateClasses;
