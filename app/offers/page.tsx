"use client";

// Next.js 13-tól az alapértelmezés az SSR, ezért kell a "use client"; direktíva a CSR oldalakon
//
// CSR – Client-Side Rendering
//
// Hogyan működik:
// A szerver csak egy üres HTML vázat küld, és a böngésző a JS segítségével tölti be az adatokat.
//
// Előnyök:
// - Gyorsabb navigáció az alkalmazáson belül (SPA-élmény).
// - Kisebb szerverterhelés, mert a renderelés a kliens gépén történik.
// - Könnyű valós idejű frissítés (akár pl. 10 másodpercenkénti fetch).
// - Események kezelése könnyen megoldható (pl. gombkattintás).
// - Hook-ok használata (pl. useState, useEffect).
//
// Hátrányok:
// - Lassabb első betöltés (TTFB) – a felhasználó először egy üres oldalt lát.
// (TTFB = Time To First Byte, azaz az első bájt megérkezéséig eltelt idő)
// - SEO problémák, mert a keresőmotorok nehezebben olvassák a JS által generált tartalmat.
// - Gyengébb teljesítmény gyengébb eszközökön (mert az eszköz böngészőjében renderel a JS).
// - Az oldal függvénye nem lehet async, ezért async függvény hívások nem használhatók közvetlenül a komponensben (pl. adatlekérés).
// - async függvények használatához gyakran a useEffect hook-ot kell alkalmazni, ami bonyolultabbá teheti a kódot.
// - kevésbé biztonságos, mert a forráskód és az API hívások láthatóak a kliens oldalon.
//
// Összefoglalva: CSR akkor előnyös, ha a felhasználói élmény és az interaktivitás a fő szempont,
// és kevésbé fontos a gyors első betöltés, a kliens teljesítménye, a biztonság, vagy a SEO.
//

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export type IngatlanItem = {
  id: number;
  kategoriaId: number;
  leiras: string;
  hirdetesDatuma: string;
  tehermentes: boolean;
  kepUrl: string;
  kategoriaNev: string;
};

// Az oldal függvénye a client side-on nem lehet async!
export default function OffersPage() {
  const [ingatlanok, setIngatlanok] = useState<IngatlanItem[]>([]);
  useEffect(() => {
    async function getData() {
      const res = await axios.get<IngatlanItem[]>("http://localhost:3000/api/ingatlan");
      setIngatlanok(res.data);
    }
    getData();
  }, []);
  return (
    <div className="flex min-h-screen flex-col items-center">
      <h1 className="my-2 text-center text-3xl">Ajánlataink</h1>
      <table className="max-w-[90%] border border-gray-600">
        <thead>
          <tr>
            <th className="border-b border-gray-600">Kategória</th>
            <th className="border-b border-gray-600">Leírás</th>
            <th className="border-b border-gray-600">Hirdetés dátuma</th>
            <th className="border-b border-gray-600">Tehermentes</th>
            <th className="border-b border-gray-600">Fénykép</th>
          </tr>
        </thead>
        <tbody>
          {ingatlanok.map((ingatlan) => (
            <tr key={ingatlan.id}>
              <td className="border-b border-gray-600 p-2">{ingatlan.kategoriaNev}</td>
              <td className="border-b border-gray-600 p-2">{ingatlan.leiras}</td>
              <td className="border-b border-gray-600 p-2">{ingatlan.hirdetesDatuma}</td>
              <td className="border-b border-gray-600 p-2">
                {ingatlan.tehermentes ? "Igen" : "Nem"}
              </td>
              <td className="border-b border-gray-600 p-2 w-[200px]">
                <Image
                  alt="kép"
                  className="mx-auto rounded-md shadow-xl"
                  height={100}
                  src={ingatlan.kepUrl}
                  style={{ height: "100px", width: "auto" }}
                  width={200}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div>{JSON.stringify(ingatlanok)}</div> */}
    </div>
  );
}
