import React from "react";
import {
  IconStar,
  IconFileImage,
  IconFilePdf,
  IconEye,
  IconShare,
  IconDownload,
  IconMoreVertical,
  IconSparkleSmall,
} from "../../icons/AppIcons";

export default function DocumentRow({
  doc,
  view,
  isStarred,
  onToggleStar,
  getAccent,
}) {
  const accent = getAccent(doc);
  const isImage = ["JPG", "JPEG", "PNG", "GIF", "WEBP"].includes(
    doc.fileType.toUpperCase(),
  );

  return (
    <div className={`doc-row-v2 doc-row-v2--${view}`} key={doc.id}>
      <button
        type="button"
        className="doc-row-v2__star"
        onClick={() => onToggleStar(doc.id)}
        aria-label={isStarred ? "Unstar" : "Star"}
      >
        <IconStar filled={isStarred} />
      </button>

      <span className={`doc-icon-v2 doc-icon-v2--${accent}`}>
        {isImage ? <IconFileImage /> : <IconFilePdf />}
        <span className="doc-icon-v2__type">{doc.fileType}</span>
      </span>

      <div className="doc-row-v2__info">
        <div className="doc-row-v2__name">{doc.name}</div>
        <div className="doc-row-v2__meta">
          {doc.fileType} · {doc.size} · Uploaded {doc.date}
        </div>
        {doc.aiStatus === "available" ? (
          <span className="badge badge--amber doc-row-v2__ai-badge">
            <IconSparkleSmall /> AI analysis available
          </span>
        ) : (
          <span className="badge doc-row-v2__ai-badge doc-row-v2__ai-badge--none">
            No AI analysis
          </span>
        )}
      </div>

      {view === "list" && (
        <div className="doc-row-v2__actions">
          <button type="button" className="doc-row-v2__action">
            <IconEye /> Preview
          </button>
          <button type="button" className="doc-row-v2__action">
            <IconShare /> Share
          </button>
          <button type="button" className="doc-row-v2__action">
            <IconDownload /> Download
          </button>
        </div>
      )}

      <button
        type="button"
        className="doc-row-v2__more"
        aria-label="More options"
      >
        <IconMoreVertical />
      </button>
    </div>
  );
}
