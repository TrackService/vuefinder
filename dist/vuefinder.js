var or = Object.defineProperty;
var rr = (t, e, n) => e in t ? or(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var En = (t, e, n) => rr(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as St, watch as Ve, ref as A, shallowRef as ar, onMounted as Ce, onUnmounted as Qn, onUpdated as Rs, nextTick as vt, computed as wt, inject as re, createElementBlock as g, openBlock as f, withKeys as $t, unref as r, createElementVNode as a, withModifiers as et, renderSlot as Lt, normalizeClass as le, toDisplayString as b, createBlock as K, resolveDynamicComponent as Us, withCtx as J, createVNode as z, createCommentVNode as U, Fragment as ye, renderList as $e, withDirectives as _e, vModelCheckbox as Xt, createTextVNode as Z, vModelSelect as gs, vModelText as Ct, onBeforeUnmount as Ns, customRef as lr, vShow as ze, isRef as ir, TransitionGroup as cr, normalizeStyle as vn, mergeModels as dr, useModel as Ps, resolveComponent as ur, provide as vr, Transition as fr } from "vue";
import _r from "mitt";
import mr from "dragselect";
import pr from "@uppy/core";
import hr from "@uppy/xhr-upload";
import gr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import br from "cropperjs";
var Bs;
const Tn = (Bs = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Bs.getAttribute("content");
class wr {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    En(this, "config");
    En(this, "customFetch", async (...e) => {
      let [n, o] = e;
      this.config.fetchRequestInterceptor && (o = this.config.fetchRequestInterceptor(o));
      let s = await fetch(n, o);
      return this.config.fetchResponseInterceptor && (s = await this.config.fetchResponseInterceptor(s)), s;
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
    const n = this.config, o = {};
    Tn != null && Tn !== "" && (o[n.xsrfHeaderName] = Tn);
    const s = Object.assign({}, n.headers, o, e.headers), i = Object.assign({}, n.params, e.params), c = e.body, u = n.baseUrl + e.url, l = e.method;
    let d;
    l !== "get" && (c instanceof FormData ? (d = c, n.body != null && Object.entries(this.config.body).forEach(([v, p]) => {
      d.append(v, p);
    })) : (d = { ...c }, n.body != null && Object.assign(d, this.config.body)));
    const _ = {
      url: u,
      method: l,
      headers: s,
      params: i,
      body: d
    };
    if (n.transformRequest != null) {
      const v = n.transformRequest({
        url: u,
        method: l,
        headers: s,
        params: i,
        body: d
      });
      v.url != null && (_.url = v.url), v.method != null && (_.method = v.method), v.params != null && (_.params = v.params ?? {}), v.headers != null && (_.headers = v.headers ?? {}), v.body != null && (_.body = v.body);
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
  getDownloadUrl(e, n) {
    if (n.url != null)
      return n.url;
    const o = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: n.path }
    });
    return o.url + "?" + new URLSearchParams(o.params).toString();
  }
  /**
   * Get preview url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getPreviewUrl(e, n) {
    if (n.url != null)
      return n.url;
    const o = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: e, path: n.path }
    });
    return o.url + "?" + new URLSearchParams(o.params).toString();
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
    const n = this.transformRequestParams(e), o = e.responseType || "json", s = {
      method: e.method,
      headers: n.headers,
      signal: e.abortSignal
    }, i = n.url + "?" + new URLSearchParams(n.params);
    if (n.method !== "get" && n.body != null) {
      let u;
      n.body instanceof FormData ? u = e.body : (u = JSON.stringify(n.body), s.headers["Content-Type"] = "application/json"), s.body = u;
    }
    this.config.fetchParams && Object.assign(s, this.config.fetchParams);
    const c = await this.customFetch(i, s);
    if (c.ok)
      return await c[o]();
    throw await c.json();
  }
}
function yr(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token",
    fetchParams: {}
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new wr(e);
}
function kr(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = St(JSON.parse(e ?? "{}"));
  Ve(n, o);
  function o() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function s(l, d) {
    n[l] = d;
  }
  function i(l) {
    delete n[l];
  }
  function c() {
    Object.keys(n).map((l) => i(l));
  }
  return { getStore: (l, d = null) => n.hasOwnProperty(l) ? n[l] : d, setStore: s, removeStore: i, clearStore: c };
}
async function xr(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function Sr(t, e, n, o) {
  const { getStore: s, setStore: i } = t, c = A({}), u = A(s("locale", e)), l = (v, p = e) => {
    xr(v, o).then((m) => {
      c.value = m, i("locale", v), u.value = v, i("translations", m), Object.values(o).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + v }), n.emit("vf-language-saved"));
    }).catch((m) => {
      p ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(p, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Ve(u, (v) => {
    l(v);
  }), !s("locale") && !o.length ? l(e) : c.value = s("translations");
  const d = (v, ...p) => p.length ? d(v = v.replace("%s", p.shift()), ...p) : v;
  function _(v, ...p) {
    return c.value && c.value.hasOwnProperty(v) ? d(c.value[v], ...p) : d(v, ...p);
  }
  return St({ t: _, locale: u });
}
const ue = {
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
}, $r = Object.values(ue), Cr = "2.7.1";
function qs(t, e, n, o, s) {
  return (e = Math, n = e.log, o = 1024, s = n(t) / n(o) | 0, t / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function zs(t, e, n, o, s) {
  return (e = Math, n = e.log, o = 1e3, s = n(t) / n(o) | 0, t / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function Er(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return o[1] * Math.pow(1024, e[o[2].toLowerCase()]);
}
const ot = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function Tr(t, e) {
  const n = A(ot.SYSTEM), o = A(ot.LIGHT);
  n.value = t.getStore("theme", e ?? ot.SYSTEM);
  const s = window.matchMedia("(prefers-color-scheme: dark)"), i = (c) => {
    n.value === ot.DARK || n.value === ot.SYSTEM && c.matches ? o.value = ot.DARK : o.value = ot.LIGHT;
  };
  return i(s), s.addEventListener("change", i), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: n,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: o,
    /**
     * @param {Theme} value
     */
    set(c) {
      n.value = c, c !== ot.SYSTEM ? t.setStore("theme", c) : t.removeStore("theme"), i(s);
    }
  };
}
function Mr() {
  const t = ar(null), e = A(!1), n = A();
  return { visible: e, type: t, data: n, open: (i, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = i, n.value = c;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
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
const Oe = (t, e) => {
  const { o: n, i: o, u: s } = t;
  let i = n, c;
  const u = (_, v) => {
    const p = i, m = _, h = v || (o ? !o(p, m) : p !== m);
    return (h || s) && (i = m, c = p), [i, h, c];
  };
  return [e ? (_) => u(e(i, c), _) : u, (_) => [i, !!_, c]];
}, Ar = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, Le = Ar ? window : {}, js = Math.max, Dr = Math.min, In = Math.round, sn = Math.abs, bs = Math.sign, Gs = Le.cancelAnimationFrame, Jn = Le.requestAnimationFrame, on = Le.setTimeout, Hn = Le.clearTimeout, fn = (t) => typeof Le[t] < "u" ? Le[t] : void 0, Vr = fn("MutationObserver"), ws = fn("IntersectionObserver"), mt = fn("ResizeObserver"), Vt = fn("ScrollTimeline"), es = (t) => t === void 0, _n = (t) => t === null, Ge = (t) => typeof t == "number", Ht = (t) => typeof t == "string", mn = (t) => typeof t == "boolean", Be = (t) => typeof t == "function", We = (t) => Array.isArray(t), rn = (t) => typeof t == "object" && !We(t) && !_n(t), ts = (t) => {
  const e = !!t && t.length, n = Ge(e) && e > -1 && e % 1 == 0;
  return We(t) || !Be(t) && n ? e > 0 && rn(t) ? e - 1 in t : !0 : !1;
}, an = (t) => !!t && t.constructor === Object, ln = (t) => t instanceof HTMLElement, pn = (t) => t instanceof Element;
function ie(t, e) {
  if (ts(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && ie(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const Ws = (t, e) => t.indexOf(e) >= 0, Ot = (t, e) => t.concat(e), he = (t, e, n) => (!Ht(e) && ts(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), it = (t) => Array.from(t || []), ns = (t) => We(t) ? t : !Ht(t) && ts(t) ? it(t) : [t], Bn = (t) => !!t && !t.length, Rn = (t) => it(new Set(t)), Ie = (t, e, n) => {
  ie(t, (s) => s ? s.apply(void 0, e || []) : !0), n || (t.length = 0);
}, Ks = "paddingTop", Ys = "paddingRight", Xs = "paddingLeft", Zs = "paddingBottom", Qs = "marginLeft", Js = "marginRight", eo = "marginBottom", to = "overflowX", no = "overflowY", hn = "width", gn = "height", rt = "visible", ut = "hidden", yt = "scroll", Lr = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, bn = (t, e, n, o) => {
  if (t && e) {
    let s = !0;
    return ie(n, (i) => {
      const c = t[i], u = e[i];
      c !== u && (s = !1);
    }), s;
  }
  return !1;
}, so = (t, e) => bn(t, e, ["w", "h"]), en = (t, e) => bn(t, e, ["x", "y"]), Or = (t, e) => bn(t, e, ["t", "r", "b", "l"]), at = () => {
}, X = (t, ...e) => t.bind(0, ...e), pt = (t) => {
  let e;
  const n = t ? on : Jn, o = t ? Hn : Gs;
  return [(s) => {
    o(e), e = n(() => s(), Be(t) ? t() : t);
  }, () => o(e)];
}, cn = (t, e) => {
  const { _: n, p: o, v: s, S: i } = e || {};
  let c, u, l, d, _ = at;
  const v = function($) {
    _(), Hn(c), d = c = u = void 0, _ = at, t.apply(this, $);
  }, p = (x) => i && u ? i(u, x) : x, m = () => {
    _ !== at && v(p(l) || l);
  }, h = function() {
    const $ = it(arguments), M = Be(n) ? n() : n;
    if (Ge(M) && M >= 0) {
      const D = Be(o) ? o() : o, C = Ge(D) && D >= 0, V = M > 0 ? on : Jn, F = M > 0 ? Hn : Gs, O = p($) || $, w = v.bind(0, O);
      let y;
      _(), s && !d ? (w(), d = !0, y = V(() => d = void 0, M)) : (y = V(w, M), C && !c && (c = on(m, D))), _ = () => F(y), u = l = O;
    } else
      v($);
  };
  return h.m = m, h;
}, oo = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Ue = (t) => t ? Object.keys(t) : [], oe = (t, e, n, o, s, i, c) => {
  const u = [e, n, o, s, i, c];
  return (typeof t != "object" || _n(t)) && !Be(t) && (t = {}), ie(u, (l) => {
    ie(l, (d, _) => {
      const v = l[_];
      if (t === v)
        return !0;
      const p = We(v);
      if (v && an(v)) {
        const m = t[_];
        let h = m;
        p && !We(m) ? h = [] : !p && !an(m) && (h = {}), t[_] = oe(h, v);
      } else
        t[_] = p ? v.slice() : v;
    });
  }), t;
}, ro = (t, e) => ie(oe({}, t), (n, o, s) => {
  n === void 0 ? delete s[o] : n && an(n) && (s[o] = ro(n));
}), ss = (t) => !Ue(t).length, ao = (t, e, n) => js(t, Dr(e, n)), ft = (t) => Rn((We(t) ? t : (t || "").split(" ")).filter((e) => e)), os = (t, e) => t && t.getAttribute(e), ys = (t, e) => t && t.hasAttribute(e), Qe = (t, e, n) => {
  ie(ft(e), (o) => {
    t && t.setAttribute(o, String(n || ""));
  });
}, qe = (t, e) => {
  ie(ft(e), (n) => t && t.removeAttribute(n));
}, wn = (t, e) => {
  const n = ft(os(t, e)), o = X(Qe, t, e), s = (i, c) => {
    const u = new Set(n);
    return ie(ft(i), (l) => {
      u[c](l);
    }), it(u).join(" ");
  };
  return {
    O: (i) => o(s(i, "delete")),
    $: (i) => o(s(i, "add")),
    C: (i) => {
      const c = ft(i);
      return c.reduce((u, l) => u && n.includes(l), c.length > 0);
    }
  };
}, lo = (t, e, n) => (wn(t, e).O(n), X(rs, t, e, n)), rs = (t, e, n) => (wn(t, e).$(n), X(lo, t, e, n)), dn = (t, e, n, o) => (o ? rs : lo)(t, e, n), as = (t, e, n) => wn(t, e).C(n), io = (t) => wn(t, "class"), co = (t, e) => {
  io(t).O(e);
}, ls = (t, e) => (io(t).$(e), X(co, t, e)), uo = (t, e) => {
  const n = e ? pn(e) && e : document;
  return n ? it(n.querySelectorAll(t)) : [];
}, Fr = (t, e) => {
  const n = e ? pn(e) && e : document;
  return n && n.querySelector(t);
}, Un = (t, e) => pn(t) && t.matches(e), vo = (t) => Un(t, "body"), Nn = (t) => t ? it(t.childNodes) : [], Ft = (t) => t && t.parentElement, ht = (t, e) => pn(t) && t.closest(e), Pn = (t) => document.activeElement, Ir = (t, e, n) => {
  const o = ht(t, e), s = t && Fr(n, o), i = ht(s, e) === o;
  return o && s ? o === t || s === t || i && ht(ht(t, n), e) !== o : !1;
}, kt = (t) => {
  ie(ns(t), (e) => {
    const n = Ft(e);
    e && n && n.removeChild(e);
  });
}, De = (t, e) => X(kt, t && e && ie(ns(e), (n) => {
  n && t.appendChild(n);
}));
let fo;
const Hr = () => fo, Br = (t) => {
  fo = t;
}, gt = (t) => {
  const e = document.createElement("div");
  return Qe(e, "class", t), e;
}, _o = (t) => {
  const e = gt(), n = Hr(), o = t.trim();
  return e.innerHTML = n ? n.createHTML(o) : o, ie(Nn(e), (s) => kt(s));
}, ks = (t, e) => t.getPropertyValue(e) || t[e] || "", mo = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Zt = (t) => mo(parseFloat(t || "")), qn = (t) => Math.round(t * 1e4) / 1e4, po = (t) => `${qn(mo(t))}px`;
function It(t, e) {
  t && e && ie(e, (n, o) => {
    try {
      const s = t.style, i = _n(n) || mn(n) ? "" : Ge(n) ? po(n) : n;
      o.indexOf("--") === 0 ? s.setProperty(o, i) : s[o] = i;
    } catch {
    }
  });
}
function tt(t, e, n) {
  const o = Ht(e);
  let s = o ? "" : {};
  if (t) {
    const i = Le.getComputedStyle(t, n) || t.style;
    s = o ? ks(i, e) : it(e).reduce((c, u) => (c[u] = ks(i, u), c), s);
  }
  return s;
}
const xs = (t, e, n) => {
  const o = e ? `${e}-` : "", s = n ? `-${n}` : "", i = `${o}top${s}`, c = `${o}right${s}`, u = `${o}bottom${s}`, l = `${o}left${s}`, d = tt(t, [i, c, u, l]);
  return {
    t: Zt(d[i]),
    r: Zt(d[c]),
    b: Zt(d[u]),
    l: Zt(d[l])
  };
}, Mn = (t, e) => `translate${rn(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, Rr = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), Ur = {
  w: 0,
  h: 0
}, yn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : Ur, Nr = (t) => yn("inner", t || Le), bt = X(yn, "offset"), ho = X(yn, "client"), un = X(yn, "scroll"), is = (t) => {
  const e = parseFloat(tt(t, hn)) || 0, n = parseFloat(tt(t, gn)) || 0;
  return {
    w: e - In(e),
    h: n - In(n)
  };
}, An = (t) => t.getBoundingClientRect(), Pr = (t) => !!t && Rr(t), zn = (t) => !!(t && (t[gn] || t[hn])), go = (t, e) => {
  const n = zn(t);
  return !zn(e) && n;
}, Ss = (t, e, n, o) => {
  ie(ft(e), (s) => {
    t && t.removeEventListener(s, n, o);
  });
}, fe = (t, e, n, o) => {
  var s;
  const i = (s = o && o.H) != null ? s : !0, c = o && o.I || !1, u = o && o.A || !1, l = {
    passive: i,
    capture: c
  };
  return X(Ie, ft(e).map((d) => {
    const _ = u ? (v) => {
      Ss(t, d, _, c), n && n(v);
    } : n;
    return t && t.addEventListener(d, _, l), X(Ss, t, d, _, c);
  }));
}, bo = (t) => t.stopPropagation(), jn = (t) => t.preventDefault(), wo = (t) => bo(t) || jn(t), je = (t, e) => {
  const { x: n, y: o } = Ge(e) ? {
    x: e,
    y: e
  } : e || {};
  Ge(n) && (t.scrollLeft = n), Ge(o) && (t.scrollTop = o);
}, Fe = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), yo = () => ({
  D: {
    x: 0,
    y: 0
  },
  M: {
    x: 0,
    y: 0
  }
}), qr = (t, e) => {
  const { D: n, M: o } = t, { w: s, h: i } = e, c = (v, p, m) => {
    let h = bs(v) * m, x = bs(p) * m;
    if (h === x) {
      const $ = sn(v), M = sn(p);
      x = $ > M ? 0 : x, h = $ < M ? 0 : h;
    }
    return h = h === x ? 0 : h, [h + 0, x + 0];
  }, [u, l] = c(n.x, o.x, s), [d, _] = c(n.y, o.y, i);
  return {
    D: {
      x: u,
      y: d
    },
    M: {
      x: l,
      y: _
    }
  };
}, Dn = ({ D: t, M: e }) => {
  const n = (o, s) => o === 0 && o <= s;
  return {
    x: n(t.x, e.x),
    y: n(t.y, e.y)
  };
}, $s = ({ D: t, M: e }, n) => {
  const o = (s, i, c) => ao(0, 1, (s - c) / (s - i) || 0);
  return {
    x: o(t.x, e.x, n.x),
    y: o(t.y, e.y, n.y)
  };
}, Gn = (t) => {
  t && t.focus && t.focus({
    preventScroll: !0
  });
}, Cs = (t, e) => {
  ie(ns(e), t);
}, Wn = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (i, c) => {
    if (i) {
      const u = e.get(i);
      Cs((l) => {
        u && u[l ? "delete" : "clear"](l);
      }, c);
    } else
      e.forEach((u) => {
        u.clear();
      }), e.clear();
  }, o = (i, c) => {
    if (Ht(i)) {
      const d = e.get(i) || /* @__PURE__ */ new Set();
      return e.set(i, d), Cs((_) => {
        Be(_) && d.add(_);
      }, c), X(n, i, c);
    }
    mn(c) && c && n();
    const u = Ue(i), l = [];
    return ie(u, (d) => {
      const _ = i[d];
      _ && he(l, o(d, _));
    }), X(Ie, l);
  }, s = (i, c) => {
    ie(it(e.get(i)), (u) => {
      c && !Bn(c) ? u.apply(0, c) : u();
    });
  };
  return o(t || {}), [o, n, s];
}, ko = {}, xo = {}, zr = (t) => {
  ie(t, (e) => ie(e, (n, o) => {
    ko[o] = e[o];
  }));
}, So = (t, e, n) => Ue(t).map((o) => {
  const { static: s, instance: i } = t[o], [c, u, l] = n || [], d = n ? i : s;
  if (d) {
    const _ = n ? d(c, u, e) : d(e);
    return (l || xo)[o] = _;
  }
}), Bt = (t) => xo[t], jr = "__osOptionsValidationPlugin", Et = "data-overlayscrollbars", tn = "os-environment", Qt = `${tn}-scrollbar-hidden`, Vn = `${Et}-initialize`, nn = "noClipping", Es = `${Et}-body`, lt = Et, Gr = "host", Je = `${Et}-viewport`, Wr = to, Kr = no, Yr = "arrange", $o = "measuring", Xr = "scrolling", Co = "scrollbarHidden", Zr = "noContent", Kn = `${Et}-padding`, Ts = `${Et}-content`, cs = "os-size-observer", Qr = `${cs}-appear`, Jr = `${cs}-listener`, ea = "os-trinsic-observer", ta = "os-theme-none", He = "os-scrollbar", na = `${He}-rtl`, sa = `${He}-horizontal`, oa = `${He}-vertical`, Eo = `${He}-track`, ds = `${He}-handle`, ra = `${He}-visible`, aa = `${He}-cornerless`, Ms = `${He}-interaction`, As = `${He}-unusable`, Yn = `${He}-auto-hide`, Ds = `${Yn}-hidden`, Vs = `${He}-wheel`, la = `${Eo}-interactive`, ia = `${ds}-interactive`, ca = "__osSizeObserverPlugin", da = (t, e) => {
  const { T: n } = e, [o, s] = t("showNativeOverlaidScrollbars");
  return [o && n.x && n.y, s];
}, xt = (t) => t.indexOf(rt) === 0, ua = (t, e) => {
  const n = (s, i, c, u) => {
    const l = s === rt ? ut : s.replace(`${rt}-`, ""), d = xt(s), _ = xt(c);
    return !i && !u ? ut : d && _ ? rt : d ? i && u ? l : i ? rt : ut : i ? l : _ && u ? rt : ut;
  }, o = {
    x: n(e.x, t.x, e.y, t.y),
    y: n(e.y, t.y, e.x, t.x)
  };
  return {
    k: o,
    R: {
      x: o.x === yt,
      y: o.y === yt
    }
  };
}, To = "__osScrollbarsHidingPlugin", va = "__osClickScrollPlugin", Ls = (t) => JSON.stringify(t, (e, n) => {
  if (Be(n))
    throw 0;
  return n;
}), Os = (t, e) => t ? `${e}`.split(".").reduce((n, o) => n && oo(n, o) ? n[o] : void 0, t) : void 0, fa = {
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
}, Mo = (t, e) => {
  const n = {}, o = Ot(Ue(e), Ue(t));
  return ie(o, (s) => {
    const i = t[s], c = e[s];
    if (rn(i) && rn(c))
      oe(n[s] = {}, Mo(i, c)), ss(n[s]) && delete n[s];
    else if (oo(e, s) && c !== i) {
      let u = !0;
      if (We(i) || We(c))
        try {
          Ls(i) === Ls(c) && (u = !1);
        } catch {
        }
      u && (n[s] = c);
    }
  }), n;
}, Fs = (t, e, n) => (o) => [Os(t, o), n || Os(e, o) !== void 0];
let Ao;
const _a = () => Ao, ma = (t) => {
  Ao = t;
};
let Ln;
const pa = () => {
  const t = (C, V, F) => {
    De(document.body, C), De(document.body, C);
    const j = ho(C), O = bt(C), w = is(V);
    return F && kt(C), {
      x: O.h - j.h + w.h,
      y: O.w - j.w + w.w
    };
  }, e = (C) => {
    let V = !1;
    const F = ls(C, Qt);
    try {
      V = tt(C, "scrollbar-width") === "none" || tt(C, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return F(), V;
  }, n = `.${tn}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${tn} div{width:200%;height:200%;margin:10px 0}.${Qt}{scrollbar-width:none!important}.${Qt}::-webkit-scrollbar,.${Qt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, s = _o(`<div class="${tn}"><div></div><style>${n}</style></div>`)[0], i = s.firstChild, c = s.lastChild, u = _a();
  u && (c.nonce = u);
  const [l, , d] = Wn(), [_, v] = Oe({
    o: t(s, i),
    i: en
  }, X(t, s, i, !0)), [p] = v(), m = e(s), h = {
    x: p.x === 0,
    y: p.y === 0
  }, x = {
    elements: {
      host: null,
      padding: !m,
      viewport: (C) => m && vo(C) && C,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, $ = oe({}, fa), M = X(oe, {}, $), I = X(oe, {}, x), D = {
    N: p,
    T: h,
    P: m,
    G: !!Vt,
    K: X(l, "r"),
    Z: I,
    tt: (C) => oe(x, C) && I(),
    nt: M,
    ot: (C) => oe($, C) && M(),
    st: oe({}, x),
    et: oe({}, $)
  };
  if (qe(s, "style"), kt(s), fe(Le, "resize", () => {
    d("r", []);
  }), Be(Le.matchMedia) && !m && (!h.x || !h.y)) {
    const C = (V) => {
      const F = Le.matchMedia(`(resolution: ${Le.devicePixelRatio}dppx)`);
      fe(F, "change", () => {
        V(), C(V);
      }, {
        A: !0
      });
    };
    C(() => {
      const [V, F] = _();
      oe(D.N, V), d("r", [F]);
    });
  }
  return D;
}, Ke = () => (Ln || (Ln = pa()), Ln), ha = (t, e, n) => {
  let o = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, i = () => {
    o = !0;
  }, c = (u) => {
    if (s && n) {
      const l = n.map((d) => {
        const [_, v] = d || [];
        return [v && _ ? (u || uo)(_, t) : [], v];
      });
      ie(l, (d) => ie(d[0], (_) => {
        const v = d[1], p = s.get(_) || [];
        if (t.contains(_) && v) {
          const h = fe(_, v, (x) => {
            o ? (h(), s.delete(_)) : e(x);
          });
          s.set(_, he(p, h));
        } else
          Ie(p), s.delete(_);
      }));
    }
  };
  return c(), [i, c];
}, Is = (t, e, n, o) => {
  let s = !1;
  const { ct: i, rt: c, lt: u, it: l, ut: d, ft: _ } = o || {}, v = cn(() => s && n(!0), {
    _: 33,
    p: 99
  }), [p, m] = ha(t, v, u), h = i || [], x = c || [], $ = Ot(h, x), M = (D, C) => {
    if (!Bn(C)) {
      const V = d || at, F = _ || at, j = [], O = [];
      let w = !1, y = !1;
      if (ie(C, (L) => {
        const { attributeName: k, target: B, type: S, oldValue: R, addedNodes: N, removedNodes: ee } = L, se = S === "attributes", ne = S === "childList", me = t === B, Y = se && k, E = Y && os(B, k || ""), H = Ht(E) ? E : null, P = Y && R !== H, T = Ws(x, k) && P;
        if (e && (ne || !me)) {
          const G = se && P, q = G && l && Un(B, l), Q = (q ? !V(B, k, R, H) : !se || G) && !F(L, !!q, t, o);
          ie(N, (ae) => he(j, ae)), ie(ee, (ae) => he(j, ae)), y = y || Q;
        }
        !e && me && P && !V(B, k, R, H) && (he(O, k), w = w || T);
      }), m((L) => Rn(j).reduce((k, B) => (he(k, uo(L, B)), Un(B, L) ? he(k, B) : k), [])), e)
        return !D && y && n(!1), [!1];
      if (!Bn(O) || w) {
        const L = [Rn(O), w];
        return D || n.apply(0, L), L;
      }
    }
  }, I = new Vr(X(M, !1));
  return [() => (I.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: $,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (p(), I.disconnect(), s = !1);
  }), () => {
    if (s)
      return v.m(), M(!0, I.takeRecords());
  }];
};
let dt = null;
const Do = (t, e, n) => {
  const { _t: o } = n || {}, s = Bt(ca), [i] = Oe({
    o: !1,
    u: !0
  });
  return () => {
    const c = [], l = _o(`<div class="${cs}"><div class="${Jr}"></div></div>`)[0], d = l.firstChild, _ = (v) => {
      const p = v instanceof ResizeObserverEntry;
      let m = !1, h = !1;
      if (p) {
        const [x, , $] = i(v.contentRect), M = zn(x);
        h = go(x, $), m = !h && !M;
      } else
        h = v === !0;
      m || e({
        dt: !0,
        _t: h
      });
    };
    if (mt) {
      if (!mn(dt)) {
        const h = new mt(at);
        h.observe(t, {
          get box() {
            dt = !0;
          }
        }), dt = dt || !1, h.disconnect();
      }
      const v = cn(_, {
        _: 0,
        p: 0
      }), p = (h) => v(h.pop()), m = new mt(p);
      if (m.observe(dt ? t : d), he(c, [() => m.disconnect(), !dt && De(t, l)]), dt) {
        const h = new mt(p);
        h.observe(t, {
          box: "border-box"
        }), he(c, () => h.disconnect());
      }
    } else if (s) {
      const [v, p] = s(d, _, o);
      he(c, Ot([ls(l, Qr), fe(l, "animationstart", v), De(t, l)], p));
    } else
      return at;
    return X(Ie, c);
  };
}, ga = (t, e) => {
  let n;
  const o = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, s = gt(ea), [i] = Oe({
    o: !1
  }), c = (l, d) => {
    if (l) {
      const _ = i(o(l)), [, v] = _;
      return v && !d && e(_) && [_];
    }
  }, u = (l, d) => c(d.pop(), l);
  return [() => {
    const l = [];
    if (ws)
      n = new ws(X(u, !1), {
        root: t
      }), n.observe(s), he(l, () => {
        n.disconnect();
      });
    else {
      const d = () => {
        const _ = bt(s);
        c(_);
      };
      he(l, Do(s, d)()), d();
    }
    return X(Ie, he(l, De(t, s)));
  }, () => n && u(!0, n.takeRecords())];
}, ba = (t, e, n, o) => {
  let s, i, c, u, l, d;
  const _ = `[${lt}]`, v = `[${Je}]`, p = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: m, ht: h, U: x, gt: $, bt: M, L: I, wt: D, yt: C, St: V, Ot: F } = t, j = (T) => tt(T, "direction") === "rtl", O = {
    $t: !1,
    F: j(m)
  }, w = Ke(), y = Bt(To), [L] = Oe({
    i: so,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const T = y && y.V(t, e, O, w, n).W, q = !(D && I) && as(h, lt, nn), W = !I && C(Yr), Q = W && Fe($), ae = Q && F(), ve = V($o, q), ce = W && T && T()[0], Ee = un(x), te = is(x);
    return ce && ce(), je($, Q), ae && ae(), q && ve(), {
      w: Ee.w + te.w,
      h: Ee.h + te.h
    };
  }), k = cn(o, {
    _: () => s,
    p: () => i,
    S(T, G) {
      const [q] = T, [W] = G;
      return [Ot(Ue(q), Ue(W)).reduce((Q, ae) => (Q[ae] = q[ae] || W[ae], Q), {})];
    }
  }), B = (T) => {
    const G = j(m);
    oe(T, {
      Ct: d !== G
    }), oe(O, {
      F: G
    }), d = G;
  }, S = (T, G) => {
    const [q, W] = T, Q = {
      xt: W
    };
    return oe(O, {
      $t: q
    }), G || o(Q), Q;
  }, R = ({ dt: T, _t: G }) => {
    const W = !(T && !G) && w.P ? k : o, Q = {
      dt: T || G,
      _t: G
    };
    B(Q), W(Q);
  }, N = (T, G) => {
    const [, q] = L(), W = {
      Ht: q
    };
    return B(W), q && !G && (T ? o : k)(W), W;
  }, ee = (T, G, q) => {
    const W = {
      Et: G
    };
    return B(W), G && !q && k(W), W;
  }, [se, ne] = M ? ga(h, S) : [], me = !I && Do(h, R, {
    _t: !0
  }), [Y, E] = Is(h, !1, ee, {
    rt: p,
    ct: p
  }), H = I && mt && new mt((T) => {
    const G = T[T.length - 1].contentRect;
    R({
      dt: !0,
      _t: go(G, l)
    }), l = G;
  }), P = cn(() => {
    const [, T] = L();
    o({
      Ht: T
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    H && H.observe(h);
    const T = me && me(), G = se && se(), q = Y(), W = w.K((Q) => {
      Q ? k({
        zt: Q
      }) : P();
    });
    return () => {
      H && H.disconnect(), T && T(), G && G(), u && u(), q(), W();
    };
  }, ({ It: T, At: G, Dt: q }) => {
    const W = {}, [Q] = T("update.ignoreMutation"), [ae, ve] = T("update.attributes"), [ce, Ee] = T("update.elementEvents"), [te, we] = T("update.debounce"), Ae = Ee || ve, ke = G || q, xe = (ge) => Be(Q) && Q(ge);
    if (Ae) {
      c && c(), u && u();
      const [ge, be] = Is(M || x, !0, N, {
        ct: Ot(p, ae || []),
        lt: ce,
        it: _,
        ft: (pe, de) => {
          const { target: Se, attributeName: Me } = pe;
          return (!de && Me && !I ? Ir(Se, _, v) : !1) || !!ht(Se, `.${He}`) || !!xe(pe);
        }
      });
      u = ge(), c = be;
    }
    if (we)
      if (k.m(), We(te)) {
        const ge = te[0], be = te[1];
        s = Ge(ge) && ge, i = Ge(be) && be;
      } else Ge(te) ? (s = te, i = !1) : (s = !1, i = !1);
    if (ke) {
      const ge = E(), be = ne && ne(), pe = c && c();
      ge && oe(W, ee(ge[0], ge[1], ke)), be && oe(W, S(be[0], ke)), pe && oe(W, N(pe[0], ke));
    }
    return B(W), W;
  }, O];
}, Vo = (t, e) => Be(e) ? e.apply(0, t) : e, wa = (t, e, n, o) => {
  const s = es(o) ? n : o;
  return Vo(t, s) || e.apply(0, t);
}, Lo = (t, e, n, o) => {
  const s = es(o) ? n : o, i = Vo(t, s);
  return !!i && (ln(i) ? i : e.apply(0, t));
}, ya = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: o } = e || {}, { T: s, P: i, Z: c } = Ke(), { nativeScrollbarsOverlaid: u, body: l } = c().cancel, d = n ?? u, _ = es(o) ? l : o, v = (s.x || s.y) && d, p = t && (_n(_) ? !i : _);
  return !!v || !!p;
}, ka = (t, e, n, o) => {
  const s = "--os-viewport-percent", i = "--os-scroll-percent", c = "--os-scroll-direction", { Z: u } = Ke(), { scrollbars: l } = u(), { slot: d } = l, { vt: _, ht: v, U: p, Mt: m, gt: h, wt: x, L: $ } = e, { scrollbars: M } = m ? {} : t, { slot: I } = M || {}, D = [], C = [], V = [], F = Lo([_, v, p], () => $ && x ? _ : v, d, I), j = (Y) => {
    if (Vt) {
      let E = null, H = [];
      const P = new Vt({
        source: h,
        axis: Y
      }), T = () => {
        E && E.cancel(), E = null;
      };
      return {
        Rt: (q) => {
          const { Tt: W } = n, Q = Dn(W)[Y], ae = Y === "x", ve = [Mn(0, ae), Mn(`calc(100cq${ae ? "w" : "h"} + -100%)`, ae)], ce = Q ? ve : ve.reverse();
          return H[0] === ce[0] && H[1] === ce[1] || (T(), H = ce, E = q.kt.animate({
            clear: ["left"],
            transform: ce
          }, {
            timeline: P
          })), T;
        }
      };
    }
  }, O = {
    x: j("x"),
    y: j("y")
  }, w = () => {
    const { Vt: Y, Lt: E } = n, H = (P, T) => ao(0, 1, P / (P + T) || 0);
    return {
      x: H(E.x, Y.x),
      y: H(E.y, Y.y)
    };
  }, y = (Y, E, H) => {
    const P = H ? ls : co;
    ie(Y, (T) => {
      P(T.Ut, E);
    });
  }, L = (Y, E) => {
    ie(Y, (H) => {
      const [P, T] = E(H);
      It(P, T);
    });
  }, k = (Y, E, H) => {
    const P = mn(H), T = P ? H : !0, G = P ? !H : !0;
    T && y(C, Y, E), G && y(V, Y, E);
  }, B = () => {
    const Y = w(), E = (H) => (P) => [P.Ut, {
      [s]: qn(H) + ""
    }];
    L(C, E(Y.x)), L(V, E(Y.y));
  }, S = () => {
    if (!Vt) {
      const { Tt: Y } = n, E = $s(Y, Fe(h)), H = (P) => (T) => [T.Ut, {
        [i]: qn(P) + ""
      }];
      L(C, H(E.x)), L(V, H(E.y));
    }
  }, R = () => {
    const { Tt: Y } = n, E = Dn(Y), H = (P) => (T) => [T.Ut, {
      [c]: P ? "0" : "1"
    }];
    L(C, H(E.x)), L(V, H(E.y)), Vt && (C.forEach(O.x.Rt), V.forEach(O.y.Rt));
  }, N = () => {
    if ($ && !x) {
      const { Vt: Y, Tt: E } = n, H = Dn(E), P = $s(E, Fe(h)), T = (G) => {
        const { Ut: q } = G, W = Ft(q) === p && q, Q = (ae, ve, ce) => {
          const Ee = ve * ae;
          return po(ce ? Ee : -Ee);
        };
        return [W, W && {
          transform: Mn({
            x: Q(P.x, Y.x, H.x),
            y: Q(P.y, Y.y, H.y)
          })
        }];
      };
      L(C, T), L(V, T);
    }
  }, ee = (Y) => {
    const E = Y ? "x" : "y", P = gt(`${He} ${Y ? sa : oa}`), T = gt(Eo), G = gt(ds), q = {
      Ut: P,
      Pt: T,
      kt: G
    }, W = O[E];
    return he(Y ? C : V, q), he(D, [De(P, T), De(T, G), X(kt, P), W && W.Rt(q), o(q, k, Y)]), q;
  }, se = X(ee, !0), ne = X(ee, !1), me = () => (De(F, C[0].Ut), De(F, V[0].Ut), X(Ie, D));
  return se(), ne(), [{
    Nt: B,
    qt: S,
    Bt: R,
    Ft: N,
    jt: k,
    Xt: {
      Yt: C,
      Wt: se,
      Jt: X(L, C)
    },
    Gt: {
      Yt: V,
      Wt: ne,
      Jt: X(L, V)
    }
  }, me];
}, xa = (t, e, n, o) => (s, i, c) => {
  const { ht: u, U: l, L: d, gt: _, Kt: v, Ot: p } = e, { Ut: m, Pt: h, kt: x } = s, [$, M] = pt(333), [I, D] = pt(444), C = (j) => {
    Be(_.scrollBy) && _.scrollBy({
      behavior: "smooth",
      left: j.x,
      top: j.y
    });
  }, V = () => {
    const j = "pointerup pointercancel lostpointercapture", O = `client${c ? "X" : "Y"}`, w = c ? hn : gn, y = c ? "left" : "top", L = c ? "w" : "h", k = c ? "x" : "y", B = (R, N) => (ee) => {
      const { Vt: se } = n, ne = bt(h)[L] - bt(x)[L], Y = N * ee / ne * se[k];
      je(_, {
        [k]: R + Y
      });
    }, S = [];
    return fe(h, "pointerdown", (R) => {
      const N = ht(R.target, `.${ds}`) === x, ee = N ? x : h, se = t.scrollbars, ne = se[N ? "dragScroll" : "clickScroll"], { button: me, isPrimary: Y, pointerType: E } = R, { pointers: H } = se;
      if (me === 0 && Y && ne && (H || []).includes(E)) {
        Ie(S), D();
        const T = !N && (R.shiftKey || ne === "instant"), G = X(An, x), q = X(An, h), W = (de, Se) => (de || G())[y] - (Se || q())[y], Q = In(An(_)[w]) / bt(_)[L] || 1, ae = B(Fe(_)[k], 1 / Q), ve = R[O], ce = G(), Ee = q(), te = ce[w], we = W(ce, Ee) + te / 2, Ae = ve - Ee[y], ke = N ? 0 : Ae - we, xe = (de) => {
          Ie(pe), ee.releasePointerCapture(de.pointerId);
        }, ge = N || T, be = p(), pe = [fe(v, j, xe), fe(v, "selectstart", (de) => jn(de), {
          H: !1
        }), fe(h, j, xe), ge && fe(h, "pointermove", (de) => ae(ke + (de[O] - ve))), ge && (() => {
          const de = Fe(_);
          be();
          const Se = Fe(_), Me = {
            x: Se.x - de.x,
            y: Se.y - de.y
          };
          (sn(Me.x) > 3 || sn(Me.y) > 3) && (p(), je(_, de), C(Me), I(be));
        })];
        if (ee.setPointerCapture(R.pointerId), T)
          ae(ke);
        else if (!N) {
          const de = Bt(va);
          if (de) {
            const Se = de(ae, ke, te, (Me) => {
              Me ? be() : he(pe, be);
            });
            he(pe, Se), he(S, X(Se, !0));
          }
        }
      }
    });
  };
  let F = !0;
  return X(Ie, [fe(x, "pointermove pointerleave", o), fe(m, "pointerenter", () => {
    i(Ms, !0);
  }), fe(m, "pointerleave pointercancel", () => {
    i(Ms, !1);
  }), !d && fe(m, "mousedown", () => {
    const j = Pn();
    (ys(j, Je) || ys(j, lt) || j === document.body) && on(X(Gn, l), 25);
  }), fe(m, "wheel", (j) => {
    const { deltaX: O, deltaY: w, deltaMode: y } = j;
    F && y === 0 && Ft(m) === u && C({
      x: O,
      y: w
    }), F = !1, i(Vs, !0), $(() => {
      F = !0, i(Vs);
    }), jn(j);
  }, {
    H: !1,
    I: !0
  }), fe(m, "pointerdown", X(fe, v, "click", wo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), V(), M, D]);
}, Sa = (t, e, n, o, s, i) => {
  let c, u, l, d, _, v = at, p = 0;
  const m = ["mouse", "pen"], h = (E) => m.includes(E.pointerType), [x, $] = pt(), [M, I] = pt(100), [D, C] = pt(100), [V, F] = pt(() => p), [j, O] = ka(t, s, o, xa(e, s, o, (E) => h(E) && se())), { ht: w, Qt: y, wt: L } = s, { jt: k, Nt: B, qt: S, Bt: R, Ft: N } = j, ee = (E, H) => {
    if (F(), E)
      k(Ds);
    else {
      const P = X(k, Ds, !0);
      p > 0 && !H ? V(P) : P();
    }
  }, se = () => {
    (l ? !c : !d) && (ee(!0), M(() => {
      ee(!1);
    }));
  }, ne = (E) => {
    k(Yn, E, !0), k(Yn, E, !1);
  }, me = (E) => {
    h(E) && (c = l, l && ee(!0));
  }, Y = [F, I, C, $, () => v(), fe(w, "pointerover", me, {
    A: !0
  }), fe(w, "pointerenter", me), fe(w, "pointerleave", (E) => {
    h(E) && (c = !1, l && ee(!1));
  }), fe(w, "pointermove", (E) => {
    h(E) && u && se();
  }), fe(y, "scroll", (E) => {
    x(() => {
      S(), se();
    }), i(E), N();
  })];
  return [() => X(Ie, he(Y, O())), ({ It: E, Dt: H, Zt: P, tn: T }) => {
    const { nn: G, sn: q, en: W, cn: Q } = T || {}, { Ct: ae, _t: ve } = P || {}, { F: ce } = n, { T: Ee } = Ke(), { k: te, rn: we } = o, [Ae, ke] = E("showNativeOverlaidScrollbars"), [xe, ge] = E("scrollbars.theme"), [be, pe] = E("scrollbars.visibility"), [de, Se] = E("scrollbars.autoHide"), [Me, Tt] = E("scrollbars.autoHideSuspend"), [Rt] = E("scrollbars.autoHideDelay"), [Ut, Nt] = E("scrollbars.dragScroll"), [ct, Mt] = E("scrollbars.clickScroll"), [Pt, xn] = E("overflow"), Sn = ve && !H, $n = we.x || we.y, Pe = G || q || Q || ae || H, Cn = W || pe || xn, qt = Ae && Ee.x && Ee.y, zt = (st, At, Dt) => {
      const jt = st.includes(yt) && (be === rt || be === "auto" && At === yt);
      return k(ra, jt, Dt), jt;
    };
    if (p = Rt, Sn && (Me && $n ? (ne(!1), v(), D(() => {
      v = fe(y, "scroll", X(ne, !0), {
        A: !0
      });
    })) : ne(!0)), ke && k(ta, qt), ge && (k(_), k(xe, !0), _ = xe), Tt && !Me && ne(!0), Se && (u = de === "move", l = de === "leave", d = de === "never", ee(d, !0)), Nt && k(ia, Ut), Mt && k(la, !!ct), Cn) {
      const st = zt(Pt.x, te.x, !0), At = zt(Pt.y, te.y, !1);
      k(aa, !(st && At));
    }
    Pe && (S(), B(), N(), Q && R(), k(As, !we.x, !0), k(As, !we.y, !1), k(na, ce && !L));
  }, {}, j];
}, $a = (t) => {
  const e = Ke(), { Z: n, P: o } = e, { elements: s } = n(), { padding: i, viewport: c, content: u } = s, l = ln(t), d = l ? {} : t, { elements: _ } = d, { padding: v, viewport: p, content: m } = _ || {}, h = l ? t : d.target, x = vo(h), $ = h.ownerDocument, M = $.documentElement, I = () => $.defaultView || Le, D = X(wa, [h]), C = X(Lo, [h]), V = X(gt, ""), F = X(D, V, c), j = X(C, V, u), O = (te) => {
    const we = bt(te), Ae = un(te), ke = tt(te, to), xe = tt(te, no);
    return Ae.w - we.w > 0 && !xt(ke) || Ae.h - we.h > 0 && !xt(xe);
  }, w = F(p), y = w === h, L = y && x, k = !y && j(m), B = !y && w === k, S = L ? M : w, R = L ? S : h, N = !y && C(V, i, v), ee = !B && k, se = [ee, S, N, R].map((te) => ln(te) && !Ft(te) && te), ne = (te) => te && Ws(se, te), me = !ne(S) && O(S) ? S : h, Y = L ? M : S, H = {
    vt: h,
    ht: R,
    U: S,
    ln: N,
    bt: ee,
    gt: Y,
    Qt: L ? $ : S,
    an: x ? M : me,
    Kt: $,
    wt: x,
    Mt: l,
    L: y,
    un: I,
    yt: (te) => as(S, Je, te),
    St: (te, we) => dn(S, Je, te, we),
    Ot: () => dn(Y, Je, Xr, !0)
  }, { vt: P, ht: T, ln: G, U: q, bt: W } = H, Q = [() => {
    qe(T, [lt, Vn]), qe(P, Vn), x && qe(M, [Vn, lt]);
  }];
  let ae = Nn([W, q, G, T, P].find((te) => te && !ne(te)));
  const ve = L ? P : W || q, ce = X(Ie, Q);
  return [H, () => {
    const te = I(), we = Pn(), Ae = (pe) => {
      De(Ft(pe), Nn(pe)), kt(pe);
    }, ke = (pe) => fe(pe, "focusin focusout focus blur", wo, {
      I: !0,
      H: !1
    }), xe = "tabindex", ge = os(q, xe), be = ke(we);
    return Qe(T, lt, y ? "" : Gr), Qe(G, Kn, ""), Qe(q, Je, ""), Qe(W, Ts, ""), y || (Qe(q, xe, ge || "-1"), x && Qe(M, Es, "")), De(ve, ae), De(T, G), De(G || T, !y && q), De(q, W), he(Q, [be, () => {
      const pe = Pn(), de = ne(q), Se = de && pe === q ? P : pe, Me = ke(Se);
      qe(G, Kn), qe(W, Ts), qe(q, Je), x && qe(M, Es), ge ? Qe(q, xe, ge) : qe(q, xe), ne(W) && Ae(W), de && Ae(q), ne(G) && Ae(G), Gn(Se), Me();
    }]), o && !y && (rs(q, Je, Co), he(Q, X(qe, q, Je))), Gn(!y && x && we === P && te.top === te ? q : we), be(), ae = 0, ce;
  }, ce];
}, Ca = ({ bt: t }) => ({ Zt: e, fn: n, Dt: o }) => {
  const { xt: s } = e || {}, { $t: i } = n;
  t && (s || o) && It(t, {
    [gn]: i && "100%"
  });
}, Ea = ({ ht: t, ln: e, U: n, L: o }, s) => {
  const [i, c] = Oe({
    i: Or,
    o: xs()
  }, X(xs, t, "padding", ""));
  return ({ It: u, Zt: l, fn: d, Dt: _ }) => {
    let [v, p] = c(_);
    const { P: m } = Ke(), { dt: h, Ht: x, Ct: $ } = l || {}, { F: M } = d, [I, D] = u("paddingAbsolute");
    (h || p || (_ || x)) && ([v, p] = i(_));
    const V = !o && (D || $ || p);
    if (V) {
      const F = !I || !e && !m, j = v.r + v.l, O = v.t + v.b, w = {
        [Js]: F && !M ? -j : 0,
        [eo]: F ? -O : 0,
        [Qs]: F && M ? -j : 0,
        top: F ? -v.t : 0,
        right: F ? M ? -v.r : "auto" : 0,
        left: F ? M ? "auto" : -v.l : 0,
        [hn]: F && `calc(100% + ${j}px)`
      }, y = {
        [Ks]: F ? v.t : 0,
        [Ys]: F ? v.r : 0,
        [Zs]: F ? v.b : 0,
        [Xs]: F ? v.l : 0
      };
      It(e || n, w), It(n, y), oe(s, {
        ln: v,
        _n: !F,
        j: e ? y : oe({}, w, y)
      });
    }
    return {
      dn: V
    };
  };
}, Ta = (t, e) => {
  const n = Ke(), { ht: o, ln: s, U: i, L: c, Qt: u, gt: l, wt: d, St: _, un: v } = t, { P: p } = n, m = d && c, h = X(js, 0), x = {
    display: () => !1,
    direction: (E) => E !== "ltr",
    flexDirection: (E) => E.endsWith("-reverse"),
    writingMode: (E) => E !== "horizontal-tb"
  }, $ = Ue(x), M = {
    i: so,
    o: {
      w: 0,
      h: 0
    }
  }, I = {
    i: en,
    o: {}
  }, D = (E) => {
    _($o, !m && E);
  }, C = (E) => {
    if (!$.some((ve) => {
      const ce = E[ve];
      return ce && x[ve](ce);
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
    const P = Fe(l), T = _(Zr, !0), G = fe(u, yt, (ve) => {
      const ce = Fe(l);
      ve.isTrusted && ce.x === P.x && ce.y === P.y && bo(ve);
    }, {
      I: !0,
      A: !0
    });
    je(l, {
      x: 0,
      y: 0
    }), T();
    const q = Fe(l), W = un(l);
    je(l, {
      x: W.w,
      y: W.h
    });
    const Q = Fe(l);
    je(l, {
      x: Q.x - q.x < 1 && -W.w,
      y: Q.y - q.y < 1 && -W.h
    });
    const ae = Fe(l);
    return je(l, P), Jn(() => G()), {
      D: q,
      M: ae
    };
  }, V = (E, H) => {
    const P = Le.devicePixelRatio % 1 !== 0 ? 1 : 0, T = {
      w: h(E.w - H.w),
      h: h(E.h - H.h)
    };
    return {
      w: T.w > P ? T.w : 0,
      h: T.h > P ? T.h : 0
    };
  }, [F, j] = Oe(M, X(is, i)), [O, w] = Oe(M, X(un, i)), [y, L] = Oe(M), [k] = Oe(I), [B, S] = Oe(M), [R] = Oe(I), [N] = Oe({
    i: (E, H) => bn(E, H, $),
    o: {}
  }, () => Pr(i) ? tt(i, $) : {}), [ee, se] = Oe({
    i: (E, H) => en(E.D, H.D) && en(E.M, H.M),
    o: yo()
  }), ne = Bt(To), me = (E, H) => `${H ? Wr : Kr}${Lr(E)}`, Y = (E) => {
    const H = (T) => [rt, ut, yt].map((G) => me(G, T)), P = H(!0).concat(H()).join(" ");
    _(P), _(Ue(E).map((T) => me(E[T], T === "x")).join(" "), !0);
  };
  return ({ It: E, Zt: H, fn: P, Dt: T }, { dn: G }) => {
    const { dt: q, Ht: W, Ct: Q, _t: ae, zt: ve } = H || {}, ce = ne && ne.V(t, e, P, n, E), { Y: Ee, W: te, J: we } = ce || {}, [Ae, ke] = da(E, n), [xe, ge] = E("overflow"), be = xt(xe.x), pe = xt(xe.y), de = q || G || W || Q || ve || ke;
    let Se = j(T), Me = w(T), Tt = L(T), Rt = S(T);
    if (ke && p && _(Co, !Ae), de) {
      as(o, lt, nn) && D(!0);
      const [ps] = te ? te() : [], [Gt] = Se = F(T), [Wt] = Me = O(T), Kt = ho(i), Yt = m && Nr(v()), sr = {
        w: h(Wt.w + Gt.w),
        h: h(Wt.h + Gt.h)
      }, hs = {
        w: h((Yt ? Yt.w : Kt.w + h(Kt.w - Wt.w)) + Gt.w),
        h: h((Yt ? Yt.h : Kt.h + h(Kt.h - Wt.h)) + Gt.h)
      };
      ps && ps(), Rt = B(hs), Tt = y(V(sr, hs), T);
    }
    const [Ut, Nt] = Rt, [ct, Mt] = Tt, [Pt, xn] = Me, [Sn, $n] = Se, [Pe, Cn] = k({
      x: ct.w > 0,
      y: ct.h > 0
    }), qt = be && pe && (Pe.x || Pe.y) || be && Pe.x && !Pe.y || pe && Pe.y && !Pe.x, zt = G || Q || ve || $n || xn || Nt || Mt || ge || ke || de, st = ua(Pe, xe), [At, Dt] = R(st.k), [jt, er] = N(T), ms = Q || ae || er || Cn || T, [tr, nr] = ms ? ee(C(jt), T) : se();
    return zt && (Dt && Y(st.k), we && Ee && It(i, we(st, P, Ee(st, Pt, Sn)))), D(!1), dn(o, lt, nn, qt), dn(s, Kn, nn, qt), oe(e, {
      k: At,
      Lt: {
        x: Ut.w,
        y: Ut.h
      },
      Vt: {
        x: ct.w,
        y: ct.h
      },
      rn: Pe,
      Tt: qr(tr, ct)
    }), {
      en: Dt,
      nn: Nt,
      sn: Mt,
      cn: nr || Mt,
      pn: ms
    };
  };
}, Ma = (t) => {
  const [e, n, o] = $a(t), s = {
    ln: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    _n: !1,
    j: {
      [Js]: 0,
      [eo]: 0,
      [Qs]: 0,
      [Ks]: 0,
      [Ys]: 0,
      [Zs]: 0,
      [Xs]: 0
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
      x: ut,
      y: ut
    },
    rn: {
      x: !1,
      y: !1
    },
    Tt: yo()
  }, { vt: i, gt: c, L: u, Ot: l } = e, { P: d, T: _ } = Ke(), v = !d && (_.x || _.y), p = [Ca(e), Ea(e, s), Ta(e, s)];
  return [n, (m) => {
    const h = {}, $ = v && Fe(c), M = $ && l();
    return ie(p, (I) => {
      oe(h, I(m, h) || {});
    }), je(c, $), M && M(), u || je(i, 0), h;
  }, s, e, o];
}, Aa = (t, e, n, o, s) => {
  let i = !1;
  const c = Fs(e, {}), [u, l, d, _, v] = Ma(t), [p, m, h] = ba(_, d, c, (C) => {
    D({}, C);
  }), [x, $, , M] = Sa(t, e, h, d, _, s), I = (C) => Ue(C).some((V) => !!C[V]), D = (C, V) => {
    if (n())
      return !1;
    const { vn: F, Dt: j, At: O, hn: w } = C, y = F || {}, L = !!j || !i, k = {
      It: Fs(e, y, L),
      vn: y,
      Dt: L
    };
    if (w)
      return $(k), !1;
    const B = V || m(oe({}, k, {
      At: O
    })), S = l(oe({}, k, {
      fn: h,
      Zt: B
    }));
    $(oe({}, k, {
      Zt: B,
      tn: S
    }));
    const R = I(B), N = I(S), ee = R || N || !ss(y) || L;
    return i = !0, ee && o(C, {
      Zt: B,
      tn: S
    }), ee;
  };
  return [() => {
    const { an: C, gt: V, Ot: F } = _, j = Fe(C), O = [p(), u(), x()], w = F();
    return je(V, j), w(), X(Ie, O);
  }, D, () => ({
    gn: h,
    bn: d
  }), {
    wn: _,
    yn: M
  }, v];
}, us = /* @__PURE__ */ new WeakMap(), Da = (t, e) => {
  us.set(t, e);
}, Va = (t) => {
  us.delete(t);
}, Oo = (t) => us.get(t), Ne = (t, e, n) => {
  const { nt: o } = Ke(), s = ln(t), i = s ? t : t.target, c = Oo(i);
  if (e && !c) {
    let u = !1;
    const l = [], d = {}, _ = (y) => {
      const L = ro(y), k = Bt(jr);
      return k ? k(L, !0) : L;
    }, v = oe({}, o(), _(e)), [p, m, h] = Wn(), [x, $, M] = Wn(n), I = (y, L) => {
      M(y, L), h(y, L);
    }, [D, C, V, F, j] = Aa(t, v, () => u, ({ vn: y, Dt: L }, { Zt: k, tn: B }) => {
      const { dt: S, Ct: R, xt: N, Ht: ee, Et: se, _t: ne } = k, { nn: me, sn: Y, en: E, cn: H } = B;
      I("updated", [w, {
        updateHints: {
          sizeChanged: !!S,
          directionChanged: !!R,
          heightIntrinsicChanged: !!N,
          overflowEdgeChanged: !!me,
          overflowAmountChanged: !!Y,
          overflowStyleChanged: !!E,
          scrollCoordinatesChanged: !!H,
          contentMutation: !!ee,
          hostMutation: !!se,
          appear: !!ne
        },
        changedOptions: y || {},
        force: !!L
      }]);
    }, (y) => I("scroll", [w, y])), O = (y) => {
      Va(i), Ie(l), u = !0, I("destroyed", [w, y]), m(), $();
    }, w = {
      options(y, L) {
        if (y) {
          const k = L ? o() : {}, B = Mo(v, oe(k, _(y)));
          ss(B) || (oe(v, B), C({
            vn: B
          }));
        }
        return oe({}, v);
      },
      on: x,
      off: (y, L) => {
        y && L && $(y, L);
      },
      state() {
        const { gn: y, bn: L } = V(), { F: k } = y, { Lt: B, Vt: S, k: R, rn: N, ln: ee, _n: se, Tt: ne } = L;
        return oe({}, {
          overflowEdge: B,
          overflowAmount: S,
          overflowStyle: R,
          hasOverflow: N,
          scrollCoordinates: {
            start: ne.D,
            end: ne.M
          },
          padding: ee,
          paddingAbsolute: se,
          directionRTL: k,
          destroyed: u
        });
      },
      elements() {
        const { vt: y, ht: L, ln: k, U: B, bt: S, gt: R, Qt: N } = F.wn, { Xt: ee, Gt: se } = F.yn, ne = (Y) => {
          const { kt: E, Pt: H, Ut: P } = Y;
          return {
            scrollbar: P,
            track: H,
            handle: E
          };
        }, me = (Y) => {
          const { Yt: E, Wt: H } = Y, P = ne(E[0]);
          return oe({}, P, {
            clone: () => {
              const T = ne(H());
              return C({
                hn: !0
              }), T;
            }
          });
        };
        return oe({}, {
          target: y,
          host: L,
          padding: k || B,
          viewport: B,
          content: S || B,
          scrollOffsetElement: R,
          scrollEventElement: N,
          scrollbarHorizontal: me(ee),
          scrollbarVertical: me(se)
        });
      },
      update: (y) => C({
        Dt: y,
        At: !0
      }),
      destroy: X(O, !1),
      plugin: (y) => d[Ue(y)[0]]
    };
    return he(l, [j]), Da(i, w), So(ko, Ne, [w, p, d]), ya(F.wn.wt, !s && t.cancel) ? (O(!0), w) : (he(l, D()), I("initialized", [w]), w.update(), w);
  }
  return c;
};
Ne.plugin = (t) => {
  const e = We(t), n = e ? t : [t], o = n.map((s) => So(s, Ne)[0]);
  return zr(n), e ? o : o[0];
};
Ne.valid = (t) => {
  const e = t && t.elements, n = Be(e) && e();
  return an(n) && !!Oo(n.target);
};
Ne.env = () => {
  const { N: t, T: e, P: n, G: o, st: s, et: i, Z: c, tt: u, nt: l, ot: d } = Ke();
  return oe({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: n,
    scrollTimeline: o,
    staticDefaultInitialization: s,
    staticDefaultOptions: i,
    getDefaultInitialization: c,
    setDefaultInitialization: u,
    getDefaultOptions: l,
    setDefaultOptions: d
  });
};
Ne.nonce = ma;
Ne.trustedTypePolicy = Br;
function La() {
  let t;
  const e = A(null), n = Math.floor(Math.random() * 2 ** 32), o = A(!1), s = A([]), i = () => s.value, c = () => t.getSelection(), u = () => s.value.length, l = () => t.clearSelection(!0), d = A(), _ = A(null), v = A(null), p = A(null), m = A(null);
  function h() {
    t = new mr({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: V, event: F, isDragging: j }) => {
      if (j)
        t.Interaction._reset(F);
      else {
        o.value = !1;
        const O = e.value.offsetWidth - F.offsetX, w = e.value.offsetHeight - F.offsetY;
        O < 15 && w < 15 && t.Interaction._reset(F), F.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(F);
      }
    }), document.addEventListener("dragleave", (V) => {
      !V.buttons && o.value && (o.value = !1);
    });
  }
  const x = () => vt(() => {
    t.addSelection(
      t.getSelectables()
    ), $();
  }), $ = () => {
    s.value = t.getSelection().map((V) => JSON.parse(V.dataset.item)), d.value(s.value);
  }, M = () => vt(() => {
    const V = i().map((F) => F.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter((F) => V.includes(JSON.parse(F.dataset.item).path))
    ), $(), D();
  }), I = (V) => {
    d.value = V, t.subscribe("DS:end", ({ items: F, event: j, isDragging: O }) => {
      s.value = F.map((w) => JSON.parse(w.dataset.item)), V(F.map((w) => JSON.parse(w.dataset.item)));
    });
  }, D = () => {
    _.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (v.value.style.height = e.value.scrollHeight + "px", v.value.style.display = "block") : (v.value.style.height = "100%", v.value.style.display = "none"));
  }, C = (V) => {
    if (!_.value)
      return;
    const { scrollOffsetElement: F } = _.value.elements();
    F.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return Ce(() => {
    Ne(p.value, {
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
      initialized: (V) => {
        _.value = V;
      },
      scroll: (V, F) => {
        const { scrollOffsetElement: j } = V.elements();
        e.value.scrollTo({
          top: j.scrollTop,
          left: 0
        });
      }
    }), h(), D(), m.value = new ResizeObserver(D), m.value.observe(e.value), e.value.addEventListener("scroll", C), t.subscribe("DS:scroll", ({ isDragging: V }) => V || C());
  }), Qn(() => {
    t && t.stop(), m.value && m.value.disconnect();
  }), Rs(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: n,
    isDraggingRef: o,
    scrollBar: v,
    scrollBarContainer: p,
    getSelected: i,
    getSelection: c,
    selectAll: x,
    clearSelection: l,
    refreshSelection: M,
    getCount: u,
    onSelect: I
  };
}
function Oa(t, e) {
  const n = A(t), o = A(e), s = A([]), i = A([]), c = A([]), u = A(!1), l = A(5);
  let d = !1, _ = !1;
  const v = St({
    adapter: n,
    storages: [],
    dirname: o,
    files: []
  });
  function p() {
    let I = [], D = [], C = o.value ?? n.value + "://";
    C.length === 0 && (s.value = []), C.replace(n.value + "://", "").split("/").filter(Boolean).forEach(function(j) {
      I.push(j), I.join("/") !== "" && D.push({
        basename: j,
        name: j,
        path: n.value + "://" + I.join("/") + "/",
        type: "dir"
      });
    }), i.value = D;
    const [V, F] = h(
      D,
      l.value
    );
    c.value = F, s.value = V;
  }
  function m(I) {
    l.value = I, p();
  }
  function h(I, D) {
    return I.length > D ? [I.slice(-D), I.slice(0, -D)] : [I, []];
  }
  function x(I = null) {
    u.value = I ?? !u.value;
  }
  function $() {
    return s.value && s.value.length && !0;
  }
  const M = wt(() => {
    var I;
    return ((I = s.value[s.value.length - 2]) == null ? void 0 : I.path) ?? n.value + "://";
  });
  return Ce(() => {
  }), Ve(o, p), Ce(p), {
    adapter: n,
    path: o,
    loading: d,
    searchMode: _,
    data: v,
    breadcrumbs: s,
    breadcrumbItems: i,
    limitBreadcrumbItems: m,
    hiddenBreadcrumbs: c,
    showHiddenBreadcrumbs: u,
    toggleHiddenBreadcrumbs: x,
    isGoUpAvailable: $,
    parentFolderPath: M
  };
}
const Fa = (t, e) => {
  const n = kr(t.id), o = _r(), s = n.getStore("metricUnits", !1), i = Tr(n, t.theme), c = e.i18n, u = t.locale ?? e.locale, l = (m) => Array.isArray(m) ? m : $r, d = n.getStore("persist-path", t.persist), _ = d ? n.getStore("path", t.path) : t.path, v = d ? n.getStore("adapter") : null, p = La();
  return St({
    /** 
    * Core properties
    * */
    // app version
    version: Cr,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: o,
    // storage
    storage: n,
    // localization object
    i18n: Sr(n, u, o, c),
    // modal state
    modal: Mr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: wt(() => p),
    // http object
    requester: yr(t.request),
    // active features
    features: l(t.features),
    // view state
    view: n.getStore("viewport", "grid"),
    // fullscreen state
    fullScreen: n.getStore("full-screen", t.fullScreen),
    // show tree view
    showTreeView: n.getStore("show-tree-view", t.showTreeView),
    // pinnedFolders
    pinnedFolders: n.getStore("pinned-folders", t.pinnedFolders),
    // treeViewData
    treeViewData: [],
    // selectButton state
    selectButton: t.selectButton,
    // max file size
    maxFileSize: t.maxFileSize,
    /**
    * Settings
    * */
    // theme state
    theme: i,
    // unit state - for example: GB or GiB
    metricUnits: s,
    // human readable file sizes
    filesize: s ? zs : qs,
    // show large icons in list view
    compactListView: n.getStore("compact-list-view", !0),
    // persist state
    persist: d,
    // show thumbnails
    showThumbnails: n.getStore("show-thumbnails", t.showThumbnails),
    // type of progress indicator
    loadingIndicator: t.loadingIndicator,
    // possible items of the context menu
    contextMenuItems: t.contextMenuItems,
    // file system
    fs: Oa(v, _)
  });
}, Ia = { class: "vuefinder__modal-layout__container" }, Ha = { class: "vuefinder__modal-layout__content" }, Ba = { class: "vuefinder__modal-layout__footer" }, Ye = {
  __name: "ModalLayout",
  setup(t) {
    const e = A(null), n = re("ServiceContainer");
    return Ce(() => {
      const o = document.querySelector(".v-f-modal input");
      o && o.focus(), vt(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const s = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: s,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (o, s) => (f(), g("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = $t((i) => r(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      s[2] || (s[2] = a("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      a("div", Ia, [
        a("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = et((i) => r(n).modal.close(), ["self"]))
        }, [
          a("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            a("div", Ha, [
              Lt(o.$slots, "default")
            ]),
            a("div", Ba, [
              Lt(o.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Ra = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [o, s] of e)
    n[o] = s;
  return n;
}, Ua = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const o = re("ServiceContainer"), s = A(!1), { t: i } = o.i18n;
    let c = null;
    const u = () => {
      clearTimeout(c), s.value = !0, c = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return Ce(() => {
      o.emitter.on(t.on, u);
    }), Qn(() => {
      clearTimeout(c);
    }), {
      shown: s,
      t: i
    };
  }
}, Na = { key: 1 };
function Pa(t, e, n, o, s, i) {
  return f(), g("div", {
    class: le(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    t.$slots.default ? Lt(t.$slots, "default", { key: 0 }) : (f(), g("span", Na, b(o.t("Saved.")), 1))
  ], 2);
}
const _t = /* @__PURE__ */ Ra(Ua, [["render", Pa]]), qa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function za(t, e) {
  return f(), g("svg", qa, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ]));
}
const ja = { render: za }, Ga = { class: "vuefinder__modal-header" }, Wa = { class: "vuefinder__modal-header__icon-container" }, Ka = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, nt = {
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
  setup(t) {
    return (e, n) => (f(), g("div", Ga, [
      a("div", Wa, [
        (f(), K(Us(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      a("h3", Ka, b(t.title), 1)
    ]));
  }
}, Ya = { class: "vuefinder__about-modal__content" }, Xa = { class: "vuefinder__about-modal__main" }, Za = {
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
}, dl = { class: "vuefinder__about-modal__setting flex" }, ul = { class: "vuefinder__about-modal__setting-input" }, vl = { class: "vuefinder__about-modal__setting-label" }, fl = {
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
}, Ml = { class: "vuefinder__about-modal__setting-input" }, Al = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Dl = { class: "vuefinder__about-modal__setting-label" }, Vl = ["label"], Ll = ["value"], Ol = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Fl = { class: "vuefinder__about-modal__shortcuts" }, Il = { class: "vuefinder__about-modal__shortcut" }, Hl = { class: "vuefinder__about-modal__shortcut" }, Bl = { class: "vuefinder__about-modal__shortcut" }, Rl = { class: "vuefinder__about-modal__shortcut" }, Ul = { class: "vuefinder__about-modal__shortcut" }, Nl = { class: "vuefinder__about-modal__shortcut" }, Pl = { class: "vuefinder__about-modal__shortcut" }, ql = { class: "vuefinder__about-modal__shortcut" }, zl = { class: "vuefinder__about-modal__shortcut" }, jl = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Gl = { class: "vuefinder__about-modal__description" }, Fo = {
  __name: "ModalAbout",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n, clearStore: o } = e.storage, { t: s } = e.i18n, i = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, c = wt(() => [
      { name: s("About"), key: i.ABOUT },
      { name: s("Settings"), key: i.SETTINGS },
      { name: s("Shortcuts"), key: i.SHORTCUTS },
      { name: s("Reset"), key: i.RESET }
    ]), u = A("about"), l = async () => {
      o(), location.reload();
    }, d = (I) => {
      e.theme.set(I), e.emitter.emit("vf-theme-saved");
    }, _ = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? zs : qs, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, v = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, m = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = re("VueFinderOptions"), $ = Object.fromEntries(
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
      }).filter(([I]) => Object.keys(h).includes(I))
    ), M = wt(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (I, D) => (f(), K(Ye, null, {
      buttons: J(() => [
        a("button", {
          type: "button",
          onClick: D[7] || (D[7] = (C) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(s)("Close")), 1)
      ]),
      default: J(() => [
        a("div", Ya, [
          z(nt, {
            icon: r(ja),
            title: "Vuefinder " + r(e).version
          }, null, 8, ["icon", "title"]),
          a("div", Xa, [
            a("div", null, [
              a("div", null, [
                a("nav", Za, [
                  (f(!0), g(ye, null, $e(c.value, (C) => (f(), g("button", {
                    key: C.name,
                    onClick: (V) => u.value = C.key,
                    class: le([C.key === u.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": C.current ? "page" : void 0
                  }, b(C.name), 11, Qa))), 128))
                ])
              ])
            ]),
            u.value === i.ABOUT ? (f(), g("div", Ja, [
              a("div", el, b(r(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              a("a", tl, b(r(s)("Project home")), 1),
              a("a", nl, b(r(s)("Follow on GitHub")), 1)
            ])) : U("", !0),
            u.value === i.SETTINGS ? (f(), g("div", sl, [
              a("div", ol, b(r(s)("Customize your experience with the following settings")), 1),
              a("div", rl, [
                a("fieldset", null, [
                  a("div", al, [
                    a("div", ll, [
                      _e(a("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": D[0] || (D[0] = (C) => r(e).metricUnits = C),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Xt, r(e).metricUnits]
                      ])
                    ]),
                    a("div", il, [
                      a("label", cl, [
                        Z(b(r(s)("Use Metric Units")) + " ", 1),
                        z(_t, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: J(() => [
                            Z(b(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", dl, [
                    a("div", ul, [
                      _e(a("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": D[1] || (D[1] = (C) => r(e).compactListView = C),
                        onClick: v,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Xt, r(e).compactListView]
                      ])
                    ]),
                    a("div", vl, [
                      a("label", fl, [
                        Z(b(r(s)("Compact list view")) + " ", 1),
                        z(_t, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: J(() => [
                            Z(b(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", _l, [
                    a("div", ml, [
                      _e(a("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": D[2] || (D[2] = (C) => r(e).persist = C),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Xt, r(e).persist]
                      ])
                    ]),
                    a("div", pl, [
                      a("label", hl, [
                        Z(b(r(s)("Persist path on reload")) + " ", 1),
                        z(_t, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: J(() => [
                            Z(b(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", gl, [
                    a("div", bl, [
                      _e(a("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": D[3] || (D[3] = (C) => r(e).showThumbnails = C),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Xt, r(e).showThumbnails]
                      ])
                    ]),
                    a("div", wl, [
                      a("label", yl, [
                        Z(b(r(s)("Show thumbnails")) + " ", 1),
                        z(_t, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: J(() => [
                            Z(b(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", kl, [
                    a("div", xl, [
                      a("label", Sl, b(r(s)("Theme")), 1)
                    ]),
                    a("div", $l, [
                      _e(a("select", {
                        id: "theme",
                        "onUpdate:modelValue": D[4] || (D[4] = (C) => r(e).theme.value = C),
                        onChange: D[5] || (D[5] = (C) => d(C.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: r(s)("Theme")
                        }, [
                          (f(!0), g(ye, null, $e(M.value, (C, V) => (f(), g("option", { value: V }, b(C), 9, El))), 256))
                        ], 8, Cl)
                      ], 544), [
                        [gs, r(e).theme.value]
                      ]),
                      z(_t, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: J(() => [
                          Z(b(r(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  r(e).features.includes(r(ue).LANGUAGE) && Object.keys(r($)).length > 1 ? (f(), g("div", Tl, [
                    a("div", Ml, [
                      a("label", Al, b(r(s)("Language")), 1)
                    ]),
                    a("div", Dl, [
                      _e(a("select", {
                        id: "language",
                        "onUpdate:modelValue": D[6] || (D[6] = (C) => r(e).i18n.locale = C),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: r(s)("Language")
                        }, [
                          (f(!0), g(ye, null, $e(r($), (C, V) => (f(), g("option", { value: V }, b(C), 9, Ll))), 256))
                        ], 8, Vl)
                      ], 512), [
                        [gs, r(e).i18n.locale]
                      ]),
                      z(_t, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: J(() => [
                          Z(b(r(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : U("", !0)
                ])
              ])
            ])) : U("", !0),
            u.value === i.SHORTCUTS ? (f(), g("div", Ol, [
              a("div", Fl, [
                a("div", Il, [
                  a("div", null, b(r(s)("Rename")), 1),
                  D[8] || (D[8] = a("kbd", null, "F2", -1))
                ]),
                a("div", Hl, [
                  a("div", null, b(r(s)("Refresh")), 1),
                  D[9] || (D[9] = a("kbd", null, "F5", -1))
                ]),
                a("div", Bl, [
                  Z(b(r(s)("Delete")) + " ", 1),
                  D[10] || (D[10] = a("kbd", null, "Del", -1))
                ]),
                a("div", Rl, [
                  Z(b(r(s)("Escape")) + " ", 1),
                  D[11] || (D[11] = a("div", null, [
                    a("kbd", null, "Esc")
                  ], -1))
                ]),
                a("div", Ul, [
                  Z(b(r(s)("Select All")) + " ", 1),
                  D[12] || (D[12] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Z(" + "),
                    a("kbd", null, "A")
                  ], -1))
                ]),
                a("div", Nl, [
                  Z(b(r(s)("Search")) + " ", 1),
                  D[13] || (D[13] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Z(" + "),
                    a("kbd", null, "F")
                  ], -1))
                ]),
                a("div", Pl, [
                  Z(b(r(s)("Toggle Sidebar")) + " ", 1),
                  D[14] || (D[14] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Z(" + "),
                    a("kbd", null, "E")
                  ], -1))
                ]),
                a("div", ql, [
                  Z(b(r(s)("Open Settings")) + " ", 1),
                  D[15] || (D[15] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Z(" + "),
                    a("kbd", null, ",")
                  ], -1))
                ]),
                a("div", zl, [
                  Z(b(r(s)("Toggle Full Screen")) + " ", 1),
                  D[16] || (D[16] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Z(" + "),
                    a("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : U("", !0),
            u.value === i.RESET ? (f(), g("div", jl, [
              a("div", Gl, b(r(s)("Reset all settings to default")), 1),
              a("button", {
                onClick: l,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(r(s)("Reset Settings")), 1)
            ])) : U("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Wl = ["title"], Xe = {
  __name: "Message",
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    var d;
    const n = e, o = re("ServiceContainer"), { t: s } = o.i18n, i = A(!1), c = A(null), u = A((d = c.value) == null ? void 0 : d.strMessage);
    Ve(u, () => i.value = !1);
    const l = () => {
      n("hidden"), i.value = !0;
    };
    return (_, v) => (f(), g("div", null, [
      i.value ? U("", !0) : (f(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: le(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Lt(_.$slots, "default"),
        a("div", {
          class: "vuefinder__message__close",
          onClick: l,
          title: r(s)("Close")
        }, v[0] || (v[0] = [
          a("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            a("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ]), 8, Wl)
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
function Yl(t, e) {
  return f(), g("svg", Kl, e[0] || (e[0] = [
    a("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ]));
}
const Io = { render: Yl }, Xl = { class: "vuefinder__delete-modal__content" }, Zl = { class: "vuefinder__delete-modal__form" }, Ql = { class: "vuefinder__delete-modal__description" }, Jl = { class: "vuefinder__delete-modal__files vf-scrollbar" }, ei = { class: "vuefinder__delete-modal__file" }, ti = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ni = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, si = { class: "vuefinder__delete-modal__file-name" }, oi = { class: "vuefinder__delete-modal__warning" }, vs = {
  __name: "ModalDelete",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = A(e.modal.data.items), s = A(""), i = () => {
      o.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: o.value.map(({ path: c, type: u }) => ({ path: c, type: u }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files deleted.") }), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: e.fs.data.dirname
            }
          });
        },
        onError: (c) => {
          s.value = n(c.message), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: e.fs.data.dirname
            }
          });
        }
      });
    };
    return (c, u) => (f(), K(Ye, null, {
      buttons: J(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-danger"
        }, b(r(n)("Yes, Delete!")), 1),
        a("button", {
          type: "button",
          onClick: u[1] || (u[1] = (l) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(n)("Cancel")), 1),
        a("div", oi, b(r(n)("This action cannot be undone.")), 1)
      ]),
      default: J(() => [
        a("div", null, [
          z(nt, {
            icon: r(Io),
            title: r(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          a("div", Xl, [
            a("div", Zl, [
              a("p", Ql, b(r(n)("Are you sure you want to delete these files?")), 1),
              a("div", Jl, [
                (f(!0), g(ye, null, $e(o.value, (l) => (f(), g("p", ei, [
                  l.type === "dir" ? (f(), g("svg", ti, u[2] || (u[2] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), g("svg", ni, u[3] || (u[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  a("span", si, b(l.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (f(), K(Xe, {
                key: 0,
                onHidden: u[0] || (u[0] = (l) => s.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(s.value), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ri = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ai(t, e) {
  return f(), g("svg", ri, e[0] || (e[0] = [
    a("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ]));
}
const Ho = { render: ai }, li = { class: "vuefinder__rename-modal__content" }, ii = { class: "vuefinder__rename-modal__item" }, ci = { class: "vuefinder__rename-modal__item-info" }, di = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ui = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, vi = { class: "vuefinder__rename-modal__item-name" }, fs = {
  __name: "ModalRename",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = A(e.modal.data.items[0]), s = A(e.modal.data.items[0].basename), i = A(""), c = () => {
      s.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: o.value.path,
          name: s.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", {
            label: n("%s is renamed.", s.value)
          }), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: e.fs.data.dirname
            }
          });
        },
        onError: (u) => {
          i.value = n(u.message);
        }
      });
    };
    return (u, l) => (f(), K(Ye, null, {
      buttons: J(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(r(n)("Rename")), 1),
        a("button", {
          type: "button",
          onClick: l[2] || (l[2] = (d) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(n)("Cancel")), 1)
      ]),
      default: J(() => [
        a("div", null, [
          z(nt, {
            icon: r(Ho),
            title: r(n)("Rename")
          }, null, 8, ["icon", "title"]),
          a("div", li, [
            a("div", ii, [
              a("p", ci, [
                o.value.type === "dir" ? (f(), g("svg", di, l[3] || (l[3] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (f(), g("svg", ui, l[4] || (l[4] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                a("span", vi, b(o.value.basename), 1)
              ]),
              _e(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (d) => s.value = d),
                onKeyup: $t(c, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Ct, s.value]
              ]),
              i.value.length ? (f(), K(Xe, {
                key: 0,
                onHidden: l[1] || (l[1] = (d) => i.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(i.value), 1)
                ]),
                _: 1
              })) : U("", !0)
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
function fi(t) {
  const e = (n) => {
    n.code === Ze.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === Ze.F2 && t.features.includes(ue.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(fs, { items: t.dragSelect.getSelected() })), n.code === Ze.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === Ze.DELETE && (!t.dragSelect.getCount() || t.modal.open(vs, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === Ze.BACKSLASH && t.modal.open(Fo), n.metaKey && n.code === Ze.KEY_F && t.features.includes(ue.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === Ze.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === Ze.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === Ze.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
  };
  Ce(() => {
    t.root.addEventListener("keydown", e);
  });
}
const _i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function mi(t, e) {
  return f(), g("svg", _i, e[0] || (e[0] = [
    a("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const Bo = { render: mi }, pi = { class: "vuefinder__new-folder-modal__content" }, hi = { class: "vuefinder__new-folder-modal__form" }, gi = { class: "vuefinder__new-folder-modal__description" }, bi = ["placeholder"], Ro = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = re("ServiceContainer"), { getStore: n } = e.storage, { t: o } = e.i18n, s = A(""), i = A(""), c = () => {
      s.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: s.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", {
            label: o("%s is created.", s.value)
          }), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: e.fs.data.dirname
            }
          });
        },
        onError: (u) => {
          i.value = o(u.message);
        }
      });
    };
    return (u, l) => (f(), K(Ye, null, {
      buttons: J(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(r(o)("Create")), 1),
        a("button", {
          type: "button",
          onClick: l[2] || (l[2] = (d) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(o)("Cancel")), 1)
      ]),
      default: J(() => [
        a("div", null, [
          z(nt, {
            icon: r(Bo),
            title: r(o)("New Folder")
          }, null, 8, ["icon", "title"]),
          a("div", pi, [
            a("div", hi, [
              a("p", gi, b(r(o)("Create a new folder")), 1),
              _e(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (d) => s.value = d),
                onKeyup: $t(c, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: r(o)("Folder Name"),
                type: "text"
              }, null, 40, bi), [
                [Ct, s.value]
              ]),
              i.value.length ? (f(), K(Xe, {
                key: 0,
                onHidden: l[1] || (l[1] = (d) => i.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(i.value), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, wi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function yi(t, e) {
  return f(), g("svg", wi, e[0] || (e[0] = [
    a("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ]));
}
const Uo = { render: yi }, ki = { class: "vuefinder__new-file-modal__content" }, xi = { class: "vuefinder__new-file-modal__form" }, Si = { class: "vuefinder__new-file-modal__description" }, $i = ["placeholder"], Ci = {
  __name: "ModalNewFile",
  setup(t) {
    const e = re("ServiceContainer"), { getStore: n } = e.storage, { t: o } = e.i18n, s = A(""), i = A(""), c = () => {
      s.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: s.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", {
            label: o("%s is created.", s.value)
          }), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: e.fs.data.dirname
            }
          });
        },
        onError: (u) => {
          i.value = o(u.message);
        }
      });
    };
    return (u, l) => (f(), K(Ye, null, {
      buttons: J(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(r(o)("Create")), 1),
        a("button", {
          type: "button",
          onClick: l[2] || (l[2] = (d) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(o)("Cancel")), 1)
      ]),
      default: J(() => [
        a("div", null, [
          z(nt, {
            icon: r(Uo),
            title: r(o)("New File")
          }, null, 8, ["icon", "title"]),
          a("div", ki, [
            a("div", xi, [
              a("p", Si, b(r(o)("Create a new file")), 1),
              _e(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (d) => s.value = d),
                onKeyup: $t(c, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: r(o)("File Name"),
                type: "text"
              }, null, 40, $i), [
                [Ct, s.value]
              ]),
              i.value.length ? (f(), K(Xe, {
                key: 0,
                onHidden: l[1] || (l[1] = (d) => i.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(i.value), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
};
function Xn(t, e = 14) {
  let n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const Ei = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ti(t, e) {
  return f(), g("svg", Ei, e[0] || (e[0] = [
    a("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ]));
}
const No = { render: Ti }, Mi = { class: "vuefinder__upload-modal__content" }, Ai = {
  key: 0,
  class: "pointer-events-none"
}, Di = {
  key: 1,
  class: "pointer-events-none"
}, Vi = ["disabled"], Li = ["disabled"], Oi = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Fi = ["textContent"], Ii = { class: "vuefinder__upload-modal__file-info" }, Hi = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Bi = { class: "vuefinder__upload-modal__file-name md:hidden" }, Ri = {
  key: 0,
  class: "ml-auto"
}, Ui = ["title", "disabled", "onClick"], Ni = {
  key: 0,
  class: "py-2"
}, Pi = ["disabled"], qi = {
  __name: "ModalUpload",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = n("uppy"), s = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, i = A({ QUEUE_ENTRY_STATUS: s }), c = A(null), u = A(null), l = A(null), d = A(null), _ = A(null), v = A(null), p = A([]), m = A(""), h = A(!1), x = A(!1);
    let $;
    function M(k) {
      return p.value.findIndex((B) => B.id === k);
    }
    function I(k, B = null) {
      B = B ?? (k.webkitRelativePath || k.name), $.addFile({
        name: B,
        type: k.type,
        data: k,
        source: "Local"
      });
    }
    function D(k) {
      switch (k.status) {
        case s.DONE:
          return "text-green-600";
        case s.ERROR:
          return "text-red-600";
        case s.CANCELED:
          return "text-red-600";
        case s.PENDING:
        default:
          return "";
      }
    }
    const C = (k) => {
      switch (k.status) {
        case s.DONE:
          return "✓";
        case s.ERROR:
        case s.CANCELED:
          return "!";
        case s.PENDING:
        default:
          return "...";
      }
    };
    function V() {
      d.value.click();
    }
    function F() {
      if (!h.value) {
        if (!p.value.filter((k) => k.status !== s.DONE).length) {
          m.value = n("Please select file to upload first.");
          return;
        }
        m.value = "", $.retryAll(), $.upload();
      }
    }
    function j() {
      $.cancelAll({ reason: "user" }), p.value.forEach((k) => {
        k.status !== s.DONE && (k.status = s.CANCELED, k.statusName = n("Canceled"));
      }), h.value = !1;
    }
    function O(k) {
      h.value || ($.removeFile(k.id, "removed-by-user"), p.value.splice(M(k.id), 1));
    }
    function w(k) {
      if (!h.value) {
        if ($.cancelAll({ reason: "user" }), k) {
          const B = [];
          p.value.forEach((S) => {
            S.status !== s.DONE && B.push(S);
          }), p.value = [], B.forEach((S) => {
            I(S.originalFile, S.name);
          });
          return;
        }
        p.value.splice(0);
      }
    }
    function y() {
      e.modal.close();
    }
    function L() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return Ce(async () => {
      $ = new pr({
        debug: e.debug,
        restrictions: {
          maxFileSize: Er(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: o,
        onBeforeFileAdded(S, R) {
          if (R[S.id] != null) {
            const ee = M(S.id);
            p.value[ee].status === s.PENDING && (m.value = $.i18n("noDuplicates", { fileName: S.name })), p.value = p.value.filter((se) => se.id !== S.id);
          }
          return p.value.push({
            id: S.id,
            name: S.name,
            size: e.filesize(S.size),
            status: s.PENDING,
            statusName: n("Pending upload"),
            percent: null,
            originalFile: S.data
          }), !0;
        }
      }), $.use(hr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(S, R) {
          let N;
          try {
            N = JSON.parse(S).message;
          } catch {
            N = n("Cannot parse server response.");
          }
          return new Error(N);
        }
      }), $.on("restriction-failed", (S, R) => {
        const N = p.value[M(S.id)];
        O(N), m.value = R.message;
      }), $.on("upload", () => {
        const S = L();
        $.setMeta({ ...S.body });
        const R = $.getPlugin("XHRUpload");
        R.opts.method = S.method, R.opts.endpoint = S.url + "?" + new URLSearchParams(S.params), R.opts.headers = S.headers, delete S.headers["Content-Type"], h.value = !0, p.value.forEach((N) => {
          N.status !== s.DONE && (N.percent = null, N.status = s.UPLOADING, N.statusName = n("Pending upload"));
        });
      }), $.on("upload-progress", (S, R) => {
        const N = Math.floor(R.bytesUploaded / R.bytesTotal * 100);
        p.value[M(S.id)].percent = `${N}%`;
      }), $.on("upload-success", (S) => {
        const R = p.value[M(S.id)];
        R.status = s.DONE, R.statusName = n("Done"), e.emitter.emit("vf-fetch", {
          params: {
            q: "index",
            adapter: e.fs.adapter,
            path: e.fs.data.dirname
          }
        });
      }), $.on("upload-error", (S, R) => {
        const N = p.value[M(S.id)];
        N.percent = null, N.status = s.ERROR, R.isNetworkError ? N.statusName = n(
          "Network Error, Unable establish connection to the server or interrupted."
        ) : N.statusName = R ? R.message : n("Unknown Error");
      }), $.on("error", (S) => {
        m.value = S.message, h.value = !1, e.emitter.emit("vf-fetch", {
          params: {
            q: "index",
            adapter: e.fs.adapter,
            path: e.fs.data.dirname
          },
          noCloseModal: !0
        });
      }), $.on("complete", () => {
        h.value = !1, e.emitter.emit("vf-fetch", {
          params: {
            q: "index",
            adapter: e.fs.adapter,
            path: e.fs.data.dirname
          },
          noCloseModal: !0
        });
      }), d.value.addEventListener("click", () => {
        u.value.click();
      }), _.value.addEventListener("click", () => {
        l.value.click();
      }), v.value.addEventListener("dragover", (S) => {
        S.preventDefault(), x.value = !0;
      }), v.value.addEventListener("dragleave", (S) => {
        S.preventDefault(), x.value = !1;
      });
      function k(S, R) {
        R.isFile && R.file((N) => S(R, N)), R.isDirectory && R.createReader().readEntries((N) => {
          N.forEach((ee) => {
            k(S, ee);
          });
        });
      }
      v.value.addEventListener("drop", (S) => {
        S.preventDefault(), x.value = !1;
        const R = /^[/\\](.+)/;
        [...S.dataTransfer.items].forEach((N) => {
          N.kind === "file" && k((ee, se) => {
            const ne = R.exec(ee.fullPath);
            I(se, ne[1]);
          }, N.webkitGetAsEntry());
        });
      });
      const B = ({ target: S }) => {
        const R = S.files;
        for (const N of R)
          I(N);
        S.value = "";
      };
      u.value.addEventListener("change", B), l.value.addEventListener("change", B);
    }), Ns(() => {
      $ == null || $.close({ reason: "unmount" });
    }), (k, B) => (f(), K(Ye, null, {
      buttons: J(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: et(F, ["prevent"])
        }, b(r(n)("Upload")), 9, Pi),
        h.value ? (f(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: et(j, ["prevent"])
        }, b(r(n)("Cancel")), 1)) : (f(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: et(y, ["prevent"])
        }, b(r(n)("Close")), 1))
      ]),
      default: J(() => [
        a("div", null, [
          z(nt, {
            icon: r(No),
            title: r(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          a("div", Mi, [
            a("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: v,
              onClick: V
            }, [
              x.value ? (f(), g("div", Ai, b(r(n)("Release to drop these files.")), 1)) : (f(), g("div", Di, b(r(n)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            a("div", {
              ref_key: "container",
              ref: c,
              class: "vuefinder__upload-modal__buttons"
            }, [
              a("button", {
                ref_key: "pickFiles",
                ref: d,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(r(n)("Select Files")), 513),
              a("button", {
                ref_key: "pickFolders",
                ref: _,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(r(n)("Select Folders")), 513),
              a("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: B[0] || (B[0] = (S) => w(!1))
              }, b(r(n)("Clear all")), 9, Vi),
              a("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: B[1] || (B[1] = (S) => w(!0))
              }, b(r(n)("Clear only successful")), 9, Li)
            ], 512),
            a("div", Oi, [
              (f(!0), g(ye, null, $e(p.value, (S) => (f(), g("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: S.id
              }, [
                a("span", {
                  class: le(["vuefinder__upload-modal__file-icon", D(S)])
                }, [
                  a("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(C(S))
                  }, null, 8, Fi)
                ], 2),
                a("div", Ii, [
                  a("div", Hi, b(r(Xn)(S.name, 40)) + " (" + b(S.size) + ") ", 1),
                  a("div", Bi, b(r(Xn)(S.name, 16)) + " (" + b(S.size) + ") ", 1),
                  a("div", {
                    class: le(["vuefinder__upload-modal__file-status", D(S)])
                  }, [
                    Z(b(S.statusName) + " ", 1),
                    S.status === i.value.QUEUE_ENTRY_STATUS.UPLOADING ? (f(), g("b", Ri, b(S.percent), 1)) : U("", !0)
                  ], 2)
                ]),
                a("button", {
                  type: "button",
                  class: le(["vuefinder__upload-modal__file-remove", h.value ? "disabled" : ""]),
                  title: r(n)("Delete"),
                  disabled: h.value,
                  onClick: (R) => O(S)
                }, B[3] || (B[3] = [
                  a("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ]), 10, Ui)
              ]))), 128)),
              p.value.length ? U("", !0) : (f(), g("div", Ni, b(r(n)("No files selected!")), 1))
            ]),
            m.value.length ? (f(), K(Xe, {
              key: 0,
              onHidden: B[2] || (B[2] = (S) => m.value = ""),
              error: ""
            }, {
              default: J(() => [
                Z(b(m.value), 1)
              ]),
              _: 1
            })) : U("", !0)
          ])
        ]),
        a("input", {
          ref_key: "internalFileInput",
          ref: u,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        a("input", {
          ref_key: "internalFolderInput",
          ref: l,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}, zi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ji(t, e) {
  return f(), g("svg", zi, e[0] || (e[0] = [
    a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const Po = { render: ji }, Gi = { class: "vuefinder__unarchive-modal__content" }, Wi = { class: "vuefinder__unarchive-modal__items" }, Ki = { class: "vuefinder__unarchive-modal__item" }, Yi = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xi = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Zi = { class: "vuefinder__unarchive-modal__item-name" }, Qi = { class: "vuefinder__unarchive-modal__info" }, qo = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = A(e.modal.data.items[0]), s = A(""), i = A([]), c = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: o.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file unarchived.") });
        },
        onError: (u) => {
          s.value = n(u.message);
        }
      });
    };
    return (u, l) => (f(), K(Ye, null, {
      buttons: J(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(r(n)("Unarchive")), 1),
        a("button", {
          type: "button",
          onClick: l[1] || (l[1] = (d) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(n)("Cancel")), 1)
      ]),
      default: J(() => [
        a("div", null, [
          z(nt, {
            icon: r(Po),
            title: r(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          a("div", Gi, [
            a("div", Wi, [
              (f(!0), g(ye, null, $e(i.value, (d) => (f(), g("p", Ki, [
                d.type === "dir" ? (f(), g("svg", Yi, l[2] || (l[2] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (f(), g("svg", Xi, l[3] || (l[3] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                a("span", Zi, b(d.basename), 1)
              ]))), 256)),
              a("p", Qi, b(r(n)("The archive will be unarchived at")) + " (" + b(r(e).fs.data.dirname) + ")", 1),
              s.value.length ? (f(), K(Xe, {
                key: 0,
                onHidden: l[0] || (l[0] = (d) => s.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(s.value), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Ji = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ec(t, e) {
  return f(), g("svg", Ji, e[0] || (e[0] = [
    a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const zo = { render: ec }, tc = { class: "vuefinder__archive-modal__content" }, nc = { class: "vuefinder__archive-modal__form" }, sc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, oc = { class: "vuefinder__archive-modal__file" }, rc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ac = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, lc = { class: "vuefinder__archive-modal__file-name" }, ic = ["placeholder"], jo = {
  __name: "ModalArchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = A(""), s = A(""), i = A(e.modal.data.items), c = () => {
      i.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: i.value.map(({ path: u, type: l }) => ({ path: u, type: l })),
          name: o.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (u) => {
          s.value = n(u.message);
        }
      });
    };
    return (u, l) => (f(), K(Ye, null, {
      buttons: J(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(r(n)("Archive")), 1),
        a("button", {
          type: "button",
          onClick: l[2] || (l[2] = (d) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(n)("Cancel")), 1)
      ]),
      default: J(() => [
        a("div", null, [
          z(nt, {
            icon: r(zo),
            title: r(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          a("div", tc, [
            a("div", nc, [
              a("div", sc, [
                (f(!0), g(ye, null, $e(i.value, (d) => (f(), g("p", oc, [
                  d.type === "dir" ? (f(), g("svg", rc, l[3] || (l[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), g("svg", ac, l[4] || (l[4] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  a("span", lc, b(d.basename), 1)
                ]))), 256))
              ]),
              _e(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (d) => o.value = d),
                onKeyup: $t(c, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: r(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, ic), [
                [Ct, o.value]
              ]),
              s.value.length ? (f(), K(Xe, {
                key: 0,
                onHidden: l[1] || (l[1] = (d) => s.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(s.value), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, cc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function dc(t, e) {
  return f(), g("svg", cc, e[0] || (e[0] = [
    a("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
    }, null, -1),
    a("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ]));
}
const _s = { render: dc }, uc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function vc(t, e) {
  return f(), g("svg", uc, e[0] || (e[0] = [
    a("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ]));
}
const fc = { render: vc }, _c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function mc(t, e) {
  return f(), g("svg", _c, e[0] || (e[0] = [
    a("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ]));
}
const pc = { render: mc }, hc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function gc(t, e) {
  return f(), g("svg", hc, e[0] || (e[0] = [
    a("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ]));
}
const bc = { render: gc }, wc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function yc(t, e) {
  return f(), g("svg", wc, e[0] || (e[0] = [
    a("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ]));
}
const kc = { render: yc }, xc = { class: "vuefinder__toolbar" }, Sc = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, $c = ["title"], Cc = ["title"], Ec = ["title"], Tc = ["title"], Mc = ["title"], Ac = ["title"], Dc = ["title"], Vc = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Lc = { class: "pl-2" }, Oc = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Fc = { class: "vuefinder__toolbar__controls" }, Ic = ["title"], Hc = ["title"], Bc = {
  __name: "Toolbar",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, { t: o } = e.i18n, s = e.dragSelect, i = A("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const c = () => {
      e.fullScreen = !e.fullScreen;
    };
    Ve(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const u = () => {
      e.view = e.view === "list" ? "grid" : "list", s.refreshSelection(), n("viewport", e.view);
    };
    return (l, d) => (f(), g("div", xc, [
      i.value.length ? (f(), g("div", Vc, [
        a("div", Lc, [
          Z(b(r(o)("Search results for")) + " ", 1),
          a("span", Oc, b(i.value), 1)
        ]),
        r(e).loadingIndicator === "circular" && r(e).fs.loading ? (f(), K(r(_s), { key: 0 })) : U("", !0)
      ])) : (f(), g("div", Sc, [
        r(e).features.includes(r(ue).NEW_FOLDER) ? (f(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: r(o)("New Folder"),
          onClick: d[0] || (d[0] = (_) => r(e).modal.open(Ro, { items: r(s).getSelected() }))
        }, [
          z(r(Bo))
        ], 8, $c)) : U("", !0),
        r(e).features.includes(r(ue).NEW_FILE) ? (f(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: r(o)("New File"),
          onClick: d[1] || (d[1] = (_) => r(e).modal.open(Ci, { items: r(s).getSelected() }))
        }, [
          z(r(Uo))
        ], 8, Cc)) : U("", !0),
        r(e).features.includes(r(ue).RENAME) ? (f(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: r(o)("Rename"),
          onClick: d[2] || (d[2] = (_) => r(s).getCount() !== 1 || r(e).modal.open(fs, { items: r(s).getSelected() }))
        }, [
          z(r(Ho), {
            class: le(r(s).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ec)) : U("", !0),
        r(e).features.includes(r(ue).DELETE) ? (f(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: r(o)("Delete"),
          onClick: d[3] || (d[3] = (_) => !r(s).getCount() || r(e).modal.open(vs, { items: r(s).getSelected() }))
        }, [
          z(r(Io), {
            class: le(r(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Tc)) : U("", !0),
        r(e).features.includes(r(ue).UPLOAD) ? (f(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: r(o)("Upload"),
          onClick: d[4] || (d[4] = (_) => r(e).modal.open(qi, { items: r(s).getSelected() }))
        }, [
          z(r(No))
        ], 8, Mc)) : U("", !0),
        r(e).features.includes(r(ue).UNARCHIVE) && r(s).getCount() === 1 && r(s).getSelected()[0].mime_type === "application/zip" ? (f(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: r(o)("Unarchive"),
          onClick: d[5] || (d[5] = (_) => !r(s).getCount() || r(e).modal.open(qo, { items: r(s).getSelected() }))
        }, [
          z(r(Po), {
            class: le(r(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ac)) : U("", !0),
        r(e).features.includes(r(ue).ARCHIVE) ? (f(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: r(o)("Archive"),
          onClick: d[6] || (d[6] = (_) => !r(s).getCount() || r(e).modal.open(jo, { items: r(s).getSelected() }))
        }, [
          z(r(zo), {
            class: le(r(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Dc)) : U("", !0)
      ])),
      a("div", Fc, [
        r(e).features.includes(r(ue).FULL_SCREEN) ? (f(), g("div", {
          key: 0,
          onClick: c,
          class: "mx-1.5",
          title: r(o)("Toggle Full Screen")
        }, [
          r(e).fullScreen ? (f(), K(r(pc), { key: 0 })) : (f(), K(r(fc), { key: 1 }))
        ], 8, Ic)) : U("", !0),
        a("div", {
          class: "mx-1.5",
          title: r(o)("Change View"),
          onClick: d[7] || (d[7] = (_) => i.value.length || u())
        }, [
          r(e).view === "grid" ? (f(), K(r(bc), {
            key: 0,
            class: le(["vf-toolbar-icon", i.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : U("", !0),
          r(e).view === "list" ? (f(), K(r(kc), {
            key: 1,
            class: le(["vf-toolbar-icon", i.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : U("", !0)
        ], 8, Hc)
      ])
    ]));
  }
}, Rc = (t, e = 0, n = !1) => {
  let o;
  return (...s) => {
    n && !o && t(...s), clearTimeout(o), o = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Hs = (t, e, n) => {
  const o = A(t);
  return lr((s, i) => ({
    get() {
      return s(), o.value;
    },
    set: Rc(
      (c) => {
        o.value = c, i();
      },
      e,
      n
    )
  }));
}, Uc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Nc(t, e) {
  return f(), g("svg", Uc, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ]));
}
const Pc = { render: Nc }, qc = { class: "vuefinder__move-modal__content" }, zc = { class: "vuefinder__move-modal__description" }, jc = { class: "vuefinder__move-modal__files vf-scrollbar" }, Gc = { class: "vuefinder__move-modal__file" }, Wc = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Kc = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yc = { class: "vuefinder__move-modal__file-name" }, Xc = { class: "vuefinder__move-modal__target-title" }, Zc = { class: "vuefinder__move-modal__target-directory" }, Qc = { class: "vuefinder__move-modal__target-path" }, Jc = { class: "vuefinder__move-modal__selected-items" }, Zn = {
  __name: "ModalMove",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = A(e.modal.data.items.from), s = A(""), i = () => {
      o.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: o.value.map(({ path: c, type: u }) => ({ path: c, type: u })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", {
            label: n("Files moved.", e.modal.data.items.to.name)
          }), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: e.fs.data.dirname
            }
          });
        },
        onError: (c) => {
          s.value = n(c.message), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: e.fs.data.dirname
            }
          });
        }
      });
    };
    return (c, u) => (f(), K(Ye, null, {
      buttons: J(() => [
        a("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, b(r(n)("Yes, Move!")), 1),
        a("button", {
          type: "button",
          onClick: u[1] || (u[1] = (l) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(n)("Cancel")), 1),
        a("div", Jc, b(r(n)("%s item(s) selected.", o.value.length)), 1)
      ]),
      default: J(() => [
        a("div", null, [
          z(nt, {
            icon: r(Pc),
            title: r(n)("Move files")
          }, null, 8, ["icon", "title"]),
          a("div", qc, [
            a("p", zc, b(r(n)("Are you sure you want to move these files?")), 1),
            a("div", jc, [
              (f(!0), g(ye, null, $e(o.value, (l) => (f(), g("div", Gc, [
                a("div", null, [
                  l.type === "dir" ? (f(), g("svg", Wc, u[2] || (u[2] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), g("svg", Kc, u[3] || (u[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                a("div", Yc, b(l.path), 1)
              ]))), 256))
            ]),
            a("h4", Xc, b(r(n)("Target Directory")), 1),
            a("p", Zc, [
              u[4] || (u[4] = a("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "stroke-width": "1"
              }, [
                a("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                })
              ], -1)),
              a("span", Qc, b(r(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (f(), K(Xe, {
              key: 0,
              onHidden: u[0] || (u[0] = (l) => s.value = ""),
              error: ""
            }, {
              default: J(() => [
                Z(b(s.value), 1)
              ]),
              _: 1
            })) : U("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ed = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function td(t, e) {
  return f(), g("svg", ed, e[0] || (e[0] = [
    a("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ]));
}
const nd = { render: td }, sd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function od(t, e) {
  return f(), g("svg", sd, e[0] || (e[0] = [
    a("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const rd = { render: od }, ad = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function ld(t, e) {
  return f(), g("svg", ad, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const id = { render: ld }, cd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function dd(t, e) {
  return f(), g("svg", cd, e[0] || (e[0] = [
    a("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ]));
}
const ud = { render: dd }, vd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function fd(t, e) {
  return f(), g("svg", vd, e[0] || (e[0] = [
    a("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ]));
}
const _d = { render: fd }, md = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function pd(t, e) {
  return f(), g("svg", md, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const hd = { render: pd }, gd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function bd(t, e) {
  return f(), g("svg", gd, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ]));
}
const kn = { render: bd }, wd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
};
function yd(t, e) {
  return f(), g("svg", wd, e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ]));
}
const kd = { render: yd }, xd = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function Sd(t, e) {
  return f(), g("svg", xd, e[0] || (e[0] = [
    a("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ]));
}
const $d = { render: Sd }, Cd = { class: "vuefinder__breadcrumb__container" }, Ed = ["title"], Td = ["title"], Md = ["title"], Ad = ["title"], Dd = { class: "vuefinder__breadcrumb__list" }, Vd = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Ld = { class: "relative" }, Od = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], Fd = { class: "vuefinder__breadcrumb__search-mode" }, Id = ["placeholder"], Hd = { class: "vuefinder__breadcrumb__hidden-dropdown" }, Bd = ["onDrop", "onClick"], Rd = { class: "vuefinder__breadcrumb__hidden-item-content" }, Ud = { class: "vuefinder__breadcrumb__hidden-item-text" }, Nd = {
  __name: "Breadcrumb",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = e.dragSelect, { setStore: s } = e.storage, i = A(null), c = Hs(0, 100);
    Ve(c, (O) => {
      const w = i.value.children;
      let y = 0, L = 0, k = 5, B = 1;
      e.fs.limitBreadcrumbItems(k), vt(() => {
        for (let S = w.length - 1; S >= 0 && !(y + w[S].offsetWidth > c.value - 40); S--)
          y += parseInt(w[S].offsetWidth, 10), L++;
        L < B && (L = B), L > k && (L = k), e.fs.limitBreadcrumbItems(L);
      });
    });
    const u = () => {
      c.value = i.value.offsetWidth;
    };
    let l = A(null);
    Ce(() => {
      l.value = new ResizeObserver(u), l.value.observe(i.value);
    }), Qn(() => {
      l.value.disconnect();
    });
    const d = (O, w = null) => {
      O.preventDefault(), o.isDraggingRef.value = !1, p(O), w ?? (w = e.fs.hiddenBreadcrumbs.length - 1);
      let y = JSON.parse(O.dataTransfer.getData("items"));
      if (y.find((L) => L.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Zn, {
        items: {
          from: y,
          to: e.fs.hiddenBreadcrumbs[w] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, _ = (O, w = null) => {
      O.preventDefault(), o.isDraggingRef.value = !1, p(O), w ?? (w = e.fs.breadcrumbs.length - 2);
      let y = JSON.parse(O.dataTransfer.getData("items"));
      if (y.find((L) => L.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Zn, {
        items: {
          from: y,
          to: e.fs.breadcrumbs[w] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, v = (O) => {
      O.preventDefault(), e.fs.isGoUpAvailable() ? (O.dataTransfer.dropEffect = "copy", O.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (O.dataTransfer.dropEffect = "none", O.dataTransfer.effectAllowed = "none");
    }, p = (O) => {
      O.preventDefault(), O.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && O.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, m = () => {
      F(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, h = () => {
      F(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, x = (O) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: O.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, $ = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, M = {
      mounted(O, w, y, L) {
        O.clickOutsideEvent = function(k) {
          O === k.target || O.contains(k.target) || w.value();
        }, document.body.addEventListener("click", O.clickOutsideEvent);
      },
      beforeUnmount(O, w, y, L) {
        document.body.removeEventListener("click", O.clickOutsideEvent);
      }
    }, I = () => {
      e.showTreeView = !e.showTreeView;
    };
    Ve(() => e.showTreeView, (O, w) => {
      O !== w && s("show-tree-view", O);
    });
    const D = A(null), C = () => {
      e.features.includes(ue.SEARCH) && (e.fs.searchMode = !0, vt(() => D.value.focus()));
    }, V = Hs("", 400);
    Ve(V, (O) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: O });
    }), Ve(() => e.fs.searchMode, (O) => {
      O && vt(() => D.value.focus());
    });
    const F = () => {
      e.fs.searchMode = !1, V.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      F();
    });
    const j = () => {
      V.value === "" && F();
    };
    return (O, w) => (f(), g("div", Cd, [
      a("span", {
        title: r(n)("Toggle Tree View")
      }, [
        z(r(kd), {
          onClick: I,
          class: le(["vuefinder__breadcrumb__toggle-tree", r(e).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Ed),
      a("span", {
        title: r(n)("Go up a directory")
      }, [
        z(r(rd), {
          onDragover: w[0] || (w[0] = (y) => v(y)),
          onDragleave: w[1] || (w[1] = (y) => p(y)),
          onDrop: w[2] || (w[2] = (y) => _(y)),
          onClick: h,
          class: le(r(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, Td),
      r(e).fs.loading ? (f(), g("span", {
        key: 1,
        title: r(n)("Cancel")
      }, [
        z(r(id), {
          onClick: w[3] || (w[3] = (y) => r(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Ad)) : (f(), g("span", {
        key: 0,
        title: r(n)("Refresh")
      }, [
        z(r(nd), { onClick: m })
      ], 8, Md)),
      _e(a("div", {
        onClick: et(C, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        a("div", null, [
          z(r(ud), {
            onDragover: w[4] || (w[4] = (y) => v(y)),
            onDragleave: w[5] || (w[5] = (y) => p(y)),
            onDrop: w[6] || (w[6] = (y) => _(y, -1)),
            onClick: w[7] || (w[7] = (y) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r(e).fs.adapter } }))
          })
        ]),
        a("div", Dd, [
          r(e).fs.hiddenBreadcrumbs.length ? _e((f(), g("div", Vd, [
            w[13] || (w[13] = a("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            a("div", Ld, [
              a("span", {
                onDragenter: w[8] || (w[8] = (y) => r(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: w[9] || (w[9] = (y) => r(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                z(r($d), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [M, $]
          ]) : U("", !0)
        ]),
        a("div", {
          ref_key: "breadcrumbContainer",
          ref: i,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: et(C, ["self"])
        }, [
          (f(!0), g(ye, null, $e(r(e).fs.breadcrumbs, (y, L) => (f(), g("div", { key: L }, [
            w[14] || (w[14] = a("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            a("span", {
              onDragover: (k) => L === r(e).fs.breadcrumbs.length - 1 || v(k),
              onDragleave: (k) => L === r(e).fs.breadcrumbs.length - 1 || p(k),
              onDrop: (k) => L === r(e).fs.breadcrumbs.length - 1 || _(k, L),
              class: "vuefinder__breadcrumb__item",
              title: y.basename,
              onClick: (k) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r(e).fs.adapter, path: y.path } })
            }, b(y.name), 41, Od)
          ]))), 128))
        ], 512),
        r(e).loadingIndicator === "circular" && r(e).fs.loading ? (f(), K(r(_s), { key: 0 })) : U("", !0)
      ], 512), [
        [ze, !r(e).fs.searchMode]
      ]),
      _e(a("div", Fd, [
        a("div", null, [
          z(r(_d))
        ]),
        _e(a("input", {
          ref_key: "searchInput",
          ref: D,
          onKeydown: $t(F, ["esc"]),
          onBlur: j,
          "onUpdate:modelValue": w[10] || (w[10] = (y) => ir(V) ? V.value = y : null),
          placeholder: r(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, Id), [
          [Ct, r(V)]
        ]),
        z(r(hd), { onClick: F })
      ], 512), [
        [ze, r(e).fs.searchMode]
      ]),
      _e(a("div", Hd, [
        (f(!0), g(ye, null, $e(r(e).fs.hiddenBreadcrumbs, (y, L) => (f(), g("div", {
          key: L,
          onDragover: w[11] || (w[11] = (k) => v(k)),
          onDragleave: w[12] || (w[12] = (k) => p(k)),
          onDrop: (k) => d(k, L),
          onClick: (k) => x(y),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          a("div", Rd, [
            a("span", null, [
              z(r(kn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            w[15] || (w[15] = Z()),
            a("span", Ud, b(y.name), 1)
          ])
        ], 40, Bd))), 128))
      ], 512), [
        [ze, r(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Go = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), Pd = ["onClick"], qd = {
  __name: "Toast",
  setup(t) {
    const e = re("ServiceContainer"), { getStore: n } = e.storage, o = A(n("full-screen", !1)), s = A([]), i = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (l) => {
      s.value.splice(l, 1);
    }, u = (l) => {
      let d = s.value.findIndex((_) => _.id === l);
      d !== -1 && c(d);
    };
    return e.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let d = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = d, s.value.push(l), setTimeout(() => {
        u(d);
      }, 5e3);
    }), (l, d) => (f(), g("div", {
      class: le(["vuefinder__toast", o.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      z(cr, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: J(() => [
          (f(!0), g(ye, null, $e(s.value, (_, v) => (f(), g("div", {
            key: v,
            onClick: (p) => c(v),
            class: le(["vuefinder__toast__message", i(_.type)])
          }, b(_.label), 11, Pd))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, zd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function jd(t, e) {
  return f(), g("svg", zd, e[0] || (e[0] = [
    a("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Gd = { render: jd }, Wd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Kd(t, e) {
  return f(), g("svg", Wd, e[0] || (e[0] = [
    a("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Yd = { render: Kd }, Jt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (f(), g("div", null, [
      t.direction === "asc" ? (f(), K(r(Gd), { key: 0 })) : U("", !0),
      t.direction === "desc" ? (f(), K(r(Yd), { key: 1 })) : U("", !0)
    ]));
  }
}, Xd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Zd(t, e) {
  return f(), g("svg", Xd, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const Qd = { render: Zd }, Jd = { class: "vuefinder__item-icon" }, On = {
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
  setup(t) {
    return (e, n) => (f(), g("span", Jd, [
      t.type === "dir" ? (f(), K(r(kn), {
        key: 0,
        class: le(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (f(), K(r(Qd), {
        key: 1,
        class: le(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, eu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function tu(t, e) {
  return f(), g("svg", eu, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const nu = { render: tu }, su = { class: "vuefinder__drag-item__container" }, ou = { class: "vuefinder__drag-item__count" }, ru = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, o) => (f(), g("div", su, [
      z(r(nu)),
      a("div", ou, b(e.count), 1)
    ]));
  }
}, au = { class: "vuefinder__text-preview" }, lu = { class: "vuefinder__text-preview__header" }, iu = ["title"], cu = { class: "vuefinder__text-preview__actions" }, du = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, uu = { key: 1 }, vu = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = A(""), s = A(""), i = A(null), c = A(!1), u = A(""), l = A(!1), d = re("ServiceContainer"), { t: _ } = d.i18n;
    Ce(() => {
      d.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: d.modal.data.adapter, path: d.modal.data.item.path },
        responseType: "text"
      }).then((m) => {
        o.value = m, n("success");
      });
    });
    const v = () => {
      c.value = !c.value, s.value = o.value;
    }, p = () => {
      u.value = "", l.value = !1, d.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: d.modal.data.adapter,
          path: d.modal.data.item.path
        },
        body: {
          content: s.value
        },
        responseType: "text"
      }).then((m) => {
        u.value = _("Updated."), o.value = m, n("success"), c.value = !c.value;
      }).catch((m) => {
        u.value = _(m.message), l.value = !0;
      });
    };
    return (m, h) => (f(), g("div", au, [
      a("div", lu, [
        a("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: r(d).modal.data.item.path
        }, b(r(d).modal.data.item.basename), 9, iu),
        a("div", cu, [
          c.value ? (f(), g("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, b(r(_)("Save")), 1)) : U("", !0),
          r(d).features.includes(r(ue).EDIT) ? (f(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = (x) => v())
          }, b(c.value ? r(_)("Cancel") : r(_)("Edit")), 1)) : U("", !0)
        ])
      ]),
      a("div", null, [
        c.value ? (f(), g("div", uu, [
          _e(a("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": h[1] || (h[1] = (x) => s.value = x),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Ct, s.value]
          ])
        ])) : (f(), g("pre", du, b(o.value), 1)),
        u.value.length ? (f(), K(Xe, {
          key: 2,
          onHidden: h[2] || (h[2] = (x) => u.value = ""),
          error: l.value
        }, {
          default: J(() => [
            Z(b(u.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : U("", !0)
      ])
    ]));
  }
}, fu = { class: "vuefinder__image-preview" }, _u = { class: "vuefinder__image-preview__header" }, mu = ["title"], pu = { class: "vuefinder__image-preview__actions" }, hu = { class: "vuefinder__image-preview__image-container" }, gu = ["src"], bu = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = re("ServiceContainer"), { t: s } = o.i18n, i = A(null), c = A(null), u = A(!1), l = A(""), d = A(!1), _ = () => {
      u.value = !u.value, u.value ? c.value = new br(i.value, {
        crop(p) {
        }
      }) : c.value.destroy();
    }, v = () => {
      c.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (p) => {
          l.value = "", d.value = !1;
          const m = new FormData();
          m.set("file", p), o.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: o.modal.data.adapter,
              path: o.modal.data.item.path
            },
            body: m
          }).then((h) => {
            l.value = s("Updated."), i.value.src = o.requester.getPreviewUrl(o.modal.data.adapter, o.modal.data.item), _(), n("success");
          }).catch((h) => {
            l.value = s(h.message), d.value = !0;
          });
        }
      );
    };
    return Ce(() => {
      n("success");
    }), (p, m) => (f(), g("div", fu, [
      a("div", _u, [
        a("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: r(o).modal.data.item.path
        }, b(r(o).modal.data.item.basename), 9, mu),
        a("div", pu, [
          u.value ? (f(), g("button", {
            key: 0,
            onClick: v,
            class: "vuefinder__image-preview__crop-button"
          }, b(r(s)("Crop")), 1)) : U("", !0),
          r(o).features.includes(r(ue).EDIT) ? (f(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: m[0] || (m[0] = (h) => _())
          }, b(u.value ? r(s)("Cancel") : r(s)("Edit")), 1)) : U("", !0)
        ])
      ]),
      a("div", hu, [
        a("img", {
          ref_key: "image",
          ref: i,
          class: "vuefinder__image-preview__image",
          src: r(o).requester.getPreviewUrl(r(o).modal.data.adapter, r(o).modal.data.item),
          alt: ""
        }, null, 8, gu)
      ]),
      l.value.length ? (f(), K(Xe, {
        key: 0,
        onHidden: m[1] || (m[1] = (h) => l.value = ""),
        error: d.value
      }, {
        default: J(() => [
          Z(b(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : U("", !0)
    ]));
  }
}, wu = { class: "vuefinder__default-preview" }, yu = { class: "vuefinder__default-preview__header" }, ku = ["title"], xu = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), o = e;
    return Ce(() => {
      o("success");
    }), (s, i) => (f(), g("div", wu, [
      a("div", yu, [
        a("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: r(n).modal.data.item.path
        }, b(r(n).modal.data.item.basename), 9, ku)
      ]),
      i[0] || (i[0] = a("div", null, null, -1))
    ]));
  }
}, Su = { class: "vuefinder__video-preview" }, $u = ["title"], Cu = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, Eu = ["src"], Tu = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), o = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ce(() => {
      o("success");
    }), (i, c) => (f(), g("div", Su, [
      a("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: r(n).modal.data.item.path
      }, b(r(n).modal.data.item.basename), 9, $u),
      a("div", null, [
        a("video", Cu, [
          a("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, Eu),
          c[0] || (c[0] = Z(" Your browser does not support the video tag. "))
        ])
      ])
    ]));
  }
}, Mu = { class: "vuefinder__audio-preview" }, Au = ["title"], Du = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Vu = ["src"], Lu = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = re("ServiceContainer"), s = () => o.requester.getPreviewUrl(o.modal.data.adapter, o.modal.data.item);
    return Ce(() => {
      n("success");
    }), (i, c) => (f(), g("div", Mu, [
      a("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: r(o).modal.data.item.path
      }, b(r(o).modal.data.item.basename), 9, Au),
      a("div", null, [
        a("audio", Du, [
          a("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Vu),
          c[0] || (c[0] = Z(" Your browser does not support the audio element. "))
        ])
      ])
    ]));
  }
}, Ou = { class: "vuefinder__pdf-preview" }, Fu = ["title"], Iu = ["data"], Hu = ["src"], Bu = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), o = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ce(() => {
      o("success");
    }), (i, c) => (f(), g("div", Ou, [
      a("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: r(n).modal.data.item.path
      }, b(r(n).modal.data.item.basename), 9, Fu),
      a("div", null, [
        a("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          a("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Hu)
        ], 8, Iu)
      ])
    ]));
  }
}, Ru = { class: "vuefinder__preview-modal__content" }, Uu = { key: 0 }, Nu = { class: "vuefinder__preview-modal__loading" }, Pu = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, qu = { class: "vuefinder__preview-modal__details" }, zu = { class: "font-bold" }, ju = { class: "font-bold pl-2" }, Gu = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Wu = ["download", "href"], Wo = {
  __name: "ModalPreview",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = A(!1), s = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), i = e.features.includes(ue.PREVIEW);
    return i || (o.value = !0), (c, u) => (f(), K(Ye, null, {
      buttons: J(() => [
        a("button", {
          type: "button",
          onClick: u[6] || (u[6] = (l) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(n)("Close")), 1),
        r(e).features.includes(r(ue).DOWNLOAD) ? (f(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item),
          href: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item)
        }, b(r(n)("Download")), 9, Wu)) : U("", !0)
      ]),
      default: J(() => [
        a("div", null, [
          a("div", Ru, [
            r(i) ? (f(), g("div", Uu, [
              s("text") ? (f(), K(vu, {
                key: 0,
                onSuccess: u[0] || (u[0] = (l) => o.value = !0)
              })) : s("image") ? (f(), K(bu, {
                key: 1,
                onSuccess: u[1] || (u[1] = (l) => o.value = !0)
              })) : s("video") ? (f(), K(Tu, {
                key: 2,
                onSuccess: u[2] || (u[2] = (l) => o.value = !0)
              })) : s("audio") ? (f(), K(Lu, {
                key: 3,
                onSuccess: u[3] || (u[3] = (l) => o.value = !0)
              })) : s("application/pdf") ? (f(), K(Bu, {
                key: 4,
                onSuccess: u[4] || (u[4] = (l) => o.value = !0)
              })) : (f(), K(xu, {
                key: 5,
                onSuccess: u[5] || (u[5] = (l) => o.value = !0)
              }))
            ])) : U("", !0),
            a("div", Nu, [
              o.value === !1 ? (f(), g("div", Pu, [
                u[7] || (u[7] = a("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  a("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  a("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                a("span", null, b(r(n)("Loading")), 1)
              ])) : U("", !0)
            ])
          ])
        ]),
        a("div", qu, [
          a("div", null, [
            a("span", zu, b(r(n)("File Size")) + ": ", 1),
            Z(b(r(e).filesize(r(e).modal.data.item.file_size)), 1)
          ]),
          a("div", null, [
            a("span", ju, b(r(n)("Last Modified")) + ": ", 1),
            Z(" " + b(r(Go)(r(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        r(e).features.includes(r(ue).DOWNLOAD) ? (f(), g("div", Gu, [
          a("span", null, b(r(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : U("", !0)
      ]),
      _: 1
    }));
  }
}, Ku = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Yu(t, e) {
  return f(), g("svg", Ku, e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ]));
}
const Ko = { render: Yu }, Xu = ["data-type", "data-item", "data-index"], Fn = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = e.dragSelect, o = t, s = (m) => {
      m.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: m.path } })) : e.modal.open(Wo, { adapter: e.fs.adapter, item: m });
    }, i = {
      mounted(m, h, x, $) {
        x.props.draggable && (m.addEventListener("dragstart", (M) => c(M, h.value)), m.addEventListener("dragover", (M) => l(M, h.value)), m.addEventListener("drop", (M) => u(M, h.value)));
      },
      beforeUnmount(m, h, x, $) {
        x.props.draggable && (m.removeEventListener("dragstart", c), m.removeEventListener("dragover", l), m.removeEventListener("drop", u));
      }
    }, c = (m, h) => {
      if (m.altKey || m.ctrlKey || m.metaKey)
        return m.preventDefault(), !1;
      n.isDraggingRef.value = !0, m.dataTransfer.setDragImage(o.dragImage.$el, 0, 15), m.dataTransfer.effectAllowed = "all", m.dataTransfer.dropEffect = "copy", m.dataTransfer.setData("items", JSON.stringify(n.getSelected()));
    }, u = (m, h) => {
      m.preventDefault(), n.isDraggingRef.value = !1;
      let x = JSON.parse(m.dataTransfer.getData("items"));
      if (x.find(($) => $.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Zn, { items: { from: x, to: h } });
    }, l = (m, h) => {
      m.preventDefault(), !h || h.type !== "dir" || n.getSelection().find((x) => x === m.currentTarget) ? (m.dataTransfer.dropEffect = "none", m.dataTransfer.effectAllowed = "none") : m.dataTransfer.dropEffect = "copy";
    };
    let d = null, _ = !1;
    const v = () => {
      d && clearTimeout(d);
    }, p = (m) => {
      if (!_)
        _ = !0, setTimeout(() => _ = !1, 300);
      else
        return _ = !1, s(o.item), clearTimeout(d), !1;
      d = setTimeout(() => {
        const h = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: m.target.getBoundingClientRect().x,
          clientY: m.target.getBoundingClientRect().y
        });
        m.target.dispatchEvent(h);
      }, 500);
    };
    return (m, h) => _e((f(), g("div", {
      style: vn({ opacity: r(n).isDraggingRef.value && r(n).getSelection().find((x) => m.$el === x) ? "0.5 !important" : "" }),
      class: le(["vuefinder__item", "vf-item-" + r(n).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: h[0] || (h[0] = (x) => s(t.item)),
      onTouchstart: h[1] || (h[1] = (x) => p(x)),
      onTouchend: h[2] || (h[2] = (x) => v()),
      onContextmenu: h[3] || (h[3] = et((x) => r(e).emitter.emit("vf-contextmenu-show", { event: x, items: r(n).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Lt(m.$slots, "default"),
      r(e).pinnedFolders.find((x) => x.path === t.item.path) ? (f(), K(r(Ko), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : U("", !0)
    ], 46, Xu)), [
      [i, t.item]
    ]);
  }
}, Zu = { class: "vuefinder__explorer__container" }, Qu = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Ju = { class: "vuefinder__explorer__drag-item" }, ev = {
  key: 0,
  class: "vuefinder__linear-loader absolute"
}, tv = { class: "vuefinder__explorer__item-list-content" }, nv = { class: "vuefinder__explorer__item-list-name" }, sv = { class: "vuefinder__explorer__item-name" }, ov = { class: "vuefinder__explorer__item-path" }, rv = { class: "vuefinder__explorer__item-list-content" }, av = { class: "vuefinder__explorer__item-list-name" }, lv = { class: "vuefinder__explorer__item-name" }, iv = { class: "vuefinder__explorer__item-size" }, cv = { class: "vuefinder__explorer__item-date" }, dv = { class: "vuefinder__explorer__item-grid-content" }, uv = ["data-src", "alt"], vv = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, fv = { class: "vuefinder__explorer__item-title break-all" }, _v = {
  __name: "Explorer",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = (v) => v == null ? void 0 : v.substring(0, 3), s = A(null), i = A(""), c = e.dragSelect;
    let u;
    e.emitter.on("vf-fullscreen-toggle", () => {
      c.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: v }) => {
      i.value = v, v ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: v
        },
        onSuccess: (p) => {
          p.files.length || e.emitter.emit("vf-toast-push", { label: n("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const l = St({ active: !1, column: "", order: "" }), d = (v = !0) => {
      let p = [...e.fs.data.files], m = l.column, h = l.order === "asc" ? 1 : -1;
      if (!v)
        return p;
      const x = ($, M) => typeof $ == "string" && typeof M == "string" ? $.toLowerCase().localeCompare(M.toLowerCase()) : $ < M ? -1 : $ > M ? 1 : 0;
      return l.active && (p = p.slice().sort(($, M) => x($[m], M[m]) * h)), p;
    }, _ = (v) => {
      l.active && l.column === v ? (l.active = l.order === "asc", l.column = v, l.order = "desc") : (l.active = !0, l.column = v, l.order = "asc");
    };
    return Ce(() => {
      u = new gr(c.area.value);
    }), Rs(() => {
      u.update();
    }), Ns(() => {
      u.destroy();
    }), (v, p) => (f(), g("div", Zu, [
      r(e).view === "list" || i.value.length ? (f(), g("div", Qu, [
        a("div", {
          onClick: p[0] || (p[0] = (m) => _("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          Z(b(r(n)("Name")) + " ", 1),
          _e(z(Jt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "basename"]
          ])
        ]),
        i.value.length ? U("", !0) : (f(), g("div", {
          key: 0,
          onClick: p[1] || (p[1] = (m) => _("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          Z(b(r(n)("Size")) + " ", 1),
          _e(z(Jt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "file_size"]
          ])
        ])),
        i.value.length ? U("", !0) : (f(), g("div", {
          key: 1,
          onClick: p[2] || (p[2] = (m) => _("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          Z(b(r(n)("Date")) + " ", 1),
          _e(z(Jt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "last_modified"]
          ])
        ])),
        i.value.length ? (f(), g("div", {
          key: 2,
          onClick: p[3] || (p[3] = (m) => _("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          Z(b(r(n)("Filepath")) + " ", 1),
          _e(z(Jt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "path"]
          ])
        ])) : U("", !0)
      ])) : U("", !0),
      a("div", Ju, [
        z(ru, {
          ref_key: "dragImage",
          ref: s,
          count: r(c).getCount()
        }, null, 8, ["count"])
      ]),
      a("div", {
        ref: r(c).scrollBarContainer,
        class: le(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": r(e).view === "grid" }, { "search-active": i.value.length }]])
      }, [
        a("div", {
          ref: r(c).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      a("div", {
        ref: r(c).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area min-h-32",
        onContextmenu: p[4] || (p[4] = et((m) => r(e).emitter.emit("vf-contextmenu-show", { event: m, items: r(c).getSelected() }), ["self", "prevent"]))
      }, [
        r(e).loadingIndicator === "linear" && r(e).fs.loading ? (f(), g("div", ev)) : U("", !0),
        i.value.length ? (f(!0), g(ye, { key: 1 }, $e(d(), (m, h) => (f(), K(Fn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: J(() => [
            a("div", tv, [
              a("div", nv, [
                z(On, {
                  type: m.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", sv, b(m.basename), 1)
              ]),
              a("div", ov, b(m.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : U("", !0),
        r(e).view === "list" && !i.value.length ? (f(!0), g(ye, { key: 2 }, $e(d(), (m, h) => (f(), K(Fn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: m.path
        }, {
          default: J(() => [
            a("div", rv, [
              a("div", av, [
                z(On, {
                  type: m.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", lv, b(m.basename), 1)
              ]),
              a("div", iv, b(m.file_size ? r(e).filesize(m.file_size) : ""), 1),
              a("div", cv, b(r(Go)(m.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : U("", !0),
        r(e).view === "grid" && !i.value.length ? (f(!0), g(ye, { key: 3 }, $e(d(!1), (m, h) => (f(), K(Fn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: J(() => [
            a("div", null, [
              a("div", dv, [
                (m.mime_type ?? "").startsWith("image") && r(e).showThumbnails ? (f(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": r(e).requester.getPreviewUrl(r(e).fs.adapter, m),
                  alt: m.basename,
                  key: m.path
                }, null, 8, uv)) : (f(), K(On, {
                  key: 1,
                  type: m.type
                }, null, 8, ["type"])),
                !((m.mime_type ?? "").startsWith("image") && r(e).showThumbnails) && m.type !== "dir" ? (f(), g("div", vv, b(o(m.extension)), 1)) : U("", !0)
              ]),
              a("span", fv, b(r(Xn)(m.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : U("", !0)
      ], 544),
      z(qd)
    ]));
  }
}, mv = ["href", "download"], pv = ["onClick"], hv = {
  __name: "ContextMenu",
  setup(t) {
    const e = re("ServiceContainer"), n = A(null), o = A([]), s = A(""), i = St({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    });
    e.emitter.on("vf-context-selected", (d) => {
      o.value = d;
    });
    const c = (d) => d.link(e, o), u = (d) => {
      e.emitter.emit("vf-contextmenu-hide"), d.action(e, o);
    };
    e.emitter.on("vf-search-query", ({ newQuery: d }) => {
      s.value = d;
    }), e.emitter.on("vf-contextmenu-show", ({ event: d, items: _, target: v = null }) => {
      if (i.items = e.contextMenuItems.filter((p) => p.show(e, {
        searchQuery: s.value,
        items: _,
        target: v
      })), s.value)
        if (v)
          e.emitter.emit("vf-context-selected", [v]);
        else
          return;
      else !v && !s.value ? e.emitter.emit("vf-context-selected", []) : _.length > 1 && _.some((p) => p.path === v.path) ? e.emitter.emit("vf-context-selected", _) : e.emitter.emit("vf-context-selected", [v]);
      l(d);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const l = (d) => {
      const _ = e.dragSelect.area.value, v = e.root.getBoundingClientRect(), p = _.getBoundingClientRect();
      let m = d.clientX - v.left, h = d.clientY - v.top;
      i.active = !0, vt(() => {
        var I;
        const x = (I = n.value) == null ? void 0 : I.getBoundingClientRect();
        let $ = (x == null ? void 0 : x.height) ?? 0, M = (x == null ? void 0 : x.width) ?? 0;
        m = p.right - d.pageX + window.scrollX < M ? m - M : m, h = p.bottom - d.pageY + window.scrollY < $ ? h - $ : h, i.positions = {
          left: m + "px",
          top: h + "px"
        };
      });
    };
    return (d, _) => _e((f(), g("ul", {
      ref_key: "contextmenu",
      ref: n,
      style: vn(i.positions),
      class: "vuefinder__context-menu"
    }, [
      (f(!0), g(ye, null, $e(i.items, (v) => (f(), g("li", {
        class: "vuefinder__context-menu__item",
        key: v.title
      }, [
        v.link ? (f(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: c(v),
          download: c(v),
          onClick: _[0] || (_[0] = (p) => r(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          a("span", null, b(v.title(r(e).i18n)), 1)
        ], 8, mv)) : (f(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (p) => u(v)
        }, [
          a("span", null, b(v.title(r(e).i18n)), 1)
        ], 8, pv))
      ]))), 128))
    ], 4)), [
      [ze, i.active]
    ]);
  }
}, gv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function bv(t, e) {
  return f(), g("svg", gv, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ]));
}
const wv = { render: bv }, yv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function kv(t, e) {
  return f(), g("svg", yv, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ]));
}
const xv = { render: kv }, Sv = { class: "vuefinder__status-bar__wrapper" }, $v = { class: "vuefinder__status-bar__actions" }, Cv = ["disabled"], Ev = ["title"], Tv = {
  __name: "Statusbar",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { setStore: o } = e.storage, s = e.dragSelect, i = A("");
    e.emitter.on("vf-search-query", ({ newQuery: u }) => {
      i.value = u;
    });
    const c = wt(() => {
      const u = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && u;
    });
    return (u, l) => (f(), g("div", Sv, [
      a("div", $v, [
        r(e).selectButton.active ? (f(), g("button", {
          key: 0,
          class: le(["vf-btn py-0 vf-btn-primary", { disabled: !c.value }]),
          disabled: !c.value,
          onClick: l[0] || (l[0] = (d) => r(e).selectButton.click(r(s).getSelected(), d))
        }, b(r(n)("Select")), 11, Cv)) : U("", !0),
        a("span", {
          class: "vuefinder__status-bar__about",
          title: r(n)("About"),
          onClick: l[1] || (l[1] = (d) => r(e).modal.open(Fo))
        }, [
          z(r(xv))
        ], 8, Ev)
      ])
    ]));
  }
}, Mv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function Av(t, e) {
  return f(), g("svg", Mv, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ]));
}
const Yo = { render: Av }, Dv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Vv(t, e) {
  return f(), g("svg", Dv, e[0] || (e[0] = [
    a("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ]));
}
const Lv = { render: Vv }, Ov = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Fv(t, e) {
  return f(), g("svg", Ov, e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ]));
}
const Xo = { render: Fv }, Iv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Hv(t, e) {
  return f(), g("svg", Iv, e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M9 12h6" }, null, -1)
  ]));
}
const Zo = { render: Hv };
function Qo(t, e) {
  const n = t.findIndex((o) => o.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Bv = { class: "vuefinder__folder-loader-indicator" }, Rv = {
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
  setup(t) {
    const e = t, n = re("ServiceContainer"), { t: o } = n.i18n, s = Ps(t, "modelValue"), i = A(!1);
    Ve(
      () => s.value,
      () => {
        var l;
        return ((l = c()) == null ? void 0 : l.folders.length) || u();
      }
    );
    function c() {
      return n.treeViewData.find((l) => l.path === e.path);
    }
    const u = () => {
      i.value = !0, n.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: e.adapter,
          path: e.path
        }
      }).then((l) => {
        Qo(n.treeViewData, { path: e.path, ...l });
      }).catch((l) => {
      }).finally(() => {
        i.value = !1;
      });
    };
    return (l, d) => {
      var _;
      return f(), g("div", Bv, [
        i.value ? (f(), K(r(_s), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (f(), g("div", Rv, [
          s.value && ((_ = c()) != null && _.folders.length) ? (f(), K(r(Zo), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : U("", !0),
          s.value ? U("", !0) : (f(), K(r(Xo), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Uv = { class: "vuefinder__treesubfolderlist__item-content" }, Nv = ["onClick"], Pv = ["title", "onClick"], qv = { class: "vuefinder__treesubfolderlist__item-icon" }, zv = { class: "vuefinder__treesubfolderlist__subfolder" }, jv = {
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
  setup(t) {
    const e = re("ServiceContainer"), n = A([]), o = t, s = A(null);
    Ce(() => {
      o.path === o.adapter + "://" && Ne(s.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const i = wt(() => {
      var c;
      return ((c = e.treeViewData.find((u) => u.path === o.path)) == null ? void 0 : c.folders) || [];
    });
    return (c, u) => {
      const l = ur("TreeSubfolderList", !0);
      return f(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (f(!0), g(ye, null, $e(i.value, (d, _) => (f(), g("li", {
          key: d.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          a("div", Uv, [
            a("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (v) => n.value[d.path] = !n.value[d.path]
            }, [
              z(Jo, {
                adapter: t.adapter,
                path: d.path,
                modelValue: n.value[d.path],
                "onUpdate:modelValue": (v) => n.value[d.path] = v
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Nv),
            a("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: d.path,
              onClick: (v) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o.adapter, path: d.path } })
            }, [
              a("div", qv, [
                r(e).fs.path === d.path ? (f(), K(r(Yo), { key: 0 })) : (f(), K(r(kn), { key: 1 }))
              ]),
              a("div", {
                class: le(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": r(e).fs.path === d.path
                }])
              }, b(d.basename), 3)
            ], 8, Pv)
          ]),
          a("div", zv, [
            _e(z(l, {
              adapter: o.adapter,
              path: d.path
            }, null, 8, ["adapter", "path"]), [
              [ze, n.value[d.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, Gv = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, o = A(!1);
    function s(i) {
      i === e.fs.adapter ? o.value = !o.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: i } }), n("adapter", i));
    }
    return (i, c) => (f(), g(ye, null, [
      a("div", {
        onClick: c[2] || (c[2] = (u) => s(t.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        a("div", {
          class: le(["vuefinder__treestorageitem__info", t.storage === r(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          a("div", {
            class: le(["vuefinder__treestorageitem__icon", t.storage === r(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            z(r(wv))
          ], 2),
          a("div", null, b(t.storage), 1)
        ], 2),
        a("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: c[1] || (c[1] = et((u) => o.value = !o.value, ["stop"]))
        }, [
          z(Jo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: o.value,
            "onUpdate:modelValue": c[0] || (c[0] = (u) => o.value = u)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      _e(z(jv, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [ze, o.value]
      ])
    ], 64));
  }
}, Wv = { class: "vuefinder__folder-indicator" }, Kv = { class: "vuefinder__folder-indicator--icon" }, Yv = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Ps(t, "modelValue");
    return (n, o) => (f(), g("div", Wv, [
      a("div", Kv, [
        e.value ? (f(), K(r(Zo), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : U("", !0),
        e.value ? U("", !0) : (f(), K(r(Xo), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, Xv = { class: "vuefinder__treeview__header" }, Zv = { class: "vuefinder__treeview__pinned-label" }, Qv = { class: "vuefinder__treeview__pin-text text-nowrap" }, Jv = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, ef = { class: "vuefinder__treeview__pinned-item" }, tf = ["onClick"], nf = ["title"], sf = ["onClick"], of = { key: 0 }, rf = { class: "vuefinder__treeview__no-pinned" }, af = { class: "vuefinder__treeview__storage" }, lf = {
  __name: "TreeView",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { getStore: o, setStore: s } = e.storage, i = A(190), c = A(o("pinned-folders-opened", !0));
    Ve(c, (_) => s("pinned-folders-opened", _));
    const u = (_) => {
      e.pinnedFolders = e.pinnedFolders.filter((v) => v.path !== _.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, l = (_) => {
      const v = _.clientX, p = _.target.parentElement, m = p.getBoundingClientRect().width;
      p.classList.remove("transition-[width]"), p.classList.add("transition-none");
      const h = ($) => {
        i.value = m + $.clientX - v, i.value < 50 && (i.value = 0, e.showTreeView = !1), i.value > 50 && (e.showTreeView = !0);
      }, x = () => {
        const $ = p.getBoundingClientRect();
        i.value = $.width, p.classList.add("transition-[width]"), p.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", x);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", x);
    }, d = A(null);
    return Ce(() => {
      Ne(d.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Ve(e.fs.data, (_, v) => {
      const p = _.files.filter((m) => m.type === "dir");
      Qo(e.treeViewData, { path: e.fs.path, folders: p.map((m) => ({
        adapter: m.storage,
        path: m.path,
        basename: m.basename
      })) });
    }), (_, v) => (f(), g(ye, null, [
      a("div", {
        onClick: v[0] || (v[0] = (p) => r(e).showTreeView = !r(e).showTreeView),
        class: le(["vuefinder__treeview__overlay", r(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      a("div", {
        style: vn(r(e).showTreeView ? "min-width:100px;max-width:75%; width: " + i.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        a("div", {
          ref_key: "treeViewScrollElement",
          ref: d,
          class: "vuefinder__treeview__scroll"
        }, [
          a("div", Xv, [
            a("div", {
              onClick: v[2] || (v[2] = (p) => c.value = !c.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              a("div", Zv, [
                z(r(Ko), { class: "vuefinder__treeview__pin-icon" }),
                a("div", Qv, b(r(n)("Pinned Folders")), 1)
              ]),
              z(Yv, {
                modelValue: c.value,
                "onUpdate:modelValue": v[1] || (v[1] = (p) => c.value = p)
              }, null, 8, ["modelValue"])
            ]),
            c.value ? (f(), g("ul", Jv, [
              (f(!0), g(ye, null, $e(r(e).pinnedFolders, (p) => (f(), g("li", ef, [
                a("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (m) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: p.storage, path: p.path } })
                }, [
                  r(e).fs.path !== p.path ? (f(), K(r(kn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : U("", !0),
                  r(e).fs.path === p.path ? (f(), K(r(Yo), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : U("", !0),
                  a("div", {
                    title: p.path,
                    class: le(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": r(e).fs.path === p.path
                    }])
                  }, b(p.basename), 11, nf)
                ], 8, tf),
                a("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (m) => u(p)
                }, [
                  z(r(Lv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, sf)
              ]))), 256)),
              r(e).pinnedFolders.length ? U("", !0) : (f(), g("li", of, [
                a("div", rf, b(r(n)("No folders pinned")), 1)
              ]))
            ])) : U("", !0)
          ]),
          (f(!0), g(ye, null, $e(r(e).fs.data.storages, (p) => (f(), g("div", af, [
            z(Gv, { storage: p }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        a("div", {
          onMousedown: l,
          class: le([(r(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
};
class cf {
  /**
   * 
   * @param {Item['title']} title 
   * @param {Item['action']} action 
   * @param {Item['link']} link
   * @param {Partial<SimpleItemOptions>} options 
   */
  constructor(e, n, o, s) {
    this.title = e, this.action = n, this.link = o, this.options = Object.assign(
      {
        needsSearchQuery: !1,
        target: "one"
      },
      s
    );
  }
  /**
   * @type {Item['show']}
   */
  show(e, n) {
    var s, i;
    const o = (c) => c.items.length > 1 && c.items.some((u) => {
      var l;
      return u.path === ((l = c.target) == null ? void 0 : l.path);
    }) ? "many" : c.target ? "one" : null;
    return !(this.options.needsSearchQuery !== !!n.searchQuery || this.options.target !== void 0 && this.options.target !== o(n) || this.options.targetType !== void 0 && this.options.targetType !== ((s = n.target) == null ? void 0 : s.type) || this.options.mimeType !== void 0 && this.options.mimeType !== ((i = n.target) == null ? void 0 : i.mime_type) || this.options.feature !== void 0 && !e.features.includes(this.options.feature) || this.options.show !== void 0 && !this.options.show(e, n));
  }
}
function Re(t, e) {
  return t.map((n) => new cf(n.title, n.action, n.link, {
    ...e,
    feature: n.key
  }));
}
const Te = {
  newfolder: {
    key: ue.NEW_FOLDER,
    title: ({ t }) => t("New Folder"),
    action: (t) => t.modal.open(Ro)
  },
  selectAll: {
    title: ({ t }) => t("Select All"),
    action: (t) => t.dragSelect.selectAll()
  },
  pinFolder: {
    title: ({ t }) => t("Pin Folder"),
    action: (t, e) => {
      t.pinnedFolders = t.pinnedFolders.concat(e.value), t.storage.setStore("pinned-folders", t.pinnedFolders);
    }
  },
  unpinFolder: {
    title: ({ t }) => t("Unpin Folder"),
    action: (t, e) => {
      t.pinnedFolders = t.pinnedFolders.filter((n) => !e.value.find((o) => o.path === n.path)), t.storage.setStore("pinned-folders", t.pinnedFolders);
    }
  },
  delete: {
    key: ue.DELETE,
    title: ({ t }) => t("Delete"),
    action: (t, e) => {
      t.modal.open(vs, { items: e });
    }
  },
  refresh: {
    title: ({ t }) => t("Refresh"),
    action: (t) => {
      t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } });
    }
  },
  preview: {
    key: ue.PREVIEW,
    title: ({ t }) => t("Preview"),
    action: (t, e) => t.modal.open(Wo, { adapter: t.fs.adapter, item: e.value[0] })
  },
  open: {
    title: ({ t }) => t("Open"),
    action: (t, e) => {
      t.emitter.emit("vf-search-exit"), t.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: t.fs.adapter,
          path: e.value[0].path
        }
      });
    }
  },
  openDir: {
    title: ({ t }) => t("Open containing folder"),
    action: (t, e) => {
      t.emitter.emit("vf-search-exit"), t.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: t.fs.adapter,
          path: e.value[0].dir
        }
      });
    }
  },
  download: {
    key: ue.DOWNLOAD,
    link: (t, e) => t.requester.getDownloadUrl(t.fs.adapter, e.value[0]),
    title: ({ t }) => t("Download"),
    action: () => {
    }
  },
  archive: {
    key: ue.ARCHIVE,
    title: ({ t }) => t("Archive"),
    action: (t, e) => t.modal.open(jo, { items: e })
  },
  unarchive: {
    key: ue.UNARCHIVE,
    title: ({ t }) => t("Unarchive"),
    action: (t, e) => t.modal.open(qo, { items: e })
  },
  rename: {
    key: ue.RENAME,
    title: ({ t }) => t("Rename"),
    action: (t, e) => t.modal.open(fs, { items: e })
  }
}, df = [
  ...Re([Te.openDir], {
    needsSearchQuery: !0
  }),
  ...Re([Te.refresh, Te.selectAll, Te.newfolder], {
    target: null
  }),
  ...Re([Te.refresh, Te.archive, Te.delete], {
    target: "many"
  }),
  ...Re([Te.open], {
    targetType: "dir"
  }),
  ...Re([Te.unpinFolder], {
    targetType: "dir",
    show: (t, e) => t.pinnedFolders.findIndex((n) => {
      var o;
      return n.path === ((o = e.target) == null ? void 0 : o.path);
    }) !== -1
  }),
  ...Re([Te.pinFolder], {
    targetType: "dir",
    show: (t, e) => t.pinnedFolders.findIndex((n) => {
      var o;
      return n.path === ((o = e.target) == null ? void 0 : o.path);
    }) === -1
  }),
  ...Re([Te.preview, Te.download], {
    show: (t, e) => {
      var n;
      return ((n = e.target) == null ? void 0 : n.type) !== "dir";
    }
  }),
  ...Re([Te.rename], { numItems: "one" }),
  ...Re([Te.unarchive], {
    mimeType: "application/zip"
  }),
  ...Re([Te.archive], {
    show: (t, e) => {
      var n;
      return ((n = e.target) == null ? void 0 : n.mime_type) !== "application/zip";
    }
  }),
  ...Re([Te.delete], {})
], uf = { class: "vuefinder__main__content" }, vf = {
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
      default(t) {
        return {
          active: !1,
          multiple: !1,
          click: (e) => {
          },
          ...t
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
      default: () => df
    }
  },
  emits: ["select", "update:path"],
  setup(t, { emit: e }) {
    const n = e, o = t, s = Fa(o, re("VueFinderOptions"));
    vr("ServiceContainer", s);
    const { setStore: i } = s.storage, c = A(null);
    s.root = c;
    const u = s.dragSelect;
    fi(s);
    const l = (v) => {
      Object.assign(s.fs.data, v), u.clearSelection(), u.refreshSelection();
    };
    let d;
    s.emitter.on("vf-fetch-abort", () => {
      d.abort(), s.fs.loading = !1;
    }), s.emitter.on("vf-fetch", ({ params: v, body: p = null, onSuccess: m = null, onError: h = null, noCloseModal: x = !1 }) => {
      ["index", "search"].includes(v.q) && (d && d.abort(), s.fs.loading = !0), d = new AbortController();
      const $ = d.signal;
      s.requester.send({
        url: "",
        method: v.m || "get",
        params: v,
        body: p,
        abortSignal: $
      }).then((M) => {
        s.fs.adapter = M.adapter, s.persist && (s.fs.path = M.dirname, i("path", s.fs.path)), x || s.modal.close(), l(M), m && m(M);
      }).catch((M) => {
        console.error(M), h && h(M);
      }).finally(() => {
        ["index", "search"].includes(v.q) && (s.fs.loading = !1);
      });
    });
    function _(v) {
      let p = {};
      v && v.includes("://") && (p = {
        adapter: v.split("://")[0],
        path: v
      }), s.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: s.fs.adapter, ...p },
        onError: o.onError ?? ((m) => {
          m.message && s.emitter.emit("vf-toast-push", { label: m.message, type: "error" });
        })
      });
    }
    return Ce(() => {
      _(s.fs.path), Ve(() => o.path, (v) => {
        _(v);
      }), u.onSelect((v) => {
        n("select", v);
      }), Ve(() => s.fs.data.dirname, (v) => {
        n("update:path", v);
      });
    }), (v, p) => (f(), g("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: c,
      tabindex: "0"
    }, [
      a("div", {
        class: le(r(s).theme.actualValue)
      }, [
        a("div", {
          class: le([r(s).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: vn(r(s).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: p[0] || (p[0] = (m) => r(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (m) => r(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          z(Bc),
          z(Nd),
          a("div", uf, [
            z(lf),
            z(_v)
          ]),
          z(Tv)
        ], 38),
        z(fr, { name: "fade" }, {
          default: J(() => [
            r(s).modal.visible ? (f(), K(Us(r(s).modal.type), { key: 0 })) : U("", !0)
          ]),
          _: 1
        }),
        z(hv)
      ], 2)
    ], 512));
  }
}, kf = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", vf);
  }
};
export {
  cf as SimpleContextMenuItem,
  df as contextMenuItems,
  kf as default
};
