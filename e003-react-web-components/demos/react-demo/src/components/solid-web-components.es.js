(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(":root{font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif;line-height:1.5;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}a{font-weight:500;color:#646cff;text-decoration:inherit}a:hover{color:#535bf2}body{margin:0;display:flex;place-items:center;min-width:320px;min-height:100vh}h1{font-size:3.2em;line-height:1.1}button{font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif;border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:#1a1a1a;cursor:pointer;transition:border-color .25s;color:#ffffffde}button:hover{border-color:#646cff}button:focus,button:focus-visible{outline:4px auto -webkit-focus-ring-color}@media (prefers-color-scheme: light){:root{color:#213547;background-color:#fff}a:hover{color:#747bff}button{background-color:#f9f9f9}}.form-wrap{display:flex;flex-direction:column;gap:1em}.form-wrap input{font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif;border:1px solid #646cff;border-radius:8px;padding:.6em 1em;font-size:1em;font-family:inherit}div.wrapper{display:flex;flex-direction:column;gap:1em;height:100vh;width:100vw;font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif;line-height:1.5;font-weight:400;color-scheme:light dark;color:#ffffffde;background-color:#242424;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}div.wrapper header{height:80px;background:#f93;display:flex;align-items:center;justify-content:center}div.wrapper main{flex-grow:1;display:flex;align-items:center;justify-content:center;min-width:60%}div.wrapper footer{height:60px;background:#1f1f1f;display:flex;align-items:center;justify-content:center}")),document.head.appendChild(e)}}catch(i){console.error("vite-plugin-css-injected-by-js",i)}})();
const ms = (e, r) => e === r, Pt = {
  equals: ms
};
let Rr = Er;
const Pe = 1, Ot = 2, Ir = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var re = null;
let vn = null, ws = null, Y = null, ne = null, Se = null, Bt = 0;
function ys(e, r) {
  const t = Y, i = re, o = e.length === 0, n = r === void 0 ? i : r, a = o ? Ir : {
    owned: null,
    cleanups: null,
    context: n ? n.context : null,
    owner: n
  }, u = o ? e : () => e(() => lt(() => Gt(a)));
  re = a, Y = null;
  try {
    return dt(u, !0);
  } finally {
    Y = t, re = i;
  }
}
function Dt(e, r) {
  r = r ? Object.assign({}, Pt, r) : Pt;
  const t = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: r.equals || void 0
  }, i = (o) => (typeof o == "function" && (o = o(t.value)), _r(t, o));
  return [Tr.bind(t), i];
}
function kn(e, r, t) {
  const i = On(e, r, !1, Pe);
  ct(i);
}
function Sr(e, r, t) {
  Rr = Rs;
  const i = On(e, r, !1, Pe);
  i.user = !0, Se ? Se.push(i) : ct(i);
}
function Jn(e, r, t) {
  t = t ? Object.assign({}, Pt, t) : Pt;
  const i = On(e, r, !0, 0);
  return i.observers = null, i.observerSlots = null, i.comparator = t.equals || void 0, ct(i), Tr.bind(i);
}
function lt(e) {
  if (Y === null)
    return e();
  const r = Y;
  Y = null;
  try {
    return e();
  } finally {
    Y = r;
  }
}
function Tr() {
  if (this.sources && this.state)
    if (this.state === Pe)
      ct(this);
    else {
      const e = ne;
      ne = null, dt(() => xt(this), !1), ne = e;
    }
  if (Y) {
    const e = this.observers ? this.observers.length : 0;
    Y.sources ? (Y.sources.push(this), Y.sourceSlots.push(e)) : (Y.sources = [this], Y.sourceSlots = [e]), this.observers ? (this.observers.push(Y), this.observerSlots.push(Y.sources.length - 1)) : (this.observers = [Y], this.observerSlots = [Y.sources.length - 1]);
  }
  return this.value;
}
function _r(e, r, t) {
  let i = e.value;
  return (!e.comparator || !e.comparator(i, r)) && (e.value = r, e.observers && e.observers.length && dt(() => {
    for (let o = 0; o < e.observers.length; o += 1) {
      const n = e.observers[o], a = vn && vn.running;
      a && vn.disposed.has(n), (a ? !n.tState : !n.state) && (n.pure ? ne.push(n) : Se.push(n), n.observers && Cr(n)), a || (n.state = Pe);
    }
    if (ne.length > 1e6)
      throw ne = [], new Error();
  }, !1)), r;
}
function ct(e) {
  if (!e.fn)
    return;
  Gt(e);
  const r = Bt;
  bs(
    e,
    e.value,
    r
  );
}
function bs(e, r, t) {
  let i;
  const o = re, n = Y;
  Y = re = e;
  try {
    i = e.fn(r);
  } catch (a) {
    return e.pure && (e.state = Pe, e.owned && e.owned.forEach(Gt), e.owned = null), e.updatedAt = t + 1, Ar(a);
  } finally {
    Y = n, re = o;
  }
  (!e.updatedAt || e.updatedAt <= t) && (e.updatedAt != null && "observers" in e ? _r(e, i) : e.value = i, e.updatedAt = t);
}
function On(e, r, t, i = Pe, o) {
  const n = {
    fn: e,
    state: i,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: r,
    owner: re,
    context: re ? re.context : null,
    pure: t
  };
  return re === null || re !== Ir && (re.owned ? re.owned.push(n) : re.owned = [n]), n;
}
function Mt(e) {
  if (e.state === 0)
    return;
  if (e.state === Ot)
    return xt(e);
  if (e.suspense && lt(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const r = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Bt); )
    e.state && r.push(e);
  for (let t = r.length - 1; t >= 0; t--)
    if (e = r[t], e.state === Pe)
      ct(e);
    else if (e.state === Ot) {
      const i = ne;
      ne = null, dt(() => xt(e, r[0]), !1), ne = i;
    }
}
function dt(e, r) {
  if (ne)
    return e();
  let t = !1;
  r || (ne = []), Se ? t = !0 : Se = [], Bt++;
  try {
    const i = e();
    return ks(t), i;
  } catch (i) {
    t || (Se = null), ne = null, Ar(i);
  }
}
function ks(e) {
  if (ne && (Er(ne), ne = null), e)
    return;
  const r = Se;
  Se = null, r.length && dt(() => Rr(r), !1);
}
function Er(e) {
  for (let r = 0; r < e.length; r++)
    Mt(e[r]);
}
function Rs(e) {
  let r, t = 0;
  for (r = 0; r < e.length; r++) {
    const i = e[r];
    i.user ? e[t++] = i : Mt(i);
  }
  for (r = 0; r < t; r++)
    Mt(e[r]);
}
function xt(e, r) {
  e.state = 0;
  for (let t = 0; t < e.sources.length; t += 1) {
    const i = e.sources[t];
    if (i.sources) {
      const o = i.state;
      o === Pe ? i !== r && (!i.updatedAt || i.updatedAt < Bt) && Mt(i) : o === Ot && xt(i, r);
    }
  }
}
function Cr(e) {
  for (let r = 0; r < e.observers.length; r += 1) {
    const t = e.observers[r];
    t.state || (t.state = Ot, t.pure ? ne.push(t) : Se.push(t), t.observers && Cr(t));
  }
}
function Gt(e) {
  let r;
  if (e.sources)
    for (; e.sources.length; ) {
      const t = e.sources.pop(), i = e.sourceSlots.pop(), o = t.observers;
      if (o && o.length) {
        const n = o.pop(), a = t.observerSlots.pop();
        i < o.length && (n.sourceSlots[a] = i, o[i] = n, t.observerSlots[i] = a);
      }
    }
  if (e.owned) {
    for (r = e.owned.length - 1; r >= 0; r--)
      Gt(e.owned[r]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (r = e.cleanups.length - 1; r >= 0; r--)
      e.cleanups[r]();
    e.cleanups = null;
  }
  e.state = 0;
}
function Is(e) {
  return e instanceof Error ? e : new Error(typeof e == "string" ? e : "Unknown error", {
    cause: e
  });
}
function Ar(e, r = re) {
  throw Is(e);
}
function Ge(e, r) {
  return lt(() => e(r || {}));
}
const Ss = (e) => `Stale read from <${e}>.`;
function Kn(e) {
  const r = e.keyed, t = Jn(() => e.when, void 0, {
    equals: (i, o) => r ? i === o : !i == !o
  });
  return Jn(
    () => {
      const i = t();
      if (i) {
        const o = e.children;
        return typeof o == "function" && o.length > 0 ? lt(
          () => o(
            r ? i : () => {
              if (!lt(t))
                throw Ss("Show");
              return e.when;
            }
          )
        ) : o;
      }
      return e.fallback;
    },
    void 0,
    void 0
  );
}
function Ts(e, r, t) {
  let i = t.length, o = r.length, n = i, a = 0, u = 0, c = r[o - 1].nextSibling, s = null;
  for (; a < o || u < n; ) {
    if (r[a] === t[u]) {
      a++, u++;
      continue;
    }
    for (; r[o - 1] === t[n - 1]; )
      o--, n--;
    if (o === a) {
      const l = n < i ? u ? t[u - 1].nextSibling : t[n - u] : c;
      for (; u < n; )
        e.insertBefore(t[u++], l);
    } else if (n === u)
      for (; a < o; )
        (!s || !s.has(r[a])) && r[a].remove(), a++;
    else if (r[a] === t[n - 1] && t[u] === r[o - 1]) {
      const l = r[--o].nextSibling;
      e.insertBefore(t[u++], r[a++].nextSibling), e.insertBefore(t[--n], l), r[o] = t[n];
    } else {
      if (!s) {
        s = /* @__PURE__ */ new Map();
        let d = u;
        for (; d < n; )
          s.set(t[d], d++);
      }
      const l = s.get(r[a]);
      if (l != null)
        if (u < l && l < n) {
          let d = a, b = 1, f;
          for (; ++d < o && d < n && !((f = s.get(r[d])) == null || f !== l + b); )
            b++;
          if (b > l - u) {
            const k = r[a];
            for (; u < l; )
              e.insertBefore(t[u++], k);
          } else
            e.replaceChild(t[u++], r[a++]);
        } else
          a++;
      else
        r[a++].remove();
    }
  }
}
const Qn = "_$DX_DELEGATE";
function ft(e, r, t) {
  let i;
  const o = () => {
    const a = document.createElement("template");
    return a.innerHTML = e, a.content.firstChild;
  }, n = () => (i || (i = o())).cloneNode(!0);
  return n.cloneNode = n, n;
}
function Pr(e, r = window.document) {
  const t = r[Qn] || (r[Qn] = /* @__PURE__ */ new Set());
  for (let i = 0, o = e.length; i < o; i++) {
    const n = e[i];
    t.has(n) || (t.add(n), r.addEventListener(n, _s));
  }
}
function Ht(e, r, t, i) {
  if (t !== void 0 && !i && (i = []), typeof r != "function")
    return Ft(e, r, i, t);
  kn((o) => Ft(e, r(), o, t), i);
}
function _s(e) {
  const r = `$$${e.type}`;
  let t = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== t && Object.defineProperty(e, "target", {
    configurable: !0,
    value: t
  }), Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }); t; ) {
    const i = t[r];
    if (i && !t.disabled) {
      const o = t[`${r}Data`];
      if (o !== void 0 ? i.call(t, o, e) : i.call(t, e), e.cancelBubble)
        return;
    }
    t = t._$host || t.parentNode || t.host;
  }
}
function Ft(e, r, t, i, o) {
  for (; typeof t == "function"; )
    t = t();
  if (r === t)
    return t;
  const n = typeof r, a = i !== void 0;
  if (e = a && t[0] && t[0].parentNode || e, n === "string" || n === "number")
    if (n === "number" && (r = r.toString()), a) {
      let u = t[0];
      u && u.nodeType === 3 ? u.data !== r && (u.data = r) : u = document.createTextNode(r), t = Ve(e, t, i, u);
    } else
      t !== "" && typeof t == "string" ? t = e.firstChild.data = r : t = e.textContent = r;
  else if (r == null || n === "boolean")
    t = Ve(e, t, i);
  else {
    if (n === "function")
      return kn(() => {
        let u = r();
        for (; typeof u == "function"; )
          u = u();
        t = Ft(e, u, t, i);
      }), () => t;
    if (Array.isArray(r)) {
      const u = [], c = t && Array.isArray(t);
      if (Rn(u, r, t, o))
        return kn(() => t = Ft(e, u, t, i, !0)), () => t;
      if (u.length === 0) {
        if (t = Ve(e, t, i), a)
          return t;
      } else
        c ? t.length === 0 ? Yn(e, u, i) : Ts(e, t, u) : (t && Ve(e), Yn(e, u));
      t = u;
    } else if (r.nodeType) {
      if (Array.isArray(t)) {
        if (a)
          return t = Ve(e, t, i, r);
        Ve(e, t, null, r);
      } else
        t == null || t === "" || !e.firstChild ? e.appendChild(r) : e.replaceChild(r, e.firstChild);
      t = r;
    }
  }
  return t;
}
function Rn(e, r, t, i) {
  let o = !1;
  for (let n = 0, a = r.length; n < a; n++) {
    let u = r[n], c = t && t[e.length], s;
    if (!(u == null || u === !0 || u === !1))
      if ((s = typeof u) == "object" && u.nodeType)
        e.push(u);
      else if (Array.isArray(u))
        o = Rn(e, u, c) || o;
      else if (s === "function")
        if (i) {
          for (; typeof u == "function"; )
            u = u();
          o = Rn(
            e,
            Array.isArray(u) ? u : [u],
            Array.isArray(c) ? c : [c]
          ) || o;
        } else
          e.push(u), o = !0;
      else {
        const l = String(u);
        c && c.nodeType === 3 && c.data === l ? e.push(c) : e.push(document.createTextNode(l));
      }
  }
  return o;
}
function Yn(e, r, t = null) {
  for (let i = 0, o = r.length; i < o; i++)
    e.insertBefore(r[i], t);
}
function Ve(e, r, t, i) {
  if (t === void 0)
    return e.textContent = "";
  const o = i || document.createTextNode("");
  if (r.length) {
    let n = !1;
    for (let a = r.length - 1; a >= 0; a--) {
      const u = r[a];
      if (o !== u) {
        const c = u.parentNode === e;
        !n && !a ? c ? e.replaceChild(o, u) : e.insertBefore(o, t) : c && u.remove();
      } else
        n = !0;
    }
  } else
    e.insertBefore(o, t);
  return [o];
}
function Es(e) {
  return Object.keys(e).reduce((t, i) => {
    const o = e[i];
    return t[i] = Object.assign({}, o), Dr(o.value) && !Ds(o.value) && !Array.isArray(o.value) && (t[i].value = Object.assign({}, o.value)), Array.isArray(o.value) && (t[i].value = o.value.slice(0)), t;
  }, {});
}
function Cs(e) {
  return e ? Object.keys(e).reduce((t, i) => {
    const o = e[i];
    return t[i] = Dr(o) && "value" in o ? o : {
      value: o
    }, t[i].attribute || (t[i].attribute = Os(i)), t[i].parse = "parse" in t[i] ? t[i].parse : typeof t[i].value != "string", t;
  }, {}) : {};
}
function As(e) {
  return Object.keys(e).reduce((t, i) => (t[i] = e[i].value, t), {});
}
function Ps(e, r) {
  const t = Es(r);
  return Object.keys(r).forEach((o) => {
    const n = t[o], a = e.getAttribute(n.attribute), u = e[o];
    a && (n.value = n.parse ? Or(a) : a), u != null && (n.value = Array.isArray(u) ? u.slice(0) : u), n.reflect && Zn(e, n.attribute, n.value), Object.defineProperty(e, o, {
      get() {
        return n.value;
      },
      set(c) {
        const s = n.value;
        n.value = c, n.reflect && Zn(this, n.attribute, n.value);
        for (let l = 0, d = this.__propertyChangedCallbacks.length; l < d; l++)
          this.__propertyChangedCallbacks[l](o, c, s);
      },
      enumerable: !0,
      configurable: !0
    });
  }), t;
}
function Or(e) {
  if (e)
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
}
function Zn(e, r, t) {
  if (t == null || t === !1)
    return e.removeAttribute(r);
  let i = JSON.stringify(t);
  e.__updating[r] = !0, i === "true" && (i = ""), e.setAttribute(r, i), Promise.resolve().then(() => delete e.__updating[r]);
}
function Os(e) {
  return e.replace(/\.?([A-Z]+)/g, (r, t) => "-" + t.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function Dr(e) {
  return e != null && (typeof e == "object" || typeof e == "function");
}
function Ds(e) {
  return Object.prototype.toString.call(e) === "[object Function]";
}
function Ms(e) {
  return typeof e == "function" && e.toString().indexOf("class") === 0;
}
let ot;
function Mr() {
  Object.defineProperty(ot, "renderRoot", {
    value: ot
  });
}
function xs(e, r) {
  const t = Object.keys(r);
  return class extends e {
    static get observedAttributes() {
      return t.map((o) => r[o].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = Ps(this, r);
      const o = As(this.props), n = this.Component, a = ot;
      try {
        ot = this, this.__initialized = !0, Ms(n) ? new n(o, {
          element: this
        }) : n(o, {
          element: this
        });
      } finally {
        ot = a;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let o = null;
      for (; o = this.__releaseCallbacks.pop(); )
        o(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(o, n, a) {
      if (this.__initialized && !this.__updating[o] && (o = this.lookupProp(o), o in r)) {
        if (a == null && !this[o])
          return;
        this[o] = r[o].parse ? Or(a) : a;
      }
    }
    lookupProp(o) {
      if (r)
        return t.find((n) => o === n || o === r[n].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(o) {
      this.__releaseCallbacks.push(o);
    }
    addPropertyChangedCallback(o) {
      this.__propertyChangedCallbacks.push(o);
    }
  };
}
function Hs(e, r = {}, t = {}) {
  const {
    BaseElement: i = HTMLElement,
    extension: o
  } = t;
  return (n) => {
    if (!e)
      throw new Error("tag is required to register a Component");
    let a = customElements.get(e);
    return a ? (a.prototype.Component = n, a) : (a = xs(i, Cs(r)), a.prototype.Component = n, a.prototype.registeredTag = e, customElements.define(e, a, o), a);
  };
}
function Fs(e) {
  const r = Object.keys(e), t = {};
  for (let i = 0; i < r.length; i++) {
    const [o, n] = Dt(e[r[i]]);
    Object.defineProperty(t, r[i], {
      get: o,
      set(a) {
        n(() => a);
      }
    });
  }
  return t;
}
function Ls(e) {
  if (e.assignedSlot && e.assignedSlot._$owner)
    return e.assignedSlot._$owner;
  let r = e.parentNode;
  for (; r && !r._$owner && !(r.assignedSlot && r.assignedSlot._$owner); )
    r = r.parentNode;
  return r && r.assignedSlot ? r.assignedSlot._$owner : e._$owner;
}
function Us(e) {
  return (r, t) => {
    const { element: i } = t;
    return ys((o) => {
      const n = Fs(r);
      i.addPropertyChangedCallback((u, c) => n[u] = c), i.addReleaseCallback(() => {
        i.renderRoot.textContent = "", o();
      });
      const a = e(n, t);
      return Ht(i.renderRoot, a);
    }, Ls(i));
  };
}
function xr(e, r, t) {
  return arguments.length === 2 && (t = r, r = {}), Hs(e, r)(Us(t));
}
var Ns = /* @__PURE__ */ ft("<div class=wrapper><header>Hacking with SuperTokens</header><main></main><footer>Copyright or something, IDK.");
function Hr(e) {
  return (() => {
    var r = Ns(), t = r.firstChild, i = t.nextSibling;
    return Ht(i, () => e.children), r;
  })();
}
var p = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Dn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Fr = {}, Lr = {}, W = {}, Mn = {}, Ur = {}, ae = {}, Wt = {}, pe = p && p.__awaiter || function(e, r, t, i) {
  function o(n) {
    return n instanceof t ? n : new t(function(a) {
      a(n);
    });
  }
  return new (t || (t = Promise))(function(n, a) {
    function u(l) {
      try {
        s(i.next(l));
      } catch (d) {
        a(d);
      }
    }
    function c(l) {
      try {
        s(i.throw(l));
      } catch (d) {
        a(d);
      }
    }
    function s(l) {
      l.done ? n(l.value) : o(l.value).then(u, c);
    }
    s((i = i.apply(e, r || [])).next());
  });
}, me = p && p.__generator || function(e, r) {
  var t = {
    label: 0,
    sent: function() {
      if (n[0] & 1)
        throw n[1];
      return n[1];
    },
    trys: [],
    ops: []
  }, i, o, n, a;
  return a = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function u(s) {
    return function(l) {
      return c([s, l]);
    };
  }
  function c(s) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, o && (n = s[0] & 2 ? o.return : s[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, s[1])).done)
          return n;
        switch (o = 0, n && (s = [s[0] & 2, n.value]), s[0]) {
          case 0:
          case 1:
            n = s;
            break;
          case 4:
            return t.label++, { value: s[1], done: !1 };
          case 5:
            t.label++, o = s[1], s = [0];
            continue;
          case 7:
            s = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (n = t.trys, !(n = n.length > 0 && n[n.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              t = 0;
              continue;
            }
            if (s[0] === 3 && (!n || s[1] > n[0] && s[1] < n[3])) {
              t.label = s[1];
              break;
            }
            if (s[0] === 6 && t.label < n[1]) {
              t.label = n[1], n = s;
              break;
            }
            if (n && t.label < n[2]) {
              t.label = n[2], t.ops.push(s);
              break;
            }
            n[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        s = r.call(e, t);
      } catch (l) {
        s = [6, l], o = 0;
      } finally {
        i = n = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
};
Object.defineProperty(Wt, "__esModule", { value: !0 });
Wt.defaultWindowHandlerImplementation = void 0;
function B() {
  if (typeof window > "u")
    throw Error(
      "If you are using this package with server-side rendering, please make sure that you are checking if the window object is defined."
    );
  return window;
}
var qs = {
  key: function(e) {
    return pe(this, void 0, void 0, function() {
      return me(this, function(r) {
        return [2, B().localStorage.key(e)];
      });
    });
  },
  clear: function() {
    return pe(this, void 0, void 0, function() {
      return me(this, function(e) {
        return [2, B().localStorage.clear()];
      });
    });
  },
  getItem: function(e) {
    return pe(this, void 0, void 0, function() {
      return me(this, function(r) {
        return [2, B().localStorage.getItem(e)];
      });
    });
  },
  removeItem: function(e) {
    return pe(this, void 0, void 0, function() {
      return me(this, function(r) {
        return [2, B().localStorage.removeItem(e)];
      });
    });
  },
  setItem: function(e, r) {
    return pe(this, void 0, void 0, function() {
      return me(this, function(t) {
        return [2, B().localStorage.setItem(e, r)];
      });
    });
  },
  keySync: function(e) {
    return B().localStorage.key(e);
  },
  clearSync: function() {
    return B().localStorage.clear();
  },
  getItemSync: function(e) {
    return B().localStorage.getItem(e);
  },
  removeItemSync: function(e) {
    return B().localStorage.removeItem(e);
  },
  setItemSync: function(e, r) {
    return B().localStorage.setItem(e, r);
  }
}, js = {
  key: function(e) {
    return pe(this, void 0, void 0, function() {
      return me(this, function(r) {
        return [2, B().sessionStorage.key(e)];
      });
    });
  },
  clear: function() {
    return pe(this, void 0, void 0, function() {
      return me(this, function(e) {
        return [2, B().sessionStorage.clear()];
      });
    });
  },
  getItem: function(e) {
    return pe(this, void 0, void 0, function() {
      return me(this, function(r) {
        return [2, B().sessionStorage.getItem(e)];
      });
    });
  },
  removeItem: function(e) {
    return pe(this, void 0, void 0, function() {
      return me(this, function(r) {
        return [2, B().sessionStorage.removeItem(e)];
      });
    });
  },
  setItem: function(e, r) {
    return pe(this, void 0, void 0, function() {
      return me(this, function(t) {
        return [2, B().sessionStorage.setItem(e, r)];
      });
    });
  },
  keySync: function(e) {
    return B().sessionStorage.key(e);
  },
  clearSync: function() {
    return B().sessionStorage.clear();
  },
  getItemSync: function(e) {
    return B().sessionStorage.getItem(e);
  },
  removeItemSync: function(e) {
    return B().sessionStorage.removeItem(e);
  },
  setItemSync: function(e, r) {
    return B().sessionStorage.setItem(e, r);
  }
};
Wt.defaultWindowHandlerImplementation = {
  history: {
    replaceState: function(e, r, t) {
      return B().history.replaceState(e, r, t);
    },
    getState: function() {
      return B().history.state;
    }
  },
  location: {
    getHref: function() {
      return B().location.href;
    },
    setHref: function(e) {
      B().location.href = e;
    },
    getSearch: function() {
      return B().location.search;
    },
    getHash: function() {
      return B().location.hash;
    },
    getPathName: function() {
      return B().location.pathname;
    },
    assign: function(e) {
      B().location.assign(e);
    },
    getHostName: function() {
      return B().location.hostname;
    },
    getHost: function() {
      return B().location.host;
    },
    getOrigin: function() {
      return B().location.origin;
    }
  },
  getDocument: function() {
    return B().document;
  },
  getWindowUnsafe: function() {
    return B().window;
  },
  localStorage: qs,
  sessionStorage: js
};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.WindowHandlerReference = void 0;
var $s = Wt, Nr = (
  /** @class */
  function() {
    function e(r) {
      var t = function(i) {
        return i;
      };
      r !== void 0 && (t = r), this.windowHandler = t($s.defaultWindowHandlerImplementation);
    }
    return e.init = function(r) {
      e.instance === void 0 && (e.instance = new e(r));
    }, e.getReferenceOrThrow = function() {
      if (e.instance === void 0)
        throw new Error("SuperTokensWindowHandler must be initialized before calling this method.");
      return e.instance;
    }, e;
  }()
);
ae.WindowHandlerReference = Nr;
ae.default = Nr;
(function(e) {
  function r(t) {
    for (var i in t)
      e.hasOwnProperty(i) || (e[i] = t[i]);
  }
  e.__esModule = !0, r(ae);
})(Ur);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.WindowHandlerReference = void 0;
  var r = Ur;
  Object.defineProperty(e, "WindowHandlerReference", {
    enumerable: !0,
    get: function() {
      return r.WindowHandlerReference;
    }
  });
})(Mn);
var We = {};
Object.defineProperty(We, "__esModule", { value: !0 });
We.SSR_ERROR = We.DEFAULT_API_BASE_PATH = void 0;
We.DEFAULT_API_BASE_PATH = "/auth";
We.SSR_ERROR = `
If you are trying to use this method doing server-side-rendering, please make sure you move this method inside a componentDidMount method or useEffect hook.`;
var xn = {};
Object.defineProperty(xn, "__esModule", { value: !0 });
var Vs = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(r) {
      var t = this;
      this.getAsStringDangerous = function() {
        return t.value;
      }, this.value = qr(r);
    }
    return e;
  }()
);
xn.default = Vs;
function qr(e, r) {
  r === void 0 && (r = !1);
  function t(o) {
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      o
    );
  }
  e = e.trim();
  try {
    if (!e.startsWith("http://") && !e.startsWith("https://"))
      throw new Error("Error converting to proper URL");
    var i = new URL(e);
    return r ? i.hostname.startsWith("localhost") || t(i.hostname) ? e = "http://" + i.host : e = "https://" + i.host : e = i.protocol + "//" + i.host, e;
  } catch {
  }
  if (e.startsWith("/"))
    throw new Error("Please provide a valid domain name");
  if (e.indexOf(".") === 0 && (e = e.substr(1)), (e.indexOf(".") !== -1 || e.startsWith("localhost")) && !e.startsWith("http://") && !e.startsWith("https://")) {
    e = "https://" + e;
    try {
      return new URL(e), qr(e, !0);
    } catch {
    }
  }
  throw new Error("Please provide a valid domain name");
}
var Xt = {};
Object.defineProperty(Xt, "__esModule", { value: !0 });
var Bs = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(r) {
      var t = this;
      this.startsWith = function(i) {
        return t.value.startsWith(i.value);
      }, this.appendPath = function(i) {
        return new e(t.value + i.value);
      }, this.getAsStringDangerous = function() {
        return t.value;
      }, this.value = In(r);
    }
    return e;
  }()
);
Xt.default = Bs;
function In(e) {
  e = e.trim();
  try {
    if (!e.startsWith("http://") && !e.startsWith("https://"))
      throw new Error("Error converting to proper URL");
    var r = new URL(e);
    return e = r.pathname, e.charAt(e.length - 1) === "/" ? e.substr(0, e.length - 1) : e;
  } catch {
  }
  if ((Gs(e) || e.startsWith("localhost")) && !e.startsWith("http://") && !e.startsWith("https://"))
    return e = "http://" + e, In(e);
  e.charAt(0) !== "/" && (e = "/" + e);
  try {
    return new URL("http://example.com" + e), In("http://example.com" + e);
  } catch {
    throw new Error("Please provide a valid URL path");
  }
}
function Gs(e) {
  if (e.indexOf(".") === -1 || e.startsWith("/"))
    return !1;
  try {
    var r = new URL(e);
    return r.hostname.indexOf(".") !== -1;
  } catch {
  }
  try {
    var r = new URL("http://" + e);
    return r.hostname.indexOf(".") !== -1;
  } catch {
  }
  return !1;
}
var jr = {}, zt = {}, te = {}, ht = {};
Object.defineProperty(ht, "__esModule", { value: !0 });
ht.isAnIpAddress = void 0;
function $r(e) {
  return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
    e
  );
}
ht.isAnIpAddress = $r;
var Ws = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(r) {
      var t = this;
      this.getAsStringDangerous = function() {
        return t.value;
      }, this.value = Vr(r);
    }
    return e;
  }()
);
ht.default = Ws;
function Vr(e, r) {
  r === void 0 && (r = !1), e = e.trim();
  try {
    if (!e.startsWith("http://") && !e.startsWith("https://"))
      throw new Error("converting to proper URL");
    var t = new URL(e);
    return r ? t.hostname.startsWith("localhost") || $r(t.hostname) ? e = "http://" + t.host : e = "https://" + t.host : e = t.protocol + "//" + t.host, e;
  } catch {
  }
  if (e.startsWith("/"))
    throw new Error("Please provide a valid domain name");
  if (e.indexOf(".") === 0 && (e = e.substr(1)), (e.indexOf(".") !== -1 || e.startsWith("localhost")) && !e.startsWith("http://") && !e.startsWith("https://")) {
    e = "https://" + e;
    try {
      return new URL(e), Vr(e, !0);
    } catch {
    }
  }
  throw new Error("Please provide a valid domain name");
}
var Hn = {};
Object.defineProperty(Hn, "__esModule", { value: !0 });
var Xs = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(r) {
      var t = this;
      this.startsWith = function(i) {
        return t.value.startsWith(i.value);
      }, this.appendPath = function(i) {
        return new e(t.value + i.value);
      }, this.getAsStringDangerous = function() {
        return t.value;
      }, this.value = Sn(r);
    }
    return e;
  }()
);
Hn.default = Xs;
function Sn(e) {
  e = e.trim();
  try {
    if (!e.startsWith("http://") && !e.startsWith("https://"))
      throw new Error("converting to proper URL");
    var r = new URL(e);
    return e = r.pathname, e.charAt(e.length - 1) === "/" ? e.substr(0, e.length - 1) : e;
  } catch {
  }
  if ((zs(e) || e.startsWith("localhost")) && !e.startsWith("http://") && !e.startsWith("https://"))
    return e = "http://" + e, Sn(e);
  e.charAt(0) !== "/" && (e = "/" + e);
  try {
    return new URL("http://example.com" + e), Sn("http://example.com" + e);
  } catch {
    throw new Error("Please provide a valid URL path");
  }
}
function zs(e) {
  if (e.indexOf(".") === -1 || e.startsWith("/"))
    return !1;
  try {
    var r = new URL(e);
    return r.hostname.indexOf(".") !== -1;
  } catch {
  }
  try {
    var r = new URL("http://" + e);
    return r.hostname.indexOf(".") !== -1;
  } catch {
  }
  return !1;
}
var Tn = p && p.__assign || function() {
  return Tn = Object.assign || function(e) {
    for (var r, t = 1, i = arguments.length; t < i; t++) {
      r = arguments[t];
      for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, Tn.apply(this, arguments);
}, er = p && p.__awaiter || function(e, r, t, i) {
  function o(n) {
    return n instanceof t ? n : new t(function(a) {
      a(n);
    });
  }
  return new (t || (t = Promise))(function(n, a) {
    function u(l) {
      try {
        s(i.next(l));
      } catch (d) {
        a(d);
      }
    }
    function c(l) {
      try {
        s(i.throw(l));
      } catch (d) {
        a(d);
      }
    }
    function s(l) {
      l.done ? n(l.value) : o(l.value).then(u, c);
    }
    s((i = i.apply(e, r || [])).next());
  });
}, tr = p && p.__generator || function(e, r) {
  var t = {
    label: 0,
    sent: function() {
      if (n[0] & 1)
        throw n[1];
      return n[1];
    },
    trys: [],
    ops: []
  }, i, o, n, a;
  return a = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function u(s) {
    return function(l) {
      return c([s, l]);
    };
  }
  function c(s) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, o && (n = s[0] & 2 ? o.return : s[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, s[1])).done)
          return n;
        switch (o = 0, n && (s = [s[0] & 2, n.value]), s[0]) {
          case 0:
          case 1:
            n = s;
            break;
          case 4:
            return t.label++, { value: s[1], done: !1 };
          case 5:
            t.label++, o = s[1], s = [0];
            continue;
          case 7:
            s = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (n = t.trys, !(n = n.length > 0 && n[n.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              t = 0;
              continue;
            }
            if (s[0] === 3 && (!n || s[1] > n[0] && s[1] < n[3])) {
              t.label = s[1];
              break;
            }
            if (s[0] === 6 && t.label < n[1]) {
              t.label = n[1], n = s;
              break;
            }
            if (n && t.label < n[2]) {
              t.label = n[2], t.ops.push(s);
              break;
            }
            n[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        s = r.call(e, t);
      } catch (l) {
        s = [6, l], o = 0;
      } finally {
        i = n = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
};
Object.defineProperty(te, "__esModule", { value: !0 });
te.matchesDomainOrSubdomain = te.getNormalisedUserContext = te.validateAndNormaliseInputOrThrowError = te.normaliseSessionScopeOrThrowError = te.normaliseURLPathOrThrowError = te.normaliseURLDomainOrThrowError = void 0;
var Br = ht, Js = Hn, Ks = ae;
function Gr(e) {
  var r = new Br.default(e).getAsStringDangerous();
  return r;
}
te.normaliseURLDomainOrThrowError = Gr;
function _n(e) {
  return new Js.default(e).getAsStringDangerous();
}
te.normaliseURLPathOrThrowError = _n;
function En(e) {
  function r(i) {
    i = i.trim().toLowerCase(), i.startsWith(".") && (i = i.substr(1)), !i.startsWith("http://") && !i.startsWith("https://") && (i = "http://" + i);
    try {
      var o = new URL(i);
      return i = o.hostname, i;
    } catch {
      throw new Error("Please provide a valid sessionScope");
    }
  }
  var t = r(e);
  return t === "localhost" || (0, Br.isAnIpAddress)(t) ? t : e.startsWith(".") ? "." + t : t;
}
te.normaliseSessionScopeOrThrowError = En;
function Qs(e) {
  var r = this, t = Gr(e.apiDomain), i = _n("/auth");
  e.apiBasePath !== void 0 && (i = _n(e.apiBasePath));
  var o = Ks.default.getReferenceOrThrow().windowHandler.location.getHostName(), n = En(
    e !== void 0 && e.sessionTokenFrontendDomain !== void 0 ? e.sessionTokenFrontendDomain : o
  ), a = 401;
  e.sessionExpiredStatusCode !== void 0 && (a = e.sessionExpiredStatusCode);
  var u = 403;
  if (e.invalidClaimStatusCode !== void 0 && (u = e.invalidClaimStatusCode), a === u)
    throw new Error("sessionExpiredStatusCode and invalidClaimStatusCode cannot be the same.");
  var c = !0;
  e.autoAddCredentials !== void 0 && (c = e.autoAddCredentials);
  var s = !1;
  e.isInIframe !== void 0 && (s = e.isInIframe);
  var l = void 0;
  e.sessionTokenBackendDomain !== void 0 && (l = En(e.sessionTokenBackendDomain));
  var d = 10;
  if (e.maxRetryAttemptsForSessionRefresh !== void 0) {
    if (e.maxRetryAttemptsForSessionRefresh < 0)
      throw new Error("maxRetryAttemptsForSessionRefresh must be greater than or equal to 0.");
    d = e.maxRetryAttemptsForSessionRefresh;
  }
  var b = function(U) {
    return er(r, void 0, void 0, function() {
      return tr(this, function(M) {
        return [2, { url: U.url, requestInit: U.requestInit }];
      });
    });
  };
  e.preAPIHook !== void 0 && (b = e.preAPIHook);
  var f = function() {
    return er(r, void 0, void 0, function() {
      return tr(this, function(U) {
        return [
          2
          /*return*/
        ];
      });
    });
  };
  e.postAPIHook !== void 0 && (f = e.postAPIHook);
  var k = function() {
  };
  e.onHandleEvent !== void 0 && (k = e.onHandleEvent);
  var H = Tn(
    {
      functions: function(U) {
        return U;
      }
    },
    e.override
  );
  return {
    apiDomain: t,
    apiBasePath: i,
    sessionTokenFrontendDomain: n,
    sessionExpiredStatusCode: a,
    invalidClaimStatusCode: u,
    autoAddCredentials: c,
    isInIframe: s,
    tokenTransferMethod: e.tokenTransferMethod !== void 0 ? e.tokenTransferMethod : "cookie",
    sessionTokenBackendDomain: l,
    maxRetryAttemptsForSessionRefresh: d,
    preAPIHook: b,
    postAPIHook: f,
    onHandleEvent: k,
    override: H
  };
}
te.validateAndNormaliseInputOrThrowError = Qs;
function Ys(e) {
  return e === void 0 ? {} : e;
}
te.getNormalisedUserContext = Ys;
function Zs(e, r) {
  for (var t = e.split("."), i = 0; i < t.length; i++) {
    var o = t.slice(i).join(".");
    if (o === r || ".".concat(o) === r)
      return !0;
  }
  return !1;
}
te.matchesDomainOrSubdomain = Zs;
var ze = {}, Jt = {};
(function(e) {
  var r = p && p.__awaiter || function(o, n, a, u) {
    function c(s) {
      return s instanceof a ? s : new a(function(l) {
        l(s);
      });
    }
    return new (a || (a = Promise))(function(s, l) {
      function d(k) {
        try {
          f(u.next(k));
        } catch (H) {
          l(H);
        }
      }
      function b(k) {
        try {
          f(u.throw(k));
        } catch (H) {
          l(H);
        }
      }
      function f(k) {
        k.done ? s(k.value) : c(k.value).then(d, b);
      }
      f((u = u.apply(o, n || [])).next());
    });
  }, t = p && p.__generator || function(o, n) {
    var a = {
      label: 0,
      sent: function() {
        if (s[0] & 1)
          throw s[1];
        return s[1];
      },
      trys: [],
      ops: []
    }, u, c, s, l;
    return l = { next: d(0), throw: d(1), return: d(2) }, typeof Symbol == "function" && (l[Symbol.iterator] = function() {
      return this;
    }), l;
    function d(f) {
      return function(k) {
        return b([f, k]);
      };
    }
    function b(f) {
      if (u)
        throw new TypeError("Generator is already executing.");
      for (; a; )
        try {
          if (u = 1, c && (s = f[0] & 2 ? c.return : f[0] ? c.throw || ((s = c.return) && s.call(c), 0) : c.next) && !(s = s.call(c, f[1])).done)
            return s;
          switch (c = 0, s && (f = [f[0] & 2, s.value]), f[0]) {
            case 0:
            case 1:
              s = f;
              break;
            case 4:
              return a.label++, { value: f[1], done: !1 };
            case 5:
              a.label++, c = f[1], f = [0];
              continue;
            case 7:
              f = a.ops.pop(), a.trys.pop();
              continue;
            default:
              if (s = a.trys, !(s = s.length > 0 && s[s.length - 1]) && (f[0] === 6 || f[0] === 2)) {
                a = 0;
                continue;
              }
              if (f[0] === 3 && (!s || f[1] > s[0] && f[1] < s[3])) {
                a.label = f[1];
                break;
              }
              if (f[0] === 6 && a.label < s[1]) {
                a.label = s[1], s = f;
                break;
              }
              if (s && a.label < s[2]) {
                a.label = s[2], a.ops.push(f);
                break;
              }
              s[2] && a.ops.pop(), a.trys.pop();
              continue;
          }
          f = n.call(o, a);
        } catch (k) {
          f = [6, k], c = 0;
        } finally {
          u = s = 0;
        }
      if (f[0] & 5)
        throw f[1];
      return { value: f[0] ? f[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ProcessState = e.PROCESS_STATE = void 0, function(o) {
    o[o.CALLING_INTERCEPTION_REQUEST = 0] = "CALLING_INTERCEPTION_REQUEST", o[o.CALLING_INTERCEPTION_RESPONSE = 1] = "CALLING_INTERCEPTION_RESPONSE";
  }(e.PROCESS_STATE || (e.PROCESS_STATE = {}));
  var i = (
    /** @class */
    function() {
      function o() {
        var n = this;
        this.history = [], this.addState = function(a) {
          try {
            process !== void 0 && process.env !== void 0 && process.env.TEST_MODE === "testing" && n.history.push(a);
          } catch {
          }
        }, this.getEventByLastEventByName = function(a) {
          for (var u = n.history.length - 1; u >= 0; u--)
            if (n.history[u] == a)
              return n.history[u];
        }, this.reset = function() {
          n.history = [];
        }, this.waitForEvent = function(a, u) {
          return u === void 0 && (u = 7e3), r(n, void 0, void 0, function() {
            var c, s = this;
            return t(this, function(l) {
              return c = Date.now(), [
                2,
                new Promise(function(d) {
                  var b = s;
                  function f() {
                    var k = b.getEventByLastEventByName(a);
                    k === void 0 ? Date.now() - c > u ? d(void 0) : setTimeout(f, 1e3) : d(k);
                  }
                  f();
                })
              ];
            });
          });
        };
      }
      return o.getInstance = function() {
        return o.instance == null && (o.instance = new o()), o.instance;
      }, o;
    }()
  );
  e.ProcessState = i;
})(Jt);
var Ae = {};
Object.defineProperty(Ae, "__esModule", { value: !0 });
Ae.supported_fdi = Ae.package_version = void 0;
Ae.package_version = "20.1.1";
Ae.supported_fdi = ["1.16", "1.17", "1.18", "1.19", "2.0", "3.0"];
var Le = {}, Kt = {}, nr = p && p.__awaiter || function(e, r, t, i) {
  function o(n) {
    return n instanceof t ? n : new t(function(a) {
      a(n);
    });
  }
  return new (t || (t = Promise))(function(n, a) {
    function u(l) {
      try {
        s(i.next(l));
      } catch (d) {
        a(d);
      }
    }
    function c(l) {
      try {
        s(i.throw(l));
      } catch (d) {
        a(d);
      }
    }
    function s(l) {
      l.done ? n(l.value) : o(l.value).then(u, c);
    }
    s((i = i.apply(e, r || [])).next());
  });
}, rr = p && p.__generator || function(e, r) {
  var t = {
    label: 0,
    sent: function() {
      if (n[0] & 1)
        throw n[1];
      return n[1];
    },
    trys: [],
    ops: []
  }, i, o, n, a;
  return a = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function u(s) {
    return function(l) {
      return c([s, l]);
    };
  }
  function c(s) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, o && (n = s[0] & 2 ? o.return : s[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, s[1])).done)
          return n;
        switch (o = 0, n && (s = [s[0] & 2, n.value]), s[0]) {
          case 0:
          case 1:
            n = s;
            break;
          case 4:
            return t.label++, { value: s[1], done: !1 };
          case 5:
            t.label++, o = s[1], s = [0];
            continue;
          case 7:
            s = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (n = t.trys, !(n = n.length > 0 && n[n.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              t = 0;
              continue;
            }
            if (s[0] === 3 && (!n || s[1] > n[0] && s[1] < n[3])) {
              t.label = s[1];
              break;
            }
            if (s[0] === 6 && t.label < n[1]) {
              t.label = n[1], n = s;
              break;
            }
            if (n && t.label < n[2]) {
              t.label = n[2], t.ops.push(s);
              break;
            }
            n[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        s = r.call(e, t);
      } catch (l) {
        s = [6, l], o = 0;
      } finally {
        i = n = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
};
Object.defineProperty(Kt, "__esModule", { value: !0 });
Kt.defaultCookieHandlerImplementation = void 0;
var sr = ae;
Kt.defaultCookieHandlerImplementation = {
  getCookie: function() {
    return nr(this, void 0, void 0, function() {
      return rr(this, function(e) {
        return [
          2,
          sr.default.getReferenceOrThrow().windowHandler.getWindowUnsafe().document.cookie
        ];
      });
    });
  },
  setCookie: function(e) {
    return nr(this, void 0, void 0, function() {
      return rr(this, function(r) {
        return sr.default.getReferenceOrThrow().windowHandler.getWindowUnsafe().document.cookie = e, [
          2
          /*return*/
        ];
      });
    });
  }
};
Object.defineProperty(Le, "__esModule", { value: !0 });
Le.CookieHandlerReference = void 0;
var ei = Kt, Wr = (
  /** @class */
  function() {
    function e(r) {
      var t = function(i) {
        return i;
      };
      r !== void 0 && (t = r), this.cookieHandler = t(ei.defaultCookieHandlerImplementation);
    }
    return e.init = function(r) {
      e.instance === void 0 && (e.instance = new e(r));
    }, e.getReferenceOrThrow = function() {
      if (e.instance === void 0)
        throw new Error("SuperTokensCookieHandler must be initialized before calling this method.");
      return e.instance;
    }, e;
  }()
);
Le.CookieHandlerReference = Wr;
Le.default = Wr;
var Ue = {}, Fn = {}, Ln = {};
Object.defineProperty(Ln, "__esModule", { value: !0 });
var ti = (
  /** @class */
  function() {
    function e() {
      var r = this;
      this.locked = /* @__PURE__ */ new Map(), this.addToLocked = function(t, i) {
        var o = r.locked.get(t);
        o === void 0 ? i === void 0 ? r.locked.set(t, []) : r.locked.set(t, [i]) : i !== void 0 && (o.unshift(i), r.locked.set(t, o));
      }, this.isLocked = function(t) {
        return r.locked.has(t);
      }, this.lock = function(t) {
        return new Promise(function(i, o) {
          r.isLocked(t) ? r.addToLocked(t, i) : (r.addToLocked(t), i());
        });
      }, this.unlock = function(t) {
        var i = r.locked.get(t);
        if (i === void 0 || i.length === 0) {
          r.locked.delete(t);
          return;
        }
        var o = i.pop();
        r.locked.set(t, i), o !== void 0 && setTimeout(o, 0);
      };
    }
    return e.getInstance = function() {
      return e.instance === void 0 && (e.instance = new e()), e.instance;
    }, e;
  }()
);
function ni() {
  return ti.getInstance();
}
Ln.default = ni;
var de = p && p.__awaiter || function(e, r, t, i) {
  return new (t || (t = Promise))(function(o, n) {
    function a(s) {
      try {
        c(i.next(s));
      } catch (l) {
        n(l);
      }
    }
    function u(s) {
      try {
        c(i.throw(s));
      } catch (l) {
        n(l);
      }
    }
    function c(s) {
      s.done ? o(s.value) : new t(function(l) {
        l(s.value);
      }).then(a, u);
    }
    c((i = i.apply(e, r || [])).next());
  });
}, fe = p && p.__generator || function(e, r) {
  var t = { label: 0, sent: function() {
    if (n[0] & 1)
      throw n[1];
    return n[1];
  }, trys: [], ops: [] }, i, o, n, a;
  return a = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function u(s) {
    return function(l) {
      return c([s, l]);
    };
  }
  function c(s) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, o && (n = s[0] & 2 ? o.return : s[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, s[1])).done)
          return n;
        switch (o = 0, n && (s = [s[0] & 2, n.value]), s[0]) {
          case 0:
          case 1:
            n = s;
            break;
          case 4:
            return t.label++, { value: s[1], done: !1 };
          case 5:
            t.label++, o = s[1], s = [0];
            continue;
          case 7:
            s = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (n = t.trys, !(n = n.length > 0 && n[n.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              t = 0;
              continue;
            }
            if (s[0] === 3 && (!n || s[1] > n[0] && s[1] < n[3])) {
              t.label = s[1];
              break;
            }
            if (s[0] === 6 && t.label < n[1]) {
              t.label = n[1], n = s;
              break;
            }
            if (n && t.label < n[2]) {
              t.label = n[2], t.ops.push(s);
              break;
            }
            n[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        s = r.call(e, t);
      } catch (l) {
        s = [6, l], o = 0;
      } finally {
        i = n = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
}, et = p;
Object.defineProperty(Fn, "__esModule", { value: !0 });
var Be = Ln, pn = "browser-tabs-lock-key", Rt = {
  key: function(e) {
    return de(et, void 0, void 0, function() {
      return fe(this, function(r) {
        throw new Error("Unsupported");
      });
    });
  },
  getItem: function(e) {
    return de(et, void 0, void 0, function() {
      return fe(this, function(r) {
        throw new Error("Unsupported");
      });
    });
  },
  clear: function() {
    return de(et, void 0, void 0, function() {
      return fe(this, function(e) {
        return [2, window.localStorage.clear()];
      });
    });
  },
  removeItem: function(e) {
    return de(et, void 0, void 0, function() {
      return fe(this, function(r) {
        throw new Error("Unsupported");
      });
    });
  },
  setItem: function(e, r) {
    return de(et, void 0, void 0, function() {
      return fe(this, function(t) {
        throw new Error("Unsupported");
      });
    });
  },
  keySync: function(e) {
    return window.localStorage.key(e);
  },
  getItemSync: function(e) {
    return window.localStorage.getItem(e);
  },
  clearSync: function() {
    return window.localStorage.clear();
  },
  removeItemSync: function(e) {
    return window.localStorage.removeItem(e);
  },
  setItemSync: function(e, r) {
    return window.localStorage.setItem(e, r);
  }
};
function mn(e) {
  return new Promise(function(r) {
    return setTimeout(r, e);
  });
}
function Cn(e) {
  for (var r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz", t = "", i = 0; i < e; i++) {
    var o = Math.floor(Math.random() * r.length);
    t += r[o];
  }
  return t;
}
function ri() {
  return Date.now().toString() + Cn(15);
}
var si = (
  /** @class */
  function() {
    function e(r) {
      this.acquiredIatSet = /* @__PURE__ */ new Set(), this.storageHandler = void 0, this.id = ri(), this.acquireLock = this.acquireLock.bind(this), this.releaseLock = this.releaseLock.bind(this), this.releaseLock__private__ = this.releaseLock__private__.bind(this), this.waitForSomethingToChange = this.waitForSomethingToChange.bind(this), this.refreshLockWhileAcquired = this.refreshLockWhileAcquired.bind(this), this.storageHandler = r, e.waiters === void 0 && (e.waiters = []);
    }
    return e.prototype.acquireLock = function(r, t) {
      return t === void 0 && (t = 5e3), de(this, void 0, void 0, function() {
        var i, o, n, a, u, c, s, l;
        return fe(this, function(d) {
          switch (d.label) {
            case 0:
              i = Date.now() + Cn(4), o = Date.now() + t, n = pn + "-" + r, a = this.storageHandler === void 0 ? Rt : this.storageHandler, d.label = 1;
            case 1:
              return Date.now() < o ? [4, mn(30)] : [3, 8];
            case 2:
              return d.sent(), u = a.getItemSync(n), u !== null ? [3, 5] : (c = this.id + "-" + r + "-" + i, [4, mn(Math.floor(Math.random() * 25))]);
            case 3:
              return d.sent(), a.setItemSync(n, JSON.stringify({
                id: this.id,
                iat: i,
                timeoutKey: c,
                timeAcquired: Date.now(),
                timeRefreshed: Date.now()
              })), [4, mn(30)];
            case 4:
              return d.sent(), s = a.getItemSync(n), s !== null && (l = JSON.parse(s), l.id === this.id && l.iat === i) ? (this.acquiredIatSet.add(i), this.refreshLockWhileAcquired(n, i), [2, !0]) : [3, 7];
            case 5:
              return e.lockCorrector(this.storageHandler === void 0 ? Rt : this.storageHandler), [4, this.waitForSomethingToChange(o)];
            case 6:
              d.sent(), d.label = 7;
            case 7:
              return i = Date.now() + Cn(4), [3, 1];
            case 8:
              return [2, !1];
          }
        });
      });
    }, e.prototype.refreshLockWhileAcquired = function(r, t) {
      return de(this, void 0, void 0, function() {
        var i = this;
        return fe(this, function(o) {
          return setTimeout(function() {
            return de(i, void 0, void 0, function() {
              var n, a, u;
              return fe(this, function(c) {
                switch (c.label) {
                  case 0:
                    return [4, Be.default().lock(t)];
                  case 1:
                    if (c.sent(), !this.acquiredIatSet.has(t))
                      return Be.default().unlock(t), [
                        2
                        /*return*/
                      ];
                    if (n = this.storageHandler === void 0 ? Rt : this.storageHandler, a = n.getItemSync(r), a !== null)
                      u = JSON.parse(a), u.timeRefreshed = Date.now(), n.setItemSync(r, JSON.stringify(u)), Be.default().unlock(t);
                    else
                      return Be.default().unlock(t), [
                        2
                        /*return*/
                      ];
                    return this.refreshLockWhileAcquired(r, t), [
                      2
                      /*return*/
                    ];
                }
              });
            });
          }, 1e3), [
            2
            /*return*/
          ];
        });
      });
    }, e.prototype.waitForSomethingToChange = function(r) {
      return de(this, void 0, void 0, function() {
        return fe(this, function(t) {
          switch (t.label) {
            case 0:
              return [4, new Promise(function(i) {
                var o = !1, n = Date.now(), a = 50, u = !1;
                function c() {
                  if (u || (window.removeEventListener("storage", c), e.removeFromWaiting(c), clearTimeout(s), u = !0), !o) {
                    o = !0;
                    var l = a - (Date.now() - n);
                    l > 0 ? setTimeout(i, l) : i(null);
                  }
                }
                window.addEventListener("storage", c), e.addToWaiting(c);
                var s = setTimeout(c, Math.max(0, r - Date.now()));
              })];
            case 1:
              return t.sent(), [
                2
                /*return*/
              ];
          }
        });
      });
    }, e.addToWaiting = function(r) {
      this.removeFromWaiting(r), e.waiters !== void 0 && e.waiters.push(r);
    }, e.removeFromWaiting = function(r) {
      e.waiters !== void 0 && (e.waiters = e.waiters.filter(function(t) {
        return t !== r;
      }));
    }, e.notifyWaiters = function() {
      if (e.waiters !== void 0) {
        var r = e.waiters.slice();
        r.forEach(function(t) {
          return t();
        });
      }
    }, e.prototype.releaseLock = function(r) {
      return de(this, void 0, void 0, function() {
        return fe(this, function(t) {
          switch (t.label) {
            case 0:
              return [4, this.releaseLock__private__(r)];
            case 1:
              return [2, t.sent()];
          }
        });
      });
    }, e.prototype.releaseLock__private__ = function(r) {
      return de(this, void 0, void 0, function() {
        var t, i, o, n;
        return fe(this, function(a) {
          switch (a.label) {
            case 0:
              return t = this.storageHandler === void 0 ? Rt : this.storageHandler, i = pn + "-" + r, o = t.getItemSync(i), o === null ? [
                2
                /*return*/
              ] : (n = JSON.parse(o), n.id !== this.id ? [3, 2] : [4, Be.default().lock(n.iat)]);
            case 1:
              a.sent(), this.acquiredIatSet.delete(n.iat), t.removeItemSync(i), Be.default().unlock(n.iat), e.notifyWaiters(), a.label = 2;
            case 2:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, e.lockCorrector = function(r) {
      for (var t = Date.now() - 5e3, i = r, o = [], n = 0; ; ) {
        var a = i.keySync(n);
        if (a === null)
          break;
        o.push(a), n++;
      }
      for (var u = !1, c = 0; c < o.length; c++) {
        var s = o[c];
        if (s.includes(pn)) {
          var l = i.getItemSync(s);
          if (l !== null) {
            var d = JSON.parse(l);
            (d.timeRefreshed === void 0 && d.timeAcquired < t || d.timeRefreshed !== void 0 && d.timeRefreshed < t) && (i.removeItemSync(s), u = !0);
          }
        }
      }
      u && e.notifyWaiters();
    }, e.waiters = void 0, e;
  }()
);
Fn.default = si;
Object.defineProperty(Ue, "__esModule", { value: !0 });
Ue.LockFactoryReference = void 0;
var ii = Fn, oi = function(e) {
  return function() {
    return Promise.resolve(new ii.default(e));
  };
}, Xr = (
  /** @class */
  function() {
    function e(r) {
      this.lockFactory = r;
    }
    return e.init = function(r, t) {
      this.instance === void 0 && (this.instance = new e(
        r ?? oi(t)
      ));
    }, e.getReferenceOrThrow = function() {
      if (e.instance === void 0)
        throw new Error("SuperTokensLockReference must be initialized before calling this method.");
      return e.instance;
    }, e;
  }()
);
Ue.LockFactoryReference = Xr;
Ue.default = Xr;
var oe = {};
Object.defineProperty(oe, "__esModule", { value: !0 });
oe.logDebugMessage = oe.disableLogging = oe.enableLogging = void 0;
var ai = Ae, ui = "com.supertokens", Un = !1;
function li() {
  Un = !0;
}
oe.enableLogging = li;
function ci() {
  Un = !1;
}
oe.disableLogging = ci;
function di(e) {
  Un && console.log(
    "".concat(ui, ' {t: "').concat((/* @__PURE__ */ new Date()).toISOString(), '", message: "').concat(e, '", supertokens-website-ver: "').concat(ai.package_version, '"}')
  );
}
oe.logDebugMessage = di;
var we = {}, Qt = {};
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.DateProvider = void 0;
var ir = ae, fi = (
  /** @class */
  function() {
    function e() {
      this.clockSkewInMillis = 0, this.thresholdInSeconds = 7;
    }
    return e.init = function() {
      if (e.instance === void 0) {
        e.instance = new e();
        var r = ir.default.getReferenceOrThrow().windowHandler.localStorage, t = r.getItemSync(e.CLOCK_SKEW_KEY), i = t !== null ? parseInt(t, 10) : 0;
        e.instance.setClientClockSkewInMillis(i);
      }
    }, e.getReferenceOrThrow = function() {
      if (e.instance === void 0)
        throw new Error("DateProvider must be initialized before calling this method.");
      return e.instance;
    }, e.prototype.getThresholdInSeconds = function() {
      return this.thresholdInSeconds;
    }, e.prototype.setThresholdInSeconds = function(r) {
      this.thresholdInSeconds = r;
    }, e.prototype.setClientClockSkewInMillis = function(r) {
      this.clockSkewInMillis = Math.abs(r) >= this.thresholdInSeconds * 1e3 ? r : 0;
      var t = ir.default.getReferenceOrThrow().windowHandler.localStorage;
      t.setItemSync(e.CLOCK_SKEW_KEY, String(r));
    }, e.prototype.getClientClockSkewInMillis = function() {
      return this.clockSkewInMillis;
    }, e.prototype.now = function() {
      return Date.now() + this.getClientClockSkewInMillis();
    }, e.CLOCK_SKEW_KEY = "__st_clockSkewInMillis", e;
  }()
);
Qt.DateProvider = fi;
Object.defineProperty(we, "__esModule", { value: !0 });
we.DateProviderReference = void 0;
var or = Qt, zr = (
  /** @class */
  function() {
    function e(r) {
      r !== void 0 ? this.dateProvider = r() : (or.DateProvider.init(), this.dateProvider = or.DateProvider.getReferenceOrThrow());
    }
    return e.init = function(r) {
      e.instance === void 0 && (e.instance = new e(r));
    }, e.getReferenceOrThrow = function() {
      if (e.instance === void 0)
        throw new Error("SuperTokensDateProvider must be initialized before calling this method.");
      return e.instance;
    }, e;
  }()
);
we.DateProviderReference = zr;
we.default = zr;
(function(e) {
  var r = p && p.__assign || function() {
    return r = Object.assign || function(h) {
      for (var y, w = 1, R = arguments.length; w < R; w++) {
        y = arguments[w];
        for (var I in y)
          Object.prototype.hasOwnProperty.call(y, I) && (h[I] = y[I]);
      }
      return h;
    }, r.apply(this, arguments);
  }, t = p && p.__awaiter || function(h, y, w, R) {
    function I(E) {
      return E instanceof w ? E : new w(function(j) {
        j(E);
      });
    }
    return new (w || (w = Promise))(function(E, j) {
      function X(J) {
        try {
          q(R.next(J));
        } catch (V) {
          j(V);
        }
      }
      function ue(J) {
        try {
          q(R.throw(J));
        } catch (V) {
          j(V);
        }
      }
      function q(J) {
        J.done ? E(J.value) : I(J.value).then(X, ue);
      }
      q((R = R.apply(h, y || [])).next());
    });
  }, i = p && p.__generator || function(h, y) {
    var w = {
      label: 0,
      sent: function() {
        if (E[0] & 1)
          throw E[1];
        return E[1];
      },
      trys: [],
      ops: []
    }, R, I, E, j;
    return j = { next: X(0), throw: X(1), return: X(2) }, typeof Symbol == "function" && (j[Symbol.iterator] = function() {
      return this;
    }), j;
    function X(q) {
      return function(J) {
        return ue([q, J]);
      };
    }
    function ue(q) {
      if (R)
        throw new TypeError("Generator is already executing.");
      for (; w; )
        try {
          if (R = 1, I && (E = q[0] & 2 ? I.return : q[0] ? I.throw || ((E = I.return) && E.call(I), 0) : I.next) && !(E = E.call(I, q[1])).done)
            return E;
          switch (I = 0, E && (q = [q[0] & 2, E.value]), q[0]) {
            case 0:
            case 1:
              E = q;
              break;
            case 4:
              return w.label++, { value: q[1], done: !1 };
            case 5:
              w.label++, I = q[1], q = [0];
              continue;
            case 7:
              q = w.ops.pop(), w.trys.pop();
              continue;
            default:
              if (E = w.trys, !(E = E.length > 0 && E[E.length - 1]) && (q[0] === 6 || q[0] === 2)) {
                w = 0;
                continue;
              }
              if (q[0] === 3 && (!E || q[1] > E[0] && q[1] < E[3])) {
                w.label = q[1];
                break;
              }
              if (q[0] === 6 && w.label < E[1]) {
                w.label = E[1], E = q;
                break;
              }
              if (E && w.label < E[2]) {
                w.label = E[2], w.ops.push(q);
                break;
              }
              E[2] && w.ops.pop(), w.trys.pop();
              continue;
          }
          q = y.call(h, w);
        } catch (J) {
          q = [6, J], I = 0;
        } finally {
          R = E = 0;
        }
      if (q[0] & 5)
        throw q[1];
      return { value: q[0] ? q[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.updateClockSkewUsingFrontToken = e.fireSessionUpdateEventsIfNecessary = e.setFrontToken = e.getFrontToken = e.setAntiCSRF = e.saveLastAccessTokenUpdate = e.getTokenForHeaderAuth = e.setToken = e.getStorageNameForToken = e.getLocalSessionState = e.onInvalidClaimResponse = e.onTokenUpdate = e.onUnauthorisedResponse = e.FrontToken = e.AntiCsrfToken = void 0;
  var o = Jt, n = Ae, a = Le, u = ae, c = Ue, s = oe, l = we, d = (
    /** @class */
    function() {
      function h() {
      }
      return h.getToken = function(y) {
        return t(this, void 0, void 0, function() {
          var w;
          return i(this, function(R) {
            switch (R.label) {
              case 0:
                return (0, s.logDebugMessage)("AntiCsrfToken.getToken: called"), y === void 0 ? (h.tokenInfo = void 0, (0, s.logDebugMessage)("AntiCsrfToken.getToken: returning undefined"), [2, void 0]) : h.tokenInfo !== void 0 ? [3, 2] : [4, cn()];
              case 1:
                return w = R.sent(), w === null ? ((0, s.logDebugMessage)("AntiCsrfToken.getToken: returning undefined"), [2, void 0]) : (h.tokenInfo = {
                  antiCsrf: w,
                  associatedAccessTokenUpdate: y
                }, [3, 4]);
              case 2:
                return h.tokenInfo.associatedAccessTokenUpdate === y ? [3, 4] : (h.tokenInfo = void 0, [4, h.getToken(y)]);
              case 3:
                return [2, R.sent()];
              case 4:
                return (0, s.logDebugMessage)("AntiCsrfToken.getToken: returning: " + h.tokenInfo.antiCsrf), [2, h.tokenInfo.antiCsrf];
            }
          });
        });
      }, h.removeToken = function() {
        return t(this, void 0, void 0, function() {
          return i(this, function(y) {
            switch (y.label) {
              case 0:
                return (0, s.logDebugMessage)("AntiCsrfToken.removeToken: called"), h.tokenInfo = void 0, [4, De(void 0)];
              case 1:
                return y.sent(), [
                  2
                  /*return*/
                ];
            }
          });
        });
      }, h.setItem = function(y, w) {
        return t(this, void 0, void 0, function() {
          return i(this, function(R) {
            switch (R.label) {
              case 0:
                return y === void 0 ? (h.tokenInfo = void 0, [
                  2
                  /*return*/
                ]) : ((0, s.logDebugMessage)("AntiCsrfToken.setItem: called"), [4, De(w)]);
              case 1:
                return R.sent(), h.tokenInfo = {
                  antiCsrf: w,
                  associatedAccessTokenUpdate: y
                }, [
                  2
                  /*return*/
                ];
            }
          });
        });
      }, h;
    }()
  );
  e.AntiCsrfToken = d;
  var b = (
    /** @class */
    function() {
      function h() {
      }
      return h.getTokenInfo = function() {
        return t(this, void 0, void 0, function() {
          var y, w;
          return i(this, function(R) {
            switch (R.label) {
              case 0:
                return (0, s.logDebugMessage)("FrontToken.getTokenInfo: called"), [4, Z()];
              case 1:
                return y = R.sent(), y !== null ? [3, 5] : [4, v(!1)];
              case 2:
                return R.sent().status !== "EXISTS" ? [3, 4] : [
                  4,
                  new Promise(function(I) {
                    h.waiters.push(I);
                  })
                ];
              case 3:
                return R.sent(), [2, h.getTokenInfo()];
              case 4:
                return [2, void 0];
              case 5:
                return w = F(y), (0, s.logDebugMessage)("FrontToken.getTokenInfo: returning ate: " + w.ate), (0, s.logDebugMessage)("FrontToken.getTokenInfo: returning uid: " + w.uid), (0, s.logDebugMessage)("FrontToken.getTokenInfo: returning up: " + w.up), [2, w];
            }
          });
        });
      }, h.removeToken = function() {
        return t(this, void 0, void 0, function() {
          return i(this, function(y) {
            switch (y.label) {
              case 0:
                return (0, s.logDebugMessage)("FrontToken.removeToken: called"), [4, ge(void 0)];
              case 1:
                return y.sent(), [4, P("access", "")];
              case 2:
                return y.sent(), [4, P("refresh", "")];
              case 3:
                return y.sent(), h.waiters.forEach(function(w) {
                  return w(void 0);
                }), h.waiters = [], [
                  2
                  /*return*/
                ];
            }
          });
        });
      }, h.setItem = function(y) {
        return t(this, void 0, void 0, function() {
          return i(this, function(w) {
            switch (w.label) {
              case 0:
                return [4, Oe()];
              case 1:
                return w.sent(), y === "remove" ? [2, h.removeToken()] : ((0, s.logDebugMessage)("FrontToken.setItem: called"), [4, ge(y)]);
              case 2:
                return w.sent(), h.waiters.forEach(function(R) {
                  return R(void 0);
                }), h.waiters = [], [
                  2
                  /*return*/
                ];
            }
          });
        });
      }, h.doesTokenExists = function() {
        return t(this, void 0, void 0, function() {
          var y;
          return i(this, function(w) {
            switch (w.label) {
              case 0:
                return [4, $e()];
              case 1:
                return y = w.sent(), [2, y !== null];
            }
          });
        });
      }, h.waiters = [], h;
    }()
  );
  e.FrontToken = b;
  var f = (
    /** @class */
    function() {
      function h() {
      }
      h.init = function(w, R) {
        (0, s.logDebugMessage)("init: called"), (0, s.logDebugMessage)("init: Input apiBasePath: " + w.apiBasePath), (0, s.logDebugMessage)("init: Input apiDomain: " + w.apiDomain), (0, s.logDebugMessage)("init: Input autoAddCredentials: " + w.autoAddCredentials), (0, s.logDebugMessage)("init: Input sessionTokenBackendDomain: " + w.sessionTokenBackendDomain), (0, s.logDebugMessage)("init: Input isInIframe: " + w.isInIframe), (0, s.logDebugMessage)("init: Input sessionExpiredStatusCode: " + w.sessionExpiredStatusCode), (0, s.logDebugMessage)("init: Input sessionTokenFrontendDomain: " + w.sessionTokenFrontendDomain), (0, s.logDebugMessage)("init: Input tokenTransferMethod: " + w.tokenTransferMethod);
        var I = u.default.getReferenceOrThrow().windowHandler.getWindowUnsafe();
        h.env = I === void 0 || I.fetch === void 0 ? p : I, h.refreshTokenUrl = w.apiDomain + w.apiBasePath + "/session/refresh", h.signOutUrl = w.apiDomain + w.apiBasePath + "/signout", h.rid = "session", h.config = w, h.env.__supertokensOriginalFetch === void 0 && ((0, s.logDebugMessage)("init: __supertokensOriginalFetch is undefined"), h.env.__supertokensOriginalFetch = h.env.fetch.bind(h.env), h.env.__supertokensSessionRecipe = R, h.env.fetch = h.env.__supertokensSessionRecipe.addFetchInterceptorsAndReturnModifiedFetch({
          originalFetch: h.env.__supertokensOriginalFetch,
          userContext: {}
        }), h.env.__supertokensSessionRecipe.addXMLHttpRequestInterceptor({
          userContext: {}
        })), h.recipeImpl = h.env.__supertokensSessionRecipe, h.initCalled = !0;
      };
      var y;
      return y = h, h.initCalled = !1, h.doRequest = function(w, R, I) {
        return t(void 0, void 0, void 0, function() {
          var E, j, X, ue, q, J, V, Ze, Me, xe, fn, hn, ve, gn, kt, Xn;
          return i(y, function(K) {
            switch (K.label) {
              case 0:
                if (!h.initCalled)
                  throw Error("init function not called");
                (0, s.logDebugMessage)("doRequest: start of fetch interception"), E = !1;
                try {
                  j = void 0, typeof I == "string" ? j = I : typeof I == "object" && (typeof I.url == "string" ? j = I.url : typeof I.href == "string" && (j = I.href)), E = !h.recipeImpl.shouldDoInterceptionBasedOnUrl(
                    j,
                    h.config.apiDomain,
                    h.config.sessionTokenBackendDomain
                  );
                } catch (zn) {
                  if (zn.message === "Please provide a valid domain name")
                    (0, s.logDebugMessage)(
                      "doRequest: Trying shouldDoInterceptionBasedOnUrl with location.origin"
                    ), E = !h.recipeImpl.shouldDoInterceptionBasedOnUrl(
                      u.default.getReferenceOrThrow().windowHandler.location.getOrigin(),
                      h.config.apiDomain,
                      h.config.sessionTokenBackendDomain
                    );
                  else
                    throw zn;
                }
                return (0, s.logDebugMessage)("doRequest: Value of doNotDoInterception: " + E), E ? ((0, s.logDebugMessage)("doRequest: Returning without interception"), [4, w(R)]) : [3, 2];
              case 1:
                return [2, K.sent()];
              case 2:
                return X = new Headers(
                  R !== void 0 && R.headers !== void 0 ? R.headers : I.headers
                ), X.has("Authorization") ? [4, _("access")] : [3, 5];
              case 3:
                return ue = K.sent(), [4, _("refresh")];
              case 4:
                q = K.sent(), ue !== void 0 && q !== void 0 && X.get("Authorization") === "Bearer ".concat(ue) && ((0, s.logDebugMessage)(
                  "doRequest: Removing Authorization from user provided headers because it contains our access token"
                ), X.delete("Authorization")), K.label = 5;
              case 5:
                (0, s.logDebugMessage)("doRequest: Interception started"), o.ProcessState.getInstance().addState(
                  o.PROCESS_STATE.CALLING_INTERCEPTION_REQUEST
                ), K.label = 6;
              case 6:
                K.trys.push([6, , 20, 25]), J = 0, V = void 0, K.label = 7;
              case 7:
                return [4, v(!0)];
              case 8:
                return Ze = K.sent(), Me = new Headers(X), xe = r(r({}, R), { headers: Me }), Ze.status !== "EXISTS" ? [3, 10] : [4, d.getToken(Ze.lastAccessTokenUpdate)];
              case 9:
                fn = K.sent(), fn !== void 0 && ((0, s.logDebugMessage)("doRequest: Adding anti-csrf token to request"), Me.set("anti-csrf", fn)), K.label = 10;
              case 10:
                return h.config.autoAddCredentials && ((0, s.logDebugMessage)("doRequest: Adding credentials include"), xe === void 0 ? xe = {
                  credentials: "include"
                } : xe.credentials === void 0 && (xe = r(r({}, xe), {
                  credentials: "include"
                }))), Me.has("rid") ? (0, s.logDebugMessage)("doRequest: rid header was already there in request") : ((0, s.logDebugMessage)("doRequest: Adding rid header: anti-csrf"), Me.set("rid", "anti-csrf")), hn = h.config.tokenTransferMethod, (0, s.logDebugMessage)("doRequest: Adding st-auth-mode header: " + hn), Me.set("st-auth-mode", hn), [4, x(Me)];
              case 11:
                return K.sent(), (0, s.logDebugMessage)("doRequest: Making user's http call"), [4, w(xe)];
              case 12:
                return ve = K.sent(), (0, s.logDebugMessage)("doRequest: User's http call ended"), [4, he(ve)];
              case 13:
                if (K.sent(), dn(
                  Ze.status === "EXISTS",
                  ve.status,
                  ve.headers.get("front-token")
                ), ve.status !== h.config.sessionExpiredStatusCode)
                  return [3, 15];
                if ((0, s.logDebugMessage)("doRequest: Status code is: " + ve.status), J >= h.config.maxRetryAttemptsForSessionRefresh)
                  throw (0, s.logDebugMessage)(
                    "doRequest: Maximum session refresh attempts reached. sessionRefreshAttempts: ".concat(J, ", maxRetryAttemptsForSessionRefresh: ").concat(h.config.maxRetryAttemptsForSessionRefresh)
                  ), gn = "Received a 401 response from ".concat(
                    I,
                    ". Attempted to refresh the session and retry the request with the updated session tokens "
                  ).concat(
                    h.config.maxRetryAttemptsForSessionRefresh,
                    " times, but each attempt resulted in a 401 error. The maximum session refresh limit has been reached. Please investigate your API. To increase the session refresh attempts, update maxRetryAttemptsForSessionRefresh in the config."
                  ), console.error(gn), new Error(gn);
                return [4, m(Ze)];
              case 14:
                return kt = K.sent(), J++, (0, s.logDebugMessage)("doRequest: sessionRefreshAttempts: " + J), kt.result !== "RETRY" ? ((0, s.logDebugMessage)("doRequest: Not retrying original request"), V = kt.error !== void 0 ? kt.error : ve, [3, 19]) : ((0, s.logDebugMessage)("doRequest: Retrying original request"), [3, 18]);
              case 15:
                return ve.status !== h.config.invalidClaimStatusCode ? [3, 17] : [4, N(ve)];
              case 16:
                K.sent(), K.label = 17;
              case 17:
                return [2, ve];
              case 18:
                return [3, 7];
              case 19:
                return [2, V];
              case 20:
                return [4, v(!1)];
              case 21:
                return Xn = K.sent(), Xn.status !== "NOT_EXISTS" ? [3, 24] : ((0, s.logDebugMessage)("doRequest: local session doesn't exist, so removing anti-csrf and sFrontToken"), [4, d.removeToken()]);
              case 22:
                return K.sent(), [4, b.removeToken()];
              case 23:
                K.sent(), K.label = 24;
              case 24:
                return [
                  7
                  /*endfinally*/
                ];
              case 25:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      }, h.attemptRefreshingSession = function() {
        return t(void 0, void 0, void 0, function() {
          var w, R;
          return i(y, function(I) {
            switch (I.label) {
              case 0:
                if (!h.initCalled)
                  throw Error("init function not called");
                return [4, v(!1)];
              case 1:
                return w = I.sent(), [4, m(w)];
              case 2:
                if (R = I.sent(), R.result === "API_ERROR")
                  throw R.error;
                return [2, R.result === "RETRY"];
            }
          });
        });
      }, h;
    }()
  );
  e.default = f;
  var k = "st-last-access-token-update", H = "st-refresh-token", U = "st-access-token", M = "sAntiCsrf", O = "sFrontToken";
  function m(h) {
    return t(this, void 0, void 0, function() {
      var y, w, R, I, E, j, X, ue, q, J;
      return i(this, function(V) {
        switch (V.label) {
          case 0:
            return [4, c.default.getReferenceOrThrow().lockFactory()];
          case 1:
            y = V.sent(), V.label = 2;
          case 2:
            return (0, s.logDebugMessage)("onUnauthorisedResponse: trying to acquire lock"), [4, y.acquireLock("REFRESH_TOKEN_USE", 1e3)];
          case 3:
            if (!V.sent())
              return [3, 24];
            (0, s.logDebugMessage)("onUnauthorisedResponse: lock acquired"), V.label = 4;
          case 4:
            return V.trys.push([4, 16, 18, 24]), [4, v(!1)];
          case 5:
            return w = V.sent(), w.status === "NOT_EXISTS" ? ((0, s.logDebugMessage)(
              "onUnauthorisedResponse: Not refreshing because local session state is NOT_EXISTS"
            ), f.config.onHandleEvent({
              action: "UNAUTHORISED",
              sessionExpiredOrRevoked: !1,
              userContext: {}
            }), [2, { result: "SESSION_EXPIRED" }]) : w.status !== h.status || w.status === "EXISTS" && h.status === "EXISTS" && w.lastAccessTokenUpdate !== h.lastAccessTokenUpdate ? ((0, s.logDebugMessage)(
              "onUnauthorisedResponse: Retrying early because pre and post lastAccessTokenUpdate don't match"
            ), [2, { result: "RETRY" }]) : (R = new Headers(), h.status !== "EXISTS" ? [3, 7] : [4, d.getToken(h.lastAccessTokenUpdate)]);
          case 6:
            I = V.sent(), I !== void 0 && ((0, s.logDebugMessage)(
              "onUnauthorisedResponse: Adding anti-csrf token to refresh API call"
            ), R.set("anti-csrf", I)), V.label = 7;
          case 7:
            return (0, s.logDebugMessage)("onUnauthorisedResponse: Adding rid and fdi-versions to refresh call header"), R.set("rid", f.rid), R.set("fdi-version", n.supported_fdi.join(",")), E = f.config.tokenTransferMethod, (0, s.logDebugMessage)("onUnauthorisedResponse: Adding st-auth-mode header: " + E), R.set("st-auth-mode", E), [4, x(R, !0)];
          case 8:
            return V.sent(), (0, s.logDebugMessage)("onUnauthorisedResponse: Calling refresh pre API hook"), [
              4,
              f.config.preAPIHook({
                action: "REFRESH_SESSION",
                requestInit: {
                  method: "post",
                  credentials: "include",
                  headers: R
                },
                url: f.refreshTokenUrl,
                userContext: {}
              })
            ];
          case 9:
            return j = V.sent(), (0, s.logDebugMessage)("onUnauthorisedResponse: Making refresh call"), [
              4,
              f.env.__supertokensOriginalFetch(j.url, j.requestInit)
            ];
          case 10:
            return X = V.sent(), (0, s.logDebugMessage)("onUnauthorisedResponse: Refresh call ended"), [4, he(X)];
          case 11:
            return V.sent(), (0, s.logDebugMessage)("onUnauthorisedResponse: Refresh status code is: " + X.status), ue = X.status === f.config.sessionExpiredStatusCode, ue && X.headers.get("front-token") === null ? [4, b.setItem("remove")] : [3, 13];
          case 12:
            V.sent(), V.label = 13;
          case 13:
            if (dn(
              h.status === "EXISTS",
              X.status,
              ue && X.headers.get("front-token") === null ? "remove" : X.headers.get("front-token")
            ), X.status >= 300)
              throw X;
            return [
              4,
              f.config.postAPIHook({
                action: "REFRESH_SESSION",
                fetchResponse: X.clone(),
                requestInit: j.requestInit,
                url: j.url,
                userContext: {}
              })
            ];
          case 14:
            return V.sent(), [4, v(!1)];
          case 15:
            return V.sent().status === "NOT_EXISTS" ? ((0, s.logDebugMessage)(
              "onUnauthorisedResponse: local session doesn't exist, so returning session expired"
            ), [2, { result: "SESSION_EXPIRED" }]) : (f.config.onHandleEvent({
              action: "REFRESH_SESSION",
              userContext: {}
            }), (0, s.logDebugMessage)("onUnauthorisedResponse: Sending RETRY signal"), [2, { result: "RETRY" }]);
          case 16:
            return q = V.sent(), [4, v(!1)];
          case 17:
            return V.sent().status === "NOT_EXISTS" ? ((0, s.logDebugMessage)(
              "onUnauthorisedResponse: local session doesn't exist, so returning session expired"
            ), [2, { result: "SESSION_EXPIRED", error: q }]) : ((0, s.logDebugMessage)("onUnauthorisedResponse: sending API_ERROR"), [2, { result: "API_ERROR", error: q }]);
          case 18:
            return [4, y.releaseLock("REFRESH_TOKEN_USE")];
          case 19:
            return V.sent(), (0, s.logDebugMessage)("onUnauthorisedResponse: Released lock"), [4, v(!1)];
          case 20:
            return V.sent().status !== "NOT_EXISTS" ? [3, 23] : ((0, s.logDebugMessage)("onUnauthorisedResponse: local session doesn't exist, so removing anti-csrf and sFrontToken"), [4, d.removeToken()]);
          case 21:
            return V.sent(), [4, b.removeToken()];
          case 22:
            V.sent(), V.label = 23;
          case 23:
            return [
              7
              /*endfinally*/
            ];
          case 24:
            return [4, v(!1)];
          case 25:
            return J = V.sent(), J.status === "NOT_EXISTS" ? ((0, s.logDebugMessage)(
              "onUnauthorisedResponse: lock acquired failed and local session doesn't exist, so sending SESSION_EXPIRED"
            ), [2, { result: "SESSION_EXPIRED" }]) : J.status !== h.status || J.status === "EXISTS" && h.status === "EXISTS" && J.lastAccessTokenUpdate !== h.lastAccessTokenUpdate ? ((0, s.logDebugMessage)(
              "onUnauthorisedResponse: lock acquired failed and retrying early because pre and post lastAccessTokenUpdate don't match"
            ), [2, { result: "RETRY" }]) : [3, 2];
          case 26:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }
  e.onUnauthorisedResponse = m;
  function S() {
    (0, s.logDebugMessage)("onTokenUpdate: firing ACCESS_TOKEN_PAYLOAD_UPDATED event"), f.config.onHandleEvent({
      action: "ACCESS_TOKEN_PAYLOAD_UPDATED",
      userContext: {}
    });
  }
  e.onTokenUpdate = S;
  function N(h) {
    return t(this, void 0, void 0, function() {
      var y;
      return i(this, function(w) {
        switch (w.label) {
          case 0:
            return w.trys.push([0, 2, , 3]), [
              4,
              f.recipeImpl.getInvalidClaimsFromResponse({
                response: h,
                userContext: {}
              })
            ];
          case 1:
            return y = w.sent(), y && f.config.onHandleEvent({
              action: "API_INVALID_CLAIM",
              claimValidationErrors: y,
              userContext: {}
            }), [3, 3];
          case 2:
            return w.sent(), [3, 3];
          case 3:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }
  e.onInvalidClaimResponse = N;
  function v(h) {
    return t(this, void 0, void 0, function() {
      var y, w, R, I;
      return i(this, function(E) {
        switch (E.label) {
          case 0:
            return (0, s.logDebugMessage)("getLocalSessionState: called"), [4, T(k)];
          case 1:
            return y = E.sent(), [4, b.doesTokenExists()];
          case 2:
            return w = E.sent(), w && y !== void 0 ? ((0, s.logDebugMessage)("getLocalSessionState: returning EXISTS since both frontToken and lastAccessTokenUpdate exists"), [2, { status: "EXISTS", lastAccessTokenUpdate: y }]) : [3, 3];
          case 3:
            return y ? ((0, s.logDebugMessage)("getLocalSessionState: returning NOT_EXISTS since frontToken was cleared but lastAccessTokenUpdate exists"), [2, { status: "NOT_EXISTS" }]) : [3, 4];
          case 4:
            return R = {
              status: "MAY_EXIST"
            }, h ? ((0, s.logDebugMessage)("getLocalSessionState: trying to refresh"), [4, m(R)]) : [3, 7];
          case 5:
            return I = E.sent(), I.result !== "RETRY" ? ((0, s.logDebugMessage)(
              "getLocalSessionState: return NOT_EXISTS in case error from backend" + I.result
            ), [
              2,
              {
                status: "NOT_EXISTS"
              }
            ]) : ((0, s.logDebugMessage)("getLocalSessionState: Retrying post refresh"), [4, v(h)]);
          case 6:
            return [2, E.sent()];
          case 7:
            return (0, s.logDebugMessage)("getLocalSessionState: returning: " + R.status), [2, R];
        }
      });
    });
  }
  e.getLocalSessionState = v;
  function g(h) {
    switch (h) {
      case "access":
        return U;
      case "refresh":
        return H;
    }
  }
  e.getStorageNameForToken = g;
  function P(h, y) {
    var w = g(h);
    return y !== "" ? ((0, s.logDebugMessage)("setToken: saved ".concat(h, " token into cookies")), A(w, y, Date.now() + 31536e5)) : ((0, s.logDebugMessage)("setToken: cleared ".concat(h, " token from cookies")), A(w, y, 0));
  }
  e.setToken = P;
  function A(h, y, w) {
    var R = "Fri, 31 Dec 9999 23:59:59 GMT";
    w !== Number.MAX_SAFE_INTEGER && (R = new Date(w).toUTCString());
    var I = f.config.sessionTokenFrontendDomain;
    return I === "localhost" || I === u.default.getReferenceOrThrow().windowHandler.location.getHostName() ? a.default.getReferenceOrThrow().cookieHandler.setCookie(
      "".concat(h, "=").concat(y, ";expires=").concat(R, ";path=/;samesite=").concat(f.config.isInIframe ? "none;secure" : "lax")
    ) : a.default.getReferenceOrThrow().cookieHandler.setCookie(
      "".concat(h, "=").concat(y, ";expires=").concat(R, ";domain=").concat(I, ";path=/;samesite=").concat(f.config.isInIframe ? "none;secure" : "lax")
    );
  }
  function _(h) {
    return t(this, void 0, void 0, function() {
      var y;
      return i(this, function(w) {
        return y = g(h), [2, T(y)];
      });
    });
  }
  e.getTokenForHeaderAuth = _;
  function T(h) {
    return t(this, void 0, void 0, function() {
      var y, w, R, I;
      return i(this, function(E) {
        switch (E.label) {
          case 0:
            return w = "; ", [4, a.default.getReferenceOrThrow().cookieHandler.getCookie()];
          case 1:
            return y = w + E.sent(), R = y.split("; " + h + "="), R.length >= 2 && (I = R.pop(), I !== void 0) ? [2, I.split(";").shift()] : [2, void 0];
        }
      });
    });
  }
  function x(h, y) {
    return y === void 0 && (y = !1), t(this, void 0, void 0, function() {
      var w, R;
      return i(this, function(I) {
        switch (I.label) {
          case 0:
            return (0, s.logDebugMessage)("setTokenHeaders: adding existing tokens as header"), [4, _("access")];
          case 1:
            return w = I.sent(), [4, _("refresh")];
          case 2:
            return R = I.sent(), (y || w !== void 0) && R !== void 0 ? h.has("Authorization") ? (0, s.logDebugMessage)(
              "setAuthorizationHeaderIfRequired: Authorization header defined by the user, not adding"
            ) : ((0, s.logDebugMessage)(
              "setAuthorizationHeaderIfRequired: added authorization header"
            ), h.set(
              "Authorization",
              "Bearer ".concat(y ? R : w)
            )) : (0, s.logDebugMessage)(
              "setAuthorizationHeaderIfRequired: token for header based auth not found"
            ), [
              2
              /*return*/
            ];
        }
      });
    });
  }
  function he(h) {
    return t(this, void 0, void 0, function() {
      var y, w, R, I, E;
      return i(this, function(j) {
        switch (j.label) {
          case 0:
            return (0, s.logDebugMessage)("saveTokensFromHeaders: Saving updated tokens from the response headers"), y = h.headers.get("st-refresh-token"), y === null ? [3, 2] : ((0, s.logDebugMessage)("saveTokensFromHeaders: saving new refresh token"), [4, P("refresh", y)]);
          case 1:
            j.sent(), j.label = 2;
          case 2:
            return w = h.headers.get("st-access-token"), w === null ? [3, 4] : ((0, s.logDebugMessage)("saveTokensFromHeaders: saving new access token"), [4, P("access", w)]);
          case 3:
            j.sent(), j.label = 4;
          case 4:
            return R = h.headers.get("front-token"), R === null ? [3, 6] : ((0, s.logDebugMessage)("saveTokensFromHeaders: Setting sFrontToken: " + R), [4, b.setItem(R)]);
          case 5:
            j.sent(), (0, e.updateClockSkewUsingFrontToken)({ frontToken: R, responseHeaders: h.headers }), j.label = 6;
          case 6:
            return I = h.headers.get("anti-csrf"), I === null ? [3, 9] : [4, v(!0)];
          case 7:
            return E = j.sent(), E.status !== "EXISTS" ? [3, 9] : ((0, s.logDebugMessage)("saveTokensFromHeaders: Setting anti-csrf token"), [4, d.setItem(E.lastAccessTokenUpdate, I)]);
          case 8:
            j.sent(), j.label = 9;
          case 9:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }
  var Ye = void 0;
  function Oe() {
    return t(this, void 0, void 0, function() {
      var h;
      return i(this, function(y) {
        switch (y.label) {
          case 0:
            return (0, s.logDebugMessage)("saveLastAccessTokenUpdate: called"), h = Date.now().toString(), (0, s.logDebugMessage)("saveLastAccessTokenUpdate: setting " + h), [4, A(k, h, Number.MAX_SAFE_INTEGER)];
          case 1:
            return y.sent(), Ye !== void 0 ? [3, 3] : [4, T(k)];
          case 2:
            Ye = y.sent() === h, y.label = 3;
          case 3:
            return Ye === !1 && console.warn(
              "Saving to cookies was not successful, this indicates a configuration error or the browser preventing us from writing the cookies (e.g.: incognito mode)."
            ), [4, A("sIRTFrontend", "", 0)];
          case 4:
            return y.sent(), [
              2
              /*return*/
            ];
        }
      });
    });
  }
  e.saveLastAccessTokenUpdate = Oe;
  function cn() {
    return t(this, void 0, void 0, function() {
      function h() {
        return t(this, void 0, void 0, function() {
          var w, R, I, E, j;
          return i(this, function(X) {
            switch (X.label) {
              case 0:
                return R = "; ", [
                  4,
                  a.default.getReferenceOrThrow().cookieHandler.getCookie()
                ];
              case 1:
                return w = R + X.sent(), I = w.split("; " + M + "="), I.length >= 2 && (E = I.pop(), E !== void 0) ? (j = E.split(";").shift(), j === void 0 ? [2, null] : [2, j]) : [2, null];
            }
          });
        });
      }
      var y;
      return i(this, function(w) {
        switch (w.label) {
          case 0:
            return (0, s.logDebugMessage)("getAntiCSRFToken: called"), [4, v(!0)];
          case 1:
            return w.sent().status !== "EXISTS" ? ((0, s.logDebugMessage)(
              "getAntiCSRFToken: Returning because local session state != EXISTS"
            ), [2, null]) : [4, h()];
          case 2:
            return y = w.sent(), (0, s.logDebugMessage)("getAntiCSRFToken: returning: " + y), [2, y];
        }
      });
    });
  }
  function De(h) {
    return t(this, void 0, void 0, function() {
      return i(this, function(y) {
        switch (y.label) {
          case 0:
            return (0, s.logDebugMessage)("setAntiCSRF: called: " + h), h === void 0 ? [3, 2] : [4, A(M, h, Number.MAX_SAFE_INTEGER)];
          case 1:
            return y.sent(), [3, 4];
          case 2:
            return [4, A(M, "", 0)];
          case 3:
            y.sent(), y.label = 4;
          case 4:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }
  e.setAntiCSRF = De;
  function $e() {
    return t(this, void 0, void 0, function() {
      var h;
      return i(this, function(y) {
        switch (y.label) {
          case 0:
            return (0, s.logDebugMessage)("getFrontTokenFromCookie: called"), [4, T(O)];
          case 1:
            return h = y.sent(), [2, h === void 0 ? null : h];
        }
      });
    });
  }
  function F(h) {
    return JSON.parse(decodeURIComponent(escape(atob(h))));
  }
  function Z() {
    return t(this, void 0, void 0, function() {
      var h;
      return i(this, function(y) {
        switch (y.label) {
          case 0:
            return (0, s.logDebugMessage)("getFrontToken: called"), [4, v(!0)];
          case 1:
            return y.sent().status !== "EXISTS" ? ((0, s.logDebugMessage)("getFrontToken: Returning because sIRTFrontend != EXISTS"), [2, null]) : [4, $e()];
          case 2:
            return h = y.sent(), (0, s.logDebugMessage)("getFrontToken: returning: " + h), [2, h];
        }
      });
    });
  }
  e.getFrontToken = Z;
  function ge(h) {
    return t(this, void 0, void 0, function() {
      var y, w, R;
      return i(this, function(I) {
        switch (I.label) {
          case 0:
            return (0, s.logDebugMessage)("setFrontToken: called"), [4, $e()];
          case 1:
            return y = I.sent(), y !== null && h !== void 0 && (w = F(y).up, R = F(h).up, JSON.stringify(w) !== JSON.stringify(R) && S()), h !== void 0 ? [3, 3] : [4, A(O, "", 0)];
          case 2:
            return I.sent(), [3, 5];
          case 3:
            return [4, A(O, h, Number.MAX_SAFE_INTEGER)];
          case 4:
            I.sent(), I.label = 5;
          case 5:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }
  e.setFrontToken = ge;
  function dn(h, y, w) {
    if (w == null) {
      (0, s.logDebugMessage)(
        "fireSessionUpdateEventsIfNecessary returning early because the front token was not updated"
      );
      return;
    }
    var R = w !== "remove";
    (0, s.logDebugMessage)(
      "fireSessionUpdateEventsIfNecessary wasLoggedIn: ".concat(h, " frontTokenExistsAfter: ").concat(R, " status: ").concat(y)
    ), h ? R || (y === f.config.sessionExpiredStatusCode ? ((0, s.logDebugMessage)("onUnauthorisedResponse: firing UNAUTHORISED event"), f.config.onHandleEvent({
      action: "UNAUTHORISED",
      sessionExpiredOrRevoked: !0,
      userContext: {}
    })) : ((0, s.logDebugMessage)("onUnauthorisedResponse: firing SIGN_OUT event"), f.config.onHandleEvent({
      action: "SIGN_OUT",
      userContext: {}
    }))) : R && ((0, s.logDebugMessage)("onUnauthorisedResponse: firing SESSION_CREATED event"), f.config.onHandleEvent({
      action: "SESSION_CREATED",
      userContext: {}
    }));
  }
  e.fireSessionUpdateEventsIfNecessary = dn;
  var ps = function(h) {
    var y = h.frontToken, w = h.responseHeaders;
    if ((0, s.logDebugMessage)("updateClockSkewUsingFrontToken: frontToken: " + y), y == null || y === "remove") {
      (0, s.logDebugMessage)(
        "updateClockSkewUsingFrontToken: the access token payload wasn't updated or is being removed, skipping clock skew update"
      );
      return;
    }
    var R = F(y), I = f.recipeImpl.calculateClockSkewInMillis({
      accessTokenPayload: R.up,
      responseHeaders: w
    });
    l.default.getReferenceOrThrow().dateProvider.setClientClockSkewInMillis(I), (0, s.logDebugMessage)("updateClockSkewUsingFrontToken: Client clock synchronized successfully");
  };
  e.updateClockSkewUsingFrontToken = ps;
})(ze);
var Je = {};
Object.defineProperty(Je, "__esModule", { value: !0 });
Je.SessionClaimValidatorStore = void 0;
var Jr = (
  /** @class */
  function() {
    function e() {
    }
    return e.claimValidatorsAddedByOtherRecipes = [], e.addClaimValidatorFromOtherRecipe = function(r) {
      e.claimValidatorsAddedByOtherRecipes.push(r);
    }, e.getClaimValidatorsAddedByOtherRecipes = function() {
      return e.claimValidatorsAddedByOtherRecipes;
    }, e;
  }()
);
Je.SessionClaimValidatorStore = Jr;
Je.default = Jr;
Object.defineProperty(zt, "__esModule", { value: !0 });
zt.getGlobalClaimValidators = void 0;
var hi = te, gi = ze, vi = Je;
function pi(e, r) {
  var t = (0, hi.getNormalisedUserContext)(r), i = vi.default.getClaimValidatorsAddedByOtherRecipes(), o = gi.default.recipeImpl.getGlobalClaimValidators({
    claimValidatorsAddedByOtherRecipes: i,
    userContext: t
  }), n = e !== void 0 ? e(o, t) : o;
  return n;
}
zt.getGlobalClaimValidators = pi;
(function(e) {
  function r(t) {
    for (var i in t)
      e.hasOwnProperty(i) || (e[i] = t[i]);
  }
  e.__esModule = !0, r(zt);
})(jr);
Object.defineProperty(W, "__esModule", { value: !0 });
W.normaliseUser = W.normaliseUserResponse = W.getGlobalClaimValidators = W.getHashFromLocation = W.getNormalisedUserContext = W.checkForSSRErrorAndAppendIfNeeded = W.getAllQueryParams = W.getQueryParams = W.isTest = W.normaliseInputAppInfoOrThrowError = W.appendQueryParamsToURL = void 0;
var Nn = Mn, Kr = We, mi = xn, Lt = Xt, wi = jr;
function yi(e, r) {
  if (r === void 0)
    return e;
  try {
    var t = new URL(e);
    return Object.entries(r).forEach(function(n) {
      var a = n[0], u = n[1];
      t.searchParams.set(a, u);
    }), t.href;
  } catch {
    var i = e.startsWith("/") ? "http:localhost" : "http://localhost/", o = new URL("".concat(i).concat(e));
    return Object.entries(r).forEach(function(a) {
      var u = a[0], c = a[1];
      o.searchParams.set(u, c);
    }), "".concat(o.pathname).concat(o.search);
  }
}
W.appendQueryParamsToURL = yi;
function bi(e, r) {
  return r !== void 0 ? new Lt.default(r) : new Lt.default(e);
}
function ki(e) {
  if (e === void 0)
    throw new Error("Please provide the appInfo object when calling supertokens.init");
  if (e.apiDomain === void 0)
    throw new Error("Please provide your apiDomain inside the appInfo object when calling supertokens.init");
  if (e.appName === void 0)
    throw new Error("Please provide your appName inside the appInfo object when calling supertokens.init");
  var r = new Lt.default("");
  return e.apiGatewayPath !== void 0 && (r = new Lt.default(e.apiGatewayPath)), {
    appName: e.appName,
    apiDomain: new mi.default(e.apiDomain),
    apiBasePath: r.appendPath(
      bi(Kr.DEFAULT_API_BASE_PATH, e.apiBasePath)
    )
  };
}
W.normaliseInputAppInfoOrThrowError = ki;
function Ri() {
  try {
    return process.env.TEST_MODE === "testing";
  } catch {
    return !1;
  }
}
W.isTest = Ri;
function Ii(e) {
  var r = new URLSearchParams(
    Nn.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()
  ), t = r.get(e);
  if (t !== null)
    return t;
}
W.getQueryParams = Ii;
function Si() {
  return new URLSearchParams(
    Nn.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch()
  );
}
W.getAllQueryParams = Si;
function Ti(e) {
  return typeof window > "u" && (e = e + Kr.SSR_ERROR), e;
}
W.checkForSSRErrorAndAppendIfNeeded = Ti;
function _i(e) {
  return e === void 0 ? {} : e;
}
W.getNormalisedUserContext = _i;
function Ei() {
  return Nn.WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHash().substring(1);
}
W.getHashFromLocation = Ei;
function Ci(e) {
  var r = e.overrideGlobalClaimValidators, t = e.userContext;
  return (0, wi.getGlobalClaimValidators)(r, t);
}
W.getGlobalClaimValidators = Ci;
function Ai(e, r) {
  return "createdNewRecipeUser" in r ? r : {
    createdNewRecipeUser: r.createdNewUser,
    user: Qr(e, r.user)
  };
}
W.normaliseUserResponse = Ai;
function Qr(e, r) {
  if ("loginMethods" in r)
    return r;
  var t = r.email !== void 0 ? [r.email] : [], i = r.phoneNumber !== void 0 ? [r.phoneNumber] : [], o = r.thirdParty !== void 0 ? [r.thirdParty] : [];
  return {
    id: r.id,
    emails: t,
    phoneNumbers: i,
    thirdParty: o,
    isPrimaryUser: !1,
    tenantIds: r.tenantIds,
    timeJoined: r.timeJoined,
    loginMethods: [
      {
        recipeId: e,
        recipeUserId: r.id,
        timeJoined: r.timeJoined,
        tenantIds: r.tenantIds,
        email: r.email,
        phoneNumber: r.email
      }
    ]
  };
}
W.normaliseUser = Qr;
var Ke = {}, Yt = {};
Object.defineProperty(Yt, "__esModule", { value: !0 });
var Pi = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(r) {
      this.config = r;
    }
    return e;
  }()
);
Yt.default = Pi;
var qn = {}, Yr = {}, jn = {}, Te = {}, Zt = {}, Oi = p && p.__awaiter || function(e, r, t, i) {
  function o(n) {
    return n instanceof t ? n : new t(function(a) {
      a(n);
    });
  }
  return new (t || (t = Promise))(function(n, a) {
    function u(l) {
      try {
        s(i.next(l));
      } catch (d) {
        a(d);
      }
    }
    function c(l) {
      try {
        s(i.throw(l));
      } catch (d) {
        a(d);
      }
    }
    function s(l) {
      l.done ? n(l.value) : o(l.value).then(u, c);
    }
    s((i = i.apply(e, r || [])).next());
  });
}, Di = p && p.__generator || function(e, r) {
  var t = {
    label: 0,
    sent: function() {
      if (n[0] & 1)
        throw n[1];
      return n[1];
    },
    trys: [],
    ops: []
  }, i, o, n, a;
  return a = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function u(s) {
    return function(l) {
      return c([s, l]);
    };
  }
  function c(s) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, o && (n = s[0] & 2 ? o.return : s[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, s[1])).done)
          return n;
        switch (o = 0, n && (s = [s[0] & 2, n.value]), s[0]) {
          case 0:
          case 1:
            n = s;
            break;
          case 4:
            return t.label++, { value: s[1], done: !1 };
          case 5:
            t.label++, o = s[1], s = [0];
            continue;
          case 7:
            s = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (n = t.trys, !(n = n.length > 0 && n[n.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              t = 0;
              continue;
            }
            if (s[0] === 3 && (!n || s[1] > n[0] && s[1] < n[3])) {
              t.label = s[1];
              break;
            }
            if (s[0] === 6 && t.label < n[1]) {
              t.label = n[1], n = s;
              break;
            }
            if (n && t.label < n[2]) {
              t.label = n[2], t.ops.push(s);
              break;
            }
            n[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        s = r.call(e, t);
      } catch (l) {
        s = [6, l], o = 0;
      } finally {
        i = n = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.createAxiosErrorFromFetchResp = void 0;
function Mi(e, r, t, i, o) {
  return e.config = r, t && (e.code = t), e.request = i, e.response = o, e.isAxiosError = !0, e.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  }, e;
}
function xi(e) {
  return Oi(this, void 0, void 0, function() {
    var r, t, i, o, n;
    return Di(this, function(a) {
      switch (a.label) {
        case 0:
          if (r = {
            url: e.url,
            headers: e.headers
          }, t = "status" in e, !t)
            return [3, 12];
          if (o = e.headers.get("content-type"), n = void 0, o !== null)
            return [3, 5];
          a.label = 1;
        case 1:
          return a.trys.push([1, 3, , 4]), [4, e.text()];
        case 2:
          return n = a.sent(), [3, 4];
        case 3:
          return a.sent(), n = "", [3, 4];
        case 4:
          return [3, 11];
        case 5:
          return o.includes("application/json") ? [4, e.json()] : [3, 7];
        case 6:
          return n = a.sent(), [3, 11];
        case 7:
          return o.includes("text/") ? [4, e.text()] : [3, 9];
        case 8:
          return n = a.sent(), [3, 11];
        case 9:
          return [4, e.blob()];
        case 10:
          n = a.sent(), a.label = 11;
        case 11:
          i = {
            data: n,
            status: e.status,
            statusText: e.statusText,
            headers: e.headers,
            config: r,
            request: void 0
          }, a.label = 12;
        case 12:
          return [
            2,
            Mi(
              t ? new Error("Request failed with status code " + e.status) : e,
              r,
              e.code,
              void 0,
              i
            )
          ];
      }
    });
  });
}
Zt.createAxiosErrorFromFetchResp = xi;
var z = p && p.__assign || function() {
  return z = Object.assign || function(e) {
    for (var r, t = 1, i = arguments.length; t < i; t++) {
      r = arguments[t];
      for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, z.apply(this, arguments);
}, Ne = p && p.__awaiter || function(e, r, t, i) {
  function o(n) {
    return n instanceof t ? n : new t(function(a) {
      a(n);
    });
  }
  return new (t || (t = Promise))(function(n, a) {
    function u(l) {
      try {
        s(i.next(l));
      } catch (d) {
        a(d);
      }
    }
    function c(l) {
      try {
        s(i.throw(l));
      } catch (d) {
        a(d);
      }
    }
    function s(l) {
      l.done ? n(l.value) : o(l.value).then(u, c);
    }
    s((i = i.apply(e, r || [])).next());
  });
}, qe = p && p.__generator || function(e, r) {
  var t = {
    label: 0,
    sent: function() {
      if (n[0] & 1)
        throw n[1];
      return n[1];
    },
    trys: [],
    ops: []
  }, i, o, n, a;
  return a = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function u(s) {
    return function(l) {
      return c([s, l]);
    };
  }
  function c(s) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, o && (n = s[0] & 2 ? o.return : s[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, s[1])).done)
          return n;
        switch (o = 0, n && (s = [s[0] & 2, n.value]), s[0]) {
          case 0:
          case 1:
            n = s;
            break;
          case 4:
            return t.label++, { value: s[1], done: !1 };
          case 5:
            t.label++, o = s[1], s = [0];
            continue;
          case 7:
            s = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (n = t.trys, !(n = n.length > 0 && n[n.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              t = 0;
              continue;
            }
            if (s[0] === 3 && (!n || s[1] > n[0] && s[1] < n[3])) {
              t.label = s[1];
              break;
            }
            if (s[0] === 6 && t.label < n[1]) {
              t.label = n[1], n = s;
              break;
            }
            if (n && t.label < n[2]) {
              t.label = n[2], t.ops.push(s);
              break;
            }
            n[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        s = r.call(e, t);
      } catch (l) {
        s = [6, l], o = 0;
      } finally {
        i = n = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
};
Object.defineProperty(Te, "__esModule", { value: !0 });
Te.responseErrorInterceptor = Te.responseInterceptor = Te.interceptorFunctionRequestFulfilled = void 0;
var Hi = Zt, C = ze, Ut = Jt, $n = ae, D = oe;
function Fi(e) {
  e.__supertokensSessionRefreshAttempts === void 0 && (e.__supertokensSessionRefreshAttempts = 0), e.__supertokensSessionRefreshAttempts++;
}
function Li(e) {
  return e.__supertokensSessionRefreshAttempts === void 0 && (e.__supertokensSessionRefreshAttempts = 0), e.__supertokensSessionRefreshAttempts >= C.default.config.maxRetryAttemptsForSessionRefresh;
}
function Vn(e) {
  var r = e.url === void 0 ? "" : e.url, t = e.baseURL;
  return t !== void 0 && (r.charAt(0) === "/" && t.charAt(t.length - 1) === "/" ? r = t + r.substr(1) : r.charAt(0) !== "/" && t.charAt(t.length - 1) !== "/" ? r = t + "/" + r : r = t + r), r;
}
function Ui(e) {
  return Ne(this, void 0, void 0, function() {
    var r, t, i, o, n, a;
    return qe(this, function(u) {
      switch (u.label) {
        case 0:
          (0, D.logDebugMessage)("interceptorFunctionRequestFulfilled: started axios interception"), r = Vn(e), t = !1;
          try {
            t = typeof r == "string" && !C.default.recipeImpl.shouldDoInterceptionBasedOnUrl(
              r,
              C.default.config.apiDomain,
              C.default.config.sessionTokenBackendDomain
            );
          } catch (c) {
            if (c.message === "Please provide a valid domain name")
              (0, D.logDebugMessage)(
                "interceptorFunctionRequestFulfilled: Trying shouldDoInterceptionBasedOnUrl with location.origin"
              ), t = !C.default.recipeImpl.shouldDoInterceptionBasedOnUrl(
                $n.default.getReferenceOrThrow().windowHandler.location.getOrigin(),
                C.default.config.apiDomain,
                C.default.config.sessionTokenBackendDomain
              );
            else
              throw c;
          }
          return (0, D.logDebugMessage)("interceptorFunctionRequestFulfilled: Value of doNotDoInterception: " + t), t ? ((0, D.logDebugMessage)(
            "interceptorFunctionRequestFulfilled: Returning config unchanged"
          ), [2, e]) : ((0, D.logDebugMessage)("interceptorFunctionRequestFulfilled: Modifying config"), Ut.ProcessState.getInstance().addState(
            Ut.PROCESS_STATE.CALLING_INTERCEPTION_REQUEST
          ), [4, (0, C.getLocalSessionState)(!0)]);
        case 1:
          return i = u.sent(), o = e, i.status !== "EXISTS" ? [3, 3] : [4, C.AntiCsrfToken.getToken(i.lastAccessTokenUpdate)];
        case 2:
          n = u.sent(), n !== void 0 && ((0, D.logDebugMessage)(
            "interceptorFunctionRequestFulfilled: Adding anti-csrf token to request"
          ), o = z(z({}, o), {
            headers: o === void 0 ? {
              "anti-csrf": n
            } : z(z({}, o.headers), { "anti-csrf": n })
          })), u.label = 3;
        case 3:
          return C.default.config.autoAddCredentials && o.withCredentials === void 0 && ((0, D.logDebugMessage)(
            "interceptorFunctionRequestFulfilled: Adding credentials include"
          ), o = z(z({}, o), { withCredentials: !0 })), (0, D.logDebugMessage)("interceptorFunctionRequestFulfilled: Adding rid header: anti-csrf (it may be overriden by the user's provided rid)"), o = z(z({}, o), {
            headers: o === void 0 ? {
              rid: "anti-csrf"
            } : z({ rid: "anti-csrf" }, o.headers)
          }), a = C.default.config.tokenTransferMethod, (0, D.logDebugMessage)("interceptorFunctionRequestFulfilled: Adding st-auth-mode header: " + a), o.headers["st-auth-mode"] = a, [4, es(o)];
        case 4:
          return o = u.sent(), [4, Zr(o)];
        case 5:
          return u.sent(), (0, D.logDebugMessage)("interceptorFunctionRequestFulfilled: returning modified config"), [2, o];
      }
    });
  });
}
Te.interceptorFunctionRequestFulfilled = Ui;
function Ni(e) {
  var r = this;
  return function(t) {
    return Ne(r, void 0, void 0, function() {
      var i, o, n, a, u;
      return qe(this, function(c) {
        switch (c.label) {
          case 0:
            i = !1, c.label = 1;
          case 1:
            if (c.trys.push([1, , 8, 14]), !C.default.initCalled)
              throw new Error("init function not called");
            (0, D.logDebugMessage)("responseInterceptor: started"), (0, D.logDebugMessage)("responseInterceptor: already intercepted: " + t.headers["x-supertokens-xhr-intercepted"]), o = Vn(t.config);
            try {
              i = typeof o == "string" && !C.default.recipeImpl.shouldDoInterceptionBasedOnUrl(
                o,
                C.default.config.apiDomain,
                C.default.config.sessionTokenBackendDomain
              ) || !!t.headers["x-supertokens-xhr-intercepted"];
            } catch (s) {
              if (s.message === "Please provide a valid domain name")
                (0, D.logDebugMessage)(
                  "responseInterceptor: Trying shouldDoInterceptionBasedOnUrl with location.origin"
                ), i = !C.default.recipeImpl.shouldDoInterceptionBasedOnUrl(
                  $n.default.getReferenceOrThrow().windowHandler.location.getOrigin(),
                  C.default.config.apiDomain,
                  C.default.config.sessionTokenBackendDomain
                ) || !!t.headers["x-supertokens-xhr-intercepted"];
              else
                throw s;
            }
            return (0, D.logDebugMessage)("responseInterceptor: Value of doNotDoInterception: " + i), i ? ((0, D.logDebugMessage)("responseInterceptor: Returning without interception"), [2, t]) : ((0, D.logDebugMessage)("responseInterceptor: Interception started"), Ut.ProcessState.getInstance().addState(
              Ut.PROCESS_STATE.CALLING_INTERCEPTION_RESPONSE
            ), [4, (0, C.getLocalSessionState)(!1)]);
          case 2:
            return n = c.sent(), [4, An(t)];
          case 3:
            return c.sent(), (0, C.fireSessionUpdateEventsIfNecessary)(n.status === "EXISTS", t.status, t.headers["front-token"]), t.status !== C.default.config.sessionExpiredStatusCode ? [3, 4] : ((0, D.logDebugMessage)("responseInterceptor: Status code is: " + t.status), a = t.config, [
              2,
              Bn.doRequest(
                function(s) {
                  return e(s);
                },
                a,
                o,
                t,
                void 0,
                !0
              )
            ]);
          case 4:
            return t.status !== C.default.config.invalidClaimStatusCode ? [3, 6] : [4, (0, C.onInvalidClaimResponse)(t)];
          case 5:
            c.sent(), c.label = 6;
          case 6:
            return [2, t];
          case 7:
            return [3, 14];
          case 8:
            return u = !i, u ? [4, (0, C.getLocalSessionState)(!0)] : [3, 10];
          case 9:
            u = c.sent().status !== "EXISTS", c.label = 10;
          case 10:
            return u ? ((0, D.logDebugMessage)("responseInterceptor: local session doesn't exist, so removing anti-csrf and sFrontToken"), [4, C.AntiCsrfToken.removeToken()]) : [3, 13];
          case 11:
            return c.sent(), [4, C.FrontToken.removeToken()];
          case 12:
            c.sent(), c.label = 13;
          case 13:
            return [
              7
              /*endfinally*/
            ];
          case 14:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  };
}
Te.responseInterceptor = Ni;
function qi(e) {
  var r = this;
  return function(t) {
    return Ne(r, void 0, void 0, function() {
      var i;
      return qe(this, function(o) {
        switch (o.label) {
          case 0:
            if ((0, D.logDebugMessage)("responseErrorInterceptor: called"), (0, D.logDebugMessage)("responseErrorInterceptor: already intercepted: " + (t.response && t.response.headers["x-supertokens-xhr-intercepted"])), t.response === void 0 || t.response.headers["x-supertokens-xhr-intercepted"])
              throw t;
            return t.response !== void 0 && t.response.status === C.default.config.sessionExpiredStatusCode ? ((0, D.logDebugMessage)("responseErrorInterceptor: Status code is: " + t.response.status), i = t.config, [
              2,
              Bn.doRequest(
                function(n) {
                  return e(n);
                },
                i,
                Vn(i),
                void 0,
                t,
                !0
              )
            ]) : [3, 1];
          case 1:
            return t.response !== void 0 && t.response.status === C.default.config.invalidClaimStatusCode ? [4, (0, C.onInvalidClaimResponse)(t.response)] : [3, 3];
          case 2:
            o.sent(), o.label = 3;
          case 3:
            throw t;
        }
      });
    });
  };
}
Te.responseErrorInterceptor = qi;
var Bn = (
  /** @class */
  function() {
    function e() {
    }
    var r;
    return r = e, e.doRequest = function(t, i, o, n, a, u) {
      return u === void 0 && (u = !1), Ne(void 0, void 0, void 0, function() {
        var c, s, l, d, b, f, k, H, O, U, M, O, m, S, N, v;
        return qe(r, function(g) {
          switch (g.label) {
            case 0:
              if (!C.default.initCalled)
                throw Error("init function not called");
              (0, D.logDebugMessage)("doRequest: called"), c = !1;
              try {
                c = typeof o == "string" && !C.default.recipeImpl.shouldDoInterceptionBasedOnUrl(
                  o,
                  C.default.config.apiDomain,
                  C.default.config.sessionTokenBackendDomain
                ) && u;
              } catch (P) {
                if (P.message === "Please provide a valid domain name")
                  (0, D.logDebugMessage)(
                    "doRequest: Trying shouldDoInterceptionBasedOnUrl with location.origin"
                  ), c = !C.default.recipeImpl.shouldDoInterceptionBasedOnUrl(
                    $n.default.getReferenceOrThrow().windowHandler.location.getOrigin(),
                    C.default.config.apiDomain,
                    C.default.config.sessionTokenBackendDomain
                  ) && u;
                else
                  throw P;
              }
              if ((0, D.logDebugMessage)("doRequest: Value of doNotDoInterception: " + c), !c)
                return [3, 2];
              if ((0, D.logDebugMessage)("doRequest: Returning without interception"), a !== void 0)
                throw a;
              return n !== void 0 ? [2, n] : [4, t(i)];
            case 1:
              return [2, g.sent()];
            case 2:
              return (0, D.logDebugMessage)("doRequest: Interception started"), [4, es(i)];
            case 3:
              i = g.sent(), g.label = 4;
            case 4:
              g.trys.push([4, , 30, 35]), s = void 0, g.label = 5;
            case 5:
              return [4, (0, C.getLocalSessionState)(!0)];
            case 6:
              return l = g.sent(), d = i, l.status !== "EXISTS" ? [3, 8] : [4, C.AntiCsrfToken.getToken(l.lastAccessTokenUpdate)];
            case 7:
              b = g.sent(), b !== void 0 && ((0, D.logDebugMessage)("doRequest: Adding anti-csrf token to request"), d = z(z({}, d), {
                headers: d === void 0 ? {
                  "anti-csrf": b
                } : z(z({}, d.headers), {
                  "anti-csrf": b
                })
              })), g.label = 8;
            case 8:
              return C.default.config.autoAddCredentials && d.withCredentials === void 0 && ((0, D.logDebugMessage)("doRequest: Adding credentials include"), d = z(z({}, d), { withCredentials: !0 })), (0, D.logDebugMessage)("doRequest: Adding rid header: anti-csrf (May get overriden by user's rid)"), d = z(z({}, d), {
                headers: d === void 0 ? {
                  rid: "anti-csrf"
                } : z({ rid: "anti-csrf" }, d.headers)
              }), f = C.default.config.tokenTransferMethod, (0, D.logDebugMessage)("doRequest: Adding st-auth-mode header: " + f), d.headers["st-auth-mode"] = f, [4, Zr(d)];
            case 9:
              g.sent(), g.label = 10;
            case 10:
              if (g.trys.push([10, 15, , 28]), k = a, H = n, a = void 0, n = void 0, k !== void 0)
                throw (0, D.logDebugMessage)(
                  "doRequest: Not making call because localPrevError is not undefined"
                ), k;
              return H !== void 0 ? (0, D.logDebugMessage)(
                "doRequest: Not making call because localPrevResponse is not undefined"
              ) : (0, D.logDebugMessage)("doRequest: Making user's http call"), H !== void 0 ? [3, 12] : [4, t(d)];
            case 11:
              return U = g.sent(), [3, 13];
            case 12:
              U = H, g.label = 13;
            case 13:
              return O = U, (0, D.logDebugMessage)("doRequest: User's http call ended"), [4, An(O)];
            case 14:
              return g.sent(), (0, C.fireSessionUpdateEventsIfNecessary)(l.status === "EXISTS", O.status, O.headers["front-token"]), [2, O];
            case 15:
              return M = g.sent(), O = M.response, O === void 0 ? [3, 26] : [4, An(O)];
            case 16:
              if (g.sent(), (0, C.fireSessionUpdateEventsIfNecessary)(l.status === "EXISTS", O.status, O.headers["front-token"]), O.status !== C.default.config.sessionExpiredStatusCode)
                return [3, 22];
              if ((0, D.logDebugMessage)("doRequest: Status code is: " + O.status), Li(i))
                throw (0, D.logDebugMessage)(
                  "doRequest: Maximum session refresh attempts reached. sessionRefreshAttempts: ".concat(
                    i.__supertokensSessionRefreshAttempts,
                    ", maxRetryAttemptsForSessionRefresh: "
                  ).concat(C.default.config.maxRetryAttemptsForSessionRefresh)
                ), m = "Received a 401 response from ".concat(
                  o,
                  ". Attempted to refresh the session and retry the request with the updated session tokens "
                ).concat(
                  C.default.config.maxRetryAttemptsForSessionRefresh,
                  " times, but each attempt resulted in a 401 error. The maximum session refresh limit has been reached. Please investigate your API. To increase the session refresh attempts, update maxRetryAttemptsForSessionRefresh in the config."
                ), console.error(m), new Error(m);
              return [4, (0, C.onUnauthorisedResponse)(l)];
            case 17:
              return S = g.sent(), Fi(i), (0, D.logDebugMessage)("doRequest: sessionRefreshAttempts: " + i.__supertokensSessionRefreshAttempts), console.log("!!!!", JSON.stringify(S)), S.result === "RETRY" ? [3, 21] : ((0, D.logDebugMessage)("doRequest: Not retrying original request"), S.error === void 0 ? [3, 19] : [4, (0, Hi.createAxiosErrorFromFetchResp)(S.error)]);
            case 18:
              return N = g.sent(), [3, 20];
            case 19:
              N = M, g.label = 20;
            case 20:
              return s = N, [3, 29];
            case 21:
              return (0, D.logDebugMessage)("doRequest: Retrying original request"), [3, 25];
            case 22:
              return O.status !== C.default.config.invalidClaimStatusCode ? [3, 24] : [4, (0, C.onInvalidClaimResponse)(O)];
            case 23:
              g.sent(), g.label = 24;
            case 24:
              throw M;
            case 25:
              return [3, 27];
            case 26:
              throw M;
            case 27:
              return [3, 28];
            case 28:
              return [3, 5];
            case 29:
              throw s;
            case 30:
              return [4, (0, C.getLocalSessionState)(!1)];
            case 31:
              return v = g.sent(), v.status !== "NOT_EXISTS" ? [3, 34] : ((0, D.logDebugMessage)("doRequest: local session doesn't exist, so removing anti-csrf and sFrontToken"), [4, C.AntiCsrfToken.removeToken()]);
            case 32:
              return g.sent(), [4, C.FrontToken.removeToken()];
            case 33:
              g.sent(), g.label = 34;
            case 34:
              return [
                7
                /*endfinally*/
              ];
            case 35:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, e;
  }()
);
Te.default = Bn;
function Zr(e) {
  return Ne(this, void 0, void 0, function() {
    var r, t;
    return qe(this, function(i) {
      switch (i.label) {
        case 0:
          return e.headers === void 0 && (e.headers = {}), (0, D.logDebugMessage)("setAuthorizationHeaderIfRequired: adding existing tokens as header"), [4, (0, C.getTokenForHeaderAuth)("access")];
        case 1:
          return r = i.sent(), [4, (0, C.getTokenForHeaderAuth)("refresh")];
        case 2:
          return t = i.sent(), r !== void 0 && t !== void 0 ? e.headers.Authorization !== void 0 || e.headers.authorization !== void 0 ? (0, D.logDebugMessage)(
            "setAuthorizationHeaderIfRequired: Authorization header defined by the user, not adding"
          ) : ((0, D.logDebugMessage)(
            "setAuthorizationHeaderIfRequired: added authorization header"
          ), e.headers = z(z({}, e.headers), {
            Authorization: "Bearer ".concat(r)
          }), e.__supertokensAddedAuthHeader = !0) : (0, D.logDebugMessage)(
            "setAuthorizationHeaderIfRequired: token for header based auth not found"
          ), [
            2
            /*return*/
          ];
      }
    });
  });
}
function An(e) {
  return Ne(this, void 0, void 0, function() {
    var r, t, i, o, n, a;
    return qe(this, function(u) {
      switch (u.label) {
        case 0:
          return (0, D.logDebugMessage)("saveTokensFromHeaders: Saving updated tokens from the response"), r = e.headers["st-refresh-token"], r === void 0 ? [3, 2] : ((0, D.logDebugMessage)("saveTokensFromHeaders: saving new refresh token"), [4, (0, C.setToken)("refresh", r)]);
        case 1:
          u.sent(), u.label = 2;
        case 2:
          return t = e.headers["st-access-token"], t === void 0 ? [3, 4] : ((0, D.logDebugMessage)("saveTokensFromHeaders: saving new access token"), [4, (0, C.setToken)("access", t)]);
        case 3:
          u.sent(), u.label = 4;
        case 4:
          return i = e.headers["front-token"], i === void 0 ? [3, 6] : ((0, D.logDebugMessage)("doRequest: Setting sFrontToken: " + i), [4, C.FrontToken.setItem(i)]);
        case 5:
          u.sent(), o = new Headers(), Object.entries(e.headers).forEach(function(c) {
            var s = c[0], l = c[1];
            Array.isArray(l) ? l.forEach(function(d) {
              return o.append(s, d);
            }) : o.append(s, l);
          }), (0, C.updateClockSkewUsingFrontToken)({ frontToken: i, responseHeaders: o }), u.label = 6;
        case 6:
          return n = e.headers["anti-csrf"], n === void 0 ? [3, 9] : [4, (0, C.getLocalSessionState)(!0)];
        case 7:
          return a = u.sent(), a.status !== "EXISTS" ? [3, 9] : ((0, D.logDebugMessage)("doRequest: Setting anti-csrf token"), [4, C.AntiCsrfToken.setItem(a.lastAccessTokenUpdate, n)]);
        case 8:
          u.sent(), u.label = 9;
        case 9:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function es(e) {
  return Ne(this, void 0, void 0, function() {
    var r, t, i, o;
    return qe(this, function(n) {
      switch (n.label) {
        case 0:
          return [4, (0, C.getTokenForHeaderAuth)("access")];
        case 1:
          return r = n.sent(), [4, (0, C.getTokenForHeaderAuth)("refresh")];
        case 2:
          return t = n.sent(), i = e.headers.Authorization || e.headers.authorization, r !== void 0 && t !== void 0 && (i === "Bearer ".concat(r) || "__supertokensAddedAuthHeader" in e) ? ((0, D.logDebugMessage)(
            "removeAuthHeaderIfMatchesLocalToken: Removing Authorization from user provided headers because it contains our access token"
          ), o = z(z({}, e), { headers: z({}, e.headers) }), delete o.headers.authorization, delete o.headers.Authorization, [2, o]) : [2, e];
      }
    });
  });
}
var gt = {}, ji = p && p.__extends || /* @__PURE__ */ function() {
  var e = function(r, t) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, o) {
      i.__proto__ = o;
    } || function(i, o) {
      for (var n in o)
        Object.prototype.hasOwnProperty.call(o, n) && (i[n] = o[n]);
    }, e(r, t);
  };
  return function(r, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    e(r, t);
    function i() {
      this.constructor = r;
    }
    r.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i());
  };
}();
Object.defineProperty(gt, "__esModule", { value: !0 });
gt.STGeneralError = void 0;
var $i = (
  /** @class */
  function(e) {
    ji(r, e);
    function r(t) {
      var i = e.call(this, t) || this;
      return i.isSuperTokensGeneralError = !0, i;
    }
    return r.isThisError = function(t) {
      return t.isSuperTokensGeneralError === !0;
    }, r;
  }(Error)
);
gt.STGeneralError = $i;
var en = {}, He = p && p.__awaiter || function(e, r, t, i) {
  function o(n) {
    return n instanceof t ? n : new t(function(a) {
      a(n);
    });
  }
  return new (t || (t = Promise))(function(n, a) {
    function u(l) {
      try {
        s(i.next(l));
      } catch (d) {
        a(d);
      }
    }
    function c(l) {
      try {
        s(i.throw(l));
      } catch (d) {
        a(d);
      }
    }
    function s(l) {
      l.done ? n(l.value) : o(l.value).then(u, c);
    }
    s((i = i.apply(e, r || [])).next());
  });
}, Fe = p && p.__generator || function(e, r) {
  var t = {
    label: 0,
    sent: function() {
      if (n[0] & 1)
        throw n[1];
      return n[1];
    },
    trys: [],
    ops: []
  }, i, o, n, a;
  return a = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function u(s) {
    return function(l) {
      return c([s, l]);
    };
  }
  function c(s) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, o && (n = s[0] & 2 ? o.return : s[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, s[1])).done)
          return n;
        switch (o = 0, n && (s = [s[0] & 2, n.value]), s[0]) {
          case 0:
          case 1:
            n = s;
            break;
          case 4:
            return t.label++, { value: s[1], done: !1 };
          case 5:
            t.label++, o = s[1], s = [0];
            continue;
          case 7:
            s = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (n = t.trys, !(n = n.length > 0 && n[n.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              t = 0;
              continue;
            }
            if (s[0] === 3 && (!n || s[1] > n[0] && s[1] < n[3])) {
              t.label = s[1];
              break;
            }
            if (s[0] === 6 && t.label < n[1]) {
              t.label = n[1], n = s;
              break;
            }
            if (n && t.label < n[2]) {
              t.label = n[2], t.ops.push(s);
              break;
            }
            n[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        s = r.call(e, t);
      } catch (l) {
        s = [6, l], o = 0;
      } finally {
        i = n = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
};
Object.defineProperty(en, "__esModule", { value: !0 });
en.addInterceptorsToXMLHttpRequest = void 0;
var $ = ze, L = oe, Vi = ae, It = Jt, Bi = ["readystatechange", "abort", "error", "load", "loadend", "loadstart", "progress", "timeout"];
function Gi() {
  var e = new Promise(function(t) {
    return setTimeout(t, 0);
  }), r = XMLHttpRequest;
  (0, L.logDebugMessage)("addInterceptorsToXMLHttpRequest called"), XMLHttpRequest = function() {
    var t = new r(), i = e;
    function o(v) {
      i = i.finally(function() {
        var g;
        return (g = v()) === null || g === void 0 ? void 0 : g.catch(console.error);
      });
    }
    var n = this, a = [], u = [], c = {}, s, l = /* @__PURE__ */ new Map(), d = "", b = !1, f = void 0, k, H = 0;
    n.onload = null, n.onreadystatechange = null, n.onloadend = null, n.addEventListener = function(v, g, P) {
      var A = l.get(v);
      A === void 0 && (A = /* @__PURE__ */ new Set(), l.set(v, A)), A.add(g);
    }, n.removeEventListener = function(v, g) {
      var P = l.get(v);
      P === void 0 && (P = /* @__PURE__ */ new Set(), l.set(v, P)), P.delete(g);
    };
    function U(v, g) {
      var P = l.get(v);
      (0, L.logDebugMessage)(
        "XHRInterceptor dispatching ".concat(g.type, " to ").concat(P ? P.size : 0, " listeners")
      ), P && Array.from(P).forEach(function(A) {
        return A.apply(n, [g]);
      });
    }
    function M() {
      return He(this, void 0, void 0, function() {
        var v, g, P;
        return Fe(this, function(A) {
          switch (A.label) {
            case 0:
              if (f === void 0)
                throw new Error("Should never come here..");
              if ((0, L.logDebugMessage)("XHRInterceptor.handleRetryPostRefreshing: preRequestLSS " + f.status), H >= $.default.config.maxRetryAttemptsForSessionRefresh)
                throw (0, L.logDebugMessage)(
                  "XHRInterceptor.handleRetryPostRefreshing: Maximum session refresh attempts reached. sessionRefreshAttempts: ".concat(H, ", maxRetryAttemptsForSessionRefresh: ").concat($.default.config.maxRetryAttemptsForSessionRefresh)
                ), c.status = 0, c.statusText = "", c.responseType = "", v = "Received a 401 response from ".concat(
                  d,
                  ". Attempted to refresh the session and retry the request with the updated session tokens "
                ).concat(
                  $.default.config.maxRetryAttemptsForSessionRefresh,
                  " times, but each attempt resulted in a 401 error. The maximum session refresh limit has been reached. Please investigate your API. To increase the session refresh attempts, update maxRetryAttemptsForSessionRefresh in the config."
                ), console.error(v), new Error(v);
              return [4, (0, $.onUnauthorisedResponse)(f)];
            case 1:
              if (g = A.sent(), H++, (0, L.logDebugMessage)("XHRInterceptor.handleRetryPostRefreshing: sessionRefreshAttempts: " + H), g.result !== "RETRY") {
                if ((0, L.logDebugMessage)(
                  "XHRInterceptor.handleRetryPostRefreshing: Not retrying original request " + !!g.error
                ), g.error !== void 0)
                  throw g.error;
                return [2, !0];
              }
              return (0, L.logDebugMessage)("XHRInterceptor.handleRetryPostRefreshing: Retrying original request"), P = new r(), S(n, P, !0), a.forEach(function(_) {
                _(P);
              }), N(P, k), [2, !1];
          }
        });
      });
    }
    function O(v) {
      return He(this, void 0, void 0, function() {
        var g, P, A, _, T;
        return Fe(this, function(x) {
          switch (x.label) {
            case 0:
              if (b)
                return (0, L.logDebugMessage)(
                  "XHRInterceptor.handleResponse: Returning without interception"
                ), [2, !0];
              x.label = 1;
            case 1:
              x.trys.push([1, 14, , 18]), x.label = 2;
            case 2:
              return x.trys.push([2, , 8, 13]), (0, L.logDebugMessage)("XHRInterceptor.handleResponse: Interception started"), It.ProcessState.getInstance().addState(
                It.PROCESS_STATE.CALLING_INTERCEPTION_RESPONSE
              ), g = v.status, P = Ji(v), [4, zi(P)];
            case 3:
              return x.sent(), (0, $.fireSessionUpdateEventsIfNecessary)(f.status === "EXISTS", g, P.get("front-token")), g !== $.default.config.sessionExpiredStatusCode ? [3, 5] : ((0, L.logDebugMessage)("responseInterceptor: Status code is: " + g), [4, M()]);
            case 4:
              return [2, x.sent()];
            case 5:
              return g !== $.default.config.invalidClaimStatusCode ? [3, 7] : [4, (0, $.onInvalidClaimResponse)({ data: v.responseText })];
            case 6:
              x.sent(), x.label = 7;
            case 7:
              return [2, !0];
            case 8:
              return (0, L.logDebugMessage)("XHRInterceptor.handleResponse: doFinallyCheck running"), [4, (0, $.getLocalSessionState)(!1)];
            case 9:
              return x.sent().status === "EXISTS" ? [3, 12] : ((0, L.logDebugMessage)("XHRInterceptor.handleResponse: local session doesn't exist, so removing anti-csrf and sFrontToken"), [4, $.AntiCsrfToken.removeToken()]);
            case 10:
              return x.sent(), [4, $.FrontToken.removeToken()];
            case 11:
              x.sent(), x.label = 12;
            case 12:
              return [
                7
                /*endfinally*/
              ];
            case 13:
              return [3, 18];
            case 14:
              return A = x.sent(), (0, L.logDebugMessage)("XHRInterceptor.handleResponse: caught error"), A.status === void 0 ? [3, 16] : [4, Wi(A)];
            case 15:
              if (_ = x.sent(), c.status = _.status, c.statusText = _.statusText, c.responseType = _.responseType, s = _.headers, _.responseType === "json")
                try {
                  c.response = JSON.parse(_.responseText);
                } catch {
                  c.response = _.responseText;
                }
              else
                c.response = _.responseText;
              return c.responseText = _.responseText, [3, 17];
            case 16:
              T = new ProgressEvent("error"), T.error = A, n.onerror !== void 0 && n.onerror !== null && n.onerror(T), U("error", T), x.label = 17;
            case 17:
              return [2, !0];
            case 18:
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }
    n.open = function(v, g) {
      (0, L.logDebugMessage)("XHRInterceptor.open called");
      var P = arguments;
      d = g;
      try {
        b = typeof d == "string" && !$.default.recipeImpl.shouldDoInterceptionBasedOnUrl(
          d,
          $.default.config.apiDomain,
          $.default.config.sessionTokenBackendDomain
        ) || typeof d != "string" && !$.default.recipeImpl.shouldDoInterceptionBasedOnUrl(
          d.toString(),
          $.default.config.apiDomain,
          $.default.config.sessionTokenBackendDomain
        );
      } catch (A) {
        if (A.message === "Please provide a valid domain name")
          (0, L.logDebugMessage)(
            "XHRInterceptor.open: Trying shouldDoInterceptionBasedOnUrl with location.origin"
          ), b = !$.default.recipeImpl.shouldDoInterceptionBasedOnUrl(
            Vi.default.getReferenceOrThrow().windowHandler.location.getOrigin(),
            $.default.config.apiDomain,
            $.default.config.sessionTokenBackendDomain
          );
        else
          throw A;
      }
      o(function() {
        a.push(function(A) {
          A.open.apply(A, P);
        }), t.open.apply(t, P);
      });
    }, n.send = function(v) {
      k = v, N(t, k);
    }, n.setRequestHeader = function(v, g) {
      var P = this;
      if ((0, L.logDebugMessage)("XHRInterceptor.setRequestHeader: Called with ".concat(v)), b) {
        o(function() {
          return t.setRequestHeader(v, g);
        });
        return;
      }
      v !== "anti-csrf" && o(function() {
        return He(P, void 0, void 0, function() {
          var A, _;
          return Fe(this, function(T) {
            switch (T.label) {
              case 0:
                return v.toLowerCase() !== "authorization" ? [3, 3] : ((0, L.logDebugMessage)("XHRInterceptor.setRequestHeader: checking if user provided auth header matches local token"), [4, (0, $.getTokenForHeaderAuth)("access")]);
              case 1:
                return A = T.sent(), [4, (0, $.getTokenForHeaderAuth)("refresh")];
              case 2:
                if (_ = T.sent(), A !== void 0 && _ !== void 0 && g === "Bearer ".concat(A))
                  return (0, L.logDebugMessage)(
                    "XHRInterceptor.setRequestHeader: skipping Authorization from user provided headers because it contains our access token"
                  ), [
                    2
                    /*return*/
                  ];
                T.label = 3;
              case 3:
                return a.push(function(x) {
                  x.setRequestHeader(v, g);
                }), u.push({ name: v, value: g }), t.setRequestHeader(v, g), [
                  2
                  /*return*/
                ];
            }
          });
        });
      });
    };
    var m = void 0;
    S(n, t, !1);
    function S(v, g, P) {
      var A, _ = ["load", "loadend", "readystatechange"];
      (0, L.logDebugMessage)("XHRInterceptor.setUpXHR called");
      for (var T = function(F) {
        (0, L.logDebugMessage)("XHRInterceptor added listener for event ".concat(F)), g.addEventListener(F, function(Z) {
          (0, L.logDebugMessage)("XHRInterceptor got event ".concat(F)), _.includes(F) || U(F, Z);
        });
      }, x = 0, he = Bi; x < he.length; x++) {
        var Ye = he[x];
        T(Ye);
      }
      if (g.onload = function(F) {
        A === void 0 && (A = O(g)), A.then(function(Z) {
          Z && (v.onload && v.onload(F), U("load", F));
        });
      }, g.onreadystatechange = function(F) {
        g.readyState === r.DONE ? (A === void 0 && (A = O(g)), A.then(function(Z) {
          Z && (v.onreadystatechange && v.onreadystatechange(F), U("readystatechange", F));
        })) : (v.onreadystatechange && v.onreadystatechange(F), U("readystatechange", F));
      }, g.onloadend = function(F) {
        A === void 0 && (A = O(g)), A.then(function(Z) {
          Z && (v.onloadend && v.onloadend(F), U("loadend", F));
        });
      }, v.getAllResponseHeaders = function() {
        var F;
        return s ? (F = "", s.forEach(function(Z, ge) {
          return F += "".concat(ge, ": ").concat(Z, `\r
`);
        })) : F = g.getAllResponseHeaders(), F + `x-supertokens-xhr-intercepted: true\r
`;
      }, v.getResponseHeader = function(F) {
        return F === "x-supertokens-xhr-intercepted" ? "true" : s ? s.get(F) : g.getResponseHeader(F);
      }, m === void 0) {
        m = [];
        for (var Oe in g)
          Oe in v || m.push(Oe);
      }
      for (var cn = function(F) {
        typeof g[F] == "function" ? Object.defineProperty(v, F, {
          configurable: !0,
          value: function() {
            var Z = arguments;
            return P || a.push(function(ge) {
              ge[F].apply(ge, Z);
            }), g[F].apply(g, Z);
          }
        }) : Object.defineProperty(v, F, {
          configurable: !0,
          get: function() {
            return c[F] !== void 0 ? c[F] : g[F];
          },
          set: function(Z) {
            P || a.push(function(ge) {
              ge[F] = Z;
            }), (0, L.logDebugMessage)("XHRInterceptor.set[".concat(F, "] = ").concat(Z)), g[F] = Z;
          }
        });
      }, De = 0, $e = m; De < $e.length; De++) {
        var Oe = $e[De];
        cn(Oe);
      }
    }
    function N(v, g) {
      var P = this;
      if ((0, L.logDebugMessage)("XHRInterceptor.send: called"), (0, L.logDebugMessage)("XHRInterceptor.send: Value of doNotDoInterception: " + b), b) {
        (0, L.logDebugMessage)("XHRInterceptor.send: Returning without interception"), o(function() {
          return v.send(g);
        });
        return;
      }
      (0, L.logDebugMessage)("XHRInterceptor.send: Interception started"), It.ProcessState.getInstance().addState(
        It.PROCESS_STATE.CALLING_INTERCEPTION_REQUEST
      ), o(function() {
        return He(P, void 0, void 0, function() {
          var A, _;
          return Fe(this, function(T) {
            switch (T.label) {
              case 0:
                return [4, (0, $.getLocalSessionState)(!0)];
              case 1:
                return f = T.sent(), f.status !== "EXISTS" ? [3, 3] : [
                  4,
                  $.AntiCsrfToken.getToken(f.lastAccessTokenUpdate)
                ];
              case 2:
                A = T.sent(), A !== void 0 && ((0, L.logDebugMessage)(
                  "XHRInterceptor.send: Adding anti-csrf token to request"
                ), v.setRequestHeader("anti-csrf", A)), T.label = 3;
              case 3:
                return $.default.config.autoAddCredentials && ((0, L.logDebugMessage)("XHRInterceptor.send: Adding credentials include"), n.withCredentials = !0), u.some(function(x) {
                  return x.name === "rid";
                }) ? (0, L.logDebugMessage)(
                  "XHRInterceptor.send: rid header was already there in request"
                ) : ((0, L.logDebugMessage)("XHRInterceptor.send: Adding rid header: anti-csrf"), v.setRequestHeader("rid", "anti-csrf")), _ = $.default.config.tokenTransferMethod, u.some(function(x) {
                  return x.name === "st-auth-mode";
                }) ? (0, L.logDebugMessage)(
                  "XHRInterceptor.send: st-auth-mode header was already there in request"
                ) : ((0, L.logDebugMessage)(
                  "XHRInterceptor.send: Adding st-auth-mode header: " + _
                ), v.setRequestHeader("st-auth-mode", _)), [4, Xi(v, u)];
              case 4:
                return T.sent(), (0, L.logDebugMessage)("XHRInterceptor.send: Making user's http call"), [2, v.send(g)];
            }
          });
        });
      });
    }
  }, XMLHttpRequest.__interceptedBySuperTokens = !0, XMLHttpRequest.__original = r;
}
en.addInterceptorsToXMLHttpRequest = Gi;
function Wi(e) {
  return He(this, void 0, void 0, function() {
    var r, t, i, o, n;
    return Fe(this, function(a) {
      switch (a.label) {
        case 0:
          if (r = e.headers.get("content-type"), t = "", i = "text", r !== null)
            return [3, 5];
          a.label = 1;
        case 1:
          return a.trys.push([1, 3, , 4]), [4, e.text()];
        case 2:
          return t = a.sent(), [3, 4];
        case 3:
          return a.sent(), t = "", [3, 4];
        case 4:
          return [3, 9];
        case 5:
          return r.includes("application/json") ? (i = "json", n = (o = JSON).stringify, [4, e.json()]) : [3, 7];
        case 6:
          return t = n.apply(o, [a.sent()]), [3, 9];
        case 7:
          return r.includes("text/") ? [4, e.text()] : [3, 9];
        case 8:
          t = a.sent(), a.label = 9;
        case 9:
          return [
            2,
            {
              status: e.status,
              responseText: t,
              statusText: e.statusText,
              responseType: i,
              headers: e.headers
            }
          ];
      }
    });
  });
}
function Xi(e, r) {
  return He(this, void 0, void 0, function() {
    var t, i;
    return Fe(this, function(o) {
      switch (o.label) {
        case 0:
          return (0, L.logDebugMessage)("setAuthorizationHeaderIfRequired: adding existing tokens as header"), [4, (0, $.getTokenForHeaderAuth)("access")];
        case 1:
          return t = o.sent(), [4, (0, $.getTokenForHeaderAuth)("refresh")];
        case 2:
          return i = o.sent(), t !== void 0 && i !== void 0 ? r.some(function(n) {
            var a = n.name;
            return a.toLowerCase() === "authorization";
          }) ? (0, L.logDebugMessage)(
            "setAuthorizationHeaderIfRequired: Authorization header defined by the user, not adding"
          ) : t !== void 0 && ((0, L.logDebugMessage)(
            "setAuthorizationHeaderIfRequired: added authorization header"
          ), e.setRequestHeader("Authorization", "Bearer ".concat(t))) : (0, L.logDebugMessage)(
            "setAuthorizationHeaderIfRequired: token for header based auth not found"
          ), [
            2
            /*return*/
          ];
      }
    });
  });
}
function zi(e) {
  return He(this, void 0, void 0, function() {
    var r, t, i, o, n;
    return Fe(this, function(a) {
      switch (a.label) {
        case 0:
          return (0, L.logDebugMessage)("saveTokensFromHeaders: Saving updated tokens from the response"), r = e.get("st-refresh-token"), r === null ? [3, 2] : ((0, L.logDebugMessage)("saveTokensFromHeaders: saving new refresh token"), [4, (0, $.setToken)("refresh", r)]);
        case 1:
          a.sent(), a.label = 2;
        case 2:
          return t = e.get("st-access-token"), t === null ? [3, 4] : ((0, L.logDebugMessage)("saveTokensFromHeaders: saving new access token"), [4, (0, $.setToken)("access", t)]);
        case 3:
          a.sent(), a.label = 4;
        case 4:
          return i = e.get("front-token"), i === null ? [3, 6] : ((0, L.logDebugMessage)("saveTokensFromHeaders: Setting sFrontToken: " + i), [4, $.FrontToken.setItem(i)]);
        case 5:
          a.sent(), (0, $.updateClockSkewUsingFrontToken)({ frontToken: i, responseHeaders: e }), a.label = 6;
        case 6:
          return o = e.get("anti-csrf"), o === null ? [3, 9] : [4, (0, $.getLocalSessionState)(!0)];
        case 7:
          return n = a.sent(), n.status !== "EXISTS" ? [3, 9] : ((0, L.logDebugMessage)("saveTokensFromHeaders: Setting anti-csrf token"), [4, $.AntiCsrfToken.setItem(n.lastAccessTokenUpdate, o)]);
        case 8:
          a.sent(), a.label = 9;
        case 9:
          return [
            2
            /*return*/
          ];
      }
    });
  });
}
function Ji(e) {
  return new Headers(
    e.getAllResponseHeaders().split(`\r
`).map(function(r) {
      var t = r.indexOf(": ");
      return t === -1 ? ["", ""] : [r.slice(0, t), r.slice(t + 2)];
    }).filter(function(r) {
      return r[0].length !== 0;
    })
  );
}
var Pn = p && p.__assign || function() {
  return Pn = Object.assign || function(e) {
    for (var r, t = 1, i = arguments.length; t < i; t++) {
      r = arguments[t];
      for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, Pn.apply(this, arguments);
}, _e = p && p.__awaiter || function(e, r, t, i) {
  function o(n) {
    return n instanceof t ? n : new t(function(a) {
      a(n);
    });
  }
  return new (t || (t = Promise))(function(n, a) {
    function u(l) {
      try {
        s(i.next(l));
      } catch (d) {
        a(d);
      }
    }
    function c(l) {
      try {
        s(i.throw(l));
      } catch (d) {
        a(d);
      }
    }
    function s(l) {
      l.done ? n(l.value) : o(l.value).then(u, c);
    }
    s((i = i.apply(e, r || [])).next());
  });
}, Ee = p && p.__generator || function(e, r) {
  var t = {
    label: 0,
    sent: function() {
      if (n[0] & 1)
        throw n[1];
      return n[1];
    },
    trys: [],
    ops: []
  }, i, o, n, a;
  return a = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function u(s) {
    return function(l) {
      return c([s, l]);
    };
  }
  function c(s) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, o && (n = s[0] & 2 ? o.return : s[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, s[1])).done)
          return n;
        switch (o = 0, n && (s = [s[0] & 2, n.value]), s[0]) {
          case 0:
          case 1:
            n = s;
            break;
          case 4:
            return t.label++, { value: s[1], done: !1 };
          case 5:
            t.label++, o = s[1], s = [0];
            continue;
          case 7:
            s = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (n = t.trys, !(n = n.length > 0 && n[n.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              t = 0;
              continue;
            }
            if (s[0] === 3 && (!n || s[1] > n[0] && s[1] < n[3])) {
              t.label = s[1];
              break;
            }
            if (s[0] === 6 && t.label < n[1]) {
              t.label = n[1], n = s;
              break;
            }
            if (n && t.label < n[2]) {
              t.label = n[2], t.ops.push(s);
              break;
            }
            n[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        s = r.call(e, t);
      } catch (l) {
        s = [6, l], o = 0;
      } finally {
        i = n = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
};
Object.defineProperty(jn, "__esModule", { value: !0 });
var be = ze, St = Te, Ki = Ae, G = oe, Qi = gt, Yi = en, Tt = te, ar = we, Zi = Ue, wn = 100, ur = "CLAIM_REFRESH_LOCK";
function eo(e) {
  return {
    addXMLHttpRequestInterceptor: function(r) {
      (0, G.logDebugMessage)("addXMLHttpRequestInterceptorAndReturnModified: called"), (0, Yi.addInterceptorsToXMLHttpRequest)();
    },
    addFetchInterceptorsAndReturnModifiedFetch: function(r) {
      return (0, G.logDebugMessage)("addFetchInterceptorsAndReturnModifiedFetch: called"), function(t, i) {
        return _e(this, void 0, void 0, function() {
          return Ee(this, function(o) {
            switch (o.label) {
              case 0:
                return [
                  4,
                  be.default.doRequest(
                    function(n) {
                      return r.originalFetch(
                        typeof t == "object" && "clone" in t ? t.clone() : t,
                        Pn({}, n)
                      );
                    },
                    i,
                    t
                  )
                ];
              case 1:
                return [2, o.sent()];
            }
          });
        });
      };
    },
    addAxiosInterceptors: function(r) {
      if ((0, G.logDebugMessage)("addAxiosInterceptors: called"), XMLHttpRequest.__interceptedBySuperTokens) {
        console.warn(
          "Not adding axios interceptor since XMLHttpRequest is already added. This is just a warning."
        ), console.warn("Our axios and XMLHttpRequest interceptors cannot be used at the same time."), console.warn(
          "Since XMLHttpRequest is added automatically and supports axios by default, you can just remove addAxiosInterceptors from your code."
        ), console.warn(
          "If you want to continue using our axios interceptor, you can override addXMLHttpRequestInterceptor with an empty function."
        ), (0, G.logDebugMessage)(
          "addAxiosInterceptors: not adding, because XHR interceptors are already in place"
        );
        return;
      }
      for (var t = r.axiosInstance.interceptors.request, i = 0; i < t.handlers.length; i++)
        if (t.handlers[i].fulfilled === St.interceptorFunctionRequestFulfilled) {
          (0, G.logDebugMessage)(
            "addAxiosInterceptors: not adding because already added on this instance"
          );
          return;
        }
      r.axiosInstance.interceptors.request.use(St.interceptorFunctionRequestFulfilled, function(o) {
        return _e(this, void 0, void 0, function() {
          return Ee(this, function(n) {
            throw o;
          });
        });
      }), r.axiosInstance.interceptors.response.use(
        (0, St.responseInterceptor)(r.axiosInstance),
        (0, St.responseErrorInterceptor)(r.axiosInstance)
      );
    },
    getUserId: function(r) {
      return _e(this, void 0, void 0, function() {
        var t;
        return Ee(this, function(i) {
          switch (i.label) {
            case 0:
              return (0, G.logDebugMessage)("getUserId: called"), [4, be.FrontToken.getTokenInfo()];
            case 1:
              if (t = i.sent(), t === void 0)
                throw new Error("No session exists");
              return (0, G.logDebugMessage)("getUserId: returning: " + t.uid), [2, t.uid];
          }
        });
      });
    },
    getAccessTokenPayloadSecurely: function(r) {
      return _e(this, void 0, void 0, function() {
        var t, i;
        return Ee(this, function(o) {
          switch (o.label) {
            case 0:
              return (0, G.logDebugMessage)("getAccessTokenPayloadSecurely: called"), [4, be.FrontToken.getTokenInfo()];
            case 1:
              if (t = o.sent(), t === void 0)
                throw new Error("No session exists");
              return t.ate < ar.default.getReferenceOrThrow().dateProvider.now() ? ((0, G.logDebugMessage)("getAccessTokenPayloadSecurely: access token expired. Refreshing session"), [4, be.default.attemptRefreshingSession()]) : [3, 5];
            case 2:
              return i = o.sent(), i ? [
                4,
                this.getAccessTokenPayloadSecurely({
                  userContext: r.userContext
                })
              ] : [3, 4];
            case 3:
              return [2, o.sent()];
            case 4:
              throw new Error("Could not refresh session");
            case 5:
              return (0, G.logDebugMessage)("getAccessTokenPayloadSecurely: returning: " + JSON.stringify(t.up)), [2, t.up];
          }
        });
      });
    },
    doesSessionExist: function(r) {
      return _e(this, void 0, void 0, function() {
        var t, i, o;
        return Ee(this, function(n) {
          switch (n.label) {
            case 0:
              return (0, G.logDebugMessage)("doesSessionExist: called"), [4, be.FrontToken.getTokenInfo()];
            case 1:
              return t = n.sent(), t === void 0 ? ((0, G.logDebugMessage)("doesSessionExist: access token does not exist locally"), [2, !1]) : t.ate < ar.default.getReferenceOrThrow().dateProvider.now() ? ((0, G.logDebugMessage)("doesSessionExist: access token expired. Refreshing session"), [4, (0, be.getLocalSessionState)(!1)]) : [3, 4];
            case 2:
              return i = n.sent(), [4, (0, be.onUnauthorisedResponse)(i)];
            case 3:
              return o = n.sent(), [2, o.result === "RETRY"];
            case 4:
              return [2, !0];
          }
        });
      });
    },
    signOut: function(r) {
      return _e(this, void 0, void 0, function() {
        var t, i, o, n;
        return Ee(this, function(a) {
          switch (a.label) {
            case 0:
              return (0, G.logDebugMessage)("signOut: called"), [4, this.doesSessionExist(r)];
            case 1:
              return a.sent() ? ((0, G.logDebugMessage)("signOut: Calling refresh pre API hook"), [
                4,
                e.preAPIHook({
                  action: "SIGN_OUT",
                  requestInit: {
                    method: "post",
                    headers: {
                      "fdi-version": Ki.supported_fdi.join(","),
                      rid: be.default.rid
                    }
                  },
                  url: be.default.signOutUrl,
                  userContext: r.userContext
                })
              ]) : ((0, G.logDebugMessage)("signOut: exiting early because session does not exist"), (0, G.logDebugMessage)("signOut: firing SIGN_OUT event"), e.onHandleEvent({
                action: "SIGN_OUT",
                userContext: r.userContext
              }), [
                2
                /*return*/
              ]);
            case 2:
              return t = a.sent(), (0, G.logDebugMessage)("signOut: Calling API"), [4, fetch(t.url, t.requestInit)];
            case 3:
              if (i = a.sent(), (0, G.logDebugMessage)("signOut: API ended"), (0, G.logDebugMessage)("signOut: API responded with status code: " + i.status), i.status === e.sessionExpiredStatusCode)
                return [
                  2
                  /*return*/
                ];
              if (i.status >= 300)
                throw i;
              return [
                4,
                e.postAPIHook({
                  action: "SIGN_OUT",
                  requestInit: t.requestInit,
                  url: t.url,
                  fetchResponse: i.clone(),
                  userContext: r.userContext
                })
              ];
            case 4:
              return a.sent(), [4, i.clone().json()];
            case 5:
              if (o = a.sent(), o.status === "GENERAL_ERROR")
                throw (0, G.logDebugMessage)("doRequest: Throwing general error"), n = o.message === void 0 ? "No Error Message Provided" : o.message, new Qi.STGeneralError(n);
              return [
                2
                /*return*/
              ];
          }
        });
      });
    },
    getInvalidClaimsFromResponse: function(r) {
      return _e(this, void 0, void 0, function() {
        var t;
        return Ee(this, function(i) {
          switch (i.label) {
            case 0:
              return "body" in r.response ? [4, r.response.clone().json()] : [3, 2];
            case 1:
              return t = i.sent(), [3, 3];
            case 2:
              typeof r.response.data == "string" ? t = JSON.parse(r.response.data) : t = r.response.data, i.label = 3;
            case 3:
              return [2, t.claimValidationErrors];
          }
        });
      });
    },
    getGlobalClaimValidators: function(r) {
      return r.claimValidatorsAddedByOtherRecipes;
    },
    validateClaims: function(r) {
      return _e(this, void 0, void 0, function() {
        var t, i, o, n, a, u, b, c, s, l, d, b, f;
        return Ee(this, function(k) {
          switch (k.label) {
            case 0:
              i = 0, k.label = 1;
            case 1:
              return ++i < wn ? [4, Zi.default.getReferenceOrThrow().lockFactory()] : [3, 20];
            case 2:
              return o = k.sent(), (0, G.logDebugMessage)("validateClaims: trying to acquire claim refresh lock"), [4, o.acquireLock(ur)];
            case 3:
              if (n = k.sent(), !n)
                return [3, 18];
              k.label = 4;
            case 4:
              return k.trys.push([4, , 15, 17]), [
                4,
                this.getAccessTokenPayloadSecurely({
                  userContext: r.userContext
                })
              ];
            case 5:
              t = k.sent(), (0, G.logDebugMessage)("validateClaims: claim refresh lock acquired"), a = 0, u = r.claimValidators, k.label = 6;
            case 6:
              return a < u.length ? (b = u[a], [4, b.shouldRefresh(t, r.userContext)]) : [3, 14];
            case 7:
              if (!k.sent())
                return [3, 13];
              k.label = 8;
            case 8:
              return k.trys.push([8, 10, , 11]), [4, b.refresh(r.userContext)];
            case 9:
              return k.sent(), [3, 11];
            case 10:
              return c = k.sent(), console.error(
                "Encountered an error while refreshing validator ".concat(b.id),
                c
              ), [3, 11];
            case 11:
              return [
                4,
                this.getAccessTokenPayloadSecurely({
                  userContext: r.userContext
                })
              ];
            case 12:
              t = k.sent(), k.label = 13;
            case 13:
              return a++, [3, 6];
            case 14:
              return [3, 17];
            case 15:
              return (0, G.logDebugMessage)("validateClaims: releasing claim refresh lock"), [4, o.releaseLock(ur)];
            case 16:
              return k.sent(), [
                7
                /*endfinally*/
              ];
            case 17:
              return [3, 20];
            case 18:
              (0, G.logDebugMessage)("validateClaims: Retrying refresh lock ".concat(i, "/").concat(wn)), k.label = 19;
            case 19:
              return [3, 1];
            case 20:
              return i !== wn ? [3, 22] : ((0, G.logDebugMessage)("validateClaims: ran out of retries while trying to acquire claim refresh lock"), [
                4,
                this.getAccessTokenPayloadSecurely({ userContext: r.userContext })
              ]);
            case 21:
              t = k.sent(), k.label = 22;
            case 22:
              s = [], l = 0, d = r.claimValidators, k.label = 23;
            case 23:
              return l < d.length ? (b = d[l], [4, b.validate(t, r.userContext)]) : [3, 26];
            case 24:
              f = k.sent(), f.isValid || s.push({
                id: b.id,
                reason: f.reason
              }), k.label = 25;
            case 25:
              return l++, [3, 23];
            case 26:
              return [2, s];
          }
        });
      });
    },
    shouldDoInterceptionBasedOnUrl: function(r, t, i) {
      if ((0, G.logDebugMessage)(
        "shouldDoInterceptionBasedOnUrl: toCheckUrl: " + r + " apiDomain: " + t + " sessionTokenBackendDomain: " + i
      ), r.includes("superTokensDoNotDoInterception"))
        return !1;
      r = (0, Tt.normaliseURLDomainOrThrowError)(r);
      var o = new URL(r), n = o.hostname, a = !1;
      if (t !== "") {
        t = (0, Tt.normaliseURLDomainOrThrowError)(t);
        var u = new URL(t);
        a = n === u.hostname;
      }
      if (i === void 0 || a)
        return a;
      var c = (0, Tt.normaliseSessionScopeOrThrowError)(i);
      return (0, Tt.matchesDomainOrSubdomain)(n, c);
    },
    calculateClockSkewInMillis: function(r) {
      var t = r.accessTokenPayload;
      (0, G.logDebugMessage)("calculateClockSkewInMillis: called");
      var i = t == null ? void 0 : t.iat;
      if (i === void 0 || typeof i != "number")
        return (0, G.logDebugMessage)(
          "calculateClockSkewInMillis: payload iat is undefined or not a number. This may happen due to an unsupported backend sdk. Returning 0"
        ), 0;
      var o = i * 1e3, n = o - Date.now();
      return (0, G.logDebugMessage)("calculateClockSkewInMillis: returning " + n), n;
    }
  };
}
jn.default = eo;
var je = {}, tn = {}, Nt = p && p.__assign || function() {
  return Nt = Object.assign || function(e) {
    for (var r, t = 1, i = arguments.length; t < i; t++) {
      r = arguments[t];
      for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, Nt.apply(this, arguments);
};
Object.defineProperty(tn, "__esModule", { value: !0 });
tn.getProxyObject = void 0;
function to(e) {
  for (var r = Nt(Nt({}, e), { _call: function(u, c) {
    throw new Error("This function should only be called through the recipe object");
  } }), t = Object.keys(r), i = function(u) {
    u !== "_call" && (r[u] = function() {
      for (var c = [], s = 0; s < arguments.length; s++)
        c[s] = arguments[s];
      return this._call(u, c);
    });
  }, o = 0, n = t; o < n.length; o++) {
    var a = n[o];
    i(a);
  }
  return r;
}
tn.getProxyObject = to;
Object.defineProperty(je, "__esModule", { value: !0 });
je.OverrideableBuilder = void 0;
var no = tn, ts = (
  /** @class */
  function() {
    function e(r) {
      this.layers = [r], this.proxies = [];
    }
    return e.prototype.override = function(r) {
      for (var t = (0, no.getProxyObject)(this.layers[0]), i = r(t, this), o = 0, n = Object.keys(this.layers[0]); o < n.length; o++) {
        var a = n[o];
        i[a] === t[a] || a === "_call" ? delete i[a] : i[a] === void 0 && (i[a] = null);
      }
      return this.layers.push(i), this.proxies.push(t), this;
    }, e.prototype.build = function() {
      var r = this;
      if (this.result)
        return this.result;
      this.result = {};
      for (var t = 0, i = this.layers; t < i.length; t++)
        for (var o = i[t], n = 0, a = Object.keys(o); n < a.length; n++) {
          var u = a[n], c = o[u];
          c !== void 0 && (c === null ? this.result[u] = void 0 : typeof c == "function" ? this.result[u] = c.bind(this.result) : this.result[u] = c);
        }
      for (var s = function(b) {
        var f = l.proxies[b];
        f._call = function(k, H) {
          for (var U = b; U >= 0; --U) {
            var M = r.layers[U][k];
            if (M != null)
              return M.bind(r.result).apply(void 0, H);
          }
        };
      }, l = this, d = 0; d < this.proxies.length; ++d)
        s(d);
      return this.result;
    }, e;
  }()
);
je.OverrideableBuilder = ts;
je.default = ts;
var tt = {}, lr;
function ns() {
  if (lr)
    return tt;
  lr = 1, Object.defineProperty(tt, "__esModule", { value: !0 }), tt.PrimitiveClaim = void 0;
  var e = we, r = (
    /** @class */
    function() {
      function t(i) {
        var o = this;
        this.validators = {
          hasValue: function(n, a, u) {
            a === void 0 && (a = o.defaultMaxAgeInSeconds);
            var c = e.default.getReferenceOrThrow().dateProvider;
            return {
              id: u !== void 0 ? u : o.id,
              refresh: function(s) {
                return o.refresh(s);
              },
              shouldRefresh: function(s, l) {
                if (a !== void 0 && a < c.getThresholdInSeconds())
                  throw new Error(
                    "maxAgeInSeconds must be greater than or equal to the DateProvider threshold value -> ".concat(
                      c.getThresholdInSeconds()
                    )
                  );
                return o.getValueFromPayload(s, l) === void 0 || // We know payload[this.id] is defined since the value is not undefined in this branch
                a !== void 0 && s[o.id].t < c.now() - a * 1e3;
              },
              validate: function(s, l) {
                var d = o.getValueFromPayload(s, l);
                if (d === void 0)
                  return {
                    isValid: !1,
                    reason: { message: "value does not exist", expectedValue: n, actualValue: d }
                  };
                var b = (c.now() - o.getLastFetchedTime(s, l)) / 1e3;
                return a !== void 0 && b > a ? {
                  isValid: !1,
                  reason: {
                    message: "expired",
                    ageInSeconds: b,
                    maxAgeInSeconds: a
                  }
                } : d !== n ? {
                  isValid: !1,
                  reason: { message: "wrong value", expectedValue: n, actualValue: d }
                } : { isValid: !0 };
              }
            };
          }
        }, this.id = i.id, this.refresh = i.refresh, this.defaultMaxAgeInSeconds = i.defaultMaxAgeInSeconds;
      }
      return t.prototype.getValueFromPayload = function(i, o) {
        return i[this.id] !== void 0 ? i[this.id].v : void 0;
      }, t.prototype.getLastFetchedTime = function(i, o) {
        return i[this.id] !== void 0 ? i[this.id].t : void 0;
      }, t;
    }()
  );
  return tt.PrimitiveClaim = r, tt;
}
var nt = {}, cr;
function ro() {
  if (cr)
    return nt;
  cr = 1;
  var e = p && p.__awaiter || function(o, n, a, u) {
    function c(s) {
      return s instanceof a ? s : new a(function(l) {
        l(s);
      });
    }
    return new (a || (a = Promise))(function(s, l) {
      function d(k) {
        try {
          f(u.next(k));
        } catch (H) {
          l(H);
        }
      }
      function b(k) {
        try {
          f(u.throw(k));
        } catch (H) {
          l(H);
        }
      }
      function f(k) {
        k.done ? s(k.value) : c(k.value).then(d, b);
      }
      f((u = u.apply(o, n || [])).next());
    });
  }, r = p && p.__generator || function(o, n) {
    var a = {
      label: 0,
      sent: function() {
        if (s[0] & 1)
          throw s[1];
        return s[1];
      },
      trys: [],
      ops: []
    }, u, c, s, l;
    return l = { next: d(0), throw: d(1), return: d(2) }, typeof Symbol == "function" && (l[Symbol.iterator] = function() {
      return this;
    }), l;
    function d(f) {
      return function(k) {
        return b([f, k]);
      };
    }
    function b(f) {
      if (u)
        throw new TypeError("Generator is already executing.");
      for (; a; )
        try {
          if (u = 1, c && (s = f[0] & 2 ? c.return : f[0] ? c.throw || ((s = c.return) && s.call(c), 0) : c.next) && !(s = s.call(c, f[1])).done)
            return s;
          switch (c = 0, s && (f = [f[0] & 2, s.value]), f[0]) {
            case 0:
            case 1:
              s = f;
              break;
            case 4:
              return a.label++, { value: f[1], done: !1 };
            case 5:
              a.label++, c = f[1], f = [0];
              continue;
            case 7:
              f = a.ops.pop(), a.trys.pop();
              continue;
            default:
              if (s = a.trys, !(s = s.length > 0 && s[s.length - 1]) && (f[0] === 6 || f[0] === 2)) {
                a = 0;
                continue;
              }
              if (f[0] === 3 && (!s || f[1] > s[0] && f[1] < s[3])) {
                a.label = f[1];
                break;
              }
              if (f[0] === 6 && a.label < s[1]) {
                a.label = s[1], s = f;
                break;
              }
              if (s && a.label < s[2]) {
                a.label = s[2], a.ops.push(f);
                break;
              }
              s[2] && a.ops.pop(), a.trys.pop();
              continue;
          }
          f = n.call(o, a);
        } catch (k) {
          f = [6, k], c = 0;
        } finally {
          u = s = 0;
        }
      if (f[0] & 5)
        throw f[1];
      return { value: f[0] ? f[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(nt, "__esModule", { value: !0 }), nt.PrimitiveArrayClaim = void 0;
  var t = we, i = (
    /** @class */
    function() {
      function o(n) {
        var a = this;
        this.validators = {
          includes: function(u, c, s) {
            c === void 0 && (c = a.defaultMaxAgeInSeconds);
            var l = t.default.getReferenceOrThrow().dateProvider;
            return {
              id: s !== void 0 ? s : a.id,
              refresh: function(d) {
                return a.refresh(d);
              },
              shouldRefresh: function(d, b) {
                if (c !== void 0 && c < l.getThresholdInSeconds())
                  throw new Error(
                    "maxAgeInSeconds must be greater than or equal to the DateProvider threshold value -> ".concat(
                      l.getThresholdInSeconds()
                    )
                  );
                return a.getValueFromPayload(d, b) === void 0 || // We know payload[this.id] is defined since the value is not undefined in this branch
                c !== void 0 && d[a.id].t < l.now() - c * 1e3;
              },
              validate: function(d, b) {
                return e(a, void 0, void 0, function() {
                  var f, k;
                  return r(this, function(H) {
                    return f = this.getValueFromPayload(d, b), f === void 0 ? [
                      2,
                      {
                        isValid: !1,
                        reason: {
                          message: "value does not exist",
                          expectedToInclude: u,
                          actualValue: f
                        }
                      }
                    ] : (k = (l.now() - this.getLastFetchedTime(d, b)) / 1e3, c !== void 0 && k > c ? [
                      2,
                      {
                        isValid: !1,
                        reason: {
                          message: "expired",
                          ageInSeconds: k,
                          maxAgeInSeconds: c
                        }
                      }
                    ] : f.includes(u) ? [2, { isValid: !0 }] : [
                      2,
                      {
                        isValid: !1,
                        reason: {
                          message: "wrong value",
                          expectedToInclude: u,
                          actualValue: f
                        }
                      }
                    ]);
                  });
                });
              }
            };
          },
          excludes: function(u, c, s) {
            c === void 0 && (c = a.defaultMaxAgeInSeconds);
            var l = t.default.getReferenceOrThrow().dateProvider;
            return {
              id: s !== void 0 ? s : a.id,
              refresh: function(d) {
                return a.refresh(d);
              },
              shouldRefresh: function(d, b) {
                if (c !== void 0 && c < l.getThresholdInSeconds())
                  throw new Error(
                    "maxAgeInSeconds must be greater than or equal to the DateProvider threshold value -> ".concat(
                      l.getThresholdInSeconds()
                    )
                  );
                return a.getValueFromPayload(d, b) === void 0 || // We know payload[this.id] is defined since the value is not undefined in this branch
                c !== void 0 && d[a.id].t < l.now() - c * 1e3;
              },
              validate: function(d, b) {
                return e(a, void 0, void 0, function() {
                  var f, k;
                  return r(this, function(H) {
                    return f = this.getValueFromPayload(d, b), f === void 0 ? [
                      2,
                      {
                        isValid: !1,
                        reason: {
                          message: "value does not exist",
                          expectedToNotInclude: u,
                          actualValue: f
                        }
                      }
                    ] : (k = (l.now() - this.getLastFetchedTime(d, b)) / 1e3, c !== void 0 && k > c ? [
                      2,
                      {
                        isValid: !1,
                        reason: {
                          message: "expired",
                          ageInSeconds: k,
                          maxAgeInSeconds: c
                        }
                      }
                    ] : f.includes(u) ? [
                      2,
                      {
                        isValid: !1,
                        reason: {
                          message: "wrong value",
                          expectedToNotInclude: u,
                          actualValue: f
                        }
                      }
                    ] : [2, { isValid: !0 }]);
                  });
                });
              }
            };
          },
          includesAll: function(u, c, s) {
            c === void 0 && (c = a.defaultMaxAgeInSeconds);
            var l = t.default.getReferenceOrThrow().dateProvider;
            return {
              id: s !== void 0 ? s : a.id,
              refresh: function(d) {
                return a.refresh(d);
              },
              shouldRefresh: function(d, b) {
                if (c !== void 0 && c < l.getThresholdInSeconds())
                  throw new Error(
                    "maxAgeInSeconds must be greater than or equal to the DateProvider threshold value -> ".concat(
                      l.getThresholdInSeconds()
                    )
                  );
                return a.getValueFromPayload(d, b) === void 0 || // We know payload[this.id] is defined since the value is not undefined in this branch
                c !== void 0 && d[a.id].t < l.now() - c * 1e3;
              },
              validate: function(d, b) {
                return e(a, void 0, void 0, function() {
                  var f, k, H, U;
                  return r(this, function(M) {
                    return f = this.getValueFromPayload(d, b), f === void 0 ? [
                      2,
                      {
                        isValid: !1,
                        reason: {
                          message: "value does not exist",
                          expectedToInclude: u,
                          actualValue: f
                        }
                      }
                    ] : (k = (l.now() - this.getLastFetchedTime(d, b)) / 1e3, c !== void 0 && k > c ? [
                      2,
                      {
                        isValid: !1,
                        reason: {
                          message: "expired",
                          ageInSeconds: k,
                          maxAgeInSeconds: c
                        }
                      }
                    ] : (H = new Set(f), U = u.every(function(O) {
                      return H.has(O);
                    }), [
                      2,
                      U ? { isValid: U } : {
                        isValid: U,
                        reason: {
                          message: "wrong value",
                          expectedToInclude: u,
                          actualValue: f
                        }
                      }
                    ]));
                  });
                });
              }
            };
          },
          includesAny: function(u, c, s) {
            c === void 0 && (c = a.defaultMaxAgeInSeconds);
            var l = t.default.getReferenceOrThrow().dateProvider;
            return {
              id: s !== void 0 ? s : a.id,
              refresh: function(d) {
                return a.refresh(d);
              },
              shouldRefresh: function(d, b) {
                if (c !== void 0 && c < l.getThresholdInSeconds())
                  throw new Error(
                    "maxAgeInSeconds must be greater than or equal to the DateProvider threshold value -> ".concat(
                      l.getThresholdInSeconds()
                    )
                  );
                return a.getValueFromPayload(d, b) === void 0 || // We know payload[this.id] is defined since the value is not undefined in this branch
                c !== void 0 && d[a.id].t < l.now() - c * 1e3;
              },
              validate: function(d, b) {
                return e(a, void 0, void 0, function() {
                  var f, k, H, U;
                  return r(this, function(M) {
                    return f = this.getValueFromPayload(d, b), f === void 0 ? [
                      2,
                      {
                        isValid: !1,
                        reason: {
                          message: "value does not exist",
                          expectedToInclude: u,
                          actualValue: f
                        }
                      }
                    ] : (k = (l.now() - this.getLastFetchedTime(d, b)) / 1e3, c !== void 0 && k > c ? [
                      2,
                      {
                        isValid: !1,
                        reason: {
                          message: "expired",
                          ageInSeconds: k,
                          maxAgeInSeconds: c
                        }
                      }
                    ] : (H = new Set(f), U = u.some(function(O) {
                      return H.has(O);
                    }), [
                      2,
                      U ? { isValid: U } : {
                        isValid: U,
                        reason: {
                          message: "wrong value",
                          expectedToIncludeAtLeastOneOf: u,
                          actualValue: f
                        }
                      }
                    ]));
                  });
                });
              }
            };
          },
          excludesAll: function(u, c, s) {
            c === void 0 && (c = a.defaultMaxAgeInSeconds);
            var l = t.default.getReferenceOrThrow().dateProvider;
            return {
              id: s !== void 0 ? s : a.id,
              refresh: function(d) {
                return a.refresh(d);
              },
              shouldRefresh: function(d, b) {
                if (c !== void 0 && c < l.getThresholdInSeconds())
                  throw new Error(
                    "maxAgeInSeconds must be greater than or equal to the DateProvider threshold value -> ".concat(
                      l.getThresholdInSeconds()
                    )
                  );
                return a.getValueFromPayload(d, b) === void 0 || // We know payload[this.id] is defined since the value is not undefined in this branch
                c !== void 0 && d[a.id].t < l.now() - c * 1e3;
              },
              validate: function(d, b) {
                return e(a, void 0, void 0, function() {
                  var f, k, H, U;
                  return r(this, function(M) {
                    return f = this.getValueFromPayload(d, b), f === void 0 ? [
                      2,
                      {
                        isValid: !1,
                        reason: {
                          message: "value does not exist",
                          expectedToNotInclude: u,
                          actualValue: f
                        }
                      }
                    ] : (k = (l.now() - this.getLastFetchedTime(d, b)) / 1e3, c !== void 0 && k > c ? [
                      2,
                      {
                        isValid: !1,
                        reason: {
                          message: "expired",
                          ageInSeconds: k,
                          maxAgeInSeconds: c
                        }
                      }
                    ] : (H = new Set(f), U = u.every(function(O) {
                      return !H.has(O);
                    }), [
                      2,
                      U ? { isValid: U } : {
                        isValid: U,
                        reason: {
                          message: "wrong value",
                          expectedToNotInclude: u,
                          actualValue: f
                        }
                      }
                    ]));
                  });
                });
              }
            };
          }
        }, this.id = n.id, this.refresh = n.refresh, this.defaultMaxAgeInSeconds = n.defaultMaxAgeInSeconds;
      }
      return o.prototype.getValueFromPayload = function(n, a) {
        return n[this.id] !== void 0 ? n[this.id].v : void 0;
      }, o.prototype.getLastFetchedTime = function(n, a) {
        return n[this.id] !== void 0 ? n[this.id].t : void 0;
      }, o;
    }()
  );
  return nt.PrimitiveArrayClaim = i, nt;
}
var rt = {}, dr;
function so() {
  if (dr)
    return rt;
  dr = 1;
  var e = p && p.__extends || /* @__PURE__ */ function() {
    var o = function(n, a) {
      return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, c) {
        u.__proto__ = c;
      } || function(u, c) {
        for (var s in c)
          Object.prototype.hasOwnProperty.call(c, s) && (u[s] = c[s]);
      }, o(n, a);
    };
    return function(n, a) {
      if (typeof a != "function" && a !== null)
        throw new TypeError("Class extends value " + String(a) + " is not a constructor or null");
      o(n, a);
      function u() {
        this.constructor = n;
      }
      n.prototype = a === null ? Object.create(a) : (u.prototype = a.prototype, new u());
    };
  }(), r = p && p.__assign || function() {
    return r = Object.assign || function(o) {
      for (var n, a = 1, u = arguments.length; a < u; a++) {
        n = arguments[a];
        for (var c in n)
          Object.prototype.hasOwnProperty.call(n, c) && (o[c] = n[c]);
      }
      return o;
    }, r.apply(this, arguments);
  };
  Object.defineProperty(rt, "__esModule", { value: !0 }), rt.BooleanClaim = void 0;
  var t = ns(), i = (
    /** @class */
    function(o) {
      e(n, o);
      function n(a) {
        var u = o.call(this, a) || this;
        return u.validators = r(r({}, u.validators), {
          isTrue: function(c) {
            return u.validators.hasValue(!0, c);
          },
          isFalse: function(c) {
            return u.validators.hasValue(!1, c);
          }
        }), u;
      }
      return n;
    }(t.PrimitiveClaim)
  );
  return rt.BooleanClaim = i, rt;
}
(function(e) {
  var r = p && p.__awaiter || function(M, O, m, S) {
    function N(v) {
      return v instanceof m ? v : new m(function(g) {
        g(v);
      });
    }
    return new (m || (m = Promise))(function(v, g) {
      function P(T) {
        try {
          _(S.next(T));
        } catch (x) {
          g(x);
        }
      }
      function A(T) {
        try {
          _(S.throw(T));
        } catch (x) {
          g(x);
        }
      }
      function _(T) {
        T.done ? v(T.value) : N(T.value).then(P, A);
      }
      _((S = S.apply(M, O || [])).next());
    });
  }, t = p && p.__generator || function(M, O) {
    var m = {
      label: 0,
      sent: function() {
        if (v[0] & 1)
          throw v[1];
        return v[1];
      },
      trys: [],
      ops: []
    }, S, N, v, g;
    return g = { next: P(0), throw: P(1), return: P(2) }, typeof Symbol == "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function P(_) {
      return function(T) {
        return A([_, T]);
      };
    }
    function A(_) {
      if (S)
        throw new TypeError("Generator is already executing.");
      for (; m; )
        try {
          if (S = 1, N && (v = _[0] & 2 ? N.return : _[0] ? N.throw || ((v = N.return) && v.call(N), 0) : N.next) && !(v = v.call(N, _[1])).done)
            return v;
          switch (N = 0, v && (_ = [_[0] & 2, v.value]), _[0]) {
            case 0:
            case 1:
              v = _;
              break;
            case 4:
              return m.label++, { value: _[1], done: !1 };
            case 5:
              m.label++, N = _[1], _ = [0];
              continue;
            case 7:
              _ = m.ops.pop(), m.trys.pop();
              continue;
            default:
              if (v = m.trys, !(v = v.length > 0 && v[v.length - 1]) && (_[0] === 6 || _[0] === 2)) {
                m = 0;
                continue;
              }
              if (_[0] === 3 && (!v || _[1] > v[0] && _[1] < v[3])) {
                m.label = _[1];
                break;
              }
              if (_[0] === 6 && m.label < v[1]) {
                m.label = v[1], v = _;
                break;
              }
              if (v && m.label < v[2]) {
                m.label = v[2], m.ops.push(_);
                break;
              }
              v[2] && m.ops.pop(), m.trys.pop();
              continue;
          }
          _ = O.call(M, m);
        } catch (T) {
          _ = [6, T], N = 0;
        } finally {
          S = v = 0;
        }
      if (_[0] & 5)
        throw _[1];
      return { value: _[0] ? _[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.BooleanClaim = e.PrimitiveArrayClaim = e.PrimitiveClaim = e.getInvalidClaimsFromResponse = e.getClaimValue = e.validateClaims = e.signOut = e.addAxiosInterceptors = e.doesSessionExist = e.attemptRefreshingSession = e.getAccessToken = e.getAccessTokenPayloadSecurely = e.getUserId = e.init = void 0;
  var i = ze, o = jn, n = je, a = te, u = Le, c = ae, s = Ue, l = Je, d = oe, b = we, f = (
    /** @class */
    function() {
      function M() {
      }
      M.init = function(m) {
        u.default.init(m.cookieHandler), c.default.init(m.windowHandler), b.default.init(m.dateProvider), s.default.init(
          m.lockFactory,
          c.default.getReferenceOrThrow().windowHandler.localStorage
        );
        var S = (0, a.validateAndNormaliseInputOrThrowError)(m);
        m.enableDebugLogs !== void 0 && m.enableDebugLogs && (0, d.enableLogging)();
        var N = new n.default(
          (0, o.default)({
            onHandleEvent: S.onHandleEvent,
            preAPIHook: S.preAPIHook,
            postAPIHook: S.postAPIHook,
            sessionExpiredStatusCode: S.sessionExpiredStatusCode
          })
        ).override(S.override.functions).build();
        i.default.init(S, N), M.axiosInterceptorQueue.forEach(function(v) {
          v();
        }), M.axiosInterceptorQueue = [];
      }, M.getUserId = function(m) {
        return i.default.recipeImpl.getUserId({
          userContext: (0, a.getNormalisedUserContext)(m === void 0 ? void 0 : m.userContext)
        });
      }, M.getAccessTokenPayloadSecurely = function(m) {
        return r(this, void 0, void 0, function() {
          return t(this, function(S) {
            return [
              2,
              i.default.recipeImpl.getAccessTokenPayloadSecurely({
                userContext: (0, a.getNormalisedUserContext)(
                  m === void 0 ? void 0 : m.userContext
                )
              })
            ];
          });
        });
      };
      var O;
      return O = M, M.axiosInterceptorQueue = [], M.attemptRefreshingSession = function() {
        return r(void 0, void 0, void 0, function() {
          return t(O, function(m) {
            return [2, i.default.attemptRefreshingSession()];
          });
        });
      }, M.doesSessionExist = function(m) {
        return i.default.recipeImpl.doesSessionExist({
          userContext: (0, a.getNormalisedUserContext)(m === void 0 ? void 0 : m.userContext)
        });
      }, M.addAxiosInterceptors = function(m, S) {
        i.default.initCalled ? i.default.recipeImpl.addAxiosInterceptors({
          axiosInstance: m,
          userContext: (0, a.getNormalisedUserContext)(S)
        }) : M.axiosInterceptorQueue.push(function() {
          i.default.recipeImpl.addAxiosInterceptors({
            axiosInstance: m,
            userContext: (0, a.getNormalisedUserContext)(S)
          });
        });
      }, M.signOut = function(m) {
        return i.default.recipeImpl.signOut({
          userContext: (0, a.getNormalisedUserContext)(m === void 0 ? void 0 : m.userContext)
        });
      }, M.getInvalidClaimsFromResponse = function(m) {
        return r(this, void 0, void 0, function() {
          return t(this, function(S) {
            return [
              2,
              i.default.recipeImpl.getInvalidClaimsFromResponse({
                response: m.response,
                userContext: (0, a.getNormalisedUserContext)(m.userContext)
              })
            ];
          });
        });
      }, M.getClaimValue = function(m) {
        return r(this, void 0, void 0, function() {
          var S, N;
          return t(this, function(v) {
            switch (v.label) {
              case 0:
                return S = (0, a.getNormalisedUserContext)(
                  m === void 0 ? void 0 : m.userContext
                ), [
                  4,
                  M.getAccessTokenPayloadSecurely({ userContext: S })
                ];
              case 1:
                return N = v.sent(), [2, m.claim.getValueFromPayload(N, S)];
            }
          });
        });
      }, M.validateClaims = function(m, S) {
        var N = (0, a.getNormalisedUserContext)(S), v = l.SessionClaimValidatorStore.getClaimValidatorsAddedByOtherRecipes(), g = i.default.recipeImpl.getGlobalClaimValidators({
          claimValidatorsAddedByOtherRecipes: v,
          userContext: N
        }), P = m !== void 0 ? m(g, N) : g;
        return P.length === 0 ? [] : i.default.recipeImpl.validateClaims({
          claimValidators: P,
          userContext: (0, a.getNormalisedUserContext)(S)
        });
      }, M.getAccessToken = function(m) {
        return r(void 0, void 0, void 0, function() {
          return t(O, function(S) {
            switch (S.label) {
              case 0:
                return [
                  4,
                  i.default.recipeImpl.doesSessionExist({
                    userContext: (0, a.getNormalisedUserContext)(
                      m === void 0 ? void 0 : m.userContext
                    )
                  })
                ];
              case 1:
                return S.sent() ? [2, (0, i.getTokenForHeaderAuth)("access")] : [2, void 0];
            }
          });
        });
      }, M;
    }()
  );
  e.default = f, e.init = f.init, e.getUserId = f.getUserId, e.getAccessTokenPayloadSecurely = f.getAccessTokenPayloadSecurely, e.getAccessToken = f.getAccessToken, e.attemptRefreshingSession = f.attemptRefreshingSession, e.doesSessionExist = f.doesSessionExist, e.addAxiosInterceptors = f.addAxiosInterceptors, e.signOut = f.signOut, e.validateClaims = f.validateClaims, e.getClaimValue = f.getClaimValue, e.getInvalidClaimsFromResponse = f.getInvalidClaimsFromResponse;
  var k = ns();
  Object.defineProperty(e, "PrimitiveClaim", {
    enumerable: !0,
    get: function() {
      return k.PrimitiveClaim;
    }
  });
  var H = ro();
  Object.defineProperty(e, "PrimitiveArrayClaim", {
    enumerable: !0,
    get: function() {
      return H.PrimitiveArrayClaim;
    }
  });
  var U = so();
  Object.defineProperty(e, "BooleanClaim", {
    enumerable: !0,
    get: function() {
      return U.BooleanClaim;
    }
  });
})(Yr);
(function(e) {
  function r(t) {
    for (var i in t)
      e.hasOwnProperty(i) || (e[i] = t[i]);
  }
  e.__esModule = !0, r(Yr);
})(qn);
var nn = {};
Object.defineProperty(nn, "__esModule", { value: !0 });
nn.EMAILVERIFICATION_CLAIM_ID = void 0;
nn.EMAILVERIFICATION_CLAIM_ID = "st-ev";
var io = p && p.__extends || /* @__PURE__ */ function() {
  var e = function(r, t) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, o) {
      i.__proto__ = o;
    } || function(i, o) {
      for (var n in o)
        Object.prototype.hasOwnProperty.call(o, n) && (i[n] = o[n]);
    }, e(r, t);
  };
  return function(r, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    e(r, t);
    function i() {
      this.constructor = r;
    }
    r.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i());
  };
}(), ie = p && p.__assign || function() {
  return ie = Object.assign || function(e) {
    for (var r, t = 1, i = arguments.length; t < i; t++) {
      r = arguments[t];
      for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, ie.apply(this, arguments);
}, _t = p && p.__awaiter || function(e, r, t, i) {
  function o(n) {
    return n instanceof t ? n : new t(function(a) {
      a(n);
    });
  }
  return new (t || (t = Promise))(function(n, a) {
    function u(l) {
      try {
        s(i.next(l));
      } catch (d) {
        a(d);
      }
    }
    function c(l) {
      try {
        s(i.throw(l));
      } catch (d) {
        a(d);
      }
    }
    function s(l) {
      l.done ? n(l.value) : o(l.value).then(u, c);
    }
    s((i = i.apply(e, r || [])).next());
  });
}, Et = p && p.__generator || function(e, r) {
  var t = {
    label: 0,
    sent: function() {
      if (n[0] & 1)
        throw n[1];
      return n[1];
    },
    trys: [],
    ops: []
  }, i, o, n, a;
  return a = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function u(s) {
    return function(l) {
      return c([s, l]);
    };
  }
  function c(s) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, o && (n = s[0] & 2 ? o.return : s[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, s[1])).done)
          return n;
        switch (o = 0, n && (s = [s[0] & 2, n.value]), s[0]) {
          case 0:
          case 1:
            n = s;
            break;
          case 4:
            return t.label++, { value: s[1], done: !1 };
          case 5:
            t.label++, o = s[1], s = [0];
            continue;
          case 7:
            s = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (n = t.trys, !(n = n.length > 0 && n[n.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              t = 0;
              continue;
            }
            if (s[0] === 3 && (!n || s[1] > n[0] && s[1] < n[3])) {
              t.label = s[1];
              break;
            }
            if (s[0] === 6 && t.label < n[1]) {
              t.label = n[1], n = s;
              break;
            }
            if (n && t.label < n[2]) {
              t.label = n[2], t.ops.push(s);
              break;
            }
            n[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        s = r.call(e, t);
      } catch (l) {
        s = [6, l], o = 0;
      } finally {
        i = n = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
}, fr = p && p.__spreadArray || function(e, r, t) {
  if (t || arguments.length === 2)
    for (var i = 0, o = r.length, n; i < o; i++)
      (n || !(i in r)) && (n || (n = Array.prototype.slice.call(r, 0, i)), n[i] = r[i]);
  return e.concat(n || Array.prototype.slice.call(r));
};
Object.defineProperty(Ke, "__esModule", { value: !0 });
Ke.Recipe = void 0;
var oo = Yt, le = qn, hr = W, ao = nn, gr = [ao.EMAILVERIFICATION_CLAIM_ID], rs = (
  /** @class */
  function(e) {
    io(r, e);
    function r(t) {
      var i = e.call(this, t) || this;
      return i.getUserId = function(o) {
        return le.default.getUserId({
          userContext: o.userContext
        });
      }, i.getAccessToken = function(o) {
        return _t(i, void 0, void 0, function() {
          return Et(this, function(n) {
            return [
              2,
              le.default.getAccessToken({
                userContext: o.userContext
              })
            ];
          });
        });
      }, i.getAccessTokenPayloadSecurely = function(o) {
        return _t(i, void 0, void 0, function() {
          return Et(this, function(n) {
            return [
              2,
              le.default.getAccessTokenPayloadSecurely({
                userContext: o.userContext
              })
            ];
          });
        });
      }, i.doesSessionExist = function(o) {
        return le.default.doesSessionExist({
          userContext: o.userContext
        });
      }, i.signOut = function(o) {
        return le.default.signOut({
          userContext: o.userContext
        });
      }, i.attemptRefreshingSession = function() {
        return _t(i, void 0, void 0, function() {
          return Et(this, function(o) {
            return [2, le.default.attemptRefreshingSession()];
          });
        });
      }, i.validateClaims = function(o) {
        return le.default.validateClaims(o.overrideGlobalClaimValidators, o.userContext);
      }, le.default.init(
        ie(ie({}, t), {
          override: {
            functions: function(o, n) {
              var a;
              return n.override(function(u) {
                return ie(ie({}, u), {
                  getGlobalClaimValidators: function(c) {
                    var s = u.getGlobalClaimValidators(c);
                    return fr(
                      fr(
                        [],
                        s.filter(function(l) {
                          return gr.includes(l.id);
                        }),
                        !0
                      ),
                      s.filter(function(l) {
                        return !gr.includes(l.id);
                      }),
                      !0
                    );
                  }
                });
              }), !((a = t.override) === null || a === void 0) && a.functions && n.override(t.override.functions), o;
            }
          },
          preAPIHook: function(o) {
            return _t(i, void 0, void 0, function() {
              var n, a;
              return Et(this, function(u) {
                return n = new Headers(o.requestInit.headers), n.set("rid", t.recipeId), a = ie(ie({}, o), {
                  requestInit: ie(ie({}, o.requestInit), { headers: n })
                }), t.preAPIHook === void 0 ? [2, a] : [2, t.preAPIHook(o)];
              });
            });
          },
          apiDomain: t.appInfo.apiDomain.getAsStringDangerous(),
          apiBasePath: t.appInfo.apiBasePath.getAsStringDangerous()
        })
      ), i;
    }
    return r.init = function(t) {
      return function(i, o, n) {
        return r.instance = new r(
          ie(ie({}, t), {
            appInfo: i,
            recipeId: r.RECIPE_ID,
            enableDebugLogs: n
          })
        ), r.instance;
      };
    }, r.prototype.getClaimValue = function(t) {
      return le.default.getClaimValue(t);
    }, r.prototype.getInvalidClaimsFromResponse = function(t) {
      return le.default.getInvalidClaimsFromResponse(t);
    }, r.addAxiosInterceptors = function(t, i) {
      return le.default.addAxiosInterceptors(t, i);
    }, r.getInstanceOrThrow = function() {
      if (r.instance === void 0) {
        var t = "No instance of Session found. Ensure that the 'Session.init' method is called within the 'SuperTokens.init' recipeList.";
        throw t = (0, hr.checkForSSRErrorAndAppendIfNeeded)(t), Error(t);
      }
      return r.instance;
    }, r.reset = function() {
      (0, hr.isTest)() && (r.instance = void 0);
    }, r.RECIPE_ID = "session", r;
  }(oo.default)
);
Ke.Recipe = rs;
Ke.default = rs;
(function(e) {
  var r = p && p.__awaiter || function(O, m, S, N) {
    function v(g) {
      return g instanceof S ? g : new S(function(P) {
        P(g);
      });
    }
    return new (S || (S = Promise))(function(g, P) {
      function A(x) {
        try {
          T(N.next(x));
        } catch (he) {
          P(he);
        }
      }
      function _(x) {
        try {
          T(N.throw(x));
        } catch (he) {
          P(he);
        }
      }
      function T(x) {
        x.done ? g(x.value) : v(x.value).then(A, _);
      }
      T((N = N.apply(O, m || [])).next());
    });
  }, t = p && p.__generator || function(O, m) {
    var S = {
      label: 0,
      sent: function() {
        if (g[0] & 1)
          throw g[1];
        return g[1];
      },
      trys: [],
      ops: []
    }, N, v, g, P;
    return P = { next: A(0), throw: A(1), return: A(2) }, typeof Symbol == "function" && (P[Symbol.iterator] = function() {
      return this;
    }), P;
    function A(T) {
      return function(x) {
        return _([T, x]);
      };
    }
    function _(T) {
      if (N)
        throw new TypeError("Generator is already executing.");
      for (; S; )
        try {
          if (N = 1, v && (g = T[0] & 2 ? v.return : T[0] ? v.throw || ((g = v.return) && g.call(v), 0) : v.next) && !(g = g.call(v, T[1])).done)
            return g;
          switch (v = 0, g && (T = [T[0] & 2, g.value]), T[0]) {
            case 0:
            case 1:
              g = T;
              break;
            case 4:
              return S.label++, { value: T[1], done: !1 };
            case 5:
              S.label++, v = T[1], T = [0];
              continue;
            case 7:
              T = S.ops.pop(), S.trys.pop();
              continue;
            default:
              if (g = S.trys, !(g = g.length > 0 && g[g.length - 1]) && (T[0] === 6 || T[0] === 2)) {
                S = 0;
                continue;
              }
              if (T[0] === 3 && (!g || T[1] > g[0] && T[1] < g[3])) {
                S.label = T[1];
                break;
              }
              if (T[0] === 6 && S.label < g[1]) {
                S.label = g[1], g = T;
                break;
              }
              if (g && S.label < g[2]) {
                S.label = g[2], S.ops.push(T);
                break;
              }
              g[2] && S.ops.pop(), S.trys.pop();
              continue;
          }
          T = m.call(O, S);
        } catch (x) {
          T = [6, x], v = 0;
        } finally {
          N = g = 0;
        }
      if (T[0] & 5)
        throw T[1];
      return { value: T[0] ? T[1] : void 0, done: !0 };
    }
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.getInvalidClaimsFromResponse = e.getClaimValue = e.validateClaims = e.signOut = e.addAxiosInterceptors = e.doesSessionExist = e.attemptRefreshingSession = e.getAccessToken = e.getAccessTokenPayloadSecurely = e.getUserId = e.init = e.BooleanClaim = e.PrimitiveArrayClaim = e.PrimitiveClaim = void 0;
  var i = W, o = Ke, n = (
    /** @class */
    function() {
      function O() {
      }
      return O.init = function(m) {
        return o.default.init(m);
      }, O.getUserId = function(m) {
        return o.default.getInstanceOrThrow().getUserId({
          userContext: (0, i.getNormalisedUserContext)(
            m == null ? void 0 : m.userContext
          )
        });
      }, O.getAccessToken = function(m) {
        return o.default.getInstanceOrThrow().getAccessToken({
          userContext: (0, i.getNormalisedUserContext)(
            m == null ? void 0 : m.userContext
          )
        });
      }, O.getAccessTokenPayloadSecurely = function(m) {
        return r(this, void 0, void 0, function() {
          return t(this, function(S) {
            return [
              2,
              o.default.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                userContext: (0, i.getNormalisedUserContext)(
                  m == null ? void 0 : m.userContext
                )
              })
            ];
          });
        });
      }, O.attemptRefreshingSession = function() {
        return r(this, void 0, void 0, function() {
          return t(this, function(m) {
            return [2, o.default.getInstanceOrThrow().attemptRefreshingSession()];
          });
        });
      }, O.doesSessionExist = function(m) {
        return o.default.getInstanceOrThrow().doesSessionExist({
          userContext: (0, i.getNormalisedUserContext)(
            m == null ? void 0 : m.userContext
          )
        });
      }, O.addAxiosInterceptors = function(m, S) {
        return o.default.addAxiosInterceptors(m, (0, i.getNormalisedUserContext)(S));
      }, O.signOut = function(m) {
        return o.default.getInstanceOrThrow().signOut({
          userContext: (0, i.getNormalisedUserContext)(
            m == null ? void 0 : m.userContext
          )
        });
      }, O.getClaimValue = function(m) {
        return o.default.getInstanceOrThrow().getClaimValue({
          claim: m.claim,
          userContext: (0, i.getNormalisedUserContext)(
            m == null ? void 0 : m.userContext
          )
        });
      }, O.validateClaims = function(m) {
        return o.default.getInstanceOrThrow().validateClaims({
          overrideGlobalClaimValidators: m == null ? void 0 : m.overrideGlobalClaimValidators,
          userContext: (0, i.getNormalisedUserContext)(
            m == null ? void 0 : m.userContext
          )
        });
      }, O.getInvalidClaimsFromResponse = function(m) {
        return o.default.getInstanceOrThrow().getInvalidClaimsFromResponse({
          response: m.response,
          userContext: (0, i.getNormalisedUserContext)(
            m == null ? void 0 : m.userContext
          )
        });
      }, O;
    }()
  );
  e.default = n;
  var a = n.init;
  e.init = a;
  var u = n.getUserId;
  e.getUserId = u;
  var c = n.getAccessTokenPayloadSecurely;
  e.getAccessTokenPayloadSecurely = c;
  var s = n.getAccessToken;
  e.getAccessToken = s;
  var l = n.attemptRefreshingSession;
  e.attemptRefreshingSession = l;
  var d = n.doesSessionExist;
  e.doesSessionExist = d;
  var b = n.addAxiosInterceptors;
  e.addAxiosInterceptors = b;
  var f = n.signOut;
  e.signOut = f;
  var k = n.validateClaims;
  e.validateClaims = k;
  var H = n.getClaimValue;
  e.getClaimValue = H;
  var U = n.getInvalidClaimsFromResponse;
  e.getInvalidClaimsFromResponse = U;
  var M = qn;
  Object.defineProperty(e, "PrimitiveClaim", {
    enumerable: !0,
    get: function() {
      return M.PrimitiveClaim;
    }
  }), Object.defineProperty(e, "PrimitiveArrayClaim", {
    enumerable: !0,
    get: function() {
      return M.PrimitiveArrayClaim;
    }
  }), Object.defineProperty(e, "BooleanClaim", {
    enumerable: !0,
    get: function() {
      return M.BooleanClaim;
    }
  });
})(Lr);
(function(e) {
  function r(t) {
    for (var i in t)
      e.hasOwnProperty(i) || (e[i] = t[i]);
  }
  e.__esModule = !0, r(Lr);
})(Fr);
const qt = /* @__PURE__ */ Dn(Fr);
var ss = {}, vt = {}, Gn = {}, is = {}, os = {};
(function(e) {
  function r(t) {
    for (var i in t)
      e.hasOwnProperty(i) || (e[i] = t[i]);
  }
  e.__esModule = !0, r(Le);
})(os);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CookieHandlerReference = void 0;
  var r = os;
  Object.defineProperty(e, "CookieHandlerReference", {
    enumerable: !0,
    get: function() {
      return r.CookieHandlerReference;
    }
  });
})(is);
var rn = {};
Object.defineProperty(rn, "__esModule", { value: !0 });
rn.PostSuperTokensInitCallbacks = void 0;
var uo = (
  /** @class */
  function() {
    function e() {
    }
    return e.addPostInitCallback = function(r) {
      e.postInitCallbacks.push(r);
    }, e.runPostInitCallbacks = function() {
      for (var r = 0, t = e.postInitCallbacks; r < t.length; r++) {
        var i = t[r];
        i();
      }
    }, e.postInitCallbacks = [], e;
  }()
);
rn.PostSuperTokensInitCallbacks = uo;
var Qe = {}, sn = {}, pt = {}, on = {}, vr = p && p.__awaiter || function(e, r, t, i) {
  function o(n) {
    return n instanceof t ? n : new t(function(a) {
      a(n);
    });
  }
  return new (t || (t = Promise))(function(n, a) {
    function u(l) {
      try {
        s(i.next(l));
      } catch (d) {
        a(d);
      }
    }
    function c(l) {
      try {
        s(i.throw(l));
      } catch (d) {
        a(d);
      }
    }
    function s(l) {
      l.done ? n(l.value) : o(l.value).then(u, c);
    }
    s((i = i.apply(e, r || [])).next());
  });
}, pr = p && p.__generator || function(e, r) {
  var t = {
    label: 0,
    sent: function() {
      if (n[0] & 1)
        throw n[1];
      return n[1];
    },
    trys: [],
    ops: []
  }, i, o, n, a;
  return a = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function u(s) {
    return function(l) {
      return c([s, l]);
    };
  }
  function c(s) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, o && (n = s[0] & 2 ? o.return : s[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, s[1])).done)
          return n;
        switch (o = 0, n && (s = [s[0] & 2, n.value]), s[0]) {
          case 0:
          case 1:
            n = s;
            break;
          case 4:
            return t.label++, { value: s[1], done: !1 };
          case 5:
            t.label++, o = s[1], s = [0];
            continue;
          case 7:
            s = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (n = t.trys, !(n = n.length > 0 && n[n.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              t = 0;
              continue;
            }
            if (s[0] === 3 && (!n || s[1] > n[0] && s[1] < n[3])) {
              t.label = s[1];
              break;
            }
            if (s[0] === 6 && t.label < n[1]) {
              t.label = n[1], n = s;
              break;
            }
            if (n && t.label < n[2]) {
              t.label = n[2], t.ops.push(s);
              break;
            }
            n[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        s = r.call(e, t);
      } catch (l) {
        s = [6, l], o = 0;
      } finally {
        i = n = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
};
Object.defineProperty(on, "__esModule", { value: !0 });
on.normaliseRecipeModuleConfig = void 0;
function lo(e) {
  var r = this, t = e.preAPIHook;
  t === void 0 && (t = function(o) {
    return vr(r, void 0, void 0, function() {
      return pr(this, function(n) {
        return [2, o];
      });
    });
  });
  var i = e.postAPIHook;
  return i === void 0 && (i = function() {
    return vr(r, void 0, void 0, function() {
      return pr(this, function(o) {
        return [
          2
          /*return*/
        ];
      });
    });
  }), {
    recipeId: e.recipeId,
    appInfo: e.appInfo,
    clientType: e.clientType,
    preAPIHook: t,
    postAPIHook: i
  };
}
on.normaliseRecipeModuleConfig = lo;
Object.defineProperty(pt, "__esModule", { value: !0 });
pt.normaliseAuthRecipe = void 0;
var co = on;
function fo(e) {
  return (0, co.normaliseRecipeModuleConfig)(e);
}
pt.normaliseAuthRecipe = fo;
var at = p && p.__assign || function() {
  return at = Object.assign || function(e) {
    for (var r, t = 1, i = arguments.length; t < i; t++) {
      r = arguments[t];
      for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, at.apply(this, arguments);
};
Object.defineProperty(sn, "__esModule", { value: !0 });
sn.normaliseUserInput = void 0;
var ho = pt;
function go(e) {
  var r = at(
    {
      functions: function(t) {
        return t;
      }
    },
    e.override
  );
  return at(at({}, (0, ho.normaliseAuthRecipe)(e)), { override: r });
}
sn.normaliseUserInput = go;
var mt = {}, an = {}, Xe = {};
Object.defineProperty(Xe, "__esModule", { value: !0 });
Xe.supported_fdi = Xe.package_version = void 0;
Xe.package_version = "0.12.0";
Xe.supported_fdi = ["2.0", "3.0"];
var Wn = {}, as = {};
(function(e) {
  function r(i) {
    for (var o in i)
      e.hasOwnProperty(o) || (e[o] = i[o]);
  }
  e.__esModule = !0;
  let t = gt;
  t.default !== void 0 ? r(t) : r({
    default: t,
    ...t
  });
})(as);
Object.defineProperty(Wn, "__esModule", { value: !0 });
var vo = as;
Wn.default = vo.STGeneralError;
var se = p && p.__assign || function() {
  return se = Object.assign || function(e) {
    for (var r, t = 1, i = arguments.length; t < i; t++) {
      r = arguments[t];
      for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, se.apply(this, arguments);
}, ke = p && p.__awaiter || function(e, r, t, i) {
  function o(n) {
    return n instanceof t ? n : new t(function(a) {
      a(n);
    });
  }
  return new (t || (t = Promise))(function(n, a) {
    function u(l) {
      try {
        s(i.next(l));
      } catch (d) {
        a(d);
      }
    }
    function c(l) {
      try {
        s(i.throw(l));
      } catch (d) {
        a(d);
      }
    }
    function s(l) {
      l.done ? n(l.value) : o(l.value).then(u, c);
    }
    s((i = i.apply(e, r || [])).next());
  });
}, Re = p && p.__generator || function(e, r) {
  var t = {
    label: 0,
    sent: function() {
      if (n[0] & 1)
        throw n[1];
      return n[1];
    },
    trys: [],
    ops: []
  }, i, o, n, a;
  return a = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function u(s) {
    return function(l) {
      return c([s, l]);
    };
  }
  function c(s) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, o && (n = s[0] & 2 ? o.return : s[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, s[1])).done)
          return n;
        switch (o = 0, n && (s = [s[0] & 2, n.value]), s[0]) {
          case 0:
          case 1:
            n = s;
            break;
          case 4:
            return t.label++, { value: s[1], done: !1 };
          case 5:
            t.label++, o = s[1], s = [0];
            continue;
          case 7:
            s = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (n = t.trys, !(n = n.length > 0 && n[n.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              t = 0;
              continue;
            }
            if (s[0] === 3 && (!n || s[1] > n[0] && s[1] < n[3])) {
              t.label = s[1];
              break;
            }
            if (s[0] === 6 && t.label < n[1]) {
              t.label = n[1], n = s;
              break;
            }
            if (n && t.label < n[2]) {
              t.label = n[2], t.ops.push(s);
              break;
            }
            n[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        s = r.call(e, t);
      } catch (l) {
        s = [6, l], o = 0;
      } finally {
        i = n = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
};
Object.defineProperty(an, "__esModule", { value: !0 });
var po = Xt, mo = Xe, wo = Wn, yo = (
  /** @class */
  function() {
    function e(t, i) {
      var o = this;
      this.recipeId = t, this.appInfo = i, this.get = function(n, a, u, c, s, l) {
        return ke(o, void 0, void 0, function() {
          var d, b;
          return Re(this, function(f) {
            switch (f.label) {
              case 0:
                return [
                  4,
                  this.fetch(
                    this.getFullUrl(n, a, c),
                    se({ method: "GET" }, u),
                    s,
                    l
                  )
                ];
              case 1:
                return d = f.sent(), [4, this.getResponseJsonOrThrowGeneralError(d)];
              case 2:
                return b = f.sent(), [
                  2,
                  {
                    jsonBody: b,
                    fetchResponse: d
                  }
                ];
            }
          });
        });
      }, this.post = function(n, a, u, c, s) {
        return ke(o, void 0, void 0, function() {
          var l, d;
          return Re(this, function(b) {
            switch (b.label) {
              case 0:
                if (u.body === void 0)
                  throw new Error("Post request must have a body");
                return [
                  4,
                  this.fetch(
                    this.getFullUrl(n, a),
                    se({ method: "POST" }, u),
                    c,
                    s
                  )
                ];
              case 1:
                return l = b.sent(), [4, this.getResponseJsonOrThrowGeneralError(l)];
              case 2:
                return d = b.sent(), [
                  2,
                  {
                    jsonBody: d,
                    fetchResponse: l
                  }
                ];
            }
          });
        });
      }, this.delete = function(n, a, u, c, s) {
        return ke(o, void 0, void 0, function() {
          var l, d;
          return Re(this, function(b) {
            switch (b.label) {
              case 0:
                return [
                  4,
                  this.fetch(
                    this.getFullUrl(n, a),
                    se({ method: "DELETE" }, u),
                    c,
                    s
                  )
                ];
              case 1:
                return l = b.sent(), [4, this.getResponseJsonOrThrowGeneralError(l)];
              case 2:
                return d = b.sent(), [
                  2,
                  {
                    jsonBody: d,
                    fetchResponse: l
                  }
                ];
            }
          });
        });
      }, this.put = function(n, a, u, c, s) {
        return ke(o, void 0, void 0, function() {
          var l, d;
          return Re(this, function(b) {
            switch (b.label) {
              case 0:
                return [
                  4,
                  this.fetch(
                    this.getFullUrl(n, a),
                    se({ method: "PUT" }, u),
                    c,
                    s
                  )
                ];
              case 1:
                return l = b.sent(), [4, this.getResponseJsonOrThrowGeneralError(l)];
              case 2:
                return d = b.sent(), [
                  2,
                  {
                    jsonBody: d,
                    fetchResponse: l
                  }
                ];
            }
          });
        });
      }, this.fetch = function(n, a, u, c) {
        return ke(o, void 0, void 0, function() {
          var s, l, d, b, f, k;
          return Re(this, function(H) {
            switch (H.label) {
              case 0:
                return a === void 0 ? s = {} : s = a.headers, [
                  4,
                  this.callPreAPIHook({
                    preAPIHook: u,
                    url: n,
                    requestInit: se(se({}, a), {
                      headers: se(se({}, s), {
                        "fdi-version": mo.supported_fdi.join(","),
                        "Content-Type": "application/json",
                        rid: this.recipeId
                      })
                    })
                  })
                ];
              case 1:
                return l = H.sent(), d = l.requestInit, b = l.url, [4, fetch(b, d)];
              case 2:
                if (f = H.sent(), f.status >= 300)
                  throw f;
                return c === void 0 ? [3, 4] : (k = f.clone(), [
                  4,
                  c({
                    requestInit: d,
                    url: n,
                    fetchResponse: k
                  })
                ]);
              case 3:
                H.sent(), H.label = 4;
              case 4:
                return [2, f];
            }
          });
        });
      }, this.callPreAPIHook = function(n) {
        return ke(o, void 0, void 0, function() {
          var a;
          return Re(this, function(u) {
            switch (u.label) {
              case 0:
                return n.preAPIHook === void 0 ? [
                  2,
                  {
                    url: n.url,
                    requestInit: n.requestInit
                  }
                ] : [
                  4,
                  n.preAPIHook({
                    url: n.url,
                    requestInit: n.requestInit
                  })
                ];
              case 1:
                return a = u.sent(), [2, a];
            }
          });
        });
      }, this.getFullUrl = function(n, a, u) {
        var c = o.appInfo.apiBasePath.getAsStringDangerous();
        n !== void 0 && n !== "public" && (c = "".concat(c, "/").concat(n));
        var s = new po.default(a), l = "".concat(o.appInfo.apiDomain.getAsStringDangerous()).concat(c).concat(s.getAsStringDangerous());
        return u === void 0 ? l : l + "?" + new URLSearchParams(u);
      }, this.getResponseJsonOrThrowGeneralError = function(n) {
        return ke(o, void 0, void 0, function() {
          var a, u;
          return Re(this, function(c) {
            switch (c.label) {
              case 0:
                return [4, n.clone().json()];
              case 1:
                if (a = c.sent(), a.status === "GENERAL_ERROR")
                  throw u = a.message === void 0 ? "No Error Message Provided" : a.message, new wo.default(u);
                return [2, a];
            }
          });
        });
      };
    }
    var r;
    return r = e, e.preparePreAPIHook = function(t) {
      var i = t.recipePreAPIHook, o = t.action, n = t.options, a = t.userContext;
      return function(u) {
        return ke(void 0, void 0, void 0, function() {
          var c;
          return Re(r, function(s) {
            switch (s.label) {
              case 0:
                return [
                  4,
                  i(
                    se(se({}, u), { action: o, userContext: a })
                  )
                ];
              case 1:
                return c = s.sent(), n === void 0 || n.preAPIHook === void 0 ? [2, c] : [
                  2,
                  n.preAPIHook({
                    url: c.url,
                    requestInit: c.requestInit,
                    userContext: a
                  })
                ];
            }
          });
        });
      };
    }, e.preparePostAPIHook = function(t) {
      var i = t.recipePostAPIHook, o = t.action, n = t.userContext;
      return function(a) {
        return ke(void 0, void 0, void 0, function() {
          return Re(r, function(u) {
            switch (u.label) {
              case 0:
                return [
                  4,
                  i(
                    se(se({}, a), { userContext: n, action: o })
                  )
                ];
              case 1:
                return u.sent(), [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
    }, e;
  }()
);
an.default = yo;
var bo = p && p.__awaiter || function(e, r, t, i) {
  function o(n) {
    return n instanceof t ? n : new t(function(a) {
      a(n);
    });
  }
  return new (t || (t = Promise))(function(n, a) {
    function u(l) {
      try {
        s(i.next(l));
      } catch (d) {
        a(d);
      }
    }
    function c(l) {
      try {
        s(i.throw(l));
      } catch (d) {
        a(d);
      }
    }
    function s(l) {
      l.done ? n(l.value) : o(l.value).then(u, c);
    }
    s((i = i.apply(e, r || [])).next());
  });
}, ko = p && p.__generator || function(e, r) {
  var t = {
    label: 0,
    sent: function() {
      if (n[0] & 1)
        throw n[1];
      return n[1];
    },
    trys: [],
    ops: []
  }, i, o, n, a;
  return a = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function u(s) {
    return function(l) {
      return c([s, l]);
    };
  }
  function c(s) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, o && (n = s[0] & 2 ? o.return : s[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, s[1])).done)
          return n;
        switch (o = 0, n && (s = [s[0] & 2, n.value]), s[0]) {
          case 0:
          case 1:
            n = s;
            break;
          case 4:
            return t.label++, { value: s[1], done: !1 };
          case 5:
            t.label++, o = s[1], s = [0];
            continue;
          case 7:
            s = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (n = t.trys, !(n = n.length > 0 && n[n.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              t = 0;
              continue;
            }
            if (s[0] === 3 && (!n || s[1] > n[0] && s[1] < n[3])) {
              t.label = s[1];
              break;
            }
            if (s[0] === 6 && t.label < n[1]) {
              t.label = n[1], n = s;
              break;
            }
            if (n && t.label < n[2]) {
              t.label = n[2], t.ops.push(s);
              break;
            }
            n[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        s = r.call(e, t);
      } catch (l) {
        s = [6, l], o = 0;
      } finally {
        i = n = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
};
Object.defineProperty(mt, "__esModule", { value: !0 });
mt.getRecipeImplementation = void 0;
var yn = an;
function us(e) {
  var r = new yn.default(e.recipeId, e.appInfo);
  return {
    getTenantId: function() {
    },
    getLoginMethods: function(t) {
      var i = t.tenantId, o = t.options, n = t.userContext;
      return bo(this, void 0, void 0, function() {
        var a, u, c, s, l;
        return ko(this, function(d) {
          switch (d.label) {
            case 0:
              return a = {}, e.clientType !== void 0 && (a.clientType = e.clientType), [
                4,
                r.get(
                  i,
                  "/loginmethods",
                  {},
                  a,
                  yn.default.preparePreAPIHook({
                    recipePreAPIHook: e.preAPIHook,
                    action: "GET_LOGIN_METHODS",
                    options: o,
                    userContext: n
                  }),
                  yn.default.preparePostAPIHook({
                    recipePostAPIHook: e.postAPIHook,
                    action: "GET_LOGIN_METHODS",
                    userContext: n
                  })
                )
              ];
            case 1:
              return u = d.sent(), c = u.jsonBody, s = u.fetchResponse, c.firstFactors === void 0 ? (l = [], c.emailPassword.enabled && l.push("emailpassword"), c.thirdParty.enabled && l.push("thirdparty"), c.passwordless.enabled && (l.push("otp-email"), l.push("otp-phone"), l.push("link-email"), l.push("link-phone"))) : l = c.firstFactors, [
                2,
                {
                  status: "OK",
                  thirdParty: {
                    providers: c.thirdParty.providers
                  },
                  firstFactors: l,
                  fetchResponse: s
                }
              ];
          }
        });
      });
    }
  };
}
mt.default = us;
mt.getRecipeImplementation = us;
var un = {}, Ro = p && p.__extends || /* @__PURE__ */ function() {
  var e = function(r, t) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, o) {
      i.__proto__ = o;
    } || function(i, o) {
      for (var n in o)
        Object.prototype.hasOwnProperty.call(o, n) && (i[n] = o[n]);
    }, e(r, t);
  };
  return function(r, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    e(r, t);
    function i() {
      this.constructor = r;
    }
    r.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i());
  };
}(), Io = p && p.__awaiter || function(e, r, t, i) {
  function o(n) {
    return n instanceof t ? n : new t(function(a) {
      a(n);
    });
  }
  return new (t || (t = Promise))(function(n, a) {
    function u(l) {
      try {
        s(i.next(l));
      } catch (d) {
        a(d);
      }
    }
    function c(l) {
      try {
        s(i.throw(l));
      } catch (d) {
        a(d);
      }
    }
    function s(l) {
      l.done ? n(l.value) : o(l.value).then(u, c);
    }
    s((i = i.apply(e, r || [])).next());
  });
}, So = p && p.__generator || function(e, r) {
  var t = {
    label: 0,
    sent: function() {
      if (n[0] & 1)
        throw n[1];
      return n[1];
    },
    trys: [],
    ops: []
  }, i, o, n, a;
  return a = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function u(s) {
    return function(l) {
      return c([s, l]);
    };
  }
  function c(s) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, o && (n = s[0] & 2 ? o.return : s[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, s[1])).done)
          return n;
        switch (o = 0, n && (s = [s[0] & 2, n.value]), s[0]) {
          case 0:
          case 1:
            n = s;
            break;
          case 4:
            return t.label++, { value: s[1], done: !1 };
          case 5:
            t.label++, o = s[1], s = [0];
            continue;
          case 7:
            s = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (n = t.trys, !(n = n.length > 0 && n[n.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              t = 0;
              continue;
            }
            if (s[0] === 3 && (!n || s[1] > n[0] && s[1] < n[3])) {
              t.label = s[1];
              break;
            }
            if (s[0] === 6 && t.label < n[1]) {
              t.label = n[1], n = s;
              break;
            }
            if (n && t.label < n[2]) {
              t.label = n[2], t.ops.push(s);
              break;
            }
            n[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        s = r.call(e, t);
      } catch (l) {
        s = [6, l], o = 0;
      } finally {
        i = n = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
};
Object.defineProperty(un, "__esModule", { value: !0 });
var To = Yt, _o = Ke, Eo = (
  /** @class */
  function(e) {
    Ro(r, e);
    function r(t) {
      var i = e.call(this, t) || this;
      return i.signOut = function(o) {
        return Io(i, void 0, void 0, function() {
          return So(this, function(n) {
            switch (n.label) {
              case 0:
                return [
                  4,
                  _o.default.getInstanceOrThrow().signOut({
                    userContext: o.userContext
                  })
                ];
              case 1:
                return [2, n.sent()];
            }
          });
        });
      }, i;
    }
    return r;
  }(To.default)
);
un.default = Eo;
var Co = p && p.__extends || /* @__PURE__ */ function() {
  var e = function(r, t) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, o) {
      i.__proto__ = o;
    } || function(i, o) {
      for (var n in o)
        Object.prototype.hasOwnProperty.call(o, n) && (i[n] = o[n]);
    }, e(r, t);
  };
  return function(r, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    e(r, t);
    function i() {
      this.constructor = r;
    }
    r.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i());
  };
}(), jt = p && p.__assign || function() {
  return jt = Object.assign || function(e) {
    for (var r, t = 1, i = arguments.length; t < i; t++) {
      r = arguments[t];
      for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, jt.apply(this, arguments);
};
Object.defineProperty(Qe, "__esModule", { value: !0 });
Qe.Recipe = void 0;
var Ao = sn, Po = je, Oo = mt, mr = W, Do = un, ls = (
  /** @class */
  function(e) {
    Co(r, e);
    function r(t) {
      var i = e.call(this, (0, Ao.normaliseUserInput)(t)) || this, o = new Po.default(
        (0, Oo.default)({
          recipeId: i.config.recipeId,
          appInfo: i.config.appInfo,
          clientType: i.config.clientType,
          preAPIHook: i.config.preAPIHook,
          postAPIHook: i.config.postAPIHook
        })
      );
      return i.recipeImplementation = o.override(i.config.override.functions).build(), i;
    }
    return r.init = function(t) {
      return function(i, o) {
        return r.instance = new r(
          jt(jt({}, t), { recipeId: r.RECIPE_ID, appInfo: i, clientType: o })
        ), r.instance;
      };
    }, r.getInstanceOrThrow = function() {
      if (r.instance === void 0) {
        var t = "No instance of Multitenancy found. Ensure that 'SuperTokens.init' method has been called.";
        throw t = (0, mr.checkForSSRErrorAndAppendIfNeeded)(t), Error(t);
      }
      return r.instance;
    }, r.reset = function() {
      (0, mr.isTest)() && (r.instance = void 0);
    }, r.RECIPE_ID = "multitenancy", r;
  }(Do.default)
);
Qe.Recipe = ls;
Qe.default = ls;
var cs = {}, ds = {};
(function(e) {
  function r(t) {
    for (var i in t)
      e.hasOwnProperty(i) || (e[i] = t[i]);
  }
  e.__esModule = !0, r(we);
})(ds);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.DateProviderReference = void 0;
  var r = ds;
  Object.defineProperty(e, "DateProviderReference", {
    enumerable: !0,
    get: function() {
      return r.DateProviderReference;
    }
  });
})(cs);
Object.defineProperty(Gn, "__esModule", { value: !0 });
var bn = W, Mo = is, xo = Mn, Ho = rn, wr = Qe, Fo = cs, Lo = (
  /** @class */
  function() {
    function e(r) {
      var t = this;
      if (this.recipeList = [], this.appInfo = (0, bn.normaliseInputAppInfoOrThrowError)(r.appInfo), r.recipeList === void 0 || r.recipeList.length === 0)
        throw new Error(
          "Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
        );
      var i = !1;
      r.enableDebugLogs !== void 0 && (i = r.enableDebugLogs);
      var o = !1;
      this.recipeList = r.recipeList.map(function(n) {
        var a = n(t.appInfo, r.clientType, i);
        return a.config.recipeId === wr.Recipe.RECIPE_ID && (o = !0), a;
      }), o || this.recipeList.push(wr.Recipe.init()(this.appInfo, r.clientType, i));
    }
    return e.init = function(r) {
      if (Mo.CookieHandlerReference.init(r.cookieHandler), xo.WindowHandlerReference.init(r.windowHandler), Fo.DateProviderReference.init(r.dateProvider), e.instance !== void 0) {
        console.warn("SuperTokens was already initialized");
        return;
      }
      e.instance = new e(r), Ho.PostSuperTokensInitCallbacks.runPostInitCallbacks();
    }, e.getInstanceOrThrow = function() {
      if (e.instance === void 0) {
        var r = "SuperTokens must be initialized before calling this method.";
        throw r = (0, bn.checkForSSRErrorAndAppendIfNeeded)(r), new Error(r);
      }
      return e.instance;
    }, e.reset = function() {
      if (!(0, bn.isTest)()) {
        console.warn("Calling reset() is only supported during testing");
        return;
      }
      e.instance = void 0;
    }, e;
  }()
);
Gn.default = Lo;
Object.defineProperty(vt, "__esModule", { value: !0 });
vt.init = void 0;
var Uo = Gn, fs = (
  /** @class */
  function() {
    function e() {
    }
    return e.init = function(r) {
      Uo.default.init(r);
    }, e;
  }()
);
vt.default = fs;
vt.init = fs.init;
(function(e) {
  function r(t) {
    for (var i in t)
      e.hasOwnProperty(i) || (e[i] = t[i]);
  }
  e.__esModule = !0, r(vt);
})(ss);
const No = /* @__PURE__ */ Dn(ss);
var wt = {}, Q = {}, yt = {}, ln = {}, ut = p && p.__assign || function() {
  return ut = Object.assign || function(e) {
    for (var r, t = 1, i = arguments.length; t < i; t++) {
      r = arguments[t];
      for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, ut.apply(this, arguments);
};
Object.defineProperty(ln, "__esModule", { value: !0 });
ln.normaliseUserInput = void 0;
var qo = pt;
function jo(e) {
  var r = ut(
    {
      functions: function(t) {
        return t;
      }
    },
    e.override
  );
  return ut(ut({}, (0, qo.normaliseAuthRecipe)(e)), { override: r });
}
ln.normaliseUserInput = jo;
var bt = {}, $t = p && p.__assign || function() {
  return $t = Object.assign || function(e) {
    for (var r, t = 1, i = arguments.length; t < i; t++) {
      r = arguments[t];
      for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, $t.apply(this, arguments);
}, st = p && p.__awaiter || function(e, r, t, i) {
  function o(n) {
    return n instanceof t ? n : new t(function(a) {
      a(n);
    });
  }
  return new (t || (t = Promise))(function(n, a) {
    function u(l) {
      try {
        s(i.next(l));
      } catch (d) {
        a(d);
      }
    }
    function c(l) {
      try {
        s(i.throw(l));
      } catch (d) {
        a(d);
      }
    }
    function s(l) {
      l.done ? n(l.value) : o(l.value).then(u, c);
    }
    s((i = i.apply(e, r || [])).next());
  });
}, it = p && p.__generator || function(e, r) {
  var t = {
    label: 0,
    sent: function() {
      if (n[0] & 1)
        throw n[1];
      return n[1];
    },
    trys: [],
    ops: []
  }, i, o, n, a;
  return a = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function u(s) {
    return function(l) {
      return c([s, l]);
    };
  }
  function c(s) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (i = 1, o && (n = s[0] & 2 ? o.return : s[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, s[1])).done)
          return n;
        switch (o = 0, n && (s = [s[0] & 2, n.value]), s[0]) {
          case 0:
          case 1:
            n = s;
            break;
          case 4:
            return t.label++, { value: s[1], done: !1 };
          case 5:
            t.label++, o = s[1], s = [0];
            continue;
          case 7:
            s = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (n = t.trys, !(n = n.length > 0 && n[n.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              t = 0;
              continue;
            }
            if (s[0] === 3 && (!n || s[1] > n[0] && s[1] < n[3])) {
              t.label = s[1];
              break;
            }
            if (s[0] === 6 && t.label < n[1]) {
              t.label = n[1], n = s;
              break;
            }
            if (n && t.label < n[2]) {
              t.label = n[2], t.ops.push(s);
              break;
            }
            n[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        s = r.call(e, t);
      } catch (l) {
        s = [6, l], o = 0;
      } finally {
        i = n = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
};
Object.defineProperty(bt, "__esModule", { value: !0 });
bt.getRecipeImplementation = void 0;
var ce = an, Ct = Qe, At = W;
function hs(e) {
  var r = new ce.default(e.recipeId, e.appInfo);
  return {
    submitNewPassword: function(t) {
      var i = t.formFields, o = t.options, n = t.userContext;
      return st(this, void 0, void 0, function() {
        var a, u, c, s, l;
        return it(this, function(d) {
          switch (d.label) {
            case 0:
              return a = this.getTenantIdFromURL({ userContext: n }), u = this.getResetPasswordTokenFromURL({
                userContext: n
              }), [
                4,
                r.post(
                  a,
                  "/user/password/reset",
                  { body: JSON.stringify({ formFields: i, token: u, method: "token" }) },
                  ce.default.preparePreAPIHook({
                    recipePreAPIHook: e.preAPIHook,
                    action: "SUBMIT_NEW_PASSWORD",
                    options: o,
                    userContext: n
                  }),
                  ce.default.preparePostAPIHook({
                    recipePostAPIHook: e.postAPIHook,
                    action: "SUBMIT_NEW_PASSWORD",
                    userContext: n
                  })
                )
              ];
            case 1:
              return c = d.sent(), s = c.jsonBody, l = c.fetchResponse, s.status === "FIELD_ERROR" ? [
                2,
                {
                  status: "FIELD_ERROR",
                  formFields: s.formFields,
                  fetchResponse: l
                }
              ] : s.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR" ? [
                2,
                {
                  status: s.status,
                  fetchResponse: l
                }
              ] : [2, $t($t({}, s), { fetchResponse: l })];
          }
        });
      });
    },
    sendPasswordResetEmail: function(t) {
      var i = t.formFields, o = t.options, n = t.userContext;
      return st(this, void 0, void 0, function() {
        var a, u, c, s, l;
        return it(this, function(d) {
          switch (d.label) {
            case 0:
              return l = (s = r).post, [
                4,
                Ct.default.getInstanceOrThrow().recipeImplementation.getTenantId({ userContext: n })
              ];
            case 1:
              return [
                4,
                l.apply(s, [
                  d.sent(),
                  "/user/password/reset/token",
                  { body: JSON.stringify({ formFields: i }) },
                  ce.default.preparePreAPIHook({
                    recipePreAPIHook: e.preAPIHook,
                    action: "SEND_RESET_PASSWORD_EMAIL",
                    options: o,
                    userContext: n
                  }),
                  ce.default.preparePostAPIHook({
                    recipePostAPIHook: e.postAPIHook,
                    action: "SEND_RESET_PASSWORD_EMAIL",
                    userContext: n
                  })
                ])
              ];
            case 2:
              return a = d.sent(), u = a.jsonBody, c = a.fetchResponse, u.status === "FIELD_ERROR" ? [
                2,
                {
                  status: "FIELD_ERROR",
                  formFields: u.formFields,
                  fetchResponse: c
                }
              ] : u.status === "PASSWORD_RESET_NOT_ALLOWED" ? [
                2,
                {
                  status: u.status,
                  reason: u.reason,
                  fetchResponse: c
                }
              ] : [
                2,
                {
                  status: u.status,
                  fetchResponse: c
                }
              ];
          }
        });
      });
    },
    signUp: function(t) {
      var i = t.formFields, o = t.options, n = t.userContext;
      return st(this, void 0, void 0, function() {
        var a, u, c, s, l;
        return it(this, function(d) {
          switch (d.label) {
            case 0:
              return l = (s = r).post, [
                4,
                Ct.default.getInstanceOrThrow().recipeImplementation.getTenantId({ userContext: n })
              ];
            case 1:
              return [
                4,
                l.apply(s, [
                  d.sent(),
                  "/signup",
                  { body: JSON.stringify({ formFields: i }) },
                  ce.default.preparePreAPIHook({
                    recipePreAPIHook: e.preAPIHook,
                    action: "EMAIL_PASSWORD_SIGN_UP",
                    options: o,
                    userContext: n
                  }),
                  ce.default.preparePostAPIHook({
                    recipePostAPIHook: e.postAPIHook,
                    action: "EMAIL_PASSWORD_SIGN_UP",
                    userContext: n
                  })
                ])
              ];
            case 2:
              return a = d.sent(), u = a.jsonBody, c = a.fetchResponse, u.status === "FIELD_ERROR" ? [
                2,
                {
                  status: "FIELD_ERROR",
                  formFields: u.formFields,
                  fetchResponse: c
                }
              ] : u.status === "SIGN_UP_NOT_ALLOWED" ? [
                2,
                {
                  status: "SIGN_UP_NOT_ALLOWED",
                  reason: u.reason,
                  fetchResponse: c
                }
              ] : [
                2,
                {
                  status: u.status,
                  user: (0, At.normaliseUser)("emailpassword", u.user),
                  fetchResponse: c
                }
              ];
          }
        });
      });
    },
    signIn: function(t) {
      var i = t.formFields, o = t.options, n = t.userContext;
      return st(this, void 0, void 0, function() {
        var a, u, c, s, l;
        return it(this, function(d) {
          switch (d.label) {
            case 0:
              return l = (s = r).post, [
                4,
                Ct.default.getInstanceOrThrow().recipeImplementation.getTenantId({ userContext: n })
              ];
            case 1:
              return [
                4,
                l.apply(s, [
                  d.sent(),
                  "/signin",
                  { body: JSON.stringify({ formFields: i }) },
                  ce.default.preparePreAPIHook({
                    recipePreAPIHook: e.preAPIHook,
                    action: "EMAIL_PASSWORD_SIGN_IN",
                    options: o,
                    userContext: n
                  }),
                  ce.default.preparePostAPIHook({
                    recipePostAPIHook: e.postAPIHook,
                    action: "EMAIL_PASSWORD_SIGN_IN",
                    userContext: n
                  })
                ])
              ];
            case 2:
              return a = d.sent(), u = a.jsonBody, c = a.fetchResponse, u.status === "FIELD_ERROR" ? [
                2,
                {
                  status: "FIELD_ERROR",
                  formFields: u.formFields,
                  fetchResponse: c
                }
              ] : u.status === "WRONG_CREDENTIALS_ERROR" ? [
                2,
                {
                  status: "WRONG_CREDENTIALS_ERROR",
                  fetchResponse: c
                }
              ] : u.status === "SIGN_IN_NOT_ALLOWED" ? [
                2,
                {
                  status: "SIGN_IN_NOT_ALLOWED",
                  reason: u.reason,
                  fetchResponse: c
                }
              ] : [
                2,
                {
                  status: "OK",
                  user: (0, At.normaliseUser)("emailpassword", u.user),
                  fetchResponse: c
                }
              ];
          }
        });
      });
    },
    doesEmailExist: function(t) {
      var i = t.email, o = t.options, n = t.userContext;
      return st(this, void 0, void 0, function() {
        var a, u, c, s, l;
        return it(this, function(d) {
          switch (d.label) {
            case 0:
              return l = (s = r).get, [
                4,
                Ct.default.getInstanceOrThrow().recipeImplementation.getTenantId({ userContext: n })
              ];
            case 1:
              return [
                4,
                l.apply(s, [
                  d.sent(),
                  "/emailpassword/email/exists",
                  {},
                  { email: i },
                  ce.default.preparePreAPIHook({
                    recipePreAPIHook: e.preAPIHook,
                    action: "EMAIL_EXISTS",
                    options: o,
                    userContext: n
                  }),
                  ce.default.preparePostAPIHook({
                    recipePostAPIHook: e.postAPIHook,
                    action: "EMAIL_EXISTS",
                    userContext: n
                  })
                ])
              ];
            case 2:
              return a = d.sent(), u = a.jsonBody, c = a.fetchResponse, [
                2,
                {
                  status: u.status,
                  doesExist: u.exists,
                  fetchResponse: c
                }
              ];
          }
        });
      });
    },
    getResetPasswordTokenFromURL: function() {
      var t = (0, At.getQueryParams)("token");
      return t === void 0 ? "" : t;
    },
    getTenantIdFromURL: function() {
      return (0, At.getQueryParams)("tenantId");
    }
  };
}
bt.default = hs;
bt.getRecipeImplementation = hs;
var $o = p && p.__extends || /* @__PURE__ */ function() {
  var e = function(r, t) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, o) {
      i.__proto__ = o;
    } || function(i, o) {
      for (var n in o)
        Object.prototype.hasOwnProperty.call(o, n) && (i[n] = o[n]);
    }, e(r, t);
  };
  return function(r, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    e(r, t);
    function i() {
      this.constructor = r;
    }
    r.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i());
  };
}(), Vt = p && p.__assign || function() {
  return Vt = Object.assign || function(e) {
    for (var r, t = 1, i = arguments.length; t < i; t++) {
      r = arguments[t];
      for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, Vt.apply(this, arguments);
};
Object.defineProperty(yt, "__esModule", { value: !0 });
yt.Recipe = void 0;
var Vo = ln, Bo = bt, Go = je, yr = W, Wo = un, gs = (
  /** @class */
  function(e) {
    $o(r, e);
    function r(t) {
      var i = e.call(this, (0, Vo.normaliseUserInput)(t)) || this, o = new Go.default(
        (0, Bo.default)({
          recipeId: i.config.recipeId,
          appInfo: i.config.appInfo,
          clientType: i.config.clientType,
          preAPIHook: i.config.preAPIHook,
          postAPIHook: i.config.postAPIHook
        })
      );
      return i.recipeImplementation = o.override(i.config.override.functions).build(), i;
    }
    return r.init = function(t) {
      return function(i, o) {
        return r.instance = new r(
          Vt(Vt({}, t), { recipeId: r.RECIPE_ID, clientType: o, appInfo: i })
        ), r.instance;
      };
    }, r.getInstanceOrThrow = function() {
      if (r.instance === void 0) {
        var t = "No instance of EmailPassword found. Ensure that the 'EmailPassword.init' method is called within the 'SuperTokens.init' recipeList.";
        throw t = (0, yr.checkForSSRErrorAndAppendIfNeeded)(t), Error(t);
      }
      return r.instance;
    }, r.reset = function() {
      (0, yr.isTest)() && (r.instance = void 0);
    }, r.RECIPE_ID = "emailpassword", r;
  }(Wo.default)
);
yt.Recipe = gs;
yt.default = gs;
var ee = p && p.__assign || function() {
  return ee = Object.assign || function(e) {
    for (var r, t = 1, i = arguments.length; t < i; t++) {
      r = arguments[t];
      for (var o in r)
        Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
    }
    return e;
  }, ee.apply(this, arguments);
};
Object.defineProperty(Q, "__esModule", { value: !0 });
Q.signOut = Q.getTenantIdFromURL = Q.getResetPasswordTokenFromURL = Q.doesEmailExist = Q.signIn = Q.signUp = Q.sendPasswordResetEmail = Q.submitNewPassword = Q.init = void 0;
var Ie = yt, Ce = W, ye = (
  /** @class */
  function() {
    function e() {
    }
    return e.init = function(r) {
      return Ie.default.init(r);
    }, e.signOut = function(r) {
      return Ie.default.getInstanceOrThrow().signOut({
        userContext: (0, Ce.getNormalisedUserContext)(
          r == null ? void 0 : r.userContext
        )
      });
    }, e.submitNewPassword = function(r) {
      return Ie.default.getInstanceOrThrow().recipeImplementation.submitNewPassword(
        ee(ee({}, r), { userContext: (0, Ce.getNormalisedUserContext)(r.userContext) })
      );
    }, e.sendPasswordResetEmail = function(r) {
      return Ie.default.getInstanceOrThrow().recipeImplementation.sendPasswordResetEmail(
        ee(ee({}, r), { userContext: (0, Ce.getNormalisedUserContext)(r.userContext) })
      );
    }, e.signUp = function(r) {
      return Ie.default.getInstanceOrThrow().recipeImplementation.signUp(
        ee(ee({}, r), { userContext: (0, Ce.getNormalisedUserContext)(r.userContext) })
      );
    }, e.signIn = function(r) {
      return Ie.default.getInstanceOrThrow().recipeImplementation.signIn(
        ee(ee({}, r), { userContext: (0, Ce.getNormalisedUserContext)(r.userContext) })
      );
    }, e.doesEmailExist = function(r) {
      return Ie.default.getInstanceOrThrow().recipeImplementation.doesEmailExist(
        ee(ee({}, r), { userContext: (0, Ce.getNormalisedUserContext)(r.userContext) })
      );
    }, e.getResetPasswordTokenFromURL = function(r) {
      return Ie.default.getInstanceOrThrow().recipeImplementation.getResetPasswordTokenFromURL(
        ee(ee({}, r), {
          userContext: (0, Ce.getNormalisedUserContext)(
            r == null ? void 0 : r.userContext
          )
        })
      );
    }, e.getTenantIdFromURL = function(r) {
      return Ie.default.getInstanceOrThrow().recipeImplementation.getTenantIdFromURL(
        ee(ee({}, r), {
          userContext: (0, Ce.getNormalisedUserContext)(
            r == null ? void 0 : r.userContext
          )
        })
      );
    }, e;
  }()
);
Q.default = ye;
var Xo = ye.init;
Q.init = Xo;
var zo = ye.submitNewPassword;
Q.submitNewPassword = zo;
var Jo = ye.sendPasswordResetEmail;
Q.sendPasswordResetEmail = Jo;
var Ko = ye.signUp;
Q.signUp = Ko;
var Qo = ye.signIn;
Q.signIn = Qo;
var Yo = ye.doesEmailExist;
Q.doesEmailExist = Yo;
var Zo = ye.signOut;
Q.signOut = Zo;
var ea = ye.getResetPasswordTokenFromURL;
Q.getResetPasswordTokenFromURL = ea;
var ta = ye.getTenantIdFromURL;
Q.getTenantIdFromURL = ta;
(function(e) {
  function r(t) {
    for (var i in t)
      e.hasOwnProperty(i) || (e[i] = t[i]);
  }
  e.__esModule = !0, r(Q);
})(wt);
const na = /* @__PURE__ */ Dn(wt);
let br = !1;
const vs = () => {
  br || (No.init({
    appInfo: {
      apiDomain: "http://localhost:3001",
      apiBasePath: "",
      appName: "Hacking With SuperTokens"
    },
    recipeList: [qt.init(), na.init()]
  }), br = !0);
};
var ra = /* @__PURE__ */ ft("<button>Session Info"), sa = /* @__PURE__ */ ft("<button>Sign Out"), ia = /* @__PURE__ */ ft("<div><h2>Dashboard</h2><div class=form-wrap part=st-dashboard>");
function oa(e) {
  vs();
  const [r, t] = Dt(!0), i = async () => {
    const a = await (await fetch("http://localhost:3001/sessioninfo", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET",
      credentials: "include"
    })).json();
    alert(JSON.stringify(a));
  };
  async function o() {
    await qt.signOut(), e.navigate("/");
  }
  return Sr(async () => {
    await qt.doesSessionExist() ? t(!1) : e.navigate("/");
  }), Ge(Hr, {
    get children() {
      var n = ia(), a = n.firstChild, u = a.nextSibling;
      return a.style.setProperty("text-align", "center"), Ht(u, Ge(Kn, {
        get when() {
          return r();
        },
        children: "Loading..."
      }), null), Ht(u, Ge(Kn, {
        get when() {
          return !r();
        },
        get children() {
          return [(() => {
            var c = ra();
            return c.$$click = i, c;
          })(), (() => {
            var c = sa();
            return c.$$click = o, c;
          })()];
        }
      }), null), n;
    }
  });
}
function aa(e) {
  xr("c-dashboard", {}, () => (Mr(), Ge(oa, {
    navigate: e
  })));
}
Pr(["click"]);
var ua = /* @__PURE__ */ ft("<div class=form-wrap part=st-email-password><input type=email placeholder=Email><input type=password placeholder=Password><button>Sign Up</button><button>Sign In");
async function la(e, r, t) {
  try {
    let i = await wt.signUp({
      formFields: [{
        id: "email",
        value: e
      }, {
        id: "password",
        value: r
      }]
    });
    console.log(e, r), i.status === "FIELD_ERROR" ? i.formFields.forEach((o) => {
      (o.id === "email" || o.id === "password") && window.alert(o.error);
    }) : i.status === "SIGN_UP_NOT_ALLOWED" ? window.alert(i.reason) : t("/dashboard/");
  } catch (i) {
    console.log(i), i.isSuperTokensGeneralError === !0 ? window.alert(i.message) : window.alert("Oops! Something went wrong.");
  }
}
async function kr(e) {
  try {
    return await wt.doesEmailExist({
      email: e
    });
  } catch (r) {
    r.isSuperTokensGeneralError === !0 ? window.alert(r.message) : window.alert("Oops! Something went wrong.");
  }
}
async function ca(e, r, t) {
  try {
    let i = await wt.signIn({
      formFields: [{
        id: "email",
        value: e
      }, {
        id: "password",
        value: r
      }]
    });
    i.status === "FIELD_ERROR" ? i.formFields.forEach((o) => {
      o.id === "email" && window.alert(o.error);
    }) : i.status === "WRONG_CREDENTIALS_ERROR" ? window.alert("Email password combination is incorrect.") : i.status === "SIGN_IN_NOT_ALLOWED" ? window.alert(i.reason) : t("/dashboard/");
  } catch (i) {
    i.isSuperTokensGeneralError === !0 ? window.alert(i.message) : window.alert("Oops! Something went wrong.");
  }
}
function da(e) {
  vs();
  const [r, t] = Dt(""), [i, o] = Dt(""), n = async () => {
    const u = await kr(r());
    u != null && u.doesExist ? window.alert("Email already exists. Please sign in instead") : la(r(), i(), e.navigate);
  }, a = async () => {
    const u = await kr(r());
    u != null && u.doesExist ? ca(r(), i(), e.navigate) : window.alert("Email does not exist. Please sign up instead");
  };
  return Sr(async () => {
    await qt.doesSessionExist() && e.navigate("/dashboard/");
  }), Ge(Hr, {
    get children() {
      var u = ua(), c = u.firstChild, s = c.nextSibling, l = s.nextSibling, d = l.nextSibling;
      return c.$$input = (b) => t(b.target.value), s.$$input = (b) => o(b.target.value), l.$$click = n, d.$$click = a, u;
    }
  });
}
function fa(e) {
  xr("c-email-password", {}, () => (Mr(), Ge(da, {
    navigate: e
  })));
}
Pr(["input", "click"]);
const ga = {
  registerEmailPassword: fa,
  registerDashboard: aa
};
export {
  ga as default
};
