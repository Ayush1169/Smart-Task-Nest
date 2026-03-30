"use client";

interface Props {
  label: string;
  type?: string;
  value: string;
  onChange: (e: any) => void;
}

export default function Input({ label, type = "text", value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
