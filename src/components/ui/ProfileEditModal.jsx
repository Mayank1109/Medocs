import { useState, useEffect } from "react";
import { IconX } from "../../icons/AppIcons";
import { IconCheck } from "../../icons/AuthIcons";
import { PROFILE_EDIT_SECTIONS } from "../../data/profileEditSections";

import "./ProfileEditModal.css";

function getPath(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function setPath(obj, path, value) {
  const keys = path.split(".");
  const result = { ...obj };
  let cursor = result;
  keys.forEach((key, i) => {
    if (i === keys.length - 1) {
      cursor[key] = value;
    } else {
      cursor[key] = { ...(cursor[key] || {}) };
      cursor = cursor[key];
    }
  });
  return result;
}

function toInputValue(value, type) {
  if (type === "date" && value) {
    return new Date(value).toISOString().split("T")[0];
  }
  if (type === "tags") {
    return Array.isArray(value) ? value : [];
  }
  return value ?? "";
}

function TagInput({ icon, label, value, onChange }) {
  const [draft, setDraft] = useState("");

  function commitDraft() {
    const trimmed = draft.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setDraft("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commitDraft();
    } else if (e.key === "Backspace" && !draft && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  function removeTag(tag) {
    onChange(value.filter((t) => t !== tag));
  }

  return (
    <div className="field-block__control field-block__control--tags">
      {icon && <span className="field-block__icon">{icon}</span>}
      <div className="tag-input">
        {value.map((tag) => (
          <span className="tag-chip" key={tag}>
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag}`}
            >
              <IconX />
            </button>
          </span>
        ))}
        <input
          type="text"
          className="tag-input__field"
          placeholder={value.length === 0 ? `Add ${label.toLowerCase()}…` : ""}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitDraft}
        />
      </div>
    </div>
  );
}

function Field({ field, value, onChange }) {
  const { name, label, type, icon, options } = field;

  return (
    <div className="field-block" key={name}>
      <label className="field-block__label">{label}</label>

      {type === "select" ? (
        <div className="field-block__control">
          {icon && <span className="field-block__icon">{icon}</span>}
          <select
            className="field-block__control-input"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">Select…</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ) : type === "tags" ? (
        <TagInput
          icon={icon}
          label={label}
          value={value ?? []}
          onChange={onChange}
        />
      ) : type === "textarea" ? (
        <textarea
          className="field-block__textarea"
          rows={3}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div className="field-block__control">
          {icon && <span className="field-block__icon">{icon}</span>}
          <input
            type={type}
            className="field-block__control-input"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  onSaved,
  section,
  profile,
}) {
  const config = PROFILE_EDIT_SECTIONS[section];
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const allFields = config
    ? config.groups
      ? config.groups.flatMap((g) => g.fields)
      : config.fields
    : [];

  useEffect(() => {
    if (!isOpen || !config) return;
    let initial = {};
    allFields.forEach((f) => {
      initial = setPath(
        initial,
        f.name,
        toInputValue(getPath(profile, f.name), f.type),
      );
    });
    setForm(initial);
    setError("");
  }, [isOpen, section]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen || !config) return null;

  function handleChange(name, value) {
    setForm((prev) => setPath(prev, name, value));
  }

  async function handleSubmit() {
    setSaving(true);
    setError("");
    try {
      await onSaved(form);
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not save. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  function renderFields(fields) {
    return fields.map((f) => (
      <Field
        key={f.name}
        field={f}
        value={getPath(form, f.name)}
        onChange={(value) => handleChange(f.name, value)}
      />
    ));
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`upload-modal profile-edit-modal${
          config.wide ? " upload-modal--wide" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="profile-edit-header">
          <span className="profile-edit-header__icon">{config.headerIcon}</span>
          <div className="profile-edit-header__text">
            <h2>{config.title}</h2>
            {config.subtitle && <p>{config.subtitle}</p>}
          </div>
          <button
            type="button"
            className="upload-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <IconX />
          </button>
        </div>

        <div className="upload-modal__body">
          {config.groups ? (
            <div className="profile-edit-groups">
              {[1, 2].map((colNum) => (
                <div className="profile-edit-groups__col" key={colNum}>
                  {config.groups
                    .filter((g) => g.column === colNum)
                    .map((g) => (
                      <div className="edit-group" key={g.key}>
                        <div className="edit-group__title">
                          {g.icon}
                          {g.label}
                        </div>
                        <div
                          className={
                            g.layout === "grid-2"
                              ? "edit-group__fields edit-group__fields--grid"
                              : "edit-group__fields"
                          }
                        >
                          {renderFields(g.fields)}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ) : (
            renderFields(config.fields)
          )}

          {error && <p className="upload-modal__error">{error}</p>}
        </div>

        {config.footerNote && (
          <div className="profile-edit-note">
            <span className="profile-edit-note__icon">
              {config.footerNote.icon}
            </span>
            {config.footerNote.text}
          </div>
        )}

        <div className="upload-modal__footer">
          <button
            type="button"
            className="button button--secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`button${saving ? " button--loading" : ""}`}
            onClick={handleSubmit}
            disabled={saving}
          >
            <IconCheck /> Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
