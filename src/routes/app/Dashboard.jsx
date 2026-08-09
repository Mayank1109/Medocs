import Sidebar from "../../components/layout/Sidebar";
import AskAiPanel from "../../components/dashboard/AskAiPanel";
import HealthTimeline from "../../components/dashboard/HealthTimeline";
import HealthTrendChart from "../../components/dashboard/HealthTrendChart";
import RecentReports from "../../components/dashboard/RecentReports";
import {
  IconUpload,
  IconBell,
  IconSun,
  UploadIcon,
} from "../../icons/HeroIcons";
import { AI_SUMMARY_ITEMS, TIMELINE } from "../../data/DashboardPageContent";
import "./Dashboard.css";
import { modalDisplayHandler } from "../../utility/Functions";

export default function DashboardPage() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-header__title">
            Good morning, Mayank{" "}
            <span className="page-header__sun">
              <IconSun />
            </span>
          </h1>
          <p className="page-header__subtitle">
            Here's your health summary for today · Jun 7, 2026
          </p>
        </div>
        <div className="page-header__actions">
          <button
            type="button"
            className="icon-button icon-button--ghost"
            aria-label="Notifications"
          >
            <IconBell />
            <span className="icon-button__dot" />
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={(event) => modalDisplayHandler(event, "Upload")}
          >
            <UploadIcon />
            Upload document
          </button>
        </div>
      </div>

      <AskAiPanel items={AI_SUMMARY_ITEMS} />

      <div className="panels-grid">
        <HealthTimeline items={TIMELINE} />
        <HealthTrendChart />
      </div>

      <RecentReports />
    </>
  );
}
