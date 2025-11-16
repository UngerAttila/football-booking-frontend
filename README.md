# Football Booking – Frontend (Next.js App Router)

Egyszerű UI a focipályák (**Pitches**), játékvezetők (**Referees**) és foglalások (**Bookings**) listázásához.  
A frontend a **backend REST API**-t hívja (`/api/pitches`, `/api/referees`, `/api/bookings`).

---

## ✅ Előfeltételek

- **Node.js LTS** (18 vagy 20) + npm  
  Ellenőrzés: `node -v` és `npm -v`
- Futtatott **backend** (alapértelmezésben: `http://localhost:3001`)  
  Repo: `football-booking-backend`

> Ha más gépen/porton fut a backend, az **ENV változóban** kell megadni (lásd lent).

---

## ⚙️ Környezeti változó

Hozz létre egy **`.env.local`** fájlt a frontend gyökerében:

# .env.local
NEXT_PUBLIC_API_BASE=http://localhost:3001

# 1) Repo klónozás
git clone https://github.com/UngerAttila/football-booking-frontend.git
cd football-booking-frontend

# 2) Függőségek
npm install

# 3) Környezet beállítás (lásd: .env.local)
# NEXT_PUBLIC_API_BASE=http://localhost:3001

# 4) Fejlesztői szerver
npm run dev
# → alapból: http://localhost:8080  (ha a projekt így van beállítva)
#   ha más portot szeretnél: npm run dev -- -p 8080


# Production build
npm run build

# Lokális preview
npm run start
# (alapértelmezett port: 3000, módosítható PORT env-vel)

Hasznos parancsok
npm install       # függőségek
npm run dev       # fejlesztői szerver (alapesetben 8080)
npm run build     # production build
npm run start     # production szerver indítása (build után)

