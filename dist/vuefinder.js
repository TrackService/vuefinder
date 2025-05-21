import { ref as H, inject as le, onMounted as Me, nextTick as Tt, createElementBlock as b, openBlock as f, withKeys as Ot, unref as r, createElementVNode as a, withModifiers as Xe, renderSlot as Mt, normalizeClass as de, toDisplayString as w, onUnmounted as Fs, createBlock as Z, resolveDynamicComponent as Us, computed as ot, withCtx as ne, createVNode as G, createCommentVNode as z, Fragment as ke, renderList as Ce, withDirectives as he, vModelCheckbox as Yt, createTextVNode as J, vModelSelect as fs, watch as Be, vModelText as Ft, onBeforeUnmount as Hs, customRef as Xo, vShow as ze, isRef as Jo, TransitionGroup as er, normalizeStyle as un, reactive as Is, onUpdated as tr, mergeModels as nr, useModel as Rs, resolveComponent as sr, Transition as or } from "vue";
import "mitt";
import "dragselect";
import rr from "@uppy/core";
import ar from "@uppy/xhr-upload";
import lr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import ir from "cropperjs";
var Os;
(Os = document.querySelector('meta[name="csrf-token"]')) == null || Os.getAttribute("content");
const fe = {
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
};
Object.values(fe);
function cr(n, e, s, l, o) {
  return (e = Math, s = e.log, l = 1024, o = s(n) / s(l) | 0, n / e.pow(l, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "iB" : "B");
}
function dr(n, e, s, l, o) {
  return (e = Math, s = e.log, l = 1e3, o = s(n) / s(l) | 0, n / e.pow(l, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "B" : "B");
}
function ur(n) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, l = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  return l[1] * Math.pow(1024, e[l[2].toLowerCase()]);
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
const Oe = (n, e) => {
  const { o: s, i: l, u: o } = n;
  let c = s, d;
  const _ = (u, m) => {
    const h = c, p = u, g = m || (l ? !l(h, p) : h !== p);
    return (g || o) && (c = p, d = h), [c, g, d];
  };
  return [e ? (u) => _(e(c, d), u) : _, (u) => [c, !!u, d]];
}, _r = typeof window < "u" && typeof HTMLElement < "u" && !!window.document, Ve = _r ? window : {}, Bs = Math.max, vr = Math.min, Vn = Math.round, nn = Math.abs, ms = Math.sign, Ns = Ve.cancelAnimationFrame, Yn = Ve.requestAnimationFrame, sn = Ve.setTimeout, On = Ve.clearTimeout, _n = (n) => typeof Ve[n] < "u" ? Ve[n] : void 0, fr = _n("MutationObserver"), ps = _n("IntersectionObserver"), mt = _n("ResizeObserver"), At = _n("ScrollTimeline"), Zn = (n) => n === void 0, vn = (n) => n === null, Ge = (n) => typeof n == "number", Ut = (n) => typeof n == "string", fn = (n) => typeof n == "boolean", Re = (n) => typeof n == "function", We = (n) => Array.isArray(n), on = (n) => typeof n == "object" && !We(n) && !vn(n), Qn = (n) => {
  const e = !!n && n.length, s = Ge(e) && e > -1 && e % 1 == 0;
  return We(n) || !Re(n) && s ? e > 0 && on(n) ? e - 1 in n : !0 : !1;
}, rn = (n) => !!n && n.constructor === Object, an = (n) => n instanceof HTMLElement, mn = (n) => n instanceof Element;
function ie(n, e) {
  if (Qn(n))
    for (let s = 0; s < n.length && e(n[s], s, n) !== !1; s++)
      ;
  else n && ie(Object.keys(n), (s) => e(n[s], s, n));
  return n;
}
const Ps = (n, e) => n.indexOf(e) >= 0, Dt = (n, e) => n.concat(e), ge = (n, e, s) => (!Ut(e) && Qn(e) ? Array.prototype.push.apply(n, e) : n.push(e), n), it = (n) => Array.from(n || []), Xn = (n) => We(n) ? n : !Ut(n) && Qn(n) ? it(n) : [n], Fn = (n) => !!n && !n.length, Un = (n) => it(new Set(n)), Ue = (n, e, s) => {
  ie(n, (o) => o ? o.apply(void 0, e || []) : !0), s || (n.length = 0);
}, qs = "paddingTop", zs = "paddingRight", js = "paddingLeft", Gs = "paddingBottom", Ws = "marginLeft", Ks = "marginRight", Ys = "marginBottom", Zs = "overflowX", Qs = "overflowY", pn = "width", hn = "height", rt = "visible", _t = "hidden", wt = "scroll", mr = (n) => {
  const e = String(n || "");
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}, gn = (n, e, s, l) => {
  if (n && e) {
    let o = !0;
    return ie(s, (c) => {
      const d = n[c], _ = e[c];
      d !== _ && (o = !1);
    }), o;
  }
  return !1;
}, Xs = (n, e) => gn(n, e, ["w", "h"]), Jt = (n, e) => gn(n, e, ["x", "y"]), pr = (n, e) => gn(n, e, ["t", "r", "b", "l"]), at = () => {
}, Q = (n, ...e) => n.bind(0, ...e), pt = (n) => {
  let e;
  const s = n ? sn : Yn, l = n ? On : Ns;
  return [(o) => {
    l(e), e = s(() => o(), Re(n) ? n() : n);
  }, () => l(e)];
}, ln = (n, e) => {
  const { _: s, p: l, v: o, S: c } = e || {};
  let d, _, i, v, u = at;
  const m = function(x) {
    u(), On(d), v = d = _ = void 0, u = at, n.apply(this, x);
  }, h = (y) => c && _ ? c(_, y) : y, p = () => {
    u !== at && m(h(i) || i);
  }, g = function() {
    const x = it(arguments), V = Re(s) ? s() : s;
    if (Ge(V) && V >= 0) {
      const O = Re(l) ? l() : l, k = Ge(O) && O >= 0, F = V > 0 ? sn : Yn, P = V > 0 ? On : Ns, T = h(x) || x, M = m.bind(0, T);
      let C;
      u(), o && !v ? (M(), v = !0, C = F(() => v = void 0, V)) : (C = F(M, V), k && !d && (d = sn(p, O))), u = () => P(C), _ = i = T;
    } else
      m(x);
  };
  return g.m = p, g;
}, Js = (n, e) => Object.prototype.hasOwnProperty.call(n, e), Ne = (n) => n ? Object.keys(n) : [], re = (n, e, s, l, o, c, d) => {
  const _ = [e, s, l, o, c, d];
  return (typeof n != "object" || vn(n)) && !Re(n) && (n = {}), ie(_, (i) => {
    ie(i, (v, u) => {
      const m = i[u];
      if (n === m)
        return !0;
      const h = We(m);
      if (m && rn(m)) {
        const p = n[u];
        let g = p;
        h && !We(p) ? g = [] : !h && !rn(p) && (g = {}), n[u] = re(g, m);
      } else
        n[u] = h ? m.slice() : m;
    });
  }), n;
}, eo = (n, e) => ie(re({}, n), (s, l, o) => {
  s === void 0 ? delete o[l] : s && rn(s) && (o[l] = eo(s));
}), Jn = (n) => !Ne(n).length, to = (n, e, s) => Bs(n, vr(e, s)), vt = (n) => Un((We(n) ? n : (n || "").split(" ")).filter((e) => e)), es = (n, e) => n && n.getAttribute(e), hs = (n, e) => n && n.hasAttribute(e), Ze = (n, e, s) => {
  ie(vt(e), (l) => {
    n && n.setAttribute(l, String(s || ""));
  });
}, qe = (n, e) => {
  ie(vt(e), (s) => n && n.removeAttribute(s));
}, bn = (n, e) => {
  const s = vt(es(n, e)), l = Q(Ze, n, e), o = (c, d) => {
    const _ = new Set(s);
    return ie(vt(c), (i) => {
      _[d](i);
    }), it(_).join(" ");
  };
  return {
    O: (c) => l(o(c, "delete")),
    $: (c) => l(o(c, "add")),
    C: (c) => {
      const d = vt(c);
      return d.reduce((_, i) => _ && s.includes(i), d.length > 0);
    }
  };
}, no = (n, e, s) => (bn(n, e).O(s), Q(ts, n, e, s)), ts = (n, e, s) => (bn(n, e).$(s), Q(no, n, e, s)), cn = (n, e, s, l) => (l ? ts : no)(n, e, s), ns = (n, e, s) => bn(n, e).C(s), so = (n) => bn(n, "class"), oo = (n, e) => {
  so(n).O(e);
}, ss = (n, e) => (so(n).$(e), Q(oo, n, e)), ro = (n, e) => {
  const s = e ? mn(e) && e : document;
  return s ? it(s.querySelectorAll(n)) : [];
}, hr = (n, e) => {
  const s = e ? mn(e) && e : document;
  return s && s.querySelector(n);
}, Hn = (n, e) => mn(n) && n.matches(e), ao = (n) => Hn(n, "body"), In = (n) => n ? it(n.childNodes) : [], Lt = (n) => n && n.parentElement, ht = (n, e) => mn(n) && n.closest(e), Rn = (n) => document.activeElement, gr = (n, e, s) => {
  const l = ht(n, e), o = n && hr(s, l), c = ht(o, e) === l;
  return l && o ? l === n || o === n || c && ht(ht(n, s), e) !== l : !1;
}, yt = (n) => {
  ie(Xn(n), (e) => {
    const s = Lt(e);
    e && s && s.removeChild(e);
  });
}, Le = (n, e) => Q(yt, n && e && ie(Xn(e), (s) => {
  s && n.appendChild(s);
}));
let lo;
const br = () => lo, wr = (n) => {
  lo = n;
}, gt = (n) => {
  const e = document.createElement("div");
  return Ze(e, "class", n), e;
}, io = (n) => {
  const e = gt(), s = br(), l = n.trim();
  return e.innerHTML = s ? s.createHTML(l) : l, ie(In(e), (o) => yt(o));
}, gs = (n, e) => n.getPropertyValue(e) || n[e] || "", co = (n) => {
  const e = n || 0;
  return isFinite(e) ? e : 0;
}, Zt = (n) => co(parseFloat(n || "")), Bn = (n) => Math.round(n * 1e4) / 1e4, uo = (n) => `${Bn(co(n))}px`;
function Vt(n, e) {
  n && e && ie(e, (s, l) => {
    try {
      const o = n.style, c = vn(s) || fn(s) ? "" : Ge(s) ? uo(s) : s;
      l.indexOf("--") === 0 ? o.setProperty(l, c) : o[l] = c;
    } catch {
    }
  });
}
function Je(n, e, s) {
  const l = Ut(e);
  let o = l ? "" : {};
  if (n) {
    const c = Ve.getComputedStyle(n, s) || n.style;
    o = l ? gs(c, e) : it(e).reduce((d, _) => (d[_] = gs(c, _), d), o);
  }
  return o;
}
const bs = (n, e, s) => {
  const l = e ? `${e}-` : "", o = s ? `-${s}` : "", c = `${l}top${o}`, d = `${l}right${o}`, _ = `${l}bottom${o}`, i = `${l}left${o}`, v = Je(n, [c, d, _, i]);
  return {
    t: Zt(v[c]),
    r: Zt(v[d]),
    b: Zt(v[_]),
    l: Zt(v[i])
  };
}, Cn = (n, e) => `translate${on(n) ? `(${n.x},${n.y})` : `${e ? "X" : "Y"}(${n})`}`, yr = (n) => !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length), kr = {
  w: 0,
  h: 0
}, wn = (n, e) => e ? {
  w: e[`${n}Width`],
  h: e[`${n}Height`]
} : kr, xr = (n) => wn("inner", n || Ve), bt = Q(wn, "offset"), _o = Q(wn, "client"), dn = Q(wn, "scroll"), os = (n) => {
  const e = parseFloat(Je(n, pn)) || 0, s = parseFloat(Je(n, hn)) || 0;
  return {
    w: e - Vn(e),
    h: s - Vn(s)
  };
}, En = (n) => n.getBoundingClientRect(), $r = (n) => !!n && yr(n), Nn = (n) => !!(n && (n[hn] || n[pn])), vo = (n, e) => {
  const s = Nn(n);
  return !Nn(e) && s;
}, ws = (n, e, s, l) => {
  ie(vt(e), (o) => {
    n && n.removeEventListener(o, s, l);
  });
}, ve = (n, e, s, l) => {
  var o;
  const c = (o = l && l.H) != null ? o : !0, d = l && l.I || !1, _ = l && l.A || !1, i = {
    passive: c,
    capture: d
  };
  return Q(Ue, vt(e).map((v) => {
    const u = _ ? (m) => {
      ws(n, v, u, d), s && s(m);
    } : s;
    return n && n.addEventListener(v, u, i), Q(ws, n, v, u, d);
  }));
}, fo = (n) => n.stopPropagation(), Pn = (n) => n.preventDefault(), mo = (n) => fo(n) || Pn(n), je = (n, e) => {
  const { x: s, y: l } = Ge(e) ? {
    x: e,
    y: e
  } : e || {};
  Ge(s) && (n.scrollLeft = s), Ge(l) && (n.scrollTop = l);
}, Fe = (n) => ({
  x: n.scrollLeft,
  y: n.scrollTop
}), po = () => ({
  D: {
    x: 0,
    y: 0
  },
  M: {
    x: 0,
    y: 0
  }
}), Sr = (n, e) => {
  const { D: s, M: l } = n, { w: o, h: c } = e, d = (m, h, p) => {
    let g = ms(m) * p, y = ms(h) * p;
    if (g === y) {
      const x = nn(m), V = nn(h);
      y = x > V ? 0 : y, g = x < V ? 0 : g;
    }
    return g = g === y ? 0 : g, [g + 0, y + 0];
  }, [_, i] = d(s.x, l.x, o), [v, u] = d(s.y, l.y, c);
  return {
    D: {
      x: _,
      y: v
    },
    M: {
      x: i,
      y: u
    }
  };
}, An = ({ D: n, M: e }) => {
  const s = (l, o) => l === 0 && l <= o;
  return {
    x: s(n.x, e.x),
    y: s(n.y, e.y)
  };
}, ys = ({ D: n, M: e }, s) => {
  const l = (o, c, d) => to(0, 1, (o - d) / (o - c) || 0);
  return {
    x: l(n.x, e.x, s.x),
    y: l(n.y, e.y, s.y)
  };
}, qn = (n) => {
  n && n.focus && n.focus({
    preventScroll: !0
  });
}, ks = (n, e) => {
  ie(Xn(e), n);
}, zn = (n) => {
  const e = /* @__PURE__ */ new Map(), s = (c, d) => {
    if (c) {
      const _ = e.get(c);
      ks((i) => {
        _ && _[i ? "delete" : "clear"](i);
      }, d);
    } else
      e.forEach((_) => {
        _.clear();
      }), e.clear();
  }, l = (c, d) => {
    if (Ut(c)) {
      const v = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, v), ks((u) => {
        Re(u) && v.add(u);
      }, d), Q(s, c, d);
    }
    fn(d) && d && s();
    const _ = Ne(c), i = [];
    return ie(_, (v) => {
      const u = c[v];
      u && ge(i, l(v, u));
    }), Q(Ue, i);
  }, o = (c, d) => {
    ie(it(e.get(c)), (_) => {
      d && !Fn(d) ? _.apply(0, d) : _();
    });
  };
  return l(n || {}), [l, s, o];
}, ho = {}, go = {}, Cr = (n) => {
  ie(n, (e) => ie(e, (s, l) => {
    ho[l] = e[l];
  }));
}, bo = (n, e, s) => Ne(n).map((l) => {
  const { static: o, instance: c } = n[l], [d, _, i] = s || [], v = s ? c : o;
  if (v) {
    const u = s ? v(d, _, e) : v(e);
    return (i || go)[l] = u;
  }
}), Ht = (n) => go[n], Er = "__osOptionsValidationPlugin", xt = "data-overlayscrollbars", en = "os-environment", Qt = `${en}-scrollbar-hidden`, Tn = `${xt}-initialize`, tn = "noClipping", xs = `${xt}-body`, lt = xt, Ar = "host", Qe = `${xt}-viewport`, Tr = Zs, Mr = Qs, Dr = "arrange", wo = "measuring", Lr = "scrolling", yo = "scrollbarHidden", Vr = "noContent", jn = `${xt}-padding`, $s = `${xt}-content`, rs = "os-size-observer", Or = `${rs}-appear`, Fr = `${rs}-listener`, Ur = "os-trinsic-observer", Hr = "os-theme-none", He = "os-scrollbar", Ir = `${He}-rtl`, Rr = `${He}-horizontal`, Br = `${He}-vertical`, ko = `${He}-track`, as = `${He}-handle`, Nr = `${He}-visible`, Pr = `${He}-cornerless`, Ss = `${He}-interaction`, Cs = `${He}-unusable`, Gn = `${He}-auto-hide`, Es = `${Gn}-hidden`, As = `${He}-wheel`, qr = `${ko}-interactive`, zr = `${as}-interactive`, jr = "__osSizeObserverPlugin", Gr = (n, e) => {
  const { T: s } = e, [l, o] = n("showNativeOverlaidScrollbars");
  return [l && s.x && s.y, o];
}, kt = (n) => n.indexOf(rt) === 0, Wr = (n, e) => {
  const s = (o, c, d, _) => {
    const i = o === rt ? _t : o.replace(`${rt}-`, ""), v = kt(o), u = kt(d);
    return !c && !_ ? _t : v && u ? rt : v ? c && _ ? i : c ? rt : _t : c ? i : u && _ ? rt : _t;
  }, l = {
    x: s(e.x, n.x, e.y, n.y),
    y: s(e.y, n.y, e.x, n.x)
  };
  return {
    k: l,
    R: {
      x: l.x === wt,
      y: l.y === wt
    }
  };
}, xo = "__osScrollbarsHidingPlugin", Kr = "__osClickScrollPlugin", Ts = (n) => JSON.stringify(n, (e, s) => {
  if (Re(s))
    throw 0;
  return s;
}), Ms = (n, e) => n ? `${e}`.split(".").reduce((s, l) => s && Js(s, l) ? s[l] : void 0, n) : void 0, Yr = {
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
}, $o = (n, e) => {
  const s = {}, l = Dt(Ne(e), Ne(n));
  return ie(l, (o) => {
    const c = n[o], d = e[o];
    if (on(c) && on(d))
      re(s[o] = {}, $o(c, d)), Jn(s[o]) && delete s[o];
    else if (Js(e, o) && d !== c) {
      let _ = !0;
      if (We(c) || We(d))
        try {
          Ts(c) === Ts(d) && (_ = !1);
        } catch {
        }
      _ && (s[o] = d);
    }
  }), s;
}, Ds = (n, e, s) => (l) => [Ms(n, l), s || Ms(e, l) !== void 0];
let So;
const Zr = () => So, Qr = (n) => {
  So = n;
};
let Mn;
const Xr = () => {
  const n = (k, F, P) => {
    Le(document.body, k), Le(document.body, k);
    const S = _o(k), T = bt(k), M = os(F);
    return P && yt(k), {
      x: T.h - S.h + M.h,
      y: T.w - S.w + M.w
    };
  }, e = (k) => {
    let F = !1;
    const P = ss(k, Qt);
    try {
      F = Je(k, "scrollbar-width") === "none" || Je(k, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return P(), F;
  }, s = `.${en}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${en} div{width:200%;height:200%;margin:10px 0}.${Qt}{scrollbar-width:none!important}.${Qt}::-webkit-scrollbar,.${Qt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, o = io(`<div class="${en}"><div></div><style>${s}</style></div>`)[0], c = o.firstChild, d = o.lastChild, _ = Zr();
  _ && (d.nonce = _);
  const [i, , v] = zn(), [u, m] = Oe({
    o: n(o, c),
    i: Jt
  }, Q(n, o, c, !0)), [h] = m(), p = e(o), g = {
    x: h.x === 0,
    y: h.y === 0
  }, y = {
    elements: {
      host: null,
      padding: !p,
      viewport: (k) => p && ao(k) && k,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, x = re({}, Yr), V = Q(re, {}, x), W = Q(re, {}, y), O = {
    N: h,
    T: g,
    P: p,
    G: !!At,
    K: Q(i, "r"),
    Z: W,
    tt: (k) => re(y, k) && W(),
    nt: V,
    ot: (k) => re(x, k) && V(),
    st: re({}, y),
    et: re({}, x)
  };
  if (qe(o, "style"), yt(o), ve(Ve, "resize", () => {
    v("r", []);
  }), Re(Ve.matchMedia) && !p && (!g.x || !g.y)) {
    const k = (F) => {
      const P = Ve.matchMedia(`(resolution: ${Ve.devicePixelRatio}dppx)`);
      ve(P, "change", () => {
        F(), k(F);
      }, {
        A: !0
      });
    };
    k(() => {
      const [F, P] = u();
      re(O.N, F), v("r", [P]);
    });
  }
  return O;
}, Ke = () => (Mn || (Mn = Xr()), Mn), Jr = (n, e, s) => {
  let l = !1;
  const o = s ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    l = !0;
  }, d = (_) => {
    if (o && s) {
      const i = s.map((v) => {
        const [u, m] = v || [];
        return [m && u ? (_ || ro)(u, n) : [], m];
      });
      ie(i, (v) => ie(v[0], (u) => {
        const m = v[1], h = o.get(u) || [];
        if (n.contains(u) && m) {
          const g = ve(u, m, (y) => {
            l ? (g(), o.delete(u)) : e(y);
          });
          o.set(u, ge(h, g));
        } else
          Ue(h), o.delete(u);
      }));
    }
  };
  return d(), [c, d];
}, Ls = (n, e, s, l) => {
  let o = !1;
  const { ct: c, rt: d, lt: _, it: i, ut: v, ft: u } = l || {}, m = ln(() => o && s(!0), {
    _: 33,
    p: 99
  }), [h, p] = Jr(n, m, _), g = c || [], y = d || [], x = Dt(g, y), V = (O, k) => {
    if (!Fn(k)) {
      const F = v || at, P = u || at, S = [], T = [];
      let M = !1, C = !1;
      if (ie(k, (L) => {
        const { attributeName: D, target: I, type: E, oldValue: R, addedNodes: B, removedNodes: ee } = L, oe = E === "attributes", se = E === "childList", me = n === I, Y = oe && D, $ = Y && es(I, D || ""), U = Ut($) ? $ : null, N = Y && R !== U, A = Ps(y, D) && N;
        if (e && (se || !me)) {
          const j = oe && N, q = j && i && Hn(I, i), X = (q ? !F(I, D, R, U) : !oe || j) && !P(L, !!q, n, l);
          ie(B, (ae) => ge(S, ae)), ie(ee, (ae) => ge(S, ae)), C = C || X;
        }
        !e && me && N && !F(I, D, R, U) && (ge(T, D), M = M || A);
      }), p((L) => Un(S).reduce((D, I) => (ge(D, ro(L, I)), Hn(I, L) ? ge(D, I) : D), [])), e)
        return !O && C && s(!1), [!1];
      if (!Fn(T) || M) {
        const L = [Un(T), M];
        return O || s.apply(0, L), L;
      }
    }
  }, W = new fr(Q(V, !1));
  return [() => (W.observe(n, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: x,
    subtree: e,
    childList: e,
    characterData: e
  }), o = !0, () => {
    o && (h(), W.disconnect(), o = !1);
  }), () => {
    if (o)
      return m.m(), V(!0, W.takeRecords());
  }];
};
let ut = null;
const Co = (n, e, s) => {
  const { _t: l } = s || {}, o = Ht(jr), [c] = Oe({
    o: !1,
    u: !0
  });
  return () => {
    const d = [], i = io(`<div class="${rs}"><div class="${Fr}"></div></div>`)[0], v = i.firstChild, u = (m) => {
      const h = m instanceof ResizeObserverEntry;
      let p = !1, g = !1;
      if (h) {
        const [y, , x] = c(m.contentRect), V = Nn(y);
        g = vo(y, x), p = !g && !V;
      } else
        g = m === !0;
      p || e({
        dt: !0,
        _t: g
      });
    };
    if (mt) {
      if (!fn(ut)) {
        const g = new mt(at);
        g.observe(n, {
          get box() {
            ut = !0;
          }
        }), ut = ut || !1, g.disconnect();
      }
      const m = ln(u, {
        _: 0,
        p: 0
      }), h = (g) => m(g.pop()), p = new mt(h);
      if (p.observe(ut ? n : v), ge(d, [() => p.disconnect(), !ut && Le(n, i)]), ut) {
        const g = new mt(h);
        g.observe(n, {
          box: "border-box"
        }), ge(d, () => g.disconnect());
      }
    } else if (o) {
      const [m, h] = o(v, u, l);
      ge(d, Dt([ss(i, Or), ve(i, "animationstart", m), Le(n, i)], h));
    } else
      return at;
    return Q(Ue, d);
  };
}, ea = (n, e) => {
  let s;
  const l = (i) => i.h === 0 || i.isIntersecting || i.intersectionRatio > 0, o = gt(Ur), [c] = Oe({
    o: !1
  }), d = (i, v) => {
    if (i) {
      const u = c(l(i)), [, m] = u;
      return m && !v && e(u) && [u];
    }
  }, _ = (i, v) => d(v.pop(), i);
  return [() => {
    const i = [];
    if (ps)
      s = new ps(Q(_, !1), {
        root: n
      }), s.observe(o), ge(i, () => {
        s.disconnect();
      });
    else {
      const v = () => {
        const u = bt(o);
        d(u);
      };
      ge(i, Co(o, v)()), v();
    }
    return Q(Ue, ge(i, Le(n, o)));
  }, () => s && _(!0, s.takeRecords())];
}, ta = (n, e, s, l) => {
  let o, c, d, _, i, v;
  const u = `[${lt}]`, m = `[${Qe}]`, h = ["id", "class", "style", "open", "wrap", "cols", "rows"], { vt: p, ht: g, U: y, gt: x, bt: V, L: W, wt: O, yt: k, St: F, Ot: P } = n, S = (A) => Je(A, "direction") === "rtl", T = {
    $t: !1,
    F: S(p)
  }, M = Ke(), C = Ht(xo), [L] = Oe({
    i: Xs,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const A = C && C.V(n, e, T, M, s).W, q = !(O && W) && ns(g, lt, tn), K = !W && k(Dr), X = K && Fe(x), ae = X && P(), _e = F(wo, q), ce = K && A && A()[0], Ee = dn(y), te = os(y);
    return ce && ce(), je(x, X), ae && ae(), q && _e(), {
      w: Ee.w + te.w,
      h: Ee.h + te.h
    };
  }), D = ln(l, {
    _: () => o,
    p: () => c,
    S(A, j) {
      const [q] = A, [K] = j;
      return [Dt(Ne(q), Ne(K)).reduce((X, ae) => (X[ae] = q[ae] || K[ae], X), {})];
    }
  }), I = (A) => {
    const j = S(p);
    re(A, {
      Ct: v !== j
    }), re(T, {
      F: j
    }), v = j;
  }, E = (A, j) => {
    const [q, K] = A, X = {
      xt: K
    };
    return re(T, {
      $t: q
    }), j || l(X), X;
  }, R = ({ dt: A, _t: j }) => {
    const K = !(A && !j) && M.P ? D : l, X = {
      dt: A || j,
      _t: j
    };
    I(X), K(X);
  }, B = (A, j) => {
    const [, q] = L(), K = {
      Ht: q
    };
    return I(K), q && !j && (A ? l : D)(K), K;
  }, ee = (A, j, q) => {
    const K = {
      Et: j
    };
    return I(K), j && !q && D(K), K;
  }, [oe, se] = V ? ea(g, E) : [], me = !W && Co(g, R, {
    _t: !0
  }), [Y, $] = Ls(g, !1, ee, {
    rt: h,
    ct: h
  }), U = W && mt && new mt((A) => {
    const j = A[A.length - 1].contentRect;
    R({
      dt: !0,
      _t: vo(j, i)
    }), i = j;
  }), N = ln(() => {
    const [, A] = L();
    l({
      Ht: A
    });
  }, {
    _: 222,
    v: !0
  });
  return [() => {
    U && U.observe(g);
    const A = me && me(), j = oe && oe(), q = Y(), K = M.K((X) => {
      X ? D({
        zt: X
      }) : N();
    });
    return () => {
      U && U.disconnect(), A && A(), j && j(), _ && _(), q(), K();
    };
  }, ({ It: A, At: j, Dt: q }) => {
    const K = {}, [X] = A("update.ignoreMutation"), [ae, _e] = A("update.attributes"), [ce, Ee] = A("update.elementEvents"), [te, ye] = A("update.debounce"), De = Ee || _e, xe = j || q, $e = (be) => Re(X) && X(be);
    if (De) {
      d && d(), _ && _();
      const [be, we] = Ls(V || y, !0, B, {
        ct: Dt(h, ae || []),
        lt: ce,
        it: u,
        ft: (pe, ue) => {
          const { target: Se, attributeName: Te } = pe;
          return (!ue && Te && !W ? gr(Se, u, m) : !1) || !!ht(Se, `.${He}`) || !!$e(pe);
        }
      });
      _ = be(), d = we;
    }
    if (ye)
      if (D.m(), We(te)) {
        const be = te[0], we = te[1];
        o = Ge(be) && be, c = Ge(we) && we;
      } else Ge(te) ? (o = te, c = !1) : (o = !1, c = !1);
    if (xe) {
      const be = $(), we = se && se(), pe = d && d();
      be && re(K, ee(be[0], be[1], xe)), we && re(K, E(we[0], xe)), pe && re(K, B(pe[0], xe));
    }
    return I(K), K;
  }, T];
}, Eo = (n, e) => Re(e) ? e.apply(0, n) : e, na = (n, e, s, l) => {
  const o = Zn(l) ? s : l;
  return Eo(n, o) || e.apply(0, n);
}, Ao = (n, e, s, l) => {
  const o = Zn(l) ? s : l, c = Eo(n, o);
  return !!c && (an(c) ? c : e.apply(0, n));
}, sa = (n, e) => {
  const { nativeScrollbarsOverlaid: s, body: l } = e || {}, { T: o, P: c, Z: d } = Ke(), { nativeScrollbarsOverlaid: _, body: i } = d().cancel, v = s ?? _, u = Zn(l) ? i : l, m = (o.x || o.y) && v, h = n && (vn(u) ? !c : u);
  return !!m || !!h;
}, oa = (n, e, s, l) => {
  const o = "--os-viewport-percent", c = "--os-scroll-percent", d = "--os-scroll-direction", { Z: _ } = Ke(), { scrollbars: i } = _(), { slot: v } = i, { vt: u, ht: m, U: h, Mt: p, gt: g, wt: y, L: x } = e, { scrollbars: V } = p ? {} : n, { slot: W } = V || {}, O = [], k = [], F = [], P = Ao([u, m, h], () => x && y ? u : m, v, W), S = (Y) => {
    if (At) {
      let $ = null, U = [];
      const N = new At({
        source: g,
        axis: Y
      }), A = () => {
        $ && $.cancel(), $ = null;
      };
      return {
        Rt: (q) => {
          const { Tt: K } = s, X = An(K)[Y], ae = Y === "x", _e = [Cn(0, ae), Cn(`calc(100cq${ae ? "w" : "h"} + -100%)`, ae)], ce = X ? _e : _e.reverse();
          return U[0] === ce[0] && U[1] === ce[1] || (A(), U = ce, $ = q.kt.animate({
            clear: ["left"],
            transform: ce
          }, {
            timeline: N
          })), A;
        }
      };
    }
  }, T = {
    x: S("x"),
    y: S("y")
  }, M = () => {
    const { Vt: Y, Lt: $ } = s, U = (N, A) => to(0, 1, N / (N + A) || 0);
    return {
      x: U($.x, Y.x),
      y: U($.y, Y.y)
    };
  }, C = (Y, $, U) => {
    const N = U ? ss : oo;
    ie(Y, (A) => {
      N(A.Ut, $);
    });
  }, L = (Y, $) => {
    ie(Y, (U) => {
      const [N, A] = $(U);
      Vt(N, A);
    });
  }, D = (Y, $, U) => {
    const N = fn(U), A = N ? U : !0, j = N ? !U : !0;
    A && C(k, Y, $), j && C(F, Y, $);
  }, I = () => {
    const Y = M(), $ = (U) => (N) => [N.Ut, {
      [o]: Bn(U) + ""
    }];
    L(k, $(Y.x)), L(F, $(Y.y));
  }, E = () => {
    if (!At) {
      const { Tt: Y } = s, $ = ys(Y, Fe(g)), U = (N) => (A) => [A.Ut, {
        [c]: Bn(N) + ""
      }];
      L(k, U($.x)), L(F, U($.y));
    }
  }, R = () => {
    const { Tt: Y } = s, $ = An(Y), U = (N) => (A) => [A.Ut, {
      [d]: N ? "0" : "1"
    }];
    L(k, U($.x)), L(F, U($.y)), At && (k.forEach(T.x.Rt), F.forEach(T.y.Rt));
  }, B = () => {
    if (x && !y) {
      const { Vt: Y, Tt: $ } = s, U = An($), N = ys($, Fe(g)), A = (j) => {
        const { Ut: q } = j, K = Lt(q) === h && q, X = (ae, _e, ce) => {
          const Ee = _e * ae;
          return uo(ce ? Ee : -Ee);
        };
        return [K, K && {
          transform: Cn({
            x: X(N.x, Y.x, U.x),
            y: X(N.y, Y.y, U.y)
          })
        }];
      };
      L(k, A), L(F, A);
    }
  }, ee = (Y) => {
    const $ = Y ? "x" : "y", N = gt(`${He} ${Y ? Rr : Br}`), A = gt(ko), j = gt(as), q = {
      Ut: N,
      Pt: A,
      kt: j
    }, K = T[$];
    return ge(Y ? k : F, q), ge(O, [Le(N, A), Le(A, j), Q(yt, N), K && K.Rt(q), l(q, D, Y)]), q;
  }, oe = Q(ee, !0), se = Q(ee, !1), me = () => (Le(P, k[0].Ut), Le(P, F[0].Ut), Q(Ue, O));
  return oe(), se(), [{
    Nt: I,
    qt: E,
    Bt: R,
    Ft: B,
    jt: D,
    Xt: {
      Yt: k,
      Wt: oe,
      Jt: Q(L, k)
    },
    Gt: {
      Yt: F,
      Wt: se,
      Jt: Q(L, F)
    }
  }, me];
}, ra = (n, e, s, l) => (o, c, d) => {
  const { ht: _, U: i, L: v, gt: u, Kt: m, Ot: h } = e, { Ut: p, Pt: g, kt: y } = o, [x, V] = pt(333), [W, O] = pt(444), k = (S) => {
    Re(u.scrollBy) && u.scrollBy({
      behavior: "smooth",
      left: S.x,
      top: S.y
    });
  }, F = () => {
    const S = "pointerup pointercancel lostpointercapture", T = `client${d ? "X" : "Y"}`, M = d ? pn : hn, C = d ? "left" : "top", L = d ? "w" : "h", D = d ? "x" : "y", I = (R, B) => (ee) => {
      const { Vt: oe } = s, se = bt(g)[L] - bt(y)[L], Y = B * ee / se * oe[D];
      je(u, {
        [D]: R + Y
      });
    }, E = [];
    return ve(g, "pointerdown", (R) => {
      const B = ht(R.target, `.${as}`) === y, ee = B ? y : g, oe = n.scrollbars, se = oe[B ? "dragScroll" : "clickScroll"], { button: me, isPrimary: Y, pointerType: $ } = R, { pointers: U } = oe;
      if (me === 0 && Y && se && (U || []).includes($)) {
        Ue(E), O();
        const A = !B && (R.shiftKey || se === "instant"), j = Q(En, y), q = Q(En, g), K = (ue, Se) => (ue || j())[C] - (Se || q())[C], X = Vn(En(u)[M]) / bt(u)[L] || 1, ae = I(Fe(u)[D], 1 / X), _e = R[T], ce = j(), Ee = q(), te = ce[M], ye = K(ce, Ee) + te / 2, De = _e - Ee[C], xe = B ? 0 : De - ye, $e = (ue) => {
          Ue(pe), ee.releasePointerCapture(ue.pointerId);
        }, be = B || A, we = h(), pe = [ve(m, S, $e), ve(m, "selectstart", (ue) => Pn(ue), {
          H: !1
        }), ve(g, S, $e), be && ve(g, "pointermove", (ue) => ae(xe + (ue[T] - _e))), be && (() => {
          const ue = Fe(u);
          we();
          const Se = Fe(u), Te = {
            x: Se.x - ue.x,
            y: Se.y - ue.y
          };
          (nn(Te.x) > 3 || nn(Te.y) > 3) && (h(), je(u, ue), k(Te), W(we));
        })];
        if (ee.setPointerCapture(R.pointerId), A)
          ae(xe);
        else if (!B) {
          const ue = Ht(Kr);
          if (ue) {
            const Se = ue(ae, xe, te, (Te) => {
              Te ? we() : ge(pe, we);
            });
            ge(pe, Se), ge(E, Q(Se, !0));
          }
        }
      }
    });
  };
  let P = !0;
  return Q(Ue, [ve(y, "pointermove pointerleave", l), ve(p, "pointerenter", () => {
    c(Ss, !0);
  }), ve(p, "pointerleave pointercancel", () => {
    c(Ss, !1);
  }), !v && ve(p, "mousedown", () => {
    const S = Rn();
    (hs(S, Qe) || hs(S, lt) || S === document.body) && sn(Q(qn, i), 25);
  }), ve(p, "wheel", (S) => {
    const { deltaX: T, deltaY: M, deltaMode: C } = S;
    P && C === 0 && Lt(p) === _ && k({
      x: T,
      y: M
    }), P = !1, c(As, !0), x(() => {
      P = !0, c(As);
    }), Pn(S);
  }, {
    H: !1,
    I: !0
  }), ve(p, "pointerdown", Q(ve, m, "click", mo, {
    A: !0,
    I: !0,
    H: !1
  }), {
    I: !0
  }), F(), V, O]);
}, aa = (n, e, s, l, o, c) => {
  let d, _, i, v, u, m = at, h = 0;
  const p = ["mouse", "pen"], g = ($) => p.includes($.pointerType), [y, x] = pt(), [V, W] = pt(100), [O, k] = pt(100), [F, P] = pt(() => h), [S, T] = oa(n, o, l, ra(e, o, l, ($) => g($) && oe())), { ht: M, Qt: C, wt: L } = o, { jt: D, Nt: I, qt: E, Bt: R, Ft: B } = S, ee = ($, U) => {
    if (P(), $)
      D(Es);
    else {
      const N = Q(D, Es, !0);
      h > 0 && !U ? F(N) : N();
    }
  }, oe = () => {
    (i ? !d : !v) && (ee(!0), V(() => {
      ee(!1);
    }));
  }, se = ($) => {
    D(Gn, $, !0), D(Gn, $, !1);
  }, me = ($) => {
    g($) && (d = i, i && ee(!0));
  }, Y = [P, W, k, x, () => m(), ve(M, "pointerover", me, {
    A: !0
  }), ve(M, "pointerenter", me), ve(M, "pointerleave", ($) => {
    g($) && (d = !1, i && ee(!1));
  }), ve(M, "pointermove", ($) => {
    g($) && _ && oe();
  }), ve(C, "scroll", ($) => {
    y(() => {
      E(), oe();
    }), c($), B();
  })];
  return [() => Q(Ue, ge(Y, T())), ({ It: $, Dt: U, Zt: N, tn: A }) => {
    const { nn: j, sn: q, en: K, cn: X } = A || {}, { Ct: ae, _t: _e } = N || {}, { F: ce } = s, { T: Ee } = Ke(), { k: te, rn: ye } = l, [De, xe] = $("showNativeOverlaidScrollbars"), [$e, be] = $("scrollbars.theme"), [we, pe] = $("scrollbars.visibility"), [ue, Se] = $("scrollbars.autoHide"), [Te, $t] = $("scrollbars.autoHideSuspend"), [It] = $("scrollbars.autoHideDelay"), [Rt, Bt] = $("scrollbars.dragScroll"), [dt, St] = $("scrollbars.clickScroll"), [Nt, kn] = $("overflow"), xn = _e && !U, $n = ye.x || ye.y, Pe = j || q || X || ae || U, Sn = K || pe || kn, Pt = De && Ee.x && Ee.y, qt = (st, Ct, Et) => {
      const zt = st.includes(wt) && (we === rt || we === "auto" && Ct === wt);
      return D(Nr, zt, Et), zt;
    };
    if (h = It, xn && (Te && $n ? (se(!1), m(), O(() => {
      m = ve(C, "scroll", Q(se, !0), {
        A: !0
      });
    })) : se(!0)), xe && D(Hr, Pt), be && (D(u), D($e, !0), u = $e), $t && !Te && se(!0), Se && (_ = ue === "move", i = ue === "leave", v = ue === "never", ee(v, !0)), Bt && D(zr, Rt), St && D(qr, !!dt), Sn) {
      const st = qt(Nt.x, te.x, !0), Ct = qt(Nt.y, te.y, !1);
      D(Pr, !(st && Ct));
    }
    Pe && (E(), I(), B(), X && R(), D(Cs, !ye.x, !0), D(Cs, !ye.y, !1), D(Ir, ce && !L));
  }, {}, S];
}, la = (n) => {
  const e = Ke(), { Z: s, P: l } = e, { elements: o } = s(), { padding: c, viewport: d, content: _ } = o, i = an(n), v = i ? {} : n, { elements: u } = v, { padding: m, viewport: h, content: p } = u || {}, g = i ? n : v.target, y = ao(g), x = g.ownerDocument, V = x.documentElement, W = () => x.defaultView || Ve, O = Q(na, [g]), k = Q(Ao, [g]), F = Q(gt, ""), P = Q(O, F, d), S = Q(k, F, _), T = (te) => {
    const ye = bt(te), De = dn(te), xe = Je(te, Zs), $e = Je(te, Qs);
    return De.w - ye.w > 0 && !kt(xe) || De.h - ye.h > 0 && !kt($e);
  }, M = P(h), C = M === g, L = C && y, D = !C && S(p), I = !C && M === D, E = L ? V : M, R = L ? E : g, B = !C && k(F, c, m), ee = !I && D, oe = [ee, E, B, R].map((te) => an(te) && !Lt(te) && te), se = (te) => te && Ps(oe, te), me = !se(E) && T(E) ? E : g, Y = L ? V : E, U = {
    vt: g,
    ht: R,
    U: E,
    ln: B,
    bt: ee,
    gt: Y,
    Qt: L ? x : E,
    an: y ? V : me,
    Kt: x,
    wt: y,
    Mt: i,
    L: C,
    un: W,
    yt: (te) => ns(E, Qe, te),
    St: (te, ye) => cn(E, Qe, te, ye),
    Ot: () => cn(Y, Qe, Lr, !0)
  }, { vt: N, ht: A, ln: j, U: q, bt: K } = U, X = [() => {
    qe(A, [lt, Tn]), qe(N, Tn), y && qe(V, [Tn, lt]);
  }];
  let ae = In([K, q, j, A, N].find((te) => te && !se(te)));
  const _e = L ? N : K || q, ce = Q(Ue, X);
  return [U, () => {
    const te = W(), ye = Rn(), De = (pe) => {
      Le(Lt(pe), In(pe)), yt(pe);
    }, xe = (pe) => ve(pe, "focusin focusout focus blur", mo, {
      I: !0,
      H: !1
    }), $e = "tabindex", be = es(q, $e), we = xe(ye);
    return Ze(A, lt, C ? "" : Ar), Ze(j, jn, ""), Ze(q, Qe, ""), Ze(K, $s, ""), C || (Ze(q, $e, be || "-1"), y && Ze(V, xs, "")), Le(_e, ae), Le(A, j), Le(j || A, !C && q), Le(q, K), ge(X, [we, () => {
      const pe = Rn(), ue = se(q), Se = ue && pe === q ? N : pe, Te = xe(Se);
      qe(j, jn), qe(K, $s), qe(q, Qe), y && qe(V, xs), be ? Ze(q, $e, be) : qe(q, $e), se(K) && De(K), ue && De(q), se(j) && De(j), qn(Se), Te();
    }]), l && !C && (ts(q, Qe, yo), ge(X, Q(qe, q, Qe))), qn(!C && y && ye === N && te.top === te ? q : ye), we(), ae = 0, ce;
  }, ce];
}, ia = ({ bt: n }) => ({ Zt: e, fn: s, Dt: l }) => {
  const { xt: o } = e || {}, { $t: c } = s;
  n && (o || l) && Vt(n, {
    [hn]: c && "100%"
  });
}, ca = ({ ht: n, ln: e, U: s, L: l }, o) => {
  const [c, d] = Oe({
    i: pr,
    o: bs()
  }, Q(bs, n, "padding", ""));
  return ({ It: _, Zt: i, fn: v, Dt: u }) => {
    let [m, h] = d(u);
    const { P: p } = Ke(), { dt: g, Ht: y, Ct: x } = i || {}, { F: V } = v, [W, O] = _("paddingAbsolute");
    (g || h || (u || y)) && ([m, h] = c(u));
    const F = !l && (O || x || h);
    if (F) {
      const P = !W || !e && !p, S = m.r + m.l, T = m.t + m.b, M = {
        [Ks]: P && !V ? -S : 0,
        [Ys]: P ? -T : 0,
        [Ws]: P && V ? -S : 0,
        top: P ? -m.t : 0,
        right: P ? V ? -m.r : "auto" : 0,
        left: P ? V ? "auto" : -m.l : 0,
        [pn]: P && `calc(100% + ${S}px)`
      }, C = {
        [qs]: P ? m.t : 0,
        [zs]: P ? m.r : 0,
        [Gs]: P ? m.b : 0,
        [js]: P ? m.l : 0
      };
      Vt(e || s, M), Vt(s, C), re(o, {
        ln: m,
        _n: !P,
        j: e ? C : re({}, M, C)
      });
    }
    return {
      dn: F
    };
  };
}, da = (n, e) => {
  const s = Ke(), { ht: l, ln: o, U: c, L: d, Qt: _, gt: i, wt: v, St: u, un: m } = n, { P: h } = s, p = v && d, g = Q(Bs, 0), y = {
    display: () => !1,
    direction: ($) => $ !== "ltr",
    flexDirection: ($) => $.endsWith("-reverse"),
    writingMode: ($) => $ !== "horizontal-tb"
  }, x = Ne(y), V = {
    i: Xs,
    o: {
      w: 0,
      h: 0
    }
  }, W = {
    i: Jt,
    o: {}
  }, O = ($) => {
    u(wo, !p && $);
  }, k = ($) => {
    if (!x.some((_e) => {
      const ce = $[_e];
      return ce && y[_e](ce);
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
    O(!0);
    const N = Fe(i), A = u(Vr, !0), j = ve(_, wt, (_e) => {
      const ce = Fe(i);
      _e.isTrusted && ce.x === N.x && ce.y === N.y && fo(_e);
    }, {
      I: !0,
      A: !0
    });
    je(i, {
      x: 0,
      y: 0
    }), A();
    const q = Fe(i), K = dn(i);
    je(i, {
      x: K.w,
      y: K.h
    });
    const X = Fe(i);
    je(i, {
      x: X.x - q.x < 1 && -K.w,
      y: X.y - q.y < 1 && -K.h
    });
    const ae = Fe(i);
    return je(i, N), Yn(() => j()), {
      D: q,
      M: ae
    };
  }, F = ($, U) => {
    const N = Ve.devicePixelRatio % 1 !== 0 ? 1 : 0, A = {
      w: g($.w - U.w),
      h: g($.h - U.h)
    };
    return {
      w: A.w > N ? A.w : 0,
      h: A.h > N ? A.h : 0
    };
  }, [P, S] = Oe(V, Q(os, c)), [T, M] = Oe(V, Q(dn, c)), [C, L] = Oe(V), [D] = Oe(W), [I, E] = Oe(V), [R] = Oe(W), [B] = Oe({
    i: ($, U) => gn($, U, x),
    o: {}
  }, () => $r(c) ? Je(c, x) : {}), [ee, oe] = Oe({
    i: ($, U) => Jt($.D, U.D) && Jt($.M, U.M),
    o: po()
  }), se = Ht(xo), me = ($, U) => `${U ? Tr : Mr}${mr($)}`, Y = ($) => {
    const U = (A) => [rt, _t, wt].map((j) => me(j, A)), N = U(!0).concat(U()).join(" ");
    u(N), u(Ne($).map((A) => me($[A], A === "x")).join(" "), !0);
  };
  return ({ It: $, Zt: U, fn: N, Dt: A }, { dn: j }) => {
    const { dt: q, Ht: K, Ct: X, _t: ae, zt: _e } = U || {}, ce = se && se.V(n, e, N, s, $), { Y: Ee, W: te, J: ye } = ce || {}, [De, xe] = Gr($, s), [$e, be] = $("overflow"), we = kt($e.x), pe = kt($e.y), ue = q || j || K || X || _e || xe;
    let Se = S(A), Te = M(A), $t = L(A), It = E(A);
    if (xe && h && u(yo, !De), ue) {
      ns(l, lt, tn) && O(!0);
      const [_s] = te ? te() : [], [jt] = Se = P(A), [Gt] = Te = T(A), Wt = _o(c), Kt = p && xr(m()), Qo = {
        w: g(Gt.w + jt.w),
        h: g(Gt.h + jt.h)
      }, vs = {
        w: g((Kt ? Kt.w : Wt.w + g(Wt.w - Gt.w)) + jt.w),
        h: g((Kt ? Kt.h : Wt.h + g(Wt.h - Gt.h)) + jt.h)
      };
      _s && _s(), It = I(vs), $t = C(F(Qo, vs), A);
    }
    const [Rt, Bt] = It, [dt, St] = $t, [Nt, kn] = Te, [xn, $n] = Se, [Pe, Sn] = D({
      x: dt.w > 0,
      y: dt.h > 0
    }), Pt = we && pe && (Pe.x || Pe.y) || we && Pe.x && !Pe.y || pe && Pe.y && !Pe.x, qt = j || X || _e || $n || kn || Bt || St || be || xe || ue, st = Wr(Pe, $e), [Ct, Et] = R(st.k), [zt, Ko] = B(A), us = X || ae || Ko || Sn || A, [Yo, Zo] = us ? ee(k(zt), A) : oe();
    return qt && (Et && Y(st.k), ye && Ee && Vt(c, ye(st, N, Ee(st, Nt, xn)))), O(!1), cn(l, lt, tn, Pt), cn(o, jn, tn, Pt), re(e, {
      k: Ct,
      Lt: {
        x: Rt.w,
        y: Rt.h
      },
      Vt: {
        x: dt.w,
        y: dt.h
      },
      rn: Pe,
      Tt: Sr(Yo, dt)
    }), {
      en: Et,
      nn: Bt,
      sn: St,
      cn: Zo || St,
      pn: us
    };
  };
}, ua = (n) => {
  const [e, s, l] = la(n), o = {
    ln: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    _n: !1,
    j: {
      [Ks]: 0,
      [Ys]: 0,
      [Ws]: 0,
      [qs]: 0,
      [zs]: 0,
      [Gs]: 0,
      [js]: 0
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
      x: _t,
      y: _t
    },
    rn: {
      x: !1,
      y: !1
    },
    Tt: po()
  }, { vt: c, gt: d, L: _, Ot: i } = e, { P: v, T: u } = Ke(), m = !v && (u.x || u.y), h = [ia(e), ca(e, o), da(e, o)];
  return [s, (p) => {
    const g = {}, x = m && Fe(d), V = x && i();
    return ie(h, (W) => {
      re(g, W(p, g) || {});
    }), je(d, x), V && V(), _ || je(c, 0), g;
  }, o, e, l];
}, _a = (n, e, s, l, o) => {
  let c = !1;
  const d = Ds(e, {}), [_, i, v, u, m] = ua(n), [h, p, g] = ta(u, v, d, (k) => {
    O({}, k);
  }), [y, x, , V] = aa(n, e, g, v, u, o), W = (k) => Ne(k).some((F) => !!k[F]), O = (k, F) => {
    if (s())
      return !1;
    const { vn: P, Dt: S, At: T, hn: M } = k, C = P || {}, L = !!S || !c, D = {
      It: Ds(e, C, L),
      vn: C,
      Dt: L
    };
    if (M)
      return x(D), !1;
    const I = F || p(re({}, D, {
      At: T
    })), E = i(re({}, D, {
      fn: g,
      Zt: I
    }));
    x(re({}, D, {
      Zt: I,
      tn: E
    }));
    const R = W(I), B = W(E), ee = R || B || !Jn(C) || L;
    return c = !0, ee && l(k, {
      Zt: I,
      tn: E
    }), ee;
  };
  return [() => {
    const { an: k, gt: F, Ot: P } = u, S = Fe(k), T = [h(), _(), y()], M = P();
    return je(F, S), M(), Q(Ue, T);
  }, O, () => ({
    gn: g,
    bn: v
  }), {
    wn: u,
    yn: V
  }, m];
}, ls = /* @__PURE__ */ new WeakMap(), va = (n, e) => {
  ls.set(n, e);
}, fa = (n) => {
  ls.delete(n);
}, To = (n) => ls.get(n), et = (n, e, s) => {
  const { nt: l } = Ke(), o = an(n), c = o ? n : n.target, d = To(c);
  if (e && !d) {
    let _ = !1;
    const i = [], v = {}, u = (C) => {
      const L = eo(C), D = Ht(Er);
      return D ? D(L, !0) : L;
    }, m = re({}, l(), u(e)), [h, p, g] = zn(), [y, x, V] = zn(s), W = (C, L) => {
      V(C, L), g(C, L);
    }, [O, k, F, P, S] = _a(n, m, () => _, ({ vn: C, Dt: L }, { Zt: D, tn: I }) => {
      const { dt: E, Ct: R, xt: B, Ht: ee, Et: oe, _t: se } = D, { nn: me, sn: Y, en: $, cn: U } = I;
      W("updated", [M, {
        updateHints: {
          sizeChanged: !!E,
          directionChanged: !!R,
          heightIntrinsicChanged: !!B,
          overflowEdgeChanged: !!me,
          overflowAmountChanged: !!Y,
          overflowStyleChanged: !!$,
          scrollCoordinatesChanged: !!U,
          contentMutation: !!ee,
          hostMutation: !!oe,
          appear: !!se
        },
        changedOptions: C || {},
        force: !!L
      }]);
    }, (C) => W("scroll", [M, C])), T = (C) => {
      fa(c), Ue(i), _ = !0, W("destroyed", [M, C]), p(), x();
    }, M = {
      options(C, L) {
        if (C) {
          const D = L ? l() : {}, I = $o(m, re(D, u(C)));
          Jn(I) || (re(m, I), k({
            vn: I
          }));
        }
        return re({}, m);
      },
      on: y,
      off: (C, L) => {
        C && L && x(C, L);
      },
      state() {
        const { gn: C, bn: L } = F(), { F: D } = C, { Lt: I, Vt: E, k: R, rn: B, ln: ee, _n: oe, Tt: se } = L;
        return re({}, {
          overflowEdge: I,
          overflowAmount: E,
          overflowStyle: R,
          hasOverflow: B,
          scrollCoordinates: {
            start: se.D,
            end: se.M
          },
          padding: ee,
          paddingAbsolute: oe,
          directionRTL: D,
          destroyed: _
        });
      },
      elements() {
        const { vt: C, ht: L, ln: D, U: I, bt: E, gt: R, Qt: B } = P.wn, { Xt: ee, Gt: oe } = P.yn, se = (Y) => {
          const { kt: $, Pt: U, Ut: N } = Y;
          return {
            scrollbar: N,
            track: U,
            handle: $
          };
        }, me = (Y) => {
          const { Yt: $, Wt: U } = Y, N = se($[0]);
          return re({}, N, {
            clone: () => {
              const A = se(U());
              return k({
                hn: !0
              }), A;
            }
          });
        };
        return re({}, {
          target: C,
          host: L,
          padding: D || I,
          viewport: I,
          content: E || I,
          scrollOffsetElement: R,
          scrollEventElement: B,
          scrollbarHorizontal: me(ee),
          scrollbarVertical: me(oe)
        });
      },
      update: (C) => k({
        Dt: C,
        At: !0
      }),
      destroy: Q(T, !1),
      plugin: (C) => v[Ne(C)[0]]
    };
    return ge(i, [S]), va(c, M), bo(ho, et, [M, h, v]), sa(P.wn.wt, !o && n.cancel) ? (T(!0), M) : (ge(i, O()), W("initialized", [M]), M.update(), M);
  }
  return d;
};
et.plugin = (n) => {
  const e = We(n), s = e ? n : [n], l = s.map((o) => bo(o, et)[0]);
  return Cr(s), e ? l : l[0];
};
et.valid = (n) => {
  const e = n && n.elements, s = Re(e) && e();
  return rn(s) && !!To(s.target);
};
et.env = () => {
  const { N: n, T: e, P: s, G: l, st: o, et: c, Z: d, tt: _, nt: i, ot: v } = Ke();
  return re({}, {
    scrollbarsSize: n,
    scrollbarsOverlaid: e,
    scrollbarsHiding: s,
    scrollTimeline: l,
    staticDefaultInitialization: o,
    staticDefaultOptions: c,
    getDefaultInitialization: d,
    setDefaultInitialization: _,
    getDefaultOptions: i,
    setDefaultOptions: v
  });
};
et.nonce = Qr;
et.trustedTypePolicy = wr;
const ma = { class: "vuefinder__modal-layout__container" }, pa = { class: "vuefinder__modal-layout__content" }, ha = { class: "vuefinder__modal-layout__footer" }, tt = {
  __name: "ModalLayout",
  setup(n) {
    const e = H(null), s = le("ServiceContainer");
    return Me(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Tt(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const o = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: o,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (l, o) => (f(), b("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: o[1] || (o[1] = Ot((c) => r(s).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      o[2] || (o[2] = a("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      a("div", ma, [
        a("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: o[0] || (o[0] = Xe((c) => r(s).modal.close(), ["self"]))
        }, [
          a("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            a("div", pa, [
              Mt(l.$slots, "default")
            ]),
            a("div", ha, [
              Mt(l.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, ga = (n, e) => {
  const s = n.__vccOpts || n;
  for (const [l, o] of e)
    s[l] = o;
  return s;
}, ba = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: s }) {
    const l = le("ServiceContainer"), o = H(!1), { t: c } = l.i18n;
    let d = null;
    const _ = () => {
      clearTimeout(d), o.value = !0, d = setTimeout(() => {
        o.value = !1;
      }, 2e3);
    };
    return Me(() => {
      l.emitter.on(n.on, _);
    }), Fs(() => {
      clearTimeout(d);
    }), {
      shown: o,
      t: c
    };
  }
}, wa = { key: 1 };
function ya(n, e, s, l, o, c) {
  return f(), b("div", {
    class: de(["vuefinder__action-message", { "vuefinder__action-message--hidden": !l.shown }])
  }, [
    n.$slots.default ? Mt(n.$slots, "default", { key: 0 }) : (f(), b("span", wa, w(l.t("Saved.")), 1))
  ], 2);
}
const ft = /* @__PURE__ */ ga(ba, [["render", ya]]), ka = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function xa(n, e) {
  return f(), b("svg", ka, e[0] || (e[0] = [
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
const $a = { render: xa }, Sa = { class: "vuefinder__modal-header" }, Ca = { class: "vuefinder__modal-header__icon-container" }, Ea = {
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
  setup(n) {
    return (e, s) => (f(), b("div", Sa, [
      a("div", Ca, [
        (f(), Z(Us(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      a("h3", Ea, w(n.title), 1)
    ]));
  }
}, Aa = { class: "vuefinder__about-modal__content" }, Ta = { class: "vuefinder__about-modal__main" }, Ma = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Da = ["onClick", "aria-current"], La = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Va = { class: "vuefinder__about-modal__description" }, Oa = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Fa = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Ua = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, Ha = { class: "vuefinder__about-modal__description" }, Ia = { class: "vuefinder__about-modal__settings" }, Ra = { class: "vuefinder__about-modal__setting flex" }, Ba = { class: "vuefinder__about-modal__setting-input" }, Na = { class: "vuefinder__about-modal__setting-label" }, Pa = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, qa = { class: "vuefinder__about-modal__setting flex" }, za = { class: "vuefinder__about-modal__setting-input" }, ja = { class: "vuefinder__about-modal__setting-label" }, Ga = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Wa = { class: "vuefinder__about-modal__setting flex" }, Ka = { class: "vuefinder__about-modal__setting-input" }, Ya = { class: "vuefinder__about-modal__setting-label" }, Za = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Qa = { class: "vuefinder__about-modal__setting flex" }, Xa = { class: "vuefinder__about-modal__setting-input" }, Ja = { class: "vuefinder__about-modal__setting-label" }, el = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, tl = { class: "vuefinder__about-modal__setting" }, nl = { class: "vuefinder__about-modal__setting-input" }, sl = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, ol = { class: "vuefinder__about-modal__setting-label" }, rl = ["label"], al = ["value"], ll = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, il = { class: "vuefinder__about-modal__setting-input" }, cl = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, dl = { class: "vuefinder__about-modal__setting-label" }, ul = ["label"], _l = ["value"], vl = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, fl = { class: "vuefinder__about-modal__shortcuts" }, ml = { class: "vuefinder__about-modal__shortcut" }, pl = { class: "vuefinder__about-modal__shortcut" }, hl = { class: "vuefinder__about-modal__shortcut" }, gl = { class: "vuefinder__about-modal__shortcut" }, bl = { class: "vuefinder__about-modal__shortcut" }, wl = { class: "vuefinder__about-modal__shortcut" }, yl = { class: "vuefinder__about-modal__shortcut" }, kl = { class: "vuefinder__about-modal__shortcut" }, xl = { class: "vuefinder__about-modal__shortcut" }, $l = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Sl = { class: "vuefinder__about-modal__description" }, Cl = {
  __name: "ModalAbout",
  setup(n) {
    const e = le("ServiceContainer"), { setStore: s, clearStore: l } = e.storage, { t: o } = e.i18n, c = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, d = ot(() => [
      { name: o("About"), key: c.ABOUT },
      { name: o("Settings"), key: c.SETTINGS },
      { name: o("Shortcuts"), key: c.SHORTCUTS },
      { name: o("Reset"), key: c.RESET }
    ]), _ = H("about"), i = async () => {
      l(), location.reload();
    }, v = (W) => {
      e.theme.set(W), e.emitter.emit("vf-theme-saved");
    }, u = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? dr : cr, s("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, m = () => {
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
      }).filter(([W]) => Object.keys(g).includes(W))
    ), V = ot(() => ({
      system: o("System"),
      light: o("Light"),
      dark: o("Dark")
    }));
    return (W, O) => (f(), Z(tt, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          onClick: O[7] || (O[7] = (k) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(r(o)("Close")), 1)
      ]),
      default: ne(() => [
        a("div", Aa, [
          G(ct, {
            icon: r($a),
            title: "Vuefinder " + r(e).version
          }, null, 8, ["icon", "title"]),
          a("div", Ta, [
            a("div", null, [
              a("div", null, [
                a("nav", Ma, [
                  (f(!0), b(ke, null, Ce(d.value, (k) => (f(), b("button", {
                    key: k.name,
                    onClick: (F) => _.value = k.key,
                    class: de([k.key === _.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": k.current ? "page" : void 0
                  }, w(k.name), 11, Da))), 128))
                ])
              ])
            ]),
            _.value === c.ABOUT ? (f(), b("div", La, [
              a("div", Va, w(r(o)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              a("a", Oa, w(r(o)("Project home")), 1),
              a("a", Fa, w(r(o)("Follow on GitHub")), 1)
            ])) : z("", !0),
            _.value === c.SETTINGS ? (f(), b("div", Ua, [
              a("div", Ha, w(r(o)("Customize your experience with the following settings")), 1),
              a("div", Ia, [
                a("fieldset", null, [
                  a("div", Ra, [
                    a("div", Ba, [
                      he(a("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": O[0] || (O[0] = (k) => r(e).metricUnits = k),
                        onClick: u,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Yt, r(e).metricUnits]
                      ])
                    ]),
                    a("div", Na, [
                      a("label", Pa, [
                        J(w(r(o)("Use Metric Units")) + " ", 1),
                        G(ft, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: ne(() => [
                            J(w(r(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", qa, [
                    a("div", za, [
                      he(a("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": O[1] || (O[1] = (k) => r(e).compactListView = k),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Yt, r(e).compactListView]
                      ])
                    ]),
                    a("div", ja, [
                      a("label", Ga, [
                        J(w(r(o)("Compact list view")) + " ", 1),
                        G(ft, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: ne(() => [
                            J(w(r(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", Wa, [
                    a("div", Ka, [
                      he(a("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": O[2] || (O[2] = (k) => r(e).persist = k),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Yt, r(e).persist]
                      ])
                    ]),
                    a("div", Ya, [
                      a("label", Za, [
                        J(w(r(o)("Persist path on reload")) + " ", 1),
                        G(ft, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: ne(() => [
                            J(w(r(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", Qa, [
                    a("div", Xa, [
                      he(a("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": O[3] || (O[3] = (k) => r(e).showThumbnails = k),
                        onClick: h,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Yt, r(e).showThumbnails]
                      ])
                    ]),
                    a("div", Ja, [
                      a("label", el, [
                        J(w(r(o)("Show thumbnails")) + " ", 1),
                        G(ft, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: ne(() => [
                            J(w(r(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  a("div", tl, [
                    a("div", nl, [
                      a("label", sl, w(r(o)("Theme")), 1)
                    ]),
                    a("div", ol, [
                      he(a("select", {
                        id: "theme",
                        "onUpdate:modelValue": O[4] || (O[4] = (k) => r(e).theme.value = k),
                        onChange: O[5] || (O[5] = (k) => v(k.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: r(o)("Theme")
                        }, [
                          (f(!0), b(ke, null, Ce(V.value, (k, F) => (f(), b("option", { value: F }, w(k), 9, al))), 256))
                        ], 8, rl)
                      ], 544), [
                        [fs, r(e).theme.value]
                      ]),
                      G(ft, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: ne(() => [
                          J(w(r(o)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  r(e).features.includes(r(fe).LANGUAGE) && Object.keys(r(x)).length > 1 ? (f(), b("div", ll, [
                    a("div", il, [
                      a("label", cl, w(r(o)("Language")), 1)
                    ]),
                    a("div", dl, [
                      he(a("select", {
                        id: "language",
                        "onUpdate:modelValue": O[6] || (O[6] = (k) => r(e).i18n.locale = k),
                        class: "vuefinder__about-modal__select"
                      }, [
                        a("optgroup", {
                          label: r(o)("Language")
                        }, [
                          (f(!0), b(ke, null, Ce(r(x), (k, F) => (f(), b("option", { value: F }, w(k), 9, _l))), 256))
                        ], 8, ul)
                      ], 512), [
                        [fs, r(e).i18n.locale]
                      ]),
                      G(ft, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: ne(() => [
                          J(w(r(o)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : z("", !0)
                ])
              ])
            ])) : z("", !0),
            _.value === c.SHORTCUTS ? (f(), b("div", vl, [
              a("div", fl, [
                a("div", ml, [
                  a("div", null, w(r(o)("Rename")), 1),
                  O[8] || (O[8] = a("kbd", null, "F2", -1))
                ]),
                a("div", pl, [
                  a("div", null, w(r(o)("Refresh")), 1),
                  O[9] || (O[9] = a("kbd", null, "F5", -1))
                ]),
                a("div", hl, [
                  J(w(r(o)("Delete")) + " ", 1),
                  O[10] || (O[10] = a("kbd", null, "Del", -1))
                ]),
                a("div", gl, [
                  J(w(r(o)("Escape")) + " ", 1),
                  O[11] || (O[11] = a("div", null, [
                    a("kbd", null, "Esc")
                  ], -1))
                ]),
                a("div", bl, [
                  J(w(r(o)("Select All")) + " ", 1),
                  O[12] || (O[12] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    J(" + "),
                    a("kbd", null, "A")
                  ], -1))
                ]),
                a("div", wl, [
                  J(w(r(o)("Search")) + " ", 1),
                  O[13] || (O[13] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    J(" + "),
                    a("kbd", null, "F")
                  ], -1))
                ]),
                a("div", yl, [
                  J(w(r(o)("Toggle Sidebar")) + " ", 1),
                  O[14] || (O[14] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    J(" + "),
                    a("kbd", null, "E")
                  ], -1))
                ]),
                a("div", kl, [
                  J(w(r(o)("Open Settings")) + " ", 1),
                  O[15] || (O[15] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    J(" + "),
                    a("kbd", null, ",")
                  ], -1))
                ]),
                a("div", xl, [
                  J(w(r(o)("Toggle Full Screen")) + " ", 1),
                  O[16] || (O[16] = a("div", null, [
                    a("kbd", null, "Ctrl"),
                    J(" + "),
                    a("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : z("", !0),
            _.value === c.RESET ? (f(), b("div", $l, [
              a("div", Sl, w(r(o)("Reset all settings to default")), 1),
              a("button", {
                onClick: i,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, w(r(o)("Reset Settings")), 1)
            ])) : z("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, El = ["title"], nt = {
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
    const s = e, l = le("ServiceContainer"), { t: o } = l.i18n, c = H(!1), d = H(null), _ = H((v = d.value) == null ? void 0 : v.strMessage);
    Be(_, () => c.value = !1);
    const i = () => {
      s("hidden"), c.value = !0;
    };
    return (u, m) => (f(), b("div", null, [
      c.value ? z("", !0) : (f(), b("div", {
        key: 0,
        ref_key: "strMessage",
        ref: d,
        class: de(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Mt(u.$slots, "default"),
        a("div", {
          class: "vuefinder__message__close",
          onClick: i,
          title: r(o)("Close")
        }, m[0] || (m[0] = [
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
        ]), 8, El)
      ], 2))
    ]));
  }
}, Al = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Tl(n, e) {
  return f(), b("svg", Al, e[0] || (e[0] = [
    a("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ]));
}
const Mo = { render: Tl }, Ml = { class: "vuefinder__delete-modal__content" }, Dl = { class: "vuefinder__delete-modal__form" }, Ll = { class: "vuefinder__delete-modal__description" }, Vl = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Ol = { class: "vuefinder__delete-modal__file" }, Fl = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ul = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hl = { class: "vuefinder__delete-modal__file-name" }, Il = { class: "vuefinder__delete-modal__warning" }, is = {
  __name: "ModalDelete",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, l = H(e.modal.data.items), o = H(""), c = () => {
      l.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: l.value.map(({ path: d, type: _ }) => ({ path: d, type: _ }))
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
    return (d, _) => (f(), Z(tt, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, w(r(s)("Yes, Delete!")), 1),
        a("button", {
          type: "button",
          onClick: _[1] || (_[1] = (i) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(r(s)("Cancel")), 1),
        a("div", Il, w(r(s)("This action cannot be undone.")), 1)
      ]),
      default: ne(() => [
        a("div", null, [
          G(ct, {
            icon: r(Mo),
            title: r(s)("Delete files")
          }, null, 8, ["icon", "title"]),
          a("div", Ml, [
            a("div", Dl, [
              a("p", Ll, w(r(s)("Are you sure you want to delete these files?")), 1),
              a("div", Vl, [
                (f(!0), b(ke, null, Ce(l.value, (i) => (f(), b("p", Ol, [
                  i.type === "dir" ? (f(), b("svg", Fl, _[2] || (_[2] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), b("svg", Ul, _[3] || (_[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  a("span", Hl, w(i.basename), 1)
                ]))), 256))
              ]),
              o.value.length ? (f(), Z(nt, {
                key: 0,
                onHidden: _[0] || (_[0] = (i) => o.value = ""),
                error: ""
              }, {
                default: ne(() => [
                  J(w(o.value), 1)
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
}, Rl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Bl(n, e) {
  return f(), b("svg", Rl, e[0] || (e[0] = [
    a("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ]));
}
const Do = { render: Bl }, Nl = { class: "vuefinder__rename-modal__content" }, Pl = { class: "vuefinder__rename-modal__item" }, ql = { class: "vuefinder__rename-modal__item-info" }, zl = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, jl = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gl = { class: "vuefinder__rename-modal__item-name" }, cs = {
  __name: "ModalRename",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, l = H(e.modal.data.items[0]), o = H(e.modal.data.items[0].basename), c = H(""), d = () => {
      o.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: l.value.path,
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
        onError: (_) => {
          c.value = s(_.message);
        }
      });
    };
    return (_, i) => (f(), Z(tt, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, w(r(s)("Rename")), 1),
        a("button", {
          type: "button",
          onClick: i[2] || (i[2] = (v) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(r(s)("Cancel")), 1)
      ]),
      default: ne(() => [
        a("div", null, [
          G(ct, {
            icon: r(Do),
            title: r(s)("Rename")
          }, null, 8, ["icon", "title"]),
          a("div", Nl, [
            a("div", Pl, [
              a("p", ql, [
                l.value.type === "dir" ? (f(), b("svg", zl, i[3] || (i[3] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (f(), b("svg", jl, i[4] || (i[4] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                a("span", Gl, w(l.value.basename), 1)
              ]),
              he(a("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (v) => o.value = v),
                onKeyup: Ot(d, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Ft, o.value]
              ]),
              c.value.length ? (f(), Z(nt, {
                key: 0,
                onHidden: i[1] || (i[1] = (v) => c.value = ""),
                error: ""
              }, {
                default: ne(() => [
                  J(w(c.value), 1)
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
}, Ye = {
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
function Wl(n) {
  const e = (s) => {
    s.code === Ye.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible && (n.fs.searchMode || (s.code === Ye.F2 && n.features.includes(fe.RENAME) && (n.dragSelect.getCount() !== 1 || n.modal.open(cs, { items: n.dragSelect.getSelected() })), s.code === Ye.F5 && n.emitter.emit("vf-fetch", { params: { q: "index", adapter: n.fs.adapter, path: n.fs.data.dirname } }), s.code === Ye.DELETE && (!n.dragSelect.getCount() || n.modal.open(is, { items: n.dragSelect.getSelected() })), s.metaKey && s.code === Ye.BACKSLASH && n.modal.open(Cl), s.metaKey && s.code === Ye.KEY_F && n.features.includes(fe.SEARCH) && (n.fs.searchMode = !0, s.preventDefault()), s.metaKey && s.code === Ye.KEY_E && (n.showTreeView = !n.showTreeView, n.storage.setStore("show-tree-view", n.showTreeView)), s.metaKey && s.code === Ye.ENTER && (n.fullScreen = !n.fullScreen, n.root.focus()), s.metaKey && s.code === Ye.KEY_A && (n.dragSelect.selectAll(), s.preventDefault())));
  };
  Me(() => {
    n.root.addEventListener("keydown", e);
  });
}
const Kl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Yl(n, e) {
  return f(), b("svg", Kl, e[0] || (e[0] = [
    a("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const Lo = { render: Yl }, Zl = { class: "vuefinder__new-folder-modal__content" }, Ql = { class: "vuefinder__new-folder-modal__form" }, Xl = { class: "vuefinder__new-folder-modal__description" }, Jl = ["placeholder"], Vo = {
  __name: "ModalNewFolder",
  setup(n) {
    const e = le("ServiceContainer"), { getStore: s } = e.storage, { t: l } = e.i18n, o = H(""), c = H(""), d = () => {
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
            label: l("%s is created.", o.value)
          }), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: e.fs.data.dirname
            }
          });
        },
        onError: (_) => {
          c.value = l(_.message);
        }
      });
    };
    return (_, i) => (f(), Z(tt, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, w(r(l)("Create")), 1),
        a("button", {
          type: "button",
          onClick: i[2] || (i[2] = (v) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(r(l)("Cancel")), 1)
      ]),
      default: ne(() => [
        a("div", null, [
          G(ct, {
            icon: r(Lo),
            title: r(l)("New Folder")
          }, null, 8, ["icon", "title"]),
          a("div", Zl, [
            a("div", Ql, [
              a("p", Xl, w(r(l)("Create a new folder")), 1),
              he(a("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (v) => o.value = v),
                onKeyup: Ot(d, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: r(l)("Folder Name"),
                type: "text"
              }, null, 40, Jl), [
                [Ft, o.value]
              ]),
              c.value.length ? (f(), Z(nt, {
                key: 0,
                onHidden: i[1] || (i[1] = (v) => c.value = ""),
                error: ""
              }, {
                default: ne(() => [
                  J(w(c.value), 1)
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
function Wn(n, e = 14) {
  let s = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(s), "$2..$4");
}
const ei = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ti(n, e) {
  return f(), b("svg", ei, e[0] || (e[0] = [
    a("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ]));
}
const Oo = { render: ti }, ni = { class: "vuefinder__upload-modal__content" }, si = {
  key: 0,
  class: "pointer-events-none"
}, oi = {
  key: 1,
  class: "pointer-events-none"
}, ri = ["disabled"], ai = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, li = ["textContent"], ii = { class: "vuefinder__upload-modal__file-info" }, ci = { class: "vuefinder__upload-modal__file-name hidden md:block" }, di = { class: "vuefinder__upload-modal__file-name md:hidden" }, ui = {
  key: 0,
  class: "ml-auto"
}, _i = ["title", "disabled", "onClick"], vi = {
  key: 0,
  class: "py-2"
}, fi = ["disabled"], mi = {
  __name: "ModalUpload",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, l = s("uppy"), o = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = H({ QUEUE_ENTRY_STATUS: o }), d = H(null), _ = H(null), i = H(null), v = H(null), u = H(null), m = H(null), h = H([]), p = H(""), g = H(!1), y = H(!1);
    let x;
    function V(D) {
      return h.value.findIndex((I) => I.id === D);
    }
    function W(D, I = null) {
      I = I ?? (D.webkitRelativePath || D.name), x.addFile({
        name: I,
        type: D.type,
        data: D,
        source: "Local"
      });
    }
    function O(D) {
      switch (D.status) {
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
    const k = (D) => {
      switch (D.status) {
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
    function P() {
      if (!g.value) {
        if (!h.value.filter((D) => D.status !== o.DONE).length) {
          p.value = s("Please select file to upload first.");
          return;
        }
        p.value = "", x.retryAll(), x.upload();
      }
    }
    function S() {
      x.cancelAll({ reason: "user" }), h.value.forEach((D) => {
        D.status !== o.DONE && (D.status = o.CANCELED, D.statusName = s("Canceled"));
      }), g.value = !1;
    }
    function T(D) {
      g.value || (x.removeFile(D.id, "removed-by-user"), h.value.splice(V(D.id), 1));
    }
    function M(D) {
      g.value || (x.cancelAll({ reason: "user" }), h.value.splice(0));
    }
    function C() {
      e.modal.close();
    }
    function L() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return Me(async () => {
      x = new rr({
        debug: e.debug,
        restrictions: {
          maxFileSize: ur(e.maxFileSize),
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
        locale: l,
        onBeforeFileAdded(E, R) {
          if (R[E.id] != null) {
            const ee = V(E.id);
            h.value[ee].status === o.PENDING && (p.value = x.i18n("noDuplicates", { fileName: E.name })), h.value = h.value.filter((oe) => oe.id !== E.id);
          }
          return h.value.push({
            id: E.id,
            name: E.name,
            size: e.filesize(E.size),
            status: o.PENDING,
            statusName: s("Pending upload"),
            percent: null,
            originalFile: E.data
          }), !0;
        }
      }), x.use(ar, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(E, R) {
          let B;
          try {
            B = JSON.parse(E).message;
          } catch {
            B = s("Cannot parse server response.");
          }
          return new Error(B);
        }
      }), x.on("restriction-failed", (E, R) => {
        const B = h.value[V(E.id)];
        T(B), p.value = R.message;
      }), x.on("upload", () => {
        const E = L();
        x.setMeta({ ...E.body });
        const R = x.getPlugin("XHRUpload");
        R.opts.method = E.method, R.opts.endpoint = E.url + "?" + new URLSearchParams(E.params), R.opts.headers = E.headers, delete E.headers["Content-Type"], g.value = !0, h.value.forEach((B) => {
          B.status !== o.DONE && (B.percent = null, B.status = o.UPLOADING, B.statusName = s("Pending upload"));
        });
      }), x.on("upload-progress", (E, R) => {
        const B = Math.floor(R.bytesUploaded / R.bytesTotal * 100);
        h.value[V(E.id)].percent = `${B}%`;
      }), x.on("upload-success", (E) => {
        const R = h.value[V(E.id)];
        R.status = o.DONE, R.statusName = s("Done"), e.emitter.emit("vf-fetch", {
          params: {
            q: "index",
            adapter: e.fs.adapter,
            path: e.fs.data.dirname
          }
        });
      }), x.on("upload-error", (E, R) => {
        const B = h.value[V(E.id)];
        B.percent = null, B.status = o.ERROR, R.isNetworkError ? B.statusName = s(
          "Network Error, Unable establish connection to the server or interrupted."
        ) : B.statusName = R ? R.message : s("Unknown Error");
      }), x.on("error", (E) => {
        p.value = E.message, g.value = !1, e.emitter.emit("vf-fetch", {
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
        _.value.click();
      }), u.value.addEventListener("click", () => {
        i.value.click();
      }), m.value.addEventListener("dragover", (E) => {
        E.preventDefault(), y.value = !0;
      }), m.value.addEventListener("dragleave", (E) => {
        E.preventDefault(), y.value = !1;
      });
      function D(E, R) {
        R.isFile && R.file((B) => E(R, B)), R.isDirectory && R.createReader().readEntries((B) => {
          B.forEach((ee) => {
            D(E, ee);
          });
        });
      }
      m.value.addEventListener("drop", (E) => {
        E.preventDefault(), y.value = !1;
        const R = /^[/\\](.+)/;
        [...E.dataTransfer.items].forEach((B) => {
          B.kind === "file" && D((ee, oe) => {
            const se = R.exec(ee.fullPath);
            W(oe, se[1]);
          }, B.webkitGetAsEntry());
        });
      });
      const I = ({ target: E }) => {
        const R = E.files;
        for (const B of R)
          W(B);
        E.value = "";
      };
      _.value.addEventListener("change", I), i.value.addEventListener("change", I);
    }), Hs(() => {
      x == null || x.close({ reason: "unmount" });
    }), (D, I) => (f(), Z(tt, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: g.value,
          onClick: Xe(P, ["prevent"])
        }, w(r(s)("Upload")), 9, fi),
        g.value ? (f(), b("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Xe(S, ["prevent"])
        }, w(r(s)("Cancel")), 1)) : (f(), b("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: Xe(C, ["prevent"])
        }, w(r(s)("Close")), 1))
      ]),
      default: ne(() => [
        a("div", null, [
          G(ct, {
            icon: r(Oo),
            title: r(s)("Upload Files")
          }, null, 8, ["icon", "title"]),
          a("div", ni, [
            a("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: m,
              onClick: F
            }, [
              y.value ? (f(), b("div", si, w(r(s)("Release to drop these files.")), 1)) : (f(), b("div", oi, w(r(s)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            a("div", {
              ref_key: "container",
              ref: d,
              class: "vuefinder__upload-modal__buttons"
            }, [
              a("button", {
                ref_key: "pickFiles",
                ref: v,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, w(r(s)("Select Files")), 513),
              a("button", {
                ref_key: "pickFolders",
                ref: u,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, w(r(s)("Select Folders")), 513),
              a("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: g.value,
                onClick: I[0] || (I[0] = (E) => M())
              }, w(r(s)("Clear all")), 9, ri)
            ], 512),
            a("div", ai, [
              (f(!0), b(ke, null, Ce(h.value, (E) => (f(), b("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: E.id
              }, [
                a("span", {
                  class: de(["vuefinder__upload-modal__file-icon", O(E)])
                }, [
                  a("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: w(k(E))
                  }, null, 8, li)
                ], 2),
                a("div", ii, [
                  a("div", ci, w(r(Wn)(E.name, 40)) + " (" + w(E.size) + ") ", 1),
                  a("div", di, w(r(Wn)(E.name, 16)) + " (" + w(E.size) + ") ", 1),
                  a("div", {
                    class: de(["vuefinder__upload-modal__file-status", O(E)])
                  }, [
                    J(w(E.statusName) + " ", 1),
                    E.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (f(), b("b", ui, w(E.percent), 1)) : z("", !0)
                  ], 2)
                ]),
                a("button", {
                  type: "button",
                  class: de(["vuefinder__upload-modal__file-remove", g.value ? "disabled" : ""]),
                  title: r(s)("Delete"),
                  disabled: g.value,
                  onClick: (R) => T(E)
                }, I[2] || (I[2] = [
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
                ]), 10, _i)
              ]))), 128)),
              h.value.length ? z("", !0) : (f(), b("div", vi, w(r(s)("No files selected!")), 1))
            ]),
            p.value.length ? (f(), Z(nt, {
              key: 0,
              onHidden: I[1] || (I[1] = (E) => p.value = ""),
              error: ""
            }, {
              default: ne(() => [
                J(w(p.value), 1)
              ]),
              _: 1
            })) : z("", !0)
          ])
        ]),
        a("input", {
          ref_key: "internalFileInput",
          ref: _,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        a("input", {
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
}, pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function hi(n, e) {
  return f(), b("svg", pi, e[0] || (e[0] = [
    a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const Fo = { render: hi }, gi = { class: "vuefinder__unarchive-modal__content" }, bi = { class: "vuefinder__unarchive-modal__items" }, wi = { class: "vuefinder__unarchive-modal__item" }, yi = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ki = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xi = { class: "vuefinder__unarchive-modal__item-name" }, $i = { class: "vuefinder__unarchive-modal__info" }, Uo = {
  __name: "ModalUnarchive",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, l = H(e.modal.data.items[0]), o = H(""), c = H([]), d = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: l.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file unarchived.") });
        },
        onError: (_) => {
          o.value = s(_.message);
        }
      });
    };
    return (_, i) => (f(), Z(tt, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, w(r(s)("Unarchive")), 1),
        a("button", {
          type: "button",
          onClick: i[1] || (i[1] = (v) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(r(s)("Cancel")), 1)
      ]),
      default: ne(() => [
        a("div", null, [
          G(ct, {
            icon: r(Fo),
            title: r(s)("Unarchive")
          }, null, 8, ["icon", "title"]),
          a("div", gi, [
            a("div", bi, [
              (f(!0), b(ke, null, Ce(c.value, (v) => (f(), b("p", wi, [
                v.type === "dir" ? (f(), b("svg", yi, i[2] || (i[2] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (f(), b("svg", ki, i[3] || (i[3] = [
                  a("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                a("span", xi, w(v.basename), 1)
              ]))), 256)),
              a("p", $i, w(r(s)("The archive will be unarchived at")) + " (" + w(r(e).fs.data.dirname) + ")", 1),
              o.value.length ? (f(), Z(nt, {
                key: 0,
                onHidden: i[0] || (i[0] = (v) => o.value = ""),
                error: ""
              }, {
                default: ne(() => [
                  J(w(o.value), 1)
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
}, Si = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ci(n, e) {
  return f(), b("svg", Si, e[0] || (e[0] = [
    a("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const Ho = { render: Ci }, Ei = { class: "vuefinder__archive-modal__content" }, Ai = { class: "vuefinder__archive-modal__form" }, Ti = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Mi = { class: "vuefinder__archive-modal__file" }, Di = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Li = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vi = { class: "vuefinder__archive-modal__file-name" }, Oi = ["placeholder"], Io = {
  __name: "ModalArchive",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, l = H(""), o = H(""), c = H(e.modal.data.items), d = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: c.value.map(({ path: _, type: i }) => ({ path: _, type: i })),
          name: l.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: s("The file(s) archived.") });
        },
        onError: (_) => {
          o.value = s(_.message);
        }
      });
    };
    return (_, i) => (f(), Z(tt, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          onClick: d,
          class: "vf-btn vf-btn-primary"
        }, w(r(s)("Archive")), 1),
        a("button", {
          type: "button",
          onClick: i[2] || (i[2] = (v) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(r(s)("Cancel")), 1)
      ]),
      default: ne(() => [
        a("div", null, [
          G(ct, {
            icon: r(Ho),
            title: r(s)("Archive the files")
          }, null, 8, ["icon", "title"]),
          a("div", Ei, [
            a("div", Ai, [
              a("div", Ti, [
                (f(!0), b(ke, null, Ce(c.value, (v) => (f(), b("p", Mi, [
                  v.type === "dir" ? (f(), b("svg", Di, i[3] || (i[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), b("svg", Li, i[4] || (i[4] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  a("span", Vi, w(v.basename), 1)
                ]))), 256))
              ]),
              he(a("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (v) => l.value = v),
                onKeyup: Ot(d, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: r(s)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Oi), [
                [Ft, l.value]
              ]),
              o.value.length ? (f(), Z(nt, {
                key: 0,
                onHidden: i[1] || (i[1] = (v) => o.value = ""),
                error: ""
              }, {
                default: ne(() => [
                  J(w(o.value), 1)
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
}, Fi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Ui(n, e) {
  return f(), b("svg", Fi, e[0] || (e[0] = [
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
const ds = { render: Ui }, Hi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ii(n, e) {
  return f(), b("svg", Hi, e[0] || (e[0] = [
    a("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ]));
}
const Ri = { render: Ii }, Bi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ni(n, e) {
  return f(), b("svg", Bi, e[0] || (e[0] = [
    a("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ]));
}
const Pi = { render: Ni }, qi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function zi(n, e) {
  return f(), b("svg", qi, e[0] || (e[0] = [
    a("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ]));
}
const ji = { render: zi }, Gi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Wi(n, e) {
  return f(), b("svg", Gi, e[0] || (e[0] = [
    a("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ]));
}
const Ki = { render: Wi }, Yi = { class: "vuefinder__toolbar" }, Zi = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, Qi = ["title"], Xi = ["title"], Ji = ["title"], ec = ["title"], tc = ["title"], nc = ["title"], sc = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, oc = { class: "pl-2" }, rc = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, ac = { class: "vuefinder__toolbar__controls" }, lc = ["title"], ic = ["title"], cc = {
  __name: "Toolbar",
  setup(n) {
    const e = le("ServiceContainer"), { setStore: s } = e.storage, { t: l } = e.i18n, o = e.dragSelect, c = H("");
    e.emitter.on("vf-search-query", ({ newQuery: i }) => {
      c.value = i;
    });
    const d = () => {
      e.fullScreen = !e.fullScreen;
    };
    Be(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", s("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const _ = () => {
      e.view = e.view === "list" ? "grid" : "list", o.refreshSelection(), s("viewport", e.view);
    };
    return (i, v) => (f(), b("div", Yi, [
      c.value.length ? (f(), b("div", sc, [
        a("div", oc, [
          J(w(r(l)("Search results for")) + " ", 1),
          a("span", rc, w(c.value), 1)
        ]),
        r(e).loadingIndicator === "circular" && r(e).fs.loading ? (f(), Z(r(ds), { key: 0 })) : z("", !0)
      ])) : (f(), b("div", Zi, [
        r(e).features.includes(r(fe).NEW_FOLDER) ? (f(), b("div", {
          key: 0,
          class: "mx-1.5",
          title: r(l)("New Folder"),
          onClick: v[0] || (v[0] = (u) => r(e).modal.open(Vo, { items: r(o).getSelected() }))
        }, [
          G(r(Lo))
        ], 8, Qi)) : z("", !0),
        r(e).features.includes(r(fe).UPLOAD) ? (f(), b("div", {
          key: 1,
          class: "mx-1.5",
          title: r(l)("Upload"),
          onClick: v[1] || (v[1] = (u) => r(e).modal.open(mi, { items: r(o).getSelected() }))
        }, [
          G(r(Oo))
        ], 8, Xi)) : z("", !0),
        r(e).features.includes(r(fe).RENAME) ? (f(), b("div", {
          key: 2,
          class: "mx-1.5",
          title: r(l)("Rename"),
          onClick: v[2] || (v[2] = (u) => r(o).getCount() !== 1 || r(e).modal.open(cs, { items: r(o).getSelected() }))
        }, [
          G(r(Do), {
            class: de(r(o).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, Ji)) : z("", !0),
        r(e).features.includes(r(fe).DELETE) ? (f(), b("div", {
          key: 3,
          class: "mx-1.5",
          title: r(l)("Delete"),
          onClick: v[3] || (v[3] = (u) => !r(o).getCount() || r(e).modal.open(is, { items: r(o).getSelected() }))
        }, [
          G(r(Mo), {
            class: de(r(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, ec)) : z("", !0),
        r(e).features.includes(r(fe).UNARCHIVE) && r(o).getCount() === 1 && r(o).getSelected()[0].mime_type === "application/zip" ? (f(), b("div", {
          key: 4,
          class: "mx-1.5",
          title: r(l)("Unarchive"),
          onClick: v[4] || (v[4] = (u) => !r(o).getCount() || r(e).modal.open(Uo, { items: r(o).getSelected() }))
        }, [
          G(r(Fo), {
            class: de(r(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, tc)) : z("", !0),
        r(e).features.includes(r(fe).ARCHIVE) ? (f(), b("div", {
          key: 5,
          class: "mx-1.5",
          title: r(l)("Archive"),
          onClick: v[5] || (v[5] = (u) => !r(o).getCount() || r(e).modal.open(Io, { items: r(o).getSelected() }))
        }, [
          G(r(Ho), {
            class: de(r(o).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, nc)) : z("", !0)
      ])),
      a("div", ac, [
        r(e).features.includes(r(fe).FULL_SCREEN) ? (f(), b("div", {
          key: 0,
          onClick: d,
          class: "mx-1.5",
          title: r(l)("Toggle Full Screen")
        }, [
          r(e).fullScreen ? (f(), Z(r(Pi), { key: 0 })) : (f(), Z(r(Ri), { key: 1 }))
        ], 8, lc)) : z("", !0),
        a("div", {
          class: "mx-1.5",
          title: r(l)("Change View"),
          onClick: v[6] || (v[6] = (u) => c.value.length || _())
        }, [
          r(e).view === "grid" ? (f(), Z(r(ji), {
            key: 0,
            class: de(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : z("", !0),
          r(e).view === "list" ? (f(), Z(r(Ki), {
            key: 1,
            class: de(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : z("", !0)
        ], 8, ic)
      ])
    ]));
  }
}, dc = (n, e = 0, s = !1) => {
  let l;
  return (...o) => {
    s && !l && n(...o), clearTimeout(l), l = setTimeout(() => {
      n(...o);
    }, e);
  };
}, Vs = (n, e, s) => {
  const l = H(n);
  return Xo((o, c) => ({
    get() {
      return o(), l.value;
    },
    set: dc(
      (d) => {
        l.value = d, c();
      },
      e,
      s
    )
  }));
}, uc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function _c(n, e) {
  return f(), b("svg", uc, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ]));
}
const vc = { render: _c }, fc = { class: "vuefinder__move-modal__content" }, mc = { class: "vuefinder__move-modal__description" }, pc = { class: "vuefinder__move-modal__files vf-scrollbar" }, hc = { class: "vuefinder__move-modal__file" }, gc = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, bc = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wc = { class: "vuefinder__move-modal__file-name" }, yc = { class: "vuefinder__move-modal__target-title" }, kc = { class: "vuefinder__move-modal__target-directory" }, xc = { class: "vuefinder__move-modal__target-path" }, $c = { class: "vuefinder__move-modal__selected-items" }, Kn = {
  __name: "ModalMove",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, l = H(e.modal.data.items.from), o = H(""), c = () => {
      l.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: l.value.map(({ path: d, type: _ }) => ({ path: d, type: _ })),
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
    return (d, _) => (f(), Z(tt, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, w(r(s)("Yes, Move!")), 1),
        a("button", {
          type: "button",
          onClick: _[1] || (_[1] = (i) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(r(s)("Cancel")), 1),
        a("div", $c, w(r(s)("%s item(s) selected.", l.value.length)), 1)
      ]),
      default: ne(() => [
        a("div", null, [
          G(ct, {
            icon: r(vc),
            title: r(s)("Move files")
          }, null, 8, ["icon", "title"]),
          a("div", fc, [
            a("p", mc, w(r(s)("Are you sure you want to move these files?")), 1),
            a("div", pc, [
              (f(!0), b(ke, null, Ce(l.value, (i) => (f(), b("div", hc, [
                a("div", null, [
                  i.type === "dir" ? (f(), b("svg", gc, _[2] || (_[2] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), b("svg", bc, _[3] || (_[3] = [
                    a("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                a("div", wc, w(i.path), 1)
              ]))), 256))
            ]),
            a("h4", yc, w(r(s)("Target Directory")), 1),
            a("p", kc, [
              _[4] || (_[4] = a("svg", {
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
              a("span", xc, w(r(e).modal.data.items.to.path), 1)
            ]),
            o.value.length ? (f(), Z(nt, {
              key: 0,
              onHidden: _[0] || (_[0] = (i) => o.value = ""),
              error: ""
            }, {
              default: ne(() => [
                J(w(o.value), 1)
              ]),
              _: 1
            })) : z("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Sc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function Cc(n, e) {
  return f(), b("svg", Sc, e[0] || (e[0] = [
    a("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ]));
}
const Ec = { render: Cc }, Ac = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Tc(n, e) {
  return f(), b("svg", Ac, e[0] || (e[0] = [
    a("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Mc = { render: Tc }, Dc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Lc(n, e) {
  return f(), b("svg", Dc, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const Vc = { render: Lc }, Oc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function Fc(n, e) {
  return f(), b("svg", Oc, e[0] || (e[0] = [
    a("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ]));
}
const Uc = { render: Fc }, Hc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function Ic(n, e) {
  return f(), b("svg", Hc, e[0] || (e[0] = [
    a("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ]));
}
const Rc = { render: Ic }, Bc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Nc(n, e) {
  return f(), b("svg", Bc, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const Pc = { render: Nc }, qc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function zc(n, e) {
  return f(), b("svg", qc, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ]));
}
const yn = { render: zc }, jc = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function Gc(n, e) {
  return f(), b("svg", jc, e[0] || (e[0] = [
    a("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ]));
}
const Wc = { render: Gc }, Kc = { class: "vuefinder__breadcrumb__container" }, Yc = ["title"], Zc = ["title"], Qc = ["title"], Xc = { class: "vuefinder__breadcrumb__list" }, Jc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, ed = { class: "relative" }, td = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], nd = { class: "vuefinder__breadcrumb__search-mode" }, sd = ["placeholder"], od = { class: "vuefinder__breadcrumb__hidden-dropdown" }, rd = ["onDrop", "onClick"], ad = { class: "vuefinder__breadcrumb__hidden-item-content" }, ld = { class: "vuefinder__breadcrumb__hidden-item-text" }, id = {
  __name: "Breadcrumb",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, l = e.dragSelect, { setStore: o } = e.storage, c = H(null), d = Vs(0, 100);
    Be(d, (S) => {
      const T = c.value.children;
      let M = 0, C = 0, L = 5, D = 1;
      e.fs.limitBreadcrumbItems(L), Tt(() => {
        for (let I = T.length - 1; I >= 0 && !(M + T[I].offsetWidth > d.value - 40); I--)
          M += parseInt(T[I].offsetWidth, 10), C++;
        C < D && (C = D), C > L && (C = L), e.fs.limitBreadcrumbItems(C);
      });
    });
    const _ = () => {
      d.value = c.value.offsetWidth;
    };
    let i = H(null);
    Me(() => {
      i.value = new ResizeObserver(_), i.value.observe(c.value);
    }), Fs(() => {
      i.value.disconnect();
    });
    const v = (S, T = null) => {
      S.preventDefault(), l.isDraggingRef.value = !1, h(S), T ?? (T = e.fs.hiddenBreadcrumbs.length - 1);
      let M = JSON.parse(S.dataTransfer.getData("items"));
      if (M.find((C) => C.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Kn, {
        items: {
          from: M,
          to: e.fs.hiddenBreadcrumbs[T] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, u = (S, T = null) => {
      S.preventDefault(), l.isDraggingRef.value = !1, h(S), T ?? (T = e.fs.breadcrumbs.length - 2);
      let M = JSON.parse(S.dataTransfer.getData("items"));
      if (M.find((C) => C.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Kn, {
        items: {
          from: M,
          to: e.fs.breadcrumbs[T] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, m = (S) => {
      S.preventDefault(), e.fs.isGoUpAvailable() ? (S.dataTransfer.dropEffect = "copy", S.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (S.dataTransfer.dropEffect = "none", S.dataTransfer.effectAllowed = "none");
    }, h = (S) => {
      S.preventDefault(), S.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && S.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
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
    }, y = (S) => {
      e.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: e.fs.adapter, path: S.path }
      }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, x = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, V = {
      mounted(S, T, M, C) {
        S.clickOutsideEvent = function(L) {
          S === L.target || S.contains(L.target) || T.value();
        }, document.body.addEventListener("click", S.clickOutsideEvent);
      },
      beforeUnmount(S, T, M, C) {
        document.body.removeEventListener("click", S.clickOutsideEvent);
      }
    };
    Be(
      () => e.showTreeView,
      (S, T) => {
        S !== T && o("show-tree-view", S);
      }
    );
    const W = H(null), O = () => {
      e.features.includes(fe.SEARCH) && (e.fs.searchMode = !0, Tt(() => W.value.focus()));
    }, k = Vs("", 400);
    Be(k, (S) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: S });
    }), Be(
      () => e.fs.searchMode,
      (S) => {
        S && Tt(() => W.value.focus());
      }
    );
    const F = () => {
      e.fs.searchMode = !1, k.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      F();
    });
    const P = () => {
      k.value === "" && F();
    };
    return (S, T) => (f(), b("div", Kc, [
      a("span", {
        title: r(s)("Go up a directory")
      }, [
        G(r(Mc), {
          onDragover: T[0] || (T[0] = (M) => m(M)),
          onDragleave: T[1] || (T[1] = (M) => h(M)),
          onDrop: T[2] || (T[2] = (M) => u(M)),
          onClick: g,
          class: de(
            r(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
          )
        }, null, 8, ["class"])
      ], 8, Yc),
      r(e).fs.loading ? (f(), b("span", {
        key: 1,
        title: r(s)("Cancel")
      }, [
        G(r(Vc), {
          onClick: T[3] || (T[3] = (M) => r(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Qc)) : (f(), b("span", {
        key: 0,
        title: r(s)("Refresh")
      }, [
        G(r(Ec), { onClick: p })
      ], 8, Zc)),
      he(a("div", {
        onClick: Xe(O, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        a("div", null, [
          G(r(Uc), {
            onDragover: T[4] || (T[4] = (M) => m(M)),
            onDragleave: T[5] || (T[5] = (M) => h(M)),
            onDrop: T[6] || (T[6] = (M) => u(M, -1)),
            onClick: T[7] || (T[7] = (M) => r(e).emitter.emit("vf-fetch", {
              params: { q: "index", adapter: r(e).fs.adapter }
            }))
          })
        ]),
        a("div", Xc, [
          r(e).fs.hiddenBreadcrumbs.length ? he((f(), b("div", Jc, [
            T[13] || (T[13] = a("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            a("div", ed, [
              a("span", {
                onDragenter: T[8] || (T[8] = (M) => r(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: T[9] || (T[9] = (M) => r(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                G(r(Wc), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [V, x]
          ]) : z("", !0)
        ]),
        a("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: Xe(O, ["self"])
        }, [
          (f(!0), b(ke, null, Ce(r(e).fs.breadcrumbs, (M, C) => (f(), b("div", { key: C }, [
            T[14] || (T[14] = a("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            a("span", {
              onDragover: (L) => C === r(e).fs.breadcrumbs.length - 1 || m(L),
              onDragleave: (L) => C === r(e).fs.breadcrumbs.length - 1 || h(L),
              onDrop: (L) => C === r(e).fs.breadcrumbs.length - 1 || u(L, C),
              class: "vuefinder__breadcrumb__item",
              title: M.basename,
              onClick: (L) => r(e).emitter.emit("vf-fetch", {
                params: {
                  q: "index",
                  adapter: r(e).fs.adapter,
                  path: M.path
                }
              })
            }, w(M.name), 41, td)
          ]))), 128))
        ], 512),
        r(e).loadingIndicator === "circular" && r(e).fs.loading ? (f(), Z(r(ds), { key: 0 })) : z("", !0)
      ], 512), [
        [ze, !r(e).fs.searchMode]
      ]),
      he(a("div", nd, [
        a("div", null, [
          G(r(Rc))
        ]),
        he(a("input", {
          ref_key: "searchInput",
          ref: W,
          onKeydown: Ot(F, ["esc"]),
          onBlur: P,
          "onUpdate:modelValue": T[10] || (T[10] = (M) => Jo(k) ? k.value = M : null),
          placeholder: r(s)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, sd), [
          [Ft, r(k)]
        ]),
        G(r(Pc), { onClick: F })
      ], 512), [
        [ze, r(e).fs.searchMode]
      ]),
      he(a("div", od, [
        (f(!0), b(ke, null, Ce(r(e).fs.hiddenBreadcrumbs, (M, C) => (f(), b("div", {
          key: C,
          onDragover: T[11] || (T[11] = (L) => m(L)),
          onDragleave: T[12] || (T[12] = (L) => h(L)),
          onDrop: (L) => v(L, C),
          onClick: (L) => y(M),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          a("div", ad, [
            a("span", null, [
              G(r(yn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            a("span", ld, w(M.name), 1)
          ])
        ], 40, rd))), 128))
      ], 512), [
        [ze, r(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Ro = (n, e = null) => new Date(n * 1e3).toLocaleString(e ?? "ru-RU"), cd = ["onClick"], dd = {
  __name: "Toast",
  setup(n) {
    const e = le("ServiceContainer"), { getStore: s } = e.storage, l = H(s("full-screen", !1)), o = H([]), c = (i) => i === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", d = (i) => {
      o.value.splice(i, 1);
    }, _ = (i) => {
      let v = o.value.findIndex((u) => u.id === i);
      v !== -1 && d(v);
    };
    return e.emitter.on("vf-toast-clear", () => {
      o.value = [];
    }), e.emitter.on("vf-toast-push", (i) => {
      let v = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      i.id = v, o.value.push(i), setTimeout(() => {
        _(v);
      }, 5e3);
    }), (i, v) => (f(), b("div", {
      class: de(["vuefinder__toast", l.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      G(er, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: ne(() => [
          (f(!0), b(ke, null, Ce(o.value, (u, m) => (f(), b("div", {
            key: m,
            onClick: (h) => d(m),
            class: de(["vuefinder__toast__message", c(u.type)])
          }, w(u.label), 11, cd))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, ud = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function _d(n, e) {
  return f(), b("svg", ud, e[0] || (e[0] = [
    a("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const vd = { render: _d }, fd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function md(n, e) {
  return f(), b("svg", fd, e[0] || (e[0] = [
    a("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const pd = { render: md }, Xt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(n) {
    return (e, s) => (f(), b("div", null, [
      n.direction === "asc" ? (f(), Z(r(vd), { key: 0 })) : z("", !0),
      n.direction === "desc" ? (f(), Z(r(pd), { key: 1 })) : z("", !0)
    ]));
  }
}, hd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function gd(n, e) {
  return f(), b("svg", hd, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const bd = { render: gd }, wd = { class: "vuefinder__item-icon" }, Dn = {
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
    return (e, s) => (f(), b("span", wd, [
      n.type === "dir" ? (f(), Z(r(yn), {
        key: 0,
        class: de(n.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (f(), Z(r(bd), {
        key: 1,
        class: de(n.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, yd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function kd(n, e) {
  return f(), b("svg", yd, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const xd = { render: kd }, $d = { class: "vuefinder__drag-item__container" }, Sd = { class: "vuefinder__drag-item__count" }, Cd = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(n) {
    const e = n;
    return (s, l) => (f(), b("div", $d, [
      G(r(xd)),
      a("div", Sd, w(e.count), 1)
    ]));
  }
}, Ed = { class: "vuefinder__text-preview" }, Ad = { class: "vuefinder__text-preview__header" }, Td = ["title"], Md = { class: "vuefinder__text-preview__actions" }, Dd = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Ld = { key: 1 }, Vd = {
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, l = H(""), o = H(""), c = H(null), d = H(!1), _ = H(""), i = H(!1), v = le("ServiceContainer"), { t: u } = v.i18n;
    Me(() => {
      v.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: v.modal.data.adapter, path: v.modal.data.item.path },
        responseType: "text"
      }).then((p) => {
        l.value = p, s("success");
      });
    });
    const m = () => {
      d.value = !d.value, o.value = l.value;
    }, h = () => {
      _.value = "", i.value = !1, v.requester.send({
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
        _.value = u("Updated."), l.value = p, s("success"), d.value = !d.value;
      }).catch((p) => {
        _.value = u(p.message), i.value = !0;
      });
    };
    return (p, g) => (f(), b("div", Ed, [
      a("div", Ad, [
        a("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: r(v).modal.data.item.path
        }, w(r(v).modal.data.item.basename), 9, Td),
        a("div", Md, [
          d.value ? (f(), b("button", {
            key: 0,
            onClick: h,
            class: "vuefinder__text-preview__save-button"
          }, w(r(u)("Save")), 1)) : z("", !0),
          r(v).features.includes(r(fe).EDIT) ? (f(), b("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: g[0] || (g[0] = (y) => m())
          }, w(d.value ? r(u)("Cancel") : r(u)("Edit")), 1)) : z("", !0)
        ])
      ]),
      a("div", null, [
        d.value ? (f(), b("div", Ld, [
          he(a("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": g[1] || (g[1] = (y) => o.value = y),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Ft, o.value]
          ])
        ])) : (f(), b("pre", Dd, w(l.value), 1)),
        _.value.length ? (f(), Z(nt, {
          key: 2,
          onHidden: g[2] || (g[2] = (y) => _.value = ""),
          error: i.value
        }, {
          default: ne(() => [
            J(w(_.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : z("", !0)
      ])
    ]));
  }
}, Od = { class: "vuefinder__image-preview" }, Fd = { class: "vuefinder__image-preview__header" }, Ud = ["title"], Hd = { class: "vuefinder__image-preview__actions" }, Id = { class: "vuefinder__image-preview__image-container" }, Rd = ["src"], Bd = {
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, l = le("ServiceContainer"), { t: o } = l.i18n, c = H(null), d = H(null), _ = H(!1), i = H(""), v = H(!1), u = () => {
      _.value = !_.value, _.value ? d.value = new ir(c.value, {
        crop(h) {
        }
      }) : d.value.destroy();
    }, m = () => {
      d.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (h) => {
          i.value = "", v.value = !1;
          const p = new FormData();
          p.set("file", h), l.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: l.modal.data.adapter,
              path: l.modal.data.item.path
            },
            body: p
          }).then((g) => {
            i.value = o("Updated."), c.value.src = l.requester.getPreviewUrl(l.modal.data.adapter, l.modal.data.item), u(), s("success");
          }).catch((g) => {
            i.value = o(g.message), v.value = !0;
          });
        }
      );
    };
    return Me(() => {
      s("success");
    }), (h, p) => (f(), b("div", Od, [
      a("div", Fd, [
        a("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: r(l).modal.data.item.path
        }, w(r(l).modal.data.item.basename), 9, Ud),
        a("div", Hd, [
          _.value ? (f(), b("button", {
            key: 0,
            onClick: m,
            class: "vuefinder__image-preview__crop-button"
          }, w(r(o)("Crop")), 1)) : z("", !0),
          r(l).features.includes(r(fe).EDIT) ? (f(), b("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: p[0] || (p[0] = (g) => u())
          }, w(_.value ? r(o)("Cancel") : r(o)("Edit")), 1)) : z("", !0)
        ])
      ]),
      a("div", Id, [
        a("img", {
          ref_key: "image",
          ref: c,
          class: "vuefinder__image-preview__image",
          src: r(l).requester.getPreviewUrl(r(l).modal.data.adapter, r(l).modal.data.item),
          alt: ""
        }, null, 8, Rd)
      ]),
      i.value.length ? (f(), Z(nt, {
        key: 0,
        onHidden: p[1] || (p[1] = (g) => i.value = ""),
        error: v.value
      }, {
        default: ne(() => [
          J(w(i.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : z("", !0)
    ]));
  }
}, Nd = { class: "vuefinder__default-preview" }, Pd = { class: "vuefinder__default-preview__header" }, qd = ["title"], zd = {
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = le("ServiceContainer"), l = e;
    return Me(() => {
      l("success");
    }), (o, c) => (f(), b("div", Nd, [
      a("div", Pd, [
        a("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: r(s).modal.data.item.path
        }, w(r(s).modal.data.item.basename), 9, qd)
      ]),
      c[0] || (c[0] = a("div", null, null, -1))
    ]));
  }
}, jd = { class: "vuefinder__video-preview" }, Gd = ["title"], Wd = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, Kd = ["src"], Yd = {
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = le("ServiceContainer"), l = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Me(() => {
      l("success");
    }), (c, d) => (f(), b("div", jd, [
      a("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: r(s).modal.data.item.path
      }, w(r(s).modal.data.item.basename), 9, Gd),
      a("div", null, [
        a("video", Wd, [
          a("source", {
            src: o(),
            type: "video/mp4"
          }, null, 8, Kd),
          d[0] || (d[0] = J(" Your browser does not support the video tag. "))
        ])
      ])
    ]));
  }
}, Zd = { class: "vuefinder__audio-preview" }, Qd = ["title"], Xd = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Jd = ["src"], eu = {
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = e, l = le("ServiceContainer"), o = () => l.requester.getPreviewUrl(l.modal.data.adapter, l.modal.data.item);
    return Me(() => {
      s("success");
    }), (c, d) => (f(), b("div", Zd, [
      a("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: r(l).modal.data.item.path
      }, w(r(l).modal.data.item.basename), 9, Qd),
      a("div", null, [
        a("audio", Xd, [
          a("source", {
            src: o(),
            type: "audio/mpeg"
          }, null, 8, Jd),
          d[0] || (d[0] = J(" Your browser does not support the audio element. "))
        ])
      ])
    ]));
  }
}, tu = { class: "vuefinder__pdf-preview" }, nu = ["title"], su = ["data"], ou = ["src"], ru = {
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    const s = le("ServiceContainer"), l = e, o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Me(() => {
      l("success");
    }), (c, d) => (f(), b("div", tu, [
      a("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: r(s).modal.data.item.path
      }, w(r(s).modal.data.item.basename), 9, nu),
      a("div", null, [
        a("object", {
          class: "vuefinder__pdf-preview__object",
          data: o(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          a("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: o(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, ou)
        ], 8, su)
      ])
    ]));
  }
}, au = { class: "vuefinder__preview-modal__content" }, lu = { key: 0 }, iu = { class: "vuefinder__preview-modal__loading" }, cu = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, du = { class: "vuefinder__preview-modal__details" }, uu = { class: "font-bold" }, _u = { class: "font-bold pl-2" }, vu = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, fu = ["download", "href"], Bo = {
  __name: "ModalPreview",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, l = H(!1), o = (d) => (e.modal.data.item.mime_type ?? "").startsWith(d), c = e.features.includes(fe.PREVIEW);
    return c || (l.value = !0), (d, _) => (f(), Z(tt, null, {
      buttons: ne(() => [
        a("button", {
          type: "button",
          onClick: _[6] || (_[6] = (i) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(r(s)("Close")), 1),
        r(e).features.includes(r(fe).DOWNLOAD) ? (f(), b("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item),
          href: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item)
        }, w(r(s)("Download")), 9, fu)) : z("", !0)
      ]),
      default: ne(() => [
        a("div", null, [
          a("div", au, [
            r(c) ? (f(), b("div", lu, [
              o("text") ? (f(), Z(Vd, {
                key: 0,
                onSuccess: _[0] || (_[0] = (i) => l.value = !0)
              })) : o("image") ? (f(), Z(Bd, {
                key: 1,
                onSuccess: _[1] || (_[1] = (i) => l.value = !0)
              })) : o("video") ? (f(), Z(Yd, {
                key: 2,
                onSuccess: _[2] || (_[2] = (i) => l.value = !0)
              })) : o("audio") ? (f(), Z(eu, {
                key: 3,
                onSuccess: _[3] || (_[3] = (i) => l.value = !0)
              })) : o("application/pdf") ? (f(), Z(ru, {
                key: 4,
                onSuccess: _[4] || (_[4] = (i) => l.value = !0)
              })) : (f(), Z(zd, {
                key: 5,
                onSuccess: _[5] || (_[5] = (i) => l.value = !0)
              }))
            ])) : z("", !0),
            a("div", iu, [
              l.value === !1 ? (f(), b("div", cu, [
                _[7] || (_[7] = a("svg", {
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
                a("span", null, w(r(s)("Loading")), 1)
              ])) : z("", !0)
            ])
          ])
        ]),
        a("div", du, [
          a("div", null, [
            a("span", uu, w(r(s)("File Size")) + ": ", 1),
            J(w(r(e).filesize(r(e).modal.data.item.file_size)), 1)
          ]),
          a("div", null, [
            a("span", _u, w(r(s)("Last Modified")) + ": ", 1),
            J(" " + w(r(Ro)(r(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        r(e).features.includes(r(fe).DOWNLOAD) ? (f(), b("div", vu, [
          a("span", null, w(r(s)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : z("", !0)
      ]),
      _: 1
    }));
  }
}, mu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function pu(n, e) {
  return f(), b("svg", mu, e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ]));
}
const No = { render: pu }, hu = ["data-type", "data-item", "data-index"], Ln = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(n) {
    const e = le("ServiceContainer"), s = e.dragSelect, l = n, o = (p) => {
      p.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: p.path } })) : e.modal.open(Bo, { adapter: e.fs.adapter, item: p });
    }, c = {
      mounted(p, g, y, x) {
        y.props.draggable && (p.addEventListener("dragstart", (V) => d(V, g.value)), p.addEventListener("dragover", (V) => i(V, g.value)), p.addEventListener("drop", (V) => _(V, g.value)));
      },
      beforeUnmount(p, g, y, x) {
        y.props.draggable && (p.removeEventListener("dragstart", d), p.removeEventListener("dragover", i), p.removeEventListener("drop", _));
      }
    }, d = (p, g) => {
      if (p.altKey || p.ctrlKey || p.metaKey)
        return p.preventDefault(), !1;
      s.isDraggingRef.value = !0, p.dataTransfer.setDragImage(l.dragImage.$el, 0, 15), p.dataTransfer.effectAllowed = "all", p.dataTransfer.dropEffect = "copy", p.dataTransfer.setData("items", JSON.stringify(s.getSelected()));
    }, _ = (p, g) => {
      p.preventDefault(), s.isDraggingRef.value = !1;
      let y = JSON.parse(p.dataTransfer.getData("items"));
      if (y.find((x) => x.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Kn, { items: { from: y, to: g } });
    }, i = (p, g) => {
      p.preventDefault(), !g || g.type !== "dir" || s.getSelection().find((y) => y === p.currentTarget) ? (p.dataTransfer.dropEffect = "none", p.dataTransfer.effectAllowed = "none") : p.dataTransfer.dropEffect = "copy";
    };
    let v = null, u = !1;
    const m = () => {
      v && clearTimeout(v);
    }, h = (p) => {
      if (!u)
        u = !0, setTimeout(() => u = !1, 300);
      else
        return u = !1, o(l.item), clearTimeout(v), !1;
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
    return (p, g) => he((f(), b("div", {
      style: un({ opacity: r(s).isDraggingRef.value && r(s).getSelection().find((y) => p.$el === y) ? "0.5 !important" : "" }),
      class: de(["vuefinder__item", "vf-item-" + r(s).explorerId]),
      "data-type": n.item.type,
      key: n.item.path,
      "data-item": JSON.stringify(n.item),
      "data-index": n.index,
      onDblclick: g[0] || (g[0] = (y) => o(n.item)),
      onTouchstart: g[1] || (g[1] = (y) => h(y)),
      onTouchend: g[2] || (g[2] = (y) => m()),
      onContextmenu: g[3] || (g[3] = Xe((y) => r(e).emitter.emit("vf-contextmenu-show", { event: y, items: r(s).getSelected(), target: n.item }), ["prevent"]))
    }, [
      Mt(p.$slots, "default"),
      r(e).pinnedFolders.find((y) => y.path === n.item.path) ? (f(), Z(r(No), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : z("", !0)
    ], 46, hu)), [
      [c, n.item]
    ]);
  }
}, gu = { class: "vuefinder__explorer__container" }, bu = {
  key: 0,
  class: "vuefinder__explorer__header"
}, wu = { class: "vuefinder__explorer__drag-item" }, yu = {
  key: 0,
  class: "vuefinder__linear-loader absolute"
}, ku = { class: "vuefinder__explorer__item-list-content" }, xu = { class: "vuefinder__explorer__item-list-name" }, $u = { class: "vuefinder__explorer__item-name" }, Su = { class: "vuefinder__explorer__item-path" }, Cu = { class: "vuefinder__explorer__item-list-content" }, Eu = { class: "vuefinder__explorer__item-list-name" }, Au = { class: "vuefinder__explorer__item-name" }, Tu = { class: "vuefinder__explorer__item-size" }, Mu = { class: "vuefinder__explorer__item-date" }, Du = { class: "vuefinder__explorer__item-grid-content" }, Lu = ["data-src", "alt"], Vu = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, Ou = { class: "vuefinder__explorer__item-title break-all" }, Fu = {
  __name: "Explorer",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, l = (m) => m == null ? void 0 : m.substring(0, 3), o = H(null), c = H(""), d = e.dragSelect;
    let _;
    e.emitter.on("vf-fullscreen-toggle", () => {
      d.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: m }) => {
      c.value = m, m ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: m
        },
        onSuccess: (h) => {
          h.files.length || e.emitter.emit("vf-toast-push", { label: s("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const i = Is({ active: !1, column: "", order: "" }), v = (m = !0) => {
      let h = [...e.fs.data.files], p = i.column, g = i.order === "asc" ? 1 : -1;
      if (!m)
        return h;
      const y = (x, V) => typeof x == "string" && typeof V == "string" ? x.toLowerCase().localeCompare(V.toLowerCase()) : x < V ? -1 : x > V ? 1 : 0;
      return i.active && (h = h.slice().sort((x, V) => y(x[p], V[p]) * g)), h;
    }, u = (m) => {
      i.active && i.column === m ? (i.active = i.order === "asc", i.column = m, i.order = "desc") : (i.active = !0, i.column = m, i.order = "asc");
    };
    return Me(() => {
      _ = new lr(d.area.value);
    }), tr(() => {
      _.update();
    }), Hs(() => {
      _.destroy();
    }), (m, h) => (f(), b("div", gu, [
      r(e).view === "list" || c.value.length ? (f(), b("div", bu, [
        a("div", {
          onClick: h[0] || (h[0] = (p) => u("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          J(w(r(s)("Name")) + " ", 1),
          he(G(Xt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "basename"]
          ])
        ]),
        c.value.length ? z("", !0) : (f(), b("div", {
          key: 0,
          onClick: h[1] || (h[1] = (p) => u("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          J(w(r(s)("Size")) + " ", 1),
          he(G(Xt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "file_size"]
          ])
        ])),
        c.value.length ? z("", !0) : (f(), b("div", {
          key: 1,
          onClick: h[2] || (h[2] = (p) => u("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          J(w(r(s)("Date")) + " ", 1),
          he(G(Xt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "last_modified"]
          ])
        ])),
        c.value.length ? (f(), b("div", {
          key: 2,
          onClick: h[3] || (h[3] = (p) => u("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          J(w(r(s)("Filepath")) + " ", 1),
          he(G(Xt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "path"]
          ])
        ])) : z("", !0)
      ])) : z("", !0),
      a("div", wu, [
        G(Cd, {
          ref_key: "dragImage",
          ref: o,
          count: r(d).getCount()
        }, null, 8, ["count"])
      ]),
      a("div", {
        ref: r(d).scrollBarContainer,
        class: de(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": r(e).view === "grid" }, { "search-active": c.value.length }]])
      }, [
        a("div", {
          ref: r(d).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      a("div", {
        ref: r(d).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area min-h-32",
        onContextmenu: h[4] || (h[4] = Xe((p) => r(e).emitter.emit("vf-contextmenu-show", { event: p, items: r(d).getSelected() }), ["self", "prevent"]))
      }, [
        r(e).loadingIndicator === "linear" && r(e).fs.loading ? (f(), b("div", yu)) : z("", !0),
        c.value.length ? (f(!0), b(ke, { key: 1 }, Ce(v(), (p, g) => (f(), Z(Ln, {
          item: p,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-list"
        }, {
          default: ne(() => [
            a("div", ku, [
              a("div", xu, [
                G(Dn, {
                  type: p.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", $u, w(p.basename), 1)
              ]),
              a("div", Su, w(p.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : z("", !0),
        r(e).view === "list" && !c.value.length ? (f(!0), b(ke, { key: 2 }, Ce(v(), (p, g) => (f(), Z(Ln, {
          item: p,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: p.path
        }, {
          default: ne(() => [
            a("div", Cu, [
              a("div", Eu, [
                G(Dn, {
                  type: p.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                a("span", Au, w(p.basename), 1)
              ]),
              a("div", Tu, w(p.file_size ? r(e).filesize(p.file_size) : ""), 1),
              a("div", Mu, w(r(Ro)(p.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : z("", !0),
        r(e).view === "grid" && !c.value.length ? (f(!0), b(ke, { key: 3 }, Ce(v(!1), (p, g) => (f(), Z(Ln, {
          item: p,
          index: g,
          dragImage: o.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: ne(() => [
            a("div", null, [
              a("div", Du, [
                (p.mime_type ?? "").startsWith("image") && r(e).showThumbnails ? (f(), b("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": r(e).requester.getPreviewUrl(r(e).fs.adapter, p),
                  alt: p.basename,
                  key: p.path
                }, null, 8, Lu)) : (f(), Z(Dn, {
                  key: 1,
                  type: p.type
                }, null, 8, ["type"])),
                !((p.mime_type ?? "").startsWith("image") && r(e).showThumbnails) && p.type !== "dir" ? (f(), b("div", Vu, w(l(p.extension)), 1)) : z("", !0)
              ]),
              a("span", Ou, w(r(Wn)(p.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : z("", !0)
      ], 544),
      G(dd)
    ]));
  }
}, Uu = ["href", "download"], Hu = ["onClick"], Iu = {
  __name: "ContextMenu",
  setup(n) {
    const e = le("ServiceContainer"), s = H(null), l = H([]), o = H(""), c = Is({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    });
    e.emitter.on("vf-context-selected", (v) => {
      l.value = v;
    });
    const d = (v) => v.link(e, l), _ = (v) => {
      e.emitter.emit("vf-contextmenu-hide"), v.action(e, l);
    };
    e.emitter.on("vf-search-query", ({ newQuery: v }) => {
      o.value = v;
    }), e.emitter.on("vf-contextmenu-show", ({ event: v, items: u, target: m = null }) => {
      if (c.items = e.contextMenuItems.filter((h) => h.show(e, {
        searchQuery: o.value,
        items: u,
        target: m
      })), o.value)
        if (m)
          e.emitter.emit("vf-context-selected", [m]);
        else
          return;
      else !m && !o.value ? e.emitter.emit("vf-context-selected", []) : u.length > 1 && u.some((h) => h.path === m.path) ? e.emitter.emit("vf-context-selected", u) : e.emitter.emit("vf-context-selected", [m]);
      i(v);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const i = (v) => {
      const u = e.dragSelect.area.value, m = e.root.getBoundingClientRect(), h = u.getBoundingClientRect();
      let p = v.clientX - m.left, g = v.clientY - m.top;
      c.active = !0, Tt(() => {
        var W;
        const y = (W = s.value) == null ? void 0 : W.getBoundingClientRect();
        let x = (y == null ? void 0 : y.height) ?? 0, V = (y == null ? void 0 : y.width) ?? 0;
        p = h.right - v.pageX + window.scrollX < V ? p - V : p, g = h.bottom - v.pageY + window.scrollY < x ? g - x : g, c.positions = {
          left: p + "px",
          top: g + "px"
        };
      });
    };
    return (v, u) => he((f(), b("ul", {
      ref_key: "contextmenu",
      ref: s,
      style: un(c.positions),
      class: "vuefinder__context-menu"
    }, [
      (f(!0), b(ke, null, Ce(c.items, (m) => (f(), b("li", {
        class: "vuefinder__context-menu__item",
        key: m.title
      }, [
        m.link && m.type === "file" ? (f(), b("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: d(m),
          download: d(m),
          onClick: u[0] || (u[0] = (h) => r(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          a("span", null, w(m.title(r(e).i18n)), 1)
        ], 8, Uu)) : (f(), b("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (h) => _(m)
        }, [
          a("span", null, w(m.title(r(e).i18n)), 1)
        ], 8, Hu))
      ]))), 128))
    ], 4)), [
      [ze, c.active]
    ]);
  }
}, Ru = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Bu(n, e) {
  return f(), b("svg", Ru, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ]));
}
const Po = { render: Bu }, Nu = { class: "vuefinder__status-bar__wrapper" }, Pu = { class: "vuefinder__status-bar__space" }, qu = { class: "vuefinder__status-bar__space-container" }, zu = { class: "vuefinder__status-bar__space-icon" }, ju = { class: "vuefinder__status-bar__space-text" }, Gu = {
  __name: "Statusbar",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, { setStore: l } = e.storage, o = e.dragSelect, c = H("");
    e.emitter.on("vf-search-query", ({ newQuery: u }) => {
      c.value = u;
    }), ot(() => {
      const u = e.selectButton.multiple ? o.getSelected().length > 0 : o.getSelected().length === 1;
      return e.selectButton.active && u;
    });
    const d = ot(() => {
      var m, h;
      const u = (h = (m = e.fs) == null ? void 0 : m.data) == null ? void 0 : h.used_space;
      return typeof u == "number" ? u.toFixed(2) : "0.00";
    }), _ = ot(() => {
      var m, h;
      const u = (h = (m = e.fs) == null ? void 0 : m.data) == null ? void 0 : h.total_space;
      return typeof u == "number" ? u.toFixed(2) : "0.00";
    }), i = ot(() => {
      var h, p, g, y;
      const u = (p = (h = e.fs) == null ? void 0 : h.data) == null ? void 0 : p.used_space, m = (y = (g = e.fs) == null ? void 0 : g.data) == null ? void 0 : y.total_space;
      return typeof u == "number" && typeof m == "number" && m !== 0 ? (u / m * 100).toFixed(2) : "0.00";
    }), v = ot(() => `Used ${d.value}Mb out of ${_.value}Mb (${i.value}%)`);
    return (u, m) => (f(), b("div", Nu, [
      a("div", Pu, [
        a("div", qu, [
          a("span", zu, [
            G(r(Po))
          ]),
          a("span", ju, w(v.value), 1)
        ])
      ]),
      m[0] || (m[0] = a("div", { class: "vuefinder__status-bar__actions" }, null, -1))
    ]));
  }
}, Wu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function Ku(n, e) {
  return f(), b("svg", Wu, e[0] || (e[0] = [
    a("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ]));
}
const qo = { render: Ku }, Yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Zu(n, e) {
  return f(), b("svg", Yu, e[0] || (e[0] = [
    a("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ]));
}
const Qu = { render: Zu }, Xu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ju(n, e) {
  return f(), b("svg", Xu, e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ]));
}
const zo = { render: Ju }, e_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function t_(n, e) {
  return f(), b("svg", e_, e[0] || (e[0] = [
    a("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    a("path", { d: "M9 12h6" }, null, -1)
  ]));
}
const jo = { render: t_ };
function Go(n, e) {
  const s = n.findIndex((l) => l.path === e.path);
  s > -1 ? n[s] = e : n.push(e);
}
const n_ = { class: "vuefinder__folder-loader-indicator" }, s_ = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Wo = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ nr({
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
    const e = n, s = le("ServiceContainer"), { t: l } = s.i18n, o = Rs(n, "modelValue"), c = H(!1);
    Be(
      () => o.value,
      () => {
        var i;
        return ((i = d()) == null ? void 0 : i.folders.length) || _();
      }
    );
    function d() {
      return s.treeViewData.find((i) => i.path === e.path);
    }
    const _ = () => {
      c.value = !0, s.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: e.adapter,
          path: e.path
        }
      }).then((i) => {
        Go(s.treeViewData, { path: e.path, ...i });
      }).catch((i) => {
      }).finally(() => {
        c.value = !1;
      });
    };
    return (i, v) => {
      var u;
      return f(), b("div", n_, [
        c.value ? (f(), Z(r(ds), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (f(), b("div", s_, [
          o.value && ((u = d()) != null && u.folders.length) ? (f(), Z(r(jo), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : z("", !0),
          o.value ? z("", !0) : (f(), Z(r(zo), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, o_ = { class: "vuefinder__treesubfolderlist__item-content" }, r_ = ["onClick"], a_ = ["title", "onClick"], l_ = { class: "vuefinder__treesubfolderlist__item-icon" }, i_ = { class: "vuefinder__treesubfolderlist__subfolder" }, c_ = {
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
    const e = le("ServiceContainer"), s = H([]), l = n, o = H(null);
    Me(() => {
      l.path === l.adapter + "://" && et(o.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const c = ot(() => {
      var d;
      return ((d = e.treeViewData.find((_) => _.path === l.path)) == null ? void 0 : d.folders) || [];
    });
    return (d, _) => {
      const i = sr("TreeSubfolderList", !0);
      return f(), b("ul", {
        ref_key: "parentSubfolderList",
        ref: o,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (f(!0), b(ke, null, Ce(c.value, (v, u) => (f(), b("li", {
          key: v.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          a("div", o_, [
            a("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (m) => s.value[v.path] = !s.value[v.path]
            }, [
              G(Wo, {
                adapter: n.adapter,
                path: v.path,
                modelValue: s.value[v.path],
                "onUpdate:modelValue": (m) => s.value[v.path] = m
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, r_),
            a("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: v.path,
              onClick: (m) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: l.adapter, path: v.path } })
            }, [
              a("div", l_, [
                r(e).fs.path === v.path ? (f(), Z(r(qo), { key: 0 })) : (f(), Z(r(yn), { key: 1 }))
              ]),
              a("div", {
                class: de(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": r(e).fs.path === v.path
                }])
              }, w(v.basename), 3)
            ], 8, a_)
          ]),
          a("div", i_, [
            he(G(i, {
              adapter: l.adapter,
              path: v.path
            }, null, 8, ["adapter", "path"]), [
              [ze, s.value[v.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, d_ = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(n) {
    const e = le("ServiceContainer"), { setStore: s } = e.storage, l = H(!1);
    function o(c) {
      c === e.fs.adapter ? l.value = !l.value : (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: c } }), s("adapter", c));
    }
    return (c, d) => (f(), b(ke, null, [
      a("div", {
        onClick: d[2] || (d[2] = (_) => o(n.storage)),
        class: "vuefinder__treestorageitem__header"
      }, [
        a("div", {
          class: de(["vuefinder__treestorageitem__info", n.storage === r(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          a("div", {
            class: de(["vuefinder__treestorageitem__icon", n.storage === r(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            G(r(Po))
          ], 2),
          a("div", null, w(n.storage), 1)
        ], 2),
        a("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: d[1] || (d[1] = Xe((_) => l.value = !l.value, ["stop"]))
        }, [
          G(Wo, {
            adapter: n.storage,
            path: n.storage + "://",
            modelValue: l.value,
            "onUpdate:modelValue": d[0] || (d[0] = (_) => l.value = _)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      he(G(c_, {
        adapter: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [ze, l.value]
      ])
    ], 64));
  }
}, u_ = { class: "vuefinder__folder-indicator" }, __ = { class: "vuefinder__folder-indicator--icon" }, v_ = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = Rs(n, "modelValue");
    return (s, l) => (f(), b("div", u_, [
      a("div", __, [
        e.value ? (f(), Z(r(jo), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : z("", !0),
        e.value ? z("", !0) : (f(), Z(r(zo), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, f_ = { class: "vuefinder__treeview__header" }, m_ = { class: "vuefinder__treeview__pinned-label" }, p_ = { class: "vuefinder__treeview__pin-text text-nowrap" }, h_ = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, g_ = { class: "vuefinder__treeview__pinned-item" }, b_ = ["onClick"], w_ = ["title"], y_ = ["onClick"], k_ = { key: 0 }, x_ = { class: "vuefinder__treeview__no-pinned" }, $_ = { class: "vuefinder__treeview__storage" }, S_ = {
  __name: "TreeView",
  setup(n) {
    const e = le("ServiceContainer"), { t: s } = e.i18n, { getStore: l, setStore: o } = e.storage, c = H(190), d = H(l("pinned-folders-opened", !0));
    Be(d, (u) => o("pinned-folders-opened", u));
    const _ = (u) => {
      e.pinnedFolders = e.pinnedFolders.filter((m) => m.path !== u.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, i = (u) => {
      const m = u.clientX, h = u.target.parentElement, p = h.getBoundingClientRect().width;
      h.classList.remove("transition-[width]"), h.classList.add("transition-none");
      const g = (x) => {
        c.value = p + x.clientX - m, c.value < 50 && (c.value = 0, e.showTreeView = !1), c.value > 50 && (e.showTreeView = !0);
      }, y = () => {
        const x = h.getBoundingClientRect();
        c.value = x.width, h.classList.add("transition-[width]"), h.classList.remove("transition-none"), window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", y);
      };
      window.addEventListener("mousemove", g), window.addEventListener("mouseup", y);
    }, v = H(null);
    return Me(() => {
      et(v.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Be(e.fs.data, (u, m) => {
      const h = u.files.filter((p) => p.type === "dir");
      Go(e.treeViewData, { path: e.fs.path, folders: h.map((p) => ({
        adapter: p.storage,
        path: p.path,
        basename: p.basename
      })) });
    }), (u, m) => (f(), b(ke, null, [
      a("div", {
        onClick: m[0] || (m[0] = (h) => r(e).showTreeView = !r(e).showTreeView),
        class: de(["vuefinder__treeview__overlay", r(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      a("div", {
        style: un(r(e).showTreeView ? "min-width:100px;max-width:75%; width: " + c.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        a("div", {
          ref_key: "treeViewScrollElement",
          ref: v,
          class: "vuefinder__treeview__scroll"
        }, [
          a("div", f_, [
            a("div", {
              onClick: m[2] || (m[2] = (h) => d.value = !d.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              a("div", m_, [
                G(r(No), { class: "vuefinder__treeview__pin-icon" }),
                a("div", p_, w(r(s)("Pinned Folders")), 1)
              ]),
              G(v_, {
                modelValue: d.value,
                "onUpdate:modelValue": m[1] || (m[1] = (h) => d.value = h)
              }, null, 8, ["modelValue"])
            ]),
            d.value ? (f(), b("ul", h_, [
              (f(!0), b(ke, null, Ce(r(e).pinnedFolders, (h) => (f(), b("li", g_, [
                a("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (p) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: h.storage, path: h.path } })
                }, [
                  r(e).fs.path !== h.path ? (f(), Z(r(yn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : z("", !0),
                  r(e).fs.path === h.path ? (f(), Z(r(qo), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : z("", !0),
                  a("div", {
                    title: h.path,
                    class: de(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": r(e).fs.path === h.path
                    }])
                  }, w(h.basename), 11, w_)
                ], 8, b_),
                a("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (p) => _(h)
                }, [
                  G(r(Qu), { class: "vuefinder__treeview__remove-icon" })
                ], 8, y_)
              ]))), 256)),
              r(e).pinnedFolders.length ? z("", !0) : (f(), b("li", k_, [
                a("div", x_, w(r(s)("No folders pinned")), 1)
              ]))
            ])) : z("", !0)
          ]),
          (f(!0), b(ke, null, Ce(r(e).fs.data.storages, (h) => (f(), b("div", $_, [
            G(d_, { storage: h }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        a("div", {
          onMousedown: i,
          class: de([(r(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
};
class C_ {
  /**
   *
   * @param {Item['title']} title
   * @param {Item['action']} action
   * @param {Item['link']} link
   * @param {Partial<SimpleItemOptions>} options
   */
  constructor(e, s, l, o) {
    this.title = e, this.action = s, this.link = l, this.options = Object.assign(
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
    const l = (d) => d.items.length > 1 && d.items.some((_) => {
      var i;
      return _.path === ((i = d.target) == null ? void 0 : i.path);
    }) ? "many" : d.target ? "one" : null;
    return !(this.options.needsSearchQuery !== !!s.searchQuery || this.options.target !== void 0 && this.options.target !== l(s) || this.options.targetType !== void 0 && this.options.targetType !== ((o = s.target) == null ? void 0 : o.type) || this.options.mimeType !== void 0 && this.options.mimeType !== ((c = s.target) == null ? void 0 : c.mime_type) || this.options.feature !== void 0 && !e.features.includes(this.options.feature) || this.options.show !== void 0 && !this.options.show(e, s));
  }
}
function Ie(n, e) {
  return n.map((s) => new C_(s.title, s.action, s.link, {
    ...e,
    feature: s.key
  }));
}
const Ae = {
  newfolder: {
    key: fe.NEW_FOLDER,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(Vo)
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
        (s) => !e.value.find((l) => l.path === s.path)
      ), n.storage.setStore("pinned-folders", n.pinnedFolders);
    }
  },
  delete: {
    key: fe.DELETE,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(is, { items: e });
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
    key: fe.PREVIEW,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(Bo, {
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
    key: fe.DOWNLOAD,
    link: (n, e) => n.requester.getDownloadUrl(n.fs.adapter, e.value[0]),
    title: ({ t: n }) => n("Download"),
    // action: () => {},
    action: (n, e) => {
      const s = e.value[0];
      if ((s == null ? void 0 : s.type) === "dir")
        n.emitter.emit("vf-download", { item: s });
      else {
        const l = n.requester.getDownloadUrl(n.fs.adapter, s);
        window.open(l, "_blank");
      }
    }
  },
  archive: {
    key: fe.ARCHIVE,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(Io, { items: e })
  },
  unarchive: {
    key: fe.UNARCHIVE,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(Uo, { items: e })
  },
  rename: {
    key: fe.RENAME,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(cs, { items: e })
  }
}, E_ = [
  ...Ie([Ae.openDir], {
    needsSearchQuery: !0
  }),
  ...Ie(
    [Ae.refresh, Ae.selectAll, Ae.newfolder],
    {
      target: null
    }
  ),
  ...Ie(
    [Ae.refresh, Ae.archive, Ae.delete],
    {
      target: "many"
    }
  ),
  ...Ie([Ae.open], {
    targetType: "dir"
  }),
  ...Ie([Ae.unpinFolder], {
    targetType: "dir",
    show: (n, e) => n.pinnedFolders.findIndex((s) => {
      var l;
      return s.path === ((l = e.target) == null ? void 0 : l.path);
    }) !== -1
  }),
  ...Ie([Ae.pinFolder], {
    targetType: "dir",
    show: (n, e) => n.pinnedFolders.findIndex((s) => {
      var l;
      return s.path === ((l = e.target) == null ? void 0 : l.path);
    }) === -1
  }),
  ...Ie([Ae.preview], {
    show: (n, e) => {
      var s;
      return ((s = e.target) == null ? void 0 : s.type) !== "dir";
    }
  }),
  ...Ie([Ae.download], {}),
  ...Ie([Ae.rename], { numItems: "one" }),
  ...Ie([Ae.unarchive], {
    mimeType: "application/zip"
  }),
  ...Ie([Ae.archive], {
    show: (n, e) => {
      var s;
      return ((s = e.target) == null ? void 0 : s.mime_type) !== "application/zip";
    }
  }),
  ...Ie([Ae.delete], {})
], A_ = { class: "vuefinder__main__content" }, T_ = {
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
      default: () => E_
    }
  },
  emits: ["select", "update:path"],
  setup(n, { emit: e }) {
    const s = e, l = n, { setStore: o } = app.storage, c = H(null);
    app.root = c;
    const d = app.dragSelect;
    Wl(app);
    const _ = (u) => {
      Object.assign(app.fs.data, u), d.clearSelection(), d.refreshSelection();
    };
    let i;
    app.emitter.on("vf-fetch-abort", () => {
      i.abort(), app.fs.loading = !1;
    }), app.emitter.on(
      "vf-fetch",
      ({
        params: u,
        body: m = null,
        onSuccess: h = null,
        onError: p = null,
        noCloseModal: g = !1
      }) => {
        ["index", "search"].includes(u.q) && (i && i.abort(), app.fs.loading = !0), i = new AbortController();
        const y = i.signal;
        if (u.q === "download") {
          const x = l.request.baseUrl, V = u.m || "POST", W = new URLSearchParams(u).toString(), O = `${x}?${W}`;
          fetch(O, {
            method: V,
            headers: l.request.headers,
            body: m ? m instanceof FormData ? m : JSON.stringify(m) : null,
            abortSignal: y
          }).then((k) => {
            const F = k.headers.get("Content-Disposition");
            let P = "folder.zip";
            if (F && F.includes("filename=")) {
              const S = F.match(/filename="?([^"]+)"?/);
              S && S[1] && (P = S[1]);
            }
            return k.blob().then((S) => ({ blob: S, filename: P }));
          }).then(({ blob: k, filename: F }) => {
            const P = window.URL.createObjectURL(k), S = document.createElement("a");
            S.href = P, S.download = F, document.body.appendChild(S), S.click(), S.remove(), window.URL.revokeObjectURL(P);
          }).catch((k) => {
            console.error("Download error", k);
          });
          return;
        }
        app.requester.send({
          url: "",
          method: u.m || "get",
          params: u,
          body: m,
          abortSignal: y
        }).then((x) => {
          app.fs.adapter = x.adapter, app.persist && (app.fs.path = x.dirname, o("path", app.fs.path)), g || app.modal.close(), _(x), h && h(x);
        }).catch((x) => {
          console.error(x), p && p(x);
        }).finally(() => {
          ["index", "search"].includes(u.q) && (app.fs.loading = !1);
        });
      }
    ), app.emitter.on("vf-download", ({ item: u }) => {
      app.emitter.emit("vf-fetch", {
        params: {
          q: "download",
          m: "post",
          adapter: app.fs.adapter,
          path: app.fs.data.dirname
        },
        body: {
          path: u.path
        },
        onSuccess: () => {
          app.emitter.emit("vf-toast-push", { label: t("The folder downloaded.") });
        },
        onError: (m) => {
          onError(m);
        }
      });
    });
    function v(u) {
      let m = {};
      u && u.includes("://") && (m = {
        adapter: u.split("://")[0],
        path: u
      }), app.emitter.emit("vf-fetch", {
        params: { q: "index", adapter: app.fs.adapter, ...m },
        onError: l.onError ?? ((h) => {
          h.message && app.emitter.emit("vf-toast-push", {
            label: h.message,
            type: "error"
          });
        })
      });
    }
    return Me(() => {
      v(app.fs.path), Be(
        () => l.path,
        (u) => {
          v(u);
        }
      ), d.onSelect((u) => {
        s("select", u);
      }), Be(
        () => app.fs.data.dirname,
        (u) => {
          s("update:path", u);
        }
      );
    }), (u, m) => (f(), b("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: c,
      tabindex: "0"
    }, [
      a("div", {
        class: de(u.app.theme.actualValue)
      }, [
        a("div", {
          class: de([
            u.app.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          style: un(
            u.app.fullScreen ? "" : "max-height: " + n.maxHeight + ";height: " + n.maxHeight
          ),
          onMousedown: m[0] || (m[0] = (h) => u.app.emitter.emit("vf-contextmenu-hide")),
          onTouchstart: m[1] || (m[1] = (h) => u.app.emitter.emit("vf-contextmenu-hide"))
        }, [
          G(cc),
          G(id),
          a("div", A_, [
            G(S_),
            G(Fu)
          ]),
          G(Gu)
        ], 38),
        G(or, { name: "fade" }, {
          default: ne(() => [
            u.app.modal.visible ? (f(), Z(Us(u.app.modal.type), { key: 0 })) : z("", !0)
          ]),
          _: 1
        }),
        G(Iu)
      ], 2)
    ], 512));
  }
}, I_ = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    let [s] = Object.keys(e.i18n);
    e.locale = e.locale ?? s ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", T_);
  }
};
export {
  C_ as SimpleContextMenuItem,
  E_ as contextMenuItems,
  I_ as default
};
