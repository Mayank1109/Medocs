import { IconArrowRight } from "../../icons/HeroIcons";

export default function SuggestionItem({ text }) {
  return (
    <div className="hero__mockup-suggestion">
      {text}
      <IconArrowRight />
    </div>
  );
}
