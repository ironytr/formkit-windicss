import plugin from 'windicss/plugin';

/**
 * The FormKit plugin for Tailwind
 * @public
 */
const formKitVariants = plugin(({ addVariant }) => {
    addVariant('pointer-group-hover', ({ modifySelectors }) => {
        return modifySelectors(({ className }) => {
            return `.no-touch .group:hover .${className}`;
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
