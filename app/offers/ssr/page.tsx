// SSR – Server-Side Rendering
//
// Hogyan működik:
// Minden kérésnél a szerver legenerálja a HTML-t friss adatokkal, és azt küldi a kliensnek.
//
// Előnyök:
// - Mindig friss adat – minden oldalbetöltéskor újra lekér.
// - SEO-barát, mert a szerver már kész HTML-t küld.
// - Gyorsabb első betöltés, mint CSR esetén.
// - Nem kell külön kliens oldali adatkezelés (state management) egyszerű oldalakhoz.
// - Az oldal függvénye lehet async, így közvetlenül használhatók async hívások (pl. adatlekérés).
// - Egyszerűbb kód, mert nem kell useEffect vagy egyéb hook-okat használni az adatlekéréshez.
// - Axios vagy fetch közvetlenül használható az oldal komponensében.
// - Biztonságosabb, mert a forráskód és az API hívások nem láthatóak a kliens oldalon.
//
// Hátrányok:
// - Minden letöltésnél szerverterhelés (lassabb, ha sok a látogató).
// - Lassabb navigáció az alkalmazáson belül (minden oldalváltás újratöltést jelent).
// - Nehezebb valós idejű frissítés (pl. 10 másodpercenkénti fetch).
// - Események kezelése bonyolultabb (pl. onClick kezelése).
// - Hook-ok (pl. useState, useEffect) nem használhatók.
//
// Összefoglalva: SSR akkor előnyös, ha a SEO, a gyors első betöltés és a mindig friss adat a fő szempont,
// és kevésbé fontos a sokszínű interaktivitás, a gyors navigáció az alkalmazáson belül vagy a szerverterhelés.
import axios from "axios";
import Image from "next/image";

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
export default async function OffersPage() {
  const res = await axios.get<IngatlanItem[]>("http://localhost:3000/api/ingatlan");
  const ingatlanok: IngatlanItem[] = res.data;
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
              <td className="w-[200px] border-b border-gray-600 p-2">
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
