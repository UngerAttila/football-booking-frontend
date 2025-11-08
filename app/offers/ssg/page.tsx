// SSG – Static Site Generation
//
// Hogyan működik:
// A szerver az építés (build) során generálja le a HTML-t friss adatokkal, és azt küldi a kliensnek.
// Opcionálisan beállítható, hogy bizonyos időközönként (pl. 60 másodperc) újragenerálódjon az oldal.
// Ezáltal a felhasználók mindig viszonylag friss adatot kapnak anélkül, hogy minden kérésnél a szervernek újra kellene generálnia az oldalt, lekérdezni az adatbázisból az adatokat.
//
// Előnyök:
// - Gyors első betöltés, mert a szerver már kész HTML-t küld.
// - SEO-barát, mert a keresőmotorok már kész HTML-t kapnak.
// - Kevésbé terheli a szervert, mint az SSR, mert nem minden kérésnél generál újra HTML-t.
// - Az oldal függvénye lehet async, így közvetlenül használhatók async hívások (pl. adatlekérés).
// - Egyszerűbb kód, mert nem kell useEffect vagy egyéb hook-okat használni az adatlekéréshez.
// - Jellemzően fetch-tel használják, de axios is használható.
// - Biztonságosabb, mert a forráskód és az API hívások nem láthatóak a kliens oldalon.
//
// Hátrányok:
// - Az adat nem mindig a legfrissebb, mert csak az újragenerálás időpontjában frissül.
// - Nem ideális gyakran változó adatokhoz (pl. árfolyam, chat, hírek).
// - Események kezelése bonyolultabb (pl. onClick kezelése).
// - Hook-ok (pl. useState, useEffect) nem használhatók.
// Összefoglalva: SSG akkor előnyös, ha a gyors első betöltés, a SEO és a szerverterhelés csökkentése a fő szempont,
// és kevésbé fontos a mindig friss adat vagy a sokszínű interaktivitás.
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
  const res = await fetch("http://localhost:3000/api/ingatlan", {
    next: { revalidate: 60 },
  });
  const ingatlanok: IngatlanItem[] = await res.json();
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
