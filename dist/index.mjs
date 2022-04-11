import plugin from 'windicss/plugin';

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
const formKitVariants = plugin(({ addVariant, theme }) => {
    const attributes = theme('formkit.attributes') || [];
    const messageStates = theme('formkit.messageStates') || [];
    addVariant('formkit-action', ({ modifySelectors }) => {
        return modifySelectors(({ className }) => {
            const x = `.formkit-actions .${className}, .formkit-actions.${className}`;
            console.log('imhere x', x);
            return x;
        });
    });
    [
        'disabled',
        'invalid',
        'errors',
        'complete',
        'loading',
        'submitted',
        'multiple',
        ...attributes,
    ].forEach((attribute) => {
        addVariant(`formkit-${attribute}`, ({ modifySelectors }) => {
            return modifySelectors(({ className }) => {
                console.log(`.${className}[data-${attribute}], [data-${attribute}] .${className}, [data-${attribute}].${className}`);
                return `.${className}[data-${attribute}], [data-${attribute}] .${className}, [data-${attribute}].${className}`;
            });
        });
    });
    ['validation', 'error', ...messageStates].forEach((state) => {
        addVariant(`formkit-message-${state}`, ({ modifySelectors }) => {
            console.log('imhere124s');
            return modifySelectors(({ className }) => {
                console.log(`.${className}[data-message-type="${state}"], [data-message-type="${state}"] .${className}, [data-message-type="${state}"].${className}`);
                return `.${className}[data-message-type="${state}"], [data-message-type="${state}"] .${className}, [data-message-type="${state}"].${className}`;
            });
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

export { formKitVariants as default, generateClasses };
