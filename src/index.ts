import { FormKitNode, FormKitClasses } from '@formkit/core'
import plugin from 'windicss/plugin'

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

const formKitVariants = plugin(({ addVariant, e }) => {
  addVariant('first-line', ({ modifySelectors, separator }) => {
    return modifySelectors(({ className }) => {
      const newClass = e(`first-line${separator}${className}`)
      return `.${newClass}:first-line`
    })
  })
  addVariant('pointer-group-hover', ({ modifySelectors }) => {
    return modifySelectors(({ className }) => {
      return `.no-touch .group:hover .${className}`
    })
  })

  addVariant('formkit-disabled', ({ modifySelectors }) => {
    return modifySelectors(({ className }) => {
      console.log(e, `[data-disabled] .${className}`)

      return `[data-disabled] .${className}`
    })
  })
})

console.log('am i not working???', formKitVariants)

/**
 * An object of ClassFunctions
 * @internal
 */
interface FormKitClassFunctions {
  [index: string]: ClassFunction
}

/**
 * A function that returns a class list string
 * @internal
 */
type ClassFunction = (
  node: FormKitNode,
  sectionKey: string,
  sectionClassList: FormKitClasses | string | Record<string, boolean>
) => string

/**
 * A function to generate FormKit class functions from a javascript object
 * @param classes - An object of input types with nested objects of sectionKeys and class lists
 * @returns FormKitClassFunctions
 * @public
 */
export function generateClasses(
  classes: Record<string, Record<string, string>>
): FormKitClassFunctions {
  const classesBySectionKey: Record<string, Record<string, any>> = {}
  Object.keys(classes).forEach((type) => {
    Object.keys(classes[type]).forEach((sectionKey) => {
      if (!classesBySectionKey[sectionKey]) {
        classesBySectionKey[sectionKey] = {
          [type]: classes[type][sectionKey],
        }
      } else {
        classesBySectionKey[sectionKey][type] = classes[type][sectionKey]
      }
    })
  })

  Object.keys(classesBySectionKey).forEach((sectionKey) => {
    const classesObject = classesBySectionKey[sectionKey]
    classesBySectionKey[sectionKey] = function (
      node: FormKitNode,
      sectionKey: string,
      sectionClassList: FormKitClasses | string | Record<string, boolean>
    ) {
      return formKitStates(node, sectionKey, sectionClassList, classesObject)
    }
  })

  return classesBySectionKey as FormKitClassFunctions
}

function formKitStates(
  node: FormKitNode,
  _sectionKey: string,
  _sectionClassList: FormKitClasses | string | Record<string, boolean>,
  classesByType: Record<string, () => string>
): string {
  const type = node.props.type
  let classList = ''
  if (classesByType.global) {
    classList += classesByType.global + ' '
  }
  if (classesByType[type]) {
    classList += classesByType[type]
  }
  return classList.trim()
}

export default formKitVariants
