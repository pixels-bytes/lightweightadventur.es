/*jslint node: true, esversion: 6 */
"use strict";


/**
 * FUNCTIONAL PROGRAMMING LIBRARY
 * @version 1.0.0
 * @author Pixels & Bytes
 *
 * @exports fp
 */



// THE PRIMITIVE COMBINATORS
const I = x => x;                       // id
const B = f => g => x => f(g(x));       // compose <$>
const K = x => y => x;                  // pure
const C = f => x => y => f(y)(x);       // flip
const W = f => x => f(x)(x);            // join
const S = f => g => x => f(x)(g(x));    // sub? <*>



// THE UTILITIES
// need functions for: every, pluck, join, concat, flatMap;
const id = I;
const eq = x => y => y === x;
const prop = x => y => y[x];
const propEq = p => x => comp (eq(x)) (prop(p));
const apply = f => x => f(x);
const map = f => xs => xs.map(f);
const filter = f => xs => xs.filter(apply(f));
const some = f => xs => xs.some(apply(f));
const every = f => xs => xs.every(apply(f));
const sort = f => xs => xs.sort(f);
const fold = f => y => xs => xs.reduce((y,x)=> f(y)(x), y);
const comp = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const flatten = fold(y=> x=> y.concat(Array.isArray(x) ? flatten (x) : x)) ([]);
const uniq = list => list.filter((v, i, a) => a.indexOf(v) === i);
const tap = f => x => { f(x); return x; };
const add = a => b => a + b;
const log = x => console.log(x);
const addO = x => y => {
  const copy = Object.assign({}, x);
  return Object.assign(copy, y);
};
const dupe = x => addO({})(x);


module.exports = {
  I, B, K, C, W, S,
  id, eq, prop, propEq, apply, map, filter, some, every, sort, fold, comp, flatten, uniq, tap, add, addO, log, dupe
};
