"use client";

export default function Button({ text, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition"
    >
      {text}
    </button>
  );
}
