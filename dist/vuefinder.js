var sr = Object.defineProperty;
var or = (t, e, n) => e in t ? sr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var En = (t, e, n) => or(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as St, watch as Oe, ref as O, shallowRef as rr, onMounted as Ce, onUnmounted as Qn, onUpdated as Bs, nextTick as vt, computed as ze, inject as ae, createElementBlock as g, openBlock as _, withKeys as Ft, unref as r, createElementVNode as a, withModifiers as Je, renderSlot as Dt, normalizeClass as ce, toDisplayString as b, createBlock as K, resolveDynamicComponent as Us, withCtx as te, createVNode as G, createCommentVNode as z, Fragment as ye, renderList as $e, withDirectives as pe, vModelCheckbox as Xt, createTextVNode as Q, vModelSelect as gs, vModelText as It, onBeforeUnmount as Ns, customRef as ar, vShow as je, isRef as lr, TransitionGroup as ir, normalizeStyle as fn, mergeModels as cr, useModel as Ps, resolveComponent as dr, provide as ur, Transition as fr } from "vue";
import vr from "mitt";
import _r from "dragselect";
import mr from "@uppy/core";
import pr from "@uppy/xhr-upload";
import hr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import gr from "cropperjs";
var Rs;
const Tn = (Rs = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Rs.getAttribute("content");
class br {
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
    let f;
    l !== "get" && (c instanceof FormData ? (f = c, n.body != null && Object.entries(this.config.body).forEach(([d, p]) => {
      f.append(d, p);
    })) : (f = { ...c }, n.body != null && Object.assign(f, this.config.body)));
    const v = {
      url: u,
      method: l,
      headers: s,
      params: i,
      body: f
    };
    if (n.transformRequest != null) {
      const d = n.transformRequest({
        url: u,
        method: l,
        headers: s,
        params: i,
        body: f
      });
      d.url != null && (v.url = d.url), d.method != null && (v.method = d.method), d.params != null && (v.params = d.params ?? {}), d.headers != null && (v.headers = d.headers ?? {}), d.body != null && (v.body = d.body);
    }
    return v;
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
function wr(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token",
    fetchParams: {}
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new br(e);
}
function yr(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = St(JSON.parse(e ?? "{}"));
  Oe(n, o);
  function o() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function s(l, f) {
    n[l] = f;
  }
  function i(l) {
    delete n[l];
  }
  function c() {
    Object.keys(n).map((l) => i(l));
  }
  return { getStore: (l, f = null) => n.hasOwnProperty(l) ? n[l] : f, setStore: s, removeStore: i, clearStore: c };
}
async function kr(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function xr(t, e, n, o) {
  const { getStore: s, setStore: i } = t, c = O({}), u = O(s("locale", e)), l = (d, p = e) => {
    kr(d, o).then((m) => {
      c.value = m, i("locale", d), u.value = d, i("translations", m), Object.values(o).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + d }), n.emit("vf-language-saved"));
    }).catch((m) => {
      p ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), l(p, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Oe(u, (d) => {
    l(d);
  }), !s("locale") && !o.length ? l(e) : c.value = s("translations");
  const f = (d, ...p) => p.length ? f(d = d.replace("%s", p.shift()), ...p) : d;
  function v(d, ...p) {
    return c.value && c.value.hasOwnProperty(d) ? f(c.value[d], ...p) : f(d, ...p);
  }
  return St({ t: v, locale: u });
}
const ve = {
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
}, Sr = Object.values(ve), $r = "2.8.0";
function qs(t, e, n, o, s) {
  return (e = Math, n = e.log, o = 1024, s = n(t) / n(o) | 0, t / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function zs(t, e, n, o, s) {
  return (e = Math, n = e.log, o = 1e3, s = n(t) / n(o) | 0, t / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function Cr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, o = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return o[1] * Math.pow(1024, e[o[2].toLowerCase()]);
}
const ot = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function Er(t, e) {
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
function Tr() {
  const t = rr(null), e = O(!1), n = O();
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
  const u = (v, d) => {
    const p = i, m = v, h = d || (o ? !o(p, m) : p !== m);
    return (h || s) && (i = m, c = p), [i, h, c];
  };
  return [e ? (v) => u(e(i, c), v) : u, (v) => [i, !!v, c]];
}, Ar = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, Le = Ar ? window : {}, js = Math.max, Mr = Math.min, In = Math.round, sn = Math.abs, bs = Math.sign, Gs = Le.cancelAnimationFrame, Jn = Le.requestAnimationFrame, on = Le.setTimeout, Hn = Le.clearTimeout, vn = (t) => typeof Le[t] < "u" ? Le[t] : void 0, Dr = vn("MutationObserver"), ws = vn("IntersectionObserver"), pt = vn("ResizeObserver"), Mt = vn("ScrollTimeline"), es = (t) => t === void 0, _n = (t) => t === null, We = (t) => typeof t == "number", Ht = (t) => typeof t == "string", mn = (t) => typeof t == "boolean", Be = (t) => typeof t == "function", Ye = (t) => Array.isArray(t), rn = (t) => typeof t == "object" && !Ye(t) && !_n(t), ts = (t) => {
  const e = !!t && t.length, n = We(e) && e > -1 && e % 1 == 0;
  return Ye(t) || !Be(t) && n ? e > 0 && rn(t) ? e - 1 in t : !0 : !1;
}, an = (t) => !!t && t.constructor === Object, ln = (t) => t instanceof HTMLElement, pn = (t) => t instanceof Element;
function le(t, e) {
  if (ts(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && le(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const Ws = (t, e) => t.indexOf(e) >= 0, Ot = (t, e) => t.concat(e), he = (t, e, n) => (!Ht(e) && ts(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), it = (t) => Array.from(t || []), ns = (t) => Ye(t) ? t : !Ht(t) && ts(t) ? it(t) : [t], Rn = (t) => !!t && !t.length, Bn = (t) => it(new Set(t)), Ie = (t, e, n) => {
  le(t, (s) => s ? s.apply(void 0, e || []) : !0), n || (t.length = 0);
}, Ys = "paddingTop", Ks = "paddingRight", Xs = "paddingLeft", Zs = "paddingBottom", Qs = "marginLeft", Js = "marginRight", eo = "marginBottom", to = "overflowX", no = "overflowY", hn = "width", gn = "height", rt = "visible", ft = "hidden", yt = "scroll", Or = (t) => {
  const e = String(t || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, bn = (t, e, n, o) => {
  if (t && e) {
    let s = !0;
    return le(n, (i) => {
      const c = t[i], u = e[i];
      c !== u && (s = !1);
    }), s;
  }
  return !1;
}, so = (t, e) => bn(t, e, ["w", "h"]), en = (t, e) => bn(t, e, ["x", "y"]), Lr = (t, e) => bn(t, e, ["t", "r", "b", "l"]), at = () => {
}, X = (t, ...e) => t.bind(0, ...e), ht = (t) => {
  let e;
  const n = t ? on : Jn, o = t ? Hn : Gs;
  return [(s) => {
    o(e), e = n(() => s(), Be(t) ? t() : t);
  }, () => o(e)];
}, cn = (t, e) => {
  const { _: n, p: o, v: s, S: i } = e || {};
  let c, u, l, f, v = at;
  const d = function(x) {
    v(), Hn(c), f = c = u = void 0, v = at, t.apply(this, x);
  }, p = (w) => i && u ? i(u, w) : w, m = () => {
    v !== at && d(p(l) || l);
  }, h = function() {
    const x = it(arguments), M = Be(n) ? n() : n;
    if (We(M) && M >= 0) {
      const L = Be(o) ? o() : o, y = We(L) && L >= 0, V = M > 0 ? on : Jn, H = M > 0 ? Hn : Gs, T = p(x) || x, $ = d.bind(0, T);
      let C;
      v(), s && !f ? ($(), f = !0, C = V(() => f = void 0, M)) : (C = V($, M), y && !c && (c = on(m, L))), v = () => H(C), u = l = T;
    } else
      d(x);
  };
  return h.m = m, h;
}, oo = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Ue = (t) => t ? Object.keys(t) : [], oe = (t, e, n, o, s, i, c) => {
  const u = [e, n, o, s, i, c];
  return (typeof t != "object" || _n(t)) && !Be(t) && (t = {}), le(u, (l) => {
    le(l, (f, v) => {
      const d = l[v];
      if (t === d)
        return !0;
      const p = Ye(d);
      if (d && an(d)) {
        const m = t[v];
        let h = m;
        p && !Ye(m) ? h = [] : !p && !an(m) && (h = {}), t[v] = oe(h, d);
      } else
        t[v] = p ? d.slice() : d;
    });
  }), t;
}, ro = (t, e) => le(oe({}, t), (n, o, s) => {
  n === void 0 ? delete s[o] : n && an(n) && (s[o] = ro(n));
}), ss = (t) => !Ue(t).length, ao = (t, e, n) => js(t, Mr(e, n)), _t = (t) => Bn((Ye(t) ? t : (t || "").split(" ")).filter((e) => e)), os = (t, e) => t && t.getAttribute(e), ys = (t, e) => t && t.hasAttribute(e), Ze = (t, e, n) => {
  le(_t(e), (o) => {
    t && t.setAttribute(o, String(n || ""));
  });
}, qe = (t, e) => {
  le(_t(e), (n) => t && t.removeAttribute(n));
}, wn = (t, e) => {
  const n = _t(os(t, e)), o = X(Ze, t, e), s = (i, c) => {
    const u = new Set(n);
    return le(_t(i), (l) => {
      u[c](l);
    }), it(u).join(" ");
  };
  return {
    O: (i) => o(s(i, "delete")),
    $: (i) => o(s(i, "add")),
    C: (i) => {
      const c = _t(i);
      return c.reduce((u, l) => u && n.includes(l), c.length > 0);
    }
  };
}, lo = (t, e, n) => (wn(t, e).O(n), X(rs, t, e, n)), rs = (t, e, n) => (wn(t, e).$(n), X(lo, t, e, n)), dn = (t, e, n, o) => (o ? rs : lo)(t, e, n), as = (t, e, n) => wn(t, e).C(n), io = (t) => wn(t, "class"), co = (t, e) => {
  io(t).O(e);
}, ls = (t, e) => (io(t).$(e), X(co, t, e)), uo = (t, e) => {
  const n = e ? pn(e) && e : document;
  return n ? it(n.querySelectorAll(t)) : [];
}, Vr = (t, e) => {
  const n = e ? pn(e) && e : document;
  return n && n.querySelector(t);
}, Un = (t, e) => pn(t) && t.matches(e), fo = (t) => Un(t, "body"), Nn = (t) => t ? it(t.childNodes) : [], Lt = (t) => t && t.parentElement, gt = (t, e) => pn(t) && t.closest(e), Pn = (t) => document.activeElement, Fr = (t, e, n) => {
  const o = gt(t, e), s = t && Vr(n, o), i = gt(s, e) === o;
  return o && s ? o === t || s === t || i && gt(gt(t, n), e) !== o : !1;
}, kt = (t) => {
  le(ns(t), (e) => {
    const n = Lt(e);
    e && n && n.removeChild(e);
  });
}, De = (t, e) => X(kt, t && e && le(ns(e), (n) => {
  n && t.appendChild(n);
}));
let vo;
const Ir = () => vo, Hr = (t) => {
  vo = t;
}, bt = (t) => {
  const e = document.createElement("div");
  return Ze(e, "class", t), e;
}, _o = (t) => {
  const e = bt(), n = Ir(), o = t.trim();
  return e.innerHTML = n ? n.createHTML(o) : o, le(Nn(e), (s) => kt(s));
}, ks = (t, e) => t.getPropertyValue(e) || t[e] || "", mo = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Zt = (t) => mo(parseFloat(t || "")), qn = (t) => Math.round(t * 1e4) / 1e4, po = (t) => `${qn(mo(t))}px`;
function Vt(t, e) {
  t && e && le(e, (n, o) => {
    try {
      const s = t.style, i = _n(n) || mn(n) ? "" : We(n) ? po(n) : n;
      o.indexOf("--") === 0 ? s.setProperty(o, i) : s[o] = i;
    } catch {
    }
  });
}
function et(t, e, n) {
  const o = Ht(e);
  let s = o ? "" : {};
  if (t) {
    const i = Le.getComputedStyle(t, n) || t.style;
    s = o ? ks(i, e) : it(e).reduce((c, u) => (c[u] = ks(i, u), c), s);
  }
  return s;
}
const xs = (t, e, n) => {
  const o = e ? `${e}-` : "", s = n ? `-${n}` : "", i = `${o}top${s}`, c = `${o}right${s}`, u = `${o}bottom${s}`, l = `${o}left${s}`, f = et(t, [i, c, u, l]);
  return {
    t: Zt(f[i]),
    r: Zt(f[c]),
    b: Zt(f[u]),
    l: Zt(f[l])
  };
}, An = (t, e) => `translate${rn(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, Rr = (t) => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length), Br = {
  w: 0,
  h: 0
}, yn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : Br, Ur = (t) => yn("inner", t || Le), wt = X(yn, "offset"), ho = X(yn, "client"), un = X(yn, "scroll"), is = (t) => {
  const e = parseFloat(et(t, hn)) || 0, n = parseFloat(et(t, gn)) || 0;
  return {
    w: e - In(e),
    h: n - In(n)
  };
}, Mn = (t) => t.getBoundingClientRect(), Nr = (t) => !!t && Rr(t), zn = (t) => !!(t && (t[gn] || t[hn])), go = (t, e) => {
  const n = zn(t);
  return !zn(e) && n;
}, Ss = (t, e, n, o) => {
  le(_t(e), (s) => {
    t && t.removeEventListener(s, n, o);
  });
}, fe = (t, e, n, o) => {
  var s;
  const i = (s = o && o.H) != null ? s : !0, c = o && o.I || !1, u = o && o.A || !1, l = {
    passive: i,
    capture: c
  };
  return X(Ie, _t(e).map((f) => {
    const v = u ? (d) => {
      Ss(t, f, v, c), n && n(d);
    } : n;
    return t && t.addEventListener(f, v, l), X(Ss, t, f, v, c);
  }));
}, bo = (t) => t.stopPropagation(), jn = (t) => t.preventDefault(), wo = (t) => bo(t) || jn(t), Ge = (t, e) => {
  const { x: n, y: o } = We(e) ? {
    x: e,
    y: e
  } : e || {};
  We(n) && (t.scrollLeft = n), We(o) && (t.scrollTop = o);
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
}), Pr = (t, e) => {
  const { D: n, M: o } = t, { w: s, h: i } = e, c = (d, p, m) => {
    let h = bs(d) * m, w = bs(p) * m;
    if (h === w) {
      const x = sn(d), M = sn(p);
      w = x > M ? 0 : w, h = x < M ? 0 : h;
    }
    return h = h === w ? 0 : h, [h + 0, w + 0];
  }, [u, l] = c(n.x, o.x, s), [f, v] = c(n.y, o.y, i);
  return {
    D: {
      x: u,
      y: f
    },
    M: {
      x: l,
      y: v
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
  le(ns(e), t);
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
      const f = e.get(i) || /* @__PURE__ */ new Set();
      return e.set(i, f), Cs((v) => {
        Be(v) && f.add(v);
      }, c), X(n, i, c);
    }
    mn(c) && c && n();
    const u = Ue(i), l = [];
    return le(u, (f) => {
      const v = i[f];
      v && he(l, o(f, v));
    }), X(Ie, l);
  }, s = (i, c) => {
    le(it(e.get(i)), (u) => {
      c && !Rn(c) ? u.apply(0, c) : u();
    });
  };
  return o(t || {}), [o, n, s];
}, ko = {}, xo = {}, qr = (t) => {
  le(t, (e) => le(e, (n, o) => {
    ko[o] = e[o];
  }));
}, So = (t, e, n) => Ue(t).map((o) => {
  const { static: s, instance: i } = t[o], [c, u, l] = n || [], f = n ? i : s;
  if (f) {
    const v = n ? f(c, u, e) : f(e);
    return (l || xo)[o] = v;
  }
}), Rt = (t) => xo[t], zr = "__osOptionsValidationPlugin", $t = "data-overlayscrollbars", tn = "os-environment", Qt = `${tn}-scrollbar-hidden`, On = `${$t}-initialize`, nn = "noClipping", Es = `${$t}-body`, lt = $t, jr = "host", Qe = `${$t}-viewport`, Gr = to, Wr = no, Yr = "arrange", $o = "measuring", Kr = "scrolling", Co = "scrollbarHidden", Xr = "noContent", Yn = `${$t}-padding`, Ts = `${$t}-content`, cs = "os-size-observer", Zr = `${cs}-appear`, Qr = `${cs}-listener`, Jr = "os-trinsic-observer", ea = "os-theme-none", He = "os-scrollbar", ta = `${He}-rtl`, na = `${He}-horizontal`, sa = `${He}-vertical`, Eo = `${He}-track`, ds = `${He}-handle`, oa = `${He}-visible`, ra = `${He}-cornerless`, As = `${He}-interaction`, Ms = `${He}-unusable`, Kn = `${He}-auto-hide`, Ds = `${Kn}-hidden`, Os = `${He}-wheel`, aa = `${Eo}-interactive`, la = `${ds}-interactive`, ia = "__osSizeObserverPlugin", ca = (t, e) => {
  const { T: n } = e, [o, s] = t("showNativeOverlaidScrollbars");
  return [o && n.x && n.y, s];
}, xt = (t) => t.indexOf(rt) === 0, da = (t, e) => {
  const n = (s, i, c, u) => {
    const l = s === rt ? ft : s.replace(`${rt}-`, ""), f = xt(s), v = xt(c);
    return !i && !u ? ft : f && v ? rt : f ? i && u ? l : i ? rt : ft : i ? l : v && u ? rt : ft;
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
}, To = "__osScrollbarsHidingPlugin", ua = "__osClickScrollPlugin", Ls = (t) => JSON.stringify(t, (e, n) => {
  if (Be(n))
    throw 0;
  return n;
}), Vs = (t, e) => t ? `${e}`.split(".").reduce((n, o) => n && oo(n, o) ? n[o] : void 0, t) : void 0, fa = {
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
  const n = {}, o = Ot(Ue(e), Ue(t));
  return le(o, (s) => {
    const i = t[s], c = e[s];
    if (rn(i) && rn(c))
      oe(n[s] = {}, Ao(i, c)), ss(n[s]) && delete n[s];
    else if (oo(e, s) && c !== i) {
      let u = !0;
      if (Ye(i) || Ye(c))
        try {
          Ls(i) === Ls(c) && (u = !1);
        } catch {
        }
      u && (n[s] = c);
    }
  }), n;
}, Fs = (t, e, n) => (o) => [Vs(t, o), n || Vs(e, o) !== void 0];
let Mo;
const va = () => Mo, _a = (t) => {
  Mo = t;
};
let Ln;
const ma = () => {
  const t = (y, V, H) => {
    De(document.body, y), De(document.body, y);
    const E = ho(y), T = wt(y), $ = is(V);
    return H && kt(y), {
      x: T.h - E.h + $.h,
      y: T.w - E.w + $.w
    };
  }, e = (y) => {
    let V = !1;
    const H = ls(y, Qt);
    try {
      V = et(y, "scrollbar-width") === "none" || et(y, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return H(), V;
  }, n = `.${tn}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${tn} div{width:200%;height:200%;margin:10px 0}.${Qt}{scrollbar-width:none!important}.${Qt}::-webkit-scrollbar,.${Qt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, s = _o(`<div class="${tn}"><div></div><style>${n}</style></div>`)[0], i = s.firstChild, c = s.lastChild, u = va();
  u && (c.nonce = u);
  const [l, , f] = Wn(), [v, d] = Ve({
    o: t(s, i),
    i: en
  }, X(t, s, i, !0)), [p] = d(), m = e(s), h = {
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
  }, x = oe({}, fa), M = X(oe, {}, x), I = X(oe, {}, w), L = {
    N: p,
    T: h,
    P: m,
    G: !!Mt,
    K: X(l, "r"),
    Z: I,
    tt: (y) => oe(w, y) && I(),
    nt: M,
    ot: (y) => oe(x, y) && M(),
    st: oe({}, w),
    et: oe({}, x)
  };
  if (qe(s, "style"), kt(s), fe(Le, "resize", () => {
    f("r", []);
  }), Be(Le.matchMedia) && !m && (!h.x || !h.y)) {
    const y = (V) => {
      const H = Le.matchMedia(`(resolution: ${Le.devicePixelRatio}dppx)`);
      fe(H, "change", () => {
        V(), y(V);
      }, {
        A: !0
      });
    };
    y(() => {
      const [V, H] = v();
      oe(L.N, V), f("r", [H]);
    });
  }
  return L;
}, Ke = () => (Ln || (Ln = ma()), Ln), pa = (t, e, n) => {
  let o = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, i = () => {
    o = !0;
  }, c = (u) => {
    if (s && n) {
      const l = n.map((f) => {
        const [v, d] = f || [];
        return [d && v ? (u || uo)(v, t) : [], d];
      });
      le(l, (f) => le(f[0], (v) => {
        const d = f[1], p = s.get(v) || [];
        if (t.contains(v) && d) {
          const h = fe(v, d, (w) => {
            o ? (h(), s.delete(v)) : e(w);
          });
          s.set(v, he(p, h));
        } else
          Ie(p), s.delete(v);
      }));
    }
  };
  return c(), [i, c];
}, Is = (t, e, n, o) => {
  let s = !1;
  const { ct: i, rt: c, lt: u, it: l, ut: f, ft: v } = o || {}, d = cn(() => s && n(!0), {
    _: 33,
    p: 99
  }), [p, m] = pa(t, d, u), h = i || [], w = c || [], x = Ot(h, w), M = (L, y) => {
    if (!Rn(y)) {
      const V = f || at, H = v || at, E = [], T = [];
      let $ = !1, C = !1;
      if (le(y, (F) => {
        const { attributeName: D, target: R, type: k, oldValue: U, addedNodes: N, removedNodes: J } = F, se = k === "attributes", ne = k === "childList", _e = t === R, Y = se && D, S = Y && os(R, D || ""), B = Ht(S) ? S : null, P = Y && U !== B, A = Ws(w, D) && P;
        if (e && (ne || !_e)) {
          const j = se && P, q = j && l && Un(R, l), Z = (q ? !V(R, D, U, B) : !se || j) && !H(F, !!q, t, o);
          le(N, (re) => he(E, re)), le(J, (re) => he(E, re)), C = C || Z;
        }
        !e && _e && P && !V(R, D, U, B) && (he(T, D), $ = $ || A);
      }), m((F) => Bn(E).reduce((D, R) => (he(D, uo(F, R)), Un(R, F) ? he(D, R) : D), [])), e)
        return !L && C && n(!1), [!1];
      if (!Rn(T) || $) {
        const F = [Bn(T), $];
        return L || n.apply(0, F), F;
      }
    }
  }, I = new Dr(X(M, !1));
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
      return d.m(), M(!0, I.takeRecords());
  }];
};
let ut = null;
const Do = (t, e, n) => {
  const { _t: o } = n || {}, s = Rt(ia), [i] = Ve({
    o: !1,
    u: !0
  });
  return () => {
    const c = [], l = _o(`<div class="${cs}"><div class="${Qr}"></div></div>`)[0], f = l.firstChild, v = (d) => {
      const p = d instanceof ResizeObserverEntry;
      let m = !1, h = !1;
      if (p) {
        const [w, , x] = i(d.contentRect), M = zn(w);
        h = go(w, x), m = !h && !M;
      } else
        h = d === !0;
      m || e({
        dt: !0,
        _t: h
      });
    };
    if (pt) {
      if (!mn(ut)) {
        const h = new pt(at);
        h.observe(t, {
          get box() {
            ut = !0;
          }
        }), ut = ut || !1, h.disconnect();
      }
      const d = cn(v, {
        _: 0,
        p: 0
      }), p = (h) => d(h.pop()), m = new pt(p);
      if (m.observe(ut ? t : f), he(c, [() => m.disconnect(), !ut && De(t, l)]), ut) {
        const h = new pt(p);
        h.observe(t, {
          box: "border-box"
        }), he(c, () => h.disconnect());
      }
    } else if (s) {
      const [d, p] = s(f, v, o);
      he(c, Ot([ls(l, Zr), fe(l, "animationstart", d), De(t, l)], p));
    } else
      return at;
    return X(Ie, c);
  };
}, ha = (t, e) => {
  let n;
  const o = (l) => l.h === 0 || l.isIntersecting || l.intersectionRatio > 0, s = bt(Jr), [i] = Ve({
    o: !1
  }), c = (l, f) => {
    if (l) {
      const v = i(o(l)), [, d] = v;
      return d && !f && e(v) && [v];
    }
  }, u = (l, f) => c(f.pop(), l);
  return [() => {
    const l = [];
    if (ws)
      n = new ws(X(u, !1), {
        root: t
      }), n.observe(s), he(l, () => {
        n.disconnect();
      });
    else {
      const f = () => {
        const v = wt(s);
        c(v);
      };
      he(l, Do(s, f)()), f();
    }
    return X(Ie, he(l, De(t, s)));
  }, () => n && u(!0, n.takeRecords())];
}, ga = (t, e, n, o) => {
  let s, i, c, u, l, f;
  const v = `[${lt}]`, d = `[${Qe}]`, p = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: m, ht: h, U: w, gt: x, bt: M, L: I, wt: L, yt: y, St: V, Ot: H } = t, E = (A) => et(A, "direction") === "rtl", T = {
    $t: !1,
    F: E(m)
  }, $ = Ke(), C = Rt(To), [F] = Ve({
    i: so,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const A = C && C.V(t, e, T, $, n).W, q = !(L && I) && as(h, lt, nn), W = !I && y(Yr), Z = W && Fe(x), re = Z && H(), ue = V($o, q), ie = W && A && A()[0], Ee = un(w), ee = is(w);
    return ie && ie(), Ge(x, Z), re && re(), q && ue(), {
      w: Ee.w + ee.w,
      h: Ee.h + ee.h
    };
  }), D = cn(o, {
    _: () => s,
    p: () => i,
    S(A, j) {
      const [q] = A, [W] = j;
      return [Ot(Ue(q), Ue(W)).reduce((Z, re) => (Z[re] = q[re] || W[re], Z), {})];
    }
  }), R = (A) => {
    const j = E(m);
    oe(A, {
      Ct: f !== j
    }), oe(T, {
      F: j
    }), f = j;
  }, k = (A, j) => {
    const [q, W] = A, Z = {
      xt: W
    };
    return oe(T, {
      $t: q
    }), j || o(Z), Z;
  }, U = ({ dt: A, _t: j }) => {
    const W = !(A && !j) && $.P ? D : o, Z = {
      dt: A || j,
      _t: j
    };
    R(Z), W(Z);
  }, N = (A, j) => {
    const [, q] = F(), W = {
      Ht: q
    };
    return R(W), q && !j && (A ? o : D)(W), W;
  }, J = (A, j, q) => {
    const W = {
      Et: j
    };
    return R(W), j && !q && D(W), W;
  }, [se, ne] = M ? ha(h, k) : [], _e = !I && Do(h, U, {
    _t: !0
  }), [Y, S] = Is(h, !1, J, {
    rt: p,
    ct: p
  }), B = I && pt && new pt((A) => {
    const j = A[A.length - 1].contentRect;
    U({
      dt: !0,
      _t: go(j, l)
    }), l = j;
  }), P = cn(() => {
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
    const A = _e && _e(), j = se && se(), q = Y(), W = $.K((Z) => {
      Z ? D({
        zt: Z
      }) : P();
    });
    return () => {
      B && B.disconnect(), A && A(), j && j(), u && u(), q(), W();
    };
  }, ({ It: A, At: j, Dt: q }) => {
    const W = {}, [Z] = A("update.ignoreMutation"), [re, ue] = A("update.attributes"), [ie, Ee] = A("update.elementEvents"), [ee, we] = A("update.debounce"), Me = Ee || ue, ke = j || q, xe = (ge) => Be(Z) && Z(ge);
    if (Me) {
      c && c(), u && u();
      const [ge, be] = Is(M || w, !0, N, {
        ct: Ot(p, re || []),
        lt: ie,
        it: v,
        ft: (me, de) => {
          const { target: Se, attributeName: Ae } = me;
          return (!de && Ae && !I ? Fr(Se, v, d) : !1) || !!gt(Se, `.${He}`) || !!xe(me);
        }
      });
      u = ge(), c = be;
    }
    if (we)
      if (D.m(), Ye(ee)) {
        const ge = ee[0], be = ee[1];
        s = We(ge) && ge, i = We(be) && be;
      } else We(ee) ? (s = ee, i = !1) : (s = !1, i = !1);
    if (ke) {
      const ge = S(), be = ne && ne(), me = c && c();
      ge && oe(W, J(ge[0], ge[1], ke)), be && oe(W, k(be[0], ke)), me && oe(W, N(me[0], ke));
    }
    return R(W), W;
  }, T];
}, Oo = (t, e) => Be(e) ? e.apply(0, t) : e, ba = (t, e, n, o) => {
  const s = es(o) ? n : o;
  return Oo(t, s) || e.apply(0, t);
}, Lo = (t, e, n, o) => {
  const s = es(o) ? n : o, i = Oo(t, s);
  return !!i && (ln(i) ? i : e.apply(0, t));
}, wa = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: o } = e || {}, { T: s, P: i, Z: c } = Ke(), { nativeScrollbarsOverlaid: u, body: l } = c().cancel, f = n ?? u, v = es(o) ? l : o, d = (s.x || s.y) && f, p = t && (_n(v) ? !i : v);
  return !!d || !!p;
}, ya = (t, e, n, o) => {
  const s = "--os-viewport-percent", i = "--os-scroll-percent", c = "--os-scroll-direction", { Z: u } = Ke(), { scrollbars: l } = u(), { slot: f } = l, { vt: v, ht: d, U: p, Mt: m, gt: h, wt: w, L: x } = e, { scrollbars: M } = m ? {} : t, { slot: I } = M || {}, L = [], y = [], V = [], H = Lo([v, d, p], () => x && w ? v : d, f, I), E = (Y) => {
    if (Mt) {
      let S = null, B = [];
      const P = new Mt({
        source: h,
        axis: Y
      }), A = () => {
        S && S.cancel(), S = null;
      };
      return {
        Rt: (q) => {
          const { Tt: W } = n, Z = Dn(W)[Y], re = Y === "x", ue = [An(0, re), An(`calc(100cq${re ? "w" : "h"} + -100%)`, re)], ie = Z ? ue : ue.reverse();
          return B[0] === ie[0] && B[1] === ie[1] || (A(), B = ie, S = q.kt.animate({
            clear: ["left"],
            transform: ie
          }, {
            timeline: P
          })), A;
        }
      };
    }
  }, T = {
    x: E("x"),
    y: E("y")
  }, $ = () => {
    const { Vt: Y, Lt: S } = n, B = (P, A) => ao(0, 1, P / (P + A) || 0);
    return {
      x: B(S.x, Y.x),
      y: B(S.y, Y.y)
    };
  }, C = (Y, S, B) => {
    const P = B ? ls : co;
    le(Y, (A) => {
      P(A.Ut, S);
    });
  }, F = (Y, S) => {
    le(Y, (B) => {
      const [P, A] = S(B);
      Vt(P, A);
    });
  }, D = (Y, S, B) => {
    const P = mn(B), A = P ? B : !0, j = P ? !B : !0;
    A && C(y, Y, S), j && C(V, Y, S);
  }, R = () => {
    const Y = $(), S = (B) => (P) => [P.Ut, {
      [s]: qn(B) + ""
    }];
    F(y, S(Y.x)), F(V, S(Y.y));
  }, k = () => {
    if (!Mt) {
      const { Tt: Y } = n, S = $s(Y, Fe(h)), B = (P) => (A) => [A.Ut, {
        [i]: qn(P) + ""
      }];
      F(y, B(S.x)), F(V, B(S.y));
    }
  }, U = () => {
    const { Tt: Y } = n, S = Dn(Y), B = (P) => (A) => [A.Ut, {
      [c]: P ? "0" : "1"
    }];
    F(y, B(S.x)), F(V, B(S.y)), Mt && (y.forEach(T.x.Rt), V.forEach(T.y.Rt));
  }, N = () => {
    if (x && !w) {
      const { Vt: Y, Tt: S } = n, B = Dn(S), P = $s(S, Fe(h)), A = (j) => {
        const { Ut: q } = j, W = Lt(q) === p && q, Z = (re, ue, ie) => {
          const Ee = ue * re;
          return po(ie ? Ee : -Ee);
        };
        return [W, W && {
          transform: An({
            x: Z(P.x, Y.x, B.x),
            y: Z(P.y, Y.y, B.y)
          })
        }];
      };
      F(y, A), F(V, A);
    }
  }, J = (Y) => {
    const S = Y ? "x" : "y", P = bt(`${He} ${Y ? na : sa}`), A = bt(Eo), j = bt(ds), q = {
      Ut: P,
      Pt: A,
      kt: j
    }, W = T[S];
    return he(Y ? y : V, q), he(L, [De(P, A), De(A, j), X(kt, P), W && W.Rt(q), o(q, D, Y)]), q;
  }, se = X(J, !0), ne = X(J, !1), _e = () => (De(H, y[0].Ut), De(H, V[0].Ut), X(Ie, L));
  return se(), ne(), [{
    Nt: R,
    qt: k,
    Bt: U,
    Ft: N,
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
  }, _e];
}, ka = (t, e, n, o) => (s, i, c) => {
  const { ht: u, U: l, L: f, gt: v, Kt: d, Ot: p } = e, { Ut: m, Pt: h, kt: w } = s, [x, M] = ht(333), [I, L] = ht(444), y = (E) => {
    Be(v.scrollBy) && v.scrollBy({
      behavior: "smooth",
      left: E.x,
      top: E.y
    });
  }, V = () => {
    const E = "pointerup pointercancel lostpointercapture", T = `client${c ? "X" : "Y"}`, $ = c ? hn : gn, C = c ? "left" : "top", F = c ? "w" : "h", D = c ? "x" : "y", R = (U, N) => (J) => {
      const { Vt: se } = n, ne = wt(h)[F] - wt(w)[F], Y = N * J / ne * se[D];
      Ge(v, {
        [D]: U + Y
      });
    }, k = [];
    return fe(h, "pointerdown", (U) => {
      const N = gt(U.target, `.${ds}`) === w, J = N ? w : h, se = t.scrollbars, ne = se[N ? "dragScroll" : "clickScroll"], { button: _e, isPrimary: Y, pointerType: S } = U, { pointers: B } = se;
      if (_e === 0 && Y && ne && (B || []).includes(S)) {
        Ie(k), L();
        const A = !N && (U.shiftKey || ne === "instant"), j = X(Mn, w), q = X(Mn, h), W = (de, Se) => (de || j())[C] - (Se || q())[C], Z = In(Mn(v)[$]) / wt(v)[F] || 1, re = R(Fe(v)[D], 1 / Z), ue = U[T], ie = j(), Ee = q(), ee = ie[$], we = W(ie, Ee) + ee / 2, Me = ue - Ee[C], ke = N ? 0 : Me - we, xe = (de) => {
          Ie(me), J.releasePointerCapture(de.pointerId);
        }, ge = N || A, be = p(), me = [fe(d, E, xe), fe(d, "selectstart", (de) => jn(de), {
          H: !1
        }), fe(h, E, xe), ge && fe(h, "pointermove", (de) => re(ke + (de[T] - ue))), ge && (() => {
          const de = Fe(v);
          be();
          const Se = Fe(v), Ae = {
            x: Se.x - de.x,
            y: Se.y - de.y
          };
          (sn(Ae.x) > 3 || sn(Ae.y) > 3) && (p(), Ge(v, de), y(Ae), I(be));
        })];
        if (J.setPointerCapture(U.pointerId), A)
          re(ke);
        else if (!N) {
          const de = Rt(ua);
          if (de) {
            const Se = de(re, ke, ee, (Ae) => {
              Ae ? be() : he(me, be);
            });
            he(me, Se), he(k, X(Se, !0));
          }
        }
      }
    });
  };
  let H = !0;
  return X(Ie, [fe(w, "pointermove pointerleave", o), fe(m, "pointerenter", () => {
    i(As, !0);
  }), fe(m, "pointerleave pointercancel", () => {
    i(As, !1);
  }), !f && fe(m, "mousedown", () => {
    const E = Pn();
    (ys(E, Qe) || ys(E, lt) || E === document.body) && on(X(Gn, l), 25);
  }), fe(m, "wheel", (E) => {
    const { deltaX: T, deltaY: $, deltaMode: C } = E;
    H && C === 0 && Lt(m) === u && y({
      x: T,
      y: $
    }), H = !1, i(Os, !0), x(() => {
      H = !0, i(Os);
    }), jn(E);
  }, {
    H: !1,
    I: !0
  }), fe(m, "pointerdown", X(fe, d, "click", wo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), V(), M, L]);
}, xa = (t, e, n, o, s, i) => {
  let c, u, l, f, v, d = at, p = 0;
  const m = ["mouse", "pen"], h = (S) => m.includes(S.pointerType), [w, x] = ht(), [M, I] = ht(100), [L, y] = ht(100), [V, H] = ht(() => p), [E, T] = ya(t, s, o, ka(e, s, o, (S) => h(S) && se())), { ht: $, Qt: C, wt: F } = s, { jt: D, Nt: R, qt: k, Bt: U, Ft: N } = E, J = (S, B) => {
    if (H(), S)
      D(Ds);
    else {
      const P = X(D, Ds, !0);
      p > 0 && !B ? V(P) : P();
    }
  }, se = () => {
    (l ? !c : !f) && (J(!0), M(() => {
      J(!1);
    }));
  }, ne = (S) => {
    D(Kn, S, !0), D(Kn, S, !1);
  }, _e = (S) => {
    h(S) && (c = l, l && J(!0));
  }, Y = [H, I, y, x, () => d(), fe($, "pointerover", _e, {
    A: !0
  }), fe($, "pointerenter", _e), fe($, "pointerleave", (S) => {
    h(S) && (c = !1, l && J(!1));
  }), fe($, "pointermove", (S) => {
    h(S) && u && se();
  }), fe(C, "scroll", (S) => {
    w(() => {
      k(), se();
    }), i(S), N();
  })];
  return [() => X(Ie, he(Y, T())), ({ It: S, Dt: B, Zt: P, tn: A }) => {
    const { nn: j, sn: q, en: W, cn: Z } = A || {}, { Ct: re, _t: ue } = P || {}, { F: ie } = n, { T: Ee } = Ke(), { k: ee, rn: we } = o, [Me, ke] = S("showNativeOverlaidScrollbars"), [xe, ge] = S("scrollbars.theme"), [be, me] = S("scrollbars.visibility"), [de, Se] = S("scrollbars.autoHide"), [Ae, Ct] = S("scrollbars.autoHideSuspend"), [Bt] = S("scrollbars.autoHideDelay"), [Ut, Nt] = S("scrollbars.dragScroll"), [dt, Et] = S("scrollbars.clickScroll"), [Pt, xn] = S("overflow"), Sn = ue && !B, $n = we.x || we.y, Pe = j || q || Z || re || B, Cn = W || me || xn, qt = Me && Ee.x && Ee.y, zt = (st, Tt, At) => {
      const jt = st.includes(yt) && (be === rt || be === "auto" && Tt === yt);
      return D(oa, jt, At), jt;
    };
    if (p = Bt, Sn && (Ae && $n ? (ne(!1), d(), L(() => {
      d = fe(C, "scroll", X(ne, !0), {
        A: !0
      });
    })) : ne(!0)), ke && D(ea, qt), ge && (D(v), D(xe, !0), v = xe), Ct && !Ae && ne(!0), Se && (u = de === "move", l = de === "leave", f = de === "never", J(f, !0)), Nt && D(la, Ut), Et && D(aa, !!dt), Cn) {
      const st = zt(Pt.x, ee.x, !0), Tt = zt(Pt.y, ee.y, !1);
      D(ra, !(st && Tt));
    }
    Pe && (k(), R(), N(), Z && U(), D(Ms, !we.x, !0), D(Ms, !we.y, !1), D(ta, ie && !F));
  }, {}, E];
}, Sa = (t) => {
  const e = Ke(), { Z: n, P: o } = e, { elements: s } = n(), { padding: i, viewport: c, content: u } = s, l = ln(t), f = l ? {} : t, { elements: v } = f, { padding: d, viewport: p, content: m } = v || {}, h = l ? t : f.target, w = fo(h), x = h.ownerDocument, M = x.documentElement, I = () => x.defaultView || Le, L = X(ba, [h]), y = X(Lo, [h]), V = X(bt, ""), H = X(L, V, c), E = X(y, V, u), T = (ee) => {
    const we = wt(ee), Me = un(ee), ke = et(ee, to), xe = et(ee, no);
    return Me.w - we.w > 0 && !xt(ke) || Me.h - we.h > 0 && !xt(xe);
  }, $ = H(p), C = $ === h, F = C && w, D = !C && E(m), R = !C && $ === D, k = F ? M : $, U = F ? k : h, N = !C && y(V, i, d), J = !R && D, se = [J, k, N, U].map((ee) => ln(ee) && !Lt(ee) && ee), ne = (ee) => ee && Ws(se, ee), _e = !ne(k) && T(k) ? k : h, Y = F ? M : k, B = {
    vt: h,
    ht: U,
    U: k,
    ln: N,
    bt: J,
    gt: Y,
    Qt: F ? x : k,
    an: w ? M : _e,
    Kt: x,
    wt: w,
    Mt: l,
    L: C,
    un: I,
    yt: (ee) => as(k, Qe, ee),
    St: (ee, we) => dn(k, Qe, ee, we),
    Ot: () => dn(Y, Qe, Kr, !0)
  }, { vt: P, ht: A, ln: j, U: q, bt: W } = B, Z = [() => {
    qe(A, [lt, On]), qe(P, On), w && qe(M, [On, lt]);
  }];
  let re = Nn([W, q, j, A, P].find((ee) => ee && !ne(ee)));
  const ue = F ? P : W || q, ie = X(Ie, Z);
  return [B, () => {
    const ee = I(), we = Pn(), Me = (me) => {
      De(Lt(me), Nn(me)), kt(me);
    }, ke = (me) => fe(me, "focusin focusout focus blur", wo, {
      I: !0,
      H: !1
    }), xe = "tabindex", ge = os(q, xe), be = ke(we);
    return Ze(A, lt, C ? "" : jr), Ze(j, Yn, ""), Ze(q, Qe, ""), Ze(W, Ts, ""), C || (Ze(q, xe, ge || "-1"), w && Ze(M, Es, "")), De(ue, re), De(A, j), De(j || A, !C && q), De(q, W), he(Z, [be, () => {
      const me = Pn(), de = ne(q), Se = de && me === q ? P : me, Ae = ke(Se);
      qe(j, Yn), qe(W, Ts), qe(q, Qe), w && qe(M, Es), ge ? Ze(q, xe, ge) : qe(q, xe), ne(W) && Me(W), de && Me(q), ne(j) && Me(j), Gn(Se), Ae();
    }]), o && !C && (rs(q, Qe, Co), he(Z, X(qe, q, Qe))), Gn(!C && w && we === P && ee.top === ee ? q : we), be(), re = 0, ie;
  }, ie];
}, $a = ({ bt: t }) => ({ Zt: e, fn: n, Dt: o }) => {
  const { xt: s } = e || {}, { $t: i } = n;
  t && (s || o) && Vt(t, {
    [gn]: i && "100%"
  });
}, Ca = ({ ht: t, ln: e, U: n, L: o }, s) => {
  const [i, c] = Ve({
    i: Lr,
    o: xs()
  }, X(xs, t, "padding", ""));
  return ({ It: u, Zt: l, fn: f, Dt: v }) => {
    let [d, p] = c(v);
    const { P: m } = Ke(), { dt: h, Ht: w, Ct: x } = l || {}, { F: M } = f, [I, L] = u("paddingAbsolute");
    (h || p || (v || w)) && ([d, p] = i(v));
    const V = !o && (L || x || p);
    if (V) {
      const H = !I || !e && !m, E = d.r + d.l, T = d.t + d.b, $ = {
        [Js]: H && !M ? -E : 0,
        [eo]: H ? -T : 0,
        [Qs]: H && M ? -E : 0,
        top: H ? -d.t : 0,
        right: H ? M ? -d.r : "auto" : 0,
        left: H ? M ? "auto" : -d.l : 0,
        [hn]: H && `calc(100% + ${E}px)`
      }, C = {
        [Ys]: H ? d.t : 0,
        [Ks]: H ? d.r : 0,
        [Zs]: H ? d.b : 0,
        [Xs]: H ? d.l : 0
      };
      Vt(e || n, $), Vt(n, C), oe(s, {
        ln: d,
        _n: !H,
        j: e ? C : oe({}, $, C)
      });
    }
    return {
      dn: V
    };
  };
}, Ea = (t, e) => {
  const n = Ke(), { ht: o, ln: s, U: i, L: c, Qt: u, gt: l, wt: f, St: v, un: d } = t, { P: p } = n, m = f && c, h = X(js, 0), w = {
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
    v($o, !m && S);
  }, y = (S) => {
    if (!x.some((ue) => {
      const ie = S[ue];
      return ie && w[ue](ie);
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
    const P = Fe(l), A = v(Xr, !0), j = fe(u, yt, (ue) => {
      const ie = Fe(l);
      ue.isTrusted && ie.x === P.x && ie.y === P.y && bo(ue);
    }, {
      I: !0,
      A: !0
    });
    Ge(l, {
      x: 0,
      y: 0
    }), A();
    const q = Fe(l), W = un(l);
    Ge(l, {
      x: W.w,
      y: W.h
    });
    const Z = Fe(l);
    Ge(l, {
      x: Z.x - q.x < 1 && -W.w,
      y: Z.y - q.y < 1 && -W.h
    });
    const re = Fe(l);
    return Ge(l, P), Jn(() => j()), {
      D: q,
      M: re
    };
  }, V = (S, B) => {
    const P = Le.devicePixelRatio % 1 !== 0 ? 1 : 0, A = {
      w: h(S.w - B.w),
      h: h(S.h - B.h)
    };
    return {
      w: A.w > P ? A.w : 0,
      h: A.h > P ? A.h : 0
    };
  }, [H, E] = Ve(M, X(is, i)), [T, $] = Ve(M, X(un, i)), [C, F] = Ve(M), [D] = Ve(I), [R, k] = Ve(M), [U] = Ve(I), [N] = Ve({
    i: (S, B) => bn(S, B, x),
    o: {}
  }, () => Nr(i) ? et(i, x) : {}), [J, se] = Ve({
    i: (S, B) => en(S.D, B.D) && en(S.M, B.M),
    o: yo()
  }), ne = Rt(To), _e = (S, B) => `${B ? Gr : Wr}${Or(S)}`, Y = (S) => {
    const B = (A) => [rt, ft, yt].map((j) => _e(j, A)), P = B(!0).concat(B()).join(" ");
    v(P), v(Ue(S).map((A) => _e(S[A], A === "x")).join(" "), !0);
  };
  return ({ It: S, Zt: B, fn: P, Dt: A }, { dn: j }) => {
    const { dt: q, Ht: W, Ct: Z, _t: re, zt: ue } = B || {}, ie = ne && ne.V(t, e, P, n, S), { Y: Ee, W: ee, J: we } = ie || {}, [Me, ke] = ca(S, n), [xe, ge] = S("overflow"), be = xt(xe.x), me = xt(xe.y), de = q || j || W || Z || ue || ke;
    let Se = E(A), Ae = $(A), Ct = F(A), Bt = k(A);
    if (ke && p && v(Co, !Me), de) {
      as(o, lt, nn) && L(!0);
      const [ps] = ee ? ee() : [], [Gt] = Se = H(A), [Wt] = Ae = T(A), Yt = ho(i), Kt = m && Ur(d()), nr = {
        w: h(Wt.w + Gt.w),
        h: h(Wt.h + Gt.h)
      }, hs = {
        w: h((Kt ? Kt.w : Yt.w + h(Yt.w - Wt.w)) + Gt.w),
        h: h((Kt ? Kt.h : Yt.h + h(Yt.h - Wt.h)) + Gt.h)
      };
      ps && ps(), Bt = R(hs), Ct = C(V(nr, hs), A);
    }
    const [Ut, Nt] = Bt, [dt, Et] = Ct, [Pt, xn] = Ae, [Sn, $n] = Se, [Pe, Cn] = D({
      x: dt.w > 0,
      y: dt.h > 0
    }), qt = be && me && (Pe.x || Pe.y) || be && Pe.x && !Pe.y || me && Pe.y && !Pe.x, zt = j || Z || ue || $n || xn || Nt || Et || ge || ke || de, st = da(Pe, xe), [Tt, At] = U(st.k), [jt, Jo] = N(A), ms = Z || re || Jo || Cn || A, [er, tr] = ms ? J(y(jt), A) : se();
    return zt && (At && Y(st.k), we && Ee && Vt(i, we(st, P, Ee(st, Pt, Sn)))), L(!1), dn(o, lt, nn, qt), dn(s, Yn, nn, qt), oe(e, {
      k: Tt,
      Lt: {
        x: Ut.w,
        y: Ut.h
      },
      Vt: {
        x: dt.w,
        y: dt.h
      },
      rn: Pe,
      Tt: Pr(er, dt)
    }), {
      en: At,
      nn: Nt,
      sn: Et,
      cn: tr || Et,
      pn: ms
    };
  };
}, Ta = (t) => {
  const [e, n, o] = Sa(t), s = {
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
      [Ys]: 0,
      [Ks]: 0,
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
      x: ft,
      y: ft
    },
    rn: {
      x: !1,
      y: !1
    },
    Tt: yo()
  }, { vt: i, gt: c, L: u, Ot: l } = e, { P: f, T: v } = Ke(), d = !f && (v.x || v.y), p = [$a(e), Ca(e, s), Ea(e, s)];
  return [n, (m) => {
    const h = {}, x = d && Fe(c), M = x && l();
    return le(p, (I) => {
      oe(h, I(m, h) || {});
    }), Ge(c, x), M && M(), u || Ge(i, 0), h;
  }, s, e, o];
}, Aa = (t, e, n, o, s) => {
  let i = !1;
  const c = Fs(e, {}), [u, l, f, v, d] = Ta(t), [p, m, h] = ga(v, f, c, (y) => {
    L({}, y);
  }), [w, x, , M] = xa(t, e, h, f, v, s), I = (y) => Ue(y).some((V) => !!y[V]), L = (y, V) => {
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
    const U = I(R), N = I(k), J = U || N || !ss(C) || F;
    return i = !0, J && o(y, {
      Zt: R,
      tn: k
    }), J;
  };
  return [() => {
    const { an: y, gt: V, Ot: H } = v, E = Fe(y), T = [p(), u(), w()], $ = H();
    return Ge(V, E), $(), X(Ie, T);
  }, L, () => ({
    gn: h,
    bn: f
  }), {
    wn: v,
    yn: M
  }, d];
}, us = /* @__PURE__ */ new WeakMap(), Ma = (t, e) => {
  us.set(t, e);
}, Da = (t) => {
  us.delete(t);
}, Vo = (t) => us.get(t), Ne = (t, e, n) => {
  const { nt: o } = Ke(), s = ln(t), i = s ? t : t.target, c = Vo(i);
  if (e && !c) {
    let u = !1;
    const l = [], f = {}, v = (C) => {
      const F = ro(C), D = Rt(zr);
      return D ? D(F, !0) : F;
    }, d = oe({}, o(), v(e)), [p, m, h] = Wn(), [w, x, M] = Wn(n), I = (C, F) => {
      M(C, F), h(C, F);
    }, [L, y, V, H, E] = Aa(t, d, () => u, ({ vn: C, Dt: F }, { Zt: D, tn: R }) => {
      const { dt: k, Ct: U, xt: N, Ht: J, Et: se, _t: ne } = D, { nn: _e, sn: Y, en: S, cn: B } = R;
      I("updated", [$, {
        updateHints: {
          sizeChanged: !!k,
          directionChanged: !!U,
          heightIntrinsicChanged: !!N,
          overflowEdgeChanged: !!_e,
          overflowAmountChanged: !!Y,
          overflowStyleChanged: !!S,
          scrollCoordinatesChanged: !!B,
          contentMutation: !!J,
          hostMutation: !!se,
          appear: !!ne
        },
        changedOptions: C || {},
        force: !!F
      }]);
    }, (C) => I("scroll", [$, C])), T = (C) => {
      Da(i), Ie(l), u = !0, I("destroyed", [$, C]), m(), x();
    }, $ = {
      options(C, F) {
        if (C) {
          const D = F ? o() : {}, R = Ao(d, oe(D, v(C)));
          ss(R) || (oe(d, R), y({
            vn: R
          }));
        }
        return oe({}, d);
      },
      on: w,
      off: (C, F) => {
        C && F && x(C, F);
      },
      state() {
        const { gn: C, bn: F } = V(), { F: D } = C, { Lt: R, Vt: k, k: U, rn: N, ln: J, _n: se, Tt: ne } = F;
        return oe({}, {
          overflowEdge: R,
          overflowAmount: k,
          overflowStyle: U,
          hasOverflow: N,
          scrollCoordinates: {
            start: ne.D,
            end: ne.M
          },
          padding: J,
          paddingAbsolute: se,
          directionRTL: D,
          destroyed: u
        });
      },
      elements() {
        const { vt: C, ht: F, ln: D, U: R, bt: k, gt: U, Qt: N } = H.wn, { Xt: J, Gt: se } = H.yn, ne = (Y) => {
          const { kt: S, Pt: B, Ut: P } = Y;
          return {
            scrollbar: P,
            track: B,
            handle: S
          };
        }, _e = (Y) => {
          const { Yt: S, Wt: B } = Y, P = ne(S[0]);
          return oe({}, P, {
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
          scrollEventElement: N,
          scrollbarHorizontal: _e(J),
          scrollbarVertical: _e(se)
        });
      },
      update: (C) => y({
        Dt: C,
        At: !0
      }),
      destroy: X(T, !1),
      plugin: (C) => f[Ue(C)[0]]
    };
    return he(l, [E]), Ma(i, $), So(ko, Ne, [$, p, f]), wa(H.wn.wt, !s && t.cancel) ? (T(!0), $) : (he(l, L()), I("initialized", [$]), $.update(), $);
  }
  return c;
};
Ne.plugin = (t) => {
  const e = Ye(t), n = e ? t : [t], o = n.map((s) => So(s, Ne)[0]);
  return qr(n), e ? o : o[0];
};
Ne.valid = (t) => {
  const e = t && t.elements, n = Be(e) && e();
  return an(n) && !!Vo(n.target);
};
Ne.env = () => {
  const { N: t, T: e, P: n, G: o, st: s, et: i, Z: c, tt: u, nt: l, ot: f } = Ke();
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
    setDefaultOptions: f
  });
};
Ne.nonce = _a;
Ne.trustedTypePolicy = Hr;
function Oa() {
  let t;
  const e = O(null), n = Math.floor(Math.random() * 2 ** 32), o = O(!1), s = O([]), i = () => s.value, c = () => t.getSelection(), u = () => s.value.length, l = () => t.clearSelection(!0), f = O(), v = O(null), d = O(null), p = O(null), m = O(null);
  function h() {
    t = new _r({
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
  const w = () => vt(() => {
    t.addSelection(
      t.getSelectables()
    ), x();
  }), x = () => {
    s.value = t.getSelection().map((V) => JSON.parse(V.dataset.item)), f.value(s.value);
  }, M = () => vt(() => {
    const V = i().map((H) => H.path);
    l(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter((H) => V.includes(JSON.parse(H.dataset.item).path))
    ), x(), L();
  }), I = (V) => {
    f.value = V, t.subscribe("DS:end", ({ items: H, event: E, isDragging: T }) => {
      s.value = H.map(($) => JSON.parse($.dataset.item)), V(H.map(($) => JSON.parse($.dataset.item)));
    });
  }, L = () => {
    v.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (d.value.style.height = e.value.scrollHeight + "px", d.value.style.display = "block") : (d.value.style.height = "100%", d.value.style.display = "none"));
  }, y = (V) => {
    if (!v.value)
      return;
    const { scrollOffsetElement: H } = v.value.elements();
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
        v.value = V;
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
    scrollBar: d,
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
function La(t, e) {
  const n = O(t), o = O(e), s = O([]), i = O([]), c = O([]), u = O(!1), l = O(5);
  let f = !1, v = !1;
  const d = St({
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
  const M = ze(() => {
    var I;
    return ((I = s.value[s.value.length - 2]) == null ? void 0 : I.path) ?? n.value + "://";
  });
  return Ce(() => {
  }), Oe(o, p), Ce(p), {
    adapter: n,
    path: o,
    loading: f,
    searchMode: v,
    data: d,
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
const Va = (t, e) => {
  const n = yr(t.id), o = vr(), s = n.getStore("metricUnits", !1), i = Er(n, t.theme), c = e.i18n, u = t.locale ?? e.locale, l = (m) => Array.isArray(m) ? m : Sr, f = n.getStore("persist-path", t.persist), v = f ? n.getStore("path", t.path) : t.path, d = f ? n.getStore("adapter") : null, p = Oa();
  return St({
    /** 
    * Core properties
    * */
    // app version
    version: $r,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: o,
    // storage
    storage: n,
    // localization object
    i18n: xr(n, u, o, c),
    // modal state
    modal: Tr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: ze(() => p),
    // http object
    requester: wr(t.request),
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
    persist: f,
    // show thumbnails
    showThumbnails: n.getStore("show-thumbnails", t.showThumbnails),
    // type of progress indicator
    loadingIndicator: t.loadingIndicator,
    // possible items of the context menu
    contextMenuItems: t.contextMenuItems,
    // file system
    fs: La(d, v)
  });
}, Fa = { class: "vuefinder__modal-layout__container" }, Ia = { class: "vuefinder__modal-layout__content" }, Ha = { class: "vuefinder__modal-layout__footer" }, tt = {
  __name: "ModalLayout",
  setup(t) {
    const e = O(null), n = ae("ServiceContainer");
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
    }), (o, s) => (_(), g("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = Ft((i) => r(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      s[2] || (s[2] = a("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      a("div", Fa, [
        a("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = Je((i) => r(n).modal.close(), ["self"]))
        }, [
          a("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            a("div", Ia, [
              Dt(o.$slots, "default")
            ]),
            a("div", Ha, [
              Dt(o.$slots, "buttons")
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
}, Ba = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const o = ae("ServiceContainer"), s = O(!1), { t: i } = o.i18n;
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
}, Ua = { key: 1 };
function Na(t, e, n, o, s, i) {
  return _(), g("div", {
    class: ce(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    t.$slots.default ? Dt(t.$slots, "default", { key: 0 }) : (_(), g("span", Ua, b(o.t("Saved.")), 1))
  ], 2);
}
const mt = /* @__PURE__ */ Ra(Ba, [["render", Na]]), Pa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function qa(t, e) {
  return _(), g("svg", Pa, e[0] || (e[0] = [
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
const za = { render: qa }, ja = { class: "vuefinder__modal-header" }, Ga = { class: "vuefinder__modal-header__icon-container" }, Wa = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, ct = {
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
    return (e, n) => (_(), g("div", ja, [
      a("div", Ga, [
        (_(), K(Us(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      a("h3", Wa, b(t.title), 1)
    ]));
  }
}, Ya = { class: "vuefinder__about-modal__content" }, Ka = { class: "vuefinder__about-modal__main" }, Xa = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Za = ["onClick", "aria-current"], Qa = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Ja = { class: "vuefinder__about-modal__description" }, el = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, tl = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, nl = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, sl = { class: "vuefinder__about-modal__description" }, ol = { class: "vuefinder__about-modal__settings" }, rl = { class: "vuefinder__about-modal__setting flex" }, al = { class: "vuefinder__about-modal__setting-input" }, ll = { class: "vuefinder__about-modal__setting-label" }, il = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, cl = { class: "vuefinder__about-modal__setting flex" }, dl = { class: "vuefinder__about-modal__setting-input" }, ul = { class: "vuefinder__about-modal__setting-label" }, fl = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, vl = { class: "vuefinder__about-modal__setting flex" }, _l = { class: "vuefinder__about-modal__setting-input" }, ml = { class: "vuefinder__about-modal__setting-label" }, pl = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, hl = { class: "vuefinder__about-modal__setting flex" }, gl = { class: "vuefinder__about-modal__setting-input" }, bl = { class: "vuefinder__about-modal__setting-label" }, wl = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, yl = { class: "vuefinder__about-modal__setting" }, kl = { class: "vuefinder__about-modal__setting-input" }, xl = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, Sl = { class: "vuefinder__about-modal__setting-label" }, $l = ["label"], Cl = ["value"], El = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Tl = { class: "vuefinder__about-modal__setting-input" }, Al = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Ml = { class: "vuefinder__about-modal__setting-label" }, Dl = ["label"], Ol = ["value"], Ll = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, Vl = { class: "vuefinder__about-modal__shortcuts" }, Fl = { class: "vuefinder__about-modal__shortcut" }, Il = { class: "vuefinder__about-modal__shortcut" }, Hl = { class: "vuefinder__about-modal__shortcut" }, Rl = { class: "vuefinder__about-modal__shortcut" }, Bl = { class: "vuefinder__about-modal__shortcut" }, Ul = { class: "vuefinder__about-modal__shortcut" }, Nl = { class: "vuefinder__about-modal__shortcut" }, Pl = { class: "vuefinder__about-modal__shortcut" }, ql = { class: "vuefinder__about-modal__shortcut" }, zl = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, jl = { class: "vuefinder__about-modal__description" }, Gl = {
  __name: "ModalAbout",
  setup(t) {
    const e = ae("ServiceContainer"), { setStore: n, clearStore: o } = e.storage, { t: s } = e.i18n, i = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, c = ze(() => [
      { name: s("About"), key: i.ABOUT },
      { name: s("Settings"), key: i.SETTINGS },
      { name: s("Shortcuts"), key: i.SHORTCUTS },
      { name: s("Reset"), key: i.RESET }
    ]), u = O("about"), l = async () => {
      o(), location.reload();
    }, f = (I) => {
      e.theme.set(I), e.emitter.emit("vf-theme-saved");
    }, v = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? zs : qs, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, d = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, p = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, m = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = ae("VueFinderOptions"), x = Object.fromEntries(
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
    ), M = ze(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (I, L) => (_(), K(tt, null, {
      buttons: te(() => [
        a("button", {
          type: "button",
          onClick: L[7] || (L[7] = (y) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(s)("Close")), 1)
      ]),
      default: te(() => [
        a("div", Ya, [
          G(ct, {
            icon: r(za),
            title: "Vuefinder " + r(e).version
          }, null, 8, ["icon", "title"]),
          a("div", Ka, [
            a("div", null, [
              a("div", null, [
                a("nav", Xa, [
                  (_(!0), g(ye, null, $e(c.value, (y) => (_(), g("button", {
                    key: y.name,
                    onClick: (V) => u.value = y.key,
                    class: ce([y.key === u.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": y.current ? "page" : void 0
                  }, b(y.name), 11, Za))), 128))
                ])
              ])
            ]),
            u.value === i.ABOUT ? (_(), g("div", Qa, [
              a("div", Ja, b(r(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              a("a", el, b(r(s)("Project home")), 1),
              a("a", tl, b(r(s)("Follow on GitHub")), 1)
            ])) : z("", !0),
            u.value === i.SETTINGS ? (_(), g("div", nl, [
              a("div", sl, b(r(s)("Customize your experience with the following settings")), 1),
              a("div", ol, [
                a("fieldset", null, [
                  a("div", rl, [
                    a("div", al, [
                      pe(a("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": L[0] || (L[0] = (y) => r(e).metricUnits = y),
                        onClick: v,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Xt, r(e).metricUnits]
                      ])
                    ]),
                    a("div", ll, [
                      a("label", il, [
                        Q(b(r(s)("Use Metric Units")) + " ", 1),
                        G(mt, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: te(() => [
                            Q(b(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", cl, [
                    a("div", dl, [
                      pe(a("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": L[1] || (L[1] = (y) => r(e).compactListView = y),
                        onClick: d,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Xt, r(e).compactListView]
                      ])
                    ]),
                    a("div", ul, [
                      a("label", fl, [
                        Q(b(r(s)("Compact list view")) + " ", 1),
                        G(mt, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: te(() => [
                            Q(b(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", vl, [
                    a("div", _l, [
                      pe(a("input", {
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
                    a("div", ml, [
                      a("label", pl, [
                        Q(b(r(s)("Persist path on reload")) + " ", 1),
                        G(mt, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: te(() => [
                            Q(b(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", hl, [
                    a("div", gl, [
                      pe(a("input", {
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
                    a("div", bl, [
                      a("label", wl, [
                        Q(b(r(s)("Show thumbnails")) + " ", 1),
                        G(mt, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: te(() => [
                            Q(b(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", yl, [
                    a("div", kl, [
                      a("label", xl, b(r(s)("Theme")), 1)
                    ]),
                    a("div", Sl, [
                      pe(a("select", {
                        id: "theme",
                        "onUpdate:modelValue": L[4] || (L[4] = (y) => r(e).theme.value = y),
                        onChange: L[5] || (L[5] = (y) => f(y.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: r(s)("Theme")
                        }, [
                          (_(!0), g(ye, null, $e(M.value, (y, V) => (_(), g("option", { value: V }, b(y), 9, Cl))), 256))
                        ], 8, $l)
                      ], 544), [
                        [gs, r(e).theme.value]
                      ]),
                      G(mt, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: te(() => [
                          Q(b(r(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  r(e).features.includes(r(ve).LANGUAGE) && Object.keys(r(x)).length > 1 ? (_(), g("div", El, [
                    a("div", Tl, [
                      a("label", Al, b(r(s)("Language")), 1)
                    ]),
                    a("div", Ml, [
                      pe(a("select", {
                        id: "language",
                        "onUpdate:modelValue": L[6] || (L[6] = (y) => r(e).i18n.locale = y),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: r(s)("Language")
                        }, [
                          (_(!0), g(ye, null, $e(r(x), (y, V) => (_(), g("option", { value: V }, b(y), 9, Ol))), 256))
                        ], 8, Dl)
                      ], 512), [
                        [gs, r(e).i18n.locale]
                      ]),
                      G(mt, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: te(() => [
                          Q(b(r(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : z("", !0)
                ])
              ])
            ])) : z("", !0),
            u.value === i.SHORTCUTS ? (_(), g("div", Ll, [
              a("div", Vl, [
                a("div", Fl, [
                  a("div", null, b(r(s)("Rename")), 1),
                  L[8] || (L[8] = a("kbd", null, "F2", -1))
                ]),
                a("div", Il, [
                  a("div", null, b(r(s)("Refresh")), 1),
                  L[9] || (L[9] = a("kbd", null, "F5", -1))
                ]),
                a("div", Hl, [
                  Q(b(r(s)("Delete")) + " ", 1),
                  L[10] || (L[10] = a("kbd", null, "Del", -1))
                ]),
                a("div", Rl, [
                  Q(b(r(s)("Escape")) + " ", 1),
                  L[11] || (L[11] = a("div", null, [
                    a("kbd", null, "Esc")
                  ], -1))
                ]),
                a("div", Bl, [
                  Q(b(r(s)("Select All")) + " ", 1),
                  L[12] || (L[12] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Q(" + "),
                    a("kbd", null, "A")
                  ], -1))
                ]),
                a("div", Ul, [
                  Q(b(r(s)("Search")) + " ", 1),
                  L[13] || (L[13] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Q(" + "),
                    a("kbd", null, "F")
                  ], -1))
                ]),
                a("div", Nl, [
                  Q(b(r(s)("Toggle Sidebar")) + " ", 1),
                  L[14] || (L[14] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Q(" + "),
                    a("kbd", null, "E")
                  ], -1))
                ]),
                a("div", Pl, [
                  Q(b(r(s)("Open Settings")) + " ", 1),
                  L[15] || (L[15] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Q(" + "),
                    a("kbd", null, ",")
                  ], -1))
                ]),
                a("div", ql, [
                  Q(b(r(s)("Toggle Full Screen")) + " ", 1),
                  L[16] || (L[16] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    Q(" + "),
                    a("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : z("", !0),
            u.value === i.RESET ? (_(), g("div", zl, [
              a("div", jl, b(r(s)("Reset all settings to default")), 1),
              a("button", {
                onClick: l,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(r(s)("Reset Settings")), 1)
            ])) : z("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Wl = ["title"], nt = {
  __name: "Message",
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    var f;
    const n = e, o = ae("ServiceContainer"), { t: s } = o.i18n, i = O(!1), c = O(null), u = O((f = c.value) == null ? void 0 : f.strMessage);
    Oe(u, () => i.value = !1);
    const l = () => {
      n("hidden"), i.value = !0;
    };
    return (v, d) => (_(), g("div", null, [
      i.value ? z("", !0) : (_(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: ce(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Dt(v.$slots, "default"),
        a("div", {
          class: "vuefinder__message__close",
          onClick: l,
          title: r(s)("Close")
        }, d[0] || (d[0] = [
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
}, Yl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Kl(t, e) {
  return _(), g("svg", Yl, e[0] || (e[0] = [
    a("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ]));
}
const Fo = { render: Kl }, Xl = { class: "vuefinder__delete-modal__content" }, Zl = { class: "vuefinder__delete-modal__form" }, Ql = { class: "vuefinder__delete-modal__description" }, Jl = { class: "vuefinder__delete-modal__files vf-scrollbar" }, ei = { class: "vuefinder__delete-modal__file" }, ti = {
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
    const e = ae("ServiceContainer"), { t: n } = e.i18n, o = O(e.modal.data.items), s = O(""), i = () => {
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
    return (c, u) => (_(), K(tt, null, {
      buttons: te(() => [
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
      default: te(() => [
        a("div", null, [
          G(ct, {
            icon: r(Fo),
            title: r(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          a("div", Xl, [
            a("div", Zl, [
              a("p", Ql, b(r(n)("Are you sure you want to delete these files?")), 1),
              a("div", Jl, [
                (_(!0), g(ye, null, $e(o.value, (l) => (_(), g("p", ei, [
                  l.type === "dir" ? (_(), g("svg", ti, u[2] || (u[2] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (_(), g("svg", ni, u[3] || (u[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  a("span", si, b(l.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (_(), K(nt, {
                key: 0,
                onHidden: u[0] || (u[0] = (l) => s.value = ""),
                error: ""
              }, {
                default: te(() => [
                  Q(b(s.value), 1)
                ]),
                _: 1
              })) : z("", !0)
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
  return _(), g("svg", ri, e[0] || (e[0] = [
    a("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ]));
}
const Io = { render: ai }, li = { class: "vuefinder__rename-modal__content" }, ii = { class: "vuefinder__rename-modal__item" }, ci = { class: "vuefinder__rename-modal__item-info" }, di = {
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
    const e = ae("ServiceContainer"), { t: n } = e.i18n, o = O(e.modal.data.items[0]), s = O(e.modal.data.items[0].basename), i = O(""), c = () => {
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
    return (u, l) => (_(), K(tt, null, {
      buttons: te(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(r(n)("Rename")), 1),
        a("button", {
          type: "button",
          onClick: l[2] || (l[2] = (f) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(n)("Cancel")), 1)
      ]),
      default: te(() => [
        a("div", null, [
          G(ct, {
            icon: r(Io),
            title: r(n)("Rename")
          }, null, 8, ["icon", "title"]),
          a("div", li, [
            a("div", ii, [
              a("p", ci, [
                o.value.type === "dir" ? (_(), g("svg", di, l[3] || (l[3] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (_(), g("svg", ui, l[4] || (l[4] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                a("span", fi, b(o.value.basename), 1)
              ]),
              pe(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (f) => s.value = f),
                onKeyup: Ft(c, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [It, s.value]
              ]),
              i.value.length ? (_(), K(nt, {
                key: 0,
                onHidden: l[1] || (l[1] = (f) => i.value = ""),
                error: ""
              }, {
                default: te(() => [
                  Q(b(i.value), 1)
                ]),
                _: 1
              })) : z("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Xe = {
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
    n.code === Xe.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === Xe.F2 && t.features.includes(ve.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(vs, { items: t.dragSelect.getSelected() })), n.code === Xe.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === Xe.DELETE && (!t.dragSelect.getCount() || t.modal.open(fs, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === Xe.BACKSLASH && t.modal.open(Gl), n.metaKey && n.code === Xe.KEY_F && t.features.includes(ve.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === Xe.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === Xe.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === Xe.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
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
  return _(), g("svg", _i, e[0] || (e[0] = [
    a("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const Ho = { render: mi }, pi = { class: "vuefinder__new-folder-modal__content" }, hi = { class: "vuefinder__new-folder-modal__form" }, gi = { class: "vuefinder__new-folder-modal__description" }, bi = ["placeholder"], Ro = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = ae("ServiceContainer"), { getStore: n } = e.storage, { t: o } = e.i18n, s = O(""), i = O(""), c = () => {
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
    return (u, l) => (_(), K(tt, null, {
      buttons: te(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(r(o)("Create")), 1),
        a("button", {
          type: "button",
          onClick: l[2] || (l[2] = (f) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(o)("Cancel")), 1)
      ]),
      default: te(() => [
        a("div", null, [
          G(ct, {
            icon: r(Ho),
            title: r(o)("New Folder")
          }, null, 8, ["icon", "title"]),
          a("div", pi, [
            a("div", hi, [
              a("p", gi, b(r(o)("Create a new folder")), 1),
              pe(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (f) => s.value = f),
                onKeyup: Ft(c, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: r(o)("Folder Name"),
                type: "text"
              }, null, 40, bi), [
                [It, s.value]
              ]),
              i.value.length ? (_(), K(nt, {
                key: 0,
                onHidden: l[1] || (l[1] = (f) => i.value = ""),
                error: ""
              }, {
                default: te(() => [
                  Q(b(i.value), 1)
                ]),
                _: 1
              })) : z("", !0)
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
const wi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function yi(t, e) {
  return _(), g("svg", wi, e[0] || (e[0] = [
    a("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ]));
}
const Bo = { render: yi }, ki = { class: "vuefinder__upload-modal__content" }, xi = {
  key: 0,
  class: "pointer-events-none"
}, Si = {
  key: 1,
  class: "pointer-events-none"
}, $i = ["disabled"], Ci = ["disabled"], Ei = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, Ti = ["textContent"], Ai = { class: "vuefinder__upload-modal__file-info" }, Mi = { class: "vuefinder__upload-modal__file-name hidden md:block" }, Di = { class: "vuefinder__upload-modal__file-name md:hidden" }, Oi = {
  key: 0,
  class: "ml-auto"
}, Li = ["title", "disabled", "onClick"], Vi = {
  key: 0,
  class: "py-2"
}, Fi = ["disabled"], Ii = {
  __name: "ModalUpload",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, o = n("uppy"), s = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, i = O({ QUEUE_ENTRY_STATUS: s }), c = O(null), u = O(null), l = O(null), f = O(null), v = O(null), d = O(null), p = O([]), m = O(""), h = O(!1), w = O(!1);
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
      f.value.click();
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
      x = new mr({
        debug: e.debug,
        restrictions: {
          maxFileSize: Cr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: o,
        onBeforeFileAdded(k, U) {
          if (U[k.id] != null) {
            const J = M(k.id);
            p.value[J].status === s.PENDING && (m.value = x.i18n("noDuplicates", { fileName: k.name })), p.value = p.value.filter((se) => se.id !== k.id);
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
      }), x.use(pr, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(k, U) {
          let N;
          try {
            N = JSON.parse(k).message;
          } catch {
            N = n("Cannot parse server response.");
          }
          return new Error(N);
        }
      }), x.on("restriction-failed", (k, U) => {
        const N = p.value[M(k.id)];
        T(N), m.value = U.message;
      }), x.on("upload", () => {
        const k = F();
        x.setMeta({ ...k.body });
        const U = x.getPlugin("XHRUpload");
        U.opts.method = k.method, U.opts.endpoint = k.url + "?" + new URLSearchParams(k.params), U.opts.headers = k.headers, delete k.headers["Content-Type"], h.value = !0, p.value.forEach((N) => {
          N.status !== s.DONE && (N.percent = null, N.status = s.UPLOADING, N.statusName = n("Pending upload"));
        });
      }), x.on("upload-progress", (k, U) => {
        const N = Math.floor(U.bytesUploaded / U.bytesTotal * 100);
        p.value[M(k.id)].percent = `${N}%`;
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
        const N = p.value[M(k.id)];
        N.percent = null, N.status = s.ERROR, U.isNetworkError ? N.statusName = n(
          "Network Error, Unable establish connection to the server or interrupted."
        ) : N.statusName = U ? U.message : n("Unknown Error");
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
      }), f.value.addEventListener("click", () => {
        u.value.click();
      }), v.value.addEventListener("click", () => {
        l.value.click();
      }), d.value.addEventListener("dragover", (k) => {
        k.preventDefault(), w.value = !0;
      }), d.value.addEventListener("dragleave", (k) => {
        k.preventDefault(), w.value = !1;
      });
      function D(k, U) {
        U.isFile && U.file((N) => k(U, N)), U.isDirectory && U.createReader().readEntries((N) => {
          N.forEach((J) => {
            D(k, J);
          });
        });
      }
      d.value.addEventListener("drop", (k) => {
        k.preventDefault(), w.value = !1;
        const U = /^[/\\](.+)/;
        [...k.dataTransfer.items].forEach((N) => {
          N.kind === "file" && D((J, se) => {
            const ne = U.exec(J.fullPath);
            I(se, ne[1]);
          }, N.webkitGetAsEntry());
        });
      });
      const R = ({ target: k }) => {
        const U = k.files;
        for (const N of U)
          I(N);
        k.value = "";
      };
      u.value.addEventListener("change", R), l.value.addEventListener("change", R);
    }), Ns(() => {
      x == null || x.close({ reason: "unmount" });
    }), (D, R) => (_(), K(tt, null, {
      buttons: te(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: h.value,
          onClick: Je(H, ["prevent"])
        }, b(r(n)("Upload")), 9, Fi),
        h.value ? (_(), g("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Je(E, ["prevent"])
        }, b(r(n)("Cancel")), 1)) : (_(), g("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Je(C, ["prevent"])
        }, b(r(n)("Close")), 1))
      ]),
      default: te(() => [
        a("div", null, [
          G(ct, {
            icon: r(Bo),
            title: r(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          a("div", ki, [
            a("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: d,
              onClick: V
            }, [
              w.value ? (_(), g("div", xi, b(r(n)("Release to drop these files.")), 1)) : (_(), g("div", Si, b(r(n)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            a("div", {
              ref_key: "container",
              ref: c,
              class: "vuefinder__upload-modal__buttons"
            }, [
              a("button", {
                ref_key: "pickFiles",
                ref: f,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(r(n)("Select Files")), 513),
              a("button", {
                ref_key: "pickFolders",
                ref: v,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, b(r(n)("Select Folders")), 513),
              a("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: R[0] || (R[0] = (k) => $(!1))
              }, b(r(n)("Clear all")), 9, $i),
              a("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: h.value,
                onClick: R[1] || (R[1] = (k) => $(!0))
              }, b(r(n)("Clear only successful")), 9, Ci)
            ], 512),
            a("div", Ei, [
              (_(!0), g(ye, null, $e(p.value, (k) => (_(), g("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: k.id
              }, [
                a("span", {
                  class: ce(["vuefinder__upload-modal__file-icon", L(k)])
                }, [
                  a("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: b(y(k))
                  }, null, 8, Ti)
                ], 2),
                a("div", Ai, [
                  a("div", Mi, b(r(Xn)(k.name, 40)) + " (" + b(k.size) + ") ", 1),
                  a("div", Di, b(r(Xn)(k.name, 16)) + " (" + b(k.size) + ") ", 1),
                  a("div", {
                    class: ce(["vuefinder__upload-modal__file-status", L(k)])
                  }, [
                    Q(b(k.statusName) + " ", 1),
                    k.status === i.value.QUEUE_ENTRY_STATUS.UPLOADING ? (_(), g("b", Oi, b(k.percent), 1)) : z("", !0)
                  ], 2)
                ]),
                a("button", {
                  type: "button",
                  class: ce(["vuefinder__upload-modal__file-remove", h.value ? "disabled" : ""]),
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
                ]), 10, Li)
              ]))), 128)),
              p.value.length ? z("", !0) : (_(), g("div", Vi, b(r(n)("No files selected!")), 1))
            ]),
            m.value.length ? (_(), K(nt, {
              key: 0,
              onHidden: R[2] || (R[2] = (k) => m.value = ""),
              error: ""
            }, {
              default: te(() => [
                Q(b(m.value), 1)
              ]),
              _: 1
            })) : z("", !0)
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
}, Hi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ri(t, e) {
  return _(), g("svg", Hi, e[0] || (e[0] = [
    a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const Uo = { render: Ri }, Bi = { class: "vuefinder__unarchive-modal__content" }, Ui = { class: "vuefinder__unarchive-modal__items" }, Ni = { class: "vuefinder__unarchive-modal__item" }, Pi = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qi = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zi = { class: "vuefinder__unarchive-modal__item-name" }, ji = { class: "vuefinder__unarchive-modal__info" }, No = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, o = O(e.modal.data.items[0]), s = O(""), i = O([]), c = () => {
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
    return (u, l) => (_(), K(tt, null, {
      buttons: te(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(r(n)("Unarchive")), 1),
        a("button", {
          type: "button",
          onClick: l[1] || (l[1] = (f) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(n)("Cancel")), 1)
      ]),
      default: te(() => [
        a("div", null, [
          G(ct, {
            icon: r(Uo),
            title: r(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          a("div", Bi, [
            a("div", Ui, [
              (_(!0), g(ye, null, $e(i.value, (f) => (_(), g("p", Ni, [
                f.type === "dir" ? (_(), g("svg", Pi, l[2] || (l[2] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (_(), g("svg", qi, l[3] || (l[3] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                a("span", zi, b(f.basename), 1)
              ]))), 256)),
              a("p", ji, b(r(n)("The archive will be unarchived at")) + " (" + b(r(e).fs.data.dirname) + ")", 1),
              s.value.length ? (_(), K(nt, {
                key: 0,
                onHidden: l[0] || (l[0] = (f) => s.value = ""),
                error: ""
              }, {
                default: te(() => [
                  Q(b(s.value), 1)
                ]),
                _: 1
              })) : z("", !0)
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
function Wi(t, e) {
  return _(), g("svg", Gi, e[0] || (e[0] = [
    a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const Po = { render: Wi }, Yi = { class: "vuefinder__archive-modal__content" }, Ki = { class: "vuefinder__archive-modal__form" }, Xi = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Zi = { class: "vuefinder__archive-modal__file" }, Qi = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ji = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ec = { class: "vuefinder__archive-modal__file-name" }, tc = ["placeholder"], qo = {
  __name: "ModalArchive",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, o = O(""), s = O(""), i = O(e.modal.data.items), c = () => {
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
    return (u, l) => (_(), K(tt, null, {
      buttons: te(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, b(r(n)("Archive")), 1),
        a("button", {
          type: "button",
          onClick: l[2] || (l[2] = (f) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(n)("Cancel")), 1)
      ]),
      default: te(() => [
        a("div", null, [
          G(ct, {
            icon: r(Po),
            title: r(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          a("div", Yi, [
            a("div", Ki, [
              a("div", Xi, [
                (_(!0), g(ye, null, $e(i.value, (f) => (_(), g("p", Zi, [
                  f.type === "dir" ? (_(), g("svg", Qi, l[3] || (l[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (_(), g("svg", Ji, l[4] || (l[4] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  a("span", ec, b(f.basename), 1)
                ]))), 256))
              ]),
              pe(a("input", {
                "onUpdate:modelValue": l[0] || (l[0] = (f) => o.value = f),
                onKeyup: Ft(c, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: r(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, tc), [
                [It, o.value]
              ]),
              s.value.length ? (_(), K(nt, {
                key: 0,
                onHidden: l[1] || (l[1] = (f) => s.value = ""),
                error: ""
              }, {
                default: te(() => [
                  Q(b(s.value), 1)
                ]),
                _: 1
              })) : z("", !0)
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
function sc(t, e) {
  return _(), g("svg", nc, e[0] || (e[0] = [
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
const _s = { render: sc }, oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function rc(t, e) {
  return _(), g("svg", oc, e[0] || (e[0] = [
    a("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ]));
}
const ac = { render: rc }, lc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ic(t, e) {
  return _(), g("svg", lc, e[0] || (e[0] = [
    a("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ]));
}
const cc = { render: ic }, dc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function uc(t, e) {
  return _(), g("svg", dc, e[0] || (e[0] = [
    a("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ]));
}
const fc = { render: uc }, vc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function _c(t, e) {
  return _(), g("svg", vc, e[0] || (e[0] = [
    a("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
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
  setup(t) {
    const e = ae("ServiceContainer"), { setStore: n } = e.storage, { t: o } = e.i18n, s = e.dragSelect, i = O("");
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
    return (l, f) => (_(), g("div", pc, [
      i.value.length ? (_(), g("div", Sc, [
        a("div", $c, [
          Q(b(r(o)("Search results for")) + " ", 1),
          a("span", Cc, b(i.value), 1)
        ]),
        r(e).loadingIndicator === "circular" && r(e).fs.loading ? (_(), K(r(_s), { key: 0 })) : z("", !0)
      ])) : (_(), g("div", hc, [
        r(e).features.includes(r(ve).NEW_FOLDER) ? (_(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: r(o)("New Folder"),
          onClick: f[0] || (f[0] = (v) => r(e).modal.open(Ro, { items: r(s).getSelected() }))
        }, [
          G(r(Ho))
        ], 8, gc)) : z("", !0),
        r(e).features.includes(r(ve).UPLOAD) ? (_(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: r(o)("Upload"),
          onClick: f[1] || (f[1] = (v) => r(e).modal.open(Ii, { items: r(s).getSelected() }))
        }, [
          G(r(Bo))
        ], 8, bc)) : z("", !0),
        r(e).features.includes(r(ve).RENAME) ? (_(), g("div", {
          key: 2,
          class: "mx-1.5",
          title: r(o)("Rename"),
          onClick: f[2] || (f[2] = (v) => r(s).getCount() !== 1 || r(e).modal.open(vs, { items: r(s).getSelected() }))
        }, [
          G(r(Io), {
            class: ce(r(s).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, wc)) : z("", !0),
        r(e).features.includes(r(ve).DELETE) ? (_(), g("div", {
          key: 3,
          class: "mx-1.5",
          title: r(o)("Delete"),
          onClick: f[3] || (f[3] = (v) => !r(s).getCount() || r(e).modal.open(fs, { items: r(s).getSelected() }))
        }, [
          G(r(Fo), {
            class: ce(r(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, yc)) : z("", !0),
        r(e).features.includes(r(ve).UNARCHIVE) && r(s).getCount() === 1 && r(s).getSelected()[0].mime_type === "application/zip" ? (_(), g("div", {
          key: 4,
          class: "mx-1.5",
          title: r(o)("Unarchive"),
          onClick: f[4] || (f[4] = (v) => !r(s).getCount() || r(e).modal.open(No, { items: r(s).getSelected() }))
        }, [
          G(r(Uo), {
            class: ce(r(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, kc)) : z("", !0),
        r(e).features.includes(r(ve).ARCHIVE) ? (_(), g("div", {
          key: 5,
          class: "mx-1.5",
          title: r(o)("Archive"),
          onClick: f[5] || (f[5] = (v) => !r(s).getCount() || r(e).modal.open(qo, { items: r(s).getSelected() }))
        }, [
          G(r(Po), {
            class: ce(r(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, xc)) : z("", !0)
      ])),
      a("div", Ec, [
        r(e).features.includes(r(ve).FULL_SCREEN) ? (_(), g("div", {
          key: 0,
          onClick: c,
          class: "mx-1.5",
          title: r(o)("Toggle Full Screen")
        }, [
          r(e).fullScreen ? (_(), K(r(cc), { key: 0 })) : (_(), K(r(ac), { key: 1 }))
        ], 8, Tc)) : z("", !0),
        a("div", {
          class: "mx-1.5",
          title: r(o)("Change View"),
          onClick: f[6] || (f[6] = (v) => i.value.length || u())
        }, [
          r(e).view === "grid" ? (_(), K(r(fc), {
            key: 0,
            class: ce(["vf-toolbar-icon", i.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : z("", !0),
          r(e).view === "list" ? (_(), K(r(mc), {
            key: 1,
            class: ce(["vf-toolbar-icon", i.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : z("", !0)
        ], 8, Ac)
      ])
    ]));
  }
}, Dc = (t, e = 0, n = !1) => {
  let o;
  return (...s) => {
    n && !o && t(...s), clearTimeout(o), o = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Hs = (t, e, n) => {
  const o = O(t);
  return ar((s, i) => ({
    get() {
      return s(), o.value;
    },
    set: Dc(
      (c) => {
        o.value = c, i();
      },
      e,
      n
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
function Lc(t, e) {
  return _(), g("svg", Oc, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ]));
}
const Vc = { render: Lc }, Fc = { class: "vuefinder__move-modal__content" }, Ic = { class: "vuefinder__move-modal__description" }, Hc = { class: "vuefinder__move-modal__files vf-scrollbar" }, Rc = { class: "vuefinder__move-modal__file" }, Bc = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Uc = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Nc = { class: "vuefinder__move-modal__file-name" }, Pc = { class: "vuefinder__move-modal__target-title" }, qc = { class: "vuefinder__move-modal__target-directory" }, zc = { class: "vuefinder__move-modal__target-path" }, jc = { class: "vuefinder__move-modal__selected-items" }, Zn = {
  __name: "ModalMove",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, o = O(e.modal.data.items.from), s = O(""), i = () => {
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
    return (c, u) => (_(), K(tt, null, {
      buttons: te(() => [
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
        a("div", jc, b(r(n)("%s item(s) selected.", o.value.length)), 1)
      ]),
      default: te(() => [
        a("div", null, [
          G(ct, {
            icon: r(Vc),
            title: r(n)("Move files")
          }, null, 8, ["icon", "title"]),
          a("div", Fc, [
            a("p", Ic, b(r(n)("Are you sure you want to move these files?")), 1),
            a("div", Hc, [
              (_(!0), g(ye, null, $e(o.value, (l) => (_(), g("div", Rc, [
                a("div", null, [
                  l.type === "dir" ? (_(), g("svg", Bc, u[2] || (u[2] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (_(), g("svg", Uc, u[3] || (u[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                a("div", Nc, b(l.path), 1)
              ]))), 256))
            ]),
            a("h4", Pc, b(r(n)("Target Directory")), 1),
            a("p", qc, [
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
              a("span", zc, b(r(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (_(), K(nt, {
              key: 0,
              onHidden: u[0] || (u[0] = (l) => s.value = ""),
              error: ""
            }, {
              default: te(() => [
                Q(b(s.value), 1)
              ]),
              _: 1
            })) : z("", !0)
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
function Wc(t, e) {
  return _(), g("svg", Gc, e[0] || (e[0] = [
    a("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ]));
}
const Yc = { render: Wc }, Kc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Xc(t, e) {
  return _(), g("svg", Kc, e[0] || (e[0] = [
    a("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Zc = { render: Xc }, Qc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Jc(t, e) {
  return _(), g("svg", Qc, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const ed = { render: Jc }, td = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function nd(t, e) {
  return _(), g("svg", td, e[0] || (e[0] = [
    a("path", {
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
function rd(t, e) {
  return _(), g("svg", od, e[0] || (e[0] = [
    a("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
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
function id(t, e) {
  return _(), g("svg", ld, e[0] || (e[0] = [
    a("path", {
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
function ud(t, e) {
  return _(), g("svg", dd, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ]));
}
const kn = { render: ud }, fd = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function vd(t, e) {
  return _(), g("svg", fd, e[0] || (e[0] = [
    a("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ]));
}
const _d = { render: vd }, md = { class: "vuefinder__breadcrumb__container" }, pd = ["title"], hd = ["title"], gd = ["title"], bd = { class: "vuefinder__breadcrumb__list" }, wd = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, yd = { class: "relative" }, kd = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], xd = { class: "vuefinder__breadcrumb__search-mode" }, Sd = ["placeholder"], $d = { class: "vuefinder__breadcrumb__hidden-dropdown" }, Cd = ["onDrop", "onClick"], Ed = { class: "vuefinder__breadcrumb__hidden-item-content" }, Td = { class: "vuefinder__breadcrumb__hidden-item-text" }, Ad = {
  __name: "Breadcrumb",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, o = e.dragSelect, { setStore: s } = e.storage, i = O(null), c = Hs(0, 100);
    Oe(c, (E) => {
      const T = i.value.children;
      let $ = 0, C = 0, F = 5, D = 1;
      e.fs.limitBreadcrumbItems(F), vt(() => {
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
    const f = (E, T = null) => {
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
    }, v = (E, T = null) => {
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
    }, d = (E) => {
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
      e.features.includes(ve.SEARCH) && (e.fs.searchMode = !0, vt(() => I.value.focus()));
    }, y = Hs("", 400);
    Oe(y, (E) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: E });
    }), Oe(
      () => e.fs.searchMode,
      (E) => {
        E && vt(() => I.value.focus());
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
    return (E, T) => (_(), g("div", md, [
      a("span", {
        title: r(n)("Go up a directory")
      }, [
        G(r(Zc), {
          onDragover: T[0] || (T[0] = ($) => d($)),
          onDragleave: T[1] || (T[1] = ($) => p($)),
          onDrop: T[2] || (T[2] = ($) => v($)),
          onClick: h,
          class: ce(
            r(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
          )
        }, null, 8, ["class"])
      ], 8, pd),
      r(e).fs.loading ? (_(), g("span", {
        key: 1,
        title: r(n)("Cancel")
      }, [
        G(r(ed), {
          onClick: T[3] || (T[3] = ($) => r(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, gd)) : (_(), g("span", {
        key: 0,
        title: r(n)("Refresh")
      }, [
        G(r(Yc), { onClick: m })
      ], 8, hd)),
      pe(a("div", {
        onClick: Je(L, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        a("div", null, [
          G(r(sd), {
            onDragover: T[4] || (T[4] = ($) => d($)),
            onDragleave: T[5] || (T[5] = ($) => p($)),
            onDrop: T[6] || (T[6] = ($) => v($, -1)),
            onClick: T[7] || (T[7] = ($) => r(e).emitter.emit("vf-fetch", {
              params: { q: "index", adapter: r(e).fs.adapter }
            }))
          })
        ]),
        a("div", bd, [
          r(e).fs.hiddenBreadcrumbs.length ? pe((_(), g("div", wd, [
            T[13] || (T[13] = a("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            a("div", yd, [
              a("span", {
                onDragenter: T[8] || (T[8] = ($) => r(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: T[9] || (T[9] = ($) => r(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                G(r(_d), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [M, x]
          ]) : z("", !0)
        ]),
        a("div", {
          ref_key: "breadcrumbContainer",
          ref: i,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: Je(L, ["self"])
        }, [
          (_(!0), g(ye, null, $e(r(e).fs.breadcrumbs, ($, C) => (_(), g("div", { key: C }, [
            T[14] || (T[14] = a("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            a("span", {
              onDragover: (F) => C === r(e).fs.breadcrumbs.length - 1 || d(F),
              onDragleave: (F) => C === r(e).fs.breadcrumbs.length - 1 || p(F),
              onDrop: (F) => C === r(e).fs.breadcrumbs.length - 1 || v(F, C),
              class: "vuefinder__breadcrumb__item",
              title: $.basename,
              onClick: (F) => r(e).emitter.emit("vf-fetch", {
                params: {
                  q: "index",
                  adapter: r(e).fs.adapter,
                  path: $.path
                }
              })
            }, b($.name), 41, kd)
          ]))), 128))
        ], 512),
        r(e).loadingIndicator === "circular" && r(e).fs.loading ? (_(), K(r(_s), { key: 0 })) : z("", !0)
      ], 512), [
        [je, !r(e).fs.searchMode]
      ]),
      pe(a("div", xd, [
        a("div", null, [
          G(r(ad))
        ]),
        pe(a("input", {
          ref_key: "searchInput",
          ref: I,
          onKeydown: Ft(V, ["esc"]),
          onBlur: H,
          "onUpdate:modelValue": T[10] || (T[10] = ($) => lr(y) ? y.value = $ : null),
          placeholder: r(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, Sd), [
          [It, r(y)]
        ]),
        G(r(cd), { onClick: V })
      ], 512), [
        [je, r(e).fs.searchMode]
      ]),
      pe(a("div", $d, [
        (_(!0), g(ye, null, $e(r(e).fs.hiddenBreadcrumbs, ($, C) => (_(), g("div", {
          key: C,
          onDragover: T[11] || (T[11] = (F) => d(F)),
          onDragleave: T[12] || (T[12] = (F) => p(F)),
          onDrop: (F) => f(F, C),
          onClick: (F) => w($),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          a("div", Ed, [
            a("span", null, [
              G(r(kn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            a("span", Td, b($.name), 1)
          ])
        ], 40, Cd))), 128))
      ], 512), [
        [je, r(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, zo = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? "ru-RU"), Md = ["onClick"], Dd = {
  __name: "Toast",
  setup(t) {
    const e = ae("ServiceContainer"), { getStore: n } = e.storage, o = O(n("full-screen", !1)), s = O([]), i = (l) => l === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (l) => {
      s.value.splice(l, 1);
    }, u = (l) => {
      let f = s.value.findIndex((v) => v.id === l);
      f !== -1 && c(f);
    };
    return e.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), e.emitter.on("vf-toast-push", (l) => {
      let f = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      l.id = f, s.value.push(l), setTimeout(() => {
        u(f);
      }, 5e3);
    }), (l, f) => (_(), g("div", {
      class: ce(["vuefinder__toast", o.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      G(ir, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: te(() => [
          (_(!0), g(ye, null, $e(s.value, (v, d) => (_(), g("div", {
            key: d,
            onClick: (p) => c(d),
            class: ce(["vuefinder__toast__message", i(v.type)])
          }, b(v.label), 11, Md))), 128))
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
function Ld(t, e) {
  return _(), g("svg", Od, e[0] || (e[0] = [
    a("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Vd = { render: Ld }, Fd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Id(t, e) {
  return _(), g("svg", Fd, e[0] || (e[0] = [
    a("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Hd = { render: Id }, Jt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (_(), g("div", null, [
      t.direction === "asc" ? (_(), K(r(Vd), { key: 0 })) : z("", !0),
      t.direction === "desc" ? (_(), K(r(Hd), { key: 1 })) : z("", !0)
    ]));
  }
}, Rd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Bd(t, e) {
  return _(), g("svg", Rd, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const Ud = { render: Bd }, Nd = { class: "vuefinder__item-icon" }, Vn = {
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
    return (e, n) => (_(), g("span", Nd, [
      t.type === "dir" ? (_(), K(r(kn), {
        key: 0,
        class: ce(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (_(), K(r(Ud), {
        key: 1,
        class: ce(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, Pd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function qd(t, e) {
  return _(), g("svg", Pd, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const zd = { render: qd }, jd = { class: "vuefinder__drag-item__container" }, Gd = { class: "vuefinder__drag-item__count" }, Wd = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, o) => (_(), g("div", jd, [
      G(r(zd)),
      a("div", Gd, b(e.count), 1)
    ]));
  }
}, Yd = { class: "vuefinder__text-preview" }, Kd = { class: "vuefinder__text-preview__header" }, Xd = ["title"], Zd = { class: "vuefinder__text-preview__actions" }, Qd = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Jd = { key: 1 }, eu = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = O(""), s = O(""), i = O(null), c = O(!1), u = O(""), l = O(!1), f = ae("ServiceContainer"), { t: v } = f.i18n;
    Ce(() => {
      f.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: f.modal.data.adapter, path: f.modal.data.item.path },
        responseType: "text"
      }).then((m) => {
        o.value = m, n("success");
      });
    });
    const d = () => {
      c.value = !c.value, s.value = o.value;
    }, p = () => {
      u.value = "", l.value = !1, f.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: f.modal.data.adapter,
          path: f.modal.data.item.path
        },
        body: {
          content: s.value
        },
        responseType: "text"
      }).then((m) => {
        u.value = v("Updated."), o.value = m, n("success"), c.value = !c.value;
      }).catch((m) => {
        u.value = v(m.message), l.value = !0;
      });
    };
    return (m, h) => (_(), g("div", Yd, [
      a("div", Kd, [
        a("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: r(f).modal.data.item.path
        }, b(r(f).modal.data.item.basename), 9, Xd),
        a("div", Zd, [
          c.value ? (_(), g("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__text-preview__save-button"
          }, b(r(v)("Save")), 1)) : z("", !0),
          r(f).features.includes(r(ve).EDIT) ? (_(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = (w) => d())
          }, b(c.value ? r(v)("Cancel") : r(v)("Edit")), 1)) : z("", !0)
        ])
      ]),
      a("div", null, [
        c.value ? (_(), g("div", Jd, [
          pe(a("textarea", {
            ref_key: "editInput",
            ref: i,
            "onUpdate:modelValue": h[1] || (h[1] = (w) => s.value = w),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [It, s.value]
          ])
        ])) : (_(), g("pre", Qd, b(o.value), 1)),
        u.value.length ? (_(), K(nt, {
          key: 2,
          onHidden: h[2] || (h[2] = (w) => u.value = ""),
          error: l.value
        }, {
          default: te(() => [
            Q(b(u.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : z("", !0)
      ])
    ]));
  }
}, tu = { class: "vuefinder__image-preview" }, nu = { class: "vuefinder__image-preview__header" }, su = ["title"], ou = { class: "vuefinder__image-preview__actions" }, ru = { class: "vuefinder__image-preview__image-container" }, au = ["src"], lu = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = ae("ServiceContainer"), { t: s } = o.i18n, i = O(null), c = O(null), u = O(!1), l = O(""), f = O(!1), v = () => {
      u.value = !u.value, u.value ? c.value = new gr(i.value, {
        crop(p) {
        }
      }) : c.value.destroy();
    }, d = () => {
      c.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (p) => {
          l.value = "", f.value = !1;
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
            l.value = s("Updated."), i.value.src = o.requester.getPreviewUrl(o.modal.data.adapter, o.modal.data.item), v(), n("success");
          }).catch((h) => {
            l.value = s(h.message), f.value = !0;
          });
        }
      );
    };
    return Ce(() => {
      n("success");
    }), (p, m) => (_(), g("div", tu, [
      a("div", nu, [
        a("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: r(o).modal.data.item.path
        }, b(r(o).modal.data.item.basename), 9, su),
        a("div", ou, [
          u.value ? (_(), g("button", {
            key: 0,
            onClick: d,
            class: "vuefinder__image-preview__crop-button"
          }, b(r(s)("Crop")), 1)) : z("", !0),
          r(o).features.includes(r(ve).EDIT) ? (_(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: m[0] || (m[0] = (h) => v())
          }, b(u.value ? r(s)("Cancel") : r(s)("Edit")), 1)) : z("", !0)
        ])
      ]),
      a("div", ru, [
        a("img", {
          ref_key: "image",
          ref: i,
          class: "vuefinder__image-preview__image",
          src: r(o).requester.getPreviewUrl(r(o).modal.data.adapter, r(o).modal.data.item),
          alt: ""
        }, null, 8, au)
      ]),
      l.value.length ? (_(), K(nt, {
        key: 0,
        onHidden: m[1] || (m[1] = (h) => l.value = ""),
        error: f.value
      }, {
        default: te(() => [
          Q(b(l.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : z("", !0)
    ]));
  }
}, iu = { class: "vuefinder__default-preview" }, cu = { class: "vuefinder__default-preview__header" }, du = ["title"], uu = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ae("ServiceContainer"), o = e;
    return Ce(() => {
      o("success");
    }), (s, i) => (_(), g("div", iu, [
      a("div", cu, [
        a("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: r(n).modal.data.item.path
        }, b(r(n).modal.data.item.basename), 9, du)
      ]),
      i[0] || (i[0] = a("div", null, null, -1))
    ]));
  }
}, fu = { class: "vuefinder__video-preview" }, vu = ["title"], _u = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, mu = ["src"], pu = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ae("ServiceContainer"), o = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ce(() => {
      o("success");
    }), (i, c) => (_(), g("div", fu, [
      a("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: r(n).modal.data.item.path
      }, b(r(n).modal.data.item.basename), 9, vu),
      a("div", null, [
        a("video", _u, [
          a("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, mu),
          c[0] || (c[0] = Q(" Your browser does not support the video tag. "))
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
  setup(t, { emit: e }) {
    const n = e, o = ae("ServiceContainer"), s = () => o.requester.getPreviewUrl(o.modal.data.adapter, o.modal.data.item);
    return Ce(() => {
      n("success");
    }), (i, c) => (_(), g("div", hu, [
      a("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: r(o).modal.data.item.path
      }, b(r(o).modal.data.item.basename), 9, gu),
      a("div", null, [
        a("audio", bu, [
          a("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, wu),
          c[0] || (c[0] = Q(" Your browser does not support the audio element. "))
        ])
      ])
    ]));
  }
}, ku = { class: "vuefinder__pdf-preview" }, xu = ["title"], Su = ["data"], $u = ["src"], Cu = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = ae("ServiceContainer"), o = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ce(() => {
      o("success");
    }), (i, c) => (_(), g("div", ku, [
      a("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: r(n).modal.data.item.path
      }, b(r(n).modal.data.item.basename), 9, xu),
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
          }, " Your browser does not support PDFs ", 8, $u)
        ], 8, Su)
      ])
    ]));
  }
}, Eu = { class: "vuefinder__preview-modal__content" }, Tu = { key: 0 }, Au = { class: "vuefinder__preview-modal__loading" }, Mu = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Du = { class: "vuefinder__preview-modal__details" }, Ou = { class: "font-bold" }, Lu = { class: "font-bold pl-2" }, Vu = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Fu = ["download", "href"], jo = {
  __name: "ModalPreview",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, o = O(!1), s = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), i = e.features.includes(ve.PREVIEW);
    return i || (o.value = !0), (c, u) => (_(), K(tt, null, {
      buttons: te(() => [
        a("button", {
          type: "button",
          onClick: u[6] || (u[6] = (l) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, b(r(n)("Close")), 1),
        r(e).features.includes(r(ve).DOWNLOAD) ? (_(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item),
          href: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item)
        }, b(r(n)("Download")), 9, Fu)) : z("", !0)
      ]),
      default: te(() => [
        a("div", null, [
          a("div", Eu, [
            r(i) ? (_(), g("div", Tu, [
              s("text") ? (_(), K(eu, {
                key: 0,
                onSuccess: u[0] || (u[0] = (l) => o.value = !0)
              })) : s("image") ? (_(), K(lu, {
                key: 1,
                onSuccess: u[1] || (u[1] = (l) => o.value = !0)
              })) : s("video") ? (_(), K(pu, {
                key: 2,
                onSuccess: u[2] || (u[2] = (l) => o.value = !0)
              })) : s("audio") ? (_(), K(yu, {
                key: 3,
                onSuccess: u[3] || (u[3] = (l) => o.value = !0)
              })) : s("application/pdf") ? (_(), K(Cu, {
                key: 4,
                onSuccess: u[4] || (u[4] = (l) => o.value = !0)
              })) : (_(), K(uu, {
                key: 5,
                onSuccess: u[5] || (u[5] = (l) => o.value = !0)
              }))
            ])) : z("", !0),
            a("div", Au, [
              o.value === !1 ? (_(), g("div", Mu, [
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
              ])) : z("", !0)
            ])
          ])
        ]),
        a("div", Du, [
          a("div", null, [
            a("span", Ou, b(r(n)("File Size")) + ": ", 1),
            Q(b(r(e).filesize(r(e).modal.data.item.file_size)), 1)
          ]),
          a("div", null, [
            a("span", Lu, b(r(n)("Last Modified")) + ": ", 1),
            Q(" " + b(r(zo)(r(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        r(e).features.includes(r(ve).DOWNLOAD) ? (_(), g("div", Vu, [
          a("span", null, b(r(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : z("", !0)
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
function Hu(t, e) {
  return _(), g("svg", Iu, e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ]));
}
const Go = { render: Hu }, Ru = ["data-type", "data-item", "data-index"], Fn = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = ae("ServiceContainer"), n = e.dragSelect, o = t, s = (m) => {
      m.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: m.path } })) : e.modal.open(jo, { adapter: e.fs.adapter, item: m });
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
    let f = null, v = !1;
    const d = () => {
      f && clearTimeout(f);
    }, p = (m) => {
      if (!v)
        v = !0, setTimeout(() => v = !1, 300);
      else
        return v = !1, s(o.item), clearTimeout(f), !1;
      f = setTimeout(() => {
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
    return (m, h) => pe((_(), g("div", {
      style: fn({ opacity: r(n).isDraggingRef.value && r(n).getSelection().find((w) => m.$el === w) ? "0.5 !important" : "" }),
      class: ce(["vuefinder__item", "vf-item-" + r(n).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: h[0] || (h[0] = (w) => s(t.item)),
      onTouchstart: h[1] || (h[1] = (w) => p(w)),
      onTouchend: h[2] || (h[2] = (w) => d()),
      onContextmenu: h[3] || (h[3] = Je((w) => r(e).emitter.emit("vf-contextmenu-show", { event: w, items: r(n).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Dt(m.$slots, "default"),
      r(e).pinnedFolders.find((w) => w.path === t.item.path) ? (_(), K(r(Go), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : z("", !0)
    ], 46, Ru)), [
      [i, t.item]
    ]);
  }
}, Bu = { class: "vuefinder__explorer__container" }, Uu = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Nu = { class: "vuefinder__explorer__drag-item" }, Pu = {
  key: 0,
  class: "vuefinder__linear-loader absolute"
}, qu = { class: "vuefinder__explorer__item-list-content" }, zu = { class: "vuefinder__explorer__item-list-name" }, ju = { class: "vuefinder__explorer__item-name" }, Gu = { class: "vuefinder__explorer__item-path" }, Wu = { class: "vuefinder__explorer__item-list-content" }, Yu = { class: "vuefinder__explorer__item-list-name" }, Ku = { class: "vuefinder__explorer__item-name" }, Xu = { class: "vuefinder__explorer__item-size" }, Zu = { class: "vuefinder__explorer__item-date" }, Qu = { class: "vuefinder__explorer__item-grid-content" }, Ju = ["data-src", "alt"], ef = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, tf = { class: "vuefinder__explorer__item-title break-all" }, nf = {
  __name: "Explorer",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, o = (d) => d == null ? void 0 : d.substring(0, 3), s = O(null), i = O(""), c = e.dragSelect;
    let u;
    e.emitter.on("vf-fullscreen-toggle", () => {
      c.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: d }) => {
      i.value = d, d ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: d
        },
        onSuccess: (p) => {
          p.files.length || e.emitter.emit("vf-toast-push", { label: n("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const l = St({ active: !1, column: "", order: "" }), f = (d = !0) => {
      let p = [...e.fs.data.files], m = l.column, h = l.order === "asc" ? 1 : -1;
      if (!d)
        return p;
      const w = (x, M) => typeof x == "string" && typeof M == "string" ? x.toLowerCase().localeCompare(M.toLowerCase()) : x < M ? -1 : x > M ? 1 : 0;
      return l.active && (p = p.slice().sort((x, M) => w(x[m], M[m]) * h)), p;
    }, v = (d) => {
      l.active && l.column === d ? (l.active = l.order === "asc", l.column = d, l.order = "desc") : (l.active = !0, l.column = d, l.order = "asc");
    };
    return Ce(() => {
      u = new hr(c.area.value);
    }), Bs(() => {
      u.update();
    }), Ns(() => {
      u.destroy();
    }), (d, p) => (_(), g("div", Bu, [
      r(e).view === "list" || i.value.length ? (_(), g("div", Uu, [
        a("div", {
          onClick: p[0] || (p[0] = (m) => v("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          Q(b(r(n)("Name")) + " ", 1),
          pe(G(Jt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [je, l.active && l.column === "basename"]
          ])
        ]),
        i.value.length ? z("", !0) : (_(), g("div", {
          key: 0,
          onClick: p[1] || (p[1] = (m) => v("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          Q(b(r(n)("Size")) + " ", 1),
          pe(G(Jt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [je, l.active && l.column === "file_size"]
          ])
        ])),
        i.value.length ? z("", !0) : (_(), g("div", {
          key: 1,
          onClick: p[2] || (p[2] = (m) => v("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          Q(b(r(n)("Date")) + " ", 1),
          pe(G(Jt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [je, l.active && l.column === "last_modified"]
          ])
        ])),
        i.value.length ? (_(), g("div", {
          key: 2,
          onClick: p[3] || (p[3] = (m) => v("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          Q(b(r(n)("Filepath")) + " ", 1),
          pe(G(Jt, {
            direction: l.order
          }, null, 8, ["direction"]), [
            [je, l.active && l.column === "path"]
          ])
        ])) : z("", !0)
      ])) : z("", !0),
      a("div", Nu, [
        G(Wd, {
          ref_key: "dragImage",
          ref: s,
          count: r(c).getCount()
        }, null, 8, ["count"])
      ]),
      a("div", {
        ref: r(c).scrollBarContainer,
        class: ce(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": r(e).view === "grid" }, { "search-active": i.value.length }]])
      }, [
        a("div", {
          ref: r(c).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      a("div", {
        ref: r(c).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area min-h-32",
        onContextmenu: p[4] || (p[4] = Je((m) => r(e).emitter.emit("vf-contextmenu-show", { event: m, items: r(c).getSelected() }), ["self", "prevent"]))
      }, [
        r(e).loadingIndicator === "linear" && r(e).fs.loading ? (_(), g("div", Pu)) : z("", !0),
        i.value.length ? (_(!0), g(ye, { key: 1 }, $e(f(), (m, h) => (_(), K(Fn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: te(() => [
            a("div", qu, [
              a("div", zu, [
                G(Vn, {
                  type: m.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", ju, b(m.basename), 1)
              ]),
              a("div", Gu, b(m.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : z("", !0),
        r(e).view === "list" && !i.value.length ? (_(!0), g(ye, { key: 2 }, $e(f(), (m, h) => (_(), K(Fn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: m.path
        }, {
          default: te(() => [
            a("div", Wu, [
              a("div", Yu, [
                G(Vn, {
                  type: m.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", Ku, b(m.basename), 1)
              ]),
              a("div", Xu, b(m.file_size ? r(e).filesize(m.file_size) : ""), 1),
              a("div", Zu, b(r(zo)(m.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : z("", !0),
        r(e).view === "grid" && !i.value.length ? (_(!0), g(ye, { key: 3 }, $e(f(!1), (m, h) => (_(), K(Fn, {
          item: m,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: te(() => [
            a("div", null, [
              a("div", Qu, [
                (m.mime_type ?? "").startsWith("image") && r(e).showThumbnails ? (_(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": r(e).requester.getPreviewUrl(r(e).fs.adapter, m),
                  alt: m.basename,
                  key: m.path
                }, null, 8, Ju)) : (_(), K(Vn, {
                  key: 1,
                  type: m.type
                }, null, 8, ["type"])),
                !((m.mime_type ?? "").startsWith("image") && r(e).showThumbnails) && m.type !== "dir" ? (_(), g("div", ef, b(o(m.extension)), 1)) : z("", !0)
              ]),
              a("span", tf, b(r(Xn)(m.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : z("", !0)
      ], 544),
      G(Dd)
    ]));
  }
}, sf = ["href", "download"], of = ["onClick"], rf = {
  __name: "ContextMenu",
  setup(t) {
    const e = ae("ServiceContainer"), n = O(null), o = O([]), s = O(""), i = St({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    });
    e.emitter.on("vf-context-selected", (f) => {
      o.value = f;
    });
    const c = (f) => f.link(e, o), u = (f) => {
      e.emitter.emit("vf-contextmenu-hide"), f.action(e, o);
    };
    e.emitter.on("vf-search-query", ({ newQuery: f }) => {
      s.value = f;
    }), e.emitter.on("vf-contextmenu-show", ({ event: f, items: v, target: d = null }) => {
      if (i.items = e.contextMenuItems.filter((p) => p.show(e, {
        searchQuery: s.value,
        items: v,
        target: d
      })), s.value)
        if (d)
          e.emitter.emit("vf-context-selected", [d]);
        else
          return;
      else !d && !s.value ? e.emitter.emit("vf-context-selected", []) : v.length > 1 && v.some((p) => p.path === d.path) ? e.emitter.emit("vf-context-selected", v) : e.emitter.emit("vf-context-selected", [d]);
      l(f);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const l = (f) => {
      const v = e.dragSelect.area.value, d = e.root.getBoundingClientRect(), p = v.getBoundingClientRect();
      let m = f.clientX - d.left, h = f.clientY - d.top;
      i.active = !0, vt(() => {
        var I;
        const w = (I = n.value) == null ? void 0 : I.getBoundingClientRect();
        let x = (w == null ? void 0 : w.height) ?? 0, M = (w == null ? void 0 : w.width) ?? 0;
        m = p.right - f.pageX + window.scrollX < M ? m - M : m, h = p.bottom - f.pageY + window.scrollY < x ? h - x : h, i.positions = {
          left: m + "px",
          top: h + "px"
        };
      });
    };
    return (f, v) => pe((_(), g("ul", {
      ref_key: "contextmenu",
      ref: n,
      style: fn(i.positions),
      class: "vuefinder__context-menu"
    }, [
      (_(!0), g(ye, null, $e(i.items, (d) => (_(), g("li", {
        class: "vuefinder__context-menu__item",
        key: d.title
      }, [
        d.link && d.type === "file" ? (_(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: c(d),
          download: c(d),
          onClick: v[0] || (v[0] = (p) => r(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          a("span", null, b(d.title(r(e).i18n)), 1)
        ], 8, sf)) : (_(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (p) => u(d)
        }, [
          a("span", null, b(d.title(r(e).i18n)), 1)
        ], 8, of))
      ]))), 128))
    ], 4)), [
      [je, i.active]
    ]);
  }
}, af = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function lf(t, e) {
  return _(), g("svg", af, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ]));
}
const Wo = { render: lf }, cf = { class: "vuefinder__status-bar__wrapper" }, df = { class: "vuefinder__status-bar__space" }, uf = { class: "vuefinder__status-bar__space-container" }, ff = { class: "vuefinder__status-bar__space-icon" }, vf = { class: "vuefinder__status-bar__space-text" }, _f = {
  __name: "Statusbar",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, { setStore: o } = e.storage, s = e.dragSelect, i = O("");
    e.emitter.on("vf-search-query", ({ newQuery: v }) => {
      i.value = v;
    }), ze(() => {
      const v = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && v;
    });
    const c = ze(() => {
      var d, p;
      const v = (p = (d = e.fs) == null ? void 0 : d.data) == null ? void 0 : p.used_space;
      return typeof v == "number" ? v.toFixed(2) : "0.00";
    }), u = ze(() => {
      var d, p;
      const v = (p = (d = e.fs) == null ? void 0 : d.data) == null ? void 0 : p.total_space;
      return typeof v == "number" ? v.toFixed(2) : "0.00";
    }), l = ze(() => {
      var p, m, h, w;
      const v = (m = (p = e.fs) == null ? void 0 : p.data) == null ? void 0 : m.used_space, d = (w = (h = e.fs) == null ? void 0 : h.data) == null ? void 0 : w.total_space;
      return typeof v == "number" && typeof d == "number" && d !== 0 ? (v / d * 100).toFixed(2) : "0.00";
    }), f = ze(() => `Used ${c.value}Mb out of ${u.value}Mb (${l.value}%)`);
    return (v, d) => (_(), g("div", cf, [
      a("div", df, [
        a("div", uf, [
          a("span", ff, [
            G(r(Wo))
          ]),
          a("span", vf, b(f.value), 1)
        ])
      ]),
      d[0] || (d[0] = a("div", { class: "vuefinder__status-bar__actions" }, null, -1))
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
function pf(t, e) {
  return _(), g("svg", mf, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ]));
}
const Yo = { render: pf }, hf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function gf(t, e) {
  return _(), g("svg", hf, e[0] || (e[0] = [
    a("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
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
function yf(t, e) {
  return _(), g("svg", wf, e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ]));
}
const Ko = { render: yf }, kf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function xf(t, e) {
  return _(), g("svg", kf, e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M9 12h6" }, null, -1)
  ]));
}
const Xo = { render: xf };
function Zo(t, e) {
  const n = t.findIndex((o) => o.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Sf = { class: "vuefinder__folder-loader-indicator" }, $f = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Qo = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ cr({
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
    const e = t, n = ae("ServiceContainer"), { t: o } = n.i18n, s = Ps(t, "modelValue"), i = O(!1);
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
        Zo(n.treeViewData, { path: e.path, ...l });
      }).catch((l) => {
      }).finally(() => {
        i.value = !1;
      });
    };
    return (l, f) => {
      var v;
      return _(), g("div", Sf, [
        i.value ? (_(), K(r(_s), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (_(), g("div", $f, [
          s.value && ((v = c()) != null && v.folders.length) ? (_(), K(r(Xo), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : z("", !0),
          s.value ? z("", !0) : (_(), K(r(Ko), {
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
  setup(t) {
    const e = ae("ServiceContainer"), n = O([]), o = t, s = O(null);
    Ce(() => {
      o.path === o.adapter + "://" && Ne(s.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const i = ze(() => {
      var c;
      return ((c = e.treeViewData.find((u) => u.path === o.path)) == null ? void 0 : c.folders) || [];
    });
    return (c, u) => {
      const l = dr("TreeSubfolderList", !0);
      return _(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (_(!0), g(ye, null, $e(i.value, (f, v) => (_(), g("li", {
          key: f.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          a("div", Cf, [
            a("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (d) => n.value[f.path] = !n.value[f.path]
            }, [
              G(Qo, {
                adapter: t.adapter,
                path: f.path,
                modelValue: n.value[f.path],
                "onUpdate:modelValue": (d) => n.value[f.path] = d
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Ef),
            a("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: f.path,
              onClick: (d) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o.adapter, path: f.path } })
            }, [
              a("div", Af, [
                r(e).fs.path === f.path ? (_(), K(r(Yo), { key: 0 })) : (_(), K(r(kn), { key: 1 }))
              ]),
              a("div", {
                class: ce(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": r(e).fs.path === f.path
                }])
              }, b(f.basename), 3)
            ], 8, Tf)
          ]),
          a("div", Mf, [
            pe(G(l, {
              adapter: o.adapter,
              path: f.path
            }, null, 8, ["adapter", "path"]), [
              [je, n.value[f.path]]
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
  setup(t) {
    const e = ae("ServiceContainer"), { setStore: n } = e.storage, o = O(!1);
    function s(i) {
      i === e.fs.adapter ? o.value = !o.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: i } }), n("adapter", i));
    }
    return (i, c) => (_(), g(ye, null, [
      a("div", {
        onClick: c[2] || (c[2] = (u) => s(t.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        a("div", {
          class: ce(["vuefinder__treestorageitem__info", t.storage === r(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          a("div", {
            class: ce(["vuefinder__treestorageitem__icon", t.storage === r(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            G(r(Wo))
          ], 2),
          a("div", null, b(t.storage), 1)
        ], 2),
        a("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: c[1] || (c[1] = Je((u) => o.value = !o.value, ["stop"]))
        }, [
          G(Qo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: o.value,
            "onUpdate:modelValue": c[0] || (c[0] = (u) => o.value = u)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      pe(G(Df, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [je, o.value]
      ])
    ], 64));
  }
}, Lf = { class: "vuefinder__folder-indicator" }, Vf = { class: "vuefinder__folder-indicator--icon" }, Ff = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Ps(t, "modelValue");
    return (n, o) => (_(), g("div", Lf, [
      a("div", Vf, [
        e.value ? (_(), K(r(Xo), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : z("", !0),
        e.value ? z("", !0) : (_(), K(r(Ko), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, If = { class: "vuefinder__treeview__header" }, Hf = { class: "vuefinder__treeview__pinned-label" }, Rf = { class: "vuefinder__treeview__pin-text text-nowrap" }, Bf = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Uf = { class: "vuefinder__treeview__pinned-item" }, Nf = ["onClick"], Pf = ["title"], qf = ["onClick"], zf = { key: 0 }, jf = { class: "vuefinder__treeview__no-pinned" }, Gf = { class: "vuefinder__treeview__storage" }, Wf = {
  __name: "TreeView",
  setup(t) {
    const e = ae("ServiceContainer"), { t: n } = e.i18n, { getStore: o, setStore: s } = e.storage, i = O(190), c = O(o("pinned-folders-opened", !0));
    Oe(c, (v) => s("pinned-folders-opened", v));
    const u = (v) => {
      e.pinnedFolders = e.pinnedFolders.filter((d) => d.path !== v.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, l = (v) => {
      const d = v.clientX, p = v.target.parentElement, m = p.getBoundingClientRect().width;
      p.classList.remove("transition-[width]"), p.classList.add("transition-none");
      const h = (x) => {
        i.value = m + x.clientX - d, i.value < 50 && (i.value = 0, e.showTreeView = !1), i.value > 50 && (e.showTreeView = !0);
      }, w = () => {
        const x = p.getBoundingClientRect();
        i.value = x.width, p.classList.add("transition-[width]"), p.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", w);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", w);
    }, f = O(null);
    return Ce(() => {
      Ne(f.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Oe(e.fs.data, (v, d) => {
      const p = v.files.filter((m) => m.type === "dir");
      Zo(e.treeViewData, { path: e.fs.path, folders: p.map((m) => ({
        adapter: m.storage,
        path: m.path,
        basename: m.basename
      })) });
    }), (v, d) => (_(), g(ye, null, [
      a("div", {
        onClick: d[0] || (d[0] = (p) => r(e).showTreeView = !r(e).showTreeView),
        class: ce(["vuefinder__treeview__overlay", r(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      a("div", {
        style: fn(r(e).showTreeView ? "min-width:100px;max-width:75%; width: " + i.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        a("div", {
          ref_key: "treeViewScrollElement",
          ref: f,
          class: "vuefinder__treeview__scroll"
        }, [
          a("div", If, [
            a("div", {
              onClick: d[2] || (d[2] = (p) => c.value = !c.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              a("div", Hf, [
                G(r(Go), { class: "vuefinder__treeview__pin-icon" }),
                a("div", Rf, b(r(n)("Pinned Folders")), 1)
              ]),
              G(Ff, {
                modelValue: c.value,
                "onUpdate:modelValue": d[1] || (d[1] = (p) => c.value = p)
              }, null, 8, ["modelValue"])
            ]),
            c.value ? (_(), g("ul", Bf, [
              (_(!0), g(ye, null, $e(r(e).pinnedFolders, (p) => (_(), g("li", Uf, [
                a("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (m) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: p.storage, path: p.path } })
                }, [
                  r(e).fs.path !== p.path ? (_(), K(r(kn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : z("", !0),
                  r(e).fs.path === p.path ? (_(), K(r(Yo), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : z("", !0),
                  a("div", {
                    title: p.path,
                    class: ce(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": r(e).fs.path === p.path
                    }])
                  }, b(p.basename), 11, Pf)
                ], 8, Nf),
                a("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (m) => u(p)
                }, [
                  G(r(bf), { class: "vuefinder__treeview__remove-icon" })
                ], 8, qf)
              ]))), 256)),
              r(e).pinnedFolders.length ? z("", !0) : (_(), g("li", zf, [
                a("div", jf, b(r(n)("No folders pinned")), 1)
              ]))
            ])) : z("", !0)
          ]),
          (_(!0), g(ye, null, $e(r(e).fs.data.storages, (p) => (_(), g("div", Gf, [
            G(Of, { storage: p }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        a("div", {
          onMousedown: l,
          class: ce([(r(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
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
  return t.map((n) => new Yf(n.title, n.action, n.link, {
    ...e,
    feature: n.key
  }));
}
const Te = {
  newfolder: {
    key: ve.NEW_FOLDER,
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
    key: ve.DELETE,
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
    key: ve.PREVIEW,
    title: ({ t }) => t("Preview"),
    action: (t, e) => t.modal.open(jo, { adapter: t.fs.adapter, item: e.value[0] })
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
    key: ve.DOWNLOAD,
    link: (t, e) => t.requester.getDownloadUrl(t.fs.adapter, e.value[0]),
    title: ({ t }) => t("Download"),
    // action: () => {},
    action: (t, e) => {
      const n = e.value[0];
      (n == null ? void 0 : n.type) === "dir" && t.emitter.emit("vf-download", n);
    }
  },
  archive: {
    key: ve.ARCHIVE,
    title: ({ t }) => t("Archive"),
    action: (t, e) => t.modal.open(qo, { items: e })
  },
  unarchive: {
    key: ve.UNARCHIVE,
    title: ({ t }) => t("Unarchive"),
    action: (t, e) => t.modal.open(No, { items: e })
  },
  rename: {
    key: ve.RENAME,
    title: ({ t }) => t("Rename"),
    action: (t, e) => t.modal.open(vs, { items: e })
  }
}, Kf = [
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
  ...Re([Te.preview], {
    show: (t, e) => {
      var n;
      return ((n = e.target) == null ? void 0 : n.type) !== "dir";
    }
  }),
  ...Re([Te.download], {}),
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
      default: () => Kf
    }
  },
  emits: ["select", "update:path"],
  setup(t, { emit: e }) {
    const n = e, o = t, s = Va(o, ae("VueFinderOptions"));
    ur("ServiceContainer", s);
    const { setStore: i } = s.storage, c = O(null);
    s.root = c;
    const u = s.dragSelect;
    vi(s);
    const l = (d) => {
      Object.assign(s.fs.data, d), u.clearSelection(), u.refreshSelection();
    };
    let f;
    s.emitter.on("vf-fetch-abort", () => {
      f.abort(), s.fs.loading = !1;
    }), s.emitter.on(
      "vf-fetch",
      ({
        params: d,
        body: p = null,
        onSuccess: m = null,
        onError: h = null,
        noCloseModal: w = !1
      }) => {
        ["index", "search"].includes(d.q) && (f && f.abort(), s.fs.loading = !0), f = new AbortController();
        const x = f.signal;
        s.requester.send({
          url: "",
          method: d.m || "get",
          params: d,
          body: p,
          abortSignal: x
        }).then((M) => {
          s.fs.adapter = M.adapter, s.persist && (s.fs.path = M.dirname, i("path", s.fs.path)), w || s.modal.close(), l(M), m && m(M);
        }).catch((M) => {
          console.error(M), h && h(M);
        }).finally(() => {
          ["index", "search"].includes(d.q) && (s.fs.loading = !1);
        });
      }
    );
    function v(d) {
      let p = {};
      d && d.includes("://") && (p = {
        adapter: d.split("://")[0],
        path: d
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
      v(s.fs.path), Oe(
        () => o.path,
        (d) => {
          v(d);
        }
      ), u.onSelect((d) => {
        n("select", d);
      }), Oe(
        () => s.fs.data.dirname,
        (d) => {
          n("update:path", d);
        }
      );
    }), (d, p) => (_(), g("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: c,
      tabindex: "0"
    }, [
      a("div", {
        class: ce(r(s).theme.actualValue)
      }, [
        a("div", {
          class: ce([
            r(s).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          style: fn(
            r(s).fullScreen ? "" : "max-height: " + t.maxHeight + ";height: " + t.maxHeight
          ),
          onMousedown: p[0] || (p[0] = (m) => r(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (m) => r(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          G(Mc),
          G(Ad),
          a("div", Xf, [
            G(Wf),
            G(nf)
          ]),
          G(_f)
        ], 38),
        G(fr, { name: "fade" }, {
          default: te(() => [
            r(s).modal.visible ? (_(), K(Us(r(s).modal.type), { key: 0 })) : z("", !0)
          ]),
          _: 1
        }),
        G(rf)
      ], 2)
    ], 512));
  }
}, lv = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", Zf);
  }
};
export {
  Yf as SimpleContextMenuItem,
  Kf as contextMenuItems,
  lv as default
};
