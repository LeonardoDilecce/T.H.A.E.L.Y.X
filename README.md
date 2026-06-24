🚀 Mission: A.S.T.R.I.S. — Advanced Spaceflight Simulator (Web‑Based)
Mission: A.S.T.R.I.S. è un simulatore di volo spaziale avanzato completamente web‑based, progettato per modellare fisica realistica, propulsione multi‑tecnologica e dinamiche aerodinamiche complesse direttamente nel browser.
Il progetto combina accuratezza scientifica, modularità ingegneristica e un approccio completamente personalizzabile alla simulazione di veicoli spaziali.

Pensato per appassionati di spazio, studenti, sviluppatori e creatori di missioni, A.S.T.R.I.S. permette di esplorare concetti reali di ingegneria aerospaziale attraverso un ambiente interattivo e leggero, senza installazioni.


Mission ASTRIS è un web‑based space flight simulator che implementa:

modelli fisici avanzati per aerodinamica, termodinamica e propulsione

un sistema completo di propellenti (chimici, criogenici, solidi, ipergolici, ionici, plasma, nucleari e fusione)

simulazione di materiali, strutture, coefficienti aerodinamici e dissipazione termica

configurazioni modulari di stadi, serbatoi e motori

calcoli basati su costanti fisiche reali (G, c, σ, R, ecc.)

Il simulatore è scritto in JavaScript, progettato per funzionare su qualsiasi browser moderno e ottimizzato per essere esteso, modificato e integrato in progetti educativi o di ricerca.

space simulator, web-based space simulator, orbital physics, spacecraft engineering, rocket propulsion, WebGL space engine, JavaScript physics engine, rocket fuels simulation, nuclear propulsion, ion thrusters, plasma engines, fusion propulsion, aerodynamic modeling, spacecraft materials simulation.


Mission: A.S.T.R.I.S. implementa un motore fisico modulare basato su dataset ingegneristici reali.
Il codice include:

1. Physical Constants
Il simulatore utilizza costanti fisiche reali come:

G (6.67430e‑11) — costante gravitazionale

c (299,792,458 m/s) — velocità della luce

S (5.67e‑8) — costante di Stefan‑Boltzmann

R (8.314462618) — costante dei gas ideali

Queste costanti permettono simulazioni termiche, radiative e dinamiche accurate.

2. Aerodynamic & Material Models
Il file include mappe dettagliate per:

materiali di paracadute (Nylon, Kevlar, Vectran, UHMWPE, ecc.)

strutture di paracadute (Hemispherical, Ringsail, Disk‑Gap‑Band, Parafoil, ecc.)

coefficienti aerodinamici:

cd (drag)

e (elasticità)

a (assorbimento)

r (resistenza)

Questi parametri permettono simulazioni di rientro, frenata atmosferica e dispiegamento realistico.

3. Complete Propulsion Database
Il simulatore include una delle più vaste librerie di propellenti mai viste in un progetto web:

Chimici liquidi (RP‑1, Bio‑Kerosene, Ethanol…)

Criogenici (LH₂, LOX‑Methane, LOX‑RP‑1…)

Solidi (HTPB)

Ipergolici (UDMH, Aerozine‑50, Hydrazine…)

Monopropellenti (AF‑M315E, LMP‑103S…)

Nucleari termici (LEU, HALEU, HEU, Cermet, Gas Core…)

Ionici (Xenon, Krypton, Argon…)

Plasma (Hydrogen Plasma, Deuterium Plasma…)

Fusione (D‑T, D‑D, D‑He3, He3‑He3)

Ogni propellente ha parametri come:

density

tsfc (thrust specific fuel consumption)

cv (calorific value)

class (liquid, cryo, nuclear, ionic, plasma, fusion)

4. Structural Modules
La mappa delle strutture del veicolo include:

serbatoi liquidi

serbatoi criogenici

moduli pressurizzati

camere di combustione nucleari

moduli di contenimento plasma

capsule aerodinamiche

ogive e moduli di rientro

Ogni struttura ha parametri come:

cd (drag coefficient)

sideCd

a (assorbimento termico)

cp (heat capacity)

k (thermal conductivity)

η, ηt, ηg (efficienze termiche e meccaniche)

conditions (compatibilità con classi di propellente)

Questo permette configurazioni di veicoli estremamente realistiche.

Mission: A.S.T.R.I.S. non è un semplice “simulatore web”:
è un motore fisico aerospaziale avanzato, con un database ingegneristico enorme e una struttura modulare che permette simulazioni realistiche di:

propulsione

aerodinamica

termodinamica

materiali

strutture

missioni
