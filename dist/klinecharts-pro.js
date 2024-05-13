var g5 = Object.defineProperty;
var d5 = (e, t, n) => t in e ? g5(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var P1 = (e, t, n) => (d5(e, typeof t != "symbol" ? t + "" : t, n), n);
import { utils as F, init as h5, FormatDateType as j1, DomPosition as K0, ActionType as y5, dispose as m5, TooltipIconPosition as Z1, registerOverlay as p5 } from "klinecharts";
function O1(e, t, n) {
  const r = (e.x - t.x) * Math.cos(n) - (e.y - t.y) * Math.sin(n) + t.x, a = (e.x - t.x) * Math.sin(n) + (e.y - t.y) * Math.cos(n) + t.y;
  return { x: r, y: a };
}
function h0(e, t) {
  if (e.length > 1) {
    let n;
    return e[0].x === e[1].x && e[0].y !== e[1].y ? e[0].y < e[1].y ? n = {
      x: e[0].x,
      y: t.height
    } : n = {
      x: e[0].x,
      y: 0
    } : e[0].x > e[1].x ? n = {
      x: 0,
      y: F.getLinearYFromCoordinates(e[0], e[1], { x: 0, y: e[0].y })
    } : n = {
      x: t.width,
      y: F.getLinearYFromCoordinates(e[0], e[1], { x: t.width, y: e[0].y })
    }, { coordinates: [e[0], n] };
  }
  return [];
}
function A9(e, t) {
  const n = Math.abs(e.x - t.x), r = Math.abs(e.y - t.y);
  return Math.sqrt(n * n + r * r);
}
const v5 = {
  name: "arrow",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = e[1].x > e[0].x ? 0 : 1, n = F.getLinearSlopeIntercept(e[0], e[1]);
      let r;
      n ? r = Math.atan(n[0]) + Math.PI * t : e[1].y > e[0].y ? r = Math.PI / 2 : r = Math.PI / 2 * 3;
      const a = O1({ x: e[1].x - 8, y: e[1].y + 4 }, e[1], r), i = O1({ x: e[1].x - 8, y: e[1].y - 4 }, e[1], r);
      return [
        {
          type: "line",
          attrs: { coordinates: e }
        },
        {
          type: "line",
          ignoreEvent: !0,
          attrs: { coordinates: [a, e[1], i] }
        }
      ];
    }
    return [];
  }
}, _5 = {
  name: "circle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    circle: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = A9(e[0], e[1]);
      return {
        type: "circle",
        attrs: {
          ...e[0],
          r: t
        },
        styles: { style: "stroke_fill" }
      };
    }
    return [];
  }
}, L5 = {
  name: "rect",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    polygon: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e }) => e.length > 1 ? [
    {
      type: "polygon",
      attrs: {
        coordinates: [
          e[0],
          { x: e[1].x, y: e[0].y },
          e[1],
          { x: e[0].x, y: e[1].y }
        ]
      },
      styles: { style: "stroke_fill" }
    }
  ] : []
}, $5 = {
  name: "parallelogram",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    polygon: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e }) => {
    if (e.length === 2)
      return [
        {
          type: "line",
          ignoreEvent: !0,
          attrs: { coordinates: e }
        }
      ];
    if (e.length === 3) {
      const t = { x: e[0].x + (e[2].x - e[1].x), y: e[2].y };
      return [
        {
          type: "polygon",
          attrs: { coordinates: [e[0], e[1], e[2], t] },
          styles: { style: "stroke_fill" }
        }
      ];
    }
    return [];
  },
  performEventPressedMove: ({ points: e, performPointIndex: t, performPoint: n }) => {
    t < 2 && (e[0].price = n.price, e[1].price = n.price);
  },
  performEventMoveForDrawing: ({ currentStep: e, points: t, performPoint: n }) => {
    e === 2 && (t[0].price = n.price);
  }
}, b5 = {
  name: "triangle",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    polygon: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e }) => [
    {
      type: "polygon",
      attrs: { coordinates: e },
      styles: { style: "stroke_fill" }
    }
  ]
}, x5 = {
  name: "fibonacciCircle",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = Math.abs(e[0].x - e[1].x), n = Math.abs(e[0].y - e[1].y), r = Math.sqrt(t * t + n * n), a = [0.236, 0.382, 0.5, 0.618, 0.786, 1], i = [], o = [];
      return a.forEach((s) => {
        const c = r * s;
        i.push(
          { ...e[0], r: c }
        ), o.push({
          x: e[0].x,
          y: e[0].y + c + 6,
          text: `${(s * 100).toFixed(1)}%`
        });
      }), [
        {
          type: "circle",
          attrs: i,
          styles: { style: "stroke" }
        },
        {
          type: "text",
          ignoreEvent: !0,
          attrs: o
        }
      ];
    }
    return [];
  }
}, k5 = {
  name: "fibonacciSegment",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: n }) => {
    const r = [], a = [];
    if (e.length > 1) {
      const i = e[1].x > e[0].x ? e[0].x : e[1].x, o = [1, 0.786, 0.618, 0.5, 0.382, 0.236, 0], s = e[0].y - e[1].y, c = t.points, f = c[0].value - c[1].value;
      o.forEach((l) => {
        const y = e[1].y + s * l, v = (c[1].value + f * l).toFixed(n.price);
        r.push({ coordinates: [{ x: e[0].x, y }, { x: e[1].x, y }] }), a.push({
          x: i,
          y,
          text: `${v} (${(l * 100).toFixed(1)}%)`,
          baseline: "bottom"
        });
      });
    }
    return [
      {
        type: "line",
        attrs: r
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, A5 = {
  name: "fibonacciSpiral",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    if (e.length > 1) {
      const n = A9(e[0], e[1]) / Math.sqrt(24), r = e[1].x > e[0].x ? 0 : 1, a = F.getLinearSlopeIntercept(e[0], e[1]);
      let i;
      a ? i = Math.atan(a[0]) + Math.PI * r : e[1].y > e[0].y ? i = Math.PI / 2 : i = Math.PI / 2 * 3;
      const o = O1(
        { x: e[0].x - n, y: e[0].y },
        e[0],
        i
      ), s = O1(
        { x: e[0].x - n, y: e[0].y - n },
        e[0],
        i
      ), c = [{
        ...o,
        r: n,
        startAngle: i,
        endAngle: i + Math.PI / 2
      }, {
        ...s,
        r: n * 2,
        startAngle: i + Math.PI / 2,
        endAngle: i + Math.PI
      }];
      let f = e[0].x - n, l = e[0].y - n;
      for (let y = 2; y < 9; y++) {
        const v = c[y - 2].r + c[y - 1].r;
        let b = 0;
        switch (y % 4) {
          case 0: {
            b = i, f -= c[y - 2].r;
            break;
          }
          case 1: {
            b = i + Math.PI / 2, l -= c[y - 2].r;
            break;
          }
          case 2: {
            b = i + Math.PI, f += c[y - 2].r;
            break;
          }
          case 3: {
            b = i + Math.PI / 2 * 3, l += c[y - 2].r;
            break;
          }
        }
        const w = b + Math.PI / 2, B = O1({ x: f, y: l }, e[0], i);
        c.push({
          ...B,
          r: v,
          startAngle: b,
          endAngle: w
        });
      }
      return [
        {
          type: "arc",
          attrs: c
        },
        {
          type: "line",
          attrs: h0(e, t)
        }
      ];
    }
    return [];
  }
}, w5 = {
  name: "fibonacciSpeedResistanceFan",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, bounding: t }) => {
    const n = [];
    let r = [];
    const a = [];
    if (e.length > 1) {
      const i = e[1].x > e[0].x ? -38 : 4, o = e[1].y > e[0].y ? -2 : 20, s = e[1].x - e[0].x, c = e[1].y - e[0].y;
      [1, 0.75, 0.618, 0.5, 0.382, 0.25, 0].forEach((l) => {
        const y = e[1].x - s * l, v = e[1].y - c * l;
        n.push({ coordinates: [{ x: y, y: e[0].y }, { x: y, y: e[1].y }] }), n.push({ coordinates: [{ x: e[0].x, y: v }, { x: e[1].x, y: v }] }), r = r.concat(h0([e[0], { x: y, y: e[1].y }], t)), r = r.concat(h0([e[0], { x: e[1].x, y: v }], t)), a.unshift({
          x: e[0].x + i,
          y: v + 10,
          text: `${l.toFixed(3)}`
        }), a.unshift({
          x: y - 18,
          y: e[0].y + o,
          text: `${l.toFixed(3)}`
        });
      });
    }
    return [
      {
        type: "line",
        attrs: n
      },
      {
        type: "line",
        attrs: r
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, M5 = {
  name: "fibonacciExtension",
  totalStep: 4,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e, overlay: t, precision: n }) => {
    const r = [], a = [];
    if (e.length > 2) {
      const i = t.points, o = i[1].value - i[0].value, s = e[1].y - e[0].y, c = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], f = e[2].x > e[1].x ? e[1].x : e[2].x;
      c.forEach((l) => {
        const y = e[2].y + s * l, v = (i[2].value + o * l).toFixed(n.price);
        r.push({ coordinates: [{ x: e[1].x, y }, { x: e[2].x, y }] }), a.push({
          x: f,
          y,
          text: `${v} (${(l * 100).toFixed(1)}%)`,
          baseline: "bottom"
        });
      });
    }
    return [
      {
        type: "line",
        attrs: { coordinates: e },
        styles: { style: "dashed" }
      },
      {
        type: "line",
        attrs: r
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, S5 = {
  name: "gannBox",
  totalStep: 3,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    polygon: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e }) => {
    if (e.length > 1) {
      const t = (e[1].y - e[0].y) / 4, n = e[1].x - e[0].x, r = [
        { coordinates: [e[0], { x: e[1].x, y: e[1].y - t }] },
        { coordinates: [e[0], { x: e[1].x, y: e[1].y - t * 2 }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y + t }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y + t * 2 }] },
        { coordinates: [{ ...e[0] }, { x: e[0].x + n * 0.236, y: e[1].y }] },
        { coordinates: [{ ...e[0] }, { x: e[0].x + n * 0.5, y: e[1].y }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[0].x + n * 0.236, y: e[0].y }] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[0].x + n * 0.5, y: e[0].y }] }
      ], a = [
        { coordinates: [e[0], e[1]] },
        { coordinates: [{ x: e[0].x, y: e[1].y }, { x: e[1].x, y: e[0].y }] }
      ];
      return [
        {
          type: "line",
          attrs: [
            { coordinates: [e[0], { x: e[1].x, y: e[0].y }] },
            { coordinates: [{ x: e[1].x, y: e[0].y }, e[1]] },
            { coordinates: [e[1], { x: e[0].x, y: e[1].y }] },
            { coordinates: [{ x: e[0].x, y: e[1].y }, e[0]] }
          ]
        },
        {
          type: "polygon",
          ignoreEvent: !0,
          attrs: {
            coordinates: [
              e[0],
              { x: e[1].x, y: e[0].y },
              e[1],
              { x: e[0].x, y: e[1].y }
            ]
          },
          styles: { style: "fill" }
        },
        {
          type: "line",
          attrs: r,
          styles: { style: "dashed" }
        },
        {
          type: "line",
          attrs: a
        }
      ];
    }
    return [];
  }
}, T5 = {
  name: "threeWaves",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((n, r) => ({
      ...n,
      text: `(${r})`,
      baseline: "bottom"
    }));
    return [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: t
      }
    ];
  }
}, I5 = {
  name: "fiveWaves",
  totalStep: 7,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((n, r) => ({
      ...n,
      text: `(${r})`,
      baseline: "bottom"
    }));
    return [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: t
      }
    ];
  }
}, N5 = {
  name: "eightWaves",
  totalStep: 10,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((n, r) => ({
      ...n,
      text: `(${r})`,
      baseline: "bottom"
    }));
    return [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: t
      }
    ];
  }
}, D5 = {
  name: "anyWaves",
  totalStep: Number.MAX_SAFE_INTEGER,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    const t = e.map((n, r) => ({
      ...n,
      text: `(${r})`,
      baseline: "bottom"
    }));
    return [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: t
      }
    ];
  }
}, P5 = {
  name: "abcd",
  totalStep: 5,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  createPointFigures: ({ coordinates: e }) => {
    let t = [], n = [];
    const r = ["A", "B", "C", "D"], a = e.map((i, o) => ({
      ...i,
      baseline: "bottom",
      text: `(${r[o]})`
    }));
    return e.length > 2 && (t = [e[0], e[2]], e.length > 3 && (n = [e[1], e[3]])), [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "line",
        attrs: [{ coordinates: t }, { coordinates: n }],
        styles: { style: "dashed" }
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: a
      }
    ];
  }
}, B5 = {
  name: "xabcd",
  totalStep: 6,
  needDefaultPointFigure: !0,
  needDefaultXAxisFigure: !0,
  needDefaultYAxisFigure: !0,
  styles: {
    polygon: {
      color: "rgba(22, 119, 255, 0.15)"
    }
  },
  createPointFigures: ({ coordinates: e, overlay: t }) => {
    const n = [], r = [], a = ["X", "A", "B", "C", "D"], i = e.map((o, s) => ({
      ...o,
      baseline: "bottom",
      text: `(${a[s]})`
    }));
    return e.length > 2 && (n.push({ coordinates: [e[0], e[2]] }), r.push({ coordinates: [e[0], e[1], e[2]] }), e.length > 3 && (n.push({ coordinates: [e[1], e[3]] }), e.length > 4 && (n.push({ coordinates: [e[2], e[4]] }), r.push({ coordinates: [e[2], e[3], e[4]] })))), [
      {
        type: "line",
        attrs: { coordinates: e }
      },
      {
        type: "line",
        attrs: n,
        styles: { style: "dashed" }
      },
      {
        type: "polygon",
        ignoreEvent: !0,
        attrs: r
      },
      {
        type: "text",
        ignoreEvent: !0,
        attrs: i
      }
    ];
  }
}, O5 = [
  v5,
  _5,
  L5,
  b5,
  $5,
  x5,
  k5,
  A5,
  w5,
  M5,
  S5,
  T5,
  I5,
  N5,
  D5,
  P5,
  B5
];
class du {
  constructor(t) {
    P1(this, "_apiKey");
    P1(this, "_prevSymbolMarket");
    P1(this, "_ws");
    this._apiKey = t;
  }
  async searchSymbols(t) {
    return await ((await (await fetch(`https://api.polygon.io/v3/reference/tickers?apiKey=${this._apiKey}&active=true&search=${t ?? ""}`)).json()).results || []).map((a) => ({
      ticker: a.ticker,
      name: a.name,
      shortName: a.ticker,
      market: a.market,
      exchange: a.primary_exchange,
      priceCurrency: a.currency_name,
      type: a.type,
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAA66SURBVHic7Z17cFTVGcB/527AiKGgRA0ShGhKoQjFMb4qUMCMPIrWqdbHSEdlHDGgI9V2aq2d1hmKtVbRsSTGEcQRp4pStaZQlNYUwYLiSKU0SCMBDRCmoQSJGGF3T/84d2VZk+w9d899hf3NMBnl3ns+5vtyHt/5HoIehpQIaijDYjiSciRlwCCgBCgG+gNFQCGCAvUScaADaAfagFagBdiFoAlBI0m2UkWTEMgA/lmeIYIWIFdkLQNJMBbBJUjOA8agFOwF7cAmBO8hWUeMtWIWezwayxciZwByGb1pZTyCaUguA0YGLNIWBK8jWUExa8Q1HA5YHi0iYQByGTH2UYnkBmA6cHLQMnXBfqAOwXMMYLW4hkTQAmUj1AYgqzkLuAXBTUgGBi2PFoI9SJYAT4nZbA9anK4IpQHIhUzE4i4k04OWxQiCOpI8IubwZtCiZBIqA5A1TEdyH3Bh0LJ4xAYE80QVdUELkiIUBiCf4FIk85FcELQsviB4B8G94jb+GrwoASKfZBgJHkUyNUg5AkOwkhhzxa1sC06EAJALKUJwL3A30DsIGULEYeBhJPPFHNr9Htx3A5A1TECyGCjze+yQ04Rgpqii3s9BfTMAWUsfksxD8iO/xowkggVY3Cdmccif4XxAPskw4rwCjPBjvB5AAwVc6cfewPJ6AFnNzcTZSF75OowgzkZZzc1eD+SZAUiJkNX8FlgM9PVqnB5MX2CxrOa3Uno3U3vyYVlLPxIshR7iyQueOmLMELM4YPrDxg1A1jKQJKuQjDL97eMawWYsJpu+fjZqAPL3DMFiNVBu8rt5vqSRJJXidnaa+qAxA5CPU0aMvwFDTX0zT6fsIMEkcQdNJj5mxADs3/x68sr3ix0kmWBiJsjZAOyQrDXkp32/aSTG+Fz3BDkZgKylH0neym/4AkJtDMflcjpw7QeQEkGCpXnlB4hkFAmW5uIncO8IquFB8uf8MDDd1oUrXFmO7aJc7HbQPJ4wU8zmad2XtA3AvtjZSN69GzYOUkCF7gWSlgHIWvqQyF/shJgGYlToXCXr7QGSzCOv/DAzwtaRYxzPAHYkT+jCmvN0gmCi08giRwZgx/B9QD6MKyo0IRntJMbQ2RKgAjjzyo8OZbbOspJ1BrB3/ZvJR+9GjcMUMCrbqSD7DJDgUfLKjyK9bd11S7czgHyCS0my2pxMIaHvUCgshl5FUFQKQtWJ4FALHGmHz5rhizY43BaomEawqOwuA6mg25cl840L5DexQiithNMvhNMvglMr4IT+zt5t3QS762H332FXfTQNQumwy1zLLmcAO1HzNU+E8oNTK+AbN8KwGc4V3h3JODS9Av98GPauz/17fiK4vKuE1K4NoJr1RDFLd+BY+PYCOK3CuzH2rof3fg07Q5Pkm40NYjYXdfYXnRqAXMhEBH/zVibDFBbDRQ/AiFv8G3PbUlhTpfYNYUcyqbP6BJ2fAizu8lwgkwwcC9c3+Kt8UMvLtZuhZKy/47qhC51+ZQawy7J85LlApjhjAkx7Te3ogyIZhz9PhebQH5jOzixX09kM4POvUQ6cdTVc/kawygewCmDKy2omCjdf0e0xM4BdjeuTSBRk6jtUTb9BKz+djlZ4eRy0bQ1aks4R7GEAg9Orlx07A6hSbOFXPsCkp8OlfFAb0UnaQTn+IRnIPirT/1dBxgM3+CqQW0beptZ+NyTj0LIW9m6A//0L2puP/l1RKXytHAZ9RzmNYoX63z/9IrU53LbUnXxeo3S8KvWfXy4BdgXOFsJbhFFhFcAPP4E+JXrvJeOw+TH44NFjld4VfUrg3Htg5Cx9QzjUAn8YEVbP4X6KKUlVND26BLQynrArH9TGT1f5h1pg+fnw9o+dKT/1zrq58MeL4UCj3nh9StQsFU5OtnUNpBuAYFog4ugy5Lt6z3/RBq9OVH59N7RuUu93tOq9N3KWu/H8IE3XRw1AFV4OP2dO0Xt+4/2578o/a1YePx36DoXiMbmN6xVpurbAzu8Lvup2dgqL1R+nHGmHLU+YGfujl/RnkUGV2Z8JhpG2zu0ZIEHoPRgA9NPMP21eDYkOc+M3LNJ7/rTzzI1tGlvnygAElwQqjFPc7MZNouvq1TVYP7F1rgxAddrIkw3dvYTOcuU3ts4L7B47Id2tZHBwh97zXvwGNr4AfU539uyhvebHN8cYKREiUrd/sUK49XPnzyfj8FyZ87P/8cfZFhbDg5bCMYkOdSRzilUAFz/knTxRx2K4hYxYaZcdmmFY5ddBxa88ESXySMotu69edNi+XP+d838Jlz4bvtvDoJGUWaimitFhz1p3a/qwGXBdg/qZJ8UgC9VRMzokOuDdX7h7t6hUzQTX2fGDbq57exYlQlbzb6KY83/1uyr2PxeOtKtY/w+fUQkgybgJyaJEg5DV7IaIRAGlc8o58P1/mFvXj7SrOP+df4aP/6J/+xdN9ghZzadEtd7PmVNg6mvquGeSZFzNCB8th8bnwxrYYYKDQlZzGOgVtCSuGXELjK8xbwQpEh3KCLbURi8lLDtHhKwhiYcNCXzhzClw2YveH/N218O796ufPQGB7BkGANB/OEx9Wf30mubV8NYd4Q3/dopAWkh6xta3bSssO1clbZqMAeiM0kq45n3lYfRq6fEDSTzam8Cu6FcOYx/XDx9zw+56eON687EH/nDQAv+7VXrOgUaVq/fyOHXO9/J8f8YE+N6b4Q7+6Jr26DqCdOhXDufcrgpGmCgW0RmHWuCVcfoh5MHSIGQ1a4BxQUviC7FCtSycdRUMmW7eGNq2wkvnR6NegOItIatZBvwgaEl8xypQ03f5tcooTio1892ddbDicjPf8p4XC4BdQUsRCMm4Os6lAj1PrYCzr1bLhG7mUTpDpsM3boIPl5iQ0mt2WQgz3aciz383wvp74NnBsOoH7jOJAC5ZAL092muYRNBkIYjUrsVzknHY/hK8eK77490J/WH0XPOymUbQaJEk4u4sD2l8Hl4YBZ+syv5sJqPmhN9JlGSrRRVN9ERfgCk6WmHlldCyTu+9wmL3NQz8oZ0qmiwhkEAOC95xQKIDVl2tf7wbPNkbecywSQikmqME7yFDnB/Yq0jVBXDK5y0qqMMkh1rgg8fgvJ87fyes2cGgdE6qRIxkHXBnkPJ0i27tnb3rzRsAKLeyjgGE2T2sdG7nBsZYG6gw2dD15Zty6mTy3416z+fiT/AaW+cWgN1/dkugAnXHZ816629RqXeJmTqZSeGNOt6S6jmcXiLm9cDEcYLuJcsQj5qanhji32qnpOk6vUTMikCEcYru9DvMg4p3/cr1zvY6s4WfpOn6qAEUswbYH4Q8jtB1xpRWmp8Fvq6ZVfTpDrPjm2G/rWsgzQDsunHhLYD/8V9UxS8dxj1ubiN2UimMuVvvnX2hdK/UpWoEQmapWMFzvovjlCPt+jV6+g5V0Tp9h+Y2dp8SuMJFUeqPXbiQvSZDx8cawABWI9TuMJS8/xv9jJ3+w1VR6dFz3fnmB09RGUi60cZftIWvfLwqFn2MUMcYgLiGBJIlvgqlQ0crvP0T/fd6Fakr2hv3qJ+Dp3R/TDzlHPjmbXDVuzB9pbsZpGGR99HJukiWpFcKh6g2jJhWp18xtDMOtSglpa58+5QcbSeXC+3N6hYxfCllX2kY0XnPoBpeQ+LRQdoAJ5Wq7OCwetpWXB6+hlKCOlHFV2LVOu8ZlOQRzwXKhc+aVf3eMMbiNywKn/KhS51Gu21c/+Fqlx+WmWD7cnjjujDWGeiybVzXvYMF8zwTxxRtW1Usfi7xe6b48JmwKr9bXXbfO7iGDUguMC+RYawCuGAefOtu/8OwjrSrjOF//s7fcZ0ieEdUdT2Td9893GEP+sBJxlVE7/Mj1J29XzS9qnb7YVU+ZNVh1rRwWcMKJFPNSeQDp5yjHD/l15qvGZDoUEbWsCh8jp5MBCtFVfeNQLIbwJMMI85moLcxwfwilQo2eLJq5uQ2ROuLNnUbuX05/CcyJWMOU8AocSvbunvIUWEIWc184GdGxAqSXkWqzWvxGCgcoJw+J2Y4flI3eAd3qq5i+zZFLeEzxQNidvYl3JkBLKQIwQcQsaqixy9NSEaLOdnD/bvfBNqIObQjmJm7XHl8QTDTifLBoQEAiCrqESxwL1UeXxAsEFXUO33csQHYT98HNGiKlMc/GmwdOUa7Oph9KthIT6srFH0OUkBFtl1/JnozAGAPEN4kkuOXO3WVDy4MAEDM5mkg34ojPDxk60Qb1wUi7WZTf4IQxw0cH9RRxRV2kq82rmYAACGQxJiBYLPbb+TJEcFmYsxwq3zIwQAAxCwOYDEZ8lVGAqARi8liFgdy+UhOBgB2XmGSSmBHrt/K45gdJKlM5fflQs4GACBuZycJJpE3Aj/YQYJJ4nZ2mviYEQMAEHfQRJIJ5JcDL2kkyQRxh7nKbsbLxMtaBpJkFZJRpr99XCPYbK/5RhN3jM0AKcQs9mAxjjDnGUaPOizGmVY+eDADpLD9BA8CLlJ58qTxEFX8NJejXnd43ilEVnMz8Bj5uwNdDgJ3uvXwOcWXVjH2BdIr9PSy9OZooIAr3fj2dTG+B+gMcSvbiFGRjydwgGABMf1bPffD+YysYQKSxeTDyzJpQjBTJ5jDBL7MAOmIKuqRjAYegKOVKo5jDgMPIBntt/IhgBkgHfkkw0jwaOTyDkwhWEmMuX5N952LEALkE1yKZH4k0tBMIHgHwb3iNv4avCghQtYwHcl9hD0r2T0bEMwTVeFxkoXKAFLIhUzE4q5QF6nQQVBHkkfEHN4MWpRMQmkAKexyNbcguAkZsRb3gj12vaWnMsuyhIlQG0AKuYwY+6hEcgMqBO3koGXqgv1AHYLnGMDqzIJMYSQSBpCOXEZvWhmPYBqSy4CRAYu0BcHrSFZQzJr0IoxRIHIGkImsZSAJxiK4BMl5wBjAqz7y7cAmu8HGOmKs9eKGzk8ibwCZ2LeQZVgMR1KOpAwYBJQAxUB/lIEUIr5smBEHOlAKbgNagRZgF4ImBI0k2UoVTV7dygXF/wF+fTz59Jc5ygAAAABJRU5ErkJggg=="
    }));
  }
  async getHistoryKLineData(t, n, r, a) {
    return await ((await (await fetch(`https://api.polygon.io/v2/aggs/ticker/${t.ticker}/range/${n.multiplier}/${n.timespan}/${r}/${a}?apiKey=${this._apiKey}`)).json()).results || []).map((s) => ({
      timestamp: s.t,
      open: s.o,
      high: s.h,
      low: s.l,
      close: s.c,
      volume: s.v,
      turnover: s.vw
    }));
  }
  subscribe(t, n, r) {
    var a, i;
    this._prevSymbolMarket !== t.market ? ((a = this._ws) == null || a.close(), this._ws = new WebSocket(`wss://delayed.polygon.io/${t.market}`), this._ws.onopen = () => {
      var o;
      (o = this._ws) == null || o.send(JSON.stringify({ action: "auth", params: this._apiKey }));
    }, this._ws.onmessage = (o) => {
      var c;
      const s = JSON.parse(o.data);
      s[0].ev === "status" ? s[0].status === "auth_success" && ((c = this._ws) == null || c.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` }))) : "sym" in s && r({
        timestamp: s.s,
        open: s.o,
        high: s.h,
        low: s.l,
        close: s.c,
        volume: s.v,
        turnover: s.vw
      });
    }) : (i = this._ws) == null || i.send(JSON.stringify({ action: "subscribe", params: `T.${t.ticker}` })), this._prevSymbolMarket = t.market;
  }
  unsubscribe(t, n) {
  }
}
const H = {};
function E5(e) {
  H.context = e;
}
const F5 = (e, t) => e === t, y0 = Symbol("solid-proxy"), K5 = Symbol("solid-track"), V1 = {
  equals: F5
};
let w9 = N9;
const c1 = 1, H1 = 2, M9 = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
}, C0 = {};
var z = null;
let h1 = null, P = null, V = null, s1 = null, x0 = 0;
function U1(e, t) {
  const n = P, r = z, a = e.length === 0, i = a ? M9 : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? r : t
  }, o = a ? e : () => e(() => o1(() => r0(i)));
  z = i, P = null;
  try {
    return C1(o, !0);
  } finally {
    P = n, z = r;
  }
}
function $(e, t) {
  t = t ? Object.assign({}, V1, t) : V1;
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, r = (a) => (typeof a == "function" && (a = a(n.value)), I9(n, a));
  return [T9.bind(n), r];
}
function j0(e, t, n) {
  const r = n0(e, t, !0, c1);
  _1(r);
}
function R(e, t, n) {
  const r = n0(e, t, !1, c1);
  _1(r);
}
function i1(e, t, n) {
  w9 = U5;
  const r = n0(e, t, !1, c1);
  r.user = !0, s1 ? s1.push(r) : _1(r);
}
function j(e, t, n) {
  n = n ? Object.assign({}, V1, n) : V1;
  const r = n0(e, t, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, _1(r), T9.bind(r);
}
function j5(e, t, n) {
  let r, a, i;
  arguments.length === 2 && typeof t == "object" || arguments.length === 1 ? (r = !0, a = e, i = t || {}) : (r = e, a = t, i = n || {});
  let o = null, s = C0, c = null, f = !1, l = "initialValue" in i, y = typeof r == "function" && j(r);
  const v = /* @__PURE__ */ new Set(), [b, w] = (i.storage || $)(i.initialValue), [B, O] = $(void 0), [N, Q] = $(void 0, {
    equals: !1
  }), [M, S] = $(l ? "ready" : "unresolved");
  if (H.context) {
    c = `${H.context.id}${H.context.count++}`;
    let k;
    i.ssrLoadFrom === "initial" ? s = i.initialValue : H.load && (k = H.load(c)) && (s = k[0]);
  }
  function x(k, K, Z, e1) {
    return o === k && (o = null, l = !0, (k === s || K === s) && i.onHydrated && queueMicrotask(() => i.onHydrated(e1, {
      value: K
    })), s = C0, E(K, Z)), K;
  }
  function E(k, K) {
    C1(() => {
      K === void 0 && w(() => k), S(K !== void 0 ? "errored" : "ready"), O(K);
      for (const Z of v.keys())
        Z.decrement();
      v.clear();
    }, !1);
  }
  function G() {
    const k = Q5, K = b(), Z = B();
    if (Z !== void 0 && !o)
      throw Z;
    return P && !P.user && k && j0(() => {
      N(), o && (k.resolved || v.has(k) || (k.increment(), v.add(k)));
    }), K;
  }
  function l1(k = !0) {
    if (k !== !1 && f)
      return;
    f = !1;
    const K = y ? y() : r;
    if (K == null || K === !1) {
      x(o, o1(b));
      return;
    }
    const Z = s !== C0 ? s : o1(() => a(K, {
      value: b(),
      refetching: k
    }));
    return typeof Z != "object" || !(Z && "then" in Z) ? (x(o, Z, void 0, K), Z) : (o = Z, f = !0, queueMicrotask(() => f = !1), C1(() => {
      S(l ? "refreshing" : "pending"), Q();
    }, !1), Z.then((e1) => x(Z, e1, void 0, K), (e1) => x(Z, void 0, P9(e1), K)));
  }
  return Object.defineProperties(G, {
    state: {
      get: () => M()
    },
    error: {
      get: () => B()
    },
    loading: {
      get() {
        const k = M();
        return k === "pending" || k === "refreshing";
      }
    },
    latest: {
      get() {
        if (!l)
          return G();
        const k = B();
        if (k && !o)
          throw k;
        return b();
      }
    }
  }), y ? j0(() => l1(!1)) : l1(!1), [G, {
    refetch: l1,
    mutate: w
  }];
}
function o1(e) {
  if (P === null)
    return e();
  const t = P;
  P = null;
  try {
    return e();
  } finally {
    P = t;
  }
}
function S9(e) {
  i1(() => o1(e));
}
function k0(e) {
  return z === null || (z.cleanups === null ? z.cleanups = [e] : z.cleanups.push(e)), e;
}
function Z5(e) {
  const t = P, n = z;
  return Promise.resolve().then(() => {
    P = t, z = n;
    let r;
    return C1(e, !1), P = z = null, r ? r.done : void 0;
  });
}
let Q5;
function T9() {
  const e = h1;
  if (this.sources && (this.state || e))
    if (this.state === c1 || e)
      _1(this);
    else {
      const t = V;
      V = null, C1(() => X1(this), !1), V = t;
    }
  if (P) {
    const t = this.observers ? this.observers.length : 0;
    P.sources ? (P.sources.push(this), P.sourceSlots.push(t)) : (P.sources = [this], P.sourceSlots = [t]), this.observers ? (this.observers.push(P), this.observerSlots.push(P.sources.length - 1)) : (this.observers = [P], this.observerSlots = [P.sources.length - 1]);
  }
  return this.value;
}
function I9(e, t, n) {
  let r = e.value;
  return (!e.comparator || !e.comparator(r, t)) && (e.value = t, e.observers && e.observers.length && C1(() => {
    for (let a = 0; a < e.observers.length; a += 1) {
      const i = e.observers[a], o = h1 && h1.running;
      o && h1.disposed.has(i), (o && !i.tState || !o && !i.state) && (i.pure ? V.push(i) : s1.push(i), i.observers && D9(i)), o || (i.state = c1);
    }
    if (V.length > 1e6)
      throw V = [], new Error();
  }, !1)), t;
}
function _1(e) {
  if (!e.fn)
    return;
  r0(e);
  const t = z, n = P, r = x0;
  P = z = e, R5(e, e.value, r), P = n, z = t;
}
function R5(e, t, n) {
  let r;
  try {
    r = e.fn(t);
  } catch (a) {
    e.pure && (e.state = c1, e.owned && e.owned.forEach(r0), e.owned = null), B9(a);
  }
  (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? I9(e, r) : e.value = r, e.updatedAt = n);
}
function n0(e, t, n, r = c1, a) {
  const i = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: z,
    context: null,
    pure: n
  };
  return z === null || z !== M9 && (z.owned ? z.owned.push(i) : z.owned = [i]), i;
}
function G1(e) {
  const t = h1;
  if (e.state === 0 || t)
    return;
  if (e.state === H1 || t)
    return X1(e);
  if (e.suspense && o1(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < x0); )
    (e.state || t) && n.push(e);
  for (let r = n.length - 1; r >= 0; r--)
    if (e = n[r], e.state === c1 || t)
      _1(e);
    else if (e.state === H1 || t) {
      const a = V;
      V = null, C1(() => X1(e, n[0]), !1), V = a;
    }
}
function C1(e, t) {
  if (V)
    return e();
  let n = !1;
  t || (V = []), s1 ? n = !0 : s1 = [], x0++;
  try {
    const r = e();
    return z5(n), r;
  } catch (r) {
    n || (s1 = null), V = null, B9(r);
  }
}
function z5(e) {
  if (V && (N9(V), V = null), e)
    return;
  const t = s1;
  s1 = null, t.length && C1(() => w9(t), !1);
}
function N9(e) {
  for (let t = 0; t < e.length; t++)
    G1(e[t]);
}
function U5(e) {
  let t, n = 0;
  for (t = 0; t < e.length; t++) {
    const r = e[t];
    r.user ? e[n++] = r : G1(r);
  }
  for (H.context && E5(), t = 0; t < n; t++)
    G1(e[t]);
}
function X1(e, t) {
  const n = h1;
  e.state = 0;
  for (let r = 0; r < e.sources.length; r += 1) {
    const a = e.sources[r];
    a.sources && (a.state === c1 || n ? a !== t && G1(a) : (a.state === H1 || n) && X1(a, t));
  }
}
function D9(e) {
  const t = h1;
  for (let n = 0; n < e.observers.length; n += 1) {
    const r = e.observers[n];
    (!r.state || t) && (r.state = H1, r.pure ? V.push(r) : s1.push(r), r.observers && D9(r));
  }
}
function r0(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(), r = e.sourceSlots.pop(), a = n.observers;
      if (a && a.length) {
        const i = a.pop(), o = n.observerSlots.pop();
        r < a.length && (i.sourceSlots[o] = r, a[r] = i, n.observerSlots[r] = o);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      r0(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function P9(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function B9(e) {
  throw e = P9(e), e;
}
const Y5 = Symbol("fallback");
function Z0(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function V5(e, t, n = {}) {
  let r = [], a = [], i = [], o = 0, s = t.length > 1 ? [] : null;
  return k0(() => Z0(i)), () => {
    let c = e() || [], f, l;
    return c[K5], o1(() => {
      let v = c.length, b, w, B, O, N, Q, M, S, x;
      if (v === 0)
        o !== 0 && (Z0(i), i = [], r = [], a = [], o = 0, s && (s = [])), n.fallback && (r = [Y5], a[0] = U1((E) => (i[0] = E, n.fallback())), o = 1);
      else if (o === 0) {
        for (a = new Array(v), l = 0; l < v; l++)
          r[l] = c[l], a[l] = U1(y);
        o = v;
      } else {
        for (B = new Array(v), O = new Array(v), s && (N = new Array(v)), Q = 0, M = Math.min(o, v); Q < M && r[Q] === c[Q]; Q++)
          ;
        for (M = o - 1, S = v - 1; M >= Q && S >= Q && r[M] === c[S]; M--, S--)
          B[S] = a[M], O[S] = i[M], s && (N[S] = s[M]);
        for (b = /* @__PURE__ */ new Map(), w = new Array(S + 1), l = S; l >= Q; l--)
          x = c[l], f = b.get(x), w[l] = f === void 0 ? -1 : f, b.set(x, l);
        for (f = Q; f <= M; f++)
          x = r[f], l = b.get(x), l !== void 0 && l !== -1 ? (B[l] = a[f], O[l] = i[f], s && (N[l] = s[f]), l = w[l], b.set(x, l)) : i[f]();
        for (l = Q; l < v; l++)
          l in B ? (a[l] = B[l], i[l] = O[l], s && (s[l] = N[l], s[l](l))) : a[l] = U1(y);
        a = a.slice(0, o = v), r = c.slice(0);
      }
      return a;
    });
    function y(v) {
      if (i[l] = v, s) {
        const [b, w] = $(l);
        return s[l] = w, t(c[l], b);
      }
      return t(c[l]);
    }
  };
}
function m(e, t) {
  return o1(() => e(t || {}));
}
function Q1() {
  return !0;
}
const H5 = {
  get(e, t, n) {
    return t === y0 ? n : e.get(t);
  },
  has(e, t) {
    return t === y0 ? !0 : e.has(t);
  },
  set: Q1,
  deleteProperty: Q1,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Q1,
      deleteProperty: Q1
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function f0(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function O9(...e) {
  let t = !1;
  for (let r = 0; r < e.length; r++) {
    const a = e[r];
    t = t || !!a && y0 in a, e[r] = typeof a == "function" ? (t = !0, j(a)) : a;
  }
  if (t)
    return new Proxy({
      get(r) {
        for (let a = e.length - 1; a >= 0; a--) {
          const i = f0(e[a])[r];
          if (i !== void 0)
            return i;
        }
      },
      has(r) {
        for (let a = e.length - 1; a >= 0; a--)
          if (r in f0(e[a]))
            return !0;
        return !1;
      },
      keys() {
        const r = [];
        for (let a = 0; a < e.length; a++)
          r.push(...Object.keys(f0(e[a])));
        return [...new Set(r)];
      }
    }, H5);
  const n = {};
  for (let r = e.length - 1; r >= 0; r--)
    if (e[r]) {
      const a = Object.getOwnPropertyDescriptors(e[r]);
      for (const i in a)
        i in n || Object.defineProperty(n, i, {
          enumerable: !0,
          get() {
            for (let o = e.length - 1; o >= 0; o--) {
              const s = (e[o] || {})[i];
              if (s !== void 0)
                return s;
            }
          }
        });
    }
  return n;
}
function G5(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return j(V5(() => e.each, e.children, t || void 0));
}
function Y(e) {
  let t = !1;
  const n = e.keyed, r = j(() => e.when, void 0, {
    equals: (a, i) => t ? a === i : !a == !i
  });
  return j(() => {
    const a = r();
    if (a) {
      const i = e.children, o = typeof i == "function" && i.length > 0;
      return t = n || o, o ? o1(() => i(a)) : i;
    }
    return e.fallback;
  }, void 0, void 0);
}
function X5(e, t, n) {
  let r = n.length, a = t.length, i = r, o = 0, s = 0, c = t[a - 1].nextSibling, f = null;
  for (; o < a || s < i; ) {
    if (t[o] === n[s]) {
      o++, s++;
      continue;
    }
    for (; t[a - 1] === n[i - 1]; )
      a--, i--;
    if (a === o) {
      const l = i < r ? s ? n[s - 1].nextSibling : n[i - s] : c;
      for (; s < i; )
        e.insertBefore(n[s++], l);
    } else if (i === s)
      for (; o < a; )
        (!f || !f.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === n[i - 1] && n[s] === t[a - 1]) {
      const l = t[--a].nextSibling;
      e.insertBefore(n[s++], t[o++].nextSibling), e.insertBefore(n[--i], l), t[a] = n[i];
    } else {
      if (!f) {
        f = /* @__PURE__ */ new Map();
        let y = s;
        for (; y < i; )
          f.set(n[y], y++);
      }
      const l = f.get(t[o]);
      if (l != null)
        if (s < l && l < i) {
          let y = o, v = 1, b;
          for (; ++y < a && y < i && !((b = f.get(t[y])) == null || b !== l + v); )
            v++;
          if (v > l - s) {
            const w = t[o];
            for (; s < l; )
              e.insertBefore(n[s++], w);
          } else
            e.replaceChild(n[s++], t[o++]);
        } else
          o++;
      else
        t[o++].remove();
    }
  }
}
const Q0 = "_$DX_DELEGATE";
function J5(e, t, n, r = {}) {
  let a;
  return U1((i) => {
    a = i, t === document ? e() : p(t, e(), t.firstChild ? null : void 0, n);
  }, r.owner), () => {
    a(), t.textContent = "";
  };
}
function g(e, t, n) {
  const r = document.createElement("template");
  r.innerHTML = e;
  let a = r.content.firstChild;
  return n && (a = a.firstChild), a;
}
function t1(e, t = window.document) {
  const n = t[Q0] || (t[Q0] = /* @__PURE__ */ new Set());
  for (let r = 0, a = e.length; r < a; r++) {
    const i = e[r];
    n.has(i) || (n.add(i), t.addEventListener(i, W5));
  }
}
function X(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function y1(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function u1(e, t, n, r) {
  if (r)
    Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
  else if (Array.isArray(n)) {
    const a = n[0];
    e.addEventListener(t, n[0] = (i) => a.call(e, n[1], i));
  } else
    e.addEventListener(t, n);
}
function L1(e, t, n) {
  if (!t)
    return n ? X(e, "style") : t;
  const r = e.style;
  if (typeof t == "string")
    return r.cssText = t;
  typeof n == "string" && (r.cssText = n = void 0), n || (n = {}), t || (t = {});
  let a, i;
  for (i in n)
    t[i] == null && r.removeProperty(i), delete n[i];
  for (i in t)
    a = t[i], a !== n[i] && (r.setProperty(i, a), n[i] = a);
  return n;
}
function A0(e, t, n) {
  return o1(() => e(t, n));
}
function p(e, t, n, r) {
  if (n !== void 0 && !r && (r = []), typeof t != "function")
    return J1(e, t, r, n);
  R((a) => J1(e, t(), a, n), r);
}
function W5(e) {
  const t = `$$${e.type}`;
  let n = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== n && Object.defineProperty(e, "target", {
    configurable: !0,
    value: n
  }), Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return n || document;
    }
  }), H.registry && !H.done && (H.done = !0, document.querySelectorAll("[id^=pl-]").forEach((r) => {
    for (; r && r.nodeType !== 8 && r.nodeValue !== "pl-" + e; ) {
      let a = r.nextSibling;
      r.remove(), r = a;
    }
    r && r.remove();
  })); n; ) {
    const r = n[t];
    if (r && !n.disabled) {
      const a = n[`${t}Data`];
      if (a !== void 0 ? r.call(n, a, e) : r.call(n, e), e.cancelBubble)
        return;
    }
    n = n._$host || n.parentNode || n.host;
  }
}
function J1(e, t, n, r, a) {
  for (H.context && !n && (n = [...e.childNodes]); typeof n == "function"; )
    n = n();
  if (t === n)
    return n;
  const i = typeof t, o = r !== void 0;
  if (e = o && n[0] && n[0].parentNode || e, i === "string" || i === "number") {
    if (H.context)
      return n;
    if (i === "number" && (t = t.toString()), o) {
      let s = n[0];
      s && s.nodeType === 3 ? s.data = t : s = document.createTextNode(t), n = v1(e, n, r, s);
    } else
      n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t;
  } else if (t == null || i === "boolean") {
    if (H.context)
      return n;
    n = v1(e, n, r);
  } else {
    if (i === "function")
      return R(() => {
        let s = t();
        for (; typeof s == "function"; )
          s = s();
        n = J1(e, s, n, r);
      }), () => n;
    if (Array.isArray(t)) {
      const s = [], c = n && Array.isArray(n);
      if (m0(s, t, n, a))
        return R(() => n = J1(e, s, n, r, !0)), () => n;
      if (H.context) {
        if (!s.length)
          return n;
        for (let f = 0; f < s.length; f++)
          if (s[f].parentNode)
            return n = s;
      }
      if (s.length === 0) {
        if (n = v1(e, n, r), o)
          return n;
      } else
        c ? n.length === 0 ? R0(e, s, r) : X5(e, n, s) : (n && v1(e), R0(e, s));
      n = s;
    } else if (t instanceof Node) {
      if (H.context && t.parentNode)
        return n = o ? [t] : t;
      if (Array.isArray(n)) {
        if (o)
          return n = v1(e, n, r, t);
        v1(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function m0(e, t, n, r) {
  let a = !1;
  for (let i = 0, o = t.length; i < o; i++) {
    let s = t[i], c = n && n[i];
    if (s instanceof Node)
      e.push(s);
    else if (!(s == null || s === !0 || s === !1))
      if (Array.isArray(s))
        a = m0(e, s, c) || a;
      else if (typeof s == "function")
        if (r) {
          for (; typeof s == "function"; )
            s = s();
          a = m0(e, Array.isArray(s) ? s : [s], Array.isArray(c) ? c : [c]) || a;
        } else
          e.push(s), a = !0;
      else {
        const f = String(s);
        c && c.nodeType === 3 && c.data === f ? e.push(c) : e.push(document.createTextNode(f));
      }
  }
  return a;
}
function R0(e, t, n = null) {
  for (let r = 0, a = t.length; r < a; r++)
    e.insertBefore(t[r], n);
}
function v1(e, t, n, r) {
  if (n === void 0)
    return e.textContent = "";
  const a = r || document.createTextNode("");
  if (t.length) {
    let i = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const s = t[o];
      if (a !== s) {
        const c = s.parentNode === e;
        !i && !o ? c ? e.replaceChild(a, s) : e.insertBefore(a, n) : c && s.remove();
      } else
        i = !0;
    }
  } else
    e.insertBefore(a, n);
  return [a];
}
var R1 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function E9(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var q5 = typeof R1 == "object" && R1 && R1.Object === Object && R1, F9 = q5, e6 = F9, t6 = typeof self == "object" && self && self.Object === Object && self, n6 = e6 || t6 || Function("return this")(), n1 = n6, r6 = n1, a6 = r6.Symbol, a0 = a6, z0 = a0, K9 = Object.prototype, i6 = K9.hasOwnProperty, s6 = K9.toString, B1 = z0 ? z0.toStringTag : void 0;
function o6(e) {
  var t = i6.call(e, B1), n = e[B1];
  try {
    e[B1] = void 0;
    var r = !0;
  } catch {
  }
  var a = s6.call(e);
  return r && (t ? e[B1] = n : delete e[B1]), a;
}
var c6 = o6, l6 = Object.prototype, u6 = l6.toString;
function C6(e) {
  return u6.call(e);
}
var f6 = C6, U0 = a0, g6 = c6, d6 = f6, h6 = "[object Null]", y6 = "[object Undefined]", Y0 = U0 ? U0.toStringTag : void 0;
function m6(e) {
  return e == null ? e === void 0 ? y6 : h6 : Y0 && Y0 in Object(e) ? g6(e) : d6(e);
}
var E1 = m6;
function p6(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var $1 = p6, v6 = E1, _6 = $1, L6 = "[object AsyncFunction]", $6 = "[object Function]", b6 = "[object GeneratorFunction]", x6 = "[object Proxy]";
function k6(e) {
  if (!_6(e))
    return !1;
  var t = v6(e);
  return t == $6 || t == b6 || t == L6 || t == x6;
}
var j9 = k6, A6 = n1, w6 = A6["__core-js_shared__"], M6 = w6, g0 = M6, V0 = function() {
  var e = /[^.]+$/.exec(g0 && g0.keys && g0.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function S6(e) {
  return !!V0 && V0 in e;
}
var T6 = S6, I6 = Function.prototype, N6 = I6.toString;
function D6(e) {
  if (e != null) {
    try {
      return N6.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Z9 = D6, P6 = j9, B6 = T6, O6 = $1, E6 = Z9, F6 = /[\\^$.*+?()[\]{}|]/g, K6 = /^\[object .+?Constructor\]$/, j6 = Function.prototype, Z6 = Object.prototype, Q6 = j6.toString, R6 = Z6.hasOwnProperty, z6 = RegExp(
  "^" + Q6.call(R6).replace(F6, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function U6(e) {
  if (!O6(e) || B6(e))
    return !1;
  var t = P6(e) ? z6 : K6;
  return t.test(E6(e));
}
var Y6 = U6;
function V6(e, t) {
  return e == null ? void 0 : e[t];
}
var H6 = V6, G6 = Y6, X6 = H6;
function J6(e, t) {
  var n = X6(e, t);
  return G6(n) ? n : void 0;
}
var m1 = J6, W6 = m1, q6 = function() {
  try {
    var e = W6(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), ee = q6, H0 = ee;
function te(e, t, n) {
  t == "__proto__" && H0 ? H0(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
var Q9 = te;
function ne(e, t) {
  return e === t || e !== e && t !== t;
}
var R9 = ne, re = Q9, ae = R9, ie = Object.prototype, se = ie.hasOwnProperty;
function oe(e, t, n) {
  var r = e[t];
  (!(se.call(e, t) && ae(r, n)) || n === void 0 && !(t in e)) && re(e, t, n);
}
var w0 = oe, ce = Array.isArray, b1 = ce;
function le(e) {
  return e != null && typeof e == "object";
}
var x1 = le, ue = E1, Ce = x1, fe = "[object Symbol]";
function ge(e) {
  return typeof e == "symbol" || Ce(e) && ue(e) == fe;
}
var M0 = ge, de = b1, he = M0, ye = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, me = /^\w*$/;
function pe(e, t) {
  if (de(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || he(e) ? !0 : me.test(e) || !ye.test(e) || t != null && e in Object(t);
}
var ve = pe, _e = m1, Le = _e(Object, "create"), i0 = Le, G0 = i0;
function $e() {
  this.__data__ = G0 ? G0(null) : {}, this.size = 0;
}
var be = $e;
function xe(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var ke = xe, Ae = i0, we = "__lodash_hash_undefined__", Me = Object.prototype, Se = Me.hasOwnProperty;
function Te(e) {
  var t = this.__data__;
  if (Ae) {
    var n = t[e];
    return n === we ? void 0 : n;
  }
  return Se.call(t, e) ? t[e] : void 0;
}
var Ie = Te, Ne = i0, De = Object.prototype, Pe = De.hasOwnProperty;
function Be(e) {
  var t = this.__data__;
  return Ne ? t[e] !== void 0 : Pe.call(t, e);
}
var Oe = Be, Ee = i0, Fe = "__lodash_hash_undefined__";
function Ke(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = Ee && t === void 0 ? Fe : t, this;
}
var je = Ke, Ze = be, Qe = ke, Re = Ie, ze = Oe, Ue = je;
function k1(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
k1.prototype.clear = Ze;
k1.prototype.delete = Qe;
k1.prototype.get = Re;
k1.prototype.has = ze;
k1.prototype.set = Ue;
var Ye = k1;
function Ve() {
  this.__data__ = [], this.size = 0;
}
var He = Ve, Ge = R9;
function Xe(e, t) {
  for (var n = e.length; n--; )
    if (Ge(e[n][0], t))
      return n;
  return -1;
}
var s0 = Xe, Je = s0, We = Array.prototype, qe = We.splice;
function e2(e) {
  var t = this.__data__, n = Je(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : qe.call(t, n, 1), --this.size, !0;
}
var t2 = e2, n2 = s0;
function r2(e) {
  var t = this.__data__, n = n2(t, e);
  return n < 0 ? void 0 : t[n][1];
}
var a2 = r2, i2 = s0;
function s2(e) {
  return i2(this.__data__, e) > -1;
}
var o2 = s2, c2 = s0;
function l2(e, t) {
  var n = this.__data__, r = c2(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
var u2 = l2, C2 = He, f2 = t2, g2 = a2, d2 = o2, h2 = u2;
function A1(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
A1.prototype.clear = C2;
A1.prototype.delete = f2;
A1.prototype.get = g2;
A1.prototype.has = d2;
A1.prototype.set = h2;
var o0 = A1, y2 = m1, m2 = n1, p2 = y2(m2, "Map"), S0 = p2, X0 = Ye, v2 = o0, _2 = S0;
function L2() {
  this.size = 0, this.__data__ = {
    hash: new X0(),
    map: new (_2 || v2)(),
    string: new X0()
  };
}
var $2 = L2;
function b2(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var x2 = b2, k2 = x2;
function A2(e, t) {
  var n = e.__data__;
  return k2(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
var c0 = A2, w2 = c0;
function M2(e) {
  var t = w2(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var S2 = M2, T2 = c0;
function I2(e) {
  return T2(this, e).get(e);
}
var N2 = I2, D2 = c0;
function P2(e) {
  return D2(this, e).has(e);
}
var B2 = P2, O2 = c0;
function E2(e, t) {
  var n = O2(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
var F2 = E2, K2 = $2, j2 = S2, Z2 = N2, Q2 = B2, R2 = F2;
function w1(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
w1.prototype.clear = K2;
w1.prototype.delete = j2;
w1.prototype.get = Z2;
w1.prototype.has = Q2;
w1.prototype.set = R2;
var z9 = w1, U9 = z9, z2 = "Expected a function";
function T0(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(z2);
  var n = function() {
    var r = arguments, a = t ? t.apply(this, r) : r[0], i = n.cache;
    if (i.has(a))
      return i.get(a);
    var o = e.apply(this, r);
    return n.cache = i.set(a, o) || i, o;
  };
  return n.cache = new (T0.Cache || U9)(), n;
}
T0.Cache = U9;
var U2 = T0, Y2 = U2, V2 = 500;
function H2(e) {
  var t = Y2(e, function(r) {
    return n.size === V2 && n.clear(), r;
  }), n = t.cache;
  return t;
}
var G2 = H2, X2 = G2, J2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, W2 = /\\(\\)?/g, q2 = X2(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(J2, function(n, r, a, i) {
    t.push(a ? i.replace(W2, "$1") : r || n);
  }), t;
}), e3 = q2;
function t3(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = Array(r); ++n < r; )
    a[n] = t(e[n], n, e);
  return a;
}
var n3 = t3, J0 = a0, r3 = n3, a3 = b1, i3 = M0, s3 = 1 / 0, W0 = J0 ? J0.prototype : void 0, q0 = W0 ? W0.toString : void 0;
function Y9(e) {
  if (typeof e == "string")
    return e;
  if (a3(e))
    return r3(e, Y9) + "";
  if (i3(e))
    return q0 ? q0.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -s3 ? "-0" : t;
}
var o3 = Y9, c3 = o3;
function l3(e) {
  return e == null ? "" : c3(e);
}
var u3 = l3, C3 = b1, f3 = ve, g3 = e3, d3 = u3;
function h3(e, t) {
  return C3(e) ? e : f3(e, t) ? [e] : g3(d3(e));
}
var y3 = h3, m3 = 9007199254740991, p3 = /^(?:0|[1-9]\d*)$/;
function v3(e, t) {
  var n = typeof e;
  return t = t ?? m3, !!t && (n == "number" || n != "symbol" && p3.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var V9 = v3, _3 = M0, L3 = 1 / 0;
function $3(e) {
  if (typeof e == "string" || _3(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -L3 ? "-0" : t;
}
var b3 = $3, x3 = w0, k3 = y3, A3 = V9, e9 = $1, w3 = b3;
function M3(e, t, n, r) {
  if (!e9(e))
    return e;
  t = k3(t, e);
  for (var a = -1, i = t.length, o = i - 1, s = e; s != null && ++a < i; ) {
    var c = w3(t[a]), f = n;
    if (c === "__proto__" || c === "constructor" || c === "prototype")
      return e;
    if (a != o) {
      var l = s[c];
      f = r ? r(l, c, s) : void 0, f === void 0 && (f = e9(l) ? l : A3(t[a + 1]) ? [] : {});
    }
    x3(s, c, f), s = s[c];
  }
  return e;
}
var S3 = M3, T3 = S3;
function I3(e, t, n) {
  return e == null ? e : T3(e, t, n);
}
var N3 = I3;
const p0 = /* @__PURE__ */ E9(N3);
var D3 = o0;
function P3() {
  this.__data__ = new D3(), this.size = 0;
}
var B3 = P3;
function O3(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
var E3 = O3;
function F3(e) {
  return this.__data__.get(e);
}
var K3 = F3;
function j3(e) {
  return this.__data__.has(e);
}
var Z3 = j3, Q3 = o0, R3 = S0, z3 = z9, U3 = 200;
function Y3(e, t) {
  var n = this.__data__;
  if (n instanceof Q3) {
    var r = n.__data__;
    if (!R3 || r.length < U3 - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new z3(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
var V3 = Y3, H3 = o0, G3 = B3, X3 = E3, J3 = K3, W3 = Z3, q3 = V3;
function M1(e) {
  var t = this.__data__ = new H3(e);
  this.size = t.size;
}
M1.prototype.clear = G3;
M1.prototype.delete = X3;
M1.prototype.get = J3;
M1.prototype.has = W3;
M1.prototype.set = q3;
var e8 = M1;
function t8(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== !1; )
    ;
  return e;
}
var n8 = t8, r8 = w0, a8 = Q9;
function i8(e, t, n, r) {
  var a = !n;
  n || (n = {});
  for (var i = -1, o = t.length; ++i < o; ) {
    var s = t[i], c = r ? r(n[s], e[s], s, n, e) : void 0;
    c === void 0 && (c = e[s]), a ? a8(n, s, c) : r8(n, s, c);
  }
  return n;
}
var l0 = i8;
function s8(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var o8 = s8, c8 = E1, l8 = x1, u8 = "[object Arguments]";
function C8(e) {
  return l8(e) && c8(e) == u8;
}
var f8 = C8, t9 = f8, g8 = x1, H9 = Object.prototype, d8 = H9.hasOwnProperty, h8 = H9.propertyIsEnumerable, y8 = t9(function() {
  return arguments;
}()) ? t9 : function(e) {
  return g8(e) && d8.call(e, "callee") && !h8.call(e, "callee");
}, m8 = y8, W1 = { exports: {} };
function p8() {
  return !1;
}
var v8 = p8;
W1.exports;
(function(e, t) {
  var n = n1, r = v8, a = t && !t.nodeType && t, i = a && !0 && e && !e.nodeType && e, o = i && i.exports === a, s = o ? n.Buffer : void 0, c = s ? s.isBuffer : void 0, f = c || r;
  e.exports = f;
})(W1, W1.exports);
var G9 = W1.exports, _8 = 9007199254740991;
function L8(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= _8;
}
var X9 = L8, $8 = E1, b8 = X9, x8 = x1, k8 = "[object Arguments]", A8 = "[object Array]", w8 = "[object Boolean]", M8 = "[object Date]", S8 = "[object Error]", T8 = "[object Function]", I8 = "[object Map]", N8 = "[object Number]", D8 = "[object Object]", P8 = "[object RegExp]", B8 = "[object Set]", O8 = "[object String]", E8 = "[object WeakMap]", F8 = "[object ArrayBuffer]", K8 = "[object DataView]", j8 = "[object Float32Array]", Z8 = "[object Float64Array]", Q8 = "[object Int8Array]", R8 = "[object Int16Array]", z8 = "[object Int32Array]", U8 = "[object Uint8Array]", Y8 = "[object Uint8ClampedArray]", V8 = "[object Uint16Array]", H8 = "[object Uint32Array]", D = {};
D[j8] = D[Z8] = D[Q8] = D[R8] = D[z8] = D[U8] = D[Y8] = D[V8] = D[H8] = !0;
D[k8] = D[A8] = D[F8] = D[w8] = D[K8] = D[M8] = D[S8] = D[T8] = D[I8] = D[N8] = D[D8] = D[P8] = D[B8] = D[O8] = D[E8] = !1;
function G8(e) {
  return x8(e) && b8(e.length) && !!D[$8(e)];
}
var X8 = G8;
function J8(e) {
  return function(t) {
    return e(t);
  };
}
var I0 = J8, q1 = { exports: {} };
q1.exports;
(function(e, t) {
  var n = F9, r = t && !t.nodeType && t, a = r && !0 && e && !e.nodeType && e, i = a && a.exports === r, o = i && n.process, s = function() {
    try {
      var c = a && a.require && a.require("util").types;
      return c || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  e.exports = s;
})(q1, q1.exports);
var N0 = q1.exports, W8 = X8, q8 = I0, n9 = N0, r9 = n9 && n9.isTypedArray, e7 = r9 ? q8(r9) : W8, t7 = e7, n7 = o8, r7 = m8, a7 = b1, i7 = G9, s7 = V9, o7 = t7, c7 = Object.prototype, l7 = c7.hasOwnProperty;
function u7(e, t) {
  var n = a7(e), r = !n && r7(e), a = !n && !r && i7(e), i = !n && !r && !a && o7(e), o = n || r || a || i, s = o ? n7(e.length, String) : [], c = s.length;
  for (var f in e)
    (t || l7.call(e, f)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (f == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (f == "offset" || f == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (f == "buffer" || f == "byteLength" || f == "byteOffset") || // Skip index properties.
    s7(f, c))) && s.push(f);
  return s;
}
var J9 = u7, C7 = Object.prototype;
function f7(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || C7;
  return e === n;
}
var D0 = f7;
function g7(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var W9 = g7, d7 = W9, h7 = d7(Object.keys, Object), y7 = h7, m7 = D0, p7 = y7, v7 = Object.prototype, _7 = v7.hasOwnProperty;
function L7(e) {
  if (!m7(e))
    return p7(e);
  var t = [];
  for (var n in Object(e))
    _7.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
var $7 = L7, b7 = j9, x7 = X9;
function k7(e) {
  return e != null && x7(e.length) && !b7(e);
}
var q9 = k7, A7 = J9, w7 = $7, M7 = q9;
function S7(e) {
  return M7(e) ? A7(e) : w7(e);
}
var P0 = S7, T7 = l0, I7 = P0;
function N7(e, t) {
  return e && T7(t, I7(t), e);
}
var D7 = N7;
function P7(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var B7 = P7, O7 = $1, E7 = D0, F7 = B7, K7 = Object.prototype, j7 = K7.hasOwnProperty;
function Z7(e) {
  if (!O7(e))
    return F7(e);
  var t = E7(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !j7.call(e, r)) || n.push(r);
  return n;
}
var Q7 = Z7, R7 = J9, z7 = Q7, U7 = q9;
function Y7(e) {
  return U7(e) ? R7(e, !0) : z7(e);
}
var B0 = Y7, V7 = l0, H7 = B0;
function G7(e, t) {
  return e && V7(t, H7(t), e);
}
var X7 = G7, e0 = { exports: {} };
e0.exports;
(function(e, t) {
  var n = n1, r = t && !t.nodeType && t, a = r && !0 && e && !e.nodeType && e, i = a && a.exports === r, o = i ? n.Buffer : void 0, s = o ? o.allocUnsafe : void 0;
  function c(f, l) {
    if (l)
      return f.slice();
    var y = f.length, v = s ? s(y) : new f.constructor(y);
    return f.copy(v), v;
  }
  e.exports = c;
})(e0, e0.exports);
var J7 = e0.exports;
function W7(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var q7 = W7;
function et(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, a = 0, i = []; ++n < r; ) {
    var o = e[n];
    t(o, n, e) && (i[a++] = o);
  }
  return i;
}
var tt = et;
function nt() {
  return [];
}
var e5 = nt, rt = tt, at = e5, it = Object.prototype, st = it.propertyIsEnumerable, a9 = Object.getOwnPropertySymbols, ot = a9 ? function(e) {
  return e == null ? [] : (e = Object(e), rt(a9(e), function(t) {
    return st.call(e, t);
  }));
} : at, O0 = ot, ct = l0, lt = O0;
function ut(e, t) {
  return ct(e, lt(e), t);
}
var Ct = ut;
function ft(e, t) {
  for (var n = -1, r = t.length, a = e.length; ++n < r; )
    e[a + n] = t[n];
  return e;
}
var t5 = ft, gt = W9, dt = gt(Object.getPrototypeOf, Object), n5 = dt, ht = t5, yt = n5, mt = O0, pt = e5, vt = Object.getOwnPropertySymbols, _t = vt ? function(e) {
  for (var t = []; e; )
    ht(t, mt(e)), e = yt(e);
  return t;
} : pt, r5 = _t, Lt = l0, $t = r5;
function bt(e, t) {
  return Lt(e, $t(e), t);
}
var xt = bt, kt = t5, At = b1;
function wt(e, t, n) {
  var r = t(e);
  return At(e) ? r : kt(r, n(e));
}
var a5 = wt, Mt = a5, St = O0, Tt = P0;
function It(e) {
  return Mt(e, Tt, St);
}
var Nt = It, Dt = a5, Pt = r5, Bt = B0;
function Ot(e) {
  return Dt(e, Bt, Pt);
}
var Et = Ot, Ft = m1, Kt = n1, jt = Ft(Kt, "DataView"), Zt = jt, Qt = m1, Rt = n1, zt = Qt(Rt, "Promise"), Ut = zt, Yt = m1, Vt = n1, Ht = Yt(Vt, "Set"), Gt = Ht, Xt = m1, Jt = n1, Wt = Xt(Jt, "WeakMap"), qt = Wt, v0 = Zt, _0 = S0, L0 = Ut, $0 = Gt, b0 = qt, i5 = E1, S1 = Z9, i9 = "[object Map]", e4 = "[object Object]", s9 = "[object Promise]", o9 = "[object Set]", c9 = "[object WeakMap]", l9 = "[object DataView]", t4 = S1(v0), n4 = S1(_0), r4 = S1(L0), a4 = S1($0), i4 = S1(b0), d1 = i5;
(v0 && d1(new v0(new ArrayBuffer(1))) != l9 || _0 && d1(new _0()) != i9 || L0 && d1(L0.resolve()) != s9 || $0 && d1(new $0()) != o9 || b0 && d1(new b0()) != c9) && (d1 = function(e) {
  var t = i5(e), n = t == e4 ? e.constructor : void 0, r = n ? S1(n) : "";
  if (r)
    switch (r) {
      case t4:
        return l9;
      case n4:
        return i9;
      case r4:
        return s9;
      case a4:
        return o9;
      case i4:
        return c9;
    }
  return t;
});
var E0 = d1, s4 = Object.prototype, o4 = s4.hasOwnProperty;
function c4(e) {
  var t = e.length, n = new e.constructor(t);
  return t && typeof e[0] == "string" && o4.call(e, "index") && (n.index = e.index, n.input = e.input), n;
}
var l4 = c4, u4 = n1, C4 = u4.Uint8Array, f4 = C4, u9 = f4;
function g4(e) {
  var t = new e.constructor(e.byteLength);
  return new u9(t).set(new u9(e)), t;
}
var F0 = g4, d4 = F0;
function h4(e, t) {
  var n = t ? d4(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var y4 = h4, m4 = /\w*$/;
function p4(e) {
  var t = new e.constructor(e.source, m4.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var v4 = p4, C9 = a0, f9 = C9 ? C9.prototype : void 0, g9 = f9 ? f9.valueOf : void 0;
function _4(e) {
  return g9 ? Object(g9.call(e)) : {};
}
var L4 = _4, $4 = F0;
function b4(e, t) {
  var n = t ? $4(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var x4 = b4, k4 = F0, A4 = y4, w4 = v4, M4 = L4, S4 = x4, T4 = "[object Boolean]", I4 = "[object Date]", N4 = "[object Map]", D4 = "[object Number]", P4 = "[object RegExp]", B4 = "[object Set]", O4 = "[object String]", E4 = "[object Symbol]", F4 = "[object ArrayBuffer]", K4 = "[object DataView]", j4 = "[object Float32Array]", Z4 = "[object Float64Array]", Q4 = "[object Int8Array]", R4 = "[object Int16Array]", z4 = "[object Int32Array]", U4 = "[object Uint8Array]", Y4 = "[object Uint8ClampedArray]", V4 = "[object Uint16Array]", H4 = "[object Uint32Array]";
function G4(e, t, n) {
  var r = e.constructor;
  switch (t) {
    case F4:
      return k4(e);
    case T4:
    case I4:
      return new r(+e);
    case K4:
      return A4(e, n);
    case j4:
    case Z4:
    case Q4:
    case R4:
    case z4:
    case U4:
    case Y4:
    case V4:
    case H4:
      return S4(e, n);
    case N4:
      return new r();
    case D4:
    case O4:
      return new r(e);
    case P4:
      return w4(e);
    case B4:
      return new r();
    case E4:
      return M4(e);
  }
}
var X4 = G4, J4 = $1, d9 = Object.create, W4 = function() {
  function e() {
  }
  return function(t) {
    if (!J4(t))
      return {};
    if (d9)
      return d9(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}(), q4 = W4, en = q4, tn = n5, nn = D0;
function rn(e) {
  return typeof e.constructor == "function" && !nn(e) ? en(tn(e)) : {};
}
var an = rn, sn = E0, on = x1, cn = "[object Map]";
function ln(e) {
  return on(e) && sn(e) == cn;
}
var un = ln, Cn = un, fn = I0, h9 = N0, y9 = h9 && h9.isMap, gn = y9 ? fn(y9) : Cn, dn = gn, hn = E0, yn = x1, mn = "[object Set]";
function pn(e) {
  return yn(e) && hn(e) == mn;
}
var vn = pn, _n = vn, Ln = I0, m9 = N0, p9 = m9 && m9.isSet, $n = p9 ? Ln(p9) : _n, bn = $n, xn = e8, kn = n8, An = w0, wn = D7, Mn = X7, Sn = J7, Tn = q7, In = Ct, Nn = xt, Dn = Nt, Pn = Et, Bn = E0, On = l4, En = X4, Fn = an, Kn = b1, jn = G9, Zn = dn, Qn = $1, Rn = bn, zn = P0, Un = B0, Yn = 1, Vn = 2, Hn = 4, s5 = "[object Arguments]", Gn = "[object Array]", Xn = "[object Boolean]", Jn = "[object Date]", Wn = "[object Error]", o5 = "[object Function]", qn = "[object GeneratorFunction]", er = "[object Map]", tr = "[object Number]", c5 = "[object Object]", nr = "[object RegExp]", rr = "[object Set]", ar = "[object String]", ir = "[object Symbol]", sr = "[object WeakMap]", or = "[object ArrayBuffer]", cr = "[object DataView]", lr = "[object Float32Array]", ur = "[object Float64Array]", Cr = "[object Int8Array]", fr = "[object Int16Array]", gr = "[object Int32Array]", dr = "[object Uint8Array]", hr = "[object Uint8ClampedArray]", yr = "[object Uint16Array]", mr = "[object Uint32Array]", I = {};
I[s5] = I[Gn] = I[or] = I[cr] = I[Xn] = I[Jn] = I[lr] = I[ur] = I[Cr] = I[fr] = I[gr] = I[er] = I[tr] = I[c5] = I[nr] = I[rr] = I[ar] = I[ir] = I[dr] = I[hr] = I[yr] = I[mr] = !0;
I[Wn] = I[o5] = I[sr] = !1;
function Y1(e, t, n, r, a, i) {
  var o, s = t & Yn, c = t & Vn, f = t & Hn;
  if (n && (o = a ? n(e, r, a, i) : n(e)), o !== void 0)
    return o;
  if (!Qn(e))
    return e;
  var l = Kn(e);
  if (l) {
    if (o = On(e), !s)
      return Tn(e, o);
  } else {
    var y = Bn(e), v = y == o5 || y == qn;
    if (jn(e))
      return Sn(e, s);
    if (y == c5 || y == s5 || v && !a) {
      if (o = c || v ? {} : Fn(e), !s)
        return c ? Nn(e, Mn(o, e)) : In(e, wn(o, e));
    } else {
      if (!I[y])
        return a ? e : {};
      o = En(e, y, s);
    }
  }
  i || (i = new xn());
  var b = i.get(e);
  if (b)
    return b;
  i.set(e, o), Rn(e) ? e.forEach(function(O) {
    o.add(Y1(O, t, n, O, e, i));
  }) : Zn(e) && e.forEach(function(O, N) {
    o.set(N, Y1(O, t, n, N, e, i));
  });
  var w = f ? c ? Pn : Dn : c ? Un : zn, B = l ? void 0 : w(e);
  return kn(B || e, function(O, N) {
    B && (N = O, O = e[N]), An(o, N, Y1(O, t, n, N, e, i));
  }), o;
}
var pr = Y1, vr = pr, _r = 1, Lr = 4;
function $r(e) {
  return vr(e, _r | Lr);
}
var br = $r;
const xr = /* @__PURE__ */ E9(br), kr = /* @__PURE__ */ g("<button></button>"), Ar = (e) => (() => {
  const t = kr.cloneNode(!0);
  return u1(t, "click", e.onClick, !0), p(t, () => e.children), R((n) => {
    const r = e.style, a = `klinecharts-pro-button ${e.type ?? "confirm"} ${e.class ?? ""}`;
    return n._v$ = L1(t, r, n._v$), a !== n._v$2 && y1(t, n._v$2 = a), n;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
t1(["click"]);
const wr = /* @__PURE__ */ g('<svg viewBox="0 0 1024 1024" class="icon"><path d="M810.666667 128H213.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v597.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h597.333334c46.933333 0 85.333333-38.4 85.333333-85.333333V213.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m-353.706667 567.04a42.496 42.496 0 0 1-60.16 0L243.626667 541.866667c-8.106667-8.106667-12.373333-18.773333-12.373334-29.866667s4.693333-22.186667 12.373334-29.866667a42.496 42.496 0 0 1 60.16 0L426.666667 604.586667l293.546666-293.546667a42.496 42.496 0 1 1 60.16 60.16l-323.413333 323.84z"></path></svg>'), Mr = /* @__PURE__ */ g('<svg viewBox="0 0 1024 1024" class="icon"><path d="M245.333333 128h533.333334A117.333333 117.333333 0 0 1 896 245.333333v533.333334A117.333333 117.333333 0 0 1 778.666667 896H245.333333A117.333333 117.333333 0 0 1 128 778.666667V245.333333A117.333333 117.333333 0 0 1 245.333333 128z m0 64c-29.44 0-53.333333 23.893333-53.333333 53.333333v533.333334c0 29.44 23.893333 53.333333 53.333333 53.333333h533.333334c29.44 0 53.333333-23.893333 53.333333-53.333333V245.333333c0-29.44-23.893333-53.333333-53.333333-53.333333H245.333333z"></path></svg>'), Sr = /* @__PURE__ */ g("<div></div>"), Tr = /* @__PURE__ */ g('<span class="label"></span>'), Ir = () => wr.cloneNode(!0), Nr = () => Mr.cloneNode(!0), v9 = (e) => {
  const [t, n] = $(e.checked ?? !1);
  return i1(() => {
    "checked" in e && n(e.checked);
  }), (() => {
    const r = Sr.cloneNode(!0);
    return r.$$click = (a) => {
      const i = !t();
      e.onChange && e.onChange(i), n(i);
    }, p(r, (() => {
      const a = j(() => !!t());
      return () => a() ? m(Ir, {}) : m(Nr, {});
    })(), null), p(r, (() => {
      const a = j(() => !!e.label);
      return () => a() && (() => {
        const i = Tr.cloneNode(!0);
        return p(i, () => e.label), i;
      })();
    })(), null), R((a) => {
      const i = e.style, o = `klinecharts-pro-checkbox ${t() && "checked" || ""} ${e.class || ""}`;
      return a._v$ = L1(r, i, a._v$), o !== a._v$2 && y1(r, a._v$2 = o), a;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), r;
  })();
};
t1(["click"]);
const Dr = /* @__PURE__ */ g('<div class="klinecharts-pro-loading"><i class="circle1"></i><i class="circle2"></i><i class="circle3"></i></div>'), l5 = () => Dr.cloneNode(!0), Pr = /* @__PURE__ */ g('<div class="klinecharts-pro-empty"><svg class="icon" viewBox="0 0 1024 1024"><path d="M855.6 427.2H168.5c-12.7 0-24.4 6.9-30.6 18L4.4 684.7C1.5 689.9 0 695.8 0 701.8v287.1c0 19.4 15.7 35.1 35.1 35.1H989c19.4 0 35.1-15.7 35.1-35.1V701.8c0-6-1.5-11.8-4.4-17.1L886.2 445.2c-6.2-11.1-17.9-18-30.6-18zM673.4 695.6c-16.5 0-30.8 11.5-34.3 27.7-12.7 58.5-64.8 102.3-127.2 102.3s-114.5-43.8-127.2-102.3c-3.5-16.1-17.8-27.7-34.3-27.7H119c-26.4 0-43.3-28-31.1-51.4l81.7-155.8c6.1-11.6 18-18.8 31.1-18.8h622.4c13 0 25 7.2 31.1 18.8l81.7 155.8c12.2 23.4-4.7 51.4-31.1 51.4H673.4zM819.9 209.5c-1-1.8-2.1-3.7-3.2-5.5-9.8-16.6-31.1-22.2-47.8-12.6L648.5 261c-17 9.8-22.7 31.6-12.6 48.4 0.9 1.4 1.7 2.9 2.5 4.4 9.5 17 31.2 22.8 48 13L807 257.3c16.7-9.7 22.4-31 12.9-47.8zM375.4 261.1L255 191.6c-16.7-9.6-38-4-47.8 12.6-1.1 1.8-2.1 3.6-3.2 5.5-9.5 16.8-3.8 38.1 12.9 47.8L337.3 327c16.9 9.7 38.6 4 48-13.1 0.8-1.5 1.7-2.9 2.5-4.4 10.2-16.8 4.5-38.6-12.4-48.4zM512 239.3h2.5c19.5 0.3 35.5-15.5 35.5-35.1v-139c0-19.3-15.6-34.9-34.8-35.1h-6.4C489.6 30.3 474 46 474 65.2v139c0 19.5 15.9 35.4 35.5 35.1h2.5z"></path></svg></div>'), Br = () => Pr.cloneNode(!0), Or = /* @__PURE__ */ g("<ul></ul>"), Er = /* @__PURE__ */ g("<li></li>"), t0 = (e) => (() => {
  const t = Or.cloneNode(!0);
  return p(t, m(Y, {
    get when() {
      return e.loading;
    },
    get children() {
      return m(l5, {});
    }
  }), null), p(t, m(Y, {
    get when() {
      var n;
      return !e.loading && !e.children && !((n = e.dataSource) != null && n.length);
    },
    get children() {
      return m(Br, {});
    }
  }), null), p(t, m(Y, {
    get when() {
      return e.children;
    },
    get children() {
      return e.children;
    }
  }), null), p(t, m(Y, {
    get when() {
      return !e.children;
    },
    get children() {
      var n;
      return (n = e.dataSource) == null ? void 0 : n.map((r) => {
        var a;
        return ((a = e.renderItem) == null ? void 0 : a.call(e, r)) ?? Er.cloneNode(!0);
      });
    }
  }), null), R((n) => {
    const r = e.style, a = `klinecharts-pro-list ${e.class ?? ""}`;
    return n._v$ = L1(t, r, n._v$), a !== n._v$2 && y1(t, n._v$2 = a), n;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})(), Fr = /* @__PURE__ */ g('<div class="klinecharts-pro-modal"><div class="inner"><div class="title-container"><svg class="close-icon" viewBox="0 0 1024 1024"><path d="M934.184927 199.723787 622.457206 511.452531l311.727721 311.703161c14.334473 14.229073 23.069415 33.951253 23.069415 55.743582 0 43.430138-35.178197 78.660524-78.735226 78.660524-21.664416 0-41.361013-8.865925-55.642275-23.069415L511.149121 622.838388 199.420377 934.490384c-14.204513 14.20349-33.901111 23.069415-55.642275 23.069415-43.482327 0-78.737272-35.230386-78.737272-78.660524 0-21.792329 8.864902-41.513486 23.094998-55.743582l311.677579-311.703161L88.135828 199.723787c-14.230096-14.255679-23.094998-33.92567-23.094998-55.642275 0-43.430138 35.254945-78.762855 78.737272-78.762855 21.741163 0 41.437761 8.813736 55.642275 23.069415l311.727721 311.727721L822.876842 88.389096c14.281261-14.255679 33.977859-23.069415 55.642275-23.069415 43.557028 0 78.735226 35.332716 78.735226 78.762855C957.254342 165.798117 948.5194 185.468109 934.184927 199.723787"></path></svg></div><div class="content-container"></div></div></div>'), Kr = /* @__PURE__ */ g('<div class="button-container"></div>'), T1 = (e) => (() => {
  const t = Fr.cloneNode(!0), n = t.firstChild, r = n.firstChild, a = r.firstChild, i = r.nextSibling;
  return p(r, () => e.title, a), u1(a, "click", e.onClose, !0), p(i, () => e.children), p(n, (() => {
    const o = j(() => !!(e.buttons && e.buttons.length > 0));
    return () => o() && (() => {
      const s = Kr.cloneNode(!0);
      return p(s, () => e.buttons.map((c) => m(Ar, O9(c, {
        get children() {
          return c.children;
        }
      })))), s;
    })();
  })(), null), R(() => n.style.setProperty("width", `${e.width ?? 400}px`)), t;
})();
t1(["click"]);
const jr = /* @__PURE__ */ g('<div tabindex="0"><div class="selector-container"><span class="value"></span><i class="arrow"></i></div></div>'), Zr = /* @__PURE__ */ g('<div class="drop-down-container"><ul></ul></div>'), Qr = /* @__PURE__ */ g("<li></li>"), u5 = (e) => {
  const [t, n] = $(!1);
  return (() => {
    const r = jr.cloneNode(!0), a = r.firstChild, i = a.firstChild;
    return r.addEventListener("blur", (o) => {
      n(!1);
    }), r.$$click = (o) => {
      n((s) => !s);
    }, p(i, () => e.value), p(r, (() => {
      const o = j(() => !!(e.dataSource && e.dataSource.length > 0));
      return () => o() && (() => {
        const s = Zr.cloneNode(!0), c = s.firstChild;
        return p(c, () => e.dataSource.map((f) => {
          const y = f[e.valueKey ?? "text"] ?? f;
          return (() => {
            const v = Qr.cloneNode(!0);
            return v.$$click = (b) => {
              var w;
              b.stopPropagation(), e.value !== y && ((w = e.onSelected) == null || w.call(e, f)), n(!1);
            }, p(v, y), v;
          })();
        })), s;
      })();
    })(), null), R((o) => {
      const s = e.style, c = `klinecharts-pro-select ${e.class ?? ""} ${t() ? "klinecharts-pro-select-show" : ""}`;
      return o._v$ = L1(r, s, o._v$), c !== o._v$2 && y1(r, o._v$2 = c), o;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), r;
  })();
};
t1(["click"]);
const Rr = /* @__PURE__ */ g('<span class="prefix"></span>'), zr = /* @__PURE__ */ g('<span class="suffix"></span>'), Ur = /* @__PURE__ */ g('<div><input class="value"></div>'), C5 = (e) => {
  const t = O9({
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER
  }, e);
  let n;
  const [r, a] = $("normal");
  return (() => {
    const i = Ur.cloneNode(!0), o = i.firstChild;
    return i.$$click = () => {
      n == null || n.focus();
    }, p(i, m(Y, {
      get when() {
        return t.prefix;
      },
      get children() {
        const s = Rr.cloneNode(!0);
        return p(s, () => t.prefix), s;
      }
    }), o), o.addEventListener("change", (s) => {
      var f, l;
      const c = s.target.value;
      if ("precision" in t) {
        let y;
        const v = Math.max(0, Math.floor(t.precision));
        v <= 0 ? y = new RegExp(/^[1-9]\d*$/) : y = new RegExp("^\\d+\\.?\\d{0," + v + "}$"), (c === "" || y.test(c) && +c >= t.min && +c <= t.max) && ((f = t.onChange) == null || f.call(t, c === "" ? c : +c));
      } else
        (l = t.onChange) == null || l.call(t, c);
    }), o.addEventListener("blur", () => {
      a("normal");
    }), o.addEventListener("focus", () => {
      a("focus");
    }), A0((s) => {
      n = s;
    }, o), p(i, m(Y, {
      get when() {
        return t.suffix;
      },
      get children() {
        const s = zr.cloneNode(!0);
        return p(s, () => t.suffix), s;
      }
    }), null), R((s) => {
      const c = t.style, f = `klinecharts-pro-input ${t.class ?? ""}`, l = r(), y = t.placeholder ?? "";
      return s._v$ = L1(i, c, s._v$), f !== s._v$2 && y1(i, s._v$2 = f), l !== s._v$3 && X(i, "data-status", s._v$3 = l), y !== s._v$4 && X(o, "placeholder", s._v$4 = y), s;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), R(() => o.value = t.value), i;
  })();
};
t1(["click"]);
const Yr = /* @__PURE__ */ g('<div><i class="thumb"></i></div>'), Vr = (e) => (() => {
  const t = Yr.cloneNode(!0);
  return t.$$click = (n) => {
    e.onChange && e.onChange();
  }, R((n) => {
    const r = e.style, a = `klinecharts-pro-switch ${e.open ? "turn-on" : "turn-off"} ${e.class ?? ""}`;
    return n._v$ = L1(t, r, n._v$), a !== n._v$2 && y1(t, n._v$2 = a), n;
  }, {
    _v$: void 0,
    _v$2: void 0
  }), t;
})();
t1(["click"]);
const Hr = "指标", Gr = "主图指标", Xr = "副图指标", Jr = "设置", Wr = "时区", qr = "截屏", ea = "全屏", ta = "退出全屏", na = "保存", ra = "确定", aa = "取消", ia = "MA(移动平均线)", sa = "EMA(指数平滑移动平均线)", oa = "SMA", ca = "BOLL(布林线)", la = "BBI(多空指数)", ua = "SAR(停损点指向指标)", Ca = "VOL(成交量)", fa = "MACD(指数平滑异同移动平均线)", ga = "KDJ(随机指标)", da = "RSI(相对强弱指标)", ha = "BIAS(乖离率)", ya = "BRAR(情绪指标)", ma = "CCI(顺势指标)", pa = "DMI(动向指标)", va = "CR(能量指标)", _a = "PSY(心理线)", La = "DMA(平行线差指标)", $a = "TRIX(三重指数平滑平均线)", ba = "OBV(能量潮指标)", xa = "VR(成交量变异率)", ka = "WR(威廉指标)", Aa = "MTM(动量指标)", wa = "EMV(简易波动指标)", Ma = "ROC(变动率指标)", Sa = "PVT(价量趋势指标)", Ta = "AO(动量震荡指标)", Ia = "世界统一时间", Na = "(UTC-10) 檀香山", Da = "(UTC-8) 朱诺", Pa = "(UTC-7) 洛杉矶", Ba = "(UTC-5) 芝加哥", Oa = "(UTC-4) 多伦多", Ea = "(UTC-3) 圣保罗", Fa = "(UTC+1) 伦敦", Ka = "(UTC+2) 柏林", ja = "(UTC+3) 巴林", Za = "(UTC+4) 迪拜", Qa = "(UTC+5) 阿什哈巴德", Ra = "(UTC+6) 阿拉木图", za = "(UTC+7) 曼谷", Ua = "(UTC+8) 上海", Ya = "(UTC+9) 东京", Va = "(UTC+10) 悉尼", Ha = "(UTC+12) 诺福克岛", Ga = "水平直线", Xa = "水平射线", Ja = "水平线段", Wa = "垂直直线", qa = "垂直射线", ei = "垂直线段", ti = "直线", ni = "射线", ri = "线段", ai = "箭头", ii = "价格线", si = "价格通道线", oi = "平行直线", ci = "斐波那契回调直线", li = "斐波那契回调线段", ui = "斐波那契圆环", Ci = "斐波那契螺旋", fi = "斐波那契速度阻力扇", gi = "斐波那契趋势扩展", di = "江恩箱", hi = "矩形", yi = "平行四边形", mi = "圆", pi = "三角形", vi = "三浪", _i = "五浪", Li = "八浪", $i = "任意浪", bi = "ABCD形态", xi = "XABCD形态", ki = "弱磁模式", Ai = "强磁模式", wi = "商品搜索", Mi = "商品代码", Si = "参数1", Ti = "参数2", Ii = "参数3", Ni = "参数4", Di = "参数5", Pi = "周期", Bi = "标准差", Oi = "蜡烛图类型", Ei = "全实心", Fi = "全空心", Ki = "涨空心", ji = "跌空心", Zi = "OHLC", Qi = "面积图", Ri = "最新价显示", zi = "最高价显示", Ui = "最低价显示", Yi = "指标最新值显示", Vi = "价格轴类型", Hi = "线性轴", Gi = "百分比轴", Xi = "对数轴", Ji = "倒置坐标", Wi = "网格线显示", qi = "恢复默认", es = {
  indicator: Hr,
  main_indicator: Gr,
  sub_indicator: Xr,
  setting: Jr,
  timezone: Wr,
  screenshot: qr,
  full_screen: ea,
  exit_full_screen: ta,
  save: na,
  confirm: ra,
  cancel: aa,
  ma: ia,
  ema: sa,
  sma: oa,
  boll: ca,
  bbi: la,
  sar: ua,
  vol: Ca,
  macd: fa,
  kdj: ga,
  rsi: da,
  bias: ha,
  brar: ya,
  cci: ma,
  dmi: pa,
  cr: va,
  psy: _a,
  dma: La,
  trix: $a,
  obv: ba,
  vr: xa,
  wr: ka,
  mtm: Aa,
  emv: wa,
  roc: Ma,
  pvt: Sa,
  ao: Ta,
  utc: Ia,
  honolulu: Na,
  juneau: Da,
  los_angeles: Pa,
  chicago: Ba,
  toronto: Oa,
  sao_paulo: Ea,
  london: Fa,
  berlin: Ka,
  bahrain: ja,
  dubai: Za,
  ashkhabad: Qa,
  almaty: Ra,
  bangkok: za,
  shanghai: Ua,
  tokyo: Ya,
  sydney: Va,
  norfolk: Ha,
  horizontal_straight_line: Ga,
  horizontal_ray_line: Xa,
  horizontal_segment: Ja,
  vertical_straight_line: Wa,
  vertical_ray_line: qa,
  vertical_segment: ei,
  straight_line: ti,
  ray_line: ni,
  segment: ri,
  arrow: ai,
  price_line: ii,
  price_channel_line: si,
  parallel_straight_line: oi,
  fibonacci_line: ci,
  fibonacci_segment: li,
  fibonacci_circle: ui,
  fibonacci_spiral: Ci,
  fibonacci_speed_resistance_fan: fi,
  fibonacci_extension: gi,
  gann_box: di,
  rect: hi,
  parallelogram: yi,
  circle: mi,
  triangle: pi,
  three_waves: vi,
  five_waves: _i,
  eight_waves: Li,
  any_waves: $i,
  abcd: bi,
  xabcd: xi,
  weak_magnet: ki,
  strong_magnet: Ai,
  symbol_search: wi,
  symbol_code: Mi,
  params_1: Si,
  params_2: Ti,
  params_3: Ii,
  params_4: Ni,
  params_5: Di,
  period: Pi,
  standard_deviation: Bi,
  candle_type: Oi,
  candle_solid: Ei,
  candle_stroke: Fi,
  candle_up_stroke: Ki,
  candle_down_stroke: ji,
  ohlc: Zi,
  area: Qi,
  last_price_show: Ri,
  high_price_show: zi,
  low_price_show: Ui,
  indicator_last_value_show: Yi,
  price_axis_type: Vi,
  normal: Hi,
  percentage: Gi,
  log: Xi,
  reverse_coordinate: Ji,
  grid_show: Wi,
  restore_default: qi
}, ts = "Indicator", ns = "Main Indicator", rs = "Sub Indicator", as = "Setting", is = "Timezone", ss = "Screenshot", os = "Full Screen", cs = "Exit", ls = "Save", us = "Confirm", Cs = "Cancel", fs = "MA(Moving Average)", gs = "EMA(Exponential Moving Average)", ds = "SMA", hs = "BOLL(Bolinger Bands)", ys = "BBI(Bull And Bearlndex)", ms = "SAR(Stop and Reverse)", ps = "VOL(Volume)", vs = "MACD(Moving Average Convergence / Divergence)", _s = "KDJ(KDJ Index)", Ls = "RSI(Relative Strength Index)", $s = "BIAS(Bias Ratio)", bs = "BRAR(情绪指标)", xs = "CCI(Commodity Channel Index)", ks = "DMI(Directional Movement Index)", As = "CR(能量指标)", ws = "PSY(Psychological Line)", Ms = "DMA(Different of Moving Average)", Ss = "TRIX(Triple Exponentially Smoothed Moving Average)", Ts = "OBV(On Balance Volume)", Is = "VR(Volatility Volume Ratio)", Ns = "WR(Williams %R)", Ds = "MTM(Momentum Index)", Ps = "EMV(Ease of Movement Value)", Bs = "ROC(Price Rate of Change)", Os = "PVT(Price and Volume Trend)", Es = "AO(Awesome Oscillator)", Fs = "UTC", Ks = "(UTC-10) Honolulu", js = "(UTC-8) Juneau", Zs = "(UTC-7) Los Angeles", Qs = "(UTC-5) Chicago", Rs = "(UTC-4) Toronto", zs = "(UTC-3) Sao Paulo", Us = "(UTC+1) London", Ys = "(UTC+2) Berlin", Vs = "(UTC+3) Bahrain", Hs = "(UTC+4) Dubai", Gs = "(UTC+5) Ashkhabad", Xs = "(UTC+6) Almaty", Js = "(UTC+7) Bangkok", Ws = "(UTC+8) Shanghai", qs = "(UTC+9) Tokyo", eo = "(UTC+10) Sydney", to = "(UTC+12) Norfolk", no = "Horizontal Line", ro = "Horizontal Ray", ao = "Horizontal Segment", io = "Vertical Line", so = "Vertical Ray", oo = "Vertical Segment", co = "Trend Line", lo = "Ray", uo = "Segment", Co = "Arrow", fo = "Price Line", go = "Price Channel Line", ho = "Parallel Line", yo = "Fibonacci Line", mo = "Fibonacci Segment", po = "Fibonacci Circle", vo = "Fibonacci Spiral", _o = "Fibonacci Sector", Lo = "Fibonacci Extension", $o = "Gann Box", bo = "Rect", xo = "Parallelogram", ko = "Circle", Ao = "Triangle", wo = "Three Waves", Mo = "Five Waves", So = "Eight Waves", To = "Any Waves", Io = "ABCD Pattern", No = "XABCD Pattern", Do = "Weak Magnet", Po = "Strong Magnet", Bo = "Symbol Search", Oo = "Symbol Code", Eo = "Parameter 1", Fo = "Parameter 2", Ko = "Parameter 3", jo = "Parameter 4", Zo = "Parameter 5", Qo = "Period", Ro = "Standard Deviation", zo = "Candle Type", Uo = "Candle Solid", Yo = "Candle Stroke", Vo = "Candle Up Stroke", Ho = "Candle Down Stroke", Go = "OHLC", Xo = "Area", Jo = "Show Last Price", Wo = "Show Highest Price", qo = "Show Lowest Price", ec = "Show indicator's last value", tc = "Price Axis Type", nc = "Normal", rc = "Percentage", ac = "Log", ic = "Reverse Coordinate", sc = "Show Grids", oc = "Restore Defaults", cc = {
  indicator: ts,
  main_indicator: ns,
  sub_indicator: rs,
  setting: as,
  timezone: is,
  screenshot: ss,
  full_screen: os,
  exit_full_screen: cs,
  save: ls,
  confirm: us,
  cancel: Cs,
  ma: fs,
  ema: gs,
  sma: ds,
  boll: hs,
  bbi: ys,
  sar: ms,
  vol: ps,
  macd: vs,
  kdj: _s,
  rsi: Ls,
  bias: $s,
  brar: bs,
  cci: xs,
  dmi: ks,
  cr: As,
  psy: ws,
  dma: Ms,
  trix: Ss,
  obv: Ts,
  vr: Is,
  wr: Ns,
  mtm: Ds,
  emv: Ps,
  roc: Bs,
  pvt: Os,
  ao: Es,
  utc: Fs,
  honolulu: Ks,
  juneau: js,
  los_angeles: Zs,
  chicago: Qs,
  toronto: Rs,
  sao_paulo: zs,
  london: Us,
  berlin: Ys,
  bahrain: Vs,
  dubai: Hs,
  ashkhabad: Gs,
  almaty: Xs,
  bangkok: Js,
  shanghai: Ws,
  tokyo: qs,
  sydney: eo,
  norfolk: to,
  horizontal_straight_line: no,
  horizontal_ray_line: ro,
  horizontal_segment: ao,
  vertical_straight_line: io,
  vertical_ray_line: so,
  vertical_segment: oo,
  straight_line: co,
  ray_line: lo,
  segment: uo,
  arrow: Co,
  price_line: fo,
  price_channel_line: go,
  parallel_straight_line: ho,
  fibonacci_line: yo,
  fibonacci_segment: mo,
  fibonacci_circle: po,
  fibonacci_spiral: vo,
  fibonacci_speed_resistance_fan: _o,
  fibonacci_extension: Lo,
  gann_box: $o,
  rect: bo,
  parallelogram: xo,
  circle: ko,
  triangle: Ao,
  three_waves: wo,
  five_waves: Mo,
  eight_waves: So,
  any_waves: To,
  abcd: Io,
  xabcd: No,
  weak_magnet: Do,
  strong_magnet: Po,
  symbol_search: Bo,
  symbol_code: Oo,
  params_1: Eo,
  params_2: Fo,
  params_3: Ko,
  params_4: jo,
  params_5: Zo,
  period: Qo,
  standard_deviation: Ro,
  candle_type: zo,
  candle_solid: Uo,
  candle_stroke: Yo,
  candle_up_stroke: Vo,
  candle_down_stroke: Ho,
  ohlc: Go,
  area: Xo,
  last_price_show: Jo,
  high_price_show: Wo,
  low_price_show: qo,
  indicator_last_value_show: ec,
  price_axis_type: tc,
  normal: nc,
  percentage: rc,
  log: ac,
  reverse_coordinate: ic,
  grid_show: sc,
  restore_default: oc
}, f5 = {
  "zh-CN": es,
  "en-US": cc
};
function hu(e, t) {
  f5[e] = t;
}
const u = (e, t) => {
  var n;
  return ((n = f5[t]) == null ? void 0 : n[e]) ?? e;
}, lc = /* @__PURE__ */ g('<img alt="symbol">'), uc = /* @__PURE__ */ g('<div class="symbol"><span></span></div>'), Cc = /* @__PURE__ */ g('<div class="klinecharts-pro-period-bar"><div class="menu-container"><svg viewBox="0 0 1024 1024"><path d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 479.169H438.553c-17.673 0-32 14.327-32 32s14.327 32 32 32h393.608c17.673 0 32-14.327 32-32s-14.327-32-32-32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32zM319.028 351.594l-160 160 160 160z"></path></svg></div><div class="item tools"><svg viewBox="0 0 20 20"><path d="M15.873,20L3.65079,20C1.5873,20,0,18.3871,0,16.2903L0,3.70968C-3.78442e-7,1.6129,1.5873,0,3.65079,0L15.873,0C17.9365,0,19.5238,1.6129,19.5238,3.70968C19.5238,4.35484,19.2063,4.51613,18.5714,4.51613C17.9365,4.51613,17.619,4.19355,17.619,3.70968C17.619,2.74194,16.8254,1.93548,15.873,1.93548L3.65079,1.93548C2.69841,1.93548,1.90476,2.74194,1.90476,3.70968L1.90476,16.2903C1.90476,17.2581,2.69841,18.0645,3.65079,18.0645L15.873,18.0645C16.8254,18.0645,17.619,17.2581,17.619,16.2903C17.619,15.8065,18.0952,15.3226,18.5714,15.3226C19.0476,15.3226,19.5238,15.8065,19.5238,16.2903C19.5238,18.2258,17.9365,20,15.873,20ZM14.9206,12.9032C14.7619,12.9032,14.4444,12.9032,14.2857,12.7419L11.2698,9.35484C10.9524,9.03226,10.9524,8.54839,11.2698,8.22581C11.5873,7.90323,12.0635,7.90323,12.381,8.22581L15.3968,11.6129C15.7143,11.9355,15.7143,12.4194,15.3968,12.7419C15.3968,12.9032,15.2381,12.9032,14.9206,12.9032ZM11.4286,13.2258C11.2698,13.2258,11.1111,13.2258,10.9524,13.0645C10.6349,12.7419,10.6349,12.4194,10.9524,12.0968L15.0794,7.74193C15.3968,7.41935,15.7143,7.41935,16.0317,7.74193C16.3492,8.06452,16.3492,8.3871,16.0317,8.70968L11.9048,13.0645C11.746,13.2258,11.5873,13.2258,11.4286,13.2258ZM10.3175,3.70968C10.6349,3.70968,11.4286,3.87097,11.4286,4.67742C11.4286,5.32258,10.4762,5.16129,10.1587,5.16129C8.73016,5.16129,8.25397,5.96774,8.09524,6.6129L7.77778,8.54839L9.36508,8.54839C9.68254,8.54839,10,8.87097,10,9.19355C10,9.51613,9.68254,9.83871,9.36508,9.83871L7.61905,9.83871L6.50794,14.8387Q6.34921,16.2903,5.39683,16.2903Q4.44444,16.2903,4.92064,14.8387L6.03175,10L4.60317,10C4.28571,10,3.96825,9.67742,3.96825,9.35484C3.96825,8.70968,4.28571,8.54839,4.60317,8.54839L6.34921,8.54839L6.8254,6.45161C7.14286,3.70968,9.52381,3.54839,10.3175,3.70968ZM18.4127,6.6129C18.5714,6.12903,18.8889,5.96774,19.3651,5.96774C19.8413,6.12903,20,6.45161,20,6.93548L18.4127,13.3871C18.254,13.871,17.9365,14.0323,17.4603,14.0323C16.9841,13.871,16.8254,13.5484,16.8254,13.0645L18.4127,6.6129Z"></path></svg><span></span></div><div class="item tools"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M18.5446,9.09091C18.3333,6.61616,17.2887,4.31818,15.5751,2.63889C13.8498,0.94697,11.6197,0,9.28404,0C8.02817,0,6.81925,0.265151,5.66901,0.782828C5.65728,0.782828,5.65728,0.795454,5.64554,0.795454C5.6338,0.795454,5.6338,0.808081,5.62207,0.808081C4.53052,1.31313,3.55634,2.0202,2.71127,2.92929C1.85446,3.85101,1.18545,4.91162,0.715963,6.11111C0.246479,7.33586,0,8.64899,0,10C0,10.8712,0.105634,11.7172,0.305164,12.5379C0.305164,12.5631,0.316901,12.5884,0.328638,12.6136C0.739437,14.2298,1.51408,15.7197,2.62911,16.9571C4.07277,18.548,5.92723,19.5581,7.93427,19.8737C7.95775,19.8737,7.96948,19.8864,7.99296,19.8864C8.3216,19.9369,8.66197,19.9747,9.00235,19.9747L9.21362,19.9747C9.61268,19.9747,10.3756,19.9369,11.0094,19.697C11.1737,19.6338,11.3028,19.5076,11.3732,19.3434C11.4437,19.1793,11.4554,18.9899,11.3967,18.8131C11.3028,18.5354,11.0563,18.346,10.7864,18.346C10.716,18.346,10.6338,18.3586,10.5634,18.3838C10.0939,18.5606,9.46009,18.5859,9.20188,18.5859L9.09624,18.5859C9.20188,18.2702,9.23709,17.9167,9.15493,17.5505C9.00235,16.8939,8.50939,16.3384,7.58216,15.7955L7.19484,15.5682C6.57277,15.2146,6.23239,15.0253,6.03286,14.7348C5.83333,14.4444,5.69249,13.9899,5.51643,12.9798C5.38732,12.298,5.04695,11.7677,4.50704,11.4646C4.14319,11.2626,3.70892,11.149,3.19249,11.149C2.82864,11.149,2.42958,11.1995,2.00704,11.3005C1.79578,11.351,1.59624,11.4141,1.42019,11.4646C1.33803,10.9848,1.30282,10.4798,1.30282,9.97475C1.30282,6.93182,2.76995,4.26768,4.98826,2.72727C5,3.00505,5.05869,3.29545,5.17606,3.57323C5.48122,4.26768,6.10329,4.7096,7.01878,4.89899C7.06573,4.91162,7.10094,4.91162,7.13615,4.91162L7.1831,4.91162C7.26526,4.91162,7.57042,4.92424,7.88732,5.0505C8.3216,5.2399,8.56808,5.55555,8.65023,6.04798C8.84977,7.61364,9.07277,10.4293,8.79108,11.3384C8.76761,11.4141,8.75587,11.4899,8.75587,11.5657C8.75587,11.9444,9.0493,12.2601,9.40141,12.2601C9.57747,12.2601,9.74179,12.1843,9.85915,12.0581C9.97653,11.9318,12.6174,9.05303,13.3216,8.09343C13.4038,7.97979,13.4859,7.87878,13.5798,7.76515C13.9202,7.33586,14.2723,6.90656,14.4014,6.26262C14.554,5.56818,14.4014,4.79798,13.9437,3.85101C13.615,3.16919,13.5563,2.86616,13.5446,2.75252C13.5563,2.7399,13.5798,2.72727,13.6033,2.71464C15.6221,4.10353,17.0188,6.43939,17.2535,9.19192C17.2887,9.55808,17.5587,9.82323,17.8991,9.82323L17.9577,9.82323C18.3099,9.8106,18.5681,9.48232,18.5446,9.09091ZM3.19249,12.5631C3.48592,12.5631,3.72066,12.6136,3.89671,12.7146C4.08451,12.8283,4.19014,12.9924,4.23709,13.2702C4.43662,14.3434,4.61268,15.0631,5,15.6061C5.37559,16.1364,5.85681,16.4015,6.58451,16.8182L6.60798,16.8308C6.71362,16.8939,6.84272,16.9571,6.96009,17.0328C7.69953,17.4621,7.86385,17.7525,7.89906,17.8914C7.93427,18.0303,7.85211,18.2323,7.74648,18.4343C4.91784,17.8535,2.65258,15.6944,1.73709,12.8283C2.15962,12.702,2.71127,12.5631,3.19249,12.5631ZM12.7934,4.5202C13.4272,5.83333,13.1455,6.18687,12.5822,6.89394C12.4883,7.00758,12.3944,7.12121,12.3005,7.24747C11.9484,7.72727,11.0211,8.77525,10.2113,9.68434C10.2113,9.24242,10.1878,8.73737,10.1526,8.19444C10.0704,6.95707,9.92958,5.90909,9.92958,5.87121L9.92958,5.83333C9.75352,4.83586,9.20188,4.11616,8.3216,3.76263C7.82864,3.56061,7.37089,3.53535,7.19484,3.53535C6.73709,3.43434,6.4554,3.24495,6.33803,2.99242C6.19718,2.68939,6.29108,2.24747,6.38498,1.9697C7.28873,1.59091,8.26291,1.37626,9.28404,1.37626C10.3873,1.37626,11.4437,1.61616,12.4061,2.04545C12.3357,2.18434,12.277,2.34848,12.2535,2.5505C12.2066,3.04293,12.3709,3.64899,12.7934,4.5202Z"></path><path d="M15.22299772857666,9.722223632261718C12.59389772857666,9.722223632261718,10.44600772857666,12.020201374511718,10.44600772857666,14.861111374511719C10.44600772857666,17.70202137451172,12.58215772857666,20.000021374511718,15.223007728576661,20.000021374511718C17.86384772857666,20.000021374511718,19.99999772857666,17.70202137451172,19.99999772857666,14.861111374511719C19.99999772857666,12.020201374511718,17.85211772857666,9.72222212709572,15.22299772857666,9.722223632261718ZM15.22299772857666,18.598491374511717C13.30985772857666,18.598491374511717,11.737087728576661,16.91919137451172,11.737087728576661,14.848481374511719C11.737087728576661,12.777781374511719,13.29811772857666,11.098491374511719,15.22299772857666,11.098491374511719C17.14787772857666,11.098491374511719,18.708917728576658,12.777781374511719,18.708917728576658,14.848481374511719C18.708917728576658,16.91919137451172,17.13614772857666,18.59848137451172,15.22299772857666,18.598491374511717Z"></path><path d="M15.692486288146974,15.050496970825195L15.692486288146974,12.676760970825196C15.692486288146974,12.297972970825196,15.399058288146973,11.982316970825195,15.046945288146972,11.982316970825195C14.694833288146972,11.982316970825195,14.401406288146973,12.297972970825196,14.401406288146973,12.676760970825196L14.401406288146973,15.340896970825195C14.401406288146973,15.530296970825194,14.471829288146973,15.694436970825196,14.589200288146973,15.833326970825196L15.751176288146972,17.095956970825195C15.868546288146973,17.222216970825194,16.032866288146973,17.297976970825196,16.208916288146973,17.297976970825196C16.384976288146973,17.297976970825196,16.537556288146973,17.222216970825194,16.666666288146974,17.095956970825195C16.78403628814697,16.969686970825194,16.854456288146974,16.792916970825196,16.854456288146974,16.603526970825193C16.854456288146974,16.414136970825197,16.78403628814697,16.237366970825196,16.666666288146974,16.111106970825197L15.692486288146974,15.050496970825195Z"></path></svg><span></span></div><div class="item tools"><svg viewBox="0 0 20 20"><path d="M19.7361,12.542L18.1916,11.2919C18.2647,10.8678,18.3025,10.4347,18.3025,10.0017C18.3025,9.56861,18.2647,9.13555,18.1916,8.71142L19.7361,7.46135C19.9743,7.26938,20.0615,6.95686,19.9554,6.6756L19.9342,6.61756C19.5074,5.49026,18.8755,4.45449,18.0549,3.53926L18.0124,3.49238C17.8096,3.26692,17.4819,3.1821,17.1848,3.28032L15.2677,3.92544C14.5603,3.3763,13.7704,2.94324,12.9168,2.63966L12.5466,0.742229C12.49,0.449802,12.2472,0.222111,11.9383,0.168536L11.8746,0.157375C10.6461,-0.0524583,9.35391,-0.0524583,8.1254,0.157375L8.06174,0.168536C7.75284,0.222111,7.50997,0.449802,7.45338,0.742229L7.08082,2.64859C6.2343,2.95217,5.44909,3.383,4.74641,3.92991L2.81522,3.28032C2.52047,3.1821,2.19036,3.26469,1.98757,3.49238L1.94513,3.53926C1.12455,4.45672,0.492609,5.49249,0.0658141,6.61756L0.0445921,6.6756C-0.0615171,6.95463,0.0257283,7.26715,0.263885,7.46135L1.82723,8.72482C1.75413,9.14448,1.71876,9.57308,1.71876,9.99944C1.71876,10.428,1.75413,10.8566,1.82723,11.2741L0.263885,12.5375C0.025729,12.7295,-0.0615164,13.042,0.0445929,13.3233L0.0658148,13.3813C0.49261,14.5064,1.12455,15.5444,1.94513,16.4596L1.98757,16.5065C2.19036,16.732,2.51812,16.8168,2.81522,16.7186L4.74641,16.069C5.44909,16.6159,6.2343,17.0489,7.08082,17.3503L7.45338,19.2567C7.50997,19.5491,7.75284,19.7768,8.06174,19.8303L8.1254,19.8415C8.74084,19.9464,9.37042,20,10,20C10.6296,20,11.2615,19.9464,11.8746,19.8415L11.9383,19.8303C12.2472,19.7768,12.49,19.5491,12.5466,19.2567L12.9168,17.3592C13.7704,17.0556,14.5603,16.6248,15.2677,16.0734L17.1848,16.7186C17.4795,16.8168,17.8096,16.7342,18.0124,16.5065L18.0549,16.4596C18.8755,15.5422,19.5074,14.5064,19.9342,13.3813L19.9554,13.3233C20.0615,13.0487,19.9743,12.7362,19.7361,12.542ZM16.5175,8.97483C16.5764,9.3119,16.6071,9.65791,16.6071,10.0039C16.6071,10.3499,16.5764,10.6959,16.5175,11.033L16.3618,11.9281L18.1233,13.3545C17.8568,13.9372,17.5196,14.4863,17.1188,14.9975L14.9305,14.2631L14.1901,14.839C13.6266,15.2765,12.9994,15.6203,12.3203,15.8614L11.4219,16.1806L10.9998,18.3459C10.3372,18.4173,9.66045,18.4173,8.9955,18.3459L8.57342,16.1761L7.6821,15.8524C7.01008,15.6114,6.38521,15.2676,5.82637,14.8323L5.08596,14.2541L2.88361,14.9953C2.48275,14.4841,2.14791,13.9327,1.8791,13.3523L3.65938,11.9125L3.50611,11.0196C3.44952,10.687,3.41887,10.3432,3.41887,10.0039C3.41887,9.66237,3.44716,9.32083,3.50611,8.98822L3.65938,8.09531L1.8791,6.6555C2.14556,6.07288,2.48275,5.52374,2.88361,5.01255L5.08596,5.75367L5.82637,5.17551C6.38521,4.74022,7.01008,4.39645,7.6821,4.15536L8.57578,3.83615L8.99786,1.66638C9.66045,1.59495,10.3372,1.59495,11.0021,1.66638L11.4242,3.83168L12.3226,4.1509C12.9994,4.39198,13.6289,4.73575,14.1925,5.17328L14.9329,5.7492L17.1211,5.01479C17.522,5.52598,17.8568,6.07734,18.1256,6.65773L16.3642,8.08416L16.5175,8.97483ZM10.0024,5.85189C7.7104,5.85189,5.85231,7.61092,5.85231,9.78068C5.85231,11.9504,7.7104,13.7095,10.0024,13.7095C12.2943,13.7095,14.1524,11.9504,14.1524,9.78068C14.1524,7.61092,12.2943,5.85189,10.0024,5.85189ZM11.8699,11.5486C11.37,12.0196,10.7074,12.2808,10.0024,12.2808C9.29732,12.2808,8.63473,12.0196,8.13483,11.5486C7.6373,11.0754,7.36142,10.4481,7.36142,9.78068C7.36142,9.11323,7.6373,8.48596,8.13483,8.01272C8.63473,7.53948,9.29732,7.28054,10.0024,7.28054C10.7074,7.28054,11.37,7.53948,11.8699,8.01272C12.3674,8.48596,12.6433,9.11323,12.6433,9.78068C12.6433,10.4481,12.3674,11.0754,11.8699,11.5486Z"></path></svg><span></span></div><div class="item tools"><svg viewBox="0 0 20 20"><path d="M6.50977,1L13.4902,1C13.6406,1,13.7695,1.1104910000000001,13.7969,1.2631700000000001L14.0273,2.52277C14.1387,3.13147,14.6543,3.57143,15.2559,3.57143L17.5,3.57143C18.8809,3.57143,20,4.72254,20,6.14286L20,16.4286C20,17.8489,18.8809,19,17.5,19L2.5,19C1.11914,19,0,17.8489,0,16.4286L0,6.14286C0,4.72254,1.11914,3.57143,2.5,3.57143L4.74414,3.57143C5.3457,3.57143,5.86133,3.13147,5.97266,2.52277L6.20312,1.2631700000000001C6.23047,1.1104910000000001,6.35937,1,6.50977,1ZM15.2559,4.857139999999999C14.0547,4.857139999999999,13.0215,3.97522,12.7988,2.75982L12.7129,2.28571L7.28711,2.28571L7.20117,2.75982C6.98047,3.97522,5.94727,4.857139999999999,4.74414,4.857139999999999L2.5,4.857139999999999C1.81055,4.857139999999999,1.25,5.43371,1.25,6.14286L1.25,16.4286C1.25,17.1377,1.81055,17.7143,2.5,17.7143L17.5,17.7143C18.1895,17.7143,18.75,17.1377,18.75,16.4286L18.75,6.14286C18.75,5.43371,18.1895,4.857139999999999,17.5,4.857139999999999L15.2559,4.857139999999999ZM4.375,6.78571L3.125,6.78571C2.7793,6.78571,2.5,6.49844,2.5,6.14286C2.5,5.78728,2.7793,5.5,3.125,5.5L4.375,5.5C4.7207,5.5,5,5.78728,5,6.14286C5,6.49844,4.7207,6.78571,4.375,6.78571ZM10,6.14286C7.06641,6.14286,4.6875,8.58973,4.6875,11.6071C4.6875,14.6246,7.06641,17.0714,10,17.0714C12.9336,17.0714,15.3125,14.6246,15.3125,11.6071C15.3125,8.58973,12.9336,6.14286,10,6.14286ZM10,7.42857C11.0859,7.42857,12.1055,7.8625,12.873,8.65201C13.6406,9.44152,14.0625,10.49018,14.0625,11.6071C14.0625,12.7241,13.6406,13.7728,12.873,14.5623C12.1055,15.3518,11.0859,15.7857,10,15.7857C8.91406,15.7857,7.89453,15.3518,7.12695,14.5623C6.35937,13.7728,5.9375,12.7241,5.9375,11.6071C5.9375,10.49018,6.35938,9.44152,7.12695,8.65201C7.89453,7.8625,8.91406,7.42857,10,7.42857ZM10,9.67857C8.96484,9.67857,8.125,10.54241,8.125,11.6071C8.125,12.6719,8.96484,13.5357,10,13.5357C11.0352,13.5357,11.875,12.6719,11.875,11.6071C11.875,10.54241,11.0352,9.67857,10,9.67857ZM10,10.96429C10.3438,10.96429,10.625,11.2536,10.625,11.6071C10.625,11.9607,10.3438,12.25,10,12.25C9.65625,12.25,9.375,11.9607,9.375,11.6071C9.375,11.2536,9.65625,10.96429,10,10.96429Z"></path></svg><span></span></div><div class="item tools"></div></div>'), d0 = /* @__PURE__ */ g("<span></span>"), fc = /* @__PURE__ */ g('<svg viewBox="0 0 20 20"><path d="M1.08108,0L0,1.079L4.18919,5.27938L2.54826,6.91715L6.9112,6.91715L6.9112,2.56262L5.28957,4.18112L1.08108,0ZM15.8108,5.27938L20,1.079L18.9189,0L14.7104,4.18112L13.0888,2.56262L13.0888,6.91715L17.4517,6.91715L15.8108,5.27938ZM4.16988,14.7014L0.07722,18.8054L1.1583,20L5.27027,15.7996L6.9112,17.4374L6.9112,13.0829L2.54826,13.0829L4.16988,14.7014ZM17.4517,13.0829L13.0888,13.0829L13.0888,17.4374L14.7297,15.7996L18.8417,20L19.9228,18.8054L15.8301,14.7013L17.4517,13.0829Z"></path></svg>'), gc = /* @__PURE__ */ g('<svg viewBox="0 0 20 20"><path d="M2.93444,1.76899L7.57544,6.40999L6.38918,7.59626L1.76899,2.93444L0,4.70343L0,0L4.70343,0L2.93444,1.76899ZM6.40999,12.4037L1.76899,17.0447L0,15.2758L0,19.9792L4.70343,19.9792L2.93444,18.2102L7.57544,13.5692L6.40999,12.4037ZM15.2758,0L17.0447,1.76899L12.4037,6.40999L13.59,7.59626L18.231,2.95526L20,4.72425L20,0L15.2758,0ZM13.5692,12.4037L12.3829,13.59L17.0239,18.231L15.2549,20L19.9792,20L19.9792,15.2758L18.2102,17.0447L13.5692,12.4037Z"></path></svg>'), dc = (e) => {
  let t;
  const [n, r] = $(!1), a = () => {
    r((i) => !i);
  };
  return S9(() => {
    document.addEventListener("fullscreenchange", a), document.addEventListener("mozfullscreenchange", a), document.addEventListener("webkitfullscreenchange", a), document.addEventListener("msfullscreenchange", a);
  }), k0(() => {
    document.removeEventListener("fullscreenchange", a), document.removeEventListener("mozfullscreenchange", a), document.removeEventListener("webkitfullscreenchange", a), document.removeEventListener("msfullscreenchange", a);
  }), (() => {
    const i = Cc.cloneNode(!0), o = i.firstChild, s = o.firstChild, c = o.nextSibling, f = c.firstChild, l = f.nextSibling, y = c.nextSibling, v = y.firstChild, b = v.nextSibling, w = y.nextSibling, B = w.firstChild, O = B.nextSibling, N = w.nextSibling, Q = N.firstChild, M = Q.nextSibling, S = N.nextSibling;
    return A0((x) => {
      t = x;
    }, i), u1(s, "click", e.onMenuClick, !0), p(i, m(Y, {
      get when() {
        return e.symbol;
      },
      get children() {
        const x = uc.cloneNode(!0), E = x.firstChild;
        return u1(x, "click", e.onSymbolClick, !0), p(x, m(Y, {
          get when() {
            return e.symbol.logo;
          },
          get children() {
            const G = lc.cloneNode(!0);
            return R(() => X(G, "src", e.symbol.logo)), G;
          }
        }), E), p(E, () => e.symbol.shortName ?? e.symbol.name ?? e.symbol.ticker), x;
      }
    }), c), p(i, () => e.periods.map((x) => (() => {
      const E = d0.cloneNode(!0);
      return E.$$click = () => {
        e.onPeriodChange(x);
      }, p(E, () => x.text), R(() => y1(E, `item period ${x.text === e.period.text ? "selected" : ""}`)), E;
    })()), c), u1(c, "click", e.onIndicatorClick, !0), p(l, () => u("indicator", e.locale)), u1(y, "click", e.onTimezoneClick, !0), p(b, () => u("timezone", e.locale)), u1(w, "click", e.onSettingClick, !0), p(O, () => u("setting", e.locale)), u1(N, "click", e.onScreenshotClick, !0), p(M, () => u("screenshot", e.locale)), S.$$click = () => {
      if (n())
        (document.exitFullscreen ?? document.msExitFullscreen ?? document.mozCancelFullScreen ?? document.webkitExitFullscreen).call(document);
      else {
        const x = t == null ? void 0 : t.parentElement;
        x && (x.requestFullscreen ?? x.webkitRequestFullscreen ?? x.mozRequestFullScreen ?? x.msRequestFullscreen).call(x);
      }
    }, p(S, (() => {
      const x = j(() => !!n());
      return () => x() ? [fc.cloneNode(!0), (() => {
        const E = d0.cloneNode(!0);
        return p(E, () => u("exit_full_screen", e.locale)), E;
      })()] : [gc.cloneNode(!0), (() => {
        const E = d0.cloneNode(!0);
        return p(E, () => u("full_screen", e.locale)), E;
      })()];
    })()), R(() => X(s, "class", e.spread ? "" : "rotate")), i;
  })();
};
t1(["click"]);
const hc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M12.41465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L12.41465,12C12.20873,12.5826,11.65311,13,11,13C10.34689,13,9.79127,12.5826,9.58535,12L3.5,12C3.223857,12,3,11.77614,3,11.5C3,11.22386,3.223857,11,3.5,11L9.58535,11C9.79127,10.417404,10.34689,10,11,10C11.65311,10,12.20873,10.417404,12.41465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), yc = () => hc.cloneNode(!0), mc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,11L11.08535,11C11.29127,10.417404,11.84689,10,12.5,10C13.15311,10,13.70873,10.417404,13.91465,11L18.5,11C18.7761,11,19,11.22386,19,11.5C19,11.77614,18.7761,12,18.5,12L13.91465,12C13.70873,12.5826,13.15311,13,12.5,13C11.84689,13,11.29127,12.5826,11.08535,12L6.91465,12C6.70873,12.5826,6.15311,13,5.5,13C4.671573,13,4,12.32843,4,11.5C4,10.671573,4.671573,10,5.5,10C6.15311,10,6.70873,10.417404,6.91465,11Z" stroke-opacity="0" stroke="none"></path></svg>'), pc = () => mc.cloneNode(!0), vc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,12.5C6.70873,13.0826,6.15311,13.5,5.5,13.5C4.671573,13.5,4,12.82843,4,12C4,11.171573,4.671573,10.5,5.5,10.5C6.15311,10.5,6.70873,10.917404,6.91465,11.5L16.0853,11.5C16.2913,10.917404,16.846899999999998,10.5,17.5,10.5C18.328400000000002,10.5,19,11.171573,19,12C19,12.82843,18.328400000000002,13.5,17.5,13.5C16.846899999999998,13.5,16.2913,13.0826,16.0853,12.5L6.91465,12.5Z" stroke-opacity="0" stroke="none"></path></svg>'), _c = () => vc.cloneNode(!0), Lc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,12.41465L11,18.5C11,18.7761,11.22386,19,11.5,19C11.77614,19,12,18.7761,12,18.5L12,12.41465C12.5826,12.20873,13,11.65311,13,11C13,10.34689,12.5826,9.79127,12,9.58535L12,3.5C12,3.223857,11.77614,3,11.5,3C11.22386,3,11,3.223857,11,3.5L11,9.58535C10.417404,9.79127,10,10.34689,10,11C10,11.65311,10.417404,12.20873,11,12.41465Z" stroke-opacity="0" stroke="none"></path></svg>'), $c = () => Lc.cloneNode(!0), bc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.66558837890625,19C10.83716137890625,19,10.16558837890625,18.328400000000002,10.16558837890625,17.5C10.16558837890625,16.846899999999998,10.58298437890625,16.2913,11.16557337890625,16.0854L11.16557337890625,11.91464C10.58298437890625,11.70872,10.16558837890625,11.1531,10.16558837890625,10.5C10.16558837890625,9.8469,10.58298437890625,9.29128,11.16557337890625,9.08536L11.16557337890625,4.5C11.16557337890625,4.223857,11.38942837890625,4,11.66556837890625,4C11.94171837890625,4,12.16556837890625,4.223857,12.16556837890625,4.5L12.16556837890625,9.08535C12.74817837890625,9.291260000000001,13.16558837890625,9.846879999999999,13.16558837890625,10.5C13.16558837890625,11.153120000000001,12.74817837890625,11.708739999999999,12.16556837890625,11.91465L12.16556837890625,16.0854C12.74817837890625,16.2913,13.16558837890625,16.846899999999998,13.16558837890625,17.5C13.16558837890625,18.328400000000002,12.49401837890625,19,11.66558837890625,19Z" stroke-opacity="0" stroke="none"></path></svg>'), xc = () => bc.cloneNode(!0), kc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.165603637695312,6.91465C11.748203637695312,6.70873,12.165603637695312,6.15311,12.165603637695312,5.5C12.165603637695312,4.671573,11.494033637695313,4,10.665603637695312,4C9.837176637695313,4,9.165603637695312,4.671573,9.165603637695312,5.5C9.165603637695312,6.15311,9.583007637695312,6.70873,10.165603637695312,6.91465L10.165603637695312,16.0854C9.583007637695312,16.2913,9.165603637695312,16.846899999999998,9.165603637695312,17.5C9.165603637695312,18.328400000000002,9.837176637695313,19,10.665603637695312,19C11.494033637695313,19,12.165603637695312,18.328400000000002,12.165603637695312,17.5C12.165603637695312,16.846899999999998,11.748203637695312,16.2913,11.165603637695312,16.0854L11.165603637695312,6.91465Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Ac = () => kc.cloneNode(!0), wc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.146447,15.753C4.9511845,15.9483,4.9511845,16.2649,5.146447,16.4602C5.341709,16.6554,5.658291,16.6554,5.853554,16.4602L8.156600000000001,14.15711C8.352409999999999,14.25082,8.57173,14.3033,8.8033,14.3033C9.631730000000001,14.3033,10.3033,13.63172,10.3033,12.80329C10.3033,12.57172,10.250820000000001,12.352409999999999,10.157119999999999,12.15659L12.156600000000001,10.15711C12.352409999999999,10.250820000000001,12.571729999999999,10.30329,12.8033,10.30329C13.63173,10.30329,14.3033,9.63172,14.3033,8.80329C14.3033,8.57172,14.25082,8.352409999999999,14.15712,8.15659L16.4602,5.853553C16.6554,5.658291,16.6554,5.341709,16.4602,5.146447C16.2649,4.9511843,15.9483,4.9511843,15.753,5.146447L13.45001,7.449479999999999C13.25419,7.35577,13.03487,7.3032900000000005,12.8033,7.3032900000000005C11.97487,7.3032900000000005,11.3033,7.97487,11.3033,8.80329C11.3033,9.03487,11.35578,9.254190000000001,11.44949,9.450009999999999L9.450009999999999,11.449480000000001C9.254190000000001,11.35577,9.03487,11.30329,8.8033,11.30329C7.97487,11.30329,7.3033,11.97487,7.3033,12.80329C7.3033,13.03487,7.35578,13.25419,7.44949,13.45001L5.146447,15.753Z" stroke-opacity="0" stroke="none"></path></svg>'), Mc = () => wc.cloneNode(!0), Sc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M7.573332939453125,14.54567903564453C7.667042939453125,14.741499035644532,7.719512939453125,14.960809035644532,7.719512939453125,15.19239903564453C7.719512939453125,16.02079903564453,7.047942939453125,16.69239903564453,6.219512939453125,16.69239903564453C5.391085939453125,16.69239903564453,4.719512939453125,16.02079903564453,4.719512939453125,15.19239903564453C4.719512939453125,14.36394903564453,5.391085939453125,13.692379035644532,6.219512939453125,13.692379035644532C6.451092939453125,13.692379035644532,6.670412939453125,13.74485903564453,6.866232939453125,13.83856903564453L9.865702939453126,10.83909903564453C9.771992939453124,10.643279035644532,9.719512939453125,10.42395903564453,9.719512939453125,10.192379035644532C9.719512939453125,9.36394903564453,10.391082939453124,8.692379035644532,11.219512939453125,8.692379035644532C11.451092939453126,8.692379035644532,11.670412939453126,8.74485903564453,11.866232939453125,8.838569035644532L15.462112939453124,5.242645035644531C15.657412939453126,5.047383335644532,15.974012939453125,5.047383335644532,16.169212939453125,5.242645035644531C16.364512939453125,5.437907035644531,16.364512939453125,5.754489035644531,16.169212939453125,5.949752035644531L12.573332939453124,9.545679035644532C12.667042939453125,9.74149903564453,12.719512939453125,9.96080903564453,12.719512939453125,10.192379035644532C12.719512939453125,11.020809035644533,12.047942939453126,11.692379035644532,11.219512939453125,11.692379035644532C10.987942939453125,11.692379035644532,10.768632939453125,11.639909035644532,10.572812939453126,11.54619903564453L7.573332939453125,14.54567903564453Z" stroke-opacity="0" stroke="none"></path></svg>'), Tc = () => Sc.cloneNode(!0), Ic = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M15.719512939453125,8.461776733398438C16.547912939453127,8.461776733398438,17.219512939453125,7.7902067333984375,17.219512939453125,6.9617767333984375C17.219512939453125,6.133349733398438,16.547912939453127,5.4617767333984375,15.719512939453125,5.4617767333984375C14.891082939453124,5.4617767333984375,14.219512939453125,6.133349733398438,14.219512939453125,6.9617767333984375C14.219512939453125,7.193346733398437,14.271992939453124,7.412666733398438,14.365692939453124,7.608486733398438L7.366222939453126,14.607956733398437C7.170402939453125,14.514256733398437,6.951082939453125,14.461776733398438,6.719512939453125,14.461776733398438C5.891085939453125,14.461776733398438,5.219512939453125,15.133346733398437,5.219512939453125,15.961776733398438C5.219512939453125,16.79017673339844,5.891085939453125,17.461776733398438,6.719512939453125,17.461776733398438C7.547942939453125,17.461776733398438,8.219512939453125,16.79017673339844,8.219512939453125,15.961776733398438C8.219512939453125,15.730176733398437,8.167032939453126,15.510876733398437,8.073322939453124,15.315066733398437L15.072802939453124,8.315586733398437C15.268612939453124,8.409296733398438,15.487912939453125,8.461776733398438,15.719512939453125,8.461776733398438Z" stroke-opacity="0" stroke="none"></path></svg>'), Nc = () => Ic.cloneNode(!0), Dc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17.0643,7.033864912109375L18,3.585784912109375L14.5078,4.509695912109375L15.3537,5.344934912109375L6.02026,14.560584912109375C5.87635,14.517484912109374,5.72366,14.494284912109375,5.5655,14.494284912109375C4.7009,14.494284912109375,4,15.186384912109375,4,16.040084912109375C4,16.893784912109375,4.7009,17.585784912109375,5.5655,17.585784912109375C6.43011,17.585784912109375,7.13101,16.893784912109375,7.13101,16.040084912109375C7.13101,15.722284912109375,7.03392,15.426984912109376,6.86744,15.181384912109374L16.0917,6.073604912109375L17.0643,7.033864912109375Z" stroke-opacity="0" stroke="none"></path></svg>'), Pc = () => Dc.cloneNode(!0), Bc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M6.91465,13.00505L18.5,13.00505C18.7761,13.00505,19,13.228909999999999,19,13.50505C19,13.781189999999999,18.7761,14.00505,18.5,14.00505L6.91465,14.00505C6.70873,14.58765,6.15311,15.00505,5.5,15.00505C4.671573,15.00505,4,14.33348,4,13.50505C4,12.67662,4.671573,12.00505,5.5,12.00505C6.15311,12.00505,6.70873,12.422450000000001,6.91465,13.00505ZM7.81404,11.625L10.48591,11.625L10.48591,10.90625L9.65193,10.90625L9.65193,7.125L8.997630000000001,7.125C8.71443,7.306641,8.415600000000001,7.419922,7.96443,7.498047L7.96443,8.05078L8.77497,8.05078L8.77497,10.90625L7.81404,10.90625L7.81404,11.625ZM11.081620000000001,11.625L14.0562,11.625L14.0562,10.88281L13.09724,10.88281C12.8863,10.88281,12.59333,10.90625,12.36482,10.93555C13.17537,10.11328,13.84724,9.2207,13.84724,8.39062C13.84724,7.541016,13.28865,7,12.4488,7C11.84333,7,11.446850000000001,7.234375,11.03279,7.679688L11.52497,8.16797C11.747630000000001,7.914062,12.0113,7.697266,12.33552,7.697266C12.7613,7.697266,13.00154,7.982422,13.00154,8.43359C13.00154,9.14648,12.29255,10.00781,11.081620000000001,11.11523L11.081620000000001,11.625ZM15.9605,11.75C16.8121,11.75,17.526899999999998,11.2832,17.526899999999998,10.4375C17.526899999999998,9.82031,17.142200000000003,9.43945,16.6441,9.30078L16.6441,9.27148C17.1129,9.08594,17.3824,8.7207,17.3824,8.21289C17.3824,7.421875,16.8004,7,15.9429,7C15.4215,7,14.9957,7.210938,14.6109,7.541016L15.066,8.11133C15.3258,7.849609,15.5836,7.697266,15.9019,7.697266C16.2789,7.697266,16.4957,7.914062,16.4957,8.28125C16.4957,8.70898,16.2301,9,15.4215,9L15.4215,9.63672C16.3804,9.63672,16.6383,9.91992,16.6383,10.38086C16.6383,10.79688,16.3336,11.03125,15.8824,11.03125C15.4742,11.03125,15.1578,10.82227,14.8922,10.55078L14.4781,11.13281C14.7906,11.486329999999999,15.2652,11.75,15.9605,11.75Z" stroke-opacity="0" stroke="none"></path></svg>'), Oc = () => Bc.cloneNode(!0), Ec = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.146447,14.178126025390625C2.9511847,13.982826025390626,2.9511847,13.666226025390625,3.146447,13.470926025390625L7.39146,9.225966025390626C7.35417,9.095106025390624,7.33421,8.956946025390625,7.33421,8.814116025390625C7.33421,7.985696025390625,8.00578,7.314116025390625,8.834209999999999,7.314116025390625C8.97703,7.314116025390625,9.11519,7.334086025390625,9.24605,7.371366025390625L13.753,2.864373025390625C13.9483,2.669110325390625,14.2649,2.669110325390625,14.4602,2.864373025390625C14.6554,3.059635025390625,14.6554,3.376217025390625,14.4602,3.571479025390625L10.06916,7.962476025390625C10.23631,8.204386025390626,10.334209999999999,8.497826025390625,10.334209999999999,8.814116025390625C10.334209999999999,9.642546025390626,9.66264,10.314116025390625,8.834209999999999,10.314116025390625C8.51791,10.314116025390625,8.22448,10.216226025390625,7.98256,10.049076025390626L3.853554,14.178126025390625C3.658291,14.373326025390625,3.341709,14.373326025390625,3.146447,14.178126025390625ZM7.67736,19.188526025390626C7.4821,18.993226025390626,7.4821,18.676626025390625,7.67736,18.481426025390626L9.9804,16.178326025390625C9.88669,15.982526025390625,9.834209999999999,15.763226025390624,9.834209999999999,15.531626025390626C9.834209999999999,14.703226025390626,10.50578,14.031626025390626,11.33421,14.031626025390626C11.56579,14.031626025390626,11.78511,14.084126025390624,11.98093,14.177826025390624L13.9804,12.178356025390626C13.8867,11.982536025390624,13.8342,11.763216025390625,13.8342,11.531636025390625C13.8342,10.703206025390624,14.5058,10.031636025390625,15.3342,10.031636025390625C15.5658,10.031636025390625,15.7851,10.084116025390625,15.9809,10.177826025390626L18.284,7.874796025390625C18.4792,7.679536025390625,18.7958,7.679536025390625,18.9911,7.874796025390625C19.1863,8.070056025390624,19.1863,8.386636025390626,18.9911,8.581906025390625L16.688000000000002,10.884936025390624C16.7817,11.080756025390626,16.8342,11.300066025390626,16.8342,11.531636025390625C16.8342,12.360066025390624,16.162599999999998,13.031626025390626,15.3342,13.031626025390626C15.1026,13.031626025390626,14.8833,12.979126025390626,14.6875,12.885426025390625L12.68803,14.884926025390625C12.78174,15.080726025390625,12.83421,15.300026025390626,12.83421,15.531626025390626C12.83421,16.360026025390624,12.16264,17.031626025390626,11.33421,17.031626025390626C11.10264,17.031626025390626,10.88333,16.979126025390627,10.68751,16.885426025390625L8.38446,19.188526025390626C8.1892,19.383726025390626,7.87262,19.383726025390626,7.67736,19.188526025390626Z" stroke-opacity="0" stroke="none"></path></svg>'), Fc = () => Ec.cloneNode(!0), Kc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3.3367688759765626,12.63173C3.5320318759765623,12.82699,3.8486138759765627,12.82699,4.043876875976562,12.63173L11.822052875976562,4.853553C12.017312875976563,4.658291,12.017312875976563,4.341708,11.822052875976562,4.146446C11.626792875976562,3.9511843,11.310202875976563,3.9511843,11.114942875976563,4.146446L3.3367688759765626,11.92462C3.1415071759765625,12.11988,3.1415071759765625,12.43647,3.3367688759765626,12.63173ZM5.001492875976562,17.0351C4.806232875976562,16.8399,4.806232875976562,16.5233,5.001492875976562,16.328L7.304532875976562,14.025C7.210822875976563,13.82916,7.158352875976563,13.60984,7.158352875976563,13.37827C7.158352875976563,12.54984,7.829922875976562,11.87827,8.658352875976561,11.87827C8.889922875976563,11.87827,9.109232875976563,11.93075,9.305052875976562,12.02446L11.304532875976562,10.02498C11.210822875976563,9.82916,11.158352875976561,9.60984,11.158352875976561,9.37827C11.158352875976561,8.54984,11.829922875976562,7.8782700000000006,12.658352875976563,7.8782700000000006C12.889922875976563,7.8782700000000006,13.109232875976563,7.93075,13.305022875976562,8.024460000000001L15.608122875976562,5.72142C15.803322875976562,5.5261499999999995,16.119922875976563,5.5261499999999995,16.315222875976563,5.72142C16.510422875976563,5.9166799999999995,16.510422875976563,6.23326,16.315222875976563,6.42852L14.012122875976562,8.73156C14.105822875976562,8.92738,14.158322875976562,9.1467,14.158322875976562,9.37827C14.158322875976562,10.2067,13.486822875976562,10.87827,12.658352875976563,10.87827C12.426772875976562,10.87827,12.207452875976562,10.82579,12.011642875976563,10.73209L10.012162875976562,12.73156C10.105872875976562,12.92738,10.158352875976561,13.1467,10.158352875976561,13.37827C10.158352875976561,14.2067,9.486772875976563,14.8783,8.658352875976561,14.8783C8.426772875976562,14.8783,8.207452875976562,14.8258,8.011642875976563,14.7321L5.708602875976562,17.0351C5.513342875976562,17.2304,5.196752875976562,17.2304,5.001492875976562,17.0351ZM10.415712875976563,18.328C10.220452875976562,18.5233,9.903862875976563,18.5233,9.708602875976563,18.328C9.513342875976562,18.1328,9.513342875976562,17.816200000000002,9.708602875976563,17.6209L12.304532875976562,15.025C12.210822875976563,14.8292,12.158352875976563,14.6098,12.158352875976563,14.3783C12.158352875976563,13.54984,12.829922875976562,12.87827,13.658322875976562,12.87827C13.889922875976563,12.87827,14.109222875976563,12.93075,14.305022875976562,13.02446L17.486822875976564,9.84274C17.682022875976564,9.64747,17.99862287597656,9.64747,18.19392287597656,9.84274C18.38912287597656,10.038,18.38912287597656,10.35458,18.19392287597656,10.54984L15.012122875976562,13.73156C15.105822875976562,13.92738,15.158322875976562,14.1467,15.158322875976562,14.3783C15.158322875976562,15.2067,14.486822875976562,15.8783,13.658322875976562,15.8783C13.426822875976562,15.8783,13.207422875976562,15.8258,13.011642875976563,15.7321L10.415712875976563,18.328Z" stroke-opacity="0" stroke="none"></path></svg>'), jc = () => Kc.cloneNode(!0), Zc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M13.1889,6C12.98303,6.582599999999999,12.42741,7,11.7743,7C11.12119,7,10.565570000000001,6.582599999999999,10.35965,6L3.5,6C3.223857,6,3,5.77614,3,5.5C3,5.22386,3.223857,5,3.5,5L10.35965,5C10.565570000000001,4.417404,11.12119,4,11.7743,4C12.42741,4,12.98303,4.417404,13.1889,5L18.5,5C18.7761,5,19,5.22386,19,5.5C19,5.77614,18.7761,6,18.5,6L13.1889,6ZM3,8.5C3,8.22386,3.223857,8,3.5,8L18.5,8C18.7761,8,19,8.22386,19,8.5C19,8.77614,18.7761,9,18.5,9L3.5,9C3.223857,9,3,8.77614,3,8.5ZM3.278549,11.5C3.278549,11.22386,3.502407,11,3.778549,11L18.7785,11C19.0547,11,19.2785,11.22386,19.2785,11.5C19.2785,11.77614,19.0547,12,18.7785,12L3.778549,12C3.502407,12,3.278549,11.77614,3.278549,11.5ZM3.139267,14.5C3.139267,14.2239,3.363124,14,3.6392670000000003,14L18.6393,14C18.915399999999998,14,19.1393,14.2239,19.1393,14.5C19.1393,14.7761,18.915399999999998,15,18.6393,15L3.6392670000000003,15C3.363124,15,3.139267,14.7761,3.139267,14.5ZM13.1889,18C12.98303,18.5826,12.42741,19,11.7743,19C11.12119,19,10.565570000000001,18.5826,10.35965,18L3.778549,18C3.502407,18,3.278549,17.7761,3.278549,17.5C3.278549,17.2239,3.502407,17,3.778549,17L10.35965,17C10.565570000000001,16.4174,11.12119,16,11.7743,16C12.42741,16,12.98303,16.4174,13.1889,17L18.7785,17C19.0547,17,19.2785,17.2239,19.2785,17.5C19.2785,17.7761,19.0547,18,18.7785,18L13.1889,18Z" stroke-opacity="0" stroke="none"></path></svg>'), Qc = () => Zc.cloneNode(!0), Rc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4.91465,6C4.70873,6.582599999999999,4.15311,7,3.5,7C2.671573,7,2,6.32843,2,5.5C2,4.671573,2.671573,4,3.5,4C4.15311,4,4.70873,4.417404,4.91465,5L18.2257,5C18.5018,5,18.7257,5.22386,18.7257,5.5C18.7257,5.77614,18.5018,6,18.2257,6L4.91465,6ZM2.7257,8.5C2.7257,8.22386,2.949558,8,3.2257,8L18.2257,8C18.5018,8,18.7257,8.22386,18.7257,8.5C18.7257,8.77614,18.5018,9,18.2257,9L3.2257,9C2.949558,9,2.7257,8.77614,2.7257,8.5ZM3.00425,11.5C3.00425,11.22386,3.22811,11,3.50425,11L18.5042,11C18.7804,11,19.0042,11.22386,19.0042,11.5C19.0042,11.77614,18.7804,12,18.5042,12L3.50425,12C3.22811,12,3.00425,11.77614,3.00425,11.5ZM2.864967,14.5C2.864967,14.2239,3.08882,14,3.36497,14L18.365,14C18.6411,14,18.865,14.2239,18.865,14.5C18.865,14.7761,18.6411,15,18.365,15L3.36497,15C3.08882,15,2.864967,14.7761,2.864967,14.5ZM20,17.5C20,18.328400000000002,19.3284,19,18.5,19C17.846899999999998,19,17.2913,18.5826,17.0854,18L3.50425,18C3.22811,18,3.00425,17.7761,3.00425,17.5C3.00425,17.2239,3.22811,17,3.50425,17L17.0854,17C17.2913,16.4174,17.846899999999998,16,18.5,16C19.3284,16,20,16.671599999999998,20,17.5Z" stroke-opacity="0" stroke="none"></path></svg>'), zc = () => Rc.cloneNode(!0), Uc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="5" ry="5" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse><ellipse cx="10.5" cy="11.5" rx="3" ry="3" fill-opacity="0" stroke-opacity="1" fill="none" stroke-width="1"></ellipse></svg>'), Yc = () => Uc.cloneNode(!0), Vc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M3,7.32468C5.90649,3.3893050000000002,11.49833,2.81306,14.6674,6.31944C14.9056,6.1554199999999994,15.192,6.05979,15.5,6.05979C15.845,6.05979,16.1628,6.17974,16.4162,6.381349999999999L18.4509,4.23827L19,4.816615L16.8945,7.03429C16.962600000000002,7.21075,17,7.40319,17,7.60463C17,8.45782,16.328400000000002,9.14947,15.5,9.14947C14.6716,9.14947,14,8.45782,14,7.60463C14,7.36402,14.0534,7.13625,14.1487,6.93322C11.32695,3.748365,6.25159,4.253956,3.612785,7.82695L3,7.32468ZM14.09,15.4717C15.7427,13.78985,16.244500000000002,11.524740000000001,15.5633,9.30134L15.5618,9.30134L16.3012,9.0502C17.072400000000002,11.56646,16.497700000000002,14.158,14.6282,16.0599C12.28737,18.442,8.62386,18.6988,6.41348,16.4501C4.5526,14.5572,4.52076,11.19671,6.36766,9.3177C7.89069,7.76754,10.07544,7.706189999999999,11.56741,9.22363C11.95453,9.61742,12.24817,10.08363,12.43369,10.57677L14.1451,8.77421L14.6942,9.35256L12.64982,11.50582C12.65827,11.59712,12.66295,11.68839,12.66378,11.77936C12.87398,12.04523,13,12.38451,13,12.7541C13,13.60729,12.32843,14.2989,11.5,14.2989C10.67157,14.2989,10,13.60729,10,12.7541C10,11.90091,10.67157,11.20926,11.5,11.20926C11.60387,11.20926,11.70528,11.220130000000001,11.8032,11.240829999999999L11.81763,11.22564C11.69858,10.71874,11.42858,10.21929,11.0284,9.81179C9.844000000000001,8.60765,8.136890000000001,8.65592,6.90822,9.90586C5.37975,11.460930000000001,5.40693,14.288,6.95404,15.8619C8.84598,17.7867,12.03496,17.5626,14.09,15.4717Z" stroke-opacity="0" stroke="none"></path></svg>'), Hc = () => Vc.cloneNode(!0), Gc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M4,17.0854L4,3.5C4,3.223858,4.22386,3,4.5,3C4.77614,3,5,3.223858,5,3.5L5,10L7.57584,10L9.8127,4.46359C9.91614,4.20756,10.20756,4.08386,10.46359,4.1873000000000005C10.71963,4.29075,10.84333,4.58216,10.73988,4.8382000000000005L8.65438,10L11.08535,10C11.29127,9.4174,11.84689,9,12.5,9C12.65154,9,12.79784,9.02247,12.93573,9.06427L16.6464,5.35355C16.8417,5.15829,17.1583,5.15829,17.3536,5.35355C17.5488,5.54882,17.5488,5.8654,17.3536,6.06066L13.7475,9.66675C13.907,9.90508,14,10.19168,14,10.5C14,11.15311,13.5826,11.70873,13,11.91465L13,14.3638L18.3714,12.1936C18.6274,12.09015,18.918799999999997,12.21385,19.0222,12.46989C19.1257,12.72592,19.002,13.0173,18.746000000000002,13.1208L13,15.4423L13,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854ZM6.3729499999999994,17.0413L12,14.7678L12,11.91465C11.88136,11.87271,11.76956,11.81627,11.66675,11.74746L6.3729499999999994,17.0413ZM12,15.8463L6.6694700000000005,18L12,18L12,15.8463ZM6.38629,15.6137L8.250350000000001,11L11,11L6.38629,15.6137ZM5,11L7.17182,11L5,16.3754L5,11Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Xc = () => Gc.cloneNode(!0), Jc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M17,4.5C17,5.32843,16.328400000000002,6,15.5,6C15.0931,6,14.7241,5.83802,14.4539,5.57503L5.98992,8.32515C5.99658,8.38251,6,8.440850000000001,6,8.5C6,9.15311,5.582599999999999,9.70873,5,9.91465L5,11.08535C5.42621,11.236,5.763999999999999,11.57379,5.91465,12L19.5,12C19.7761,12,20,12.22386,20,12.5C20,12.77614,19.7761,13,19.5,13L5.91465,13C5.70873,13.5826,5.15311,14,4.5,14C3.671573,14,3,13.3284,3,12.5C3,11.84689,3.417404,11.29127,4,11.08535L4,9.91465C3.417404,9.70873,3,9.15311,3,8.5C3,7.67157,3.671573,7,4.5,7C4.90411,7,5.2709,7.15981,5.5406200000000005,7.41967L14.0093,4.66802C14.0032,4.6128599999999995,14,4.5568,14,4.5C14,3.671573,14.6716,3,15.5,3C16.328400000000002,3,17,3.671573,17,4.5ZM4,15.5C4,15.2239,4.22386,15,4.5,15L19.5,15C19.7761,15,20,15.2239,20,15.5C20,15.7761,19.7761,16,19.5,16L4.5,16C4.22386,16,4,15.7761,4,15.5ZM4,18.5C4,18.2239,4.22386,18,4.5,18L19.5,18C19.7761,18,20,18.2239,20,18.5C20,18.7761,19.7761,19,19.5,19L4.5,19C4.22386,19,4,18.7761,4,18.5Z" stroke-opacity="0" stroke="none"></path></svg>'), Wc = () => Jc.cloneNode(!0), qc = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M20,3.5C20,4.15311,19.5826,4.70873,19,4.91465L19,18.5C19,18.7761,18.7761,19,18.5,19L4.91465,19C4.70873,19.5826,4.15311,20,3.5,20C2.671573,20,2,19.3284,2,18.5C2,17.846899999999998,2.417404,17.2913,3,17.0854L3,3.5C3,3.22386,3.22386,3,3.5,3L17.0854,3C17.2913,2.417404,17.846899999999998,2,18.5,2C19.3284,2,20,2.671573,20,3.5ZM17.0854,4C17.236,4.42621,17.5738,4.763999999999999,18,4.91465L18,8L14,8L14,4L17.0854,4ZM13,4L13,8L9,8L9,4L13,4ZM13,9L9,9L9,13L13,13L13,9ZM13,14L9,14L9,18L13,18L13,14ZM14,18L14,14L18,14L18,18L14,18ZM18,13L14,13L14,9L18,9L18,13ZM4.91465,18C4.763999999999999,17.5738,4.42621,17.236,4,17.0854L4,14L8,14L8,18L4.91465,18ZM4,8L4,4L8,4L8,8L4,8ZM8,9L8,13L4,13L4,9L8,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), el = () => qc.cloneNode(!0), tl = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><ellipse cx="10.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="17.5" cy="11.5" rx="1.5" ry="1.5" stroke-opacity="0" stroke="none"></ellipse><ellipse cx="10.5" cy="11.5" rx="7" ry="7" fill-opacity="0" fill="none" stroke-opacity="1" stroke-width="1"></ellipse></svg>'), nl = () => tl.cloneNode(!0), rl = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11.57625,6.9981C11.55099,6.999359999999999,11.52557,7,11.5,7C11.34,7,11.18584,6.97495,11.04125,6.9285499999999995L5.55401,16.4327C5.713760000000001,16.5905,5.83826,16.7839,5.91465,17L16.0854,17C16.2187,16.622700000000002,16.4987,16.314700000000002,16.8569,16.1445L11.57625,6.9981ZM12.50759,6.611219999999999C12.81005,6.336790000000001,13,5.94058,13,5.5C13,4.671573,12.32843,4,11.5,4C10.67157,4,10,4.671573,10,5.5C10,5.80059,10.08841,6.08052,10.24066,6.31522L4.64514,16.0069C4.59738,16.002299999999998,4.54896,16,4.5,16C3.671573,16,3,16.671599999999998,3,17.5C3,18.328400000000002,3.671573,19,4.5,19C5.15311,19,5.70873,18.5826,5.91465,18L16.0854,18C16.2913,18.5826,16.846899999999998,19,17.5,19C18.328400000000002,19,19,18.328400000000002,19,17.5C19,16.8365,18.5691,16.2735,17.971899999999998,16.075699999999998L12.50759,6.611219999999999Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), al = () => rl.cloneNode(!0), il = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19,4.5C19,5.15311,18.5826,5.70873,18,5.91465L18,18.5C18,18.7761,17.7761,19,17.5,19L5.91465,19C5.70873,19.5826,5.15311,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.846899999999998,3.417404,17.2913,4,17.0854L4,4.5C4,4.22386,4.22386,4,4.5,4L16.0854,4C16.2913,3.417404,16.846899999999998,3,17.5,3C18.328400000000002,3,19,3.671573,19,4.5ZM5,5L16.0854,5C16.236,5.42621,16.5738,5.763999999999999,17,5.91465L17,18L5.91465,18C5.763999999999999,17.5738,5.42621,17.236,5,17.0854L5,5Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), sl = () => il.cloneNode(!0), ol = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M19.6401,7.99355C20.4028,7.92291,21,7.2811900000000005,21,6.5C21,5.671573,20.3284,5,19.5,5C18.8469,5,18.2913,5.417404,18.0854,6L7.62067,6C7.34453,6,7.12067,6.22386,7.12067,6.5C7.12067,6.5479,7.12741,6.59423,7.13999,6.63809L3.2294099999999997,15.0243C2.530138,15.1517,2,15.764,2,16.5C2,17.328400000000002,2.671573,18,3.5,18C4.15311,18,4.70873,17.5826,4.91465,17L14.5963,17C14.6456,17.076,14.7162,17.1396,14.8044,17.1807C15.0546,17.2974,15.3521,17.1891,15.4688,16.9388L19.6401,7.99355ZM14.7896,16.0293L18.6551,7.739599999999999C18.3942,7.56144,18.1925,7.30307,18.0854,7L8.0746,7L4.25044,15.2009C4.55701,15.3784,4.79493,15.6613,4.91465,16L14.6207,16C14.68,16,14.7368,16.0103,14.7896,16.0293Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), cl = () => ol.cloneNode(!0), ll = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.134443814697265,7.494615087890625L8.764323814697265,7.494615087890625L8.764323814697265,3.414215087890625L8.310223814697267,3.414215087890625L7.294603814697266,4.005035087890625L7.289713814697266,4.634915087890625L8.134443814697265,4.149892087890625L8.134443814697265,7.494615087890625ZM18.832003814697266,6.933095087890624Q19.004603814697266,6.635245087890625,19.004603814697266,6.2543850878906255Q19.004603814697266,5.884915087890625,18.845103814697264,5.593575087890625Q18.685503814697267,5.3006050878906255,18.399103814697266,5.136225087890625Q18.114303814697266,4.9702050878906245,17.754603814697266,4.9653250878906245L18.820603814697265,3.840647087890625L18.820603814697265,3.414215087890625L16.519203814697264,3.414215087890625L16.519203814697264,3.939931087890625L18.050803814697264,3.939931087890625L16.719403814697266,5.334785087890625L17.074203814697263,5.7205350878906245Q17.254903814697265,5.484525087890625,17.619503814697268,5.484525087890625Q17.980803814697268,5.484525087890625,18.187503814697266,5.689605087890625Q18.394203814697267,5.894685087890625,18.394203814697267,6.2543850878906255Q18.394203814697267,6.604315087890625,18.187503814697266,6.822415087890625Q17.980803814697268,7.0405150878906255,17.640603814697265,7.0405150878906255Q17.334603814697267,7.0405150878906255,17.124703814697266,6.890775087890625Q16.914703814697265,6.739415087890626,16.820303814697265,6.469225087890624L16.354803814697263,6.744295087890626Q16.480103814697266,7.125155087890625,16.821903814697265,7.341625087890625Q17.165403814697264,7.559725087890625,17.640603814697265,7.559725087890625Q18.039403814697266,7.559725087890625,18.348603814697267,7.393705087890625Q18.659503814697267,7.229315087890625,18.832003814697266,6.933095087890624ZM10.000003814697266,10.634915087890626C10.000003814697266,11.024655087890626,9.851363814697265,11.379685087890625,9.607683814697266,11.646395087890625L12.168903814697266,15.171615087890626C12.275403814697265,15.147615087890625,12.386203814697266,15.134915087890626,12.500003814697266,15.134915087890626C12.596503814697266,15.134915087890626,12.690803814697265,15.144015087890624,12.782303814697265,15.161415087890624L16.108803814697268,11.196955087890625C16.038703814697264,11.023375087890624,16.000003814697266,10.833655087890625,16.000003814697266,10.634915087890626C16.000003814697266,9.806495087890625,16.671603814697264,9.134915087890626,17.500003814697266,9.134915087890626C18.328403814697264,9.134915087890626,19.000003814697266,9.806495087890625,19.000003814697266,10.634915087890626C19.000003814697266,11.463345087890625,18.328403814697264,12.134915087890626,17.500003814697266,12.134915087890626C17.239503814697265,12.134915087890626,16.994503814697268,12.068495087890625,16.781003814697264,11.951675087890624L13.654703814697266,15.677415087890624C13.870303814697266,15.937215087890625,14.000003814697266,16.270915087890625,14.000003814697266,16.634915087890626C14.000003814697266,17.463315087890624,13.328403814697266,18.134915087890626,12.500003814697266,18.134915087890626C11.671573814697265,18.134915087890626,11.000003814697266,17.463315087890624,11.000003814697266,16.634915087890626C11.000003814697266,16.284415087890626,11.120193814697265,15.962015087890626,11.321603814697266,15.706715087890625L8.715393814697265,12.119565087890624C8.645053814697267,12.129685087890625,8.573143814697266,12.134915087890626,8.500003814697266,12.134915087890626C8.162103814697264,12.134915087890626,7.8503038146972655,12.023195087890626,7.599523814697266,11.834665087890626L4.505583814697266,15.521915087890624C4.809213814697266,15.796415087890624,5.000003814697266,16.193415087890624,5.000003814697266,16.634915087890626C5.000003814697266,17.463315087890624,4.328433814697266,18.134915087890626,3.5000038146972656,18.134915087890626C2.6715768146972656,18.134915087890626,2.0000038146972656,17.463315087890624,2.0000038146972656,16.634915087890626C2.0000038146972656,15.806515087890626,2.6715768146972656,15.134915087890626,3.5000038146972656,15.134915087890626C3.508253814697266,15.134915087890626,3.5164838146972657,15.135015087890626,3.524703814697266,15.135115087890625L7.033823814697266,10.953115087890625C7.011673814697265,10.850565087890626,7.000003814697266,10.744105087890624,7.000003814697266,10.634915087890626C7.000003814697266,9.806495087890625,7.671573814697266,9.134915087890626,8.500003814697266,9.134915087890626C9.328433814697267,9.134915087890626,10.000003814697266,9.806495087890625,10.000003814697266,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), ul = () => ll.cloneNode(!0), Cl = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M8.13444,7.494615087890625L8.76432,7.494615087890625L8.76432,3.414215087890625L8.310220000000001,3.414215087890625L7.2946,4.005035087890625L7.28971,4.634915087890625L8.13444,4.149892087890625L8.13444,7.494615087890625ZM18.832,6.929835087890625Q19.0046,6.635245087890625,19.0046,6.2543850878906255Q19.0046,5.889805087890625,18.8451,5.5952050878906245Q18.6855,5.3006050878906255,18.3975,5.132965087890625Q18.1094,4.9653250878906245,17.7399,4.9653250878906245Q17.435499999999998,4.9653250878906245,17.1556,5.149245087890625L17.2793,3.939931087890625L18.8304,3.939931087890625L18.8304,3.414215087890625L16.7406,3.414215087890625L16.5094,5.665195087890625L17.0156,5.795405087890625Q17.095399999999998,5.655425087890626,17.2516,5.570795087890625Q17.4095,5.484525087890625,17.6357,5.484525087890625Q17.9694,5.484525087890625,18.1842,5.697745087890625Q18.4007,5.909335087890625,18.4007,6.2543850878906255Q18.4007,6.604315087890625,18.1842,6.822415087890625Q17.9694,7.0405150878906255,17.6292,7.0405150878906255Q17.3298,7.0405150878906255,17.119799999999998,6.890775087890625Q16.9098,6.739415087890626,16.825200000000002,6.474115087890625L16.3597,6.749175087890626Q16.470399999999998,7.110505087890624,16.807299999999998,7.335115087890625Q17.144199999999998,7.559725087890625,17.6292,7.559725087890625Q18.0296,7.559725087890625,18.3438,7.392075087890625Q18.6595,7.224435087890625,18.832,6.929835087890625ZM10,10.634915087890626C10,11.024655087890626,9.85136,11.379685087890625,9.60768,11.646395087890625L12.1689,15.171615087890626C12.2754,15.147615087890625,12.3862,15.134915087890626,12.5,15.134915087890626C12.5965,15.134915087890626,12.6908,15.144015087890624,12.7823,15.161415087890624L16.108800000000002,11.196955087890625C16.0387,11.023375087890624,16,10.833655087890625,16,10.634915087890626C16,9.806495087890625,16.671599999999998,9.134915087890626,17.5,9.134915087890626C18.3284,9.134915087890626,19,9.806495087890625,19,10.634915087890626C19,11.463345087890625,18.3284,12.134915087890626,17.5,12.134915087890626C17.2395,12.134915087890626,16.994500000000002,12.068505087890625,16.781,11.951675087890624L13.6547,15.677415087890624C13.8703,15.937215087890625,14,16.270915087890625,14,16.634915087890626C14,17.463315087890624,13.3284,18.134915087890626,12.5,18.134915087890626C11.67157,18.134915087890626,11,17.463315087890624,11,16.634915087890626C11,16.284415087890626,11.12019,15.962015087890626,11.3216,15.706715087890625L8.71539,12.119565087890624C8.645050000000001,12.129685087890625,8.57314,12.134915087890626,8.5,12.134915087890626C8.162099999999999,12.134915087890626,7.8503,12.023195087890626,7.59952,11.834665087890626L4.50558,15.521915087890624C4.80921,15.796415087890624,5,16.193415087890624,5,16.634915087890626C5,17.463315087890624,4.32843,18.134915087890626,3.5,18.134915087890626C2.671573,18.134915087890626,2,17.463315087890624,2,16.634915087890626C2,15.806515087890626,2.671573,15.134915087890626,3.5,15.134915087890626C3.5082500000000003,15.134915087890626,3.51648,15.135015087890626,3.5247,15.135115087890625L7.03382,10.953115087890625C7.01167,10.850565087890626,7,10.744105087890624,7,10.634915087890626C7,9.806495087890625,7.67157,9.134915087890626,8.5,9.134915087890626C9.32843,9.134915087890626,10,9.806495087890625,10,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), fl = () => Cl.cloneNode(!0), gl = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M18.8532,7.020985087890625Q19.0257,6.734525087890625,19.0257,6.369945087890625Q19.0257,6.020005087890625,18.8499,5.754705087890625Q18.6758,5.489415087890626,18.3649,5.339675087890625Q18.5944,5.209465087890625,18.7214,4.994615087890625Q18.8499,4.779775087890625,18.8499,4.5193550878906255Q18.8499,4.2003480878906245,18.7002,3.951324087890625Q18.5505,3.700673087890625,18.277,3.557444087890625Q18.0052,3.414215087890625,17.6455,3.414215087890625Q17.285800000000002,3.414215087890625,17.0107,3.557444087890625Q16.7357,3.700673087890625,16.5843,3.951324087890625Q16.4346,4.2003480878906245,16.4346,4.5193550878906255Q16.4346,4.779775087890625,16.561500000000002,4.994615087890625Q16.6901,5.209465087890625,16.919600000000003,5.339675087890625Q16.6055,5.489415087890626,16.4297,5.757965087890625Q16.255499999999998,6.024895087890625,16.255499999999998,6.369945087890625Q16.255499999999998,6.734525087890625,16.4297,7.020985087890625Q16.6055,7.305815087890625,16.919600000000003,7.465325087890625Q17.2354,7.624825087890625,17.6455,7.624825087890625Q18.0557,7.624825087890625,18.3682,7.465325087890625Q18.6807,7.305815087890625,18.8532,7.020985087890625ZM8.76432,7.559725087890625L8.13444,7.559725087890625L8.13444,4.214996087890625L7.28971,4.700025087890625L7.2946,4.070139087890625L8.310220000000001,3.479319087890625L8.76432,3.479319087890625L8.76432,7.559725087890625ZM17.1816,4.955555087890625Q17.0042,4.784655087890625,17.0042,4.5095950878906255Q17.0042,4.229645087890625,17.18,4.057119087890625Q17.355800000000002,3.884592087890625,17.6455,3.884592087890625Q17.935200000000002,3.884592087890625,18.1077,4.057119087890625Q18.2803,4.229645087890625,18.2803,4.5095950878906255Q18.2803,4.784655087890625,18.1045,4.955555087890625Q17.930300000000003,5.124825087890625,17.6455,5.124825087890625Q17.3607,5.124825087890625,17.1816,4.955555087890625ZM18.2217,5.7953950878906255Q18.4398,6.005365087890625,18.4398,6.3552950878906245Q18.4398,6.705235087890625,18.2217,6.915195087890625Q18.0052,7.125155087890625,17.6455,7.125155087890625Q17.285800000000002,7.125155087890625,17.067700000000002,6.915195087890625Q16.849600000000002,6.705235087890625,16.849600000000002,6.3552950878906245Q16.849600000000002,6.005365087890625,17.064500000000002,5.7953950878906255Q17.2793,5.585435087890625,17.6455,5.585435087890625Q18.0052,5.585435087890625,18.2217,5.7953950878906255ZM9.60768,11.711495087890626C9.85136,11.444785087890626,10,11.089765087890626,10,10.700025087890625C10,9.871595087890626,9.32843,9.200025087890625,8.5,9.200025087890625C7.67157,9.200025087890625,7,9.871595087890626,7,10.700025087890625C7,10.809205087890625,7.01167,10.915665087890625,7.03382,11.018215087890624L3.5247,15.200215087890625C3.51648,15.200115087890625,3.5082500000000003,15.200015087890625,3.5,15.200015087890625C2.671573,15.200015087890625,2,15.871615087890625,2,16.700015087890627C2,17.528415087890625,2.671573,18.200015087890627,3.5,18.200015087890627C4.32843,18.200015087890627,5,17.528415087890625,5,16.700015087890627C5,16.258515087890625,4.80921,15.861515087890625,4.50558,15.587015087890626L7.59952,11.899765087890625C7.8503,12.088295087890625,8.162099999999999,12.200025087890625,8.5,12.200025087890625C8.57314,12.200025087890625,8.645050000000001,12.194785087890626,8.71539,12.184675087890625L11.3216,15.771815087890625C11.12019,16.027215087890625,11,16.349515087890623,11,16.700015087890627C11,17.528415087890625,11.67157,18.200015087890627,12.5,18.200015087890627C13.3284,18.200015087890627,14,17.528415087890625,14,16.700015087890627C14,16.336015087890623,13.8703,16.002315087890626,13.6547,15.742515087890625L16.781,12.016775087890625C16.994500000000002,12.133605087890626,17.2395,12.200025087890625,17.5,12.200025087890625C18.3284,12.200025087890625,19,11.528445087890624,19,10.700025087890625C19,9.871595087890626,18.3284,9.200025087890625,17.5,9.200025087890625C16.671599999999998,9.200025087890625,16,9.871595087890626,16,10.700025087890625C16,10.898765087890624,16.0387,11.088475087890625,16.108800000000002,11.262055087890625L12.7823,15.226515087890625C12.6908,15.209115087890625,12.5965,15.200015087890625,12.5,15.200015087890625C12.3862,15.200015087890625,12.2754,15.212715087890626,12.1689,15.236715087890625L9.60768,11.711495087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), dl = () => gl.cloneNode(!0), hl = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M9.474616630859375,7.494615087890625L8.844736630859375,7.494615087890625L8.844736630859375,4.149892087890625L8.000006630859374,4.634915087890625L8.004896630859374,4.005035087890625L9.020516630859376,3.414215087890625L9.474616630859375,3.414215087890625L9.474616630859375,7.494615087890625ZM18.529296630859378,4.8318550878906255Q18.307996630859375,5.028795087890625,18.122396630859377,5.385245087890625Q17.868496630859376,5.019035087890625,17.629196630859376,4.8269750878906255Q17.389996630859375,4.634915087890625,17.168596630859376,4.634915087890625Q16.794296630859375,4.634915087890625,16.522496630859376,4.976715087890625Q16.252296630859377,5.3168850878906255,16.252296630859377,5.7856350878906255Q16.252296630859377,6.218575087890625,16.502896630859375,6.521315087890625Q16.755196630859373,6.822415087890625,17.114896630859377,6.822415087890625Q17.368796630859375,6.822415087890625,17.588596630859374,6.625475087890624Q17.809896630859377,6.428535087890625,17.998696630859374,6.0688350878906245Q18.249396630859373,6.439935087890625,18.488596630859377,6.631985087890625Q18.727896630859377,6.822415087890625,18.952496630859375,6.822415087890625Q19.326796630859373,6.822415087890625,19.596996630859376,6.482245087890625Q19.868796630859375,6.140455087890626,19.868796630859375,5.671705087890626Q19.868796630859375,5.238755087890625,19.618196630859376,4.937655087890625Q19.367496630859375,4.634915087890625,19.006196630859375,4.634915087890625Q18.750696630859377,4.634915087890625,18.529296630859378,4.8318550878906255ZM18.337296630859377,5.674955087890625L18.278696630859375,5.596835087890625Q18.449596630859375,5.272935087890625,18.622096630859374,5.1101750878906245Q18.794596630859374,4.947415087890625,18.967096630859373,4.947415087890625Q19.194996630859375,4.947415087890625,19.346396630859374,5.1345950878906255Q19.497696630859377,5.320135087890625,19.497696630859377,5.598455087890625Q19.497696630859377,5.8914250878906245,19.360996630859376,6.096505087890625Q19.224296630859374,6.301585087890626,19.027396630859375,6.301585087890626Q18.915096630859374,6.301585087890626,18.742496630859375,6.146965087890624Q18.569996630859375,5.992335087890625,18.337296630859377,5.674955087890625ZM17.785496630859377,5.779125087890625L17.842496630859372,5.857245087890625Q17.668296630859373,6.186025087890625,17.495796630859374,6.348785087890625Q17.324896630859374,6.509915087890625,17.153996630859375,6.509915087890625Q16.926096630859377,6.509915087890625,16.774796630859377,6.324375087890624Q16.623396630859375,6.137195087890625,16.623396630859375,5.858875087890625Q16.623396630859375,5.565905087890625,16.761696630859376,5.360825087890625Q16.900096630859373,5.1557550878906255,17.095396630859376,5.1557550878906255Q17.228896630859374,5.1557550878906255,17.365596630859375,5.2778250878906245Q17.502296630859377,5.399895087890625,17.785496630859377,5.779125087890625ZM10.710296630859375,10.634915087890626C10.710296630859375,11.024655087890626,10.561656630859375,11.379685087890625,10.317976630859375,11.646395087890625L12.879196630859376,15.171615087890626C12.985696630859374,15.147615087890625,13.096496630859376,15.134915087890626,13.210296630859375,15.134915087890626C13.306796630859376,15.134915087890626,13.401096630859374,15.144015087890624,13.492596630859374,15.161415087890624L16.819096630859377,11.196955087890625C16.748996630859374,11.023375087890624,16.710296630859375,10.833655087890625,16.710296630859375,10.634915087890626C16.710296630859375,9.806495087890625,17.381896630859373,9.134915087890626,18.210296630859375,9.134915087890626C19.038696630859373,9.134915087890626,19.710296630859375,9.806495087890625,19.710296630859375,10.634915087890626C19.710296630859375,11.463345087890625,19.038696630859373,12.134915087890626,18.210296630859375,12.134915087890626C17.949796630859375,12.134915087890626,17.704796630859377,12.068505087890625,17.491296630859374,11.951675087890624L14.364996630859375,15.677415087890624C14.580596630859375,15.937215087890625,14.710296630859375,16.270915087890625,14.710296630859375,16.634915087890626C14.710296630859375,17.463315087890624,14.038696630859375,18.134915087890626,13.210296630859375,18.134915087890626C12.381866630859374,18.134915087890626,11.710296630859375,17.463315087890624,11.710296630859375,16.634915087890626C11.710296630859375,16.284415087890626,11.830486630859374,15.962015087890626,12.031896630859375,15.706715087890625L9.425686630859374,12.119565087890624C9.355346630859376,12.129685087890625,9.283436630859375,12.134915087890626,9.210296630859375,12.134915087890626C8.872396630859374,12.134915087890626,8.560596630859376,12.023195087890626,8.309816630859375,11.834665087890626L5.215876630859375,15.521915087890624C5.519506630859375,15.796415087890624,5.710296630859375,16.193415087890624,5.710296630859375,16.634915087890626C5.710296630859375,17.463315087890624,5.038726630859375,18.134915087890626,4.210296630859375,18.134915087890626C3.381869630859375,18.134915087890626,2.710296630859375,17.463315087890624,2.710296630859375,16.634915087890626C2.710296630859375,15.806515087890626,3.381869630859375,15.134915087890626,4.210296630859375,15.134915087890626C4.218546630859375,15.134915087890626,4.226776630859375,15.135015087890626,4.234996630859375,15.135115087890625L7.744116630859375,10.953115087890625C7.721966630859375,10.850565087890626,7.710296630859375,10.744105087890624,7.710296630859375,10.634915087890626C7.710296630859375,9.806495087890625,8.381866630859374,9.134915087890626,9.210296630859375,9.134915087890626C10.038726630859376,9.134915087890626,10.710296630859375,9.806495087890625,10.710296630859375,10.634915087890626Z" stroke-opacity="0" stroke="none"></path></svg>'), yl = () => hl.cloneNode(!0), ml = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M21,5.5C21,6.32843,20.3284,7,19.5,7C19.4136,7,19.3289,6.99269,19.2465,6.97866L15.6257,15.5086C15.8587,15.7729,16,16.119999999999997,16,16.5C16,17.328400000000002,15.3284,18,14.5,18C13.8469,18,13.2913,17.5826,13.0854,17L3.91465,17C3.70873,17.5826,3.15311,18,2.5,18C1.671573,18,1,17.328400000000002,1,16.5C1,15.6716,1.671573,15,2.5,15C2.5840199999999998,15,2.66643,15.0069,2.74668,15.0202L6.36934,6.48574C6.13933,6.22213,6,5.87733,6,5.5C6,4.671573,6.67157,4,7.5,4C8.15311,4,8.70873,4.417404,8.91465,5L18.0854,5C18.2913,4.417404,18.8469,4,19.5,4C20.3284,4,21,4.671573,21,5.5ZM18.0854,6L8.91465,6C8.892579999999999,6.06243,8.8665,6.12296,8.83672,6.18128L13.9814,15.0921C14.143,15.0325,14.3177,15,14.5,15C14.584,15,14.6664,15.0069,14.7467,15.0202L18.3693,6.48574C18.2462,6.3446,18.149,6.1802,18.0854,6ZM13.2036,15.745L8.0861,6.8811800000000005C7.90605,6.95768,7.70797,7,7.5,7C7.41359,7,7.32888,6.99269,7.24647,6.97866L3.62571,15.5086C3.7512,15.651,3.8501,15.8174,3.91465,16L13.0854,16C13.1169,15.9108,13.1566,15.8255,13.2036,15.745Z" stroke-opacity="0" stroke="none"></path></svg>'), pl = () => ml.cloneNode(!0), vl = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.92159,5.93994C6.04014,5.90529,6.152620000000001,5.85639,6.25704,5.79523L9.12729,9.89437C9.045449999999999,10.07959,9,10.28449,9,10.5C9,10.79522,9.08529,11.07053,9.232569999999999,11.30262L4.97573,16.7511L5.92159,5.93994ZM4.92259,5.8848400000000005C4.38078,5.658659999999999,4,5.1238,4,4.5C4,3.671573,4.67157,3,5.5,3C6.2157,3,6.81433,3.50124,6.96399,4.17183L15.1309,4.88634C15.3654,4.36387,15.8902,4,16.5,4C17.328400000000002,4,18,4.67157,18,5.5C18,6.08983,17.659599999999998,6.60015,17.1645,6.84518L18.4264,14.0018C18.4508,14.0006,18.4753,14,18.5,14C19.3284,14,20,14.6716,20,15.5C20,16.328400000000002,19.3284,17,18.5,17C17.932499999999997,17,17.4386,16.6849,17.183799999999998,16.22L5.99686,18.5979C5.946429999999999,19.3807,5.29554,20,4.5,20C3.671573,20,3,19.3284,3,18.5C3,17.869300000000003,3.389292,17.3295,3.94071,17.1077L4.92259,5.8848400000000005ZM5.72452,17.6334C5.69799,17.596,5.6698,17.5599,5.64004,17.525100000000002L10.01843,11.92103C10.16958,11.97223,10.33155,12,10.5,12C10.80059,12,11.08052,11.91158,11.31522,11.75934L17.0606,15.0765C17.0457,15.1271,17.0335,15.1789,17.023899999999998,15.2317L5.72452,17.6334ZM11.92855,10.95875L17.4349,14.1379L16.1699,6.96356C15.9874,6.92257,15.8174,6.8483,15.6667,6.74746L11.99771,10.4165C11.99923,10.44414,12,10.47198,12,10.5C12,10.66,11.97495,10.814160000000001,11.92855,10.95875ZM10.5,9C10.259830000000001,9,10.03285,9.05644,9.83159,9.15679L7.04919,5.1831L15.0493,5.88302C15.054,5.90072,15.059,5.91829,15.0643,5.9357299999999995L11.56066,9.43934C11.28921,9.16789,10.91421,9,10.5,9Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), _l = () => vl.cloneNode(!0), Ll = /* @__PURE__ */ g('<svg viewBox="0 0 22 22"><path d="M4.727219638671875,8.007996215820313L9.973849638671876,2.7629472158203123C10.167279638671875,2.5696791158203123,10.480729638671875,2.5696791158203123,10.674169638671875,2.7629472158203123L13.223329638671874,5.311756215820313C13.416929638671874,5.505236215820313,13.416929638671874,5.8189862158203125,13.223329638671874,6.012466215820313L7.977129638671875,11.257906215820313C7.379859638671875,11.855176215820313,7.407609638671875,12.909396215820312,8.033809638671876,13.535596215820313C8.660409638671876,14.162596215820313,9.713849638671874,14.189996215820312,10.311129638671876,13.591896215820313L15.556929638671875,8.346066215820311C15.750429638671875,8.152526215820313,16.064229638671875,8.152526215820313,16.257629638671872,8.346066215820311L18.806529638671876,10.895266215820312C19.000029638671876,11.088746215820313,19.000029638671876,11.402496215820312,18.806529638671876,11.595976215820313L13.560629638671875,16.841796215820313C11.165619638671876,19.237196215820312,7.197149638671875,19.19919621582031,4.783499638671875,16.785496215820313C2.3698426386718747,14.371896215820312,2.331397638671875,10.403416215820313,4.727219638671875,8.007996215820313ZM12.172299638671875,5.662106215820312L10.323809638671875,3.8136162158203124L5.4287196386718755,8.709096215820313C3.422893638671875,10.714536215820312,3.4549956386718748,14.055196215820313,5.484999638671875,16.08479621582031C7.514609638671875,18.114796215820313,10.855289638671875,18.146496215820314,12.860719638671876,16.141096215820312L15.465629638671874,13.535796215820312L14.090929638671875,12.160756215820312L14.791629638671875,11.460436215820312L16.166229638671876,12.834996215820313L17.755829638671877,11.245226215820313L15.907729638671874,9.396736215820312L11.011839638671875,14.292596215820312C10.042809638671875,15.262396215820312,8.418249638671874,15.243796215820312,7.406019638671875,14.306496215820312L7.333099638671875,14.236296215820312C6.327599638671876,13.230796215820313,6.284009638671876,11.550396215820312,7.276419638671875,10.557586215820312L9.882199638671874,7.952026215820313L8.501079638671875,6.570906215820313L9.201789638671876,5.870186215820313L10.582939638671874,7.251336215820312L12.172299638671875,5.662106215820312Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), $l = (e) => (() => {
  const t = Ll.cloneNode(!0);
  return X(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), bl = /* @__PURE__ */ g('<svg viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_615"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_615)"><path d="M19.672,3.0673368C19.4417,2.9354008,19.1463,3.00292252,18.9994,3.2210900000000002L17.4588,5.50622L16.743299999999998,3.781253L13.9915,7.4662L13.9618,7.51108C13.8339,7.72862,13.8936,8.005659999999999,14.1004,8.15391L14.1462,8.183430000000001C14.3683,8.308720000000001,14.6511,8.25001,14.8022,8.047229999999999L16.4907,5.78571L17.246299999999998,7.60713L19.8374,3.7635389999999997L19.8651,3.717088C19.9871,3.484615,19.9023,3.199273,19.672,3.0673368ZM4.79974,8.462530000000001L10.117740000000001,3.252975C10.31381,3.0610145,10.63152,3.0610145,10.82759,3.252975L13.4115,5.78453C13.6076,5.976710000000001,13.6076,6.28833,13.4115,6.4805L8.093869999999999,11.69045C7.48847,12.28368,7.51659,13.3308,8.151309999999999,13.9528C8.786439999999999,14.5755,9.85421,14.6027,10.45961,14.0087L15.7768,8.79831C15.9729,8.60609,16.2909,8.60609,16.487099999999998,8.79831L19.0705,11.33026C19.2667,11.52244,19.2667,11.83406,19.0705,12.02623L13.7533,17.2366C11.32572,19.6158,7.30328,19.578,4.85679,17.1807C2.410298,14.7834,2.371331,10.84174,4.79974,8.462530000000001ZM12.3461,6.1325199999999995L10.47246,4.29654L5.51079,9.15889C3.477674,11.15076,3.510214,14.4688,5.56784,16.4847C7.62506,18.500999999999998,11.01117,18.5325,13.0439,16.540599999999998L15.6842,13.9529L14.2908,12.58718L15.0011,11.89161L16.394399999999997,13.2569L18.0056,11.67786L16.1323,9.84188L11.16985,14.7046C10.18764,15.6679,8.540980000000001,15.6494,7.51498,14.7184L7.44107,14.6487C6.4219,13.65,6.37771,11.98096,7.38362,10.994869999999999L10.02485,8.40693L8.624939999999999,7.03516L9.335180000000001,6.33919L10.73512,7.71099L12.3461,6.1325199999999995Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), xl = (e) => (() => {
  const t = bl.cloneNode(!0);
  return X(t, "class", `icon-overlay ${e ?? ""}`), t;
})(), kl = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M11,17C5.80945,17,3.667717,12.85,3.113386,11.575C2.9622047,11.2,2.9622047,10.8,3.113386,10.425C3.667717,9.15,5.80945,5,11,5C16.165399999999998,5,18.3323,9.15,18.8866,10.425C19.0378,10.8,19.0378,11.2,18.8866,11.575C18.3323,12.85,16.165399999999998,17,11,17ZM4.04567,10.8C3.995276,10.925,3.995276,11.05,4.04567,11.175C4.52441,12.325,6.43937,16,11,16C15.5606,16,17.4756,12.325,17.9543,11.2C18.0047,11.075,18.0047,10.95,17.9543,10.825C17.4756,9.675,15.5606,6,11,6C6.43937,6,4.52441,9.675,4.04567,10.8ZM11,13.5C9.61417,13.5,8.480319999999999,12.375,8.480319999999999,11C8.480319999999999,9.625,9.61417,8.5,11,8.5C12.38583,8.5,13.5197,9.625,13.5197,11C13.5197,12.375,12.38583,13.5,11,13.5ZM11,9.5C10.1685,9.5,9.48819,10.175,9.48819,11C9.48819,11.825,10.1685,12.5,11,12.5C11.8315,12.5,12.51181,11.825,12.51181,11C12.51181,10.175,11.8315,9.5,11,9.5Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), Al = () => kl.cloneNode(!0), wl = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M5.80417,14.9887L4.62563,16.167299999999997C4.43037,16.3625,4.43037,16.6791,4.62563,16.8744C4.82089,17.0696,5.13748,17.0696,5.332739999999999,16.8744L6.62638,15.5807C7.75595,16.290100000000002,9.19328,16.7929,11,16.7929C16.165399999999998,16.7929,18.3323,12.64289,18.8866,11.36789C19.0378,10.99289,19.0378,10.59289,18.8866,10.21789C18.5549,9.45486,17.6456,7.66212,15.8617,6.34545L17.3536,4.853553C17.5488,4.658291,17.5488,4.341709,17.3536,4.146447C17.1583,3.9511845,16.8417,3.9511845,16.6464,4.146447L15.0014,5.7915399999999995C13.9314,5.1969,12.61166,4.792893,11,4.792893C5.80945,4.792893,3.667717,8.94289,3.113386,10.21789C2.9622049,10.59289,2.9622049,10.99289,3.113386,11.36789C3.424435,12.08333,4.2353000000000005,13.70399,5.80417,14.9887ZM7.36012,14.847C8.32327,15.4074,9.52286,15.7929,11,15.7929C15.5606,15.7929,17.4756,12.11789,17.9543,10.99289C18.0047,10.86789,18.0047,10.74289,17.9543,10.61789C17.659,9.90846,16.8171,8.23812,15.1447,7.06241L12.96929,9.23782C13.3134,9.66543,13.5197,10.20642,13.5197,10.79289C13.5197,12.16789,12.38583,13.29289,11,13.29289C10.41596,13.29289,9.87667,13.09308,9.44815,12.75896L7.36012,14.847ZM8.794609999999999,11.99829L6.520099999999999,14.2728C5.06905,13.12119,4.32057,11.628250000000001,4.04567,10.96789C3.995275,10.84289,3.995275,10.71789,4.04567,10.59289C4.52441,9.46789,6.43937,5.79289,11,5.79289C12.28868,5.79289,13.3661,6.086320000000001,14.2596,6.53329L12.19759,8.5953C11.84086,8.40257,11.43271,8.29289,11,8.29289C9.61417,8.29289,8.480319999999999,9.41789,8.480319999999999,10.79289C8.480319999999999,11.22918,8.594470000000001,11.64029,8.794609999999999,11.99829ZM10.16528,12.04183C10.404869999999999,12.20032,10.692070000000001,12.29289,11,12.29289C11.8315,12.29289,12.51181,11.61789,12.51181,10.79289C12.51181,10.48318,12.41593,10.194600000000001,12.25216,9.95494L10.16528,12.04183ZM11.43602,9.35687L9.55616,11.236740000000001C9.512,11.09633,9.48819,10.94724,9.48819,10.79289C9.48819,9.96789,10.1685,9.29289,11,9.29289C11.15142,9.29289,11.29782,9.31528,11.43602,9.35687Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></svg>'), Ml = () => wl.cloneNode(!0), Sl = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_625"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_625)"><path d="M14.5385,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807692,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.88462,4,14.5385,5.61538,14.5385,7.576919999999999L14.5385,9.76923ZM10.88461,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923L13.38462,9.76923L13.38462,7.576919999999999C13.38462,6.23077,12.26923,5.15385,10.88461,5.15385ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.038450000000001,12.07692,11.307680000000001,12.34615,11.307680000000001,12.65385L11.307680000000001,14.5769C11.307680000000001,14.8846,11.038450000000001,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Tl = () => Sl.cloneNode(!0), Il = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><defs><clipPath id="master_svg0_151_620"><rect x="0" y="0" width="22" height="22" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_151_620)"><path d="M8.38461,9.76923L15.6538,9.76923C16.6538,9.76923,17.4615,10.576920000000001,17.4615,11.576920000000001L17.4615,17.1923C17.4615,18.1923,16.6538,19,15.6538,19L5.80769,19C4.807692,19,4,18.1923,4,17.1923L4,11.576920000000001C4,10.576920000000001,4.807693,9.76923,5.80769,9.76923L7.23077,9.76923L7.23077,7.576919999999999C7.23077,5.61538,8.88462,4,10.88462,4C12.46154,4,13.84615,4.961539,14.3462,6.423080000000001C14.4615,6.73077,14.3077,7.038460000000001,14,7.15385C13.69231,7.26923,13.38461,7.11538,13.26923,6.80769C12.92308,5.80769,11.96154,5.15385,10.88462,5.15385C9.5,5.15385,8.38461,6.23077,8.38461,7.576919999999999L8.38461,9.76923ZM15.6538,17.8462C16,17.8462,16.3077,17.5385,16.3077,17.1923L16.3077,11.576920000000001C16.3077,11.23077,16,10.923079999999999,15.6538,10.923079999999999L5.80769,10.923079999999999C5.46154,10.923079999999999,5.15385,11.23077,5.15385,11.576920000000001L5.15385,17.1923C5.15385,17.5385,5.46154,17.8462,5.80769,17.8462L15.6538,17.8462ZM10.153839999999999,12.65385C10.153839999999999,12.34615,10.42307,12.07692,10.73076,12.07692C11.03846,12.07692,11.307690000000001,12.34615,11.307690000000001,12.65385L11.307690000000001,14.5769C11.307690000000001,14.8846,11.03846,15.1538,10.73076,15.1538C10.42307,15.1538,10.153839999999999,14.8846,10.153839999999999,14.5769L10.153839999999999,12.65385Z" stroke-opacity="0" fill-rule="evenodd" fill-opacity="1"></path></g></svg>'), Nl = () => Il.cloneNode(!0), Dl = /* @__PURE__ */ g('<svg class="icon-overlay" viewBox="0 0 22 22"><path d="M16.966900000000003,8.67144C16.6669,8.67144,16.4247,8.91558,16.4247,9.21802L16.4247,16.631500000000003C16.4247,17.322,16.007199999999997,17.9068,15.5139,17.9068L13.93072,17.9068L13.93072,9.2162C13.93072,8.91741,13.68675,8.67144,13.38855,8.67144C13.09036,8.67144,12.84639,8.91741,12.84639,9.21802L12.84639,17.9068L10.151810000000001,17.9068L10.151810000000001,9.21802C10.151810000000001,8.91741,9.90783,8.67144,9.609639999999999,8.67144C9.31145,8.67144,9.06747,8.91741,9.06747,9.219850000000001L9.06747,17.9068L7.48614,17.9068C6.99277,17.9068,6.5753,17.322,6.5753,16.631500000000003L6.5753,9.21802C6.5753,8.91558,6.333130000000001,8.67144,6.03313,8.67144C5.73313,8.67144,5.49096,8.91558,5.49096,9.21802L5.49096,16.631500000000003C5.49096,17.9378,6.385540000000001,19,7.48614,19L15.512,19C16.6127,19,17.509,17.9378,17.509,16.631500000000003L17.509,9.21802C17.509,8.91558,17.2669,8.67144,16.966900000000003,8.67144ZM18.4578,6.21183L4.542169,6.21183C4.243976,6.21183,4,6.45779,4,6.75841C4,7.05903,4.243976,7.30499,4.542169,7.30499L18.4578,7.30499C18.756,7.30499,19,7.05903,19,6.75841C19,6.45779,18.756,6.21183,18.4578,6.21183ZM8.68072,5.10045L14.3193,5.10045C14.6175,5.10045,14.8614,4.852666,14.8614,4.550225C14.8614,4.247783,14.6175,4,14.3193,4L8.68072,4C8.38253,4,8.13855,4.247783,8.13855,4.550225C8.13855,4.852666,8.38253,5.10045,8.68072,5.10045Z" stroke-opacity="0" fill-opacity="1"></path></svg>'), Pl = () => Dl.cloneNode(!0), Bl = {
  horizontalStraightLine: yc,
  horizontalRayLine: pc,
  horizontalSegment: _c,
  verticalStraightLine: $c,
  verticalRayLine: xc,
  verticalSegment: Ac,
  straightLine: Mc,
  rayLine: Tc,
  segment: Nc,
  arrow: Pc,
  priceLine: Oc,
  priceChannelLine: Fc,
  parallelStraightLine: jc,
  fibonacciLine: Qc,
  fibonacciSegment: zc,
  fibonacciCircle: Yc,
  fibonacciSpiral: Hc,
  fibonacciSpeedResistanceFan: Xc,
  fibonacciExtension: Wc,
  gannBox: el,
  circle: nl,
  triangle: al,
  rect: sl,
  parallelogram: cl,
  threeWaves: ul,
  fiveWaves: fl,
  eightWaves: dl,
  anyWaves: yl,
  abcd: pl,
  xabcd: _l,
  weak_magnet: $l,
  strong_magnet: xl,
  lock: Tl,
  unlock: Nl,
  visible: Al,
  invisible: Ml,
  remove: Pl
};
function Ol(e) {
  return [
    { key: "horizontalStraightLine", text: u("horizontal_straight_line", e) },
    { key: "horizontalRayLine", text: u("horizontal_ray_line", e) },
    { key: "horizontalSegment", text: u("horizontal_segment", e) },
    { key: "verticalStraightLine", text: u("vertical_straight_line", e) },
    { key: "verticalRayLine", text: u("vertical_ray_line", e) },
    { key: "verticalSegment", text: u("vertical_segment", e) },
    { key: "straightLine", text: u("straight_line", e) },
    { key: "rayLine", text: u("ray_line", e) },
    { key: "segment", text: u("segment", e) },
    { key: "arrow", text: u("arrow", e) },
    { key: "priceLine", text: u("price_line", e) }
  ];
}
function El(e) {
  return [
    { key: "priceChannelLine", text: u("price_channel_line", e) },
    { key: "parallelStraightLine", text: u("parallel_straight_line", e) }
  ];
}
function Fl(e) {
  return [
    { key: "circle", text: u("circle", e) },
    { key: "rect", text: u("rect", e) },
    { key: "parallelogram", text: u("parallelogram", e) },
    { key: "triangle", text: u("triangle", e) }
  ];
}
function Kl(e) {
  return [
    { key: "fibonacciLine", text: u("fibonacci_line", e) },
    { key: "fibonacciSegment", text: u("fibonacci_segment", e) },
    { key: "fibonacciCircle", text: u("fibonacci_circle", e) },
    { key: "fibonacciSpiral", text: u("fibonacci_spiral", e) },
    { key: "fibonacciSpeedResistanceFan", text: u("fibonacci_speed_resistance_fan", e) },
    { key: "fibonacciExtension", text: u("fibonacci_extension", e) },
    { key: "gannBox", text: u("gann_box", e) }
  ];
}
function jl(e) {
  return [
    { key: "xabcd", text: u("xabcd", e) },
    { key: "abcd", text: u("abcd", e) },
    { key: "threeWaves", text: u("three_waves", e) },
    { key: "fiveWaves", text: u("five_waves", e) },
    { key: "eightWaves", text: u("eight_waves", e) },
    { key: "anyWaves", text: u("any_waves", e) }
  ];
}
function Zl(e) {
  return [
    { key: "weak_magnet", text: u("weak_magnet", e) },
    { key: "strong_magnet", text: u("strong_magnet", e) }
  ];
}
const W = (e) => Bl[e.name](e.class), Ql = /* @__PURE__ */ g('<div class="klinecharts-pro-drawing-bar"><span class="split-line"></span><div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div><div class="item"><span style="width:32px;height:32px"></span></div><div class="item"><span style="width:32px;height:32px"></span></div><span class="split-line"></span><div class="item"><span style="width:32px;height:32px"></span></div></div>'), Rl = /* @__PURE__ */ g('<div class="item" tabindex="0"><span style="width:32px;height:32px"></span><div class="icon-arrow"><svg viewBox="0 0 4 6"><path d="M1.07298,0.159458C0.827521,-0.0531526,0.429553,-0.0531526,0.184094,0.159458C-0.0613648,0.372068,-0.0613648,0.716778,0.184094,0.929388L2.61275,3.03303L0.260362,5.07061C0.0149035,5.28322,0.0149035,5.62793,0.260362,5.84054C0.505822,6.05315,0.903789,6.05315,1.14925,5.84054L3.81591,3.53075C4.01812,3.3556,4.05374,3.0908,3.92279,2.88406C3.93219,2.73496,3.87113,2.58315,3.73964,2.46925L1.07298,0.159458Z" stroke="none" stroke-opacity="0"></path></svg></div></div>'), _9 = /* @__PURE__ */ g('<li><span style="padding-left:8px"></span></li>'), L9 = "drawing_tools", zl = (e) => {
  const [t, n] = $("horizontalStraightLine"), [r, a] = $("priceChannelLine"), [i, o] = $("circle"), [s, c] = $("fibonacciLine"), [f, l] = $("xabcd"), [y, v] = $("weak_magnet"), [b, w] = $("normal"), [B, O] = $(!1), [N, Q] = $(!0), [M, S] = $(""), x = j(() => [{
    key: "singleLine",
    icon: t(),
    list: Ol(e.locale),
    setter: n
  }, {
    key: "moreLine",
    icon: r(),
    list: El(e.locale),
    setter: a
  }, {
    key: "polygon",
    icon: i(),
    list: Fl(e.locale),
    setter: o
  }, {
    key: "fibonacci",
    icon: s(),
    list: Kl(e.locale),
    setter: c
  }, {
    key: "wave",
    icon: f(),
    list: jl(e.locale),
    setter: l
  }]), E = j(() => Zl(e.locale));
  return (() => {
    const G = Ql.cloneNode(!0), l1 = G.firstChild, k = l1.nextSibling, K = k.firstChild, Z = K.nextSibling, e1 = Z.firstChild, I1 = k.nextSibling, f1 = I1.firstChild, F1 = I1.nextSibling, N1 = F1.firstChild, K1 = F1.nextSibling, u0 = K1.nextSibling, D1 = u0.firstChild;
    return p(G, () => x().map((A) => (() => {
      const U = Rl.cloneNode(!0), q = U.firstChild, r1 = q.nextSibling, h = r1.firstChild;
      return U.addEventListener("blur", () => {
        S("");
      }), q.$$click = () => {
        e.onDrawingItemClick({
          groupId: L9,
          name: A.icon,
          visible: N(),
          lock: B(),
          mode: b()
        });
      }, p(q, m(W, {
        get name() {
          return A.icon;
        }
      })), r1.$$click = () => {
        A.key === M() ? S("") : S(A.key);
      }, p(U, (() => {
        const d = j(() => A.key === M());
        return () => d() && m(t0, {
          class: "list",
          get children() {
            return A.list.map((_) => (() => {
              const L = _9.cloneNode(!0), T = L.firstChild;
              return L.$$click = () => {
                A.setter(_.key), e.onDrawingItemClick({
                  name: _.key,
                  lock: B(),
                  mode: b()
                }), S("");
              }, p(L, m(W, {
                get name() {
                  return _.key;
                }
              }), T), p(T, () => _.text), L;
            })());
          }
        });
      })(), null), R(() => X(h, "class", A.key === M() ? "rotate" : "")), U;
    })()), l1), k.addEventListener("blur", () => {
      S("");
    }), K.$$click = () => {
      let A = y();
      b() !== "normal" && (A = "normal"), w(A), e.onModeChange(A);
    }, p(K, (() => {
      const A = j(() => y() === "weak_magnet");
      return () => A() ? (() => {
        const U = j(() => b() === "weak_magnet");
        return () => U() ? m(W, {
          name: "weak_magnet",
          class: "selected"
        }) : m(W, {
          name: "weak_magnet"
        });
      })() : (() => {
        const U = j(() => b() === "strong_magnet");
        return () => U() ? m(W, {
          name: "strong_magnet",
          class: "selected"
        }) : m(W, {
          name: "strong_magnet"
        });
      })();
    })()), Z.$$click = () => {
      M() === "mode" ? S("") : S("mode");
    }, p(k, (() => {
      const A = j(() => M() === "mode");
      return () => A() && m(t0, {
        class: "list",
        get children() {
          return E().map((U) => (() => {
            const q = _9.cloneNode(!0), r1 = q.firstChild;
            return q.$$click = () => {
              v(U.key), w(U.key), e.onModeChange(U.key), S("");
            }, p(q, m(W, {
              get name() {
                return U.key;
              }
            }), r1), p(r1, () => U.text), q;
          })());
        }
      });
    })(), null), f1.$$click = () => {
      const A = !B();
      O(A), e.onLockChange(A);
    }, p(f1, (() => {
      const A = j(() => !!B());
      return () => A() ? m(W, {
        name: "lock"
      }) : m(W, {
        name: "unlock"
      });
    })()), N1.$$click = () => {
      const A = !N();
      Q(A), e.onVisibleChange(A);
    }, p(N1, (() => {
      const A = j(() => !!N());
      return () => A() ? m(W, {
        name: "visible"
      }) : m(W, {
        name: "invisible"
      });
    })()), D1.$$click = () => {
      e.onRemoveClick(L9);
    }, p(D1, m(W, {
      name: "remove"
    })), R(() => X(e1, "class", M() === "mode" ? "rotate" : "")), G;
  })();
};
t1(["click"]);
const $9 = /* @__PURE__ */ g('<li class="title"></li>'), b9 = /* @__PURE__ */ g('<li class="row"></li>'), Ul = (e) => m(T1, {
  get title() {
    return u("indicator", e.locale);
  },
  width: 400,
  get onClose() {
    return e.onClose;
  },
  get children() {
    return m(t0, {
      class: "klinecharts-pro-indicator-modal-list",
      get children() {
        return [(() => {
          const t = $9.cloneNode(!0);
          return p(t, () => u("main_indicator", e.locale)), t;
        })(), j(() => ["MA", "EMA", "SMA", "BOLL", "SAR", "BBI"].map((t) => {
          const n = e.mainIndicators.includes(t);
          return (() => {
            const r = b9.cloneNode(!0);
            return r.$$click = (a) => {
              e.onMainIndicatorChange({
                name: t,
                paneId: "candle_pane",
                added: !n
              });
            }, p(r, m(v9, {
              checked: n,
              get label() {
                return u(t.toLowerCase(), e.locale);
              }
            })), r;
          })();
        })), (() => {
          const t = $9.cloneNode(!0);
          return p(t, () => u("sub_indicator", e.locale)), t;
        })(), j(() => ["MA", "EMA", "VOL", "MACD", "BOLL", "KDJ", "RSI", "BIAS", "BRAR", "CCI", "DMI", "CR", "PSY", "DMA", "TRIX", "OBV", "VR", "WR", "MTM", "EMV", "SAR", "SMA", "ROC", "PVT", "BBI", "AO"].map((t) => {
          const n = t in e.subIndicators;
          return (() => {
            const r = b9.cloneNode(!0);
            return r.$$click = (a) => {
              e.onSubIndicatorChange({
                name: t,
                paneId: e.subIndicators[t] ?? "",
                added: !n
              });
            }, p(r, m(v9, {
              checked: n,
              get label() {
                return u(t.toLowerCase(), e.locale);
              }
            })), r;
          })();
        }))];
      }
    });
  }
});
t1(["click"]);
function x9(e, t) {
  switch (e) {
    case "Etc/UTC":
      return u("utc", t);
    case "Pacific/Honolulu":
      return u("honolulu", t);
    case "America/Juneau":
      return u("juneau", t);
    case "America/Los_Angeles":
      return u("los_angeles", t);
    case "America/Chicago":
      return u("chicago", t);
    case "America/Toronto":
      return u("toronto", t);
    case "America/Sao_Paulo":
      return u("sao_paulo", t);
    case "Europe/London":
      return u("london", t);
    case "Europe/Berlin":
      return u("berlin", t);
    case "Asia/Bahrain":
      return u("bahrain", t);
    case "Asia/Dubai":
      return u("dubai", t);
    case "Asia/Ashkhabad":
      return u("ashkhabad", t);
    case "Asia/Almaty":
      return u("almaty", t);
    case "Asia/Bangkok":
      return u("bangkok", t);
    case "Asia/Shanghai":
      return u("shanghai", t);
    case "Asia/Tokyo":
      return u("tokyo", t);
    case "Australia/Sydney":
      return u("sydney", t);
    case "Pacific/Norfolk":
      return u("norfolk", t);
  }
  return e;
}
function Yl(e) {
  return [
    { key: "Etc/UTC", text: u("utc", e) },
    { key: "Pacific/Honolulu", text: u("honolulu", e) },
    { key: "America/Juneau", text: u("juneau", e) },
    { key: "America/Los_Angeles", text: u("los_angeles", e) },
    { key: "America/Chicago", text: u("chicago", e) },
    { key: "America/Toronto", text: u("toronto", e) },
    { key: "America/Sao_Paulo", text: u("sao_paulo", e) },
    { key: "Europe/London", text: u("london", e) },
    { key: "Europe/Berlin", text: u("berlin", e) },
    { key: "Asia/Bahrain", text: u("bahrain", e) },
    { key: "Asia/Dubai", text: u("dubai", e) },
    { key: "Asia/Ashkhabad", text: u("ashkhabad", e) },
    { key: "Asia/Almaty", text: u("almaty", e) },
    { key: "Asia/Bangkok", text: u("bangkok", e) },
    { key: "Asia/Shanghai", text: u("shanghai", e) },
    { key: "Asia/Tokyo", text: u("tokyo", e) },
    { key: "Australia/Sydney", text: u("sydney", e) },
    { key: "Pacific/Norfolk", text: u("norfolk", e) }
  ];
}
const Vl = (e) => {
  const [t, n] = $(e.timezone), r = j(() => Yl(e.locale));
  return m(T1, {
    get title() {
      return u("timezone", e.locale);
    },
    width: 320,
    get buttons() {
      return [{
        children: u("confirm", e.locale),
        onClick: () => {
          e.onConfirm(t()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      return m(u5, {
        style: {
          width: "100%",
          "margin-top": "20px"
        },
        get value() {
          return t().text;
        },
        onSelected: (a) => {
          n(a);
        },
        get dataSource() {
          return r();
        }
      });
    }
  });
};
function k9(e) {
  return [
    {
      key: "candle.type",
      text: u("candle_type", e),
      component: "select",
      dataSource: [
        { key: "candle_solid", text: u("candle_solid", e) },
        { key: "candle_stroke", text: u("candle_stroke", e) },
        { key: "candle_up_stroke", text: u("candle_up_stroke", e) },
        { key: "candle_down_stroke", text: u("candle_down_stroke", e) },
        { key: "ohlc", text: u("ohlc", e) },
        { key: "area", text: u("area", e) }
      ]
    },
    {
      key: "candle.priceMark.last.show",
      text: u("last_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.high.show",
      text: u("high_price_show", e),
      component: "switch"
    },
    {
      key: "candle.priceMark.low.show",
      text: u("low_price_show", e),
      component: "switch"
    },
    {
      key: "indicator.lastValueMark.show",
      text: u("indicator_last_value_show", e),
      component: "switch"
    },
    {
      key: "yAxis.type",
      text: u("price_axis_type", e),
      component: "select",
      dataSource: [
        { key: "normal", text: u("normal", e) },
        { key: "percentage", text: u("percentage", e) },
        { key: "log", text: u("log", e) }
      ]
    },
    {
      key: "yAxis.reverse",
      text: u("reverse_coordinate", e),
      component: "switch"
    },
    {
      key: "grid.show",
      text: u("grid_show", e),
      component: "switch"
    }
  ];
}
const Hl = /* @__PURE__ */ g('<div class="klinecharts-pro-setting-modal-content"></div>'), Gl = /* @__PURE__ */ g("<span></span>"), Xl = (e) => {
  const [t, n] = $(e.currentStyles), [r, a] = $(k9(e.locale));
  i1(() => {
    a(k9(e.locale));
  });
  const i = (o, s) => {
    const c = {};
    p0(c, o.key, s);
    const f = F.clone(t());
    p0(f, o.key, s), n(f), a(r().map((l) => ({
      ...l
    }))), e.onChange(c);
  };
  return m(T1, {
    get title() {
      return u("setting", e.locale);
    },
    width: 560,
    get buttons() {
      return [{
        children: u("restore_default", e.locale),
        onClick: () => {
          e.onRestoreDefault(r()), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const o = Hl.cloneNode(!0);
      return p(o, m(G5, {
        get each() {
          return r();
        },
        children: (s) => {
          let c;
          const f = F.formatValue(t(), s.key);
          switch (s.component) {
            case "select": {
              c = m(u5, {
                style: {
                  width: "120px"
                },
                get value() {
                  return u(f, e.locale);
                },
                get dataSource() {
                  return s.dataSource;
                },
                onSelected: (l) => {
                  const y = l.key;
                  i(s, y);
                }
              });
              break;
            }
            case "switch": {
              const l = !!f;
              c = m(Vr, {
                open: l,
                onChange: () => {
                  i(s, !l);
                }
              });
              break;
            }
          }
          return [(() => {
            const l = Gl.cloneNode(!0);
            return p(l, () => s.text), l;
          })(), c];
        }
      })), o;
    }
  });
}, Jl = /* @__PURE__ */ g('<img style="width:500px;margin-top: 20px">'), Wl = (e) => m(T1, {
  get title() {
    return u("screenshot", e.locale);
  },
  width: 540,
  get buttons() {
    return [{
      type: "confirm",
      children: u("save", e.locale),
      onClick: () => {
        const t = document.createElement("a");
        t.download = "screenshot", t.href = e.url, document.body.appendChild(t), t.click(), t.remove();
      }
    }];
  },
  get onClose() {
    return e.onClose;
  },
  get children() {
    const t = Jl.cloneNode(!0);
    return R(() => X(t, "src", e.url)), t;
  }
}), ql = {
  AO: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 5 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 34 }
  ],
  BIAS: [
    { paramNameKey: "BIAS1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "BIAS2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "BIAS3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "BIAS4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "BIAS5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ],
  BOLL: [
    { paramNameKey: "period", precision: 0, min: 1, default: 20 },
    { paramNameKey: "standard_deviation", precision: 2, min: 1, default: 2 }
  ],
  BRAR: [
    { paramNameKey: "period", precision: 0, min: 1, default: 26 }
  ],
  BBI: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 3 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 },
    { paramNameKey: "params_3", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_4", precision: 0, min: 1, default: 24 }
  ],
  CCI: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 20 }
  ],
  CR: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 26 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 10 },
    { paramNameKey: "params_3", precision: 0, min: 1, default: 20 },
    { paramNameKey: "params_4", precision: 0, min: 1, default: 40 },
    { paramNameKey: "params_5", precision: 0, min: 1, default: 60 }
  ],
  DMA: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 10 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 50 },
    { paramNameKey: "params_3", precision: 0, min: 1, default: 10 }
  ],
  DMI: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 14 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 }
  ],
  EMV: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 14 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 9 }
  ],
  EMA: [
    { paramNameKey: "EMA1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "EMA2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "EMA3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "EMA4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "EMA5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ],
  MTM: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 }
  ],
  MA: [
    { paramNameKey: "MA1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "MA2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "MA3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "MA4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "MA5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ],
  MACD: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 26 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 9 }
  ],
  OBV: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 30 }
  ],
  PVT: [],
  PSY: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 }
  ],
  ROC: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 }
  ],
  RSI: [
    { paramNameKey: "RSI1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "RSI2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "RSI3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "RSI4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "RSI5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ],
  SMA: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 2 }
  ],
  KDJ: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 9 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 3 },
    { paramNameKey: "params_3", precision: 0, min: 1, default: 3 }
  ],
  SAR: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 2 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 2 },
    { paramNameKey: "params_3", precision: 0, min: 1, default: 20 }
  ],
  TRIX: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 12 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 9 }
  ],
  VOL: [
    { paramNameKey: "MA1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "MA2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "MA3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "MA4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "MA5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ],
  VR: [
    { paramNameKey: "params_1", precision: 0, min: 1, default: 26 },
    { paramNameKey: "params_2", precision: 0, min: 1, default: 6 }
  ],
  WR: [
    { paramNameKey: "WR1", precision: 0, min: 1, styleKey: "lines[0].color" },
    { paramNameKey: "WR2", precision: 0, min: 1, styleKey: "lines[1].color" },
    { paramNameKey: "WR3", precision: 0, min: 1, styleKey: "lines[2].color" },
    { paramNameKey: "WR4", precision: 0, min: 1, styleKey: "lines[3].color" },
    { paramNameKey: "WR5", precision: 0, min: 1, styleKey: "lines[4].color" }
  ]
}, eu = /* @__PURE__ */ g('<div class="klinecharts-pro-indicator-setting-modal-content"></div>'), tu = /* @__PURE__ */ g("<span></span>"), nu = (e) => {
  const [t, n] = $(F.clone(e.params.calcParams)), r = (a) => ql[a];
  return m(T1, {
    get title() {
      return e.params.indicatorName;
    },
    width: 360,
    get buttons() {
      return [{
        type: "confirm",
        children: u("confirm", e.locale),
        onClick: () => {
          const a = r(e.params.indicatorName), i = [];
          F.clone(t()).forEach((o, s) => {
            !F.isValid(o) || o === "" ? "default" in a[s] && i.push(a[s].default) : i.push(o);
          }), e.onConfirm(i), e.onClose();
        }
      }];
    },
    get onClose() {
      return e.onClose;
    },
    get children() {
      const a = eu.cloneNode(!0);
      return p(a, () => r(e.params.indicatorName).map((i, o) => [(() => {
        const s = tu.cloneNode(!0);
        return p(s, () => u(i.paramNameKey, e.locale)), s;
      })(), m(C5, {
        style: {
          width: "200px"
        },
        get value() {
          return t()[o] ?? "";
        },
        get precision() {
          return i.precision;
        },
        get min() {
          return i.min;
        },
        onChange: (s) => {
          const c = F.clone(t());
          c[o] = s, n(c);
        }
      })])), a;
    }
  });
}, ru = /* @__PURE__ */ g('<svg viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"></path></svg>'), au = /* @__PURE__ */ g('<img alt="symbol">'), iu = /* @__PURE__ */ g("<li><div><span></span></div></li>"), su = (e) => {
  const [t, n] = $(""), [r] = j5(t, e.datafeed.searchSymbols.bind(e.datafeed));
  return m(T1, {
    get title() {
      return u("symbol_search", e.locale);
    },
    width: 460,
    get onClose() {
      return e.onClose;
    },
    get children() {
      return [m(C5, {
        class: "klinecharts-pro-symbol-search-modal-input",
        get placeholder() {
          return u("symbol_code", e.locale);
        },
        get suffix() {
          return ru.cloneNode(!0);
        },
        get value() {
          return t();
        },
        onChange: (a) => {
          const i = `${a}`;
          n(i);
        }
      }), m(t0, {
        class: "klinecharts-pro-symbol-search-modal-list",
        get loading() {
          return r.loading;
        },
        get dataSource() {
          return r() ?? [];
        },
        renderItem: (a) => (() => {
          const i = iu.cloneNode(!0), o = i.firstChild, s = o.firstChild;
          return i.$$click = () => {
            e.onSymbolSelected(a), e.onClose();
          }, p(o, m(Y, {
            get when() {
              return a.logo;
            },
            get children() {
              const c = au.cloneNode(!0);
              return R(() => X(c, "src", a.logo)), c;
            }
          }), s), p(s, () => a.shortName ?? a.ticker, null), p(s, () => `${a.name ? `(${a.name})` : ""}`, null), p(i, () => a.exchange ?? "", null), R(() => X(s, "title", a.name ?? "")), i;
        })()
      })];
    }
  });
};
t1(["click"]);
const ou = /* @__PURE__ */ g('<i class="icon-close klinecharts-pro-load-icon"></i>'), cu = /* @__PURE__ */ g('<div class="klinecharts-pro-content"><div class="klinecharts-pro-widget"></div></div>');
function z1(e, t, n, r) {
  return t === "VOL" && (r = {
    gap: {
      bottom: 2
    },
    ...r
  }), (e == null ? void 0 : e.createIndicator({
    name: t,
    // @ts-expect-error
    createTooltipDataSource: ({
      indicator: a,
      defaultStyles: i
    }) => {
      const o = [];
      return a.visible ? (o.push(i.tooltip.icons[1]), o.push(i.tooltip.icons[2]), o.push(i.tooltip.icons[3])) : (o.push(i.tooltip.icons[0]), o.push(i.tooltip.icons[2]), o.push(i.tooltip.icons[3])), {
        icons: o
      };
    }
  }, n, r)) ?? null;
}
let C = null;
const lu = (e) => {
  let t, n, r = !1;
  const [a, i] = $(e.theme), [o, s] = $(e.styles), [c, f] = $(e.locale), [l, y] = $(e.symbol), [v, b] = $(e.period), [w, B] = $(!1), [O, N] = $([...e.mainIndicators]), [Q, M] = $({}), [S, x] = $(!1), [E, G] = $({
    key: e.timezone,
    text: x9(e.timezone, e.locale)
  }), [l1, k] = $(!1), [K, Z] = $(), [e1, I1] = $(""), [f1, F1] = $(e.drawingBarVisible), [N1, K1] = $(!1), [u0, D1] = $(!1), [A, U] = $({
    visible: !1,
    indicatorName: "",
    paneId: "",
    calcParams: []
  });
  e.ref({
    setTheme: i,
    getTheme: () => a(),
    setStyles: s,
    getStyles: () => C.getStyles(),
    setLocale: f,
    getLocale: () => c(),
    setTimezone: (h) => {
      G({
        key: h,
        text: x9(e.timezone, c())
      });
    },
    getTimezone: () => E().key,
    setSymbol: y,
    getSymbol: () => l(),
    setPeriod: b,
    getPeriod: () => v()
  });
  const q = () => {
    C == null || C.resize();
  }, r1 = (h, d, _) => {
    let L = d, T = L;
    switch (h.timespan) {
      case "minute": {
        L = L - L % (60 * 1e3), T = L - _ * h.multiplier * 60 * 1e3;
        break;
      }
      case "hour": {
        L = L - L % (60 * 60 * 1e3), T = L - _ * h.multiplier * 60 * 60 * 1e3;
        break;
      }
      case "day": {
        L = L - L % (60 * 60 * 1e3), T = L - _ * h.multiplier * 24 * 60 * 60 * 1e3;
        break;
      }
      case "week": {
        const J = new Date(L).getDay(), g1 = J === 0 ? 6 : J - 1;
        L = L - g1 * 60 * 60 * 24;
        const p1 = new Date(L);
        L = (/* @__PURE__ */ new Date(`${p1.getFullYear()}-${p1.getMonth() + 1}-${p1.getDate()}`)).getTime(), T = _ * h.multiplier * 7 * 24 * 60 * 60 * 1e3;
        break;
      }
      case "month": {
        const a1 = new Date(L), J = a1.getFullYear(), g1 = a1.getMonth() + 1;
        L = (/* @__PURE__ */ new Date(`${J}-${g1}-01`)).getTime(), T = _ * h.multiplier * 30 * 24 * 60 * 60 * 1e3;
        const p1 = new Date(T);
        T = (/* @__PURE__ */ new Date(`${p1.getFullYear()}-${p1.getMonth() + 1}-01`)).getTime();
        break;
      }
      case "year": {
        const J = new Date(L).getFullYear();
        L = (/* @__PURE__ */ new Date(`${J}-01-01`)).getTime(), T = _ * h.multiplier * 365 * 24 * 60 * 60 * 1e3;
        const g1 = new Date(T);
        T = (/* @__PURE__ */ new Date(`${g1.getFullYear()}-01-01`)).getTime();
        break;
      }
    }
    return [T, L];
  };
  return S9(() => {
    if (window.addEventListener("resize", q), C = h5(t, {
      customApi: {
        formatDate: (d, _, L, T) => {
          switch (v().timespan) {
            case "minute":
              return T === j1.XAxis ? F.formatDate(d, _, "HH:mm") : F.formatDate(d, _, "YYYY-MM-DD HH:mm");
            case "hour":
              return T === j1.XAxis ? F.formatDate(d, _, "MM-DD HH:mm") : F.formatDate(d, _, "YYYY-MM-DD HH:mm");
            case "day":
            case "week":
              return F.formatDate(d, _, "YYYY-MM-DD");
            case "month":
              return T === j1.XAxis ? F.formatDate(d, _, "YYYY-MM") : F.formatDate(d, _, "YYYY-MM-DD");
            case "year":
              return T === j1.XAxis ? F.formatDate(d, _, "YYYY") : F.formatDate(d, _, "YYYY-MM-DD");
          }
          return F.formatDate(d, _, "YYYY-MM-DD HH:mm");
        }
      }
    }), C) {
      const d = C.getDom("candle_pane", K0.Main);
      if (d) {
        let L = document.createElement("div");
        if (L.className = "klinecharts-pro-watermark", F.isString(e.watermark)) {
          const T = e.watermark.replace(/(^\s*)|(\s*$)/g, "");
          L.innerHTML = T;
        } else
          L.appendChild(e.watermark);
        d.appendChild(L);
      }
      const _ = C.getDom("candle_pane", K0.YAxis);
      n = document.createElement("span"), n.className = "klinecharts-pro-price-unit", _ == null || _.appendChild(n);
    }
    O().forEach((d) => {
      z1(C, d, !0, {
        id: "candle_pane"
      });
    });
    const h = {};
    e.subIndicators.forEach((d) => {
      const _ = z1(C, d, !0);
      _ && (h[d] = _);
    }), M(h), C == null || C.loadMore((d) => {
      r = !0, (async () => {
        const L = v(), [T] = r1(L, d, 1), [a1] = r1(L, T, 500), J = await e.datafeed.getHistoryKLineData(l(), L, a1, T);
        C == null || C.applyMoreData(J, J.length > 0), r = !1;
      })();
    }), C == null || C.subscribeAction(y5.OnTooltipIconClick, (d) => {
      if (d.indicatorName)
        switch (d.iconId) {
          case "visible": {
            C == null || C.overrideIndicator({
              name: d.indicatorName,
              visible: !0
            }, d.paneId);
            break;
          }
          case "invisible": {
            C == null || C.overrideIndicator({
              name: d.indicatorName,
              visible: !1
            }, d.paneId);
            break;
          }
          case "setting": {
            const _ = C == null ? void 0 : C.getIndicatorByPaneId(d.paneId, d.indicatorName);
            U({
              visible: !0,
              indicatorName: d.indicatorName,
              paneId: d.paneId,
              calcParams: _.calcParams
            });
            break;
          }
          case "close":
            if (d.paneId === "candle_pane") {
              const _ = [...O()];
              C == null || C.removeIndicator("candle_pane", d.indicatorName), _.splice(_.indexOf(d.indicatorName), 1), N(_);
            } else {
              const _ = {
                ...Q()
              };
              C == null || C.removeIndicator(d.paneId, d.indicatorName), delete _[d.indicatorName], M(_);
            }
        }
    });
  }), k0(() => {
    window.removeEventListener("resize", q), m5(t);
  }), i1(() => {
    const h = l();
    h != null && h.priceCurrency ? (n.innerHTML = h == null ? void 0 : h.priceCurrency.toLocaleUpperCase(), n.style.display = "flex") : n.style.display = "none", C == null || C.setPriceVolumePrecision((h == null ? void 0 : h.pricePrecision) ?? 2, (h == null ? void 0 : h.volumePrecision) ?? 0);
  }), i1((h) => {
    if (!r) {
      h && e.datafeed.unsubscribe(h.symbol, h.period);
      const d = l(), _ = v();
      return r = !0, D1(!0), (async () => {
        const [T, a1] = r1(_, (/* @__PURE__ */ new Date()).getTime(), 500), J = await e.datafeed.getHistoryKLineData(d, _, T, a1);
        C == null || C.applyNewData(J, J.length > 0), e.datafeed.subscribe(d, _, (g1) => {
          C == null || C.updateData(g1);
        }), r = !1, D1(!1);
      })(), {
        symbol: d,
        period: _
      };
    }
    return h;
  }), i1(() => {
    const h = a();
    C == null || C.setStyles(h);
    const d = h === "dark" ? "#929AA5" : "#76808F";
    C == null || C.setStyles({
      indicator: {
        tooltip: {
          icons: [{
            id: "visible",
            position: Z1.Middle,
            marginLeft: 8,
            marginTop: 7,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: 14,
            color: d,
            activeColor: d,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "invisible",
            position: Z1.Middle,
            marginLeft: 8,
            marginTop: 7,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: 14,
            color: d,
            activeColor: d,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "setting",
            position: Z1.Middle,
            marginLeft: 6,
            marginTop: 7,
            marginBottom: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: 14,
            color: d,
            activeColor: d,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }, {
            id: "close",
            position: Z1.Middle,
            marginLeft: 6,
            marginTop: 7,
            marginRight: 0,
            marginBottom: 0,
            paddingLeft: 0,
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            icon: "",
            fontFamily: "icomoon",
            size: 14,
            color: d,
            activeColor: d,
            backgroundColor: "transparent",
            activeBackgroundColor: "rgba(22, 119, 255, 0.15)"
          }]
        }
      }
    });
  }), i1(() => {
    C == null || C.setLocale(c());
  }), i1(() => {
    C == null || C.setTimezone(E().key);
  }), i1(() => {
    o() && (C == null || C.setStyles(o()), Z(xr(C.getStyles())));
  }), [ou.cloneNode(!0), m(Y, {
    get when() {
      return N1();
    },
    get children() {
      return m(su, {
        get locale() {
          return e.locale;
        },
        get datafeed() {
          return e.datafeed;
        },
        onSymbolSelected: (h) => {
          y(h);
        },
        onClose: () => {
          K1(!1);
        }
      });
    }
  }), m(Y, {
    get when() {
      return w();
    },
    get children() {
      return m(Ul, {
        get locale() {
          return e.locale;
        },
        get mainIndicators() {
          return O();
        },
        get subIndicators() {
          return Q();
        },
        onClose: () => {
          B(!1);
        },
        onMainIndicatorChange: (h) => {
          const d = [...O()];
          h.added ? (z1(C, h.name, !0, {
            id: "candle_pane"
          }), d.push(h.name)) : (C == null || C.removeIndicator("candle_pane", h.name), d.splice(d.indexOf(h.name), 1)), N(d);
        },
        onSubIndicatorChange: (h) => {
          const d = {
            ...Q()
          };
          if (h.added) {
            const _ = z1(C, h.name);
            _ && (d[h.name] = _);
          } else
            h.paneId && (C == null || C.removeIndicator(h.paneId, h.name), delete d[h.name]);
          M(d);
        }
      });
    }
  }), m(Y, {
    get when() {
      return S();
    },
    get children() {
      return m(Vl, {
        get locale() {
          return e.locale;
        },
        get timezone() {
          return E();
        },
        onClose: () => {
          x(!1);
        },
        onConfirm: G
      });
    }
  }), m(Y, {
    get when() {
      return l1();
    },
    get children() {
      return m(Xl, {
        get locale() {
          return e.locale;
        },
        get currentStyles() {
          return F.clone(C.getStyles());
        },
        onClose: () => {
          k(!1);
        },
        onChange: (h) => {
          C == null || C.setStyles(h);
        },
        onRestoreDefault: (h) => {
          const d = {};
          h.forEach((_) => {
            const L = _.key;
            p0(d, L, F.formatValue(K(), L));
          }), C == null || C.setStyles(d);
        }
      });
    }
  }), m(Y, {
    get when() {
      return e1().length > 0;
    },
    get children() {
      return m(Wl, {
        get locale() {
          return e.locale;
        },
        get url() {
          return e1();
        },
        onClose: () => {
          I1("");
        }
      });
    }
  }), m(Y, {
    get when() {
      return A().visible;
    },
    get children() {
      return m(nu, {
        get locale() {
          return e.locale;
        },
        get params() {
          return A();
        },
        onClose: () => {
          U({
            visible: !1,
            indicatorName: "",
            paneId: "",
            calcParams: []
          });
        },
        onConfirm: (h) => {
          const d = A();
          C == null || C.overrideIndicator({
            name: d.indicatorName,
            calcParams: h
          }, d.paneId);
        }
      });
    }
  }), m(dc, {
    get locale() {
      return e.locale;
    },
    get symbol() {
      return l();
    },
    get spread() {
      return f1();
    },
    get period() {
      return v();
    },
    get periods() {
      return e.periods;
    },
    onMenuClick: async () => {
      try {
        await Z5(() => F1(!f1())), C == null || C.resize();
      } catch {
      }
    },
    onSymbolClick: () => {
      K1(!N1());
    },
    onPeriodChange: b,
    onIndicatorClick: () => {
      B((h) => !h);
    },
    onTimezoneClick: () => {
      x((h) => !h);
    },
    onSettingClick: () => {
      k((h) => !h);
    },
    onScreenshotClick: () => {
      if (C) {
        const h = C.getConvertPictureUrl(!0, "jpeg", e.theme === "dark" ? "#151517" : "#ffffff");
        I1(h);
      }
    }
  }), (() => {
    const h = cu.cloneNode(!0), d = h.firstChild;
    p(h, m(Y, {
      get when() {
        return u0();
      },
      get children() {
        return m(l5, {});
      }
    }), d), p(h, m(Y, {
      get when() {
        return f1();
      },
      get children() {
        return m(zl, {
          get locale() {
            return e.locale;
          },
          onDrawingItemClick: (L) => {
            C == null || C.createOverlay(L);
          },
          onModeChange: (L) => {
            C == null || C.overrideOverlay({
              mode: L
            });
          },
          onLockChange: (L) => {
            C == null || C.overrideOverlay({
              lock: L
            });
          },
          onVisibleChange: (L) => {
            C == null || C.overrideOverlay({
              visible: L
            });
          },
          onRemoveClick: (L) => {
            C == null || C.removeOverlay({
              groupId: L
            });
          }
        });
      }
    }), d);
    const _ = t;
    return typeof _ == "function" ? A0(_, d) : t = d, R(() => X(d, "data-drawing-bar-visible", f1())), h;
  })()];
}, uu = /* @__PURE__ */ g('<svg class="logo" viewBox="0 0 80 92"><path d="M28.148808359375,51.7280513671875L22.963588359375,51.7280513671875C21.572648359375002,51.7280513671875,20.445068359375,52.6220613671875,20.445068359375,53.7248813671875L20.445068359375,72.3979013671875C20.445068359375,73.5007013671875,21.572648359375002,74.39470136718751,22.963588359375,74.39470136718751L33.926568359375,74.39470136718751C35.317468359375,74.39470136718751,36.445068359375,73.5007013671875,36.445068359375,72.3979013671875L36.445068359375,53.7248813671875C36.445068359375,52.6220613671875,35.317468359375,51.7280513671875,33.926568359375,51.7280513671875L28.741398359374998,51.7280513671875L28.741398359374998,46.2963223671875C28.741398359374998,46.1665793671875,28.608748359375,46.0614013671875,28.445108359375,46.0614013671875C28.281468359375,46.0614013671875,28.148808359375,46.1665793671875,28.148808359375,46.2963223671875L28.148808359375,51.7280513671875ZM28.741398359374998,74.3948013671875L28.741398359374998,79.82650136718749C28.741398359374998,79.9563013671875,28.608748359375,80.0614013671875,28.445108359375,80.0614013671875C28.281468359375,80.0614013671875,28.148808359375,79.9563013671875,28.148808359375,79.82650136718749L28.148808359375,74.3948013671875L28.741398359374998,74.3948013671875Z"></path><path d="M51.148808359374996,44.7280513671875L45.963588359375,44.7280513671875C44.572648359375,44.7280513671875,43.445068359375,45.6220613671875,43.445068359375,46.7248813671875L43.445068359375,65.3979013671875C43.445068359375,66.5007013671875,44.572648359375,67.39470136718751,45.963588359375,67.39470136718751L56.926568359375,67.39470136718751C58.317468359375,67.39470136718751,59.445068359375,66.5007013671875,59.445068359375,65.3979013671875L59.445068359375,46.7248813671875C59.445068359375,45.6220613671875,58.317468359375,44.7280513671875,56.926568359375,44.7280513671875L51.741398359375,44.7280513671875L51.741398359375,39.2963223671875C51.741398359375,39.1665793671875,51.608748359375,39.0614013671875,51.445108359375,39.0614013671875C51.281468359375,39.0614013671875,51.148808359374996,39.1665793671875,51.148808359374996,39.2963223671875L51.148808359374996,44.7280513671875ZM51.741398359375,67.3948013671875L51.741398359375,72.82650136718749C51.741398359375,72.9563013671875,51.608748359375,73.0614013671875,51.445108359375,73.0614013671875C51.281468359375,73.0614013671875,51.148808359374996,72.9563013671875,51.148808359374996,72.82650136718749L51.148808359374996,67.3948013671875L51.741398359375,67.3948013671875Z"></path><path d="M17.7274,90.6541C17.5901,90.6541,17.4517,90.6436,17.3121,90.6225C9.93219,89.5095,4.80718,86.7136,2.07787,82.3084C-1.1223,77.1437,0.241766,71.6314,0.56829,70.5137C5.37624,46.647,15.0785,38.4945,21.5025,33.0957C22.9683,31.8633,24.2342,30.7995,25.1676,29.7672C25.4105,29.4984,25.6051,29.2154,25.7556,28.9202C24.7465,29.2231,24.1971,29.4326,24.1703,29.4429C22.908,29.9368,21.4777,29.3247,20.9761,28.076C20.4756,26.8272,21.0897,25.4146,22.352,24.9172C22.5042,24.8571,23.5312,24.4607,25.3073,23.9616C24.087,21.4425,21.7693,18.7949,19.7125,16.6431L19.2819,16.1902C16.2438,12.9776,14.6017,4.80159,14.3036,3.19471C14.1306,2.26212,14.4636,1.30796,15.1814,0.679657C15.8995,0.0512175,16.8976,-0.159672,17.8125,0.123747C22.7731,1.66274,24.2638,1.81255,27.2321,2.11098C28.7357,2.26195,29.83,3.59029,29.6762,5.07662C29.5236,6.56295,28.182,7.64786,26.6784,7.49454C24.4992,7.27569,22.9517,7.09896,20.724,6.56646C21.4493,9.09088,22.3803,11.5427,23.2771,12.4919L23.6876,12.9237C25.3757,14.69,28.9691,18.45,30.7016,22.7299C35.0392,21.9433,40.8791,21.3359,47.7817,21.7249C48.2004,20.7386,48.8054,19.7953,49.5907,18.9135C49.7137,18.7754,49.8498,18.6502,49.9988,18.539C53.6142,15.8508,57.5491,12.857,59.7803,11.0758C58.1028,11.2502,56.1034,11.0278,53.9124,9.70882C53.2439,9.30622,52.5992,8.89427,51.9662,8.48933C48.4668,6.25164,46.497,5.12109,43.4234,5.94853C41.9647,6.34058,40.4622,5.48975,40.0659,4.04789C39.6695,2.60604,40.5296,1.11853,41.9871,0.726471C47.5602,-0.773825,51.4796,1.73271,54.9364,3.9434L54.9364,3.9434C55.5284,4.32176,56.1318,4.70797,56.7564,5.08482C58.3843,6.06556,59.4858,5.76127,61.2899,5.13865C62.3511,4.77234,63.5567,4.35687,64.8675,4.53476C66.3321,4.73254,67.4406,5.56933,67.9103,6.83096C68.7444,9.07333,67.1035,11.5533,65.5797,13.2374C64.6729,14.2394,60.0845,17.7606,56.4519,20.4957C56.9477,20.3369,57.4767,20.2511,58.026,20.2511C59.4281,20.2511,60.6982,20.8102,61.621,21.7153C65.4948,20.6901,67.87,17.9563,67.9033,17.9175C68.78,16.8888,70.3322,16.7577,71.3721,17.6226C72.412,18.4886,72.5457,20.0253,71.6702,21.054C71.5221,21.2286,69.5063,23.5492,66.0787,25.233C69.5399,26.8822,72.9993,29.682,74.1841,34.4145C74.5106,35.7206,73.7062,37.0407,72.3859,37.3638C72.1871,37.4117,71.9884,37.4351,71.792,37.4351C70.687,37.4351,69.6826,36.6932,69.4046,35.5848C68.4378,31.7217,64.8144,29.7431,61.7619,28.7456C60.8298,29.7349,59.5009,30.3535,58.026,30.3535C55.8642,30.3535,54.0162,29.0245,53.2713,27.1474C53.2022,27.138,53.1331,27.1287,53.0642,27.1195C54.232,29.5936,57.0851,31.9259,58.1868,32.665C58.3157,32.7516,58.4423,32.8523,58.5547,32.9599C66.5865,40.6151,72.4887,48.8133,76.0971,57.3287C76.6815,58.7074,76.0249,60.2932,74.6313,60.8702C74.2976,61.01,73.9388,61.082,73.576,61.082C72.5065,61.082,71.4914,60.4582,71.0525,59.4213C67.7577,51.6455,62.331,44.1074,54.9203,37.0116C53.6073,36.1009,48.0984,31.9917,47.2065,26.583C40.9421,26.2679,35.6187,26.8278,31.6725,27.5336C31.6197,29.527,30.9225,31.5172,29.2456,33.3731C28.0614,34.6827,26.5968,35.915,25.0446,37.2188C21.9414,39.8269,18.2648,42.9169,14.8104,48.1192C11.356,53.3215,8.12389,60.6361,5.9098,71.6934C5.88732,71.8035,5.85893,71.9123,5.82344,72.0188C5.81634,72.041,4.57886,76.0413,6.77344,79.5289C8.6332,82.4828,12.4557,84.4139,18.1367,85.2705C19.6297,85.4953,20.6566,86.8762,20.4295,88.3532C20.2213,89.6944,19.0559,90.6541,17.7274,90.6541ZM35.1195,7.03101C33.3502,7.03101,31.9158,5.61208,31.9158,3.86173C31.9158,2.11139,33.3502,0.69245,35.1195,0.69245C36.8889,0.69245,38.3233,2.11139,38.3233,3.86173C38.3233,5.61208,36.8889,7.03101,35.1195,7.03101ZM57.6848,23.1892L58.414,24.4754C58.8984,24.3623,59.3923,24.3435,59.8644,24.4203C60.2191,24.5005,60.5087,24.7182,60.6663,25.0229C60.8636,25.3394,60.8993,25.7346,60.7646,26.1094C60.5988,26.5176,60.2972,26.8749,59.9085,27.1235L60.31,27.8316L59.7886,28.1294L59.3994,27.443C58.9257,27.7175,58.399,27.883,57.8664,27.9247L57.3744,27.0569C57.6378,27.0741,57.9071,27.048,58.1704,26.9797C58.4501,26.9251,58.7239,26.8323,58.9829,26.7044L58.2801,25.4647C57.8047,25.5877,57.3167,25.6065,56.8549,25.5197C56.4913,25.4263,56.196,25.1971,56.0328,24.8814C55.8433,24.5561,55.8127,24.1572,55.9484,23.7789C56.088,23.373,56.3763,23.0149,56.7584,22.7726L56.4166,22.1699L56.938,21.8721L57.2727,22.4625C57.6615,22.2376,58.0888,22.0901,58.5254,22.0301L59.0042,22.8746C58.5548,22.8828,58.103,22.9906,57.6848,23.1892ZM56.9319,24.2961Q57.1278,24.6417,57.7863,24.5856L57.1695,23.4978Q56.6982,23.884,56.9319,24.2961ZM58.9077,25.3462L59.4981,26.3875L59.499,26.3891Q59.9965,26.0045,59.7628,25.5923Q59.573,25.2576,58.9077,25.3462ZM73.2212,66.5065C73.2212,68.2569,74.6555,69.6758,76.4249,69.6758C78.1943,69.6758,79.6286,68.2569,79.6286,66.5065C79.6286,64.7562,78.1943,63.3372,76.4249,63.3372C74.6555,63.3372,73.2212,64.7562,73.2212,66.5065ZM35.9465,91.8045C35.0734,91.8045,34.2038,91.7987,33.3378,91.7858C31.827,91.7636,30.6203,90.5359,30.6428,89.0402C30.6653,87.5457,31.9158,86.3297,33.4183,86.3742C49.6344,86.6059,65.7512,84.6175,67.6134,84.037C72.1953,82.4184,74.5295,79.3603,74.5295,74.9575C74.5295,73.463,75.754,72.2517,77.2648,72.2517C78.7755,72.2517,80,73.463,80,74.9575C80,81.5992,76.148,86.7686,69.4317,89.142C67.0041,89.9999,51.0955,91.8046,35.9465,91.8045ZM25.2731,92C23.5037,92,22.0693,90.5811,22.0693,88.8307C22.0693,87.0804,23.5037,85.6615,25.2731,85.6615C27.0424,85.6615,28.4768,87.0804,28.4768,88.8307C28.4768,90.5811,27.0424,92,25.2731,92Z"></path></svg>'), Cu = uu.cloneNode(!0);
class yu {
  constructor(t) {
    P1(this, "_chartApi", null);
    if (F.isString(t.container)) {
      if (this._container = document.getElementById(t.container), !this._container)
        throw new Error("Container is null");
    } else
      this._container = t.container;
    this._container.classList.add("klinecharts-pro"), this._container.setAttribute("data-theme", t.theme ?? "light");
    const n = this;
    J5(() => m(lu, {
      ref: (r) => {
        n._chartApi = r;
      },
      get styles() {
        return t.styles ?? {};
      },
      get watermark() {
        return t.watermark ?? Cu;
      },
      get theme() {
        return t.theme ?? "light";
      },
      get locale() {
        return t.locale ?? "zh-CN";
      },
      get drawingBarVisible() {
        return t.drawingBarVisible ?? !0;
      },
      get symbol() {
        return t.symbol;
      },
      get period() {
        return t.period;
      },
      get periods() {
        return t.periods ?? [{
          multiplier: 1,
          timespan: "minute",
          text: "1m"
        }, {
          multiplier: 5,
          timespan: "minute",
          text: "5m"
        }, {
          multiplier: 15,
          timespan: "minute",
          text: "15m"
        }, {
          multiplier: 1,
          timespan: "hour",
          text: "1H"
        }, {
          multiplier: 2,
          timespan: "hour",
          text: "2H"
        }, {
          multiplier: 4,
          timespan: "hour",
          text: "4H"
        }, {
          multiplier: 1,
          timespan: "day",
          text: "D"
        }, {
          multiplier: 1,
          timespan: "week",
          text: "W"
        }, {
          multiplier: 1,
          timespan: "month",
          text: "M"
        }, {
          multiplier: 1,
          timespan: "year",
          text: "Y"
        }];
      },
      get timezone() {
        return t.timezone ?? "Asia/Shanghai";
      },
      get mainIndicators() {
        return t.mainIndicators ?? ["MA"];
      },
      get subIndicators() {
        return t.subIndicators ?? ["VOL"];
      },
      get datafeed() {
        return t.datafeed;
      }
    }), this._container);
  }
  setTheme(t) {
    var n;
    (n = this._container) == null || n.setAttribute("data-theme", t), this._chartApi.setTheme(t);
  }
  getTheme() {
    return this._chartApi.getTheme();
  }
  setStyles(t) {
    this._chartApi.setStyles(t);
  }
  getStyles() {
    return this._chartApi.getStyles();
  }
  setLocale(t) {
    this._chartApi.setLocale(t);
  }
  getLocale() {
    return this._chartApi.getLocale();
  }
  setTimezone(t) {
    this._chartApi.setTimezone(t);
  }
  getTimezone() {
    return this._chartApi.getTimezone();
  }
  setSymbol(t) {
    this._chartApi.setSymbol(t);
  }
  getSymbol() {
    return this._chartApi.getSymbol();
  }
  setPeriod(t) {
    this._chartApi.setPeriod(t);
  }
  getPeriod() {
    return this._chartApi.getPeriod();
  }
  getChartApi() {
    return this._chartApi;
  }
  getInstance() {
    return C;
  }
}
O5.forEach((e) => {
  p5(e);
});
export {
  du as DefaultDatafeed,
  yu as KLineChartPro,
  hu as loadLocales
};
//# sourceMappingURL=klinecharts-pro.js.map
