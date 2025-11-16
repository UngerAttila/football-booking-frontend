"use client";

import { useEffect, useState } from "react";

type Pitch = {
  id: string;
  name: string;
  location: string;
  surfaceType: string;
  pricePerHour: number;
  hasLights: boolean;
  isIndoor: boolean;
  size?: string;
  description?: string;
};

export default function PitchesPage() {
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/pitches")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Hibás válasz a szervertől");
        }
        return res.json();
      })
      .then((data) => {
        setPitches(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Nem sikerült betölteni a pályákat.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Focipályák</h1>
        <p>Betöltés...</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Focipályák</h1>

      {error && <p className="mb-4 text-red-500">{error}</p>}

      {pitches.length === 0 && !error && <p>Még nincs rögzített pálya.</p>}

      <div className="grid gap-4">
        {pitches.map((p) => (
          <div className="rounded border p-4 shadow-sm" key={p.id}>
            <h2 className="mb-1 text-lg font-semibold">{p.name}</h2>
            <p className="text-sm text-gray-700">{p.location}</p>
            <p>Talaj: {p.surfaceType}</p>
            {p.size && <p>Méret: {p.size}</p>}
            <p>{p.pricePerHour} Ft / óra</p>
            <p>
              Világítás: {p.hasLights ? "van" : "nincs"} | Fedett: {p.isIndoor ? "igen" : "nem"}
            </p>
            {p.description && <p className="mt-2 text-sm text-gray-600">{p.description}</p>}
          </div>
        ))}
      </div>
    </main>
  );
}
