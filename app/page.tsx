"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex min-h-screen flex-col justify-between bg-cover bg-center"
      style={{ backgroundImage: "url('real-estate-agent.png')" }}
    >
      <h1 className="mt-[10vh] text-center text-3xl">Á.L.B Ingatlanügynökség</h1>
      <div className="mb-[10vh] flex flex-col items-center gap-3 md:flex-row md:justify-evenly">
        <Link className="btn btn-primary w-72" href="/offers">
          Nézze meg kínálatunkat!
        </Link>
        <Link className="btn btn-primary w-72" href="/newad">
          Hírdessen nálunk!
        </Link>
      </div>
    </div>
  );
}
