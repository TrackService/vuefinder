var or = Object.defineProperty;
var rr = (n, e, s) => e in n ? or(n, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[e] = s;
var Tn = (n, e, s) => rr(n, typeof e != "symbol" ? e + "" : e, s);
import { reactive as $t, watch as Oe, ref as V, shallowRef as ar, onMounted as Ee, onUnmounted as Jn, onUpdated as Bs, nextTick as _t, computed as je, inject as le, createElementBlock as b, openBlock as m, withKeys as It, unref as a, createElementVNode as l, withModifiers as et, renderSlot as Lt, normalizeClass as de, toDisplayString as w, createBlock as X, resolveDynamicComponent as Ns, withCtx as ne, createVNode as W, createCommentVNode as j, Fragment as ke, renderList as Ce, withDirectives as he, vModelCheckbox as Zt, createTextVNode as J, vModelSelect as bs, vModelText as Rt, onBeforeUnmount as Ps, customRef as lr, vShow as Ge, isRef as ir, TransitionGroup as cr, normalizeStyle as vn, mergeModels as dr, useModel as qs, resolveComponent as ur, provide as fr, Transition as vr } from "vue";
import _r from "mitt";
import mr from "dragselect";
import pr from "@uppy/core";
import hr from "@uppy/xhr-upload";
import gr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import br from "cropperjs";
var Us;
const An = (Us = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Us.getAttribute("content");
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
    i !== "get" && (d instanceof FormData ? (v = d, s.body != null && Object.entries(this.config.body).forEach(([u, h]) => {
      v.append(u, h);
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
  Oe(s, r);
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
  const { getStore: o, setStore: c } = n, d = V({}), f = V(o("locale", e)), i = (u, h = e) => {
    xr(u, r).then((p) => {
      d.value = p, c("locale", u), f.value = u, c("translations", p), Object.values(r).length > 1 && (s.emit("vf-toast-push", { label: "The language is set to " + u }), s.emit("vf-language-saved"));
    }).catch((p) => {
      h ? (s.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), i(h, null)) : s.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Oe(f, (u) => {
    i(u);
  }), !o("locale") && !r.length ? i(e) : d.value = o("translations");
  const v = (u, ...h) => h.length ? v(u = u.replace("%s", h.shift()), ...h) : u;
  function _(u, ...h) {
    return d.value && d.value.hasOwnProperty(u) ? v(d.value[u], ...h) : v(u, ...h);
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
  const s = V(rt.SYSTEM), r = V(rt.LIGHT);
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
  const n = ar(null), e = V(!1), s = V();
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
    const h = c, p = _, g = u || (r ? !r(h, p) : h !== p);
    return (g || o) && (c = p, d = h), [c, g, d];
  };
  return [e ? (_) => f(e(c, d), _) : f, (_) => [c, !!_, d]];
}, Mr = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, Ve = Mr ? window : {}, Gs = Math.max, Dr = Math.min, Rn = Math.round, on = Math.abs, ws = Math.sign, Ws = Ve.cancelAnimationFrame, es = Ve.requestAnimationFrame, rn = Ve.setTimeout, Hn = Ve.clearTimeout, _n = (n) => typeof Ve[n] < "u" ? Ve[n] : void 0, Lr = _n("MutationObserver"), ys = _n("IntersectionObserver"), ht = _n("ResizeObserver"), Dt = _n("ScrollTimeline"), ts = (n) => n === void 0, mn = (n) => n === null, Ye = (n) => typeof n == "number", Ht = (n) => typeof n == "string", pn = (n) => typeof n == "boolean", Be = (n) => typeof n == "function", Ke = (n) => Array.isArray(n), an = (n) => typeof n == "object" && !Ke(n) && !mn(n), ns = (n) => {
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
const Ys = (n, e) => n.indexOf(e) >= 0, Ot = (n, e) => n.concat(e), ge = (n, e, s) => (!Ht(e) && ns(e) ? Array.prototype.push.apply(n, e) : n.push(e), n), ct = (n) => Array.from(n || []), ss = (n) => Ke(n) ? n : !Ht(n) && ns(n) ? ct(n) : [n], Un = (n) => !!n && !n.length, Bn = (n) => ct(new Set(n)), Re = (n, e, s) => {
  ie(n, (o) => o ? o.apply(void 0, e || []) : !0), s || (n.length = 0);
}, Ks = "paddingTop", Xs = "paddingRight", Zs = "paddingLeft", Qs = "paddingBottom", Js = "marginLeft", eo = "marginRight", to = "marginBottom", no = "overflowX", so = "overflowY", gn = "width", bn = "height", at = "visible", vt = "hidden", kt = "scroll", Or = (n) => {
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
  const s = n ? rn : es, r = n ? Hn : Ws;
  return [(o) => {
    r(e), e = s(() => o(), Be(n) ? n() : n);
  }, () => r(e)];
}, dn = (n, e) => {
  const { _: s, p: r, v: o, S: c } = e || {};
  let d, f, i, v, _ = lt;
  const u = function(x) {
    _(), Hn(d), v = d = f = void 0, _ = lt, n.apply(this, x);
  }, h = (y) => c && f ? c(f, y) : y, p = () => {
    _ !== lt && u(h(i) || i);
  }, g = function() {
    const x = ct(arguments), $ = Be(s) ? s() : s;
    if (Ye($) && $ >= 0) {
      const L = Be(r) ? r() : r, k = Ye(L) && L >= 0, F = $ > 0 ? rn : es, H = $ > 0 ? Hn : Ws, M = h(x) || x, E = u.bind(0, M);
      let T;
      _(), o && !v ? (E(), v = !0, T = F(() => v = void 0, $)) : (T = F(E, $), k && !d && (d = rn(p, L))), _ = () => H(T), f = i = M;
    } else
      u(x);
  };
  return g.m = p, g;
}, ro = (n, e) => Object.prototype.hasOwnProperty.call(n, e), Ne = (n) => n ? Object.keys(n) : [], re = (n, e, s, r, o, c, d) => {
  const f = [e, s, r, o, c, d];
  return (typeof n != "object" || mn(n)) && !Be(n) && (n = {}), ie(f, (i) => {
    ie(i, (v, _) => {
      const u = i[_];
      if (n === u)
        return !0;
      const h = Ke(u);
      if (u && ln(u)) {
        const p = n[_];
        let g = p;
        h && !Ke(p) ? g = [] : !h && !ln(p) && (g = {}), n[_] = re(g, u);
      } else
        n[_] = h ? u.slice() : u;
    });
  }), n;
}, ao = (n, e) => ie(re({}, n), (s, r, o) => {
  s === void 0 ? delete o[r] : s && ln(s) && (o[r] = ao(s));
}), os = (n) => !Ne(n).length, lo = (n, e, s) => Gs(n, Dr(e, s)), mt = (n) => Bn((Ke(n) ? n : (n || "").split(" ")).filter((e) => e)), rs = (n, e) => n && n.getAttribute(e), ks = (n, e) => n && n.hasAttribute(e), Qe = (n, e, s) => {
  ie(mt(e), (r) => {
    n && n.setAttribute(r, String(s || ""));
  });
}, ze = (n, e) => {
  ie(mt(e), (s) => n && n.removeAttribute(s));
}, yn = (n, e) => {
  const s = mt(rs(n, e)), r = Z(Qe, n, e), o = (c, d) => {
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
}, Le = (n, e) => Z(xt, n && e && ie(ss(e), (s) => {
  s && n.appendChild(s);
}));
let _o;
const Rr = () => _o, Hr = (n) => {
  _o = n;
}, wt = (n) => {
  const e = document.createElement("div");
  return Qe(e, "class", n), e;
}, mo = (n) => {
  const e = wt(), s = Rr(), r = n.trim();
  return e.innerHTML = s ? s.createHTML(r) : r, ie(Pn(e), (o) => xt(o));
}, xs = (n, e) => n.getPropertyValue(e) || n[e] || "", po = (n) => {
  const e = n || 0;
  return isFinite(e) ? e : 0;
}, Qt = (n) => po(parseFloat(n || "")), zn = (n) => Math.round(n * 1e4) / 1e4, ho = (n) => `${zn(po(n))}px`;
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
  const r = Ht(e);
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
    t: Qt(v[c]),
    r: Qt(v[d]),
    b: Qt(v[f]),
    l: Qt(v[i])
  };
}, Mn = (n, e) => `translate${an(n) ? `(${n.x},${n.y})` : `${e ? "X" : "Y"}(${n})`}`, Ur = (n) => !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length), Br = {
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
}, Dn = (n) => n.getBoundingClientRect(), Pr = (n) => !!n && Ur(n), jn = (n) => !!(n && (n[bn] || n[gn])), bo = (n, e) => {
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
  const { D: s, M: r } = n, { w: o, h: c } = e, d = (u, h, p) => {
    let g = ws(u) * p, y = ws(h) * p;
    if (g === y) {
      const x = on(u), $ = on(h);
      y = x > $ ? 0 : y, g = x < $ ? 0 : g;
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
}, Ln = ({ D: n, M: e }) => {
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
    if (Ht(c)) {
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
      d && !Un(d) ? f.apply(0, d) : f();
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
}), Ut = (n) => So[n], jr = "__osOptionsValidationPlugin", Ct = "data-overlayscrollbars", nn = "os-environment", Jt = `${nn}-scrollbar-hidden`, On = `${Ct}-initialize`, sn = "noClipping", Ts = `${Ct}-body`, it = Ct, Gr = "host", Je = `${Ct}-viewport`, Wr = no, Yr = so, Kr = "arrange", Co = "measuring", Xr = "scrolling", Eo = "scrollbarHidden", Zr = "noContent", Kn = `${Ct}-padding`, As = `${Ct}-content`, ds = "os-size-observer", Qr = `${ds}-appear`, Jr = `${ds}-listener`, ea = "os-trinsic-observer", ta = "os-theme-none", He = "os-scrollbar", na = `${He}-rtl`, sa = `${He}-horizontal`, oa = `${He}-vertical`, To = `${He}-track`, us = `${He}-handle`, ra = `${He}-visible`, aa = `${He}-cornerless`, Ms = `${He}-interaction`, Ds = `${He}-unusable`, Xn = `${He}-auto-hide`, Ls = `${Xn}-hidden`, Os = `${He}-wheel`, la = `${To}-interactive`, ia = `${us}-interactive`, ca = "__osSizeObserverPlugin", da = (n, e) => {
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
}, Mo = (n, e) => {
  const s = {}, r = Ot(Ne(e), Ne(n));
  return ie(r, (o) => {
    const c = n[o], d = e[o];
    if (an(c) && an(d))
      re(s[o] = {}, Mo(c, d)), os(s[o]) && delete s[o];
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
let Do;
const _a = () => Do, ma = (n) => {
  Do = n;
};
let Vn;
const pa = () => {
  const n = (k, F, H) => {
    Le(document.body, k), Le(document.body, k);
    const A = go(k), M = yt(k), E = cs(F);
    return H && xt(k), {
      x: M.h - A.h + E.h,
      y: M.w - A.w + E.w
    };
  }, e = (k) => {
    let F = !1;
    const H = is(k, Jt);
    try {
      F = tt(k, "scrollbar-width") === "none" || tt(k, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return H(), F;
  }, s = `.${nn}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${nn} div{width:200%;height:200%;margin:10px 0}.${Jt}{scrollbar-width:none!important}.${Jt}::-webkit-scrollbar,.${Jt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, o = mo(`<div class="${nn}"><div></div><style>${s}</style></div>`)[0], c = o.firstChild, d = o.lastChild, f = _a();
  f && (d.nonce = f);
  const [i, , v] = Yn(), [_, u] = Fe({
    o: n(o, c),
    i: tn
  }, Z(n, o, c, !0)), [h] = u(), p = e(o), g = {
    x: h.x === 0,
    y: h.y === 0
  }, y = {
    elements: {
      host: null,
      padding: !p,
      viewport: (k) => p && vo(k) && k,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, x = re({}, va), $ = Z(re, {}, x), R = Z(re, {}, y), L = {
    N: h,
    T: g,
    P: p,
    G: !!Dt,
    K: Z(i, "r"),
    Z: R,
    tt: (k) => re(y, k) && R(),
    nt: $,
    ot: (k) => re(x, k) && $(),
    st: re({}, y),
    et: re({}, x)
  };
  if (ze(o, "style"), xt(o), ve(Ve, "resize", () => {
    v("r", []);
  }), Be(Ve.matchMedia) && !p && (!g.x || !g.y)) {
    const k = (F) => {
      const H = Ve.matchMedia(`(resolution: ${Ve.devicePixelRatio}dppx)`);
      ve(H, "change", () => {
        F(), k(F);
      }, {
        A: !0
      });
    };
    k(() => {
      const [F, H] = _();
      re(L.N, F), v("r", [H]);
    });
  }
  return L;
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
        const u = v[1], h = o.get(_) || [];
        if (n.contains(_) && u) {
          const g = ve(_, u, (y) => {
            r ? (g(), o.delete(_)) : e(y);
          });
          o.set(_, ge(h, g));
        } else
          Re(h), o.delete(_);
      }));
    }
  };
  return d(), [c, d];
}, Rs = (n, e, s, r) => {
  let o = !1;
  const { ct: c, rt: d, lt: f, it: i, ut: v, ft: _ } = r || {}, u = dn(() => o && s(!0), {
    _: 33,
    p: 99
  }), [h, p] = ha(n, u, f), g = c || [], y = d || [], x = Ot(g, y), $ = (L, k) => {
    if (!Un(k)) {
      const F = v || lt, H = _ || lt, A = [], M = [];
      let E = !1, T = !1;
      if (ie(k, (I) => {
        const { attributeName: O, target: U, type: S, oldValue: N, addedNodes: P, removedNodes: ee } = I, oe = S === "attributes", se = S === "childList", me = n === U, K = oe && O, C = K && rs(U, O || ""), B = Ht(C) ? C : null, q = K && N !== B, D = Ys(y, O) && q;
        if (e && (se || !me)) {
          const G = oe && q, z = G && i && Nn(U, i), Q = (z ? !F(U, O, N, B) : !oe || G) && !H(I, !!z, n, r);
          ie(P, (ae) => ge(A, ae)), ie(ee, (ae) => ge(A, ae)), T = T || Q;
        }
        !e && me && q && !F(U, O, N, B) && (ge(M, O), E = E || D);
      }), p((I) => Bn(A).reduce((O, U) => (ge(O, fo(I, U)), Nn(U, I) ? ge(O, U) : O), [])), e)
        return !L && T && s(!1), [!1];
      if (!Un(M) || E) {
        const I = [Bn(M), E];
        return L || s.apply(0, I), I;
      }
    }
  }, R = new Lr(Z($, !1));
  return [() => (R.observe(n, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: x,
    subtree: e,
    childList: e,
    characterData: e
  }), o = !0, () => {
    o && (h(), R.disconnect(), o = !1);
  }), () => {
    if (o)
      return u.m(), $(!0, R.takeRecords());
  }];
};
let ft = null;
const Lo = (n, e, s) => {
  const { _t: r } = s || {}, o = Ut(ca), [c] = Fe({
    o: !1,
    u: !0
  });
  return () => {
    const d = [], i = mo(`<div class="${ds}"><div class="${Jr}"></div></div>`)[0], v = i.firstChild, _ = (u) => {
      const h = u instanceof ResizeObserverEntry;
      let p = !1, g = !1;
      if (h) {
        const [y, , x] = c(u.contentRect), $ = jn(y);
        g = bo(y, x), p = !g && !$;
      } else
        g = u === !0;
      p || e({
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
      }), h = (g) => u(g.pop()), p = new ht(h);
      if (p.observe(ft ? n : v), ge(d, [() => p.disconnect(), !ft && Le(n, i)]), ft) {
        const g = new ht(h);
        g.observe(n, {
          box: "border-box"
        }), ge(d, () => g.disconnect());
      }
    } else if (o) {
      const [u, h] = o(v, _, r);
      ge(d, Ot([is(i, Qr), ve(i, "animationstart", u), Le(n, i)], h));
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
      ge(i, Lo(o, v)()), v();
    }
    return Z(Re, ge(i, Le(n, o)));
  }, () => s && f(!0, s.takeRecords())];
}, ba = (n, e, s, r) => {
  let o, c, d, f, i, v;
  const _ = `[${it}]`, u = `[${Je}]`, h = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: p, ht: g, U: y, gt: x, bt: $, L: R, wt: L, yt: k, St: F, Ot: H } = n, A = (D) => tt(D, "direction") === "rtl", M = {
    $t: !1,
    F: A(p)
  }, E = Xe(), T = Ut(Ao), [I] = Fe({
    i: oo,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const D = T && T.V(n, e, M, E, s).W, z = !(L && R) && ls(g, it, sn), Y = !R && k(Kr), Q = Y && Ie(x), ae = Q && H(), fe = F(Co, z), ce = Y && D && D()[0], Te = fn(y), te = cs(y);
    return ce && ce(), We(x, Q), ae && ae(), z && fe(), {
      w: Te.w + te.w,
      h: Te.h + te.h
    };
  }), O = dn(r, {
    _: () => o,
    p: () => c,
    S(D, G) {
      const [z] = D, [Y] = G;
      return [Ot(Ne(z), Ne(Y)).reduce((Q, ae) => (Q[ae] = z[ae] || Y[ae], Q), {})];
    }
  }), U = (D) => {
    const G = A(p);
    re(D, {
      Ct: v !== G
    }), re(M, {
      F: G
    }), v = G;
  }, S = (D, G) => {
    const [z, Y] = D, Q = {
      xt: Y
    };
    return re(M, {
      $t: z
    }), G || r(Q), Q;
  }, N = ({ dt: D, _t: G }) => {
    const Y = !(D && !G) && E.P ? O : r, Q = {
      dt: D || G,
      _t: G
    };
    U(Q), Y(Q);
  }, P = (D, G) => {
    const [, z] = I(), Y = {
      Ht: z
    };
    return U(Y), z && !G && (D ? r : O)(Y), Y;
  }, ee = (D, G, z) => {
    const Y = {
      Et: G
    };
    return U(Y), G && !z && O(Y), Y;
  }, [oe, se] = $ ? ga(g, S) : [], me = !R && Lo(g, N, {
    _t: !0
  }), [K, C] = Rs(g, !1, ee, {
    rt: h,
    ct: h
  }), B = R && ht && new ht((D) => {
    const G = D[D.length - 1].contentRect;
    N({
      dt: !0,
      _t: bo(G, i)
    }), i = G;
  }), q = dn(() => {
    const [, D] = I();
    r({
      Ht: D
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    B && B.observe(g);
    const D = me && me(), G = oe && oe(), z = K(), Y = E.K((Q) => {
      Q ? O({
        zt: Q
      }) : q();
    });
    return () => {
      B && B.disconnect(), D && D(), G && G(), f && f(), z(), Y();
    };
  }, ({ It: D, At: G, Dt: z }) => {
    const Y = {}, [Q] = D("update.ignoreMutation"), [ae, fe] = D("update.attributes"), [ce, Te] = D("update.elementEvents"), [te, ye] = D("update.debounce"), De = Te || fe, xe = G || z, Se = (be) => Be(Q) && Q(be);
    if (De) {
      d && d(), f && f();
      const [be, we] = Rs($ || y, !0, P, {
        ct: Ot(h, ae || []),
        lt: ce,
        it: _,
        ft: (pe, ue) => {
          const { target: $e, attributeName: Me } = pe;
          return (!ue && Me && !R ? Ir($e, _, u) : !1) || !!bt($e, `.${He}`) || !!Se(pe);
        }
      });
      f = be(), d = we;
    }
    if (ye)
      if (O.m(), Ke(te)) {
        const be = te[0], we = te[1];
        o = Ye(be) && be, c = Ye(we) && we;
      } else Ye(te) ? (o = te, c = !1) : (o = !1, c = !1);
    if (xe) {
      const be = C(), we = se && se(), pe = d && d();
      be && re(Y, ee(be[0], be[1], xe)), we && re(Y, S(we[0], xe)), pe && re(Y, P(pe[0], xe));
    }
    return U(Y), Y;
  }, M];
}, Oo = (n, e) => Be(e) ? e.apply(0, n) : e, wa = (n, e, s, r) => {
  const o = ts(r) ? s : r;
  return Oo(n, o) || e.apply(0, n);
}, Vo = (n, e, s, r) => {
  const o = ts(r) ? s : r, c = Oo(n, o);
  return !!c && (cn(c) ? c : e.apply(0, n));
}, ya = (n, e) => {
  const { nativeScrollbarsOverlaid: s, body: r } = e || {}, { T: o, P: c, Z: d } = Xe(), { nativeScrollbarsOverlaid: f, body: i } = d().cancel, v = s ?? f, _ = ts(r) ? i : r, u = (o.x || o.y) && v, h = n && (mn(_) ? !c : _);
  return !!u || !!h;
}, ka = (n, e, s, r) => {
  const o = "--os-viewport-percent", c = "--os-scroll-percent", d = "--os-scroll-direction", { Z: f } = Xe(), { scrollbars: i } = f(), { slot: v } = i, { vt: _, ht: u, U: h, Mt: p, gt: g, wt: y, L: x } = e, { scrollbars: $ } = p ? {} : n, { slot: R } = $ || {}, L = [], k = [], F = [], H = Vo([_, u, h], () => x && y ? _ : u, v, R), A = (K) => {
    if (Dt) {
      let C = null, B = [];
      const q = new Dt({
        source: g,
        axis: K
      }), D = () => {
        C && C.cancel(), C = null;
      };
      return {
        Rt: (z) => {
          const { Tt: Y } = s, Q = Ln(Y)[K], ae = K === "x", fe = [Mn(0, ae), Mn(`calc(100cq${ae ? "w" : "h"} + -100%)`, ae)], ce = Q ? fe : fe.reverse();
          return B[0] === ce[0] && B[1] === ce[1] || (D(), B = ce, C = z.kt.animate({
            clear: ["left"],
            transform: ce
          }, {
            timeline: q
          })), D;
        }
      };
    }
  }, M = {
    x: A("x"),
    y: A("y")
  }, E = () => {
    const { Vt: K, Lt: C } = s, B = (q, D) => lo(0, 1, q / (q + D) || 0);
    return {
      x: B(C.x, K.x),
      y: B(C.y, K.y)
    };
  }, T = (K, C, B) => {
    const q = B ? is : uo;
    ie(K, (D) => {
      q(D.Ut, C);
    });
  }, I = (K, C) => {
    ie(K, (B) => {
      const [q, D] = C(B);
      Ft(q, D);
    });
  }, O = (K, C, B) => {
    const q = pn(B), D = q ? B : !0, G = q ? !B : !0;
    D && T(k, K, C), G && T(F, K, C);
  }, U = () => {
    const K = E(), C = (B) => (q) => [q.Ut, {
      [o]: zn(B) + ""
    }];
    I(k, C(K.x)), I(F, C(K.y));
  }, S = () => {
    if (!Dt) {
      const { Tt: K } = s, C = Cs(K, Ie(g)), B = (q) => (D) => [D.Ut, {
        [c]: zn(q) + ""
      }];
      I(k, B(C.x)), I(F, B(C.y));
    }
  }, N = () => {
    const { Tt: K } = s, C = Ln(K), B = (q) => (D) => [D.Ut, {
      [d]: q ? "0" : "1"
    }];
    I(k, B(C.x)), I(F, B(C.y)), Dt && (k.forEach(M.x.Rt), F.forEach(M.y.Rt));
  }, P = () => {
    if (x && !y) {
      const { Vt: K, Tt: C } = s, B = Ln(C), q = Cs(C, Ie(g)), D = (G) => {
        const { Ut: z } = G, Y = Vt(z) === h && z, Q = (ae, fe, ce) => {
          const Te = fe * ae;
          return ho(ce ? Te : -Te);
        };
        return [Y, Y && {
          transform: Mn({
            x: Q(q.x, K.x, B.x),
            y: Q(q.y, K.y, B.y)
          })
        }];
      };
      I(k, D), I(F, D);
    }
  }, ee = (K) => {
    const C = K ? "x" : "y", q = wt(`${He} ${K ? sa : oa}`), D = wt(To), G = wt(us), z = {
      Ut: q,
      Pt: D,
      kt: G
    }, Y = M[C];
    return ge(K ? k : F, z), ge(L, [Le(q, D), Le(D, G), Z(xt, q), Y && Y.Rt(z), r(z, O, K)]), z;
  }, oe = Z(ee, !0), se = Z(ee, !1), me = () => (Le(H, k[0].Ut), Le(H, F[0].Ut), Z(Re, L));
  return oe(), se(), [{
    Nt: U,
    qt: S,
    Bt: N,
    Ft: P,
    jt: O,
    Xt: {
      Yt: k,
      Wt: oe,
      Jt: Z(I, k)
    },
    Gt: {
      Yt: F,
      Wt: se,
      Jt: Z(I, F)
    }
  }, me];
}, xa = (n, e, s, r) => (o, c, d) => {
  const { ht: f, U: i, L: v, gt: _, Kt: u, Ot: h } = e, { Ut: p, Pt: g, kt: y } = o, [x, $] = gt(333), [R, L] = gt(444), k = (A) => {
    Be(_.scrollBy) && _.scrollBy({
      behavior: "smooth",
      left: A.x,
      top: A.y
    });
  }, F = () => {
    const A = "pointerup pointercancel lostpointercapture", M = `client${d ? "X" : "Y"}`, E = d ? gn : bn, T = d ? "left" : "top", I = d ? "w" : "h", O = d ? "x" : "y", U = (N, P) => (ee) => {
      const { Vt: oe } = s, se = yt(g)[I] - yt(y)[I], K = P * ee / se * oe[O];
      We(_, {
        [O]: N + K
      });
    }, S = [];
    return ve(g, "pointerdown", (N) => {
      const P = bt(N.target, `.${us}`) === y, ee = P ? y : g, oe = n.scrollbars, se = oe[P ? "dragScroll" : "clickScroll"], { button: me, isPrimary: K, pointerType: C } = N, { pointers: B } = oe;
      if (me === 0 && K && se && (B || []).includes(C)) {
        Re(S), L();
        const D = !P && (N.shiftKey || se === "instant"), G = Z(Dn, y), z = Z(Dn, g), Y = (ue, $e) => (ue || G())[T] - ($e || z())[T], Q = Rn(Dn(_)[E]) / yt(_)[I] || 1, ae = U(Ie(_)[O], 1 / Q), fe = N[M], ce = G(), Te = z(), te = ce[E], ye = Y(ce, Te) + te / 2, De = fe - Te[T], xe = P ? 0 : De - ye, Se = (ue) => {
          Re(pe), ee.releasePointerCapture(ue.pointerId);
        }, be = P || D, we = h(), pe = [ve(u, A, Se), ve(u, "selectstart", (ue) => Gn(ue), {
          H: !1
        }), ve(g, A, Se), be && ve(g, "pointermove", (ue) => ae(xe + (ue[M] - fe))), be && (() => {
          const ue = Ie(_);
          we();
          const $e = Ie(_), Me = {
            x: $e.x - ue.x,
            y: $e.y - ue.y
          };
          (on(Me.x) > 3 || on(Me.y) > 3) && (h(), We(_, ue), k(Me), R(we));
        })];
        if (ee.setPointerCapture(N.pointerId), D)
          ae(xe);
        else if (!P) {
          const ue = Ut(fa);
          if (ue) {
            const $e = ue(ae, xe, te, (Me) => {
              Me ? we() : ge(pe, we);
            });
            ge(pe, $e), ge(S, Z($e, !0));
          }
        }
      }
    });
  };
  let H = !0;
  return Z(Re, [ve(y, "pointermove pointerleave", r), ve(p, "pointerenter", () => {
    c(Ms, !0);
  }), ve(p, "pointerleave pointercancel", () => {
    c(Ms, !1);
  }), !v && ve(p, "mousedown", () => {
    const A = qn();
    (ks(A, Je) || ks(A, it) || A === document.body) && rn(Z(Wn, i), 25);
  }), ve(p, "wheel", (A) => {
    const { deltaX: M, deltaY: E, deltaMode: T } = A;
    H && T === 0 && Vt(p) === f && k({
      x: M,
      y: E
    }), H = !1, c(Os, !0), x(() => {
      H = !0, c(Os);
    }), Gn(A);
  }, {
    H: !1,
    I: !0
  }), ve(p, "pointerdown", Z(ve, u, "click", yo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), F(), $, L]);
}, Sa = (n, e, s, r, o, c) => {
  let d, f, i, v, _, u = lt, h = 0;
  const p = ["mouse", "pen"], g = (C) => p.includes(C.pointerType), [y, x] = gt(), [$, R] = gt(100), [L, k] = gt(100), [F, H] = gt(() => h), [A, M] = ka(n, o, r, xa(e, o, r, (C) => g(C) && oe())), { ht: E, Qt: T, wt: I } = o, { jt: O, Nt: U, qt: S, Bt: N, Ft: P } = A, ee = (C, B) => {
    if (H(), C)
      O(Ls);
    else {
      const q = Z(O, Ls, !0);
      h > 0 && !B ? F(q) : q();
    }
  }, oe = () => {
    (i ? !d : !v) && (ee(!0), $(() => {
      ee(!1);
    }));
  }, se = (C) => {
    O(Xn, C, !0), O(Xn, C, !1);
  }, me = (C) => {
    g(C) && (d = i, i && ee(!0));
  }, K = [H, R, k, x, () => u(), ve(E, "pointerover", me, {
    A: !0
  }), ve(E, "pointerenter", me), ve(E, "pointerleave", (C) => {
    g(C) && (d = !1, i && ee(!1));
  }), ve(E, "pointermove", (C) => {
    g(C) && f && oe();
  }), ve(T, "scroll", (C) => {
    y(() => {
      S(), oe();
    }), c(C), P();
  })];
  return [() => Z(Re, ge(K, M())), ({ It: C, Dt: B, Zt: q, tn: D }) => {
    const { nn: G, sn: z, en: Y, cn: Q } = D || {}, { Ct: ae, _t: fe } = q || {}, { F: ce } = s, { T: Te } = Xe(), { k: te, rn: ye } = r, [De, xe] = C("showNativeOverlaidScrollbars"), [Se, be] = C("scrollbars.theme"), [we, pe] = C("scrollbars.visibility"), [ue, $e] = C("scrollbars.autoHide"), [Me, Et] = C("scrollbars.autoHideSuspend"), [Bt] = C("scrollbars.autoHideDelay"), [Nt, Pt] = C("scrollbars.dragScroll"), [ut, Tt] = C("scrollbars.clickScroll"), [qt, Sn] = C("overflow"), $n = fe && !B, Cn = ye.x || ye.y, qe = G || z || Q || ae || B, En = Y || pe || Sn, zt = De && Te.x && Te.y, jt = (ot, At, Mt) => {
      const Gt = ot.includes(kt) && (we === at || we === "auto" && At === kt);
      return O(ra, Gt, Mt), Gt;
    };
    if (h = Bt, $n && (Me && Cn ? (se(!1), u(), L(() => {
      u = ve(T, "scroll", Z(se, !0), {
        A: !0
      });
    })) : se(!0)), xe && O(ta, zt), be && (O(_), O(Se, !0), _ = Se), Et && !Me && se(!0), $e && (f = ue === "move", i = ue === "leave", v = ue === "never", ee(v, !0)), Pt && O(ia, Nt), Tt && O(la, !!ut), En) {
      const ot = jt(qt.x, te.x, !0), At = jt(qt.y, te.y, !1);
      O(aa, !(ot && At));
    }
    qe && (S(), U(), P(), Q && N(), O(Ds, !ye.x, !0), O(Ds, !ye.y, !1), O(na, ce && !I));
  }, {}, A];
}, $a = (n) => {
  const e = Xe(), { Z: s, P: r } = e, { elements: o } = s(), { padding: c, viewport: d, content: f } = o, i = cn(n), v = i ? {} : n, { elements: _ } = v, { padding: u, viewport: h, content: p } = _ || {}, g = i ? n : v.target, y = vo(g), x = g.ownerDocument, $ = x.documentElement, R = () => x.defaultView || Ve, L = Z(wa, [g]), k = Z(Vo, [g]), F = Z(wt, ""), H = Z(L, F, d), A = Z(k, F, f), M = (te) => {
    const ye = yt(te), De = fn(te), xe = tt(te, no), Se = tt(te, so);
    return De.w - ye.w > 0 && !St(xe) || De.h - ye.h > 0 && !St(Se);
  }, E = H(h), T = E === g, I = T && y, O = !T && A(p), U = !T && E === O, S = I ? $ : E, N = I ? S : g, P = !T && k(F, c, u), ee = !U && O, oe = [ee, S, P, N].map((te) => cn(te) && !Vt(te) && te), se = (te) => te && Ys(oe, te), me = !se(S) && M(S) ? S : g, K = I ? $ : S, B = {
    vt: g,
    ht: N,
    U: S,
    ln: P,
    bt: ee,
    gt: K,
    Qt: I ? x : S,
    an: y ? $ : me,
    Kt: x,
    wt: y,
    Mt: i,
    L: T,
    un: R,
    yt: (te) => ls(S, Je, te),
    St: (te, ye) => un(S, Je, te, ye),
    Ot: () => un(K, Je, Xr, !0)
  }, { vt: q, ht: D, ln: G, U: z, bt: Y } = B, Q = [() => {
    ze(D, [it, On]), ze(q, On), y && ze($, [On, it]);
  }];
  let ae = Pn([Y, z, G, D, q].find((te) => te && !se(te)));
  const fe = I ? q : Y || z, ce = Z(Re, Q);
  return [B, () => {
    const te = R(), ye = qn(), De = (pe) => {
      Le(Vt(pe), Pn(pe)), xt(pe);
    }, xe = (pe) => ve(pe, "focusin focusout focus blur", yo, {
      I: !0,
      H: !1
    }), Se = "tabindex", be = rs(z, Se), we = xe(ye);
    return Qe(D, it, T ? "" : Gr), Qe(G, Kn, ""), Qe(z, Je, ""), Qe(Y, As, ""), T || (Qe(z, Se, be || "-1"), y && Qe($, Ts, "")), Le(fe, ae), Le(D, G), Le(G || D, !T && z), Le(z, Y), ge(Q, [we, () => {
      const pe = qn(), ue = se(z), $e = ue && pe === z ? q : pe, Me = xe($e);
      ze(G, Kn), ze(Y, As), ze(z, Je), y && ze($, Ts), be ? Qe(z, Se, be) : ze(z, Se), se(Y) && De(Y), ue && De(z), se(G) && De(G), Wn($e), Me();
    }]), r && !T && (as(z, Je, Eo), ge(Q, Z(ze, z, Je))), Wn(!T && y && ye === q && te.top === te ? z : ye), we(), ae = 0, ce;
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
    let [u, h] = d(_);
    const { P: p } = Xe(), { dt: g, Ht: y, Ct: x } = i || {}, { F: $ } = v, [R, L] = f("paddingAbsolute");
    (g || h || (_ || y)) && ([u, h] = c(_));
    const F = !r && (L || x || h);
    if (F) {
      const H = !R || !e && !p, A = u.r + u.l, M = u.t + u.b, E = {
        [eo]: H && !$ ? -A : 0,
        [to]: H ? -M : 0,
        [Js]: H && $ ? -A : 0,
        top: H ? -u.t : 0,
        right: H ? $ ? -u.r : "auto" : 0,
        left: H ? $ ? "auto" : -u.l : 0,
        [gn]: H && `calc(100% + ${A}px)`
      }, T = {
        [Ks]: H ? u.t : 0,
        [Xs]: H ? u.r : 0,
        [Qs]: H ? u.b : 0,
        [Zs]: H ? u.l : 0
      };
      Ft(e || s, E), Ft(s, T), re(o, {
        ln: u,
        _n: !H,
        j: e ? T : re({}, E, T)
      });
    }
    return {
      dn: F
    };
  };
}, Ta = (n, e) => {
  const s = Xe(), { ht: r, ln: o, U: c, L: d, Qt: f, gt: i, wt: v, St: _, un: u } = n, { P: h } = s, p = v && d, g = Z(Gs, 0), y = {
    display: () => !1,
    direction: (C) => C !== "ltr",
    flexDirection: (C) => C.endsWith("-reverse"),
    writingMode: (C) => C !== "horizontal-tb"
  }, x = Ne(y), $ = {
    i: oo,
    o: {
      w: 0,
      h: 0
    }
  }, R = {
    i: tn,
    o: {}
  }, L = (C) => {
    _(Co, !p && C);
  }, k = (C) => {
    if (!x.some((fe) => {
      const ce = C[fe];
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
    L(!0);
    const q = Ie(i), D = _(Zr, !0), G = ve(f, kt, (fe) => {
      const ce = Ie(i);
      fe.isTrusted && ce.x === q.x && ce.y === q.y && wo(fe);
    }, {
      I: !0,
      A: !0
    });
    We(i, {
      x: 0,
      y: 0
    }), D();
    const z = Ie(i), Y = fn(i);
    We(i, {
      x: Y.w,
      y: Y.h
    });
    const Q = Ie(i);
    We(i, {
      x: Q.x - z.x < 1 && -Y.w,
      y: Q.y - z.y < 1 && -Y.h
    });
    const ae = Ie(i);
    return We(i, q), es(() => G()), {
      D: z,
      M: ae
    };
  }, F = (C, B) => {
    const q = Ve.devicePixelRatio % 1 !== 0 ? 1 : 0, D = {
      w: g(C.w - B.w),
      h: g(C.h - B.h)
    };
    return {
      w: D.w > q ? D.w : 0,
      h: D.h > q ? D.h : 0
    };
  }, [H, A] = Fe($, Z(cs, c)), [M, E] = Fe($, Z(fn, c)), [T, I] = Fe($), [O] = Fe(R), [U, S] = Fe($), [N] = Fe(R), [P] = Fe({
    i: (C, B) => wn(C, B, x),
    o: {}
  }, () => Pr(c) ? tt(c, x) : {}), [ee, oe] = Fe({
    i: (C, B) => tn(C.D, B.D) && tn(C.M, B.M),
    o: ko()
  }), se = Ut(Ao), me = (C, B) => `${B ? Wr : Yr}${Or(C)}`, K = (C) => {
    const B = (D) => [at, vt, kt].map((G) => me(G, D)), q = B(!0).concat(B()).join(" ");
    _(q), _(Ne(C).map((D) => me(C[D], D === "x")).join(" "), !0);
  };
  return ({ It: C, Zt: B, fn: q, Dt: D }, { dn: G }) => {
    const { dt: z, Ht: Y, Ct: Q, _t: ae, zt: fe } = B || {}, ce = se && se.V(n, e, q, s, C), { Y: Te, W: te, J: ye } = ce || {}, [De, xe] = da(C, s), [Se, be] = C("overflow"), we = St(Se.x), pe = St(Se.y), ue = z || G || Y || Q || fe || xe;
    let $e = A(D), Me = E(D), Et = I(D), Bt = S(D);
    if (xe && h && _(Eo, !De), ue) {
      ls(r, it, sn) && L(!0);
      const [hs] = te ? te() : [], [Wt] = $e = H(D), [Yt] = Me = M(D), Kt = go(c), Xt = p && Nr(u()), sr = {
        w: g(Yt.w + Wt.w),
        h: g(Yt.h + Wt.h)
      }, gs = {
        w: g((Xt ? Xt.w : Kt.w + g(Kt.w - Yt.w)) + Wt.w),
        h: g((Xt ? Xt.h : Kt.h + g(Kt.h - Yt.h)) + Wt.h)
      };
      hs && hs(), Bt = U(gs), Et = T(F(sr, gs), D);
    }
    const [Nt, Pt] = Bt, [ut, Tt] = Et, [qt, Sn] = Me, [$n, Cn] = $e, [qe, En] = O({
      x: ut.w > 0,
      y: ut.h > 0
    }), zt = we && pe && (qe.x || qe.y) || we && qe.x && !qe.y || pe && qe.y && !qe.x, jt = G || Q || fe || Cn || Sn || Pt || Tt || be || xe || ue, ot = ua(qe, Se), [At, Mt] = N(ot.k), [Gt, er] = P(D), ps = Q || ae || er || En || D, [tr, nr] = ps ? ee(k(Gt), D) : oe();
    return jt && (Mt && K(ot.k), ye && Te && Ft(c, ye(ot, q, Te(ot, qt, $n)))), L(!1), un(r, it, sn, zt), un(o, Kn, sn, zt), re(e, {
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
      en: Mt,
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
      [Js]: 0,
      [Ks]: 0,
      [Xs]: 0,
      [Qs]: 0,
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
  }, { vt: c, gt: d, L: f, Ot: i } = e, { P: v, T: _ } = Xe(), u = !v && (_.x || _.y), h = [Ca(e), Ea(e, o), Ta(e, o)];
  return [s, (p) => {
    const g = {}, x = u && Ie(d), $ = x && i();
    return ie(h, (R) => {
      re(g, R(p, g) || {});
    }), We(d, x), $ && $(), f || We(c, 0), g;
  }, o, e, r];
}, Ma = (n, e, s, r, o) => {
  let c = !1;
  const d = Is(e, {}), [f, i, v, _, u] = Aa(n), [h, p, g] = ba(_, v, d, (k) => {
    L({}, k);
  }), [y, x, , $] = Sa(n, e, g, v, _, o), R = (k) => Ne(k).some((F) => !!k[F]), L = (k, F) => {
    if (s())
      return !1;
    const { vn: H, Dt: A, At: M, hn: E } = k, T = H || {}, I = !!A || !c, O = {
      It: Is(e, T, I),
      vn: T,
      Dt: I
    };
    if (E)
      return x(O), !1;
    const U = F || p(re({}, O, {
      At: M
    })), S = i(re({}, O, {
      fn: g,
      Zt: U
    }));
    x(re({}, O, {
      Zt: U,
      tn: S
    }));
    const N = R(U), P = R(S), ee = N || P || !os(T) || I;
    return c = !0, ee && r(k, {
      Zt: U,
      tn: S
    }), ee;
  };
  return [() => {
    const { an: k, gt: F, Ot: H } = _, A = Ie(k), M = [h(), f(), y()], E = H();
    return We(F, A), E(), Z(Re, M);
  }, L, () => ({
    gn: g,
    bn: v
  }), {
    wn: _,
    yn: $
  }, u];
}, fs = /* @__PURE__ */ new WeakMap(), Da = (n, e) => {
  fs.set(n, e);
}, La = (n) => {
  fs.delete(n);
}, Fo = (n) => fs.get(n), Pe = (n, e, s) => {
  const { nt: r } = Xe(), o = cn(n), c = o ? n : n.target, d = Fo(c);
  if (e && !d) {
    let f = !1;
    const i = [], v = {}, _ = (T) => {
      const I = ao(T), O = Ut(jr);
      return O ? O(I, !0) : I;
    }, u = re({}, r(), _(e)), [h, p, g] = Yn(), [y, x, $] = Yn(s), R = (T, I) => {
      $(T, I), g(T, I);
    }, [L, k, F, H, A] = Ma(n, u, () => f, ({ vn: T, Dt: I }, { Zt: O, tn: U }) => {
      const { dt: S, Ct: N, xt: P, Ht: ee, Et: oe, _t: se } = O, { nn: me, sn: K, en: C, cn: B } = U;
      R("updated", [E, {
        updateHints: {
          sizeChanged: !!S,
          directionChanged: !!N,
          heightIntrinsicChanged: !!P,
          overflowEdgeChanged: !!me,
          overflowAmountChanged: !!K,
          overflowStyleChanged: !!C,
          scrollCoordinatesChanged: !!B,
          contentMutation: !!ee,
          hostMutation: !!oe,
          appear: !!se
        },
        changedOptions: T || {},
        force: !!I
      }]);
    }, (T) => R("scroll", [E, T])), M = (T) => {
      La(c), Re(i), f = !0, R("destroyed", [E, T]), p(), x();
    }, E = {
      options(T, I) {
        if (T) {
          const O = I ? r() : {}, U = Mo(u, re(O, _(T)));
          os(U) || (re(u, U), k({
            vn: U
          }));
        }
        return re({}, u);
      },
      on: y,
      off: (T, I) => {
        T && I && x(T, I);
      },
      state() {
        const { gn: T, bn: I } = F(), { F: O } = T, { Lt: U, Vt: S, k: N, rn: P, ln: ee, _n: oe, Tt: se } = I;
        return re({}, {
          overflowEdge: U,
          overflowAmount: S,
          overflowStyle: N,
          hasOverflow: P,
          scrollCoordinates: {
            start: se.D,
            end: se.M
          },
          padding: ee,
          paddingAbsolute: oe,
          directionRTL: O,
          destroyed: f
        });
      },
      elements() {
        const { vt: T, ht: I, ln: O, U, bt: S, gt: N, Qt: P } = H.wn, { Xt: ee, Gt: oe } = H.yn, se = (K) => {
          const { kt: C, Pt: B, Ut: q } = K;
          return {
            scrollbar: q,
            track: B,
            handle: C
          };
        }, me = (K) => {
          const { Yt: C, Wt: B } = K, q = se(C[0]);
          return re({}, q, {
            clone: () => {
              const D = se(B());
              return k({
                hn: !0
              }), D;
            }
          });
        };
        return re({}, {
          target: T,
          host: I,
          padding: O || U,
          viewport: U,
          content: S || U,
          scrollOffsetElement: N,
          scrollEventElement: P,
          scrollbarHorizontal: me(ee),
          scrollbarVertical: me(oe)
        });
      },
      update: (T) => k({
        Dt: T,
        At: !0
      }),
      destroy: Z(M, !1),
      plugin: (T) => v[Ne(T)[0]]
    };
    return ge(i, [A]), Da(c, E), $o(xo, Pe, [E, h, v]), ya(H.wn.wt, !o && n.cancel) ? (M(!0), E) : (ge(i, L()), R("initialized", [E]), E.update(), E);
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
Pe.trustedTypePolicy = Hr;
function Oa() {
  let n;
  const e = V(null), s = Math.floor(Math.random() * 2 ** 32), r = V(!1), o = V([]), c = () => o.value, d = () => n.getSelection(), f = () => o.value.length, i = () => n.clearSelection(!0), v = V(), _ = V(null), u = V(null), h = V(null), p = V(null);
  function g() {
    n = new mr({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), n.subscribe("DS:start:pre", ({ items: F, event: H, isDragging: A }) => {
      if (A)
        n.Interaction._reset(H);
      else {
        r.value = !1;
        const M = e.value.offsetWidth - H.offsetX, E = e.value.offsetHeight - H.offsetY;
        M < 15 && E < 15 && n.Interaction._reset(H), H.target.classList.contains("os-scrollbar-handle") && n.Interaction._reset(H);
      }
    }), document.addEventListener("dragleave", (F) => {
      !F.buttons && r.value && (r.value = !1);
    });
  }
  const y = () => _t(() => {
    n.addSelection(
      n.getSelectables()
    ), x();
  }), x = () => {
    o.value = n.getSelection().map((F) => JSON.parse(F.dataset.item)), v.value(o.value);
  }, $ = () => _t(() => {
    const F = c().map((H) => H.path);
    i(), n.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + s)
    }), n.addSelection(
      n.getSelectables().filter((H) => F.includes(JSON.parse(H.dataset.item).path))
    ), x(), L();
  }), R = (F) => {
    v.value = F, n.subscribe("DS:end", ({ items: H, event: A, isDragging: M }) => {
      o.value = H.map((E) => JSON.parse(E.dataset.item)), F(H.map((E) => JSON.parse(E.dataset.item)));
    });
  }, L = () => {
    _.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (u.value.style.height = e.value.scrollHeight + "px", u.value.style.display = "block") : (u.value.style.height = "100%", u.value.style.display = "none"));
  }, k = (F) => {
    if (!_.value)
      return;
    const { scrollOffsetElement: H } = _.value.elements();
    H.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return Ee(() => {
    Pe(h.value, {
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
      initialized: (F) => {
        _.value = F;
      },
      scroll: (F, H) => {
        const { scrollOffsetElement: A } = F.elements();
        e.value.scrollTo({
          top: A.scrollTop,
          left: 0
        });
      }
    }), g(), L(), p.value = new ResizeObserver(L), p.value.observe(e.value), e.value.addEventListener("scroll", k), n.subscribe("DS:scroll", ({ isDragging: F }) => F || k());
  }), Jn(() => {
    n && n.stop(), p.value && p.value.disconnect();
  }), Bs(() => {
    n && n.Area.reset();
  }), {
    area: e,
    explorerId: s,
    isDraggingRef: r,
    scrollBar: u,
    scrollBarContainer: h,
    getSelected: c,
    getSelection: d,
    selectAll: y,
    clearSelection: i,
    refreshSelection: $,
    getCount: f,
    onSelect: R
  };
}
function Va(n, e) {
  const s = V(n), r = V(e), o = V([]), c = V([]), d = V([]), f = V(!1), i = V(5);
  let v = !1, _ = !1;
  const u = $t({
    adapter: s,
    storages: [],
    dirname: r,
    files: []
  });
  function h() {
    let R = [], L = [], k = r.value ?? s.value + "://";
    k.length === 0 && (o.value = []), k.replace(s.value + "://", "").split("/").filter(Boolean).forEach(function(A) {
      R.push(A), R.join("/") !== "" && L.push({
        basename: A,
        name: A,
        path: s.value + "://" + R.join("/") + "/",
        type: "dir"
      });
    }), c.value = L;
    const [F, H] = g(
      L,
      i.value
    );
    d.value = H, o.value = F;
  }
  function p(R) {
    i.value = R, h();
  }
  function g(R, L) {
    return R.length > L ? [R.slice(-L), R.slice(0, -L)] : [R, []];
  }
  function y(R = null) {
    f.value = R ?? !f.value;
  }
  function x() {
    return o.value && o.value.length && !0;
  }
  const $ = je(() => {
    var R;
    return ((R = o.value[o.value.length - 2]) == null ? void 0 : R.path) ?? s.value + "://";
  });
  return Ee(() => {
  }), Oe(r, h), Ee(h), {
    adapter: s,
    path: r,
    loading: v,
    searchMode: _,
    data: u,
    breadcrumbs: o,
    breadcrumbItems: c,
    limitBreadcrumbItems: p,
    hiddenBreadcrumbs: d,
    showHiddenBreadcrumbs: f,
    toggleHiddenBreadcrumbs: y,
    isGoUpAvailable: x,
    parentFolderPath: $
  };
}
const Fa = (n, e) => {
  const s = kr(n.id), r = _r(), o = s.getStore("metricUnits", !1), c = Tr(s, n.theme), d = e.i18n, f = n.locale ?? e.locale, i = (p) => Array.isArray(p) ? p : $r, v = s.getStore("persist-path", n.persist), _ = v ? s.getStore("path", n.path) : n.path, u = v ? s.getStore("adapter") : null, h = Oa();
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
    dragSelect: je(() => h),
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
}, Ia = { class: "vuefinder__modal-layout__container" }, Ra = { class: "vuefinder__modal-layout__content" }, Ha = { class: "vuefinder__modal-layout__footer" }, nt = {
  __name: "ModalLayout",
  setup(n) {
    const e = V(null), s = le("ServiceContainer");
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
              Lt(r.$slots, "default")
            ]),
            l("div", Ha, [
              Lt(r.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Ua = (n, e) => {
  const s = n.__vccOpts || n;
  for (const [r, o] of e)
    s[r] = o;
  return s;
}, Ba = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: s }) {
    const r = le("ServiceContainer"), o = V(!1), { t: c } = r.i18n;
    let d = null;
    const f = () => {
      clearTimeout(d), o.value = !0, d = setTimeout(() => {
        o.value = !1;
      }, 2e3);
    };
    return Ee(() => {
      r.emitter.on(n.on, f);
    }), Jn(() => {
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
    n.$slots.default ? Lt(n.$slots, "default", { key: 0 }) : (m(), b("span", Na, w(r.t("Saved.")), 1))
  ], 2);
}
const pt = /* @__PURE__ */ Ua(Ba, [["render", Pa]]), qa = {
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
}, Qa = ["onClick", "aria-current"], Ja = {
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
}, Al = { class: "vuefinder__about-modal__setting-input" }, Ml = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Dl = { class: "vuefinder__about-modal__setting-label" }, Ll = ["label"], Ol = ["value"], Vl = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Fl = { class: "vuefinder__about-modal__shortcuts" }, Il = { class: "vuefinder__about-modal__shortcut" }, Rl = { class: "vuefinder__about-modal__shortcut" }, Hl = { class: "vuefinder__about-modal__shortcut" }, Ul = { class: "vuefinder__about-modal__shortcut" }, Bl = { class: "vuefinder__about-modal__shortcut" }, Nl = { class: "vuefinder__about-modal__shortcut" }, Pl = { class: "vuefinder__about-modal__shortcut" }, ql = { class: "vuefinder__about-modal__shortcut" }, zl = { class: "vuefinder__about-modal__shortcut" }, jl = {
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
    ]), f = V("about"), i = async () => {
      r(), location.reload();
    }, v = (R) => {
      e.theme.set(R), e.emitter.emit("vf-theme-saved");
    }, _ = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? js : zs, s("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, u = () => {
      e.compactListView = !e.compactListView, s("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, h = () => {
      e.showThumbnails = !e.showThumbnails, s("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, p = () => {
      e.persist = !e.persist, s("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: g } = le("VueFinderOptions"), x = Object.fromEntries(
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
      }).filter(([R]) => Object.keys(g).includes(R))
    ), $ = je(() => ({
      system: o("System"),
      light: o("Light"),
      dark: o("Dark")
    }));
    return (R, L) => (m(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          onClick: L[7] || (L[7] = (k) => a(e).modal.close()),
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
                    onClick: (F) => f.value = k.key,
                    class: de([k.key === f.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": k.current ? "page" : void 0
                  }, w(k.name), 11, Qa))), 128))
                ])
              ])
            ]),
            f.value === c.ABOUT ? (m(), b("div", Ja, [
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
                        "onUpdate:modelValue": L[0] || (L[0] = (k) => a(e).metricUnits = k),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Zt, a(e).metricUnits]
                      ])
                    ]),
                    l("div", il, [
                      l("label", cl, [
                        J(w(a(o)("Use Metric Units")) + " ", 1),
                        W(pt, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: ne(() => [
                            J(w(a(o)("Saved.")), 1)
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
                        "onUpdate:modelValue": L[1] || (L[1] = (k) => a(e).compactListView = k),
                        onClick: u,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Zt, a(e).compactListView]
                      ])
                    ]),
                    l("div", fl, [
                      l("label", vl, [
                        J(w(a(o)("Compact list view")) + " ", 1),
                        W(pt, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: ne(() => [
                            J(w(a(o)("Saved.")), 1)
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
                        "onUpdate:modelValue": L[2] || (L[2] = (k) => a(e).persist = k),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Zt, a(e).persist]
                      ])
                    ]),
                    l("div", pl, [
                      l("label", hl, [
                        J(w(a(o)("Persist path on reload")) + " ", 1),
                        W(pt, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: ne(() => [
                            J(w(a(o)("Saved.")), 1)
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
                        "onUpdate:modelValue": L[3] || (L[3] = (k) => a(e).showThumbnails = k),
                        onClick: h,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Zt, a(e).showThumbnails]
                      ])
                    ]),
                    l("div", wl, [
                      l("label", yl, [
                        J(w(a(o)("Show thumbnails")) + " ", 1),
                        W(pt, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: ne(() => [
                            J(w(a(o)("Saved.")), 1)
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
                        "onUpdate:modelValue": L[4] || (L[4] = (k) => a(e).theme.value = k),
                        onChange: L[5] || (L[5] = (k) => v(k.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: a(o)("Theme")
                        }, [
                          (m(!0), b(ke, null, Ce($.value, (k, F) => (m(), b("option", { value: F }, w(k), 9, El))), 256))
                        ], 8, Cl)
                      ], 544), [
                        [bs, a(e).theme.value]
                      ]),
                      W(pt, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: ne(() => [
                          J(w(a(o)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  a(e).features.includes(a(_e).LANGUAGE) && Object.keys(a(x)).length > 1 ? (m(), b("div", Tl, [
                    l("div", Al, [
                      l("label", Ml, w(a(o)("Language")), 1)
                    ]),
                    l("div", Dl, [
                      he(l("select", {
                        id: "language",
                        "onUpdate:modelValue": L[6] || (L[6] = (k) => a(e).i18n.locale = k),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: a(o)("Language")
                        }, [
                          (m(!0), b(ke, null, Ce(a(x), (k, F) => (m(), b("option", { value: F }, w(k), 9, Ol))), 256))
                        ], 8, Ll)
                      ], 512), [
                        [bs, a(e).i18n.locale]
                      ]),
                      W(pt, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: ne(() => [
                          J(w(a(o)("Saved.")), 1)
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
                  L[8] || (L[8] = l("kbd", null, "F2", -1))
                ]),
                l("div", Rl, [
                  l("div", null, w(a(o)("Refresh")), 1),
                  L[9] || (L[9] = l("kbd", null, "F5", -1))
                ]),
                l("div", Hl, [
                  J(w(a(o)("Delete")) + " ", 1),
                  L[10] || (L[10] = l("kbd", null, "Del", -1))
                ]),
                l("div", Ul, [
                  J(w(a(o)("Escape")) + " ", 1),
                  L[11] || (L[11] = l("div", null, [
                    l("kbd", null, "Esc")
                  ], -1))
                ]),
                l("div", Bl, [
                  J(w(a(o)("Select All")) + " ", 1),
                  L[12] || (L[12] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    J(" + "),
                    l("kbd", null, "A")
                  ], -1))
                ]),
                l("div", Nl, [
                  J(w(a(o)("Search")) + " ", 1),
                  L[13] || (L[13] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    J(" + "),
                    l("kbd", null, "F")
                  ], -1))
                ]),
                l("div", Pl, [
                  J(w(a(o)("Toggle Sidebar")) + " ", 1),
                  L[14] || (L[14] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    J(" + "),
                    l("kbd", null, "E")
                  ], -1))
                ]),
                l("div", ql, [
                  J(w(a(o)("Open Settings")) + " ", 1),
                  L[15] || (L[15] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    J(" + "),
                    l("kbd", null, ",")
                  ], -1))
                ]),
                l("div", zl, [
                  J(w(a(o)("Toggle Full Screen")) + " ", 1),
                  L[16] || (L[16] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    J(" + "),
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
    const s = e, r = le("ServiceContainer"), { t: o } = r.i18n, c = V(!1), d = V(null), f = V((v = d.value) == null ? void 0 : v.strMessage);
    Oe(f, () => c.value = !1);
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
        Lt(_.$slots, "default"),
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
const Io = { render: Xl }, Zl = { class: "vuefinder__delete-modal__content" }, Ql = { class: "vuefinder__delete-modal__form" }, Jl = { class: "vuefinder__delete-modal__description" }, ei = { class: "vuefinder__delete-modal__files vf-scrollbar" }, ti = { class: "vuefinder__delete-modal__file" }, ni = {
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
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = V(e.modal.data.items), o = V(""), c = () => {
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
            l("div", Ql, [
              l("p", Jl, w(a(s)("Are you sure you want to delete these files?")), 1),
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
                  J(w(o.value), 1)
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
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = V(e.modal.data.items[0]), o = V(e.modal.data.items[0].basename), c = V(""), d = () => {
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
                  J(w(c.value), 1)
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
const Ho = { render: pi }, hi = { class: "vuefinder__new-folder-modal__content" }, gi = { class: "vuefinder__new-folder-modal__form" }, bi = { class: "vuefinder__new-folder-modal__description" }, wi = ["placeholder"], Uo = {
  __name: "ModalNewFolder",
  setup(n) {
    const e = le("ServiceContainer"), { getStore: s } = e.storage, { t: r } = e.i18n, o = V(""), c = V(""), d = () => {
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
            icon: a(Ho),
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
                  J(w(c.value), 1)
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
}, Ci = ["disabled"], Ei = ["disabled"], Ti = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Ai = ["textContent"], Mi = { class: "vuefinder__upload-modal__file-info" }, Di = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Li = { class: "vuefinder__upload-modal__file-name md:hidden" }, Oi = {
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
    }, c = V({ QUEUE_ENTRY_STATUS: o }), d = V(null), f = V(null), i = V(null), v = V(null), _ = V(null), u = V(null), h = V([]), p = V(""), g = V(!1), y = V(!1);
    let x;
    function $(O) {
      return h.value.findIndex((U) => U.id === O);
    }
    function R(O, U = null) {
      U = U ?? (O.webkitRelativePath || O.name), x.addFile({
        name: U,
        type: O.type,
        data: O,
        source: "Local"
      });
    }
    function L(O) {
      switch (O.status) {
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
    const k = (O) => {
      switch (O.status) {
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
    function F() {
      v.value.click();
    }
    function H() {
      if (!g.value) {
        if (!h.value.filter((O) => O.status !== o.DONE).length) {
          p.value = s("Please select file to upload first.");
          return;
        }
        p.value = "", x.retryAll(), x.upload();
      }
    }
    function A() {
      x.cancelAll({ reason: "user" }), h.value.forEach((O) => {
        O.status !== o.DONE && (O.status = o.CANCELED, O.statusName = s("Canceled"));
      }), g.value = !1;
    }
    function M(O) {
      g.value || (x.removeFile(O.id, "removed-by-user"), h.value.splice($(O.id), 1));
    }
    function E(O) {
      if (!g.value) {
        if (x.cancelAll({ reason: "user" }), O) {
          const U = [];
          h.value.forEach((S) => {
            S.status !== o.DONE && U.push(S);
          }), h.value = [], U.forEach((S) => {
            R(S.originalFile, S.name);
          });
          return;
        }
        h.value.splice(0);
      }
    }
    function T() {
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
      x = new pr({
        debug: e.debug,
        restrictions: {
          maxFileSize: Er(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(S, N) {
          if (N[S.id] != null) {
            const ee = $(S.id);
            h.value[ee].status === o.PENDING && (p.value = x.i18n("noDuplicates", { fileName: S.name })), h.value = h.value.filter((oe) => oe.id !== S.id);
          }
          return h.value.push({
            id: S.id,
            name: S.name,
            size: e.filesize(S.size),
            status: o.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: S.data
          }), !0;
        }
      }), x.use(hr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(S, N) {
          let P;
          try {
            P = JSON.parse(S).message;
          } catch {
            P = s("Cannot parse server response.");
          }
          return new Error(P);
        }
      }), x.on("restriction-failed", (S, N) => {
        const P = h.value[$(S.id)];
        M(P), p.value = N.message;
      }), x.on("upload", () => {
        const S = I();
        x.setMeta({ ...S.body });
        const N = x.getPlugin("XHRUpload");
        N.opts.method = S.method, N.opts.endpoint = S.url + "?" + new URLSearchParams(S.params), N.opts.headers = S.headers, delete S.headers["Content-Type"], g.value = !0, h.value.forEach((P) => {
          P.status !== o.DONE && (P.percent = null, P.status = o.UPLOADING, P.statusName = s("Pending upload"));
        });
      }), x.on("upload-progress", (S, N) => {
        const P = Math.floor(N.bytesUploaded / N.bytesTotal * 100);
        h.value[$(S.id)].percent = `${P}%`;
      }), x.on("upload-success", (S) => {
        const N = h.value[$(S.id)];
        N.status = o.DONE, N.statusName = s("Done"), e.emitter.emit("vf-fetch", {
          params: {
            q: "index",
            adapter: e.fs.adapter,
            path: e.fs.data.dirname
          }
        });
      }), x.on("upload-error", (S, N) => {
        const P = h.value[$(S.id)];
        P.percent = null, P.status = o.ERROR, N.isNetworkError ? P.statusName = s(
          "Network Error, Unable establish connection to the server or interrupted."
        ) : P.statusName = N ? N.message : s("Unknown Error");
      }), x.on("error", (S) => {
        p.value = S.message, g.value = !1, e.emitter.emit("vf-fetch", {
          params: {
            q: "index",
            adapter: e.fs.adapter,
            path: e.fs.data.dirname
          },
          noCloseModal: !0
        });
      }), x.on("complete", () => {
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
      }), u.value.addEventListener("dragover", (S) => {
        S.preventDefault(), y.value = !0;
      }), u.value.addEventListener("dragleave", (S) => {
        S.preventDefault(), y.value = !1;
      });
      function O(S, N) {
        N.isFile && N.file((P) => S(N, P)), N.isDirectory && N.createReader().readEntries((P) => {
          P.forEach((ee) => {
            O(S, ee);
          });
        });
      }
      u.value.addEventListener("drop", (S) => {
        S.preventDefault(), y.value = !1;
        const N = /^[/\\](.+)/;
        [...S.dataTransfer.items].forEach((P) => {
          P.kind === "file" && O((ee, oe) => {
            const se = N.exec(ee.fullPath);
            R(oe, se[1]);
          }, P.webkitGetAsEntry());
        });
      });
      const U = ({ target: S }) => {
        const N = S.files;
        for (const P of N)
          R(P);
        S.value = "";
      };
      f.value.addEventListener("change", U), i.value.addEventListener("change", U);
    }), Ps(() => {
      x == null || x.close({ reason: "unmount" });
    }), (O, U) => (m(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: g.value,
          onClick: et(H, ["prevent"])
        }, w(a(s)("Upload")), 9, Ii),
        g.value ? (m(), b("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: et(A, ["prevent"])
        }, w(a(s)("Cancel")), 1)) : (m(), b("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: et(T, ["prevent"])
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
              onClick: F
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
                onClick: U[0] || (U[0] = (S) => E(!1))
              }, w(a(s)("Clear all")), 9, Ci),
              l("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: g.value,
                onClick: U[1] || (U[1] = (S) => E(!0))
              }, w(a(s)("Clear only successful")), 9, Ei)
            ], 512),
            l("div", Ti, [
              (m(!0), b(ke, null, Ce(h.value, (S) => (m(), b("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: S.id
              }, [
                l("span", {
                  class: de(["vuefinder__upload-modal__file-icon", L(S)])
                }, [
                  l("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: w(k(S))
                  }, null, 8, Ai)
                ], 2),
                l("div", Mi, [
                  l("div", Di, w(a(Zn)(S.name, 40)) + " (" + w(S.size) + ") ", 1),
                  l("div", Li, w(a(Zn)(S.name, 16)) + " (" + w(S.size) + ") ", 1),
                  l("div", {
                    class: de(["vuefinder__upload-modal__file-status", L(S)])
                  }, [
                    J(w(S.statusName) + " ", 1),
                    S.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (m(), b("b", Oi, w(S.percent), 1)) : j("", !0)
                  ], 2)
                ]),
                l("button", {
                  type: "button",
                  class: de(["vuefinder__upload-modal__file-remove", g.value ? "disabled" : ""]),
                  title: a(s)("Delete"),
                  disabled: g.value,
                  onClick: (N) => M(S)
                }, U[3] || (U[3] = [
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
              h.value.length ? j("", !0) : (m(), b("div", Fi, w(a(s)("No files selected!")), 1))
            ]),
            p.value.length ? (m(), X(st, {
              key: 0,
              onHidden: U[2] || (U[2] = (S) => p.value = ""),
              error: ""
            }, {
              default: ne(() => [
                J(w(p.value), 1)
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
}, Hi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ui(n, e) {
  return m(), b("svg", Hi, e[0] || (e[0] = [
    l("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const No = { render: Ui }, Bi = { class: "vuefinder__unarchive-modal__content" }, Ni = { class: "vuefinder__unarchive-modal__items" }, Pi = { class: "vuefinder__unarchive-modal__item" }, qi = {
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
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = V(e.modal.data.items[0]), o = V(""), c = V([]), d = () => {
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
                  J(w(o.value), 1)
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
const qo = { render: Yi }, Ki = { class: "vuefinder__archive-modal__content" }, Xi = { class: "vuefinder__archive-modal__form" }, Zi = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Qi = { class: "vuefinder__archive-modal__file" }, Ji = {
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
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = V(""), o = V(""), c = V(e.modal.data.items), d = () => {
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
                (m(!0), b(ke, null, Ce(c.value, (v) => (m(), b("p", Qi, [
                  v.type === "dir" ? (m(), b("svg", Ji, i[3] || (i[3] = [
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
                  J(w(o.value), 1)
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
}, Cc = { class: "pl-2" }, Ec = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Tc = { class: "vuefinder__toolbar__controls" }, Ac = ["title"], Mc = ["title"], Dc = {
  __name: "Toolbar",
  setup(n) {
    const e = le("ServiceContainer"), { setStore: s } = e.storage, { t: r } = e.i18n, o = e.dragSelect, c = V("");
    e.emitter.on("vf-search-query", ({ newQuery: i }) => {
      c.value = i;
    });
    const d = () => {
      e.fullScreen = !e.fullScreen;
    };
    Oe(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", s("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const f = () => {
      e.view = e.view === "list" ? "grid" : "list", o.refreshSelection(), s("viewport", e.view);
    };
    return (i, v) => (m(), b("div", hc, [
      c.value.length ? (m(), b("div", $c, [
        l("div", Cc, [
          J(w(a(r)("Search results for")) + " ", 1),
          l("span", Ec, w(c.value), 1)
        ]),
        a(e).loadingIndicator === "circular" && a(e).fs.loading ? (m(), X(a(ms), { key: 0 })) : j("", !0)
      ])) : (m(), b("div", gc, [
        a(e).features.includes(a(_e).NEW_FOLDER) ? (m(), b("div", {
          key: 0,
          class: "mx-1.5",
          title: a(r)("New Folder"),
          onClick: v[0] || (v[0] = (_) => a(e).modal.open(Uo, { items: a(o).getSelected() }))
        }, [
          W(a(Ho))
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
        ], 8, Mc)
      ])
    ]));
  }
}, Lc = (n, e = 0, s = !1) => {
  let r;
  return (...o) => {
    s && !r && n(...o), clearTimeout(r), r = setTimeout(() => {
      n(...o);
    }, e);
  };
}, Hs = (n, e, s) => {
  const r = V(n);
  return lr((o, c) => ({
    get() {
      return o(), r.value;
    },
    set: Lc(
      (d) => {
        r.value = d, c();
      },
      e,
      s
    )
  }));
}, Oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Vc(n, e) {
  return m(), b("svg", Oc, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ]));
}
const Fc = { render: Vc }, Ic = { class: "vuefinder__move-modal__content" }, Rc = { class: "vuefinder__move-modal__description" }, Hc = { class: "vuefinder__move-modal__files vf-scrollbar" }, Uc = { class: "vuefinder__move-modal__file" }, Bc = {
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
}, Pc = { class: "vuefinder__move-modal__file-name" }, qc = { class: "vuefinder__move-modal__target-title" }, zc = { class: "vuefinder__move-modal__target-directory" }, jc = { class: "vuefinder__move-modal__target-path" }, Gc = { class: "vuefinder__move-modal__selected-items" }, Qn = {
  __name: "ModalMove",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = V(e.modal.data.items.from), o = V(""), c = () => {
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
            l("div", Hc, [
              (m(!0), b(ke, null, Ce(r.value, (i) => (m(), b("div", Uc, [
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
                J(w(o.value), 1)
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
const Qc = { render: Zc }, Jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function ed(n, e) {
  return m(), b("svg", Jc, e[0] || (e[0] = [
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
}, kd = { class: "relative" }, xd = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], Sd = { class: "vuefinder__breadcrumb__search-mode" }, $d = ["placeholder"], Cd = { class: "vuefinder__breadcrumb__hidden-dropdown" }, Ed = ["onDrop", "onClick"], Td = { class: "vuefinder__breadcrumb__hidden-item-content" }, Ad = { class: "vuefinder__breadcrumb__hidden-item-text" }, Md = {
  __name: "Breadcrumb",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = e.dragSelect, { setStore: o } = e.storage, c = V(null), d = Hs(0, 100);
    Oe(d, (A) => {
      const M = c.value.children;
      let E = 0, T = 0, I = 5, O = 1;
      e.fs.limitBreadcrumbItems(I), _t(() => {
        for (let U = M.length - 1; U >= 0 && !(E + M[U].offsetWidth > d.value - 40); U--)
          E += parseInt(M[U].offsetWidth, 10), T++;
        T < O && (T = O), T > I && (T = I), e.fs.limitBreadcrumbItems(T);
      });
    });
    const f = () => {
      d.value = c.value.offsetWidth;
    };
    let i = V(null);
    Ee(() => {
      i.value = new ResizeObserver(f), i.value.observe(c.value);
    }), Jn(() => {
      i.value.disconnect();
    });
    const v = (A, M = null) => {
      A.preventDefault(), r.isDraggingRef.value = !1, h(A), M ?? (M = e.fs.hiddenBreadcrumbs.length - 1);
      let E = JSON.parse(A.dataTransfer.getData("items"));
      if (E.find((T) => T.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Qn, {
        items: {
          from: E,
          to: e.fs.hiddenBreadcrumbs[M] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, _ = (A, M = null) => {
      A.preventDefault(), r.isDraggingRef.value = !1, h(A), M ?? (M = e.fs.breadcrumbs.length - 2);
      let E = JSON.parse(A.dataTransfer.getData("items"));
      if (E.find((T) => T.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Qn, {
        items: {
          from: E,
          to: e.fs.breadcrumbs[M] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, u = (A) => {
      A.preventDefault(), e.fs.isGoUpAvailable() ? (A.dataTransfer.dropEffect = "copy", A.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (A.dataTransfer.dropEffect = "none", A.dataTransfer.effectAllowed = "none");
    }, h = (A) => {
      A.preventDefault(), A.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && A.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, p = () => {
      F(), e.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }, g = () => {
      F(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, y = (A) => {
      e.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: e.fs.adapter, path: A.path }
      }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, x = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, $ = {
      mounted(A, M, E, T) {
        A.clickOutsideEvent = function(I) {
          A === I.target || A.contains(I.target) || M.value();
        }, document.body.addEventListener("click", A.clickOutsideEvent);
      },
      beforeUnmount(A, M, E, T) {
        document.body.removeEventListener("click", A.clickOutsideEvent);
      }
    };
    Oe(
      () => e.showTreeView,
      (A, M) => {
        A !== M && o("show-tree-view", A);
      }
    );
    const R = V(null), L = () => {
      e.features.includes(_e.SEARCH) && (e.fs.searchMode = !0, _t(() => R.value.focus()));
    }, k = Hs("", 400);
    Oe(k, (A) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: A });
    }), Oe(
      () => e.fs.searchMode,
      (A) => {
        A && _t(() => R.value.focus());
      }
    );
    const F = () => {
      e.fs.searchMode = !1, k.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      F();
    });
    const H = () => {
      k.value === "" && F();
    };
    return (A, M) => (m(), b("div", pd, [
      l("span", {
        title: a(s)("Go up a directory")
      }, [
        W(a(Qc), {
          onDragover: M[0] || (M[0] = (E) => u(E)),
          onDragleave: M[1] || (M[1] = (E) => h(E)),
          onDrop: M[2] || (M[2] = (E) => _(E)),
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
          onClick: M[3] || (M[3] = (E) => a(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, bd)) : (m(), b("span", {
        key: 0,
        title: a(s)("Refresh")
      }, [
        W(a(Kc), { onClick: p })
      ], 8, gd)),
      he(l("div", {
        onClick: et(L, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        l("div", null, [
          W(a(od), {
            onDragover: M[4] || (M[4] = (E) => u(E)),
            onDragleave: M[5] || (M[5] = (E) => h(E)),
            onDrop: M[6] || (M[6] = (E) => _(E, -1)),
            onClick: M[7] || (M[7] = (E) => a(e).emitter.emit("vf-fetch", {
              params: { q: "index", adapter: a(e).fs.adapter }
            }))
          })
        ]),
        l("div", wd, [
          a(e).fs.hiddenBreadcrumbs.length ? he((m(), b("div", yd, [
            M[13] || (M[13] = l("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("div", kd, [
              l("span", {
                onDragenter: M[8] || (M[8] = (E) => a(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: M[9] || (M[9] = (E) => a(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                W(a(md), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [$, x]
          ]) : j("", !0)
        ]),
        l("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: et(L, ["self"])
        }, [
          (m(!0), b(ke, null, Ce(a(e).fs.breadcrumbs, (E, T) => (m(), b("div", { key: T }, [
            M[14] || (M[14] = l("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("span", {
              onDragover: (I) => T === a(e).fs.breadcrumbs.length - 1 || u(I),
              onDragleave: (I) => T === a(e).fs.breadcrumbs.length - 1 || h(I),
              onDrop: (I) => T === a(e).fs.breadcrumbs.length - 1 || _(I, T),
              class: "vuefinder__breadcrumb__item",
              title: E.basename,
              onClick: (I) => a(e).emitter.emit("vf-fetch", {
                params: {
                  q: "index",
                  adapter: a(e).fs.adapter,
                  path: E.path
                }
              })
            }, w(E.name), 41, xd)
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
          ref: R,
          onKeydown: It(F, ["esc"]),
          onBlur: H,
          "onUpdate:modelValue": M[10] || (M[10] = (E) => ir(k) ? k.value = E : null),
          placeholder: a(s)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, $d), [
          [Rt, a(k)]
        ]),
        W(a(dd), { onClick: F })
      ], 512), [
        [Ge, a(e).fs.searchMode]
      ]),
      he(l("div", Cd, [
        (m(!0), b(ke, null, Ce(a(e).fs.hiddenBreadcrumbs, (E, T) => (m(), b("div", {
          key: T,
          onDragover: M[11] || (M[11] = (I) => u(I)),
          onDragleave: M[12] || (M[12] = (I) => h(I)),
          onDrop: (I) => v(I, T),
          onClick: (I) => y(E),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          l("div", Td, [
            l("span", null, [
              W(a(xn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            l("span", Ad, w(E.name), 1)
          ])
        ], 40, Ed))), 128))
      ], 512), [
        [Ge, a(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, jo = (n, e = null) => new Date(n * 1e3).toLocaleString(e ?? "ru-RU"), Dd = ["onClick"], Ld = {
  __name: "Toast",
  setup(n) {
    const e = le("ServiceContainer"), { getStore: s } = e.storage, r = V(s("full-screen", !1)), o = V([]), c = (i) => i === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", d = (i) => {
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
            onClick: (h) => d(u),
            class: de(["vuefinder__toast__message", c(_.type)])
          }, w(_.label), 11, Dd))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, Od = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Vd(n, e) {
  return m(), b("svg", Od, e[0] || (e[0] = [
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
const Hd = { render: Rd }, en = {
  __name: "SortIcon",
  props: { direction: String },
  setup(n) {
    return (e, s) => (m(), b("div", null, [
      n.direction === "asc" ? (m(), X(a(Fd), { key: 0 })) : j("", !0),
      n.direction === "desc" ? (m(), X(a(Hd), { key: 1 })) : j("", !0)
    ]));
  }
}, Ud = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Bd(n, e) {
  return m(), b("svg", Ud, e[0] || (e[0] = [
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
}, Kd = { class: "vuefinder__text-preview" }, Xd = { class: "vuefinder__text-preview__header" }, Zd = ["title"], Qd = { class: "vuefinder__text-preview__actions" }, Jd = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, eu = { key: 1 }, tu = {
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, r = V(""), o = V(""), c = V(null), d = V(!1), f = V(""), i = V(!1), v = le("ServiceContainer"), { t: _ } = v.i18n;
    Ee(() => {
      v.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: v.modal.data.adapter, path: v.modal.data.item.path },
        responseType: "text"
      }).then((p) => {
        r.value = p, s("success");
      });
    });
    const u = () => {
      d.value = !d.value, o.value = r.value;
    }, h = () => {
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
      }).then((p) => {
        f.value = _("Updated."), r.value = p, s("success"), d.value = !d.value;
      }).catch((p) => {
        f.value = _(p.message), i.value = !0;
      });
    };
    return (p, g) => (m(), b("div", Kd, [
      l("div", Xd, [
        l("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: a(v).modal.data.item.path
        }, w(a(v).modal.data.item.basename), 9, Zd),
        l("div", Qd, [
          d.value ? (m(), b("button", {
            key: 0,
            onClick: h,
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
        ])) : (m(), b("pre", Jd, w(r.value), 1)),
        f.value.length ? (m(), X(st, {
          key: 2,
          onHidden: g[2] || (g[2] = (y) => f.value = ""),
          error: i.value
        }, {
          default: ne(() => [
            J(w(f.value), 1)
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
    const s = e, r = le("ServiceContainer"), { t: o } = r.i18n, c = V(null), d = V(null), f = V(!1), i = V(""), v = V(!1), _ = () => {
      f.value = !f.value, f.value ? d.value = new br(c.value, {
        crop(h) {
        }
      }) : d.value.destroy();
    }, u = () => {
      d.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (h) => {
          i.value = "", v.value = !1;
          const p = new FormData();
          p.set("file", h), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: p
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
    }), (h, p) => (m(), b("div", nu, [
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
            onClick: p[0] || (p[0] = (g) => _())
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
        onHidden: p[1] || (p[1] = (g) => i.value = ""),
        error: v.value
      }, {
        default: ne(() => [
          J(w(i.value), 1)
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
          d[0] || (d[0] = J(" Your browser does not support the video tag. "))
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
          d[0] || (d[0] = J(" Your browser does not support the audio element. "))
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
}, Tu = { class: "vuefinder__preview-modal__content" }, Au = { key: 0 }, Mu = { class: "vuefinder__preview-modal__loading" }, Du = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Lu = { class: "vuefinder__preview-modal__details" }, Ou = { class: "font-bold" }, Vu = { class: "font-bold pl-2" }, Fu = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Iu = ["download", "href"], Go = {
  __name: "ModalPreview",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = V(!1), o = (d) => (e.modal.data.item.mime_type ?? "").startsWith(d), c = e.features.includes(_e.PREVIEW);
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
            l("div", Mu, [
              r.value === !1 ? (m(), b("div", Du, [
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
        l("div", Lu, [
          l("div", null, [
            l("span", Ou, w(a(s)("File Size")) + ": ", 1),
            J(w(a(e).filesize(a(e).modal.data.item.file_size)), 1)
          ]),
          l("div", null, [
            l("span", Vu, w(a(s)("Last Modified")) + ": ", 1),
            J(" " + w(a(jo)(a(e).modal.data.item.last_modified)), 1)
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
function Hu(n, e) {
  return m(), b("svg", Ru, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ]));
}
const Wo = { render: Hu }, Uu = ["data-type", "data-item", "data-index"], In = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(n) {
    const e = le("ServiceContainer"), s = e.dragSelect, r = n, o = (p) => {
      p.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: p.path } })) : e.modal.open(Go, { adapter: e.fs.adapter, item: p });
    }, c = {
      mounted(p, g, y, x) {
        y.props.draggable && (p.addEventListener("dragstart", ($) => d($, g.value)), p.addEventListener("dragover", ($) => i($, g.value)), p.addEventListener("drop", ($) => f($, g.value)));
      },
      beforeUnmount(p, g, y, x) {
        y.props.draggable && (p.removeEventListener("dragstart", d), p.removeEventListener("dragover", i), p.removeEventListener("drop", f));
      }
    }, d = (p, g) => {
      if (p.altKey || p.ctrlKey || p.metaKey)
        return p.preventDefault(), !1;
      s.isDraggingRef.value = !0, p.dataTransfer.setDragImage(r.dragImage.$el, 0, 15), p.dataTransfer.effectAllowed = "all", p.dataTransfer.dropEffect = "copy", p.dataTransfer.setData("items", JSON.stringify(s.getSelected()));
    }, f = (p, g) => {
      p.preventDefault(), s.isDraggingRef.value = !1;
      let y = JSON.parse(p.dataTransfer.getData("items"));
      if (y.find((x) => x.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Qn, { items: { from: y, to: g } });
    }, i = (p, g) => {
      p.preventDefault(), !g || g.type !== "dir" || s.getSelection().find((y) => y === p.currentTarget) ? (p.dataTransfer.dropEffect = "none", p.dataTransfer.effectAllowed = "none") : p.dataTransfer.dropEffect = "copy";
    };
    let v = null, _ = !1;
    const u = () => {
      v && clearTimeout(v);
    }, h = (p) => {
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
          clientX: p.target.getBoundingClientRect().x,
          clientY: p.target.getBoundingClientRect().y
        });
        p.target.dispatchEvent(g);
      }, 500);
    };
    return (p, g) => he((m(), b("div", {
      style: vn({ opacity: a(s).isDraggingRef.value && a(s).getSelection().find((y) => p.$el === y) ? "0.5 !important" : "" }),
      class: de(["vuefinder__item", "vf-item-" + a(s).explorerId]),
      "data-type": n.item.type,
      key: n.item.path,
      "data-item": JSON.stringify(n.item),
      "data-index": n.index,
      onDblclick: g[0] || (g[0] = (y) => o(n.item)),
      onTouchstart: g[1] || (g[1] = (y) => h(y)),
      onTouchend: g[2] || (g[2] = (y) => u()),
      onContextmenu: g[3] || (g[3] = et((y) => a(e).emitter.emit("vf-contextmenu-show", { event: y, items: a(s).getSelected(), target: n.item }), ["prevent"]))
    }, [
      Lt(p.$slots, "default"),
      a(e).pinnedFolders.find((y) => y.path === n.item.path) ? (m(), X(a(Wo), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : j("", !0)
    ], 46, Uu)), [
      [c, n.item]
    ]);
  }
}, Bu = { class: "vuefinder__explorer__container" }, Nu = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Pu = { class: "vuefinder__explorer__drag-item" }, qu = {
  key: 0,
  class: "vuefinder__linear-loader absolute"
}, zu = { class: "vuefinder__explorer__item-list-content" }, ju = { class: "vuefinder__explorer__item-list-name" }, Gu = { class: "vuefinder__explorer__item-name" }, Wu = { class: "vuefinder__explorer__item-path" }, Yu = { class: "vuefinder__explorer__item-list-content" }, Ku = { class: "vuefinder__explorer__item-list-name" }, Xu = { class: "vuefinder__explorer__item-name" }, Zu = { class: "vuefinder__explorer__item-size" }, Qu = { class: "vuefinder__explorer__item-date" }, Ju = { class: "vuefinder__explorer__item-grid-content" }, ef = ["data-src", "alt"], tf = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, nf = { class: "vuefinder__explorer__item-title break-all" }, sf = {
  __name: "Explorer",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = (u) => u == null ? void 0 : u.substring(0, 3), o = V(null), c = V(""), d = e.dragSelect;
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
        onSuccess: (h) => {
          h.files.length || e.emitter.emit("vf-toast-push", { label: s("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const i = $t({ active: !1, column: "", order: "" }), v = (u = !0) => {
      let h = [...e.fs.data.files], p = i.column, g = i.order === "asc" ? 1 : -1;
      if (!u)
        return h;
      const y = (x, $) => typeof x == "string" && typeof $ == "string" ? x.toLowerCase().localeCompare($.toLowerCase()) : x < $ ? -1 : x > $ ? 1 : 0;
      return i.active && (h = h.slice().sort((x, $) => y(x[p], $[p]) * g)), h;
    }, _ = (u) => {
      i.active && i.column === u ? (i.active = i.order === "asc", i.column = u, i.order = "desc") : (i.active = !0, i.column = u, i.order = "asc");
    };
    return Ee(() => {
      f = new gr(d.area.value);
    }), Bs(() => {
      f.update();
    }), Ps(() => {
      f.destroy();
    }), (u, h) => (m(), b("div", Bu, [
      a(e).view === "list" || c.value.length ? (m(), b("div", Nu, [
        l("div", {
          onClick: h[0] || (h[0] = (p) => _("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          J(w(a(s)("Name")) + " ", 1),
          he(W(en, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Ge, i.active && i.column === "basename"]
          ])
        ]),
        c.value.length ? j("", !0) : (m(), b("div", {
          key: 0,
          onClick: h[1] || (h[1] = (p) => _("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          J(w(a(s)("Size")) + " ", 1),
          he(W(en, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Ge, i.active && i.column === "file_size"]
          ])
        ])),
        c.value.length ? j("", !0) : (m(), b("div", {
          key: 1,
          onClick: h[2] || (h[2] = (p) => _("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          J(w(a(s)("Date")) + " ", 1),
          he(W(en, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Ge, i.active && i.column === "last_modified"]
          ])
        ])),
        c.value.length ? (m(), b("div", {
          key: 2,
          onClick: h[3] || (h[3] = (p) => _("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          J(w(a(s)("Filepath")) + " ", 1),
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
        onContextmenu: h[4] || (h[4] = et((p) => a(e).emitter.emit("vf-contextmenu-show", { event: p, items: a(d).getSelected() }), ["self", "prevent"]))
      }, [
        a(e).loadingIndicator === "linear" && a(e).fs.loading ? (m(), b("div", qu)) : j("", !0),
        c.value.length ? (m(!0), b(ke, { key: 1 }, Ce(v(), (p, g) => (m(), X(In, {
          item: p,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-list"
        }, {
          default: ne(() => [
            l("div", zu, [
              l("div", ju, [
                W(Fn, {
                  type: p.type,
                  small: a(e).compactListView
                }, null, 8, ["type", "small"]),
                l("span", Gu, w(p.basename), 1)
              ]),
              l("div", Wu, w(p.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : j("", !0),
        a(e).view === "list" && !c.value.length ? (m(!0), b(ke, { key: 2 }, Ce(v(), (p, g) => (m(), X(In, {
          item: p,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: p.path
        }, {
          default: ne(() => [
            l("div", Yu, [
              l("div", Ku, [
                W(Fn, {
                  type: p.type,
                  small: a(e).compactListView
                }, null, 8, ["type", "small"]),
                l("span", Xu, w(p.basename), 1)
              ]),
              l("div", Zu, w(p.file_size ? a(e).filesize(p.file_size) : ""), 1),
              l("div", Qu, w(a(jo)(p.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : j("", !0),
        a(e).view === "grid" && !c.value.length ? (m(!0), b(ke, { key: 3 }, Ce(v(!1), (p, g) => (m(), X(In, {
          item: p,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: ne(() => [
            l("div", null, [
              l("div", Ju, [
                (p.mime_type ?? "").startsWith("image") && a(e).showThumbnails ? (m(), b("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": a(e).requester.getPreviewUrl(a(e).fs.adapter, p),
                  alt: p.basename,
                  key: p.path
                }, null, 8, ef)) : (m(), X(Fn, {
                  key: 1,
                  type: p.type
                }, null, 8, ["type"])),
                !((p.mime_type ?? "").startsWith("image") && a(e).showThumbnails) && p.type !== "dir" ? (m(), b("div", tf, w(r(p.extension)), 1)) : j("", !0)
              ]),
              l("span", nf, w(a(Zn)(p.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : j("", !0)
      ], 544),
      W(Ld)
    ]));
  }
}, of = ["href", "download"], rf = ["onClick"], af = {
  __name: "ContextMenu",
  setup(n) {
    const e = le("ServiceContainer"), s = V(null), r = V([]), o = V(""), c = $t({
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
      if (c.items = e.contextMenuItems.filter((h) => h.show(e, {
        searchQuery: o.value,
        items: _,
        target: u
      })), o.value)
        if (u)
          e.emitter.emit("vf-context-selected", [u]);
        else
          return;
      else !u && !o.value ? e.emitter.emit("vf-context-selected", []) : _.length > 1 && _.some((h) => h.path === u.path) ? e.emitter.emit("vf-context-selected", _) : e.emitter.emit("vf-context-selected", [u]);
      i(v);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const i = (v) => {
      const _ = e.dragSelect.area.value, u = e.root.getBoundingClientRect(), h = _.getBoundingClientRect();
      let p = v.clientX - u.left, g = v.clientY - u.top;
      c.active = !0, _t(() => {
        var R;
        const y = (R = s.value) == null ? void 0 : R.getBoundingClientRect();
        let x = (y == null ? void 0 : y.height) ?? 0, $ = (y == null ? void 0 : y.width) ?? 0;
        p = h.right - v.pageX + window.scrollX < $ ? p - $ : p, g = h.bottom - v.pageY + window.scrollY < x ? g - x : g, c.positions = {
          left: p + "px",
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
          onClick: _[0] || (_[0] = (h) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          l("span", null, w(u.title(a(e).i18n)), 1)
        ], 8, of)) : (m(), b("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => f(u)
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
    const e = le("ServiceContainer"), { t: s } = e.i18n, { setStore: r } = e.storage, o = e.dragSelect, c = V("");
    e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      c.value = _;
    }), je(() => {
      const _ = e.selectButton.multiple ? o.getSelected().length > 0 : o.getSelected().length === 1;
      return e.selectButton.active && _;
    });
    const d = je(() => {
      var u, h;
      const _ = (h = (u = e.fs) == null ? void 0 : u.data) == null ? void 0 : h.used_space;
      return typeof _ == "number" ? _.toFixed(2) : "0.00";
    }), f = je(() => {
      var u, h;
      const _ = (h = (u = e.fs) == null ? void 0 : u.data) == null ? void 0 : h.total_space;
      return typeof _ == "number" ? _.toFixed(2) : "0.00";
    }), i = je(() => {
      var h, p, g, y;
      const _ = (p = (h = e.fs) == null ? void 0 : h.data) == null ? void 0 : p.used_space, u = (y = (g = e.fs) == null ? void 0 : g.data) == null ? void 0 : y.total_space;
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
function Qo(n, e) {
  const s = n.findIndex((r) => r.path === e.path);
  s > -1 ? n[s] = e : n.push(e);
}
const $f = { class: "vuefinder__folder-loader-indicator" }, Cf = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Jo = {
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
    const e = n, s = le("ServiceContainer"), { t: r } = s.i18n, o = qs(n, "modelValue"), c = V(!1);
    Oe(
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
        Qo(s.treeViewData, { path: e.path, ...i });
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
}, Ef = { class: "vuefinder__treesubfolderlist__item-content" }, Tf = ["onClick"], Af = ["title", "onClick"], Mf = { class: "vuefinder__treesubfolderlist__item-icon" }, Df = { class: "vuefinder__treesubfolderlist__subfolder" }, Lf = {
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
    const e = le("ServiceContainer"), s = V([]), r = n, o = V(null);
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
              W(Jo, {
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
              l("div", Mf, [
                a(e).fs.path === v.path ? (m(), X(a(Ko), { key: 0 })) : (m(), X(a(xn), { key: 1 }))
              ]),
              l("div", {
                class: de(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": a(e).fs.path === v.path
                }])
              }, w(v.basename), 3)
            ], 8, Af)
          ]),
          l("div", Df, [
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
}, Of = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(n) {
    const e = le("ServiceContainer"), { setStore: s } = e.storage, r = V(!1);
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
          W(Jo, {
            adapter: n.storage,
            path: n.storage + "://",
            modelValue: r.value,
            "onUpdate:modelValue": d[0] || (d[0] = (f) => r.value = f)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      he(W(Lf, {
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
}, Rf = { class: "vuefinder__treeview__header" }, Hf = { class: "vuefinder__treeview__pinned-label" }, Uf = { class: "vuefinder__treeview__pin-text text-nowrap" }, Bf = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Nf = { class: "vuefinder__treeview__pinned-item" }, Pf = ["onClick"], qf = ["title"], zf = ["onClick"], jf = { key: 0 }, Gf = { class: "vuefinder__treeview__no-pinned" }, Wf = { class: "vuefinder__treeview__storage" }, Yf = {
  __name: "TreeView",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, { getStore: r, setStore: o } = e.storage, c = V(190), d = V(r("pinned-folders-opened", !0));
    Oe(d, (_) => o("pinned-folders-opened", _));
    const f = (_) => {
      e.pinnedFolders = e.pinnedFolders.filter((u) => u.path !== _.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, i = (_) => {
      const u = _.clientX, h = _.target.parentElement, p = h.getBoundingClientRect().width;
      h.classList.remove("transition-[width]"), h.classList.add("transition-none");
      const g = (x) => {
        c.value = p + x.clientX - u, c.value < 50 && (c.value = 0, e.showTreeView = !1), c.value > 50 && (e.showTreeView = !0);
      }, y = () => {
        const x = h.getBoundingClientRect();
        c.value = x.width, h.classList.add("transition-[width]"), h.classList.remove("transition-none"), window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", y);
      };
      window.addEventListener("mousemove", g), window.addEventListener("mouseup", y);
    }, v = V(null);
    return Ee(() => {
      Pe(v.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Oe(e.fs.data, (_, u) => {
      const h = _.files.filter((p) => p.type === "dir");
      Qo(e.treeViewData, { path: e.fs.path, folders: h.map((p) => ({
        adapter: p.storage,
        path: p.path,
        basename: p.basename
      })) });
    }), (_, u) => (m(), b(ke, null, [
      l("div", {
        onClick: u[0] || (u[0] = (h) => a(e).showTreeView = !a(e).showTreeView),
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
              onClick: u[2] || (u[2] = (h) => d.value = !d.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              l("div", Hf, [
                W(a(Wo), { class: "vuefinder__treeview__pin-icon" }),
                l("div", Uf, w(a(s)("Pinned Folders")), 1)
              ]),
              W(If, {
                modelValue: d.value,
                "onUpdate:modelValue": u[1] || (u[1] = (h) => d.value = h)
              }, null, 8, ["modelValue"])
            ]),
            d.value ? (m(), b("ul", Bf, [
              (m(!0), b(ke, null, Ce(a(e).pinnedFolders, (h) => (m(), b("li", Nf, [
                l("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (p) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: h.storage, path: h.path } })
                }, [
                  a(e).fs.path !== h.path ? (m(), X(a(xn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : j("", !0),
                  a(e).fs.path === h.path ? (m(), X(a(Ko), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : j("", !0),
                  l("div", {
                    title: h.path,
                    class: de(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": a(e).fs.path === h.path
                    }])
                  }, w(h.basename), 11, qf)
                ], 8, Pf),
                l("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (p) => f(h)
                }, [
                  W(a(wf), { class: "vuefinder__treeview__remove-icon" })
                ], 8, zf)
              ]))), 256)),
              a(e).pinnedFolders.length ? j("", !0) : (m(), b("li", jf, [
                l("div", Gf, w(a(s)("No folders pinned")), 1)
              ]))
            ])) : j("", !0)
          ]),
          (m(!0), b(ke, null, Ce(a(e).fs.data.storages, (h) => (m(), b("div", Wf, [
            W(Of, { storage: h }, null, 8, ["storage"])
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
function Ue(n, e) {
  return n.map((s) => new Kf(s.title, s.action, s.link, {
    ...e,
    feature: s.key
  }));
}
const Ae = {
  newfolder: {
    key: _e.NEW_FOLDER,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(Uo)
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
  ...Ue([Ae.openDir], {
    needsSearchQuery: !0
  }),
  ...Ue(
    [Ae.refresh, Ae.selectAll, Ae.newfolder],
    {
      target: null
    }
  ),
  ...Ue(
    [Ae.refresh, Ae.archive, Ae.delete],
    {
      target: "many"
    }
  ),
  ...Ue([Ae.open], {
    targetType: "dir"
  }),
  ...Ue([Ae.unpinFolder], {
    targetType: "dir",
    show: (n, e) => n.pinnedFolders.findIndex((s) => {
      var r;
      return s.path === ((r = e.target) == null ? void 0 : r.path);
    }) !== -1
  }),
  ...Ue([Ae.pinFolder], {
    targetType: "dir",
    show: (n, e) => n.pinnedFolders.findIndex((s) => {
      var r;
      return s.path === ((r = e.target) == null ? void 0 : r.path);
    }) === -1
  }),
  ...Ue([Ae.preview], {
    show: (n, e) => {
      var s;
      return ((s = e.target) == null ? void 0 : s.type) !== "dir";
    }
  }),
  ...Ue([Ae.download], {}),
  ...Ue([Ae.rename], { numItems: "one" }),
  ...Ue([Ae.unarchive], {
    mimeType: "application/zip"
  }),
  ...Ue([Ae.archive], {
    show: (n, e) => {
      var s;
      return ((s = e.target) == null ? void 0 : s.mime_type) !== "application/zip";
    }
  }),
  ...Ue([Ae.delete], {})
], Zf = { class: "vuefinder__main__content" }, Qf = {
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
    const { setStore: c } = o.storage, d = V(null);
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
        body: h = null,
        onSuccess: p = null,
        onError: g = null,
        noCloseModal: y = !1
      }) => {
        ["index", "search"].includes(u.q) && (v && v.abort(), o.fs.loading = !0), v = new AbortController();
        const x = v.signal;
        if (u.q === "download") {
          o.requester.send({
            url: "",
            method: u.m || "post",
            params: u,
            body: h,
            abortSignal: x
          }).then(($) => {
            if (!$.ok) throw new Error("Download failed");
            return $.blob();
          }).then(($) => {
            const R = URL.createObjectURL($), L = document.createElement("a");
            L.href = R, L.download = "folder.zip", L.click(), URL.revokeObjectURL(R), p && p($);
          }).catch(($) => {
            console.error($), g && g($);
          }).finally(() => {
            ["index", "search"].includes(u.q) && (o.fs.loading = !1);
          });
          return;
        }
        o.requester.send({
          url: "",
          method: u.m || "get",
          params: u,
          body: h,
          abortSignal: x
        }).then(($) => {
          o.fs.adapter = $.adapter, o.persist && (o.fs.path = $.dirname, c("path", o.fs.path)), y || o.modal.close(), i($), p && p($);
        }).catch(($) => {
          console.error($), g && g($);
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
        onError: (h) => {
          onError(h);
        }
      });
    });
    function _(u) {
      let h = {};
      u && u.includes("://") && (h = {
        adapter: u.split("://")[0],
        path: u
      }), o.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: o.fs.adapter, ...h },
        onError: r.onError ?? ((p) => {
          p.message && o.emitter.emit("vf-toast-push", {
            label: p.message,
            type: "error"
          });
        })
      });
    }
    return Ee(() => {
      _(o.fs.path), Oe(
        () => r.path,
        (u) => {
          _(u);
        }
      ), f.onSelect((u) => {
        s("select", u);
      }), Oe(
        () => o.fs.data.dirname,
        (u) => {
          s("update:path", u);
        }
      );
    }), (u, h) => (m(), b("div", {
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
          onMousedown: h[0] || (h[0] = (p) => a(o).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: h[1] || (h[1] = (p) => a(o).emitter.emit("vf-contextmenu-hide"))
        }, [
          W(Dc),
          W(Md),
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
    e.locale = e.locale ?? s ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", Qf);
  }
};
export {
  Kf as SimpleContextMenuItem,
  Xf as contextMenuItems,
  iv as default
};
