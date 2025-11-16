"use client";

import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type KategoriaItem = {
  id: number;
  megnevezes: string;
};

export type HirdetesItem = {
  kategoriaId: number;
  leiras: string;
  hirdetesDatuma: string;
  tehermentes: boolean;
  kepUrl: string;
};

export default function NewadPage() {
  const router = useRouter();
  const [kategoriak, setKategoriak] = useState<KategoriaItem[]>([]);

  const [hirdetes, setHirdetes] = useState<HirdetesItem>({
    kepUrl: "",
    hirdetesDatuma: new Date().toISOString().split("T")[0],
    tehermentes: true,
  } as HirdetesItem);

  useEffect(() => {
    async function getKategoriak() {
      const res = await axios.get<KategoriaItem[]>("http://localhost:3000/api/kategoriak");
      setKategoriak(res.data);
    }
    getKategoriak();
  }, []);

  async function postData() {
    try {
        await axios.post("http://localhost:3000/api/ujingatlan", hirdetes);
        
        // Nem a megoldás része
        toast.success("Sikeres rögzítés!")

        // Az időzítés nem a megoldás része
        setTimeout(() => {
          router.push("/offers");  
        }, 5000);
       
    } catch (error) {
        if (isAxiosError(error)) {
            toast.error(`Hiba: ${error.response?.data.message}`)
        }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200">
      <div className="w-130 space-y-2 rounded-2xl bg-white p-5 shadow-md">
        <h1 className="text-center text-3xl">Új hírdetés elküldése</h1>
        <div>
          <label>Ingatlan kategóriája</label>
          <select
            className="select w-full select-primary"
            defaultValue={0}
            onChange={(e) => setHirdetes({ ...hirdetes, kategoriaId: Number(e.target.value) })}
          >
            <option disabled value="0">
              Kérem válasszon
            </option>
            {kategoriak.map((kategoria) => (
              <option key={kategoria.id} value={kategoria.id}>
                {kategoria.megnevezes}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Hirdetés dátuma</label>
          <input
            className="input w-full input-primary"
            defaultValue={hirdetes.hirdetesDatuma}
            disabled
            type="date"
            // onChange={(e) => setHirdetes({ ...hirdetes, hirdetesDatuma: e.target.value })}
          />
        </div>
        <div>
          <label>Ingatlan leírása</label>
          <textarea
            className="w-full border p-2"
            rows={6}
            value={hirdetes.leiras}
            onChange={(e) => setHirdetes({ ...hirdetes, leiras: e.target.value })}
          ></textarea>
        </div>
        <div>
          <input
            defaultChecked={hirdetes.tehermentes}
            id="tehermentes"
            type="checkbox"
            onChange={(e) => setHirdetes({ ...hirdetes, tehermentes: e.target.checked })}
          />
          <label htmlFor="tehermentes">Tehetmentes ingatlan</label>
        </div>
        <div>
          <label>Fénykép az ingatlanról</label>
          <input
            className="input w-full input-primary"
            type="text"
            value={hirdetes.kepUrl}
            onChange={(e) => setHirdetes({ ...hirdetes, kepUrl: e.target.value })}
          />
        </div>
        <div>
          <button className="btn mx-auto block btn-primary" onClick={postData}>Küldés</button>
        </div>
        {/* {JSON.stringify(hirdetes)} */}
      </div>
    </div>
  );
}
