/* ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = () => this.width * this.height;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  // eslint-disable-next-line no-proto
  obj.__proto__ = proto;
  return obj;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  selector: '',
  name: '',
  stringify() {
    const res = this.selector;
    return res;
  },

  element(value) {
    if (this.name === 'id') {
      throw Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    const elem = Object.create(this);
    elem.selector += value;
    if (elem.name === 'element') {
      throw Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    elem.name = 'element';
    return elem;
  },

  id(value) {
    if (this.name === 'class' || this.name === 'pseudoElement') {
      throw Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    const id = Object.create(this);
    id.selector += `#${value}`;
    if (id.name === 'id') {
      throw Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    id.name = 'id';
    return id;
  },

  class(value) {
    if (this.name === 'attr') {
      throw Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    const myClass = Object.create(this);
    myClass.selector += `.${value}`;
    myClass.name = 'class';
    return myClass;
  },

  attr(value) {
    if (this.name === 'pseudoClass') {
      throw Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    const attr = Object.create(this);
    attr.selector += `[${value}]`;
    attr.name = 'attr';
    return attr;
  },

  pseudoClass(value) {
    if (this.name === 'pseudoElement') {
      throw Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    const pseudoClass = Object.create(this);
    pseudoClass.selector += `:${value}`;
    pseudoClass.name = 'pseudoClass';
    return pseudoClass;
  },

  pseudoElement(value) {
    const pseudoElement = Object.create(this);
    pseudoElement.selector += `::${value}`;
    if (pseudoElement.name === 'pseudoElement') {
      throw Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    pseudoElement.name = 'pseudoElement';
    return pseudoElement;
  },

  combine(selector1, combinator, selector2) {
    const combine = Object.create(this);
    const value1 = selector1.selector;
    const value2 = selector2.selector;
    combine.selector = `${value1} ${combinator} ${value2}`;
    return combine;
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
