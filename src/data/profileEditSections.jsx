import {
  IconPhone,
  IconCalendar,
  IconPerson,
  IconDroplet,
  IconRuler,
  IconScale,
  IconBriefcase,
  IconMapPin,
  IconHeart,
  IconInfo,
  IconLock,
} from "../icons/AppIcons";
import { IconShield } from "../icons/AuthIcons";

export const PROFILE_EDIT_SECTIONS = {
  personal: {
    title: "Edit personal information",
    subtitle: "Update your basic personal details.",
    headerIcon: <IconPerson />,
    footerNote: {
      icon: <IconLock />,
      text: "This information is private and encrypted.",
    },
    fields: [
      {
        name: "phone",
        label: "Phone number",
        type: "text",
        icon: <IconPhone />,
      },
      {
        name: "dateOfBirth",
        label: "Date of birth",
        type: "date",
        icon: <IconCalendar />,
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        icon: <IconPerson />,
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
          { value: "prefer_not_to_say", label: "Prefer not to say" },
        ],
      },
      {
        name: "bloodGroup",
        label: "Blood group",
        type: "select",
        icon: <IconDroplet />,
        options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
          (v) => ({ value: v, label: v }),
        ),
      },
    ],
  },

  health: {
    title: "Edit health information",
    subtitle: "Keep your health information up to date for better care.",
    headerIcon: <IconHeart />,
    wide: true,
    footerNote: {
      icon: <IconLock />,
      text: "This information is private and encrypted.",
    },
    groups: [
      {
        key: "basic",
        label: "Basic details",
        icon: <IconPerson />,
        layout: "grid-2",
        column: 1,
        fields: [
          {
            name: "height",
            label: "Height (cm)",
            type: "number",
            icon: <IconRuler />,
          },
          {
            name: "weight",
            label: "Weight (kg)",
            type: "number",
            icon: <IconScale />,
          },
          {
            name: "occupation",
            label: "Occupation",
            type: "text",
            icon: <IconBriefcase />,
          },
          {
            name: "location",
            label: "Location",
            type: "text",
            icon: <IconMapPin />,
          },
        ],
      },
      {
        key: "conditions",
        label: "Health conditions",
        icon: <IconHeart />,
        layout: "single",
        column: 1,
        fields: [
          {
            name: "allergies",
            label: "Allergies",
            type: "tags",
            icon: <IconInfo />,
          },
          {
            name: "chronicConditions",
            label: "Chronic conditions",
            type: "tags",
            icon: <IconHeart />,
          },
        ],
      },
      {
        key: "history",
        label: "Medical history",
        icon: <IconInfo />,
        layout: "single",
        column: 2,
        fields: [
          {
            name: "currentMedications",
            label: "Current medications",
            type: "tags",
            icon: <IconInfo />,
          },
          {
            name: "pastSurgeries",
            label: "Past surgeries",
            type: "tags",
            icon: <IconInfo />,
          },
          {
            name: "notesForDoctor",
            label: "Notes for doctor",
            type: "textarea",
          },
          {
            name: "bloodGroup",
            label: "Blood group",
            type: "select",
            icon: <IconDroplet />,
            options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
              (v) => ({ value: v, label: v }),
            ),
          },
        ],
      },
    ],
  },

  emergencyContact: {
    title: "Edit emergency contact",
    subtitle: "Update the details of your emergency contact.",
    headerIcon: <IconPerson />,
    footerNote: {
      icon: <IconShield />,
      text: "This contact will be used in case of medical emergencies.",
    },
    fields: [
      {
        name: "emergencyContact.name",
        label: "Contact name",
        type: "text",
        icon: <IconPerson />,
      },
      {
        name: "emergencyContact.phone",
        label: "Contact phone",
        type: "text",
        icon: <IconPhone />,
      },
      {
        name: "emergencyContact.relation",
        label: "Relationship",
        type: "text",
        icon: <IconPerson />,
      },
    ],
  },
};
