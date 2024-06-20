const G = (e, t) => e === t, m = {
  equals: G
};
let I = U;
const y = 1, _ = 2, R = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var h = null;
let x = null, J = null, u = null, a = null, d = null, A = 0;
function Q(e, t) {
  const s = u, r = h, n = e.length === 0, l = t === void 0 ? r : t, i = n ? R : {
    owned: null,
    cleanups: null,
    context: l ? l.context : null,
    owner: l
  }, o = n ? e : () => e(() => B(() => v(i)));
  h = i, u = null;
  try {
    return b(o, !0);
  } finally {
    u = s, h = r;
  }
}
function W(e, t) {
  t = t ? Object.assign({}, m, t) : m;
  const s = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, r = (n) => (typeof n == "function" && (n = n(s.value)), $(s, n));
  return [Z.bind(s), r];
}
function j(e, t, s) {
  const r = Y(e, t, !1, y);
  T(r);
}
function B(e) {
  if (u === null)
    return e();
  const t = u;
  u = null;
  try {
    return e();
  } finally {
    u = t;
  }
}
function Z() {
  if (this.sources && this.state)
    if (this.state === y)
      T(this);
    else {
      const e = a;
      a = null, b(() => C(this), !1), a = e;
    }
  if (u) {
    const e = this.observers ? this.observers.length : 0;
    u.sources ? (u.sources.push(this), u.sourceSlots.push(e)) : (u.sources = [this], u.sourceSlots = [e]), this.observers ? (this.observers.push(u), this.observerSlots.push(u.sources.length - 1)) : (this.observers = [u], this.observerSlots = [u.sources.length - 1]);
  }
  return this.value;
}
function $(e, t, s) {
  let r = e.value;
  return (!e.comparator || !e.comparator(r, t)) && (e.value = t, e.observers && e.observers.length && b(() => {
    for (let n = 0; n < e.observers.length; n += 1) {
      const l = e.observers[n], i = x && x.running;
      i && x.disposed.has(l), (i ? !l.tState : !l.state) && (l.pure ? a.push(l) : d.push(l), l.observers && F(l)), i || (l.state = y);
    }
    if (a.length > 1e6)
      throw a = [], new Error();
  }, !1)), t;
}
function T(e) {
  if (!e.fn)
    return;
  v(e);
  const t = A;
  X(
    e,
    e.value,
    t
  );
}
function X(e, t, s) {
  let r;
  const n = h, l = u;
  u = h = e;
  try {
    r = e.fn(t);
  } catch (i) {
    return e.pure && (e.state = y, e.owned && e.owned.forEach(v), e.owned = null), e.updatedAt = s + 1, V(i);
  } finally {
    u = l, h = n;
  }
  (!e.updatedAt || e.updatedAt <= s) && (e.updatedAt != null && "observers" in e ? $(e, r) : e.value = r, e.updatedAt = s);
}
function Y(e, t, s, r = y, n) {
  const l = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: h,
    context: h ? h.context : null,
    pure: s
  };
  return h === null || h !== R && (h.owned ? h.owned.push(l) : h.owned = [l]), l;
}
function L(e) {
  if (e.state === 0)
    return;
  if (e.state === _)
    return C(e);
  if (e.suspense && B(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < A); )
    e.state && t.push(e);
  for (let s = t.length - 1; s >= 0; s--)
    if (e = t[s], e.state === y)
      T(e);
    else if (e.state === _) {
      const r = a;
      a = null, b(() => C(e, t[0]), !1), a = r;
    }
}
function b(e, t) {
  if (a)
    return e();
  let s = !1;
  t || (a = []), d ? s = !0 : d = [], A++;
  try {
    const r = e();
    return D(s), r;
  } catch (r) {
    s || (d = null), a = null, V(r);
  }
}
function D(e) {
  if (a && (U(a), a = null), e)
    return;
  const t = d;
  d = null, t.length && b(() => I(t), !1);
}
function U(e) {
  for (let t = 0; t < e.length; t++)
    L(e[t]);
}
function C(e, t) {
  e.state = 0;
  for (let s = 0; s < e.sources.length; s += 1) {
    const r = e.sources[s];
    if (r.sources) {
      const n = r.state;
      n === y ? r !== t && (!r.updatedAt || r.updatedAt < A) && L(r) : n === _ && C(r, t);
    }
  }
}
function F(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const s = e.observers[t];
    s.state || (s.state = _, s.pure ? a.push(s) : d.push(s), s.observers && F(s));
  }
}
function v(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const s = e.sources.pop(), r = e.sourceSlots.pop(), n = s.observers;
      if (n && n.length) {
        const l = n.pop(), i = s.observerSlots.pop();
        r < n.length && (l.sourceSlots[i] = r, n[r] = l, s.observerSlots[r] = i);
      }
    }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--)
      v(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function ee(e) {
  return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
    cause: e
  });
}
function V(e, t = h) {
  throw ee(e);
}
function te(e, t, s) {
  let r = s.length, n = t.length, l = r, i = 0, o = 0, c = t[n - 1].nextSibling, p = null;
  for (; i < n || o < l; ) {
    if (t[i] === s[o]) {
      i++, o++;
      continue;
    }
    for (; t[n - 1] === s[l - 1]; )
      n--, l--;
    if (n === i) {
      const f = l < r ? o ? s[o - 1].nextSibling : s[l - o] : c;
      for (; o < l; )
        e.insertBefore(s[o++], f);
    } else if (l === o)
      for (; i < n; )
        (!p || !p.has(t[i])) && t[i].remove(), i++;
    else if (t[i] === s[l - 1] && s[o] === t[n - 1]) {
      const f = t[--n].nextSibling;
      e.insertBefore(s[o++], t[i++].nextSibling), e.insertBefore(s[--l], f), t[n] = s[l];
    } else {
      if (!p) {
        p = /* @__PURE__ */ new Map();
        let g = o;
        for (; g < l; )
          p.set(s[g], g++);
      }
      const f = p.get(t[i]);
      if (f != null)
        if (o < f && f < l) {
          let g = i, E = 1, k;
          for (; ++g < n && g < l && !((k = p.get(t[g])) == null || k !== f + E); )
            E++;
          if (E > f - o) {
            const z = t[i];
            for (; o < f; )
              e.insertBefore(s[o++], z);
          } else
            e.replaceChild(s[o++], t[i++]);
        } else
          i++;
      else
        t[i++].remove();
    }
  }
}
function se(e, t, s) {
  let r;
  const n = () => {
    const i = document.createElement("template");
    return i.innerHTML = e, i.content.firstChild;
  }, l = () => (r || (r = n())).cloneNode(!0);
  return l.cloneNode = l, l;
}
function q(e, t, s, r) {
  if (typeof t != "function")
    return S(e, t, r, s);
  j((n) => S(e, t(), n, s), r);
}
function S(e, t, s, r, n) {
  for (; typeof s == "function"; )
    s = s();
  if (t === s)
    return s;
  const l = typeof t;
  if (e = e, l === "string" || l === "number")
    l === "number" && (t = t.toString()), s !== "" && typeof s == "string" ? s = e.firstChild.data = t : s = e.textContent = t;
  else if (t == null || l === "boolean")
    s = w(e, s, r);
  else {
    if (l === "function")
      return j(() => {
        let i = t();
        for (; typeof i == "function"; )
          i = i();
        s = S(e, i, s, r);
      }), () => s;
    if (Array.isArray(t)) {
      const i = [], o = s && Array.isArray(s);
      if (P(i, t, s, n))
        return j(() => s = S(e, i, s, r, !0)), () => s;
      i.length === 0 ? s = w(e, s, r) : o ? s.length === 0 ? N(e, i, r) : te(e, s, i) : (s && w(e), N(e, i)), s = i;
    } else
      t.nodeType && (Array.isArray(s) ? w(e, s, null, t) : s == null || s === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild), s = t);
  }
  return s;
}
function P(e, t, s, r) {
  let n = !1;
  for (let l = 0, i = t.length; l < i; l++) {
    let o = t[l], c = s && s[e.length], p;
    if (!(o == null || o === !0 || o === !1))
      if ((p = typeof o) == "object" && o.nodeType)
        e.push(o);
      else if (Array.isArray(o))
        n = P(e, o, c) || n;
      else if (p === "function")
        if (r) {
          for (; typeof o == "function"; )
            o = o();
          n = P(
            e,
            Array.isArray(o) ? o : [o],
            Array.isArray(c) ? c : [c]
          ) || n;
        } else
          e.push(o), n = !0;
      else {
        const f = String(o);
        c && c.nodeType === 3 && c.data === f ? e.push(c) : e.push(document.createTextNode(f));
      }
  }
  return n;
}
function N(e, t, s = null) {
  for (let r = 0, n = t.length; r < n; r++)
    e.insertBefore(t[r], s);
}
function w(e, t, s, r) {
  if (s === void 0)
    return e.textContent = "";
  const n = r || document.createTextNode("");
  if (t.length) {
    let l = !1;
    for (let i = t.length - 1; i >= 0; i--) {
      const o = t[i];
      if (n !== o) {
        const c = o.parentNode === e;
        !l && !i ? c ? e.replaceChild(n, o) : e.insertBefore(n, s) : c && o.remove();
      } else
        l = !0;
    }
  } else
    e.insertBefore(n, s);
  return [n];
}
function ne(e) {
  return Object.keys(e).reduce((s, r) => {
    const n = e[r];
    return s[r] = Object.assign({}, n), M(n.value) && !ue(n.value) && !Array.isArray(n.value) && (s[r].value = Object.assign({}, n.value)), Array.isArray(n.value) && (s[r].value = n.value.slice(0)), s;
  }, {});
}
function re(e) {
  return e ? Object.keys(e).reduce((s, r) => {
    const n = e[r];
    return s[r] = M(n) && "value" in n ? n : {
      value: n
    }, s[r].attribute || (s[r].attribute = oe(r)), s[r].parse = "parse" in s[r] ? s[r].parse : typeof s[r].value != "string", s;
  }, {}) : {};
}
function le(e) {
  return Object.keys(e).reduce((s, r) => (s[r] = e[r].value, s), {});
}
function ie(e, t) {
  const s = ne(t);
  return Object.keys(t).forEach((n) => {
    const l = s[n], i = e.getAttribute(l.attribute), o = e[n];
    i && (l.value = l.parse ? H(i) : i), o != null && (l.value = Array.isArray(o) ? o.slice(0) : o), l.reflect && K(e, l.attribute, l.value), Object.defineProperty(e, n, {
      get() {
        return l.value;
      },
      set(c) {
        const p = l.value;
        l.value = c, l.reflect && K(this, l.attribute, l.value);
        for (let f = 0, g = this.__propertyChangedCallbacks.length; f < g; f++)
          this.__propertyChangedCallbacks[f](n, c, p);
      },
      enumerable: !0,
      configurable: !0
    });
  }), s;
}
function H(e) {
  if (e)
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
}
function K(e, t, s) {
  if (s == null || s === !1)
    return e.removeAttribute(t);
  let r = JSON.stringify(s);
  e.__updating[t] = !0, r === "true" && (r = ""), e.setAttribute(t, r), Promise.resolve().then(() => delete e.__updating[t]);
}
function oe(e) {
  return e.replace(/\.?([A-Z]+)/g, (t, s) => "-" + s.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function M(e) {
  return e != null && (typeof e == "object" || typeof e == "function");
}
function ue(e) {
  return Object.prototype.toString.call(e) === "[object Function]";
}
function ce(e) {
  return typeof e == "function" && e.toString().indexOf("class") === 0;
}
let O;
function fe(e, t) {
  const s = Object.keys(t);
  return class extends e {
    static get observedAttributes() {
      return s.map((n) => t[n].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = ie(this, t);
      const n = le(this.props), l = this.Component, i = O;
      try {
        O = this, this.__initialized = !0, ce(l) ? new l(n, {
          element: this
        }) : l(n, {
          element: this
        });
      } finally {
        O = i;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let n = null;
      for (; n = this.__releaseCallbacks.pop(); )
        n(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(n, l, i) {
      if (this.__initialized && !this.__updating[n] && (n = this.lookupProp(n), n in t)) {
        if (i == null && !this[n])
          return;
        this[n] = t[n].parse ? H(i) : i;
      }
    }
    lookupProp(n) {
      if (t)
        return s.find((l) => n === l || n === t[l].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(n) {
      this.__releaseCallbacks.push(n);
    }
    addPropertyChangedCallback(n) {
      this.__propertyChangedCallbacks.push(n);
    }
  };
}
function ae(e, t = {}, s = {}) {
  const {
    BaseElement: r = HTMLElement,
    extension: n
  } = s;
  return (l) => {
    let i = customElements.get(e);
    return i ? (i.prototype.Component = l, i) : (i = fe(r, re(t)), i.prototype.Component = l, i.prototype.registeredTag = e, customElements.define(e, i, n), i);
  };
}
function he(e) {
  const t = Object.keys(e), s = {};
  for (let r = 0; r < t.length; r++) {
    const [n, l] = W(e[t[r]]);
    Object.defineProperty(s, t[r], {
      get: n,
      set(i) {
        l(() => i);
      }
    });
  }
  return s;
}
function pe(e) {
  if (e.assignedSlot && e.assignedSlot._$owner)
    return e.assignedSlot._$owner;
  let t = e.parentNode;
  for (; t && !t._$owner && !(t.assignedSlot && t.assignedSlot._$owner); )
    t = t.parentNode;
  return t && t.assignedSlot ? t.assignedSlot._$owner : e._$owner;
}
function ge(e) {
  return (t, s) => {
    const { element: r } = s;
    return Q((n) => {
      const l = he(t);
      r.addPropertyChangedCallback((o, c) => l[o] = c), r.addReleaseCallback(() => {
        r.renderRoot.textContent = "", n();
      });
      const i = e(l, s);
      return q(r.renderRoot, i);
    }, pe(r));
  };
}
function de(e, t, s) {
  return arguments.length === 2 && (s = t, t = {}), ae(e, t)(ge(s));
}
var ye = /* @__PURE__ */ se("<h1>");
de("c-hello", {
  message: "Hacking with SuperTokens"
}, (e) => {
  const {
    message: t
  } = e;
  return (() => {
    var s = ye();
    return q(s, t), s;
  })();
});
