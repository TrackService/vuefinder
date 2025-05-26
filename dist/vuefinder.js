var or = Object.defineProperty;
var rr = (n, e, s) => e in n ? or(n, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[e] = s;
var Tn = (n, e, s) => rr(n, typeof e != "symbol" ? e + "" : e, s);
import { reactive as pt, watch as Oe, ref as V, shallowRef as ar, onMounted as Ee, onUnmounted as Qn, onUpdated as Bs, nextTick as _t, computed as je, inject as le, createElementBlock as b, openBlock as p, withKeys as It, unref as a, createElementVNode as l, withModifiers as et, renderSlot as Lt, normalizeClass as de, toDisplayString as w, createBlock as X, resolveDynamicComponent as qs, withCtx as ne, createVNode as W, createCommentVNode as j, Fragment as ke, renderList as Ce, withDirectives as he, vModelCheckbox as Zt, createTextVNode as Q, vModelSelect as bs, vModelText as Rt, onBeforeUnmount as Ns, customRef as lr, vShow as Ge, isRef as ir, TransitionGroup as cr, normalizeStyle as vn, mergeModels as dr, useModel as Ps, resolveComponent as ur, provide as fr, Transition as vr } from "vue";
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
    const o = Object.assign({}, s.headers, r, e.headers), c = Object.assign({}, s.params, e.params), d = e.body, u = s.baseUrl + e.url, i = e.method;
    let f;
    i !== "get" && (d instanceof FormData ? (f = d, s.body != null && Object.entries(this.config.body).forEach(([v, h]) => {
      f.append(v, h);
    })) : (f = { ...d }, s.body != null && Object.assign(f, this.config.body)));
    const m = {
      url: u,
      method: i,
      headers: o,
      params: c,
      body: f
    };
    if (s.transformRequest != null) {
      const v = s.transformRequest({
        url: u,
        method: i,
        headers: o,
        params: c,
        body: f
      });
      v.url != null && (m.url = v.url), v.method != null && (m.method = v.method), v.params != null && (m.params = v.params ?? {}), v.headers != null && (m.headers = v.headers ?? {}), v.body != null && (m.body = v.body);
    }
    return m;
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
      let u;
      s.body instanceof FormData ? u = e.body : (u = JSON.stringify(s.body), o.headers["Content-Type"] = "application/json"), o.body = u;
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
  const s = pt(JSON.parse(e ?? "{}"));
  Oe(s, r);
  function r() {
    Object.keys(s).length ? localStorage.setItem(n + "_storage", JSON.stringify(s)) : localStorage.removeItem(n + "_storage");
  }
  function o(i, f) {
    s[i] = f;
  }
  function c(i) {
    delete s[i];
  }
  function d() {
    Object.keys(s).map((i) => c(i));
  }
  return { getStore: (i, f = null) => f, setStore: o, removeStore: c, clearStore: d };
}
async function xr(n, e) {
  const s = e[n];
  return typeof s == "function" ? (await s()).default : s;
}
function Sr(n, e, s, r) {
  const { getStore: o, setStore: c } = n, d = V({}), u = pt(r), i = V(o("locale", e)), f = (_, g = e) => {
    if (!u[_]) {
      s.emit("vf-toast-push", {
        label: `Locale "${_}" is not available.`,
        type: "error"
      });
      return;
    }
    xr(_, u).then((y) => {
      d.value = y, c("locale", _), c("translations", y), i.value = _, s.emit("vf-language-saved");
    }).catch((y) => {
      g && _ !== g && f(g, null);
    });
  };
  Oe(i, (_) => {
    f(_);
  }), u && Object.keys(u).length > 0 ? f(i.value) : d.value = o("translations") ?? {};
  const m = (_, g) => {
    u[_] = g;
  };
  o("locale") || f(e);
  const v = (_, ...g) => g.length ? v(_.replace("%s", g.shift()), ...g) : _;
  function h(_, ...g) {
    const y = u[i.value] || {};
    return y.hasOwnProperty(_) ? v(y[_], ...g) : v(_, ...g);
  }
  return pt({ t: h, locale: i, addLocale: m, changeLocale: f });
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
  const u = (m, v) => {
    const h = c, _ = m, g = v || (r ? !r(h, _) : h !== _);
    return (g || o) && (c = _, d = h), [c, g, d];
  };
  return [e ? (m) => u(e(c, d), m) : u, (m) => [c, !!m, d]];
}, Mr = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, Ve = Mr ? window : {}, Gs = Math.max, Dr = Math.min, Rn = Math.round, on = Math.abs, ws = Math.sign, Ws = Ve.cancelAnimationFrame, es = Ve.requestAnimationFrame, rn = Ve.setTimeout, Un = Ve.clearTimeout, _n = (n) => typeof Ve[n] < "u" ? Ve[n] : void 0, Lr = _n("MutationObserver"), ys = _n("IntersectionObserver"), gt = _n("ResizeObserver"), Dt = _n("ScrollTimeline"), ts = (n) => n === void 0, mn = (n) => n === null, Ye = (n) => typeof n == "number", Ut = (n) => typeof n == "string", pn = (n) => typeof n == "boolean", Be = (n) => typeof n == "function", Ke = (n) => Array.isArray(n), an = (n) => typeof n == "object" && !Ke(n) && !mn(n), ns = (n) => {
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
const Ys = (n, e) => n.indexOf(e) >= 0, Ot = (n, e) => n.concat(e), ge = (n, e, s) => (!Ut(e) && ns(e) ? Array.prototype.push.apply(n, e) : n.push(e), n), ct = (n) => Array.from(n || []), ss = (n) => Ke(n) ? n : !Ut(n) && ns(n) ? ct(n) : [n], Hn = (n) => !!n && !n.length, Bn = (n) => ct(new Set(n)), Re = (n, e, s) => {
  ie(n, (o) => o ? o.apply(void 0, e || []) : !0), s || (n.length = 0);
}, Ks = "paddingTop", Xs = "paddingRight", Zs = "paddingLeft", Js = "paddingBottom", Qs = "marginLeft", eo = "marginRight", to = "marginBottom", no = "overflowX", so = "overflowY", gn = "width", bn = "height", at = "visible", vt = "hidden", xt = "scroll", Or = (n) => {
  const e = String(n || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, wn = (n, e, s, r) => {
  if (n && e) {
    let o = !0;
    return ie(s, (c) => {
      const d = n[c], u = e[c];
      d !== u && (o = !1);
    }), o;
  }
  return !1;
}, oo = (n, e) => wn(n, e, ["w", "h"]), tn = (n, e) => wn(n, e, ["x", "y"]), Vr = (n, e) => wn(n, e, ["t", "r", "b", "l"]), lt = () => {
}, Z = (n, ...e) => n.bind(0, ...e), bt = (n) => {
  let e;
  const s = n ? rn : es, r = n ? Un : Ws;
  return [(o) => {
    r(e), e = s(() => o(), Be(n) ? n() : n);
  }, () => r(e)];
}, dn = (n, e) => {
  const { _: s, p: r, v: o, S: c } = e || {};
  let d, u, i, f, m = lt;
  const v = function(S) {
    m(), Un(d), f = d = u = void 0, m = lt, n.apply(this, S);
  }, h = (y) => c && u ? c(u, y) : y, _ = () => {
    m !== lt && v(h(i) || i);
  }, g = function() {
    const S = ct(arguments), O = Be(s) ? s() : s;
    if (Ye(O) && O >= 0) {
      const D = Be(r) ? r() : r, x = Ye(D) && D >= 0, F = O > 0 ? rn : es, U = O > 0 ? Un : Ws, C = h(S) || S, k = v.bind(0, C);
      let A;
      m(), o && !f ? (k(), f = !0, A = F(() => f = void 0, O)) : (A = F(k, O), x && !d && (d = rn(_, D))), m = () => U(A), u = i = C;
    } else
      v(S);
  };
  return g.m = _, g;
}, ro = (n, e) => Object.prototype.hasOwnProperty.call(n, e), qe = (n) => n ? Object.keys(n) : [], re = (n, e, s, r, o, c, d) => {
  const u = [e, s, r, o, c, d];
  return (typeof n != "object" || mn(n)) && !Be(n) && (n = {}), ie(u, (i) => {
    ie(i, (f, m) => {
      const v = i[m];
      if (n === v)
        return !0;
      const h = Ke(v);
      if (v && ln(v)) {
        const _ = n[m];
        let g = _;
        h && !Ke(_) ? g = [] : !h && !ln(_) && (g = {}), n[m] = re(g, v);
      } else
        n[m] = h ? v.slice() : v;
    });
  }), n;
}, ao = (n, e) => ie(re({}, n), (s, r, o) => {
  s === void 0 ? delete o[r] : s && ln(s) && (o[r] = ao(s));
}), os = (n) => !qe(n).length, lo = (n, e, s) => Gs(n, Dr(e, s)), mt = (n) => Bn((Ke(n) ? n : (n || "").split(" ")).filter((e) => e)), rs = (n, e) => n && n.getAttribute(e), ks = (n, e) => n && n.hasAttribute(e), Je = (n, e, s) => {
  ie(mt(e), (r) => {
    n && n.setAttribute(r, String(s || ""));
  });
}, ze = (n, e) => {
  ie(mt(e), (s) => n && n.removeAttribute(s));
}, yn = (n, e) => {
  const s = mt(rs(n, e)), r = Z(Je, n, e), o = (c, d) => {
    const u = new Set(s);
    return ie(mt(c), (i) => {
      u[d](i);
    }), ct(u).join(" ");
  };
  return {
    O: (c) => r(o(c, "delete")),
    $: (c) => r(o(c, "add")),
    C: (c) => {
      const d = mt(c);
      return d.reduce((u, i) => u && s.includes(i), d.length > 0);
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
}, qn = (n, e) => hn(n) && n.matches(e), vo = (n) => qn(n, "body"), Nn = (n) => n ? ct(n.childNodes) : [], Vt = (n) => n && n.parentElement, wt = (n, e) => hn(n) && n.closest(e), Pn = (n) => document.activeElement, Ir = (n, e, s) => {
  const r = wt(n, e), o = n && Fr(s, r), c = wt(o, e) === r;
  return r && o ? r === n || o === n || c && wt(wt(n, s), e) !== r : !1;
}, St = (n) => {
  ie(ss(n), (e) => {
    const s = Vt(e);
    e && s && s.removeChild(e);
  });
}, Le = (n, e) => Z(St, n && e && ie(ss(e), (s) => {
  s && n.appendChild(s);
}));
let _o;
const Rr = () => _o, Ur = (n) => {
  _o = n;
}, yt = (n) => {
  const e = document.createElement("div");
  return Je(e, "class", n), e;
}, mo = (n) => {
  const e = yt(), s = Rr(), r = n.trim();
  return e.innerHTML = s ? s.createHTML(r) : r, ie(Nn(e), (o) => St(o));
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
    o = r ? xs(c, e) : ct(e).reduce((d, u) => (d[u] = xs(c, u), d), o);
  }
  return o;
}
const Ss = (n, e, s) => {
  const r = e ? `${e}-` : "", o = s ? `-${s}` : "", c = `${r}top${o}`, d = `${r}right${o}`, u = `${r}bottom${o}`, i = `${r}left${o}`, f = tt(n, [c, d, u, i]);
  return {
    t: Jt(f[c]),
    r: Jt(f[d]),
    b: Jt(f[u]),
    l: Jt(f[i])
  };
}, Mn = (n, e) => `translate${an(n) ? `(${n.x},${n.y})` : `${e ? "X" : "Y"}(${n})`}`, Hr = (n) => !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length), Br = {
  w: 0,
  h: 0
}, kn = (n, e) => e ? {
  w: e[`${n}Width`],
  h: e[`${n}Height`]
} : Br, qr = (n) => kn("inner", n || Ve), kt = Z(kn, "offset"), go = Z(kn, "client"), fn = Z(kn, "scroll"), cs = (n) => {
  const e = parseFloat(tt(n, gn)) || 0, s = parseFloat(tt(n, bn)) || 0;
  return {
    w: e - Rn(e),
    h: s - Rn(s)
  };
}, Dn = (n) => n.getBoundingClientRect(), Nr = (n) => !!n && Hr(n), jn = (n) => !!(n && (n[bn] || n[gn])), bo = (n, e) => {
  const s = jn(n);
  return !jn(e) && s;
}, $s = (n, e, s, r) => {
  ie(mt(e), (o) => {
    n && n.removeEventListener(o, s, r);
  });
}, ve = (n, e, s, r) => {
  var o;
  const c = (o = r && r.H) != null ? o : !0, d = r && r.I || !1, u = r && r.A || !1, i = {
    passive: c,
    capture: d
  };
  return Z(Re, mt(e).map((f) => {
    const m = u ? (v) => {
      $s(n, f, m, d), s && s(v);
    } : s;
    return n && n.addEventListener(f, m, i), Z($s, n, f, m, d);
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
}), Pr = (n, e) => {
  const { D: s, M: r } = n, { w: o, h: c } = e, d = (v, h, _) => {
    let g = ws(v) * _, y = ws(h) * _;
    if (g === y) {
      const S = on(v), O = on(h);
      y = S > O ? 0 : y, g = S < O ? 0 : g;
    }
    return g = g === y ? 0 : g, [g + 0, y + 0];
  }, [u, i] = d(s.x, r.x, o), [f, m] = d(s.y, r.y, c);
  return {
    D: {
      x: u,
      y: f
    },
    M: {
      x: i,
      y: m
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
      const u = e.get(c);
      Es((i) => {
        u && u[i ? "delete" : "clear"](i);
      }, d);
    } else
      e.forEach((u) => {
        u.clear();
      }), e.clear();
  }, r = (c, d) => {
    if (Ut(c)) {
      const f = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, f), Es((m) => {
        Be(m) && f.add(m);
      }, d), Z(s, c, d);
    }
    pn(d) && d && s();
    const u = qe(c), i = [];
    return ie(u, (f) => {
      const m = c[f];
      m && ge(i, r(f, m));
    }), Z(Re, i);
  }, o = (c, d) => {
    ie(ct(e.get(c)), (u) => {
      d && !Hn(d) ? u.apply(0, d) : u();
    });
  };
  return r(n || {}), [r, s, o];
}, xo = {}, So = {}, zr = (n) => {
  ie(n, (e) => ie(e, (s, r) => {
    xo[r] = e[r];
  }));
}, $o = (n, e, s) => qe(n).map((r) => {
  const { static: o, instance: c } = n[r], [d, u, i] = s || [], f = s ? c : o;
  if (f) {
    const m = s ? f(d, u, e) : f(e);
    return (i || So)[r] = m;
  }
}), Ht = (n) => So[n], jr = "__osOptionsValidationPlugin", Ct = "data-overlayscrollbars", nn = "os-environment", Qt = `${nn}-scrollbar-hidden`, On = `${Ct}-initialize`, sn = "noClipping", Ts = `${Ct}-body`, it = Ct, Gr = "host", Qe = `${Ct}-viewport`, Wr = no, Yr = so, Kr = "arrange", Co = "measuring", Xr = "scrolling", Eo = "scrollbarHidden", Zr = "noContent", Kn = `${Ct}-padding`, As = `${Ct}-content`, ds = "os-size-observer", Jr = `${ds}-appear`, Qr = `${ds}-listener`, ea = "os-trinsic-observer", ta = "os-theme-none", Ue = "os-scrollbar", na = `${Ue}-rtl`, sa = `${Ue}-horizontal`, oa = `${Ue}-vertical`, To = `${Ue}-track`, us = `${Ue}-handle`, ra = `${Ue}-visible`, aa = `${Ue}-cornerless`, Ms = `${Ue}-interaction`, Ds = `${Ue}-unusable`, Xn = `${Ue}-auto-hide`, Ls = `${Xn}-hidden`, Os = `${Ue}-wheel`, la = `${To}-interactive`, ia = `${us}-interactive`, ca = "__osSizeObserverPlugin", da = (n, e) => {
  const { T: s } = e, [r, o] = n("showNativeOverlaidScrollbars");
  return [r && s.x && s.y, o];
}, $t = (n) => n.indexOf(at) === 0, ua = (n, e) => {
  const s = (o, c, d, u) => {
    const i = o === at ? vt : o.replace(`${at}-`, ""), f = $t(o), m = $t(d);
    return !c && !u ? vt : f && m ? at : f ? c && u ? i : c ? at : vt : c ? i : m && u ? at : vt;
  }, r = {
    x: s(e.x, n.x, e.y, n.y),
    y: s(e.y, n.y, e.x, n.x)
  };
  return {
    k: r,
    R: {
      x: r.x === xt,
      y: r.y === xt
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
  const s = {}, r = Ot(qe(e), qe(n));
  return ie(r, (o) => {
    const c = n[o], d = e[o];
    if (an(c) && an(d))
      re(s[o] = {}, Mo(c, d)), os(s[o]) && delete s[o];
    else if (ro(e, o) && d !== c) {
      let u = !0;
      if (Ke(c) || Ke(d))
        try {
          Vs(c) === Vs(d) && (u = !1);
        } catch {
        }
      u && (s[o] = d);
    }
  }), s;
}, Is = (n, e, s) => (r) => [Fs(n, r), s || Fs(e, r) !== void 0];
let Do;
const _a = () => Do, ma = (n) => {
  Do = n;
};
let Vn;
const pa = () => {
  const n = (x, F, U) => {
    Le(document.body, x), Le(document.body, x);
    const $ = go(x), C = kt(x), k = cs(F);
    return U && St(x), {
      x: C.h - $.h + k.h,
      y: C.w - $.w + k.w
    };
  }, e = (x) => {
    let F = !1;
    const U = is(x, Qt);
    try {
      F = tt(x, "scrollbar-width") === "none" || tt(x, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return U(), F;
  }, s = `.${nn}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${nn} div{width:200%;height:200%;margin:10px 0}.${Qt}{scrollbar-width:none!important}.${Qt}::-webkit-scrollbar,.${Qt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, o = mo(`<div class="${nn}"><div></div><style>${s}</style></div>`)[0], c = o.firstChild, d = o.lastChild, u = _a();
  u && (d.nonce = u);
  const [i, , f] = Yn(), [m, v] = Fe({
    o: n(o, c),
    i: tn
  }, Z(n, o, c, !0)), [h] = v(), _ = e(o), g = {
    x: h.x === 0,
    y: h.y === 0
  }, y = {
    elements: {
      host: null,
      padding: !_,
      viewport: (x) => _ && vo(x) && x,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, S = re({}, va), O = Z(re, {}, S), I = Z(re, {}, y), D = {
    N: h,
    T: g,
    P: _,
    G: !!Dt,
    K: Z(i, "r"),
    Z: I,
    tt: (x) => re(y, x) && I(),
    nt: O,
    ot: (x) => re(S, x) && O(),
    st: re({}, y),
    et: re({}, S)
  };
  if (ze(o, "style"), St(o), ve(Ve, "resize", () => {
    f("r", []);
  }), Be(Ve.matchMedia) && !_ && (!g.x || !g.y)) {
    const x = (F) => {
      const U = Ve.matchMedia(`(resolution: ${Ve.devicePixelRatio}dppx)`);
      ve(U, "change", () => {
        F(), x(F);
      }, {
        A: !0
      });
    };
    x(() => {
      const [F, U] = m();
      re(D.N, F), f("r", [U]);
    });
  }
  return D;
}, Xe = () => (Vn || (Vn = pa()), Vn), ha = (n, e, s) => {
  let r = !1;
  const o = s ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    r = !0;
  }, d = (u) => {
    if (o && s) {
      const i = s.map((f) => {
        const [m, v] = f || [];
        return [v && m ? (u || fo)(m, n) : [], v];
      });
      ie(i, (f) => ie(f[0], (m) => {
        const v = f[1], h = o.get(m) || [];
        if (n.contains(m) && v) {
          const g = ve(m, v, (y) => {
            r ? (g(), o.delete(m)) : e(y);
          });
          o.set(m, ge(h, g));
        } else
          Re(h), o.delete(m);
      }));
    }
  };
  return d(), [c, d];
}, Rs = (n, e, s, r) => {
  let o = !1;
  const { ct: c, rt: d, lt: u, it: i, ut: f, ft: m } = r || {}, v = dn(() => o && s(!0), {
    _: 33,
    p: 99
  }), [h, _] = ha(n, v, u), g = c || [], y = d || [], S = Ot(g, y), O = (D, x) => {
    if (!Hn(x)) {
      const F = f || lt, U = m || lt, $ = [], C = [];
      let k = !1, A = !1;
      if (ie(x, (R) => {
        const { attributeName: L, target: q, type: T, oldValue: N, addedNodes: B, removedNodes: ee } = R, oe = T === "attributes", se = T === "childList", me = n === q, K = oe && L, E = K && rs(q, L || ""), H = Ut(E) ? E : null, P = K && N !== H, M = Ys(y, L) && P;
        if (e && (se || !me)) {
          const G = oe && P, z = G && i && qn(q, i), J = (z ? !F(q, L, N, H) : !oe || G) && !U(R, !!z, n, r);
          ie(B, (ae) => ge($, ae)), ie(ee, (ae) => ge($, ae)), A = A || J;
        }
        !e && me && P && !F(q, L, N, H) && (ge(C, L), k = k || M);
      }), _((R) => Bn($).reduce((L, q) => (ge(L, fo(R, q)), qn(q, R) ? ge(L, q) : L), [])), e)
        return !D && A && s(!1), [!1];
      if (!Hn(C) || k) {
        const R = [Bn(C), k];
        return D || s.apply(0, R), R;
      }
    }
  }, I = new Lr(Z(O, !1));
  return [() => (I.observe(n, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: S,
    subtree: e,
    childList: e,
    characterData: e
  }), o = !0, () => {
    o && (h(), I.disconnect(), o = !1);
  }), () => {
    if (o)
      return v.m(), O(!0, I.takeRecords());
  }];
};
let ft = null;
const Lo = (n, e, s) => {
  const { _t: r } = s || {}, o = Ht(ca), [c] = Fe({
    o: !1,
    u: !0
  });
  return () => {
    const d = [], i = mo(`<div class="${ds}"><div class="${Qr}"></div></div>`)[0], f = i.firstChild, m = (v) => {
      const h = v instanceof ResizeObserverEntry;
      let _ = !1, g = !1;
      if (h) {
        const [y, , S] = c(v.contentRect), O = jn(y);
        g = bo(y, S), _ = !g && !O;
      } else
        g = v === !0;
      _ || e({
        dt: !0,
        _t: g
      });
    };
    if (gt) {
      if (!pn(ft)) {
        const g = new gt(lt);
        g.observe(n, {
          get box() {
            ft = !0;
          }
        }), ft = ft || !1, g.disconnect();
      }
      const v = dn(m, {
        _: 0,
        p: 0
      }), h = (g) => v(g.pop()), _ = new gt(h);
      if (_.observe(ft ? n : f), ge(d, [() => _.disconnect(), !ft && Le(n, i)]), ft) {
        const g = new gt(h);
        g.observe(n, {
          box: "border-box"
        }), ge(d, () => g.disconnect());
      }
    } else if (o) {
      const [v, h] = o(f, m, r);
      ge(d, Ot([is(i, Jr), ve(i, "animationstart", v), Le(n, i)], h));
    } else
      return lt;
    return Z(Re, d);
  };
}, ga = (n, e) => {
  let s;
  const r = (i) => i.h === 0 || i.isIntersecting || i.intersectionRatio > 0, o = yt(ea), [c] = Fe({
    o: !1
  }), d = (i, f) => {
    if (i) {
      const m = c(r(i)), [, v] = m;
      return v && !f && e(m) && [m];
    }
  }, u = (i, f) => d(f.pop(), i);
  return [() => {
    const i = [];
    if (ys)
      s = new ys(Z(u, !1), {
        root: n
      }), s.observe(o), ge(i, () => {
        s.disconnect();
      });
    else {
      const f = () => {
        const m = kt(o);
        d(m);
      };
      ge(i, Lo(o, f)()), f();
    }
    return Z(Re, ge(i, Le(n, o)));
  }, () => s && u(!0, s.takeRecords())];
}, ba = (n, e, s, r) => {
  let o, c, d, u, i, f;
  const m = `[${it}]`, v = `[${Qe}]`, h = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: _, ht: g, U: y, gt: S, bt: O, L: I, wt: D, yt: x, St: F, Ot: U } = n, $ = (M) => tt(M, "direction") === "rtl", C = {
    $t: !1,
    F: $(_)
  }, k = Xe(), A = Ht(Ao), [R] = Fe({
    i: oo,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const M = A && A.V(n, e, C, k, s).W, z = !(D && I) && ls(g, it, sn), Y = !I && x(Kr), J = Y && Ie(S), ae = J && U(), fe = F(Co, z), ce = Y && M && M()[0], Te = fn(y), te = cs(y);
    return ce && ce(), We(S, J), ae && ae(), z && fe(), {
      w: Te.w + te.w,
      h: Te.h + te.h
    };
  }), L = dn(r, {
    _: () => o,
    p: () => c,
    S(M, G) {
      const [z] = M, [Y] = G;
      return [Ot(qe(z), qe(Y)).reduce((J, ae) => (J[ae] = z[ae] || Y[ae], J), {})];
    }
  }), q = (M) => {
    const G = $(_);
    re(M, {
      Ct: f !== G
    }), re(C, {
      F: G
    }), f = G;
  }, T = (M, G) => {
    const [z, Y] = M, J = {
      xt: Y
    };
    return re(C, {
      $t: z
    }), G || r(J), J;
  }, N = ({ dt: M, _t: G }) => {
    const Y = !(M && !G) && k.P ? L : r, J = {
      dt: M || G,
      _t: G
    };
    q(J), Y(J);
  }, B = (M, G) => {
    const [, z] = R(), Y = {
      Ht: z
    };
    return q(Y), z && !G && (M ? r : L)(Y), Y;
  }, ee = (M, G, z) => {
    const Y = {
      Et: G
    };
    return q(Y), G && !z && L(Y), Y;
  }, [oe, se] = O ? ga(g, T) : [], me = !I && Lo(g, N, {
    _t: !0
  }), [K, E] = Rs(g, !1, ee, {
    rt: h,
    ct: h
  }), H = I && gt && new gt((M) => {
    const G = M[M.length - 1].contentRect;
    N({
      dt: !0,
      _t: bo(G, i)
    }), i = G;
  }), P = dn(() => {
    const [, M] = R();
    r({
      Ht: M
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    H && H.observe(g);
    const M = me && me(), G = oe && oe(), z = K(), Y = k.K((J) => {
      J ? L({
        zt: J
      }) : P();
    });
    return () => {
      H && H.disconnect(), M && M(), G && G(), u && u(), z(), Y();
    };
  }, ({ It: M, At: G, Dt: z }) => {
    const Y = {}, [J] = M("update.ignoreMutation"), [ae, fe] = M("update.attributes"), [ce, Te] = M("update.elementEvents"), [te, ye] = M("update.debounce"), De = Te || fe, xe = G || z, Se = (be) => Be(J) && J(be);
    if (De) {
      d && d(), u && u();
      const [be, we] = Rs(O || y, !0, B, {
        ct: Ot(h, ae || []),
        lt: ce,
        it: m,
        ft: (pe, ue) => {
          const { target: $e, attributeName: Me } = pe;
          return (!ue && Me && !I ? Ir($e, m, v) : !1) || !!wt($e, `.${Ue}`) || !!Se(pe);
        }
      });
      u = be(), d = we;
    }
    if (ye)
      if (L.m(), Ke(te)) {
        const be = te[0], we = te[1];
        o = Ye(be) && be, c = Ye(we) && we;
      } else Ye(te) ? (o = te, c = !1) : (o = !1, c = !1);
    if (xe) {
      const be = E(), we = se && se(), pe = d && d();
      be && re(Y, ee(be[0], be[1], xe)), we && re(Y, T(we[0], xe)), pe && re(Y, B(pe[0], xe));
    }
    return q(Y), Y;
  }, C];
}, Oo = (n, e) => Be(e) ? e.apply(0, n) : e, wa = (n, e, s, r) => {
  const o = ts(r) ? s : r;
  return Oo(n, o) || e.apply(0, n);
}, Vo = (n, e, s, r) => {
  const o = ts(r) ? s : r, c = Oo(n, o);
  return !!c && (cn(c) ? c : e.apply(0, n));
}, ya = (n, e) => {
  const { nativeScrollbarsOverlaid: s, body: r } = e || {}, { T: o, P: c, Z: d } = Xe(), { nativeScrollbarsOverlaid: u, body: i } = d().cancel, f = s ?? u, m = ts(r) ? i : r, v = (o.x || o.y) && f, h = n && (mn(m) ? !c : m);
  return !!v || !!h;
}, ka = (n, e, s, r) => {
  const o = "--os-viewport-percent", c = "--os-scroll-percent", d = "--os-scroll-direction", { Z: u } = Xe(), { scrollbars: i } = u(), { slot: f } = i, { vt: m, ht: v, U: h, Mt: _, gt: g, wt: y, L: S } = e, { scrollbars: O } = _ ? {} : n, { slot: I } = O || {}, D = [], x = [], F = [], U = Vo([m, v, h], () => S && y ? m : v, f, I), $ = (K) => {
    if (Dt) {
      let E = null, H = [];
      const P = new Dt({
        source: g,
        axis: K
      }), M = () => {
        E && E.cancel(), E = null;
      };
      return {
        Rt: (z) => {
          const { Tt: Y } = s, J = Ln(Y)[K], ae = K === "x", fe = [Mn(0, ae), Mn(`calc(100cq${ae ? "w" : "h"} + -100%)`, ae)], ce = J ? fe : fe.reverse();
          return H[0] === ce[0] && H[1] === ce[1] || (M(), H = ce, E = z.kt.animate({
            clear: ["left"],
            transform: ce
          }, {
            timeline: P
          })), M;
        }
      };
    }
  }, C = {
    x: $("x"),
    y: $("y")
  }, k = () => {
    const { Vt: K, Lt: E } = s, H = (P, M) => lo(0, 1, P / (P + M) || 0);
    return {
      x: H(E.x, K.x),
      y: H(E.y, K.y)
    };
  }, A = (K, E, H) => {
    const P = H ? is : uo;
    ie(K, (M) => {
      P(M.Ut, E);
    });
  }, R = (K, E) => {
    ie(K, (H) => {
      const [P, M] = E(H);
      Ft(P, M);
    });
  }, L = (K, E, H) => {
    const P = pn(H), M = P ? H : !0, G = P ? !H : !0;
    M && A(x, K, E), G && A(F, K, E);
  }, q = () => {
    const K = k(), E = (H) => (P) => [P.Ut, {
      [o]: zn(H) + ""
    }];
    R(x, E(K.x)), R(F, E(K.y));
  }, T = () => {
    if (!Dt) {
      const { Tt: K } = s, E = Cs(K, Ie(g)), H = (P) => (M) => [M.Ut, {
        [c]: zn(P) + ""
      }];
      R(x, H(E.x)), R(F, H(E.y));
    }
  }, N = () => {
    const { Tt: K } = s, E = Ln(K), H = (P) => (M) => [M.Ut, {
      [d]: P ? "0" : "1"
    }];
    R(x, H(E.x)), R(F, H(E.y)), Dt && (x.forEach(C.x.Rt), F.forEach(C.y.Rt));
  }, B = () => {
    if (S && !y) {
      const { Vt: K, Tt: E } = s, H = Ln(E), P = Cs(E, Ie(g)), M = (G) => {
        const { Ut: z } = G, Y = Vt(z) === h && z, J = (ae, fe, ce) => {
          const Te = fe * ae;
          return ho(ce ? Te : -Te);
        };
        return [Y, Y && {
          transform: Mn({
            x: J(P.x, K.x, H.x),
            y: J(P.y, K.y, H.y)
          })
        }];
      };
      R(x, M), R(F, M);
    }
  }, ee = (K) => {
    const E = K ? "x" : "y", P = yt(`${Ue} ${K ? sa : oa}`), M = yt(To), G = yt(us), z = {
      Ut: P,
      Pt: M,
      kt: G
    }, Y = C[E];
    return ge(K ? x : F, z), ge(D, [Le(P, M), Le(M, G), Z(St, P), Y && Y.Rt(z), r(z, L, K)]), z;
  }, oe = Z(ee, !0), se = Z(ee, !1), me = () => (Le(U, x[0].Ut), Le(U, F[0].Ut), Z(Re, D));
  return oe(), se(), [{
    Nt: q,
    qt: T,
    Bt: N,
    Ft: B,
    jt: L,
    Xt: {
      Yt: x,
      Wt: oe,
      Jt: Z(R, x)
    },
    Gt: {
      Yt: F,
      Wt: se,
      Jt: Z(R, F)
    }
  }, me];
}, xa = (n, e, s, r) => (o, c, d) => {
  const { ht: u, U: i, L: f, gt: m, Kt: v, Ot: h } = e, { Ut: _, Pt: g, kt: y } = o, [S, O] = bt(333), [I, D] = bt(444), x = ($) => {
    Be(m.scrollBy) && m.scrollBy({
      behavior: "smooth",
      left: $.x,
      top: $.y
    });
  }, F = () => {
    const $ = "pointerup pointercancel lostpointercapture", C = `client${d ? "X" : "Y"}`, k = d ? gn : bn, A = d ? "left" : "top", R = d ? "w" : "h", L = d ? "x" : "y", q = (N, B) => (ee) => {
      const { Vt: oe } = s, se = kt(g)[R] - kt(y)[R], K = B * ee / se * oe[L];
      We(m, {
        [L]: N + K
      });
    }, T = [];
    return ve(g, "pointerdown", (N) => {
      const B = wt(N.target, `.${us}`) === y, ee = B ? y : g, oe = n.scrollbars, se = oe[B ? "dragScroll" : "clickScroll"], { button: me, isPrimary: K, pointerType: E } = N, { pointers: H } = oe;
      if (me === 0 && K && se && (H || []).includes(E)) {
        Re(T), D();
        const M = !B && (N.shiftKey || se === "instant"), G = Z(Dn, y), z = Z(Dn, g), Y = (ue, $e) => (ue || G())[A] - ($e || z())[A], J = Rn(Dn(m)[k]) / kt(m)[R] || 1, ae = q(Ie(m)[L], 1 / J), fe = N[C], ce = G(), Te = z(), te = ce[k], ye = Y(ce, Te) + te / 2, De = fe - Te[A], xe = B ? 0 : De - ye, Se = (ue) => {
          Re(pe), ee.releasePointerCapture(ue.pointerId);
        }, be = B || M, we = h(), pe = [ve(v, $, Se), ve(v, "selectstart", (ue) => Gn(ue), {
          H: !1
        }), ve(g, $, Se), be && ve(g, "pointermove", (ue) => ae(xe + (ue[C] - fe))), be && (() => {
          const ue = Ie(m);
          we();
          const $e = Ie(m), Me = {
            x: $e.x - ue.x,
            y: $e.y - ue.y
          };
          (on(Me.x) > 3 || on(Me.y) > 3) && (h(), We(m, ue), x(Me), I(we));
        })];
        if (ee.setPointerCapture(N.pointerId), M)
          ae(xe);
        else if (!B) {
          const ue = Ht(fa);
          if (ue) {
            const $e = ue(ae, xe, te, (Me) => {
              Me ? we() : ge(pe, we);
            });
            ge(pe, $e), ge(T, Z($e, !0));
          }
        }
      }
    });
  };
  let U = !0;
  return Z(Re, [ve(y, "pointermove pointerleave", r), ve(_, "pointerenter", () => {
    c(Ms, !0);
  }), ve(_, "pointerleave pointercancel", () => {
    c(Ms, !1);
  }), !f && ve(_, "mousedown", () => {
    const $ = Pn();
    (ks($, Qe) || ks($, it) || $ === document.body) && rn(Z(Wn, i), 25);
  }), ve(_, "wheel", ($) => {
    const { deltaX: C, deltaY: k, deltaMode: A } = $;
    U && A === 0 && Vt(_) === u && x({
      x: C,
      y: k
    }), U = !1, c(Os, !0), S(() => {
      U = !0, c(Os);
    }), Gn($);
  }, {
    H: !1,
    I: !0
  }), ve(_, "pointerdown", Z(ve, v, "click", yo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), F(), O, D]);
}, Sa = (n, e, s, r, o, c) => {
  let d, u, i, f, m, v = lt, h = 0;
  const _ = ["mouse", "pen"], g = (E) => _.includes(E.pointerType), [y, S] = bt(), [O, I] = bt(100), [D, x] = bt(100), [F, U] = bt(() => h), [$, C] = ka(n, o, r, xa(e, o, r, (E) => g(E) && oe())), { ht: k, Qt: A, wt: R } = o, { jt: L, Nt: q, qt: T, Bt: N, Ft: B } = $, ee = (E, H) => {
    if (U(), E)
      L(Ls);
    else {
      const P = Z(L, Ls, !0);
      h > 0 && !H ? F(P) : P();
    }
  }, oe = () => {
    (i ? !d : !f) && (ee(!0), O(() => {
      ee(!1);
    }));
  }, se = (E) => {
    L(Xn, E, !0), L(Xn, E, !1);
  }, me = (E) => {
    g(E) && (d = i, i && ee(!0));
  }, K = [U, I, x, S, () => v(), ve(k, "pointerover", me, {
    A: !0
  }), ve(k, "pointerenter", me), ve(k, "pointerleave", (E) => {
    g(E) && (d = !1, i && ee(!1));
  }), ve(k, "pointermove", (E) => {
    g(E) && u && oe();
  }), ve(A, "scroll", (E) => {
    y(() => {
      T(), oe();
    }), c(E), B();
  })];
  return [() => Z(Re, ge(K, C())), ({ It: E, Dt: H, Zt: P, tn: M }) => {
    const { nn: G, sn: z, en: Y, cn: J } = M || {}, { Ct: ae, _t: fe } = P || {}, { F: ce } = s, { T: Te } = Xe(), { k: te, rn: ye } = r, [De, xe] = E("showNativeOverlaidScrollbars"), [Se, be] = E("scrollbars.theme"), [we, pe] = E("scrollbars.visibility"), [ue, $e] = E("scrollbars.autoHide"), [Me, Et] = E("scrollbars.autoHideSuspend"), [Bt] = E("scrollbars.autoHideDelay"), [qt, Nt] = E("scrollbars.dragScroll"), [ut, Tt] = E("scrollbars.clickScroll"), [Pt, Sn] = E("overflow"), $n = fe && !H, Cn = ye.x || ye.y, Pe = G || z || J || ae || H, En = Y || pe || Sn, zt = De && Te.x && Te.y, jt = (ot, At, Mt) => {
      const Gt = ot.includes(xt) && (we === at || we === "auto" && At === xt);
      return L(ra, Gt, Mt), Gt;
    };
    if (h = Bt, $n && (Me && Cn ? (se(!1), v(), D(() => {
      v = ve(A, "scroll", Z(se, !0), {
        A: !0
      });
    })) : se(!0)), xe && L(ta, zt), be && (L(m), L(Se, !0), m = Se), Et && !Me && se(!0), $e && (u = ue === "move", i = ue === "leave", f = ue === "never", ee(f, !0)), Nt && L(ia, qt), Tt && L(la, !!ut), En) {
      const ot = jt(Pt.x, te.x, !0), At = jt(Pt.y, te.y, !1);
      L(aa, !(ot && At));
    }
    Pe && (T(), q(), B(), J && N(), L(Ds, !ye.x, !0), L(Ds, !ye.y, !1), L(na, ce && !R));
  }, {}, $];
}, $a = (n) => {
  const e = Xe(), { Z: s, P: r } = e, { elements: o } = s(), { padding: c, viewport: d, content: u } = o, i = cn(n), f = i ? {} : n, { elements: m } = f, { padding: v, viewport: h, content: _ } = m || {}, g = i ? n : f.target, y = vo(g), S = g.ownerDocument, O = S.documentElement, I = () => S.defaultView || Ve, D = Z(wa, [g]), x = Z(Vo, [g]), F = Z(yt, ""), U = Z(D, F, d), $ = Z(x, F, u), C = (te) => {
    const ye = kt(te), De = fn(te), xe = tt(te, no), Se = tt(te, so);
    return De.w - ye.w > 0 && !$t(xe) || De.h - ye.h > 0 && !$t(Se);
  }, k = U(h), A = k === g, R = A && y, L = !A && $(_), q = !A && k === L, T = R ? O : k, N = R ? T : g, B = !A && x(F, c, v), ee = !q && L, oe = [ee, T, B, N].map((te) => cn(te) && !Vt(te) && te), se = (te) => te && Ys(oe, te), me = !se(T) && C(T) ? T : g, K = R ? O : T, H = {
    vt: g,
    ht: N,
    U: T,
    ln: B,
    bt: ee,
    gt: K,
    Qt: R ? S : T,
    an: y ? O : me,
    Kt: S,
    wt: y,
    Mt: i,
    L: A,
    un: I,
    yt: (te) => ls(T, Qe, te),
    St: (te, ye) => un(T, Qe, te, ye),
    Ot: () => un(K, Qe, Xr, !0)
  }, { vt: P, ht: M, ln: G, U: z, bt: Y } = H, J = [() => {
    ze(M, [it, On]), ze(P, On), y && ze(O, [On, it]);
  }];
  let ae = Nn([Y, z, G, M, P].find((te) => te && !se(te)));
  const fe = R ? P : Y || z, ce = Z(Re, J);
  return [H, () => {
    const te = I(), ye = Pn(), De = (pe) => {
      Le(Vt(pe), Nn(pe)), St(pe);
    }, xe = (pe) => ve(pe, "focusin focusout focus blur", yo, {
      I: !0,
      H: !1
    }), Se = "tabindex", be = rs(z, Se), we = xe(ye);
    return Je(M, it, A ? "" : Gr), Je(G, Kn, ""), Je(z, Qe, ""), Je(Y, As, ""), A || (Je(z, Se, be || "-1"), y && Je(O, Ts, "")), Le(fe, ae), Le(M, G), Le(G || M, !A && z), Le(z, Y), ge(J, [we, () => {
      const pe = Pn(), ue = se(z), $e = ue && pe === z ? P : pe, Me = xe($e);
      ze(G, Kn), ze(Y, As), ze(z, Qe), y && ze(O, Ts), be ? Je(z, Se, be) : ze(z, Se), se(Y) && De(Y), ue && De(z), se(G) && De(G), Wn($e), Me();
    }]), r && !A && (as(z, Qe, Eo), ge(J, Z(ze, z, Qe))), Wn(!A && y && ye === P && te.top === te ? z : ye), we(), ae = 0, ce;
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
  return ({ It: u, Zt: i, fn: f, Dt: m }) => {
    let [v, h] = d(m);
    const { P: _ } = Xe(), { dt: g, Ht: y, Ct: S } = i || {}, { F: O } = f, [I, D] = u("paddingAbsolute");
    (g || h || (m || y)) && ([v, h] = c(m));
    const F = !r && (D || S || h);
    if (F) {
      const U = !I || !e && !_, $ = v.r + v.l, C = v.t + v.b, k = {
        [eo]: U && !O ? -$ : 0,
        [to]: U ? -C : 0,
        [Qs]: U && O ? -$ : 0,
        top: U ? -v.t : 0,
        right: U ? O ? -v.r : "auto" : 0,
        left: U ? O ? "auto" : -v.l : 0,
        [gn]: U && `calc(100% + ${$}px)`
      }, A = {
        [Ks]: U ? v.t : 0,
        [Xs]: U ? v.r : 0,
        [Js]: U ? v.b : 0,
        [Zs]: U ? v.l : 0
      };
      Ft(e || s, k), Ft(s, A), re(o, {
        ln: v,
        _n: !U,
        j: e ? A : re({}, k, A)
      });
    }
    return {
      dn: F
    };
  };
}, Ta = (n, e) => {
  const s = Xe(), { ht: r, ln: o, U: c, L: d, Qt: u, gt: i, wt: f, St: m, un: v } = n, { P: h } = s, _ = f && d, g = Z(Gs, 0), y = {
    display: () => !1,
    direction: (E) => E !== "ltr",
    flexDirection: (E) => E.endsWith("-reverse"),
    writingMode: (E) => E !== "horizontal-tb"
  }, S = qe(y), O = {
    i: oo,
    o: {
      w: 0,
      h: 0
    }
  }, I = {
    i: tn,
    o: {}
  }, D = (E) => {
    m(Co, !_ && E);
  }, x = (E) => {
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
    D(!0);
    const P = Ie(i), M = m(Zr, !0), G = ve(u, xt, (fe) => {
      const ce = Ie(i);
      fe.isTrusted && ce.x === P.x && ce.y === P.y && wo(fe);
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
    return We(i, P), es(() => G()), {
      D: z,
      M: ae
    };
  }, F = (E, H) => {
    const P = Ve.devicePixelRatio % 1 !== 0 ? 1 : 0, M = {
      w: g(E.w - H.w),
      h: g(E.h - H.h)
    };
    return {
      w: M.w > P ? M.w : 0,
      h: M.h > P ? M.h : 0
    };
  }, [U, $] = Fe(O, Z(cs, c)), [C, k] = Fe(O, Z(fn, c)), [A, R] = Fe(O), [L] = Fe(I), [q, T] = Fe(O), [N] = Fe(I), [B] = Fe({
    i: (E, H) => wn(E, H, S),
    o: {}
  }, () => Nr(c) ? tt(c, S) : {}), [ee, oe] = Fe({
    i: (E, H) => tn(E.D, H.D) && tn(E.M, H.M),
    o: ko()
  }), se = Ht(Ao), me = (E, H) => `${H ? Wr : Yr}${Or(E)}`, K = (E) => {
    const H = (M) => [at, vt, xt].map((G) => me(G, M)), P = H(!0).concat(H()).join(" ");
    m(P), m(qe(E).map((M) => me(E[M], M === "x")).join(" "), !0);
  };
  return ({ It: E, Zt: H, fn: P, Dt: M }, { dn: G }) => {
    const { dt: z, Ht: Y, Ct: J, _t: ae, zt: fe } = H || {}, ce = se && se.V(n, e, P, s, E), { Y: Te, W: te, J: ye } = ce || {}, [De, xe] = da(E, s), [Se, be] = E("overflow"), we = $t(Se.x), pe = $t(Se.y), ue = z || G || Y || J || fe || xe;
    let $e = $(M), Me = k(M), Et = R(M), Bt = T(M);
    if (xe && h && m(Eo, !De), ue) {
      ls(r, it, sn) && D(!0);
      const [hs] = te ? te() : [], [Wt] = $e = U(M), [Yt] = Me = C(M), Kt = go(c), Xt = _ && qr(v()), sr = {
        w: g(Yt.w + Wt.w),
        h: g(Yt.h + Wt.h)
      }, gs = {
        w: g((Xt ? Xt.w : Kt.w + g(Kt.w - Yt.w)) + Wt.w),
        h: g((Xt ? Xt.h : Kt.h + g(Kt.h - Yt.h)) + Wt.h)
      };
      hs && hs(), Bt = q(gs), Et = A(F(sr, gs), M);
    }
    const [qt, Nt] = Bt, [ut, Tt] = Et, [Pt, Sn] = Me, [$n, Cn] = $e, [Pe, En] = L({
      x: ut.w > 0,
      y: ut.h > 0
    }), zt = we && pe && (Pe.x || Pe.y) || we && Pe.x && !Pe.y || pe && Pe.y && !Pe.x, jt = G || J || fe || Cn || Sn || Nt || Tt || be || xe || ue, ot = ua(Pe, Se), [At, Mt] = N(ot.k), [Gt, er] = B(M), ps = J || ae || er || En || M, [tr, nr] = ps ? ee(x(Gt), M) : oe();
    return jt && (Mt && K(ot.k), ye && Te && Ft(c, ye(ot, P, Te(ot, Pt, $n)))), D(!1), un(r, it, sn, zt), un(o, Kn, sn, zt), re(e, {
      k: At,
      Lt: {
        x: qt.w,
        y: qt.h
      },
      Vt: {
        x: ut.w,
        y: ut.h
      },
      rn: Pe,
      Tt: Pr(tr, ut)
    }), {
      en: Mt,
      nn: Nt,
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
  }, { vt: c, gt: d, L: u, Ot: i } = e, { P: f, T: m } = Xe(), v = !f && (m.x || m.y), h = [Ca(e), Ea(e, o), Ta(e, o)];
  return [s, (_) => {
    const g = {}, S = v && Ie(d), O = S && i();
    return ie(h, (I) => {
      re(g, I(_, g) || {});
    }), We(d, S), O && O(), u || We(c, 0), g;
  }, o, e, r];
}, Ma = (n, e, s, r, o) => {
  let c = !1;
  const d = Is(e, {}), [u, i, f, m, v] = Aa(n), [h, _, g] = ba(m, f, d, (x) => {
    D({}, x);
  }), [y, S, , O] = Sa(n, e, g, f, m, o), I = (x) => qe(x).some((F) => !!x[F]), D = (x, F) => {
    if (s())
      return !1;
    const { vn: U, Dt: $, At: C, hn: k } = x, A = U || {}, R = !!$ || !c, L = {
      It: Is(e, A, R),
      vn: A,
      Dt: R
    };
    if (k)
      return S(L), !1;
    const q = F || _(re({}, L, {
      At: C
    })), T = i(re({}, L, {
      fn: g,
      Zt: q
    }));
    S(re({}, L, {
      Zt: q,
      tn: T
    }));
    const N = I(q), B = I(T), ee = N || B || !os(A) || R;
    return c = !0, ee && r(x, {
      Zt: q,
      tn: T
    }), ee;
  };
  return [() => {
    const { an: x, gt: F, Ot: U } = m, $ = Ie(x), C = [h(), u(), y()], k = U();
    return We(F, $), k(), Z(Re, C);
  }, D, () => ({
    gn: g,
    bn: f
  }), {
    wn: m,
    yn: O
  }, v];
}, fs = /* @__PURE__ */ new WeakMap(), Da = (n, e) => {
  fs.set(n, e);
}, La = (n) => {
  fs.delete(n);
}, Fo = (n) => fs.get(n), Ne = (n, e, s) => {
  const { nt: r } = Xe(), o = cn(n), c = o ? n : n.target, d = Fo(c);
  if (e && !d) {
    let u = !1;
    const i = [], f = {}, m = (A) => {
      const R = ao(A), L = Ht(jr);
      return L ? L(R, !0) : R;
    }, v = re({}, r(), m(e)), [h, _, g] = Yn(), [y, S, O] = Yn(s), I = (A, R) => {
      O(A, R), g(A, R);
    }, [D, x, F, U, $] = Ma(n, v, () => u, ({ vn: A, Dt: R }, { Zt: L, tn: q }) => {
      const { dt: T, Ct: N, xt: B, Ht: ee, Et: oe, _t: se } = L, { nn: me, sn: K, en: E, cn: H } = q;
      I("updated", [k, {
        updateHints: {
          sizeChanged: !!T,
          directionChanged: !!N,
          heightIntrinsicChanged: !!B,
          overflowEdgeChanged: !!me,
          overflowAmountChanged: !!K,
          overflowStyleChanged: !!E,
          scrollCoordinatesChanged: !!H,
          contentMutation: !!ee,
          hostMutation: !!oe,
          appear: !!se
        },
        changedOptions: A || {},
        force: !!R
      }]);
    }, (A) => I("scroll", [k, A])), C = (A) => {
      La(c), Re(i), u = !0, I("destroyed", [k, A]), _(), S();
    }, k = {
      options(A, R) {
        if (A) {
          const L = R ? r() : {}, q = Mo(v, re(L, m(A)));
          os(q) || (re(v, q), x({
            vn: q
          }));
        }
        return re({}, v);
      },
      on: y,
      off: (A, R) => {
        A && R && S(A, R);
      },
      state() {
        const { gn: A, bn: R } = F(), { F: L } = A, { Lt: q, Vt: T, k: N, rn: B, ln: ee, _n: oe, Tt: se } = R;
        return re({}, {
          overflowEdge: q,
          overflowAmount: T,
          overflowStyle: N,
          hasOverflow: B,
          scrollCoordinates: {
            start: se.D,
            end: se.M
          },
          padding: ee,
          paddingAbsolute: oe,
          directionRTL: L,
          destroyed: u
        });
      },
      elements() {
        const { vt: A, ht: R, ln: L, U: q, bt: T, gt: N, Qt: B } = U.wn, { Xt: ee, Gt: oe } = U.yn, se = (K) => {
          const { kt: E, Pt: H, Ut: P } = K;
          return {
            scrollbar: P,
            track: H,
            handle: E
          };
        }, me = (K) => {
          const { Yt: E, Wt: H } = K, P = se(E[0]);
          return re({}, P, {
            clone: () => {
              const M = se(H());
              return x({
                hn: !0
              }), M;
            }
          });
        };
        return re({}, {
          target: A,
          host: R,
          padding: L || q,
          viewport: q,
          content: T || q,
          scrollOffsetElement: N,
          scrollEventElement: B,
          scrollbarHorizontal: me(ee),
          scrollbarVertical: me(oe)
        });
      },
      update: (A) => x({
        Dt: A,
        At: !0
      }),
      destroy: Z(C, !1),
      plugin: (A) => f[qe(A)[0]]
    };
    return ge(i, [$]), Da(c, k), $o(xo, Ne, [k, h, f]), ya(U.wn.wt, !o && n.cancel) ? (C(!0), k) : (ge(i, D()), I("initialized", [k]), k.update(), k);
  }
  return d;
};
Ne.plugin = (n) => {
  const e = Ke(n), s = e ? n : [n], r = s.map((o) => $o(o, Ne)[0]);
  return zr(s), e ? r : r[0];
};
Ne.valid = (n) => {
  const e = n && n.elements, s = Be(e) && e();
  return ln(s) && !!Fo(s.target);
};
Ne.env = () => {
  const { N: n, T: e, P: s, G: r, st: o, et: c, Z: d, tt: u, nt: i, ot: f } = Xe();
  return re({}, {
    scrollbarsSize: n,
    scrollbarsOverlaid: e,
    scrollbarsHiding: s,
    scrollTimeline: r,
    staticDefaultInitialization: o,
    staticDefaultOptions: c,
    getDefaultInitialization: d,
    setDefaultInitialization: u,
    getDefaultOptions: i,
    setDefaultOptions: f
  });
};
Ne.nonce = ma;
Ne.trustedTypePolicy = Ur;
function Oa() {
  let n;
  const e = V(null), s = Math.floor(Math.random() * 2 ** 32), r = V(!1), o = V([]), c = () => o.value, d = () => n.getSelection(), u = () => o.value.length, i = () => n.clearSelection(!0), f = V(), m = V(null), v = V(null), h = V(null), _ = V(null);
  function g() {
    n = new mr({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), n.subscribe("DS:start:pre", ({ items: F, event: U, isDragging: $ }) => {
      if ($)
        n.Interaction._reset(U);
      else {
        r.value = !1;
        const C = e.value.offsetWidth - U.offsetX, k = e.value.offsetHeight - U.offsetY;
        C < 15 && k < 15 && n.Interaction._reset(U), U.target.classList.contains("os-scrollbar-handle") && n.Interaction._reset(U);
      }
    }), document.addEventListener("dragleave", (F) => {
      !F.buttons && r.value && (r.value = !1);
    });
  }
  const y = () => _t(() => {
    n.addSelection(
      n.getSelectables()
    ), S();
  }), S = () => {
    o.value = n.getSelection().map((F) => JSON.parse(F.dataset.item)), f.value(o.value);
  }, O = () => _t(() => {
    const F = c().map((U) => U.path);
    i(), n.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + s)
    }), n.addSelection(
      n.getSelectables().filter((U) => F.includes(JSON.parse(U.dataset.item).path))
    ), S(), D();
  }), I = (F) => {
    f.value = F, n.subscribe("DS:end", ({ items: U, event: $, isDragging: C }) => {
      o.value = U.map((k) => JSON.parse(k.dataset.item)), F(U.map((k) => JSON.parse(k.dataset.item)));
    });
  }, D = () => {
    m.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (v.value.style.height = e.value.scrollHeight + "px", v.value.style.display = "block") : (v.value.style.height = "100%", v.value.style.display = "none"));
  }, x = (F) => {
    if (!m.value)
      return;
    const { scrollOffsetElement: U } = m.value.elements();
    U.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return Ee(() => {
    Ne(h.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: Ne
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (F) => {
        m.value = F;
      },
      scroll: (F, U) => {
        const { scrollOffsetElement: $ } = F.elements();
        e.value.scrollTo({
          top: $.scrollTop,
          left: 0
        });
      }
    }), g(), D(), _.value = new ResizeObserver(D), _.value.observe(e.value), e.value.addEventListener("scroll", x), n.subscribe("DS:scroll", ({ isDragging: F }) => F || x());
  }), Qn(() => {
    n && n.stop(), _.value && _.value.disconnect();
  }), Bs(() => {
    n && n.Area.reset();
  }), {
    area: e,
    explorerId: s,
    isDraggingRef: r,
    scrollBar: v,
    scrollBarContainer: h,
    getSelected: c,
    getSelection: d,
    selectAll: y,
    clearSelection: i,
    refreshSelection: O,
    getCount: u,
    onSelect: I
  };
}
function Va(n, e) {
  const s = V(n), r = V(e), o = V([]), c = V([]), d = V([]), u = V(!1), i = V(5);
  let f = !1, m = !1;
  const v = pt({
    adapter: s,
    storages: [],
    dirname: r,
    files: []
  });
  function h() {
    let I = [], D = [], x = r.value ?? s.value + "://";
    x.length === 0 && (o.value = []), x.replace(s.value + "://", "").split("/").filter(Boolean).forEach(function($) {
      I.push($), I.join("/") !== "" && D.push({
        basename: $,
        name: $,
        path: s.value + "://" + I.join("/") + "/",
        type: "dir"
      });
    }), c.value = D;
    const [F, U] = g(
      D,
      i.value
    );
    d.value = U, o.value = F;
  }
  function _(I) {
    i.value = I, h();
  }
  function g(I, D) {
    return I.length > D ? [I.slice(-D), I.slice(0, -D)] : [I, []];
  }
  function y(I = null) {
    u.value = I ?? !u.value;
  }
  function S() {
    return o.value && o.value.length && !0;
  }
  const O = je(() => {
    var I;
    return ((I = o.value[o.value.length - 2]) == null ? void 0 : I.path) ?? s.value + "://";
  });
  return Ee(() => {
  }), Oe(r, h), Ee(h), {
    adapter: s,
    path: r,
    loading: f,
    searchMode: m,
    data: v,
    breadcrumbs: o,
    breadcrumbItems: c,
    limitBreadcrumbItems: _,
    hiddenBreadcrumbs: d,
    showHiddenBreadcrumbs: u,
    toggleHiddenBreadcrumbs: y,
    isGoUpAvailable: S,
    parentFolderPath: O
  };
}
const Fa = (n, e) => {
  const s = kr(n.id), r = _r(), o = s.getStore("metricUnits", !1), c = Tr(s, n.theme), d = e.i18n, u = n.locale ?? e.locale, i = (_) => Array.isArray(_) ? _ : $r, f = s.getStore("persist-path", n.persist), m = f ? s.getStore("path", n.path) : n.path, v = f ? s.getStore("adapter") : null, h = Oa();
  return pt({
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
    i18n: Sr(s, u, r, d),
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
    persist: f,
    // show thumbnails
    showThumbnails: s.getStore("show-thumbnails", n.showThumbnails),
    // type of progress indicator
    loadingIndicator: n.loadingIndicator,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // file system
    fs: Va(v, m)
  });
}, Ia = { class: "vuefinder__modal-layout__container" }, Ra = { class: "vuefinder__modal-layout__content" }, Ua = { class: "vuefinder__modal-layout__footer" }, nt = {
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
    }), (r, o) => (p(), b("div", {
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
            l("div", Ua, [
              Lt(r.$slots, "buttons")
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
    const r = le("ServiceContainer"), o = V(!1), { t: c } = r.i18n;
    let d = null;
    const u = () => {
      clearTimeout(d), o.value = !0, d = setTimeout(() => {
        o.value = !1;
      }, 2e3);
    };
    return Ee(() => {
      r.emitter.on(n.on, u);
    }), Qn(() => {
      clearTimeout(d);
    }), {
      shown: o,
      t: c
    };
  }
}, qa = { key: 1 };
function Na(n, e, s, r, o, c) {
  return p(), b("div", {
    class: de(["vuefinder__action-message", { "vuefinder__action-message--hidden": !r.shown }])
  }, [
    n.$slots.default ? Lt(n.$slots, "default", { key: 0 }) : (p(), b("span", qa, w(r.t("Saved.")), 1))
  ], 2);
}
const ht = /* @__PURE__ */ Ha(Ba, [["render", Na]]), Pa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function za(n, e) {
  return p(), b("svg", Pa, e[0] || (e[0] = [
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
    return (e, s) => (p(), b("div", Ga, [
      l("div", Wa, [
        (p(), X(qs(n.icon), { class: "vuefinder__modal-header__icon" }))
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
}, Al = { class: "vuefinder__about-modal__setting-input" }, Ml = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Dl = { class: "vuefinder__about-modal__setting-label" }, Ll = ["label"], Ol = ["value"], Vl = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Fl = { class: "vuefinder__about-modal__shortcuts" }, Il = { class: "vuefinder__about-modal__shortcut" }, Rl = { class: "vuefinder__about-modal__shortcut" }, Ul = { class: "vuefinder__about-modal__shortcut" }, Hl = { class: "vuefinder__about-modal__shortcut" }, Bl = { class: "vuefinder__about-modal__shortcut" }, ql = { class: "vuefinder__about-modal__shortcut" }, Nl = { class: "vuefinder__about-modal__shortcut" }, Pl = { class: "vuefinder__about-modal__shortcut" }, zl = { class: "vuefinder__about-modal__shortcut" }, jl = {
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
    ]), u = V("about"), i = async () => {
      r(), location.reload();
    }, f = (I) => {
      e.theme.set(I), e.emitter.emit("vf-theme-saved");
    }, m = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? js : zs, s("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, v = () => {
      e.compactListView = !e.compactListView, s("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, h = () => {
      e.showThumbnails = !e.showThumbnails, s("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, _ = () => {
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
      }).filter(([I]) => Object.keys(g).includes(I))
    ), O = je(() => ({
      system: o("System"),
      light: o("Light"),
      dark: o("Dark")
    }));
    return (I, D) => (p(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          onClick: D[7] || (D[7] = (x) => a(e).modal.close()),
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
                  (p(!0), b(ke, null, Ce(d.value, (x) => (p(), b("button", {
                    key: x.name,
                    onClick: (F) => u.value = x.key,
                    class: de([x.key === u.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": x.current ? "page" : void 0
                  }, w(x.name), 11, Ja))), 128))
                ])
              ])
            ]),
            u.value === c.ABOUT ? (p(), b("div", Qa, [
              l("div", el, w(a(o)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              l("a", tl, w(a(o)("Project home")), 1),
              l("a", nl, w(a(o)("Follow on GitHub")), 1)
            ])) : j("", !0),
            u.value === c.SETTINGS ? (p(), b("div", sl, [
              l("div", ol, w(a(o)("Customize your experience with the following settings")), 1),
              l("div", rl, [
                l("fieldset", null, [
                  l("div", al, [
                    l("div", ll, [
                      he(l("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": D[0] || (D[0] = (x) => a(e).metricUnits = x),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Zt, a(e).metricUnits]
                      ])
                    ]),
                    l("div", il, [
                      l("label", cl, [
                        Q(w(a(o)("Use Metric Units")) + " ", 1),
                        W(ht, {
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
                        "onUpdate:modelValue": D[1] || (D[1] = (x) => a(e).compactListView = x),
                        onClick: v,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Zt, a(e).compactListView]
                      ])
                    ]),
                    l("div", fl, [
                      l("label", vl, [
                        Q(w(a(o)("Compact list view")) + " ", 1),
                        W(ht, {
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
                        "onUpdate:modelValue": D[2] || (D[2] = (x) => a(e).persist = x),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Zt, a(e).persist]
                      ])
                    ]),
                    l("div", pl, [
                      l("label", hl, [
                        Q(w(a(o)("Persist path on reload")) + " ", 1),
                        W(ht, {
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
                        "onUpdate:modelValue": D[3] || (D[3] = (x) => a(e).showThumbnails = x),
                        onClick: h,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Zt, a(e).showThumbnails]
                      ])
                    ]),
                    l("div", wl, [
                      l("label", yl, [
                        Q(w(a(o)("Show thumbnails")) + " ", 1),
                        W(ht, {
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
                        "onUpdate:modelValue": D[4] || (D[4] = (x) => a(e).theme.value = x),
                        onChange: D[5] || (D[5] = (x) => f(x.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: a(o)("Theme")
                        }, [
                          (p(!0), b(ke, null, Ce(O.value, (x, F) => (p(), b("option", { value: F }, w(x), 9, El))), 256))
                        ], 8, Cl)
                      ], 544), [
                        [bs, a(e).theme.value]
                      ]),
                      W(ht, {
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
                  a(e).features.includes(a(_e).LANGUAGE) && Object.keys(a(S)).length > 1 ? (p(), b("div", Tl, [
                    l("div", Al, [
                      l("label", Ml, w(a(o)("Language")), 1)
                    ]),
                    l("div", Dl, [
                      he(l("select", {
                        id: "language",
                        "onUpdate:modelValue": D[6] || (D[6] = (x) => a(e).i18n.locale = x),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: a(o)("Language")
                        }, [
                          (p(!0), b(ke, null, Ce(a(S), (x, F) => (p(), b("option", { value: F }, w(x), 9, Ol))), 256))
                        ], 8, Ll)
                      ], 512), [
                        [bs, a(e).i18n.locale]
                      ]),
                      W(ht, {
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
            u.value === c.SHORTCUTS ? (p(), b("div", Vl, [
              l("div", Fl, [
                l("div", Il, [
                  l("div", null, w(a(o)("Rename")), 1),
                  D[8] || (D[8] = l("kbd", null, "F2", -1))
                ]),
                l("div", Rl, [
                  l("div", null, w(a(o)("Refresh")), 1),
                  D[9] || (D[9] = l("kbd", null, "F5", -1))
                ]),
                l("div", Ul, [
                  Q(w(a(o)("Delete")) + " ", 1),
                  D[10] || (D[10] = l("kbd", null, "Del", -1))
                ]),
                l("div", Hl, [
                  Q(w(a(o)("Escape")) + " ", 1),
                  D[11] || (D[11] = l("div", null, [
                    l("kbd", null, "Esc")
                  ], -1))
                ]),
                l("div", Bl, [
                  Q(w(a(o)("Select All")) + " ", 1),
                  D[12] || (D[12] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Q(" + "),
                    l("kbd", null, "A")
                  ], -1))
                ]),
                l("div", ql, [
                  Q(w(a(o)("Search")) + " ", 1),
                  D[13] || (D[13] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Q(" + "),
                    l("kbd", null, "F")
                  ], -1))
                ]),
                l("div", Nl, [
                  Q(w(a(o)("Toggle Sidebar")) + " ", 1),
                  D[14] || (D[14] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Q(" + "),
                    l("kbd", null, "E")
                  ], -1))
                ]),
                l("div", Pl, [
                  Q(w(a(o)("Open Settings")) + " ", 1),
                  D[15] || (D[15] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Q(" + "),
                    l("kbd", null, ",")
                  ], -1))
                ]),
                l("div", zl, [
                  Q(w(a(o)("Toggle Full Screen")) + " ", 1),
                  D[16] || (D[16] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    Q(" + "),
                    l("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : j("", !0),
            u.value === c.RESET ? (p(), b("div", jl, [
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
    var f;
    const s = e, r = le("ServiceContainer"), { t: o } = r.i18n, c = V(!1), d = V(null), u = V((f = d.value) == null ? void 0 : f.strMessage);
    Oe(u, () => c.value = !1);
    const i = () => {
      s("hidden"), c.value = !0;
    };
    return (m, v) => (p(), b("div", null, [
      c.value ? j("", !0) : (p(), b("div", {
        key: 0,
        ref_key: "strMessage",
        ref: d,
        class: de(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Lt(m.$slots, "default"),
        l("div", {
          class: "vuefinder__message__close",
          onClick: i,
          title: a(o)("Close")
        }, v[0] || (v[0] = [
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
  return p(), b("svg", Kl, e[0] || (e[0] = [
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
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = V(e.modal.data.items), o = V(""), c = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: r.value.map(({ path: d, type: u }) => ({ path: d, type: u }))
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
    return (d, u) => (p(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, w(a(s)("Yes, Delete!")), 1),
        l("button", {
          type: "button",
          onClick: u[1] || (u[1] = (i) => a(e).modal.close()),
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
                (p(!0), b(ke, null, Ce(r.value, (i) => (p(), b("p", ti, [
                  i.type === "dir" ? (p(), b("svg", ni, u[2] || (u[2] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (p(), b("svg", si, u[3] || (u[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  l("span", oi, w(i.basename), 1)
                ]))), 256))
              ]),
              o.value.length ? (p(), X(st, {
                key: 0,
                onHidden: u[0] || (u[0] = (i) => o.value = ""),
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
  return p(), b("svg", ai, e[0] || (e[0] = [
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
        onError: (u) => {
          c.value = s(u.message);
        }
      });
    };
    return (u, i) => (p(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, w(a(s)("Rename")), 1),
        l("button", {
          type: "button",
          onClick: i[2] || (i[2] = (f) => a(e).modal.close()),
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
                r.value.type === "dir" ? (p(), b("svg", ui, i[3] || (i[3] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (p(), b("svg", fi, i[4] || (i[4] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                l("span", vi, w(r.value.basename), 1)
              ]),
              he(l("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (f) => o.value = f),
                onKeyup: It(d, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Rt, o.value]
              ]),
              c.value.length ? (p(), X(st, {
                key: 0,
                onHidden: i[1] || (i[1] = (f) => c.value = ""),
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
  return p(), b("svg", mi, e[0] || (e[0] = [
    l("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const Uo = { render: pi }, hi = { class: "vuefinder__new-folder-modal__content" }, gi = { class: "vuefinder__new-folder-modal__form" }, bi = { class: "vuefinder__new-folder-modal__description" }, wi = ["placeholder"], Ho = {
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
        onError: (u) => {
          c.value = r(u.message);
        }
      });
    };
    return (u, i) => (p(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, w(a(r)("Create")), 1),
        l("button", {
          type: "button",
          onClick: i[2] || (i[2] = (f) => a(e).modal.close()),
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
                "onUpdate:modelValue": i[0] || (i[0] = (f) => o.value = f),
                onKeyup: It(d, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: a(r)("Folder Name"),
                type: "text"
              }, null, 40, wi), [
                [Rt, o.value]
              ]),
              c.value.length ? (p(), X(st, {
                key: 0,
                onHidden: i[1] || (i[1] = (f) => c.value = ""),
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
  return p(), b("svg", yi, e[0] || (e[0] = [
    l("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ]));
}
const Bo = { render: ki }, xi = { class: "vuefinder__upload-modal__content" }, Si = {
  key: 0,
  class: "pointer-events-none"
}, $i = {
  key: 1,
  class: "pointer-events-none"
}, Ci = ["disabled"], Ei = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Ti = ["textContent"], Ai = { class: "vuefinder__upload-modal__file-info" }, Mi = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Di = { class: "vuefinder__upload-modal__file-name md:hidden" }, Li = {
  key: 0,
  class: "ml-auto"
}, Oi = ["title", "disabled", "onClick"], Vi = {
  key: 0,
  class: "py-2"
}, Fi = ["disabled"], Ii = {
  __name: "ModalUpload",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = s("uppy"), o = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = V({ QUEUE_ENTRY_STATUS: o }), d = V(null), u = V(null), i = V(null), f = V(null), m = V(null), v = V(null), h = V([]), _ = V(""), g = V(!1), y = V(!1);
    let S;
    function O(L) {
      return h.value.findIndex((q) => q.id === L);
    }
    function I(L, q = null) {
      q = q ?? (L.webkitRelativePath || L.name), S.addFile({
        name: q,
        type: L.type,
        data: L,
        source: "Local"
      });
    }
    function D(L) {
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
    const x = (L) => {
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
    function F() {
      f.value.click();
    }
    function U() {
      if (!g.value) {
        if (!h.value.filter((L) => L.status !== o.DONE).length) {
          _.value = s("Please select file to upload first.");
          return;
        }
        _.value = "", S.retryAll(), S.upload();
      }
    }
    function $() {
      S.cancelAll({ reason: "user" }), h.value.forEach((L) => {
        L.status !== o.DONE && (L.status = o.CANCELED, L.statusName = s("Canceled"));
      }), g.value = !1;
    }
    function C(L) {
      g.value || (S.removeFile(L.id, "removed-by-user"), h.value.splice(O(L.id), 1));
    }
    function k(L) {
      g.value || (S.cancelAll({ reason: "user" }), h.value.splice(0));
    }
    function A() {
      e.modal.close();
    }
    function R() {
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
          maxFileSize: Er(e.maxFileSize),
          //maxNumberOfFiles
          allowedFileTypes: [
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".bmp",
            ".tiff",
            ".webp",
            ".svg",
            ".pdf",
            ".doc",
            ".docx",
            ".xls",
            ".xlsx",
            ".pptx",
            ".txt",
            ".csv"
          ]
        },
        locale: r,
        onBeforeFileAdded(T, N) {
          if (N[T.id] != null) {
            const ee = O(T.id);
            h.value[ee].status === o.PENDING && (_.value = S.i18n("noDuplicates", { fileName: T.name })), h.value = h.value.filter((oe) => oe.id !== T.id);
          }
          return h.value.push({
            id: T.id,
            name: T.name,
            size: e.filesize(T.size),
            status: o.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: T.data
          }), !0;
        }
      }), S.use(hr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(T, N) {
          let B;
          try {
            B = JSON.parse(T).message;
          } catch {
            B = s("Cannot parse server response.");
          }
          return new Error(B);
        }
      }), S.on("restriction-failed", (T, N) => {
        const B = h.value[O(T.id)];
        C(B), _.value = N.message;
      }), S.on("upload", async () => {
        const T = R();
        e.requester.config.getToken && e.requester.config.getToken().then((B) => {
          B && (T.headers = {
            ...T.headers,
            Authorization: `Bearer ${B}`
          });
        }).catch((B) => {
          console.error("Error getting token ", B);
        }), S.setMeta({ ...T.body });
        const N = S.getPlugin("XHRUpload");
        N.opts.method = T.method, N.opts.endpoint = T.url + "?" + new URLSearchParams(T.params), N.opts.headers = T.headers, delete T.headers["Content-Type"], g.value = !0, h.value.forEach((B) => {
          B.status !== o.DONE && (B.percent = null, B.status = o.UPLOADING, B.statusName = s("Pending upload"));
        });
      }), S.on("upload-progress", (T, N) => {
        const B = Math.floor(N.bytesUploaded / N.bytesTotal * 100);
        h.value[O(T.id)].percent = `${B}%`;
      }), S.on("upload-success", (T) => {
        const N = h.value[O(T.id)];
        N.status = o.DONE, N.statusName = s("Done"), e.emitter.emit("vf-fetch", {
          params: {
            q: "index",
            adapter: e.fs.adapter,
            path: e.fs.data.dirname
          }
        });
      }), S.on("upload-error", (T, N) => {
        const B = h.value[O(T.id)];
        B.percent = null, B.status = o.ERROR, N.isNetworkError ? B.statusName = s(
          "Network Error, Unable establish connection to the server or interrupted."
        ) : B.statusName = N ? N.message : s("Unknown Error");
      }), S.on("error", (T) => {
        _.value = T.message, g.value = !1, e.emitter.emit("vf-fetch", {
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
      }), f.value.addEventListener("click", () => {
        u.value.click();
      }), m.value.addEventListener("click", () => {
        i.value.click();
      }), v.value.addEventListener("dragover", (T) => {
        T.preventDefault(), y.value = !0;
      }), v.value.addEventListener("dragleave", (T) => {
        T.preventDefault(), y.value = !1;
      });
      function L(T, N) {
        N.isFile && N.file((B) => T(N, B)), N.isDirectory && N.createReader().readEntries((B) => {
          B.forEach((ee) => {
            L(T, ee);
          });
        });
      }
      v.value.addEventListener("drop", (T) => {
        T.preventDefault(), y.value = !1;
        const N = /^[/\\](.+)/;
        [...T.dataTransfer.items].forEach((B) => {
          B.kind === "file" && L((ee, oe) => {
            const se = N.exec(ee.fullPath);
            I(oe, se[1]);
          }, B.webkitGetAsEntry());
        });
      });
      const q = ({ target: T }) => {
        const N = T.files;
        for (const B of N)
          I(B);
        T.value = "";
      };
      u.value.addEventListener("change", q), i.value.addEventListener("change", q);
    }), Ns(() => {
      S == null || S.close({ reason: "unmount" });
    }), (L, q) => (p(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: g.value,
          onClick: et(U, ["prevent"])
        }, w(a(s)("Upload")), 9, Fi),
        g.value ? (p(), b("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: et($, ["prevent"])
        }, w(a(s)("Cancel")), 1)) : (p(), b("button", {
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
              ref: v,
              onClick: F
            }, [
              y.value ? (p(), b("div", Si, w(a(s)("Release to drop these files.")), 1)) : (p(), b("div", $i, w(a(s)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            l("div", {
              ref_key: "container",
              ref: d,
              class: "vuefinder__upload-modal__buttons"
            }, [
              l("button", {
                ref_key: "pickFiles",
                ref: f,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, w(a(s)("Select Files")), 513),
              l("button", {
                ref_key: "pickFolders",
                ref: m,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, w(a(s)("Select Folders")), 513),
              l("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: g.value,
                onClick: q[0] || (q[0] = (T) => k())
              }, w(a(s)("Clear all")), 9, Ci)
            ], 512),
            l("div", Ei, [
              (p(!0), b(ke, null, Ce(h.value, (T) => (p(), b("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: T.id
              }, [
                l("span", {
                  class: de(["vuefinder__upload-modal__file-icon", D(T)])
                }, [
                  l("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: w(x(T))
                  }, null, 8, Ti)
                ], 2),
                l("div", Ai, [
                  l("div", Mi, w(a(Zn)(T.name, 40)) + " (" + w(T.size) + ") ", 1),
                  l("div", Di, w(a(Zn)(T.name, 16)) + " (" + w(T.size) + ") ", 1),
                  l("div", {
                    class: de(["vuefinder__upload-modal__file-status", D(T)])
                  }, [
                    Q(w(T.statusName) + " ", 1),
                    T.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (p(), b("b", Li, w(T.percent), 1)) : j("", !0)
                  ], 2)
                ]),
                l("button", {
                  type: "button",
                  class: de(["vuefinder__upload-modal__file-remove", g.value ? "disabled" : ""]),
                  title: a(s)("Delete"),
                  disabled: g.value,
                  onClick: (N) => C(T)
                }, q[2] || (q[2] = [
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
                ]), 10, Oi)
              ]))), 128)),
              h.value.length ? j("", !0) : (p(), b("div", Vi, w(a(s)("No files selected!")), 1))
            ]),
            _.value.length ? (p(), X(st, {
              key: 0,
              onHidden: q[1] || (q[1] = (T) => _.value = ""),
              error: ""
            }, {
              default: ne(() => [
                Q(w(_.value), 1)
              ]),
              _: 1
            })) : j("", !0)
          ])
        ]),
        l("input", {
          ref_key: "internalFileInput",
          ref: u,
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
}, Ri = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ui(n, e) {
  return p(), b("svg", Ri, e[0] || (e[0] = [
    l("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const qo = { render: Ui }, Hi = { class: "vuefinder__unarchive-modal__content" }, Bi = { class: "vuefinder__unarchive-modal__items" }, qi = { class: "vuefinder__unarchive-modal__item" }, Ni = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pi = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zi = { class: "vuefinder__unarchive-modal__item-name" }, ji = { class: "vuefinder__unarchive-modal__info" }, No = {
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
        onError: (u) => {
          o.value = s(u.message);
        }
      });
    };
    return (u, i) => (p(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, w(a(s)("Unarchive")), 1),
        l("button", {
          type: "button",
          onClick: i[1] || (i[1] = (f) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(s)("Cancel")), 1)
      ]),
      default: ne(() => [
        l("div", null, [
          W(dt, {
            icon: a(qo),
            title: a(s)("Unarchive")
          }, null, 8, ["icon", "title"]),
          l("div", Hi, [
            l("div", Bi, [
              (p(!0), b(ke, null, Ce(c.value, (f) => (p(), b("p", qi, [
                f.type === "dir" ? (p(), b("svg", Ni, i[2] || (i[2] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (p(), b("svg", Pi, i[3] || (i[3] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                l("span", zi, w(f.basename), 1)
              ]))), 256)),
              l("p", ji, w(a(s)("The archive will be unarchived at")) + " (" + w(a(e).fs.data.dirname) + ")", 1),
              o.value.length ? (p(), X(st, {
                key: 0,
                onHidden: i[0] || (i[0] = (f) => o.value = ""),
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
}, Gi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Wi(n, e) {
  return p(), b("svg", Gi, e[0] || (e[0] = [
    l("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const Po = { render: Wi }, Yi = { class: "vuefinder__archive-modal__content" }, Ki = { class: "vuefinder__archive-modal__form" }, Xi = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Zi = { class: "vuefinder__archive-modal__file" }, Ji = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Qi = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ec = { class: "vuefinder__archive-modal__file-name" }, tc = ["placeholder"], zo = {
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
          items: c.value.map(({ path: u, type: i }) => ({ path: u, type: i })),
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file(s) archived.") });
        },
        onError: (u) => {
          o.value = s(u.message);
        }
      });
    };
    return (u, i) => (p(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, w(a(s)("Archive")), 1),
        l("button", {
          type: "button",
          onClick: i[2] || (i[2] = (f) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(s)("Cancel")), 1)
      ]),
      default: ne(() => [
        l("div", null, [
          W(dt, {
            icon: a(Po),
            title: a(s)("Archive the files")
          }, null, 8, ["icon", "title"]),
          l("div", Yi, [
            l("div", Ki, [
              l("div", Xi, [
                (p(!0), b(ke, null, Ce(c.value, (f) => (p(), b("p", Zi, [
                  f.type === "dir" ? (p(), b("svg", Ji, i[3] || (i[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (p(), b("svg", Qi, i[4] || (i[4] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  l("span", ec, w(f.basename), 1)
                ]))), 256))
              ]),
              he(l("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (f) => r.value = f),
                onKeyup: It(d, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: a(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, tc), [
                [Rt, r.value]
              ]),
              o.value.length ? (p(), X(st, {
                key: 0,
                onHidden: i[1] || (i[1] = (f) => o.value = ""),
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
}, nc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function sc(n, e) {
  return p(), b("svg", nc, e[0] || (e[0] = [
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
const ms = { render: sc }, oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function rc(n, e) {
  return p(), b("svg", oc, e[0] || (e[0] = [
    l("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ]));
}
const ac = { render: rc }, lc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ic(n, e) {
  return p(), b("svg", lc, e[0] || (e[0] = [
    l("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ]));
}
const cc = { render: ic }, dc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function uc(n, e) {
  return p(), b("svg", dc, e[0] || (e[0] = [
    l("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ]));
}
const fc = { render: uc }, vc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function _c(n, e) {
  return p(), b("svg", vc, e[0] || (e[0] = [
    l("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ]));
}
const mc = { render: _c }, pc = { class: "vuefinder__toolbar" }, hc = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, gc = ["title"], bc = ["title"], wc = ["title"], yc = ["title"], kc = ["title"], xc = ["title"], Sc = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, $c = { class: "pl-2" }, Cc = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Ec = { class: "vuefinder__toolbar__controls" }, Tc = ["title"], Ac = ["title"], Mc = {
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
    const u = () => {
      e.view = e.view === "list" ? "grid" : "list", o.refreshSelection(), s("viewport", e.view);
    };
    return (i, f) => (p(), b("div", pc, [
      c.value.length ? (p(), b("div", Sc, [
        l("div", $c, [
          Q(w(a(r)("Search results for")) + " ", 1),
          l("span", Cc, w(c.value), 1)
        ]),
        a(e).loadingIndicator === "circular" && a(e).fs.loading ? (p(), X(a(ms), { key: 0 })) : j("", !0)
      ])) : (p(), b("div", hc, [
        a(e).features.includes(a(_e).NEW_FOLDER) ? (p(), b("div", {
          key: 0,
          class: "mx-1.5",
          title: a(r)("New Folder"),
          onClick: f[0] || (f[0] = (m) => a(e).modal.open(Ho, { items: a(o).getSelected() }))
        }, [
          W(a(Uo))
        ], 8, gc)) : j("", !0),
        a(e).features.includes(a(_e).UPLOAD) ? (p(), b("div", {
          key: 1,
          class: "mx-1.5",
          title: a(r)("Upload"),
          onClick: f[1] || (f[1] = (m) => a(e).modal.open(Ii, { items: a(o).getSelected() }))
        }, [
          W(a(Bo))
        ], 8, bc)) : j("", !0),
        a(e).features.includes(a(_e).RENAME) ? (p(), b("div", {
          key: 2,
          class: "mx-1.5",
          title: a(r)("Rename"),
          onClick: f[2] || (f[2] = (m) => a(o).getCount() !== 1 || a(e).modal.open(_s, { items: a(o).getSelected() }))
        }, [
          W(a(Ro), {
            class: de(a(o).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, wc)) : j("", !0),
        a(e).features.includes(a(_e).DELETE) ? (p(), b("div", {
          key: 3,
          class: "mx-1.5",
          title: a(r)("Delete"),
          onClick: f[3] || (f[3] = (m) => !a(o).getCount() || a(e).modal.open(vs, { items: a(o).getSelected() }))
        }, [
          W(a(Io), {
            class: de(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, yc)) : j("", !0),
        a(e).features.includes(a(_e).UNARCHIVE) && a(o).getCount() === 1 && a(o).getSelected()[0].mime_type === "application/zip" ? (p(), b("div", {
          key: 4,
          class: "mx-1.5",
          title: a(r)("Unarchive"),
          onClick: f[4] || (f[4] = (m) => !a(o).getCount() || a(e).modal.open(No, { items: a(o).getSelected() }))
        }, [
          W(a(qo), {
            class: de(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, kc)) : j("", !0),
        a(e).features.includes(a(_e).ARCHIVE) ? (p(), b("div", {
          key: 5,
          class: "mx-1.5",
          title: a(r)("Archive"),
          onClick: f[5] || (f[5] = (m) => !a(o).getCount() || a(e).modal.open(zo, { items: a(o).getSelected() }))
        }, [
          W(a(Po), {
            class: de(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, xc)) : j("", !0)
      ])),
      l("div", Ec, [
        a(e).features.includes(a(_e).FULL_SCREEN) ? (p(), b("div", {
          key: 0,
          onClick: d,
          class: "mx-1.5",
          title: a(r)("Toggle Full Screen")
        }, [
          a(e).fullScreen ? (p(), X(a(cc), { key: 0 })) : (p(), X(a(ac), { key: 1 }))
        ], 8, Tc)) : j("", !0),
        l("div", {
          class: "mx-1.5",
          title: a(r)("Change View"),
          onClick: f[6] || (f[6] = (m) => c.value.length || u())
        }, [
          a(e).view === "grid" ? (p(), X(a(fc), {
            key: 0,
            class: de(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : j("", !0),
          a(e).view === "list" ? (p(), X(a(mc), {
            key: 1,
            class: de(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : j("", !0)
        ], 8, Ac)
      ])
    ]));
  }
}, Dc = (n, e = 0, s = !1) => {
  let r;
  return (...o) => {
    s && !r && n(...o), clearTimeout(r), r = setTimeout(() => {
      n(...o);
    }, e);
  };
}, Us = (n, e, s) => {
  const r = V(n);
  return lr((o, c) => ({
    get() {
      return o(), r.value;
    },
    set: Dc(
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
function Oc(n, e) {
  return p(), b("svg", Lc, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ]));
}
const Vc = { render: Oc }, Fc = { class: "vuefinder__move-modal__content" }, Ic = { class: "vuefinder__move-modal__description" }, Rc = { class: "vuefinder__move-modal__files vf-scrollbar" }, Uc = { class: "vuefinder__move-modal__file" }, Hc = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Bc = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qc = { class: "vuefinder__move-modal__file-name" }, Nc = { class: "vuefinder__move-modal__target-title" }, Pc = { class: "vuefinder__move-modal__target-directory" }, zc = { class: "vuefinder__move-modal__target-path" }, jc = { class: "vuefinder__move-modal__selected-items" }, Jn = {
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
          items: r.value.map(({ path: d, type: u }) => ({ path: d, type: u })),
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
    return (d, u) => (p(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, w(a(s)("Yes, Move!")), 1),
        l("button", {
          type: "button",
          onClick: u[1] || (u[1] = (i) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(s)("Cancel")), 1),
        l("div", jc, w(a(s)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: ne(() => [
        l("div", null, [
          W(dt, {
            icon: a(Vc),
            title: a(s)("Move files")
          }, null, 8, ["icon", "title"]),
          l("div", Fc, [
            l("p", Ic, w(a(s)("Are you sure you want to move these files?")), 1),
            l("div", Rc, [
              (p(!0), b(ke, null, Ce(r.value, (i) => (p(), b("div", Uc, [
                l("div", null, [
                  i.type === "dir" ? (p(), b("svg", Hc, u[2] || (u[2] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (p(), b("svg", Bc, u[3] || (u[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                l("div", qc, w(i.path), 1)
              ]))), 256))
            ]),
            l("h4", Nc, w(a(s)("Target Directory")), 1),
            l("p", Pc, [
              u[4] || (u[4] = l("svg", {
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
              l("span", zc, w(a(e).modal.data.items.to.path), 1)
            ]),
            o.value.length ? (p(), X(st, {
              key: 0,
              onHidden: u[0] || (u[0] = (i) => o.value = ""),
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
}, Gc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function Wc(n, e) {
  return p(), b("svg", Gc, e[0] || (e[0] = [
    l("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ]));
}
const Yc = { render: Wc }, Kc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Xc(n, e) {
  return p(), b("svg", Kc, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Zc = { render: Xc }, Jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Qc(n, e) {
  return p(), b("svg", Jc, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const ed = { render: Qc }, td = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function nd(n, e) {
  return p(), b("svg", td, e[0] || (e[0] = [
    l("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ]));
}
const sd = { render: nd }, od = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function rd(n, e) {
  return p(), b("svg", od, e[0] || (e[0] = [
    l("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ]));
}
const ad = { render: rd }, ld = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function id(n, e) {
  return p(), b("svg", ld, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const cd = { render: id }, dd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function ud(n, e) {
  return p(), b("svg", dd, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ]));
}
const xn = { render: ud }, fd = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function vd(n, e) {
  return p(), b("svg", fd, e[0] || (e[0] = [
    l("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ]));
}
const _d = { render: vd }, md = { class: "vuefinder__breadcrumb__container" }, pd = ["title"], hd = ["title"], gd = ["title"], bd = { class: "vuefinder__breadcrumb__list" }, wd = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, yd = { class: "relative" }, kd = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], xd = { class: "vuefinder__breadcrumb__search-mode" }, Sd = ["placeholder"], $d = { class: "vuefinder__breadcrumb__hidden-dropdown" }, Cd = ["onDrop", "onClick"], Ed = { class: "vuefinder__breadcrumb__hidden-item-content" }, Td = { class: "vuefinder__breadcrumb__hidden-item-text" }, Ad = {
  __name: "Breadcrumb",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = e.dragSelect, { setStore: o } = e.storage, c = V(null), d = Us(0, 100);
    Oe(d, ($) => {
      const C = c.value.children;
      let k = 0, A = 0, R = 5, L = 1;
      e.fs.limitBreadcrumbItems(R), _t(() => {
        for (let q = C.length - 1; q >= 0 && !(k + C[q].offsetWidth > d.value - 40); q--)
          k += parseInt(C[q].offsetWidth, 10), A++;
        A < L && (A = L), A > R && (A = R), e.fs.limitBreadcrumbItems(A);
      });
    });
    const u = () => {
      d.value = c.value.offsetWidth;
    };
    let i = V(null);
    Ee(() => {
      i.value = new ResizeObserver(u), i.value.observe(c.value);
    }), Qn(() => {
      i.value.disconnect();
    });
    const f = ($, C = null) => {
      $.preventDefault(), r.isDraggingRef.value = !1, h($), C ?? (C = e.fs.hiddenBreadcrumbs.length - 1);
      let k = JSON.parse($.dataTransfer.getData("items"));
      if (k.find((A) => A.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Jn, {
        items: {
          from: k,
          to: e.fs.hiddenBreadcrumbs[C] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, m = ($, C = null) => {
      $.preventDefault(), r.isDraggingRef.value = !1, h($), C ?? (C = e.fs.breadcrumbs.length - 2);
      let k = JSON.parse($.dataTransfer.getData("items"));
      if (k.find((A) => A.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Jn, {
        items: {
          from: k,
          to: e.fs.breadcrumbs[C] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, v = ($) => {
      $.preventDefault(), e.fs.isGoUpAvailable() ? ($.dataTransfer.dropEffect = "copy", $.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : ($.dataTransfer.dropEffect = "none", $.dataTransfer.effectAllowed = "none");
    }, h = ($) => {
      $.preventDefault(), $.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && $.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, _ = () => {
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
    }, y = ($) => {
      e.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: e.fs.adapter, path: $.path }
      }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, S = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, O = {
      mounted($, C, k, A) {
        $.clickOutsideEvent = function(R) {
          $ === R.target || $.contains(R.target) || C.value();
        }, document.body.addEventListener("click", $.clickOutsideEvent);
      },
      beforeUnmount($, C, k, A) {
        document.body.removeEventListener("click", $.clickOutsideEvent);
      }
    };
    Oe(
      () => e.showTreeView,
      ($, C) => {
        $ !== C && o("show-tree-view", $);
      }
    );
    const I = V(null), D = () => {
      e.features.includes(_e.SEARCH) && (e.fs.searchMode = !0, _t(() => I.value.focus()));
    }, x = Us("", 400);
    Oe(x, ($) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: $ });
    }), Oe(
      () => e.fs.searchMode,
      ($) => {
        $ && _t(() => I.value.focus());
      }
    );
    const F = () => {
      e.fs.searchMode = !1, x.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      F();
    });
    const U = () => {
      x.value === "" && F();
    };
    return ($, C) => (p(), b("div", md, [
      l("span", {
        title: a(s)("Go up a directory")
      }, [
        W(a(Zc), {
          onDragover: C[0] || (C[0] = (k) => v(k)),
          onDragleave: C[1] || (C[1] = (k) => h(k)),
          onDrop: C[2] || (C[2] = (k) => m(k)),
          onClick: g,
          class: de(
            a(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
          )
        }, null, 8, ["class"])
      ], 8, pd),
      a(e).fs.loading ? (p(), b("span", {
        key: 1,
        title: a(s)("Cancel")
      }, [
        W(a(ed), {
          onClick: C[3] || (C[3] = (k) => a(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, gd)) : (p(), b("span", {
        key: 0,
        title: a(s)("Refresh")
      }, [
        W(a(Yc), { onClick: _ })
      ], 8, hd)),
      he(l("div", {
        onClick: et(D, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        l("div", null, [
          W(a(sd), {
            onDragover: C[4] || (C[4] = (k) => v(k)),
            onDragleave: C[5] || (C[5] = (k) => h(k)),
            onDrop: C[6] || (C[6] = (k) => m(k, -1)),
            onClick: C[7] || (C[7] = (k) => a(e).emitter.emit("vf-fetch", {
              params: { q: "index", adapter: a(e).fs.adapter }
            }))
          })
        ]),
        l("div", bd, [
          a(e).fs.hiddenBreadcrumbs.length ? he((p(), b("div", wd, [
            C[13] || (C[13] = l("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("div", yd, [
              l("span", {
                onDragenter: C[8] || (C[8] = (k) => a(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: C[9] || (C[9] = (k) => a(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                W(a(_d), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [O, S]
          ]) : j("", !0)
        ]),
        l("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: et(D, ["self"])
        }, [
          (p(!0), b(ke, null, Ce(a(e).fs.breadcrumbs, (k, A) => (p(), b("div", { key: A }, [
            C[14] || (C[14] = l("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("span", {
              onDragover: (R) => A === a(e).fs.breadcrumbs.length - 1 || v(R),
              onDragleave: (R) => A === a(e).fs.breadcrumbs.length - 1 || h(R),
              onDrop: (R) => A === a(e).fs.breadcrumbs.length - 1 || m(R, A),
              class: "vuefinder__breadcrumb__item",
              title: k.basename,
              onClick: (R) => a(e).emitter.emit("vf-fetch", {
                params: {
                  q: "index",
                  adapter: a(e).fs.adapter,
                  path: k.path
                }
              })
            }, w(k.name), 41, kd)
          ]))), 128))
        ], 512),
        a(e).loadingIndicator === "circular" && a(e).fs.loading ? (p(), X(a(ms), { key: 0 })) : j("", !0)
      ], 512), [
        [Ge, !a(e).fs.searchMode]
      ]),
      he(l("div", xd, [
        l("div", null, [
          W(a(ad))
        ]),
        he(l("input", {
          ref_key: "searchInput",
          ref: I,
          onKeydown: It(F, ["esc"]),
          onBlur: U,
          "onUpdate:modelValue": C[10] || (C[10] = (k) => ir(x) ? x.value = k : null),
          placeholder: a(s)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, Sd), [
          [Rt, a(x)]
        ]),
        W(a(cd), { onClick: F })
      ], 512), [
        [Ge, a(e).fs.searchMode]
      ]),
      he(l("div", $d, [
        (p(!0), b(ke, null, Ce(a(e).fs.hiddenBreadcrumbs, (k, A) => (p(), b("div", {
          key: A,
          onDragover: C[11] || (C[11] = (R) => v(R)),
          onDragleave: C[12] || (C[12] = (R) => h(R)),
          onDrop: (R) => f(R, A),
          onClick: (R) => y(k),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          l("div", Ed, [
            l("span", null, [
              W(a(xn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            l("span", Td, w(k.name), 1)
          ])
        ], 40, Cd))), 128))
      ], 512), [
        [Ge, a(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, jo = (n, e = null) => new Date(n * 1e3).toLocaleString(e ?? "ru-RU"), Md = ["onClick"], Dd = {
  __name: "Toast",
  setup(n) {
    const e = le("ServiceContainer"), { getStore: s } = e.storage, r = V(s("full-screen", !1)), o = V([]), c = (i) => i === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", d = (i) => {
      o.value.splice(i, 1);
    }, u = (i) => {
      let f = o.value.findIndex((m) => m.id === i);
      f !== -1 && d(f);
    };
    return e.emitter.on("vf-toast-clear", () => {
      o.value = [];
    }), e.emitter.on("vf-toast-push", (i) => {
      let f = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      i.id = f, o.value.push(i), setTimeout(() => {
        u(f);
      }, 5e3);
    }), (i, f) => (p(), b("div", {
      class: de(["vuefinder__toast", r.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      W(cr, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: ne(() => [
          (p(!0), b(ke, null, Ce(o.value, (m, v) => (p(), b("div", {
            key: v,
            onClick: (h) => d(v),
            class: de(["vuefinder__toast__message", c(m.type)])
          }, w(m.label), 11, Md))), 128))
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
function Od(n, e) {
  return p(), b("svg", Ld, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Vd = { render: Od }, Fd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Id(n, e) {
  return p(), b("svg", Fd, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Rd = { render: Id }, en = {
  __name: "SortIcon",
  props: { direction: String },
  setup(n) {
    return (e, s) => (p(), b("div", null, [
      n.direction === "asc" ? (p(), X(a(Vd), { key: 0 })) : j("", !0),
      n.direction === "desc" ? (p(), X(a(Rd), { key: 1 })) : j("", !0)
    ]));
  }
}, Ud = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Hd(n, e) {
  return p(), b("svg", Ud, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const Bd = { render: Hd }, qd = { class: "vuefinder__item-icon" }, Fn = {
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
    return (e, s) => (p(), b("span", qd, [
      n.type === "dir" ? (p(), X(a(xn), {
        key: 0,
        class: de(n.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (p(), X(a(Bd), {
        key: 1,
        class: de(n.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, Nd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function Pd(n, e) {
  return p(), b("svg", Nd, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const zd = { render: Pd }, jd = { class: "vuefinder__drag-item__container" }, Gd = { class: "vuefinder__drag-item__count" }, Wd = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(n) {
    const e = n;
    return (s, r) => (p(), b("div", jd, [
      W(a(zd)),
      l("div", Gd, w(e.count), 1)
    ]));
  }
}, Yd = { class: "vuefinder__text-preview" }, Kd = { class: "vuefinder__text-preview__header" }, Xd = ["title"], Zd = { class: "vuefinder__text-preview__actions" }, Jd = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Qd = { key: 1 }, eu = {
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, r = V(""), o = V(""), c = V(null), d = V(!1), u = V(""), i = V(!1), f = le("ServiceContainer"), { t: m } = f.i18n;
    Ee(() => {
      f.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: f.modal.data.adapter, path: f.modal.data.item.path },
        responseType: "text"
      }).then((_) => {
        r.value = _, s("success");
      });
    });
    const v = () => {
      d.value = !d.value, o.value = r.value;
    }, h = () => {
      u.value = "", i.value = !1, f.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: f.modal.data.adapter,
          path: f.modal.data.item.path
        },
        body: {
          content: o.value
        },
        responseType: "text"
      }).then((_) => {
        u.value = m("Updated."), r.value = _, s("success"), d.value = !d.value;
      }).catch((_) => {
        u.value = m(_.message), i.value = !0;
      });
    };
    return (_, g) => (p(), b("div", Yd, [
      l("div", Kd, [
        l("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: a(f).modal.data.item.path
        }, w(a(f).modal.data.item.basename), 9, Xd),
        l("div", Zd, [
          d.value ? (p(), b("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__text-preview__save-button"
          }, w(a(m)("Save")), 1)) : j("", !0),
          a(f).features.includes(a(_e).EDIT) ? (p(), b("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: g[0] || (g[0] = (y) => v())
          }, w(d.value ? a(m)("Cancel") : a(m)("Edit")), 1)) : j("", !0)
        ])
      ]),
      l("div", null, [
        d.value ? (p(), b("div", Qd, [
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
        ])) : (p(), b("pre", Jd, w(r.value), 1)),
        u.value.length ? (p(), X(st, {
          key: 2,
          onHidden: g[2] || (g[2] = (y) => u.value = ""),
          error: i.value
        }, {
          default: ne(() => [
            Q(w(u.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : j("", !0)
      ])
    ]));
  }
}, tu = { class: "vuefinder__image-preview" }, nu = { class: "vuefinder__image-preview__header" }, su = ["title"], ou = { class: "vuefinder__image-preview__actions" }, ru = { class: "vuefinder__image-preview__image-container" }, au = ["src"], lu = {
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, r = le("ServiceContainer"), { t: o } = r.i18n, c = V(null), d = V(null), u = V(!1), i = V(""), f = V(!1), m = () => {
      u.value = !u.value, u.value ? d.value = new br(c.value, {
        crop(h) {
        }
      }) : d.value.destroy();
    }, v = () => {
      d.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (h) => {
          i.value = "", f.value = !1;
          const _ = new FormData();
          _.set("file", h), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: _
          }).then((g) => {
            i.value = o("Updated."), c.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), m(), s("success");
          }).catch((g) => {
            i.value = o(g.message), f.value = !0;
          });
        }
      );
    };
    return Ee(() => {
      s("success");
    }), (h, _) => (p(), b("div", tu, [
      l("div", nu, [
        l("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: a(r).modal.data.item.path
        }, w(a(r).modal.data.item.basename), 9, su),
        l("div", ou, [
          u.value ? (p(), b("button", {
            key: 0,
            onClick: v,
            class: "vuefinder__image-preview__crop-button"
          }, w(a(o)("Crop")), 1)) : j("", !0),
          a(r).features.includes(a(_e).EDIT) ? (p(), b("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: _[0] || (_[0] = (g) => m())
          }, w(u.value ? a(o)("Cancel") : a(o)("Edit")), 1)) : j("", !0)
        ])
      ]),
      l("div", ru, [
        l("img", {
          ref_key: "image",
          ref: c,
          class: "vuefinder__image-preview__image",
          src: a(r).requester.getPreviewUrl(a(r).modal.data.adapter, a(r).modal.data.item),
          alt: ""
        }, null, 8, au)
      ]),
      i.value.length ? (p(), X(st, {
        key: 0,
        onHidden: _[1] || (_[1] = (g) => i.value = ""),
        error: f.value
      }, {
        default: ne(() => [
          Q(w(i.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : j("", !0)
    ]));
  }
}, iu = { class: "vuefinder__default-preview" }, cu = { class: "vuefinder__default-preview__header" }, du = ["title"], uu = {
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = le("ServiceContainer"), r = e;
    return Ee(() => {
      r("success");
    }), (o, c) => (p(), b("div", iu, [
      l("div", cu, [
        l("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: a(s).modal.data.item.path
        }, w(a(s).modal.data.item.basename), 9, du)
      ]),
      c[0] || (c[0] = l("div", null, null, -1))
    ]));
  }
}, fu = { class: "vuefinder__video-preview" }, vu = ["title"], _u = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, mu = ["src"], pu = {
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = le("ServiceContainer"), r = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ee(() => {
      r("success");
    }), (c, d) => (p(), b("div", fu, [
      l("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: a(s).modal.data.item.path
      }, w(a(s).modal.data.item.basename), 9, vu),
      l("div", null, [
        l("video", _u, [
          l("source", {
            src: o(),
            type: "video/mp4"
          }, null, 8, mu),
          d[0] || (d[0] = Q(" Your browser does not support the video tag. "))
        ])
      ])
    ]));
  }
}, hu = { class: "vuefinder__audio-preview" }, gu = ["title"], bu = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, wu = ["src"], yu = {
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, r = le("ServiceContainer"), o = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return Ee(() => {
      s("success");
    }), (c, d) => (p(), b("div", hu, [
      l("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: a(r).modal.data.item.path
      }, w(a(r).modal.data.item.basename), 9, gu),
      l("div", null, [
        l("audio", bu, [
          l("source", {
            src: o(),
            type: "audio/mpeg"
          }, null, 8, wu),
          d[0] || (d[0] = Q(" Your browser does not support the audio element. "))
        ])
      ])
    ]));
  }
}, ku = { class: "vuefinder__pdf-preview" }, xu = ["title"], Su = ["data"], $u = ["src"], Cu = {
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = le("ServiceContainer"), r = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ee(() => {
      r("success");
    }), (c, d) => (p(), b("div", ku, [
      l("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: a(s).modal.data.item.path
      }, w(a(s).modal.data.item.basename), 9, xu),
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
          }, " Your browser does not support PDFs ", 8, $u)
        ], 8, Su)
      ])
    ]));
  }
}, Eu = { class: "vuefinder__preview-modal__content" }, Tu = { key: 0 }, Au = { class: "vuefinder__preview-modal__loading" }, Mu = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Du = { class: "vuefinder__preview-modal__details" }, Lu = { class: "font-bold" }, Ou = { class: "font-bold pl-2" }, Vu = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Fu = ["download", "href"], Go = {
  __name: "ModalPreview",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = V(!1), o = (d) => (e.modal.data.item.mime_type ?? "").startsWith(d), c = e.features.includes(_e.PREVIEW);
    return c || (r.value = !0), (d, u) => (p(), X(nt, null, {
      buttons: ne(() => [
        l("button", {
          type: "button",
          onClick: u[6] || (u[6] = (i) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(s)("Close")), 1),
        a(e).features.includes(a(_e).DOWNLOAD) ? (p(), b("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: a(e).requester.getDownloadUrl(a(e).modal.data.adapter, a(e).modal.data.item),
          href: a(e).requester.getDownloadUrl(a(e).modal.data.adapter, a(e).modal.data.item)
        }, w(a(s)("Download")), 9, Fu)) : j("", !0)
      ]),
      default: ne(() => [
        l("div", null, [
          l("div", Eu, [
            a(c) ? (p(), b("div", Tu, [
              o("text") ? (p(), X(eu, {
                key: 0,
                onSuccess: u[0] || (u[0] = (i) => r.value = !0)
              })) : o("image") ? (p(), X(lu, {
                key: 1,
                onSuccess: u[1] || (u[1] = (i) => r.value = !0)
              })) : o("video") ? (p(), X(pu, {
                key: 2,
                onSuccess: u[2] || (u[2] = (i) => r.value = !0)
              })) : o("audio") ? (p(), X(yu, {
                key: 3,
                onSuccess: u[3] || (u[3] = (i) => r.value = !0)
              })) : o("application/pdf") ? (p(), X(Cu, {
                key: 4,
                onSuccess: u[4] || (u[4] = (i) => r.value = !0)
              })) : (p(), X(uu, {
                key: 5,
                onSuccess: u[5] || (u[5] = (i) => r.value = !0)
              }))
            ])) : j("", !0),
            l("div", Au, [
              r.value === !1 ? (p(), b("div", Mu, [
                u[7] || (u[7] = l("svg", {
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
        l("div", Du, [
          l("div", null, [
            l("span", Lu, w(a(s)("File Size")) + ": ", 1),
            Q(w(a(e).filesize(a(e).modal.data.item.file_size)), 1)
          ]),
          l("div", null, [
            l("span", Ou, w(a(s)("Last Modified")) + ": ", 1),
            Q(" " + w(a(jo)(a(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        a(e).features.includes(a(_e).DOWNLOAD) ? (p(), b("div", Vu, [
          l("span", null, w(a(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : j("", !0)
      ]),
      _: 1
    }));
  }
}, Iu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Ru(n, e) {
  return p(), b("svg", Iu, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ]));
}
const Wo = { render: Ru }, Uu = ["data-type", "data-item", "data-index"], In = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(n) {
    const e = le("ServiceContainer"), s = e.dragSelect, r = n, o = (_) => {
      _.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: _.path } })) : e.modal.open(Go, { adapter: e.fs.adapter, item: _ });
    }, c = {
      mounted(_, g, y, S) {
        y.props.draggable && (_.addEventListener("dragstart", (O) => d(O, g.value)), _.addEventListener("dragover", (O) => i(O, g.value)), _.addEventListener("drop", (O) => u(O, g.value)));
      },
      beforeUnmount(_, g, y, S) {
        y.props.draggable && (_.removeEventListener("dragstart", d), _.removeEventListener("dragover", i), _.removeEventListener("drop", u));
      }
    }, d = (_, g) => {
      if (_.altKey || _.ctrlKey || _.metaKey)
        return _.preventDefault(), !1;
      s.isDraggingRef.value = !0, _.dataTransfer.setDragImage(r.dragImage.$el, 0, 15), _.dataTransfer.effectAllowed = "all", _.dataTransfer.dropEffect = "copy", _.dataTransfer.setData("items", JSON.stringify(s.getSelected()));
    }, u = (_, g) => {
      _.preventDefault(), s.isDraggingRef.value = !1;
      let y = JSON.parse(_.dataTransfer.getData("items"));
      if (y.find((S) => S.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Jn, { items: { from: y, to: g } });
    }, i = (_, g) => {
      _.preventDefault(), !g || g.type !== "dir" || s.getSelection().find((y) => y === _.currentTarget) ? (_.dataTransfer.dropEffect = "none", _.dataTransfer.effectAllowed = "none") : _.dataTransfer.dropEffect = "copy";
    };
    let f = null, m = !1;
    const v = () => {
      f && clearTimeout(f);
    }, h = (_) => {
      if (!m)
        m = !0, setTimeout(() => m = !1, 300);
      else
        return m = !1, o(r.item), clearTimeout(f), !1;
      f = setTimeout(() => {
        const g = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: _.target.getBoundingClientRect().x,
          clientY: _.target.getBoundingClientRect().y
        });
        _.target.dispatchEvent(g);
      }, 500);
    };
    return (_, g) => he((p(), b("div", {
      style: vn({ opacity: a(s).isDraggingRef.value && a(s).getSelection().find((y) => _.$el === y) ? "0.5 !important" : "" }),
      class: de(["vuefinder__item", "vf-item-" + a(s).explorerId]),
      "data-type": n.item.type,
      key: n.item.path,
      "data-item": JSON.stringify(n.item),
      "data-index": n.index,
      onDblclick: g[0] || (g[0] = (y) => o(n.item)),
      onTouchstart: g[1] || (g[1] = (y) => h(y)),
      onTouchend: g[2] || (g[2] = (y) => v()),
      onContextmenu: g[3] || (g[3] = et((y) => a(e).emitter.emit("vf-contextmenu-show", { event: y, items: a(s).getSelected(), target: n.item }), ["prevent"]))
    }, [
      Lt(_.$slots, "default"),
      a(e).pinnedFolders.find((y) => y.path === n.item.path) ? (p(), X(a(Wo), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : j("", !0)
    ], 46, Uu)), [
      [c, n.item]
    ]);
  }
}, Hu = { class: "vuefinder__explorer__container" }, Bu = {
  key: 0,
  class: "vuefinder__explorer__header"
}, qu = { class: "vuefinder__explorer__drag-item" }, Nu = {
  key: 0,
  class: "vuefinder__linear-loader absolute"
}, Pu = { class: "vuefinder__explorer__item-list-content" }, zu = { class: "vuefinder__explorer__item-list-name" }, ju = { class: "vuefinder__explorer__item-name" }, Gu = { class: "vuefinder__explorer__item-path" }, Wu = { class: "vuefinder__explorer__item-list-content" }, Yu = { class: "vuefinder__explorer__item-list-name" }, Ku = { class: "vuefinder__explorer__item-name" }, Xu = { class: "vuefinder__explorer__item-size" }, Zu = { class: "vuefinder__explorer__item-date" }, Ju = { class: "vuefinder__explorer__item-grid-content" }, Qu = ["data-src", "alt"], ef = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, tf = { class: "vuefinder__explorer__item-title break-all" }, nf = {
  __name: "Explorer",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = (v) => v == null ? void 0 : v.substring(0, 3), o = V(null), c = V(""), d = e.dragSelect;
    let u;
    e.emitter.on("vf-fullscreen-toggle", () => {
      d.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: v }) => {
      c.value = v, v ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: v
        },
        onSuccess: (h) => {
          h.files.length || e.emitter.emit("vf-toast-push", { label: s("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const i = pt({ active: !1, column: "", order: "" }), f = (v = !0) => {
      let h = [...e.fs.data.files], _ = i.column, g = i.order === "asc" ? 1 : -1;
      if (!v)
        return h;
      const y = (S, O) => typeof S == "string" && typeof O == "string" ? S.toLowerCase().localeCompare(O.toLowerCase()) : S < O ? -1 : S > O ? 1 : 0;
      return i.active && (h = h.slice().sort((S, O) => y(S[_], O[_]) * g)), h;
    }, m = (v) => {
      i.active && i.column === v ? (i.active = i.order === "asc", i.column = v, i.order = "desc") : (i.active = !0, i.column = v, i.order = "asc");
    };
    return Ee(() => {
      u = new gr(d.area.value);
    }), Bs(() => {
      u.update();
    }), Ns(() => {
      u.destroy();
    }), (v, h) => (p(), b("div", Hu, [
      a(e).view === "list" || c.value.length ? (p(), b("div", Bu, [
        l("div", {
          onClick: h[0] || (h[0] = (_) => m("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          Q(w(a(s)("Name")) + " ", 1),
          he(W(en, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Ge, i.active && i.column === "basename"]
          ])
        ]),
        c.value.length ? j("", !0) : (p(), b("div", {
          key: 0,
          onClick: h[1] || (h[1] = (_) => m("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          Q(w(a(s)("Size")) + " ", 1),
          he(W(en, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Ge, i.active && i.column === "file_size"]
          ])
        ])),
        c.value.length ? j("", !0) : (p(), b("div", {
          key: 1,
          onClick: h[2] || (h[2] = (_) => m("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          Q(w(a(s)("Date")) + " ", 1),
          he(W(en, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [Ge, i.active && i.column === "last_modified"]
          ])
        ])),
        c.value.length ? (p(), b("div", {
          key: 2,
          onClick: h[3] || (h[3] = (_) => m("path")),
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
      l("div", qu, [
        W(Wd, {
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
        onContextmenu: h[4] || (h[4] = et((_) => a(e).emitter.emit("vf-contextmenu-show", { event: _, items: a(d).getSelected() }), ["self", "prevent"]))
      }, [
        a(e).loadingIndicator === "linear" && a(e).fs.loading ? (p(), b("div", Nu)) : j("", !0),
        c.value.length ? (p(!0), b(ke, { key: 1 }, Ce(f(), (_, g) => (p(), X(In, {
          item: _,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-list"
        }, {
          default: ne(() => [
            l("div", Pu, [
              l("div", zu, [
                W(Fn, {
                  type: _.type,
                  small: a(e).compactListView
                }, null, 8, ["type", "small"]),
                l("span", ju, w(_.basename), 1)
              ]),
              l("div", Gu, w(_.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : j("", !0),
        a(e).view === "list" && !c.value.length ? (p(!0), b(ke, { key: 2 }, Ce(f(), (_, g) => (p(), X(In, {
          item: _,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: _.path
        }, {
          default: ne(() => [
            l("div", Wu, [
              l("div", Yu, [
                W(Fn, {
                  type: _.type,
                  small: a(e).compactListView
                }, null, 8, ["type", "small"]),
                l("span", Ku, w(_.basename), 1)
              ]),
              l("div", Xu, w(_.file_size ? a(e).filesize(_.file_size) : ""), 1),
              l("div", Zu, w(a(jo)(_.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : j("", !0),
        a(e).view === "grid" && !c.value.length ? (p(!0), b(ke, { key: 3 }, Ce(f(!1), (_, g) => (p(), X(In, {
          item: _,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: ne(() => [
            l("div", null, [
              l("div", Ju, [
                (_.mime_type ?? "").startsWith("image") && a(e).showThumbnails ? (p(), b("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": a(e).requester.getPreviewUrl(a(e).fs.adapter, _),
                  alt: _.basename,
                  key: _.path
                }, null, 8, Qu)) : (p(), X(Fn, {
                  key: 1,
                  type: _.type
                }, null, 8, ["type"])),
                !((_.mime_type ?? "").startsWith("image") && a(e).showThumbnails) && _.type !== "dir" ? (p(), b("div", ef, w(r(_.extension)), 1)) : j("", !0)
              ]),
              l("span", tf, w(a(Zn)(_.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : j("", !0)
      ], 544),
      W(Dd)
    ]));
  }
}, sf = ["href", "download"], of = ["onClick"], rf = {
  __name: "ContextMenu",
  setup(n) {
    const e = le("ServiceContainer"), s = V(null), r = V([]), o = V(""), c = pt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    });
    e.emitter.on("vf-context-selected", (f) => {
      r.value = f;
    });
    const d = (f) => f.link(e, r), u = (f) => {
      e.emitter.emit("vf-contextmenu-hide"), f.action(e, r);
    };
    e.emitter.on("vf-search-query", ({ newQuery: f }) => {
      o.value = f;
    }), e.emitter.on("vf-contextmenu-show", ({ event: f, items: m, target: v = null }) => {
      if (c.items = e.contextMenuItems.filter((h) => h.show(e, {
        searchQuery: o.value,
        items: m,
        target: v
      })), o.value)
        if (v)
          e.emitter.emit("vf-context-selected", [v]);
        else
          return;
      else !v && !o.value ? e.emitter.emit("vf-context-selected", []) : m.length > 1 && m.some((h) => h.path === v.path) ? e.emitter.emit("vf-context-selected", m) : e.emitter.emit("vf-context-selected", [v]);
      i(f);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const i = (f) => {
      const m = e.dragSelect.area.value, v = e.root.getBoundingClientRect(), h = m.getBoundingClientRect();
      let _ = f.clientX - v.left, g = f.clientY - v.top;
      c.active = !0, _t(() => {
        var I;
        const y = (I = s.value) == null ? void 0 : I.getBoundingClientRect();
        let S = (y == null ? void 0 : y.height) ?? 0, O = (y == null ? void 0 : y.width) ?? 0;
        _ = h.right - f.pageX + window.scrollX < O ? _ - O : _, g = h.bottom - f.pageY + window.scrollY < S ? g - S : g, c.positions = {
          left: _ + "px",
          top: g + "px"
        };
      });
    };
    return (f, m) => he((p(), b("ul", {
      ref_key: "contextmenu",
      ref: s,
      style: vn(c.positions),
      class: "vuefinder__context-menu"
    }, [
      (p(!0), b(ke, null, Ce(c.items, (v) => (p(), b("li", {
        class: "vuefinder__context-menu__item",
        key: v.title
      }, [
        v.link && v.type === "file" ? (p(), b("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: d(v),
          download: d(v),
          onClick: m[0] || (m[0] = (h) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          l("span", null, w(v.title(a(e).i18n)), 1)
        ], 8, sf)) : (p(), b("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => u(v)
        }, [
          l("span", null, w(v.title(a(e).i18n)), 1)
        ], 8, of))
      ]))), 128))
    ], 4)), [
      [Ge, c.active]
    ]);
  }
}, af = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function lf(n, e) {
  return p(), b("svg", af, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ]));
}
const Yo = { render: lf }, cf = { class: "vuefinder__status-bar__wrapper" }, df = { class: "vuefinder__status-bar__space" }, uf = { class: "vuefinder__status-bar__space-container" }, ff = { class: "vuefinder__status-bar__space-icon" }, vf = { class: "vuefinder__status-bar__space-text" }, _f = {
  __name: "Statusbar",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, { setStore: r } = e.storage, o = e.dragSelect, c = V("");
    e.emitter.on("vf-search-query", ({ newQuery: m }) => {
      c.value = m;
    }), je(() => {
      const m = e.selectButton.multiple ? o.getSelected().length > 0 : o.getSelected().length === 1;
      return e.selectButton.active && m;
    });
    const d = je(() => {
      var v, h;
      const m = (h = (v = e.fs) == null ? void 0 : v.data) == null ? void 0 : h.used_space;
      return typeof m == "number" ? m.toFixed(2) : "0.00";
    }), u = je(() => {
      var v, h;
      const m = (h = (v = e.fs) == null ? void 0 : v.data) == null ? void 0 : h.total_space;
      return typeof m == "number" ? m.toFixed(2) : "0.00";
    }), i = je(() => {
      var h, _, g, y;
      const m = (_ = (h = e.fs) == null ? void 0 : h.data) == null ? void 0 : _.used_space, v = (y = (g = e.fs) == null ? void 0 : g.data) == null ? void 0 : y.total_space;
      return typeof m == "number" && typeof v == "number" && v !== 0 ? (m / v * 100).toFixed(2) : "0.00";
    }), f = je(() => `Used ${d.value}Mb out of ${u.value}Mb (${i.value}%)`);
    return (m, v) => (p(), b("div", cf, [
      l("div", df, [
        l("div", uf, [
          l("span", ff, [
            W(a(Yo))
          ]),
          l("span", vf, w(f.value), 1)
        ])
      ]),
      v[0] || (v[0] = l("div", { class: "vuefinder__status-bar__actions" }, null, -1))
    ]));
  }
}, mf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function pf(n, e) {
  return p(), b("svg", mf, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ]));
}
const Ko = { render: pf }, hf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function gf(n, e) {
  return p(), b("svg", hf, e[0] || (e[0] = [
    l("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ]));
}
const bf = { render: gf }, wf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function yf(n, e) {
  return p(), b("svg", wf, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ]));
}
const Xo = { render: yf }, kf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function xf(n, e) {
  return p(), b("svg", kf, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M9 12h6" }, null, -1)
  ]));
}
const Zo = { render: xf };
function Jo(n, e) {
  const s = n.findIndex((r) => r.path === e.path);
  s > -1 ? n[s] = e : n.push(e);
}
const Sf = { class: "vuefinder__folder-loader-indicator" }, $f = {
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
    const e = n, s = le("ServiceContainer"), { t: r } = s.i18n, o = Ps(n, "modelValue"), c = V(!1);
    Oe(
      () => o.value,
      () => {
        var i;
        return ((i = d()) == null ? void 0 : i.folders.length) || u();
      }
    );
    function d() {
      return s.treeViewData.find((i) => i.path === e.path);
    }
    const u = () => {
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
    return (i, f) => {
      var m;
      return p(), b("div", Sf, [
        c.value ? (p(), X(a(ms), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (p(), b("div", $f, [
          o.value && ((m = d()) != null && m.folders.length) ? (p(), X(a(Zo), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : j("", !0),
          o.value ? j("", !0) : (p(), X(a(Xo), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Cf = { class: "vuefinder__treesubfolderlist__item-content" }, Ef = ["onClick"], Tf = ["title", "onClick"], Af = { class: "vuefinder__treesubfolderlist__item-icon" }, Mf = { class: "vuefinder__treesubfolderlist__subfolder" }, Df = {
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
      r.path === r.adapter + "://" && Ne(o.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const c = je(() => {
      var d;
      return ((d = e.treeViewData.find((u) => u.path === r.path)) == null ? void 0 : d.folders) || [];
    });
    return (d, u) => {
      const i = ur("TreeSubfolderList", !0);
      return p(), b("ul", {
        ref_key: "parentSubfolderList",
        ref: o,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (p(!0), b(ke, null, Ce(c.value, (f, m) => (p(), b("li", {
          key: f.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          l("div", Cf, [
            l("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (v) => s.value[f.path] = !s.value[f.path]
            }, [
              W(Qo, {
                adapter: n.adapter,
                path: f.path,
                modelValue: s.value[f.path],
                "onUpdate:modelValue": (v) => s.value[f.path] = v
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Ef),
            l("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: f.path,
              onClick: (v) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r.adapter, path: f.path } })
            }, [
              l("div", Af, [
                a(e).fs.path === f.path ? (p(), X(a(Ko), { key: 0 })) : (p(), X(a(xn), { key: 1 }))
              ]),
              l("div", {
                class: de(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": a(e).fs.path === f.path
                }])
              }, w(f.basename), 3)
            ], 8, Tf)
          ]),
          l("div", Mf, [
            he(W(i, {
              adapter: r.adapter,
              path: f.path
            }, null, 8, ["adapter", "path"]), [
              [Ge, s.value[f.path]]
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
    const e = le("ServiceContainer"), { setStore: s } = e.storage, r = V(!1);
    function o(c) {
      c === e.fs.adapter ? r.value = !r.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: c } }), s("adapter", c));
    }
    return (c, d) => (p(), b(ke, null, [
      l("div", {
        onClick: d[2] || (d[2] = (u) => o(n.storage)),
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
          onClick: d[1] || (d[1] = et((u) => r.value = !r.value, ["stop"]))
        }, [
          W(Qo, {
            adapter: n.storage,
            path: n.storage + "://",
            modelValue: r.value,
            "onUpdate:modelValue": d[0] || (d[0] = (u) => r.value = u)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      he(W(Df, {
        adapter: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [Ge, r.value]
      ])
    ], 64));
  }
}, Of = { class: "vuefinder__folder-indicator" }, Vf = { class: "vuefinder__folder-indicator--icon" }, Ff = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = Ps(n, "modelValue");
    return (s, r) => (p(), b("div", Of, [
      l("div", Vf, [
        e.value ? (p(), X(a(Zo), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : j("", !0),
        e.value ? j("", !0) : (p(), X(a(Xo), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, If = { class: "vuefinder__treeview__header" }, Rf = { class: "vuefinder__treeview__pinned-label" }, Uf = { class: "vuefinder__treeview__pin-text text-nowrap" }, Hf = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Bf = { class: "vuefinder__treeview__pinned-item" }, qf = ["onClick"], Nf = ["title"], Pf = ["onClick"], zf = { key: 0 }, jf = { class: "vuefinder__treeview__no-pinned" }, Gf = { class: "vuefinder__treeview__storage" }, Wf = {
  __name: "TreeView",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, { getStore: r, setStore: o } = e.storage, c = V(190), d = V(r("pinned-folders-opened", !0));
    Oe(d, (m) => o("pinned-folders-opened", m));
    const u = (m) => {
      e.pinnedFolders = e.pinnedFolders.filter((v) => v.path !== m.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, i = (m) => {
      const v = m.clientX, h = m.target.parentElement, _ = h.getBoundingClientRect().width;
      h.classList.remove("transition-[width]"), h.classList.add("transition-none");
      const g = (S) => {
        c.value = _ + S.clientX - v, c.value < 50 && (c.value = 0, e.showTreeView = !1), c.value > 50 && (e.showTreeView = !0);
      }, y = () => {
        const S = h.getBoundingClientRect();
        c.value = S.width, h.classList.add("transition-[width]"), h.classList.remove("transition-none"), window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", y);
      };
      window.addEventListener("mousemove", g), window.addEventListener("mouseup", y);
    }, f = V(null);
    return Ee(() => {
      Ne(f.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Oe(e.fs.data, (m, v) => {
      const h = m.files.filter((_) => _.type === "dir");
      Jo(e.treeViewData, { path: e.fs.path, folders: h.map((_) => ({
        adapter: _.storage,
        path: _.path,
        basename: _.basename
      })) });
    }), (m, v) => (p(), b(ke, null, [
      l("div", {
        onClick: v[0] || (v[0] = (h) => a(e).showTreeView = !a(e).showTreeView),
        class: de(["vuefinder__treeview__overlay", a(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      l("div", {
        style: vn(a(e).showTreeView ? "min-width:100px;max-width:75%; width: " + c.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        l("div", {
          ref_key: "treeViewScrollElement",
          ref: f,
          class: "vuefinder__treeview__scroll"
        }, [
          l("div", If, [
            l("div", {
              onClick: v[2] || (v[2] = (h) => d.value = !d.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              l("div", Rf, [
                W(a(Wo), { class: "vuefinder__treeview__pin-icon" }),
                l("div", Uf, w(a(s)("Pinned Folders")), 1)
              ]),
              W(Ff, {
                modelValue: d.value,
                "onUpdate:modelValue": v[1] || (v[1] = (h) => d.value = h)
              }, null, 8, ["modelValue"])
            ]),
            d.value ? (p(), b("ul", Hf, [
              (p(!0), b(ke, null, Ce(a(e).pinnedFolders, (h) => (p(), b("li", Bf, [
                l("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (_) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: h.storage, path: h.path } })
                }, [
                  a(e).fs.path !== h.path ? (p(), X(a(xn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : j("", !0),
                  a(e).fs.path === h.path ? (p(), X(a(Ko), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : j("", !0),
                  l("div", {
                    title: h.path,
                    class: de(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": a(e).fs.path === h.path
                    }])
                  }, w(h.basename), 11, Nf)
                ], 8, qf),
                l("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (_) => u(h)
                }, [
                  W(a(bf), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Pf)
              ]))), 256)),
              a(e).pinnedFolders.length ? j("", !0) : (p(), b("li", zf, [
                l("div", jf, w(a(s)("No folders pinned")), 1)
              ]))
            ])) : j("", !0)
          ]),
          (p(!0), b(ke, null, Ce(a(e).fs.data.storages, (h) => (p(), b("div", Gf, [
            W(Lf, { storage: h }, null, 8, ["storage"])
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
class Yf {
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
    const r = (d) => d.items.length > 1 && d.items.some((u) => {
      var i;
      return u.path === ((i = d.target) == null ? void 0 : i.path);
    }) ? "many" : d.target ? "one" : null;
    return !(this.options.needsSearchQuery !== !!s.searchQuery || this.options.target !== void 0 && this.options.target !== r(s) || this.options.targetType !== void 0 && this.options.targetType !== ((o = s.target) == null ? void 0 : o.type) || this.options.mimeType !== void 0 && this.options.mimeType !== ((c = s.target) == null ? void 0 : c.mime_type) || this.options.feature !== void 0 && !e.features.includes(this.options.feature) || this.options.show !== void 0 && !this.options.show(e, s));
  }
}
function He(n, e) {
  return n.map((s) => new Yf(s.title, s.action, s.link, {
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
    action: (n, e) => n.modal.open(No, { items: e })
  },
  rename: {
    key: _e.RENAME,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(_s, { items: e })
  }
}, Kf = [
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
], Xf = { class: "vuefinder__main__content" }, Zf = {
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
      default: () => Kf
    }
  },
  emits: ["select", "update:path"],
  setup(n, { emit: e }) {
    const s = e, r = n, o = Fa(r, le("VueFinderOptions"));
    fr("ServiceContainer", o);
    const { setStore: c } = o.storage, d = V(null);
    o.root = d;
    const u = o.dragSelect;
    _i(o);
    const i = (v) => {
      Object.assign(o.fs.data, v), u.clearSelection(), u.refreshSelection();
    };
    let f;
    o.emitter.on("vf-fetch-abort", () => {
      f.abort(), o.fs.loading = !1;
    }), o.emitter.on(
      "vf-fetch",
      async ({
        params: v,
        body: h = null,
        onSuccess: _ = null,
        onError: g = null,
        noCloseModal: y = !1
      }) => {
        ["index", "search"].includes(v.q) && (f && f.abort(), o.fs.loading = !0), f = new AbortController();
        const S = f.signal, O = r.request.getToken ? await r.request.getToken() : null;
        if (v.q === "download") {
          const I = r.request.baseUrl, D = v.m || "POST", x = new URLSearchParams(v).toString(), F = `${I}?${x}`;
          fetch(F, {
            method: D,
            headers: {
              ...r.request.headers,
              ...O ? { Authorization: `Bearer ${O}` } : {}
            },
            body: h ? h instanceof FormData ? h : JSON.stringify(h) : null,
            abortSignal: S
          }).then((U) => {
            const $ = U.headers.get("Content-Disposition");
            let C = "folder.zip";
            if ($ && $.includes("filename=")) {
              const k = $.match(/filename="?([^"]+)"?/);
              k && k[1] && (C = k[1]);
            }
            return U.blob().then((k) => ({ blob: k, filename: C }));
          }).then(({ blob: U, filename: $ }) => {
            const C = window.URL.createObjectURL(U), k = document.createElement("a");
            k.href = C, k.download = $, document.body.appendChild(k), k.click(), k.remove(), window.URL.revokeObjectURL(C);
          }).catch((U) => {
            console.error("Download error", U);
          });
          return;
        }
        o.requester.send({
          url: "",
          method: v.m || "get",
          params: v,
          body: h,
          abortSignal: S,
          headers: {
            ...r.request.headers || {},
            ...O ? { Authorization: `Bearer ${O}` } : {}
          }
        }).then((I) => {
          o.fs.adapter = I.adapter, o.persist && (o.fs.path = I.dirname, c("path", o.fs.path)), y || o.modal.close(), i(I), _ && _(I);
        }).catch((I) => {
          console.error(I), g && g(I);
        }).finally(() => {
          ["index", "search"].includes(v.q) && (o.fs.loading = !1);
        });
      }
    ), o.emitter.on("vf-download", ({ item: v }) => {
      o.emitter.emit("vf-fetch", {
        params: {
          q: "download",
          m: "post",
          adapter: o.fs.adapter,
          path: o.fs.data.dirname
        },
        body: {
          path: v.path
        },
        onSuccess: () => {
          o.emitter.emit("vf-toast-push", { label: t("The folder downloaded.") });
        },
        onError: (h) => {
          onError(h);
        }
      });
    });
    function m(v) {
      let h = {};
      v && v.includes("://") && (h = {
        adapter: v.split("://")[0],
        path: v
      }), o.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: o.fs.adapter, ...h },
        onError: r.onError ?? ((_) => {
          _.message && o.emitter.emit("vf-toast-push", {
            label: _.message,
            type: "error"
          });
        })
      });
    }
    return Ee(() => {
      m(o.fs.path), Oe(
        () => r.path,
        (v) => {
          m(v);
        }
      ), u.onSelect((v) => {
        s("select", v);
      }), Oe(
        () => o.fs.data.dirname,
        (v) => {
          s("update:path", v);
        }
      );
    }), (v, h) => (p(), b("div", {
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
          onMousedown: h[0] || (h[0] = (_) => a(o).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: h[1] || (h[1] = (_) => a(o).emitter.emit("vf-contextmenu-hide"))
        }, [
          W(Mc),
          W(Ad),
          l("div", Xf, [
            W(Wf),
            W(nf)
          ]),
          W(_f)
        ], 38),
        W(vr, { name: "fade" }, {
          default: ne(() => [
            a(o).modal.visible ? (p(), X(qs(a(o).modal.type), { key: 0 })) : j("", !0)
          ]),
          _: 1
        }),
        W(rf)
      ], 2)
    ], 512));
  }
}, lv = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", Zf);
  }
};
export {
  Yf as SimpleContextMenuItem,
  Kf as contextMenuItems,
  lv as default
};
