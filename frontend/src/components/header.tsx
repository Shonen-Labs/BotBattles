import React from "react";

type HeaderSectionProps = {
  label: string;
  title: string;
  highlight: string;
  description: string;
  shadowColor?: string;
  marginBottom?: string;
};

export default function HeaderSection({
  label,
  title,
  highlight,
  description,
  shadowColor = "#0a1f0a",
  marginBottom = "mb-12",
}: HeaderSectionProps) {
  return (
    <div className={`text-center ${marginBottom}`}>
      <div className="inline-flex items-center justify-center mb-4">
        <div className="h-px w-8 bg-primary-green"></div>
        <span className="mx-4 text-primary-green">{label}</span>
        <div className="h-px w-8 bg-primary-green"></div>
      </div>
      <h2
        className="text-4xl font-bold text-white mb-4"
        style={{ textShadow: `2px 2px 0px ${shadowColor}` }}
      >
        {title} <span className="text-primary-green">{highlight}</span>
      </h2>
      <p className="text-lightgreen max-w-2xl mx-auto">{description}</p>
    </div>
  );
}
