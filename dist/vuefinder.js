var or = Object.defineProperty;
var rr = (n, e, s) => e in n ? or(n, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[e] = s;
var Tn = (n, e, s) => rr(n, typeof e != "symbol" ? e + "" : e, s);
import { reactive as $t, watch as Le, ref as F, shallowRef as ar, onMounted as Ee, onUnmounted as Qn, onUpdated as Bs, nextTick as _t, computed as je, inject as le, createElementBlock as b, openBlock as m, withKeys as It, unref as a, createElementVNode as l, withModifiers as et, renderSlot as Ot, normalizeClass as de, toDisplayString as w, createBlock as X, resolveDynamicComponent as Ns, withCtx as ne, createVNode as W, createCommentVNode as j, Fragment as ke, renderList as Ce, withDirectives as he, vModelCheckbox as Zt, createTextVNode as Q, vModelSelect as bs, vModelText as Rt, onBeforeUnmount as Ps, customRef as lr, vShow as Ge, isRef as ir, TransitionGroup as cr, normalizeStyle as vn, mergeModels as dr, useModel as qs, resolveComponent as ur, provide as fr, Transition as vr } from "vue";
import _r from "mitt";
import mr from "dragselect";
import pr from "@uppy/core";
import hr from "@uppy/xhr-upload";
import gr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import br from "cropperjs";
var Hs;
const An = (Hs = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Hs.getAttribute("content");
class wr {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    Tn(this, "config");
    Tn(this, "customFetch", async (...e) => {
      let [s, r] = e;
      this.config.fetchRequestInterceptor && (r = this.config.fetchRequestInterceptor(r));
      let o = await fetch(s, r);
      return this.config.fetchResponseInterceptor && (o = await this.config.fetchResponseInterceptor(o)), o;
    });
    this.config = e;
  }
  /** @type {RequestConfig} */
  get config() {
    return this.config;
  }
  /**
   * Transform request params
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {Record<String,?String>|FormData=} input.body
   * @return {RequestTransformResultInternal}
   */
  transformRequestParams(e) {
    const s = this.config, r = {};
    An != null && An !== "" && (r[s.xsrfHeaderName] = An);
    const o = Object.assign({}, s.headers, r, e.headers), c = Object.assign({}, s.params, e.params), d = e.body, f = s.baseUrl + e.url, i = e.method;
    let v;
    i !== "get" && (d instanceof FormData ? (v = d, s.body != null && Object.entries(this.config.body).forEach(([u, p]) => {
      v.append(u, p);
    })) : (v = { ...d }, s.body != null && Object.assign(v, this.config.body)));
    const _ = {
      url: f,
      method: i,
      headers: o,
      params: c,
      body: v
    };
    if (s.transformRequest != null) {
      const u = s.transformRequest({
        url: f,
        method: i,
        headers: o,
        params: c,
        body: v
      });
      u.url != null && (_.url = u.url), u.method != null && (_.method = u.method), u.params != null && (_.params = u.params ?? {}), u.headers != null && (_.headers = u.headers ?? {}), u.body != null && (_.body = u.body);
    }
    return _;
  }
  /**
   * Get download url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getDownloadUrl(e, s) {
    if (s.url != null)
      return s.url;
    const r = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: s.path }
    });
    return r.url + "?" + new URLSearchParams(r.params).toString();
  }
  /**
   * Get preview url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getPreviewUrl(e, s) {
    if (s.url != null)
      return s.url;
    const r = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: e, path: s.path }
    });
    return r.url + "?" + new URLSearchParams(r.params).toString();
  }
  /**
   * Send request
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {(Record<String,?String>|FormData|null)=} input.body
   * @param {'arrayBuffer'|'blob'|'json'|'text'=} input.responseType
   * @param {AbortSignal=} input.abortSignal
   * @returns {Promise<(ArrayBuffer|Blob|Record<String,?String>|String|null)>}
   * @throws {Record<String,?String>|null} resp json error
   */
  async send(e) {
    const s = this.transformRequestParams(e), r = e.responseType || "json", o = {
      method: e.method,
      headers: s.headers,
      signal: e.abortSignal
    }, c = s.url + "?" + new URLSearchParams(s.params);
    if (s.method !== "get" && s.body != null) {
      let f;
      s.body instanceof FormData ? f = e.body : (f = JSON.stringify(s.body), o.headers["Content-Type"] = "application/json"), o.body = f;
    }
    this.config.fetchParams && Object.assign(o, this.config.fetchParams);
    const d = await this.customFetch(c, o);
    if (d.ok)
      return await d[r]();
    throw await d.json();
  }
}
function yr(n) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token",
    fetchParams: {}
  };
  return typeof n == "string" ? Object.assign(e, { baseUrl: n }) : Object.assign(e, n), new wr(e);
}
function kr(n) {
  let e = localStorage.getItem(n + "_storage");
  const s = $t(JSON.parse(e ?? "{}"));
  Le(s, r);
  function r() {
    Object.keys(s).length ? localStorage.setItem(n + "_storage", JSON.stringify(s)) : localStorage.removeItem(n + "_storage");
  }
  function o(i, v) {
    s[i] = v;
  }
  function c(i) {
    delete s[i];
  }
  function d() {
    Object.keys(s).map((i) => c(i));
  }
  return { getStore: (i, v = null) => s.hasOwnProperty(i) ? s[i] : v, setStore: o, removeStore: c, clearStore: d };
}
async function xr(n, e) {
  const s = e[n];
  return typeof s == "function" ? (await s()).default : s;
}
function Sr(n, e, s, r) {
  const { getStore: o, setStore: c } = n, d = F({}), f = F(o("locale", e)), i = (u, p = e) => {
    xr(u, r).then((h) => {
      d.value = h, c("locale", u), f.value = u, c("translations", h), Object.values(r).length > 1 && (s.emit("vf-toast-push", { label: "The language is set to " + u }), s.emit("vf-language-saved"));
    }).catch((h) => {
      p ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), i(p, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Le(f, (u) => {
    i(u);
  }), !o("locale") && !r.length ? i(e) : d.value = o("translations");
  const v = (u, ...p) => p.length ? v(u = u.replace("%s", p.shift()), ...p) : u;
  function _(u, ...p) {
    return d.value && d.value.hasOwnProperty(u) ? v(d.value[u], ...p) : v(u, ...p);
  }
  return $t({ t: _, locale: f });
}
const _e = {
  EDIT: "edit",
  NEW_FILE: "newfile",
  NEW_FOLDER: "newfolder",
  PREVIEW: "preview",
  ARCHIVE: "archive",
  UNARCHIVE: "unarchive",
  SEARCH: "search",
  RENAME: "rename",
  UPLOAD: "upload",
  DELETE: "delete",
  FULL_SCREEN: "fullscreen",
  DOWNLOAD: "download",
  LANGUAGE: "language"
}, $r = Object.values(_e), Cr = "2.8.0";
function zs(n, e, s, r, o) {
  return (e = Math, s = e.log, r = 1024, o = s(n) / s(r) | 0, n / e.pow(r, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "iB" : "B");
}
function js(n, e, s, r, o) {
  return (e = Math, s = e.log, r = 1e3, o = s(n) / s(r) | 0, n / e.pow(r, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "B" : "B");
}
function Er(n) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  return r[1] * Math.pow(1024, e[r[2].toLowerCase()]);
}
const rt = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function Tr(n, e) {
  const s = F(rt.SYSTEM), r = F(rt.LIGHT);
  s.value = n.getStore("theme", e ?? rt.SYSTEM);
  const o = window.matchMedia("(prefers-color-scheme: dark)"), c = (d) => {
    s.value === rt.DARK || s.value === rt.SYSTEM && d.matches ? r.value = rt.DARK : r.value = rt.LIGHT;
  };
  return c(o), o.addEventListener("change", c), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: s,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: r,
    /**
     * @param {Theme} value
     */
    set(d) {
      s.value = d, d !== rt.SYSTEM ? n.setStore("theme", d) : n.removeStore("theme"), c(o);
    }
  };
}
function Ar() {
  const n = ar(null), e = F(!1), s = F();
  return { visible: e, type: n, data: s, open: (c, d = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, n.value = c, s.value = d;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, n.value = null;
  } };
}
/*!
 * OverlayScrollbars
 * Version: 2.11.1
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
const Fe = (n, e) => {
  const { o: s, i: r, u: o } = n;
  let c = s, d;
  const f = (_, u) => {
    const p = c, h = _, g = u || (r ? !r(p, h) : p !== h);
    return (g || o) && (c = h, d = p), [c, g, d];
  };
  return [e ? (_) => f(e(c, d), _) : f, (_) => [c, !!_, d]];
}, Dr = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, Ve = Dr ? window : {}, Gs = Math.max, Mr = Math.min, Rn = Math.round, on = Math.abs, ws = Math.sign, Ws = Ve.cancelAnimationFrame, es = Ve.requestAnimationFrame, rn = Ve.setTimeout, Un = Ve.clearTimeout, _n = (n) => typeof Ve[n] < "u" ? Ve[n] : void 0, Or = _n("MutationObserver"), ys = _n("IntersectionObserver"), ht = _n("ResizeObserver"), Mt = _n("ScrollTimeline"), ts = (n) => n === void 0, mn = (n) => n === null, Ye = (n) => typeof n == "number", Ut = (n) => typeof n == "string", pn = (n) => typeof n == "boolean", Be = (n) => typeof n == "function", Ke = (n) => Array.isArray(n), an = (n) => typeof n == "object" && !Ke(n) && !mn(n), ns = (n) => {
  const e = !!n && n.length, s = Ye(e) && e > -1 && e % 1 == 0;
  return Ke(n) || !Be(n) && s ? e > 0 && an(n) ? e - 1 in n : !0 : !1;
}, ln = (n) => !!n && n.constructor === Object, cn = (n) => n instanceof HTMLElement, hn = (n) => n instanceof Element;
function ie(n, e) {
  if (ns(n))
    for (let s = 0; s < n.length && e(n[s], s, n) !== !1; s++)
      ;
  else n && ie(Object.keys(n), (s) => e(n[s], s, n));
  return n;
}
const Ys = (n, e) => n.indexOf(e) >= 0, Lt = (n, e) => n.concat(e), ge = (n, e, s) => (!Ut(e) && ns(e) ? Array.prototype.push.apply(n, e) : n.push(e), n), ct = (n) => Array.from(n || []), ss = (n) => Ke(n) ? n : !Ut(n) && ns(n) ? ct(n) : [n], Hn = (n) => !!n && !n.length, Bn = (n) => ct(new Set(n)), Re = (n, e, s) => {
  ie(n, (o) => o ? o.apply(void 0, e || []) : !0), s || (n.length = 0);
}, Ks = "paddingTop", Xs = "paddingRight", Zs = "paddingLeft", Js = "paddingBottom", Qs = "marginLeft", eo = "marginRight", to = "marginBottom", no = "overflowX", so = "overflowY", gn = "width", bn = "height", at = "visible", vt = "hidden", kt = "scroll", Lr = (n) => {
  const e = String(n || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, wn = (n, e, s, r) => {
  if (n && e) {
    let o = !0;
    return ie(s, (c) => {
      const d = n[c], f = e[c];
      d !== f && (o = !1);
    }), o;
  }
  return !1;
}, oo = (n, e) => wn(n, e, ["w", "h"]), tn = (n, e) => wn(n, e, ["x", "y"]), Vr = (n, e) => wn(n, e, ["t", "r", "b", "l"]), lt = () => {
}, Z = (n, ...e) => n.bind(0, ...e), gt = (n) => {
  let e;
  const s = n ? rn : es, r = n ? Un : Ws;
  return [(o) => {
    r(e), e = s(() => o(), Be(n) ? n() : n);
  }, () => r(e)];
}, dn = (n, e) => {
  const { _: s, p: r, v: o, S: c } = e || {};
  let d, f, i, v, _ = lt;
  const u = function(S) {
    _(), Un(d), v = d = f = void 0, _ = lt, n.apply(this, S);
  }, p = (y) => c && f ? c(f, y) : y, h = () => {
    _ !== lt && u(p(i) || i);
  }, g = function() {
    const S = ct(arguments), D = Be(s) ? s() : s;
    if (Ye(D) && D >= 0) {
      const V = Be(r) ? r() : r, k = Ye(V) && V >= 0, O = D > 0 ? rn : es, R = D > 0 ? Un : Ws, x = p(S) || S, T = u.bind(0, x);
      let A;
      _(), o && !v ? (T(), v = !0, A = O(() => v = void 0, D)) : (A = O(T, D), k && !d && (d = rn(h, V))), _ = () => R(A), f = i = x;
    } else
      u(S);
  };
  return g.m = h, g;
}, ro = (n, e) => Object.prototype.hasOwnProperty.call(n, e), Ne = (n) => n ? Object.keys(n) : [], re = (n, e, s, r, o, c, d) => {
  const f = [e, s, r, o, c, d];
  return (typeof n != "object" || mn(n)) && !Be(n) && (n = {}), ie(f, (i) => {
    ie(i, (v, _) => {
      const u = i[_];
      if (n === u)
        return !0;
      const p = Ke(u);
      if (u && ln(u)) {
        const h = n[_];
        let g = h;
        p && !Ke(h) ? g = [] : !p && !ln(h) && (g = {}), n[_] = re(g, u);
      } else
        n[_] = p ? u.slice() : u;
    });
  }), n;
}, ao = (n, e) => ie(re({}, n), (s, r, o) => {
  s === void 0 ? delete o[r] : s && ln(s) && (o[r] = ao(s));
}), os = (n) => !Ne(n).length, lo = (n, e, s) => Gs(n, Mr(e, s)), mt = (n) => Bn((Ke(n) ? n : (n || "").split(" ")).filter((e) => e)), rs = (n, e) => n && n.getAttribute(e), ks = (n, e) => n && n.hasAttribute(e), Je = (n, e, s) => {
  ie(mt(e), (r) => {
    n && n.setAttribute(r, String(s || ""));
  });
}, ze = (n, e) => {
  ie(mt(e), (s) => n && n.removeAttribute(s));
}, yn = (n, e) => {
  const s = mt(rs(n, e)), r = Z(Je, n, e), o = (c, d) => {
    const f = new Set(s);
    return ie(mt(c), (i) => {
      f[d](i);
    }), ct(f).join(" ");
  };
  return {
    O: (c) => r(o(c, "delete")),
    $: (c) => r(o(c, "add")),
    C: (c) => {
      const d = mt(c);
      return d.reduce((f, i) => f && s.includes(i), d.length > 0);
    }
  };
}, io = (n, e, s) => (yn(n, e).O(s), Z(as, n, e, s)), as = (n, e, s) => (yn(n, e).$(s), Z(io, n, e, s)), un = (n, e, s, r) => (r ? as : io)(n, e, s), ls = (n, e, s) => yn(n, e).C(s), co = (n) => yn(n, "class"), uo = (n, e) => {
  co(n).O(e);
}, is = (n, e) => (co(n).$(e), Z(uo, n, e)), fo = (n, e) => {
  const s = e ? hn(e) && e : document;
  return s ? ct(s.querySelectorAll(n)) : [];
}, Fr = (n, e) => {
  const s = e ? hn(e) && e : document;
  return s && s.querySelector(n);
}, Nn = (n, e) => hn(n) && n.matches(e), vo = (n) => Nn(n, "body"), Pn = (n) => n ? ct(n.childNodes) : [], Vt = (n) => n && n.parentElement, bt = (n, e) => hn(n) && n.closest(e), qn = (n) => document.activeElement, Ir = (n, e, s) => {
  const r = bt(n, e), o = n && Fr(s, r), c = bt(o, e) === r;
  return r && o ? r === n || o === n || c && bt(bt(n, s), e) !== r : !1;
}, xt = (n) => {
  ie(ss(n), (e) => {
    const s = Vt(e);
    e && s && s.removeChild(e);
  });
}, Oe = (n, e) => Z(xt, n && e && ie(ss(e), (s) => {
  s && n.appendChild(s);
}));
let _o;
const Rr = () => _o, Ur = (n) => {
  _o = n;
}, wt = (n) => {
  const e = document.createElement("div");
  return Je(e, "class", n), e;
}, mo = (n) => {
  const e = wt(), s = Rr(), r = n.trim();
  return e.innerHTML = s ? s.createHTML(r) : r, ie(Pn(e), (o) => xt(o));
}, xs = (n, e) => n.getPropertyValue(e) || n[e] || "", po = (n) => {
  const e = n || 0;
  return isFinite(e) ? e : 0;
}, Jt = (n) => po(parseFloat(n || "")), zn = (n) => Math.round(n * 1e4) / 1e4, ho = (n) => `${zn(po(n))}px`;
function Ft(n, e) {
  n && e && ie(e, (s, r) => {
    try {
      const o = n.style, c = mn(s) || pn(s) ? "" : Ye(s) ? ho(s) : s;
      r.indexOf("--") === 0 ? o.setProperty(r, c) : o[r] = c;
    } catch {
    }
  });
}
function tt(n, e, s) {
  const r = Ut(e);
  let o = r ? "" : {};
  if (n) {
    const c = Ve.getComputedStyle(n, s) || n.style;
    o = r ? xs(c, e) : ct(e).reduce((d, f) => (d[f] = xs(c, f), d), o);
  }
  return o;
}
const Ss = (n, e, s) => {
  const r = e ? `${e}-` : "", o = s ? `-${s}` : "", c = `${r}top${o}`, d = `${r}right${o}`, f = `${r}bottom${o}`, i = `${r}left${o}`, v = tt(n, [c, d, f, i]);
  return {
    t: Jt(v[c]),
    r: Jt(v[d]),
    b: Jt(v[f]),
    l: Jt(v[i])
  };
}, Dn = (n, e) => `translate${an(n) ? `(${n.x},${n.y})` : `${e ? "X" : "Y"}(${n})`}`, Hr = (n) => !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length), Br = {
  w: 0,
  h: 0
}, kn = (n, e) => e ? {
  w: e[`${n}Width`],
  h: e[`${n}Height`]
} : Br, Nr = (n) => kn("inner", n || Ve), yt = Z(kn, "offset"), go = Z(kn, "client"), fn = Z(kn, "scroll"), cs = (n) => {
  const e = parseFloat(tt(n, gn)) || 0, s = parseFloat(tt(n, bn)) || 0;
  return {
    w: e - Rn(e),
    h: s - Rn(s)
  };
}, Mn = (n) => n.getBoundingClientRect(), Pr = (n) => !!n && Hr(n), jn = (n) => !!(n && (n[bn] || n[gn])), bo = (n, e) => {
  const s = jn(n);
  return !jn(e) && s;
}, $s = (n, e, s, r) => {
  ie(mt(e), (o) => {
    n && n.removeEventListener(o, s, r);
  });
}, ve = (n, e, s, r) => {
  var o;
  const c = (o = r && r.H) != null ? o : !0, d = r && r.I || !1, f = r && r.A || !1, i = {
    passive: c,
    capture: d
  };
  return Z(Re, mt(e).map((v) => {
    const _ = f ? (u) => {
      $s(n, v, _, d), s && s(u);
    } : s;
    return n && n.addEventListener(v, _, i), Z($s, n, v, _, d);
  }));
}, wo = (n) => n.stopPropagation(), Gn = (n) => n.preventDefault(), yo = (n) => wo(n) || Gn(n), We = (n, e) => {
  const { x: s, y: r } = Ye(e) ? {
    x: e,
    y: e
  } : e || {};
  Ye(s) && (n.scrollLeft = s), Ye(r) && (n.scrollTop = r);
}, Ie = (n) => ({
  x: n.scrollLeft,
  y: n.scrollTop
}), ko = () => ({
  D: {
    x: 0,
    y: 0
  },
  M: {
    x: 0,
    y: 0
  }
}), qr = (n, e) => {
  const { D: s, M: r } = n, { w: o, h: c } = e, d = (u, p, h) => {
    let g = ws(u) * h, y = ws(p) * h;
    if (g === y) {
      const S = on(u), D = on(p);
      y = S > D ? 0 : y, g = S < D ? 0 : g;
    }
    return g = g === y ? 0 : g, [g + 0, y + 0];
  }, [f, i] = d(s.x, r.x, o), [v, _] = d(s.y, r.y, c);
  return {
    D: {
      x: f,
      y: v
    },
    M: {
      x: i,
      y: _
    }
  };
}, On = ({ D: n, M: e }) => {
  const s = (r, o) => r === 0 && r <= o;
  return {
    x: s(n.x, e.x),
    y: s(n.y, e.y)
  };
}, Cs = ({ D: n, M: e }, s) => {
  const r = (o, c, d) => lo(0, 1, (o - d) / (o - c) || 0);
  return {
    x: r(n.x, e.x, s.x),
    y: r(n.y, e.y, s.y)
  };
}, Wn = (n) => {
  n && n.focus && n.focus({
    preventScroll: !0
  });
}, Es = (n, e) => {
  ie(ss(e), n);
}, Yn = (n) => {
  const e = /* @__PURE__ */ new Map(), s = (c, d) => {
    if (c) {
      const f = e.get(c);
      Es((i) => {
        f && f[i ? "delete" : "clear"](i);
      }, d);
    } else
      e.forEach((f) => {
        f.clear();
      }), e.clear();
  }, r = (c, d) => {
    if (Ut(c)) {
      const v = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, v), Es((_) => {
        Be(_) && v.add(_);
      }, d), Z(s, c, d);
    }
    pn(d) && d && s();
    const f = Ne(c), i = [];
    return ie(f, (v) => {
      const _ = c[v];
      _ && ge(i, r(v, _));
    }), Z(Re, i);
  }, o = (c, d) => {
    ie(ct(e.get(c)), (f) => {
      d && !Hn(d) ? f.apply(0, d) : f();
    });
  };
  return r(n || {}), [r, s, o];
}, xo = {}, So = {}, zr = (n) => {
  ie(n, (e) => ie(e, (s, r) => {
    xo[r] = e[r];
  }));
}, $o = (n, e, s) => Ne(n).map((r) => {
  const { static: o, instance: c } = n[r], [d, f, i] = s || [], v = s ? c : o;
  if (v) {
    const _ = s ? v(d, f, e) : v(e);
    return (i || So)[r] = _;
  }
}), Ht = (n) => So[n], jr = "__osOptionsValidationPlugin", Ct = "data-overlayscrollbars", nn = "os-environment", Qt = `${nn}-scrollbar-hidden`, Ln = `${Ct}-initialize`, sn = "noClipping", Ts = `${Ct}-body`, it = Ct, Gr = "host", Qe = `${Ct}-viewport`, Wr = no, Yr = so, Kr = "arrange", Co = "measuring", Xr = "scrolling", Eo = "scrollbarHidden", Zr = "noContent", Kn = `${Ct}-padding`, As = `${Ct}-content`, ds = "os-size-observer", Jr = `${ds}-appear`, Qr = `${ds}-listener`, ea = "os-trinsic-observer", ta = "os-theme-none", Ue = "os-scrollbar", na = `${Ue}-rtl`, sa = `${Ue}-horizontal`, oa = `${Ue}-vertical`, To = `${Ue}-track`, us = `${Ue}-handle`, ra = `${Ue}-visible`, aa = `${Ue}-cornerless`, Ds = `${Ue}-interaction`, Ms = `${Ue}-unusable`, Xn = `${Ue}-auto-hide`, Os = `${Xn}-hidden`, Ls = `${Ue}-wheel`, la = `${To}-interactive`, ia = `${us}-interactive`, ca = "__osSizeObserverPlugin", da = (n, e) => {
  const { T: s } = e, [r, o] = n("showNativeOverlaidScrollbars");
  return [r && s.x && s.y, o];
}, St = (n) => n.indexOf(at) === 0, ua = (n, e) => {
  const s = (o, c, d, f) => {
    const i = o === at ? vt : o.replace(`${at}-`, ""), v = St(o), _ = St(d);
    return !c && !f ? vt : v && _ ? at : v ? c && f ? i : c ? at : vt : c ? i : _ && f ? at : vt;
  }, r = {
    x: s(e.x, n.x, e.y, n.y),
    y: s(e.y, n.y, e.x, n.x)
  };
  return {
    k: r,
    R: {
      x: r.x === kt,
      y: r.y === kt
    }
  };
}, Ao = "__osScrollbarsHidingPlugin", fa = "__osClickScrollPlugin", Vs = (n) => JSON.stringify(n, (e, s) => {
  if (Be(s))
    throw 0;
  return s;
}), Fs = (n, e) => n ? `${e}`.split(".").reduce((s, r) => s && ro(s, r) ? s[r] : void 0, n) : void 0, va = {
  paddingAbsolute: !1,
  showNativeOverlaidScrollbars: !1,
  update: {
    elementEvents: [["img", "load"]],
    debounce: [0, 33],
    attributes: null,
    ignoreMutation: null
  },
  overflow: {
    x: "scroll",
    y: "scroll"
  },
  scrollbars: {
    theme: "os-theme-dark",
    visibility: "auto",
    autoHide: "never",
    autoHideDelay: 1300,
    autoHideSuspend: !1,
    dragScroll: !0,
    clickScroll: !1,
    pointers: ["mouse", "touch", "pen"]
  }
}, Do = (n, e) => {
  const s = {}, r = Lt(Ne(e), Ne(n));
  return ie(r, (o) => {
    const c = n[o], d = e[o];
    if (an(c) && an(d))
      re(s[o] = {}, Do(c, d)), os(s[o]) && delete s[o];
    else if (ro(e, o) && d !== c) {
      let f = !0;
      if (Ke(c) || Ke(d))
        try {
          Vs(c) === Vs(d) && (f = !1);
        } catch {
        }
      f && (s[o] = d);
    }
  }), s;
}, Is = (n, e, s) => (r) => [Fs(n, r), s || Fs(e, r) !== void 0];
let Mo;
const _a = () => Mo, ma = (n) => {
  Mo = n;
};
let Vn;
const pa = () => {
  const n = (k, O, R) => {
    Oe(document.body, k), Oe(document.body, k);
    const C = go(k), x = yt(k), T = cs(O);
    return R && xt(k), {
      x: x.h - C.h + T.h,
      y: x.w - C.w + T.w
    };
  }, e = (k) => {
    let O = !1;
    const R = is(k, Qt);
    try {
      O = tt(k, "scrollbar-width") === "none" || tt(k, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return R(), O;
  }, s = `.${nn}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${nn} div{width:200%;height:200%;margin:10px 0}.${Qt}{scrollbar-width:none!important}.${Qt}::-webkit-scrollbar,.${Qt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, o = mo(`<div class="${nn}"><div></div><style>${s}</style></div>`)[0], c = o.firstChild, d = o.lastChild, f = _a();
  f && (d.nonce = f);
  const [i, , v] = Yn(), [_, u] = Fe({
    o: n(o, c),
    i: tn
  }, Z(n, o, c, !0)), [p] = u(), h = e(o), g = {
    x: p.x === 0,
    y: p.y === 0
  }, y = {
    elements: {
      host: null,
      padding: !h,
      viewport: (k) => h && vo(k) && k,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, S = re({}, va), D = Z(re, {}, S), U = Z(re, {}, y), V = {
    N: p,
    T: g,
    P: h,
    G: !!Mt,
    K: Z(i, "r"),
    Z: U,
    tt: (k) => re(y, k) && U(),
    nt: D,
    ot: (k) => re(S, k) && D(),
    st: re({}, y),
    et: re({}, S)
  };
  if (ze(o, "style"), xt(o), ve(Ve, "resize", () => {
    v("r", []);
  }), Be(Ve.matchMedia) && !h && (!g.x || !g.y)) {
    const k = (O) => {
      const R = Ve.matchMedia(`(resolution: ${Ve.devicePixelRatio}dppx)`);
      ve(R, "change", () => {
        O(), k(O);
      }, {
        A: !0
      });
    };
    k(() => {
      const [O, R] = _();
      re(V.N, O), v("r", [R]);
    });
  }
  return V;
}, Xe = () => (Vn || (Vn = pa()), Vn), ha = (n, e, s) => {
  let r = !1;
  const o = s ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    r = !0;
  }, d = (f) => {
    if (o && s) {
      const i = s.map((v) => {
        const [_, u] = v || [];
        return [u && _ ? (f || fo)(_, n) : [], u];
      });
      ie(i, (v) => ie(v[0], (_) => {
        const u = v[1], p = o.get(_) || [];
        if (n.contains(_) && u) {
          const g = ve(_, u, (y) => {
            r ? (g(), o.delete(_)) : e(y);
          });
          o.set(_, ge(p, g));
        } else
          Re(p), o.delete(_);
      }));
    }
  };
  return d(), [c, d];
}, Rs = (n, e, s, r) => {
  let o = !1;
  const { ct: c, rt: d, lt: f, it: i, ut: v, ft: _ } = r || {}, u = dn(() => o && s(!0), {
    _: 33,
    p: 99
  }), [p, h] = ha(n, u, f), g = c || [], y = d || [], S = Lt(g, y), D = (V, k) => {
    if (!Hn(k)) {
      const O = v || lt, R = _ || lt, C = [], x = [];
      let T = !1, A = !1;
      if (ie(k, (I) => {
        const { attributeName: L, target: H, type: $, oldValue: N, addedNodes: P, removedNodes: ee } = I, oe = $ === "attributes", se = $ === "childList", me = n === H, K = oe && L, E = K && rs(H, L || ""), B = Ut(E) ? E : null, q = K && N !== B, M = Ys(y, L) && q;
        if (e && (se || !me)) {
          const G = oe && q, z = G && i && Nn(H, i), J = (z ? !O(H, L, N, B) : !oe || G) && !R(I, !!z, n, r);
          ie(P, (ae) => ge(C, ae)), ie(ee, (ae) => ge(C, ae)), A = A || J;
        }
        !e && me && q && !O(H, L, N, B) && (ge(x, L), T = T || M);
      }), h((I) => Bn(C).reduce((L, H) => (ge(L, fo(I, H)), Nn(H, I) ? ge(L, H) : L), [])), e)
        return !V && A && s(!1), [!1];
      if (!Hn(x) || T) {
        const I = [Bn(x), T];
        return V || s.apply(0, I), I;
      }
    }
  }, U = new Or(Z(D, !1));
  return [() => (U.observe(n, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: S,
    subtree: e,
    childList: e,
    characterData: e
  }), o = !0, () => {
    o && (p(), U.disconnect(), o = !1);
  }), () => {
    if (o)
      return u.m(), D(!0, U.takeRecords());
  }];
};
let ft = null;
const Oo = (n, e, s) => {
  const { _t: r } = s || {}, o = Ht(ca), [c] = Fe({
    o: !1,
    u: !0
  });
  return () => {
    const d = [], i = mo(`<div class="${ds}"><div class="${Qr}"></div></div>`)[0], v = i.firstChild, _ = (u) => {
      const p = u instanceof ResizeObserverEntry;
      let h = !1, g = !1;
      if (p) {
        const [y, , S] = c(u.contentRect), D = jn(y);
        g = bo(y, S), h = !g && !D;
      } else
        g = u === !0;
      h || e({
        dt: !0,
        _t: g
      });
    };
    if (ht) {
      if (!pn(ft)) {
        const g = new ht(lt);
        g.observe(n, {
          get box() {
            ft = !0;
          }
        }), ft = ft || !1, g.disconnect();
      }
      const u = dn(_, {
        _: 0,
        p: 0
      }), p = (g) => u(g.pop()), h = new ht(p);
      if (h.observe(ft ? n : v), ge(d, [() => h.disconnect(), !ft && Oe(n, i)]), ft) {
        const g = new ht(p);
        g.observe(n, {
          box: "border-box"
        }), ge(d, () => g.disconnect());
      }
    } else if (o) {
      const [u, p] = o(v, _, r);
      ge(d, Lt([is(i, Jr), ve(i, "animationstart", u), Oe(n, i)], p));
    } else
      return lt;
    return Z(Re, d);
  };
}, ga = (n, e) => {
  let s;
  const r = (i) => i.h === 0 || i.isIntersecting || i.intersectionRatio > 0, o = wt(ea), [c] = Fe({
    o: !1
  }), d = (i, v) => {
    if (i) {
      const _ = c(r(i)), [, u] = _;
      return u && !v && e(_) && [_];
    }
  }, f = (i, v) => d(v.pop(), i);
  return [() => {
    const i = [];
    if (ys)
      s = new ys(Z(f, !1), {
        root: n
      }), s.observe(o), ge(i, () => {
        s.disconnect();
      });
    else {
      const v = () => {
        const _ = yt(o);
        d(_);
      };
      ge(i, Oo(o, v)()), v();
    }
    return Z(Re, ge(i, Oe(n, o)));
  }, () => s && f(!0, s.takeRecords())];
}, ba = (n, e, s, r) => {
  let o, c, d, f, i, v;
  const _ = `[${it}]`, u = `[${Qe}]`, p = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: h, ht: g, U: y, gt: S, bt: D, L: U, wt: V, yt: k, St: O, Ot: R } = n, C = (M) => tt(M, "direction") === "rtl", x = {
    $t: !1,
    F: C(h)
  }, T = Xe(), A = Ht(Ao), [I] = Fe({
    i: oo,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const M = A && A.V(n, e, x, T, s).W, z = !(V && U) && ls(g, it, sn), Y = !U && k(Kr), J = Y && Ie(S), ae = J && R(), fe = O(Co, z), ce = Y && M && M()[0], Te = fn(y), te = cs(y);
    return ce && ce(), We(S, J), ae && ae(), z && fe(), {
      w: Te.w + te.w,
      h: Te.h + te.h
    };
  }), L = dn(r, {
    _: () => o,
    p: () => c,
    S(M, G) {
      const [z] = M, [Y] = G;
      return [Lt(Ne(z), Ne(Y)).reduce((J, ae) => (J[ae] = z[ae] || Y[ae], J), {})];
    }
  }), H = (M) => {
    const G = C(h);
    re(M, {
      Ct: v !== G
    }), re(x, {
      F: G
    }), v = G;
  }, $ = (M, G) => {
    const [z, Y] = M, J = {
      xt: Y
    };
    return re(x, {
      $t: z
    }), G || r(J), J;
  }, N = ({ dt: M, _t: G }) => {
    const Y = !(M && !G) && T.P ? L : r, J = {
      dt: M || G,
      _t: G
    };
    H(J), Y(J);
  }, P = (M, G) => {
    const [, z] = I(), Y = {
      Ht: z
    };
    return H(Y), z && !G && (M ? r : L)(Y), Y;
  }, ee = (M, G, z) => {
    const Y = {
      Et: G
    };
    return H(Y), G && !z && L(Y), Y;
  }, [oe, se] = D ? ga(g, $) : [], me = !U && Oo(g, N, {
    _t: !0
  }), [K, E] = Rs(g, !1, ee, {
    rt: p,
    ct: p
  }), B = U && ht && new ht((M) => {
    const G = M[M.length - 1].contentRect;
    N({
      dt: !0,
      _t: bo(G, i)
    }), i = G;
  }), q = dn(() => {
    const [, M] = I();
    r({
      Ht: M
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    B && B.observe(g);
    const M = me && me(), G = oe && oe(), z = K(), Y = T.K((J) => {
      J ? L({
        zt: J
      }) : q();
    });
    return () => {
      B && B.disconnect(), M && M(), G && G(), f && f(), z(), Y();
    };
  }, ({ It: M, At: G, Dt: z }) => {
    const Y = {}, [J] = M("update.ignoreMutation"), [ae, fe] = M("update.attributes"), [ce, Te] = M("update.elementEvents"), [te, ye] = M("update.debounce"), Me = Te || fe, xe = G || z, Se = (be) => Be(J) && J(be);
    if (Me) {
      d && d(), f && f();
      const [be, we] = Rs(D || y, !0, P, {
        ct: Lt(p, ae || []),
        lt: ce,
        it: _,
        ft: (pe, ue) => {
          const { target: $e, attributeName: De } = pe;
          return (!ue && De && !U ? Ir($e, _, u) : !1) || !!bt($e, `.${Ue}`) || !!Se(pe);
        }
      });
      f = be(), d = we;
    }
    if (ye)
      if (L.m(), Ke(te)) {
        const be = te[0], we = te[1];
        o = Ye(be) && be, c = Ye(we) && we;
      } else Ye(te) ? (o = te, c = !1) : (o = !1, c = !1);
    if (xe) {
      const be = E(), we = se && se(), pe = d && d();
      be && re(Y, ee(be[0], be[1], xe)), we && re(Y, $(we[0], xe)), pe && re(Y, P(pe[0], xe));
    }
    return H(Y), Y;
  }, x];
}, Lo = (n, e) => Be(e) ? e.apply(0, n) : e, wa = (n, e, s, r) => {
  const o = ts(r) ? s : r;
  return Lo(n, o) || e.apply(0, n);
}, Vo = (n, e, s, r) => {
  const o = ts(r) ? s : r, c = Lo(n, o);
  return !!c && (cn(c) ? c : e.apply(0, n));
}, ya = (n, e) => {
  const { nativeScrollbarsOverlaid: s, body: r } = e || {}, { T: o, P: c, Z: d } = Xe(), { nativeScrollbarsOverlaid: f, body: i } = d().cancel, v = s ?? f, _ = ts(r) ? i : r, u = (o.x || o.y) && v, p = n && (mn(_) ? !c : _);
  return !!u || !!p;
}, ka = (n, e, s, r) => {
  const o = "--os-viewport-percent", c = "--os-scroll-percent", d = "--os-scroll-direction", { Z: f } = Xe(), { scrollbars: i } = f(), { slot: v } = i, { vt: _, ht: u, U: p, Mt: h, gt: g, wt: y, L: S } = e, { scrollbars: D } = h ? {} : n, { slot: U } = D || {}, V = [], k = [], O = [], R = Vo([_, u, p], () => S && y ? _ : u, v, U), C = (K) => {
    if (Mt) {
      let E = null, B = [];
      const q = new Mt({
        source: g,
        axis: K
      }), M = () => {
        E && E.cancel(), E = null;
      };
      return {
        Rt: (z) => {
          const { Tt: Y } = s, J = On(Y)[K], ae = K === "x", fe = [Dn(0, ae), Dn(`calc(100cq${ae ? "w" : "h"} + -100%)`, ae)], ce = J ? fe : fe.reverse();
          return B[0] === ce[0] && B[1] === ce[1] || (M(), B = ce, E = z.kt.animate({
            clear: ["left"],
            transform: ce
          }, {
            timeline: q
          })), M;
        }
      };
    }
  }, x = {
    x: C("x"),
    y: C("y")
  }, T = () => {
    const { Vt: K, Lt: E } = s, B = (q, M) => lo(0, 1, q / (q + M) || 0);
    return {
      x: B(E.x, K.x),
      y: B(E.y, K.y)
    };
  }, A = (K, E, B) => {
    const q = B ? is : uo;
    ie(K, (M) => {
      q(M.Ut, E);
    });
  }, I = (K, E) => {
    ie(K, (B) => {
      const [q, M] = E(B);
      Ft(q, M);
    });
  }, L = (K, E, B) => {
    const q = pn(B), M = q ? B : !0, G = q ? !B : !0;
    M && A(k, K, E), G && A(O, K, E);
  }, H = () => {
    const K = T(), E = (B) => (q) => [q.Ut, {
      [o]: zn(B) + ""
    }];
    I(k, E(K.x)), I(O, E(K.y));
  }, $ = () => {
    if (!Mt) {
      const { Tt: K } = s, E = Cs(K, Ie(g)), B = (q) => (M) => [M.Ut, {
        [c]: zn(q) + ""
      }];
      I(k, B(E.x)), I(O, B(E.y));
    }
  }, N = () => {
    const { Tt: K } = s, E = On(K), B = (q) => (M) => [M.Ut, {
      [d]: q ? "0" : "1"
    }];
    I(k, B(E.x)), I(O, B(E.y)), Mt && (k.forEach(x.x.Rt), O.forEach(x.y.Rt));
  }, P = () => {
    if (S && !y) {
      const { Vt: K, Tt: E } = s, B = On(E), q = Cs(E, Ie(g)), M = (G) => {
        const { Ut: z } = G, Y = Vt(z) === p && z, J = (ae, fe, ce) => {
          const Te = fe * ae;
          return ho(ce ? Te : -Te);
        };
        return [Y, Y && {
          transform: Dn({
            x: J(q.x, K.x, B.x),
            y: J(q.y, K.y, B.y)
          })
        }];
      };
      I(k, M), I(O, M);
    }
  }, ee = (K) => {
    const E = K ? "x" : "y", q = wt(`${Ue} ${K ? sa : oa}`), M = wt(To), G = wt(us), z = {
      Ut: q,
      Pt: M,
      kt: G
    }, Y = x[E];
    return ge(K ? k : O, z), ge(V, [Oe(q, M), Oe(M, G), Z(xt, q), Y && Y.Rt(z), r(z, L, K)]), z;
  }, oe = Z(ee, !0), se = Z(ee, !1), me = () => (Oe(R, k[0].Ut), Oe(R, O[0].Ut), Z(Re, V));
  return oe(), se(), [{
    Nt: H,
    qt: $,
    Bt: N,
    Ft: P,
    jt: L,
    Xt: {
      Yt: k,
      Wt: oe,
      Jt: Z(I, k)
    },
    Gt: {
      Yt: O,
      Wt: se,
      Jt: Z(I, O)
    }
  }, me];
}, xa = (n, e, s, r) => (o, c, d) => {
  const { ht: f, U: i, L: v, gt: _, Kt: u, Ot: p } = e, { Ut: h, Pt: g, kt: y } = o, [S, D] = gt(333), [U, V] = gt(444), k = (C) => {
    Be(_.scrollBy) && _.scrollBy({
      behavior: "smooth",
      left: C.x,
      top: C.y
    });
  }, O = () => {
    const C = "pointerup pointercancel lostpointercapture", x = `client${d ? "X" : "Y"}`, T = d ? gn : bn, A = d ? "left" : "top", I = d ? "w" : "h", L = d ? "x" : "y", H = (N, P) => (ee) => {
      const { Vt: oe } = s, se = yt(g)[I] - yt(y)[I], K = P * ee / se * oe[L];
      We(_, {
        [L]: N + K
      });
    }, $ = [];
    return ve(g, "pointerdown", (N) => {
      const P = bt(N.target, `.${us}`) === y, ee = P ? y : g, oe = n.scrollbars, se = oe[P ? "dragScroll" : "clickScroll"], { button: me, isPrimary: K, pointerType: E } = N, { pointers: B } = oe;
      if (me === 0 && K && se && (B || []).includes(E)) {
        Re($), V();
        const M = !P && (N.shiftKey || se === "instant"), G = Z(Mn, y), z = Z(Mn, g), Y = (ue, $e) => (ue || G())[A] - ($e || z())[A], J = Rn(Mn(_)[T]) / yt(_)[I] || 1, ae = H(Ie(_)[L], 1 / J), fe = N[x], ce = G(), Te = z(), te = ce[T], ye = Y(ce, Te) + te / 2, Me = fe - Te[A], xe = P ? 0 : Me - ye, Se = (ue) => {
          Re(pe), ee.releasePointerCapture(ue.pointerId);
        }, be = P || M, we = p(), pe = [ve(u, C, Se), ve(u, "selectstart", (ue) => Gn(ue), {
          H: !1
        }), ve(g, C, Se), be && ve(g, "pointermove", (ue) => ae(xe + (ue[x] - fe))), be && (() => {
          const ue = Ie(_);
          we();
          const $e = Ie(_), De = {
            x: $e.x - ue.x,
            y: $e.y - ue.y
          };
          (on(De.x) > 3 || on(De.y) > 3) && (p(), We(_, ue), k(De), U(we));
        })];
        if (ee.setPointerCapture(N.pointerId), M)
          ae(xe);
        else if (!P) {
          const ue = Ht(fa);
          if (ue) {
            const $e = ue(ae, xe, te, (De) => {
              De ? we() : ge(pe, we);
            });
            ge(pe, $e), ge($, Z($e, !0));
          }
        }
      }
    });
  };
  let R = !0;
  return Z(Re, [ve(y, "pointermove pointerleave", r), ve(h, "pointerenter", () => {
    c(Ds, !0);
  }), ve(h, "pointerleave pointercancel", () => {
    c(Ds, !1);
  }), !v && ve(h, "mousedown", () => {
    const C = qn();
    (ks(C, Qe) || ks(C, it) || C === document.body) && rn(Z(Wn, i), 25);
  }), ve(h, "wheel", (C) => {
    const { deltaX: x, deltaY: T, deltaMode: A } = C;
    R && A === 0 && Vt(h) === f && k({
      x,
      y: T
    }), R = !1, c(Ls, !0), S(() => {
      R = !0, c(Ls);
    }), Gn(C);
  }, {
    H: !1,
    I: !0
  }), ve(h, "pointerdown", Z(ve, u, "click", yo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), O(), D, V]);
}, Sa = (n, e, s, r, o, c) => {
  let d, f, i, v, _, u = lt, p = 0;
  const h = ["mouse", "pen"], g = (E) => h.includes(E.pointerType), [y, S] = gt(), [D, U] = gt(100), [V, k] = gt(100), [O, R] = gt(() => p), [C, x] = ka(n, o, r, xa(e, o, r, (E) => g(E) && oe())), { ht: T, Qt: A, wt: I } = o, { jt: L, Nt: H, qt: $, Bt: N, Ft: P } = C, ee = (E, B) => {
    if (R(), E)
      L(Os);
    else {
      const q = Z(L, Os, !0);
      p > 0 && !B ? O(q) : q();
    }
  }, oe = () => {
    (i ? !d : !v) && (ee(!0), D(() => {
      ee(!1);
    }));
  }, se = (E) => {
    L(Xn, E, !0), L(Xn, E, !1);
  }, me = (E) => {
    g(E) && (d = i, i && ee(!0));
  }, K = [R, U, k, S, () => u(), ve(T, "pointerover", me, {
    A: !0
  }), ve(T, "pointerenter", me), ve(T, "pointerleave", (E) => {
    g(E) && (d = !1, i && ee(!1));
  }), ve(T, "pointermove", (E) => {
    g(E) && f && oe();
  }), ve(A, "scroll", (E) => {
    y(() => {
      $(), oe();
    }), c(E), P();
  })];
  return [() => Z(Re, ge(K, x())), ({ It: E, Dt: B, Zt: q, tn: M }) => {
    const { nn: G, sn: z, en: Y, cn: J } = M || {}, { Ct: ae, _t: fe } = q || {}, { F: ce } = s, { T: Te } = Xe(), { k: te, rn: ye } = r, [Me, xe] = E("showNativeOverlaidScrollbars"), [Se, be] = E("scrollbars.theme"), [we, pe] = E("scrollbars.visibility"), [ue, $e] = E("scrollbars.autoHide"), [De, Et] = E("scrollbars.autoHideSuspend"), [Bt] = E("scrollbars.autoHideDelay"), [Nt, Pt] = E("scrollbars.dragScroll"), [ut, Tt] = E("scrollbars.clickScroll"), [qt, Sn] = E("overflow"), $n = fe && !B, Cn = ye.x || ye.y, qe = G || z || J || ae || B, En = Y || pe || Sn, zt = Me && Te.x && Te.y, jt = (ot, At, Dt) => {
      const Gt = ot.includes(kt) && (we === at || we === "auto" && At === kt);
      return L(ra, Gt, Dt), Gt;
    };
    if (p = Bt, $n && (De && Cn ? (se(!1), u(), V(() => {
      u = ve(A, "scroll", Z(se, !0), {
        A: !0
      });
    })) : se(!0)), xe && L(ta, zt), be && (L(_), L(Se, !0), _ = Se), Et && !De && se(!0), $e && (f = ue === "move", i = ue === "leave", v = ue === "never", ee(v, !0)), Pt && L(ia, Nt), Tt && L(la, !!ut), En) {
      const ot = jt(qt.x, te.x, !0), At = jt(qt.y, te.y, !1);
      L(aa, !(ot && At));
    }
    qe && ($(), H(), P(), J && N(), L(Ms, !ye.x, !0), L(Ms, !ye.y, !1), L(na, ce && !I));
  }, {}, C];
}, $a = (n) => {
  const e = Xe(), { Z: s, P: r } = e, { elements: o } = s(), { padding: c, viewport: d, content: f } = o, i = cn(n), v = i ? {} : n, { elements: _ } = v, { padding: u, viewport: p, content: h } = _ || {}, g = i ? n : v.target, y = vo(g), S = g.ownerDocument, D = S.documentElement, U = () => S.defaultView || Ve, V = Z(wa, [g]), k = Z(Vo, [g]), O = Z(wt, ""), R = Z(V, O, d), C = Z(k, O, f), x = (te) => {
    const ye = yt(te), Me = fn(te), xe = tt(te, no), Se = tt(te, so);
    return Me.w - ye.w > 0 && !St(xe) || Me.h - ye.h > 0 && !St(Se);
  }, T = R(p), A = T === g, I = A && y, L = !A && C(h), H = !A && T === L, $ = I ? D : T, N = I ? $ : g, P = !A && k(O, c, u), ee = !H && L, oe = [ee, $, P, N].map((te) => cn(te) && !Vt(te) && te), se = (te) => te && Ys(oe, te), me = !se($) && x($) ? $ : g, K = I ? D : $, B = {
    vt: g,
    ht: N,
    U: $,
    ln: P,
    bt: ee,
    gt: K,
    Qt: I ? S : $,
    an: y ? D : me,
    Kt: S,
    wt: y,
    Mt: i,
    L: A,
    un: U,
    yt: (te) => ls($, Qe, te),
    St: (te, ye) => un($, Qe, te, ye),
    Ot: () => un(K, Qe, Xr, !0)
  }, { vt: q, ht: M, ln: G, U: z, bt: Y } = B, J = [() => {
    ze(M, [it, Ln]), ze(q, Ln), y && ze(D, [Ln, it]);
  }];
  let ae = Pn([Y, z, G, M, q].find((te) => te && !se(te)));
  const fe = I ? q : Y || z, ce = Z(Re, J);
  return [B, () => {
    const te = U(), ye = qn(), Me = (pe) => {
      Oe(Vt(pe), Pn(pe)), xt(pe);
    }, xe = (pe) => ve(pe, "focusin focusout focus blur", yo, {
      I: !0,
      H: !1
    }), Se = "tabindex", be = rs(z, Se), we = xe(ye);
    return Je(M, it, A ? "" : Gr), Je(G, Kn, ""), Je(z, Qe, ""), Je(Y, As, ""), A || (Je(z, Se, be || "-1"), y && Je(D, Ts, "")), Oe(fe, ae), Oe(M, G), Oe(G || M, !A && z), Oe(z, Y), ge(J, [we, () => {
      const pe = qn(), ue = se(z), $e = ue && pe === z ? q : pe, De = xe($e);
      ze(G, Kn), ze(Y, As), ze(z, Qe), y && ze(D, Ts), be ? Je(z, Se, be) : ze(z, Se), se(Y) && Me(Y), ue && Me(z), se(G) && Me(G), Wn($e), De();
    }]), r && !A && (as(z, Qe, Eo), ge(J, Z(ze, z, Qe))), Wn(!A && y && ye === q && te.top === te ? z : ye), we(), ae = 0, ce;
  }, ce];
}, Ca = ({ bt: n }) => ({ Zt: e, fn: s, Dt: r }) => {
  const { xt: o } = e || {}, { $t: c } = s;
  n && (o || r) && Ft(n, {
    [bn]: c && "100%"
  });
}, Ea = ({ ht: n, ln: e, U: s, L: r }, o) => {
  const [c, d] = Fe({
    i: Vr,
    o: Ss()
  }, Z(Ss, n, "padding", ""));
  return ({ It: f, Zt: i, fn: v, Dt: _ }) => {
    let [u, p] = d(_);
    const { P: h } = Xe(), { dt: g, Ht: y, Ct: S } = i || {}, { F: D } = v, [U, V] = f("paddingAbsolute");
    (g || p || (_ || y)) && ([u, p] = c(_));
    const O = !r && (V || S || p);
    if (O) {
      const R = !U || !e && !h, C = u.r + u.l, x = u.t + u.b, T = {
        [eo]: R && !D ? -C : 0,
        [to]: R ? -x : 0,
        [Qs]: R && D ? -C : 0,
        top: R ? -u.t : 0,
        right: R ? D ? -u.r : "auto" : 0,
        left: R ? D ? "auto" : -u.l : 0,
        [gn]: R && `calc(100% + ${C}px)`
      }, A = {
        [Ks]: R ? u.t : 0,
        [Xs]: R ? u.r : 0,
        [Js]: R ? u.b : 0,
        [Zs]: R ? u.l : 0
      };
      Ft(e || s, T), Ft(s, A), re(o, {
        ln: u,
        _n: !R,
        j: e ? A : re({}, T, A)
      });
    }
    return {
      dn: O
    };
  };
}, Ta = (n, e) => {
  const s = Xe(), { ht: r, ln: o, U: c, L: d, Qt: f, gt: i, wt: v, St: _, un: u } = n, { P: p } = s, h = v && d, g = Z(Gs, 0), y = {
    display: () => !1,
    direction: (E) => E !== "ltr",
    flexDirection: (E) => E.endsWith("-reverse"),
    writingMode: (E) => E !== "horizontal-tb"
  }, S = Ne(y), D = {
    i: oo,
    o: {
      w: 0,
      h: 0
    }
  }, U = {
    i: tn,
    o: {}
  }, V = (E) => {
    _(Co, !h && E);
  }, k = (E) => {
    if (!S.some((fe) => {
      const ce = E[fe];
      return ce && y[fe](ce);
    }))
      return {
        D: {
          x: 0,
          y: 0
        },
        M: {
          x: 1,
          y: 1
        }
      };
    V(!0);
    const q = Ie(i), M = _(Zr, !0), G = ve(f, kt, (fe) => {
      const ce = Ie(i);
      fe.isTrusted && ce.x === q.x && ce.y === q.y && wo(fe);
    }, {
      I: !0,
      A: !0
    });
    We(i, {
      x: 0,
      y: 0
    }), M();
    const z = Ie(i), Y = fn(i);
    We(i, {
      x: Y.w,
      y: Y.h
    });
    const J = Ie(i);
    We(i, {
      x: J.x - z.x < 1 && -Y.w,
      y: J.y - z.y < 1 && -Y.h
    });
    const ae = Ie(i);
    return We(i, q), es(() => G()), {
      D: z,
      M: ae
    };
  }, O = (E, B) => {
    const q = Ve.devicePixelRatio % 1 !== 0 ? 1 : 0, M = {
      w: g(E.w - B.w),
      h: g(E.h - B.h)
    };
    return {
      w: M.w > q ? M.w : 0,
      h: M.h > q ? M.h : 0
    };
  }, [R, C] = Fe(D, Z(cs, c)), [x, T] = Fe(D, Z(fn, c)), [A, I] = Fe(D), [L] = Fe(U), [H, $] = Fe(D), [N] = Fe(U), [P] = Fe({
    i: (E, B) => wn(E, B, S),
    o: {}
  }, () => Pr(c) ? tt(c, S) : {}), [ee, oe] = Fe({
    i: (E, B) => tn(E.D, B.D) && tn(E.M, B.M),
    o: ko()
  }), se = Ht(Ao), me = (E, B) => `${B ? Wr : Yr}${Lr(E)}`, K = (E) => {
    const B = (M) => [at, vt, kt].map((G) => me(G, M)), q = B(!0).concat(B()).join(" ");
    _(q), _(Ne(E).map((M) => me(E[M], M === "x")).join(" "), !0);
  };
  return ({ It: E, Zt: B, fn: q, Dt: M }, { dn: G }) => {
    const { dt: z, Ht: Y, Ct: J, _t: ae, zt: fe } = B || {}, ce = se && se.V(n, e, q, s, E), { Y: Te, W: te, J: ye } = ce || {}, [Me, xe] = da(E, s), [Se, be] = E("overflow"), we = St(Se.x), pe = St(Se.y), ue = z || G || Y || J || fe || xe;
    let $e = C(M), De = T(M), Et = I(M), Bt = $(M);
    if (xe && p && _(Eo, !Me), ue) {
      ls(r, it, sn) && V(!0);
      const [hs] = te ? te() : [], [Wt] = $e = R(M), [Yt] = De = x(M), Kt = go(c), Xt = h && Nr(u()), sr = {
        w: g(Yt.w + Wt.w),
        h: g(Yt.h + Wt.h)
      }, gs = {
        w: g((Xt ? Xt.w : Kt.w + g(Kt.w - Yt.w)) + Wt.w),
        h: g((Xt ? Xt.h : Kt.h + g(Kt.h - Yt.h)) + Wt.h)
      };
      hs && hs(), Bt = H(gs), Et = A(O(sr, gs), M);
    }
    const [Nt, Pt] = Bt, [ut, Tt] = Et, [qt, Sn] = De, [$n, Cn] = $e, [qe, En] = L({
      x: ut.w > 0,
      y: ut.h > 0
    }), zt = we && pe && (qe.x || qe.y) || we && qe.x && !qe.y || pe && qe.y && !qe.x, jt = G || J || fe || Cn || Sn || Pt || Tt || be || xe || ue, ot = ua(qe, Se), [At, Dt] = N(ot.k), [Gt, er] = P(M), ps = J || ae || er || En || M, [tr, nr] = ps ? ee(k(Gt), M) : oe();
    return jt && (Dt && K(ot.k), ye && Te && Ft(c, ye(ot, q, Te(ot, qt, $n)))), V(!1), un(r, it, sn, zt), un(o, Kn, sn, zt), re(e, {
      k: At,
      Lt: {
        x: Nt.w,
        y: Nt.h
      },
      Vt: {
        x: ut.w,
        y: ut.h
      },
      rn: qe,
      Tt: qr(tr, ut)
    }), {
      en: Dt,
      nn: Pt,
      sn: Tt,
      cn: nr || Tt,
      pn: ps
    };
  };
}, Aa = (n) => {
  const [e, s, r] = $a(n), o = {
    ln: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    _n: !1,
    j: {
      [eo]: 0,
      [to]: 0,
      [Qs]: 0,
      [Ks]: 0,
      [Xs]: 0,
      [Js]: 0,
      [Zs]: 0
    },
    Lt: {
      x: 0,
      y: 0
    },
    Vt: {
      x: 0,
      y: 0
    },
    k: {
      x: vt,
      y: vt
    },
    rn: {
      x: !1,
      y: !1
    },
    Tt: ko()
  }, { vt: c, gt: d, L: f, Ot: i } = e, { P: v, T: _ } = Xe(), u = !v && (_.x || _.y), p = [Ca(e), Ea(e, o), Ta(e, o)];
  return [s, (h) => {
    const g = {}, S = u && Ie(d), D = S && i();
    return ie(p, (U) => {
      re(g, U(h, g) || {});
    }), We(d, S), D && D(), f || We(c, 0), g;
  }, o, e, r];
}, Da = (n, e, s, r, o) => {
  let c = !1;
  const d = Is(e, {}), [f, i, v, _, u] = Aa(n), [p, h, g] = ba(_, v, d, (k) => {
    V({}, k);
  }), [y, S, , D] = Sa(n, e, g, v, _, o), U = (k) => Ne(k).some((O) => !!k[O]), V = (k, O) => {
    if (s())
      return !1;
    const { vn: R, Dt: C, At: x, hn: T } = k, A = R || {}, I = !!C || !c, L = {
      It: Is(e, A, I),
      vn: A,
      Dt: I
    };
    if (T)
      return S(L), !1;
    const H = O || h(re({}, L, {
      At: x
    })), $ = i(re({}, L, {
      fn: g,
      Zt: H
    }));
    S(re({}, L, {
      Zt: H,
      tn: $
    }));
    const N = U(H), P = U($), ee = N || P || !os(A) || I;
    return c = !0, ee && r(k, {
      Zt: H,
      tn: $
    }), ee;
  };
  return [() => {
    const { an: k, gt: O, Ot: R } = _, C = Ie(k), x = [p(), f(), y()], T = R();
    return We(O, C), T(), Z(Re, x);
  }, V, () => ({
    gn: g,
    bn: v
  }), {
    wn: _,
    yn: D
  }, u];
}, fs = /* @__PURE__ */ new WeakMap(), Ma = (n, e) => {
  fs.set(n, e);
}, Oa = (n) => {
  fs.delete(n);
}, Fo = (n) => fs.get(n), Pe = (n, e, s) => {
  const { nt: r } = Xe(), o = cn(n), c = o ? n : n.target, d = Fo(c);
  if (e && !d) {
    let f = !1;
    const i = [], v = {}, _ = (A) => {
      const I = ao(A), L = Ht(jr);
      return L ? L(I, !0) : I;
    }, u = re({}, r(), _(e)), [p, h, g] = Yn(), [y, S, D] = Yn(s), U = (A, I) => {
      D(A, I), g(A, I);
    }, [V, k, O, R, C] = Da(n, u, () => f, ({ vn: A, Dt: I }, { Zt: L, tn: H }) => {
      const { dt: $, Ct: N, xt: P, Ht: ee, Et: oe, _t: se } = L, { nn: me, sn: K, en: E, cn: B } = H;
      U("updated", [T, {
        updateHints: {
          sizeChanged: !!$,
          directionChanged: !!N,
          heightIntrinsicChanged: !!P,
          overflowEdgeChanged: !!me,
          overflowAmountChanged: !!K,
          overflowStyleChanged: !!E,
          scrollCoordinatesChanged: !!B,
          contentMutation: !!ee,
          hostMutation: !!oe,
          appear: !!se
        },
        changedOptions: A || {},
        force: !!I
      }]);
    }, (A) => U("scroll", [T, A])), x = (A) => {
      Oa(c), Re(i), f = !0, U("destroyed", [T, A]), h(), S();
    }, T = {
      options(A, I) {
        if (A) {
          const L = I ? r() : {}, H = Do(u, re(L, _(A)));
          os(H) || (re(u, H), k({
            vn: H
          }));
        }
        return re({}, u);
      },
      on: y,
      off: (A, I) => {
        A && I && S(A, I);
      },
      state() {
        const { gn: A, bn: I } = O(), { F: L } = A, { Lt: H, Vt: $, k: N, rn: P, ln: ee, _n: oe, Tt: se } = I;
        return re({}, {
          overflowEdge: H,
          overflowAmount: $,
          overflowStyle: N,
          hasOverflow: P,
          scrollCoordinates: {
            start: se.D,
            end: se.M
          },
          padding: ee,
          paddingAbsolute: oe,
          directionRTL: L,
          destroyed: f
        });
      },
      elements() {
        const { vt: A, ht: I, ln: L, U: H, bt: $, gt: N, Qt: P } = R.wn, { Xt: ee, Gt: oe } = R.yn, se = (K) => {
          const { kt: E, Pt: B, Ut: q } = K;
          return {
            scrollbar: q,
            track: B,
            handle: E
          };
        }, me = (K) => {
          const { Yt: E, Wt: B } = K, q = se(E[0]);
          return re({}, q, {
            clone: () => {
              const M = se(B());
              return k({
                hn: !0
              }), M;
            }
          });
        };
        return re({}, {
          target: A,
          host: I,
          padding: L || H,
          viewport: H,
          content: $ || H,
          scrollOffsetElement: N,
          scrollEventElement: P,
          scrollbarHorizontal: me(ee),
          scrollbarVertical: me(oe)
        });
      },
      update: (A) => k({
        Dt: A,
        At: !0
      }),
      destroy: Z(x, !1),
      plugin: (A) => v[Ne(A)[0]]
    };
    return ge(i, [C]), Ma(c, T), $o(xo, Pe, [T, p, v]), ya(R.wn.wt, !o && n.cancel) ? (x(!0), T) : (ge(i, V()), U("initialized", [T]), T.update(), T);
  }
  return d;
};
Pe.plugin = (n) => {
  const e = Ke(n), s = e ? n : [n], r = s.map((o) => $o(o, Pe)[0]);
  return zr(s), e ? r : r[0];
};
Pe.valid = (n) => {
  const e = n && n.elements, s = Be(e) && e();
  return ln(s) && !!Fo(s.target);
};
Pe.env = () => {
  const { N: n, T: e, P: s, G: r, st: o, et: c, Z: d, tt: f, nt: i, ot: v } = Xe();
  return re({}, {
    scrollbarsSize: n,
    scrollbarsOverlaid: e,
    scrollbarsHiding: s,
    scrollTimeline: r,
    staticDefaultInitialization: o,
    staticDefaultOptions: c,
    getDefaultInitialization: d,
    setDefaultInitialization: f,
    getDefaultOptions: i,
    setDefaultOptions: v
  });
};
Pe.nonce = ma;
Pe.trustedTypePolicy = Ur;
function La() {
  let n;
  const e = F(null), s = Math.floor(Math.random() * 2 ** 32), r = F(!1), o = F([]), c = () => o.value, d = () => n.getSelection(), f = () => o.value.length, i = () => n.clearSelection(!0), v = F(), _ = F(null), u = F(null), p = F(null), h = F(null);
  function g() {
    n = new mr({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), n.subscribe("DS:start:pre", ({ items: O, event: R, isDragging: C }) => {
      if (C)
        n.Interaction._reset(R);
      else {
        r.value = !1;
        const x = e.value.offsetWidth - R.offsetX, T = e.value.offsetHeight - R.offsetY;
        x < 15 && T < 15 && n.Interaction._reset(R), R.target.classList.contains("os-scrollbar-handle") && n.Interaction._reset(R);
      }
    }), document.addEventListener("dragleave", (O) => {
      !O.buttons && r.value && (r.value = !1);
    });
  }
  const y = () => _t(() => {
    n.addSelection(
      n.getSelectables()
    ), S();
  }), S = () => {
    o.value = n.getSelection().map((O) => JSON.parse(O.dataset.item)), v.value(o.value);
  }, D = () => _t(() => {
    const O = c().map((R) => R.path);
    i(), n.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + s)
    }), n.addSelection(
      n.getSelectables().filter((R) => O.includes(JSON.parse(R.dataset.item).path))
    ), S(), V();
  }), U = (O) => {
    v.value = O, n.subscribe("DS:end", ({ items: R, event: C, isDragging: x }) => {
      o.value = R.map((T) => JSON.parse(T.dataset.item)), O(R.map((T) => JSON.parse(T.dataset.item)));
    });
  }, V = () => {
    _.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (u.value.style.height = e.value.scrollHeight + "px", u.value.style.display = "block") : (u.value.style.height = "100%", u.value.style.display = "none"));
  }, k = (O) => {
    if (!_.value)
      return;
    const { scrollOffsetElement: R } = _.value.elements();
    R.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return Ee(() => {
    Pe(p.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: Pe
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (O) => {
        _.value = O;
      },
      scroll: (O, R) => {
        const { scrollOffsetElement: C } = O.elements();
        e.value.scrollTo({
          top: C.scrollTop,
          left: 0
        });
      }
    }), g(), V(), h.value = new ResizeObserver(V), h.value.observe(e.value), e.value.addEventListener("scroll", k), n.subscribe("DS:scroll", ({ isDragging: O }) => O || k());
  }), Qn(() => {
    n && n.stop(), h.value && h.value.disconnect();
  }), Bs(() => {
    n && n.Area.reset();
  }), {
    area: e,
    explorerId: s,
    isDraggingRef: r,
    scrollBar: u,
    scrollBarContainer: p,
    getSelected: c,
    getSelection: d,
    selectAll: y,
    clearSelection: i,
    refreshSelection: D,
    getCount: f,
    onSelect: U
  };
}
function Va(n, e) {
  const s = F(n), r = F(e), o = F([]), c = F([]), d = F([]), f = F(!1), i = F(5);
  let v = !1, _ = !1;
  const u = $t({
    adapter: s,
    storages: [],
    dirname: r,
    files: []
  });
  function p() {
    let U = [], V = [], k = r.value ?? s.value + "://";
    k.length === 0 && (o.value = []), k.replace(s.value + "://", "").split("/").filter(Boolean).forEach(function(C) {
      U.push(C), U.join("/") !== "" && V.push({
        basename: C,
        name: C,
        path: s.value + "://" + U.join("/") + "/",
        type: "dir"
      });
    }), c.value = V;
    const [O, R] = g(
      V,
      i.value
    );
    d.value = R, o.value = O;
  }
  function h(U) {
    i.value = U, p();
  }
  function g(U, V) {
    return U.length > V ? [U.slice(-V), U.slice(0, -V)] : [U, []];
  }
  function y(U = null) {
    f.value = U ?? !f.value;
  }
  function S() {
    return o.value && o.value.length && !0;
  }
  const D = je(() => {
    var U;
    return ((U = o.value[o.value.length - 2]) == null ? void 0 : U.path) ?? s.value + "://";
  });
  return Ee(() => {
  }), Le(r, p), Ee(p), {
    adapter: s,
    path: r,
    loading: v,
    searchMode: _,
    data: u,
    breadcrumbs: o,
    breadcrumbItems: c,
    limitBreadcrumbItems: h,
    hiddenBreadcrumbs: d,
    showHiddenBreadcrumbs: f,
    toggleHiddenBreadcrumbs: y,
    isGoUpAvailable: S,
    parentFolderPath: D
  };
}
const Fa = (n, e) => {
  const s = kr(n.id), r = _r(), o = s.getStore("metricUnits", !1), c = Tr(s, n.theme), d = e.i18n, f = n.locale ?? e.locale, i = (h) => Array.isArray(h) ? h : $r, v = s.getStore("persist-path", n.persist), _ = v ? s.getStore("path", n.path) : n.path, u = v ? s.getStore("adapter") : null, p = La();
  return $t({
    /** 
    * Core properties
    * */
    // app version
    version: Cr,
    // root element
    root: null,
    // app id
    debug: n.debug,
    // Event Bus
    emitter: r,
    // storage
    storage: s,
    // localization object
    i18n: Sr(s, f, r, d),
    // modal state
    modal: Ar(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: je(() => p),
    // http object
    requester: yr(n.request),
    // active features
    features: i(n.features),
    // view state
    view: s.getStore("viewport", "grid"),
    // fullscreen state
    fullScreen: s.getStore("full-screen", n.fullScreen),
    // show tree view
    showTreeView: s.getStore("show-tree-view", n.showTreeView),
    // pinnedFolders
    pinnedFolders: s.getStore("pinned-folders", n.pinnedFolders),
    // treeViewData
    treeViewData: [],
    // selectButton state
    selectButton: n.selectButton,
    // max file size
    maxFileSize: n.maxFileSize,
    /**
    * Settings
    * */
    // theme state
    theme: c,
    // unit state - for example: GB or GiB
    metricUnits: o,
    // human readable file sizes
    filesize: o ? js : zs,
    // show large icons in list view
    compactListView: s.getStore("compact-list-view", !0),
    // persist state
    persist: v,
    // show thumbnails
    showThumbnails: s.getStore("show-thumbnails", n.showThumbnails),
    // type of progress indicator
    loadingIndicator: n.loadingIndicator,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // file system
    fs: Va(u, _)
  });
}, Ia = { class: "vuefinder__modal-layout__container" }, Ra = { class: "vuefinder__modal-layout__content" }, Ua = { class: "vuefinder__modal-layout__footer" }, nt = {
  __name: "ModalLayout",
  setup(n) {
    const e = F(null), s = le("ServiceContainer");
    return Ee(() => {
      const r = document.querySelector(".v-f-modal input");
      r && r.focus(), _t(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const o = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: o,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (r, o) => (m(), b("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: o[1] || (o[1] = It((c) => a(s).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      o[2] || (o[2] = l("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      l("div", Ia, [
        l("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: o[0] || (o[0] = et((c) => a(s).modal.close(), ["self"]))
        }, [
          l("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            l("div", Ra, [
              Ot(r.$slots, "default")
            ]),
            l("div", Ua, [
              Ot(r.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Ha = (n, e) => {
  const s = n.__vccOpts || n;
  for (const [r, o] of e)
    s[r] = o;
  return s;
}, Ba = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: s }) {
    const r = le("ServiceContainer"), o = F(!1), { t: c } = r.i18n;
    let d = null;
    const f = () => {
      clearTimeout(d), o.value = !0, d = setTimeout(() => {
        o.value = !1;
      }, 2e3);
    };
    return Ee(() => {
      r.emitter.on(n.on, f);
    }), Qn(() => {
      clearTimeout(d);
    }), {
      shown: o,
      t: c
    };
  }
}, Na = { key: 1 };
function Pa(n, e, s, r, o, c) {
  return m(), b("div", {
    class: de(["vuefinder__action-message", { "vuefinder__action-message--hidden": !r.shown }])
  }, [
    n.$slots.default ? Ot(n.$slots, "default", { key: 0 }) : (m(), b("span", Na, w(r.t("Saved.")), 1))
  ], 2);
}
const pt = /* @__PURE__ */ Ha(Ba, [["render", Pa]]), qa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function za(n, e) {
  return m(), b("svg", qa, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ]));
}
const ja = { render: za }, Ga = { class: "vuefinder__modal-header" }, Wa = { class: "vuefinder__modal-header__icon-container" }, Ya = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, dt = {
  __name: "ModalHeader",
  props: {
    title: {
      type: String,
      required: !0
    },
    icon: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    return (e, s) => (m(), b("div", Ga, [
      l("div", Wa, [
        (m(), X(Ns(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      l("h3", Ya, w(n.title), 1)
    ]));
  }
}, Ka = { class: "vuefinder__about-modal__content" }, Xa = { class: "vuefinder__about-modal__main" }, Za = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Ja = ["onClick", "aria-current"], Qa = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, el = { class: "vuefinder__about-modal__description" }, tl = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, nl = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, sl = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, ol = { class: "vuefinder__about-modal__description" }, rl = { class: "vuefinder__about-modal__settings" }, al = { class: "vuefinder__about-modal__setting flex" }, ll = { class: "vuefinder__about-modal__setting-input" }, il = { class: "vuefinder__about-modal__setting-label" }, cl = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, dl = { class: "vuefinder__about-modal__setting flex" }, ul = { class: "vuefinder__about-modal__setting-input" }, fl = { class: "vuefinder__about-modal__setting-label" }, vl = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, _l = { class: "vuefinder__about-modal__setting flex" }, ml = { class: "vuefinder__about-modal__setting-input" }, pl = { class: "vuefinder__about-modal__setting-label" }, hl = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, gl = { class: "vuefinder__about-modal__setting flex" }, bl = { class: "vuefinder__about-modal__setting-input" }, wl = { class: "vuefinder__about-modal__setting-label" }, yl = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, kl = { class: "vuefinder__about-modal__setting" }, xl = { class: "vuefinder__about-modal__setting-input" }, Sl = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, $l = { class: "vuefinder__about-modal__setting-label" }, Cl = ["label"], El = ["value"], Tl = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Al = { class: "vuefinder__about-modal__setting-input" }, Dl = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Ml = { class: "vuefinder__about-modal__setting-label" }, Ol = ["label"], Ll = ["value"], Vl = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Fl = { class: "vuefinder__about-modal__shortcuts" }, Il = { class: "vuefinder__about-modal__shortcut" }, Rl = { class: "vuefinder__about-modal__shortcut" }, Ul = { class: "vuefinder__about-modal__shortcut" }, Hl = { class: "vuefinder__about-modal__shortcut" }, Bl = { class: "vuefinder__about-modal__shortcut" }, Nl = { class: "vuefinder__about-modal__shortcut" }, Pl = { class: "vuefinder__about-modal__shortcut" }, ql = { class: "vuefinder__about-modal__shortcut" }, zl = { class: "vuefinder__about-modal__shortcut" }, jl = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Gl = { class: "vuefinder__about-modal__description" }, Wl = {
  __name: "ModalAbout",
  setup(n) {
    const e = le("ServiceContainer"), { setStore: s, clearStore: r } = e.storage, { t: o } = e.i18n, c = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, d = je(() => [
      { name: o("About"), key: c.ABOUT },
      { name: o("Settings"), key: c.SETTINGS },
      { name: o("Shortcuts"), key: c.SHORTCUTS },
      { name: o("Reset"), key: c.RESET }
    ]), f = F("about"), i = async () => {
      r(), location.reload();
    }, v = (U) => {
      e.theme.set(U), e.emitter.emit("vf-theme-saved");
    }, _ = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? js : zs, s("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, u = () => {
      e.compactListView = !e.compactListView, s("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      e.showThumbnails = !e.showThumbnails, s("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, h = () => {
      e.persist = !e.persist, s("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: g } = le("VueFinderOptions"), S = Object.fromEntries(
      Object.entries({
        ar: "Arabic (العربيّة)",
        en: "English",
        fr: "French (Français)",
        de: "German (Deutsch)",
        fa: "Persian (فارسی)",
        he: "Hebrew (עִברִית)",
        hi: "Hindi (हिंदी)",
        pl: "Polish (Polski)",
        ru: "Russian (Pусский)",
        sv: "Swedish (Svenska)",
        tr: "Turkish (Türkçe)",
        nl: "Dutch (Nederlands)",
        zhCN: "Simplified Chinese (简体中文)",
        zhTW: "Traditional Chinese (繁體中文)"
      }).filter(([U]) => Object.keys(g).includes(U))
    ), D = je(() => ({
      system: o("System"),
      light: o("Light"),
      dark: o("Dark")
    }));
    return (U, V) => (m(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          onClick: V[7] || (V[7] = (k) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(o)("Close")), 1)
      ]),
      default: ne(() => [
        l("div", Ka, [
          W(dt, {
            icon: a(ja),
            title: "Vuefinder " + a(e).version
          }, null, 8, ["icon", "title"]),
          l("div", Xa, [
            l("div", null, [
              l("div", null, [
                l("nav", Za, [
                  (m(!0), b(ke, null, Ce(d.value, (k) => (m(), b("button", {
                    key: k.name,
                    onClick: (O) => f.value = k.key,
                    class: de([k.key === f.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": k.current ? "page" : void 0
                  }, w(k.name), 11, Ja))), 128))
                ])
              ])
            ]),
            f.value === c.ABOUT ? (m(), b("div", Qa, [
              l("div", el, w(a(o)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              l("a", tl, w(a(o)("Project home")), 1),
              l("a", nl, w(a(o)("Follow on GitHub")), 1)
            ])) : j("", !0),
            f.value === c.SETTINGS ? (m(), b("div", sl, [
              l("div", ol, w(a(o)("Customize your experience with the following settings")), 1),
              l("div", rl, [
                l("fieldset", null, [
                  l("div", al, [
                    l("div", ll, [
                      he(l("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": V[0] || (V[0] = (k) => a(e).metricUnits = k),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Zt, a(e).metricUnits]
                      ])
                    ]),
                    l("div", il, [
                      l("label", cl, [
                        Q(w(a(o)("Use Metric Units")) + " ", 1),
                        W(pt, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: ne(() => [
                            Q(w(a(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", dl, [
                    l("div", ul, [
                      he(l("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": V[1] || (V[1] = (k) => a(e).compactListView = k),
                        onClick: u,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Zt, a(e).compactListView]
                      ])
                    ]),
                    l("div", fl, [
                      l("label", vl, [
                        Q(w(a(o)("Compact list view")) + " ", 1),
                        W(pt, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: ne(() => [
                            Q(w(a(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", _l, [
                    l("div", ml, [
                      he(l("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": V[2] || (V[2] = (k) => a(e).persist = k),
                        onClick: h,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Zt, a(e).persist]
                      ])
                    ]),
                    l("div", pl, [
                      l("label", hl, [
                        Q(w(a(o)("Persist path on reload")) + " ", 1),
                        W(pt, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: ne(() => [
                            Q(w(a(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", gl, [
                    l("div", bl, [
                      he(l("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": V[3] || (V[3] = (k) => a(e).showThumbnails = k),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Zt, a(e).showThumbnails]
                      ])
                    ]),
                    l("div", wl, [
                      l("label", yl, [
                        Q(w(a(o)("Show thumbnails")) + " ", 1),
                        W(pt, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: ne(() => [
                            Q(w(a(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", kl, [
                    l("div", xl, [
                      l("label", Sl, w(a(o)("Theme")), 1)
                    ]),
                    l("div", $l, [
                      he(l("select", {
                        id: "theme",
                        "onUpdate:modelValue": V[4] || (V[4] = (k) => a(e).theme.value = k),
                        onChange: V[5] || (V[5] = (k) => v(k.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: a(o)("Theme")
                        }, [
                          (m(!0), b(ke, null, Ce(D.value, (k, O) => (m(), b("option", { value: O }, w(k), 9, El))), 256))
                        ], 8, Cl)
                      ], 544), [
                        [bs, a(e).theme.value]
                      ]),
                      W(pt, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: ne(() => [
                          Q(w(a(o)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  a(e).features.includes(a(_e).LANGUAGE) && Object.keys(a(S)).length > 1 ? (m(), b("div", Tl, [
                    l("div", Al, [
                      l("label", Dl, w(a(o)("Language")), 1)
                    ]),
                    l("div", Ml, [
                      he(l("select", {
                        id: "language",
                        "onUpdate:modelValue": V[6] || (V[6] = (k) => a(e).i18n.locale = k),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: a(o)("Language")
                        }, [
                          (m(!0), b(ke, null, Ce(a(S), (k, O) => (m(), b("option", { value: O }, w(k), 9, Ll))), 256))
                        ], 8, Ol)
                      ], 512), [
                        [bs, a(e).i18n.locale]
                      ]),
                      W(pt, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: ne(() => [
                          Q(w(a(o)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : j("", !0)
                ])
              ])
            ])) : j("", !0),
            f.value === c.SHORTCUTS ? (m(), b("div", Vl, [
              l("div", Fl, [
                l("div", Il, [
                  l("div", null, w(a(o)("Rename")), 1),
                  V[8] || (V[8] = l("kbd", null, "F2", -1))
                ]),
                l("div", Rl, [
                  l("div", null, w(a(o)("Refresh")), 1),
                  V[9] || (V[9] = l("kbd", null, "F5", -1))
                ]),
                l("div", Ul, [
                  Q(w(a(o)("Delete")) + " ", 1),
                  V[10] || (V[10] = l("kbd", null, "Del", -1))
                ]),
                l("div", Hl, [
                  Q(w(a(o)("Escape")) + " ", 1),
                  V[11] || (V[11] = l("div", null, [
                    l("kbd", null, "Esc")
                  ], -1))
                ]),
                l("div", Bl, [
                  Q(w(a(o)("Select All")) + " ", 1),
                  V[12] || (V[12] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Q(" + "),
                    l("kbd", null, "A")
                  ], -1))
                ]),
                l("div", Nl, [
                  Q(w(a(o)("Search")) + " ", 1),
                  V[13] || (V[13] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Q(" + "),
                    l("kbd", null, "F")
                  ], -1))
                ]),
                l("div", Pl, [
                  Q(w(a(o)("Toggle Sidebar")) + " ", 1),
                  V[14] || (V[14] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Q(" + "),
                    l("kbd", null, "E")
                  ], -1))
                ]),
                l("div", ql, [
                  Q(w(a(o)("Open Settings")) + " ", 1),
                  V[15] || (V[15] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Q(" + "),
                    l("kbd", null, ",")
                  ], -1))
                ]),
                l("div", zl, [
                  Q(w(a(o)("Toggle Full Screen")) + " ", 1),
                  V[16] || (V[16] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Q(" + "),
                    l("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : j("", !0),
            f.value === c.RESET ? (m(), b("div", jl, [
              l("div", Gl, w(a(o)("Reset all settings to default")), 1),
              l("button", {
                onClick: i,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, w(a(o)("Reset Settings")), 1)
            ])) : j("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Yl = ["title"], st = {
  __name: "Message",
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    var v;
    const s = e, r = le("ServiceContainer"), { t: o } = r.i18n, c = F(!1), d = F(null), f = F((v = d.value) == null ? void 0 : v.strMessage);
    Le(f, () => c.value = !1);
    const i = () => {
      s("hidden"), c.value = !0;
    };
    return (_, u) => (m(), b("div", null, [
      c.value ? j("", !0) : (m(), b("div", {
        key: 0,
        ref_key: "strMessage",
        ref: d,
        class: de(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Ot(_.$slots, "default"),
        l("div", {
          class: "vuefinder__message__close",
          onClick: i,
          title: a(o)("Close")
        }, u[0] || (u[0] = [
          l("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            l("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ]), 8, Yl)
      ], 2))
    ]));
  }
}, Kl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Xl(n, e) {
  return m(), b("svg", Kl, e[0] || (e[0] = [
    l("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ]));
}
const Io = { render: Xl }, Zl = { class: "vuefinder__delete-modal__content" }, Jl = { class: "vuefinder__delete-modal__form" }, Ql = { class: "vuefinder__delete-modal__description" }, ei = { class: "vuefinder__delete-modal__files vf-scrollbar" }, ti = { class: "vuefinder__delete-modal__file" }, ni = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, si = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, oi = { class: "vuefinder__delete-modal__file-name" }, ri = { class: "vuefinder__delete-modal__warning" }, vs = {
  __name: "ModalDelete",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = F(e.modal.data.items), o = F(""), c = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: r.value.map(({ path: d, type: f }) => ({ path: d, type: f }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("Files deleted.") }), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: e.fs.data.dirname
            }
          });
        },
        onError: (d) => {
          o.value = s(d.message), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: e.fs.data.dirname
            }
          });
        }
      });
    };
    return (d, f) => (m(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, w(a(s)("Yes, Delete!")), 1),
        l("button", {
          type: "button",
          onClick: f[1] || (f[1] = (i) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(s)("Cancel")), 1),
        l("div", ri, w(a(s)("This action cannot be undone.")), 1)
      ]),
      default: ne(() => [
        l("div", null, [
          W(dt, {
            icon: a(Io),
            title: a(s)("Delete files")
          }, null, 8, ["icon", "title"]),
          l("div", Zl, [
            l("div", Jl, [
              l("p", Ql, w(a(s)("Are you sure you want to delete these files?")), 1),
              l("div", ei, [
                (m(!0), b(ke, null, Ce(r.value, (i) => (m(), b("p", ti, [
                  i.type === "dir" ? (m(), b("svg", ni, f[2] || (f[2] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (m(), b("svg", si, f[3] || (f[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  l("span", oi, w(i.basename), 1)
                ]))), 256))
              ]),
              o.value.length ? (m(), X(st, {
                key: 0,
                onHidden: f[0] || (f[0] = (i) => o.value = ""),
                error: ""
              }, {
                default: ne(() => [
                  Q(w(o.value), 1)
                ]),
                _: 1
              })) : j("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function li(n, e) {
  return m(), b("svg", ai, e[0] || (e[0] = [
    l("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ]));
}
const Ro = { render: li }, ii = { class: "vuefinder__rename-modal__content" }, ci = { class: "vuefinder__rename-modal__item" }, di = { class: "vuefinder__rename-modal__item-info" }, ui = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, fi = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, vi = { class: "vuefinder__rename-modal__item-name" }, _s = {
  __name: "ModalRename",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = F(e.modal.data.items[0]), o = F(e.modal.data.items[0].basename), c = F(""), d = () => {
      o.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: r.value.path,
          name: o.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", {
            label: s("%s is renamed.", o.value)
          }), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: e.fs.data.dirname
            }
          });
        },
        onError: (f) => {
          c.value = s(f.message);
        }
      });
    };
    return (f, i) => (m(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, w(a(s)("Rename")), 1),
        l("button", {
          type: "button",
          onClick: i[2] || (i[2] = (v) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(s)("Cancel")), 1)
      ]),
      default: ne(() => [
        l("div", null, [
          W(dt, {
            icon: a(Ro),
            title: a(s)("Rename")
          }, null, 8, ["icon", "title"]),
          l("div", ii, [
            l("div", ci, [
              l("p", di, [
                r.value.type === "dir" ? (m(), b("svg", ui, i[3] || (i[3] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (m(), b("svg", fi, i[4] || (i[4] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                l("span", vi, w(r.value.basename), 1)
              ]),
              he(l("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (v) => o.value = v),
                onKeyup: It(d, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Rt, o.value]
              ]),
              c.value.length ? (m(), X(st, {
                key: 0,
                onHidden: i[1] || (i[1] = (v) => c.value = ""),
                error: ""
              }, {
                default: ne(() => [
                  Q(w(c.value), 1)
                ]),
                _: 1
              })) : j("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Ze = {
  ESCAPE: "Escape",
  F2: "F2",
  F5: "F5",
  DELETE: "Delete",
  ENTER: "Enter",
  BACKSLASH: "Backslash",
  KEY_A: "KeyA",
  KEY_E: "KeyE",
  KEY_F: "KeyF"
};
function _i(n) {
  const e = (s) => {
    s.code === Ze.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible && (n.fs.searchMode || (s.code === Ze.F2 && n.features.includes(_e.RENAME) && (n.dragSelect.getCount() !== 1 || n.modal.open(_s, { items: n.dragSelect.getSelected() })), s.code === Ze.F5 && n.emitter.emit("vf-fetch", { params: { q: "index", adapter: n.fs.adapter, path: n.fs.data.dirname } }), s.code === Ze.DELETE && (!n.dragSelect.getCount() || n.modal.open(vs, { items: n.dragSelect.getSelected() })), s.metaKey && s.code === Ze.BACKSLASH && n.modal.open(Wl), s.metaKey && s.code === Ze.KEY_F && n.features.includes(_e.SEARCH) && (n.fs.searchMode = !0, s.preventDefault()), s.metaKey && s.code === Ze.KEY_E && (n.showTreeView = !n.showTreeView, n.storage.setStore("show-tree-view", n.showTreeView)), s.metaKey && s.code === Ze.ENTER && (n.fullScreen = !n.fullScreen, n.root.focus()), s.metaKey && s.code === Ze.KEY_A && (n.dragSelect.selectAll(), s.preventDefault())));
  };
  Ee(() => {
    n.root.addEventListener("keydown", e);
  });
}
const mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function pi(n, e) {
  return m(), b("svg", mi, e[0] || (e[0] = [
    l("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const Uo = { render: pi }, hi = { class: "vuefinder__new-folder-modal__content" }, gi = { class: "vuefinder__new-folder-modal__form" }, bi = { class: "vuefinder__new-folder-modal__description" }, wi = ["placeholder"], Ho = {
  __name: "ModalNewFolder",
  setup(n) {
    const e = le("ServiceContainer"), { getStore: s } = e.storage, { t: r } = e.i18n, o = F(""), c = F(""), d = () => {
      o.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: o.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", {
            label: r("%s is created.", o.value)
          }), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: e.fs.data.dirname
            }
          });
        },
        onError: (f) => {
          c.value = r(f.message);
        }
      });
    };
    return (f, i) => (m(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, w(a(r)("Create")), 1),
        l("button", {
          type: "button",
          onClick: i[2] || (i[2] = (v) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(r)("Cancel")), 1)
      ]),
      default: ne(() => [
        l("div", null, [
          W(dt, {
            icon: a(Uo),
            title: a(r)("New Folder")
          }, null, 8, ["icon", "title"]),
          l("div", hi, [
            l("div", gi, [
              l("p", bi, w(a(r)("Create a new folder")), 1),
              he(l("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (v) => o.value = v),
                onKeyup: It(d, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: a(r)("Folder Name"),
                type: "text"
              }, null, 40, wi), [
                [Rt, o.value]
              ]),
              c.value.length ? (m(), X(st, {
                key: 0,
                onHidden: i[1] || (i[1] = (v) => c.value = ""),
                error: ""
              }, {
                default: ne(() => [
                  Q(w(c.value), 1)
                ]),
                _: 1
              })) : j("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
};
function Zn(n, e = 14) {
  let s = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(s), "$2..$4");
}
const yi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ki(n, e) {
  return m(), b("svg", yi, e[0] || (e[0] = [
    l("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ]));
}
const Bo = { render: ki }, xi = { class: "vuefinder__upload-modal__content" }, Si = {
  key: 0,
  class: "pointer-events-none"
}, $i = {
  key: 1,
  class: "pointer-events-none"
}, Ci = ["disabled"], Ei = ["disabled"], Ti = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Ai = ["textContent"], Di = { class: "vuefinder__upload-modal__file-info" }, Mi = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Oi = { class: "vuefinder__upload-modal__file-name md:hidden" }, Li = {
  key: 0,
  class: "ml-auto"
}, Vi = ["title", "disabled", "onClick"], Fi = {
  key: 0,
  class: "py-2"
}, Ii = ["disabled"], Ri = {
  __name: "ModalUpload",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = s("uppy"), o = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = F({ QUEUE_ENTRY_STATUS: o }), d = F(null), f = F(null), i = F(null), v = F(null), _ = F(null), u = F(null), p = F([]), h = F(""), g = F(!1), y = F(!1);
    let S;
    function D(L) {
      return p.value.findIndex((H) => H.id === L);
    }
    function U(L, H = null) {
      H = H ?? (L.webkitRelativePath || L.name), S.addFile({
        name: H,
        type: L.type,
        data: L,
        source: "Local"
      });
    }
    function V(L) {
      switch (L.status) {
        case o.DONE:
          return "text-green-600";
        case o.ERROR:
          return "text-red-600";
        case o.CANCELED:
          return "text-red-600";
        case o.PENDING:
        default:
          return "";
      }
    }
    const k = (L) => {
      switch (L.status) {
        case o.DONE:
          return "✓";
        case o.ERROR:
        case o.CANCELED:
          return "!";
        case o.PENDING:
        default:
          return "...";
      }
    };
    function O() {
      v.value.click();
    }
    function R() {
      if (!g.value) {
        if (!p.value.filter((L) => L.status !== o.DONE).length) {
          h.value = s("Please select file to upload first.");
          return;
        }
        h.value = "", S.retryAll(), S.upload();
      }
    }
    function C() {
      S.cancelAll({ reason: "user" }), p.value.forEach((L) => {
        L.status !== o.DONE && (L.status = o.CANCELED, L.statusName = s("Canceled"));
      }), g.value = !1;
    }
    function x(L) {
      g.value || (S.removeFile(L.id, "removed-by-user"), p.value.splice(D(L.id), 1));
    }
    function T(L) {
      if (!g.value) {
        if (S.cancelAll({ reason: "user" }), L) {
          const H = [];
          p.value.forEach(($) => {
            $.status !== o.DONE && H.push($);
          }), p.value = [], H.forEach(($) => {
            U($.originalFile, $.name);
          });
          return;
        }
        p.value.splice(0);
      }
    }
    function A() {
      e.modal.close();
    }
    function I() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return Ee(async () => {
      S = new pr({
        debug: e.debug,
        restrictions: {
          maxFileSize: Er(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded($, N) {
          if (N[$.id] != null) {
            const ee = D($.id);
            p.value[ee].status === o.PENDING && (h.value = S.i18n("noDuplicates", { fileName: $.name })), p.value = p.value.filter((oe) => oe.id !== $.id);
          }
          return p.value.push({
            id: $.id,
            name: $.name,
            size: e.filesize($.size),
            status: o.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: $.data
          }), !0;
        }
      }), S.use(hr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError($, N) {
          let P;
          try {
            P = JSON.parse($).message;
          } catch {
            P = s("Cannot parse server response.");
          }
          return new Error(P);
        }
      }), S.on("restriction-failed", ($, N) => {
        const P = p.value[D($.id)];
        x(P), h.value = N.message;
      }), S.on("upload", () => {
        const $ = I();
        S.setMeta({ ...$.body });
        const N = S.getPlugin("XHRUpload");
        N.opts.method = $.method, N.opts.endpoint = $.url + "?" + new URLSearchParams($.params), N.opts.headers = $.headers, delete $.headers["Content-Type"], g.value = !0, p.value.forEach((P) => {
          P.status !== o.DONE && (P.percent = null, P.status = o.UPLOADING, P.statusName = s("Pending upload"));
        });
      }), S.on("upload-progress", ($, N) => {
        const P = Math.floor(N.bytesUploaded / N.bytesTotal * 100);
        p.value[D($.id)].percent = `${P}%`;
      }), S.on("upload-success", ($) => {
        const N = p.value[D($.id)];
        N.status = o.DONE, N.statusName = s("Done"), e.emitter.emit("vf-fetch", {
          params: {
            q: "index",
            adapter: e.fs.adapter,
            path: e.fs.data.dirname
          }
        });
      }), S.on("upload-error", ($, N) => {
        const P = p.value[D($.id)];
        P.percent = null, P.status = o.ERROR, N.isNetworkError ? P.statusName = s(
          "Network Error, Unable establish connection to the server or interrupted."
        ) : P.statusName = N ? N.message : s("Unknown Error");
      }), S.on("error", ($) => {
        h.value = $.message, g.value = !1, e.emitter.emit("vf-fetch", {
          params: {
            q: "index",
            adapter: e.fs.adapter,
            path: e.fs.data.dirname
          },
          noCloseModal: !0
        });
      }), S.on("complete", () => {
        g.value = !1, e.emitter.emit("vf-fetch", {
          params: {
            q: "index",
            adapter: e.fs.adapter,
            path: e.fs.data.dirname
          },
          noCloseModal: !0
        });
      }), v.value.addEventListener("click", () => {
        f.value.click();
      }), _.value.addEventListener("click", () => {
        i.value.click();
      }), u.value.addEventListener("dragover", ($) => {
        $.preventDefault(), y.value = !0;
      }), u.value.addEventListener("dragleave", ($) => {
        $.preventDefault(), y.value = !1;
      });
      function L($, N) {
        N.isFile && N.file((P) => $(N, P)), N.isDirectory && N.createReader().readEntries((P) => {
          P.forEach((ee) => {
            L($, ee);
          });
        });
      }
      u.value.addEventListener("drop", ($) => {
        $.preventDefault(), y.value = !1;
        const N = /^[/\\](.+)/;
        [...$.dataTransfer.items].forEach((P) => {
          P.kind === "file" && L((ee, oe) => {
            const se = N.exec(ee.fullPath);
            U(oe, se[1]);
          }, P.webkitGetAsEntry());
        });
      });
      const H = ({ target: $ }) => {
        const N = $.files;
        for (const P of N)
          U(P);
        $.value = "";
      };
      f.value.addEventListener("change", H), i.value.addEventListener("change", H);
    }), Ps(() => {
      S == null || S.close({ reason: "unmount" });
    }), (L, H) => (m(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: g.value,
          onClick: et(R, ["prevent"])
        }, w(a(s)("Upload")), 9, Ii),
        g.value ? (m(), b("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: et(C, ["prevent"])
        }, w(a(s)("Cancel")), 1)) : (m(), b("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: et(A, ["prevent"])
        }, w(a(s)("Close")), 1))
      ]),
      default: ne(() => [
        l("div", null, [
          W(dt, {
            icon: a(Bo),
            title: a(s)("Upload Files")
          }, null, 8, ["icon", "title"]),
          l("div", xi, [
            l("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: u,
              onClick: O
            }, [
              y.value ? (m(), b("div", Si, w(a(s)("Release to drop these files.")), 1)) : (m(), b("div", $i, w(a(s)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            l("div", {
              ref_key: "container",
              ref: d,
              class: "vuefinder__upload-modal__buttons"
            }, [
              l("button", {
                ref_key: "pickFiles",
                ref: v,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, w(a(s)("Select Files")), 513),
              l("button", {
                ref_key: "pickFolders",
                ref: _,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, w(a(s)("Select Folders")), 513),
              l("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: g.value,
                onClick: H[0] || (H[0] = ($) => T(!1))
              }, w(a(s)("Clear all")), 9, Ci),
              l("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: g.value,
                onClick: H[1] || (H[1] = ($) => T(!0))
              }, w(a(s)("Clear only successful")), 9, Ei)
            ], 512),
            l("div", Ti, [
              (m(!0), b(ke, null, Ce(p.value, ($) => (m(), b("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: $.id
              }, [
                l("span", {
                  class: de(["vuefinder__upload-modal__file-icon", V($)])
                }, [
                  l("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: w(k($))
                  }, null, 8, Ai)
                ], 2),
                l("div", Di, [
                  l("div", Mi, w(a(Zn)($.name, 40)) + " (" + w($.size) + ") ", 1),
                  l("div", Oi, w(a(Zn)($.name, 16)) + " (" + w($.size) + ") ", 1),
                  l("div", {
                    class: de(["vuefinder__upload-modal__file-status", V($)])
                  }, [
                    Q(w($.statusName) + " ", 1),
                    $.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (m(), b("b", Li, w($.percent), 1)) : j("", !0)
                  ], 2)
                ]),
                l("button", {
                  type: "button",
                  class: de(["vuefinder__upload-modal__file-remove", g.value ? "disabled" : ""]),
                  title: a(s)("Delete"),
                  disabled: g.value,
                  onClick: (N) => x($)
                }, H[3] || (H[3] = [
                  l("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ]), 10, Vi)
              ]))), 128)),
              p.value.length ? j("", !0) : (m(), b("div", Fi, w(a(s)("No files selected!")), 1))
            ]),
            h.value.length ? (m(), X(st, {
              key: 0,
              onHidden: H[2] || (H[2] = ($) => h.value = ""),
              error: ""
            }, {
              default: ne(() => [
                Q(w(h.value), 1)
              ]),
              _: 1
            })) : j("", !0)
          ])
        ]),
        l("input", {
          ref_key: "internalFileInput",
          ref: f,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        l("input", {
          ref_key: "internalFolderInput",
          ref: i,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}, Ui = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Hi(n, e) {
  return m(), b("svg", Ui, e[0] || (e[0] = [
    l("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const No = { render: Hi }, Bi = { class: "vuefinder__unarchive-modal__content" }, Ni = { class: "vuefinder__unarchive-modal__items" }, Pi = { class: "vuefinder__unarchive-modal__item" }, qi = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zi = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ji = { class: "vuefinder__unarchive-modal__item-name" }, Gi = { class: "vuefinder__unarchive-modal__info" }, Po = {
  __name: "ModalUnarchive",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = F(e.modal.data.items[0]), o = F(""), c = F([]), d = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: r.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file unarchived.") });
        },
        onError: (f) => {
          o.value = s(f.message);
        }
      });
    };
    return (f, i) => (m(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, w(a(s)("Unarchive")), 1),
        l("button", {
          type: "button",
          onClick: i[1] || (i[1] = (v) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(s)("Cancel")), 1)
      ]),
      default: ne(() => [
        l("div", null, [
          W(dt, {
            icon: a(No),
            title: a(s)("Unarchive")
          }, null, 8, ["icon", "title"]),
          l("div", Bi, [
            l("div", Ni, [
              (m(!0), b(ke, null, Ce(c.value, (v) => (m(), b("p", Pi, [
                v.type === "dir" ? (m(), b("svg", qi, i[2] || (i[2] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (m(), b("svg", zi, i[3] || (i[3] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                l("span", ji, w(v.basename), 1)
              ]))), 256)),
              l("p", Gi, w(a(s)("The archive will be unarchived at")) + " (" + w(a(e).fs.data.dirname) + ")", 1),
              o.value.length ? (m(), X(st, {
                key: 0,
                onHidden: i[0] || (i[0] = (v) => o.value = ""),
                error: ""
              }, {
                default: ne(() => [
                  Q(w(o.value), 1)
                ]),
                _: 1
              })) : j("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Wi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Yi(n, e) {
  return m(), b("svg", Wi, e[0] || (e[0] = [
    l("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const qo = { render: Yi }, Ki = { class: "vuefinder__archive-modal__content" }, Xi = { class: "vuefinder__archive-modal__form" }, Zi = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Ji = { class: "vuefinder__archive-modal__file" }, Qi = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ec = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, tc = { class: "vuefinder__archive-modal__file-name" }, nc = ["placeholder"], zo = {
  __name: "ModalArchive",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = F(""), o = F(""), c = F(e.modal.data.items), d = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: c.value.map(({ path: f, type: i }) => ({ path: f, type: i })),
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file(s) archived.") });
        },
        onError: (f) => {
          o.value = s(f.message);
        }
      });
    };
    return (f, i) => (m(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, w(a(s)("Archive")), 1),
        l("button", {
          type: "button",
          onClick: i[2] || (i[2] = (v) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(s)("Cancel")), 1)
      ]),
      default: ne(() => [
        l("div", null, [
          W(dt, {
            icon: a(qo),
            title: a(s)("Archive the files")
          }, null, 8, ["icon", "title"]),
          l("div", Ki, [
            l("div", Xi, [
              l("div", Zi, [
                (m(!0), b(ke, null, Ce(c.value, (v) => (m(), b("p", Ji, [
                  v.type === "dir" ? (m(), b("svg", Qi, i[3] || (i[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (m(), b("svg", ec, i[4] || (i[4] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  l("span", tc, w(v.basename), 1)
                ]))), 256))
              ]),
              he(l("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (v) => r.value = v),
                onKeyup: It(d, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: a(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, nc), [
                [Rt, r.value]
              ]),
              o.value.length ? (m(), X(st, {
                key: 0,
                onHidden: i[1] || (i[1] = (v) => o.value = ""),
                error: ""
              }, {
                default: ne(() => [
                  Q(w(o.value), 1)
                ]),
                _: 1
              })) : j("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, sc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function oc(n, e) {
  return m(), b("svg", sc, e[0] || (e[0] = [
    l("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
    }, null, -1),
    l("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ]));
}
const ms = { render: oc }, rc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ac(n, e) {
  return m(), b("svg", rc, e[0] || (e[0] = [
    l("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ]));
}
const lc = { render: ac }, ic = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function cc(n, e) {
  return m(), b("svg", ic, e[0] || (e[0] = [
    l("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ]));
}
const dc = { render: cc }, uc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function fc(n, e) {
  return m(), b("svg", uc, e[0] || (e[0] = [
    l("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ]));
}
const vc = { render: fc }, _c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function mc(n, e) {
  return m(), b("svg", _c, e[0] || (e[0] = [
    l("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ]));
}
const pc = { render: mc }, hc = { class: "vuefinder__toolbar" }, gc = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, bc = ["title"], wc = ["title"], yc = ["title"], kc = ["title"], xc = ["title"], Sc = ["title"], $c = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Cc = { class: "pl-2" }, Ec = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Tc = { class: "vuefinder__toolbar__controls" }, Ac = ["title"], Dc = ["title"], Mc = {
  __name: "Toolbar",
  setup(n) {
    const e = le("ServiceContainer"), { setStore: s } = e.storage, { t: r } = e.i18n, o = e.dragSelect, c = F("");
    e.emitter.on("vf-search-query", ({ newQuery: i }) => {
      c.value = i;
    });
    const d = () => {
      e.fullScreen = !e.fullScreen;
    };
    Le(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", s("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const f = () => {
      e.view = e.view === "list" ? "grid" : "list", o.refreshSelection(), s("viewport", e.view);
    };
    return (i, v) => (m(), b("div", hc, [
      c.value.length ? (m(), b("div", $c, [
        l("div", Cc, [
          Q(w(a(r)("Search results for")) + " ", 1),
          l("span", Ec, w(c.value), 1)
        ]),
        a(e).loadingIndicator === "circular" && a(e).fs.loading ? (m(), X(a(ms), { key: 0 })) : j("", !0)
      ])) : (m(), b("div", gc, [
        a(e).features.includes(a(_e).NEW_FOLDER) ? (m(), b("div", {
          key: 0,
          class: "mx-1.5",
          title: a(r)("New Folder"),
          onClick: v[0] || (v[0] = (_) => a(e).modal.open(Ho, { items: a(o).getSelected() }))
        }, [
          W(a(Uo))
        ], 8, bc)) : j("", !0),
        a(e).features.includes(a(_e).UPLOAD) ? (m(), b("div", {
          key: 1,
          class: "mx-1.5",
          title: a(r)("Upload"),
          onClick: v[1] || (v[1] = (_) => a(e).modal.open(Ri, { items: a(o).getSelected() }))
        }, [
          W(a(Bo))
        ], 8, wc)) : j("", !0),
        a(e).features.includes(a(_e).RENAME) ? (m(), b("div", {
          key: 2,
          class: "mx-1.5",
          title: a(r)("Rename"),
          onClick: v[2] || (v[2] = (_) => a(o).getCount() !== 1 || a(e).modal.open(_s, { items: a(o).getSelected() }))
        }, [
          W(a(Ro), {
            class: de(a(o).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, yc)) : j("", !0),
        a(e).features.includes(a(_e).DELETE) ? (m(), b("div", {
          key: 3,
          class: "mx-1.5",
          title: a(r)("Delete"),
          onClick: v[3] || (v[3] = (_) => !a(o).getCount() || a(e).modal.open(vs, { items: a(o).getSelected() }))
        }, [
          W(a(Io), {
            class: de(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, kc)) : j("", !0),
        a(e).features.includes(a(_e).UNARCHIVE) && a(o).getCount() === 1 && a(o).getSelected()[0].mime_type === "application/zip" ? (m(), b("div", {
          key: 4,
          class: "mx-1.5",
          title: a(r)("Unarchive"),
          onClick: v[4] || (v[4] = (_) => !a(o).getCount() || a(e).modal.open(Po, { items: a(o).getSelected() }))
        }, [
          W(a(No), {
            class: de(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, xc)) : j("", !0),
        a(e).features.includes(a(_e).ARCHIVE) ? (m(), b("div", {
          key: 5,
          class: "mx-1.5",
          title: a(r)("Archive"),
          onClick: v[5] || (v[5] = (_) => !a(o).getCount() || a(e).modal.open(zo, { items: a(o).getSelected() }))
        }, [
          W(a(qo), {
            class: de(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Sc)) : j("", !0)
      ])),
      l("div", Tc, [
        a(e).features.includes(a(_e).FULL_SCREEN) ? (m(), b("div", {
          key: 0,
          onClick: d,
          class: "mx-1.5",
          title: a(r)("Toggle Full Screen")
        }, [
          a(e).fullScreen ? (m(), X(a(dc), { key: 0 })) : (m(), X(a(lc), { key: 1 }))
        ], 8, Ac)) : j("", !0),
        l("div", {
          class: "mx-1.5",
          title: a(r)("Change View"),
          onClick: v[6] || (v[6] = (_) => c.value.length || f())
        }, [
          a(e).view === "grid" ? (m(), X(a(vc), {
            key: 0,
            class: de(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : j("", !0),
          a(e).view === "list" ? (m(), X(a(pc), {
            key: 1,
            class: de(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : j("", !0)
        ], 8, Dc)
      ])
    ]));
  }
}, Oc = (n, e = 0, s = !1) => {
  let r;
  return (...o) => {
    s && !r && n(...o), clearTimeout(r), r = setTimeout(() => {
      n(...o);
    }, e);
  };
}, Us = (n, e, s) => {
  const r = F(n);
  return lr((o, c) => ({
    get() {
      return o(), r.value;
    },
    set: Oc(
      (d) => {
        r.value = d, c();
      },
      e,
      s
    )
  }));
}, Lc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Vc(n, e) {
  return m(), b("svg", Lc, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ]));
}
const Fc = { render: Vc }, Ic = { class: "vuefinder__move-modal__content" }, Rc = { class: "vuefinder__move-modal__description" }, Uc = { class: "vuefinder__move-modal__files vf-scrollbar" }, Hc = { class: "vuefinder__move-modal__file" }, Bc = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Nc = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pc = { class: "vuefinder__move-modal__file-name" }, qc = { class: "vuefinder__move-modal__target-title" }, zc = { class: "vuefinder__move-modal__target-directory" }, jc = { class: "vuefinder__move-modal__target-path" }, Gc = { class: "vuefinder__move-modal__selected-items" }, Jn = {
  __name: "ModalMove",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = F(e.modal.data.items.from), o = F(""), c = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: r.value.map(({ path: d, type: f }) => ({ path: d, type: f })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", {
            label: s("Files moved.", e.modal.data.items.to.name)
          }), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: e.fs.data.dirname
            }
          });
        },
        onError: (d) => {
          o.value = s(d.message), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: e.fs.data.dirname
            }
          });
        }
      });
    };
    return (d, f) => (m(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, w(a(s)("Yes, Move!")), 1),
        l("button", {
          type: "button",
          onClick: f[1] || (f[1] = (i) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(s)("Cancel")), 1),
        l("div", Gc, w(a(s)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: ne(() => [
        l("div", null, [
          W(dt, {
            icon: a(Fc),
            title: a(s)("Move files")
          }, null, 8, ["icon", "title"]),
          l("div", Ic, [
            l("p", Rc, w(a(s)("Are you sure you want to move these files?")), 1),
            l("div", Uc, [
              (m(!0), b(ke, null, Ce(r.value, (i) => (m(), b("div", Hc, [
                l("div", null, [
                  i.type === "dir" ? (m(), b("svg", Bc, f[2] || (f[2] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (m(), b("svg", Nc, f[3] || (f[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                l("div", Pc, w(i.path), 1)
              ]))), 256))
            ]),
            l("h4", qc, w(a(s)("Target Directory")), 1),
            l("p", zc, [
              f[4] || (f[4] = l("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "stroke-width": "1"
              }, [
                l("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                })
              ], -1)),
              l("span", jc, w(a(e).modal.data.items.to.path), 1)
            ]),
            o.value.length ? (m(), X(st, {
              key: 0,
              onHidden: f[0] || (f[0] = (i) => o.value = ""),
              error: ""
            }, {
              default: ne(() => [
                Q(w(o.value), 1)
              ]),
              _: 1
            })) : j("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Wc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function Yc(n, e) {
  return m(), b("svg", Wc, e[0] || (e[0] = [
    l("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ]));
}
const Kc = { render: Yc }, Xc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Zc(n, e) {
  return m(), b("svg", Xc, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Jc = { render: Zc }, Qc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function ed(n, e) {
  return m(), b("svg", Qc, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const td = { render: ed }, nd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function sd(n, e) {
  return m(), b("svg", nd, e[0] || (e[0] = [
    l("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ]));
}
const od = { render: sd }, rd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function ad(n, e) {
  return m(), b("svg", rd, e[0] || (e[0] = [
    l("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ]));
}
const ld = { render: ad }, id = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function cd(n, e) {
  return m(), b("svg", id, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const dd = { render: cd }, ud = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function fd(n, e) {
  return m(), b("svg", ud, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ]));
}
const xn = { render: fd }, vd = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function _d(n, e) {
  return m(), b("svg", vd, e[0] || (e[0] = [
    l("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ]));
}
const md = { render: _d }, pd = { class: "vuefinder__breadcrumb__container" }, hd = ["title"], gd = ["title"], bd = ["title"], wd = { class: "vuefinder__breadcrumb__list" }, yd = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, kd = { class: "relative" }, xd = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], Sd = { class: "vuefinder__breadcrumb__search-mode" }, $d = ["placeholder"], Cd = { class: "vuefinder__breadcrumb__hidden-dropdown" }, Ed = ["onDrop", "onClick"], Td = { class: "vuefinder__breadcrumb__hidden-item-content" }, Ad = { class: "vuefinder__breadcrumb__hidden-item-text" }, Dd = {
  __name: "Breadcrumb",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = e.dragSelect, { setStore: o } = e.storage, c = F(null), d = Us(0, 100);
    Le(d, (C) => {
      const x = c.value.children;
      let T = 0, A = 0, I = 5, L = 1;
      e.fs.limitBreadcrumbItems(I), _t(() => {
        for (let H = x.length - 1; H >= 0 && !(T + x[H].offsetWidth > d.value - 40); H--)
          T += parseInt(x[H].offsetWidth, 10), A++;
        A < L && (A = L), A > I && (A = I), e.fs.limitBreadcrumbItems(A);
      });
    });
    const f = () => {
      d.value = c.value.offsetWidth;
    };
    let i = F(null);
    Ee(() => {
      i.value = new ResizeObserver(f), i.value.observe(c.value);
    }), Qn(() => {
      i.value.disconnect();
    });
    const v = (C, x = null) => {
      C.preventDefault(), r.isDraggingRef.value = !1, p(C), x ?? (x = e.fs.hiddenBreadcrumbs.length - 1);
      let T = JSON.parse(C.dataTransfer.getData("items"));
      if (T.find((A) => A.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Jn, {
        items: {
          from: T,
          to: e.fs.hiddenBreadcrumbs[x] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, _ = (C, x = null) => {
      C.preventDefault(), r.isDraggingRef.value = !1, p(C), x ?? (x = e.fs.breadcrumbs.length - 2);
      let T = JSON.parse(C.dataTransfer.getData("items"));
      if (T.find((A) => A.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Jn, {
        items: {
          from: T,
          to: e.fs.breadcrumbs[x] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, u = (C) => {
      C.preventDefault(), e.fs.isGoUpAvailable() ? (C.dataTransfer.dropEffect = "copy", C.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (C.dataTransfer.dropEffect = "none", C.dataTransfer.effectAllowed = "none");
    }, p = (C) => {
      C.preventDefault(), C.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && C.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, h = () => {
      O(), e.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }, g = () => {
      O(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, y = (C) => {
      e.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: e.fs.adapter, path: C.path }
      }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, S = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, D = {
      mounted(C, x, T, A) {
        C.clickOutsideEvent = function(I) {
          C === I.target || C.contains(I.target) || x.value();
        }, document.body.addEventListener("click", C.clickOutsideEvent);
      },
      beforeUnmount(C, x, T, A) {
        document.body.removeEventListener("click", C.clickOutsideEvent);
      }
    };
    Le(
      () => e.showTreeView,
      (C, x) => {
        C !== x && o("show-tree-view", C);
      }
    );
    const U = F(null), V = () => {
      e.features.includes(_e.SEARCH) && (e.fs.searchMode = !0, _t(() => U.value.focus()));
    }, k = Us("", 400);
    Le(k, (C) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: C });
    }), Le(
      () => e.fs.searchMode,
      (C) => {
        C && _t(() => U.value.focus());
      }
    );
    const O = () => {
      e.fs.searchMode = !1, k.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      O();
    });
    const R = () => {
      k.value === "" && O();
    };
    return (C, x) => (m(), b("div", pd, [
      l("span", {
        title: a(s)("Go up a directory")
      }, [
        W(a(Jc), {
          onDragover: x[0] || (x[0] = (T) => u(T)),
          onDragleave: x[1] || (x[1] = (T) => p(T)),
          onDrop: x[2] || (x[2] = (T) => _(T)),
          onClick: g,
          class: de(
            a(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
          )
        }, null, 8, ["class"])
      ], 8, hd),
      a(e).fs.loading ? (m(), b("span", {
        key: 1,
        title: a(s)("Cancel")
      }, [
        W(a(td), {
          onClick: x[3] || (x[3] = (T) => a(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, bd)) : (m(), b("span", {
        key: 0,
        title: a(s)("Refresh")
      }, [
        W(a(Kc), { onClick: h })
      ], 8, gd)),
      he(l("div", {
        onClick: et(V, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        l("div", null, [
          W(a(od), {
            onDragover: x[4] || (x[4] = (T) => u(T)),
            onDragleave: x[5] || (x[5] = (T) => p(T)),
            onDrop: x[6] || (x[6] = (T) => _(T, -1)),
            onClick: x[7] || (x[7] = (T) => a(e).emitter.emit("vf-fetch", {
              params: { q: "index", adapter: a(e).fs.adapter }
            }))
          })
        ]),
        l("div", wd, [
          a(e).fs.hiddenBreadcrumbs.length ? he((m(), b("div", yd, [
            x[13] || (x[13] = l("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("div", kd, [
              l("span", {
                onDragenter: x[8] || (x[8] = (T) => a(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: x[9] || (x[9] = (T) => a(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                W(a(md), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [D, S]
          ]) : j("", !0)
        ]),
        l("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: et(V, ["self"])
        }, [
          (m(!0), b(ke, null, Ce(a(e).fs.breadcrumbs, (T, A) => (m(), b("div", { key: A }, [
            x[14] || (x[14] = l("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("span", {
              onDragover: (I) => A === a(e).fs.breadcrumbs.length - 1 || u(I),
              onDragleave: (I) => A === a(e).fs.breadcrumbs.length - 1 || p(I),
              onDrop: (I) => A === a(e).fs.breadcrumbs.length - 1 || _(I, A),
              class: "vuefinder__breadcrumb__item",
              title: T.basename,
              onClick: (I) => a(e).emitter.emit("vf-fetch", {
                params: {
                  q: "index",
                  adapter: a(e).fs.adapter,
                  path: T.path
                }
              })
            }, w(T.name), 41, xd)
          ]))), 128))
        ], 512),
        a(e).loadingIndicator === "circular" && a(e).fs.loading ? (m(), X(a(ms), { key: 0 })) : j("", !0)
      ], 512), [
        [Ge, !a(e).fs.searchMode]
      ]),
      he(l("div", Sd, [
        l("div", null, [
          W(a(ld))
        ]),
        he(l("input", {
          ref_key: "searchInput",
          ref: U,
          onKeydown: It(O, ["esc"]),
          onBlur: R,
          "onUpdate:modelValue": x[10] || (x[10] = (T) => ir(k) ? k.value = T : null),
          placeholder: a(s)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, $d), [
          [Rt, a(k)]
        ]),
        W(a(dd), { onClick: O })
      ], 512), [
        [Ge, a(e).fs.searchMode]
      ]),
      he(l("div", Cd, [
        (m(!0), b(ke, null, Ce(a(e).fs.hiddenBreadcrumbs, (T, A) => (m(), b("div", {
          key: A,
          onDragover: x[11] || (x[11] = (I) => u(I)),
          onDragleave: x[12] || (x[12] = (I) => p(I)),
          onDrop: (I) => v(I, A),
          onClick: (I) => y(T),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          l("div", Td, [
            l("span", null, [
              W(a(xn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            l("span", Ad, w(T.name), 1)
          ])
        ], 40, Ed))), 128))
      ], 512), [
        [Ge, a(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, jo = (n, e = null) => new Date(n * 1e3).toLocaleString(e ?? "ru-RU"), Md = ["onClick"], Od = {
  __name: "Toast",
  setup(n) {
    const e = le("ServiceContainer"), { getStore: s } = e.storage, r = F(s("full-screen", !1)), o = F([]), c = (i) => i === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", d = (i) => {
      o.value.splice(i, 1);
    }, f = (i) => {
      let v = o.value.findIndex((_) => _.id === i);
      v !== -1 && d(v);
    };
    return e.emitter.on("vf-toast-clear", () => {
      o.value = [];
    }), e.emitter.on("vf-toast-push", (i) => {
      let v = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      i.id = v, o.value.push(i), setTimeout(() => {
        f(v);
      }, 5e3);
    }), (i, v) => (m(), b("div", {
      class: de(["vuefinder__toast", r.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      W(cr, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: ne(() => [
          (m(!0), b(ke, null, Ce(o.value, (_, u) => (m(), b("div", {
            key: u,
            onClick: (p) => d(u),
            class: de(["vuefinder__toast__message", c(_.type)])
          }, w(_.label), 11, Md))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, Ld = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Vd(n, e) {
  return m(), b("svg", Ld, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Fd = { render: Vd }, Id = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Rd(n, e) {
  return m(), b("svg", Id, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Ud = { render: Rd }, en = {
  __name: "SortIcon",
  props: { direction: String },
  setup(n) {
    return (e, s) => (m(), b("div", null, [
      n.direction === "asc" ? (m(), X(a(Fd), { key: 0 })) : j("", !0),
      n.direction === "desc" ? (m(), X(a(Ud), { key: 1 })) : j("", !0)
    ]));
  }
}, Hd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Bd(n, e) {
  return m(), b("svg", Hd, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const Nd = { render: Bd }, Pd = { class: "vuefinder__item-icon" }, Fn = {
  __name: "ItemIcon",
  props: {
    type: {
      type: String,
      required: !0
    },
    small: {
      type: Boolean,
      default: !1
    }
  },
  setup(n) {
    return (e, s) => (m(), b("span", Pd, [
      n.type === "dir" ? (m(), X(a(xn), {
        key: 0,
        class: de(n.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (m(), X(a(Nd), {
        key: 1,
        class: de(n.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, qd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function zd(n, e) {
  return m(), b("svg", qd, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const jd = { render: zd }, Gd = { class: "vuefinder__drag-item__container" }, Wd = { class: "vuefinder__drag-item__count" }, Yd = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(n) {
    const e = n;
    return (s, r) => (m(), b("div", Gd, [
      W(a(jd)),
      l("div", Wd, w(e.count), 1)
    ]));
  }
}, Kd = { class: "vuefinder__text-preview" }, Xd = { class: "vuefinder__text-preview__header" }, Zd = ["title"], Jd = { class: "vuefinder__text-preview__actions" }, Qd = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, eu = { key: 1 }, tu = {
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, r = F(""), o = F(""), c = F(null), d = F(!1), f = F(""), i = F(!1), v = le("ServiceContainer"), { t: _ } = v.i18n;
    Ee(() => {
      v.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: v.modal.data.adapter, path: v.modal.data.item.path },
        responseType: "text"
      }).then((h) => {
        r.value = h, s("success");
      });
    });
    const u = () => {
      d.value = !d.value, o.value = r.value;
    }, p = () => {
      f.value = "", i.value = !1, v.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: v.modal.data.adapter,
          path: v.modal.data.item.path
        },
        body: {
          content: o.value
        },
        responseType: "text"
      }).then((h) => {
        f.value = _("Updated."), r.value = h, s("success"), d.value = !d.value;
      }).catch((h) => {
        f.value = _(h.message), i.value = !0;
      });
    };
    return (h, g) => (m(), b("div", Kd, [
      l("div", Xd, [
        l("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: a(v).modal.data.item.path
        }, w(a(v).modal.data.item.basename), 9, Zd),
        l("div", Jd, [
          d.value ? (m(), b("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, w(a(_)("Save")), 1)) : j("", !0),
          a(v).features.includes(a(_e).EDIT) ? (m(), b("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: g[0] || (g[0] = (y) => u())
          }, w(d.value ? a(_)("Cancel") : a(_)("Edit")), 1)) : j("", !0)
        ])
      ]),
      l("div", null, [
        d.value ? (m(), b("div", eu, [
          he(l("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": g[1] || (g[1] = (y) => o.value = y),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Rt, o.value]
          ])
        ])) : (m(), b("pre", Qd, w(r.value), 1)),
        f.value.length ? (m(), X(st, {
          key: 2,
          onHidden: g[2] || (g[2] = (y) => f.value = ""),
          error: i.value
        }, {
          default: ne(() => [
            Q(w(f.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : j("", !0)
      ])
    ]));
  }
}, nu = { class: "vuefinder__image-preview" }, su = { class: "vuefinder__image-preview__header" }, ou = ["title"], ru = { class: "vuefinder__image-preview__actions" }, au = { class: "vuefinder__image-preview__image-container" }, lu = ["src"], iu = {
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, r = le("ServiceContainer"), { t: o } = r.i18n, c = F(null), d = F(null), f = F(!1), i = F(""), v = F(!1), _ = () => {
      f.value = !f.value, f.value ? d.value = new br(c.value, {
        crop(p) {
        }
      }) : d.value.destroy();
    }, u = () => {
      d.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (p) => {
          i.value = "", v.value = !1;
          const h = new FormData();
          h.set("file", p), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: h
          }).then((g) => {
            i.value = o("Updated."), c.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), _(), s("success");
          }).catch((g) => {
            i.value = o(g.message), v.value = !0;
          });
        }
      );
    };
    return Ee(() => {
      s("success");
    }), (p, h) => (m(), b("div", nu, [
      l("div", su, [
        l("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: a(r).modal.data.item.path
        }, w(a(r).modal.data.item.basename), 9, ou),
        l("div", ru, [
          f.value ? (m(), b("button", {
            key: 0,
            onClick: u,
            class: "vuefinder__image-preview__crop-button"
          }, w(a(o)("Crop")), 1)) : j("", !0),
          a(r).features.includes(a(_e).EDIT) ? (m(), b("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: h[0] || (h[0] = (g) => _())
          }, w(f.value ? a(o)("Cancel") : a(o)("Edit")), 1)) : j("", !0)
        ])
      ]),
      l("div", au, [
        l("img", {
          ref_key: "image",
          ref: c,
          class: "vuefinder__image-preview__image",
          src: a(r).requester.getPreviewUrl(a(r).modal.data.adapter, a(r).modal.data.item),
          alt: ""
        }, null, 8, lu)
      ]),
      i.value.length ? (m(), X(st, {
        key: 0,
        onHidden: h[1] || (h[1] = (g) => i.value = ""),
        error: v.value
      }, {
        default: ne(() => [
          Q(w(i.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : j("", !0)
    ]));
  }
}, cu = { class: "vuefinder__default-preview" }, du = { class: "vuefinder__default-preview__header" }, uu = ["title"], fu = {
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = le("ServiceContainer"), r = e;
    return Ee(() => {
      r("success");
    }), (o, c) => (m(), b("div", cu, [
      l("div", du, [
        l("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: a(s).modal.data.item.path
        }, w(a(s).modal.data.item.basename), 9, uu)
      ]),
      c[0] || (c[0] = l("div", null, null, -1))
    ]));
  }
}, vu = { class: "vuefinder__video-preview" }, _u = ["title"], mu = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, pu = ["src"], hu = {
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = le("ServiceContainer"), r = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ee(() => {
      r("success");
    }), (c, d) => (m(), b("div", vu, [
      l("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: a(s).modal.data.item.path
      }, w(a(s).modal.data.item.basename), 9, _u),
      l("div", null, [
        l("video", mu, [
          l("source", {
            src: o(),
            type: "video/mp4"
          }, null, 8, pu),
          d[0] || (d[0] = Q(" Your browser does not support the video tag. "))
        ])
      ])
    ]));
  }
}, gu = { class: "vuefinder__audio-preview" }, bu = ["title"], wu = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, yu = ["src"], ku = {
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, r = le("ServiceContainer"), o = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return Ee(() => {
      s("success");
    }), (c, d) => (m(), b("div", gu, [
      l("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: a(r).modal.data.item.path
      }, w(a(r).modal.data.item.basename), 9, bu),
      l("div", null, [
        l("audio", wu, [
          l("source", {
            src: o(),
            type: "audio/mpeg"
          }, null, 8, yu),
          d[0] || (d[0] = Q(" Your browser does not support the audio element. "))
        ])
      ])
    ]));
  }
}, xu = { class: "vuefinder__pdf-preview" }, Su = ["title"], $u = ["data"], Cu = ["src"], Eu = {
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = le("ServiceContainer"), r = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ee(() => {
      r("success");
    }), (c, d) => (m(), b("div", xu, [
      l("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: a(s).modal.data.item.path
      }, w(a(s).modal.data.item.basename), 9, Su),
      l("div", null, [
        l("object", {
          class: "vuefinder__pdf-preview__object",
          data: o(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          l("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: o(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Cu)
        ], 8, $u)
      ])
    ]));
  }
}, Tu = { class: "vuefinder__preview-modal__content" }, Au = { key: 0 }, Du = { class: "vuefinder__preview-modal__loading" }, Mu = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Ou = { class: "vuefinder__preview-modal__details" }, Lu = { class: "font-bold" }, Vu = { class: "font-bold pl-2" }, Fu = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Iu = ["download", "href"], Go = {
  __name: "ModalPreview",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = F(!1), o = (d) => (e.modal.data.item.mime_type ?? "").startsWith(d), c = e.features.includes(_e.PREVIEW);
    return c || (r.value = !0), (d, f) => (m(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          onClick: f[6] || (f[6] = (i) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(s)("Close")), 1),
        a(e).features.includes(a(_e).DOWNLOAD) ? (m(), b("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: a(e).requester.getDownloadUrl(a(e).modal.data.adapter, a(e).modal.data.item),
          href: a(e).requester.getDownloadUrl(a(e).modal.data.adapter, a(e).modal.data.item)
        }, w(a(s)("Download")), 9, Iu)) : j("", !0)
      ]),
      default: ne(() => [
        l("div", null, [
          l("div", Tu, [
            a(c) ? (m(), b("div", Au, [
              o("text") ? (m(), X(tu, {
                key: 0,
                onSuccess: f[0] || (f[0] = (i) => r.value = !0)
              })) : o("image") ? (m(), X(iu, {
                key: 1,
                onSuccess: f[1] || (f[1] = (i) => r.value = !0)
              })) : o("video") ? (m(), X(hu, {
                key: 2,
                onSuccess: f[2] || (f[2] = (i) => r.value = !0)
              })) : o("audio") ? (m(), X(ku, {
                key: 3,
                onSuccess: f[3] || (f[3] = (i) => r.value = !0)
              })) : o("application/pdf") ? (m(), X(Eu, {
                key: 4,
                onSuccess: f[4] || (f[4] = (i) => r.value = !0)
              })) : (m(), X(fu, {
                key: 5,
                onSuccess: f[5] || (f[5] = (i) => r.value = !0)
              }))
            ])) : j("", !0),
            l("div", Du, [
              r.value === !1 ? (m(), b("div", Mu, [
                f[7] || (f[7] = l("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  l("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  l("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                l("span", null, w(a(s)("Loading")), 1)
              ])) : j("", !0)
            ])
          ])
        ]),
        l("div", Ou, [
          l("div", null, [
            l("span", Lu, w(a(s)("File Size")) + ": ", 1),
            Q(w(a(e).filesize(a(e).modal.data.item.file_size)), 1)
          ]),
          l("div", null, [
            l("span", Vu, w(a(s)("Last Modified")) + ": ", 1),
            Q(" " + w(a(jo)(a(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        a(e).features.includes(a(_e).DOWNLOAD) ? (m(), b("div", Fu, [
          l("span", null, w(a(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : j("", !0)
      ]),
      _: 1
    }));
  }
}, Ru = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Uu(n, e) {
  return m(), b("svg", Ru, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ]));
}
const Wo = { render: Uu }, Hu = ["data-type", "data-item", "data-index"], In = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(n) {
    const e = le("ServiceContainer"), s = e.dragSelect, r = n, o = (h) => {
      h.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: h.path } })) : e.modal.open(Go, { adapter: e.fs.adapter, item: h });
    }, c = {
      mounted(h, g, y, S) {
        y.props.draggable && (h.addEventListener("dragstart", (D) => d(D, g.value)), h.addEventListener("dragover", (D) => i(D, g.value)), h.addEventListener("drop", (D) => f(D, g.value)));
      },
      beforeUnmount(h, g, y, S) {
        y.props.draggable && (h.removeEventListener("dragstart", d), h.removeEventListener("dragover", i), h.removeEventListener("drop", f));
      }
    }, d = (h, g) => {
      if (h.altKey || h.ctrlKey || h.metaKey)
        return h.preventDefault(), !1;
      s.isDraggingRef.value = !0, h.dataTransfer.setDragImage(r.dragImage.$el, 0, 15), h.dataTransfer.effectAllowed = "all", h.dataTransfer.dropEffect = "copy", h.dataTransfer.setData("items", JSON.stringify(s.getSelected()));
    }, f = (h, g) => {
      h.preventDefault(), s.isDraggingRef.value = !1;
      let y = JSON.parse(h.dataTransfer.getData("items"));
      if (y.find((S) => S.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Jn, { items: { from: y, to: g } });
    }, i = (h, g) => {
      h.preventDefault(), !g || g.type !== "dir" || s.getSelection().find((y) => y === h.currentTarget) ? (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none") : h.dataTransfer.dropEffect = "copy";
    };
    let v = null, _ = !1;
    const u = () => {
      v && clearTimeout(v);
    }, p = (h) => {
      if (!_)
        _ = !0, setTimeout(() => _ = !1, 300);
      else
        return _ = !1, o(r.item), clearTimeout(v), !1;
      v = setTimeout(() => {
        const g = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: h.target.getBoundingClientRect().x,
          clientY: h.target.getBoundingClientRect().y
        });
        h.target.dispatchEvent(g);
      }, 500);
    };
    return (h, g) => he((m(), b("div", {
      style: vn({ opacity: a(s).isDraggingRef.value && a(s).getSelection().find((y) => h.$el === y) ? "0.5 !important" : "" }),
      class: de(["vuefinder__item", "vf-item-" + a(s).explorerId]),
      "data-type": n.item.type,
      key: n.item.path,
      "data-item": JSON.stringify(n.item),
      "data-index": n.index,
      onDblclick: g[0] || (g[0] = (y) => o(n.item)),
      onTouchstart: g[1] || (g[1] = (y) => p(y)),
      onTouchend: g[2] || (g[2] = (y) => u()),
      onContextmenu: g[3] || (g[3] = et((y) => a(e).emitter.emit("vf-contextmenu-show", { event: y, items: a(s).getSelected(), target: n.item }), ["prevent"]))
    }, [
      Ot(h.$slots, "default"),
      a(e).pinnedFolders.find((y) => y.path === n.item.path) ? (m(), X(a(Wo), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : j("", !0)
    ], 46, Hu)), [
      [c, n.item]
    ]);
  }
}, Bu = { class: "vuefinder__explorer__container" }, Nu = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Pu = { class: "vuefinder__explorer__drag-item" }, qu = {
  key: 0,
  class: "vuefinder__linear-loader absolute"
}, zu = { class: "vuefinder__explorer__item-list-content" }, ju = { class: "vuefinder__explorer__item-list-name" }, Gu = { class: "vuefinder__explorer__item-name" }, Wu = { class: "vuefinder__explorer__item-path" }, Yu = { class: "vuefinder__explorer__item-list-content" }, Ku = { class: "vuefinder__explorer__item-list-name" }, Xu = { class: "vuefinder__explorer__item-name" }, Zu = { class: "vuefinder__explorer__item-size" }, Ju = { class: "vuefinder__explorer__item-date" }, Qu = { class: "vuefinder__explorer__item-grid-content" }, ef = ["data-src", "alt"], tf = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, nf = { class: "vuefinder__explorer__item-title break-all" }, sf = {
  __name: "Explorer",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = (u) => u == null ? void 0 : u.substring(0, 3), o = F(null), c = F(""), d = e.dragSelect;
    let f;
    e.emitter.on("vf-fullscreen-toggle", () => {
      d.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: u }) => {
      c.value = u, u ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: u
        },
        onSuccess: (p) => {
          p.files.length || e.emitter.emit("vf-toast-push", { label: s("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const i = $t({ active: !1, column: "", order: "" }), v = (u = !0) => {
      let p = [...e.fs.data.files], h = i.column, g = i.order === "asc" ? 1 : -1;
      if (!u)
        return p;
      const y = (S, D) => typeof S == "string" && typeof D == "string" ? S.toLowerCase().localeCompare(D.toLowerCase()) : S < D ? -1 : S > D ? 1 : 0;
      return i.active && (p = p.slice().sort((S, D) => y(S[h], D[h]) * g)), p;
    }, _ = (u) => {
      i.active && i.column === u ? (i.active = i.order === "asc", i.column = u, i.order = "desc") : (i.active = !0, i.column = u, i.order = "asc");
    };
    return Ee(() => {
      f = new gr(d.area.value);
    }), Bs(() => {
      f.update();
    }), Ps(() => {
      f.destroy();
    }), (u, p) => (m(), b("div", Bu, [
      a(e).view === "list" || c.value.length ? (m(), b("div", Nu, [
        l("div", {
          onClick: p[0] || (p[0] = (h) => _("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          Q(w(a(s)("Name")) + " ", 1),
          he(W(en, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Ge, i.active && i.column === "basename"]
          ])
        ]),
        c.value.length ? j("", !0) : (m(), b("div", {
          key: 0,
          onClick: p[1] || (p[1] = (h) => _("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          Q(w(a(s)("Size")) + " ", 1),
          he(W(en, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Ge, i.active && i.column === "file_size"]
          ])
        ])),
        c.value.length ? j("", !0) : (m(), b("div", {
          key: 1,
          onClick: p[2] || (p[2] = (h) => _("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          Q(w(a(s)("Date")) + " ", 1),
          he(W(en, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Ge, i.active && i.column === "last_modified"]
          ])
        ])),
        c.value.length ? (m(), b("div", {
          key: 2,
          onClick: p[3] || (p[3] = (h) => _("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          Q(w(a(s)("Filepath")) + " ", 1),
          he(W(en, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Ge, i.active && i.column === "path"]
          ])
        ])) : j("", !0)
      ])) : j("", !0),
      l("div", Pu, [
        W(Yd, {
          ref_key: "dragImage",
          ref: o,
          count: a(d).getCount()
        }, null, 8, ["count"])
      ]),
      l("div", {
        ref: a(d).scrollBarContainer,
        class: de(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": a(e).view === "grid" }, { "search-active": c.value.length }]])
      }, [
        l("div", {
          ref: a(d).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      l("div", {
        ref: a(d).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area min-h-32",
        onContextmenu: p[4] || (p[4] = et((h) => a(e).emitter.emit("vf-contextmenu-show", { event: h, items: a(d).getSelected() }), ["self", "prevent"]))
      }, [
        a(e).loadingIndicator === "linear" && a(e).fs.loading ? (m(), b("div", qu)) : j("", !0),
        c.value.length ? (m(!0), b(ke, { key: 1 }, Ce(v(), (h, g) => (m(), X(In, {
          item: h,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-list"
        }, {
          default: ne(() => [
            l("div", zu, [
              l("div", ju, [
                W(Fn, {
                  type: h.type,
                  small: a(e).compactListView
                }, null, 8, ["type", "small"]),
                l("span", Gu, w(h.basename), 1)
              ]),
              l("div", Wu, w(h.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : j("", !0),
        a(e).view === "list" && !c.value.length ? (m(!0), b(ke, { key: 2 }, Ce(v(), (h, g) => (m(), X(In, {
          item: h,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: h.path
        }, {
          default: ne(() => [
            l("div", Yu, [
              l("div", Ku, [
                W(Fn, {
                  type: h.type,
                  small: a(e).compactListView
                }, null, 8, ["type", "small"]),
                l("span", Xu, w(h.basename), 1)
              ]),
              l("div", Zu, w(h.file_size ? a(e).filesize(h.file_size) : ""), 1),
              l("div", Ju, w(a(jo)(h.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : j("", !0),
        a(e).view === "grid" && !c.value.length ? (m(!0), b(ke, { key: 3 }, Ce(v(!1), (h, g) => (m(), X(In, {
          item: h,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: ne(() => [
            l("div", null, [
              l("div", Qu, [
                (h.mime_type ?? "").startsWith("image") && a(e).showThumbnails ? (m(), b("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": a(e).requester.getPreviewUrl(a(e).fs.adapter, h),
                  alt: h.basename,
                  key: h.path
                }, null, 8, ef)) : (m(), X(Fn, {
                  key: 1,
                  type: h.type
                }, null, 8, ["type"])),
                !((h.mime_type ?? "").startsWith("image") && a(e).showThumbnails) && h.type !== "dir" ? (m(), b("div", tf, w(r(h.extension)), 1)) : j("", !0)
              ]),
              l("span", nf, w(a(Zn)(h.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : j("", !0)
      ], 544),
      W(Od)
    ]));
  }
}, of = ["href", "download"], rf = ["onClick"], af = {
  __name: "ContextMenu",
  setup(n) {
    const e = le("ServiceContainer"), s = F(null), r = F([]), o = F(""), c = $t({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    });
    e.emitter.on("vf-context-selected", (v) => {
      r.value = v;
    });
    const d = (v) => v.link(e, r), f = (v) => {
      e.emitter.emit("vf-contextmenu-hide"), v.action(e, r);
    };
    e.emitter.on("vf-search-query", ({ newQuery: v }) => {
      o.value = v;
    }), e.emitter.on("vf-contextmenu-show", ({ event: v, items: _, target: u = null }) => {
      if (c.items = e.contextMenuItems.filter((p) => p.show(e, {
        searchQuery: o.value,
        items: _,
        target: u
      })), o.value)
        if (u)
          e.emitter.emit("vf-context-selected", [u]);
        else
          return;
      else !u && !o.value ? e.emitter.emit("vf-context-selected", []) : _.length > 1 && _.some((p) => p.path === u.path) ? e.emitter.emit("vf-context-selected", _) : e.emitter.emit("vf-context-selected", [u]);
      i(v);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const i = (v) => {
      const _ = e.dragSelect.area.value, u = e.root.getBoundingClientRect(), p = _.getBoundingClientRect();
      let h = v.clientX - u.left, g = v.clientY - u.top;
      c.active = !0, _t(() => {
        var U;
        const y = (U = s.value) == null ? void 0 : U.getBoundingClientRect();
        let S = (y == null ? void 0 : y.height) ?? 0, D = (y == null ? void 0 : y.width) ?? 0;
        h = p.right - v.pageX + window.scrollX < D ? h - D : h, g = p.bottom - v.pageY + window.scrollY < S ? g - S : g, c.positions = {
          left: h + "px",
          top: g + "px"
        };
      });
    };
    return (v, _) => he((m(), b("ul", {
      ref_key: "contextmenu",
      ref: s,
      style: vn(c.positions),
      class: "vuefinder__context-menu"
    }, [
      (m(!0), b(ke, null, Ce(c.items, (u) => (m(), b("li", {
        class: "vuefinder__context-menu__item",
        key: u.title
      }, [
        u.link && u.type === "file" ? (m(), b("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: d(u),
          download: d(u),
          onClick: _[0] || (_[0] = (p) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          l("span", null, w(u.title(a(e).i18n)), 1)
        ], 8, of)) : (m(), b("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (p) => f(u)
        }, [
          l("span", null, w(u.title(a(e).i18n)), 1)
        ], 8, rf))
      ]))), 128))
    ], 4)), [
      [Ge, c.active]
    ]);
  }
}, lf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function cf(n, e) {
  return m(), b("svg", lf, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ]));
}
const Yo = { render: cf }, df = { class: "vuefinder__status-bar__wrapper" }, uf = { class: "vuefinder__status-bar__space" }, ff = { class: "vuefinder__status-bar__space-container" }, vf = { class: "vuefinder__status-bar__space-icon" }, _f = { class: "vuefinder__status-bar__space-text" }, mf = {
  __name: "Statusbar",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, { setStore: r } = e.storage, o = e.dragSelect, c = F("");
    e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      c.value = _;
    }), je(() => {
      const _ = e.selectButton.multiple ? o.getSelected().length > 0 : o.getSelected().length === 1;
      return e.selectButton.active && _;
    });
    const d = je(() => {
      var u, p;
      const _ = (p = (u = e.fs) == null ? void 0 : u.data) == null ? void 0 : p.used_space;
      return typeof _ == "number" ? _.toFixed(2) : "0.00";
    }), f = je(() => {
      var u, p;
      const _ = (p = (u = e.fs) == null ? void 0 : u.data) == null ? void 0 : p.total_space;
      return typeof _ == "number" ? _.toFixed(2) : "0.00";
    }), i = je(() => {
      var p, h, g, y;
      const _ = (h = (p = e.fs) == null ? void 0 : p.data) == null ? void 0 : h.used_space, u = (y = (g = e.fs) == null ? void 0 : g.data) == null ? void 0 : y.total_space;
      return typeof _ == "number" && typeof u == "number" && u !== 0 ? (_ / u * 100).toFixed(2) : "0.00";
    }), v = je(() => `Used ${d.value}Mb out of ${f.value}Mb (${i.value}%)`);
    return (_, u) => (m(), b("div", df, [
      l("div", uf, [
        l("div", ff, [
          l("span", vf, [
            W(a(Yo))
          ]),
          l("span", _f, w(v.value), 1)
        ])
      ]),
      u[0] || (u[0] = l("div", { class: "vuefinder__status-bar__actions" }, null, -1))
    ]));
  }
}, pf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function hf(n, e) {
  return m(), b("svg", pf, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ]));
}
const Ko = { render: hf }, gf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function bf(n, e) {
  return m(), b("svg", gf, e[0] || (e[0] = [
    l("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ]));
}
const wf = { render: bf }, yf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function kf(n, e) {
  return m(), b("svg", yf, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ]));
}
const Xo = { render: kf }, xf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Sf(n, e) {
  return m(), b("svg", xf, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M9 12h6" }, null, -1)
  ]));
}
const Zo = { render: Sf };
function Jo(n, e) {
  const s = n.findIndex((r) => r.path === e.path);
  s > -1 ? n[s] = e : n.push(e);
}
const $f = { class: "vuefinder__folder-loader-indicator" }, Cf = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Qo = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ dr({
    adapter: {
      type: String,
      required: !0
    },
    path: {
      type: String,
      required: !0
    }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const e = n, s = le("ServiceContainer"), { t: r } = s.i18n, o = qs(n, "modelValue"), c = F(!1);
    Le(
      () => o.value,
      () => {
        var i;
        return ((i = d()) == null ? void 0 : i.folders.length) || f();
      }
    );
    function d() {
      return s.treeViewData.find((i) => i.path === e.path);
    }
    const f = () => {
      c.value = !0, s.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: e.adapter,
          path: e.path
        }
      }).then((i) => {
        Jo(s.treeViewData, { path: e.path, ...i });
      }).catch((i) => {
      }).finally(() => {
        c.value = !1;
      });
    };
    return (i, v) => {
      var _;
      return m(), b("div", $f, [
        c.value ? (m(), X(a(ms), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (m(), b("div", Cf, [
          o.value && ((_ = d()) != null && _.folders.length) ? (m(), X(a(Zo), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : j("", !0),
          o.value ? j("", !0) : (m(), X(a(Xo), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Ef = { class: "vuefinder__treesubfolderlist__item-content" }, Tf = ["onClick"], Af = ["title", "onClick"], Df = { class: "vuefinder__treesubfolderlist__item-icon" }, Mf = { class: "vuefinder__treesubfolderlist__subfolder" }, Of = {
  __name: "TreeSubfolderList",
  props: {
    adapter: {
      type: String,
      required: !0
    },
    path: {
      type: String,
      required: !0
    }
  },
  setup(n) {
    const e = le("ServiceContainer"), s = F([]), r = n, o = F(null);
    Ee(() => {
      r.path === r.adapter + "://" && Pe(o.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const c = je(() => {
      var d;
      return ((d = e.treeViewData.find((f) => f.path === r.path)) == null ? void 0 : d.folders) || [];
    });
    return (d, f) => {
      const i = ur("TreeSubfolderList", !0);
      return m(), b("ul", {
        ref_key: "parentSubfolderList",
        ref: o,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (m(!0), b(ke, null, Ce(c.value, (v, _) => (m(), b("li", {
          key: v.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          l("div", Ef, [
            l("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (u) => s.value[v.path] = !s.value[v.path]
            }, [
              W(Qo, {
                adapter: n.adapter,
                path: v.path,
                modelValue: s.value[v.path],
                "onUpdate:modelValue": (u) => s.value[v.path] = u
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Tf),
            l("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: v.path,
              onClick: (u) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r.adapter, path: v.path } })
            }, [
              l("div", Df, [
                a(e).fs.path === v.path ? (m(), X(a(Ko), { key: 0 })) : (m(), X(a(xn), { key: 1 }))
              ]),
              l("div", {
                class: de(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": a(e).fs.path === v.path
                }])
              }, w(v.basename), 3)
            ], 8, Af)
          ]),
          l("div", Mf, [
            he(W(i, {
              adapter: r.adapter,
              path: v.path
            }, null, 8, ["adapter", "path"]), [
              [Ge, s.value[v.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, Lf = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(n) {
    const e = le("ServiceContainer"), { setStore: s } = e.storage, r = F(!1);
    function o(c) {
      c === e.fs.adapter ? r.value = !r.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: c } }), s("adapter", c));
    }
    return (c, d) => (m(), b(ke, null, [
      l("div", {
        onClick: d[2] || (d[2] = (f) => o(n.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        l("div", {
          class: de(["vuefinder__treestorageitem__info", n.storage === a(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          l("div", {
            class: de(["vuefinder__treestorageitem__icon", n.storage === a(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            W(a(Yo))
          ], 2),
          l("div", null, w(n.storage), 1)
        ], 2),
        l("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: d[1] || (d[1] = et((f) => r.value = !r.value, ["stop"]))
        }, [
          W(Qo, {
            adapter: n.storage,
            path: n.storage + "://",
            modelValue: r.value,
            "onUpdate:modelValue": d[0] || (d[0] = (f) => r.value = f)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      he(W(Of, {
        adapter: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [Ge, r.value]
      ])
    ], 64));
  }
}, Vf = { class: "vuefinder__folder-indicator" }, Ff = { class: "vuefinder__folder-indicator--icon" }, If = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = qs(n, "modelValue");
    return (s, r) => (m(), b("div", Vf, [
      l("div", Ff, [
        e.value ? (m(), X(a(Zo), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : j("", !0),
        e.value ? j("", !0) : (m(), X(a(Xo), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, Rf = { class: "vuefinder__treeview__header" }, Uf = { class: "vuefinder__treeview__pinned-label" }, Hf = { class: "vuefinder__treeview__pin-text text-nowrap" }, Bf = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Nf = { class: "vuefinder__treeview__pinned-item" }, Pf = ["onClick"], qf = ["title"], zf = ["onClick"], jf = { key: 0 }, Gf = { class: "vuefinder__treeview__no-pinned" }, Wf = { class: "vuefinder__treeview__storage" }, Yf = {
  __name: "TreeView",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, { getStore: r, setStore: o } = e.storage, c = F(190), d = F(r("pinned-folders-opened", !0));
    Le(d, (_) => o("pinned-folders-opened", _));
    const f = (_) => {
      e.pinnedFolders = e.pinnedFolders.filter((u) => u.path !== _.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, i = (_) => {
      const u = _.clientX, p = _.target.parentElement, h = p.getBoundingClientRect().width;
      p.classList.remove("transition-[width]"), p.classList.add("transition-none");
      const g = (S) => {
        c.value = h + S.clientX - u, c.value < 50 && (c.value = 0, e.showTreeView = !1), c.value > 50 && (e.showTreeView = !0);
      }, y = () => {
        const S = p.getBoundingClientRect();
        c.value = S.width, p.classList.add("transition-[width]"), p.classList.remove("transition-none"), window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", y);
      };
      window.addEventListener("mousemove", g), window.addEventListener("mouseup", y);
    }, v = F(null);
    return Ee(() => {
      Pe(v.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Le(e.fs.data, (_, u) => {
      const p = _.files.filter((h) => h.type === "dir");
      Jo(e.treeViewData, { path: e.fs.path, folders: p.map((h) => ({
        adapter: h.storage,
        path: h.path,
        basename: h.basename
      })) });
    }), (_, u) => (m(), b(ke, null, [
      l("div", {
        onClick: u[0] || (u[0] = (p) => a(e).showTreeView = !a(e).showTreeView),
        class: de(["vuefinder__treeview__overlay", a(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      l("div", {
        style: vn(a(e).showTreeView ? "min-width:100px;max-width:75%; width: " + c.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        l("div", {
          ref_key: "treeViewScrollElement",
          ref: v,
          class: "vuefinder__treeview__scroll"
        }, [
          l("div", Rf, [
            l("div", {
              onClick: u[2] || (u[2] = (p) => d.value = !d.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              l("div", Uf, [
                W(a(Wo), { class: "vuefinder__treeview__pin-icon" }),
                l("div", Hf, w(a(s)("Pinned Folders")), 1)
              ]),
              W(If, {
                modelValue: d.value,
                "onUpdate:modelValue": u[1] || (u[1] = (p) => d.value = p)
              }, null, 8, ["modelValue"])
            ]),
            d.value ? (m(), b("ul", Bf, [
              (m(!0), b(ke, null, Ce(a(e).pinnedFolders, (p) => (m(), b("li", Nf, [
                l("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (h) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: p.storage, path: p.path } })
                }, [
                  a(e).fs.path !== p.path ? (m(), X(a(xn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : j("", !0),
                  a(e).fs.path === p.path ? (m(), X(a(Ko), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : j("", !0),
                  l("div", {
                    title: p.path,
                    class: de(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": a(e).fs.path === p.path
                    }])
                  }, w(p.basename), 11, qf)
                ], 8, Pf),
                l("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (h) => f(p)
                }, [
                  W(a(wf), { class: "vuefinder__treeview__remove-icon" })
                ], 8, zf)
              ]))), 256)),
              a(e).pinnedFolders.length ? j("", !0) : (m(), b("li", jf, [
                l("div", Gf, w(a(s)("No folders pinned")), 1)
              ]))
            ])) : j("", !0)
          ]),
          (m(!0), b(ke, null, Ce(a(e).fs.data.storages, (p) => (m(), b("div", Wf, [
            W(Lf, { storage: p }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        l("div", {
          onMousedown: i,
          class: de([(a(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
};
class Kf {
  /**
   *
   * @param {Item['title']} title
   * @param {Item['action']} action
   * @param {Item['link']} link
   * @param {Partial<SimpleItemOptions>} options
   */
  constructor(e, s, r, o) {
    this.title = e, this.action = s, this.link = r, this.options = Object.assign(
      {
        needsSearchQuery: !1,
        target: "one"
      },
      o
    );
  }
  /**
   * @type {Item['show']}
   */
  show(e, s) {
    var o, c;
    const r = (d) => d.items.length > 1 && d.items.some((f) => {
      var i;
      return f.path === ((i = d.target) == null ? void 0 : i.path);
    }) ? "many" : d.target ? "one" : null;
    return !(this.options.needsSearchQuery !== !!s.searchQuery || this.options.target !== void 0 && this.options.target !== r(s) || this.options.targetType !== void 0 && this.options.targetType !== ((o = s.target) == null ? void 0 : o.type) || this.options.mimeType !== void 0 && this.options.mimeType !== ((c = s.target) == null ? void 0 : c.mime_type) || this.options.feature !== void 0 && !e.features.includes(this.options.feature) || this.options.show !== void 0 && !this.options.show(e, s));
  }
}
function He(n, e) {
  return n.map((s) => new Kf(s.title, s.action, s.link, {
    ...e,
    feature: s.key
  }));
}
const Ae = {
  newfolder: {
    key: _e.NEW_FOLDER,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(Ho)
  },
  selectAll: {
    title: ({ t: n }) => n("Select All"),
    action: (n) => n.dragSelect.selectAll()
  },
  pinFolder: {
    title: ({ t: n }) => n("Pin Folder"),
    action: (n, e) => {
      n.pinnedFolders = n.pinnedFolders.concat(e.value), n.storage.setStore("pinned-folders", n.pinnedFolders);
    }
  },
  unpinFolder: {
    title: ({ t: n }) => n("Unpin Folder"),
    action: (n, e) => {
      n.pinnedFolders = n.pinnedFolders.filter(
        (s) => !e.value.find((r) => r.path === s.path)
      ), n.storage.setStore("pinned-folders", n.pinnedFolders);
    }
  },
  delete: {
    key: _e.DELETE,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(vs, { items: e });
    }
  },
  refresh: {
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      n.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: n.fs.adapter,
          path: n.fs.data.dirname
        }
      });
    }
  },
  preview: {
    key: _e.PREVIEW,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(Go, {
      adapter: n.fs.adapter,
      item: e.value[0]
    })
  },
  open: {
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      n.emitter.emit("vf-search-exit"), n.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: n.fs.adapter,
          path: e.value[0].path
        }
      });
    }
  },
  openDir: {
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      n.emitter.emit("vf-search-exit"), n.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: n.fs.adapter,
          path: e.value[0].dir
        }
      });
    }
  },
  download: {
    key: _e.DOWNLOAD,
    link: (n, e) => n.requester.getDownloadUrl(n.fs.adapter, e.value[0]),
    title: ({ t: n }) => n("Download"),
    // action: () => {},
    action: (n, e) => {
      const s = e.value[0];
      if ((s == null ? void 0 : s.type) === "dir")
        n.emitter.emit("vf-download", { item: s });
      else {
        const r = n.requester.getDownloadUrl(n.fs.adapter, s);
        window.open(r, "_blank");
      }
    }
  },
  archive: {
    key: _e.ARCHIVE,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(zo, { items: e })
  },
  unarchive: {
    key: _e.UNARCHIVE,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(Po, { items: e })
  },
  rename: {
    key: _e.RENAME,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(_s, { items: e })
  }
}, Xf = [
  ...He([Ae.openDir], {
    needsSearchQuery: !0
  }),
  ...He(
    [Ae.refresh, Ae.selectAll, Ae.newfolder],
    {
      target: null
    }
  ),
  ...He(
    [Ae.refresh, Ae.archive, Ae.delete],
    {
      target: "many"
    }
  ),
  ...He([Ae.open], {
    targetType: "dir"
  }),
  ...He([Ae.unpinFolder], {
    targetType: "dir",
    show: (n, e) => n.pinnedFolders.findIndex((s) => {
      var r;
      return s.path === ((r = e.target) == null ? void 0 : r.path);
    }) !== -1
  }),
  ...He([Ae.pinFolder], {
    targetType: "dir",
    show: (n, e) => n.pinnedFolders.findIndex((s) => {
      var r;
      return s.path === ((r = e.target) == null ? void 0 : r.path);
    }) === -1
  }),
  ...He([Ae.preview], {
    show: (n, e) => {
      var s;
      return ((s = e.target) == null ? void 0 : s.type) !== "dir";
    }
  }),
  ...He([Ae.download], {}),
  ...He([Ae.rename], { numItems: "one" }),
  ...He([Ae.unarchive], {
    mimeType: "application/zip"
  }),
  ...He([Ae.archive], {
    show: (n, e) => {
      var s;
      return ((s = e.target) == null ? void 0 : s.mime_type) !== "application/zip";
    }
  }),
  ...He([Ae.delete], {})
], Zf = { class: "vuefinder__main__content" }, Jf = {
  __name: "VueFinder",
  props: {
    id: {
      type: String,
      default: "vf"
    },
    request: {
      type: [String, Object],
      required: !0
    },
    persist: {
      type: Boolean,
      default: !1
    },
    path: {
      type: String,
      default: ""
    },
    features: {
      type: [Array, Boolean],
      default: !0
    },
    debug: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: "system"
    },
    locale: {
      type: String,
      default: null
    },
    maxHeight: {
      type: String,
      default: "600px"
    },
    maxFileSize: {
      type: String,
      default: "10mb"
    },
    fullScreen: {
      type: Boolean,
      default: !1
    },
    showTreeView: {
      type: Boolean,
      default: !1
    },
    pinnedFolders: {
      type: Array,
      default: []
    },
    showThumbnails: {
      type: Boolean,
      default: !0
    },
    selectButton: {
      type: Object,
      default(n) {
        return {
          active: !1,
          multiple: !1,
          click: (e) => {
          },
          ...n
        };
      }
    },
    onError: {
      type: Function,
      default: null
    },
    loadingIndicator: {
      type: String,
      default: "circular"
    },
    contextMenuItems: {
      type: Array,
      default: () => Xf
    }
  },
  emits: ["select", "update:path"],
  setup(n, { emit: e }) {
    const s = e, r = n, o = Fa(r, le("VueFinderOptions"));
    fr("ServiceContainer", o);
    const { setStore: c } = o.storage, d = F(null);
    o.root = d;
    const f = o.dragSelect;
    _i(o);
    const i = (u) => {
      Object.assign(o.fs.data, u), f.clearSelection(), f.refreshSelection();
    };
    let v;
    o.emitter.on("vf-fetch-abort", () => {
      v.abort(), o.fs.loading = !1;
    }), o.emitter.on(
      "vf-fetch",
      ({
        params: u,
        body: p = null,
        onSuccess: h = null,
        onError: g = null,
        noCloseModal: y = !1
      }) => {
        ["index", "search"].includes(u.q) && (v && v.abort(), o.fs.loading = !0), v = new AbortController();
        const S = v.signal;
        if (u.q === "download") {
          const D = r.request.baseUrl, U = u.m || "POST", V = new URLSearchParams(u).toString(), k = `${D}?${V}`;
          fetch(k, {
            method: U,
            headers: r.request.headers,
            body: p ? p instanceof FormData ? p : JSON.stringify(p) : null,
            abortSignal: S
          }).then((O) => {
            const R = O.headers.get("Content-Disposition");
            let C = "folder.zip";
            if (R && R.includes("filename=")) {
              const x = R.match(/filename="?([^"]+)"?/);
              x && x[1] && (C = x[1]);
            }
            return O.blob().then((x) => ({ blob: x, filename: C }));
          }).then(({ blob: O, filename: R }) => {
            const C = window.URL.createObjectURL(O), x = document.createElement("a");
            x.href = C, x.download = R, document.body.appendChild(x), x.click(), x.remove(), window.URL.revokeObjectURL(C);
          }).catch((O) => {
            console.error("Download error", O);
          });
          return;
        }
        o.requester.send({
          url: "",
          method: u.m || "get",
          params: u,
          body: p,
          abortSignal: S
        }).then((D) => {
          o.fs.adapter = D.adapter, o.persist && (o.fs.path = D.dirname, c("path", o.fs.path)), y || o.modal.close(), i(D), h && h(D);
        }).catch((D) => {
          console.error(D), g && g(D);
        }).finally(() => {
          ["index", "search"].includes(u.q) && (o.fs.loading = !1);
        });
      }
    ), o.emitter.on("vf-download", ({ item: u }) => {
      o.emitter.emit("vf-fetch", {
        params: {
          q: "download",
          m: "post",
          adapter: o.fs.adapter,
          path: o.fs.data.dirname
        },
        body: {
          path: u.path
        },
        onSuccess: () => {
          o.emitter.emit("vf-toast-push", { label: t("The folder downloaded.") });
        },
        onError: (p) => {
          onError(p);
        }
      });
    });
    function _(u) {
      let p = {};
      u && u.includes("://") && (p = {
        adapter: u.split("://")[0],
        path: u
      }), o.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: o.fs.adapter, ...p },
        onError: r.onError ?? ((h) => {
          h.message && o.emitter.emit("vf-toast-push", {
            label: h.message,
            type: "error"
          });
        })
      });
    }
    return Ee(() => {
      _(o.fs.path), Le(
        () => r.path,
        (u) => {
          _(u);
        }
      ), f.onSelect((u) => {
        s("select", u);
      }), Le(
        () => o.fs.data.dirname,
        (u) => {
          s("update:path", u);
        }
      );
    }), (u, p) => (m(), b("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: d,
      tabindex: "0"
    }, [
      l("div", {
        class: de(a(o).theme.actualValue)
      }, [
        l("div", {
          class: de([
            a(o).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          style: vn(
            a(o).fullScreen ? "" : "max-height: " + n.maxHeight + ";height: " + n.maxHeight
          ),
          onMousedown: p[0] || (p[0] = (h) => a(o).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (h) => a(o).emitter.emit("vf-contextmenu-hide"))
        }, [
          W(Mc),
          W(Dd),
          l("div", Zf, [
            W(Yf),
            W(sf)
          ]),
          W(mf)
        ], 38),
        W(vr, { name: "fade" }, {
          default: ne(() => [
            a(o).modal.visible ? (m(), X(Ns(a(o).modal.type), { key: 0 })) : j("", !0)
          ]),
          _: 1
        }),
        W(af)
      ], 2)
    ], 512));
  }
}, iv = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", Jf);
  }
};
export {
  Kf as SimpleContextMenuItem,
  Xf as contextMenuItems,
  iv as default
};
