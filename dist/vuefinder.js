var or = Object.defineProperty;
var rr = (n, e, s) => e in n ? or(n, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[e] = s;
var Tn = (n, e, s) => rr(n, typeof e != "symbol" ? e + "" : e, s);
import { reactive as pt, watch as Oe, ref as L, shallowRef as ar, onMounted as Ee, onUnmounted as Qn, onUpdated as Bs, nextTick as _t, computed as je, inject as le, createElementBlock as b, openBlock as p, withKeys as It, unref as a, createElementVNode as l, withModifiers as et, renderSlot as Lt, normalizeClass as de, toDisplayString as w, createBlock as Z, resolveDynamicComponent as Ns, withCtx as se, createVNode as W, createCommentVNode as j, Fragment as ke, renderList as Ce, withDirectives as he, vModelCheckbox as Zt, createTextVNode as ee, vModelSelect as bs, vModelText as Rt, onBeforeUnmount as qs, customRef as lr, vShow as Ge, isRef as ir, TransitionGroup as cr, normalizeStyle as vn, mergeModels as dr, useModel as Ps, resolveComponent as ur, provide as fr, Transition as vr } from "vue";
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
    const o = Object.assign({}, s.headers, r, e.headers), i = Object.assign({}, s.params, e.params), d = e.body, f = s.baseUrl + e.url, c = e.method;
    let u;
    c !== "get" && (d instanceof FormData ? (u = d, s.body != null && Object.entries(this.config.body).forEach(([v, g]) => {
      u.append(v, g);
    })) : (u = { ...d }, s.body != null && Object.assign(u, this.config.body)));
    const m = {
      url: f,
      method: c,
      headers: o,
      params: i,
      body: u
    };
    if (s.transformRequest != null) {
      const v = s.transformRequest({
        url: f,
        method: c,
        headers: o,
        params: i,
        body: u
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
    }, i = s.url + "?" + new URLSearchParams(s.params);
    if (s.method !== "get" && s.body != null) {
      let f;
      s.body instanceof FormData ? f = e.body : (f = JSON.stringify(s.body), o.headers["Content-Type"] = "application/json"), o.body = f;
    }
    this.config.fetchParams && Object.assign(o, this.config.fetchParams);
    const d = await this.customFetch(i, o);
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
  function o(c, u) {
    s[c] = u;
  }
  function i(c) {
    delete s[c];
  }
  function d() {
    Object.keys(s).map((c) => i(c));
  }
  return { getStore: (c, u = null) => u, setStore: o, removeStore: i, clearStore: d };
}
async function xr(n, e) {
  const s = e[n];
  return typeof s == "function" ? (await s()).default : s;
}
function Sr(n, e, s, r) {
  const { getStore: o, setStore: i } = n, d = L({}), f = pt(r), c = L(o("locale", e)), u = (_, h = e) => {
    if (!f[_]) {
      s.emit("vf-toast-push", {
        label: `Locale "${_}" is not available.`,
        type: "error"
      });
      return;
    }
    xr(_, f).then((y) => {
      d.value = y, i("locale", _), i("translations", y), c.value = _, s.emit("vf-language-saved");
    }).catch((y) => {
      h && _ !== h && u(h, null);
    });
  };
  Oe(c, (_) => {
    u(_);
  }), f && Object.keys(f).length > 0 ? u(c.value) : d.value = o("translations") ?? {};
  const m = (_, h) => {
    f[_] = h;
  };
  o("locale") || u(e);
  const v = (_, ...h) => h.length ? v(_.replace("%s", h.shift()), ...h) : _;
  function g(_, ...h) {
    const y = f[c.value] || {};
    return y.hasOwnProperty(_) ? v(y[_], ...h) : v(_, ...h);
  }
  return pt({ t: g, locale: c, addLocale: m, changeLocale: u });
}
const me = {
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
}, $r = Object.values(me), Cr = "2.8.0";
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
  const s = L(rt.SYSTEM), r = L(rt.LIGHT);
  s.value = n.getStore("theme", e ?? rt.SYSTEM);
  const o = window.matchMedia("(prefers-color-scheme: dark)"), i = (d) => {
    s.value === rt.DARK || s.value === rt.SYSTEM && d.matches ? r.value = rt.DARK : r.value = rt.LIGHT;
  };
  return i(o), o.addEventListener("change", i), {
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
      s.value = d, d !== rt.SYSTEM ? n.setStore("theme", d) : n.removeStore("theme"), i(o);
    }
  };
}
function Ar() {
  const n = ar(null), e = L(!1), s = L();
  return { visible: e, type: n, data: s, open: (i, d = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, n.value = i, s.value = d;
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
  let i = s, d;
  const f = (m, v) => {
    const g = i, _ = m, h = v || (r ? !r(g, _) : g !== _);
    return (h || o) && (i = _, d = g), [i, h, d];
  };
  return [e ? (m) => f(e(i, d), m) : f, (m) => [i, !!m, d]];
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
    return ie(s, (i) => {
      const d = n[i], f = e[i];
      d !== f && (o = !1);
    }), o;
  }
  return !1;
}, oo = (n, e) => wn(n, e, ["w", "h"]), tn = (n, e) => wn(n, e, ["x", "y"]), Vr = (n, e) => wn(n, e, ["t", "r", "b", "l"]), lt = () => {
}, J = (n, ...e) => n.bind(0, ...e), bt = (n) => {
  let e;
  const s = n ? rn : es, r = n ? Un : Ws;
  return [(o) => {
    r(e), e = s(() => o(), Be(n) ? n() : n);
  }, () => r(e)];
}, dn = (n, e) => {
  const { _: s, p: r, v: o, S: i } = e || {};
  let d, f, c, u, m = lt;
  const v = function(F) {
    m(), Un(d), u = d = f = void 0, m = lt, n.apply(this, F);
  }, g = (y) => i && f ? i(f, y) : y, _ = () => {
    m !== lt && v(g(c) || c);
  }, h = function() {
    const F = ct(arguments), S = Be(s) ? s() : s;
    if (Ye(S) && S >= 0) {
      const M = Be(r) ? r() : r, x = Ye(M) && M >= 0, V = S > 0 ? rn : es, R = S > 0 ? Un : Ws, E = g(F) || F, k = v.bind(0, E);
      let T;
      m(), o && !u ? (k(), u = !0, T = V(() => u = void 0, S)) : (T = V(k, S), x && !d && (d = rn(_, M))), m = () => R(T), f = c = E;
    } else
      v(F);
  };
  return h.m = _, h;
}, ro = (n, e) => Object.prototype.hasOwnProperty.call(n, e), Ne = (n) => n ? Object.keys(n) : [], re = (n, e, s, r, o, i, d) => {
  const f = [e, s, r, o, i, d];
  return (typeof n != "object" || mn(n)) && !Be(n) && (n = {}), ie(f, (c) => {
    ie(c, (u, m) => {
      const v = c[m];
      if (n === v)
        return !0;
      const g = Ke(v);
      if (v && ln(v)) {
        const _ = n[m];
        let h = _;
        g && !Ke(_) ? h = [] : !g && !ln(_) && (h = {}), n[m] = re(h, v);
      } else
        n[m] = g ? v.slice() : v;
    });
  }), n;
}, ao = (n, e) => ie(re({}, n), (s, r, o) => {
  s === void 0 ? delete o[r] : s && ln(s) && (o[r] = ao(s));
}), os = (n) => !Ne(n).length, lo = (n, e, s) => Gs(n, Dr(e, s)), mt = (n) => Bn((Ke(n) ? n : (n || "").split(" ")).filter((e) => e)), rs = (n, e) => n && n.getAttribute(e), ks = (n, e) => n && n.hasAttribute(e), Je = (n, e, s) => {
  ie(mt(e), (r) => {
    n && n.setAttribute(r, String(s || ""));
  });
}, ze = (n, e) => {
  ie(mt(e), (s) => n && n.removeAttribute(s));
}, yn = (n, e) => {
  const s = mt(rs(n, e)), r = J(Je, n, e), o = (i, d) => {
    const f = new Set(s);
    return ie(mt(i), (c) => {
      f[d](c);
    }), ct(f).join(" ");
  };
  return {
    O: (i) => r(o(i, "delete")),
    $: (i) => r(o(i, "add")),
    C: (i) => {
      const d = mt(i);
      return d.reduce((f, c) => f && s.includes(c), d.length > 0);
    }
  };
}, io = (n, e, s) => (yn(n, e).O(s), J(as, n, e, s)), as = (n, e, s) => (yn(n, e).$(s), J(io, n, e, s)), un = (n, e, s, r) => (r ? as : io)(n, e, s), ls = (n, e, s) => yn(n, e).C(s), co = (n) => yn(n, "class"), uo = (n, e) => {
  co(n).O(e);
}, is = (n, e) => (co(n).$(e), J(uo, n, e)), fo = (n, e) => {
  const s = e ? hn(e) && e : document;
  return s ? ct(s.querySelectorAll(n)) : [];
}, Fr = (n, e) => {
  const s = e ? hn(e) && e : document;
  return s && s.querySelector(n);
}, Nn = (n, e) => hn(n) && n.matches(e), vo = (n) => Nn(n, "body"), qn = (n) => n ? ct(n.childNodes) : [], Vt = (n) => n && n.parentElement, wt = (n, e) => hn(n) && n.closest(e), Pn = (n) => document.activeElement, Ir = (n, e, s) => {
  const r = wt(n, e), o = n && Fr(s, r), i = wt(o, e) === r;
  return r && o ? r === n || o === n || i && wt(wt(n, s), e) !== r : !1;
}, St = (n) => {
  ie(ss(n), (e) => {
    const s = Vt(e);
    e && s && s.removeChild(e);
  });
}, Le = (n, e) => J(St, n && e && ie(ss(e), (s) => {
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
  return e.innerHTML = s ? s.createHTML(r) : r, ie(qn(e), (o) => St(o));
}, xs = (n, e) => n.getPropertyValue(e) || n[e] || "", po = (n) => {
  const e = n || 0;
  return isFinite(e) ? e : 0;
}, Jt = (n) => po(parseFloat(n || "")), zn = (n) => Math.round(n * 1e4) / 1e4, ho = (n) => `${zn(po(n))}px`;
function Ft(n, e) {
  n && e && ie(e, (s, r) => {
    try {
      const o = n.style, i = mn(s) || pn(s) ? "" : Ye(s) ? ho(s) : s;
      r.indexOf("--") === 0 ? o.setProperty(r, i) : o[r] = i;
    } catch {
    }
  });
}
function tt(n, e, s) {
  const r = Ut(e);
  let o = r ? "" : {};
  if (n) {
    const i = Ve.getComputedStyle(n, s) || n.style;
    o = r ? xs(i, e) : ct(e).reduce((d, f) => (d[f] = xs(i, f), d), o);
  }
  return o;
}
const Ss = (n, e, s) => {
  const r = e ? `${e}-` : "", o = s ? `-${s}` : "", i = `${r}top${o}`, d = `${r}right${o}`, f = `${r}bottom${o}`, c = `${r}left${o}`, u = tt(n, [i, d, f, c]);
  return {
    t: Jt(u[i]),
    r: Jt(u[d]),
    b: Jt(u[f]),
    l: Jt(u[c])
  };
}, Mn = (n, e) => `translate${an(n) ? `(${n.x},${n.y})` : `${e ? "X" : "Y"}(${n})`}`, Hr = (n) => !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length), Br = {
  w: 0,
  h: 0
}, kn = (n, e) => e ? {
  w: e[`${n}Width`],
  h: e[`${n}Height`]
} : Br, Nr = (n) => kn("inner", n || Ve), kt = J(kn, "offset"), go = J(kn, "client"), fn = J(kn, "scroll"), cs = (n) => {
  const e = parseFloat(tt(n, gn)) || 0, s = parseFloat(tt(n, bn)) || 0;
  return {
    w: e - Rn(e),
    h: s - Rn(s)
  };
}, Dn = (n) => n.getBoundingClientRect(), qr = (n) => !!n && Hr(n), jn = (n) => !!(n && (n[bn] || n[gn])), bo = (n, e) => {
  const s = jn(n);
  return !jn(e) && s;
}, $s = (n, e, s, r) => {
  ie(mt(e), (o) => {
    n && n.removeEventListener(o, s, r);
  });
}, _e = (n, e, s, r) => {
  var o;
  const i = (o = r && r.H) != null ? o : !0, d = r && r.I || !1, f = r && r.A || !1, c = {
    passive: i,
    capture: d
  };
  return J(Re, mt(e).map((u) => {
    const m = f ? (v) => {
      $s(n, u, m, d), s && s(v);
    } : s;
    return n && n.addEventListener(u, m, c), J($s, n, u, m, d);
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
  const { D: s, M: r } = n, { w: o, h: i } = e, d = (v, g, _) => {
    let h = ws(v) * _, y = ws(g) * _;
    if (h === y) {
      const F = on(v), S = on(g);
      y = F > S ? 0 : y, h = F < S ? 0 : h;
    }
    return h = h === y ? 0 : h, [h + 0, y + 0];
  }, [f, c] = d(s.x, r.x, o), [u, m] = d(s.y, r.y, i);
  return {
    D: {
      x: f,
      y: u
    },
    M: {
      x: c,
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
  const r = (o, i, d) => lo(0, 1, (o - d) / (o - i) || 0);
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
  const e = /* @__PURE__ */ new Map(), s = (i, d) => {
    if (i) {
      const f = e.get(i);
      Es((c) => {
        f && f[c ? "delete" : "clear"](c);
      }, d);
    } else
      e.forEach((f) => {
        f.clear();
      }), e.clear();
  }, r = (i, d) => {
    if (Ut(i)) {
      const u = e.get(i) || /* @__PURE__ */ new Set();
      return e.set(i, u), Es((m) => {
        Be(m) && u.add(m);
      }, d), J(s, i, d);
    }
    pn(d) && d && s();
    const f = Ne(i), c = [];
    return ie(f, (u) => {
      const m = i[u];
      m && ge(c, r(u, m));
    }), J(Re, c);
  }, o = (i, d) => {
    ie(ct(e.get(i)), (f) => {
      d && !Hn(d) ? f.apply(0, d) : f();
    });
  };
  return r(n || {}), [r, s, o];
}, xo = {}, So = {}, zr = (n) => {
  ie(n, (e) => ie(e, (s, r) => {
    xo[r] = e[r];
  }));
}, $o = (n, e, s) => Ne(n).map((r) => {
  const { static: o, instance: i } = n[r], [d, f, c] = s || [], u = s ? i : o;
  if (u) {
    const m = s ? u(d, f, e) : u(e);
    return (c || So)[r] = m;
  }
}), Ht = (n) => So[n], jr = "__osOptionsValidationPlugin", Ct = "data-overlayscrollbars", nn = "os-environment", Qt = `${nn}-scrollbar-hidden`, On = `${Ct}-initialize`, sn = "noClipping", Ts = `${Ct}-body`, it = Ct, Gr = "host", Qe = `${Ct}-viewport`, Wr = no, Yr = so, Kr = "arrange", Co = "measuring", Xr = "scrolling", Eo = "scrollbarHidden", Zr = "noContent", Kn = `${Ct}-padding`, As = `${Ct}-content`, ds = "os-size-observer", Jr = `${ds}-appear`, Qr = `${ds}-listener`, ea = "os-trinsic-observer", ta = "os-theme-none", Ue = "os-scrollbar", na = `${Ue}-rtl`, sa = `${Ue}-horizontal`, oa = `${Ue}-vertical`, To = `${Ue}-track`, us = `${Ue}-handle`, ra = `${Ue}-visible`, aa = `${Ue}-cornerless`, Ms = `${Ue}-interaction`, Ds = `${Ue}-unusable`, Xn = `${Ue}-auto-hide`, Ls = `${Xn}-hidden`, Os = `${Ue}-wheel`, la = `${To}-interactive`, ia = `${us}-interactive`, ca = "__osSizeObserverPlugin", da = (n, e) => {
  const { T: s } = e, [r, o] = n("showNativeOverlaidScrollbars");
  return [r && s.x && s.y, o];
}, $t = (n) => n.indexOf(at) === 0, ua = (n, e) => {
  const s = (o, i, d, f) => {
    const c = o === at ? vt : o.replace(`${at}-`, ""), u = $t(o), m = $t(d);
    return !i && !f ? vt : u && m ? at : u ? i && f ? c : i ? at : vt : i ? c : m && f ? at : vt;
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
  const s = {}, r = Ot(Ne(e), Ne(n));
  return ie(r, (o) => {
    const i = n[o], d = e[o];
    if (an(i) && an(d))
      re(s[o] = {}, Mo(i, d)), os(s[o]) && delete s[o];
    else if (ro(e, o) && d !== i) {
      let f = !0;
      if (Ke(i) || Ke(d))
        try {
          Vs(i) === Vs(d) && (f = !1);
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
  const n = (x, V, R) => {
    Le(document.body, x), Le(document.body, x);
    const $ = go(x), E = kt(x), k = cs(V);
    return R && St(x), {
      x: E.h - $.h + k.h,
      y: E.w - $.w + k.w
    };
  }, e = (x) => {
    let V = !1;
    const R = is(x, Qt);
    try {
      V = tt(x, "scrollbar-width") === "none" || tt(x, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return R(), V;
  }, s = `.${nn}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${nn} div{width:200%;height:200%;margin:10px 0}.${Qt}{scrollbar-width:none!important}.${Qt}::-webkit-scrollbar,.${Qt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, o = mo(`<div class="${nn}"><div></div><style>${s}</style></div>`)[0], i = o.firstChild, d = o.lastChild, f = _a();
  f && (d.nonce = f);
  const [c, , u] = Yn(), [m, v] = Fe({
    o: n(o, i),
    i: tn
  }, J(n, o, i, !0)), [g] = v(), _ = e(o), h = {
    x: g.x === 0,
    y: g.y === 0
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
  }, F = re({}, va), S = J(re, {}, F), O = J(re, {}, y), M = {
    N: g,
    T: h,
    P: _,
    G: !!Dt,
    K: J(c, "r"),
    Z: O,
    tt: (x) => re(y, x) && O(),
    nt: S,
    ot: (x) => re(F, x) && S(),
    st: re({}, y),
    et: re({}, F)
  };
  if (ze(o, "style"), St(o), _e(Ve, "resize", () => {
    u("r", []);
  }), Be(Ve.matchMedia) && !_ && (!h.x || !h.y)) {
    const x = (V) => {
      const R = Ve.matchMedia(`(resolution: ${Ve.devicePixelRatio}dppx)`);
      _e(R, "change", () => {
        V(), x(V);
      }, {
        A: !0
      });
    };
    x(() => {
      const [V, R] = m();
      re(M.N, V), u("r", [R]);
    });
  }
  return M;
}, Xe = () => (Vn || (Vn = pa()), Vn), ha = (n, e, s) => {
  let r = !1;
  const o = s ? /* @__PURE__ */ new WeakMap() : !1, i = () => {
    r = !0;
  }, d = (f) => {
    if (o && s) {
      const c = s.map((u) => {
        const [m, v] = u || [];
        return [v && m ? (f || fo)(m, n) : [], v];
      });
      ie(c, (u) => ie(u[0], (m) => {
        const v = u[1], g = o.get(m) || [];
        if (n.contains(m) && v) {
          const h = _e(m, v, (y) => {
            r ? (h(), o.delete(m)) : e(y);
          });
          o.set(m, ge(g, h));
        } else
          Re(g), o.delete(m);
      }));
    }
  };
  return d(), [i, d];
}, Rs = (n, e, s, r) => {
  let o = !1;
  const { ct: i, rt: d, lt: f, it: c, ut: u, ft: m } = r || {}, v = dn(() => o && s(!0), {
    _: 33,
    p: 99
  }), [g, _] = ha(n, v, f), h = i || [], y = d || [], F = Ot(h, y), S = (M, x) => {
    if (!Hn(x)) {
      const V = u || lt, R = m || lt, $ = [], E = [];
      let k = !1, T = !1;
      if (ie(x, (I) => {
        const { attributeName: B, target: U, type: Y, oldValue: D, addedNodes: N, removedNodes: q } = I, oe = Y === "attributes", ne = Y === "childList", fe = n === U, X = oe && B, C = X && rs(U, B || ""), H = Ut(C) ? C : null, P = X && D !== H, A = Ys(y, B) && P;
        if (e && (ne || !fe)) {
          const G = oe && P, z = G && c && Nn(U, c), Q = (z ? !V(U, B, D, H) : !oe || G) && !R(I, !!z, n, r);
          ie(N, (ae) => ge($, ae)), ie(q, (ae) => ge($, ae)), T = T || Q;
        }
        !e && fe && P && !V(U, B, D, H) && (ge(E, B), k = k || A);
      }), _((I) => Bn($).reduce((B, U) => (ge(B, fo(I, U)), Nn(U, I) ? ge(B, U) : B), [])), e)
        return !M && T && s(!1), [!1];
      if (!Hn(E) || k) {
        const I = [Bn(E), k];
        return M || s.apply(0, I), I;
      }
    }
  }, O = new Lr(J(S, !1));
  return [() => (O.observe(n, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: F,
    subtree: e,
    childList: e,
    characterData: e
  }), o = !0, () => {
    o && (g(), O.disconnect(), o = !1);
  }), () => {
    if (o)
      return v.m(), S(!0, O.takeRecords());
  }];
};
let ft = null;
const Lo = (n, e, s) => {
  const { _t: r } = s || {}, o = Ht(ca), [i] = Fe({
    o: !1,
    u: !0
  });
  return () => {
    const d = [], c = mo(`<div class="${ds}"><div class="${Qr}"></div></div>`)[0], u = c.firstChild, m = (v) => {
      const g = v instanceof ResizeObserverEntry;
      let _ = !1, h = !1;
      if (g) {
        const [y, , F] = i(v.contentRect), S = jn(y);
        h = bo(y, F), _ = !h && !S;
      } else
        h = v === !0;
      _ || e({
        dt: !0,
        _t: h
      });
    };
    if (gt) {
      if (!pn(ft)) {
        const h = new gt(lt);
        h.observe(n, {
          get box() {
            ft = !0;
          }
        }), ft = ft || !1, h.disconnect();
      }
      const v = dn(m, {
        _: 0,
        p: 0
      }), g = (h) => v(h.pop()), _ = new gt(g);
      if (_.observe(ft ? n : u), ge(d, [() => _.disconnect(), !ft && Le(n, c)]), ft) {
        const h = new gt(g);
        h.observe(n, {
          box: "border-box"
        }), ge(d, () => h.disconnect());
      }
    } else if (o) {
      const [v, g] = o(u, m, r);
      ge(d, Ot([is(c, Jr), _e(c, "animationstart", v), Le(n, c)], g));
    } else
      return lt;
    return J(Re, d);
  };
}, ga = (n, e) => {
  let s;
  const r = (c) => c.h === 0 || c.isIntersecting || c.intersectionRatio > 0, o = yt(ea), [i] = Fe({
    o: !1
  }), d = (c, u) => {
    if (c) {
      const m = i(r(c)), [, v] = m;
      return v && !u && e(m) && [m];
    }
  }, f = (c, u) => d(u.pop(), c);
  return [() => {
    const c = [];
    if (ys)
      s = new ys(J(f, !1), {
        root: n
      }), s.observe(o), ge(c, () => {
        s.disconnect();
      });
    else {
      const u = () => {
        const m = kt(o);
        d(m);
      };
      ge(c, Lo(o, u)()), u();
    }
    return J(Re, ge(c, Le(n, o)));
  }, () => s && f(!0, s.takeRecords())];
}, ba = (n, e, s, r) => {
  let o, i, d, f, c, u;
  const m = `[${it}]`, v = `[${Qe}]`, g = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: _, ht: h, U: y, gt: F, bt: S, L: O, wt: M, yt: x, St: V, Ot: R } = n, $ = (A) => tt(A, "direction") === "rtl", E = {
    $t: !1,
    F: $(_)
  }, k = Xe(), T = Ht(Ao), [I] = Fe({
    i: oo,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const A = T && T.V(n, e, E, k, s).W, z = !(M && O) && ls(h, it, sn), K = !O && x(Kr), Q = K && Ie(F), ae = Q && R(), ve = V(Co, z), ce = K && A && A()[0], Te = fn(y), te = cs(y);
    return ce && ce(), We(F, Q), ae && ae(), z && ve(), {
      w: Te.w + te.w,
      h: Te.h + te.h
    };
  }), B = dn(r, {
    _: () => o,
    p: () => i,
    S(A, G) {
      const [z] = A, [K] = G;
      return [Ot(Ne(z), Ne(K)).reduce((Q, ae) => (Q[ae] = z[ae] || K[ae], Q), {})];
    }
  }), U = (A) => {
    const G = $(_);
    re(A, {
      Ct: u !== G
    }), re(E, {
      F: G
    }), u = G;
  }, Y = (A, G) => {
    const [z, K] = A, Q = {
      xt: K
    };
    return re(E, {
      $t: z
    }), G || r(Q), Q;
  }, D = ({ dt: A, _t: G }) => {
    const K = !(A && !G) && k.P ? B : r, Q = {
      dt: A || G,
      _t: G
    };
    U(Q), K(Q);
  }, N = (A, G) => {
    const [, z] = I(), K = {
      Ht: z
    };
    return U(K), z && !G && (A ? r : B)(K), K;
  }, q = (A, G, z) => {
    const K = {
      Et: G
    };
    return U(K), G && !z && B(K), K;
  }, [oe, ne] = S ? ga(h, Y) : [], fe = !O && Lo(h, D, {
    _t: !0
  }), [X, C] = Rs(h, !1, q, {
    rt: g,
    ct: g
  }), H = O && gt && new gt((A) => {
    const G = A[A.length - 1].contentRect;
    D({
      dt: !0,
      _t: bo(G, c)
    }), c = G;
  }), P = dn(() => {
    const [, A] = I();
    r({
      Ht: A
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    H && H.observe(h);
    const A = fe && fe(), G = oe && oe(), z = X(), K = k.K((Q) => {
      Q ? B({
        zt: Q
      }) : P();
    });
    return () => {
      H && H.disconnect(), A && A(), G && G(), f && f(), z(), K();
    };
  }, ({ It: A, At: G, Dt: z }) => {
    const K = {}, [Q] = A("update.ignoreMutation"), [ae, ve] = A("update.attributes"), [ce, Te] = A("update.elementEvents"), [te, ye] = A("update.debounce"), De = Te || ve, xe = G || z, Se = (be) => Be(Q) && Q(be);
    if (De) {
      d && d(), f && f();
      const [be, we] = Rs(S || y, !0, N, {
        ct: Ot(g, ae || []),
        lt: ce,
        it: m,
        ft: (pe, ue) => {
          const { target: $e, attributeName: Me } = pe;
          return (!ue && Me && !O ? Ir($e, m, v) : !1) || !!wt($e, `.${Ue}`) || !!Se(pe);
        }
      });
      f = be(), d = we;
    }
    if (ye)
      if (B.m(), Ke(te)) {
        const be = te[0], we = te[1];
        o = Ye(be) && be, i = Ye(we) && we;
      } else Ye(te) ? (o = te, i = !1) : (o = !1, i = !1);
    if (xe) {
      const be = C(), we = ne && ne(), pe = d && d();
      be && re(K, q(be[0], be[1], xe)), we && re(K, Y(we[0], xe)), pe && re(K, N(pe[0], xe));
    }
    return U(K), K;
  }, E];
}, Oo = (n, e) => Be(e) ? e.apply(0, n) : e, wa = (n, e, s, r) => {
  const o = ts(r) ? s : r;
  return Oo(n, o) || e.apply(0, n);
}, Vo = (n, e, s, r) => {
  const o = ts(r) ? s : r, i = Oo(n, o);
  return !!i && (cn(i) ? i : e.apply(0, n));
}, ya = (n, e) => {
  const { nativeScrollbarsOverlaid: s, body: r } = e || {}, { T: o, P: i, Z: d } = Xe(), { nativeScrollbarsOverlaid: f, body: c } = d().cancel, u = s ?? f, m = ts(r) ? c : r, v = (o.x || o.y) && u, g = n && (mn(m) ? !i : m);
  return !!v || !!g;
}, ka = (n, e, s, r) => {
  const o = "--os-viewport-percent", i = "--os-scroll-percent", d = "--os-scroll-direction", { Z: f } = Xe(), { scrollbars: c } = f(), { slot: u } = c, { vt: m, ht: v, U: g, Mt: _, gt: h, wt: y, L: F } = e, { scrollbars: S } = _ ? {} : n, { slot: O } = S || {}, M = [], x = [], V = [], R = Vo([m, v, g], () => F && y ? m : v, u, O), $ = (X) => {
    if (Dt) {
      let C = null, H = [];
      const P = new Dt({
        source: h,
        axis: X
      }), A = () => {
        C && C.cancel(), C = null;
      };
      return {
        Rt: (z) => {
          const { Tt: K } = s, Q = Ln(K)[X], ae = X === "x", ve = [Mn(0, ae), Mn(`calc(100cq${ae ? "w" : "h"} + -100%)`, ae)], ce = Q ? ve : ve.reverse();
          return H[0] === ce[0] && H[1] === ce[1] || (A(), H = ce, C = z.kt.animate({
            clear: ["left"],
            transform: ce
          }, {
            timeline: P
          })), A;
        }
      };
    }
  }, E = {
    x: $("x"),
    y: $("y")
  }, k = () => {
    const { Vt: X, Lt: C } = s, H = (P, A) => lo(0, 1, P / (P + A) || 0);
    return {
      x: H(C.x, X.x),
      y: H(C.y, X.y)
    };
  }, T = (X, C, H) => {
    const P = H ? is : uo;
    ie(X, (A) => {
      P(A.Ut, C);
    });
  }, I = (X, C) => {
    ie(X, (H) => {
      const [P, A] = C(H);
      Ft(P, A);
    });
  }, B = (X, C, H) => {
    const P = pn(H), A = P ? H : !0, G = P ? !H : !0;
    A && T(x, X, C), G && T(V, X, C);
  }, U = () => {
    const X = k(), C = (H) => (P) => [P.Ut, {
      [o]: zn(H) + ""
    }];
    I(x, C(X.x)), I(V, C(X.y));
  }, Y = () => {
    if (!Dt) {
      const { Tt: X } = s, C = Cs(X, Ie(h)), H = (P) => (A) => [A.Ut, {
        [i]: zn(P) + ""
      }];
      I(x, H(C.x)), I(V, H(C.y));
    }
  }, D = () => {
    const { Tt: X } = s, C = Ln(X), H = (P) => (A) => [A.Ut, {
      [d]: P ? "0" : "1"
    }];
    I(x, H(C.x)), I(V, H(C.y)), Dt && (x.forEach(E.x.Rt), V.forEach(E.y.Rt));
  }, N = () => {
    if (F && !y) {
      const { Vt: X, Tt: C } = s, H = Ln(C), P = Cs(C, Ie(h)), A = (G) => {
        const { Ut: z } = G, K = Vt(z) === g && z, Q = (ae, ve, ce) => {
          const Te = ve * ae;
          return ho(ce ? Te : -Te);
        };
        return [K, K && {
          transform: Mn({
            x: Q(P.x, X.x, H.x),
            y: Q(P.y, X.y, H.y)
          })
        }];
      };
      I(x, A), I(V, A);
    }
  }, q = (X) => {
    const C = X ? "x" : "y", P = yt(`${Ue} ${X ? sa : oa}`), A = yt(To), G = yt(us), z = {
      Ut: P,
      Pt: A,
      kt: G
    }, K = E[C];
    return ge(X ? x : V, z), ge(M, [Le(P, A), Le(A, G), J(St, P), K && K.Rt(z), r(z, B, X)]), z;
  }, oe = J(q, !0), ne = J(q, !1), fe = () => (Le(R, x[0].Ut), Le(R, V[0].Ut), J(Re, M));
  return oe(), ne(), [{
    Nt: U,
    qt: Y,
    Bt: D,
    Ft: N,
    jt: B,
    Xt: {
      Yt: x,
      Wt: oe,
      Jt: J(I, x)
    },
    Gt: {
      Yt: V,
      Wt: ne,
      Jt: J(I, V)
    }
  }, fe];
}, xa = (n, e, s, r) => (o, i, d) => {
  const { ht: f, U: c, L: u, gt: m, Kt: v, Ot: g } = e, { Ut: _, Pt: h, kt: y } = o, [F, S] = bt(333), [O, M] = bt(444), x = ($) => {
    Be(m.scrollBy) && m.scrollBy({
      behavior: "smooth",
      left: $.x,
      top: $.y
    });
  }, V = () => {
    const $ = "pointerup pointercancel lostpointercapture", E = `client${d ? "X" : "Y"}`, k = d ? gn : bn, T = d ? "left" : "top", I = d ? "w" : "h", B = d ? "x" : "y", U = (D, N) => (q) => {
      const { Vt: oe } = s, ne = kt(h)[I] - kt(y)[I], X = N * q / ne * oe[B];
      We(m, {
        [B]: D + X
      });
    }, Y = [];
    return _e(h, "pointerdown", (D) => {
      const N = wt(D.target, `.${us}`) === y, q = N ? y : h, oe = n.scrollbars, ne = oe[N ? "dragScroll" : "clickScroll"], { button: fe, isPrimary: X, pointerType: C } = D, { pointers: H } = oe;
      if (fe === 0 && X && ne && (H || []).includes(C)) {
        Re(Y), M();
        const A = !N && (D.shiftKey || ne === "instant"), G = J(Dn, y), z = J(Dn, h), K = (ue, $e) => (ue || G())[T] - ($e || z())[T], Q = Rn(Dn(m)[k]) / kt(m)[I] || 1, ae = U(Ie(m)[B], 1 / Q), ve = D[E], ce = G(), Te = z(), te = ce[k], ye = K(ce, Te) + te / 2, De = ve - Te[T], xe = N ? 0 : De - ye, Se = (ue) => {
          Re(pe), q.releasePointerCapture(ue.pointerId);
        }, be = N || A, we = g(), pe = [_e(v, $, Se), _e(v, "selectstart", (ue) => Gn(ue), {
          H: !1
        }), _e(h, $, Se), be && _e(h, "pointermove", (ue) => ae(xe + (ue[E] - ve))), be && (() => {
          const ue = Ie(m);
          we();
          const $e = Ie(m), Me = {
            x: $e.x - ue.x,
            y: $e.y - ue.y
          };
          (on(Me.x) > 3 || on(Me.y) > 3) && (g(), We(m, ue), x(Me), O(we));
        })];
        if (q.setPointerCapture(D.pointerId), A)
          ae(xe);
        else if (!N) {
          const ue = Ht(fa);
          if (ue) {
            const $e = ue(ae, xe, te, (Me) => {
              Me ? we() : ge(pe, we);
            });
            ge(pe, $e), ge(Y, J($e, !0));
          }
        }
      }
    });
  };
  let R = !0;
  return J(Re, [_e(y, "pointermove pointerleave", r), _e(_, "pointerenter", () => {
    i(Ms, !0);
  }), _e(_, "pointerleave pointercancel", () => {
    i(Ms, !1);
  }), !u && _e(_, "mousedown", () => {
    const $ = Pn();
    (ks($, Qe) || ks($, it) || $ === document.body) && rn(J(Wn, c), 25);
  }), _e(_, "wheel", ($) => {
    const { deltaX: E, deltaY: k, deltaMode: T } = $;
    R && T === 0 && Vt(_) === f && x({
      x: E,
      y: k
    }), R = !1, i(Os, !0), F(() => {
      R = !0, i(Os);
    }), Gn($);
  }, {
    H: !1,
    I: !0
  }), _e(_, "pointerdown", J(_e, v, "click", yo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), V(), S, M]);
}, Sa = (n, e, s, r, o, i) => {
  let d, f, c, u, m, v = lt, g = 0;
  const _ = ["mouse", "pen"], h = (C) => _.includes(C.pointerType), [y, F] = bt(), [S, O] = bt(100), [M, x] = bt(100), [V, R] = bt(() => g), [$, E] = ka(n, o, r, xa(e, o, r, (C) => h(C) && oe())), { ht: k, Qt: T, wt: I } = o, { jt: B, Nt: U, qt: Y, Bt: D, Ft: N } = $, q = (C, H) => {
    if (R(), C)
      B(Ls);
    else {
      const P = J(B, Ls, !0);
      g > 0 && !H ? V(P) : P();
    }
  }, oe = () => {
    (c ? !d : !u) && (q(!0), S(() => {
      q(!1);
    }));
  }, ne = (C) => {
    B(Xn, C, !0), B(Xn, C, !1);
  }, fe = (C) => {
    h(C) && (d = c, c && q(!0));
  }, X = [R, O, x, F, () => v(), _e(k, "pointerover", fe, {
    A: !0
  }), _e(k, "pointerenter", fe), _e(k, "pointerleave", (C) => {
    h(C) && (d = !1, c && q(!1));
  }), _e(k, "pointermove", (C) => {
    h(C) && f && oe();
  }), _e(T, "scroll", (C) => {
    y(() => {
      Y(), oe();
    }), i(C), N();
  })];
  return [() => J(Re, ge(X, E())), ({ It: C, Dt: H, Zt: P, tn: A }) => {
    const { nn: G, sn: z, en: K, cn: Q } = A || {}, { Ct: ae, _t: ve } = P || {}, { F: ce } = s, { T: Te } = Xe(), { k: te, rn: ye } = r, [De, xe] = C("showNativeOverlaidScrollbars"), [Se, be] = C("scrollbars.theme"), [we, pe] = C("scrollbars.visibility"), [ue, $e] = C("scrollbars.autoHide"), [Me, Et] = C("scrollbars.autoHideSuspend"), [Bt] = C("scrollbars.autoHideDelay"), [Nt, qt] = C("scrollbars.dragScroll"), [ut, Tt] = C("scrollbars.clickScroll"), [Pt, Sn] = C("overflow"), $n = ve && !H, Cn = ye.x || ye.y, Pe = G || z || Q || ae || H, En = K || pe || Sn, zt = De && Te.x && Te.y, jt = (ot, At, Mt) => {
      const Gt = ot.includes(xt) && (we === at || we === "auto" && At === xt);
      return B(ra, Gt, Mt), Gt;
    };
    if (g = Bt, $n && (Me && Cn ? (ne(!1), v(), M(() => {
      v = _e(T, "scroll", J(ne, !0), {
        A: !0
      });
    })) : ne(!0)), xe && B(ta, zt), be && (B(m), B(Se, !0), m = Se), Et && !Me && ne(!0), $e && (f = ue === "move", c = ue === "leave", u = ue === "never", q(u, !0)), qt && B(ia, Nt), Tt && B(la, !!ut), En) {
      const ot = jt(Pt.x, te.x, !0), At = jt(Pt.y, te.y, !1);
      B(aa, !(ot && At));
    }
    Pe && (Y(), U(), N(), Q && D(), B(Ds, !ye.x, !0), B(Ds, !ye.y, !1), B(na, ce && !I));
  }, {}, $];
}, $a = (n) => {
  const e = Xe(), { Z: s, P: r } = e, { elements: o } = s(), { padding: i, viewport: d, content: f } = o, c = cn(n), u = c ? {} : n, { elements: m } = u, { padding: v, viewport: g, content: _ } = m || {}, h = c ? n : u.target, y = vo(h), F = h.ownerDocument, S = F.documentElement, O = () => F.defaultView || Ve, M = J(wa, [h]), x = J(Vo, [h]), V = J(yt, ""), R = J(M, V, d), $ = J(x, V, f), E = (te) => {
    const ye = kt(te), De = fn(te), xe = tt(te, no), Se = tt(te, so);
    return De.w - ye.w > 0 && !$t(xe) || De.h - ye.h > 0 && !$t(Se);
  }, k = R(g), T = k === h, I = T && y, B = !T && $(_), U = !T && k === B, Y = I ? S : k, D = I ? Y : h, N = !T && x(V, i, v), q = !U && B, oe = [q, Y, N, D].map((te) => cn(te) && !Vt(te) && te), ne = (te) => te && Ys(oe, te), fe = !ne(Y) && E(Y) ? Y : h, X = I ? S : Y, H = {
    vt: h,
    ht: D,
    U: Y,
    ln: N,
    bt: q,
    gt: X,
    Qt: I ? F : Y,
    an: y ? S : fe,
    Kt: F,
    wt: y,
    Mt: c,
    L: T,
    un: O,
    yt: (te) => ls(Y, Qe, te),
    St: (te, ye) => un(Y, Qe, te, ye),
    Ot: () => un(X, Qe, Xr, !0)
  }, { vt: P, ht: A, ln: G, U: z, bt: K } = H, Q = [() => {
    ze(A, [it, On]), ze(P, On), y && ze(S, [On, it]);
  }];
  let ae = qn([K, z, G, A, P].find((te) => te && !ne(te)));
  const ve = I ? P : K || z, ce = J(Re, Q);
  return [H, () => {
    const te = O(), ye = Pn(), De = (pe) => {
      Le(Vt(pe), qn(pe)), St(pe);
    }, xe = (pe) => _e(pe, "focusin focusout focus blur", yo, {
      I: !0,
      H: !1
    }), Se = "tabindex", be = rs(z, Se), we = xe(ye);
    return Je(A, it, T ? "" : Gr), Je(G, Kn, ""), Je(z, Qe, ""), Je(K, As, ""), T || (Je(z, Se, be || "-1"), y && Je(S, Ts, "")), Le(ve, ae), Le(A, G), Le(G || A, !T && z), Le(z, K), ge(Q, [we, () => {
      const pe = Pn(), ue = ne(z), $e = ue && pe === z ? P : pe, Me = xe($e);
      ze(G, Kn), ze(K, As), ze(z, Qe), y && ze(S, Ts), be ? Je(z, Se, be) : ze(z, Se), ne(K) && De(K), ue && De(z), ne(G) && De(G), Wn($e), Me();
    }]), r && !T && (as(z, Qe, Eo), ge(Q, J(ze, z, Qe))), Wn(!T && y && ye === P && te.top === te ? z : ye), we(), ae = 0, ce;
  }, ce];
}, Ca = ({ bt: n }) => ({ Zt: e, fn: s, Dt: r }) => {
  const { xt: o } = e || {}, { $t: i } = s;
  n && (o || r) && Ft(n, {
    [bn]: i && "100%"
  });
}, Ea = ({ ht: n, ln: e, U: s, L: r }, o) => {
  const [i, d] = Fe({
    i: Vr,
    o: Ss()
  }, J(Ss, n, "padding", ""));
  return ({ It: f, Zt: c, fn: u, Dt: m }) => {
    let [v, g] = d(m);
    const { P: _ } = Xe(), { dt: h, Ht: y, Ct: F } = c || {}, { F: S } = u, [O, M] = f("paddingAbsolute");
    (h || g || (m || y)) && ([v, g] = i(m));
    const V = !r && (M || F || g);
    if (V) {
      const R = !O || !e && !_, $ = v.r + v.l, E = v.t + v.b, k = {
        [eo]: R && !S ? -$ : 0,
        [to]: R ? -E : 0,
        [Qs]: R && S ? -$ : 0,
        top: R ? -v.t : 0,
        right: R ? S ? -v.r : "auto" : 0,
        left: R ? S ? "auto" : -v.l : 0,
        [gn]: R && `calc(100% + ${$}px)`
      }, T = {
        [Ks]: R ? v.t : 0,
        [Xs]: R ? v.r : 0,
        [Js]: R ? v.b : 0,
        [Zs]: R ? v.l : 0
      };
      Ft(e || s, k), Ft(s, T), re(o, {
        ln: v,
        _n: !R,
        j: e ? T : re({}, k, T)
      });
    }
    return {
      dn: V
    };
  };
}, Ta = (n, e) => {
  const s = Xe(), { ht: r, ln: o, U: i, L: d, Qt: f, gt: c, wt: u, St: m, un: v } = n, { P: g } = s, _ = u && d, h = J(Gs, 0), y = {
    display: () => !1,
    direction: (C) => C !== "ltr",
    flexDirection: (C) => C.endsWith("-reverse"),
    writingMode: (C) => C !== "horizontal-tb"
  }, F = Ne(y), S = {
    i: oo,
    o: {
      w: 0,
      h: 0
    }
  }, O = {
    i: tn,
    o: {}
  }, M = (C) => {
    m(Co, !_ && C);
  }, x = (C) => {
    if (!F.some((ve) => {
      const ce = C[ve];
      return ce && y[ve](ce);
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
    M(!0);
    const P = Ie(c), A = m(Zr, !0), G = _e(f, xt, (ve) => {
      const ce = Ie(c);
      ve.isTrusted && ce.x === P.x && ce.y === P.y && wo(ve);
    }, {
      I: !0,
      A: !0
    });
    We(c, {
      x: 0,
      y: 0
    }), A();
    const z = Ie(c), K = fn(c);
    We(c, {
      x: K.w,
      y: K.h
    });
    const Q = Ie(c);
    We(c, {
      x: Q.x - z.x < 1 && -K.w,
      y: Q.y - z.y < 1 && -K.h
    });
    const ae = Ie(c);
    return We(c, P), es(() => G()), {
      D: z,
      M: ae
    };
  }, V = (C, H) => {
    const P = Ve.devicePixelRatio % 1 !== 0 ? 1 : 0, A = {
      w: h(C.w - H.w),
      h: h(C.h - H.h)
    };
    return {
      w: A.w > P ? A.w : 0,
      h: A.h > P ? A.h : 0
    };
  }, [R, $] = Fe(S, J(cs, i)), [E, k] = Fe(S, J(fn, i)), [T, I] = Fe(S), [B] = Fe(O), [U, Y] = Fe(S), [D] = Fe(O), [N] = Fe({
    i: (C, H) => wn(C, H, F),
    o: {}
  }, () => qr(i) ? tt(i, F) : {}), [q, oe] = Fe({
    i: (C, H) => tn(C.D, H.D) && tn(C.M, H.M),
    o: ko()
  }), ne = Ht(Ao), fe = (C, H) => `${H ? Wr : Yr}${Or(C)}`, X = (C) => {
    const H = (A) => [at, vt, xt].map((G) => fe(G, A)), P = H(!0).concat(H()).join(" ");
    m(P), m(Ne(C).map((A) => fe(C[A], A === "x")).join(" "), !0);
  };
  return ({ It: C, Zt: H, fn: P, Dt: A }, { dn: G }) => {
    const { dt: z, Ht: K, Ct: Q, _t: ae, zt: ve } = H || {}, ce = ne && ne.V(n, e, P, s, C), { Y: Te, W: te, J: ye } = ce || {}, [De, xe] = da(C, s), [Se, be] = C("overflow"), we = $t(Se.x), pe = $t(Se.y), ue = z || G || K || Q || ve || xe;
    let $e = $(A), Me = k(A), Et = I(A), Bt = Y(A);
    if (xe && g && m(Eo, !De), ue) {
      ls(r, it, sn) && M(!0);
      const [hs] = te ? te() : [], [Wt] = $e = R(A), [Yt] = Me = E(A), Kt = go(i), Xt = _ && Nr(v()), sr = {
        w: h(Yt.w + Wt.w),
        h: h(Yt.h + Wt.h)
      }, gs = {
        w: h((Xt ? Xt.w : Kt.w + h(Kt.w - Yt.w)) + Wt.w),
        h: h((Xt ? Xt.h : Kt.h + h(Kt.h - Yt.h)) + Wt.h)
      };
      hs && hs(), Bt = U(gs), Et = T(V(sr, gs), A);
    }
    const [Nt, qt] = Bt, [ut, Tt] = Et, [Pt, Sn] = Me, [$n, Cn] = $e, [Pe, En] = B({
      x: ut.w > 0,
      y: ut.h > 0
    }), zt = we && pe && (Pe.x || Pe.y) || we && Pe.x && !Pe.y || pe && Pe.y && !Pe.x, jt = G || Q || ve || Cn || Sn || qt || Tt || be || xe || ue, ot = ua(Pe, Se), [At, Mt] = D(ot.k), [Gt, er] = N(A), ps = Q || ae || er || En || A, [tr, nr] = ps ? q(x(Gt), A) : oe();
    return jt && (Mt && X(ot.k), ye && Te && Ft(i, ye(ot, P, Te(ot, Pt, $n)))), M(!1), un(r, it, sn, zt), un(o, Kn, sn, zt), re(e, {
      k: At,
      Lt: {
        x: Nt.w,
        y: Nt.h
      },
      Vt: {
        x: ut.w,
        y: ut.h
      },
      rn: Pe,
      Tt: Pr(tr, ut)
    }), {
      en: Mt,
      nn: qt,
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
  }, { vt: i, gt: d, L: f, Ot: c } = e, { P: u, T: m } = Xe(), v = !u && (m.x || m.y), g = [Ca(e), Ea(e, o), Ta(e, o)];
  return [s, (_) => {
    const h = {}, F = v && Ie(d), S = F && c();
    return ie(g, (O) => {
      re(h, O(_, h) || {});
    }), We(d, F), S && S(), f || We(i, 0), h;
  }, o, e, r];
}, Ma = (n, e, s, r, o) => {
  let i = !1;
  const d = Is(e, {}), [f, c, u, m, v] = Aa(n), [g, _, h] = ba(m, u, d, (x) => {
    M({}, x);
  }), [y, F, , S] = Sa(n, e, h, u, m, o), O = (x) => Ne(x).some((V) => !!x[V]), M = (x, V) => {
    if (s())
      return !1;
    const { vn: R, Dt: $, At: E, hn: k } = x, T = R || {}, I = !!$ || !i, B = {
      It: Is(e, T, I),
      vn: T,
      Dt: I
    };
    if (k)
      return F(B), !1;
    const U = V || _(re({}, B, {
      At: E
    })), Y = c(re({}, B, {
      fn: h,
      Zt: U
    }));
    F(re({}, B, {
      Zt: U,
      tn: Y
    }));
    const D = O(U), N = O(Y), q = D || N || !os(T) || I;
    return i = !0, q && r(x, {
      Zt: U,
      tn: Y
    }), q;
  };
  return [() => {
    const { an: x, gt: V, Ot: R } = m, $ = Ie(x), E = [g(), f(), y()], k = R();
    return We(V, $), k(), J(Re, E);
  }, M, () => ({
    gn: h,
    bn: u
  }), {
    wn: m,
    yn: S
  }, v];
}, fs = /* @__PURE__ */ new WeakMap(), Da = (n, e) => {
  fs.set(n, e);
}, La = (n) => {
  fs.delete(n);
}, Fo = (n) => fs.get(n), qe = (n, e, s) => {
  const { nt: r } = Xe(), o = cn(n), i = o ? n : n.target, d = Fo(i);
  if (e && !d) {
    let f = !1;
    const c = [], u = {}, m = (T) => {
      const I = ao(T), B = Ht(jr);
      return B ? B(I, !0) : I;
    }, v = re({}, r(), m(e)), [g, _, h] = Yn(), [y, F, S] = Yn(s), O = (T, I) => {
      S(T, I), h(T, I);
    }, [M, x, V, R, $] = Ma(n, v, () => f, ({ vn: T, Dt: I }, { Zt: B, tn: U }) => {
      const { dt: Y, Ct: D, xt: N, Ht: q, Et: oe, _t: ne } = B, { nn: fe, sn: X, en: C, cn: H } = U;
      O("updated", [k, {
        updateHints: {
          sizeChanged: !!Y,
          directionChanged: !!D,
          heightIntrinsicChanged: !!N,
          overflowEdgeChanged: !!fe,
          overflowAmountChanged: !!X,
          overflowStyleChanged: !!C,
          scrollCoordinatesChanged: !!H,
          contentMutation: !!q,
          hostMutation: !!oe,
          appear: !!ne
        },
        changedOptions: T || {},
        force: !!I
      }]);
    }, (T) => O("scroll", [k, T])), E = (T) => {
      La(i), Re(c), f = !0, O("destroyed", [k, T]), _(), F();
    }, k = {
      options(T, I) {
        if (T) {
          const B = I ? r() : {}, U = Mo(v, re(B, m(T)));
          os(U) || (re(v, U), x({
            vn: U
          }));
        }
        return re({}, v);
      },
      on: y,
      off: (T, I) => {
        T && I && F(T, I);
      },
      state() {
        const { gn: T, bn: I } = V(), { F: B } = T, { Lt: U, Vt: Y, k: D, rn: N, ln: q, _n: oe, Tt: ne } = I;
        return re({}, {
          overflowEdge: U,
          overflowAmount: Y,
          overflowStyle: D,
          hasOverflow: N,
          scrollCoordinates: {
            start: ne.D,
            end: ne.M
          },
          padding: q,
          paddingAbsolute: oe,
          directionRTL: B,
          destroyed: f
        });
      },
      elements() {
        const { vt: T, ht: I, ln: B, U, bt: Y, gt: D, Qt: N } = R.wn, { Xt: q, Gt: oe } = R.yn, ne = (X) => {
          const { kt: C, Pt: H, Ut: P } = X;
          return {
            scrollbar: P,
            track: H,
            handle: C
          };
        }, fe = (X) => {
          const { Yt: C, Wt: H } = X, P = ne(C[0]);
          return re({}, P, {
            clone: () => {
              const A = ne(H());
              return x({
                hn: !0
              }), A;
            }
          });
        };
        return re({}, {
          target: T,
          host: I,
          padding: B || U,
          viewport: U,
          content: Y || U,
          scrollOffsetElement: D,
          scrollEventElement: N,
          scrollbarHorizontal: fe(q),
          scrollbarVertical: fe(oe)
        });
      },
      update: (T) => x({
        Dt: T,
        At: !0
      }),
      destroy: J(E, !1),
      plugin: (T) => u[Ne(T)[0]]
    };
    return ge(c, [$]), Da(i, k), $o(xo, qe, [k, g, u]), ya(R.wn.wt, !o && n.cancel) ? (E(!0), k) : (ge(c, M()), O("initialized", [k]), k.update(), k);
  }
  return d;
};
qe.plugin = (n) => {
  const e = Ke(n), s = e ? n : [n], r = s.map((o) => $o(o, qe)[0]);
  return zr(s), e ? r : r[0];
};
qe.valid = (n) => {
  const e = n && n.elements, s = Be(e) && e();
  return ln(s) && !!Fo(s.target);
};
qe.env = () => {
  const { N: n, T: e, P: s, G: r, st: o, et: i, Z: d, tt: f, nt: c, ot: u } = Xe();
  return re({}, {
    scrollbarsSize: n,
    scrollbarsOverlaid: e,
    scrollbarsHiding: s,
    scrollTimeline: r,
    staticDefaultInitialization: o,
    staticDefaultOptions: i,
    getDefaultInitialization: d,
    setDefaultInitialization: f,
    getDefaultOptions: c,
    setDefaultOptions: u
  });
};
qe.nonce = ma;
qe.trustedTypePolicy = Ur;
function Oa() {
  let n;
  const e = L(null), s = Math.floor(Math.random() * 2 ** 32), r = L(!1), o = L([]), i = () => o.value, d = () => n.getSelection(), f = () => o.value.length, c = () => n.clearSelection(!0), u = L(), m = L(null), v = L(null), g = L(null), _ = L(null);
  function h() {
    n = new mr({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), n.subscribe("DS:start:pre", ({ items: V, event: R, isDragging: $ }) => {
      if ($)
        n.Interaction._reset(R);
      else {
        r.value = !1;
        const E = e.value.offsetWidth - R.offsetX, k = e.value.offsetHeight - R.offsetY;
        E < 15 && k < 15 && n.Interaction._reset(R), R.target.classList.contains("os-scrollbar-handle") && n.Interaction._reset(R);
      }
    }), document.addEventListener("dragleave", (V) => {
      !V.buttons && r.value && (r.value = !1);
    });
  }
  const y = () => _t(() => {
    n.addSelection(
      n.getSelectables()
    ), F();
  }), F = () => {
    o.value = n.getSelection().map((V) => JSON.parse(V.dataset.item)), u.value(o.value);
  }, S = () => _t(() => {
    const V = i().map((R) => R.path);
    c(), n.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + s)
    }), n.addSelection(
      n.getSelectables().filter((R) => V.includes(JSON.parse(R.dataset.item).path))
    ), F(), M();
  }), O = (V) => {
    u.value = V, n.subscribe("DS:end", ({ items: R, event: $, isDragging: E }) => {
      o.value = R.map((k) => JSON.parse(k.dataset.item)), V(R.map((k) => JSON.parse(k.dataset.item)));
    });
  }, M = () => {
    m.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (v.value.style.height = e.value.scrollHeight + "px", v.value.style.display = "block") : (v.value.style.height = "100%", v.value.style.display = "none"));
  }, x = (V) => {
    if (!m.value)
      return;
    const { scrollOffsetElement: R } = m.value.elements();
    R.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return Ee(() => {
    qe(g.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: qe
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (V) => {
        m.value = V;
      },
      scroll: (V, R) => {
        const { scrollOffsetElement: $ } = V.elements();
        e.value.scrollTo({
          top: $.scrollTop,
          left: 0
        });
      }
    }), h(), M(), _.value = new ResizeObserver(M), _.value.observe(e.value), e.value.addEventListener("scroll", x), n.subscribe("DS:scroll", ({ isDragging: V }) => V || x());
  }), Qn(() => {
    n && n.stop(), _.value && _.value.disconnect();
  }), Bs(() => {
    n && n.Area.reset();
  }), {
    area: e,
    explorerId: s,
    isDraggingRef: r,
    scrollBar: v,
    scrollBarContainer: g,
    getSelected: i,
    getSelection: d,
    selectAll: y,
    clearSelection: c,
    refreshSelection: S,
    getCount: f,
    onSelect: O
  };
}
function Va(n, e) {
  const s = L(n), r = L(e), o = L([]), i = L([]), d = L([]), f = L(!1), c = L(5);
  let u = !1, m = !1;
  const v = pt({
    adapter: s,
    storages: [],
    dirname: r,
    files: []
  });
  function g() {
    let O = [], M = [], x = r.value ?? s.value + "://";
    x.length === 0 && (o.value = []), x.replace(s.value + "://", "").split("/").filter(Boolean).forEach(function($) {
      O.push($), O.join("/") !== "" && M.push({
        basename: $,
        name: $,
        path: s.value + "://" + O.join("/") + "/",
        type: "dir"
      });
    }), i.value = M;
    const [V, R] = h(
      M,
      c.value
    );
    d.value = R, o.value = V;
  }
  function _(O) {
    c.value = O, g();
  }
  function h(O, M) {
    return O.length > M ? [O.slice(-M), O.slice(0, -M)] : [O, []];
  }
  function y(O = null) {
    f.value = O ?? !f.value;
  }
  function F() {
    return o.value && o.value.length && !0;
  }
  const S = je(() => {
    var O;
    return ((O = o.value[o.value.length - 2]) == null ? void 0 : O.path) ?? s.value + "://";
  });
  return Ee(() => {
  }), Oe(r, g), Ee(g), {
    adapter: s,
    path: r,
    loading: u,
    searchMode: m,
    data: v,
    breadcrumbs: o,
    breadcrumbItems: i,
    limitBreadcrumbItems: _,
    hiddenBreadcrumbs: d,
    showHiddenBreadcrumbs: f,
    toggleHiddenBreadcrumbs: y,
    isGoUpAvailable: F,
    parentFolderPath: S
  };
}
const Fa = (n, e) => {
  const s = kr(n.id), r = _r(), o = s.getStore("metricUnits", !1), i = Tr(s, n.theme), d = e.i18n, f = n.locale ?? e.locale, c = (_) => Array.isArray(_) ? _ : $r, u = s.getStore("persist-path", n.persist), m = u ? s.getStore("path", n.path) : n.path, v = u ? s.getStore("adapter") : null, g = Oa();
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
    i18n: Sr(s, f, r, d),
    // modal state
    modal: Ar(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: je(() => g),
    // http object
    requester: yr(n.request),
    // active features
    features: c(n.features),
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
    theme: i,
    // unit state - for example: GB or GiB
    metricUnits: o,
    // human readable file sizes
    filesize: o ? js : zs,
    // show large icons in list view
    compactListView: s.getStore("compact-list-view", !0),
    // persist state
    persist: u,
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
    const e = L(null), s = le("ServiceContainer");
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
      onKeyup: o[1] || (o[1] = It((i) => a(s).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      o[2] || (o[2] = l("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      l("div", Ia, [
        l("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: o[0] || (o[0] = et((i) => a(s).modal.close(), ["self"]))
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
    const r = le("ServiceContainer"), o = L(!1), { t: i } = r.i18n;
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
      t: i
    };
  }
}, Na = { key: 1 };
function qa(n, e, s, r, o, i) {
  return p(), b("div", {
    class: de(["vuefinder__action-message", { "vuefinder__action-message--hidden": !r.shown }])
  }, [
    n.$slots.default ? Lt(n.$slots, "default", { key: 0 }) : (p(), b("span", Na, w(r.t("Saved.")), 1))
  ], 2);
}
const ht = /* @__PURE__ */ Ha(Ba, [["render", qa]]), Pa = {
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
        (p(), Z(Ns(n.icon), { class: "vuefinder__modal-header__icon" }))
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
}, Fl = { class: "vuefinder__about-modal__shortcuts" }, Il = { class: "vuefinder__about-modal__shortcut" }, Rl = { class: "vuefinder__about-modal__shortcut" }, Ul = { class: "vuefinder__about-modal__shortcut" }, Hl = { class: "vuefinder__about-modal__shortcut" }, Bl = { class: "vuefinder__about-modal__shortcut" }, Nl = { class: "vuefinder__about-modal__shortcut" }, ql = { class: "vuefinder__about-modal__shortcut" }, Pl = { class: "vuefinder__about-modal__shortcut" }, zl = { class: "vuefinder__about-modal__shortcut" }, jl = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Gl = { class: "vuefinder__about-modal__description" }, Wl = {
  __name: "ModalAbout",
  setup(n) {
    const e = le("ServiceContainer"), { setStore: s, clearStore: r } = e.storage, { t: o } = e.i18n, i = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, d = je(() => [
      { name: o("About"), key: i.ABOUT },
      { name: o("Settings"), key: i.SETTINGS },
      { name: o("Shortcuts"), key: i.SHORTCUTS },
      { name: o("Reset"), key: i.RESET }
    ]), f = L("about"), c = async () => {
      r(), location.reload();
    }, u = (O) => {
      e.theme.set(O), e.emitter.emit("vf-theme-saved");
    }, m = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? js : zs, s("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, v = () => {
      e.compactListView = !e.compactListView, s("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, g = () => {
      e.showThumbnails = !e.showThumbnails, s("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, _ = () => {
      e.persist = !e.persist, s("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = le("VueFinderOptions"), F = Object.fromEntries(
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
      }).filter(([O]) => Object.keys(h).includes(O))
    ), S = je(() => ({
      system: o("System"),
      light: o("Light"),
      dark: o("Dark")
    }));
    return (O, M) => (p(), Z(nt, null, {
      buttons: se(() => [
        l("button", {
          type: "button",
          onClick: M[7] || (M[7] = (x) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(o)("Close")), 1)
      ]),
      default: se(() => [
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
                    onClick: (V) => f.value = x.key,
                    class: de([x.key === f.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": x.current ? "page" : void 0
                  }, w(x.name), 11, Ja))), 128))
                ])
              ])
            ]),
            f.value === i.ABOUT ? (p(), b("div", Qa, [
              l("div", el, w(a(o)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              l("a", tl, w(a(o)("Project home")), 1),
              l("a", nl, w(a(o)("Follow on GitHub")), 1)
            ])) : j("", !0),
            f.value === i.SETTINGS ? (p(), b("div", sl, [
              l("div", ol, w(a(o)("Customize your experience with the following settings")), 1),
              l("div", rl, [
                l("fieldset", null, [
                  l("div", al, [
                    l("div", ll, [
                      he(l("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": M[0] || (M[0] = (x) => a(e).metricUnits = x),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Zt, a(e).metricUnits]
                      ])
                    ]),
                    l("div", il, [
                      l("label", cl, [
                        ee(w(a(o)("Use Metric Units")) + " ", 1),
                        W(ht, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: se(() => [
                            ee(w(a(o)("Saved.")), 1)
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
                        "onUpdate:modelValue": M[1] || (M[1] = (x) => a(e).compactListView = x),
                        onClick: v,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Zt, a(e).compactListView]
                      ])
                    ]),
                    l("div", fl, [
                      l("label", vl, [
                        ee(w(a(o)("Compact list view")) + " ", 1),
                        W(ht, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: se(() => [
                            ee(w(a(o)("Saved.")), 1)
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
                        "onUpdate:modelValue": M[2] || (M[2] = (x) => a(e).persist = x),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Zt, a(e).persist]
                      ])
                    ]),
                    l("div", pl, [
                      l("label", hl, [
                        ee(w(a(o)("Persist path on reload")) + " ", 1),
                        W(ht, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: se(() => [
                            ee(w(a(o)("Saved.")), 1)
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
                        "onUpdate:modelValue": M[3] || (M[3] = (x) => a(e).showThumbnails = x),
                        onClick: g,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Zt, a(e).showThumbnails]
                      ])
                    ]),
                    l("div", wl, [
                      l("label", yl, [
                        ee(w(a(o)("Show thumbnails")) + " ", 1),
                        W(ht, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: se(() => [
                            ee(w(a(o)("Saved.")), 1)
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
                        "onUpdate:modelValue": M[4] || (M[4] = (x) => a(e).theme.value = x),
                        onChange: M[5] || (M[5] = (x) => u(x.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: a(o)("Theme")
                        }, [
                          (p(!0), b(ke, null, Ce(S.value, (x, V) => (p(), b("option", { value: V }, w(x), 9, El))), 256))
                        ], 8, Cl)
                      ], 544), [
                        [bs, a(e).theme.value]
                      ]),
                      W(ht, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: se(() => [
                          ee(w(a(o)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  a(e).features.includes(a(me).LANGUAGE) && Object.keys(a(F)).length > 1 ? (p(), b("div", Tl, [
                    l("div", Al, [
                      l("label", Ml, w(a(o)("Language")), 1)
                    ]),
                    l("div", Dl, [
                      he(l("select", {
                        id: "language",
                        "onUpdate:modelValue": M[6] || (M[6] = (x) => a(e).i18n.locale = x),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: a(o)("Language")
                        }, [
                          (p(!0), b(ke, null, Ce(a(F), (x, V) => (p(), b("option", { value: V }, w(x), 9, Ol))), 256))
                        ], 8, Ll)
                      ], 512), [
                        [bs, a(e).i18n.locale]
                      ]),
                      W(ht, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: se(() => [
                          ee(w(a(o)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : j("", !0)
                ])
              ])
            ])) : j("", !0),
            f.value === i.SHORTCUTS ? (p(), b("div", Vl, [
              l("div", Fl, [
                l("div", Il, [
                  l("div", null, w(a(o)("Rename")), 1),
                  M[8] || (M[8] = l("kbd", null, "F2", -1))
                ]),
                l("div", Rl, [
                  l("div", null, w(a(o)("Refresh")), 1),
                  M[9] || (M[9] = l("kbd", null, "F5", -1))
                ]),
                l("div", Ul, [
                  ee(w(a(o)("Delete")) + " ", 1),
                  M[10] || (M[10] = l("kbd", null, "Del", -1))
                ]),
                l("div", Hl, [
                  ee(w(a(o)("Escape")) + " ", 1),
                  M[11] || (M[11] = l("div", null, [
                    l("kbd", null, "Esc")
                  ], -1))
                ]),
                l("div", Bl, [
                  ee(w(a(o)("Select All")) + " ", 1),
                  M[12] || (M[12] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    ee(" + "),
                    l("kbd", null, "A")
                  ], -1))
                ]),
                l("div", Nl, [
                  ee(w(a(o)("Search")) + " ", 1),
                  M[13] || (M[13] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    ee(" + "),
                    l("kbd", null, "F")
                  ], -1))
                ]),
                l("div", ql, [
                  ee(w(a(o)("Toggle Sidebar")) + " ", 1),
                  M[14] || (M[14] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    ee(" + "),
                    l("kbd", null, "E")
                  ], -1))
                ]),
                l("div", Pl, [
                  ee(w(a(o)("Open Settings")) + " ", 1),
                  M[15] || (M[15] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    ee(" + "),
                    l("kbd", null, ",")
                  ], -1))
                ]),
                l("div", zl, [
                  ee(w(a(o)("Toggle Full Screen")) + " ", 1),
                  M[16] || (M[16] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    ee(" + "),
                    l("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : j("", !0),
            f.value === i.RESET ? (p(), b("div", jl, [
              l("div", Gl, w(a(o)("Reset all settings to default")), 1),
              l("button", {
                onClick: c,
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
    var u;
    const s = e, r = le("ServiceContainer"), { t: o } = r.i18n, i = L(!1), d = L(null), f = L((u = d.value) == null ? void 0 : u.strMessage);
    Oe(f, () => i.value = !1);
    const c = () => {
      s("hidden"), i.value = !0;
    };
    return (m, v) => (p(), b("div", null, [
      i.value ? j("", !0) : (p(), b("div", {
        key: 0,
        ref_key: "strMessage",
        ref: d,
        class: de(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Lt(m.$slots, "default"),
        l("div", {
          class: "vuefinder__message__close",
          onClick: c,
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
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = L(e.modal.data.items), o = L(""), i = () => {
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
    return (d, f) => (p(), Z(nt, null, {
      buttons: se(() => [
        l("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-danger"
        }, w(a(s)("Yes, Delete!")), 1),
        l("button", {
          type: "button",
          onClick: f[1] || (f[1] = (c) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(s)("Cancel")), 1),
        l("div", ri, w(a(s)("This action cannot be undone.")), 1)
      ]),
      default: se(() => [
        l("div", null, [
          W(dt, {
            icon: a(Io),
            title: a(s)("Delete files")
          }, null, 8, ["icon", "title"]),
          l("div", Zl, [
            l("div", Jl, [
              l("p", Ql, w(a(s)("Are you sure you want to delete these files?")), 1),
              l("div", ei, [
                (p(!0), b(ke, null, Ce(r.value, (c) => (p(), b("p", ti, [
                  c.type === "dir" ? (p(), b("svg", ni, f[2] || (f[2] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (p(), b("svg", si, f[3] || (f[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  l("span", oi, w(c.basename), 1)
                ]))), 256))
              ]),
              o.value.length ? (p(), Z(st, {
                key: 0,
                onHidden: f[0] || (f[0] = (c) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(w(o.value), 1)
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
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = L(e.modal.data.items[0]), o = L(e.modal.data.items[0].basename), i = L(""), d = () => {
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
          i.value = s(f.message);
        }
      });
    };
    return (f, c) => (p(), Z(nt, null, {
      buttons: se(() => [
        l("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, w(a(s)("Rename")), 1),
        l("button", {
          type: "button",
          onClick: c[2] || (c[2] = (u) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        l("div", null, [
          W(dt, {
            icon: a(Ro),
            title: a(s)("Rename")
          }, null, 8, ["icon", "title"]),
          l("div", ii, [
            l("div", ci, [
              l("p", di, [
                r.value.type === "dir" ? (p(), b("svg", ui, c[3] || (c[3] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (p(), b("svg", fi, c[4] || (c[4] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                l("span", vi, w(r.value.basename), 1)
              ]),
              he(l("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (u) => o.value = u),
                onKeyup: It(d, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Rt, o.value]
              ]),
              i.value.length ? (p(), Z(st, {
                key: 0,
                onHidden: c[1] || (c[1] = (u) => i.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(w(i.value), 1)
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
    s.code === Ze.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible && (n.fs.searchMode || (s.code === Ze.F2 && n.features.includes(me.RENAME) && (n.dragSelect.getCount() !== 1 || n.modal.open(_s, { items: n.dragSelect.getSelected() })), s.code === Ze.F5 && n.emitter.emit("vf-fetch", { params: { q: "index", adapter: n.fs.adapter, path: n.fs.data.dirname } }), s.code === Ze.DELETE && (!n.dragSelect.getCount() || n.modal.open(vs, { items: n.dragSelect.getSelected() })), s.metaKey && s.code === Ze.BACKSLASH && n.modal.open(Wl), s.metaKey && s.code === Ze.KEY_F && n.features.includes(me.SEARCH) && (n.fs.searchMode = !0, s.preventDefault()), s.metaKey && s.code === Ze.KEY_E && (n.showTreeView = !n.showTreeView, n.storage.setStore("show-tree-view", n.showTreeView)), s.metaKey && s.code === Ze.ENTER && (n.fullScreen = !n.fullScreen, n.root.focus()), s.metaKey && s.code === Ze.KEY_A && (n.dragSelect.selectAll(), s.preventDefault())));
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
    const e = le("ServiceContainer"), { getStore: s } = e.storage, { t: r } = e.i18n, o = L(""), i = L(""), d = () => {
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
          i.value = r(f.message);
        }
      });
    };
    return (f, c) => (p(), Z(nt, null, {
      buttons: se(() => [
        l("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, w(a(r)("Create")), 1),
        l("button", {
          type: "button",
          onClick: c[2] || (c[2] = (u) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(r)("Cancel")), 1)
      ]),
      default: se(() => [
        l("div", null, [
          W(dt, {
            icon: a(Uo),
            title: a(r)("New Folder")
          }, null, 8, ["icon", "title"]),
          l("div", hi, [
            l("div", gi, [
              l("p", bi, w(a(r)("Create a new folder")), 1),
              he(l("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (u) => o.value = u),
                onKeyup: It(d, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: a(r)("Folder Name"),
                type: "text"
              }, null, 40, wi), [
                [Rt, o.value]
              ]),
              i.value.length ? (p(), Z(st, {
                key: 0,
                onHidden: c[1] || (c[1] = (u) => i.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(w(i.value), 1)
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
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = s("uppy"), o = L(""), i = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, d = L({ QUEUE_ENTRY_STATUS: i }), f = L(null), c = L(null), u = L(null), m = L(null), v = L(null), g = L(null), _ = L([]), h = L(""), y = L(!1), F = L(!1);
    let S;
    function O(U) {
      return _.value.findIndex((Y) => Y.id === U);
    }
    function M(U, Y = null) {
      Y = Y ?? (U.webkitRelativePath || U.name), S.addFile({
        name: Y,
        type: U.type,
        data: U,
        source: "Local"
      });
    }
    function x(U) {
      switch (U.status) {
        case i.DONE:
          return "text-green-600";
        case i.ERROR:
          return "text-red-600";
        case i.CANCELED:
          return "text-red-600";
        case i.PENDING:
        default:
          return "";
      }
    }
    const V = (U) => {
      switch (U.status) {
        case i.DONE:
          return "✓";
        case i.ERROR:
        case i.CANCELED:
          return "!";
        case i.PENDING:
        default:
          return "...";
      }
    };
    function R() {
      m.value.click();
    }
    function $() {
      if (!y.value) {
        if (!_.value.filter((U) => U.status !== i.DONE).length) {
          h.value = s("Please select file to upload first.");
          return;
        }
        h.value = "", S.retryAll(), S.upload();
      }
    }
    function E() {
      S.cancelAll({ reason: "user" }), _.value.forEach((U) => {
        U.status !== i.DONE && (U.status = i.CANCELED, U.statusName = s("Canceled"));
      }), y.value = !1;
    }
    function k(U) {
      y.value || (S.removeFile(U.id, "removed-by-user"), _.value.splice(O(U.id), 1));
    }
    function T(U) {
      y.value || (S.cancelAll({ reason: "user" }), _.value.splice(0));
    }
    function I() {
      e.modal.close();
    }
    async function B() {
      return {
        url: "undefined/v1/filemanager",
        method: "POST",
        headers: {
          ...o.value ? { Authorization: `Bearer ${o.value}` } : {}
        },
        params: {
          q: "upload",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          vf: 1
        }
      };
    }
    return Ee(async () => {
      o = await authStore.getAccessToken(), S = new pr({
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
        onBeforeFileAdded(D, N) {
          if (N[D.id] != null) {
            const oe = O(D.id);
            _.value[oe].status === i.PENDING && (h.value = S.i18n("noDuplicates", { fileName: D.name })), _.value = _.value.filter((ne) => ne.id !== D.id);
          }
          return _.value.push({
            id: D.id,
            name: D.name,
            size: e.filesize(D.size),
            status: i.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: D.data
          }), !0;
        }
      }), S.use(hr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(D, N) {
          let q;
          try {
            q = JSON.parse(D).message;
          } catch {
            q = s("Cannot parse server response.");
          }
          return new Error(q);
        }
      }), S.on("restriction-failed", (D, N) => {
        const q = _.value[O(D.id)];
        k(q), h.value = N.message;
      }), S.on("upload", () => {
        const D = B();
        S.setMeta({ ...D.body });
        const N = S.getPlugin("XHRUpload");
        N.opts.method = D.method, N.opts.endpoint = D.url + "?" + new URLSearchParams(D.params), N.opts.headers = D.headers, delete D.headers["Content-Type"], y.value = !0, _.value.forEach((q) => {
          q.status !== i.DONE && (q.percent = null, q.status = i.UPLOADING, q.statusName = s("Pending upload"));
        });
      }), S.on("upload-progress", (D, N) => {
        const q = Math.floor(N.bytesUploaded / N.bytesTotal * 100);
        _.value[O(D.id)].percent = `${q}%`;
      }), S.on("upload-success", (D) => {
        const N = _.value[O(D.id)];
        N.status = i.DONE, N.statusName = s("Done"), e.emitter.emit("vf-fetch", {
          params: {
            q: "index",
            adapter: e.fs.adapter,
            path: e.fs.data.dirname
          }
        });
      }), S.on("upload-error", (D, N) => {
        const q = _.value[O(D.id)];
        q.percent = null, q.status = i.ERROR, N.isNetworkError ? q.statusName = s(
          "Network Error, Unable establish connection to the server or interrupted."
        ) : q.statusName = N ? N.message : s("Unknown Error");
      }), S.on("error", (D) => {
        h.value = D.message, y.value = !1, e.emitter.emit("vf-fetch", {
          params: {
            q: "index",
            adapter: e.fs.adapter,
            path: e.fs.data.dirname
          },
          noCloseModal: !0
        });
      }), S.on("complete", () => {
        y.value = !1, e.emitter.emit("vf-fetch", {
          params: {
            q: "index",
            adapter: e.fs.adapter,
            path: e.fs.data.dirname
          },
          noCloseModal: !0
        });
      }), m.value.addEventListener("click", () => {
        c.value.click();
      }), v.value.addEventListener("click", () => {
        u.value.click();
      }), g.value.addEventListener("dragover", (D) => {
        D.preventDefault(), F.value = !0;
      }), g.value.addEventListener("dragleave", (D) => {
        D.preventDefault(), F.value = !1;
      });
      function U(D, N) {
        N.isFile && N.file((q) => D(N, q)), N.isDirectory && N.createReader().readEntries((q) => {
          q.forEach((oe) => {
            U(D, oe);
          });
        });
      }
      g.value.addEventListener("drop", (D) => {
        D.preventDefault(), F.value = !1;
        const N = /^[/\\](.+)/;
        [...D.dataTransfer.items].forEach((q) => {
          q.kind === "file" && U((oe, ne) => {
            const fe = N.exec(oe.fullPath);
            M(ne, fe[1]);
          }, q.webkitGetAsEntry());
        });
      });
      const Y = ({ target: D }) => {
        const N = D.files;
        for (const q of N)
          M(q);
        D.value = "";
      };
      c.value.addEventListener("change", Y), u.value.addEventListener("change", Y);
    }), qs(() => {
      S == null || S.close({ reason: "unmount" });
    }), (U, Y) => (p(), Z(nt, null, {
      buttons: se(() => [
        l("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: y.value,
          onClick: et($, ["prevent"])
        }, w(a(s)("Upload")), 9, Fi),
        y.value ? (p(), b("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: et(E, ["prevent"])
        }, w(a(s)("Cancel")), 1)) : (p(), b("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: et(I, ["prevent"])
        }, w(a(s)("Close")), 1))
      ]),
      default: se(() => [
        l("div", null, [
          W(dt, {
            icon: a(Bo),
            title: a(s)("Upload Files")
          }, null, 8, ["icon", "title"]),
          l("div", xi, [
            l("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: g,
              onClick: R
            }, [
              F.value ? (p(), b("div", Si, w(a(s)("Release to drop these files.")), 1)) : (p(), b("div", $i, w(a(s)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            l("div", {
              ref_key: "container",
              ref: f,
              class: "vuefinder__upload-modal__buttons"
            }, [
              l("button", {
                ref_key: "pickFiles",
                ref: m,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, w(a(s)("Select Files")), 513),
              l("button", {
                ref_key: "pickFolders",
                ref: v,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, w(a(s)("Select Folders")), 513),
              l("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: y.value,
                onClick: Y[0] || (Y[0] = (D) => T())
              }, w(a(s)("Clear all")), 9, Ci)
            ], 512),
            l("div", Ei, [
              (p(!0), b(ke, null, Ce(_.value, (D) => (p(), b("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: D.id
              }, [
                l("span", {
                  class: de(["vuefinder__upload-modal__file-icon", x(D)])
                }, [
                  l("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: w(V(D))
                  }, null, 8, Ti)
                ], 2),
                l("div", Ai, [
                  l("div", Mi, w(a(Zn)(D.name, 40)) + " (" + w(D.size) + ") ", 1),
                  l("div", Di, w(a(Zn)(D.name, 16)) + " (" + w(D.size) + ") ", 1),
                  l("div", {
                    class: de(["vuefinder__upload-modal__file-status", x(D)])
                  }, [
                    ee(w(D.statusName) + " ", 1),
                    D.status === d.value.QUEUE_ENTRY_STATUS.UPLOADING ? (p(), b("b", Li, w(D.percent), 1)) : j("", !0)
                  ], 2)
                ]),
                l("button", {
                  type: "button",
                  class: de(["vuefinder__upload-modal__file-remove", y.value ? "disabled" : ""]),
                  title: a(s)("Delete"),
                  disabled: y.value,
                  onClick: (N) => k(D)
                }, Y[2] || (Y[2] = [
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
              _.value.length ? j("", !0) : (p(), b("div", Vi, w(a(s)("No files selected!")), 1))
            ]),
            h.value.length ? (p(), Z(st, {
              key: 0,
              onHidden: Y[1] || (Y[1] = (D) => h.value = ""),
              error: ""
            }, {
              default: se(() => [
                ee(w(h.value), 1)
              ]),
              _: 1
            })) : j("", !0)
          ])
        ]),
        l("input", {
          ref_key: "internalFileInput",
          ref: c,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        l("input", {
          ref_key: "internalFolderInput",
          ref: u,
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
const No = { render: Ui }, Hi = { class: "vuefinder__unarchive-modal__content" }, Bi = { class: "vuefinder__unarchive-modal__items" }, Ni = { class: "vuefinder__unarchive-modal__item" }, qi = {
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
}, zi = { class: "vuefinder__unarchive-modal__item-name" }, ji = { class: "vuefinder__unarchive-modal__info" }, qo = {
  __name: "ModalUnarchive",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = L(e.modal.data.items[0]), o = L(""), i = L([]), d = () => {
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
    return (f, c) => (p(), Z(nt, null, {
      buttons: se(() => [
        l("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, w(a(s)("Unarchive")), 1),
        l("button", {
          type: "button",
          onClick: c[1] || (c[1] = (u) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        l("div", null, [
          W(dt, {
            icon: a(No),
            title: a(s)("Unarchive")
          }, null, 8, ["icon", "title"]),
          l("div", Hi, [
            l("div", Bi, [
              (p(!0), b(ke, null, Ce(i.value, (u) => (p(), b("p", Ni, [
                u.type === "dir" ? (p(), b("svg", qi, c[2] || (c[2] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (p(), b("svg", Pi, c[3] || (c[3] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                l("span", zi, w(u.basename), 1)
              ]))), 256)),
              l("p", ji, w(a(s)("The archive will be unarchived at")) + " (" + w(a(e).fs.data.dirname) + ")", 1),
              o.value.length ? (p(), Z(st, {
                key: 0,
                onHidden: c[0] || (c[0] = (u) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(w(o.value), 1)
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
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = L(""), o = L(""), i = L(e.modal.data.items), d = () => {
      i.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: i.value.map(({ path: f, type: c }) => ({ path: f, type: c })),
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
    return (f, c) => (p(), Z(nt, null, {
      buttons: se(() => [
        l("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, w(a(s)("Archive")), 1),
        l("button", {
          type: "button",
          onClick: c[2] || (c[2] = (u) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(s)("Cancel")), 1)
      ]),
      default: se(() => [
        l("div", null, [
          W(dt, {
            icon: a(Po),
            title: a(s)("Archive the files")
          }, null, 8, ["icon", "title"]),
          l("div", Yi, [
            l("div", Ki, [
              l("div", Xi, [
                (p(!0), b(ke, null, Ce(i.value, (u) => (p(), b("p", Zi, [
                  u.type === "dir" ? (p(), b("svg", Ji, c[3] || (c[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (p(), b("svg", Qi, c[4] || (c[4] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  l("span", ec, w(u.basename), 1)
                ]))), 256))
              ]),
              he(l("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (u) => r.value = u),
                onKeyup: It(d, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: a(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, tc), [
                [Rt, r.value]
              ]),
              o.value.length ? (p(), Z(st, {
                key: 0,
                onHidden: c[1] || (c[1] = (u) => o.value = ""),
                error: ""
              }, {
                default: se(() => [
                  ee(w(o.value), 1)
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
    const e = le("ServiceContainer"), { setStore: s } = e.storage, { t: r } = e.i18n, o = e.dragSelect, i = L("");
    e.emitter.on("vf-search-query", ({ newQuery: c }) => {
      i.value = c;
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
    return (c, u) => (p(), b("div", pc, [
      i.value.length ? (p(), b("div", Sc, [
        l("div", $c, [
          ee(w(a(r)("Search results for")) + " ", 1),
          l("span", Cc, w(i.value), 1)
        ]),
        a(e).loadingIndicator === "circular" && a(e).fs.loading ? (p(), Z(a(ms), { key: 0 })) : j("", !0)
      ])) : (p(), b("div", hc, [
        a(e).features.includes(a(me).NEW_FOLDER) ? (p(), b("div", {
          key: 0,
          class: "mx-1.5",
          title: a(r)("New Folder"),
          onClick: u[0] || (u[0] = (m) => a(e).modal.open(Ho, { items: a(o).getSelected() }))
        }, [
          W(a(Uo))
        ], 8, gc)) : j("", !0),
        a(e).features.includes(a(me).UPLOAD) ? (p(), b("div", {
          key: 1,
          class: "mx-1.5",
          title: a(r)("Upload"),
          onClick: u[1] || (u[1] = (m) => a(e).modal.open(Ii, { items: a(o).getSelected() }))
        }, [
          W(a(Bo))
        ], 8, bc)) : j("", !0),
        a(e).features.includes(a(me).RENAME) ? (p(), b("div", {
          key: 2,
          class: "mx-1.5",
          title: a(r)("Rename"),
          onClick: u[2] || (u[2] = (m) => a(o).getCount() !== 1 || a(e).modal.open(_s, { items: a(o).getSelected() }))
        }, [
          W(a(Ro), {
            class: de(a(o).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, wc)) : j("", !0),
        a(e).features.includes(a(me).DELETE) ? (p(), b("div", {
          key: 3,
          class: "mx-1.5",
          title: a(r)("Delete"),
          onClick: u[3] || (u[3] = (m) => !a(o).getCount() || a(e).modal.open(vs, { items: a(o).getSelected() }))
        }, [
          W(a(Io), {
            class: de(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, yc)) : j("", !0),
        a(e).features.includes(a(me).UNARCHIVE) && a(o).getCount() === 1 && a(o).getSelected()[0].mime_type === "application/zip" ? (p(), b("div", {
          key: 4,
          class: "mx-1.5",
          title: a(r)("Unarchive"),
          onClick: u[4] || (u[4] = (m) => !a(o).getCount() || a(e).modal.open(qo, { items: a(o).getSelected() }))
        }, [
          W(a(No), {
            class: de(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, kc)) : j("", !0),
        a(e).features.includes(a(me).ARCHIVE) ? (p(), b("div", {
          key: 5,
          class: "mx-1.5",
          title: a(r)("Archive"),
          onClick: u[5] || (u[5] = (m) => !a(o).getCount() || a(e).modal.open(zo, { items: a(o).getSelected() }))
        }, [
          W(a(Po), {
            class: de(a(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, xc)) : j("", !0)
      ])),
      l("div", Ec, [
        a(e).features.includes(a(me).FULL_SCREEN) ? (p(), b("div", {
          key: 0,
          onClick: d,
          class: "mx-1.5",
          title: a(r)("Toggle Full Screen")
        }, [
          a(e).fullScreen ? (p(), Z(a(cc), { key: 0 })) : (p(), Z(a(ac), { key: 1 }))
        ], 8, Tc)) : j("", !0),
        l("div", {
          class: "mx-1.5",
          title: a(r)("Change View"),
          onClick: u[6] || (u[6] = (m) => i.value.length || f())
        }, [
          a(e).view === "grid" ? (p(), Z(a(fc), {
            key: 0,
            class: de(["vf-toolbar-icon", i.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : j("", !0),
          a(e).view === "list" ? (p(), Z(a(mc), {
            key: 1,
            class: de(["vf-toolbar-icon", i.value.length ? "vf-toolbar-icon-disabled" : ""])
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
  const r = L(n);
  return lr((o, i) => ({
    get() {
      return o(), r.value;
    },
    set: Dc(
      (d) => {
        r.value = d, i();
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
}, Nc = { class: "vuefinder__move-modal__file-name" }, qc = { class: "vuefinder__move-modal__target-title" }, Pc = { class: "vuefinder__move-modal__target-directory" }, zc = { class: "vuefinder__move-modal__target-path" }, jc = { class: "vuefinder__move-modal__selected-items" }, Jn = {
  __name: "ModalMove",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = L(e.modal.data.items.from), o = L(""), i = () => {
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
    return (d, f) => (p(), Z(nt, null, {
      buttons: se(() => [
        l("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, w(a(s)("Yes, Move!")), 1),
        l("button", {
          type: "button",
          onClick: f[1] || (f[1] = (c) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(s)("Cancel")), 1),
        l("div", jc, w(a(s)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: se(() => [
        l("div", null, [
          W(dt, {
            icon: a(Vc),
            title: a(s)("Move files")
          }, null, 8, ["icon", "title"]),
          l("div", Fc, [
            l("p", Ic, w(a(s)("Are you sure you want to move these files?")), 1),
            l("div", Rc, [
              (p(!0), b(ke, null, Ce(r.value, (c) => (p(), b("div", Uc, [
                l("div", null, [
                  c.type === "dir" ? (p(), b("svg", Hc, f[2] || (f[2] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (p(), b("svg", Bc, f[3] || (f[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                l("div", Nc, w(c.path), 1)
              ]))), 256))
            ]),
            l("h4", qc, w(a(s)("Target Directory")), 1),
            l("p", Pc, [
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
              l("span", zc, w(a(e).modal.data.items.to.path), 1)
            ]),
            o.value.length ? (p(), Z(st, {
              key: 0,
              onHidden: f[0] || (f[0] = (c) => o.value = ""),
              error: ""
            }, {
              default: se(() => [
                ee(w(o.value), 1)
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
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = e.dragSelect, { setStore: o } = e.storage, i = L(null), d = Us(0, 100);
    Oe(d, ($) => {
      const E = i.value.children;
      let k = 0, T = 0, I = 5, B = 1;
      e.fs.limitBreadcrumbItems(I), _t(() => {
        for (let U = E.length - 1; U >= 0 && !(k + E[U].offsetWidth > d.value - 40); U--)
          k += parseInt(E[U].offsetWidth, 10), T++;
        T < B && (T = B), T > I && (T = I), e.fs.limitBreadcrumbItems(T);
      });
    });
    const f = () => {
      d.value = i.value.offsetWidth;
    };
    let c = L(null);
    Ee(() => {
      c.value = new ResizeObserver(f), c.value.observe(i.value);
    }), Qn(() => {
      c.value.disconnect();
    });
    const u = ($, E = null) => {
      $.preventDefault(), r.isDraggingRef.value = !1, g($), E ?? (E = e.fs.hiddenBreadcrumbs.length - 1);
      let k = JSON.parse($.dataTransfer.getData("items"));
      if (k.find((T) => T.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Jn, {
        items: {
          from: k,
          to: e.fs.hiddenBreadcrumbs[E] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, m = ($, E = null) => {
      $.preventDefault(), r.isDraggingRef.value = !1, g($), E ?? (E = e.fs.breadcrumbs.length - 2);
      let k = JSON.parse($.dataTransfer.getData("items"));
      if (k.find((T) => T.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Jn, {
        items: {
          from: k,
          to: e.fs.breadcrumbs[E] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, v = ($) => {
      $.preventDefault(), e.fs.isGoUpAvailable() ? ($.dataTransfer.dropEffect = "copy", $.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : ($.dataTransfer.dropEffect = "none", $.dataTransfer.effectAllowed = "none");
    }, g = ($) => {
      $.preventDefault(), $.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && $.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, _ = () => {
      V(), e.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }, h = () => {
      V(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
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
    }, F = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, S = {
      mounted($, E, k, T) {
        $.clickOutsideEvent = function(I) {
          $ === I.target || $.contains(I.target) || E.value();
        }, document.body.addEventListener("click", $.clickOutsideEvent);
      },
      beforeUnmount($, E, k, T) {
        document.body.removeEventListener("click", $.clickOutsideEvent);
      }
    };
    Oe(
      () => e.showTreeView,
      ($, E) => {
        $ !== E && o("show-tree-view", $);
      }
    );
    const O = L(null), M = () => {
      e.features.includes(me.SEARCH) && (e.fs.searchMode = !0, _t(() => O.value.focus()));
    }, x = Us("", 400);
    Oe(x, ($) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: $ });
    }), Oe(
      () => e.fs.searchMode,
      ($) => {
        $ && _t(() => O.value.focus());
      }
    );
    const V = () => {
      e.fs.searchMode = !1, x.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      V();
    });
    const R = () => {
      x.value === "" && V();
    };
    return ($, E) => (p(), b("div", md, [
      l("span", {
        title: a(s)("Go up a directory")
      }, [
        W(a(Zc), {
          onDragover: E[0] || (E[0] = (k) => v(k)),
          onDragleave: E[1] || (E[1] = (k) => g(k)),
          onDrop: E[2] || (E[2] = (k) => m(k)),
          onClick: h,
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
          onClick: E[3] || (E[3] = (k) => a(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, gd)) : (p(), b("span", {
        key: 0,
        title: a(s)("Refresh")
      }, [
        W(a(Yc), { onClick: _ })
      ], 8, hd)),
      he(l("div", {
        onClick: et(M, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        l("div", null, [
          W(a(sd), {
            onDragover: E[4] || (E[4] = (k) => v(k)),
            onDragleave: E[5] || (E[5] = (k) => g(k)),
            onDrop: E[6] || (E[6] = (k) => m(k, -1)),
            onClick: E[7] || (E[7] = (k) => a(e).emitter.emit("vf-fetch", {
              params: { q: "index", adapter: a(e).fs.adapter }
            }))
          })
        ]),
        l("div", bd, [
          a(e).fs.hiddenBreadcrumbs.length ? he((p(), b("div", wd, [
            E[13] || (E[13] = l("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("div", yd, [
              l("span", {
                onDragenter: E[8] || (E[8] = (k) => a(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: E[9] || (E[9] = (k) => a(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                W(a(_d), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [S, F]
          ]) : j("", !0)
        ]),
        l("div", {
          ref_key: "breadcrumbContainer",
          ref: i,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: et(M, ["self"])
        }, [
          (p(!0), b(ke, null, Ce(a(e).fs.breadcrumbs, (k, T) => (p(), b("div", { key: T }, [
            E[14] || (E[14] = l("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("span", {
              onDragover: (I) => T === a(e).fs.breadcrumbs.length - 1 || v(I),
              onDragleave: (I) => T === a(e).fs.breadcrumbs.length - 1 || g(I),
              onDrop: (I) => T === a(e).fs.breadcrumbs.length - 1 || m(I, T),
              class: "vuefinder__breadcrumb__item",
              title: k.basename,
              onClick: (I) => a(e).emitter.emit("vf-fetch", {
                params: {
                  q: "index",
                  adapter: a(e).fs.adapter,
                  path: k.path
                }
              })
            }, w(k.name), 41, kd)
          ]))), 128))
        ], 512),
        a(e).loadingIndicator === "circular" && a(e).fs.loading ? (p(), Z(a(ms), { key: 0 })) : j("", !0)
      ], 512), [
        [Ge, !a(e).fs.searchMode]
      ]),
      he(l("div", xd, [
        l("div", null, [
          W(a(ad))
        ]),
        he(l("input", {
          ref_key: "searchInput",
          ref: O,
          onKeydown: It(V, ["esc"]),
          onBlur: R,
          "onUpdate:modelValue": E[10] || (E[10] = (k) => ir(x) ? x.value = k : null),
          placeholder: a(s)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, Sd), [
          [Rt, a(x)]
        ]),
        W(a(cd), { onClick: V })
      ], 512), [
        [Ge, a(e).fs.searchMode]
      ]),
      he(l("div", $d, [
        (p(!0), b(ke, null, Ce(a(e).fs.hiddenBreadcrumbs, (k, T) => (p(), b("div", {
          key: T,
          onDragover: E[11] || (E[11] = (I) => v(I)),
          onDragleave: E[12] || (E[12] = (I) => g(I)),
          onDrop: (I) => u(I, T),
          onClick: (I) => y(k),
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
    const e = le("ServiceContainer"), { getStore: s } = e.storage, r = L(s("full-screen", !1)), o = L([]), i = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", d = (c) => {
      o.value.splice(c, 1);
    }, f = (c) => {
      let u = o.value.findIndex((m) => m.id === c);
      u !== -1 && d(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      o.value = [];
    }), e.emitter.on("vf-toast-push", (c) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      c.id = u, o.value.push(c), setTimeout(() => {
        f(u);
      }, 5e3);
    }), (c, u) => (p(), b("div", {
      class: de(["vuefinder__toast", r.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      W(cr, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: se(() => [
          (p(!0), b(ke, null, Ce(o.value, (m, v) => (p(), b("div", {
            key: v,
            onClick: (g) => d(v),
            class: de(["vuefinder__toast__message", i(m.type)])
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
      n.direction === "asc" ? (p(), Z(a(Vd), { key: 0 })) : j("", !0),
      n.direction === "desc" ? (p(), Z(a(Rd), { key: 1 })) : j("", !0)
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
const Bd = { render: Hd }, Nd = { class: "vuefinder__item-icon" }, Fn = {
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
    return (e, s) => (p(), b("span", Nd, [
      n.type === "dir" ? (p(), Z(a(xn), {
        key: 0,
        class: de(n.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (p(), Z(a(Bd), {
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
function Pd(n, e) {
  return p(), b("svg", qd, e[0] || (e[0] = [
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
    const s = e, r = L(""), o = L(""), i = L(null), d = L(!1), f = L(""), c = L(!1), u = le("ServiceContainer"), { t: m } = u.i18n;
    Ee(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((_) => {
        r.value = _, s("success");
      });
    });
    const v = () => {
      d.value = !d.value, o.value = r.value;
    }, g = () => {
      f.value = "", c.value = !1, u.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: u.modal.data.adapter,
          path: u.modal.data.item.path
        },
        body: {
          content: o.value
        },
        responseType: "text"
      }).then((_) => {
        f.value = m("Updated."), r.value = _, s("success"), d.value = !d.value;
      }).catch((_) => {
        f.value = m(_.message), c.value = !0;
      });
    };
    return (_, h) => (p(), b("div", Yd, [
      l("div", Kd, [
        l("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: a(u).modal.data.item.path
        }, w(a(u).modal.data.item.basename), 9, Xd),
        l("div", Zd, [
          d.value ? (p(), b("button", {
            key: 0,
            onClick: g,
            class: "vuefinder__text-preview__save-button"
          }, w(a(m)("Save")), 1)) : j("", !0),
          a(u).features.includes(a(me).EDIT) ? (p(), b("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = (y) => v())
          }, w(d.value ? a(m)("Cancel") : a(m)("Edit")), 1)) : j("", !0)
        ])
      ]),
      l("div", null, [
        d.value ? (p(), b("div", Qd, [
          he(l("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": h[1] || (h[1] = (y) => o.value = y),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Rt, o.value]
          ])
        ])) : (p(), b("pre", Jd, w(r.value), 1)),
        f.value.length ? (p(), Z(st, {
          key: 2,
          onHidden: h[2] || (h[2] = (y) => f.value = ""),
          error: c.value
        }, {
          default: se(() => [
            ee(w(f.value), 1)
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
    const s = e, r = le("ServiceContainer"), { t: o } = r.i18n, i = L(null), d = L(null), f = L(!1), c = L(""), u = L(!1), m = () => {
      f.value = !f.value, f.value ? d.value = new br(i.value, {
        crop(g) {
        }
      }) : d.value.destroy();
    }, v = () => {
      d.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (g) => {
          c.value = "", u.value = !1;
          const _ = new FormData();
          _.set("file", g), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: _
          }).then((h) => {
            c.value = o("Updated."), i.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), m(), s("success");
          }).catch((h) => {
            c.value = o(h.message), u.value = !0;
          });
        }
      );
    };
    return Ee(() => {
      s("success");
    }), (g, _) => (p(), b("div", tu, [
      l("div", nu, [
        l("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: a(r).modal.data.item.path
        }, w(a(r).modal.data.item.basename), 9, su),
        l("div", ou, [
          f.value ? (p(), b("button", {
            key: 0,
            onClick: v,
            class: "vuefinder__image-preview__crop-button"
          }, w(a(o)("Crop")), 1)) : j("", !0),
          a(r).features.includes(a(me).EDIT) ? (p(), b("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: _[0] || (_[0] = (h) => m())
          }, w(f.value ? a(o)("Cancel") : a(o)("Edit")), 1)) : j("", !0)
        ])
      ]),
      l("div", ru, [
        l("img", {
          ref_key: "image",
          ref: i,
          class: "vuefinder__image-preview__image",
          src: a(r).requester.getPreviewUrl(a(r).modal.data.adapter, a(r).modal.data.item),
          alt: ""
        }, null, 8, au)
      ]),
      c.value.length ? (p(), Z(st, {
        key: 0,
        onHidden: _[1] || (_[1] = (h) => c.value = ""),
        error: u.value
      }, {
        default: se(() => [
          ee(w(c.value), 1)
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
    }), (o, i) => (p(), b("div", iu, [
      l("div", cu, [
        l("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: a(s).modal.data.item.path
        }, w(a(s).modal.data.item.basename), 9, du)
      ]),
      i[0] || (i[0] = l("div", null, null, -1))
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
    }), (i, d) => (p(), b("div", fu, [
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
          d[0] || (d[0] = ee(" Your browser does not support the video tag. "))
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
    }), (i, d) => (p(), b("div", hu, [
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
          d[0] || (d[0] = ee(" Your browser does not support the audio element. "))
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
    }), (i, d) => (p(), b("div", ku, [
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
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = L(!1), o = (d) => (e.modal.data.item.mime_type ?? "").startsWith(d), i = e.features.includes(me.PREVIEW);
    return i || (r.value = !0), (d, f) => (p(), Z(nt, null, {
      buttons: se(() => [
        l("button", {
          type: "button",
          onClick: f[6] || (f[6] = (c) => a(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(a(s)("Close")), 1),
        a(e).features.includes(a(me).DOWNLOAD) ? (p(), b("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: a(e).requester.getDownloadUrl(a(e).modal.data.adapter, a(e).modal.data.item),
          href: a(e).requester.getDownloadUrl(a(e).modal.data.adapter, a(e).modal.data.item)
        }, w(a(s)("Download")), 9, Fu)) : j("", !0)
      ]),
      default: se(() => [
        l("div", null, [
          l("div", Eu, [
            a(i) ? (p(), b("div", Tu, [
              o("text") ? (p(), Z(eu, {
                key: 0,
                onSuccess: f[0] || (f[0] = (c) => r.value = !0)
              })) : o("image") ? (p(), Z(lu, {
                key: 1,
                onSuccess: f[1] || (f[1] = (c) => r.value = !0)
              })) : o("video") ? (p(), Z(pu, {
                key: 2,
                onSuccess: f[2] || (f[2] = (c) => r.value = !0)
              })) : o("audio") ? (p(), Z(yu, {
                key: 3,
                onSuccess: f[3] || (f[3] = (c) => r.value = !0)
              })) : o("application/pdf") ? (p(), Z(Cu, {
                key: 4,
                onSuccess: f[4] || (f[4] = (c) => r.value = !0)
              })) : (p(), Z(uu, {
                key: 5,
                onSuccess: f[5] || (f[5] = (c) => r.value = !0)
              }))
            ])) : j("", !0),
            l("div", Au, [
              r.value === !1 ? (p(), b("div", Mu, [
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
        l("div", Du, [
          l("div", null, [
            l("span", Lu, w(a(s)("File Size")) + ": ", 1),
            ee(w(a(e).filesize(a(e).modal.data.item.file_size)), 1)
          ]),
          l("div", null, [
            l("span", Ou, w(a(s)("Last Modified")) + ": ", 1),
            ee(" " + w(a(jo)(a(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        a(e).features.includes(a(me).DOWNLOAD) ? (p(), b("div", Vu, [
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
    }, i = {
      mounted(_, h, y, F) {
        y.props.draggable && (_.addEventListener("dragstart", (S) => d(S, h.value)), _.addEventListener("dragover", (S) => c(S, h.value)), _.addEventListener("drop", (S) => f(S, h.value)));
      },
      beforeUnmount(_, h, y, F) {
        y.props.draggable && (_.removeEventListener("dragstart", d), _.removeEventListener("dragover", c), _.removeEventListener("drop", f));
      }
    }, d = (_, h) => {
      if (_.altKey || _.ctrlKey || _.metaKey)
        return _.preventDefault(), !1;
      s.isDraggingRef.value = !0, _.dataTransfer.setDragImage(r.dragImage.$el, 0, 15), _.dataTransfer.effectAllowed = "all", _.dataTransfer.dropEffect = "copy", _.dataTransfer.setData("items", JSON.stringify(s.getSelected()));
    }, f = (_, h) => {
      _.preventDefault(), s.isDraggingRef.value = !1;
      let y = JSON.parse(_.dataTransfer.getData("items"));
      if (y.find((F) => F.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Jn, { items: { from: y, to: h } });
    }, c = (_, h) => {
      _.preventDefault(), !h || h.type !== "dir" || s.getSelection().find((y) => y === _.currentTarget) ? (_.dataTransfer.dropEffect = "none", _.dataTransfer.effectAllowed = "none") : _.dataTransfer.dropEffect = "copy";
    };
    let u = null, m = !1;
    const v = () => {
      u && clearTimeout(u);
    }, g = (_) => {
      if (!m)
        m = !0, setTimeout(() => m = !1, 300);
      else
        return m = !1, o(r.item), clearTimeout(u), !1;
      u = setTimeout(() => {
        const h = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: _.target.getBoundingClientRect().x,
          clientY: _.target.getBoundingClientRect().y
        });
        _.target.dispatchEvent(h);
      }, 500);
    };
    return (_, h) => he((p(), b("div", {
      style: vn({ opacity: a(s).isDraggingRef.value && a(s).getSelection().find((y) => _.$el === y) ? "0.5 !important" : "" }),
      class: de(["vuefinder__item", "vf-item-" + a(s).explorerId]),
      "data-type": n.item.type,
      key: n.item.path,
      "data-item": JSON.stringify(n.item),
      "data-index": n.index,
      onDblclick: h[0] || (h[0] = (y) => o(n.item)),
      onTouchstart: h[1] || (h[1] = (y) => g(y)),
      onTouchend: h[2] || (h[2] = (y) => v()),
      onContextmenu: h[3] || (h[3] = et((y) => a(e).emitter.emit("vf-contextmenu-show", { event: y, items: a(s).getSelected(), target: n.item }), ["prevent"]))
    }, [
      Lt(_.$slots, "default"),
      a(e).pinnedFolders.find((y) => y.path === n.item.path) ? (p(), Z(a(Wo), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : j("", !0)
    ], 46, Uu)), [
      [i, n.item]
    ]);
  }
}, Hu = { class: "vuefinder__explorer__container" }, Bu = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Nu = { class: "vuefinder__explorer__drag-item" }, qu = {
  key: 0,
  class: "vuefinder__linear-loader absolute"
}, Pu = { class: "vuefinder__explorer__item-list-content" }, zu = { class: "vuefinder__explorer__item-list-name" }, ju = { class: "vuefinder__explorer__item-name" }, Gu = { class: "vuefinder__explorer__item-path" }, Wu = { class: "vuefinder__explorer__item-list-content" }, Yu = { class: "vuefinder__explorer__item-list-name" }, Ku = { class: "vuefinder__explorer__item-name" }, Xu = { class: "vuefinder__explorer__item-size" }, Zu = { class: "vuefinder__explorer__item-date" }, Ju = { class: "vuefinder__explorer__item-grid-content" }, Qu = ["data-src", "alt"], ef = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, tf = { class: "vuefinder__explorer__item-title break-all" }, nf = {
  __name: "Explorer",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, r = (v) => v == null ? void 0 : v.substring(0, 3), o = L(null), i = L(""), d = e.dragSelect;
    let f;
    e.emitter.on("vf-fullscreen-toggle", () => {
      d.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: v }) => {
      i.value = v, v ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: v
        },
        onSuccess: (g) => {
          g.files.length || e.emitter.emit("vf-toast-push", { label: s("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const c = pt({ active: !1, column: "", order: "" }), u = (v = !0) => {
      let g = [...e.fs.data.files], _ = c.column, h = c.order === "asc" ? 1 : -1;
      if (!v)
        return g;
      const y = (F, S) => typeof F == "string" && typeof S == "string" ? F.toLowerCase().localeCompare(S.toLowerCase()) : F < S ? -1 : F > S ? 1 : 0;
      return c.active && (g = g.slice().sort((F, S) => y(F[_], S[_]) * h)), g;
    }, m = (v) => {
      c.active && c.column === v ? (c.active = c.order === "asc", c.column = v, c.order = "desc") : (c.active = !0, c.column = v, c.order = "asc");
    };
    return Ee(() => {
      f = new gr(d.area.value);
    }), Bs(() => {
      f.update();
    }), qs(() => {
      f.destroy();
    }), (v, g) => (p(), b("div", Hu, [
      a(e).view === "list" || i.value.length ? (p(), b("div", Bu, [
        l("div", {
          onClick: g[0] || (g[0] = (_) => m("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          ee(w(a(s)("Name")) + " ", 1),
          he(W(en, {
            direction: c.order
          }, null, 8, ["direction"]), [
            [Ge, c.active && c.column === "basename"]
          ])
        ]),
        i.value.length ? j("", !0) : (p(), b("div", {
          key: 0,
          onClick: g[1] || (g[1] = (_) => m("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          ee(w(a(s)("Size")) + " ", 1),
          he(W(en, {
            direction: c.order
          }, null, 8, ["direction"]), [
            [Ge, c.active && c.column === "file_size"]
          ])
        ])),
        i.value.length ? j("", !0) : (p(), b("div", {
          key: 1,
          onClick: g[2] || (g[2] = (_) => m("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          ee(w(a(s)("Date")) + " ", 1),
          he(W(en, {
            direction: c.order
          }, null, 8, ["direction"]), [
            [Ge, c.active && c.column === "last_modified"]
          ])
        ])),
        i.value.length ? (p(), b("div", {
          key: 2,
          onClick: g[3] || (g[3] = (_) => m("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          ee(w(a(s)("Filepath")) + " ", 1),
          he(W(en, {
            direction: c.order
          }, null, 8, ["direction"]), [
            [Ge, c.active && c.column === "path"]
          ])
        ])) : j("", !0)
      ])) : j("", !0),
      l("div", Nu, [
        W(Wd, {
          ref_key: "dragImage",
          ref: o,
          count: a(d).getCount()
        }, null, 8, ["count"])
      ]),
      l("div", {
        ref: a(d).scrollBarContainer,
        class: de(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": a(e).view === "grid" }, { "search-active": i.value.length }]])
      }, [
        l("div", {
          ref: a(d).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      l("div", {
        ref: a(d).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area min-h-32",
        onContextmenu: g[4] || (g[4] = et((_) => a(e).emitter.emit("vf-contextmenu-show", { event: _, items: a(d).getSelected() }), ["self", "prevent"]))
      }, [
        a(e).loadingIndicator === "linear" && a(e).fs.loading ? (p(), b("div", qu)) : j("", !0),
        i.value.length ? (p(!0), b(ke, { key: 1 }, Ce(u(), (_, h) => (p(), Z(In, {
          item: _,
          index: h,
          dragImage: o.value,
          class: "vf-item vf-item-list"
        }, {
          default: se(() => [
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
        a(e).view === "list" && !i.value.length ? (p(!0), b(ke, { key: 2 }, Ce(u(), (_, h) => (p(), Z(In, {
          item: _,
          index: h,
          dragImage: o.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: _.path
        }, {
          default: se(() => [
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
        a(e).view === "grid" && !i.value.length ? (p(!0), b(ke, { key: 3 }, Ce(u(!1), (_, h) => (p(), Z(In, {
          item: _,
          index: h,
          dragImage: o.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: se(() => [
            l("div", null, [
              l("div", Ju, [
                (_.mime_type ?? "").startsWith("image") && a(e).showThumbnails ? (p(), b("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": a(e).requester.getPreviewUrl(a(e).fs.adapter, _),
                  alt: _.basename,
                  key: _.path
                }, null, 8, Qu)) : (p(), Z(Fn, {
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
    const e = le("ServiceContainer"), s = L(null), r = L([]), o = L(""), i = pt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    });
    e.emitter.on("vf-context-selected", (u) => {
      r.value = u;
    });
    const d = (u) => u.link(e, r), f = (u) => {
      e.emitter.emit("vf-contextmenu-hide"), u.action(e, r);
    };
    e.emitter.on("vf-search-query", ({ newQuery: u }) => {
      o.value = u;
    }), e.emitter.on("vf-contextmenu-show", ({ event: u, items: m, target: v = null }) => {
      if (i.items = e.contextMenuItems.filter((g) => g.show(e, {
        searchQuery: o.value,
        items: m,
        target: v
      })), o.value)
        if (v)
          e.emitter.emit("vf-context-selected", [v]);
        else
          return;
      else !v && !o.value ? e.emitter.emit("vf-context-selected", []) : m.length > 1 && m.some((g) => g.path === v.path) ? e.emitter.emit("vf-context-selected", m) : e.emitter.emit("vf-context-selected", [v]);
      c(u);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const c = (u) => {
      const m = e.dragSelect.area.value, v = e.root.getBoundingClientRect(), g = m.getBoundingClientRect();
      let _ = u.clientX - v.left, h = u.clientY - v.top;
      i.active = !0, _t(() => {
        var O;
        const y = (O = s.value) == null ? void 0 : O.getBoundingClientRect();
        let F = (y == null ? void 0 : y.height) ?? 0, S = (y == null ? void 0 : y.width) ?? 0;
        _ = g.right - u.pageX + window.scrollX < S ? _ - S : _, h = g.bottom - u.pageY + window.scrollY < F ? h - F : h, i.positions = {
          left: _ + "px",
          top: h + "px"
        };
      });
    };
    return (u, m) => he((p(), b("ul", {
      ref_key: "contextmenu",
      ref: s,
      style: vn(i.positions),
      class: "vuefinder__context-menu"
    }, [
      (p(!0), b(ke, null, Ce(i.items, (v) => (p(), b("li", {
        class: "vuefinder__context-menu__item",
        key: v.title
      }, [
        v.link && v.type === "file" ? (p(), b("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: d(v),
          download: d(v),
          onClick: m[0] || (m[0] = (g) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          l("span", null, w(v.title(a(e).i18n)), 1)
        ], 8, sf)) : (p(), b("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (g) => f(v)
        }, [
          l("span", null, w(v.title(a(e).i18n)), 1)
        ], 8, of))
      ]))), 128))
    ], 4)), [
      [Ge, i.active]
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
    const e = le("ServiceContainer"), { t: s } = e.i18n, { setStore: r } = e.storage, o = e.dragSelect, i = L("");
    e.emitter.on("vf-search-query", ({ newQuery: m }) => {
      i.value = m;
    }), je(() => {
      const m = e.selectButton.multiple ? o.getSelected().length > 0 : o.getSelected().length === 1;
      return e.selectButton.active && m;
    });
    const d = je(() => {
      var v, g;
      const m = (g = (v = e.fs) == null ? void 0 : v.data) == null ? void 0 : g.used_space;
      return typeof m == "number" ? m.toFixed(2) : "0.00";
    }), f = je(() => {
      var v, g;
      const m = (g = (v = e.fs) == null ? void 0 : v.data) == null ? void 0 : g.total_space;
      return typeof m == "number" ? m.toFixed(2) : "0.00";
    }), c = je(() => {
      var g, _, h, y;
      const m = (_ = (g = e.fs) == null ? void 0 : g.data) == null ? void 0 : _.used_space, v = (y = (h = e.fs) == null ? void 0 : h.data) == null ? void 0 : y.total_space;
      return typeof m == "number" && typeof v == "number" && v !== 0 ? (m / v * 100).toFixed(2) : "0.00";
    }), u = je(() => `Used ${d.value}Mb out of ${f.value}Mb (${c.value}%)`);
    return (m, v) => (p(), b("div", cf, [
      l("div", df, [
        l("div", uf, [
          l("span", ff, [
            W(a(Yo))
          ]),
          l("span", vf, w(u.value), 1)
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
    const e = n, s = le("ServiceContainer"), { t: r } = s.i18n, o = Ps(n, "modelValue"), i = L(!1);
    Oe(
      () => o.value,
      () => {
        var c;
        return ((c = d()) == null ? void 0 : c.folders.length) || f();
      }
    );
    function d() {
      return s.treeViewData.find((c) => c.path === e.path);
    }
    const f = () => {
      i.value = !0, s.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: e.adapter,
          path: e.path
        }
      }).then((c) => {
        Jo(s.treeViewData, { path: e.path, ...c });
      }).catch((c) => {
      }).finally(() => {
        i.value = !1;
      });
    };
    return (c, u) => {
      var m;
      return p(), b("div", Sf, [
        i.value ? (p(), Z(a(ms), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (p(), b("div", $f, [
          o.value && ((m = d()) != null && m.folders.length) ? (p(), Z(a(Zo), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : j("", !0),
          o.value ? j("", !0) : (p(), Z(a(Xo), {
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
    const e = le("ServiceContainer"), s = L([]), r = n, o = L(null);
    Ee(() => {
      r.path === r.adapter + "://" && qe(o.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const i = je(() => {
      var d;
      return ((d = e.treeViewData.find((f) => f.path === r.path)) == null ? void 0 : d.folders) || [];
    });
    return (d, f) => {
      const c = ur("TreeSubfolderList", !0);
      return p(), b("ul", {
        ref_key: "parentSubfolderList",
        ref: o,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (p(!0), b(ke, null, Ce(i.value, (u, m) => (p(), b("li", {
          key: u.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          l("div", Cf, [
            l("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (v) => s.value[u.path] = !s.value[u.path]
            }, [
              W(Qo, {
                adapter: n.adapter,
                path: u.path,
                modelValue: s.value[u.path],
                "onUpdate:modelValue": (v) => s.value[u.path] = v
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Ef),
            l("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: u.path,
              onClick: (v) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r.adapter, path: u.path } })
            }, [
              l("div", Af, [
                a(e).fs.path === u.path ? (p(), Z(a(Ko), { key: 0 })) : (p(), Z(a(xn), { key: 1 }))
              ]),
              l("div", {
                class: de(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": a(e).fs.path === u.path
                }])
              }, w(u.basename), 3)
            ], 8, Tf)
          ]),
          l("div", Mf, [
            he(W(c, {
              adapter: r.adapter,
              path: u.path
            }, null, 8, ["adapter", "path"]), [
              [Ge, s.value[u.path]]
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
    const e = le("ServiceContainer"), { setStore: s } = e.storage, r = L(!1);
    function o(i) {
      i === e.fs.adapter ? r.value = !r.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: i } }), s("adapter", i));
    }
    return (i, d) => (p(), b(ke, null, [
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
        e.value ? (p(), Z(a(Zo), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : j("", !0),
        e.value ? j("", !0) : (p(), Z(a(Xo), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, If = { class: "vuefinder__treeview__header" }, Rf = { class: "vuefinder__treeview__pinned-label" }, Uf = { class: "vuefinder__treeview__pin-text text-nowrap" }, Hf = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Bf = { class: "vuefinder__treeview__pinned-item" }, Nf = ["onClick"], qf = ["title"], Pf = ["onClick"], zf = { key: 0 }, jf = { class: "vuefinder__treeview__no-pinned" }, Gf = { class: "vuefinder__treeview__storage" }, Wf = {
  __name: "TreeView",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, { getStore: r, setStore: o } = e.storage, i = L(190), d = L(r("pinned-folders-opened", !0));
    Oe(d, (m) => o("pinned-folders-opened", m));
    const f = (m) => {
      e.pinnedFolders = e.pinnedFolders.filter((v) => v.path !== m.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, c = (m) => {
      const v = m.clientX, g = m.target.parentElement, _ = g.getBoundingClientRect().width;
      g.classList.remove("transition-[width]"), g.classList.add("transition-none");
      const h = (F) => {
        i.value = _ + F.clientX - v, i.value < 50 && (i.value = 0, e.showTreeView = !1), i.value > 50 && (e.showTreeView = !0);
      }, y = () => {
        const F = g.getBoundingClientRect();
        i.value = F.width, g.classList.add("transition-[width]"), g.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", y);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", y);
    }, u = L(null);
    return Ee(() => {
      qe(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Oe(e.fs.data, (m, v) => {
      const g = m.files.filter((_) => _.type === "dir");
      Jo(e.treeViewData, { path: e.fs.path, folders: g.map((_) => ({
        adapter: _.storage,
        path: _.path,
        basename: _.basename
      })) });
    }), (m, v) => (p(), b(ke, null, [
      l("div", {
        onClick: v[0] || (v[0] = (g) => a(e).showTreeView = !a(e).showTreeView),
        class: de(["vuefinder__treeview__overlay", a(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      l("div", {
        style: vn(a(e).showTreeView ? "min-width:100px;max-width:75%; width: " + i.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        l("div", {
          ref_key: "treeViewScrollElement",
          ref: u,
          class: "vuefinder__treeview__scroll"
        }, [
          l("div", If, [
            l("div", {
              onClick: v[2] || (v[2] = (g) => d.value = !d.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              l("div", Rf, [
                W(a(Wo), { class: "vuefinder__treeview__pin-icon" }),
                l("div", Uf, w(a(s)("Pinned Folders")), 1)
              ]),
              W(Ff, {
                modelValue: d.value,
                "onUpdate:modelValue": v[1] || (v[1] = (g) => d.value = g)
              }, null, 8, ["modelValue"])
            ]),
            d.value ? (p(), b("ul", Hf, [
              (p(!0), b(ke, null, Ce(a(e).pinnedFolders, (g) => (p(), b("li", Bf, [
                l("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (_) => a(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: g.storage, path: g.path } })
                }, [
                  a(e).fs.path !== g.path ? (p(), Z(a(xn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : j("", !0),
                  a(e).fs.path === g.path ? (p(), Z(a(Ko), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : j("", !0),
                  l("div", {
                    title: g.path,
                    class: de(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": a(e).fs.path === g.path
                    }])
                  }, w(g.basename), 11, qf)
                ], 8, Nf),
                l("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (_) => f(g)
                }, [
                  W(a(bf), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Pf)
              ]))), 256)),
              a(e).pinnedFolders.length ? j("", !0) : (p(), b("li", zf, [
                l("div", jf, w(a(s)("No folders pinned")), 1)
              ]))
            ])) : j("", !0)
          ]),
          (p(!0), b(ke, null, Ce(a(e).fs.data.storages, (g) => (p(), b("div", Gf, [
            W(Lf, { storage: g }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        l("div", {
          onMousedown: c,
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
    var o, i;
    const r = (d) => d.items.length > 1 && d.items.some((f) => {
      var c;
      return f.path === ((c = d.target) == null ? void 0 : c.path);
    }) ? "many" : d.target ? "one" : null;
    return !(this.options.needsSearchQuery !== !!s.searchQuery || this.options.target !== void 0 && this.options.target !== r(s) || this.options.targetType !== void 0 && this.options.targetType !== ((o = s.target) == null ? void 0 : o.type) || this.options.mimeType !== void 0 && this.options.mimeType !== ((i = s.target) == null ? void 0 : i.mime_type) || this.options.feature !== void 0 && !e.features.includes(this.options.feature) || this.options.show !== void 0 && !this.options.show(e, s));
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
    key: me.NEW_FOLDER,
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
    key: me.DELETE,
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
    key: me.PREVIEW,
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
    key: me.DOWNLOAD,
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
    key: me.ARCHIVE,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(zo, { items: e })
  },
  unarchive: {
    key: me.UNARCHIVE,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(qo, { items: e })
  },
  rename: {
    key: me.RENAME,
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
    const { setStore: i } = o.storage, d = L(null);
    o.root = d;
    const f = o.dragSelect;
    _i(o);
    const c = (v) => {
      Object.assign(o.fs.data, v), f.clearSelection(), f.refreshSelection();
    };
    let u;
    o.emitter.on("vf-fetch-abort", () => {
      u.abort(), o.fs.loading = !1;
    }), o.emitter.on(
      "vf-fetch",
      async ({
        params: v,
        body: g = null,
        onSuccess: _ = null,
        onError: h = null,
        noCloseModal: y = !1
      }) => {
        ["index", "search"].includes(v.q) && (u && u.abort(), o.fs.loading = !0), u = new AbortController();
        const F = u.signal, S = r.request.getToken ? await r.request.getToken() : null;
        if (v.q === "download") {
          const O = r.request.baseUrl, M = v.m || "POST", x = new URLSearchParams(v).toString(), V = `${O}?${x}`;
          fetch(V, {
            method: M,
            headers: {
              ...r.request.headers,
              ...S ? { Authorization: `Bearer ${S}` } : {}
            },
            body: g ? g instanceof FormData ? g : JSON.stringify(g) : null,
            abortSignal: F
          }).then((R) => {
            const $ = R.headers.get("Content-Disposition");
            let E = "folder.zip";
            if ($ && $.includes("filename=")) {
              const k = $.match(/filename="?([^"]+)"?/);
              k && k[1] && (E = k[1]);
            }
            return R.blob().then((k) => ({ blob: k, filename: E }));
          }).then(({ blob: R, filename: $ }) => {
            const E = window.URL.createObjectURL(R), k = document.createElement("a");
            k.href = E, k.download = $, document.body.appendChild(k), k.click(), k.remove(), window.URL.revokeObjectURL(E);
          }).catch((R) => {
            console.error("Download error", R);
          });
          return;
        }
        o.requester.send({
          url: "",
          method: v.m || "get",
          params: v,
          body: g,
          abortSignal: F,
          headers: {
            ...r.request.headers || {},
            ...S ? { Authorization: `Bearer ${S}` } : {}
          }
        }).then((O) => {
          o.fs.adapter = O.adapter, o.persist && (o.fs.path = O.dirname, i("path", o.fs.path)), y || o.modal.close(), c(O), _ && _(O);
        }).catch((O) => {
          console.error(O), h && h(O);
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
        onError: (g) => {
          onError(g);
        }
      });
    });
    function m(v) {
      let g = {};
      v && v.includes("://") && (g = {
        adapter: v.split("://")[0],
        path: v
      }), o.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: o.fs.adapter, ...g },
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
      ), f.onSelect((v) => {
        s("select", v);
      }), Oe(
        () => o.fs.data.dirname,
        (v) => {
          s("update:path", v);
        }
      );
    }), (v, g) => (p(), b("div", {
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
          onMousedown: g[0] || (g[0] = (_) => a(o).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: g[1] || (g[1] = (_) => a(o).emitter.emit("vf-contextmenu-hide"))
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
          default: se(() => [
            a(o).modal.visible ? (p(), Z(Ns(a(o).modal.type), { key: 0 })) : j("", !0)
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
