import type { RouteObject } from "react-router-dom";
import CSVAnalyticsPage from "../../pages/csv-analysis/ui";
import CSVGeneratorPage from "../../pages/csv-generator/ui";
import HistoryPage from "../../pages/history/ui";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: CSVAnalyticsPage,
  },
  {
    path: "/csv-analytics",
    Component: CSVAnalyticsPage,
  },
  {
    path: "/csv-generator",
    Component: CSVGeneratorPage,
  },
  {
    path: "/history",
    Component: HistoryPage,
  },
];