"use client";

import { useEffect, useState } from "react";

type Referee = {
  id: string;
  name: string;
  experience?: string;
  pricePerGame: number;
  phone?: string;
  email?: string;
};

export default function RefereesPage() {
  const [refs, setRefs] = useState<Referee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/referees")
      .then((res) => {
        if (!res.ok) throw new Error("Hibás válasz a szervertől");
        return res.json();
      })
      .then((data) => {
        setRefs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Nem sikerült betölteni a bírókat.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Játékvezetők</h1>
        <p>Betöltés...</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Játékvezetők</h1>

      {error && <p className="mb-4 text-red-500">{error}</p>}
      {refs.length === 0 && !error && <p>Még nincs rögzített játékvezető.</p>}

      <div className="grid gap-4">
        {refs.map((r) => (
          <div className="rounded border p-4 shadow-sm" key={r.id}>
            <h2 className="mb-1 text-lg font-semibold">{r.name}</h2>
            {r.experience && <p className="text-sm text-gray-700">{r.experience}</p>}
            <p>{r.pricePerGame} Ft / mérkőzés</p>
            {r.phone && <p>Tel: {r.phone}</p>}
            {r.email && <p>Email: {r.email}</p>}
          </div>
        ))}
      </div>
    </main>
  );
}
