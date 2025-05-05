var or = Object.defineProperty;
var rr = (t, e, n) => e in t ? or(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var En = (t, e, n) => rr(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as St, watch as Oe, ref as O, shallowRef as ar, onMounted as Ce, onUnmounted as Qn, onUpdated as Bs, nextTick as ft, computed as wt, inject as re, createElementBlock as g, openBlock as v, withKeys as $t, unref as r, createElementVNode as a, withModifiers as et, renderSlot as Lt, normalizeClass as le, toDisplayString as b, createBlock as K, resolveDynamicComponent as Us, withCtx as J, createVNode as j, createCommentVNode as N, Fragment as ye, renderList as $e, withDirectives as _e, vModelCheckbox as Xt, createTextVNode as Z, vModelSelect as gs, vModelText as Ct, onBeforeUnmount as Ns, customRef as lr, vShow as ze, isRef as ir, TransitionGroup as cr, normalizeStyle as fn, mergeModels as dr, useModel as Ps, resolveComponent as ur, provide as fr, Transition as vr } from "vue";
import _r from "mitt";
import mr from "dragselect";
import pr from "@uppy/core";
import hr from "@uppy/xhr-upload";
import gr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import br from "cropperjs";
var Rs;
const Tn = (Rs = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Rs.getAttribute("content");
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
    l !== "get" && (c instanceof FormData ? (d = c, n.body != null && Object.entries(this.config.body).forEach(([f, p]) => {
      d.append(f, p);
    })) : (d = { ...c }, n.body != null && Object.assign(d, this.config.body)));
    const _ = {
      url: u,
      method: l,
      headers: s,
      params: i,
      body: d
    };
    if (n.transformRequest != null) {
      const f = n.transformRequest({
        url: u,
        method: l,
        headers: s,
        params: i,
        body: d
      });
      f.url != null && (_.url = f.url), f.method != null && (_.method = f.method), f.params != null && (_.params = f.params ?? {}), f.headers != null && (_.headers = f.headers ?? {}), f.body != null && (_.body = f.body);
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
  Oe(n, o);
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
  const { getStore: s, setStore: i } = t, c = O({}), u = O(s("locale", e)), l = (f, p = e) => {
    xr(f, o).then((m) => {
      c.value = m, i("locale", f), u.value = f, i("translations", m), Object.values(o).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + f }), n.emit("vf-language-saved"));
    }).catch((m) => {
      p ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(p, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Oe(u, (f) => {
    l(f);
  }), !s("locale") && !o.length ? l(e) : c.value = s("translations");
  const d = (f, ...p) => p.length ? d(f = f.replace("%s", p.shift()), ...p) : f;
  function _(f, ...p) {
    return c.value && c.value.hasOwnProperty(f) ? d(c.value[f], ...p) : d(f, ...p);
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
  const n = O(ot.SYSTEM), o = O(ot.LIGHT);
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
function Ar() {
  const t = ar(null), e = O(!1), n = O();
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
const Ve = (t, e) => {
  const { o: n, i: o, u: s } = t;
  let i = n, c;
  const u = (_, f) => {
    const p = i, m = _, h = f || (o ? !o(p, m) : p !== m);
    return (h || s) && (i = m, c = p), [i, h, c];
  };
  return [e ? (_) => u(e(i, c), _) : u, (_) => [i, !!_, c]];
}, Mr = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, Le = Mr ? window : {}, js = Math.max, Dr = Math.min, In = Math.round, sn = Math.abs, bs = Math.sign, Gs = Le.cancelAnimationFrame, Jn = Le.requestAnimationFrame, on = Le.setTimeout, Hn = Le.clearTimeout, vn = (t) => typeof Le[t] < "u" ? Le[t] : void 0, Or = vn("MutationObserver"), ws = vn("IntersectionObserver"), mt = vn("ResizeObserver"), Ot = vn("ScrollTimeline"), es = (t) => t === void 0, _n = (t) => t === null, Ge = (t) => typeof t == "number", Ht = (t) => typeof t == "string", mn = (t) => typeof t == "boolean", Re = (t) => typeof t == "function", We = (t) => Array.isArray(t), rn = (t) => typeof t == "object" && !We(t) && !_n(t), ts = (t) => {
  const e = !!t && t.length, n = Ge(e) && e > -1 && e % 1 == 0;
  return We(t) || !Re(t) && n ? e > 0 && rn(t) ? e - 1 in t : !0 : !1;
}, an = (t) => !!t && t.constructor === Object, ln = (t) => t instanceof HTMLElement, pn = (t) => t instanceof Element;
function ie(t, e) {
  if (ts(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && ie(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const Ws = (t, e) => t.indexOf(e) >= 0, Vt = (t, e) => t.concat(e), he = (t, e, n) => (!Ht(e) && ts(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), it = (t) => Array.from(t || []), ns = (t) => We(t) ? t : !Ht(t) && ts(t) ? it(t) : [t], Rn = (t) => !!t && !t.length, Bn = (t) => it(new Set(t)), Ie = (t, e, n) => {
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
}, so = (t, e) => bn(t, e, ["w", "h"]), en = (t, e) => bn(t, e, ["x", "y"]), Vr = (t, e) => bn(t, e, ["t", "r", "b", "l"]), at = () => {
}, X = (t, ...e) => t.bind(0, ...e), pt = (t) => {
  let e;
  const n = t ? on : Jn, o = t ? Hn : Gs;
  return [(s) => {
    o(e), e = n(() => s(), Re(t) ? t() : t);
  }, () => o(e)];
}, cn = (t, e) => {
  const { _: n, p: o, v: s, S: i } = e || {};
  let c, u, l, d, _ = at;
  const f = function(x) {
    _(), Hn(c), d = c = u = void 0, _ = at, t.apply(this, x);
  }, p = (w) => i && u ? i(u, w) : w, m = () => {
    _ !== at && f(p(l) || l);
  }, h = function() {
    const x = it(arguments), M = Re(n) ? n() : n;
    if (Ge(M) && M >= 0) {
      const L = Re(o) ? o() : o, y = Ge(L) && L >= 0, V = M > 0 ? on : Jn, H = M > 0 ? Hn : Gs, T = p(x) || x, $ = f.bind(0, T);
      let C;
      _(), s && !d ? ($(), d = !0, C = V(() => d = void 0, M)) : (C = V($, M), y && !c && (c = on(m, L))), _ = () => H(C), u = l = T;
    } else
      f(x);
  };
  return h.m = m, h;
}, oo = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Ue = (t) => t ? Object.keys(t) : [], oe = (t, e, n, o, s, i, c) => {
  const u = [e, n, o, s, i, c];
  return (typeof t != "object" || _n(t)) && !Re(t) && (t = {}), ie(u, (l) => {
    ie(l, (d, _) => {
      const f = l[_];
      if (t === f)
        return !0;
      const p = We(f);
      if (f && an(f)) {
        const m = t[_];
        let h = m;
        p && !We(m) ? h = [] : !p && !an(m) && (h = {}), t[_] = oe(h, f);
      } else
        t[_] = p ? f.slice() : f;
    });
  }), t;
}, ro = (t, e) => ie(oe({}, t), (n, o, s) => {
  n === void 0 ? delete s[o] : n && an(n) && (s[o] = ro(n));
}), ss = (t) => !Ue(t).length, ao = (t, e, n) => js(t, Dr(e, n)), vt = (t) => Bn((We(t) ? t : (t || "").split(" ")).filter((e) => e)), os = (t, e) => t && t.getAttribute(e), ys = (t, e) => t && t.hasAttribute(e), Qe = (t, e, n) => {
  ie(vt(e), (o) => {
    t && t.setAttribute(o, String(n || ""));
  });
}, qe = (t, e) => {
  ie(vt(e), (n) => t && t.removeAttribute(n));
}, wn = (t, e) => {
  const n = vt(os(t, e)), o = X(Qe, t, e), s = (i, c) => {
    const u = new Set(n);
    return ie(vt(i), (l) => {
      u[c](l);
    }), it(u).join(" ");
  };
  return {
    O: (i) => o(s(i, "delete")),
    $: (i) => o(s(i, "add")),
    C: (i) => {
      const c = vt(i);
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
}, Un = (t, e) => pn(t) && t.matches(e), fo = (t) => Un(t, "body"), Nn = (t) => t ? it(t.childNodes) : [], Ft = (t) => t && t.parentElement, ht = (t, e) => pn(t) && t.closest(e), Pn = (t) => document.activeElement, Ir = (t, e, n) => {
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
let vo;
const Hr = () => vo, Rr = (t) => {
  vo = t;
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
}, An = (t, e) => `translate${rn(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, Br = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), Ur = {
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
}, Mn = (t) => t.getBoundingClientRect(), Pr = (t) => !!t && Br(t), zn = (t) => !!(t && (t[gn] || t[hn])), go = (t, e) => {
  const n = zn(t);
  return !zn(e) && n;
}, Ss = (t, e, n, o) => {
  ie(vt(e), (s) => {
    t && t.removeEventListener(s, n, o);
  });
}, ve = (t, e, n, o) => {
  var s;
  const i = (s = o && o.H) != null ? s : !0, c = o && o.I || !1, u = o && o.A || !1, l = {
    passive: i,
    capture: c
  };
  return X(Ie, vt(e).map((d) => {
    const _ = u ? (f) => {
      Ss(t, d, _, c), n && n(f);
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
  const { D: n, M: o } = t, { w: s, h: i } = e, c = (f, p, m) => {
    let h = bs(f) * m, w = bs(p) * m;
    if (h === w) {
      const x = sn(f), M = sn(p);
      w = x > M ? 0 : w, h = x < M ? 0 : h;
    }
    return h = h === w ? 0 : h, [h + 0, w + 0];
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
        Re(_) && d.add(_);
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
      c && !Rn(c) ? u.apply(0, c) : u();
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
}), Rt = (t) => xo[t], jr = "__osOptionsValidationPlugin", Et = "data-overlayscrollbars", tn = "os-environment", Qt = `${tn}-scrollbar-hidden`, On = `${Et}-initialize`, nn = "noClipping", Es = `${Et}-body`, lt = Et, Gr = "host", Je = `${Et}-viewport`, Wr = to, Kr = no, Yr = "arrange", $o = "measuring", Xr = "scrolling", Co = "scrollbarHidden", Zr = "noContent", Kn = `${Et}-padding`, Ts = `${Et}-content`, cs = "os-size-observer", Qr = `${cs}-appear`, Jr = `${cs}-listener`, ea = "os-trinsic-observer", ta = "os-theme-none", He = "os-scrollbar", na = `${He}-rtl`, sa = `${He}-horizontal`, oa = `${He}-vertical`, Eo = `${He}-track`, ds = `${He}-handle`, ra = `${He}-visible`, aa = `${He}-cornerless`, As = `${He}-interaction`, Ms = `${He}-unusable`, Yn = `${He}-auto-hide`, Ds = `${Yn}-hidden`, Os = `${He}-wheel`, la = `${Eo}-interactive`, ia = `${ds}-interactive`, ca = "__osSizeObserverPlugin", da = (t, e) => {
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
}, To = "__osScrollbarsHidingPlugin", fa = "__osClickScrollPlugin", Ls = (t) => JSON.stringify(t, (e, n) => {
  if (Re(n))
    throw 0;
  return n;
}), Vs = (t, e) => t ? `${e}`.split(".").reduce((n, o) => n && oo(n, o) ? n[o] : void 0, t) : void 0, va = {
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
}, Ao = (t, e) => {
  const n = {}, o = Vt(Ue(e), Ue(t));
  return ie(o, (s) => {
    const i = t[s], c = e[s];
    if (rn(i) && rn(c))
      oe(n[s] = {}, Ao(i, c)), ss(n[s]) && delete n[s];
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
}, Fs = (t, e, n) => (o) => [Vs(t, o), n || Vs(e, o) !== void 0];
let Mo;
const _a = () => Mo, ma = (t) => {
  Mo = t;
};
let Ln;
const pa = () => {
  const t = (y, V, H) => {
    De(document.body, y), De(document.body, y);
    const E = ho(y), T = bt(y), $ = is(V);
    return H && kt(y), {
      x: T.h - E.h + $.h,
      y: T.w - E.w + $.w
    };
  }, e = (y) => {
    let V = !1;
    const H = ls(y, Qt);
    try {
      V = tt(y, "scrollbar-width") === "none" || tt(y, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return H(), V;
  }, n = `.${tn}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${tn} div{width:200%;height:200%;margin:10px 0}.${Qt}{scrollbar-width:none!important}.${Qt}::-webkit-scrollbar,.${Qt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, s = _o(`<div class="${tn}"><div></div><style>${n}</style></div>`)[0], i = s.firstChild, c = s.lastChild, u = _a();
  u && (c.nonce = u);
  const [l, , d] = Wn(), [_, f] = Ve({
    o: t(s, i),
    i: en
  }, X(t, s, i, !0)), [p] = f(), m = e(s), h = {
    x: p.x === 0,
    y: p.y === 0
  }, w = {
    elements: {
      host: null,
      padding: !m,
      viewport: (y) => m && fo(y) && y,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, x = oe({}, va), M = X(oe, {}, x), I = X(oe, {}, w), L = {
    N: p,
    T: h,
    P: m,
    G: !!Ot,
    K: X(l, "r"),
    Z: I,
    tt: (y) => oe(w, y) && I(),
    nt: M,
    ot: (y) => oe(x, y) && M(),
    st: oe({}, w),
    et: oe({}, x)
  };
  if (qe(s, "style"), kt(s), ve(Le, "resize", () => {
    d("r", []);
  }), Re(Le.matchMedia) && !m && (!h.x || !h.y)) {
    const y = (V) => {
      const H = Le.matchMedia(`(resolution: ${Le.devicePixelRatio}dppx)`);
      ve(H, "change", () => {
        V(), y(V);
      }, {
        A: !0
      });
    };
    y(() => {
      const [V, H] = _();
      oe(L.N, V), d("r", [H]);
    });
  }
  return L;
}, Ke = () => (Ln || (Ln = pa()), Ln), ha = (t, e, n) => {
  let o = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, i = () => {
    o = !0;
  }, c = (u) => {
    if (s && n) {
      const l = n.map((d) => {
        const [_, f] = d || [];
        return [f && _ ? (u || uo)(_, t) : [], f];
      });
      ie(l, (d) => ie(d[0], (_) => {
        const f = d[1], p = s.get(_) || [];
        if (t.contains(_) && f) {
          const h = ve(_, f, (w) => {
            o ? (h(), s.delete(_)) : e(w);
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
  const { ct: i, rt: c, lt: u, it: l, ut: d, ft: _ } = o || {}, f = cn(() => s && n(!0), {
    _: 33,
    p: 99
  }), [p, m] = ha(t, f, u), h = i || [], w = c || [], x = Vt(h, w), M = (L, y) => {
    if (!Rn(y)) {
      const V = d || at, H = _ || at, E = [], T = [];
      let $ = !1, C = !1;
      if (ie(y, (F) => {
        const { attributeName: D, target: R, type: k, oldValue: U, addedNodes: P, removedNodes: ee } = F, se = k === "attributes", ne = k === "childList", me = t === R, Y = se && D, S = Y && os(R, D || ""), B = Ht(S) ? S : null, q = Y && U !== B, A = Ws(w, D) && q;
        if (e && (ne || !me)) {
          const G = se && q, z = G && l && Un(R, l), Q = (z ? !V(R, D, U, B) : !se || G) && !H(F, !!z, t, o);
          ie(P, (ae) => he(E, ae)), ie(ee, (ae) => he(E, ae)), C = C || Q;
        }
        !e && me && q && !V(R, D, U, B) && (he(T, D), $ = $ || A);
      }), m((F) => Bn(E).reduce((D, R) => (he(D, uo(F, R)), Un(R, F) ? he(D, R) : D), [])), e)
        return !L && C && n(!1), [!1];
      if (!Rn(T) || $) {
        const F = [Bn(T), $];
        return L || n.apply(0, F), F;
      }
    }
  }, I = new Or(X(M, !1));
  return [() => (I.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: x,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (p(), I.disconnect(), s = !1);
  }), () => {
    if (s)
      return f.m(), M(!0, I.takeRecords());
  }];
};
let dt = null;
const Do = (t, e, n) => {
  const { _t: o } = n || {}, s = Rt(ca), [i] = Ve({
    o: !1,
    u: !0
  });
  return () => {
    const c = [], l = _o(`<div class="${cs}"><div class="${Jr}"></div></div>`)[0], d = l.firstChild, _ = (f) => {
      const p = f instanceof ResizeObserverEntry;
      let m = !1, h = !1;
      if (p) {
        const [w, , x] = i(f.contentRect), M = zn(w);
        h = go(w, x), m = !h && !M;
      } else
        h = f === !0;
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
      const f = cn(_, {
        _: 0,
        p: 0
      }), p = (h) => f(h.pop()), m = new mt(p);
      if (m.observe(dt ? t : d), he(c, [() => m.disconnect(), !dt && De(t, l)]), dt) {
        const h = new mt(p);
        h.observe(t, {
          box: "border-box"
        }), he(c, () => h.disconnect());
      }
    } else if (s) {
      const [f, p] = s(d, _, o);
      he(c, Vt([ls(l, Qr), ve(l, "animationstart", f), De(t, l)], p));
    } else
      return at;
    return X(Ie, c);
  };
}, ga = (t, e) => {
  let n;
  const o = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, s = gt(ea), [i] = Ve({
    o: !1
  }), c = (l, d) => {
    if (l) {
      const _ = i(o(l)), [, f] = _;
      return f && !d && e(_) && [_];
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
  const _ = `[${lt}]`, f = `[${Je}]`, p = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: m, ht: h, U: w, gt: x, bt: M, L: I, wt: L, yt: y, St: V, Ot: H } = t, E = (A) => tt(A, "direction") === "rtl", T = {
    $t: !1,
    F: E(m)
  }, $ = Ke(), C = Rt(To), [F] = Ve({
    i: so,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const A = C && C.V(t, e, T, $, n).W, z = !(L && I) && as(h, lt, nn), W = !I && y(Yr), Q = W && Fe(x), ae = Q && H(), fe = V($o, z), ce = W && A && A()[0], Ee = un(w), te = is(w);
    return ce && ce(), je(x, Q), ae && ae(), z && fe(), {
      w: Ee.w + te.w,
      h: Ee.h + te.h
    };
  }), D = cn(o, {
    _: () => s,
    p: () => i,
    S(A, G) {
      const [z] = A, [W] = G;
      return [Vt(Ue(z), Ue(W)).reduce((Q, ae) => (Q[ae] = z[ae] || W[ae], Q), {})];
    }
  }), R = (A) => {
    const G = E(m);
    oe(A, {
      Ct: d !== G
    }), oe(T, {
      F: G
    }), d = G;
  }, k = (A, G) => {
    const [z, W] = A, Q = {
      xt: W
    };
    return oe(T, {
      $t: z
    }), G || o(Q), Q;
  }, U = ({ dt: A, _t: G }) => {
    const W = !(A && !G) && $.P ? D : o, Q = {
      dt: A || G,
      _t: G
    };
    R(Q), W(Q);
  }, P = (A, G) => {
    const [, z] = F(), W = {
      Ht: z
    };
    return R(W), z && !G && (A ? o : D)(W), W;
  }, ee = (A, G, z) => {
    const W = {
      Et: G
    };
    return R(W), G && !z && D(W), W;
  }, [se, ne] = M ? ga(h, k) : [], me = !I && Do(h, U, {
    _t: !0
  }), [Y, S] = Is(h, !1, ee, {
    rt: p,
    ct: p
  }), B = I && mt && new mt((A) => {
    const G = A[A.length - 1].contentRect;
    U({
      dt: !0,
      _t: go(G, l)
    }), l = G;
  }), q = cn(() => {
    const [, A] = F();
    o({
      Ht: A
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    B && B.observe(h);
    const A = me && me(), G = se && se(), z = Y(), W = $.K((Q) => {
      Q ? D({
        zt: Q
      }) : q();
    });
    return () => {
      B && B.disconnect(), A && A(), G && G(), u && u(), z(), W();
    };
  }, ({ It: A, At: G, Dt: z }) => {
    const W = {}, [Q] = A("update.ignoreMutation"), [ae, fe] = A("update.attributes"), [ce, Ee] = A("update.elementEvents"), [te, we] = A("update.debounce"), Me = Ee || fe, ke = G || z, xe = (ge) => Re(Q) && Q(ge);
    if (Me) {
      c && c(), u && u();
      const [ge, be] = Is(M || w, !0, P, {
        ct: Vt(p, ae || []),
        lt: ce,
        it: _,
        ft: (pe, de) => {
          const { target: Se, attributeName: Ae } = pe;
          return (!de && Ae && !I ? Ir(Se, _, f) : !1) || !!ht(Se, `.${He}`) || !!xe(pe);
        }
      });
      u = ge(), c = be;
    }
    if (we)
      if (D.m(), We(te)) {
        const ge = te[0], be = te[1];
        s = Ge(ge) && ge, i = Ge(be) && be;
      } else Ge(te) ? (s = te, i = !1) : (s = !1, i = !1);
    if (ke) {
      const ge = S(), be = ne && ne(), pe = c && c();
      ge && oe(W, ee(ge[0], ge[1], ke)), be && oe(W, k(be[0], ke)), pe && oe(W, P(pe[0], ke));
    }
    return R(W), W;
  }, T];
}, Oo = (t, e) => Re(e) ? e.apply(0, t) : e, wa = (t, e, n, o) => {
  const s = es(o) ? n : o;
  return Oo(t, s) || e.apply(0, t);
}, Lo = (t, e, n, o) => {
  const s = es(o) ? n : o, i = Oo(t, s);
  return !!i && (ln(i) ? i : e.apply(0, t));
}, ya = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: o } = e || {}, { T: s, P: i, Z: c } = Ke(), { nativeScrollbarsOverlaid: u, body: l } = c().cancel, d = n ?? u, _ = es(o) ? l : o, f = (s.x || s.y) && d, p = t && (_n(_) ? !i : _);
  return !!f || !!p;
}, ka = (t, e, n, o) => {
  const s = "--os-viewport-percent", i = "--os-scroll-percent", c = "--os-scroll-direction", { Z: u } = Ke(), { scrollbars: l } = u(), { slot: d } = l, { vt: _, ht: f, U: p, Mt: m, gt: h, wt: w, L: x } = e, { scrollbars: M } = m ? {} : t, { slot: I } = M || {}, L = [], y = [], V = [], H = Lo([_, f, p], () => x && w ? _ : f, d, I), E = (Y) => {
    if (Ot) {
      let S = null, B = [];
      const q = new Ot({
        source: h,
        axis: Y
      }), A = () => {
        S && S.cancel(), S = null;
      };
      return {
        Rt: (z) => {
          const { Tt: W } = n, Q = Dn(W)[Y], ae = Y === "x", fe = [An(0, ae), An(`calc(100cq${ae ? "w" : "h"} + -100%)`, ae)], ce = Q ? fe : fe.reverse();
          return B[0] === ce[0] && B[1] === ce[1] || (A(), B = ce, S = z.kt.animate({
            clear: ["left"],
            transform: ce
          }, {
            timeline: q
          })), A;
        }
      };
    }
  }, T = {
    x: E("x"),
    y: E("y")
  }, $ = () => {
    const { Vt: Y, Lt: S } = n, B = (q, A) => ao(0, 1, q / (q + A) || 0);
    return {
      x: B(S.x, Y.x),
      y: B(S.y, Y.y)
    };
  }, C = (Y, S, B) => {
    const q = B ? ls : co;
    ie(Y, (A) => {
      q(A.Ut, S);
    });
  }, F = (Y, S) => {
    ie(Y, (B) => {
      const [q, A] = S(B);
      It(q, A);
    });
  }, D = (Y, S, B) => {
    const q = mn(B), A = q ? B : !0, G = q ? !B : !0;
    A && C(y, Y, S), G && C(V, Y, S);
  }, R = () => {
    const Y = $(), S = (B) => (q) => [q.Ut, {
      [s]: qn(B) + ""
    }];
    F(y, S(Y.x)), F(V, S(Y.y));
  }, k = () => {
    if (!Ot) {
      const { Tt: Y } = n, S = $s(Y, Fe(h)), B = (q) => (A) => [A.Ut, {
        [i]: qn(q) + ""
      }];
      F(y, B(S.x)), F(V, B(S.y));
    }
  }, U = () => {
    const { Tt: Y } = n, S = Dn(Y), B = (q) => (A) => [A.Ut, {
      [c]: q ? "0" : "1"
    }];
    F(y, B(S.x)), F(V, B(S.y)), Ot && (y.forEach(T.x.Rt), V.forEach(T.y.Rt));
  }, P = () => {
    if (x && !w) {
      const { Vt: Y, Tt: S } = n, B = Dn(S), q = $s(S, Fe(h)), A = (G) => {
        const { Ut: z } = G, W = Ft(z) === p && z, Q = (ae, fe, ce) => {
          const Ee = fe * ae;
          return po(ce ? Ee : -Ee);
        };
        return [W, W && {
          transform: An({
            x: Q(q.x, Y.x, B.x),
            y: Q(q.y, Y.y, B.y)
          })
        }];
      };
      F(y, A), F(V, A);
    }
  }, ee = (Y) => {
    const S = Y ? "x" : "y", q = gt(`${He} ${Y ? sa : oa}`), A = gt(Eo), G = gt(ds), z = {
      Ut: q,
      Pt: A,
      kt: G
    }, W = T[S];
    return he(Y ? y : V, z), he(L, [De(q, A), De(A, G), X(kt, q), W && W.Rt(z), o(z, D, Y)]), z;
  }, se = X(ee, !0), ne = X(ee, !1), me = () => (De(H, y[0].Ut), De(H, V[0].Ut), X(Ie, L));
  return se(), ne(), [{
    Nt: R,
    qt: k,
    Bt: U,
    Ft: P,
    jt: D,
    Xt: {
      Yt: y,
      Wt: se,
      Jt: X(F, y)
    },
    Gt: {
      Yt: V,
      Wt: ne,
      Jt: X(F, V)
    }
  }, me];
}, xa = (t, e, n, o) => (s, i, c) => {
  const { ht: u, U: l, L: d, gt: _, Kt: f, Ot: p } = e, { Ut: m, Pt: h, kt: w } = s, [x, M] = pt(333), [I, L] = pt(444), y = (E) => {
    Re(_.scrollBy) && _.scrollBy({
      behavior: "smooth",
      left: E.x,
      top: E.y
    });
  }, V = () => {
    const E = "pointerup pointercancel lostpointercapture", T = `client${c ? "X" : "Y"}`, $ = c ? hn : gn, C = c ? "left" : "top", F = c ? "w" : "h", D = c ? "x" : "y", R = (U, P) => (ee) => {
      const { Vt: se } = n, ne = bt(h)[F] - bt(w)[F], Y = P * ee / ne * se[D];
      je(_, {
        [D]: U + Y
      });
    }, k = [];
    return ve(h, "pointerdown", (U) => {
      const P = ht(U.target, `.${ds}`) === w, ee = P ? w : h, se = t.scrollbars, ne = se[P ? "dragScroll" : "clickScroll"], { button: me, isPrimary: Y, pointerType: S } = U, { pointers: B } = se;
      if (me === 0 && Y && ne && (B || []).includes(S)) {
        Ie(k), L();
        const A = !P && (U.shiftKey || ne === "instant"), G = X(Mn, w), z = X(Mn, h), W = (de, Se) => (de || G())[C] - (Se || z())[C], Q = In(Mn(_)[$]) / bt(_)[F] || 1, ae = R(Fe(_)[D], 1 / Q), fe = U[T], ce = G(), Ee = z(), te = ce[$], we = W(ce, Ee) + te / 2, Me = fe - Ee[C], ke = P ? 0 : Me - we, xe = (de) => {
          Ie(pe), ee.releasePointerCapture(de.pointerId);
        }, ge = P || A, be = p(), pe = [ve(f, E, xe), ve(f, "selectstart", (de) => jn(de), {
          H: !1
        }), ve(h, E, xe), ge && ve(h, "pointermove", (de) => ae(ke + (de[T] - fe))), ge && (() => {
          const de = Fe(_);
          be();
          const Se = Fe(_), Ae = {
            x: Se.x - de.x,
            y: Se.y - de.y
          };
          (sn(Ae.x) > 3 || sn(Ae.y) > 3) && (p(), je(_, de), y(Ae), I(be));
        })];
        if (ee.setPointerCapture(U.pointerId), A)
          ae(ke);
        else if (!P) {
          const de = Rt(fa);
          if (de) {
            const Se = de(ae, ke, te, (Ae) => {
              Ae ? be() : he(pe, be);
            });
            he(pe, Se), he(k, X(Se, !0));
          }
        }
      }
    });
  };
  let H = !0;
  return X(Ie, [ve(w, "pointermove pointerleave", o), ve(m, "pointerenter", () => {
    i(As, !0);
  }), ve(m, "pointerleave pointercancel", () => {
    i(As, !1);
  }), !d && ve(m, "mousedown", () => {
    const E = Pn();
    (ys(E, Je) || ys(E, lt) || E === document.body) && on(X(Gn, l), 25);
  }), ve(m, "wheel", (E) => {
    const { deltaX: T, deltaY: $, deltaMode: C } = E;
    H && C === 0 && Ft(m) === u && y({
      x: T,
      y: $
    }), H = !1, i(Os, !0), x(() => {
      H = !0, i(Os);
    }), jn(E);
  }, {
    H: !1,
    I: !0
  }), ve(m, "pointerdown", X(ve, f, "click", wo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), V(), M, L]);
}, Sa = (t, e, n, o, s, i) => {
  let c, u, l, d, _, f = at, p = 0;
  const m = ["mouse", "pen"], h = (S) => m.includes(S.pointerType), [w, x] = pt(), [M, I] = pt(100), [L, y] = pt(100), [V, H] = pt(() => p), [E, T] = ka(t, s, o, xa(e, s, o, (S) => h(S) && se())), { ht: $, Qt: C, wt: F } = s, { jt: D, Nt: R, qt: k, Bt: U, Ft: P } = E, ee = (S, B) => {
    if (H(), S)
      D(Ds);
    else {
      const q = X(D, Ds, !0);
      p > 0 && !B ? V(q) : q();
    }
  }, se = () => {
    (l ? !c : !d) && (ee(!0), M(() => {
      ee(!1);
    }));
  }, ne = (S) => {
    D(Yn, S, !0), D(Yn, S, !1);
  }, me = (S) => {
    h(S) && (c = l, l && ee(!0));
  }, Y = [H, I, y, x, () => f(), ve($, "pointerover", me, {
    A: !0
  }), ve($, "pointerenter", me), ve($, "pointerleave", (S) => {
    h(S) && (c = !1, l && ee(!1));
  }), ve($, "pointermove", (S) => {
    h(S) && u && se();
  }), ve(C, "scroll", (S) => {
    w(() => {
      k(), se();
    }), i(S), P();
  })];
  return [() => X(Ie, he(Y, T())), ({ It: S, Dt: B, Zt: q, tn: A }) => {
    const { nn: G, sn: z, en: W, cn: Q } = A || {}, { Ct: ae, _t: fe } = q || {}, { F: ce } = n, { T: Ee } = Ke(), { k: te, rn: we } = o, [Me, ke] = S("showNativeOverlaidScrollbars"), [xe, ge] = S("scrollbars.theme"), [be, pe] = S("scrollbars.visibility"), [de, Se] = S("scrollbars.autoHide"), [Ae, Tt] = S("scrollbars.autoHideSuspend"), [Bt] = S("scrollbars.autoHideDelay"), [Ut, Nt] = S("scrollbars.dragScroll"), [ct, At] = S("scrollbars.clickScroll"), [Pt, xn] = S("overflow"), Sn = fe && !B, $n = we.x || we.y, Pe = G || z || Q || ae || B, Cn = W || pe || xn, qt = Me && Ee.x && Ee.y, zt = (st, Mt, Dt) => {
      const jt = st.includes(yt) && (be === rt || be === "auto" && Mt === yt);
      return D(ra, jt, Dt), jt;
    };
    if (p = Bt, Sn && (Ae && $n ? (ne(!1), f(), L(() => {
      f = ve(C, "scroll", X(ne, !0), {
        A: !0
      });
    })) : ne(!0)), ke && D(ta, qt), ge && (D(_), D(xe, !0), _ = xe), Tt && !Ae && ne(!0), Se && (u = de === "move", l = de === "leave", d = de === "never", ee(d, !0)), Nt && D(ia, Ut), At && D(la, !!ct), Cn) {
      const st = zt(Pt.x, te.x, !0), Mt = zt(Pt.y, te.y, !1);
      D(aa, !(st && Mt));
    }
    Pe && (k(), R(), P(), Q && U(), D(Ms, !we.x, !0), D(Ms, !we.y, !1), D(na, ce && !F));
  }, {}, E];
}, $a = (t) => {
  const e = Ke(), { Z: n, P: o } = e, { elements: s } = n(), { padding: i, viewport: c, content: u } = s, l = ln(t), d = l ? {} : t, { elements: _ } = d, { padding: f, viewport: p, content: m } = _ || {}, h = l ? t : d.target, w = fo(h), x = h.ownerDocument, M = x.documentElement, I = () => x.defaultView || Le, L = X(wa, [h]), y = X(Lo, [h]), V = X(gt, ""), H = X(L, V, c), E = X(y, V, u), T = (te) => {
    const we = bt(te), Me = un(te), ke = tt(te, to), xe = tt(te, no);
    return Me.w - we.w > 0 && !xt(ke) || Me.h - we.h > 0 && !xt(xe);
  }, $ = H(p), C = $ === h, F = C && w, D = !C && E(m), R = !C && $ === D, k = F ? M : $, U = F ? k : h, P = !C && y(V, i, f), ee = !R && D, se = [ee, k, P, U].map((te) => ln(te) && !Ft(te) && te), ne = (te) => te && Ws(se, te), me = !ne(k) && T(k) ? k : h, Y = F ? M : k, B = {
    vt: h,
    ht: U,
    U: k,
    ln: P,
    bt: ee,
    gt: Y,
    Qt: F ? x : k,
    an: w ? M : me,
    Kt: x,
    wt: w,
    Mt: l,
    L: C,
    un: I,
    yt: (te) => as(k, Je, te),
    St: (te, we) => dn(k, Je, te, we),
    Ot: () => dn(Y, Je, Xr, !0)
  }, { vt: q, ht: A, ln: G, U: z, bt: W } = B, Q = [() => {
    qe(A, [lt, On]), qe(q, On), w && qe(M, [On, lt]);
  }];
  let ae = Nn([W, z, G, A, q].find((te) => te && !ne(te)));
  const fe = F ? q : W || z, ce = X(Ie, Q);
  return [B, () => {
    const te = I(), we = Pn(), Me = (pe) => {
      De(Ft(pe), Nn(pe)), kt(pe);
    }, ke = (pe) => ve(pe, "focusin focusout focus blur", wo, {
      I: !0,
      H: !1
    }), xe = "tabindex", ge = os(z, xe), be = ke(we);
    return Qe(A, lt, C ? "" : Gr), Qe(G, Kn, ""), Qe(z, Je, ""), Qe(W, Ts, ""), C || (Qe(z, xe, ge || "-1"), w && Qe(M, Es, "")), De(fe, ae), De(A, G), De(G || A, !C && z), De(z, W), he(Q, [be, () => {
      const pe = Pn(), de = ne(z), Se = de && pe === z ? q : pe, Ae = ke(Se);
      qe(G, Kn), qe(W, Ts), qe(z, Je), w && qe(M, Es), ge ? Qe(z, xe, ge) : qe(z, xe), ne(W) && Me(W), de && Me(z), ne(G) && Me(G), Gn(Se), Ae();
    }]), o && !C && (rs(z, Je, Co), he(Q, X(qe, z, Je))), Gn(!C && w && we === q && te.top === te ? z : we), be(), ae = 0, ce;
  }, ce];
}, Ca = ({ bt: t }) => ({ Zt: e, fn: n, Dt: o }) => {
  const { xt: s } = e || {}, { $t: i } = n;
  t && (s || o) && It(t, {
    [gn]: i && "100%"
  });
}, Ea = ({ ht: t, ln: e, U: n, L: o }, s) => {
  const [i, c] = Ve({
    i: Vr,
    o: xs()
  }, X(xs, t, "padding", ""));
  return ({ It: u, Zt: l, fn: d, Dt: _ }) => {
    let [f, p] = c(_);
    const { P: m } = Ke(), { dt: h, Ht: w, Ct: x } = l || {}, { F: M } = d, [I, L] = u("paddingAbsolute");
    (h || p || (_ || w)) && ([f, p] = i(_));
    const V = !o && (L || x || p);
    if (V) {
      const H = !I || !e && !m, E = f.r + f.l, T = f.t + f.b, $ = {
        [Js]: H && !M ? -E : 0,
        [eo]: H ? -T : 0,
        [Qs]: H && M ? -E : 0,
        top: H ? -f.t : 0,
        right: H ? M ? -f.r : "auto" : 0,
        left: H ? M ? "auto" : -f.l : 0,
        [hn]: H && `calc(100% + ${E}px)`
      }, C = {
        [Ks]: H ? f.t : 0,
        [Ys]: H ? f.r : 0,
        [Zs]: H ? f.b : 0,
        [Xs]: H ? f.l : 0
      };
      It(e || n, $), It(n, C), oe(s, {
        ln: f,
        _n: !H,
        j: e ? C : oe({}, $, C)
      });
    }
    return {
      dn: V
    };
  };
}, Ta = (t, e) => {
  const n = Ke(), { ht: o, ln: s, U: i, L: c, Qt: u, gt: l, wt: d, St: _, un: f } = t, { P: p } = n, m = d && c, h = X(js, 0), w = {
    display: () => !1,
    direction: (S) => S !== "ltr",
    flexDirection: (S) => S.endsWith("-reverse"),
    writingMode: (S) => S !== "horizontal-tb"
  }, x = Ue(w), M = {
    i: so,
    o: {
      w: 0,
      h: 0
    }
  }, I = {
    i: en,
    o: {}
  }, L = (S) => {
    _($o, !m && S);
  }, y = (S) => {
    if (!x.some((fe) => {
      const ce = S[fe];
      return ce && w[fe](ce);
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
    const q = Fe(l), A = _(Zr, !0), G = ve(u, yt, (fe) => {
      const ce = Fe(l);
      fe.isTrusted && ce.x === q.x && ce.y === q.y && bo(fe);
    }, {
      I: !0,
      A: !0
    });
    je(l, {
      x: 0,
      y: 0
    }), A();
    const z = Fe(l), W = un(l);
    je(l, {
      x: W.w,
      y: W.h
    });
    const Q = Fe(l);
    je(l, {
      x: Q.x - z.x < 1 && -W.w,
      y: Q.y - z.y < 1 && -W.h
    });
    const ae = Fe(l);
    return je(l, q), Jn(() => G()), {
      D: z,
      M: ae
    };
  }, V = (S, B) => {
    const q = Le.devicePixelRatio % 1 !== 0 ? 1 : 0, A = {
      w: h(S.w - B.w),
      h: h(S.h - B.h)
    };
    return {
      w: A.w > q ? A.w : 0,
      h: A.h > q ? A.h : 0
    };
  }, [H, E] = Ve(M, X(is, i)), [T, $] = Ve(M, X(un, i)), [C, F] = Ve(M), [D] = Ve(I), [R, k] = Ve(M), [U] = Ve(I), [P] = Ve({
    i: (S, B) => bn(S, B, x),
    o: {}
  }, () => Pr(i) ? tt(i, x) : {}), [ee, se] = Ve({
    i: (S, B) => en(S.D, B.D) && en(S.M, B.M),
    o: yo()
  }), ne = Rt(To), me = (S, B) => `${B ? Wr : Kr}${Lr(S)}`, Y = (S) => {
    const B = (A) => [rt, ut, yt].map((G) => me(G, A)), q = B(!0).concat(B()).join(" ");
    _(q), _(Ue(S).map((A) => me(S[A], A === "x")).join(" "), !0);
  };
  return ({ It: S, Zt: B, fn: q, Dt: A }, { dn: G }) => {
    const { dt: z, Ht: W, Ct: Q, _t: ae, zt: fe } = B || {}, ce = ne && ne.V(t, e, q, n, S), { Y: Ee, W: te, J: we } = ce || {}, [Me, ke] = da(S, n), [xe, ge] = S("overflow"), be = xt(xe.x), pe = xt(xe.y), de = z || G || W || Q || fe || ke;
    let Se = E(A), Ae = $(A), Tt = F(A), Bt = k(A);
    if (ke && p && _(Co, !Me), de) {
      as(o, lt, nn) && L(!0);
      const [ps] = te ? te() : [], [Gt] = Se = H(A), [Wt] = Ae = T(A), Kt = ho(i), Yt = m && Nr(f()), sr = {
        w: h(Wt.w + Gt.w),
        h: h(Wt.h + Gt.h)
      }, hs = {
        w: h((Yt ? Yt.w : Kt.w + h(Kt.w - Wt.w)) + Gt.w),
        h: h((Yt ? Yt.h : Kt.h + h(Kt.h - Wt.h)) + Gt.h)
      };
      ps && ps(), Bt = R(hs), Tt = C(V(sr, hs), A);
    }
    const [Ut, Nt] = Bt, [ct, At] = Tt, [Pt, xn] = Ae, [Sn, $n] = Se, [Pe, Cn] = D({
      x: ct.w > 0,
      y: ct.h > 0
    }), qt = be && pe && (Pe.x || Pe.y) || be && Pe.x && !Pe.y || pe && Pe.y && !Pe.x, zt = G || Q || fe || $n || xn || Nt || At || ge || ke || de, st = ua(Pe, xe), [Mt, Dt] = U(st.k), [jt, er] = P(A), ms = Q || ae || er || Cn || A, [tr, nr] = ms ? ee(y(jt), A) : se();
    return zt && (Dt && Y(st.k), we && Ee && It(i, we(st, q, Ee(st, Pt, Sn)))), L(!1), dn(o, lt, nn, qt), dn(s, Kn, nn, qt), oe(e, {
      k: Mt,
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
      sn: At,
      cn: nr || At,
      pn: ms
    };
  };
}, Aa = (t) => {
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
  }, { vt: i, gt: c, L: u, Ot: l } = e, { P: d, T: _ } = Ke(), f = !d && (_.x || _.y), p = [Ca(e), Ea(e, s), Ta(e, s)];
  return [n, (m) => {
    const h = {}, x = f && Fe(c), M = x && l();
    return ie(p, (I) => {
      oe(h, I(m, h) || {});
    }), je(c, x), M && M(), u || je(i, 0), h;
  }, s, e, o];
}, Ma = (t, e, n, o, s) => {
  let i = !1;
  const c = Fs(e, {}), [u, l, d, _, f] = Aa(t), [p, m, h] = ba(_, d, c, (y) => {
    L({}, y);
  }), [w, x, , M] = Sa(t, e, h, d, _, s), I = (y) => Ue(y).some((V) => !!y[V]), L = (y, V) => {
    if (n())
      return !1;
    const { vn: H, Dt: E, At: T, hn: $ } = y, C = H || {}, F = !!E || !i, D = {
      It: Fs(e, C, F),
      vn: C,
      Dt: F
    };
    if ($)
      return x(D), !1;
    const R = V || m(oe({}, D, {
      At: T
    })), k = l(oe({}, D, {
      fn: h,
      Zt: R
    }));
    x(oe({}, D, {
      Zt: R,
      tn: k
    }));
    const U = I(R), P = I(k), ee = U || P || !ss(C) || F;
    return i = !0, ee && o(y, {
      Zt: R,
      tn: k
    }), ee;
  };
  return [() => {
    const { an: y, gt: V, Ot: H } = _, E = Fe(y), T = [p(), u(), w()], $ = H();
    return je(V, E), $(), X(Ie, T);
  }, L, () => ({
    gn: h,
    bn: d
  }), {
    wn: _,
    yn: M
  }, f];
}, us = /* @__PURE__ */ new WeakMap(), Da = (t, e) => {
  us.set(t, e);
}, Oa = (t) => {
  us.delete(t);
}, Vo = (t) => us.get(t), Ne = (t, e, n) => {
  const { nt: o } = Ke(), s = ln(t), i = s ? t : t.target, c = Vo(i);
  if (e && !c) {
    let u = !1;
    const l = [], d = {}, _ = (C) => {
      const F = ro(C), D = Rt(jr);
      return D ? D(F, !0) : F;
    }, f = oe({}, o(), _(e)), [p, m, h] = Wn(), [w, x, M] = Wn(n), I = (C, F) => {
      M(C, F), h(C, F);
    }, [L, y, V, H, E] = Ma(t, f, () => u, ({ vn: C, Dt: F }, { Zt: D, tn: R }) => {
      const { dt: k, Ct: U, xt: P, Ht: ee, Et: se, _t: ne } = D, { nn: me, sn: Y, en: S, cn: B } = R;
      I("updated", [$, {
        updateHints: {
          sizeChanged: !!k,
          directionChanged: !!U,
          heightIntrinsicChanged: !!P,
          overflowEdgeChanged: !!me,
          overflowAmountChanged: !!Y,
          overflowStyleChanged: !!S,
          scrollCoordinatesChanged: !!B,
          contentMutation: !!ee,
          hostMutation: !!se,
          appear: !!ne
        },
        changedOptions: C || {},
        force: !!F
      }]);
    }, (C) => I("scroll", [$, C])), T = (C) => {
      Oa(i), Ie(l), u = !0, I("destroyed", [$, C]), m(), x();
    }, $ = {
      options(C, F) {
        if (C) {
          const D = F ? o() : {}, R = Ao(f, oe(D, _(C)));
          ss(R) || (oe(f, R), y({
            vn: R
          }));
        }
        return oe({}, f);
      },
      on: w,
      off: (C, F) => {
        C && F && x(C, F);
      },
      state() {
        const { gn: C, bn: F } = V(), { F: D } = C, { Lt: R, Vt: k, k: U, rn: P, ln: ee, _n: se, Tt: ne } = F;
        return oe({}, {
          overflowEdge: R,
          overflowAmount: k,
          overflowStyle: U,
          hasOverflow: P,
          scrollCoordinates: {
            start: ne.D,
            end: ne.M
          },
          padding: ee,
          paddingAbsolute: se,
          directionRTL: D,
          destroyed: u
        });
      },
      elements() {
        const { vt: C, ht: F, ln: D, U: R, bt: k, gt: U, Qt: P } = H.wn, { Xt: ee, Gt: se } = H.yn, ne = (Y) => {
          const { kt: S, Pt: B, Ut: q } = Y;
          return {
            scrollbar: q,
            track: B,
            handle: S
          };
        }, me = (Y) => {
          const { Yt: S, Wt: B } = Y, q = ne(S[0]);
          return oe({}, q, {
            clone: () => {
              const A = ne(B());
              return y({
                hn: !0
              }), A;
            }
          });
        };
        return oe({}, {
          target: C,
          host: F,
          padding: D || R,
          viewport: R,
          content: k || R,
          scrollOffsetElement: U,
          scrollEventElement: P,
          scrollbarHorizontal: me(ee),
          scrollbarVertical: me(se)
        });
      },
      update: (C) => y({
        Dt: C,
        At: !0
      }),
      destroy: X(T, !1),
      plugin: (C) => d[Ue(C)[0]]
    };
    return he(l, [E]), Da(i, $), So(ko, Ne, [$, p, d]), ya(H.wn.wt, !s && t.cancel) ? (T(!0), $) : (he(l, L()), I("initialized", [$]), $.update(), $);
  }
  return c;
};
Ne.plugin = (t) => {
  const e = We(t), n = e ? t : [t], o = n.map((s) => So(s, Ne)[0]);
  return zr(n), e ? o : o[0];
};
Ne.valid = (t) => {
  const e = t && t.elements, n = Re(e) && e();
  return an(n) && !!Vo(n.target);
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
Ne.trustedTypePolicy = Rr;
function La() {
  let t;
  const e = O(null), n = Math.floor(Math.random() * 2 ** 32), o = O(!1), s = O([]), i = () => s.value, c = () => t.getSelection(), u = () => s.value.length, l = () => t.clearSelection(!0), d = O(), _ = O(null), f = O(null), p = O(null), m = O(null);
  function h() {
    t = new mr({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: V, event: H, isDragging: E }) => {
      if (E)
        t.Interaction._reset(H);
      else {
        o.value = !1;
        const T = e.value.offsetWidth - H.offsetX, $ = e.value.offsetHeight - H.offsetY;
        T < 15 && $ < 15 && t.Interaction._reset(H), H.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(H);
      }
    }), document.addEventListener("dragleave", (V) => {
      !V.buttons && o.value && (o.value = !1);
    });
  }
  const w = () => ft(() => {
    t.addSelection(
      t.getSelectables()
    ), x();
  }), x = () => {
    s.value = t.getSelection().map((V) => JSON.parse(V.dataset.item)), d.value(s.value);
  }, M = () => ft(() => {
    const V = i().map((H) => H.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter((H) => V.includes(JSON.parse(H.dataset.item).path))
    ), x(), L();
  }), I = (V) => {
    d.value = V, t.subscribe("DS:end", ({ items: H, event: E, isDragging: T }) => {
      s.value = H.map(($) => JSON.parse($.dataset.item)), V(H.map(($) => JSON.parse($.dataset.item)));
    });
  }, L = () => {
    _.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (f.value.style.height = e.value.scrollHeight + "px", f.value.style.display = "block") : (f.value.style.height = "100%", f.value.style.display = "none"));
  }, y = (V) => {
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
      scroll: (V, H) => {
        const { scrollOffsetElement: E } = V.elements();
        e.value.scrollTo({
          top: E.scrollTop,
          left: 0
        });
      }
    }), h(), L(), m.value = new ResizeObserver(L), m.value.observe(e.value), e.value.addEventListener("scroll", y), t.subscribe("DS:scroll", ({ isDragging: V }) => V || y());
  }), Qn(() => {
    t && t.stop(), m.value && m.value.disconnect();
  }), Bs(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: n,
    isDraggingRef: o,
    scrollBar: f,
    scrollBarContainer: p,
    getSelected: i,
    getSelection: c,
    selectAll: w,
    clearSelection: l,
    refreshSelection: M,
    getCount: u,
    onSelect: I
  };
}
function Va(t, e) {
  const n = O(t), o = O(e), s = O([]), i = O([]), c = O([]), u = O(!1), l = O(5);
  let d = !1, _ = !1;
  const f = St({
    adapter: n,
    storages: [],
    dirname: o,
    files: []
  });
  function p() {
    let I = [], L = [], y = o.value ?? n.value + "://";
    y.length === 0 && (s.value = []), y.replace(n.value + "://", "").split("/").filter(Boolean).forEach(function(E) {
      I.push(E), I.join("/") !== "" && L.push({
        basename: E,
        name: E,
        path: n.value + "://" + I.join("/") + "/",
        type: "dir"
      });
    }), i.value = L;
    const [V, H] = h(
      L,
      l.value
    );
    c.value = H, s.value = V;
  }
  function m(I) {
    l.value = I, p();
  }
  function h(I, L) {
    return I.length > L ? [I.slice(-L), I.slice(0, -L)] : [I, []];
  }
  function w(I = null) {
    u.value = I ?? !u.value;
  }
  function x() {
    return s.value && s.value.length && !0;
  }
  const M = wt(() => {
    var I;
    return ((I = s.value[s.value.length - 2]) == null ? void 0 : I.path) ?? n.value + "://";
  });
  return Ce(() => {
  }), Oe(o, p), Ce(p), {
    adapter: n,
    path: o,
    loading: d,
    searchMode: _,
    data: f,
    breadcrumbs: s,
    breadcrumbItems: i,
    limitBreadcrumbItems: m,
    hiddenBreadcrumbs: c,
    showHiddenBreadcrumbs: u,
    toggleHiddenBreadcrumbs: w,
    isGoUpAvailable: x,
    parentFolderPath: M
  };
}
const Fa = (t, e) => {
  const n = kr(t.id), o = _r(), s = n.getStore("metricUnits", !1), i = Tr(n, t.theme), c = e.i18n, u = t.locale ?? e.locale, l = (m) => Array.isArray(m) ? m : $r, d = n.getStore("persist-path", t.persist), _ = d ? n.getStore("path", t.path) : t.path, f = d ? n.getStore("adapter") : null, p = La();
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
    modal: Ar(),
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
    fs: Va(f, _)
  });
}, Ia = { class: "vuefinder__modal-layout__container" }, Ha = { class: "vuefinder__modal-layout__content" }, Ra = { class: "vuefinder__modal-layout__footer" }, Ye = {
  __name: "ModalLayout",
  setup(t) {
    const e = O(null), n = re("ServiceContainer");
    return Ce(() => {
      const o = document.querySelector(".v-f-modal input");
      o && o.focus(), ft(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const s = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: s,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (o, s) => (v(), g("div", {
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
            a("div", Ra, [
              Lt(o.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, Ba = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [o, s] of e)
    n[o] = s;
  return n;
}, Ua = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const o = re("ServiceContainer"), s = O(!1), { t: i } = o.i18n;
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
  return v(), g("div", {
    class: le(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    t.$slots.default ? Lt(t.$slots, "default", { key: 0 }) : (v(), g("span", Na, b(o.t("Saved.")), 1))
  ], 2);
}
const _t = /* @__PURE__ */ Ba(Ua, [["render", Pa]]), qa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function za(t, e) {
  return v(), g("svg", qa, e[0] || (e[0] = [
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
    return (e, n) => (v(), g("div", Ga, [
      a("div", Wa, [
        (v(), K(Us(t.icon), { class: "vuefinder__modal-header__icon" }))
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
}, Dl = { class: "vuefinder__about-modal__setting-label" }, Ol = ["label"], Ll = ["value"], Vl = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Fl = { class: "vuefinder__about-modal__shortcuts" }, Il = { class: "vuefinder__about-modal__shortcut" }, Hl = { class: "vuefinder__about-modal__shortcut" }, Rl = { class: "vuefinder__about-modal__shortcut" }, Bl = { class: "vuefinder__about-modal__shortcut" }, Ul = { class: "vuefinder__about-modal__shortcut" }, Nl = { class: "vuefinder__about-modal__shortcut" }, Pl = { class: "vuefinder__about-modal__shortcut" }, ql = { class: "vuefinder__about-modal__shortcut" }, zl = { class: "vuefinder__about-modal__shortcut" }, jl = {
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
    ]), u = O("about"), l = async () => {
      o(), location.reload();
    }, d = (I) => {
      e.theme.set(I), e.emitter.emit("vf-theme-saved");
    }, _ = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? zs : qs, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, f = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, m = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = re("VueFinderOptions"), x = Object.fromEntries(
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
    return (I, L) => (v(), K(Ye, null, {
      buttons: J(() => [
        a("button", {
          type: "button",
          onClick: L[7] || (L[7] = (y) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(s)("Close")), 1)
      ]),
      default: J(() => [
        a("div", Ya, [
          j(nt, {
            icon: r(ja),
            title: "Vuefinder " + r(e).version
          }, null, 8, ["icon", "title"]),
          a("div", Xa, [
            a("div", null, [
              a("div", null, [
                a("nav", Za, [
                  (v(!0), g(ye, null, $e(c.value, (y) => (v(), g("button", {
                    key: y.name,
                    onClick: (V) => u.value = y.key,
                    class: le([y.key === u.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": y.current ? "page" : void 0
                  }, b(y.name), 11, Qa))), 128))
                ])
              ])
            ]),
            u.value === i.ABOUT ? (v(), g("div", Ja, [
              a("div", el, b(r(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              a("a", tl, b(r(s)("Project home")), 1),
              a("a", nl, b(r(s)("Follow on GitHub")), 1)
            ])) : N("", !0),
            u.value === i.SETTINGS ? (v(), g("div", sl, [
              a("div", ol, b(r(s)("Customize your experience with the following settings")), 1),
              a("div", rl, [
                a("fieldset", null, [
                  a("div", al, [
                    a("div", ll, [
                      _e(a("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": L[0] || (L[0] = (y) => r(e).metricUnits = y),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Xt, r(e).metricUnits]
                      ])
                    ]),
                    a("div", il, [
                      a("label", cl, [
                        Z(b(r(s)("Use Metric Units")) + " ", 1),
                        j(_t, {
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
                        "onUpdate:modelValue": L[1] || (L[1] = (y) => r(e).compactListView = y),
                        onClick: f,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Xt, r(e).compactListView]
                      ])
                    ]),
                    a("div", fl, [
                      a("label", vl, [
                        Z(b(r(s)("Compact list view")) + " ", 1),
                        j(_t, {
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
                        "onUpdate:modelValue": L[2] || (L[2] = (y) => r(e).persist = y),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Xt, r(e).persist]
                      ])
                    ]),
                    a("div", pl, [
                      a("label", hl, [
                        Z(b(r(s)("Persist path on reload")) + " ", 1),
                        j(_t, {
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
                        "onUpdate:modelValue": L[3] || (L[3] = (y) => r(e).showThumbnails = y),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Xt, r(e).showThumbnails]
                      ])
                    ]),
                    a("div", wl, [
                      a("label", yl, [
                        Z(b(r(s)("Show thumbnails")) + " ", 1),
                        j(_t, {
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
                        "onUpdate:modelValue": L[4] || (L[4] = (y) => r(e).theme.value = y),
                        onChange: L[5] || (L[5] = (y) => d(y.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: r(s)("Theme")
                        }, [
                          (v(!0), g(ye, null, $e(M.value, (y, V) => (v(), g("option", { value: V }, b(y), 9, El))), 256))
                        ], 8, Cl)
                      ], 544), [
                        [gs, r(e).theme.value]
                      ]),
                      j(_t, {
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
                  r(e).features.includes(r(ue).LANGUAGE) && Object.keys(r(x)).length > 1 ? (v(), g("div", Tl, [
                    a("div", Al, [
                      a("label", Ml, b(r(s)("Language")), 1)
                    ]),
                    a("div", Dl, [
                      _e(a("select", {
                        id: "language",
                        "onUpdate:modelValue": L[6] || (L[6] = (y) => r(e).i18n.locale = y),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: r(s)("Language")
                        }, [
                          (v(!0), g(ye, null, $e(r(x), (y, V) => (v(), g("option", { value: V }, b(y), 9, Ll))), 256))
                        ], 8, Ol)
                      ], 512), [
                        [gs, r(e).i18n.locale]
                      ]),
                      j(_t, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: J(() => [
                          Z(b(r(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : N("", !0)
                ])
              ])
            ])) : N("", !0),
            u.value === i.SHORTCUTS ? (v(), g("div", Vl, [
              a("div", Fl, [
                a("div", Il, [
                  a("div", null, b(r(s)("Rename")), 1),
                  L[8] || (L[8] = a("kbd", null, "F2", -1))
                ]),
                a("div", Hl, [
                  a("div", null, b(r(s)("Refresh")), 1),
                  L[9] || (L[9] = a("kbd", null, "F5", -1))
                ]),
                a("div", Rl, [
                  Z(b(r(s)("Delete")) + " ", 1),
                  L[10] || (L[10] = a("kbd", null, "Del", -1))
                ]),
                a("div", Bl, [
                  Z(b(r(s)("Escape")) + " ", 1),
                  L[11] || (L[11] = a("div", null, [
                    a("kbd", null, "Esc")
                  ], -1))
                ]),
                a("div", Ul, [
                  Z(b(r(s)("Select All")) + " ", 1),
                  L[12] || (L[12] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Z(" + "),
                    a("kbd", null, "A")
                  ], -1))
                ]),
                a("div", Nl, [
                  Z(b(r(s)("Search")) + " ", 1),
                  L[13] || (L[13] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Z(" + "),
                    a("kbd", null, "F")
                  ], -1))
                ]),
                a("div", Pl, [
                  Z(b(r(s)("Toggle Sidebar")) + " ", 1),
                  L[14] || (L[14] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Z(" + "),
                    a("kbd", null, "E")
                  ], -1))
                ]),
                a("div", ql, [
                  Z(b(r(s)("Open Settings")) + " ", 1),
                  L[15] || (L[15] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Z(" + "),
                    a("kbd", null, ",")
                  ], -1))
                ]),
                a("div", zl, [
                  Z(b(r(s)("Toggle Full Screen")) + " ", 1),
                  L[16] || (L[16] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Z(" + "),
                    a("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : N("", !0),
            u.value === i.RESET ? (v(), g("div", jl, [
              a("div", Gl, b(r(s)("Reset all settings to default")), 1),
              a("button", {
                onClick: l,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(r(s)("Reset Settings")), 1)
            ])) : N("", !0)
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
    const n = e, o = re("ServiceContainer"), { t: s } = o.i18n, i = O(!1), c = O(null), u = O((d = c.value) == null ? void 0 : d.strMessage);
    Oe(u, () => i.value = !1);
    const l = () => {
      n("hidden"), i.value = !0;
    };
    return (_, f) => (v(), g("div", null, [
      i.value ? N("", !0) : (v(), g("div", {
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
        }, f[0] || (f[0] = [
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
  return v(), g("svg", Kl, e[0] || (e[0] = [
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
}, si = { class: "vuefinder__delete-modal__file-name" }, oi = { class: "vuefinder__delete-modal__warning" }, fs = {
  __name: "ModalDelete",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = O(e.modal.data.items), s = O(""), i = () => {
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
    return (c, u) => (v(), K(Ye, null, {
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
          j(nt, {
            icon: r(Io),
            title: r(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          a("div", Xl, [
            a("div", Zl, [
              a("p", Ql, b(r(n)("Are you sure you want to delete these files?")), 1),
              a("div", Jl, [
                (v(!0), g(ye, null, $e(o.value, (l) => (v(), g("p", ei, [
                  l.type === "dir" ? (v(), g("svg", ti, u[2] || (u[2] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (v(), g("svg", ni, u[3] || (u[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  a("span", si, b(l.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (v(), K(Xe, {
                key: 0,
                onHidden: u[0] || (u[0] = (l) => s.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(s.value), 1)
                ]),
                _: 1
              })) : N("", !0)
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
  return v(), g("svg", ri, e[0] || (e[0] = [
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
}, fi = { class: "vuefinder__rename-modal__item-name" }, vs = {
  __name: "ModalRename",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = O(e.modal.data.items[0]), s = O(e.modal.data.items[0].basename), i = O(""), c = () => {
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
    return (u, l) => (v(), K(Ye, null, {
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
          j(nt, {
            icon: r(Ho),
            title: r(n)("Rename")
          }, null, 8, ["icon", "title"]),
          a("div", li, [
            a("div", ii, [
              a("p", ci, [
                o.value.type === "dir" ? (v(), g("svg", di, l[3] || (l[3] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (v(), g("svg", ui, l[4] || (l[4] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                a("span", fi, b(o.value.basename), 1)
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
              i.value.length ? (v(), K(Xe, {
                key: 0,
                onHidden: l[1] || (l[1] = (d) => i.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(i.value), 1)
                ]),
                _: 1
              })) : N("", !0)
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
function vi(t) {
  const e = (n) => {
    n.code === Ze.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === Ze.F2 && t.features.includes(ue.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(vs, { items: t.dragSelect.getSelected() })), n.code === Ze.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === Ze.DELETE && (!t.dragSelect.getCount() || t.modal.open(fs, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === Ze.BACKSLASH && t.modal.open(Fo), n.metaKey && n.code === Ze.KEY_F && t.features.includes(ue.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === Ze.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === Ze.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === Ze.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
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
  return v(), g("svg", _i, e[0] || (e[0] = [
    a("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const Ro = { render: mi }, pi = { class: "vuefinder__new-folder-modal__content" }, hi = { class: "vuefinder__new-folder-modal__form" }, gi = { class: "vuefinder__new-folder-modal__description" }, bi = ["placeholder"], Bo = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = re("ServiceContainer"), { getStore: n } = e.storage, { t: o } = e.i18n, s = O(""), i = O(""), c = () => {
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
    return (u, l) => (v(), K(Ye, null, {
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
          j(nt, {
            icon: r(Ro),
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
              i.value.length ? (v(), K(Xe, {
                key: 0,
                onHidden: l[1] || (l[1] = (d) => i.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(i.value), 1)
                ]),
                _: 1
              })) : N("", !0)
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
  return v(), g("svg", wi, e[0] || (e[0] = [
    a("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ]));
}
const Uo = { render: yi }, ki = { class: "vuefinder__new-file-modal__content" }, xi = { class: "vuefinder__new-file-modal__form" }, Si = { class: "vuefinder__new-file-modal__description" }, $i = ["placeholder"], Ci = {
  __name: "ModalNewFile",
  setup(t) {
    const e = re("ServiceContainer"), { getStore: n } = e.storage, { t: o } = e.i18n, s = O(""), i = O(""), c = () => {
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
    return (u, l) => (v(), K(Ye, null, {
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
          j(nt, {
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
              i.value.length ? (v(), K(Xe, {
                key: 0,
                onHidden: l[1] || (l[1] = (d) => i.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(i.value), 1)
                ]),
                _: 1
              })) : N("", !0)
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
  return v(), g("svg", Ei, e[0] || (e[0] = [
    a("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ]));
}
const No = { render: Ti }, Ai = { class: "vuefinder__upload-modal__content" }, Mi = {
  key: 0,
  class: "pointer-events-none"
}, Di = {
  key: 1,
  class: "pointer-events-none"
}, Oi = ["disabled"], Li = ["disabled"], Vi = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Fi = ["textContent"], Ii = { class: "vuefinder__upload-modal__file-info" }, Hi = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Ri = { class: "vuefinder__upload-modal__file-name md:hidden" }, Bi = {
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
    }, i = O({ QUEUE_ENTRY_STATUS: s }), c = O(null), u = O(null), l = O(null), d = O(null), _ = O(null), f = O(null), p = O([]), m = O(""), h = O(!1), w = O(!1);
    let x;
    function M(D) {
      return p.value.findIndex((R) => R.id === D);
    }
    function I(D, R = null) {
      R = R ?? (D.webkitRelativePath || D.name), x.addFile({
        name: R,
        type: D.type,
        data: D,
        source: "Local"
      });
    }
    function L(D) {
      switch (D.status) {
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
    const y = (D) => {
      switch (D.status) {
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
    function H() {
      if (!h.value) {
        if (!p.value.filter((D) => D.status !== s.DONE).length) {
          m.value = n("Please select file to upload first.");
          return;
        }
        m.value = "", x.retryAll(), x.upload();
      }
    }
    function E() {
      x.cancelAll({ reason: "user" }), p.value.forEach((D) => {
        D.status !== s.DONE && (D.status = s.CANCELED, D.statusName = n("Canceled"));
      }), h.value = !1;
    }
    function T(D) {
      h.value || (x.removeFile(D.id, "removed-by-user"), p.value.splice(M(D.id), 1));
    }
    function $(D) {
      if (!h.value) {
        if (x.cancelAll({ reason: "user" }), D) {
          const R = [];
          p.value.forEach((k) => {
            k.status !== s.DONE && R.push(k);
          }), p.value = [], R.forEach((k) => {
            I(k.originalFile, k.name);
          });
          return;
        }
        p.value.splice(0);
      }
    }
    function C() {
      e.modal.close();
    }
    function F() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return Ce(async () => {
      x = new pr({
        debug: e.debug,
        restrictions: {
          maxFileSize: Er(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: o,
        onBeforeFileAdded(k, U) {
          if (U[k.id] != null) {
            const ee = M(k.id);
            p.value[ee].status === s.PENDING && (m.value = x.i18n("noDuplicates", { fileName: k.name })), p.value = p.value.filter((se) => se.id !== k.id);
          }
          return p.value.push({
            id: k.id,
            name: k.name,
            size: e.filesize(k.size),
            status: s.PENDING,
            statusName: n("Pending upload"),
            percent: null,
            originalFile: k.data
          }), !0;
        }
      }), x.use(hr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(k, U) {
          let P;
          try {
            P = JSON.parse(k).message;
          } catch {
            P = n("Cannot parse server response.");
          }
          return new Error(P);
        }
      }), x.on("restriction-failed", (k, U) => {
        const P = p.value[M(k.id)];
        T(P), m.value = U.message;
      }), x.on("upload", () => {
        const k = F();
        x.setMeta({ ...k.body });
        const U = x.getPlugin("XHRUpload");
        U.opts.method = k.method, U.opts.endpoint = k.url + "?" + new URLSearchParams(k.params), U.opts.headers = k.headers, delete k.headers["Content-Type"], h.value = !0, p.value.forEach((P) => {
          P.status !== s.DONE && (P.percent = null, P.status = s.UPLOADING, P.statusName = n("Pending upload"));
        });
      }), x.on("upload-progress", (k, U) => {
        const P = Math.floor(U.bytesUploaded / U.bytesTotal * 100);
        p.value[M(k.id)].percent = `${P}%`;
      }), x.on("upload-success", (k) => {
        const U = p.value[M(k.id)];
        U.status = s.DONE, U.statusName = n("Done"), e.emitter.emit("vf-fetch", {
          params: {
            q: "index",
            adapter: e.fs.adapter,
            path: e.fs.data.dirname
          }
        });
      }), x.on("upload-error", (k, U) => {
        const P = p.value[M(k.id)];
        P.percent = null, P.status = s.ERROR, U.isNetworkError ? P.statusName = n(
          "Network Error, Unable establish connection to the server or interrupted."
        ) : P.statusName = U ? U.message : n("Unknown Error");
      }), x.on("error", (k) => {
        m.value = k.message, h.value = !1, e.emitter.emit("vf-fetch", {
          params: {
            q: "index",
            adapter: e.fs.adapter,
            path: e.fs.data.dirname
          },
          noCloseModal: !0
        });
      }), x.on("complete", () => {
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
      }), f.value.addEventListener("dragover", (k) => {
        k.preventDefault(), w.value = !0;
      }), f.value.addEventListener("dragleave", (k) => {
        k.preventDefault(), w.value = !1;
      });
      function D(k, U) {
        U.isFile && U.file((P) => k(U, P)), U.isDirectory && U.createReader().readEntries((P) => {
          P.forEach((ee) => {
            D(k, ee);
          });
        });
      }
      f.value.addEventListener("drop", (k) => {
        k.preventDefault(), w.value = !1;
        const U = /^[/\\](.+)/;
        [...k.dataTransfer.items].forEach((P) => {
          P.kind === "file" && D((ee, se) => {
            const ne = U.exec(ee.fullPath);
            I(se, ne[1]);
          }, P.webkitGetAsEntry());
        });
      });
      const R = ({ target: k }) => {
        const U = k.files;
        for (const P of U)
          I(P);
        k.value = "";
      };
      u.value.addEventListener("change", R), l.value.addEventListener("change", R);
    }), Ns(() => {
      x == null || x.close({ reason: "unmount" });
    }), (D, R) => (v(), K(Ye, null, {
      buttons: J(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: et(H, ["prevent"])
        }, b(r(n)("Upload")), 9, Pi),
        h.value ? (v(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: et(E, ["prevent"])
        }, b(r(n)("Cancel")), 1)) : (v(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: et(C, ["prevent"])
        }, b(r(n)("Close")), 1))
      ]),
      default: J(() => [
        a("div", null, [
          j(nt, {
            icon: r(No),
            title: r(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          a("div", Ai, [
            a("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: f,
              onClick: V
            }, [
              w.value ? (v(), g("div", Mi, b(r(n)("Release to drop these files.")), 1)) : (v(), g("div", Di, b(r(n)("Drag and drop the files/folders to here or click here.")), 1))
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
                onClick: R[0] || (R[0] = (k) => $(!1))
              }, b(r(n)("Clear all")), 9, Oi),
              a("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: R[1] || (R[1] = (k) => $(!0))
              }, b(r(n)("Clear only successful")), 9, Li)
            ], 512),
            a("div", Vi, [
              (v(!0), g(ye, null, $e(p.value, (k) => (v(), g("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: k.id
              }, [
                a("span", {
                  class: le(["vuefinder__upload-modal__file-icon", L(k)])
                }, [
                  a("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(y(k))
                  }, null, 8, Fi)
                ], 2),
                a("div", Ii, [
                  a("div", Hi, b(r(Xn)(k.name, 40)) + " (" + b(k.size) + ") ", 1),
                  a("div", Ri, b(r(Xn)(k.name, 16)) + " (" + b(k.size) + ") ", 1),
                  a("div", {
                    class: le(["vuefinder__upload-modal__file-status", L(k)])
                  }, [
                    Z(b(k.statusName) + " ", 1),
                    k.status === i.value.QUEUE_ENTRY_STATUS.UPLOADING ? (v(), g("b", Bi, b(k.percent), 1)) : N("", !0)
                  ], 2)
                ]),
                a("button", {
                  type: "button",
                  class: le(["vuefinder__upload-modal__file-remove", h.value ? "disabled" : ""]),
                  title: r(n)("Delete"),
                  disabled: h.value,
                  onClick: (U) => T(k)
                }, R[3] || (R[3] = [
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
              p.value.length ? N("", !0) : (v(), g("div", Ni, b(r(n)("No files selected!")), 1))
            ]),
            m.value.length ? (v(), K(Xe, {
              key: 0,
              onHidden: R[2] || (R[2] = (k) => m.value = ""),
              error: ""
            }, {
              default: J(() => [
                Z(b(m.value), 1)
              ]),
              _: 1
            })) : N("", !0)
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
  return v(), g("svg", zi, e[0] || (e[0] = [
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
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = O(e.modal.data.items[0]), s = O(""), i = O([]), c = () => {
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
    return (u, l) => (v(), K(Ye, null, {
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
          j(nt, {
            icon: r(Po),
            title: r(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          a("div", Gi, [
            a("div", Wi, [
              (v(!0), g(ye, null, $e(i.value, (d) => (v(), g("p", Ki, [
                d.type === "dir" ? (v(), g("svg", Yi, l[2] || (l[2] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (v(), g("svg", Xi, l[3] || (l[3] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                a("span", Zi, b(d.basename), 1)
              ]))), 256)),
              a("p", Qi, b(r(n)("The archive will be unarchived at")) + " (" + b(r(e).fs.data.dirname) + ")", 1),
              s.value.length ? (v(), K(Xe, {
                key: 0,
                onHidden: l[0] || (l[0] = (d) => s.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(s.value), 1)
                ]),
                _: 1
              })) : N("", !0)
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
  return v(), g("svg", Ji, e[0] || (e[0] = [
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
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = O(""), s = O(""), i = O(e.modal.data.items), c = () => {
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
    return (u, l) => (v(), K(Ye, null, {
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
          j(nt, {
            icon: r(zo),
            title: r(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          a("div", tc, [
            a("div", nc, [
              a("div", sc, [
                (v(!0), g(ye, null, $e(i.value, (d) => (v(), g("p", oc, [
                  d.type === "dir" ? (v(), g("svg", rc, l[3] || (l[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (v(), g("svg", ac, l[4] || (l[4] = [
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
              s.value.length ? (v(), K(Xe, {
                key: 0,
                onHidden: l[1] || (l[1] = (d) => s.value = ""),
                error: ""
              }, {
                default: J(() => [
                  Z(b(s.value), 1)
                ]),
                _: 1
              })) : N("", !0)
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
  return v(), g("svg", cc, e[0] || (e[0] = [
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
function fc(t, e) {
  return v(), g("svg", uc, e[0] || (e[0] = [
    a("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ]));
}
const vc = { render: fc }, _c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function mc(t, e) {
  return v(), g("svg", _c, e[0] || (e[0] = [
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
  return v(), g("svg", hc, e[0] || (e[0] = [
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
  return v(), g("svg", wc, e[0] || (e[0] = [
    a("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ]));
}
const kc = { render: yc }, xc = { class: "vuefinder__toolbar" }, Sc = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, $c = ["title"], Cc = ["title"], Ec = ["title"], Tc = ["title"], Ac = ["title"], Mc = ["title"], Dc = ["title"], Oc = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Lc = { class: "pl-2" }, Vc = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Fc = { class: "vuefinder__toolbar__controls" }, Ic = ["title"], Hc = ["title"], Rc = {
  __name: "Toolbar",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, { t: o } = e.i18n, s = e.dragSelect, i = O("");
    e.emitter.on("vf-search-query", ({ newQuery: l }) => {
      i.value = l;
    });
    const c = () => {
      e.fullScreen = !e.fullScreen;
    };
    Oe(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const u = () => {
      e.view = e.view === "list" ? "grid" : "list", s.refreshSelection(), n("viewport", e.view);
    };
    return (l, d) => (v(), g("div", xc, [
      i.value.length ? (v(), g("div", Oc, [
        a("div", Lc, [
          Z(b(r(o)("Search results for")) + " ", 1),
          a("span", Vc, b(i.value), 1)
        ]),
        r(e).loadingIndicator === "circular" && r(e).fs.loading ? (v(), K(r(_s), { key: 0 })) : N("", !0)
      ])) : (v(), g("div", Sc, [
        r(e).features.includes(r(ue).NEW_FOLDER) ? (v(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: r(o)("New Folder"),
          onClick: d[0] || (d[0] = (_) => r(e).modal.open(Bo, { items: r(s).getSelected() }))
        }, [
          j(r(Ro))
        ], 8, $c)) : N("", !0),
        r(e).features.includes(r(ue).NEW_FILE) ? (v(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: r(o)("New File"),
          onClick: d[1] || (d[1] = (_) => r(e).modal.open(Ci, { items: r(s).getSelected() }))
        }, [
          j(r(Uo))
        ], 8, Cc)) : N("", !0),
        r(e).features.includes(r(ue).RENAME) ? (v(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: r(o)("Rename"),
          onClick: d[2] || (d[2] = (_) => r(s).getCount() !== 1 || r(e).modal.open(vs, { items: r(s).getSelected() }))
        }, [
          j(r(Ho), {
            class: le(r(s).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ec)) : N("", !0),
        r(e).features.includes(r(ue).DELETE) ? (v(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: r(o)("Delete"),
          onClick: d[3] || (d[3] = (_) => !r(s).getCount() || r(e).modal.open(fs, { items: r(s).getSelected() }))
        }, [
          j(r(Io), {
            class: le(r(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Tc)) : N("", !0),
        r(e).features.includes(r(ue).UPLOAD) ? (v(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: r(o)("Upload"),
          onClick: d[4] || (d[4] = (_) => r(e).modal.open(qi, { items: r(s).getSelected() }))
        }, [
          j(r(No))
        ], 8, Ac)) : N("", !0),
        r(e).features.includes(r(ue).UNARCHIVE) && r(s).getCount() === 1 && r(s).getSelected()[0].mime_type === "application/zip" ? (v(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: r(o)("Unarchive"),
          onClick: d[5] || (d[5] = (_) => !r(s).getCount() || r(e).modal.open(qo, { items: r(s).getSelected() }))
        }, [
          j(r(Po), {
            class: le(r(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Mc)) : N("", !0),
        r(e).features.includes(r(ue).ARCHIVE) ? (v(), g("div", {
          key: 6,
          class: "mx-1.5",
          title: r(o)("Archive"),
          onClick: d[6] || (d[6] = (_) => !r(s).getCount() || r(e).modal.open(jo, { items: r(s).getSelected() }))
        }, [
          j(r(zo), {
            class: le(r(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Dc)) : N("", !0)
      ])),
      a("div", Fc, [
        r(e).features.includes(r(ue).FULL_SCREEN) ? (v(), g("div", {
          key: 0,
          onClick: c,
          class: "mx-1.5",
          title: r(o)("Toggle Full Screen")
        }, [
          r(e).fullScreen ? (v(), K(r(pc), { key: 0 })) : (v(), K(r(vc), { key: 1 }))
        ], 8, Ic)) : N("", !0),
        a("div", {
          class: "mx-1.5",
          title: r(o)("Change View"),
          onClick: d[7] || (d[7] = (_) => i.value.length || u())
        }, [
          r(e).view === "grid" ? (v(), K(r(bc), {
            key: 0,
            class: le(["vf-toolbar-icon", i.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : N("", !0),
          r(e).view === "list" ? (v(), K(r(kc), {
            key: 1,
            class: le(["vf-toolbar-icon", i.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : N("", !0)
        ], 8, Hc)
      ])
    ]));
  }
}, Bc = (t, e = 0, n = !1) => {
  let o;
  return (...s) => {
    n && !o && t(...s), clearTimeout(o), o = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Hs = (t, e, n) => {
  const o = O(t);
  return lr((s, i) => ({
    get() {
      return s(), o.value;
    },
    set: Bc(
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
  return v(), g("svg", Uc, e[0] || (e[0] = [
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
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = O(e.modal.data.items.from), s = O(""), i = () => {
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
    return (c, u) => (v(), K(Ye, null, {
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
          j(nt, {
            icon: r(Pc),
            title: r(n)("Move files")
          }, null, 8, ["icon", "title"]),
          a("div", qc, [
            a("p", zc, b(r(n)("Are you sure you want to move these files?")), 1),
            a("div", jc, [
              (v(!0), g(ye, null, $e(o.value, (l) => (v(), g("div", Gc, [
                a("div", null, [
                  l.type === "dir" ? (v(), g("svg", Wc, u[2] || (u[2] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (v(), g("svg", Kc, u[3] || (u[3] = [
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
            s.value.length ? (v(), K(Xe, {
              key: 0,
              onHidden: u[0] || (u[0] = (l) => s.value = ""),
              error: ""
            }, {
              default: J(() => [
                Z(b(s.value), 1)
              ]),
              _: 1
            })) : N("", !0)
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
  return v(), g("svg", ed, e[0] || (e[0] = [
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
  return v(), g("svg", sd, e[0] || (e[0] = [
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
  return v(), g("svg", ad, e[0] || (e[0] = [
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
  return v(), g("svg", cd, e[0] || (e[0] = [
    a("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ]));
}
const ud = { render: dd }, fd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function vd(t, e) {
  return v(), g("svg", fd, e[0] || (e[0] = [
    a("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ]));
}
const _d = { render: vd }, md = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function pd(t, e) {
  return v(), g("svg", md, e[0] || (e[0] = [
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
  return v(), g("svg", gd, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ]));
}
const kn = { render: bd }, wd = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function yd(t, e) {
  return v(), g("svg", wd, e[0] || (e[0] = [
    a("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ]));
}
const kd = { render: yd }, xd = { class: "vuefinder__breadcrumb__container" }, Sd = ["title"], $d = ["title"], Cd = ["title"], Ed = { class: "vuefinder__breadcrumb__list" }, Td = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Ad = { class: "relative" }, Md = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], Dd = { class: "vuefinder__breadcrumb__search-mode" }, Od = ["placeholder"], Ld = { class: "vuefinder__breadcrumb__hidden-dropdown" }, Vd = ["onDrop", "onClick"], Fd = { class: "vuefinder__breadcrumb__hidden-item-content" }, Id = { class: "vuefinder__breadcrumb__hidden-item-text" }, Hd = {
  __name: "Breadcrumb",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = e.dragSelect, { setStore: s } = e.storage, i = O(null), c = Hs(0, 100);
    Oe(c, (E) => {
      const T = i.value.children;
      let $ = 0, C = 0, F = 5, D = 1;
      e.fs.limitBreadcrumbItems(F), ft(() => {
        for (let R = T.length - 1; R >= 0 && !($ + T[R].offsetWidth > c.value - 40); R--)
          $ += parseInt(T[R].offsetWidth, 10), C++;
        C < D && (C = D), C > F && (C = F), e.fs.limitBreadcrumbItems(C);
      });
    });
    const u = () => {
      c.value = i.value.offsetWidth;
    };
    let l = O(null);
    Ce(() => {
      l.value = new ResizeObserver(u), l.value.observe(i.value);
    }), Qn(() => {
      l.value.disconnect();
    });
    const d = (E, T = null) => {
      E.preventDefault(), o.isDraggingRef.value = !1, p(E), T ?? (T = e.fs.hiddenBreadcrumbs.length - 1);
      let $ = JSON.parse(E.dataTransfer.getData("items"));
      if ($.find((C) => C.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Zn, {
        items: {
          from: $,
          to: e.fs.hiddenBreadcrumbs[T] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, _ = (E, T = null) => {
      E.preventDefault(), o.isDraggingRef.value = !1, p(E), T ?? (T = e.fs.breadcrumbs.length - 2);
      let $ = JSON.parse(E.dataTransfer.getData("items"));
      if ($.find((C) => C.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Zn, {
        items: {
          from: $,
          to: e.fs.breadcrumbs[T] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, f = (E) => {
      E.preventDefault(), e.fs.isGoUpAvailable() ? (E.dataTransfer.dropEffect = "copy", E.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (E.dataTransfer.dropEffect = "none", E.dataTransfer.effectAllowed = "none");
    }, p = (E) => {
      E.preventDefault(), E.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && E.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, m = () => {
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
    }, w = (E) => {
      e.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: e.fs.adapter, path: E.path }
      }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, x = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, M = {
      mounted(E, T, $, C) {
        E.clickOutsideEvent = function(F) {
          E === F.target || E.contains(F.target) || T.value();
        }, document.body.addEventListener("click", E.clickOutsideEvent);
      },
      beforeUnmount(E, T, $, C) {
        document.body.removeEventListener("click", E.clickOutsideEvent);
      }
    };
    Oe(
      () => e.showTreeView,
      (E, T) => {
        E !== T && s("show-tree-view", E);
      }
    );
    const I = O(null), L = () => {
      e.features.includes(ue.SEARCH) && (e.fs.searchMode = !0, ft(() => I.value.focus()));
    }, y = Hs("", 400);
    Oe(y, (E) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: E });
    }), Oe(
      () => e.fs.searchMode,
      (E) => {
        E && ft(() => I.value.focus());
      }
    );
    const V = () => {
      e.fs.searchMode = !1, y.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      V();
    });
    const H = () => {
      y.value === "" && V();
    };
    return (E, T) => (v(), g("div", xd, [
      a("span", {
        title: r(n)("Go up a directory")
      }, [
        j(r(rd), {
          onDragover: T[0] || (T[0] = ($) => f($)),
          onDragleave: T[1] || (T[1] = ($) => p($)),
          onDrop: T[2] || (T[2] = ($) => _($)),
          onClick: h,
          class: le(
            r(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
          )
        }, null, 8, ["class"])
      ], 8, Sd),
      r(e).fs.loading ? (v(), g("span", {
        key: 1,
        title: r(n)("Cancel")
      }, [
        j(r(id), {
          onClick: T[3] || (T[3] = ($) => r(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Cd)) : (v(), g("span", {
        key: 0,
        title: r(n)("Refresh")
      }, [
        j(r(nd), { onClick: m })
      ], 8, $d)),
      _e(a("div", {
        onClick: et(L, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        a("div", null, [
          j(r(ud), {
            onDragover: T[4] || (T[4] = ($) => f($)),
            onDragleave: T[5] || (T[5] = ($) => p($)),
            onDrop: T[6] || (T[6] = ($) => _($, -1)),
            onClick: T[7] || (T[7] = ($) => r(e).emitter.emit("vf-fetch", {
              params: { q: "index", adapter: r(e).fs.adapter }
            }))
          })
        ]),
        a("div", Ed, [
          r(e).fs.hiddenBreadcrumbs.length ? _e((v(), g("div", Td, [
            T[13] || (T[13] = a("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            a("div", Ad, [
              a("span", {
                onDragenter: T[8] || (T[8] = ($) => r(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: T[9] || (T[9] = ($) => r(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                j(r(kd), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [M, x]
          ]) : N("", !0)
        ]),
        a("div", {
          ref_key: "breadcrumbContainer",
          ref: i,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: et(L, ["self"])
        }, [
          (v(!0), g(ye, null, $e(r(e).fs.breadcrumbs, ($, C) => (v(), g("div", { key: C }, [
            T[14] || (T[14] = a("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            a("span", {
              onDragover: (F) => C === r(e).fs.breadcrumbs.length - 1 || f(F),
              onDragleave: (F) => C === r(e).fs.breadcrumbs.length - 1 || p(F),
              onDrop: (F) => C === r(e).fs.breadcrumbs.length - 1 || _(F, C),
              class: "vuefinder__breadcrumb__item",
              title: $.basename,
              onClick: (F) => r(e).emitter.emit("vf-fetch", {
                params: {
                  q: "index",
                  adapter: r(e).fs.adapter,
                  path: $.path
                }
              })
            }, b($.name), 41, Md)
          ]))), 128))
        ], 512),
        r(e).loadingIndicator === "circular" && r(e).fs.loading ? (v(), K(r(_s), { key: 0 })) : N("", !0)
      ], 512), [
        [ze, !r(e).fs.searchMode]
      ]),
      _e(a("div", Dd, [
        a("div", null, [
          j(r(_d))
        ]),
        _e(a("input", {
          ref_key: "searchInput",
          ref: I,
          onKeydown: $t(V, ["esc"]),
          onBlur: H,
          "onUpdate:modelValue": T[10] || (T[10] = ($) => ir(y) ? y.value = $ : null),
          placeholder: r(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, Od), [
          [Ct, r(y)]
        ]),
        j(r(hd), { onClick: V })
      ], 512), [
        [ze, r(e).fs.searchMode]
      ]),
      _e(a("div", Ld, [
        (v(!0), g(ye, null, $e(r(e).fs.hiddenBreadcrumbs, ($, C) => (v(), g("div", {
          key: C,
          onDragover: T[11] || (T[11] = (F) => f(F)),
          onDragleave: T[12] || (T[12] = (F) => p(F)),
          onDrop: (F) => d(F, C),
          onClick: (F) => w($),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          a("div", Fd, [
            a("span", null, [
              j(r(kn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            a("span", Id, b($.name), 1)
          ])
        ], 40, Vd))), 128))
      ], 512), [
        [ze, r(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Go = (t, e = null) => new Date(t * 1e3).toLocaleString(
  e ?? navigator.language ?? "ru-RU"
), Rd = ["onClick"], Bd = {
  __name: "Toast",
  setup(t) {
    const e = re("ServiceContainer"), { getStore: n } = e.storage, o = O(n("full-screen", !1)), s = O([]), i = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (l) => {
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
    }), (l, d) => (v(), g("div", {
      class: le(["vuefinder__toast", o.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      j(cr, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: J(() => [
          (v(!0), g(ye, null, $e(s.value, (_, f) => (v(), g("div", {
            key: f,
            onClick: (p) => c(f),
            class: le(["vuefinder__toast__message", i(_.type)])
          }, b(_.label), 11, Rd))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, Ud = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Nd(t, e) {
  return v(), g("svg", Ud, e[0] || (e[0] = [
    a("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Pd = { render: Nd }, qd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function zd(t, e) {
  return v(), g("svg", qd, e[0] || (e[0] = [
    a("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const jd = { render: zd }, Jt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (v(), g("div", null, [
      t.direction === "asc" ? (v(), K(r(Pd), { key: 0 })) : N("", !0),
      t.direction === "desc" ? (v(), K(r(jd), { key: 1 })) : N("", !0)
    ]));
  }
}, Gd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Wd(t, e) {
  return v(), g("svg", Gd, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const Kd = { render: Wd }, Yd = { class: "vuefinder__item-icon" }, Vn = {
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
    return (e, n) => (v(), g("span", Yd, [
      t.type === "dir" ? (v(), K(r(kn), {
        key: 0,
        class: le(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (v(), K(r(Kd), {
        key: 1,
        class: le(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, Xd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function Zd(t, e) {
  return v(), g("svg", Xd, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const Qd = { render: Zd }, Jd = { class: "vuefinder__drag-item__container" }, eu = { class: "vuefinder__drag-item__count" }, tu = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, o) => (v(), g("div", Jd, [
      j(r(Qd)),
      a("div", eu, b(e.count), 1)
    ]));
  }
}, nu = { class: "vuefinder__text-preview" }, su = { class: "vuefinder__text-preview__header" }, ou = ["title"], ru = { class: "vuefinder__text-preview__actions" }, au = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, lu = { key: 1 }, iu = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = O(""), s = O(""), i = O(null), c = O(!1), u = O(""), l = O(!1), d = re("ServiceContainer"), { t: _ } = d.i18n;
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
    const f = () => {
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
    return (m, h) => (v(), g("div", nu, [
      a("div", su, [
        a("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: r(d).modal.data.item.path
        }, b(r(d).modal.data.item.basename), 9, ou),
        a("div", ru, [
          c.value ? (v(), g("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, b(r(_)("Save")), 1)) : N("", !0),
          r(d).features.includes(r(ue).EDIT) ? (v(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = (w) => f())
          }, b(c.value ? r(_)("Cancel") : r(_)("Edit")), 1)) : N("", !0)
        ])
      ]),
      a("div", null, [
        c.value ? (v(), g("div", lu, [
          _e(a("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": h[1] || (h[1] = (w) => s.value = w),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Ct, s.value]
          ])
        ])) : (v(), g("pre", au, b(o.value), 1)),
        u.value.length ? (v(), K(Xe, {
          key: 2,
          onHidden: h[2] || (h[2] = (w) => u.value = ""),
          error: l.value
        }, {
          default: J(() => [
            Z(b(u.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : N("", !0)
      ])
    ]));
  }
}, cu = { class: "vuefinder__image-preview" }, du = { class: "vuefinder__image-preview__header" }, uu = ["title"], fu = { class: "vuefinder__image-preview__actions" }, vu = { class: "vuefinder__image-preview__image-container" }, _u = ["src"], mu = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = re("ServiceContainer"), { t: s } = o.i18n, i = O(null), c = O(null), u = O(!1), l = O(""), d = O(!1), _ = () => {
      u.value = !u.value, u.value ? c.value = new br(i.value, {
        crop(p) {
        }
      }) : c.value.destroy();
    }, f = () => {
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
    }), (p, m) => (v(), g("div", cu, [
      a("div", du, [
        a("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: r(o).modal.data.item.path
        }, b(r(o).modal.data.item.basename), 9, uu),
        a("div", fu, [
          u.value ? (v(), g("button", {
            key: 0,
            onClick: f,
            class: "vuefinder__image-preview__crop-button"
          }, b(r(s)("Crop")), 1)) : N("", !0),
          r(o).features.includes(r(ue).EDIT) ? (v(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: m[0] || (m[0] = (h) => _())
          }, b(u.value ? r(s)("Cancel") : r(s)("Edit")), 1)) : N("", !0)
        ])
      ]),
      a("div", vu, [
        a("img", {
          ref_key: "image",
          ref: i,
          class: "vuefinder__image-preview__image",
          src: r(o).requester.getPreviewUrl(r(o).modal.data.adapter, r(o).modal.data.item),
          alt: ""
        }, null, 8, _u)
      ]),
      l.value.length ? (v(), K(Xe, {
        key: 0,
        onHidden: m[1] || (m[1] = (h) => l.value = ""),
        error: d.value
      }, {
        default: J(() => [
          Z(b(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : N("", !0)
    ]));
  }
}, pu = { class: "vuefinder__default-preview" }, hu = { class: "vuefinder__default-preview__header" }, gu = ["title"], bu = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), o = e;
    return Ce(() => {
      o("success");
    }), (s, i) => (v(), g("div", pu, [
      a("div", hu, [
        a("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: r(n).modal.data.item.path
        }, b(r(n).modal.data.item.basename), 9, gu)
      ]),
      i[0] || (i[0] = a("div", null, null, -1))
    ]));
  }
}, wu = { class: "vuefinder__video-preview" }, yu = ["title"], ku = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, xu = ["src"], Su = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), o = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ce(() => {
      o("success");
    }), (i, c) => (v(), g("div", wu, [
      a("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: r(n).modal.data.item.path
      }, b(r(n).modal.data.item.basename), 9, yu),
      a("div", null, [
        a("video", ku, [
          a("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, xu),
          c[0] || (c[0] = Z(" Your browser does not support the video tag. "))
        ])
      ])
    ]));
  }
}, $u = { class: "vuefinder__audio-preview" }, Cu = ["title"], Eu = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Tu = ["src"], Au = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = re("ServiceContainer"), s = () => o.requester.getPreviewUrl(o.modal.data.adapter, o.modal.data.item);
    return Ce(() => {
      n("success");
    }), (i, c) => (v(), g("div", $u, [
      a("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: r(o).modal.data.item.path
      }, b(r(o).modal.data.item.basename), 9, Cu),
      a("div", null, [
        a("audio", Eu, [
          a("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Tu),
          c[0] || (c[0] = Z(" Your browser does not support the audio element. "))
        ])
      ])
    ]));
  }
}, Mu = { class: "vuefinder__pdf-preview" }, Du = ["title"], Ou = ["data"], Lu = ["src"], Vu = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), o = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ce(() => {
      o("success");
    }), (i, c) => (v(), g("div", Mu, [
      a("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: r(n).modal.data.item.path
      }, b(r(n).modal.data.item.basename), 9, Du),
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
          }, " Your browser does not support PDFs ", 8, Lu)
        ], 8, Ou)
      ])
    ]));
  }
}, Fu = { class: "vuefinder__preview-modal__content" }, Iu = { key: 0 }, Hu = { class: "vuefinder__preview-modal__loading" }, Ru = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Bu = { class: "vuefinder__preview-modal__details" }, Uu = { class: "font-bold" }, Nu = { class: "font-bold pl-2" }, Pu = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, qu = ["download", "href"], Wo = {
  __name: "ModalPreview",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = O(!1), s = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), i = e.features.includes(ue.PREVIEW);
    return i || (o.value = !0), (c, u) => (v(), K(Ye, null, {
      buttons: J(() => [
        a("button", {
          type: "button",
          onClick: u[6] || (u[6] = (l) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(n)("Close")), 1),
        r(e).features.includes(r(ue).DOWNLOAD) ? (v(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item),
          href: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item)
        }, b(r(n)("Download")), 9, qu)) : N("", !0)
      ]),
      default: J(() => [
        a("div", null, [
          a("div", Fu, [
            r(i) ? (v(), g("div", Iu, [
              s("text") ? (v(), K(iu, {
                key: 0,
                onSuccess: u[0] || (u[0] = (l) => o.value = !0)
              })) : s("image") ? (v(), K(mu, {
                key: 1,
                onSuccess: u[1] || (u[1] = (l) => o.value = !0)
              })) : s("video") ? (v(), K(Su, {
                key: 2,
                onSuccess: u[2] || (u[2] = (l) => o.value = !0)
              })) : s("audio") ? (v(), K(Au, {
                key: 3,
                onSuccess: u[3] || (u[3] = (l) => o.value = !0)
              })) : s("application/pdf") ? (v(), K(Vu, {
                key: 4,
                onSuccess: u[4] || (u[4] = (l) => o.value = !0)
              })) : (v(), K(bu, {
                key: 5,
                onSuccess: u[5] || (u[5] = (l) => o.value = !0)
              }))
            ])) : N("", !0),
            a("div", Hu, [
              o.value === !1 ? (v(), g("div", Ru, [
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
              ])) : N("", !0)
            ])
          ])
        ]),
        a("div", Bu, [
          a("div", null, [
            a("span", Uu, b(r(n)("File Size")) + ": ", 1),
            Z(b(r(e).filesize(r(e).modal.data.item.file_size)), 1)
          ]),
          a("div", null, [
            a("span", Nu, b(r(n)("Last Modified")) + ": ", 1),
            Z(" " + b(r(Go)(r(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        r(e).features.includes(r(ue).DOWNLOAD) ? (v(), g("div", Pu, [
          a("span", null, b(r(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : N("", !0)
      ]),
      _: 1
    }));
  }
}, zu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function ju(t, e) {
  return v(), g("svg", zu, e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ]));
}
const Ko = { render: ju }, Gu = ["data-type", "data-item", "data-index"], Fn = {
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
      mounted(m, h, w, x) {
        w.props.draggable && (m.addEventListener("dragstart", (M) => c(M, h.value)), m.addEventListener("dragover", (M) => l(M, h.value)), m.addEventListener("drop", (M) => u(M, h.value)));
      },
      beforeUnmount(m, h, w, x) {
        w.props.draggable && (m.removeEventListener("dragstart", c), m.removeEventListener("dragover", l), m.removeEventListener("drop", u));
      }
    }, c = (m, h) => {
      if (m.altKey || m.ctrlKey || m.metaKey)
        return m.preventDefault(), !1;
      n.isDraggingRef.value = !0, m.dataTransfer.setDragImage(o.dragImage.$el, 0, 15), m.dataTransfer.effectAllowed = "all", m.dataTransfer.dropEffect = "copy", m.dataTransfer.setData("items", JSON.stringify(n.getSelected()));
    }, u = (m, h) => {
      m.preventDefault(), n.isDraggingRef.value = !1;
      let w = JSON.parse(m.dataTransfer.getData("items"));
      if (w.find((x) => x.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Zn, { items: { from: w, to: h } });
    }, l = (m, h) => {
      m.preventDefault(), !h || h.type !== "dir" || n.getSelection().find((w) => w === m.currentTarget) ? (m.dataTransfer.dropEffect = "none", m.dataTransfer.effectAllowed = "none") : m.dataTransfer.dropEffect = "copy";
    };
    let d = null, _ = !1;
    const f = () => {
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
    return (m, h) => _e((v(), g("div", {
      style: fn({ opacity: r(n).isDraggingRef.value && r(n).getSelection().find((w) => m.$el === w) ? "0.5 !important" : "" }),
      class: le(["vuefinder__item", "vf-item-" + r(n).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: h[0] || (h[0] = (w) => s(t.item)),
      onTouchstart: h[1] || (h[1] = (w) => p(w)),
      onTouchend: h[2] || (h[2] = (w) => f()),
      onContextmenu: h[3] || (h[3] = et((w) => r(e).emitter.emit("vf-contextmenu-show", { event: w, items: r(n).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Lt(m.$slots, "default"),
      r(e).pinnedFolders.find((w) => w.path === t.item.path) ? (v(), K(r(Ko), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : N("", !0)
    ], 46, Gu)), [
      [i, t.item]
    ]);
  }
}, Wu = { class: "vuefinder__explorer__container" }, Ku = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Yu = { class: "vuefinder__explorer__drag-item" }, Xu = {
  key: 0,
  class: "vuefinder__linear-loader absolute"
}, Zu = { class: "vuefinder__explorer__item-list-content" }, Qu = { class: "vuefinder__explorer__item-list-name" }, Ju = { class: "vuefinder__explorer__item-name" }, ef = { class: "vuefinder__explorer__item-path" }, tf = { class: "vuefinder__explorer__item-list-content" }, nf = { class: "vuefinder__explorer__item-list-name" }, sf = { class: "vuefinder__explorer__item-name" }, of = { class: "vuefinder__explorer__item-size" }, rf = { class: "vuefinder__explorer__item-date" }, af = { class: "vuefinder__explorer__item-grid-content" }, lf = ["data-src", "alt"], cf = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, df = { class: "vuefinder__explorer__item-title break-all" }, uf = {
  __name: "Explorer",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, o = (f) => f == null ? void 0 : f.substring(0, 3), s = O(null), i = O(""), c = e.dragSelect;
    let u;
    e.emitter.on("vf-fullscreen-toggle", () => {
      c.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: f }) => {
      i.value = f, f ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: f
        },
        onSuccess: (p) => {
          p.files.length || e.emitter.emit("vf-toast-push", { label: n("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const l = St({ active: !1, column: "", order: "" }), d = (f = !0) => {
      let p = [...e.fs.data.files], m = l.column, h = l.order === "asc" ? 1 : -1;
      if (!f)
        return p;
      const w = (x, M) => typeof x == "string" && typeof M == "string" ? x.toLowerCase().localeCompare(M.toLowerCase()) : x < M ? -1 : x > M ? 1 : 0;
      return l.active && (p = p.slice().sort((x, M) => w(x[m], M[m]) * h)), p;
    }, _ = (f) => {
      l.active && l.column === f ? (l.active = l.order === "asc", l.column = f, l.order = "desc") : (l.active = !0, l.column = f, l.order = "asc");
    };
    return Ce(() => {
      u = new gr(c.area.value);
    }), Bs(() => {
      u.update();
    }), Ns(() => {
      u.destroy();
    }), (f, p) => (v(), g("div", Wu, [
      r(e).view === "list" || i.value.length ? (v(), g("div", Ku, [
        a("div", {
          onClick: p[0] || (p[0] = (m) => _("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          Z(b(r(n)("Name")) + " ", 1),
          _e(j(Jt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "basename"]
          ])
        ]),
        i.value.length ? N("", !0) : (v(), g("div", {
          key: 0,
          onClick: p[1] || (p[1] = (m) => _("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          Z(b(r(n)("Size")) + " ", 1),
          _e(j(Jt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "file_size"]
          ])
        ])),
        i.value.length ? N("", !0) : (v(), g("div", {
          key: 1,
          onClick: p[2] || (p[2] = (m) => _("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          Z(b(r(n)("Date")) + " ", 1),
          _e(j(Jt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "last_modified"]
          ])
        ])),
        i.value.length ? (v(), g("div", {
          key: 2,
          onClick: p[3] || (p[3] = (m) => _("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          Z(b(r(n)("Filepath")) + " ", 1),
          _e(j(Jt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [ze, l.active && l.column === "path"]
          ])
        ])) : N("", !0)
      ])) : N("", !0),
      a("div", Yu, [
        j(tu, {
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
        r(e).loadingIndicator === "linear" && r(e).fs.loading ? (v(), g("div", Xu)) : N("", !0),
        i.value.length ? (v(!0), g(ye, { key: 1 }, $e(d(), (m, h) => (v(), K(Fn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: J(() => [
            a("div", Zu, [
              a("div", Qu, [
                j(Vn, {
                  type: m.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", Ju, b(m.basename), 1)
              ]),
              a("div", ef, b(m.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : N("", !0),
        r(e).view === "list" && !i.value.length ? (v(!0), g(ye, { key: 2 }, $e(d(), (m, h) => (v(), K(Fn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: m.path
        }, {
          default: J(() => [
            a("div", tf, [
              a("div", nf, [
                j(Vn, {
                  type: m.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", sf, b(m.basename), 1)
              ]),
              a("div", of, b(m.file_size ? r(e).filesize(m.file_size) : ""), 1),
              a("div", rf, b(r(Go)(m.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : N("", !0),
        r(e).view === "grid" && !i.value.length ? (v(!0), g(ye, { key: 3 }, $e(d(!1), (m, h) => (v(), K(Fn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: J(() => [
            a("div", null, [
              a("div", af, [
                (m.mime_type ?? "").startsWith("image") && r(e).showThumbnails ? (v(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": r(e).requester.getPreviewUrl(r(e).fs.adapter, m),
                  alt: m.basename,
                  key: m.path
                }, null, 8, lf)) : (v(), K(Vn, {
                  key: 1,
                  type: m.type
                }, null, 8, ["type"])),
                !((m.mime_type ?? "").startsWith("image") && r(e).showThumbnails) && m.type !== "dir" ? (v(), g("div", cf, b(o(m.extension)), 1)) : N("", !0)
              ]),
              a("span", df, b(r(Xn)(m.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : N("", !0)
      ], 544),
      j(Bd)
    ]));
  }
}, ff = ["href", "download"], vf = ["onClick"], _f = {
  __name: "ContextMenu",
  setup(t) {
    const e = re("ServiceContainer"), n = O(null), o = O([]), s = O(""), i = St({
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
    }), e.emitter.on("vf-contextmenu-show", ({ event: d, items: _, target: f = null }) => {
      if (i.items = e.contextMenuItems.filter((p) => p.show(e, {
        searchQuery: s.value,
        items: _,
        target: f
      })), s.value)
        if (f)
          e.emitter.emit("vf-context-selected", [f]);
        else
          return;
      else !f && !s.value ? e.emitter.emit("vf-context-selected", []) : _.length > 1 && _.some((p) => p.path === f.path) ? e.emitter.emit("vf-context-selected", _) : e.emitter.emit("vf-context-selected", [f]);
      l(d);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const l = (d) => {
      const _ = e.dragSelect.area.value, f = e.root.getBoundingClientRect(), p = _.getBoundingClientRect();
      let m = d.clientX - f.left, h = d.clientY - f.top;
      i.active = !0, ft(() => {
        var I;
        const w = (I = n.value) == null ? void 0 : I.getBoundingClientRect();
        let x = (w == null ? void 0 : w.height) ?? 0, M = (w == null ? void 0 : w.width) ?? 0;
        m = p.right - d.pageX + window.scrollX < M ? m - M : m, h = p.bottom - d.pageY + window.scrollY < x ? h - x : h, i.positions = {
          left: m + "px",
          top: h + "px"
        };
      });
    };
    return (d, _) => _e((v(), g("ul", {
      ref_key: "contextmenu",
      ref: n,
      style: fn(i.positions),
      class: "vuefinder__context-menu"
    }, [
      (v(!0), g(ye, null, $e(i.items, (f) => (v(), g("li", {
        class: "vuefinder__context-menu__item",
        key: f.title
      }, [
        f.link ? (v(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: c(f),
          download: c(f),
          onClick: _[0] || (_[0] = (p) => r(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          a("span", null, b(f.title(r(e).i18n)), 1)
        ], 8, ff)) : (v(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (p) => u(f)
        }, [
          a("span", null, b(f.title(r(e).i18n)), 1)
        ], 8, vf))
      ]))), 128))
    ], 4)), [
      [ze, i.active]
    ]);
  }
}, mf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function pf(t, e) {
  return v(), g("svg", mf, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ]));
}
const hf = { render: pf }, gf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function bf(t, e) {
  return v(), g("svg", gf, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ]));
}
const wf = { render: bf }, yf = { class: "vuefinder__status-bar__wrapper" }, kf = { class: "vuefinder__status-bar__actions" }, xf = ["disabled"], Sf = ["title"], $f = {
  __name: "Statusbar",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { setStore: o } = e.storage, s = e.dragSelect, i = O("");
    e.emitter.on("vf-search-query", ({ newQuery: u }) => {
      i.value = u;
    });
    const c = wt(() => {
      const u = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && u;
    });
    return (u, l) => (v(), g("div", yf, [
      a("div", kf, [
        r(e).selectButton.active ? (v(), g("button", {
          key: 0,
          class: le(["vf-btn py-0 vf-btn-primary", { disabled: !c.value }]),
          disabled: !c.value,
          onClick: l[0] || (l[0] = (d) => r(e).selectButton.click(r(s).getSelected(), d))
        }, b(r(n)("Select")), 11, xf)) : N("", !0),
        a("span", {
          class: "vuefinder__status-bar__about",
          title: r(n)("About"),
          onClick: l[1] || (l[1] = (d) => r(e).modal.open(Fo))
        }, [
          j(r(wf))
        ], 8, Sf)
      ])
    ]));
  }
}, Cf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function Ef(t, e) {
  return v(), g("svg", Cf, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ]));
}
const Yo = { render: Ef }, Tf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Af(t, e) {
  return v(), g("svg", Tf, e[0] || (e[0] = [
    a("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ]));
}
const Mf = { render: Af }, Df = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Of(t, e) {
  return v(), g("svg", Df, e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ]));
}
const Xo = { render: Of }, Lf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Vf(t, e) {
  return v(), g("svg", Lf, e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M9 12h6" }, null, -1)
  ]));
}
const Zo = { render: Vf };
function Qo(t, e) {
  const n = t.findIndex((o) => o.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Ff = { class: "vuefinder__folder-loader-indicator" }, If = {
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
    const e = t, n = re("ServiceContainer"), { t: o } = n.i18n, s = Ps(t, "modelValue"), i = O(!1);
    Oe(
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
      return v(), g("div", Ff, [
        i.value ? (v(), K(r(_s), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (v(), g("div", If, [
          s.value && ((_ = c()) != null && _.folders.length) ? (v(), K(r(Zo), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : N("", !0),
          s.value ? N("", !0) : (v(), K(r(Xo), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Hf = { class: "vuefinder__treesubfolderlist__item-content" }, Rf = ["onClick"], Bf = ["title", "onClick"], Uf = { class: "vuefinder__treesubfolderlist__item-icon" }, Nf = { class: "vuefinder__treesubfolderlist__subfolder" }, Pf = {
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
    const e = re("ServiceContainer"), n = O([]), o = t, s = O(null);
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
      return v(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (v(!0), g(ye, null, $e(i.value, (d, _) => (v(), g("li", {
          key: d.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          a("div", Hf, [
            a("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (f) => n.value[d.path] = !n.value[d.path]
            }, [
              j(Jo, {
                adapter: t.adapter,
                path: d.path,
                modelValue: n.value[d.path],
                "onUpdate:modelValue": (f) => n.value[d.path] = f
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Rf),
            a("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: d.path,
              onClick: (f) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o.adapter, path: d.path } })
            }, [
              a("div", Uf, [
                r(e).fs.path === d.path ? (v(), K(r(Yo), { key: 0 })) : (v(), K(r(kn), { key: 1 }))
              ]),
              a("div", {
                class: le(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": r(e).fs.path === d.path
                }])
              }, b(d.basename), 3)
            ], 8, Bf)
          ]),
          a("div", Nf, [
            _e(j(l, {
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
}, qf = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, o = O(!1);
    function s(i) {
      i === e.fs.adapter ? o.value = !o.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: i } }), n("adapter", i));
    }
    return (i, c) => (v(), g(ye, null, [
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
            j(r(hf))
          ], 2),
          a("div", null, b(t.storage), 1)
        ], 2),
        a("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: c[1] || (c[1] = et((u) => o.value = !o.value, ["stop"]))
        }, [
          j(Jo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: o.value,
            "onUpdate:modelValue": c[0] || (c[0] = (u) => o.value = u)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      _e(j(Pf, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [ze, o.value]
      ])
    ], 64));
  }
}, zf = { class: "vuefinder__folder-indicator" }, jf = { class: "vuefinder__folder-indicator--icon" }, Gf = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Ps(t, "modelValue");
    return (n, o) => (v(), g("div", zf, [
      a("div", jf, [
        e.value ? (v(), K(r(Zo), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : N("", !0),
        e.value ? N("", !0) : (v(), K(r(Xo), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, Wf = { class: "vuefinder__treeview__header" }, Kf = { class: "vuefinder__treeview__pinned-label" }, Yf = { class: "vuefinder__treeview__pin-text text-nowrap" }, Xf = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Zf = { class: "vuefinder__treeview__pinned-item" }, Qf = ["onClick"], Jf = ["title"], ev = ["onClick"], tv = { key: 0 }, nv = { class: "vuefinder__treeview__no-pinned" }, sv = { class: "vuefinder__treeview__storage" }, ov = {
  __name: "TreeView",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { getStore: o, setStore: s } = e.storage, i = O(190), c = O(o("pinned-folders-opened", !0));
    Oe(c, (_) => s("pinned-folders-opened", _));
    const u = (_) => {
      e.pinnedFolders = e.pinnedFolders.filter((f) => f.path !== _.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, l = (_) => {
      const f = _.clientX, p = _.target.parentElement, m = p.getBoundingClientRect().width;
      p.classList.remove("transition-[width]"), p.classList.add("transition-none");
      const h = (x) => {
        i.value = m + x.clientX - f, i.value < 50 && (i.value = 0, e.showTreeView = !1), i.value > 50 && (e.showTreeView = !0);
      }, w = () => {
        const x = p.getBoundingClientRect();
        i.value = x.width, p.classList.add("transition-[width]"), p.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", w);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", w);
    }, d = O(null);
    return Ce(() => {
      Ne(d.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Oe(e.fs.data, (_, f) => {
      const p = _.files.filter((m) => m.type === "dir");
      Qo(e.treeViewData, { path: e.fs.path, folders: p.map((m) => ({
        adapter: m.storage,
        path: m.path,
        basename: m.basename
      })) });
    }), (_, f) => (v(), g(ye, null, [
      a("div", {
        onClick: f[0] || (f[0] = (p) => r(e).showTreeView = !r(e).showTreeView),
        class: le(["vuefinder__treeview__overlay", r(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      a("div", {
        style: fn(r(e).showTreeView ? "min-width:100px;max-width:75%; width: " + i.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        a("div", {
          ref_key: "treeViewScrollElement",
          ref: d,
          class: "vuefinder__treeview__scroll"
        }, [
          a("div", Wf, [
            a("div", {
              onClick: f[2] || (f[2] = (p) => c.value = !c.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              a("div", Kf, [
                j(r(Ko), { class: "vuefinder__treeview__pin-icon" }),
                a("div", Yf, b(r(n)("Pinned Folders")), 1)
              ]),
              j(Gf, {
                modelValue: c.value,
                "onUpdate:modelValue": f[1] || (f[1] = (p) => c.value = p)
              }, null, 8, ["modelValue"])
            ]),
            c.value ? (v(), g("ul", Xf, [
              (v(!0), g(ye, null, $e(r(e).pinnedFolders, (p) => (v(), g("li", Zf, [
                a("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (m) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: p.storage, path: p.path } })
                }, [
                  r(e).fs.path !== p.path ? (v(), K(r(kn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : N("", !0),
                  r(e).fs.path === p.path ? (v(), K(r(Yo), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : N("", !0),
                  a("div", {
                    title: p.path,
                    class: le(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": r(e).fs.path === p.path
                    }])
                  }, b(p.basename), 11, Jf)
                ], 8, Qf),
                a("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (m) => u(p)
                }, [
                  j(r(Mf), { class: "vuefinder__treeview__remove-icon" })
                ], 8, ev)
              ]))), 256)),
              r(e).pinnedFolders.length ? N("", !0) : (v(), g("li", tv, [
                a("div", nv, b(r(n)("No folders pinned")), 1)
              ]))
            ])) : N("", !0)
          ]),
          (v(!0), g(ye, null, $e(r(e).fs.data.storages, (p) => (v(), g("div", sv, [
            j(qf, { storage: p }, null, 8, ["storage"])
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
class rv {
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
function Be(t, e) {
  return t.map((n) => new rv(n.title, n.action, n.link, {
    ...e,
    feature: n.key
  }));
}
const Te = {
  newfolder: {
    key: ue.NEW_FOLDER,
    title: ({ t }) => t("New Folder"),
    action: (t) => t.modal.open(Bo)
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
      t.modal.open(fs, { items: e });
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
    action: (t, e) => t.modal.open(vs, { items: e })
  }
}, av = [
  ...Be([Te.openDir], {
    needsSearchQuery: !0
  }),
  ...Be([Te.refresh, Te.selectAll, Te.newfolder], {
    target: null
  }),
  ...Be([Te.refresh, Te.archive, Te.delete], {
    target: "many"
  }),
  ...Be([Te.open], {
    targetType: "dir"
  }),
  ...Be([Te.unpinFolder], {
    targetType: "dir",
    show: (t, e) => t.pinnedFolders.findIndex((n) => {
      var o;
      return n.path === ((o = e.target) == null ? void 0 : o.path);
    }) !== -1
  }),
  ...Be([Te.pinFolder], {
    targetType: "dir",
    show: (t, e) => t.pinnedFolders.findIndex((n) => {
      var o;
      return n.path === ((o = e.target) == null ? void 0 : o.path);
    }) === -1
  }),
  ...Be([Te.preview, Te.download], {
    show: (t, e) => {
      var n;
      return ((n = e.target) == null ? void 0 : n.type) !== "dir";
    }
  }),
  ...Be([Te.rename], { numItems: "one" }),
  ...Be([Te.unarchive], {
    mimeType: "application/zip"
  }),
  ...Be([Te.archive], {
    show: (t, e) => {
      var n;
      return ((n = e.target) == null ? void 0 : n.mime_type) !== "application/zip";
    }
  }),
  ...Be([Te.delete], {})
], lv = { class: "vuefinder__main__content" }, iv = {
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
      default: () => av
    }
  },
  emits: ["select", "update:path"],
  setup(t, { emit: e }) {
    const n = e, o = t, s = Fa(o, re("VueFinderOptions"));
    fr("ServiceContainer", s);
    const { setStore: i } = s.storage, c = O(null);
    s.root = c;
    const u = s.dragSelect;
    vi(s);
    const l = (f) => {
      Object.assign(s.fs.data, f), u.clearSelection(), u.refreshSelection();
    };
    let d;
    s.emitter.on("vf-fetch-abort", () => {
      d.abort(), s.fs.loading = !1;
    }), s.emitter.on(
      "vf-fetch",
      ({
        params: f,
        body: p = null,
        onSuccess: m = null,
        onError: h = null,
        noCloseModal: w = !1
      }) => {
        ["index", "search"].includes(f.q) && (d && d.abort(), s.fs.loading = !0), d = new AbortController();
        const x = d.signal;
        s.requester.send({
          url: "",
          method: f.m || "get",
          params: f,
          body: p,
          abortSignal: x
        }).then((M) => {
          s.fs.adapter = M.adapter, s.persist && (s.fs.path = M.dirname, i("path", s.fs.path)), w || s.modal.close(), l(M), m && m(M);
        }).catch((M) => {
          console.error(M), h && h(M);
        }).finally(() => {
          ["index", "search"].includes(f.q) && (s.fs.loading = !1);
        });
      }
    );
    function _(f) {
      let p = {};
      f && f.includes("://") && (p = {
        adapter: f.split("://")[0],
        path: f
      }), s.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: s.fs.adapter, ...p },
        onError: o.onError ?? ((m) => {
          m.message && s.emitter.emit("vf-toast-push", {
            label: m.message,
            type: "error"
          });
        })
      });
    }
    return Ce(() => {
      _(s.fs.path), Oe(
        () => o.path,
        (f) => {
          _(f);
        }
      ), u.onSelect((f) => {
        n("select", f);
      }), Oe(
        () => s.fs.data.dirname,
        (f) => {
          n("update:path", f);
        }
      );
    }), (f, p) => (v(), g("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: c,
      tabindex: "0"
    }, [
      a("div", {
        class: le(r(s).theme.actualValue)
      }, [
        a("div", {
          class: le([
            r(s).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          style: fn(
            r(s).fullScreen ? "" : "max-height: " + t.maxHeight + ";height: " + t.maxHeight
          ),
          onMousedown: p[0] || (p[0] = (m) => r(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (m) => r(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          j(Rc),
          j(Hd),
          a("div", lv, [
            j(ov),
            j(uf)
          ]),
          j($f)
        ], 38),
        j(vr, { name: "fade" }, {
          default: J(() => [
            r(s).modal.visible ? (v(), K(Us(r(s).modal.type), { key: 0 })) : N("", !0)
          ]),
          _: 1
        }),
        j(_f)
      ], 2)
    ], 512));
  }
}, gv = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", iv);
  }
};
export {
  rv as SimpleContextMenuItem,
  av as contextMenuItems,
  gv as default
};
