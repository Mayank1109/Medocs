// hooks/data-fetching/useVitalsTrends.js
import { useEffect, useState } from "react";
import { getMetricTrends } from "../../services/metricService";

const TRACKED_TESTS = [
  { key: "bp_systolic", testName: "blood_pressure_systolic" },
  { key: "bp_diastolic", testName: "blood_pressure_diastolic" },
  { key: "sugar", testName: "glucose" },
  { key: "weight", testName: "weight" },
  { key: "heart", testName: "heart_rate" },
];

function toDateLabel(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function trendLabel(series) {
  if (series.length < 2) return "→ Stable";
  const first = series[0].value;
  const last = series[series.length - 1].value;
  if (last < first) return "↓ Improving";
  if (last > first) return "↑ Rising";
  return "→ Stable";
}

// Multiple readings can land on the same calendar day (e.g. two
// documents analyzed from the same visit). Average them for display
// rather than silently picking whichever one iteration happened to
// keep — there's no reliable "most recent" signal without a real
// timestamp, so averaging is the honest choice here.
function aggregateByDate(series) {
  const byDate = new Map();
  series.forEach((p) => {
    const d = p.date.slice(0, 10);
    if (!byDate.has(d)) byDate.set(d, []);
    byDate.get(d).push(p.value);
  });
  const dates = [...byDate.keys()].sort();
  return {
    dates,
    values: dates.map((d) => {
      const vals = byDate.get(d);
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      return Math.round(avg * 10) / 10;
    }),
  };
}

export function useVitalsTrends() {
  const [seriesByKey, setSeriesByKey] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      setLoading(true);
      try {
        const results = await Promise.all(
          TRACKED_TESTS.map((t) => getMetricTrends(t.testName)),
        );
        if (cancelled) return;

        const map = {};
        TRACKED_TESTS.forEach((t, i) => {
          map[t.key] = results[i].data.data.series;
        });
        setSeriesByKey(map);
        setError(null);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, []);

  const bpSystolic = seriesByKey.bp_systolic || [];
  const bpDiastolic = seriesByKey.bp_diastolic || [];
  const sugar = seriesByKey.sugar || [];
  const weight = seriesByKey.weight || [];
  const heart = seriesByKey.heart || [];

  const latestBpSys = bpSystolic.at(-1)?.value;
  const latestBpDia = bpDiastolic.at(-1)?.value;

  const statCards = [
    {
      key: "bp",
      title: "Blood Pressure",
      value: latestBpSys && latestBpDia ? `${latestBpSys}/${latestBpDia}` : "—",
      unit: "mmHg",
      trend: trendLabel(bpSystolic),
      tone: "good",
      color: "#1d9e75",
      data: bpSystolic.map((p) => p.value),
      yMin: 100,
      yMax: 160,
      xStart: bpSystolic[0] ? toDateLabel(bpSystolic[0].date) : "",
      xEnd: bpSystolic.at(-1) ? toDateLabel(bpSystolic.at(-1).date) : "",
    },
    {
      key: "sugar",
      title: "Blood Sugar",
      value: sugar.at(-1)?.value ?? "—",
      unit: "mg/dL",
      trend: trendLabel(sugar),
      tone: "warn",
      color: "#ef9f27",
      data: sugar.map((p) => p.value),
      yMin: 60,
      yMax: 160,
      xStart: sugar[0] ? toDateLabel(sugar[0].date) : "",
      xEnd: sugar.at(-1) ? toDateLabel(sugar.at(-1).date) : "",
    },
    {
      key: "weight",
      title: "Weight",
      value: weight.at(-1)?.value ?? "—",
      unit: "kg",
      trend: trendLabel(weight),
      tone: "good",
      color: "#378add",
      data: weight.map((p) => p.value),
      yMin: weight.length ? Math.min(...weight.map((p) => p.value)) - 2 : 0,
      yMax: weight.length ? Math.max(...weight.map((p) => p.value)) + 2 : 100,
      xStart: weight[0] ? toDateLabel(weight[0].date) : "",
      xEnd: weight.at(-1) ? toDateLabel(weight.at(-1).date) : "",
    },
    {
      key: "heart",
      title: "Heart Rate",
      value: heart.at(-1)?.value ?? "—",
      unit: "bpm",
      trend: trendLabel(heart),
      tone: "good",
      color: "#a78bfa",
      data: heart.map((p) => p.value),
      yMin: 40,
      yMax: 120,
      xStart: heart[0] ? toDateLabel(heart[0].date) : "",
      xEnd: heart.at(-1) ? toDateLabel(heart.at(-1).date) : "",
    },
  ];

  // Aggregate each series by date first (handles same-day collisions),
  // then union all resulting dates for a shared x-axis.
  const aggSys = aggregateByDate(bpSystolic);
  const aggDia = aggregateByDate(bpDiastolic);
  const aggSugar = aggregateByDate(sugar);
  const aggWeight = aggregateByDate(weight);
  const aggHeart = aggregateByDate(heart);

  const allDates = [
    ...new Set([
      ...aggSys.dates,
      ...aggDia.dates,
      ...aggSugar.dates,
      ...aggWeight.dates,
      ...aggHeart.dates,
    ]),
  ].sort();

  function alignToAxis(agg) {
    const map = new Map(agg.dates.map((d, i) => [d, agg.values[i]]));
    return allDates.map((d) => map.get(d) ?? null);
  }

  const trendSeries = [
    {
      key: "bp_sys",
      label: "Blood Pressure - systolic (mmHg)",
      color: "#1d9e75",
      data: alignToAxis(aggSys),
    },
    {
      key: "bp_dia",
      label: "Blood Pressure - diastolic (mmHg)",
      color: "#1d9e75",
      dashed: true,
      data: alignToAxis(aggDia),
    },
    {
      key: "sugar",
      label: "Blood Sugar (mg/dL)",
      color: "#ef9f27",
      data: alignToAxis(aggSugar),
    },
    {
      key: "weight",
      label: "Weight (kg)",
      color: "#378add",
      data: alignToAxis(aggWeight),
    },
    {
      key: "heart",
      label: "Heart Rate (bpm)",
      color: "#a78bfa",
      data: alignToAxis(aggHeart),
    },
  ];

  const measurements = allDates
    .slice()
    .reverse()
    .map((d, revIdx) => {
      const idx = allDates.length - 1 - revIdx;
      const sys = alignToAxis(aggSys)[idx];
      const dia = alignToAxis(aggDia)[idx];
      const s = alignToAxis(aggSugar)[idx];
      const w = alignToAxis(aggWeight)[idx];
      const h = alignToAxis(aggHeart)[idx];
      return {
        date: toDateLabel(d),
        bp: sys != null && dia != null ? `${sys}/${dia}` : "—",
        sugar: s != null ? `${s} mg/dL` : "—",
        weight: w != null ? `${w} kg` : "—",
        heart: h != null ? `${h} bpm` : "—",
      };
    });

  return {
    statCards,
    dates: allDates.map(toDateLabel),
    trendSeries,
    measurements,
    loading,
    error,
    hasData: allDates.length > 0,
  };
}
