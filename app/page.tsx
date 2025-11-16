"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex min-h-screen flex-col justify-between bg-cover bg-center"
      style={{ backgroundImage: "url('backroundpitch.jpg')" }}
    >
      <h1 className="mt-[10vh] text-center text-3xl"></h1>
      <div className="mb-[10vh] flex flex-col items-center gap-3 md:flex-row md:justify-evenly">
        <Link className="btn w-72 btn-primary" href="/referees">
          Bíróink
        </Link>
        <Link className="btn w-72 btn-primary" href="/pitches">
          Pályáink
        </Link>
      </div>
    </div>
  );
}
