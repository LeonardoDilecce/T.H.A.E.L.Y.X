const G = 6.67430e-11;
const c = 299_792_458;
const S = 5.67e-8;
const D = 1.5923e-2;
const M_0 = 1.04125e4; 
const R = 8.314462618;
const paraMaterialsMap =            {"Nylon" :                      { cd: 1.28, r: 75000,  e: 0.22,  m: 0.22 },
                                     "Kevlar" :                     { cd: 1.25, r: 125000, e: 0.025, m: 0.47 },
                                     "Dacron" :                     { cd: 1.30, r: 35000,  e: 0.135, m: 0.25 },
                                     "Vectran" :                    { cd: 1.33, r: 80000,  e: 5.25,  m: 0.41 },
                                     "UHMWPE":                      { cd: 1.24, r: 210000, e: 0.012, m: 0.53 },
                                     "Silk":                        { cd: 1.26, r: 45000,  e: 0.6,   m: 0.12 }, 
                                     "Nomex":                       { cd: 1.22, r: 80000,  e: 0.07,  m: 0.39 },
                                     "Polysail":                    { cd: 1.38, r: 28000,  e: 7.2,   m: 0.21 },  
                                     "CarbonWeave":                 { cd: 1.29, r: 95000,  e: 0.034, m: 0.49 }, 
                                     "Ripstop Nylon":               { cd: 1.27, r: 82000,  e: 0.18,  m: 0.20 }, 
                                     "Terylene":                    { cd: 1.26, r: 90000,  e: 0.16,  m: 0.24 }, 
                                     "Polyester":                   { cd: 1.25, r: 70000,  e: 0.20,  m: 0.23 },
                                     "Canvas":                      { cd: 1.22, r: 30000,  e: 0.40,  m: 0.35 }, 
                                     "" :                           { cd: 0, r: 0,  e: 0,  m: 0 }};
const parastructureMap =            {"Hemispherical" :              { cd: 1.6,  e: 0.23,   a: 0.97,  r: 1,   }, 
                                     "Annular slot" :               { cd: 1.75, e: 0.18,   a: 0.90,  r: 0.95 },
                                     "Flat" :                       { cd: 1.3,  e: 0.17,   a: 0.94,  r: 1.3  },
                                     "Ribbon" :                     { cd: 0.7,  e: 0.07,   a: 0.74,  r: 0.85 },
                                     "Toroidal" :                   { cd: 1.2,  e: 0.07,   a: 0.82,  r: 1.5  },
                                     "Cross" :                      { cd: 1.35, e: 0.17,   a: 0.91,  r: 1.2  },
                                     "Disk-Gap-Band":               { cd: 1.1,  e: 0.12,   a: 0.88,  r: 1.1  },
                                     "Conical Ribbon":              { cd: 1.4,  e: 0.10,   a: 0.92,  r: 1.3  },
                                     "Hemisflo Ribbon":             { cd: 1.5,  e: 0.09,   a: 0.89,  r: 1.4  },
                                     "Cruciform":                   { cd: 0.75, e: 0.15,   a: 0.80,  r: 1.0  },
                                     "Guide Surface":               { cd: 0.35, e: 0.05,   a: 0.95,  r: 1.6  },
                                     "Ringsail":                    { cd: 1.6,  e: 0.11,   a: 0.93,  r: 1.5  },
                                     "Parafoil":                    { cd: 0.9,  e: 0.08,   a: 0.85,  r: 1.8  },
                                     "Biconical":                   { cd: 1.45, e: 0.14,   a: 0.90,  r: 1.2  },
                                     "" :                           { cd: 0,    e: 0,   a: 0,  r: 0  }}
const fuelMap =                     {"RP-1":                        { density: 810,  tsfc: 0.00034,   cv: 34e6,  class: "liquid"             },                                    
                                     "Bio-Kerosene":                { density: 780,  tsfc: 0.00033,   cv: 32e6,  class: "liquid"             }, 
                                     "Ethanol":                     { density: 789,  tsfc: 0.00036,   cv: 29e6,  class: "liquid"             },
                                     "Pentaborane":                 { density: 900,  tsfc: 0.00037,   cv: 65e6,  class: "liquid"             },
                                     "Hydrazine Nitrate":           { density: 1220, tsfc: 0.00043,   cv: 29e6,  class: "liquid"             },
                                     "Liquid Hydrogen":             { density: 70,   tsfc: 0.0003,    cv: 120e6, class: "cryo"               },
                                     "Liquid Methane":              { density: 422,  tsfc: 0.00026,   cv: 50e6,  class: "cryo"               }, 
                                     "LOX-RP-1":                    { density: 1005, tsfc: 0.00033,   cv: 35e6,  class: "cryo"               },
                                     "LOX-Kerosene":                { density: 870,  tsfc: 0.00032,   cv: 36e6,  class: "cryo"               },
                                     "LOX-Methane":                 { density: 450,  tsfc: 0.00027,   cv: 48e6,  class: "cryo"               },
                                     "LOX-Cyclopropane":            { density: 620,  tsfc: 0.00029,   cv: 55e6,  class: "cryo"               }, 
                                     "LOX-Ethanol":                 { density: 789,  tsfc: 0.00035,   cv: 29e6,  class: "cryo"               }, 
                                     "Liquid Ethylene":             { density: 570,  tsfc: 0.00030,   cv: 45e6,  class: "cryo"               },
                                     "HTPB Solid":                  { density: 950,  tsfc: 0.0005,    cv: 25e6,  class: "solid"              },
                                     "Hydrazine":                   { density: 1020, tsfc: 0.00042,   cv: 28e6,  class: "hypergolic"         },
                                     "UDMH":                        { density: 793,  tsfc: 0.00038,   cv: 30e6,  class: "hypergolic"         },
                                     "Aerozine-50":                 { density: 835,  tsfc: 0.00039,   cv: 29e6,  class: "hypergolic"         },
                                     "TMEDA":                       { density: 870,  tsfc: 0.00035,   cv: 31e6,  class: "hypergolic"         },
                                     "Aniline":                     { density: 1020, tsfc: 0.00040,   cv: 26e6,  class: "hypergolic"         }, 
                                     "Dinitrogen Tetroxide":        { density: 1440, tsfc: 0.00039,   cv: 27e6,  class: "hypergolic"         },
                                     "Triethylaluminum":            { density: 850,  tsfc: 0.00032,   cv: 60e6,  class: "hypergolic"         },
                                     "Ethylene Diamine":            { density: 900,  tsfc: 0.00037,   cv: 27e6,  class: "hypergolic"         }, 
                                     "Dimethylhydrazine Nitrate":   { density: 980,  tsfc: 0.00039,   cv: 29e6,  class: "hypergolic"         },
                                     "Hydrazinium Nitrate":         { density: 1100, tsfc: 0.00041,   cv: 28e6,  class: "hypergolic"         },
                                     "Methylhydrazine":             { density: 870,  tsfc: 0.0004,    cv: 27e6,  class: "hypergolic"         },
                                     "Ethylhydrazine":              { density: 890,  tsfc: 0.00039,   cv: 28e6,  class: "hypergolic"         },
                                     "Monopropellant N2H4":         { density: 1020, tsfc: 0.00045,   cv: 25e6,  class: "monopropellant"     },
                                     "Hydroxylammonium Nitrate":    { density: 1350, tsfc: 0.00038,   cv: 31e6,  class: "monopropellant"     },
                                     "Dinitramine Monopropellant":  { density: 1900, tsfc: 0.0004,    cv: 65e6,  class: "monopropellant"     }, 
                                     "AF-M315E":                    { density: 1450, tsfc: 0.00036,   cv: 32e6,  class: "monopropellant"     },
                                     "LMP-103S":                    { density: 1350, tsfc: 0.00037,   cv: 31e6,  class: "monopropellant"     },
                                     "Nitromethane":                { density: 1130, tsfc: 0.00039,   cv: 30e6,  class: "monopropellant"     },
                                     "Hydrazinium Nitrate":         { density: 1100, tsfc: 0.00041,   cv: 28e6,  class: "monopropellant"     }, 
                                     "LEU Hydrogen":                { density: 70,   tsfc: 0.0001,    cv: 250e6, class: "nuclear"            },
                                     "HALEU Hydrogen":              { density: 70,   tsfc: 0.00009,   cv: 260e6, class: "nuclear"            },
                                     "HEU Hydrogen":                { density: 70,   tsfc: 0.00008,   cv: 270e6, class: "nuclear"            },
                                     "Carbide Core Hydrogen":       { density: 70,   tsfc: 0.00007,   cv: 280e6, class: "nuclear"            },
                                     "Cermet Hydrogen":             { density: 70,   tsfc: 0.000085,  cv: 265e6, class: "nuclear"            },
                                     "Graphite Composite H₂":       { density: 70,   tsfc: 0.0001,    cv: 250e6, class: "nuclear"            }, 
                                     "LANTR LOX-Augmented":         { density: 70,   tsfc: 0.00006,   cv: 300e6, class: "nuclear"            }, 
                                     "ZrC Hydrogen":                { density: 70,   tsfc: 0.000075,  cv: 275e6, class: "nuclear"            }, 
                                     "NbC Hydrogen":                { density: 70,   tsfc: 0.000072,  cv: 278e6, class: "nuclear"            },
                                     "W-UO₂ Cermet":                { density: 70,   tsfc: 0.000085,  cv: 265e6, class: "nuclear"            },
                                     "Gas Core Hydrogen":           { density: 70,   tsfc: 0.00004,   cv: 400e6, class: "nuclear"            },
                                     "Closed Cycle Gas Core":       { density: 70,   tsfc: 0.00005,   cv: 350e6, class: "nuclear"            },
                                     "Centrifugal CNTR Hydrogen":   { density: 70,   tsfc: 0.00006,   cv: 300e6, class: "nuclear"            },
                                     "Methane CNTR":                { density: 422,  tsfc: 0.00011,   cv: 190e6, class: "nuclear"            },
                                     "Propane CNTR":                { density: 493,  tsfc: 0.00012,   cv: 185e6, class: "nuclear"            },
                                     "Hydrogen LANTR High-Ratio":   { density: 70,   tsfc: 0.000055,  cv: 310e6, class: "nuclear"            },
                                     "Hydrogen NTR-Bimodal":        { density: 70,   tsfc: 0.00008,   cv: 270e6, class: "nuclear"            },
                                     "Ammonia NTP":                 { density: 682,  tsfc: 0.00012,   cv: 180e6, class: "nuclear"            }, 
                                     "Water NTP":                   { density: 1000, tsfc: 0.00015,   cv: 120e6, class: "nuclear"            },                                 
                                     "Xenon Ion":                   { density: 3000, tsfc: 0.000002,  cv: 2.0e6, class: "ionic"              },
                                     "Krypton Ion":                 { density: 3600, tsfc: 0.0000025, cv: 1.9e6, class: "ionic"              },
                                     "Neon Ion":                    { density: 1200, tsfc: 0.0000028, cv: 1.6e6, class: "ionic"              },  
                                     "Iodine Vapor":                { density: 4930, tsfc: 0.000002,  cv: 2.1e6, class: "ionic"              },   
                                     "Argon Ion":                   { density: 1600, tsfc: 0.0000030, cv: 1.7e6, class: "ionic"              },
                                     "Helium Ion":                  { density: 180,  tsfc: 0.0000042, cv: 1.2e6, class: "ionic"              },
                                     "Cesium Ion":                  { density: 19300,tsfc: 0.0000018, cv: 2.3e6, class: "ionic"              }, 
                                     "Bismuth Ion":                 { density: 9800, tsfc: 0.0000021, cv: 2.2e6, class: "ionic"              },
                                     "Mercury Ion":                 { density: 13500,tsfc: 0.0000020, cv: 2.0e6, class: "ionic"              },
                                     "Lithium Ion":                 { density: 530,  tsfc: 0.0000035, cv: 1.5e6, class: "ionic"              },
                                     "Cadmium Ion":                 { density: 8650, tsfc: 0.0000023, cv: 2.1e6, class: "ionic"              },     
                                     "Thallium Ion":                { density: 11800,tsfc: 0.0000019, cv: 2.2e6, class: "ionic"              }, 
                                     "Argon Plasma":                { density: 1600, tsfc: 0.000003,  cv: 1.8e6, class: "plasma"             },
                                     "Lithium Plasma":              { density: 534,  tsfc: 0.0000015, cv: 2.5e6, class: "plasma"             },
                                     "Hydrogen Plasma":             { density: 70,   tsfc: 0.000001,  cv: 3.0e6, class: "plasma"             },
                                     "Deuterium Plasma":            { density: 180,  tsfc: 0.0000012, cv: 3.5e6, class: "plasma"             },
                                     "Helium Plasma":               { density: 180,  tsfc: 0.0000018, cv: 2.8e6, class: "plasma"             },
                                     "Nitrogen Plasma":             { density: 1000, tsfc: 0.0000045, cv: 2.2e6, class: "plasma"             },
                                     "Methane Plasma":              { density: 422,  tsfc: 0.0000048, cv: 2.6e6, class: "plasma"             },
                                     "Neon Plasma":                 { density: 1200, tsfc: 0.0000032, cv: 1.9e6, class: "plasma"             },
                                     "Xenon Plasma":                { density: 3000, tsfc: 0.0000025, cv: 2.1e6, class: "plasma"             }, 
                                     "Hydrogen Helicon":            { density: 70,   tsfc: 0.0000012, cv: 3.1e6, class: "plasma"             },                                        
                                     "Deuterium-Tritium":           { density: 180,  tsfc: 0.0000008, cv: 350e6, class: "fusion"             },
                                     "Deuterium-Deuterium":         { density: 180,  tsfc: 0.0000012, cv: 300e6, class: "fusion"             },
                                     "Deuterium-Helium3":           { density: 180,  tsfc: 0.0000009, cv: 400e6, class: "fusion"             },
                                     "Helium3-Helium3":             { density: 180,  tsfc: 0.0000007, cv: 450e6, class: "fusion"             },                                   
                                     "":                            { density: 0,    tsfc: 0,         cv:0,      class: ""                   }};                             
const hullStructureMap =            {"Generic Liquid Fuel Tank":    { cd: 0.17, sideCd: 0.48,  a: 0.98,  r: 1.11, cp: 0.97,  k: 1.00e-4,η: 0.92, ηt: 0.94, ηg: 0.90, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=liquid:tipoCarburante!=Hydrazine Nitrate:tipoCarburante!=Pentaborane:tipoCarburante!=Bio-Kerosene])"]},
                                     "Enforced Liquid Fuel Tank":   { cd: 0.42, sideCd: 1.24,  a: 0.98,  r: 1.15, cp: 0.98,  k: 1.00e-4,η: 0.92, ηt: 0.94, ηg: 0.85, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=liquid:tipoCarburante!=Pentaborane])"]},                                    
                                     "Pressurized Liquid Fuel Tank":{ cd: 0.33, sideCd: 0.38,  a: 0.98,  r: 1.12, cp: 0.99,  k: 1.00e-4,η: 0.92, ηt: 0.94, ηg: 0.64, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=liquid:tipoCarburante!=Hydrazine Nitrate:tipoCarburante!=Bio-Kerosene:tipoCarburante!=RP-1])"]},                                    
                                     "Heavy Liquid Fuel Tank":      { cd: 0.25, sideCd: 0.22,  a: 0.98,  r: 1.13, cp: 0.91,  k: 1.00e-4,η: 0.92, ηt: 0.94, ηg: 0.59, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=liquid:tipoCarburante!=Pentaborane])"]},                                      
                                     "Light Liquid Fuel Tank":      { cd: 0.12, sideCd: 0.21,  a: 0.98,  r: 1.09, cp: 0.88,  k: 1.00e-4,η: 0.92, ηt: 0.94, ηg: 0.92, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=liquid:tipoCarburante!=Hydrazine Nitrate:tipoCarburante!=Bio-Kerosene:tipoCarburante!=RP-1])"]},                                                                                                                           
                                     "Cryogenic Fuel Tank":         { cd: 0.15, sideCd: 0.18,  a: 0.96,  r: 1.14, cp: 0.85,  k: 1.10e-4,η: 0.87, ηt: 0.93, ηg: 0.93, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=cryo:tipoCarburante!=LOX-Kerosene:tipoCarburante!=LOX-Methane:tipoCarburante!=LOX-Cyclopropane:tipoCarburante!=LOX-Ethanol])"]},
                                     "Pressurized Cryogenic Tank":  { cd: 0.17, sideCd: 0.19,  a: 0.95,  r: 1.2,  cp: 0.85,  k: 1.10e-4,η: 0.54, ηt: 0.93, ηg: 0.88, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=cryo:tipoCarburante!=LOX-Kerosene:tipoCarburante!=LOX-Methane])"]},
                                     "Enforced Cryogenic Tank":     { cd: 0.18, sideCd: 0.29,  a: 0.96,  r: 1.14, cp: 0.85,  k: 1.10e-4,η: 0.49, ηt: 0.93, ηg: 0.88, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=cryo:tipoCarburante!=LOX-Cyclopropane:tipoCarburante!=LOX-Ethanol])"]},
                                     "Heavy Cryogenic Tank":        { cd: 0.23, sideCd: 0.24,  a: 0.95,  r: 1.12, cp: 0.85,  k: 1.10e-4,η: 0.47, ηt: 0.93, ηg: 0.88, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=cryo:tipoCarburante!=LOX-Kerosene:tipoCarburante!=LOX-Cyclopropane:tipoCarburante!=Liquid Hydrogen])"]},
                                     "Advanced Cryogenic Tank":     { cd: 0.13, sideCd: 0.11,  a: 0.98,  r: 1.17, cp: 0.85,  k: 1.10e-4,η: 0.91, ηt: 0.97, ηg: 0.94, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=cryo:tipoCarburante!=LOX-Kerosene:tipoCarburante!=LOX-Ethanol])"]},
                                     "Light Cryogenic Tank":        { cd: 0.12, sideCd: 0.13,  a: 0.95,  r: 1.12, cp: 0.85,  k: 1.10e-4,η: 0.92, ηt: 0.93, ηg: 0.88, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=cryo:tipoCarburante!=LOX-Kerosene:tipoCarburante!=LOX-Methane:tipoCarburante!=LOX-Cyclopropane:tipoCarburante!=LOX-Ethanol])"]},
                                     "Solid Fuel Storage":          { cd: 0.12, sideCd: 0.10,  a: 0.85,  r: 1.1,  cp: 0.88,  k: 0.90e-4,η: 0.87, ηt: 0.94, ηg: 0.89, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=solid])"]},
                                     "Ionized Fuel Storage":        { cd: 0.14, sideCd: 0.11,  a: 0.98,  r: 1.2,  cp: 0.87,  k: 1.05e-4,η: 0.95, ηt: 0.92, ηg: 0.87, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=ionic:tipoCarburante!=Cesium Ion:tipoCarburante!=Bismuth Ion:tipoCarburante!=Mercury Ion:tipoCarburante!=Lithium Ion:tipoCarburante!=Cadmium Ion:tipoCarburante!=Thallium Ion])"]},
                                     "Ionized Fuel Pressurized Bay":{ cd: 0.15, sideCd: 0.44,  a: 0.96,  r: 1.4,  cp: 0.88,  k: 1.07e-4,η: 0.76, ηt: 0.92, ηg: 0.87, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=ionic:tipoCarburante!=Cesium Ion:tipoCarburante!=Bismuth])"]},
                                     "Ionized Fuel Enforced Tank":  { cd: 0.16, sideCd: 0.33,  a: 0.97,  r: 1.3,  cp: 0.89,  k: 1.15e-4,η: 0.71, ηt: 0.92, ηg: 0.87, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=ionic])"]},                    
                                     "Low Enriched Fuel Chamber":   { cd: 0.18, sideCd: 0.13,  a: 0.95,  r: 1.3,  cp: 0.95,  k: 1.20e-4,η: 0.18, ηt: 0.91, ηg: 0.85, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=nuclear:tipoCarburante!=HALEU Hydrogen:tipoCarburante!=HEU Hydrogen:tipoCarburante!=Carbide Core Hydrogen:tipoCarburante!=Cermet Hydrogen:tipoCarburante!=Graphite Composite H₂:tipoCarburante!=LANTR LOX-Augmented:tipoCarburante!=ZrC Hydrogen:tipoCarburante!=NbC Hydrogen:tipoCarburante!=W-UO₂ Cermet:tipoCarburante!=Gas Core Hydrogen:tipoCarburante!=Closed Cycle Gas Core:tipoCarburante!=Centrifugal CNTR Hydrogen:tipoCarburante!=Methane CNTR:tipoCarburante!=Propane CNTR])"]},
                                     "High Enriched Fuel Chamber":  { cd: 0.18, sideCd: 0.13,  a: 0.94,  r: 1.3,  cp: 0.95,  k: 1.20e-4,η: 0.09, ηt: 0.91, ηg: 0.85, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=nuclear:tipoCarburante!=Carbide Core Hydrogen:tipoCarburante!=Cermet Hydrogen:tipoCarburante!=Graphite Composite H₂:tipoCarburante!=ZrC Hydrogen:tipoCarburante!=NbC Hydrogen:tipoCarburante!=W-UO₂ Cermet:tipoCarburante!=Gas Core Hydrogen:tipoCarburante!=Closed Cycle Gas Core:tipoCarburante!=Centrifugal CNTR Hydrogen:tipoCarburante!=Methane CNTR:tipoCarburante!=Propane CNTR])"]},
                                     "NTR Solid Fuel Bay":          { cd: 0.18, sideCd: 0.13,  a: 0.93,  r: 1.3,  cp: 0.95,  k: 1.20e-4,η: 0.24, ηt: 0.91, ηg: 0.85, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=nuclear:tipoCarburante!=LEU Hydrogen:tipoCarburante!=HALEU Hydrogen:tipoCarburante!=HEU Hydrogen:tipoCarburante!=Carbide Core Hydrogen:tipoCarburante!=Cermet Hydrogen:tipoCarburante!=Graphite Composite H₂:tipoCarburante!=LANTR LOX-Augmented:tipoCarburante!=ZrC Hydrogen:tipoCarburante!=NbC Hydrogen:tipoCarburante!=W-UO₂ Cermet:tipoCarburante!=Gas Core Hydrogen:tipoCarburante!=Closed Cycle Gas Core:tipoCarburante!=Centrifugal CNTR Hydrogen:tipoCarburante!=Methane CNTR:tipoCarburante!=Propane CNTR])"]},
                                     "NTR Gas Fuel Bay":            { cd: 0.18, sideCd: 0.13,  a: 0.94,  r: 1.3,  cp: 0.95,  k: 1.20e-4,η: 0.11, ηt: 0.91, ηg: 0.85, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=nuclear:tipoCarburante!=LEU Hydrogen:tipoCarburante!=HALEU Hydrogen:tipoCarburante!=HEU Hydrogen:tipoCarburante!=Carbide Core Hydrogen:tipoCarburante!=Cermet Hydrogen:tipoCarburante!=Graphite Composite H₂:tipoCarburante!=LANTR LOX-Augmented:tipoCarburante!=ZrC Hydrogen:tipoCarburante!=NbC Hydrogen:tipoCarburante!=W-UO₂ Cermet:tipoCarburante!=Centrifugal CNTR Hydrogen:tipoCarburante!=Methane CNTR:tipoCarburante!=Propane CNTR])"]},
                                     "NTR-CNTR Fuel Chamber":       { cd: 0.18, sideCd: 0.13,  a: 0.91,  r: 1.3,  cp: 0.95,  k: 1.20e-4,η: 0.09, ηt: 0.91, ηg: 0.85, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=nuclear:tipoCarburante!=LEU Hydrogen:tipoCarburante!=HALEU Hydrogen:tipoCarburante!=HEU Hydrogen:tipoCarburante!=Carbide Core Hydrogen:tipoCarburante!=Cermet Hydrogen:tipoCarburante!=Graphite Composite H₂:tipoCarburante!=LANTR LOX-Augmented:tipoCarburante!=ZrC Hydrogen:tipoCarburante!=NbC Hydrogen:tipoCarburante!=W-UO₂ Cermet:tipoCarburante!=Gas Core Hydrogen:tipoCarburante!=Closed Cycle Gas Core])"]},
                                     "Cernet Fuel Chamber":         { cd: 0.18, sideCd: 0.13,  a: 0.91,  r: 1.3,  cp: 0.95,  k: 1.20e-4,η: 0.09, ηt: 0.91, ηg: 0.85, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=nuclear:tipoCarburante!=LEU Hydrogen:tipoCarburante!=HALEU Hydrogen:tipoCarburante!=HEU Hydrogen:tipoCarburante!=Gas Core Hydrogen:tipoCarburante!=Closed Cycle Gas Core])"]},
                                     "Plasma Containment Module":   { cd: 0.17, sideCd: 0.13,  a: 0.96,  r: 1.0,  cp: 0.94,  k: 1.11e-4,η: 0.89, ηt: 0.92, ηg: 0.87, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=plasma])"]},
                                     "Monopropellant Tank":         { cd: 0.21, sideCd: 0.43,  a: 0.97,  r: 1.12, cp: 0.95,  k: 1.00e-4,η: 0.92, ηt: 0.91, ηg: 0.90, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=monopropellant:tipoCarburante!=Hydrazine Nitrate:tipoCarburante!=Dinitramine Monopropellant:tipoCarburante!=AF-M315E:tipoCarburante!=LMP-103S])"]},
                                     "Heavy Monopropellant Tank":   { cd: 0.34, sideCd: 0.54,  a: 0.96,  r: 1.13, cp: 0.87,  k: 1.00e-4,η: 0.92, ηt: 0.81, ηg: 0.90, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=monopropellant:tipoCarburante!=AF-M315E:tipoCarburante!=LMP-103S])"]},
                                     "Enforced Monopropellant Tank":{ cd: 0.41, sideCd: 0.66,  a: 0.94,  r: 1.11, cp: 0.74,  k: 1.00e-4,η: 0.92, ηt: 0.65, ηg: 0.90, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=monopropellant])"]},
                                     "Light Monopropellant Tank":   { cd: 0.22, sideCd: 0.43,  a: 0.96,  r: 1.09, cp: 0.97,  k: 1.00e-4,η: 0.92, ηt: 0.98, ηg: 0.90, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=monopropellant:tipoCarburante!=Hydrazine Nitrate:tipoCarburante!=Dinitramine Monopropellant:tipoCarburante!=AF-M315E:tipoCarburante!=LMP-103S])"]},                                                                                                                      
                                     "Hypergolic Tank":             { cd: 0.16, sideCd: 0.53,  a: 0.97,  r: 1.00, cp: 1.29,  k: 1.02e-4,η: 0.95, ηt: 0.94, ηg: 0.89, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=hypergolic:tipoCarburante!=Ethylene Diamine:tipoCarburante!=Dimethylhydrazine Nitrate:tipoCarburante!=Hydrazinium Nitrate:tipoCarburante!=Methylhydrazine:tipoCarburante!=Ethylhydrazine])"]},
                                     "Heavy Hypergolic Tank":       { cd: 0.24, sideCd: 0.56,  a: 0.96,  r: 1.15, cp: 1.26,  k: 1.02e-4,η: 0.84, ηt: 0.94, ηg: 0.89, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=hypergolic:tipoCarburante!=Hydrazinium Nitrate:tipoCarburante!=Methylhydrazine:tipoCarburante!=Ethylhydrazine])"]},
                                     "Enforced Hypergolic Tank":    { cd: 0.33, sideCd: 0.67,  a: 0.94,  r: 1.05, cp: 1.32,  k: 1.02e-4,η: 0.78, ηt: 0.94, ηg: 0.89, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=hypergolic:tipoCarburante!=Ethylene Diamine:tipoCarburante!=Dimethylhydrazine Nitrate])"]},
                                     "Pressurized Hypergolic Tank": { cd: 0.42, sideCd: 0.75,  a: 0.93,  r: 1.02, cp: 1.19,  k: 1.02e-4,η: 0.56, ηt: 0.94, ηg: 0.89, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=hypergolic:tipoCarburante!=Hydrazinium Nitrate:tipoCarburante!=Methylhydrazine:tipoCarburante!=Ethylhydrazine])"]},
                                     "Light Hypergolic Tank":       { cd: 0.12, sideCd: 0.15,  a: 0.96,  r: 1.01, cp: 0.98,  k: 1.02e-4,η: 0.97, ηt: 0.94, ηg: 0.89, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=hypergolic:tipoCarburante!=Ethylene Diamine:tipoCarburante!=Dimethylhydrazine Nitrate:tipoCarburante!=Hydrazinium Nitrate:tipoCarburante!=Methylhydrazine:tipoCarburante!=Ethylhydrazine])"]},
                                     "Helium-3 Containment Module": { cd: 0.17, sideCd: 0.24,  a: 0.89,  r: 0.88, cp: 1.39,  k: 1.02e-4,η: 0.76, ηt: 0.75, ηg: 0.87, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=fusion:tipoCarburante=Helium3-Helium3])"]},   
                                     "Deuterium-Tritium Chamber":   { cd: 0.18, sideCd: 0.25,  a: 0.96,  r: 0.96, cp: 0.92,  k: 1.02e-4,η: 0.75, ηt: 0.95, ηg: 0.87, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=fusion:tipoCarburante=Deuterium-Tritium])"]},
                                     "Deuterium Fuel Chamber":      { cd: 0.19, sideCd: 0.28,  a: 0.98,  r: 0.95, cp: 0.91,  k: 1.02e-4,η: 0.89, ηt: 0.93, ηg: 0.83, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=fusion:tipoCarburante=Deuterium-Deuterium])"]},
                                     "Deuterium-Helium3 Chamber":   { cd: 0.17, sideCd: 0.21,  a: 0.94,  r: 0.92, cp: 0.95,  k: 1.02e-4,η: 0.73, ηt: 0.97, ηg: 0.87, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=fusion:tipoCarburante=Deuterium-Helium3])"]},
                                     "Ogive":                       { cd: 0.38, sideCd: 0.42,  a: 0.75,  r: 1.2,  cp: 0.85,  k: 1.1e-4, η: 0.92, ηt: 0.95, ηg: 0.90, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=''])"]},  
                                     "Hemispherical Capsule":       { cd: 1.05, sideCd: 0.9,   a: 1.1,   r: 1.0,  cp: 1.20,  k: 1.7e-4, η: 0.88, ηt: 0.96, ηg: 0.87, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=''])"]},    
                                     "Winged Shuttle":              { cd: 0.85, sideCd: 1.25,  a: 1.3,   r: 1.3,  cp: 1.35,  k: 1.02e-4,η: 0.93, ηt: 0.88, ηg: 0.95, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=''])"]}, 
                                     "Apollo CM Block II":          { cd: 0.38, sideCd: 0.32,  a: 0.75,  r: 1.0,  cp: 1.10,  k: 1.05e-4,η: 0.92, ηt: 0.95, ηg: 0.90, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=''])"]},
                                     "Orion CM":                    { cd: 0.40, sideCd: 0.35,  a: 0.78,  r: 1.05, cp: 1.12,  k: 1.08e-4,η: 0.93, ηt: 0.96, ηg: 0.91, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=''])"]},
                                     "Soyuz Descent Module":        { cd: 0.42, sideCd: 0.38,  a: 0.70,  r: 0.95, cp: 1.05,  k: 1.02e-4,η: 0.91, ηt: 0.94, ηg: 0.89, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=''])"]},
                                     "Dragon Capsule":              { cd: 0.36, sideCd: 0.30,  a: 0.74,  r: 1.0,  cp: 1.08,  k: 1.00e-4,η: 0.92, ηt: 0.95, ηg: 0.90, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=''])"]},
                                     "Starliner CM":                { cd: 0.39, sideCd: 0.34,  a: 0.76,  r: 1.02, cp: 1.10,  k: 1.06e-4,η: 0.92, ηt: 0.95, ηg: 0.91, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=''])"]},
                                     "Empty Fairing":               { cd: 0.20, sideCd: 0.18,  a: 0.50,  r: 0.60, cp: 0.80,  k: 0.90e-4,η: 0.85, ηt: 0.88, ηg: 0.87, usable: ["Stage"],                                     conditions: ["Stage([classeCarburante=''])"]},
                                     "CO2 Cartridge Deployer":      { cd: 1.25, sideCd: 1.10,  a: 0.62,  r: 0.65, cp: 0.62,  k: 1.6e-4, η: 0.90, ηt: 0.85, ηg: 0.91, usable: ["Parachute"],                                 conditions: ["Parachute([m>-1:geometryParachute!=Toroidal:geometryParachute!=Conical])"]},
                                     "Spring Mortar Deployer":      { cd: 1.35, sideCd: 1.20,  a: 0.58,  r: 0.60, cp: 0.59,  k: 1.8e-4, η: 0.88, ηt: 0.83, ηg: 0.89, usable: ["Parachute"],                                 conditions: ["Parachute([m>-1:geometryParachute!=Flat:geometryParachute!=Hemispherical:geometryParachute!=Disk-Gap-Band])"]},
                                     "Pilot Chute Extractor":       { cd: 1.20, sideCd: 1.05,  a: 0.64,  r: 0.68, cp: 0.63,  k: 1.5e-4, η: 0.91, ηt: 0.86, ηg: 0.92, usable: ["Parachute"],                                 conditions: ["Parachute([m>-1])"]},
                                     "Slug Gun Ejector":            { cd: 1.32, sideCd: 1.18,  a: 0.59,  r: 0.63, cp: 0.60,  k: 1.75e-4,η: 0.89, ηt: 0.84, ηg: 0.90, usable: ["Parachute"],                                 conditions: ["Parachute([m>-1])"]},
                                     "Servo-Triggered Bay":         { cd: 1.22, sideCd: 1.08,  a: 0.63,  r: 0.67, cp: 0.62,  k: 1.6e-4, η: 0.91, ηt: 0.86, ηg: 0.92, usable: ["Parachute"],                                 conditions: ["Parachute([m>-1])"]},
                                     "EDM-210 Deploy Module":       { cd: 1.30, sideCd: 1.15,  a: 0.60,  r: 0.64, cp: 0.60,  k: 1.7e-4, η: 0.89, ηt: 0.84, ηg: 0.90, usable: ["Parachute"],                                 conditions: ["Parachute([m>-1])"]},
                                     "Flat Heat Shield":            { cd: 1.6,  sideCd: 0.9,   a: 1.05,  r: 1.5,  cp: 1.60,  k: 0.2e-4, η: 0.95, ηt: 0.97, ηg: 0.80, usable: ["Heat Shield"],                               conditions: ["Heat Shield([m>-1:h<20:d<11:spessorePercentuale>0.5])"]},
                                     "Ogive Heat Shield":           { cd: 1.0,  sideCd: 0.7,   a: 0.9,   r: 1.8,  cp: 1.45,  k: 1.89e-4,η: 0.98, ηt: 0.97, ηg: 0.82, usable: ["Heat Shield"],                               conditions: ["Heat Shield([m>-1:h<1:d<12:spessorePercentuale>5])"]},
                                     "Ablative Cone Shield":        { cd: 1.2,  sideCd: 0.8,   a: 1.0,   r: 1.6,  cp: 1.55,  k: 0.25e-4,η: 0.96, ηt: 0.97, ηg: 0.81, usable: ["Heat Shield"],                               conditions: ["Heat Shield([m>-1:h<1.5:d<12:spessorePercentuale>6])"]},
                                     "Modular Flat Shield":         { cd: 1.4,  sideCd: 1.0,   a: 1.1,   r: 1.3,  cp: 1.50,  k: 0.22e-4,η: 0.94, ηt: 0.96, ηg: 0.83, usable: ["Heat Shield"],                               conditions: ["Heat Shield([m>-1:h<1.2:d<10:spessorePercentuale>2])"]},
                                     "Radiative Arc Shield":        { cd: 1.1,  sideCd: 0.85,  a: 0.95,  r: 1.4,  cp: 1.40,  k: 0.28e-4,η: 0.93, ηt: 0.95, ηg: 0.84, usable: ["Heat Shield"],                               conditions: ["Heat Shield([m>-1:h<1.1:d<12:spessorePercentuale>5])"]},
                                     "RS-25 Cryo LH2":              { cd: 0.48, sideCd: 0.45,  a: 1.00,  r: 1.00, cp: 1.40,  k: 1.00e-4,η: 0.95, ηt: 0.94, ηg: 0.96, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=cryo:tipoCarburante=Liquid Hydrogen])"]},
                                     "RL10A-1 Upper Stage":         { cd: 0.42, sideCd: 0.40,  a: 0.95,  r: 1.10, cp: 1.50,  k: 0.90e-4,η: 0.96, ηt: 0.95, ηg: 0.97, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=cryo:tipoCarburante=Liquid Hydrogen])"]},
                                     "RaptorVac Cryo Methane":      { cd: 0.50, sideCd: 0.45,  a: 1.10,  r: 1.30, cp: 1.35,  k: 1.05e-4,η: 0.94, ηt: 0.93, ηg: 0.95, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=cryo:tipoCarburante=Liquid Methane])"]},
                                     "Merlin 1D Kerolox":           { cd: 0.65, sideCd: 0.60,  a: 1.20,  r: 0.70, cp: 1.30,  k: 1.10e-4,η: 0.94, ηt: 0.93, ηg: 0.95, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=cryo:tipoCarburante=LOX-Kerosene])"]},
                                     "RD-180 Kerolox":              { cd: 0.70, sideCd: 0.55,  a: 1.40,  r: 0.67, cp: 1.35,  k: 1.15e-4,η: 0.91, ηt: 0.92, ηg: 0.90, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=cryo:tipoCarburante=LOX-RP-1])"]},
                                     "RS-88 Ethanol LOX":           { cd: 0.62, sideCd: 0.58,  a: 1.05,  r: 0.95, cp: 1.28,  k: 1.12e-4,η: 0.93, ηt: 0.94, ηg: 0.92, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=cryo:tipoCarburante=LOX-Ethanol])"]},
                                     "CDD3-RV2 Cyclo":              { cd: 0.60, sideCd: 0.57,  a: 1.15,  r: 0.85, cp: 1.30,  k: 1.20e-4,η: 0.90, ηt: 0.89, ηg: 0.91, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=cryo:tipoCarburante=LOX-Cyclopropane])"]},
                                     "RCE24-139KA":                 { cd: 0.50, sideCd: 0.47,  a: 1.00,  r: 0.80, cp: 1.22,  k: 1.15e-4,η: 0.91, ηt: 0.90, ηg: 0.92, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=cryo:tipoCarburante=Liquid Ethylene])"]},
                                     "Merlin 1D":                   { cd: 0.65, sideCd: 0.60,  a: 1.15,  r: 1.20, cp: 1.30,  k: 1.10e-4,η: 0.92, ηt: 0.93, ηg: 0.94, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=liquid:tipoCarburante=RP-1])"]},
                                     "F-1":                         { cd: 0.70, sideCd: 0.55,  a: 1.40,  r: 1.10, cp: 1.35,  k: 1.30e-4,η: 0.89, ηt: 0.90, ηg: 0.88, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=liquid:tipoCarburante=RP-1])"]},
                                     "RS-88":                       { cd: 0.58, sideCd: 0.52,  a: 0.90,  r: 1.10, cp: 1.25,  k: 1.05e-4,η: 0.95, ηt: 0.94, ηg: 0.93, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=liquid:tipoCarburante=Ethanol])"]},
                                     "BioKero LE-9":                { cd: 0.63, sideCd: 0.50,  a: 0.88,  r: 1.05, cp: 1.28,  k: 1.12e-4,η: 0.93, ηt: 0.94, ηg: 0.92, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=liquid:tipoCarburante=Bio-Kerosene])"]},
                                     "HN192-1WI102":                { cd: 0.48, sideCd: 0.42,  a: 0.78,  r: 1.10, cp: 1.20,  k: 0.95e-4,η: 0.94, ηt: 0.95, ηg: 0.93, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=liquid:tipoCarburante=Hydrazine Nitrate])"]}, 
                                     "HT219DA12":                   { cd: 0.60, sideCd: 0.50,  a: 0.88,  r: 1.10, cp: 1.28,  k: 1.08e-4,η: 0.90, ηt: 0.95, ηg: 0.92, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=solid:tipoCarburante=HTPB Solid])"]},
                                     "RD-270M":                     { cd: 0.68, sideCd: 0.60,  a: 1.20,  r: 1.10, cp: 1.40,  k: 1.35e-4,η: 0.86, ηt: 0.88, ηg: 0.85, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=liquid:tipoCarburante=Pentaborane])"]},
                                     "2HD21K-A1SV L3":              { cd: 0.48, sideCd: 0.42,  a: 0.85,  r: 1.10, cp: 1.25,  k: 1.03e-4,η: 0.94, ηt: 0.95, ηg:0.93,  usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=hypergolic:tipoCarburante=Hydrazine])"]},
                                     "R2VA3 Hb":                    { cd: 0.50, sideCd: 0.44,  a: 0.87,  r: 1.15, cp: 1.27,  k: 1.02e-4,η: 0.93, ηt: 0.94, ηg:0.92,  usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=hypergolic:tipoCarburante=UDMH])"]},
                                     "3SLA0-K2S":                   { cd: 0.45, sideCd: 0.40,  a: 0.82,  r: 1.00, cp: 1.20,  k: 1.05e-4,η: 0.92, ηt: 0.93, ηg:0.91,  usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=hypergolic:tipoCarburante=Aniline])"]},
                                     "4320 A29-AB":                 { cd: 0.52, sideCd: 0.46,  a: 0.88,  r: 1.12, cp: 1.26,  k: 1.04e-4,η: 0.95, ηt: 0.96, ηg:0.94,  usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=hypergolic:tipoCarburante=Monomethylhydrazine])"]},
                                     "A03MD-Z502":                  { cd: 0.53, sideCd: 0.47,  a: 0.89,  r: 1.15, cp: 1.28,  k: 1.06e-4,η: 0.94, ηt: 0.95, ηg:0.93,  usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=hypergolic:tipoCarburante=Aerozine-50])"]},
                                     "324E 23001C-2":               { cd: 0.50, sideCd: 0.42,  a: 0.85,  r: 1.00, cp: 1.24,  k: 1.03e-4,η: 0.91, ηt: 0.92, ηg:0.90,  usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=hypergolic:tipoCarburante=Triethylaluminum])"]},
                                     "Hydrazine Thruster":          { cd: 0.48, sideCd: 0.42,  a: 0.78,  r: 1.1,  cp: 1.20,  k: 0.95e-4,η: 0.94, ηt: 0.95, ηg: 0.93, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=monopropellant:tipoCarburante=Monopropellant N2H4])"]},
                                     "AF-M315E Green Thruster":     { cd: 0.46, sideCd: 0.41,  a: 0.76,  r: 1.1,  cp: 1.18,  k: 0.94e-4,η: 0.96, ηt: 0.97, ηg: 0.95, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=monopropellant:tipoCarburante=AF-M315E])"]},
                                     "LMP-103S EcoDrive":           { cd: 0.47, sideCd: 0.42,  a: 0.77,  r: 1.12, cp: 1.19,  k: 0.94e-4,η: 0.95, ηt: 0.96, ηg: 0.94, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=monopropellant:tipoCarburante=LMP-103S])"]},
                                     "NTR Solid Core":              { cd: 0.6,  sideCd: 0.5,   a: 0.85,  r: 1.0,  cp: 1.25,  k: 1.15e-4,η: 0.93, ηt: 0.92, ηg: 0.94, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=nuclear:tipoCarburante!=HALEU Hydrogen:tipoCarburante!=Carbide Core Hydrogen:tipoCarburante!=Cermet Hydrogen:tipoCarburante!=LANTR LOX-Augmented:tipoCarburante!=ZrC Hydrogen:tipoCarburante!=NbC Hydrogen:tipoCarburante!=W-UO₂ Cermet:tipoCarburante!=Gas Core Hydrogen:tipoCarburante!=Closed Cycle Gas Core:tipoCarburante!=Molten Salt Core H₂:tipoCarburante!=Centrifugal CNTR Hydrogen:tipoCarburante!=Methane CNTR:tipoCarburante!=Propane CNTR:tipoCarburante!=Hydrogen LANTR High-Ratio:tipoCarburante!=Hydrogen NTR-Bimodal:tipoCarburante!=Ammonia NTP:tipoCarburante!=Water NTP])"] },
                                     "NTR Carbide Core Reactor":    { cd: 0.62, sideCd: 0.54,  a: 0.87,  r: 1.0,  cp: 1.28,  k: 1.16e-4,η: 0.92, ηt: 0.93, ηg: 0.93, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=nuclear:tipoCarburante!=LEU Hydrogen:tipoCarburante!=HALEU Hydrogen:tipoCarburante!=HEU Hydrogen:tipoCarburante!=Graphite Composite H₂:tipoCarburante!=Cermet Hydrogen:tipoCarburante!=LANTR LOX-Augmented:tipoCarburante!=W-UO₂ Cermet:tipoCarburante!=Gas Core Hydrogen:tipoCarburante!=Closed Cycle Gas Core:tipoCarburante!=Molten Salt Core H₂:tipoCarburante!=Centrifugal CNTR Hydrogen:tipoCarburante!=Methane CNTR:tipoCarburante!=Propane CNTR:tipoCarburante!=Hydrogen LANTR High-Ratio:tipoCarburante!=Hydrogen NTR-Bimodal:tipoCarburante!=Ammonia NTP:tipoCarburante!=Water NTP])"]},
                                     "NTR Cermet Core Reactor":     { cd: 0.61, sideCd: 0.52,  a: 0.86,  r: 1.02, cp: 1.26,  k: 1.14e-4,η: 0.91, ηt: 0.94, ηg: 0.94, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=nuclear:tipoCarburante!=LEU Hydrogen:tipoCarburante!=HALEU Hydrogen:tipoCarburante!=HEU Hydrogen:tipoCarburante!=Graphite Composite H₂:tipoCarburante!=Carbide Core Hydrogen:tipoCarburante!=LANTR LOX-Augmented:tipoCarburante!=ZrC Hydrogen:tipoCarburante!=NbC Hydrogen:tipoCarburante!=Gas Core Hydrogen:tipoCarburante!=Closed Cycle Gas Core:tipoCarburante!=Molten Salt Core H₂:tipoCarburante!=Centrifugal CNTR Hydrogen:tipoCarburante!=Methane CNTR:tipoCarburante!=Propane CNTR:tipoCarburante!=Hydrogen LANTR High-Ratio:tipoCarburante!=Hydrogen NTR-Bimodal:tipoCarburante!=Ammonia NTP:tipoCarburante!=Water NTP])"]},
                                     "NTR LANTR Booster Reactor":   { cd: 0.58, sideCd: 0.49,  a: 0.82,  r: 1.05, cp: 1.30,  k: 1.12e-4,η: 0.94, ηt: 0.92, ηg: 0.95, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=nuclear:tipoCarburante!=LEU Hydrogen:tipoCarburante!=HALEU Hydrogen:tipoCarburante!=HEU Hydrogen:tipoCarburante!=Graphite Composite H₂:tipoCarburante!=Carbide Core Hydrogen:tipoCarburante!=Cermet Hydrogen:tipoCarburante!=ZrC Hydrogen:tipoCarburante!=NbC Hydrogen:tipoCarburante!=Gas Core Hydrogen:tipoCarburante!=Closed Cycle Gas Core:tipoCarburante!=Molten Salt Core H₂:tipoCarburante!=Centrifugal CNTR Hydrogen:tipoCarburante!=Methane CNTR:tipoCarburante!=Propane CNTR:tipoCarburante!=Hydrogen NTR-Bimodal:tipoCarburante!=Ammonia NTP:tipoCarburante!=Water NTP])"]},
                                     "NTR Gas Core Drive":          { cd: 0.72, sideCd: 0.58,  a: 1.1,   r: 1.3,  cp: 1.42,  k: 1.07e-4,η: 0.90, ηt: 0.95, ηg: 0.96, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=nuclear:tipoCarburante!=LEU Hydrogen:tipoCarburante!=HALEU Hydrogen:tipoCarburante!=HEU Hydrogen:tipoCarburante!=Graphite Composite H₂:tipoCarburante!=Carbide Core Hydrogen:tipoCarburante!=Cermet Hydrogen:tipoCarburante!=LANTR LOX-Augmented:tipoCarburante!=ZrC Hydrogen:tipoCarburante!=NbC Hydrogen:tipoCarburante!=W-UO₂ Cermet:tipoCarburante!=Molten Salt Core H₂:tipoCarburante!=Centrifugal CNTR Hydrogen:tipoCarburante!=Methane CNTR:tipoCarburante!=Propane CNTR:tipoCarburante!=Hydrogen LANTR High-Ratio:tipoCarburante!=Hydrogen NTR-Bimodal:tipoCarburante!=Ammonia NTP:tipoCarburante!=Water NTP])"]},
                                     "NTR CNTR Methane Reactor":    { cd: 0.66, sideCd: 0.56,  a: 1.0,   r: 0.95, cp: 1.20,  k: 1.21e-4,η: 0.89, ηt: 0.91, ηg: 0.91, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=nuclear:tipoCarburante!=LEU Hydrogen:tipoCarburante!=HALEU Hydrogen:tipoCarburante!=HEU Hydrogen:tipoCarburante!=Graphite Composite H₂:tipoCarburante!=Carbide Core Hydrogen:tipoCarburante!=Cermet Hydrogen:tipoCarburante!=LANTR LOX-Augmented:tipoCarburante!=ZrC Hydrogen:tipoCarburante!=NbC Hydrogen:tipoCarburante!=W-UO₂ Cermet:tipoCarburante!=Gas Core Hydrogen:tipoCarburante!=Closed Cycle Gas Core:tipoCarburante!=Molten Salt Core H₂:tipoCarburante!=Centrifugal CNTR Hydrogen:tipoCarburante!=Hydrogen LANTR High-Ratio:tipoCarburante!=Hydrogen NTR-Bimodal:tipoCarburante!=Ammonia NTP:tipoCarburante!=Water NTP])"]},
                                     "IonDrive NSTAR":              { cd: 0.42, sideCd: 0.38,  a: 0.75,  r: 1.1,  cp: 1.20,  k: 0.95e-4,η: 0.96, ηt: 0.97, ηg: 0.94, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=ionic:tipoCarburante=Xenon Ion:N<0.11])"]},
                                     "IonDrive NEXT":               { cd: 0.40, sideCd: 0.36,  a: 0.72,  r: 1.15, cp: 1.22,  k: 0.94e-4,η: 0.97, ηt: 0.98, ηg: 0.95, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=ionic:tipoCarburante=Xenon Ion:N<0.237])"]},
                                     "HallDrive Krypton":           { cd: 0.44, sideCd: 0.4,   a: 0.78,  r: 1.1,  cp: 1.19,  k: 0.97e-4,η: 0.94, ηt: 0.95, ηg: 0.92, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=ionic:tipoCarburante=Krypton Ion:N<14.11])"]},
                                     "IonGrid Universal":           { cd: 0.46, sideCd: 0.42,  a: 0.8,   r: 1.2,  cp: 1.25,  k: 0.98e-4,η: 0.93, ηt: 0.94, ηg: 0.91, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=ionic:tipoCarburante!=Xenon Ion:tipoCarburante!=Krypton Ion:tipoCarburante!=Iodine Vapor:N<101.11])"]},
                                     "Helicon Thruster Argon":      { cd: 0.45, sideCd: 0.4,   a: 0.8,   r: 1.1,  cp: 1.25,  k: 1.01e-4,η: 0.96, ηt: 0.97, ηg: 0.94, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=plasma:tipoCarburante=Helicon Argon])"]},
                                     "Helicon Thruster Hydrogen":   { cd: 0.44, sideCd: 0.39,  a: 0.78,  r: 1.15, cp: 1.28,  k: 1.00e-4,η: 0.97, ηt: 0.98, ηg: 0.95, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=plasma:tipoCarburante=Hydrogen Helicon])"]},
                                     "VASIMR Alpha Core":           { cd: 0.50, sideCd: 0.42,  a: 0.9,   r: 1.2,  cp: 1.35,  k: 1.06e-4,η: 0.95, ηt: 0.96, ηg: 0.95, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=plasma:tipoCarburante!=Helicon Argon:tipoCarburante!=Hydrogen Helicon])"]},
                                     "MPD-Plasma Drive":            { cd: 0.58, sideCd: 0.46,  a: 0.92,  r: 1.1,  cp: 1.3,   k: 1.08e-4,η: 0.93, ηt: 0.95, ηg: 0.92, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=plasma:tipoCarburante!=Helicon Argon:tipoCarburante!=Hydrogen Helicon])"]},
                                     "Magneto-Plasma Coil":         { cd: 0.52, sideCd: 0.44,  a: 0.87,  r: 1.0,  cp: 1.32,  k: 1.05e-4,η: 0.94, ηt: 0.96, ηg: 0.93, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=plasma:tipoCarburante!=Helicon Argon:tipoCarburante!=Hydrogen Helicon])"]},
                                     "Fusion D-T Reactor":          { cd: 0.55, sideCd: 0.48,  a: 0.9,   r: 1.1,  cp: 1.35,  k: 1.10e-4,η: 0.96, ηt: 0.97, ηg: 0.94, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=fusion:tipoCarburante!=Deuterium-Deuterium:tipoCarburante!=Deuterium-Helium3:tipoCarburante!=Helium3-Helium3:tipoCarburante!=Proton-Boron11:tipoCarburante!=Lithium Fusion:tipoCarburante!=D-He3 Plasma])"] },
                                     "Fusion D-D Cyclotron":        { cd: 0.58, sideCd: 0.50,  a: 0.88,  r: 1.05, cp: 1.30,  k: 1.12e-4,η: 0.95, ηt: 0.96, ηg: 0.93, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=fusion:tipoCarburante!=Deuterium-Tritium:tipoCarburante!=Deuterium-Helium3:tipoCarburante!=Helium3-Helium3:tipoCarburante!=Proton-Boron11:tipoCarburante!=Lithium Fusion:tipoCarburante!=D-He3 Plasma])"] },
                                     "Fusion D-He³ Drive":          { cd: 0.52, sideCd: 0.45,  a: 0.87,  r: 1.15, cp: 1.40,  k: 1.08e-4,η: 0.97, ηt: 0.97, ηg: 0.96, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=fusion:tipoCarburante!=Deuterium-Tritium:tipoCarburante!=Deuterium-Deuterium:tipoCarburante!=Helium3-Helium3:tipoCarburante!=Proton-Boron11:tipoCarburante!=Lithium Fusion:tipoCarburante!=D-He3 Plasma])"] },
                                     "Fusion He³-He³ Drive":        { cd: 0.57, sideCd: 0.48,  a: 0.94,  r: 1.16, cp: 1.47,  k: 1.08e-4,η: 0.98, ηt: 0.96, ηg: 0.98, usable: ["Engine"],                                    conditions: ["Engine([classeCarburante=fusion:tipoCarburante!=Deuterium-Tritium:tipoCarburante=Helium3-Helium3])"] },
                                     "":                            { cd: 0,    sideCd: 0,     a: 0,     r: 0,    cp:  0,    k:0,       η:0,     ηt: 0.0,  ηg:0.0,   usable: ["Heat Shield","Parachute","Engine","Stage"],  conditions: ["Stage([])","Engine([])","Heat Shield([])","Parachute([])"]}};
const materialCpMap =               {"Alluminium":                  { cp: 900,  density: 2700, GL: 14, FT: 660,  ε: 0.19, Cd: 0.05, η: 0.62, ηt: 0.62, ηg:0.05, vtf: 350000, k: 237,  usable: ["Stage(Generic Liquid Fuel Tank([m<49000:h<20:d<9:massFuel<350000:GLimit<36])/Ogive([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Hemispherical Capsule([m<490000:h<20:d<9:massFuel=0:GLimit<36])/Winged Shuttle([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Apollo CM Block II([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Orion CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Soyuz Descent Module([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Dragon Capsule([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Starliner CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Empty Fairing([m<490000:h<20:d<9:massFuel<57770:GLimit<44])/Solid Fuel Storage([m<210000:h<13:d<5:massFuel<350000:GLimit<25])/Light Liquid Fuel Tank([m<47000:h<19:d<9:massFuel<340000:GLimit<35])/Pressurized Liquid Fuel Tank([m<46000:h<18:d<8.5:massFuel<330000:GLimit<34])/Cryogenic Fuel Tank([m<44000:h<17:d<8:massFuel<310000:GLimit<33])/Advanced Cryogenic Tank([m<43000:h<17:d<8:massFuel<300000:GLimit<33])/Light Cryogenic Tank([m<42000:h<16:d<8:massFuel<290000:GLimit<32])/Hypergolic Tank([m<420000:h<16:d<8:massFuel<290000:GLimit<32])/Pressurized Hypergolic Tank([m<660000:h<16:d<8:massFuel<290000:GLimit<32])/Heavy Hypergolic Tank([m<660000:h<16:d<8:massFuel<290000:GLimit<32])/Enforced Hypergolic Tank([m<520000:h<16:d<8:massFuel<290000:GLimit<32])/Heavy Monopropellant Tank([m<570060:h<18:d<9:massFuel<660000:GLimit<32])/Monopropellant Tank([m<380060:h<16:d<8:massFuel<490000:GLimit<32])/Enforced Monopropellant Tank([m<568000:h<16:d<8:massFuel<290000:GLimit<32])/Light Monopropellant Tank([m<228000:h<16:d<8:massFuel<290000:GLimit<32])/Light Hypergolic Tank([m<320000:h<16:d<8:massFuel<290000:GLimit<32]))","Parachute(CO2 Cartridge Deployer([numParachutes<11:areaParachute<401:maxParSpeed<8001:geometryParachute!=Toroidal:geometryParachute!=Cross])/Spring Mortar Deployer([numParachutes<11:areaParachute<401:maxParSpeed<8001])/Pilot Chute Extractor([numParachutes<11:areaParachute<401:maxParSpeed<8001])/Slug Gun Ejector([numParachutes<11:areaParachute<401:maxParSpeed<8001])/Servo-Triggered Bay([numParachutes<11:areaParachute<401:maxParSpeed<8001])/EDM-210 Deploy Module([numParachutes<11:areaParachute<401:maxParSpeed<8001]))","Engine(Hydrazine Thruster([N<3000000:tipoCarburante=Hydrazine])/AF-M315E Green Thruster([N<0250000])/LMP-103S EcoDrive([N<2300000])/RS-25 Cryo LH2([N<12000000:GLimit<45:massFuel<400000])/RL10A-1 Upper Stage([N<2500000:GLimit<42:massFuel<3000000])/RaptorVac Cryo Methane([N<15000000:GLimit<44:massFuel<4800000])/Merlin 1D Kerolox([N<8500000:GLimit<38:massFuel<2000000])/RD-180 Kerolox([N<16500000:GLimit<43:massFuel<4500000])/RS-88 Ethanol LOX([N<7200000:GLimit<36:massFuel<2800000])/CDD3-RV2 Cyclo([N<6800000:GLimit<36:massFuel<2700000])/RCE24-139KA([N<5000000:GLimit<34:massFuel<2050000])/Merlin 1D([N<8000000:GLimit<37:massFuel<3050000])/F-1([N<17000000:GLimit<45:massFuel<6000000])/RS-88([N<10000000:GLimit<40:massFuel<4000000])/BioKero LE-9([N<9000000:GLimit<39:massFuel<3800000])/HN192-1WI102([N<6000000:GLimit<35:massFuel<3000000])/HT219DA12([N<7000000:GLimit<36:massFuel<3200000])/RD-270M([N<20000000:GLimit<50:massFuel<8000000])/2HD21K-A1SV L3([N<5000000:GLimit<34:massFuel<2050000])/R2VA3 Hb([N<4500000:GLimit<33:massFuel<2300000])/3SLA0-K2S([N<4000000:GLimit<32:massFuel<2000000])/4320 A29-AB([N<5500000:GLimit<35:massFuel<2080000])/A03MD-Z502([N<6000000:GLimit<36:massFuel<3000000])/324E 23001C-2([N<5000000:GLimit<34:massFuel<2600000])/RD-180 Kerolox([N<4400000:GLimit<36:massFuel<2800000]))"]},
                                     "Titanium":                    { cp: 520,  density: 4500, GL: 29, FT: 1668, ε: 0.70, Cd: 0.09, η: 0.58, ηt: 0.58, ηg:0.09, vtf: 480000, k: 21.9, usable: ["Stage(Generic Liquid Fuel Tank([GLimit<35:m<14000])/Ogive([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Hemispherical Capsule([m<490000:h<20:d<9:massFuel=0:GLimit<36])/Winged Shuttle([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Apollo CM Block II([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Orion CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Soyuz Descent Module([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Dragon Capsule([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Starliner CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Empty Fairing([m<490000:h<20:d<9:massFuel<57770:GLimit<44])/Solid Fuel Storage([m<280000:h<13:d<5:massFuel<360000:GLimit<25])/Hypergolic Tank([m<420000:h<16:d<8:massFuel<290000:GLimit<32])/Pressurized Hypergolic Tank([m<660000:h<16:d<8:massFuel<290000:GLimit<32])/Heavy Hypergolic Tank([m<660000:h<16:d<8:massFuel<290000:GLimit<32])/Enforced Hypergolic Tank([m<520000:h<16:d<8:massFuel<290000:GLimit<32])/Ionized Fuel Enforced Tank([m<350000:h<14:d<6:massFuel<40000])/Deuterium-Tritium Chamber([GLimit<43:m<90000:d<8:h<14:spessorePercentuale>8])/Deuterium-Helium3 Chamber([GLimit<54:m<150000:d<8:h<17:spessorePercentuale>10])/Deuterium Fuel Chamber([GLimit<44:m<110000:d<9:h<15:spessorePercentuale>5])/Ionized Fuel Pressurized Bay([m<400000:h<12:d<7:massFuel<50000])/Ionized Fuel Storage([m<200000:h<11:d<4:massFuel<30000])/Light Hypergolic Tank([m<320000:h<16:d<8:massFuel<290000:GLimit<32])/Heavy Monopropellant Tank([m<570060:h<18:d<9:massFuel<660000:GLimit<32])/Low Enriched Fuel Chamber([m<500000:h<14:d<8:spessorePercentuale>26])/Monopropellant Tank([m<380060:h<16:d<8:massFuel<490000:GLimit<32])/Plasma Containment Module([m<300000:h<16:d<9:spessorePercentuale>5])/Enforced Monopropellant Tank([m<568000:h<16:d<8:massFuel<290000:GLimit<32])/Light Monopropellant Tank([m<228000:h<16:d<8:massFuel<290000:GLimit<32])/Enforced Liquid Fuel Tank([GLimit<34:m<13000])/Heavy Liquid Fuel Tank([GLimit<33:m<12500])/Cryogenic Fuel Tank([GLimit<33:m<12000])/Enforced Cryogenic Tank([GLimit<32:m<11000])/Advanced Cryogenic Tank([GLimit<32:m<10500])/Empty Fairing([GLimit<30:m<8000:d<5:h<10])/Light Cryogenic Tank([GLimit<30:m<8000:d<5:h<10]))","Engine(Hydrazine Thruster([N<350000])/AF-M315E Green Thruster([N<300000])/NTR Solid Core([N<1000000])/NTR Carbide Core Reactor([N<1200000])/NTR Cermet Core Reactor([N<1100000])/NTR LANTR Booster([N<900000])/NTR Gas Core Drive([N<1500000])/NTR CNTR Methane Reactor([N<800000])/IonDrive NSTAR([N<200000])/IonDrive NEXT([N<250000])/HallDrive Krypton([N<180000])/IonGrid Universal([N<220000])/Helicon Thruster Argon([N<170000])/Helicon Thruster Hydrogen([N<190000])/VASIMR Alpha Core([N<300000])/MPD-Plasma Drive([N<400000])/Magneto-Plasma Coil([N<350000])/Fusion D-T Reactor([N<500000])/Fusion D-D Cyclotron([N<450000])/Fusion D-He³ Drive([N<550000])/HN192-1WI102([N<400000])/HT219DA12([N<450000])/RD-270M([N<600000])/2HD21K-A1SV L3([N<300000])/R2VA3 Hb([N<250000])/3SLA0-K2S([N<200000])/4320 A29-AB([N<350000])/A03MD-Z502([N<400000])/324E 23001C-2([N<300000])"]},
                                     "Steel":                       { cp: 470,  density: 7850, GL: 20, FT: 1540, ε: 0.80, Cd: 0.14, η: 0.54, ηt: 0.54, ηg:0.14, vtf: 420000, k: 43.1, usable: ["Stage(Enforced Liquid Fuel Tank([m<25000:GLimit<28:massFuel<1100000:h<30:d<11])/Ogive([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Hemispherical Capsule([m<490000:h<20:d<9:massFuel=0:GLimit<36])/Winged Shuttle([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Apollo CM Block II([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Orion CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Soyuz Descent Module([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Dragon Capsule([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Starliner CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Empty Fairing([m<490000:h<20:d<9:massFuel<57770:GLimit<44])/Solid Fuel Storage([m<280000:h<13:d<5:massFuel<350000:GLimit<25])/Hypergolic Tank([m<420000:h<16:d<8:massFuel<290000:GLimit<32])/Pressurized Hypergolic Tank([m<660000:h<16:d<8:massFuel<290000:GLimit<32])/Heavy Hypergolic Tank([m<660000:h<16:d<8:massFuel<290000:GLimit<32])/Enforced Hypergolic Tank([m<520000:h<16:d<8:massFuel<290000:GLimit<32])/Light Hypergolic Tank([m<320000:h<16:d<8:massFuel<290000:GLimit<32])/Heavy Liquid Fuel Tank([m<24000:GLimit<27:massFuel<1000000:h<29:d<10.5])/Pressurized Cryogenic Tank([m<23000:GLimit<26:massFuel<950000:h<28:d<10])/Enforced Cryogenic Tank([m<22000:GLimit<25:massFuel<900000:h<27:d<9.5]))","Engine(F-1([N<1700000])/RS-88 Ethanol LOX([N<1000000])/Heavy Monopropellant Tank([m<570060:h<18:d<9:massFuel<660000:GLimit<32])/Monopropellant Tank([m<380060:h<16:d<8:massFuel<490000:GLimit<32])/Enforced Monopropellant Tank([m<568000:h<16:d<8:massFuel<290000:GLimit<32])/Light Monopropellant Tank([m<228000:h<16:d<8:massFuel<290000:GLimit<32])/RD-270M([N<2000000:GLimit<50:massFuel<800000])/2HD21K-A1SV L3([N<500000])/R2VA3 Hb([N<450000])/3SLA0-K2S([N<400000])/4320 A29-AB([N<550000])/A03MD-Z502([N<600000])/324E 23001C-2([N<500000])/IonDrive NSTAR([N<300000])/IonDrive NEXT([N<350000])/HallDrive Krypton([N<250000])/IonGrid Universal([N<300000])/Helicon Thruster Argon([N<220000])/Helicon Thruster Hydrogen([N<240000])/VASIMR Alpha Core([N<400000])/MPD-Plasma Drive([N<500000])/Magneto-Plasma Coil([N<450000])/Fusion D-T Reactor([N<600000])/Fusion D-D Cyclotron([N<550000])/Fusion D-He³ Drive([N<650000])","Parachute(CO2 Cartridge Deployer([numParachutes<10:areaParachute<400:maxParSpeed<8000:geometryParachute!=Toroidal:geometryParachute!=Cross])/Spring Mortar Deployer([numParachutes<10:areaParachute<400:maxParSpeed<8000])/Pilot Chute Extractor([numParachutes<10:areaParachute<400:maxParSpeed<8000])/Slug Gun Ejector([numParachutes<10:areaParachute<400:maxParSpeed<8000])/Servo-Triggered Bay([numParachutes<10:areaParachute<400:maxParSpeed<8000])/EDM-210 Deploy Module([numParachutes<10:areaParachute<400:maxParSpeed<8000]))"]},
                                     "Carbon Composite":            { cp: 710,  density: 1940, GL: 40, FT: 4144, ε: 0.89, Cd: 0.18, η: 0.68, ηt: 0.68, ηg:0.18, vtf: 620000, k: 17.5, usable: ["Heat Shield(Flat Heat Shield([Tmax<12000:GLimit<84:m<75000:d<10:h<0.4])/Ogive Heat Shield([Tmax<15533:GLimit<84:m<84000:d<12:h<0.5])/Modular Flat Shield([Tmax<11000:GLimit<80:m<72000:d<9:h<0.4])/Radiative Arc Shield([Tmax<13000:GLimit<76:m<70000:d<9:h<0.4]))","Engine(IonDrive NEXT([N<80000])/High Enriched Fuel Chamber([m<400000:h<14:d<8.spessorePercentuale>20])/High Enriched Fuel Chamber([m<500000:h<14:d<8:spessorePercentuale>26])/IonGrid Universal([N<85000])/Merlin 1D([N<1300000000])/F-1([N<1200000000])/VASIMR Alpha Core([N<150000])/Fusion D-T Reactor([N<200000])/Fusion D-D Cyclotron([N<180000])/Fusion D-He³ Drive([N<220000])","Stage(Generic Liquid Fuel Tank([m<60000:h<25:d<10:massFuel<500000:GLimit<50])/Plasma Containment Module([m<300000:h<16:d<9:spessorePercentuale>5])/Cernet Fuel Chamber([m<500000:h<14:d<8:spessorePercentuale>22])/Solid Fuel Storage([m<250000:h<13:d<5:massFuel<350000:GLimit<45])/Enforced Liquid Fuel Tank([m<58000:h<24:d<9.5:massFuel<480000:GLimit<48])/Heavy Monopropellant Tank([m<570060:h<18:d<9:massFuel<660000:GLimit<32])/Monopropellant Tank([m<380060:h<16:d<8:massFuel<490000:GLimit<32])/Deuterium-Tritium Chamber([GLimit<43:m<90000:d<8:h<14:spessorePercentuale>8])/Deuterium-Helium3 Chamber([GLimit<54:m<150000:d<8:h<17:spessorePercentuale>10])/Deuterium Fuel Chamber([GLimit<44:m<110000:d<9:h<15:spessorePercentuale>5])/Enforced Monopropellant Tank([m<568000:h<16:d<8:massFuel<290000:GLimit<32])/Light Monopropellant Tank([m<228000:h<16:d<8:massFuel<290000:GLimit<32])/Low Enriched Fuel Chamber([m<500000:h<14:d<8:spessorePercentuale>26])/Hypergolic Tank([m<420000:h<16:d<8:massFuel<290000:GLimit<32])/Pressurized Hypergolic Tank([m<660000:h<16:d<8:massFuel<290000:GLimit<32])/Ionized Fuel Enforced Tank([m<350000:h<14:d<6:massFuel<40000])/Ionized Fuel Pressurized Bay([m<400000:h<12:d<7:massFuel<50000])/Ionized Fuel Storage([m<200000:h<11:d<4:massFuel<30000])/Heavy Hypergolic Tank([m<660000:h<16:d<8:massFuel<290000:GLimit<32])/Enforced Hypergolic Tank([m<520000:h<16:d<8:massFuel<290000:GLimit<32])/Light Hypergolic Tank([m<320000:h<16:d<8:massFuel<290000:GLimit<32])/Heavy Liquid Fuel Tank([m<56000:h<23:d<9:massFuel<460000:GLimit<46])/Cryogenic Fuel Tank([m<54000:h<22:d<8.5:massFuel<440000:GLimit<44])/NTR-CNTR Fuel Chamber([m<540000:h<22:spessorePercentuale>10:massFuel<44000:GLimit<44])/Enforced Cryogenic Tank([m<52000:h<21:d<8:massFuel<420000:GLimit<42])/Ogive([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Hemispherical Capsule([m<490000:h<20:d<9:massFuel=0:GLimit<36])/Winged Shuttle([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Apollo CM Block II([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Orion CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Soyuz Descent Module([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Dragon Capsule([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Starliner CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Empty Fairing([m<490000:h<20:d<9:massFuel<57770:GLimit<44])/Advanced Cryogenic Tank([m<50000:h<20:d<7.5:massFuel<400000:GLimit<40])/Empty Fairing([m<48000:h<19:d<7:GLimit<38])/Light Cryogenic Tank([m<46000:h<18:d<7:massFuel<380000:GLimit<36])/Light Liquid Fuel Tank([m<44000:h<17:d<6.5:massFuel<360000:GLimit<34])/Pressurized Liquid Fuel Tank([m<42000:h<16:d<6:massFuel<340000:GLimit<32])","Parachute(CO2 Cartridge Deployer([numParachutes<10:areaParachute<400:maxParSpeed<8000:geometryParachute!=Toroidal:geometryParachute!=Cross])/Spring Mortar Deployer([numParachutes<10:areaParachute<400:maxParSpeed<8000])/Pilot Chute Extractor([numParachutes<10:areaParachute<400:maxParSpeed<8000])/Slug Gun Ejector([numParachutes<10:areaParachute<400:maxParSpeed<8000])/Servo-Triggered Bay([numParachutes<10:areaParachute<400:maxParSpeed<8000])/EDM-210 Deploy Module([numParachutes<10:areaParachute<400:maxParSpeed<8000]))"]},
                                     "Tantalum Hanfinum Carbide":   { cp: 160,  density: 13600,GL: 21, FT: 4215, ε: 0.71, Cd: 0.22, η: 0.40, ηt: 0.40, ηg:0.22, vtf: 700000, k: 22.5, usable: ["Heat Shield(Flat Heat Shield([Tmax<20000:GLimit<41:m<500000:d<12:h<0.4])/Modular Flat Shield([Tmax<18000:GLimit<40:m<420000:d<11:h<0.4])/Ogive Heat Shield([Tmax<25000:GLimit<50:m<500000:d<12:h<0.6])/Ablative Cone Shield([Tmax<23000:GLimit<45:m<450000:d<12:h<0.5])/Radiative Arc Shield([Tmax<21000:GLimit<43:m<420000:d<11:h<0.4]))","Engine(NTR Solid Core([N<2000000:GLimit<50:massFuel<800000])/NTR Carbide Core Reactor([N<2500000:GLimit<55:massFuel<1000000])/NTR Cermet Core Reactor([N<2300000:GLimit<52:massFuel<900000])/NTR LANTR Booster([N<1800000:GLimit<48:massFuel<700000])/NTR Gas Core Drive([N<3000000:GLimit<60:massFuel<1200000])/NTR CNTR Methane Reactor([N<1500000:GLimit<45:massFuel<600000])/IonDrive NSTAR([N<400000:GLimit<35])/IonDrive NEXT([N<500000:GLimit<40])/HallDrive Krypton([N<350000:GLimit<38])/c([N<45000000])/Helicon Thruster Argon([N<300000:GLimit<36])/Helicon Thruster Hydrogen([N<350000:GLimit<37])/v([N<600000000])/MPD-Plasma Drive([N<700000:GLimit<55])/Magneto-Plasma Coil([N<650000:GLimit<53])/Fusion D-T Reactor([N<800000:GLimit<60])/Fusion D-D Cyclotron([N<750000:GLimit<58])/Fusion D-He³ Drive([N<900000:GLimit<65]))"]},
                                     "Hafnium Carbide":             { cp: 120,  density: 12200,GL: 25, FT: 3982, ε: 0.65, Cd: 0.20, η: 0.43, ηt: 0.43, ηg:0.20, vtf: 650000, k: 17.6, usable: ["Heat Shield(Flat Heat Shield([Tmax<17000:GLimit<45:m<220000:d<12:h<0.4])/Modular Flat Shield([Tmax<16500:GLimit<43:m<210000:d<11:h<0.4])/Ogive Heat Shield([Tmax<21000:GLimit<53:m<260000:d<12:h<0.5])/Ablative Cone Shield([Tmax<19000:GLimit<47:m<240000:d<12:h<0.5])/Radiative Arc Shield([Tmax<18000:GLimit<44:m<230000:d<11:h<0.4]))","Engine(NTR Solid Core([N<1500000:GLimit<50:massFuel<600000])/NTR Carbide Core Reactor([N<2000000:GLimit<55:massFuel<800000])/NTR Cermet Core Reactor([N<1800000:GLimit<52:massFuel<700000])/NTR LANTR Booster([N<1400000:GLimit<48:massFuel<500000])/NTR Gas Core Drive([N<2500000:GLimit<60:massFuel<1000000])/NTR CNTR Methane Reactor([N<1200000:GLimit<45:massFuel<400000])/IonDrive NSTAR([N<300000:GLimit<35])/IonDrive NEXT([N<400000:GLimit<40])/HallDrive Krypton([N<300000:GLimit<38])/IonGrid Universal([N<400000:GLimit<42])/Helicon Thruster Argon([N<250000:GLimit<36])/Helicon Thruster Hydrogen([N<300000:GLimit<37])/VASIMR Alpha Core([N<500000:GLimit<50])/MPD-Plasma Drive([N<600000:GLimit<55])/Magneto-Plasma Coil([N<550000:GLimit<53])/Fusion D-T Reactor([N<700000:GLimit<60])/Fusion D-D Cyclotron([N<650000:GLimit<58])/Fusion D-He³ Drive([N<800000:GLimit<65]))"]},
                                     "Ablative Ceramic":            { cp: 1500, density: 3100, GL: 15, FT: 5430, ε: 0.95, Cd: 0.28, η: 0.37, ηt: 0.37, ηg:0.28, vtf: 200000, k: 0.13, usable: ["Heat Shield(Flat Heat Shield([Tmax<11000:GLimit<54:m<38000:d<9:h<0.4])/Modular Flat Shield([Tmax<10600:GLimit<52:m<36000:d<8:h<0.4])/Ogive Heat Shield([Tmax<12442:GLimit<61:m<45500:d<9:h<0.6])/Ablative Cone Shield([Tmax<12000:GLimit<59:m<44000:d<9:h<0.5])/Radiative Arc Shield([Tmax<11500:GLimit<53:m<40000:d<9:h<0.4]))"]},
                                     "Insulating Foam":             { cp: 1400, density: 40,   GL: 4,  FT: 528.8,ε: 0.98, Cd: 0.35, η: 0.25, ηt: 0.25, ηg:0.35, vtf: 50000,  k: 0.04, usable: ["Heat Shield(Flat Heat Shield([Tmax<1000:GLimit<25:m<10000:d<9:h<20]))" ] },
                                     "Graphite":                    { cp: 710,  density: 1870, GL: 30, FT: 3650, ε: 0.90, Cd: 0.15, η: 0.6,  ηt: 0.66, ηg:0.15, vtf: 400000, k: 422,  usable: ["Heat Shield(Ogive Heat Shield([Tmax>2500:GLimit<20])/Flat Heat Shield([Tmax>2500:GLimit<24:m<65000:d<9:h<0.4])/Radiative Arc Shield([Tmax>3000:GLimit<28:m<70000:d<10:h<0.4])/Modular Flat Shield([Tmax>3000:GLimit<26:m<68000:d<9:h<0.4]))","Engine(IonGrid Universal([N<85000])/HallDrive Krypton([N<100000])/Magneto-Plasma Coil([N<140000])/MPD-Plasma Drive([N<120000])/VASIMR Alpha Core([N<180000])/Fusion D-T Reactor([N<250000])/Fusion D-D Cyclotron([N<220000])/Fusion D-He³ Drive([N<300000])"]},
                                     "Kevlar":                      { cp: 1600, density: 1440, GL: 38, FT: 500,  ε: 0.74, Cd: 0.11, η: 0.65, ηt: 0.65, ηg:0.11, vtf: 100000, k: 0.06, usable: ["Parachute(CO2 Cartridge Deployer([GLimit<25:Tmax<2500:numParachutes<6:m<1400:geometryParachute!=Toroidal:geometryParachute!=Cross:maxParSpeed<4001:areaParachute<351])/Spring Mortar Deployer([GLimit<25:Tmax<2500:numParachutes<6:m<1400:geometryParachute!=Toroidal:geometryParachute!=Cross:maxParSpeed<4001:areaParachute<351])/Pilot Chute Extractor([GLimit<25:Tmax<2500:numParachutes<6:m<1400:geometryParachute!=Toroidal:geometryParachute!=Cross:maxParSpeed<4001:areaParachute<351])/Slug Gun Ejector([GLimit<25:Tmax<2500:numParachutes<6:m<1400:geometryParachute!=Toroidal:geometryParachute!=Cross:maxParSpeed<4001:areaParachute<351])/Servo-Triggered Bay([GLimit<25:Tmax<2500:numParachutes<6:m<1400:geometryParachute!=Toroidal:geometryParachute!=Cross:maxParSpeed<4001:areaParachute<351])/EDM-210 Deploy Module([GLimit<25:Tmax<2500:numParachutes<6:m<1400:geometryParachute!=Toroidal:geometryParachute!=Cross:maxParSpeed<4001:areaParachute<351]))"]},
                                     "Porous Titanium":             { cp: 450,  density: 2900, GL: 20, FT: 1668, ε: 0.69, Cd: 0.25, η: 0.31, ηt: 0.31, ηg:0.25, vtf: 220000, k: 1.54, usable: ["Stage(Modular([GLimit<22:m<12000])/Light Cryogenic Tank([GLimit<20:m<11000])/Ionized Fuel Light Storage([GLimit<21:m<11500])/Hypergolic Tank([GLimit<20:m<10500])/Monopropellant Tank([GLimit<19:m<9500])/Deuterium-Tritium Chamber([GLimit<43:m<90000:d<8:h<14:spessorePercentuale>8])/Deuterium-Helium3 Chamber([GLimit<54:m<150000:d<8:h<17:spessorePercentuale>10])/Deuterium Fuel Chamber([GLimit<44:m<110000:d<9:h<15:spessorePercentuale>5])/Plasma Containment Module([GLimit<22:m<120000:spessorePercentuale>5]))","Heat Shield(Flat Heat Shield([Tmax<1600:GLimit<15:m<3000:d<6:h<0.7])/Modular Flat Shield([Tmax<1500:GLimit<14:m<2900:d<6:h<0.7])/Radiative Arc Shield([Tmax<1700:GLimit<16:m<3100:d<6:h<0.6])/Ogive Heat Shield([Tmax<1800:GLimit<17:m<3200:d<6:h<0.7])/Ablative Cone Shield([Tmax<2000:GLimit<18:m<3300:d<6:h<0.8]))","Engine(IonDrive NEXT([N<50000])/IonGrid Universal([N<60000])/MPD-Plasma Drive([N<80000])/Magneto-Plasma Coil([N<70000])/VASIMR Alpha Core([N<90000])/Fusion D-T Reactor([N<120000])/Fusion D-D Cyclotron([N<110000])/Fusion D-He³ Drive([N<130000])"]},
                                     "Tungsten Composite" :         { cp: 200,  density: 17500,GL: 30, FT: 3650, ε: 0.75, Cd: 0.30, η: 0.45, ηt: 0.45, ηg:0.30, vtf: 800000, k: 114.5,usable: ["Heat Shield(Flat Heat Shield([Tmax<30000:GLimit<50:m<100000:d<12:h<0.4])/Modular Flat Shield([Tmax<28000:GLimit<48:m<95000:d<11:h<0.4])/Ogive Heat Shield([Tmax<35000:GLimit<55:m<120000:d<12:h<0.5])/Ablative Cone Shield([Tmax<32000:GLimit<52:m<110000:d<12:h<0.5])/Radiative Arc Shield([Tmax<30000:GLimit<50:m<105000:d<11:h<0.4])","Engine(IonDrive NEXT([N<120000])/IonGrid Universal([N<140000])/MPD-Plasma Drive([N<180000])/Magneto-Plasma Coil([N<160000])/VASIMR Alpha Core([N<200000])/Fusion D-T Reactor([N<250000])/Fusion D-D Cyclotron([N<220000])/Fusion D-He³ Drive([N<300000])/NTR CNTR Methane Reactor([N<50000000]))","Stage(High Enriched Fuel Chamber([m<500000:h<14:d<8:spessorePercentuale>20])/Ogive([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Hemispherical Capsule([m<490000:h<20:d<9:massFuel=0:GLimit<36])/Winged Shuttle([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Apollo CM Block II([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Orion CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Soyuz Descent Module([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Dragon Capsule([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Starliner CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Empty Fairing([m<490000:h<20:d<9:massFuel<57770:GLimit<44])/NTR Gas Fuel Bay([m<500000:h<14:d<8:spessorePercentuale>18])/Cernet Fuel Chamber([m<500000:h<14:d<8:spessorePercentuale>22])/Plasma Containment Module([m<300000:h<16:d<9:spessorePercentuale>5])/High Enriched Fuel Chamber([m<500000:h<14:d<8:spessorePercentuale>26]))"]},
                                     "Beryllium":                   { cp: 2000, density: 1850, GL: 50, FT: 2000, ε: 0.85, Cd: 0.20, η: 0.70, ηt: 0.70, ηg:0.20, vtf: 300000, k: 216.3,usable: ["Heat Shield(Flat Heat Shield([Tmax<5000:GLimit<30:m<20000:d<9:h<0.4])/Modular Flat Shield([Tmax<4800:GLimit<28:m<19000:d<8:h<0.4])/Ogive Heat Shield([Tmax<6000:GLimit<35:m<22000:d<9:h<0.5])/Ablative Cone Shield([Tmax<5500:GLimit<32:m<21000:d<9:h<0.5])/Radiative Arc Shield([Tmax<5200:GLimit<30:m<20000:d<8:h<0.4])", "Engine(IonDrive NEXT([N<100000])/IonGrid Universal([N<120000])/MPD-Plasma Drive([N<150000])/Magneto-Plasma Coil([N<140000])/VASIMR Alpha Core([N<180000])/Fusion D-T Reactor([N<250000])/Fusion D-D Cyclotron([N<220000])/Fusion D-He³ Drive([N<300000])","Stage(High Enriched Fuel Chamber([m<500000:h<14:d<8:spessorePercentuale>20])/Plasma Containment Module([m<300000:h<16:d<9:spessorePercentuale>5])/Deuterium-Tritium Chamber([GLimit<43:m<90000:d<8:h<14:spessorePercentuale>8])/Ogive([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Hemispherical Capsule([m<490000:h<20:d<9:massFuel=0:GLimit<36])/Winged Shuttle([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Apollo CM Block II([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Orion CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Soyuz Descent Module([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Dragon Capsule([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Starliner CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Empty Fairing([m<490000:h<20:d<9:massFuel<57770:GLimit<44])/Deuterium-Helium3 Chamber([GLimit<54:m<150000:d<8:h<17:spessorePercentuale>10])/Deuterium Fuel Chamber([GLimit<44:m<110000:d<9:h<15:spessorePercentuale>5])/Low Enriched Fuel Chamber([m<500000:h<14:d<8:spessorePercentuale>26])/High Enriched Fuel Chamber([m<500000:h<14:d<8:spessorePercentuale>26])/NTR Gas Fuel Bay([m<500000:h<14:d<8:spessorePercentuale>18])/Cernet Fuel Chamber([m<500000:h<14:d<8:spessorePercentuale>22]))"]},
                                     "Lithium Hydride":             { cp: 1500, density: 800,  GL: 10, FT: 3000, ε: 0.90, Cd: 0.15, η: 0.50, ηt: 0.50, ηg:0.15, vtf: 150000, k: 14.33,usable: ["Heat Shield(Flat Heat Shield([Tmax<2000:GLimit<20:m<5000:d<6:h<0.4])/Modular Flat Shield([Tmax<1800:GLimit<18:m<4500:d<5:h<0.4])/Ogive Heat Shield([Tmax<2500:GLimit<25:m<6000:d<7:h<0.5])/Ablative Cone Shield([Tmax<2200:GLimit<22:m<5500:d<6:h<0.5])/Radiative Arc Shield([Tmax<2000:GLimit<20:m<5000:d<6:h<0.4]))","Engine(IonDrive NEXT([N<60000])/IonGrid Universal([N<70000])/MPD-Plasma Drive([N<90000])/Magneto-Plasma Coil([N<80000])/VASIMR Alpha Core([N<100000])/Fusion D-T Reactor([N<130000])/Fusion D-D Cyclotron([N<120000])/Fusion D-He³ Drive([N<150000])","Stage(Generic Liquid Fuel Tank([m<30000:h<15:d<8:massFuel<200000:GLimit<30])/Enforced Liquid Fuel Tank([m<28000:h<14:d<7.5:massFuel<180000:GLimit<28])/Ionized Fuel Enforced Tank([m<350000:h<14:d<6:massFuel<40000])/Ionized Fuel Pressurized Bay([m<400000:h<12:d<7:massFuel<50000])/Ionized Fuel Storage([m<200000:h<11:d<4:massFuel<30000])/Deuterium-Tritium Chamber([GLimit<43:m<90000:d<8:h<14:spessorePercentuale>8])/Deuterium-Helium3 Chamber([GLimit<54:m<150000:d<8:h<17:spessorePercentuale>10])/Deuterium Fuel Chamber([GLimit<44:m<110000:d<9:h<15:spessorePercentuale>5])/NTR Gas Fuel Bay([m<500000:h<14:d<8:spessorePercentuale>18])/Cernet Fuel Chamber([m<500000:h<14:d<8:spessorePercentuale>22])/Heavy Liquid Fuel Tank([m<26000:h<13:d<7:massFuel<160000:GLimit<26])/Cryogenic Fuel Tank([m<24000:h<12:d<6.5:massFuel<140000:GLimit<24])/Enforced Cryogenic Tank([m<22000:h<11:d<6:massFuel<120000:GLimit<22])/Advanced Cryogenic Tank([m<20000:h<10:d<5.5:massFuel<100000:GLimit<20])/Empty Fairing([m<18000:h<9:d<5:GLimit<18])/Light Cryogenic Tank([m<16000:h<8:d<4.5:massFuel<80000:GLimit<16])/Light Liquid Fuel Tank([m<14000:h<7:d<4:massFuel<60000:GLimit<14])/Ogive([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Hemispherical Capsule([m<490000:h<20:d<9:massFuel=0:GLimit<36])/Winged Shuttle([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Apollo CM Block II([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Orion CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Soyuz Descent Module([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Dragon Capsule([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Starliner CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Empty Fairing([m<490000:h<20:d<9:massFuel<57770:GLimit<44])/Pressurized Liquid Fuel Tank([m<12000:h<6:d<3.5:massFuel<40000:GLimit<12]))"]},
                                     "Silicon Carbide" :            { cp: 2000, density: 3200, GL: 35, FT: 4000, ε: 0.80, Cd: 0.25, η: 0.60, ηt: 0.60, ηg:0.25, vtf: 500000, k: 144.3,usable: ["Heat Shield(Flat Heat Shield([Tmax<7000:GLimit<40:m<30000:d<9:h<0.4])/Modular Flat Shield([Tmax<6500:GLimit<38:m<28000:d<8:h<0.4])/Ogive Heat Shield([Tmax<8000:GLimit<45:m<35000:d<9:h<0.5])/Ablative Cone Shield([Tmax<7500:GLimit<42:m<32000:d<9:h<0.5])/Radiative Arc Shield([Tmax<7000:GLimit<40:m<30000:d<8:h<0.4]))","Engine(IonDrive NEXT([N<90000])/IonGrid Universal([N<100000])/MPD-Plasma Drive([N<130000])/Magneto-Plasma Coil([N<120000])/VASIMR Alpha Core([N<150000])/Fusion D-T Reactor([N<200000])/Fusion D-D Cyclotron([N<180000])/Fusion D-He³ Drive([N<220000])/NTR Solid Core([N<250000])/NTR Carbide Core Reactor([N<300000])/NTR Cermet Core Reactor([N<280000])/NTR LANTR Booster([N<220000])/NTR Gas Core Drive([N<350000])/NTR CNTR Methane Reactor([N<200000])/NTR Deuterium Reactor([N<180000])/NTR Helium3 Reactor([N<200000])/NTR Proton-Boron11 Reactor([N<250000])/NTR Lithium Fusion Reactor([N<300000])/NTR D-He3 Plasma Reactor([N<350000])/BioKero LE-9([N<120000])/HN192-1WI102([N<100000])/HT219DA12([N<110000])/RD-270M([N<400000])/2HD21K-A1SV L3([N<90000])/R2VA3 Hb([N<80000])/3SLA0-K2S([N<70000])/4320 A29-AB([N<95000])/A03MD-Z502([N<100000])/324E 23001C-2([N<80000])","Stage(Generic Liquid Fuel Tank([m<80000:h<30:d<10:massFuel<600000:GLimit<60])/Ogive([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Hemispherical Capsule([m<490000:h<20:d<9:massFuel=0:GLimit<36])/Winged Shuttle([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Apollo CM Block II([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Orion CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Soyuz Descent Module([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Dragon Capsule([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Starliner CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Empty Fairing([m<490000:h<20:d<9:massFuel<57770:GLimit<44])/Plasma Containment Module([m<300000:h<16:d<9:spessorePercentuale>5])/NTR Gas Fuel Bay([m<500000:h<14:d<8:spessorePercentuale>18])/Ionized Fuel Enforced Tank([m<350000:h<14:d<6:massFuel<400000])/Ionized Fuel Pressurized Bay([m<400000:h<12:d<7:massFuel<500000])/Ionized Fuel Storage([m<200000:h<11:d<4:massFuel<300000])/Enforced Liquid Fuel Tank([m<78000:h<28:d<9.5:massFuel<550000:GLimit<58])/Deuterium-Tritium Chamber([GLimit<43:m<90000:d<8:h<14:spessorePercentuale>8])/Deuterium-Helium3 Chamber([GLimit<54:m<150000:d<8:h<17:spessorePercentuale>10])/Deuterium Fuel Chamber([GLimit<44:m<110000:d<9:h<15:spessorePercentuale>5])/Heavy Liquid Fuel Tank([m<76000:h<26:d<9:massFuel<500000:GLimit<56])/Cryogenic Fuel Tank([m<74000:h<24:d<8.5:massFuel<450000:GLimit<54])/Enforced Cryogenic Tank([m<72000:h<22:d<8:massFuel<400000:GLimit<52])/Advanced Cryogenic Tank([m<70000:h<20:d<7.5:massFuel<350000:GLimit<50])/Empty Fairing([m<68000:h<18:d<7:GLimit<48])/Light Cryogenic Tank([m<66000:h<16:d<6.5:massFuel<300000:GLimit<46])/Light Liquid Fuel Tank([m<64000:h<14:d<6:massFuel<250000:GLimit<44])/Pressurized Liquid Fuel Tank([m<62000:h<12:d<5.5:massFuel<200000:GLimit<42])/Helium-3 Containment Module([m<920000:h<12:d<7.5:spessorePercentuale>5:massFuel<80000:GLimit<34]))","Parachute(CO2 Cartridge Deployer([numParachutes<=10:areaParachute<=400:maxParSpeed<=8000:geometryParachute!=Toroidal:geometryParachute!=Cross])/Spring Mortar Deployer([numParachutes<=10:areaParachute<=400:maxParSpeed<=8000])/Pilot Chute Extractor([numParachutes<=10:areaParachute<=400:maxParSpeed<=8000])/Slug Gun Ejector([numParachutes<=10:areaParachute<=400:maxParSpeed<=8000])/Servo-Triggered Bay([numParachutes<=10:areaParachute<=400:maxParSpeed<=8000])/EDM-210 Deploy Module([numParachutes<=10:areaParachute<=400:maxParSpeed<=8000]))"]},
                                     "Copper-Tungsten Alloy":       { cp: 400,  density: 8900, GL: 28, FT: 3500, ε: 0.78, Cd: 0.35, η: 0.55, ηt: 0.55, ηg:0.35, vtf: 600000, k: 211.4,usable: ["Heat Shield(Flat Heat Shield([Tmax<12000:GLimit<60:m<50000:d<12:h<0.4])/Modular Flat Shield([Tmax<11500:GLimit<58:m<48000:d<11:h<0.4])/Ogive Heat Shield([Tmax<14000:GLimit<65:m<55000:d<12:h<0.5])/Ablative Cone Shield([Tmax<13000:GLimit<62:m<52000:d<12:h<0.5])/Radiative Arc Shield([Tmax<12500:GLimit<60:m<50000:d<11:h<0.4]))","Engine(IonDrive NEXT([N<70000])/Fusion He³-He³ Drive([N<60000000])/IonGrid Universal([N<80000])/MPD-Plasma Drive([N<100000])/Magneto-Plasma Coil([N<90000])/VASIMR Alpha Core([N<120000])/Fusion D-T Reactor([N<150000])/Fusion D-D Cyclotron([N<140000])/Fusion D-He³ Drive([N<170000])/NTR Solid Core([N<200000000])/NTR Carbide Core Reactor([N<220000])/NTR Cermet Core Reactor([N<210000])/NTR LANTR Booster([N<180000])/NTR Gas Core Drive([N<250000])/NTR CNTR Methane Reactor([N<160000])/NTR Deuterium Reactor([N<140000])/NTR Helium3 Reactor([N<160000])/BioKero LE-9([N<90000])/HN192-1WI102([N<80000])/HT219DA12([N<85000])/RD-270M([N<300000])/2HD21K-A1SV L3([N<70000])/R2VA3 Hb([N<60000])/3SLA0-K2S([N<50000])/4320 A29-AB([N<75000])/A03MD-Z502([N<80000])/324E 23001C-2([N<60000])","Stage(Generic Liquid Fuel Tank([m<30000:h<15:d<8:massFuel<200000:GLimit<30])/Ogive([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Hemispherical Capsule([m<490000:h<20:d<9:massFuel=0:GLimit<36])/Winged Shuttle([m<490000:h<20:d<9:massFuel<350000:GLimit<36])/Apollo CM Block II([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Orion CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Soyuz Descent Module([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Low Enriched Fuel Chamber([m<500000:h<14:d<8:spessorePercentuale>26])/Dragon Capsule([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Starliner CM([m<490000:h<20:d<9:massFuel<0:GLimit<66])/Empty Fairing([m<490000:h<20:d<9:massFuel<57770:GLimit<44])/Enforced Liquid Fuel Tank([m<28000:h<14:d<7.5:massFuel<180000:GLimit<28])/Deuterium-Tritium Chamber([GLimit<43:m<90000:d<8:h<14:spessorePercentuale>8])/Deuterium-Helium3 Chamber([GLimit<54:m<150000:d<8:h<17:spessorePercentuale>10])/Deuterium Fuel Chamber([GLimit<44:m<110000:d<9:h<15:spessorePercentuale>5])/Heavy Liquid Fuel Tank([m<26000:h<13:d<7:massFuel<160000:GLimit<26])/Cryogenic Fuel Tank([m<24000:h<12:d<6.5:massFuel<140000:GLimit<24])/Enforced Cryogenic Tank([m<22000:h<11:d<6:massFuel<120000:GLimit<22])/Advanced Cryogenic Tank([m<20000:h<10:d<5.5:massFuel<100000:GLimit<20])/Empty Fairing([m<18000:h<9:d<5:GLimit<18])/Light Cryogenic Tank([m<16000:h<8:d<4.5:massFuel<80000:GLimit<16])/Light Liquid Fuel Tank([m<14000:h<7:d<4:massFuel<60000:GLimit<14])/Pressurized Liquid Fuel Tank([m<12000:h<6:d<3.5:massFuel<40000:GLimit<12])/Low Enriched Fuel Tank([m<10000:h<5:d<3:massFuel<20000:GLimit<10]))","Parachute(CO2 Cartridge Deployer([numParachutes<11:areaParachute<401:maxParSpeed<8001:geometryParachute!=Toroidal:geometryParachute!=Cross])/Spring Mortar Deployer([numParachutes<11:areaParachute<401:maxParSpeed<8001])/Pilot Chute Extractor([numParachutes<11:areaParachute<401:maxParSpeed<8001])/Slug Gun Ejector([numParachutes<11:areaParachute<401:maxParSpeed<8001])/Servo-Triggered Bay([numParachutes<11:areaParachute<401:maxParSpeed<8001])/EDM-210 Deploy Module([numParachutes<11:areaParachute<401:maxParSpeed<8001]))"]},
                                     "":                            { cp: 0,    density: 0,    GL: 0,  FT: 0,    ε: 0,    Cd: 0,    η: 0,    ηt: 0.0,  ηg:0.0,  vtf: 0,      k: 0, usable: Object.keys(hullStructureMap).map(key => { const matchType = hullStructureMap[key].usable?.[0] || "Stage";return `${matchType}(${key}([]))`;})}};
const gasThermalMap = {
                                    "CO₂":                          { greenhouse: 1.0, humidity:0.2, radiativeForce: 36,  specificHeat: 846,   emissivity: 0.8,  molarMass: 44.01 },
                                    "H₂O":                          { greenhouse: 1.0, humidity:1.0, radiativeForce: 55,  specificHeat: 1860,  emissivity: 0.9,  molarMass: 18.015 },
                                    "CH₄":                          { greenhouse: 1.5, humidity:0.8, radiativeForce: 500, specificHeat: 2220,  emissivity: 0.7,  molarMass: 16.04 },
                                    "N₂":                           { greenhouse: 0.0, humidity:0.0, radiativeForce: 0,   specificHeat: 1040,  emissivity: 0.05, molarMass: 28.013 },
                                    "O₂":                           { greenhouse: 0.0, humidity:0.0, radiativeForce: 0,   specificHeat: 920,   emissivity: 0.05, molarMass: 31.998 },
                                    "H₂":                           { greenhouse: 0.05,humidity:0.0, radiativeForce: 0,   specificHeat: 14300, emissivity: 0.01, molarMass: 2.016 },
                                    "He":                           { greenhouse: 0.00,humidity:0.0, radiativeForce: 0,   specificHeat: 5190,  emissivity: 0.001,molarMass: 4.0026 },
                                    "NH₃":                          { greenhouse: 1.0, humidity:0.9, radiativeForce: 400, specificHeat: 2070,  emissivity: 0.6,  molarMass: 17.031 },
                                    "HCN":                          { greenhouse: 1.4, humidity:0.6, radiativeForce: 800, specificHeat: 2100,  emissivity: 0.7,  molarMass: 27.026 },
                                    "C₂H₂":                         { greenhouse: 1.3, humidity:0.6, radiativeForce: 700, specificHeat: 2300,  emissivity: 0.7,  molarMass: 26.038 },
                                    "Ar":                           { greenhouse: 0.0, humidity:0.0, radiativeForce: 0,   specificHeat: 520,   emissivity: 0.02, molarMass: 39.948 },
                                    "SO₂":                          { greenhouse: 0.9, humidity:0.3, radiativeForce: 100, specificHeat: 645,   emissivity: 0.6,  molarMass: 64.066 },
                                    "Na":                           { greenhouse: 0.0, humidity:0.0, radiativeForce: 0,   specificHeat: 1230,  emissivity: 0.01, molarMass: 22.990 },
                                    "O₃":                           { greenhouse: 0.2, humidity:0.4, radiativeForce: 450, specificHeat: 920,   emissivity: 0.2,  molarMass: 47.998 },
                                    "NO":                           { greenhouse: 0.7, humidity:0.0, radiativeForce: 50,  specificHeat: 1040,  emissivity: 0.35, molarMass: 30.006 },
                                    "NO₂":                          { greenhouse: 1.1, humidity:0.0, humidity:0.0, radiativeForce: 200, specificHeat: 840,   emissivity: 0.5,  molarMass: 46.0055 },
                                    "CF₄":                          { greenhouse: 1.8, humidity:0.0, radiativeForce: 2400,specificHeat: 824,   emissivity: 0.65, molarMass: 88.004 },
                                    "SF₆":                          { greenhouse: 2.5, humidity:0.0, radiativeForce: 3200,specificHeat: 616,   emissivity: 0.75, molarMass: 146.06 },
                                    "CFC₁₁":                        { greenhouse: 1.9, humidity:0.0, radiativeForce: 1800,specificHeat: 870,   emissivity: 0.8,  molarMass: 137.37 },
                                    "CFC₁₂":                        { greenhouse: 2.0, humidity:0.0, radiativeForce: 2100,specificHeat: 820,   emissivity: 0.85, molarMass: 120.91 },
                                    "PAN":                          { greenhouse: 1.3, humidity:0.0, radiativeForce: 1500,specificHeat: 1100,  emissivity: 0.65, molarMass: 121.1 },
                                    "CO":                           { greenhouse: 0.3, humidity:0.0, radiativeForce: 80,  specificHeat: 1040,  emissivity: 0.2,  molarMass: 28.01 },
                                    "HCl":                          { greenhouse: 0.7, humidity:0.6, radiativeForce: 120, specificHeat: 824,   emissivity: 0.4,  molarMass: 36.46 },
                                    "HF":                           { greenhouse: 0.8, humidity:0.6, radiativeForce: 140, specificHeat: 1000,  emissivity: 0.4,  molarMass: 20.006 },
                                    "OCS":                          { greenhouse: 1.4, humidity:0.4, radiativeForce: 300, specificHeat: 890,   emissivity: 0.65, molarMass: 60.07 },
                                    "Cl":                           { greenhouse: 0.0, humidity:0.0, radiativeForce: 0,   specificHeat: 480,   emissivity: 0.02, molarMass: 35.45 },
                                    "K":                            { greenhouse: 0.0, humidity:0.0, radiativeForce: 0,   specificHeat: 757,   emissivity: 0.015,molarMass: 39.098 },
                                    "O":                            { greenhouse: 0.0, humidity:0.0, radiativeForce: 0,   specificHeat: 917,   emissivity: 0.05, molarMass: 16.00 },
                                    "Si":                           { greenhouse: 0.0, humidity:0.0, radiativeForce: 0,   specificHeat: 710,   emissivity: 0.01, molarMass: 28.085 },
                                    "C₂H₄":                         { greenhouse: 1.1, humidity:0.5, radiativeForce: 650, specificHeat: 2110,  emissivity: 0.65, molarMass: 28.05 },
                                    "C₂H₆":                         { greenhouse: 1.2, humidity:0.5, radiativeForce: 680, specificHeat: 2300,  emissivity: 0.65, molarMass: 30.07 },
                                    "C₆H₆":                         { greenhouse: 1.6, humidity:0.6, radiativeForce: 900, specificHeat: 1700,  emissivity: 0.8,  molarMass: 78.11 },
                                    "PH₃":                          { greenhouse: 1.3, humidity:0.7, radiativeForce: 350, specificHeat: 1250,  emissivity: 0.6,  molarMass: 33.997 },
                                    "Fe":                           { greenhouse: 0.0, humidity:0.0, radiativeForce: 0,   specificHeat: 449,   emissivity: 0.01, molarMass: 55.845 },
                                    "Ne":                           { greenhouse: 0.0, humidity:0.0, radiativeForce: 0,   specificHeat: 1030,  emissivity: 0.01, molarMass: 20.1797 },
                                    "Mg":                           { greenhouse: 0.0, humidity:0.0, radiativeForce: 0,   specificHeat: 1020,  emissivity: 0.01, molarMass: 24.305 },
                                    "C":                            { greenhouse: 0.0, humidity:0.0, radiativeForce: 0,   specificHeat: 710,   emissivity: 0.01, molarMass: 12.01 },
                                    "PM2.5":                        { greenhouse: 0.4, humidity: 0.2, radiativeForce: 160, specificHeat: 850, emissivity: 0.6, molarMass: 250.0 },
                                    "PM10":                         { greenhouse: 0.2, humidity: 0.1, radiativeForce: 80,  specificHeat: 750, emissivity: 0.5, molarMass: 500.0 },
                                    "BlackCarbon":                  { greenhouse: 0.9, humidity: 0.1, radiativeForce: 400, specificHeat: 710, emissivity: 0.85,molarMass: 12.01 },
                                    "OrganicCarbon":                { greenhouse: 0.6, humidity: 0.3, radiativeForce: 280, specificHeat: 1100,emissivity: 0.75,molarMass: 60.0  },
                                    "Dust":                         { greenhouse: 0.3, humidity: 0.2, radiativeForce: 100, specificHeat: 920, emissivity: 0.45,molarMass: 180.0 },
                                    "Ash":                          { greenhouse: 0.2, humidity: 0.1, radiativeForce: 90,  specificHeat: 870, emissivity: 0.4, molarMass: 200.0 },
                                    "Smoke":                        { greenhouse: 0.7, humidity: 0.3, radiativeForce: 300, specificHeat: 980, emissivity: 0.65,molarMass: 100.0 } 
                                };  
//VETTORE
class Vettore {
    constructor(x = 0, y = 0, origine = { x: 0, y: 0 }) {
        this.x = x;
        this.y = y;
        this.origine = { ...origine };
        this.__type = "Vettore";
    }
    toJSON() {
        return {
            __type:  this.__type,
            x:  this.x,
            y:  this.y,
            origine : this.origine,
        };
    }
    static fromJSON(data) {
        const v = new Vettore(data.x,data.y,data.origine)
        return v;
    }
    get destinazione() {
        return {
            x: this.origine.x + this.x,
            y: this.origine.y + this.y
        };
    }
    normSquared() {
        const dx = this.x - this.origine.x;
        const dy = this.y - this.origine.y;
        return dx * dx + dy * dy;
    }
    modulo() {
        let x = Number(this.x);
        let y = Number(this.y);
        if (!isFinite(x)) x = 0;
        if (!isFinite(y)) y = 0;
        const xx = Math.abs(x) < 1e-15 ? 0 : x;
        const yy = Math.abs(y) < 1e-15 ? 0 : y;
        return Math.sqrt(xx * xx + yy * yy);
    }
    normalized(v) {
        const length = Math.hypot(v.x, v.y);
        if (length === 0) return { x: 0, y: 0 };
        const originx = v.origine.x;
        const originy = v.origine.y;
        return new Vettore(
            v.x / length,
            v.y / length,{originx,originy}
        );
    }
    get verso() {
        return Math.atan2(this.y, this.x);
    }
    ruotato(angolo) {
        const cos = Math.cos(angolo);
        const sin = Math.sin(angolo);
        return new Vettore(
            this.x * cos - this.y * sin,
            this.x * sin + this.y * cos,
            this.origine
        );
    }
    clone() {
        return new Vettore(this.x, this.y, this.origine);
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    scale(fattore) {
        return new Vettore(this.x * fattore, this.y * fattore, { ...this.origine });
    }
    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    divide(scalar) {
        if (scalar !== 0) {
            this.x /= scalar;
            this.y /= scalar;
        }
        return this;
    }
    normalize() {
        return this.divide(this.modulo || 1);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    setOrigine(x, y) {
        this.origine.x = x;
        this.origine.y = y;
        return this;
    }
    rotate(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const nx = this.x * cos - this.y * sin;
        const ny = this.x * sin + this.y * cos;
        this.x = nx;
        this.y = ny;
        return this;
    }
    static fromPoints(p1, p2) {
        return new Vettore(p2.x - p1.x, p2.y - p1.y, p1);
    }
    static fromAngle(angle, modulo = 1, origine = { x: 0, y: 0 }) {
        return new Vettore(Math.cos(angle) * modulo, Math.sin(angle) * modulo, origine);
    }
}
class Atmosphere{
    constructor(density = 0,scaleHeight= 0,maxAltitude= 0,molecularWeight= 0,color =  "#00000000",composition  = {},albedo = 0){
        this.density = density;
        this.scaleHeight = scaleHeight;
        this.maxAltitude = maxAltitude;
        this.molecularWeight = molecularWeight;
        this.color = color;
        this.composition = composition;
        this.albedo = albedo
        this.__type = "Atmosphere";
    }
    toJSON() {
        return {
            __type:  this.__type,
            density : this.density,
            scaleHeight : this.scaleHeight,
            maxAltitude : this.maxAltitude,
            composition : this.composition,
            molecularWeight : this.molecularWeight,
            albedo : this.albedo,
            color : this.color
        };
    }
    static fromJSON(data) {
        const a = new Atmosphere(data.density,data.scaleHeight,data.maxAltitude,data.molecularWeight,data.color,data.composition,data.albedo);
        return a;
    }
}
class Moon{
    constructor(name,a,e, radius, color, angle, meanSpeed,mass,inclination,epochAnomaly = angle, atmosphere = new Atmosphere()){
        this.name = name;
        this.a = a;
        this.e = e; 
        this.radius = radius;
        this.color = color;
        this.angle = angle;
        this.meanSpeed = meanSpeed;
        this.mass = mass;
        this.inclination = inclination;
        this.atmosphere = atmosphere
        this.position = { x: 0, y: 0 };
        this.influenceAreaRadius = 0;
        this.epochAnomaly = epochAnomaly;
        this.LagrangePoints = {L1:{x:undefined,y:undefined},L2:{x:undefined,y:undefined},L3:{x:undefined,y:undefined},L4:{x:undefined,y:undefined},L5:{x:undefined,y:undefined}}
        this.__type = "Moon";
    }
    toJSON() {
        return {
            __type:  this.__type,
            name : this.name,
            a : this.a,
            e : this.e,
            radius : this.radius,
            color : this.color,
            angle : this.angle,
            meanSpeed : this.meanSpeed,
            mass : this.mass,
            atmosphere : this.atmosphere.toJSON(),
            inclination : this.inclination,
            position : this.position,
            influenceAreaRadius :this.influenceAreaRadius,
            epochAnomaly : this.epochAnomaly,
            LagrangePoints : this.LagrangePoints
        };
    }
    static fromJSON(data) {
        const m = new Moon(
            data.name, data.a, data.e, data.radius, data.color, data.angle,
            data.meanSpeed,data.mass,data.inclination,data.epochAnomaly,new Atmosphere());
        m.position = { ...data.position };
        m.LagrangePoints = data.LagrangePoints;
        m.atmosphere = Atmosphere.fromJSON(data.atmosphere);
        return m;
    }
}
class Planet{
    constructor(name,a,e,radius,color,angle,meanSpeed,mass,inclination,epochAnomaly = 0,moons = [],atmosphere = new Atmosphere(),isBase = false){
        this.name = name;
        this.a = a;
        this.e = e; 
        this.radius = radius;
        this.color = color;
        this.angle = angle;
        this.meanSpeed = meanSpeed;
        this.moons = moons;
        this.mass = mass;
        this.spacebase = isBase;
        this.atmosphere = atmosphere
        this.inclination = inclination;
        this.position = { x: 0, y: 0 };
        this.influenceAreaRadius = 0;
        this.epochAnomaly = epochAnomaly;
        this.LagrangePoints = {L1:{x:undefined,y:undefined},L2:{x:undefined,y:undefined},L3:{x:undefined,y:undefined},L4:{x:undefined,y:undefined},L5:{x:undefined,y:undefined}}
        this.__type = "Planet";
    }
    toJSON() {
        return {
            __type:  this.__type,
            name : this.name,
            a : this.a,
            e : this.e,
            radius : this.radius,
            color : this.color,
            angle : this.angle,
            meanSpeed : this.meanSpeed,
            moons : this.moons.map(m => m.toJSON()),
            mass : this.mass,
            spacebase : this.spacebase,
            atmosphere : this.atmosphere.toJSON(),
            inclination : this.inclination,
            position : this.position,
            influenceAreaRadius :this.influenceAreaRadius,
            epochAnomaly : this.epochAnomaly,
            LagrangePoints : this.LagrangePoints
        };
    }
    static fromJSON(data) {
        const p = new Planet(
            data.name, data.a, data.e, data.radius, data.color, data.angle,
            data.meanSpeed, data.mass, data.inclination, data.epochAnomaly,
        [],new Atmosphere(), data.spacebase);
        p.position = { ...data.position };
        p.LagrangePoints = data.LagrangePoints;
        p.moons = data.moons.map(m => Moon.fromJSON(m));
        p.atmosphere = Atmosphere.fromJSON(data.atmosphere);
        return p;
    }
}
class Star{
    constructor(name,a,e,radius,color,angle,meanSpeed,mass,inclination,planets = [],corona = new Atmosphere(),luminosity = 0){
        this.name = name;
        this.a = a;
        this.e = e; 
        this.radius = radius;
        this.color = color;
        this.angle = angle;
        this.meanSpeed = meanSpeed;
        this.planets = planets;
        this.mass = mass;
        this.corona = corona;
        this.position = { x: 0, y: 0 };
        this.influenceAreaRadius = 0;
        this.epochAnomaly = a;
        this.inclination = inclination;
        this.luminosity = luminosity;
        this.__type = "Star";
    }
    toJSON() {
        return {
            __type:  this.__type,
            name : this.name,
            a : this.a,
            e : this.e,
            radius : this.radius,
            color : this.color,
            angle : this.angle,
            meanSpeed : this.meanSpeed,
            planets : this.planets.map(p => p.toJSON()),
            mass : this.mass,
            corona : this.corona.toJSON(),
            luminosity : this.luminosity,
            inclination : this.inclination,
            influenceAreaRadius :this.influenceAreaRadius,
            epochAnomaly : this.epochAnomaly,
        };
    }
    static fromJSON(data) {
        const s = new Star(data.name, data.a, data.e, data.radius, data.color, data.angle,
            data.meanSpeed, data.mass, data.inclination,[],new Atmosphere(),data.luminosity)
        s.position = { ...data.position };
        s.planets = data.planets.map(p => Planet.fromJSON(p));
        s.corona = Atmosphere.fromJSON(data.corona);
        s.influenceAreaRadius = data.influenceAreaRadius;
        return s;
    }
}
class SurfaceData{
    constructor(height = 0, diameter = 0, kind = "",Cd=0,actualTemperature = 288.15,maxTemperature = 0,material = "",GLimit = 0,spessorePercentuale = 0){
        this.height = height;
        this.diameter = diameter;
        this.kind =kind;
        this.Cd= Cd;
        this.actualTemperature = actualTemperature;
        this.maxTemperature = maxTemperature;
        this.material = material;
        this.energiaTotale = 0;
        this.T0 =actualTemperature;
        this.spessorePercentuale = spessorePercentuale;
        this.GLimit = GLimit;
        const dati = [this.height, this.diameter, this.kind,this.Cd, this.material,this.GLimit].join("|");
        const Char = Math.random().toString(36).substring(2, 12) + Date.now();
        const base = btoa(unescape(encodeURIComponent(dati + "|" + Char)));
        this.id= ("srf_" + base.replace(/[^a-zA-Z0-9]/g, "")).padEnd(128, "x").substring(0, 128);
        this.__type = "Surface";
    }
    clone(){
        const s=new SurfaceData(this.height,this.diameter,this.kind,this.Cd,this.actualTemperature,this.maxTemperature,this.material,0,this.spessorePercentuale);
        s.energiaTotale = this.energiaTotale;
        s.id = this.id;
        s.T0 = this.T0;
        return s;
    }
    toJSON() {
        return {
            __type:  this.__type,
            height:  this.height,
            diameter : this.diameter,
            kind : this.kind,
            Cd : this.Cd,
            GLimit : this.GLimit,
            T0 : this.T0,
            actualTemperature : this.actualTemperature,
            energiaTotale : this.energiaTotale,
            maxTemperature : this.maxTemperature,
            material : this.material,
            spessorePercentuale : this.spessorePercentuale,
            id : this.id
        };
    }
    static fromJSON(data) {
        const s = new SurfaceData(data.height,data.diameter,data.kind,data.Cd,data.actualTemperature,data.maxTemperature,data.material,data.GLimit,data.spessorePercentuale);
        s.id = data.id;
        s.energiaTotale = data.energiaTotale;
        s.T0 = data.T0;
        return s;
    }
}
class Engine{
    constructor(mass = 0,Thrust = 0,angle=0,online=true,thrustPercent=0,tipoCarburante="",surface = new SurfaceData()){
        this.mass = mass;
        this.Thrust = Thrust;
        this.angle = angle;
        this.online = online;
        this.thrustPercent = thrustPercent;
        this.tipoCarburante = tipoCarburante;
        this.surface = surface;
        this.__type = "Engine";
    }
    clone(){
        return new Engine(this.mass,this.Thrust,this.angle,this.online,this.thrustPercent,this.tipoCarburante,this.surface.clone());
    }
    toJSON() {
        return {
            __type:  this.__type,
            Thrust:  this.Thrust,
            angle : this.angle,
            online : this.online,
            mass : this.mass,
            surface : this.surface.toJSON(),
            thrustPercent : this.thrustPercent,
            tipoCarburante : this.tipoCarburante, 
        };
    }
    static fromJSON(data) {
        if (data==null) return null;
        const e = new Engine(data.mass,data.Thrust,data.angle,data.online,data.thrustPercent,data.tipoCarburante);
        e.surface = SurfaceData.fromJSON(data.surface);
        return e;
    }
}
class HeatShield{
    constructor(mass = 0,surface = new SurfaceData()){
        this.mass = mass;
        this.surface = surface;
        this.__type = "HeatShield";
    }
    clone(){
        return new HeatShield(this.mass,this.surface.clone());
    }
    toJSON() {
        return {
            __type:  this.__type,
            mass:  this.mass,
            surface : this.surface.toJSON(),
        };
    }
    static fromJSON(data) {
        if(data!= null){
            const p = new HeatShield(data.mass);
            p.surface = SurfaceData.fromJSON(data.surface);
            return p;
        }else return null;   
    }
}
class Parachute{
    constructor(mass = 0,numParachutes = 0,areaParachute = 0,maxDeployAltitude = 0,maxShipSpeed = 0,parachuteMaterial = "",parachuteGeometry = "",openingPercent= 0,cut = false,surface = new SurfaceData()){
        this.mass = mass;
        this.numParachutes = numParachutes;
        this.areaParachute = areaParachute;
        this.maxDeployAltitude = maxDeployAltitude;
        this.maxShipSpeed = maxShipSpeed;
        this.surface = surface;
        this.openingPercent = openingPercent;
        this.parachuteGeometry = parachuteGeometry;
        this.parachuteMaterial = parachuteMaterial;
        this.cut = cut;
        this.actualPa = 0;
        this.TargetOpenPercent = 0;
        if(!this.cut) this.mass += ((this.numParachutes * this.areaParachute) * (paraMaterialsMap[parachuteMaterial]?.m ?? 0))*(parastructureMap[parachuteGeometry]?.a ?? 0);
        this.__type = "Parachute";
    }
    clone(){
        return new Parachute(this.mass,this.numParachutes,this.areaParachute,this.maxDeployAltitude,this.maxShipSpeed,this.parachuteMaterial,
            this.parachuteGeometry,this.openingPercent,this.cut,this.surface.clone())
    }
    toJSON() {
        let realMass = this.mass
        if(!this.cut) realMass = this.mass - (this.numParachutes * this.areaParachute) * (paraMaterialsMap[this.parachuteMaterial]?.m ?? 0)*(parastructureMap[this.parachuteGeometry]?.a ?? 0);
        return {
            __type:  this.__type,
            mass:  realMass,
            numParachutes : this.numParachutes,
            areaParachute : this.areaParachute,
            maxDeployAltitude : this.maxDeployAltitude,
            maxShipSpeed : this.maxShipSpeed,
            openingPercent : this.openingPercent,  
            parachuteMaterial : this.parachuteMaterial,
            parachuteGeometry : this.parachuteGeometry,
            actualPa : this.actualPa,
            surface : this.surface.toJSON(),
            TargetOpenPercent : this.TargetOpenPercent,
            cut : this.cut
        };
    }
    static fromJSON(data) {
        if(data!= null){
            const p = new Parachute(data.mass,data.numParachutes,data.areaParachute,data.maxDeployAltitude,data.maxShipSpeed,data.parachuteMaterial,data.parachuteGeometry,data.openingPercent,data.cut);
            p.actualPa = data.actualPa;
            p.TargetOpenPercent = data.TargetOpenPercent;
            p.surface = SurfaceData.fromJSON(data.surface);
            return p;
        }else return null;   
    }
}
class Stage{
    constructor(mass = 0,quantitaCarburante = 0,tipoCarburante = "",surface = new SurfaceData(),engine = null,parachute = null,heatShield = null){
        this.mass = mass;
        this.Engine = engine;
        this.heatShield = heatShield;
        this.parachute = parachute;
        this.quantitaCarburante = quantitaCarburante;
        this.tipoCarburante = tipoCarburante;
        this.surface = surface;
        if(this.Engine != null) this.mass += this.Engine.mass
        if(this.heatShield != null) this.mass += this.heatShield.mass;
        if(this.parachute != null) this.mass += this.parachute.mass;
        const massFuel = ( this.quantitaCarburante * (fuelMap[this.tipoCarburante]?.density??0)??0)
        if(isFinite(massFuel)) this.mass += massFuel;
        this.__type = "Stage";
    }
    clone(){
        let stageMass = this.mass
        if(this.Engine != null) stageMass -= this.Engine.mass
        if(this.heatShield != null) stageMass -= this.heatShield.mass;
        if(this.parachute != null) stageMass -= this.parachute.mass;
        if(this.quantitaCarburante>0&&this.tipoCarburante!=null&&this.tipoCarburante!="") {
            stageMass -= (this.quantitaCarburante * ((fuelMap[this.tipoCarburante]?.density??0)??0));
        }
        return new Stage(stageMass,this.quantitaCarburante,this.tipoCarburante,this.surface.clone(),
        this.Engine?.clone()??null,this.parachute?.clone()??null,this.heatShield?.clone()??null)
    }
    toJSON() {
        let massFuel = ( this.quantitaCarburante *  (fuelMap[this.tipoCarburante]?.density??0))
        if(!isFinite(massFuel)) massFuel = 0;
        const realMass = this.mass - massFuel - (this.parachute?.mass??0) -  (this.Engine?.mass??0)-  (this.heatShield?.mass??0);
        const par = this.parachute?.toJSON()??null;
        const engine = this.Engine?.toJSON()??null;
        const heat = this.heatShield?.toJSON()??null;
        return {
            __type:  this.__type,
            mass:  realMass,
            Engine : engine,
            parachute : par,
            heatShield : heat,
            surface : this.surface.toJSON(),
            quantitaCarburante : this.quantitaCarburante,
            tipoCarburante : this.tipoCarburante,
        };
    }
    static fromJSON(data) {
        const s = new Stage(data.mass,data.quantitaCarburante,data.tipoCarburante);
        s.Engine = Engine.fromJSON(data.Engine);
        s.parachute = Parachute.fromJSON(data.parachute);
        s.heatShield = HeatShield.fromJSON(data.heatShield);
        s.surface = SurfaceData.fromJSON(data.surface);
        if(s.Engine) s.mass+=s.Engine.mass;
        if(s.parachute) s.mass+=s.parachute.mass;
        if(s.heatShield) s.mass+=s.heatShield.mass;
        return s;
    }
}
class Starship {
    constructor(name = "Test Starship",mass = 0, position = {x:0,y:0}, relativePosition = {x:0,y:-6.371e6},
        velocity = new Vettore(0, 0,0,0), accelleration = new Vettore(0, 0,0,0), angularAccelleration = 0, angularVelocity = 0,
        angle = Math.PI + Math.PI/2,altitudineRelativa= 0,relatedObject = "Earth",EnginesOnline = false,
        TypeRelObj = "",targetedObj = {type:"",name:""},ferma = true,stages = {
            1 : new Stage()
        },actualStage = 1) {
        this.name = name;
        this.mass = mass; 
        this.position = position;
        this.relativePosition =relativePosition; 
        this.velocity = velocity;  
        this.acceleration = accelleration;
        this.angularAccelleration = angularAccelleration;
        this.angularVelocity =angularVelocity;
        this.angle = angle; 
        this.altitudineRelativa = altitudineRelativa; 
        this.relatedObject = relatedObject;
        this.Stages = stages;
        this.actualStage =actualStage;
        this.EnginesOnline = EnginesOnline;
        this.TypeRelObj = TypeRelObj;
        this.targetedObj = targetedObj;
        this.ferma = ferma;
        this.mass += Object.values(this.Stages).reduce((sum, stage) => sum + stage.mass, 0);
        this.__type = "Starship";
    }
    clone(){
        const newVel = this.velocity.clone();
        const newAcc = this.acceleration.clone();
        const newStagesMap = {};
        for (const key in this.Stages) {
            const stage = this.Stages[key];
            newStagesMap[key] = stage.clone();
        }
        const newPos = { x: this.position.x, y: this.position.y };
        const newRel = { x: this.relativePosition.x, y: this.relativePosition.y };
        return new Starship(
            "clone", this.mass, newPos, newRel,newVel,
            newAcc,this.angularAccelleration, this.angularVelocity,
            this.angle, this.altitudineRelativa,this.relatedObject,
            this.EnginesOnline, this.TypeRelObj, this.targetedObj,
            this.ferma,newStagesMap, this.actualStage);
    }
    static fromJSON(data) {
        const velocity = Vettore.fromJSON(data.velocity);
        const Accelleration = new Vettore(0,0,{x:0,y:0});
        const stages = {};
        for (const [k, v] of Object.entries(data.Stages)) {
            stages[k] = Stage.fromJSON(v);
        }   
        const s = new Starship(data.name,data.mass,data.position,data.relativePosition,velocity,Accelleration,
            data.angularAccelleration,data.angularVelocity,data.angle,data.altitudineRelativa,data.relatedObject,
        data.EnginesOnline,data.typeRelObj,data.targetedObj,data.ferma,stages,data.actualStage);
        return s;
    }
    toJSON() { 
        const realMass = this.mass - Object.values(this.Stages).reduce((sum, stage) => sum + stage.mass, 0);
        return {
            __type:  this.__type,
            name:  this.name,
            mass : realMass,
            position : this.position,
            relativePosition : this.relativePosition,
            velocity : this.velocity.toJSON(),
            acceleration:  this.acceleration.toJSON(),
            angularAccelleration : this.angularAccelleration,
            angularVelocity : this.angularVelocity,
            angle : this.angle,
            altitudineRelativa : this.altitudineRelativa,
            relatedObject : this.relatedObject, 
            Stages: Object.fromEntries(Object.entries(this.Stages).map(([k, v]) => [k, v.toJSON()])),
            actualStage : this.actualStage,
            EnginesOnline : this.EnginesOnline,
            TypeRelObj : this.TypeRelObj,
            targetedObj : this.targetedObj,
            ferma : this.ferma
        };
    }
}
class SimulatorChronometer{
    constructor(year = 2000, month = 1, day = 1, hours = 12, minutes = 0, seconds = 0, speed = 1) {
        this.year = year
        this.month = month
        this.day = day
        this.hours = hours
        this.minutes = minutes
        this.seconds = seconds
        this.ryear = year
        this.rmonth = month
        this.rday = day
        this.rhours = hours
        this.rminutes = minutes
        this.rseconds = seconds
        this.speed = speed
        this.targetSpeed = speed;
        this.executing = true
        this.lastFrameTime = performance.now();
        this.time=0;
        this.gamma = 1;
        this.__type = "SimulatorChronometer";
    }
    static fromJSON(data) {
        const c = new SimulatorChronometer(data.year,data.month,data.day,data.hours,data.minutes,data.seconds,data.speed)
        c.executing = data.executing;
        c.lastFrameTime = performance.now();
        c.time = data.time;
        c.targetSpeed = data.targetSpeed;
        c.gamma = data.gamma;
        c.ryear = data.year,
        c.rmonth = data.month,
        c.rday = data.day,
        c.rhours = data.hours,
        c.rminutes =data. minutes,
        c.rseconds = data.seconds
        return c;
    }
    clone(){
        const c = new SimulatorChronometer(this.year,this.month,this.day,this.hours,this.minutes,this.seconds,this.speed);
        c.executing = this.executing;
        c.lastFrameTime = performance.now();
        c.time = this.time;
        c.targetSpeed = this.targetSpeed;
        c.gamma = this.gamma;
        c.ryear = this.year,
        c.rmonth = this.month,
        c.rday = this.day,
        c.rhours = this.hours,
        c.rminutes =this. minutes,
        c.rseconds = this.seconds
        return c;
    }
    toJSON() {
        return {
            __type:  this.__type,
            year:  this.year,
            month : this.month,
            day : this.day,
            hours : this.hours,
            minutes : this.minutes,
            seconds:  this.seconds,
            speed : this.speed,
            executing : this.executing,
            targetSpeed : this.targetSpeed,
            time : this.time,
            gamma : this.gamma,
            ryear : this.year,
            rmonth : this.month,
            rday : this.day,
            rhours : this.hours,
            rminutes :this. minutes,
            rseconds : this.seconds
        };
    }
}  
class Camera{
    constructor(){
        this.position= { x: 0, y: 0 };
        this.scale =  1e-9;
        this.target =  null;
        this.__type =  "Camera";
    }
    static fromJSON(data) {
        const c = new Camera()
        c.position = data.position;
        c.scale = data.scale;
        c.target = data.target;
        return c;
    }
    clone(){
        const c = new Camera()
        c.position = this.position;
        c.scale = this.scale;
        c.target = this.target;
        return c;
    }
    toJSON() {
        return {
            __type:  this.__type,
            position:  this.position,
            scale : this.scale,
            target : this.target,
        };
    }
}
class GameData{
    constructor() {
        this.Star = null;
        this.chronometer = new SimulatorChronometer();
        this.createSolarSystem();
        this.camera = new Camera();
        this.isDragging = false;
        this.lastCoordOffset = { x: 0, y: 0 };
        this.Starship = new Starship();
        this.__type =  "GameData";
        this.factor = 1;
    }
    static fromJSON(data) {
        const d = new GameData();
        d.Star = Star.fromJSON(data.Star)
        d.chronometer = SimulatorChronometer.fromJSON(data.chronometer)
        d.camera = Camera.fromJSON(data.camera);
        d.Starship = Starship.fromJSON(data.Starship);
        return d;
    }
    clone() {
        const d = new GameData();
        d.Star = this.Star.clone();
        d.chronometer = this.chronometer.clone();
        d.camera = this.camera.clone();
        d.Starship = this.Starship.clone();
        return d;
    }
    toJSON() {
        return {
            __type:  this.__type,
            Star : this.Star.toJSON(),
            chronometer : this.chronometer.toJSON(),
            camera : this.camera.toJSON(),
            Starship : this.Starship.toJSON(),
        };
    }
    createSolarSystem(){
        this.Star = new Star("Sun",0,0,6.9634e8,"yellow", 0,0,1.9885e30,0,[
            new Planet("Mercury", 5.79e10, 0.206, 2.439e6, "#aaa", 4.4026, 8.27e-7,3.3011e23,4.4026,4.4026),
            new Planet("Venus", 1.082e11, 0.007, 6.052e6, "#d9b38c", 3.2364, 3.24e-7,4.8675e24,3.2364,3.2364,[],
                new Atmosphere(65, 15900, 250000, 44.01, "#eecfa1AA",{ "CO₂": 96.5, "N₂": 3.5, "SO₂": 0.015, "H₂O": 0.002, "CO": 0.0017, "HCl": 0.0001, "HF": 0.000001, "OCS": 0.0003, "He": 0.0012, "Ne": 0.0007 },0.77)),
            new Planet("Earth", 1.496e11, 0.017, 6.371e6, "#00bfff", 6.2401, 1.99e-7,5.97219e24,0,6.2401, [
                new Moon("Moon", 3.844000e+08, 0.0554, 1.737e6, "#888", 2.360907, 2.661667e-06,7.342e22,0.0898,2.360907)
            ],new Atmosphere(1.225,8500,120000,28.97,"#87ceebAA",{ "N₂": 78.084, "O₂": 20.946, "Ar": 0.934, "H₂O": 1.5, "CO₂": 0.041, "CH₄": 0.00019, "O₃": 0.000007, "NO": 0.000002, "NO₂": 0.00002, "SO₂": 0.00005, "PAN": 0.00001, "CF₄": 0.000001, "SF₆": 0.0000008, "CFC₁₁": 0.0000003, "CFC₁₂": 0.0000005 },0.36),true),
            new Planet("Mars", 2.279e11, 0.093, 3.390e6, "#d94f00", 0.8653, 1.06e-7,6.4171e23,0.0323,0.8653,[
                new Moon("Phobos", 9.375e6, 0.015, 1.1e4, "#775533", 3.310890, 2.281834e-4, 1.0659e16, 0.188,3.310890),
                new Moon("Deimos", 2.3457e7, 0.0, 6.2e3, "#998877", 3.577925, 5.760163e-6, 1.4762e15, 0.4852,3.577925),
            ],new Atmosphere(0.020, 11100, 90000, 44.01, "#ff9966AA"),{ "CO₂": 95.91, "N₂": 2.7, "Ar": 1.59, "O₂": 0.13, "CO": 0.0747, "H₂O": 0.03, "NO": 0.00001, "SO₂": 0.00001 },0.25),
            new Planet("Ceres", 4.14e11, 0.07934, 4.73e5, "#cccccc", 1.675, 4.34e-8, 9.393e20, 0.1849, 1.675),
            new Planet("Jupiter", 7.785e11, 0.0489, 69911000, "#f4e2c2", 0.343, 1.67e-8, 1.898e27,1.304,0.1907, [
                new Moon("Io", 4.218000e+08, 0.004, 1.8215e6, "#ffb366", 5.775294, 1.000000e-07, 8.931e22,0.00813,5.775294,
                    new Atmosphere(1e-5, 10000, 15000, 64.1, "#ffcc99aa",{ "SO₂": 90.0, "O₂": 5.0, "S": 3.0, "Na": 1.0, "Cl": 0.5, "K": 0.3, "O": 0.2 },0.67)),
                new Moon("Europa", 6.711000e+08, 0.009, 1.561e6, "#aeeeee", 6.028367, 1.000000e-07,4.799e22,0.00813,6.028367,
                    new Atmosphere(1e-7, 15000, 5000, 32.0, "#aaffffaa",{ "H₂O": 25.0, "O₂": 74.5, "O": 0.5 },0.43)),
                new Moon("Ganymede", 1.070400e+09, 0.001, 2.631e6, "#d0e0ff", 5.668829, 1.000000e-07,1.4819e23,0.00309,5.668829,
                    new Atmosphere(1e-8, 10000, 3000, 32.0, "#99ffff22",{ "H₂O": 49.0, "O₂": 49.0, "O": 1.0, "O₃": 0.5, "Na": 0.3, "Si": 0.1, "CO₂": 0.05, "S": 0.05 },0.43)),
                new Moon("Callisto", 1.882700e+09, 0.007, 2.4105e6, "#cc7744", 1.525418, 1.000000e-07,1.0759e23,0.00335,1.525418,
                    new Atmosphere(1e-9, 8000, 3000, 44.0, "#ddffcc22",{ "CO₂": 74.5, "H₂O": 24.5, "O₂": 0.5, "O": 0.3, "Na": 0.1, "S": 0.05, "Cl": 0.05 },0.43)),
                new Moon("Amalthea", 1.8137e8, 0.00319, 8.35e4, "#888", 5.420993, 2.094e-4, 2.08e18, 0.00653,5.420993,
                    new Atmosphere(1e-12, 10e3,+30e3, 44,"#88888844",{ "CO₂": 0.6, "H₂O": 0.3, "S": 0.08, "O₂": 0.02 }, 0.09 )),
                new Moon("Thebe", 2.2189e8, 0.0175, 4.93e4, "#aa7050", 3.178245, 1.126e-4, 1.5e18, 0.01878,3.178245),
                new Moon("Adrastea", 1.29e8, 0.0015, 8.2e3, "#bbbbbb", 3.743731, 2.538e-4, 2e15, 0.00087,3.743731),
                new Moon("Metis", 1.28e8, 0.0002, 2.15e4, "#bbbbcc", 2.897247, 2.663e-4, 6.4e16, 0.00105,2.897247),
                new Moon("Himalia", 1.1389e10, 0.1538, 8.5e4, "#999977", 1.366593, 2.91e-7, 4.2e18, 0.5061,1.366593),
                new Moon("Elara", 1.1703e10, 0.1961, 4.3e4, "#8f8870", 6.054547, 2.43e-7, 8.7e17, 0.5325,6.054547),
                new Moon("Leda", 1.1196e10, 0.1649, 1.075e4, "#bdb7aa", 4.059636, 2.99e-7, 5.68e15, 0.4887, 4.059636),
                new Moon("Themisto", 7.3961e9, 0.2522, 9e3, "#9999aa", 5.045747, 5.6e-7, 1.6e15, 0.4538,5.045747),
                new Moon("Harpalyke", 2.128e10, 0.1603, 2e3, "#8e8e8e", 4.457571, -1.0e-7, 7.5e16, 2.6128,4.457571),
                new Moon("Erinome", 2.2354e10, 0.2053, 1.5e3, "#775588", 4.766494, -1.0e-7, 3.8e16, 2.9160,4.766494),
                new Moon("Arche", 2.3731e10, 0.259, 1.5e3, "#778899", 0.593412, -1.0e-7, 4.5e16, 2.6022,0.593412),
                new Moon("Kallichore", 2.3112e10, 0.2042, 1e3, "#996688", 1.165880, -1.0e-7, 1.5e16, 2.8822,1.165880),
                new Moon("Dia", 1.2118e10, 0.211, 2e3, "#a59c88", 5.600762, 2.53e-7, 9.0e13, 0.51,5.600762),
                new Moon("Eirene", 2.3974e10, 0.2413, 2e3, "#888877", 5.876524, -1.0e-7, 3.2e15, 2.9000,5.876524),
                new Moon("S2003_J_19", 2.3156e10, 0.257, 1e3, "#666666", 3.436553, -1.0e-7, 2.3e15, 2.9000,3.436553),
                new Moon("Pandia", 1.1481e10, 0.179, 1.5e3, "#aaaaff", 2.766347, 2.89e-7, 3e15, 0.4887,2.766347)],
            new Atmosphere(0.16, 27000, 13982000, 2.22, "#f4e2c2AA",{ "H₂": 89.8, "He": 10.2, "CH₄": 0.3, "NH₃": 0.026, "H₂O": 0.0004, "PH₃": 0.0001, "CO": 0.00002 },0.52)),
            new Planet("Saturn", 1.427e12, 0.0541, 5.8232e7, "#add8e6", 4.472, 6.76e-9,5.683e26,0.0434,0.8745, [
                new Moon("Mimas", 1.860000e+08, 0.02,  1.982e5, "#ccccdd", 4.804891, 7.716506e-05,3.75e19,0.0130,4.804891),
                new Moon("Enceladus", 2.384000e+08, 0.005, 2.523e5, "#e5ffff", 0.994838, 1.000000e-07,1.08e20,0.0090,0.994838),
                new Moon("Tethys", 2.950000e+08, 0.001, 5.313e5, "#ddf1ff", 0.000000, 1.000000e-07,6.17e20,0.0000, 0.000000),
                new Moon("Dione", 3.777000e+08, 0.002, 5.625e5, "#ccddee", 3.700098, 1.000000e-07, 1.10e21,0.0280,3.700098),
                new Moon("Rhea", 5.272000e+08, 0.001, 7.645e5, "#e4e4dd", 0.549779, 1.000000e-07,2.31e21, 0.0010,0.549779,
                    new Atmosphere(1e-8, 10000, 40000, 44.0, "#eeeecc33",{ "H₂O": 29.7, "O₂": 69.8, "CO₂": 0.3, "O₃": 0.1, "Na": 0.05, "O": 0.05 },0.95)),
                new Moon("Titan", 1.221900e+09, 0.029, 2.5755e6, "#f8cc88", 0.204204, 1.000000e-07,1.3452e23,0.0087,0.204204,
                    new Atmosphere(5.3, 15000, 600000, 28.0, "#ffcc88AA",{ "H₂": 97.0, "CH₄": 1.6, "N₂": 1.2, "C₂H₂": 0.08, "HCN": 0.06, "C₂H₄": 0.03, "C₂H₆": 0.02, "CO": 0.01, "Ar": 0.005, "C₆H₆": 0.002 },0.22)),
                new Moon("Hyperion", 1.481500e+09, 0.105,1.33e5, "#d8a080", 2.145010, 1.000000e-07,5.6e18,0.4310,2.145010),
                new Moon("Iapetus", 3.561700e+09, 0.028, 7.345e5, "#997755", 1.305506, 1.000000e-07,1.81e21,0.7749,1.305506),
                new Moon("Phoebe", 1.292940e+10, 0.164,  1.066e5, "#806060", 5.375614, -1.000000e-07,8.3e18,2.3416,5.375614),
                new Moon("Greip", 1.8206e+10, 0.326, 5000, "#776688", 5.361651, -7.92e-8, 1.3e13, 3.019,5.361651),
                new Moon("Telesto", 2.950000e+08, 0.001, 3.000000e+04, "#c8d8ff", 0.000000, 1.000000e-07,1.98e17,0.0000),
                new Moon("Calypso", 2.950000e+08, 0.001, 3.000000e+04, "#ccddee", 0.000000, 1.000000e-07,1.6e17,0.0000),
                new Moon("Polydeuces", 3.776000e+08, 0.019, 3.000000e+04, "#ddeeff", 6.265732, 1.000000e-07,1.2e16,6.265732),
                new Moon("Helene", 3.776000e+08, 0.007, 3.000000e+04, "#ccf0ff", 5.157448, 1.000000e-07,7.6e16,5.157448),
                new Moon("Janus", 1.515000e+08, 0.007, 3.000000e+04, "#bbbbcc", 1.949533, 1.042830e-04,1.9e18,1.949533),
                new Moon("Epimetheus", 1.514000e+08, 0.02, 3.000000e+04, "#ccd0dd", 3.441789, 1.043340e-04,5.3e17,3.441789),
                new Moon("Pan", 1.336000e+08, 0.0, 3.000000e+04, "#b0b0c0", 2.558653, 1.264619e-04,4.95e15,2.558653),
                new Moon("Daphnis", 1.365000e+08, 0.0, 3.000000e+04, "#bfbfe0", 2.680826, 1.224112e-04,6.8e13,2.680826),
                new Moon("Atlas", 1.377000e+08, 0.001, 3.000000e+04, "#d0d0e0", 5.045747, 1.202809e-04,6.6e15,5.045747),
                new Moon("Prometheus", 1.394000e+08, 0.002, 3.000000e+04, "#c5c0b0", 2.363176, 1.180787e-04,1.6e17,2.363176),
                new Moon("Pandora", 1.417000e+08, 0.004, 3.000000e+04, "#bbaaaa", 2.162463, 1.151815e-04,1.4e17,2.162463),
                new Moon("Ymir", 2.29545e+10, 0.338, 30000, "#666666", 3.775147, -1e-7, 8e12, 2.9310,3.775147),
                new Moon("Suttungr", 1.939200e+10, 0.116, 3.000000e+04, "#554455", 5.534439, -1.000000e-07,2.2e17,2.8798,5.534439),
                new Moon("Kiviuq", 1.13075e+10, 0.275, 30000, "#775577", 2.935644, -1e-7, 8e12, 2.8798,2.935644),
                new Moon("Narvi", 1.92856e+10, 0.441, 30000, "#553344", 1.907645, -1e-7, 3.5e13, 2.8798,1.907645),
                new Moon("Bergelmir", 1.92684e+10, 0.145, 30000, "#443344", 4.511676, -1e-7, 3e13, 2.8798,4.511676),
                new Moon("Eggther", 1.98439e+10, 0.157, 30000, "#664466", 1.645845, -1e-7, 2e13, 2.8798,1.645845),
                new Moon("Skrymir", 2.14476e+10, 0.437, 30000, "#3a3a4a", 1.754056, -1e-7, 2e13, 2.8798,1.754056),
                new Moon("Erriapus", 1.7507e+10, 0.476, 30000, "#444444", 5.349434, -1e-7, 1.5e13, 2.8798,5.349434),
                new Moon("Siarnaq", 1.788110e+10, 0.309, 3.000000e+04, "#997744", 3.324852, 1.000000e-07,3.1e17,0.5236,3.324852),
                new Moon("S2023_S49", 2.17665e+10, 0.026, 30000, "#555555", 1.439897, -1e-7, 1.4e13, 2.8798,1.439897),
                new Moon("S2020_S22", 1.9443e+10, 0.059, 30000, "#555566", 2.247984, -1e-7, 1.4e13, 2.8798,2.247984),],
            new Atmosphere(0.19, 59500, 8735000, 2.22, "#add8e6AA",{ "H₂": 96.7, "He": 3.25, "CH₄": 0.3, "NH₃": 0.02, "H₂O": 0.01, "PH₃": 0.005, "CO": 0.001 },0.47)),
            new Planet("Uranus", 2.857e12, 0.0464, 2.5362e7, "#4169e1", 2.482, 2.37e-9,8.681e25,0.0134,5.4816, [
                new Moon("Ariel", 1.909290e+08, 0.001, 5.79e5, "#c8f0ff", 3.377212, 1.000000e-07,1.353e21,0.0045),
                new Moon("Umbriel", 2.659860e+08, 0.004, 5.845e5, "#888899", 4.415683, 1.000000e-07,1.172e21,0.0023),
                new Moon("Titania", 4.362980e+08, 0.002, 7.89e5, "#ccccdd", 1.188569, 1.000000e-07,3.527e21,0.0011),
                new Moon("Oberon", 5.835110e+08, 0.002, 7.615e5, "#bbbbbb", 2.506293, 1.000000e-07,3.014e21,0.0122),
                new Moon("Miranda", 1.298460e+08, 0.001, 2.358e5, "#aaddee", 1.274090, 1.000000e-07,6.59e19,0.0757),
                new Moon("Portia", 6.610000e+07, 0.0, 6.75e4, "#aaaabb", 5.998697, 1.417042e-04,1.7e18,0.0000),
                new Moon("Cupid", 7.440000e+07, 0.005, 9.0e3, "#c0b0cc", 2.802999, 1.186005e-04,3.8e17,0.0000),
                new Moon("Puck", 8.6004e+07, 0.00012, 8.1e4, "#999999", 0.87441, 9.55e-5, 1.91e18, 0.00557,0.87441),
                new Moon("Sycorax", 1.21932e+10, 0.484, 8.25e4, "#886688", 5.796238, 5.65e-8, 2.5e18, 2.673, 5.796238),
                new Moon("Caliban", 7.167e+9, 0.077, 4.2e4, "#998888", 4.209734, 1.25e-7, 2.5e17, 2.443,4.209734),
                new Moon("Mab", 9.7736e+07, 0.00347, 1.2e4, "#ccddee", 6.073746, 7.88e-5, 8.0e15, 0.122,6.073746),
                new Moon("Belinda", 7.5255e+07, 0.00007, 6.4e4, "#aaaaaa", 2.117084, 1.17e-4, 2.0e17, 0.0306,2.117084),
                new Moon("Francisco", 4.276e+09, 0.146, 1.1e4, "#888888", 5.033530, -2.72e-7, 7.2e15, 2.530, 5.033530),
                new Moon("Prospero", 1.6221e+10, 0.445, 2.5e4, "#777777", 3.448771, -3.68e-8, 8.5e16, 2.652, 3.448771)],
                new Atmosphere(0.42, 27700,2536000, 2.64, "#b0e0e6AA",{ "H₂": 82.5, "He": 15.0, "CH₄": 2.0, "C₂H₆": 0.3, "NH₃": 0.1, "H₂O": 0.05, "CO": 0.02, "Ar": 0.01, "C₂H₂": 0.01 },0.55)),
            new Planet("Neptune", 4.503e12, 0.0086, 2.4622e7, "#4169e1", 2.482, 1.21e-9, 1.024e26,0.0309,5.3117 , [
                new Moon("Triton", 3.54759e8, 0.000016, 1.353e6, "#ccbbbb", 1.099557, -1e-7, 2.14e22, 2.147, 1.099557,
                    new Atmosphere(1.4e-5, 25000, 120000, 28.0, "#ffeecc88", { "N₂": 97.5, "CH₄": 2.0, "CO": 0.2, "C₂H₄": 0.1, "C₂H₆": 0.05, "Ar": 0.05, "O₂": 0.05, "NO": 0.03, "HCN": 0.02 }, 0.76)),
                new Moon("Naiad", 4.821e7, 0.0003, 3.3e4, "#ccccee", 1.565560, 2.47e-4, 2e17, 0.0873),
                new Moon("Thalassa", 5.008e7, 0.0002, 4.0e4, "#bbccdd", 2.892011, 2.34e-4, 3.5e17, 0.0037,2.892011),
                new Moon("Despina", 5.253e7, 0.0004, 7.4e4, "#aabbee", 2.183407, 2.17e-4, 2.1e18, 0.0038,2.183407),
                new Moon("Galatea", 6.198e7, 0.0006, 8.8e4, "#aaccdd", 1.513200, 1.70e-4, 2.1e18, 0.0000, 1.513200),
                new Moon("Larissa", 7.353e7, 0.0012, 9.7e4, "#aaccee", 2.888520, 1.31e-4, 4.2e18, 0.0010,2.888520),
                new Moon("Proteus", 1.176e8, 0.0005, 2.1e5, "#9999aa", 4.831071, 1.02e-4, 4.4e19, 0.0000,4.831071),
                new Moon("Hippocamp", 1.053e8, 0.0008, 1.75e4, "#ccccdd", 5.000368, 7.65e-5, 2e16, 0.0000,5.000368),
                new Moon("Nereid", 5.5139e9, 0.7512, 1.7e5, "#bbbbcc", 5.558874, 1.11e-7, 3.1e19, 0.571,5.558874),
                new Moon("Halimede", 1.65905e10, 0.521, 3.2e4, "#888888", 2.370157, -3.87e-8, 1e17, 2.8798,2.370157),
                new Moon("Psamathe", 4.76466e10, 0.413, 2.4e4, "#8888aa", 3.197443, -7.95e-9, 6e16, 2.8798,3.197443),
                new Moon("Sao", 2.22399e10, 0.296, 2.6e4, "#7799aa", 3.115413, 2.49e-8, 8e16, 0.5236, 3.115413),
                new Moon("Laomedeia", 2.34999e10, 0.419, 2.5e4, "#7799bb", 4.330162, 2.30e-8, 9e16, 0.5236,4.330162),
                new Moon("Neso", 4.98978e10, 0.455, 3.3e4, "#667788", 0.240855, 7.42e-9, 2e17, 2.8798,0.240855),
                new Moon("S2002_N5", 2.34147e10, 0.433, 2.1e4, "#667799", 5.291838, 2.31e-8, 9e16, 2.8798,5.291838),
                new Moon("S2021_N1", 5.07002e10, 0.503, 2.0e4, "#556688", 4.138176, 7.24e-9, 1e17, 2.8798,4.138176)],
            new Atmosphere(0.45, 24700, 2462000, 2.64, "#4169e1AA",{ "H₂": 80.0, "He": 19.0, "CH₄": 1.0, "C₂H₆": 0.2, "NH₃": 0.1, "H₂O": 0.05, "CO": 0.03, "Ar": 0.02, "C₂H₂": 0.01 },0.41)),
            new Planet("Plutone", 5.90638e12, 0.2488, 1.1883e6, "#b0c4de", 153.3, 8.04e-10, 1.303e22, 0.72, 4.6100, [
                new Moon("Charon", 1.957e7, 0.00016, 6.06e5, "#cccccc", 5.307546, 1.0e-7, 1.5897e21, 0.38,5.307546),
                new Moon("Styx", 4.2656e7, 0.0058, 1.05e4, "#dddddd", 6.250024, 3.61e-6, 7.5e15, 0.65,6.250024),
                new Moon("Nix", 4.8694e7, 0.0020, 3.7e4, "#eeeeee", 5.902704, 2.93e-6, 2.6e16, 0.56,5.902704),
                new Moon("Kerberos", 5.7783e7, 0.0033, 1.9e4, "#cccccc", 4.818854, 2.26e-6, 1.65e16, 0.56,4.818854),
                new Moon("Hydra", 6.472e7, 0.0059, 5.1e4, "#eeeeff", 5.846853, 1.90e-6, 4.8e16, 0.83,5.846853)
            ],new Atmosphere(1.3e-5, 18000, 120000, 28.0, "#ffeecc88", { "N₂": 98.0, "CH₄": 0.015, "CO": 0.005, "C₂H₆": 0.003, "C₂H₂": 0.001, "O₂": 0.001, "NO": 0.0005, "HCN": 0.0002 }, 0.52)),
            new Planet("Haumea", 6.4501e12, 0.196, 780000, "#e0ffff", 3.915, 7.04e-10, 4.006e21, 0.66, 2.9300, [
                new Moon("Hi'iaka", 4.988e7, 0.0513, 3.69e5, "#ffffff", 2.730, 1.48e-6, 1.79e19, 0.68,2.730),
                new Moon("Namaka", 2.5657e7, 0.249, 1.7e5, "#dddddd", 3.217, 3.97e-6, 1.79e18, 0.80,3.217)
            ]),
            new Planet("Makemake", 6.7962e12, 0.161, 715000, "#ffe4b5", 22.83, 6.53e-10, 3.1e21, 0.82, 5.0300, [
                new Moon("MK2", 2.1e7, 0.0, 1.75e5, "#bbbbbb", 4.010, 6.05e-6, 3.0e17, 0.04,4.010)
            ]),
            new Planet("Eris", 1.018e13, 0.436, 1.163e6, "#dcdcdc", 15.79, 3.57e-10, 1.6466e22, 0.96, 1.7500, [
                new Moon("Dysnomia", 3.7273e7, 0.0062, 6.15e5, "#999999", 0.343, 4.60e-6, 8.2e19, 0.05,0.343)
            ]),
            new Planet("Sedna", 8.55e13, 0.8547, 495000, "#ffccaa", 3.141593, 1.04e-12, 1.1e21, 0.2083, 3.8700),
            new Planet("2012 VP113", 4.12e13, 0.691, 300000, "#ffaaaa", 1.047198, 1.15e-12, 4.5e20, 0.4197, 1.0472),
            new Planet("Leleākūhonua", 2.14e14, 0.94, 250000, "#ffddee", 5.235988, 4.91e-13, 2.0e20, 0.2033, 5.2360),
            new Planet("2014 FE72", 3.22e14, 0.9804, 200000, "#ffeecc", 0.872665, 1.25e-13, 1.6e20, 0.1395, 0.8727),
            new Planet("2004 VN112", 4.48e13, 0.849, 250000, "#ffddaa", 2.617994, 2.90e-12, 4.0e20, 0.3591, 2.6180),
            new Planet("2000 CR105", 2.14e13, 0.81, 200000, "#ffbbbb", 4.188790, 1.10e-11, 3.0e20, 0.5359, 4.1888),
            new Planet("2007 TG422", 9.85e13, 0.928, 195000, "#d0f0ff", 4.712389, 9.80e-13, 6.0e20, 0.6081, 4.7124),
            new Planet("2008 ST291", 1.5e14, 0.94, 200000, "#f0e0ff", 5.759587, 5.20e-13, 6.4e20, 0.0668, 5.7596),
            new Planet("2014 SR349", 4.37e13, 0.837, 100000, "#ffeeaa", 6.237, 3.42e-12, 2.1e20, 0.3138, 6.237),
            new Planet("2017 OF201", 1.26e14, 0.946, 350000, "#ddeeff", 0.0227, 7.10e-14, 2.8e20, 0.2827, 0.0227),
            new Planet("2013 SY99", 1.03e14, 0.9274, 250000, "#ffeedd", 6.27, 8.60e-14, 2.0e20, 0.0738, 6.27),
            new Planet("2015 TG387", 1.76e14, 0.940, 250000, "#ddeeff", 0.0873, 4.30e-14, 2.5e20, 0.2042, 0.0873),
            new Planet("2010 GB174", 5.23e13, 0.86, 200000, "#ffdddd", 1.396, 2.20e-12, 2.1e20, 0.3752, 1.396),
            new Planet("2013 FT28", 4.63e13, 0.86, 200000, "#eeddff", 0.5236, 2.80e-12, 2.0e20, 0.3020, 0.5236),
            new Planet("Quaoar", 6.43e12, 0.038, 5.0e5, "#ccddff", 1.047198, 6.50e-10,1.4e21,0.1395,1.0472,[
                new Moon("Weywot", 1.33e7, 0.14, 4.0e4, "#bbbbbb", 1.570796, 5.87e-6,1.4e19,0.2688,1.570796)
            ]),
            new Planet("Orcus", 5.87e12, 0.227, 4.5e5, "#ddeeff", 2.094395, 7.10e-10,6.4e20,0.3591,3.8746,[
                new Moon("Vanth", 9.0e6, 0.007, 2.2e5, "#cccccc", 3.141593, 7.66e-6,1.5e20,0.3665,3.141593)
            ]),
            new Planet("Gonggong", 1.02e13, 0.45, 6.0e5, "#ffdddd", 3.141593, 3.60e-10,1.75e21,0.5359,1.8373,[
                new Moon("Xiangliu", 1.5e7, 0.3, 7.5e4, "#dddddd", 4.712389, 2.88e-6,3.0e19,0.5236,4.712389),
            ]),
            
            new Planet("2002 MS4", 6.8e12, 0.14, 4.0e5, "#ffeecc", 4.188790, 6.60e-10,7.0e20,0.2094,4.1888),
            new Planet("Varuna", 6.4e12, 0.056, 3.5e5, "#ddccff", 5.235988, 6.80e-10,3.2e20,0.0524,5.2360),
            new Planet("Planet Nine",1.047e14,0.65,1.75e7,"#445577",0.9199,0.000011,6e25,0.5236,0.9199,[
                new Moon("???", 3.8e8, 0.01, 4.64e6, "#aabbee", 1.5708, 4.1e-7, 1.4e23, 0.05,1.5708,
                    new Atmosphere(0.33, 19700, 223000, 0.64, "#4169e1B3",{"SO₂" : 22.55,"O₃": 4.45,"S":13,"H₂O":1.5, "CH₄": 31.7,"NH₃":14.4,"N₂":6.64,"H₂":5.76},0.34)),
                new Moon("???", 6.2e8, 0.12, 8.1e5, "#bbccee", 3.1416, 3.2e-7, 5.7e21, 0.08,3.1416),
                new Moon("???", 9.5e8, 0.21, 5.2e5, "#9999bb", 0.7854, 2.2e-7, 3.0e21, 0.12,0.7854),
                new Moon("???", 1.45e9, 0.38, 1.6e5, "#ccddff", 4.7124, 1.7e-7, 4.2e20, 0.21,4.7124),
                new Moon("???", 3.9e9, 0.67, 1.2e5, "#555577", 2.3562, 1.0e-7, 2.5e20, 0.37,1.0e-7)],
                new Atmosphere(0.14, 11700, 93000, 0.44, "#4169e1CF",{"H₂" : 42.02,"N₂": 0.98,"S":29,"H₂O":1.5, "CH₄": 31.7,"NH₃":14.4,"N₂":6.64,"H₂":5.76},0.11)),
            new Planet("Cometa C/1995 O1 Hale-Bopp", 1.86e13, 0.995, 3.0e4, "#ffffff", 0.222314, 1.99e-10,2.5e13,1.559,0.2223),
            new Planet("Cometa C/2014 UN271", 2.99e15,  0.999, 7.5e5,"#ccffff", 0.00087,  1.39e-15, 1.0e21,  0.1745,0.00087),
            new Planet("Cometa C/1999 F1", 4.94e15, 0.99914,  5.0e5,  "#ccffee",  0.001, 6.6e-16, 1.0e21,  1.6067, 0.001),
            new Planet("Vesta", 3.53e11, 0.089, 2.62e5, "#f5deb3", 0.872665, 1.32e-7,2.590e20,0.1223,5.9983),
            new Planet("Pallas", 4.14e11, 0.23, 2.72e5, "#e6e6fa", 1.396263, 1.12e-7,2.110e20,0.6004,1.3963),
            new Planet("Hygiea", 4.29e11, 0.12, 2.20e5, "#dcdcdc", 2.617994, 1.05e-7,8.67e19,0.0668,2.6180),
            new Planet("Euphrosyne", 4.44e11, 0.22, 1.30e5, "#c0c0c0", 3.665191, 9.8e-8,6.6e19,0.4591,3.6652),
            new Planet("☄️ (99942) Apophis", 1.38e11, 0.1915, 1.6e2, "#ff9999", 2.849, 2.24e-6,2.7e10,0.0496,2.8490),
            new Planet("☄️ (4179) Toutatis", 3.7849e11, 0.629, 2.8e3, "#cccccc", 0.5236, 1.15e-7,5.0e13,0.446,0.5236),
            new Planet("☄️ (29075) 1950 DA", 2.5392e11, 0.5077, 6.25e2, "#ff9999", 0.5236, 2.25e-7,4.0e12,0.2123,0.5236),
            new Planet("☄️ (101955) Bennu", 1.6837e11, 0.2037, 2.45e2, "#aaaaaa", 0.5236, 3.5e-7,7.8e10,0.0355,0.5236),
            new Planet("☄️ (4660) Nereus", 2.2248e11,0.360, 1.7e2, "#bbbbbb", 0.5236, 2.7e-7,3.0e10,0.0175,0.5236),
            ],new Atmosphere( 1e-12, 5e5, 5e6,1.0, "#ffffaa33",{ "H": 73.8, "He": 24.9, "C": 0.3, "N": 0.08, "O": 0.8, "Ne": 0.12, "Mg": 0.06, "Si": 0.07, "S": 0.04, "Fe": 0.1 },0.0),3.828e26);
        this.Star.influenceAreaRadius = 1.1e16;
    }
}
const globalGameData = new GameData();
try {
    const datiSalvati = localStorage.getItem("simulazione");
    const datiLetti = JSON.parse(datiSalvati);
    if (datiLetti) {
        const newData = GameData.fromJSON(datiLetti);
        Object.assign(globalGameData, newData);
    }
} catch (e) {
    alert("Invalid saved simulation data! Simulation restarted. Error: "+e);
}
class SpaceSimulator {
    constructor() {
        this.canvas = document.getElementById("renderCanvas");
        if (!this.canvas) return;
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        this.ctx = this.canvas.getContext("2d");
        this.center = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        };
        if(globalGameData.chronometer.time <=1){
            globalGameData.camera.position.x =  this.canvas.width/2
            globalGameData.camera.position.y =  this.canvas.height/2
        }
        this.EnigeneeringIndex = 0;
        this.MaxEnigeneeringIndex = 40;
        this.offsetReloadFrame = 50;
        this.animate();
    }
    truncateDecimals(num, digits = 7) {
        const factor = Math.pow(10, digits);
        return Math.trunc(num * factor) / factor;
    }
    worldToScreen(pos) {
        return {
            x: pos.x * globalGameData.camera.scale + globalGameData.camera.position.x,
            y: pos.y * globalGameData.camera.scale + globalGameData.camera.position.y,
        };
    }
    ricalcolaAreaDiInfluenzaGravitazionale(){
        if(globalGameData.Starship&&globalGameData.Star){
            const StashipX = globalGameData.Starship.position.x;
            const StashipY = globalGameData.Starship.position.y;
            let find = false;
            let PlausibileMoons = [];
            var MaxPlanetaryForce = 0.0;
            for(const planet of globalGameData.Star.planets){
                const PlanetX = planet.position.x;
                const PlanetY = planet.position.y;
                const influenceAreaRadius = planet.influenceAreaRadius;
                const dx = StashipX - PlanetX;
                const dy = StashipY - PlanetY;
                const dist2 = dx*dx + dy*dy;
                const force = planet.mass / dist2;
                if(dist2 <= influenceAreaRadius * influenceAreaRadius){
                    PlausibileMoons.push(...planet.moons);
                    if(force>MaxPlanetaryForce){
                        find = true;
                        MaxPlanetaryForce = force;
                        globalGameData.Starship.relatedObject = planet.name;
                        globalGameData.Starship.relativePosition = {x:dx,y:dy};
                        globalGameData.Starship.TypeRelObj = "planet";
                    }
                }
                var MaxMoonInfForce = 0.0;    
                var findMoon = false;
                for(const moon of PlausibileMoons){
                    const MoonX = moon.position.x;
                    const MoonY = moon.position.y;
                    const MoonInfluenceRadius = moon.influenceAreaRadius;
                    const Mdx = StashipX - MoonX;
                    const Mdy = StashipY - MoonY;
                    const dist2 = Mdx*Mdx + Mdy*Mdy;
                    const force = moon.mass / dist2;
                    if((dist2 <= MoonInfluenceRadius * MoonInfluenceRadius)&&force>MaxMoonInfForce){     
                        findMoon = true;               
                        globalGameData.Starship.relatedObject = moon.name;
                        globalGameData.Starship.relativePosition = {x:Mdx,y:Mdy};
                        globalGameData.Starship.TypeRelObj = "moon";
                        MaxMoonInfForce = force;
                    }
                } 
            }
            if(!find&&!findMoon){
                const Sdx = StashipX- globalGameData.Star.position.x;
                const Sdy = StashipY - globalGameData.Star.position.y;
                const dist2 = Sdx*Sdx + Sdy*Sdy;
                if(dist2 <= globalGameData.Star.influenceAreaRadius * globalGameData.Star.influenceAreaRadius){
                    globalGameData.Starship.relatedObject = globalGameData.Star.name;
                    globalGameData.Starship.relativePosition = {x:Sdx,y:Sdy};
                    globalGameData.Starship.TypeRelObj = "star";
                    const distance = Math.sqrt(dist2);
                    if(distance<=globalGameData.Star.radius+globalGameData.Star.corona.maxAltitude){
                        globalGameData.Starship = null;
                    }
                }else{
                    const Gdx = StashipX;
                    const Gdy = StashipY;
                    globalGameData.Starship.relatedObject = "Interstellar Space";
                    globalGameData.Starship.TypeRelObj = "";
                    globalGameData.Starship.relativePosition = {x:Gdx,y:Gdy};
                }
            }
        }
    }
    aggiornaTemperaturaPropulsori(distanza, surface, rho, v, area, deltaTime,massa, cp_surface, k = 1.83e-5, targetAtmosphere, combustibileBruciato, carburanteNome,targetMass, targetRadius, targetDistance,clone = false) {
        const σ = 5.67e-8;
        const ε_surface = materialCpMap[surface.material]?.ε ?? 0.8;
        const T0 = surface.T0 ?? surface.actualTemperature ?? 288.15;
        const composition = targetAtmosphere?.composition ?? {"O" : 0};
        const cp_gas = this.calcolaCpGas(composition);
        let newTStatic = 2.725;
        let Tenv = newTStatic + v * v / (2 * cp_gas);
        if (rho === 0 || composition.length === 0) Tenv = 2.725;
        const cv = fuelMap[carburanteNome]?.cv ?? 43e6;
        const η = hullStructureMap[surface.kind]?.η ?? 0.3;
        const energiaCombustione = cv * combustibileBruciato * (1 - η);
        let P_rad_out = ε_surface * σ * area * (T0 ** 4 - Tenv ** 4);
        surface.actualTemperature += (energiaCombustione-P_rad_out) / (massa * cp_surface);
        if(surface.actualTemperature <2.725) surface.actualTemperature = 2.725;
    }
    ricalcolaConsumoCarburante(starship,deltaTime,targetAtmosphere,targetMass,targetRadius,targetDistance){
        const stadio = starship.Stages[starship.actualStage];
        if(stadio){
            const motore = stadio.Engine;
            if(motore){
                const forzaMotore  = motore.Thrust * (motore.thrustPercent / 100);
                const CombustibileBruciato = (forzaMotore*(fuelMap[stadio.tipoCarburante]?.tsfc??0)*deltaTime);
                const volumeConsumato = CombustibileBruciato /  (fuelMap[stadio.tipoCarburante]?.density??0);
                const vel = starship.velocity.modulo();
                const dx = -starship.relativePosition.x;
                const dy = -starship.relativePosition.y;
                const distanza2 = dx*dx + dy*dy;
                const distanza = Math.sqrt(distanza2);
                const cp = materialCpMap[motore.surface.material]?.cp ?? 1;
                const k = materialCpMap[motore.surface.material]?.k ?? 1e-4;
                let rho = (targetAtmosphere?.density??0) * Math.exp(-distanza / (targetAtmosphere?.scaleHeight??0));
                if(distanza>targetAtmosphere?.maxAltitude??0) rho = 0;
                if(!targetAtmosphere||!isFinite(rho)||isNaN(rho)) rho = 0;
                if(!isFinite(rho)) rho = 0;
                let clone = false;
                if(starship.name=="clone") clone = true;
                const area = this.calcolaVolumeScafo(motore.surface.height, motore.surface.diameter, motore.surface.spessorePercentuale, motore.surface.kind);
                if(stadio.quantitaCarburante - volumeConsumato>=0){
                    stadio.quantitaCarburante -=volumeConsumato;
                    starship.mass-=CombustibileBruciato;
                    stadio.mass-=CombustibileBruciato;
                    starship.mass = Math.max(starship.mass, 0);
                    stadio.mass = Math.max(stadio.mass, 0);
                    this.aggiornaTemperaturaPropulsori(distanza, motore.surface, rho, vel, area, deltaTime, motore.mass,cp, k, targetAtmosphere,CombustibileBruciato,stadio.tipoCarburante, targetMass, targetRadius, targetDistance, clone);
                }else{
                    const massaResidua = stadio.quantitaCarburante * (fuelMap[stadio.tipoCarburante]?.density??0);
                    const SpintaReale = massaResidua / ((fuelMap[stadio.tipoCarburante]?.tsfc??0) * deltaTime);
                    starship.thrustPercent = (SpintaReale / motore.Thrust) * 100;
                    starship.mass -= stadio.quantitaCarburante * (fuelMap[stadio.tipoCarburante]?.density??0);
                    stadio.mass -= stadio.quantitaCarburante * (fuelMap[stadio.tipoCarburante]?.density??0);
                    stadio.quantitaCarburante = 0;
                    this.aggiornaTemperaturaPropulsori(distanza, motore.surface, rho, vel, area, deltaTime, motore.mass,cp, k, targetAtmosphere,CombustibileBruciato,stadio.tipoCarburante, targetMass, targetRadius, targetDistance, clone);
                }
            }
        }
    }
    ricalcolaGravità(starship,TargetMass,dx,dy,distanza2,distanza,targetA,targetE,TargetCenter,TargetEpochAnomaly,BaseMass,deltaTime){
        const anomaly = this.calcolaAnomaliaVeraConRelativitaGenerale(targetA,targetE,globalGameData.chronometer.time,TargetEpochAnomaly,BaseMass,null,deltaTime,false); 
        const tr = targetA * (1 - targetE * targetE) / (1 + targetE * Math.cos(anomaly)); 
        const TSpeed = Math.sqrt(G * BaseMass * (2 / tr - 1 / targetA)); 
        let TargetGamma =  1 / Math.sqrt(1 - Math.pow(TSpeed / c, 2)); 
        let TargetRelativisticMass = TargetMass * TargetGamma; 
        if(isNaN(anomaly)){ 
            TargetRelativisticMass = TargetMass;
        }
        if(distanza2 > 1e-12 && isFinite(distanza2)){
            const forzaPerMassa = G * TargetRelativisticMass / distanza2;
            if (isFinite(distanza) && TargetRelativisticMass >= 1e-6&&isFinite(forzaPerMassa)){
                const vShip = starship.velocity.modulo();
                const gammaShip = 1 / Math.sqrt(1 - Math.pow(vShip / c, 2));
                if(isFinite(gammaShip)&&!isNaN(gammaShip)){
                    const ax = (dx / distanza) * forzaPerMassa / gammaShip;
                    const ay = (dy / distanza) * forzaPerMassa / gammaShip;
                    const px = starship.relativePosition.x;
                    const py = starship.relativePosition.y;
                    const grav = new Vettore(ax, ay,{x:px,y:py})
                    starship.acceleration = grav.clone().add(starship.acceleration);
                }
            }
        }
    }
    ricalcolaSpinta(starship){
        const stadio = starship.Stages[starship.actualStage];
        if(stadio){
            const motore = stadio.Engine;
            if(motore){
                const v = Math.min(starship.velocity.modulo(), c * 0.99999999999999);
                const gamma = 1 / Math.sqrt(1 - (v * v) / (c * c));
                const forzaMotore  = motore.Thrust * (motore.thrustPercent / 100);
                const angoloAssoluto = motore.angle + starship.angle;
                motore.angle = 0;
                const direzioneSpinta = new Vettore(
                    Math.cos(angoloAssoluto),
                    Math.sin(angoloAssoluto),
                    starship.relativePosition
                );
                const massaRiposo = starship.mass;
                const accelSpinta = forzaMotore*(hullStructureMap[motore.surface.kind]?.η??0) / (massaRiposo * Math.pow(gamma, 3));
                if(stadio.quantitaCarburante >1e-6){
                    const thrust = direzioneSpinta.clone().multiply(accelSpinta);
                    starship.acceleration.add(thrust);
                    const braccio = new Vettore(5, 0).ruotato(starship.angle);
                    const torque = braccio.x * thrust.y - braccio.y * thrust.x;
                    if(isNaN(torque / 1000000)){
                        console.error("NaN rilevato! nel torque");
                    }else starship.angularVelocity += motore.thrustPercent*torque / 10000;
                }else{
                    stadio.quantitaCarburante = 0;
                    motore.thrustPercent = 0;
                }
            }
        }
    }
    calcolaAccellerazioneCoriolis(starship,targetA,BaseMass,targetE,TargetCenter,TargetEpochAnomaly,deltaTime){
        if(starship.TypeRelObj == "planet"||starship.TypeRelObj == "moon"){
            const anomaly = this.calcolaAnomaliaVeraConRelativitaGenerale(targetA,targetE,globalGameData.chronometer.time,TargetEpochAnomaly,BaseMass,null,deltaTime,false); 
            const tr = targetA * (1 - targetE * targetE) / (1 + targetE * Math.cos(anomaly)); 
            const TSpeed = Math.sqrt(G * BaseMass * (2 / tr - 1 / targetA)); 
            const Ncdx = starship.position.x - TargetCenter.x;
            const Ncdy = starship.position.y - TargetCenter.y;
            const Ndistanza = Math.sqrt(Ncdx * Ncdx + Ncdy * Ncdy);
            const h = Math.sqrt(G * BaseMass * targetA * (1 - targetE * targetE));
            const omega = TSpeed / Ndistanza;
            const aCentrifuga = new Vettore(Ncdx, Ncdy,starship.position).multiply(omega * omega);
            const aTotale = aCentrifuga.clone();
            const vRel = starship.velocity;
            const aCoriolis = new Vettore(-vRel.y, vRel.x).multiply(-2 * omega);
            aTotale.add(aCoriolis);
            if(isNaN(aTotale.x)||isNaN(aTotale.y)){
                console.error("NaN rilevato! nell'accellerazione di coriolis");
            }else starship.acceleration.add(aTotale);
        }      
    }
    calcolaAreaCoefficienteDragAstronave(starship) {
        const componentiVisibili = [];
        const vel   = starship.velocity.clone();
        const vMod  = vel.modulo();
        const dirV  = vel.divide(vMod);
        const ang    = starship.angle;
        const orient = new Vettore(Math.cos(ang), Math.sin(ang),{x:starship.position.x,y:starship.position.y});
        function proiettaCilindro(surf, axis) {
            const r     = surf.diameter / 2;
            const h     = surf.height;
            const cosT  = Math.abs(dirV.dot(axis));
            const sinT  = Math.sqrt(1 - cosT*cosT);
            const A_head= Math.PI * r * r; 
            const A_side= h * surf.diameter; 
            const Aproj = A_head * cosT + A_side * sinT;
            const info  = hullStructureMap[surf.kind] || {};
            const cdH   = surf.Cd   > 0 ? surf.Cd   : (info.cd     ?? 0.85);
            const cdS   =                info.sideCd ?? cdH;
            const CdEff = (cdH * A_head * cosT + cdS * A_side * sinT) / Aproj;
            const fattA = info.a ?? 1;
            return { A: Aproj * fattA, CdA: CdEff * (Aproj * fattA) };
        }
        let areaTot = 0, sommaCdA = 0;
        for (const stage of Object.values(starship.Stages)) {
            if (stage.surface?.diameter > 0) {
                const { A, CdA } = proiettaCilindro(stage.surface, orient);
                if(A>0) componentiVisibili.push({id: stage.surface.id,a:{a:A,cD:CdA}});
                areaTot  += A;  
                sommaCdA += CdA;
            }
            const engSurf = stage.Engine?.surface;
            if (engSurf?.diameter > 0) {
                const { A, CdA } = proiettaCilindro(engSurf, orient.clone().multiply(-1));
                if(A>0) componentiVisibili.push({id: engSurf.id,a:{a:A,cD:CdA}});
                areaTot  += A;  
                sommaCdA += CdA;
            }
            const hsSurf  = stage.heatShield?.surface;
            if (hsSurf?.diameter > 0) {
                const { A, CdA } = proiettaCilindro(hsSurf, orient);
                if(A>0) componentiVisibili.push({id: hsSurf.id,a:{a:A,cD:CdA}});
                areaTot  += A;  
                sommaCdA += CdA;
            }
            const parDeploySurface  = stage.parachute?.surface;
            if (parDeploySurface?.diameter > 0) {
                const { A, CdA } = proiettaCilindro(parDeploySurface, orient);
                if(A>0) componentiVisibili.push({id: parDeploySurface.id,a:{a:A,cD:CdA}});
                areaTot  += A;  
                sommaCdA += CdA;
            }
        }
        return {
            A : areaTot,
            Cd: areaTot > 0 ? sommaCdA / areaTot : 0.3,
            surfaces : componentiVisibili
        };
    }
    ricalcolaDrag(starship,targetAtmosphere,deltaTime,distanza){
        const h = distanza;
        if (targetAtmosphere && h >= 0&&h < targetAtmosphere.maxAltitude) {
            let rho = targetAtmosphere.density * Math.exp(- h/ targetAtmosphere.scaleHeight);
            const output = this.calcolaAreaCoefficienteDragAstronave(starship);
            let Cd = output.Cd;
            let A = output.A;
            const stadio = starship.Stages[starship.actualStage];
            if(stadio&&stadio.parachute!=null){
                const Apar = ((stadio.parachute.areaParachute));
                const CdPar = ((paraMaterialsMap[stadio.parachute.parachuteMaterial]?.cd ?? 0)*(parastructureMap[stadio.parachute.parachuteGeometry]?.cd ?? 0))* (1 - 0.12 * (stadio.parachute.numParachutes-1))
                A+=Apar*(stadio.parachute.openingPercent/100);
                Cd+=CdPar;
                const mat = paraMaterialsMap[stadio.parachute.parachuteMaterial];
                const str = parastructureMap[stadio.parachute.parachuteGeometry];
                const sigmaEff = mat.r * str.r;
                const PaMax    = sigmaEff / str.a; 
                const CdTot    = mat.cd * str.cd;  
                const hMaxDeploy = -targetAtmosphere.scaleHeight * Math.log(0.1 / targetAtmosphere.density);
                stadio.parachute.maxDeployAltitude = hMaxDeploy;
                if(h<=hMaxDeploy){
                    const vMaxSafe = Math.sqrt((2 * PaMax) / (rho * CdTot));
                    stadio.parachute.maxShipSpeed = vMaxSafe*0.98;
                }
            }
            const vx = starship.velocity.x;
            const vy = starship.velocity.y;
            const v = Math.sqrt(vx * vx + vy * vy);
            if (v > 1e-3) {
                const drag = 0.5 * rho * v * v * Cd * A;
                const dirX = -vx / v;
                const dirY = -vy / v;
                const dragForce = new Vettore(dirX * drag / starship.mass, dirY * drag / starship.mass, {
                    x: starship.relativePosition.x,
                    y: starship.relativePosition.y
                });
                if(!isNaN(dragForce.modulo())&&dragForce.modulo() > 1e-6&&stadio.parachute){
                    starship.acceleration.add(dragForce);
                    stadio.parachute.actualPa = dragForce.modulo()*stadio.parachute.openingPercent;
                    const superficieEffettiva = stadio.parachute.numParachutes * stadio.parachute.areaParachute * (parastructureMap[stadio.parachute.parachuteGeometry]?.a ?? 1);
                    const dragMassima = ((paraMaterialsMap[stadio.parachute.parachuteMaterial]?.r ?? 0) * superficieEffettiva) / (parastructureMap[stadio.parachute.parachuteGeometry]?.r ?? 1);
                    if(stadio.parachute.actualPa>dragMassima&&starship.name!="clone"){
                        const parMass = ((stadio.parachute.numParachutes * stadio.parachute.areaParachute) * (paraMaterialsMap[stadio.parachute.parachuteMaterial]?.m ?? 0))*(parastructureMap[stadio.parachute.parachuteGeometry]?.a ?? 0);
                        stadio.mass-= parMass;
                        starship.mass-= parMass;
                        alert(`WARNING: Parachute destroyed due to atmospheric drag exceeding its maximum force limit. Actual force: ${stadio.parachute.actualPa} N.`);
                        stadio.parachute = null;
                    }
                }else if(!isNaN(dragForce.modulo())&&dragForce.modulo() > 1e-6){
                    starship.acceleration.add(dragForce);
                }
            }  
            if(stadio.parachute){
                const e = (paraMaterialsMap[stadio.parachute.parachuteMaterial]?.e ?? 0.2)+(parastructureMap[stadio.parachute.parachuteGeometry]?.e ?? 0.2);
                const aperturaAlSec = 1 / (2 +4 * e)*100;
                const deployIncrement = aperturaAlSec * deltaTime;
                if(stadio.parachute.openingPercent + deployIncrement<=stadio.parachute.TargetOpenPercent){
                    stadio.parachute.openingPercent +=deployIncrement;
                }else if(stadio.parachute.openingPercent<stadio.parachute.TargetOpenPercent){
                    stadio.parachute.openingPercent = stadio.parachute.TargetOpenPercent;
                }
            }
        }
    }
    ricalcolaAperturaParacadute(starship,targetAtmosphere,deltaTime){
        if(starship!=null&&targetAtmosphere!=null){
            const stadio = starship.Stages[starship.actualStage];
            if(stadio&&stadio.parachute){
                const h = starship.altitudineRelativa;
                const e = (paraMaterialsMap[stadio.parachute.parachuteMaterial]?.e ?? 0.2)+(parastructureMap[stadio.parachute.parachuteGeometry]?.e ?? 0.2);
                const densita = targetAtmosphere.density * Math.exp(- h/ targetAtmosphere.scaleHeight)
                const aperturaAlSec = (1 / (2 +4 * e)*100* densita)/(hullStructureMap[stadio.parachute.surface.kind]?.η??0.90);
                const deployIncrement = aperturaAlSec * deltaTime;
                if(stadio.parachute.openingPercent + deployIncrement<=stadio.parachute.TargetOpenPercent)stadio.parachute.openingPercent +=deployIncrement;
                else if(stadio.parachute.openingPercent<stadio.parachute.TargetOpenPercent) stadio.parachute.openingPercent = stadio.parachute.TargetOpenPercent;     
            }
        }
    }
    calcolaMassaMolareMedia(composition) {
        let somma = 0;
        const totale = Object.values(composition).reduce((s, x) => s + x, 0);
        for (const gas in composition) {
            const frazione = composition[gas] / totale;
            const Mgas = gasThermalMap[gas]?.molarMass / 1000;
            if (Mgas) somma += frazione * Mgas;
        }
        return somma;
    }
    calcolaCpGas(composition) {
        let somma = 0;
        const totale = Object.values(composition).reduce((s, x) => s + x, 0);
        for (const gas in composition) {
            const frazione = composition[gas] / totale;
            const cp = gasThermalMap[gas]?.specificHeat;
            if (cp) somma += frazione * cp;
        }
        return somma;
    }
    calcolaPressioneAtmosferica(rho, T, composition) {
        const R_univ = 8.314462618;
        const M = this.calcolaMassaMolareMedia(composition);
        const Rgas = R_univ / M;
        return rho * Rgas * T;
    }
    emissivitaMedia(composition) {
        let somma = 0;
        for (const gas in composition) {
            const totale = Object.values(composition).reduce((s, x) => s + x, 0);
            const frazione = composition[gas] / totale;
            const ε = gasThermalMap[gas]?.emissivity ?? 0;
            somma += frazione * ε;
        }
        return somma;
    }
    aggiornaTemperaturaRientro(distanza, surface, rho, v, area, deltaTime,massa, cp_surface, k = 1.83e-5,targetAtmosphere, clone = false,targetMass = 0, targetRadius = 0, targetDistance = 0) {
        const σ = 5.67e-8;
        const ε_surface = materialCpMap[surface.material]?.ε ?? 0.8;
        let Tenv = 2.725; 
        if (targetAtmosphere && targetAtmosphere.composition) {
            const composition = targetAtmosphere.composition;
            const cp_gas = this.calcolaCpGas(composition);
            const pressure = this.calcolaPressioneAtmosferica(rho, 288.15, composition);
            const T0 = surface.T0 ?? surface.actualTemperature ?? 288.15;
            let newTStatic = 2.725;
            if (!clone)  newTStatic = this.computePlanetaryTemperature( composition, globalGameData.Star.luminosity, targetDistance,  targetAtmosphere.albedo,  rho,  targetAtmosphere.molecularWeight, targetAtmosphere.scaleHeight, targetMass, targetRadius,targetAtmosphere.density,   targetAtmosphere.maxAltitude,  pressure,distanza);
            Tenv = newTStatic + v * v / (2 * cp_gas);
            if (rho === 0) Tenv = 2.725;
        }
        const T0 = surface.T0 ?? surface.actualTemperature ?? 288.15;
        let P_rad_out = ε_surface * σ * area * (T0 ** 4 - Tenv ** 4);
        if (Tenv > 6000) k = 1.83e-4;
        else k = 1.83e-5;
        const q_conv = k * Math.sqrt(rho) * v ** 3;
        const E_conv = q_conv * area * deltaTime;
        const C = 1.83e-4;
        const q_rad_real = C * Math.sqrt(rho / surface.diameter) * v ** 3;
        let E_rad_in = q_rad_real * area * deltaTime;
        function CalcolaRadiazioneOutputRientro(P_rad_out) {
            return Math.max(P_rad_out * 0.0002384216, 1e-4);
        }
        if (Tenv > 6000) P_rad_out = CalcolaRadiazioneOutputRientro(P_rad_out);
        const E_rad_out = P_rad_out * deltaTime;
        const E_abs = E_conv + E_rad_in;
        const ΔE = E_abs - E_rad_out;
        surface.energiaTotale = (surface.energiaTotale ?? 0) + (isFinite(ΔE) ? ΔE : 0);
        surface.actualTemperature = T0 + surface.energiaTotale / (massa * cp_surface);
        if(surface.actualTemperature <2.725) surface.actualTemperature = 2.725;
    }
    ricalcolaTermodinamiche(starship, deltaTime, targetAtmosphere, distanza,targetMass = 0,targetRadius = 0,targetDistance = 0) {
        if (!starship||starship.name === "clone") return;
        const output = this.calcolaAreaCoefficienteDragAstronave(starship);
        const surfaces = output.surfaces;
        const vel = starship.velocity.modulo();
        let clone = false;
        if(starship.name=="clone") clone = true;
        let rho = (targetAtmosphere?.density??0) * Math.exp(-distanza / (targetAtmosphere?.scaleHeight??0));
        if(distanza>(targetAtmosphere?.maxAltitude??0)) rho = 0;
        if(!targetAtmosphere||!isFinite(rho)||isNaN(rho)) rho = 0;
        if (!Array.isArray(surfaces) || surfaces.length === 0) return;
        for (const stage of Object.values(starship.Stages)) {
            const surfaceMain = stage.surface;
            const surfaceID = surfaceMain?.id;
            const isExposed = id => surfaces.some(s => s.id === id);
            if (!surfaceID || !isExposed(surfaceID)) continue;
            const hs = stage.heatShield?.surface;
            const hsVisible = hs && isExposed(hs.id);
            if (hsVisible) {
                const hsEntry = surfaces.find(s => s.id === hs.id);
                const hsCp = materialCpMap[hs.material]?.cp ?? 1;
                const hsK = materialCpMap[hs.material]?.k ?? 1e-4;
                this.aggiornaTemperaturaRientro(distanza, hs, rho, vel, hsEntry.a.a, deltaTime, stage.heatShield.mass, hsCp, hsK, targetAtmosphere,clone,targetMass,targetRadius,targetDistance);
                if (hs.actualTemperature > hs.maxTemperature&&starship.name !== "clone") {
                    alert(`Heat Shield destroyed at ${hs.actualTemperature.toFixed(1)} K`);
                    stage.heatShield = null;
                } else if(rho>0)continue; 
            }
            const sEntry = surfaces.find(s => s.id === surfaceID);
            const cpMain = materialCpMap[surfaceMain.material]?.cp ?? 1;
            const kMain = materialCpMap[surfaceMain.material]?.k ?? 1e-4;
            this.aggiornaTemperaturaRientro(distanza, surfaceMain, rho, vel,  sEntry.a.a, deltaTime, stage.mass,cpMain, kMain, targetAtmosphere,clone,targetMass,targetRadius,targetDistance);
            if (surfaceMain.actualTemperature > surfaceMain.maxTemperature &&starship.name !== "clone") {
                alert(`MISSION FAILED! Your starship burned ${surfaceMain.actualTemperature.toFixed(1)} K`);
                starship = null;
                globalGameData.Starship = null;
                break;
            }
            for (const component of ["parachute", "Engine"]) {
                const part = stage[component];
                const surface = part?.surface;
                if (surface && isExposed(surface.id)) {
                    const entry = surfaces.find(s => s.id === surface.id);
                    const cp = materialCpMap[surface.material]?.cp ?? 1;
                    const k = materialCpMap[surface.material]?.k ?? 1e-4;
                    this.aggiornaTemperaturaRientro(  distanza, surface, rho, vel, entry.a.a, deltaTime, part.mass,cp, k, targetAtmosphere,clone,targetMass,targetRadius,targetDistance);
                    if (surface.actualTemperature > surface.maxTemperature&&starship.name !== "clone") {
                        alert(`⚠️ ${component} destroyed: ${surface.actualTemperature.toFixed(1)} K`);
                        stage[component] = null;
                    }
                }
            }
        }
    }
    ricalcolaAccellerazione(starship,deltaTime,TargetMass,targetRadius,targetAtmosphere,targetA,targetE,TargetCenter,TargetEpochAnomaly,BaseMass){
        starship.acceleration = new Vettore(0, 0,{x:0,y:0})
        starship.angularVelocity = 0;
        const dx = -starship.relativePosition.x;
        const dy = -starship.relativePosition.y;
        const distanza2 = dx*dx + dy*dy;
        const distanza = Math.sqrt(distanza2);
        this.ricalcolaGravità(starship,TargetMass,dx,dy,distanza2,distanza,targetA,targetE,TargetCenter,TargetEpochAnomaly,BaseMass,deltaTime);
        if(starship.EnginesOnline) this.ricalcolaSpinta(starship);
        if(targetAtmosphere) this.ricalcolaDrag(starship,targetAtmosphere,deltaTime,distanza-targetRadius);
        this.calcolaAccellerazioneCoriolis(starship,targetA,BaseMass,targetE,TargetCenter,TargetEpochAnomaly,deltaTime);
        starship.angle += (starship.angularVelocity) * deltaTime;
        starship.altitudineRelativa = distanza - targetRadius;
    }
    aggiornaFisica(starship,deltaTime,clone){
        if(!starship) return;
        let baseCoordinates = {x:0,y:0}
        let TargetMass  = 0;
        let HillRadius = 0;
        let targetA = 0;
        let targetPlanetName;
        let targetE= 0;
        let TargetEpochAnomaly = 0;
        let targetRadius = 0;
        let TargetCenter = {x:0,y:0};
        let BaseMass = 0;
        let targetDistance = -1;
        let targetAtmosphere = null;
        if(starship){
            starship.acceleration = new Vettore(0, 0,{x:0,y:0})
            var find = false;
            for (const planet of globalGameData.Star.planets){
                if(planet.name === starship.relatedObject){
                    baseCoordinates = planet.position;
                    HillRadius = planet.influenceAreaRadius;
                    TargetMass = planet.mass;
                    targetRadius = planet.radius;
                    targetA = planet.a;
                    targetE = planet.e;
                    TargetEpochAnomaly = planet.epochAnomaly;
                    find = true;
                    targetPlanetName = planet.name;
                    TargetCenter = globalGameData.Star.position;
                    BaseMass = globalGameData.Star.mass;
                    targetAtmosphere =planet.atmosphere;
                    if(Math.sqrt(globalGameData.Starship.relativePosition.x**2+globalGameData.Starship.relativePosition.y**2)<planet.radius+planet.atmosphere.maxAltitude){
                        targetDistance = Math.sqrt(planet.position.x**2+planet.position.y**2);
                    }
                }else if(planet.moons){
                    for (const moon of planet.moons){
                        if(moon.name === starship.relatedObject){
                            baseCoordinates = moon.position;
                            find = true;
                            TargetMass = moon.mass;
                            HillRadius = moon.influenceAreaRadius;
                            targetRadius = moon.radius;
                            TargetEpochAnomaly = moon.epochAnomaly;
                            targetA = moon.a;
                            targetE = moon.e;
                            targetPlanetName = moon.name;
                            TargetCenter = planet.position;
                            BaseMass = planet.mass;
                            targetAtmosphere =moon.atmosphere;
                            if(Math.sqrt(globalGameData.Starship.relativePosition.x**2+globalGameData.Starship.relativePosition.y**2)<moon.radius+moon.atmosphere.maxAltitude){
                                targetDistance = Math.sqrt(planet.position.x**2+planet.position.y**2);
                            }
                        }
                    }
                }
            }
            if(!find){
                if(starship.relatedObject == "Interstellar Space"){
                    baseCoordinates = { x: 0, y: 0 };
                    targetRadius = 0;
                     starship.ferma=false;
                }else{
                    baseCoordinates = globalGameData.Star.position;
                    HillRadius = globalGameData.Star.influenceAreaRadius;
                    TargetMass = globalGameData.Star.mass;
                    targetRadius = globalGameData.Star.radius;
                    starship.ferma=false;
                }
                if(targetDistance<0) targetDistance = Math.sqrt(globalGameData.Starship.position.x**2+globalGameData.Starship.position.y**2);
            }
        }
        starship.angularVelocity = 0;
        const dx = -starship.relativePosition.x;
        const dy = -starship.relativePosition.y;
        const distanza2 = dx*dx + dy*dy;
        const distanza = Math.sqrt(distanza2);
        this.ricalcolaTermodinamiche(starship,deltaTime,targetAtmosphere,distanza-targetRadius,TargetMass,targetRadius,targetDistance);
        this.ricalcolaAperturaParacadute(starship,targetAtmosphere,deltaTime);
        if(!starship.ferma&&starship.EnginesOnline) this.ricalcolaConsumoCarburante(starship,deltaTime,targetAtmosphere, TargetMass, targetRadius, targetDistance);
        if(!starship.ferma) this.ricalcolaAccellerazione(starship,deltaTime,TargetMass,targetRadius,targetAtmosphere,targetA,targetE,TargetCenter,TargetEpochAnomaly,BaseMass);
        const a0 = starship.acceleration.clone();
        if(!starship.ferma){
            starship.relativePosition.x += starship.velocity.x * deltaTime+ 0.5 * a0.x * deltaTime * deltaTime;
            starship.relativePosition.y += starship.velocity.y * deltaTime + 0.5 * a0.y * deltaTime * deltaTime;
        }
        if(!starship.ferma) this.ricalcolaAccellerazione(starship,deltaTime,TargetMass,targetRadius,targetAtmosphere,targetA,targetE,TargetCenter,TargetEpochAnomaly,BaseMass);
        const a1 = starship.acceleration.clone();
        starship.velocity.x += 0.5 * (a0.x + a1.x) * deltaTime;
        starship.velocity.y += 0.5 * (a0.y + a1.y) * deltaTime;
        const v = starship.velocity.modulo();
        if (v >= 0.99999999999999999 * c) {
            starship.velocity = starship.velocity.scale(0.99999999999999999 * c / v);
        }
        if(starship.altitudineRelativa<0){
            const cdx = starship.relativePosition.x;
            const cdy = starship.relativePosition.y;
            const distance = Math.sqrt(cdx * cdx + cdy * cdy);
            if (distance <= targetRadius) {
                const nx = cdx / distance;
                const ny = cdy / distance;
                starship.relativePosition.x = nx * targetRadius;
                starship.relativePosition.y = ny * targetRadius;
                starship.altitudineRelativa = 0;
                starship.ferma = true;
                const dx = -starship.relativePosition.x;
                const dy = -starship.relativePosition.y;
                const distanza2 = dx*dx + dy*dy;
                const distanza = Math.sqrt(distanza2);
                if(distanza2 > 1e-12 && isFinite(distanza2)){
                    const gravity = G * TargetMass / distanza2;
                    const impactAngle = starship.angle;
                    const angleFactor = Math.abs(Math.cos(impactAngle)); 
                    const maxSafeVelocity = 10 + gravity;
                    const criticalVelocity = maxSafeVelocity / (0.3+ angleFactor);
                    if(starship.velocity.modulo() > criticalVelocity){
                        if(starship.name != "clone"){
                            const deadSpeed =starship.velocity.modulo();
                            globalGameData.Starship = null;
                            alert(`MISSION FAILED! Your starship crashed on the surface of ${targetPlanetName} at a velocity of ${deadSpeed} m/s.`);
                        }
                        starship = null;

                    }
                    if(starship&&starship.name!="clone"){
                        const stadio = starship.Stages[starship.actualStage];
                        if(stadio&&stadio.parachute&&stadio.parachute.openingPercent >=100){
                            const parMass = ((stadio.parachute.numParachutes * stadio.parachute.areaParachute) * (paraMaterialsMap[stadio.parachute.parachuteMaterial]?.m ?? 0))*(parastructureMap[stadio.parachute.parachuteGeometry]?.a ?? 0);
                            stadio.mass-= parMass;
                            starship.mass-= parMass;
                            stadio.parachute = null;
                            document.getElementById("ParachuteButton").textContent = " ";
                            document.getElementById("ParachuteButton").classList.add("NoClickButton");
                        }
                    }
                }
                if(starship){
                    starship.velocity.x = 0;
                    starship.velocity.y = 0;
                }
            }
        }
        if(starship&&!starship.ferma&&starship.name != "clone"){
            for(const stage of Object.values(starship.Stages)){
                const deadSpeed =starship.acceleration.modulo();
                if(stage.surface.GLimit < starship.acceleration.modulo()/9.81){
                    globalGameData.Starship = null;
                    alert(`MISSION FAILED! Your starship destroyed due to an enormous G-Force exceding structural resistance. Actual G-Force: ${deadSpeed/9.81}`);
                    starship = null;
                    break;
                }else{
                    if(stage.parachute!=null&&stage.parachute.surface.GLimit < starship.acceleration.modulo()/9.81){
                        stage.parachute = null;
                        alert(`WARNING! Parachute destroyed due to an enormous G-Force exceding structural resistance. Actual G-Force: ${deadSpeed/9.81}`);
                    }
                    if(stage.heatShield!=null&&stage.heatShield.surface.GLimit < starship.acceleration.modulo()/9.81){
                        stage.parachute = null;
                        alert(`WARNING! Heat Shield destroyed due to an enormous G-Force exceding structural resistance. Actual G-Force: ${deadSpeed/9.81}`);
                    }
                    if(stage.Engine!=null&&stage.Engine.surface.GLimit < starship.acceleration.modulo()/9.81){
                        stage.Engine = null;
                        alert(`WARNING! Engine destroyed due to an enormous G-Force exceding structural resistance. Actual G-Force: ${deadSpeed/9.81}`);
                    }
                }
            }
        }
        if(starship){
            const absolutePositionfinal = {
                x: baseCoordinates.x + starship.relativePosition.x,
                y: baseCoordinates.y + starship.relativePosition.y
            };
            starship.position = absolutePositionfinal;
        }
        if(!clone) this.ricalcolaBottoni(starship,starship?.altitudineRelativa??0,targetRadius,targetAtmosphere);
    }
    simulateAtmosphericColumn(composition, massPlanet,radiusPlanet,T_final,P_surface,altitudeStart = 0,altitudeEnd,step,baseDensity) {
        function calcolaMassaMolareMedia2(composition) {
            let sum = 0;
            for (const gas in composition) {
                const mw = gasThermalMap[gas].molarMass;
                sum += (composition[gas] * mw);
            }
            return sum / 100 / 1000; 
        }
        function calcolaCpMedia2(composition) {
            let sum = 0;
            let totalPct = 0;
            for (const gas in composition) {
                const cp = gasThermalMap[gas].specificHeat;
                const pct = composition[gas];
                sum += cp * pct;
                totalPct += pct;
            }
            return sum / totalPct;
        }
        function calcolaUmiditàAtmosferica(composition) {
            let total = 0;
            for (const gas in composition) {
                const humFactor = gasThermalMap[gas].humidity || 0;
                const pct = composition[gas];
                total += humFactor * (pct / 100);
            }
            return total; 
        }
        const g  = (G * massPlanet) / Math.pow(radiusPlanet, 2);
        const μ  = calcolaMassaMolareMedia2(composition);
        const cp = calcolaCpMedia2(composition); 
        const lapseRateDry = g / cp; 
        const humidityFactor= calcolaUmiditàAtmosferica(composition);
        const lapseRate = lapseRateDry * (1 - 26.6 * humidityFactor);
        const results = [];
        let P_prev = P_surface;  
        let T_prev = T_final;
        for (let z = altitudeStart; z <= altitudeEnd; z += step) {
            const epsilon = 2.725;
            const delta   = T_prev - epsilon;
            const attenuatedLapse = lapseRate * Math.tanh(delta / 25);
            let T_z = T_prev - attenuatedLapse * step;
            if (T_z < epsilon) T_z = epsilon;
            const rho_prev = (P_prev * μ) / (R * T_prev);
            results.push({ altitude:z,T: T_z});
            T_prev = T_z;
        }
        return results;
    }
    computePlanetaryTemperature(composition, luminosity, distance, albedo = 0.3,density_atm = 1.04125e4,molecularWeight = null, scaleHeight = null,massPlanet, radiusPlanet,baseDensity,maxAltitude,pressure,relativeAltitude) {
        const T_eq = Math.pow(((1 - albedo) * luminosity) / (16 * Math.PI * S * Math.pow(distance, 2)),0.25);
        let f_GH = 0;
        const M_0 = baseDensity*scaleHeight;
        if(density_atm<=0) return 2.725;
        let radiativeWm2 = 0;
        const density_atm_2 = density_atm * scaleHeight;
        const ratioMass = density_atm_2 / M_0;
        const M_eff = ratioMass / (1 + ratioMass);
        for (const gas in composition) {
            const props = gasThermalMap[gas];
            if (!props) continue;
            const value = composition[gas];
            radiativeWm2 += (props.radiativeForce * value/100)*M_eff;
            const scaled = Math.log1p(value);
            f_GH += props.greenhouse * scaled;
        }
        const T_radiative = T_eq + (radiativeWm2 / (4 * S)) ** 0.25 - T_eq;
        const greenhouseTerm = 1 + D * f_GH * M_eff;
        const T_final = T_eq * Math.pow(greenhouseTerm, 0.25) + T_radiative;
        const testResult = this.simulateAtmosphericColumn(composition,massPlanet,radiusPlanet,T_final,pressure,0,maxAltitude,1,density_atm);
        let bestMatch = testResult[0];
        let minDiff = Math.abs(testResult[0].altitude - relativeAltitude);
        for (const entry of testResult) {
            const diff = Math.abs(entry.altitude -  relativeAltitude);
            if (diff < minDiff) {
                bestMatch = entry;
                minDiff = diff;
            }
        }
        const tempBase = bestMatch.T;
        const b = tempBase;
        return tempBase;
    }   
    ricalcolaBottoni(starship,altitude,targetRadius,targetAtmosphere){
        if(starship!=null){
            const par =globalGameData.Starship?.Stages[globalGameData.Starship.actualStage].parachute??null; 
            if(starship.name!="clone"&&par!=null){
                if(!isFinite(starship.velocity.modulo())||starship.velocity.modulo()>par.maxShipSpeed){
                    document.getElementById("ParachuteButton").textContent = `Impossible to deploy parchute at ${starship.velocity.modulo()} m/s`;
                    document.getElementById("ParachuteButton").classList.add("NoClickButton");
                    document.getElementById("ParachuteButton").classList.add("reduceSizeBtn");
                    document.getElementById("ParachuteButton").style.fontSize = "5px";
                }else if(targetAtmosphere==null||starship.altitudineRelativa>targetAtmosphere.maxAltitude||targetAtmosphere.density<=1e-5){
                    document.getElementById("ParachuteButton").textContent = `Impossible to deploy parchute in space`;
                    document.getElementById("ParachuteButton").classList.add("NoClickButton");
                    document.getElementById("ParachuteButton").classList.add("reduceSizeBtn");
                    document.getElementById("ParachuteButton").style.fontSize = "5px";
                } else if(starship.altitudineRelativa > par.maxDeployAltitude){
                    document.getElementById("ParachuteButton").textContent = `Impossible to deploy parchute at ${starship.altitudineRelativa/1000} Km altitude`;
                    document.getElementById("ParachuteButton").classList.add("NoClickButton");
                    document.getElementById("ParachuteButton").classList.add("reduceSizeBtn");
                    document.getElementById("ParachuteButton").style.fontSize = "5px";
                } else if(par.cut){
                    document.getElementById("ParachuteButton").textContent = " ";
                    document.getElementById("ParachuteButton").classList.add("NoClickButton");
                    document.getElementById("ParachuteButton").classList.remove("reduceSizeBtn");
                    document.getElementById("ParachuteButton").style.fontSize = "10px";
                } else{
                    if(par.openingPercent>=100){
                        document.getElementById("ParachuteButton").textContent = `Cut Parchute`;
                        document.getElementById("ParachuteButton").classList.remove("NoClickButton");
                    }else{
                        document.getElementById("ParachuteButton").textContent = `Deploy Parachute`;
                        document.getElementById("ParachuteButton").classList.remove("NoClickButton");
                    }
                    document.getElementById("ParachuteButton").style.fontSize = "10px";
                    document.getElementById("ParachuteButton").classList.remove("reduceSizeBtn");
                }
            }
            if(starship.name!="clone"&&globalGameData.Starship!=null){
                const engine =globalGameData.Starship.Stages[globalGameData.Starship.actualStage]?.Engine??null; 
                const carb = globalGameData.Starship.Stages[globalGameData.Starship.actualStage]?.quantitaCarburante??0;
                if(engine&&carb>0){
                    document.getElementById("toggleEngines").classList.remove("NoClickButton");
                    document.getElementById("LeftEngines").classList.remove("NoClickButton");
                    document.getElementById("RightEngines").classList.remove("NoClickButton");
                    document.getElementById("LeftEngines").textContent = "◄";
                    document.getElementById("RightEngines").textContent = "►";
                    if(globalGameData.Starship.EnginesOnline){
                        document.getElementById("toggleEngines").textContent = "Deactivate Engines";
                    }else{
                       document.getElementById("toggleEngines").textContent = "Activate Engines";
                    }
                }else{
                    document.getElementById("toggleEngines").textContent = " ";
                    document.getElementById("toggleEngines").classList.add("NoClickButton");
                    document.getElementById("LeftEngines").textContent = " ";
                    document.getElementById("LeftEngines").classList.add("NoClickButton");
                    document.getElementById("RightEngines").textContent = " ";
                    document.getElementById("RightEngines").classList.add("NoClickButton");
                    document.getElementById("ParachuteButton").style.fontSize = "10px";
                    document.getElementById("ParachuteButton").classList.remove("reduceSizeBtn");
                    document.getElementById("thrustValue").textContent = 0;
                }
            }
            if(globalGameData.Starship&&altitude<targetRadius*5){
                if(globalGameData.chronometer.speed>3&&!globalGameData.Starship.ferma){ 
                    const slider = document.getElementById("speedSlider");
                    let value = parseFloat(slider.value);
                    value = 3;
                    document.getElementById("speedSlider").max = 3;
                    globalGameData.chronometer.speed = 3; 
                    document.getElementById("speedValue").textContent = value.toFixed(1);
                }
            }else{
                document.getElementById("speedSlider").max = 250;
            }
            if(starship.name!="clone"){
                if(starship.actualStage<Math.max(...Object.keys(starship.Stages).map(Number))){
                    document.getElementById("StageSeparator").textContent = `Separate Stage ${starship.actualStage}`;
                    document.getElementById("StageSeparator").classList.remove("NoClickButton");
                }
            }
        }else{
            document.getElementById("ParachuteButton").textContent = " ";
            document.getElementById("ParachuteButton").classList.add("NoClickButton");
            document.getElementById("StageSeparator").textContent = " ";
            document.getElementById("StageSeparator").classList.add("NoClickButton");
            document.getElementById("toggleEngines").textContent = " ";
            document.getElementById("toggleEngines").classList.add("NoClickButton");
            document.getElementById("LeftEngines").textContent = " ";
            document.getElementById("LeftEngines").classList.add("NoClickButton");
            document.getElementById("RightEngines").textContent = " ";
            document.getElementById("RightEngines").classList.add("NoClickButton");
            document.getElementById("ParachuteButton").classList.remove("reduceSizeBtn");
            document.getElementById("ParachuteButton").style.fontSize = "10px";
            document.getElementById("speedSlider").max = 250;
        }
    }
    interpolazioneCatmullRom(p0, p1, p2, p3, t) {
        const t2 = t * t;
        const t3 = t2 * t;
        return {
            x: 0.5 * ((2 * p1.x) +
                (-p0.x + p2.x) * t +
                (2*p0.x - 5*p1.x + 4*p2.x - p3.x) * t2 +
                (-p0.x + 3*p1.x - 3*p2.x + p3.x) * t3),
            y: 0.5 * ((2 * p1.y) +
                (-p0.y + p2.y) * t +
                (2*p0.y - 5*p1.y + 4*p2.y - p3.y) * t2 +
                (-p0.y + 3*p1.y - 3*p2.y + p3.y) * t3)
        };
    }
    generaSpline(trajectory, targetPoints = 3000) {
        if (trajectory.length < 4) return trajectory;
        const spline = [];
        const segments = trajectory.length - 3;
        const pointsPerSegment = Math.floor(targetPoints / segments);
        for (let i = 0; i < segments; i++) {
            const p0 = trajectory[i];
            const p1 = trajectory[i + 1];
            const p2 = trajectory[i + 2];
            const p3 = trajectory[i + 3];
            for (let j = 0; j < pointsPerSegment; j++) {
                const t = j / pointsPerSegment;
                const interpolato = this.interpolazioneCatmullRom(p0, p1, p2, p3, t);
                spline.push(interpolato);
            }
        }
        spline.push(trajectory[trajectory.length - 2]);
        return spline;
    }
    disegnaTraiettorie() {
        if(globalGameData.Starship){
            const ctx = this.ctx
            const CloneStarship = globalGameData.Starship.clone()
            let targetRadius = 0;
            let TargetPlanetCoord = {x:0,y:0};
            CloneStarship.EnginesOnline = false;
            const trajectory = [];
            let steps = 3000/Math.min(50,Math.max(1,globalGameData.chronometer.speed));
            const deltaTime = 5*globalGameData.chronometer.speed;
            trajectory.push({ x: CloneStarship.position.x, y: CloneStarship.position.y });
            trajectory.push({ x: CloneStarship.position.x, y: CloneStarship.position.y });
            for (let i = 0; i < steps; i++) {
                for (const planet of globalGameData.Star.planets){
                    if(planet.name === CloneStarship.relatedObject){
                        TargetPlanetCoord = planet.position;
                        targetRadius = planet.radius;
                    }else if(planet.moons){
                        for (const moon of planet.moons){
                            if(moon.name === CloneStarship.relatedObject){
                                TargetPlanetCoord = moon.position;
                                targetRadius = moon.radius;
                            }
                        }
                    }
                }
                this.aggiornaFisica(CloneStarship, deltaTime,true);
                trajectory.push({ x: CloneStarship.position.x, y: CloneStarship.position.y });
                if (!isFinite(CloneStarship.position.x) || !isFinite(CloneStarship.velocity.x)) break;
                const distanzaDalCentro = Math.hypot(CloneStarship.position.x - TargetPlanetCoord.x, CloneStarship.position.y - TargetPlanetCoord.y);
                if (distanzaDalCentro <= targetRadius) break;
            }
            const trajectorySmooth = this.generaSpline(trajectory, 4000);
            ctx.beginPath();
            const traj0 = this.worldToScreen(trajectorySmooth[0]);
            ctx.moveTo(traj0.x, traj0.y);
            for (let point of trajectorySmooth) {
                const pointScreen = this.worldToScreen(point);
                ctx.lineTo(pointScreen.x, pointScreen.y);
            }
            ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
            ctx.lineWidth = 2.5;
            ctx.stroke();
            ctx.lineWidth = 2;
        }
    }
    disegnaAstronavi(){
        const ctx = this.ctx
        let baseCoordinates = {x:0,y:0}
        if(globalGameData.Starship){
            for (let planet of globalGameData.Star.planets){
                if(planet.name == globalGameData.Starship.relatedObject){
                    baseCoordinates = planet.position;
                }else if(planet.moons){
                    for (const moon of planet.moons){
                        if(moon.name == globalGameData.Starship.relatedObject){
                            baseCoordinates = moon.position;
                        }
                    }
                }
            }
            const screen = this.worldToScreen(globalGameData.Starship.position);
            ctx.save();
            ctx.translate(screen.x, screen.y);
            ctx.rotate(globalGameData.Starship.angle- (Math.PI+(Math.PI/2)));
            ctx.beginPath();
            ctx.moveTo(0, -10);
            ctx.lineTo(-7, 7);
            ctx.lineTo(7, 7);
            ctx.closePath();
            ctx.fillStyle = "#888";
            ctx.fill();
            ctx.restore();
        }
    }
    solveKepler(M, e, tol = 1e-6) {
        let E = e < 0.8 ? M : Math.PI;
        let delta, maxIter = 100, iter = 0;
        do {
            delta = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
            E -= delta;
        } while (Math.abs(delta) > tol && ++iter < maxIter);
        return E;  
    }
    calcolaAnomaliaVeraConRelativitaGenerale(a, e, t, M0 = 0,centralMass,planet,deltaTime,update = true) {
        const n = Math.sqrt(G * centralMass / Math.pow(a, 3));
        const M = (M0 + n * t) % (2 * Math.PI);
        const E = this.solveKepler(M, e);
        const theta = 2 * Math.atan2(
                Math.sqrt(1 + e) * Math.sin(E / 2),
                Math.sqrt(1 - e) * Math.cos(E / 2));
        let epsilon = (G * centralMass) / (a * c * c);
        if (epsilon > 0.1) epsilon =  0.1;
        let deltaPhi = (6 * Math.PI * G * centralMass) / (a * (1 - e * e) * c * c);
        epsilon /=100;
        const r = a * (1 - e * e) / (1 + e * Math.cos(theta));
        const period = 2 * Math.PI / n;
        let omega = deltaPhi / period;
        let v = r * omega;
        if (v >= c) {
            v = 0.9999 * c;
            omega = v / r;
            deltaPhi = omega * period;
        }
        const beta = Math.min(v / c, 0.9999);
        const gamma = 1 / Math.sqrt(1 - beta * beta);
        let thetaRel = ((theta) + (deltaPhi/gamma) * (t / (2 * Math.PI / n))) % (2 * Math.PI);
        if(update&&globalGameData.chronometer.speed!=0&&isFinite(globalGameData.chronometer.gamma)&&!isNaN(globalGameData.chronometer.gamma)){
            planet.a = a * (1 - 1.5 * epsilon); 
            planet.e = e * (1 - epsilon);
            planet.meanSpeed = Math.sqrt(G * centralMass / Math.pow(planet.a, 3));
            const EventHorizonRadius = (2 * G * centralMass) / (c * c);
            const distanceToCenter = Math.sqrt(planet.position.x*planet.position.x+planet.position.y*planet.position.y);
            if ((distanceToCenter <= EventHorizonRadius) && distanceToCenter != 0) {
                for (let i = 0; i < globalGameData.Star.planets.length; i++) {
                    if (globalGameData.Star.planets[i].name === planet.name) {
                        globalGameData.Star.planets.splice(i, 1);
                        console.log(`🕳️ ${planet.name} è stato assorbito dal buco nero.`);
                        break;
                    }
                }
            }           
        }
        return thetaRel = (2 * Math.PI - thetaRel) % (2 * Math.PI);;      
    }
    RicalcolaCoordinateSistemaSolare(deltaTime){
        if(globalGameData.Star){
            const { a, e} = globalGameData.Star;
            const b = a * Math.sqrt(1 - e * e);
            const c = a * e;
            const xEll = a * Math.cos(globalGameData.Star.angle);
            const yEll = b * Math.sin(globalGameData.Star.angle);
            const x = xEll - c;
            const y = yEll;
            globalGameData.Star.position = { x, y };
        }else return
        const sunMass = globalGameData.Star.mass;
        for (let planet of globalGameData.Star.planets) {
            const { a, e } = planet;
            const b = a * Math.sqrt(1 - e * e);
            const c = a * e;
            const anomaly = this.calcolaAnomaliaVeraConRelativitaGenerale(a,e,globalGameData.chronometer.time,planet.epochAnomaly,sunMass,planet,deltaTime);
            planet.angle = (anomaly) % (2 * Math.PI);
            const cosI = Math.cos(planet.inclination);
            const sinI = Math.sin(planet.inclination);
            let xRot = 0;
            let yRot = 0;
            if(planet.e<1){
                const xEll = a * Math.cos(planet.angle);
                const yEll = b * Math.sin(planet.angle);
                const x = xEll - c;
                const y = yEll;
                xRot = x * cosI - y * sinI;
                yRot = x * sinI + y * cosI;
                planet.position = { x: xRot, y: yRot };
            }
            const r = a * (1 - e * e) / (1 + e * Math.cos(anomaly));
            let PSpeed = Math.sqrt(G * sunMass * (2 / r - 1 / a));
            if(PSpeed > c*0.9999) PSpeed = c*0.9999
            const PlanetGamma =  1 / Math.sqrt(1 - Math.pow(PSpeed / c, 2));
            const PlanetRelativisticMass = planet.mass * PlanetGamma;
            const influenceAreaRadius = planet.a * Math.pow((PlanetRelativisticMass/ sunMass), 2 / 5);
            planet.influenceAreaRadius = influenceAreaRadius;
            const mu = PlanetRelativisticMass/ (3 * sunMass);
            const mu13 = Math.pow(mu, 1 / 3);
            const L1 = r * (1 - mu13);
            const L2 = r * (1 + mu13);
            const L3 = r * (1 + (5 * PlanetRelativisticMass) / (12 * sunMass));
            const cddx = planet.position.x - globalGameData.Star.position.x;
            const cddy = planet.position.y - globalGameData.Star.position.y;
            const cddist = Math.sqrt(cddx * cddx + cddy * cddy);
            const LaDx = cddx / cddist;
            const LaDy = cddy / cddist;
            planet.LagrangePoints.L1 = {x: globalGameData.Star.position.x + L1 * LaDx,
                                        y: globalGameData.Star.position.y + L1 * LaDy}
            planet.LagrangePoints.L2 = {x: globalGameData.Star.position.x + L2 * LaDx,
                                        y: globalGameData.Star.position.y + L2 * LaDy}
            planet.LagrangePoints.L3 = {x: globalGameData.Star.position.x - L3 * LaDx,
                                        y: globalGameData.Star.position.y - L3 * LaDy}
            planet.LagrangePoints.L4 = {x: planet.position.x + r * Math.cos(anomaly + Math.PI / 3),
                                        y: planet.position.y + r * Math.sin(anomaly + Math.PI / 3)}
            planet.LagrangePoints.L5 = {x: planet.position.x + r * Math.cos(anomaly - Math.PI / 3),
                                        y: planet.position.y + r * Math.sin(anomaly - Math.PI / 3)}
            if (planet.moons) {
                for (const moon of planet.moons) {
                    const ma = moon.a ?? 20;
                    const me = moon.e ?? 0.01;
                    const mb = ma * Math.sqrt(1 - me * me);
                    const mc = ma * me;
                    const MoonAnomaly = this.calcolaAnomaliaVeraConRelativitaGenerale(ma,me,globalGameData.chronometer.time,moon.epochAnomaly,planet.mass,moon,deltaTime);
                    moon.angle = (MoonAnomaly) % (2 * Math.PI);
                    const mxEll = ma * Math.cos(moon.angle);
                    const myEll = mb * Math.sin(moon.angle);
                    const mxOffset = mxEll - mc;
                    const myOffset = myEll;
                    const cosMi = Math.cos(moon.inclination ?? 0);
                    const sinMi = Math.sin(moon.inclination ?? 0);
                    const mxRot = mxOffset * cosMi - myOffset * sinMi;
                    const myRot = mxOffset * sinMi + myOffset * cosMi;
                    const mx = xRot + mxRot;
                    const my = yRot + myRot;
                    moon.position = { x: mx, y: my };
                    const mr = ma * (1 - me * me) / (1 + me * Math.cos(MoonAnomaly));
                    const MSpeed = Math.sqrt(G * PlanetRelativisticMass * (2 / mr - 1 / ma));
                    const MoonGamma =  1 / Math.sqrt(1 - Math.pow(MSpeed / c, 2));
                    const relativisticMoonMass = moon.mass * MoonGamma;
                    const moonInfluenceRadius = moon.a * Math.pow((relativisticMoonMass / planet.mass), 2 / 5);
                    moon.influenceAreaRadius = moonInfluenceRadius;
                    const Mmu = relativisticMoonMass/ (3 * PlanetRelativisticMass);
                    const mmu13 = Math.pow(Mmu, 1 / 3);
                    const ML1 = mr * (1 - mmu13);
                    const ML2 = mr * (1 + mmu13);
                    const ML3 = mr * (1 + (5 * relativisticMoonMass) / (12 * PlanetRelativisticMass));
                    const Mcddx = moon.position.x - planet.position.x;
                    const Mcddy = moon.position.y - planet.position.y;
                    const Mcddist = Math.sqrt(Mcddx * Mcddx + Mcddy * Mcddy);
                    const MLaDx = Mcddx / Mcddist;
                    const MLaDy = Mcddy / Mcddist;
                    moon.LagrangePoints.L1 =    {x: planet.position.x + ML1 * MLaDx,
                                                y: planet.position.y + ML1 * MLaDy}
                    moon.LagrangePoints.L2 =    {x: planet.position.x + ML2 * MLaDx,
                                                y: planet.position.y + ML2 * MLaDy}
                    moon.LagrangePoints.L3 =    {x: planet.position.x - ML3 * MLaDx,
                                                y: planet.position.y - ML3 * MLaDy}
                    moon.LagrangePoints.L4 =    {x: moon.position.x + mr * Math.cos(MoonAnomaly + Math.PI / 3),
                                                y: moon.position.y + mr * Math.sin(MoonAnomaly + Math.PI / 3)}
                    moon.LagrangePoints.L5 =    {x: moon.position.x + mr * Math.cos(MoonAnomaly - Math.PI / 3),
                                                y: moon.position.y + mr * Math.sin(MoonAnomaly - Math.PI / 3)}
                }
            }
        }
        for (let planet of globalGameData.Star.planets) {
            const dx = planet.position.x - globalGameData.Star.position.x;
            const dy = planet.position.y - globalGameData.Star.position.y;
            const r = Math.sqrt(dx * dx + dy * dy);
            const a = planet.a;
            const mu = G * globalGameData.Star.mass;
            const v = Math.sqrt(mu * (2 / r - 1 / a));
            const vEscape = Math.sqrt(2 * mu / r);
            if (v >= vEscape) {
                const energy = 0.5 * v * v - mu / r;
                const newA = -mu / (2 * energy);
                const hApprox = r * v;
                const newE = Math.sqrt(1 + (2 * energy * hApprox * hApprox) / (mu * mu));
                planet.a = newA;
                planet.e = newE;
            }
            let index = 0;
            if(planet.moons){
                for(let moon of planet.moons){
                    const mdx = moon.position.x - planet.position.x;
                    const mdy = moon.position.y - planet.position.y;
                    const mmr = Math.sqrt(mdx * mdx + mdy * mdy);
                    const mma = moon.a;
                    const mmu = G * planet.mass;
                    const mv = Math.sqrt(mmu * (2 / mmr - 1 / mma));
                    const mvEscape = Math.sqrt(2 * mmu / mmr);
                    if (mv >= mvEscape||mmr>planet.influenceAreaRadius) {
                        const menergy = 0.5 * mv * mv - mmu / mmr;
                        const mhApprox = mmr * mv;
                        moon.a = -mmu / (2 * menergy);
                        moon.e = Math.sqrt(1 + (2 * menergy * mhApprox * mhApprox) / (mmu * mmu));
                        const planetToMoon = new Planet(moon.name,moon.a+planet.a,moon.e+planet.e,moon.radius,moon.color,planet.angle,moon.meanSpeed,moon.mass,moon.inclination,planet.epochAnomaly,[],moon.atmosphere)
                        const anomaly = this.calcolaAnomaliaVeraConRelativitaGenerale(planetToMoon.a,planetToMoon.e,globalGameData.chronometer.time,planetToMoon.epochAnomaly,sunMass,planetToMoon,deltaTime);
                        planetToMoon.angle = (anomaly) % (2 * Math.PI);
                        const cosI = Math.cos(planetToMoon.inclination);
                        const sinI = Math.sin(planetToMoon.inclination);
                        let xRot = 0;
                        let yRot = 0;
                        if(planetToMoon.e<1){
                            const b = a * Math.sqrt(1 - planetToMoon.e * planetToMoon.e);
                            const xEll = a * Math.cos(planetToMoon.angle);
                            const yEll = b * Math.sin(planetToMoon.angle);
                            const x = xEll - c;
                            const y = yEll;
                            xRot = x * cosI - y * sinI;
                            yRot = x * sinI + y * cosI;
                            planetToMoon.position = { x: xRot, y: yRot };
                        }   
                        globalGameData.Star.planets.push(planetToMoon);
                        planet.moons.splice(index,1);   
                    }
                    index+=1;
                }
            }
        }
    }
    disegnaSistemaSolare(deltaTime) {
        function circleCoversCanvas(center, radius, canvas) {
            const w = canvas.width, h = canvas.height;
            const cx = center.x, cy = center.y;
            const r2 = radius * radius;
            const d2_00 = cx*cx + cy*cy; 
            const d2_w0 = (w-cx)*(w-cx) + cy*cy; 
            const d2_0h = cx*cx + (h-cy)*(h-cy); 
            const d2_wh = (w-cx)*(w-cx) + (h-cy)*(h-cy); 
            return r2 >= Math.max(d2_00, d2_w0, d2_0h, d2_wh);
        }
        function DrawLangragePoint(LP,color,size,tesxt,name,index,worldToScreen){
            if(globalGameData.Starship&&globalGameData.Starship.relatedObject == name){
                const LCenter = worldToScreen({ x: LP.x, y: LP.y });
                ctx.beginPath();
                ctx.ellipse(LCenter.x, LCenter.y, size, size, 0, 0, Math.PI * 2);
                ctx.fillStyle= color;
                ctx.fill();
                ctx.save();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.font = "11px sans-serif";
                ctx.fillStyle = "#aaa";
                ctx.textAlign = "center";
                const text = "L"+index+" ("+tesxt+")";
                ctx.fillText(text, LCenter.x, LCenter.y);
                ctx.restore();
            }
        }
        const ctx = this.ctx
        if(globalGameData.Star){
            const screen = this.worldToScreen(globalGameData.Star.position);
            const visualRadius = Math.max(globalGameData.Star.radius * globalGameData.camera.scale, 2);
            const visualhillRadius = Math.max(globalGameData.Star.influenceAreaRadius * globalGameData.camera.scale, 2);
            const visualAtmosphereRadius = Math.max((globalGameData.Star.corona.maxAltitude+globalGameData.Star.radius) * globalGameData.camera.scale, 2);
            ctx.beginPath();
            ctx.arc(screen.x, screen.y, visualAtmosphereRadius, 0, Math.PI * 2);
            ctx.fillStyle = globalGameData.Star.corona.color;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(screen.x, screen.y, visualhillRadius, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255, 230, 0, 0.62)";
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(screen.x, screen.y, visualRadius, 0, Math.PI * 2);
            ctx.fillStyle = globalGameData.Star.color;
            ctx.fill();
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.font = "12px sans-serif";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(globalGameData.Star.name, screen.x, screen.y + visualRadius + 14);
            ctx.restore();
        } else return;
        const sunMass = globalGameData.Star.mass;
        for (let planet of globalGameData.Star.planets) {
            const a = planet.a;
            const e = planet.e;
            const b = a * Math.sqrt(1 - e * e);
            const c = a * e;
            if(e<1){
                const orbitCenter = {
                    x: 0 - c,
                    y: 0
                };
                const cosI = Math.cos(planet.inclination);
                const sinI = Math.sin(planet.inclination);
                const xRot = orbitCenter.x * cosI - orbitCenter.y * sinI;
                const yRot = orbitCenter.x * sinI + orbitCenter.y * cosI;
                const screenCenter = this.worldToScreen({ x: xRot, y: yRot });
                const rx = a * globalGameData.camera.scale;
                const ry = b * globalGameData.camera.scale;
                if(rx<100000&&ry<100000){
                    ctx.beginPath();
                    ctx.ellipse(screenCenter.x, screenCenter.y, rx, ry, planet.inclination, 0, Math.PI * 2);
                    ctx.strokeStyle = "rgba(255,255,255,0.15)";
                    ctx.stroke();
                }else{
                    const rx = a * globalGameData.camera.scale;
                    const ry = b * globalGameData.camera.scale;
                    const screenCenter = this.worldToScreen({ x: xRot, y: yRot });
                    const canvasWidth = ctx.canvas.width;
                    const canvasHeight = ctx.canvas.height;
                    const left = screenCenter.x - rx;
                    const right = screenCenter.x + rx;
                    const top = screenCenter.y - ry;
                    const bottom = screenCenter.y + ry;
                    const isVisible = right >= 0 && left <= canvasWidth &&bottom >= 0 &&top <= canvasHeight;
                    if (isVisible && rx < 2.5e6 && ry <2.5e6) {
                        ctx.beginPath();
                        ctx.ellipse(screenCenter.x, screenCenter.y, rx, ry, planet.inclination, 0, Math.PI * 2);
                        ctx.strokeStyle = "rgba(255,255,255,0.15)";
                        ctx.stroke();
                    }else if(globalGameData.camera.scale<0.005){
                        const anomaly = this.calcolaAnomaliaVeraConRelativitaGenerale(a,e,globalGameData.chronometer.time,planet.epochAnomaly,sunMass,planet,deltaTime);
                        const delta = Math.PI / 50;
                        const startAngle = anomaly - delta;
                        const endAngle = anomaly + delta;
                        ctx.beginPath();
                        ctx.ellipse(screenCenter.x,screenCenter.y,rx, ry,planet.inclination,startAngle,endAngle);
                        ctx.strokeStyle = "rgba(255,255,255,0.25)";
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }
                }
            }
            if(planet.LagrangePoints.L1.x!=undefined&&planet.LagrangePoints.L1.y!=undefined){
                DrawLangragePoint(planet.LagrangePoints.L1,"rgba(255, 0, 0, 0.56)",4,planet.name,planet.name,1,this.worldToScreen);
            }
            if(planet.LagrangePoints.L2.x!=undefined&&planet.LagrangePoints.L2.y!=undefined){
                DrawLangragePoint(planet.LagrangePoints.L2,"rgba(255, 0, 0, 0.56)",4,planet.name,planet.name,2,this.worldToScreen);
            }
            if(planet.LagrangePoints.L3.x!=undefined&&planet.LagrangePoints.L3.y!=undefined){
                DrawLangragePoint(planet.LagrangePoints.L3,"rgba(255, 0, 0, 0.56)",4,planet.name,planet.name,3,this.worldToScreen);
            }
            if(planet.LagrangePoints.L4.x!=undefined&&planet.LagrangePoints.L4.y!=undefined){
                DrawLangragePoint(planet.LagrangePoints.L4,"rgba(0, 255, 102, 0.56)",4,planet.name,planet.name,4,this.worldToScreen);
            }
            if(planet.LagrangePoints.L5.x!=undefined&&planet.LagrangePoints.L5.y!=undefined){
                DrawLangragePoint(planet.LagrangePoints.L5,"rgba(0, 255, 102, 0.56)",4,planet.name,planet.name,5,this.worldToScreen);
            }
        }
        for (let planet of globalGameData.Star.planets) {
            const screen = this.worldToScreen(planet.position);
            const visualRadius = Math.max(planet.radius * globalGameData.camera.scale, 2);
            const visualhillRadius = Math.max(planet.influenceAreaRadius * globalGameData.camera.scale, 2);
            const drawhill = circleCoversCanvas(screen,visualhillRadius,this.canvas)
            let drawn = false;
            if(!drawhill){
                ctx.beginPath();
                ctx.arc(screen.x, screen.y, visualhillRadius, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(0, 255, 0, 0.07)";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(screen.x, screen.y, visualhillRadius, 0, 2 * Math.PI);
                ctx.lineWidth = 2.5;
                ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
                ctx.stroke();
            }else{
                if(!drawn){
                    drawn = true;
                    ctx.beginPath();
                    ctx.arc(screen.x, screen.y, visualRadius, 0, 2 * Math.PI);
                    ctx.fillStyle = "rgba(0, 255, 0, 0.07)";
                    ctx.fill();
                }
            }
            const visualAtmosphereRadius = Math.max((planet.atmosphere.maxAltitude+planet.radius) * globalGameData.camera.scale, 2);
            ctx.beginPath();
            ctx.arc(screen.x, screen.y, visualAtmosphereRadius, 0, Math.PI * 2);
            ctx.fillStyle = planet.atmosphere.color;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(screen.x, screen.y, visualRadius, 0, Math.PI * 2);
            ctx.fillStyle = planet.color;
            ctx.fill();
            if (planet.moons) {
                for (const moon of planet.moons) {
                    const ma = moon.a ?? 20;
                    const me = moon.e ?? 0.01;
                    const mb = ma * Math.sqrt(1 - me * me);
                    const mc = ma * me;
                    const cosMi2 = Math.cos(moon.inclination ?? 0);
                    const sinMi2 = Math.sin(moon.inclination ?? 0);
                    const fx = -mc; 
                    const fy = 0;
                    const fxRot = fx * cosMi2 - fy * sinMi2;
                    const fyRot = fx * sinMi2 + fy * cosMi2;
                    const orbitCenter = this.worldToScreen({
                        x: planet.position.x + fxRot,
                        y: planet.position.y + fyRot
                    });
                    ctx.save();
                    ctx.beginPath();
                    ctx.ellipse(
                        orbitCenter.x,
                        orbitCenter.y,
                        ma * globalGameData.camera.scale,
                        mb * globalGameData.camera.scale,
                        moon.inclination, 0, Math.PI * 2
                    );
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = "rgba(34, 34, 85, 0.62)";
                    ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.restore();
                    const screenMoon = this.worldToScreen(moon.position);
                    const moonRadius = Math.max(moon.radius * globalGameData.camera.scale, 1.5);
                    const visualmoonhillRadius = Math.max(moon.influenceAreaRadius * globalGameData.camera.scale, 2);
                    const drawmhill = circleCoversCanvas(screenMoon,visualmoonhillRadius,this.canvas)
                    let mdrawn = false;
                    if(!drawmhill){
                        ctx.beginPath();
                        ctx.arc(screenMoon.x, screenMoon.y, visualmoonhillRadius, 0, 2 * Math.PI);
                        ctx.fillStyle = "rgba(0, 0, 255, 0.07)";
                        ctx.fill();
                        ctx.beginPath();
                        ctx.arc(screenMoon.x, screenMoon.y, visualmoonhillRadius, 0, 2 * Math.PI);
                        ctx.lineWidth = 2.5;
                        ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
                        ctx.stroke();
                    }else{
                        if(!mdrawn){
                            drawn = true;
                            ctx.beginPath();
                            ctx.arc(screen.x, screen.y, visualRadius, 0, 2 * Math.PI);
                            ctx.fillStyle = "rgba(0, 0, 255, 0.07)";
                            ctx.fill();
                        }
                    }
                    const visualMoonAtmosphereRadius = Math.max((moon.atmosphere.maxAltitude+moon.radius) * globalGameData.camera.scale, 2)
                    ctx.beginPath();
                    ctx.arc(screenMoon.x, screenMoon.y, visualMoonAtmosphereRadius, 0, Math.PI * 2);
                    ctx.fillStyle = moon.atmosphere.color;
                    ctx.fill();
                    ctx.beginPath();
                    ctx.beginPath();
                    ctx.arc(screenMoon.x, screenMoon.y, moonRadius, 0, Math.PI * 2);
                    ctx.fillStyle = moon.color;
                    ctx.fill();
                    if(moon.LagrangePoints.L1.x!=undefined&&moon.LagrangePoints.L1.y!=undefined){
                        DrawLangragePoint(moon.LagrangePoints.L1,"rgba(255, 0, 0, 0.56)",4,moon.name,planet.name,1,this.worldToScreen);
                    }
                    if(moon.LagrangePoints.L2.x!=undefined&&moon.LagrangePoints.L2.y!=undefined){
                        DrawLangragePoint(moon.LagrangePoints.L2,"rgba(255, 0, 0, 0.56)",4,moon.name,planet.name,2,this.worldToScreen);
                    }
                    if(moon.LagrangePoints.L3.x!=undefined&&moon.LagrangePoints.L3.y!=undefined){
                        DrawLangragePoint(moon.LagrangePoints.L3,"rgba(255, 0, 0, 0.56)",4,moon.name,planet.name,3,this.worldToScreen);
                    }
                    if(moon.LagrangePoints.L4.x!=undefined&&moon.LagrangePoints.L4.y!=undefined){
                        DrawLangragePoint(moon.LagrangePoints.L4,"rgba(0, 255, 102, 0.56)",4,moon.name,planet.name,4,this.worldToScreen);
                    }
                    if(moon.LagrangePoints.L5.x!=undefined&&moon.LagrangePoints.L5.y!=undefined){
                        DrawLangragePoint(moon.LagrangePoints.L5,"rgba(0, 255, 102, 0.56)",4,moon.name,planet.name,5,this.worldToScreen);
                    }
                }
            }
        }
        for (const planet of globalGameData.Star.planets) {
            const screen = this.worldToScreen(planet.position);
            const visualRadius = Math.max(planet.radius * globalGameData.camera.scale, 2);
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.font = "12px sans-serif";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(planet.name, screen.x, screen.y + visualRadius + 14);
            ctx.restore();
            if (planet.moons) {
                for (const moon of planet.moons) {
                    const moonScreen = this.worldToScreen(moon.position);
                    const moonRadius = Math.max(moon.radius * globalGameData.camera.scale, 1.5);
                    ctx.save();
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    ctx.font = "10px sans-serif";
                    ctx.fillStyle = "#aaa";
                    ctx.textAlign = "center";
                    ctx.fillText(moon.name, moonScreen.x, moonScreen.y + moonRadius + 10);
                    ctx.restore();
                }
            }
        }
    }
    calcolaVolumeScafo(h, d, s,kind) {
        const rEst = d / 2;
        const spessore = d * (s / 100);
        const rInt = rEst - spessore;
        const volumeEsterno = Math.PI * rEst ** 2 * h;
        const volumeInterno = Math.PI * rInt ** 2 * h;
        const area = hullStructureMap[kind]?.a ?? 1;
        return (volumeEsterno - volumeInterno) * area;
    }
    disegnaInformazioniNavigazione(deltaTime) {
        let targetAtmo = null;
        let targetCentralMass = 0;
        let TargetMass = 0;
        let targetDistance = -1;
        let targetRadius = 0;
        if(globalGameData.Starship){
            for (const planet of globalGameData.Star.planets){
                if(planet.name === globalGameData.Starship.relatedObject){
                    targetAtmo =planet.atmosphere;
                    targetCentralMass =globalGameData.Star.mass;
                    TargetMass = planet.mass;
                    targetRadius = planet.radius;
                    if(Math.sqrt(globalGameData.Starship.relativePosition.x**2+globalGameData.Starship.relativePosition.y**2)<planet.radius+planet.atmosphere.maxAltitude){
                        targetDistance = Math.sqrt(planet.position.x**2+planet.position.y**2);
                    }
                }
                else if(planet.moons){
                    for (const moon of planet.moons){
                        if(moon.name === globalGameData.Starship.relatedObject){
                            targetAtmo =moon.atmosphere;  
                            targetRadius = moon.radius; 
                            TargetMass = moon.mass;
                            targetCentralMass = planet.mass;
                            if(Math.sqrt(globalGameData.Starship.relativePosition.x**2+globalGameData.Starship.relativePosition.y**2)<moon.radius+moon.atmosphere.maxAltitude){
                                targetDistance = Math.sqrt(planet.position.x**2+planet.position.y**2);
                            }
                        }
                    }
                }else{
                    targetRadius = globalGameData.Star.radius; 
                    TargetMass = globalGameData.Star.mass;
                    targetCentralMass =globalGameData.Star.mass;
                    if(targetDistance<0) targetDistance = Math.sqrt(globalGameData.Starship.position.x**2+globalGameData.Starship.position.y**2);
                }
            }
        }
        const ctx = this.ctx
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); 
        ctx.font = "14px monospace";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        const nave = globalGameData.Starship;
        const startX = 20;
        let y = 20;
        const lineHeight = 16;
        const velocita = Math.sqrt((nave?.velocity?.x ??0) ** 2 + (nave?.velocity?.y??0) ** 2);
        const a = nave?.acceleration;
        const acceleration = Math.sqrt((a?.x ?? 0) ** 2 + (a?.y ?? 0) ** 2);
        let angoloGradi = ((globalGameData.Starship?.angle ?? 0) * 180 / Math.PI);
        if(nave == null) angoloGradi = 0;
        else angoloGradi-=270;
        const GiornoFormatted= globalGameData.chronometer.day+" / "
        + globalGameData.chronometer.month + " / " + globalGameData.chronometer.year;
        const OraFormatted = globalGameData.chronometer.hours + " : " +  globalGameData.chronometer.minutes + " : " +
        (globalGameData.chronometer.seconds.toFixed(0))
        const speedSimulated = parseFloat(globalGameData.chronometer.speed) || 1.0;
        const engineSpeedStage  = globalGameData.Starship?.Stages[globalGameData.Starship?.actualStage??-1].Engine?.Thrust?? 0;
        const starshipMass = globalGameData.Starship?.mass?? 0;
        const starFuelStage = globalGameData.Starship?.Stages[globalGameData.Starship?.actualStage??-1].quantitaCarburante?? 0;
        const StarFuelProp  = globalGameData.Starship?.Stages[globalGameData.Starship?.actualStage??-1].tipoCarburante?? 0;
        const starFuel = globalGameData.Starship?.Stages? Object.values(globalGameData.Starship.Stages).reduce((sum, stage) => sum + stage.quantitaCarburante, 0 ): 0;
        const actualStage = globalGameData.Starship?.actualStage ?? 0;
        const actualStageMass = globalGameData.Starship?.Stages[globalGameData.Starship?.actualStage??-1].mass?? 0;
        let maxStage = Math.max(...Object.keys((globalGameData.Starship?.Stages ?? {})).map(Number));
        if(!isFinite(maxStage)) maxStage = 0;
        const parachute = globalGameData.Starship?.Stages[actualStage].parachute;
        const heatShield = globalGameData.Starship?.Stages[actualStage].heatShield;
        const engine = globalGameData.Starship?.Stages[actualStage].Engine;
        const cstage = globalGameData.Starship?.Stages[actualStage];
        const RGiornoFormatted= globalGameData.chronometer.rday+" / "
        + globalGameData.chronometer.rmonth + " / " + globalGameData.chronometer.ryear;
        const ROraFormatted = globalGameData.chronometer.rhours + " : " +  globalGameData.chronometer.rminutes + " : " +
        (globalGameData.chronometer.rseconds.toFixed(0))
        const Lorentz = globalGameData.chronometer.gamma;
        const linesText = [];
        const rightLinesText = [];
        let index = 1;
        function calcolaInquinamentoAtmosferico(composition, rho, P = 101325, T = 288.15) {
            const pollutants = ["CO", "NO", "NO₂", "SO₂", "O₃", "CH₄", "CF₄", "SF₆", "CFC₁₁", "CFC₁₂", "PAN","HCl", "HF", "HCN", "PH₃", "PM2.5", "PM10", "BlackCarbon", "OrganicCarbon", "Smoke", "Dust", "Ash"];
            const toxicThresholds_ppm = {"HCN": 100,"PH₃": 10,"SO₂": 5,"NO₂": 5,"CO": 100,"O₃": 0.1,"PAN": 2, "HCl": 5,"HF": 3,"PM2.5": 50, "BlackCarbon": 30,"Smoke": 60};
            let isToxic = false;
            let greenhouseSum = 0;
            let pollutantMoleFrac = 0;
            let weightedToxicity = 0;
            let details = {};
            for (const [gas, perc] of Object.entries(composition)) {
                const molFrac = perc / 100;
                const mw = gasThermalMap[gas]?.molarMass || 0;
                const gh = gasThermalMap[gas].greenhouse || 0;
                const isPollutant = pollutants.includes(gas);
                const ppm = molFrac * 1_000_000;
                const ug_m3 = (ppm * mw * P) / (R * T); 
                const threshold = toxicThresholds_ppm[gas];
                greenhouseSum += gh * molFrac;
                if (isPollutant) {
                    pollutantMoleFrac += molFrac;
                    weightedToxicity += gh * ppm;
                }
                details[gas] = {ppm: Math.round(ppm), ug_m3: Math.round(ug_m3), greenhouseImpact: gh};
                if (threshold && details[gas].ppm > threshold) isToxic = true;        
            }
            const pollutants_ppm = Math.round(pollutantMoleFrac * 1_000_000);
            const greenhouseLevel = (greenhouseSum * 100).toFixed(2);
            const totalToxicity = Math.round(weightedToxicity);
            const O2_pct = composition["O₂"] || 0;
            const PO2 = P * (O2_pct / 100); 
            const isRespirable = PO2 >= 17000 && O2_pct >= 19.5;
            let airQuality = "Unknown";
            if (!isRespirable||rho<0.3) airQuality = "Lethal";
            else if (isToxic || totalToxicity >= 1000) airQuality = "Toxic";
            else if (pollutants_ppm < 10 && rho > 1.2 && totalToxicity <= 5) airQuality = "Excellent";
            else if (pollutants_ppm < 25 && rho > 1.0 && totalToxicity <= 10) airQuality = "Very Good";
            else if (pollutants_ppm < 50 && rho > 0.9 && totalToxicity <= 15) airQuality = "Good";
            else if (pollutants_ppm < 75 && rho > 0.85 && totalToxicity <= 20) airQuality = "Acceptable";
            else if (pollutants_ppm < 100 && rho > 0.75 && totalToxicity <= 30) airQuality = "Moderate";
            else if (pollutants_ppm < 150 && rho > 0.65 && totalToxicity <= 60) airQuality = "Poor";
            else if (pollutants_ppm < 250 && rho > 0.55 && totalToxicity <= 100) airQuality = "Hazardous";
            else airQuality = "Extremley Hazardous";
            return {airQuality:airQuality,pollutants_ppm:pollutants_ppm};
        }
        linesText.push(`╔════════════════════« NAVIGATION »══════════════════~`) 
        if(globalGameData.Starship){
            linesText.push(`║ Orbiting Around: ${nave?.relatedObject?? " - "}`)
            linesText.push(`║ Relative Altitude: ${((nave?.altitudineRelativa?? 0 )/ 1000)} km`)
            linesText.push(`║ Speed: ${velocita.toFixed(2)} m/s`)
            linesText.push(`║ Accelleration: ${acceleration.toFixed(2)} m/s²`)    
            linesText.push(`║ Rotation: ${angoloGradi.toFixed(2)} °`)
        }else{
            linesText.push(`║`)
            linesText.push(`║`)
            linesText.push(`║`)
        }
        linesText.push(`║ Date: ${GiornoFormatted}`)
        linesText.push(`║ Time: ${OraFormatted}`)
        linesText.push(`║ Simulation Speed: ${speedSimulated.toFixed(2)}`)
        if(!globalGameData.Starship){
            linesText.push(`║`)
            linesText.push(`║`)
        }
        if(starshipMass >0) linesText.push(`║ Starship Total Mass: ${starshipMass.toFixed(2)} Kg`)
        else linesText.push(`║`)
        linesText.push("╚════════════════════════════════════════════════════~")
        const velocityRatio = (globalGameData.Starship?.velocity.modulo()??0) / 299792458;
        const dilationFactor = 1 / Math.sqrt(1 - Math.pow(velocityRatio, 2));
        let epsilon = 0;
        const distance = Math.sqrt((globalGameData.Starship?.relativePosition?.x??0) ** 2 + (globalGameData.Starship?.relativePosition?.y??0) ** 2);
        const redshift = 1 / Math.sqrt(1 - (2 * G * targetCentralMass) / (distance * c ** 2)) - 1
        let gamma =  1 / Math.sqrt(1 - Math.pow((globalGameData.Starship?.velocity?.modulo()??0) / c, 2));
        if(!isFinite(gamma)) gamma = 999999999;
        const massIncrase = (globalGameData.Starship?.mass??0) * gamma;
        if(targetCentralMass!=0) epsilon = (2 * G * targetCentralMass) / (distance * c * c);
        let shipLong = 0;
        if(globalGameData.Starship&&globalGameData.Starship.Stages){
            for(const stage of Object.values(globalGameData.Starship.Stages)){
                shipLong+=stage.surface.height;
                if(stage.Engine) shipLong+=stage.Engine.surface.height;
                if(stage.heatShield) shipLong+=stage.heatShield.surface.height;
                if(stage.parachute) shipLong+=stage.parachute.surface.height;
            }
        }
        const contractedLength = shipLong / gamma;

        linesText.push(`╔══════════════════« RELATIVISTICS »═════════════════~`)
        if(!globalGameData.Starship){
            linesText.push(`║`);
            linesText.push(`║`);
            linesText.push(`║`);
        }
        linesText.push(`║ Relativistic Date: ${RGiornoFormatted}`)
        linesText.push(`║ Relativistic Time: ${ROraFormatted} `)
        linesText.push(`║ Time Dilatation Factor (γₜ): ${dilationFactor}`)
        if(globalGameData.Starship){
            if(globalGameData.Starship.velocity.modulo()<c) linesText.push(`║ Lorentz Factor (γ): ${Lorentz} (${velocityRatio}c)`)
            else linesText.push(`║ Lorentz Factor (γ): ∞ (Relativistic Singularity)`)
            linesText.push(`║ Spacetime Warp Factor (ε): ${epsilon.toFixed(5)}`);               
            if(isFinite(redshift)) linesText.push(`║ Gravitational Redshift (z): ${redshift.toFixed(5)}`);
            else linesText.push(`║ ERROR: Invalid Gravitational Redshift!`);
            if(massIncrase>0&&isFinite(massIncrase)) linesText.push(`║ Starship Relativistic Mass: ${massIncrase.toFixed(5)} Kg`);
            else if(!isFinite(massIncrase)) linesText.push(`║ CRITICAL: Relativistic Singularity detected!`);
            else linesText.push(`║`);
            if(contractedLength>0&&isFinite(contractedLength)) linesText.push(`║ Starship Length Contraction: ${contractedLength.toFixed(5)} m`);
            else if(!isFinite(contractedLength)) linesText.push(`║ CRITICAL: Relativistic Singularity detected!`);
            else linesText.push(`║`);
        }else{
            linesText.push(`║`);
            linesText.push(`║`);
        }
        linesText.push("╚════════════════════════════════════════════════════~")
        linesText.push(`╔══════════════════« STARSHIP DATA »═════════════════~`)
        const starData = actualStageMass>0;
        if(starData) linesText.push(`║ Starship Fuel Quantity: ${starFuel.toFixed(2)} m³`)
        else{
            linesText.push(`║`)
            linesText.push(`║`)
        }
        rightLinesText.push(`~══════════════════════« SENSOR DATA »══════════════════════╗`)
        let temperatura = 2.725;
        if(targetAtmo&&globalGameData.Starship){
            const h = globalGameData.Starship.altitudineRelativa;
            if (targetAtmo && h >= 0&&h < targetAtmo.maxAltitude) {
                let rho = targetAtmo.density * Math.exp(- h/ targetAtmo.scaleHeight);
                const output = calcolaInquinamentoAtmosferico(targetAtmo.composition,rho);
                const Pressione = this.calcolaPressioneAtmosferica(rho, 288.15, targetAtmo.composition);
                const PressioneSup = this.calcolaPressioneAtmosferica(targetAtmo.density, 288.15, targetAtmo.composition);
                let albedo = targetAtmo?.albedo??0.80;
                temperatura = this.computePlanetaryTemperature((targetAtmo.composition),globalGameData.Star.luminosity,targetDistance,albedo,rho,targetAtmo?.molecularWeight??0,targetAtmo?.scaleHeight??0,TargetMass,targetRadius,targetAtmo?.density??0,targetAtmo?.maxAltitude??0,PressioneSup,globalGameData.Starship?.altitudineRelativa??0)
                if(isFinite(Pressione)&&isFinite(temperatura)){
                    rightLinesText.push(`kg/m³; Local temperature: ${(temperatura-273.15).toFixed(4)} °C ║`);    
                    rightLinesText.push(`Actual atmosphere pressure: ${Pressione} mPa ║`);
                    const R = 8.314;
                    const Mw_kgmol = (rho * R * temperatura) / (Pressione);
                    const Mw_dynamic = Mw_kgmol * 1000;
                    let cp_mol = 0;
                    for (const [gas, percentuale] of Object.entries(targetAtmo.composition)) {
                        const cp = gasThermalMap[gas]?.specificHeat ?? 0.01;
                        cp_mol += cp * (percentuale / 100);
                    }
                    const cp_massico = cp_mol * 1000 / Mw_dynamic;
                    rightLinesText.push(`Actual atmosphere molecular weight: ${Mw_dynamic.toFixed(2)} g/mol ║`) 
                    rightLinesText.push(`Actual atmosphere specific heat ${cp_massico.toFixed(2)} J/kg·K ║`);
                }else{
                    rightLinesText.push(`╔═══════════« Atmospheric Monitoring System »═══════════╗║`) 
                    rightLinesText.push(`║ ERROR: Starship Atmospheric Sensor Data Unavalabile!  ║║`) 
                    rightLinesText.push(`║         No sensors detected on your starship!         ║║`) 
                    rightLinesText.push(`╚═══════════════════════════════════════════════════════╝║`)
                }
                rightLinesText.push(`Actual atmosphere composition: ║`);
                let outString = "";
                let offset = 0;
                for (const [key, value] of Object.entries(targetAtmo.composition)) {
                    outString += `${key}: ${value.toFixed(7)} %`;
                    offset+=1;
                    if(offset%4===0){
                        rightLinesText.push(outString+" ║");
                        outString = "";
                    }else outString+=" ";  
                }
                rightLinesText.push(outString+" ║");
                rightLinesText.push(`Air quality: ${output.airQuality}; Pollutants Detected: ${output.pollutants_ppm} ppm  ║`)
                rightLinesText.push(`Actual atmosphere density: ${rho.toFixed(5)}  ║`)
            }
        }else if(globalGameData.Starship){
            rightLinesText.push(`Local temperature: ${2.725-273.15} °C  ║` )
        }else{
            rightLinesText.push(`║`) 
            rightLinesText.push(`║`) 
            rightLinesText.push(`╔═══════════« Atmospheric Monitoring System »═══════════╗║`) 
            rightLinesText.push(`║ ERROR: Starship Atmospheric Sensor Data Unavalabile!  ║║`) 
            rightLinesText.push(`║         No sensors detected on your starship!         ║║`) 
            rightLinesText.push(`╚═══════════════════════════════════════════════════════╝║`)
            rightLinesText.push(`║`) 
            rightLinesText.push(`║`) 
        }
        if(globalGameData.Starship){
            rightLinesText.push(`G-Force: ${globalGameData.Starship.acceleration.modulo()/9.81} G  ║`);
            rightLinesText.push(`Eₖ: ${(globalGameData.Starship.velocity.modulo() > 0 ? 0.5 *globalGameData.Starship.mass * globalGameData.Starship.velocity.modulo() *globalGameData.Starship.velocity.modulo(): 0).toFixed(2)} J  ║`);
            rightLinesText.push(`F: ${(globalGameData.Starship.mass * globalGameData.Starship.acceleration.modulo()).toFixed(2)} N  ║`);
            rightLinesText.push(`p: ${(globalGameData.Starship.mass * globalGameData.Starship.velocity.modulo()).toFixed(2)} kg·m/s  ║`);  
        }
        function calcolaVolumeInterno(h, d, s, kind) {
            const rEst = d / 2;
            const spessoreAssoluto = d * (s / 100);
            const rInt = rEst - spessoreAssoluto;
            const volumeCilindrico = Math.PI * (rInt ** 2) * h;
            const area = hullStructureMap[kind]?.a ?? 1;
            const efficienza = hullStructureMap[kind]?.η ?? 0.90;
            return volumeCilindrico * efficienza * area;
        }
        const EnigeneeringArray = [];
        rightLinesText.push(`~══════════════════════════════════════════════════════════╝`)
        rightLinesText.push(`~═══════════════« Starship Enigeneering »═════════════════╦╗`)
        rightLinesText.push(`╠╣`)
        if(starData){
            linesText.push(`║ Current Stage: ${actualStage} / ${maxStage}`)
            linesText.push(`║ Current Stage Mass: ${actualStageMass.toFixed(2)} Kg`)
        }else linesText.push(`║ ERROR: Starship Systems Unavailable or Non-existent!`)
        if(maxStage!=0){
            let EtermTotale = 0;
            let mCpTotale = 0;
            let maxCp = 1e14;
            let temp = 0;
            let count = 0;
            for(const stage of Object.values(globalGameData.Starship.Stages)){
                EnigeneeringArray.push(`~═══════════════════« Stage ${index+actualStage-1} »════════════════════════╬╣`)
                EnigeneeringArray.push(`║║`);
                const esterno = this.calcolaVolumeScafo(stage.surface.height,stage.surface.diameter,stage.surface.spessorePercentuale,stage.surface.kind);
                if(esterno>0){
                    const volume = calcolaVolumeInterno(stage.surface.height,stage.surface.diameter,stage.surface.spessorePercentuale,stage.surface.kind);                                
                    temp += stage.surface.actualTemperature;                    
                    const matDesc = materialCpMap[stage.surface.material];
                    const strcDesc = hullStructureMap[stage.surface.kind];
                    EnigeneeringArray.push(`Temperature: ${(stage.surface.actualTemperature).toFixed(2)} K (MAX: ${(stage.surface.maxTemperature).toFixed(2)} K) ║║`)
                    EnigeneeringArray.push(`Model: ${(stage.surface.kind)} ║║`)
                    EnigeneeringArray.push(`Material: ${(stage.surface.material)} ║║`) 
                    EnigeneeringArray.push(`Hull Drag Coefficient [ Frontal: ${strcDesc.cd}, Side: ${strcDesc.sideCd} ] ║║`)
                    EnigeneeringArray.push(`Hull Specific Heat Capacity: ${(matDesc.cp*strcDesc.cp)} J/(kg·K)║║`)
                    EnigeneeringArray.push(`Hull Specific Thermal Conducibility: ${(matDesc.k)} W/(m·K) ║║`)
                    EnigeneeringArray.push(`Hull Efficiency: [ Thermal: ${strcDesc.ηt} G-Force: ${strcDesc.ηg} ] ║║`)
                    EnigeneeringArray.push(`Internal Volume: ${volume} m³ ║║`)
                    EnigeneeringArray.push(`Hull Volume: ${esterno} m³ ║║`)
                    EnigeneeringArray.push(`Stage Cargo capacity efficiency: ${(hullStructureMap[stage.surface.kind].η)} η ║║`)
                    EnigeneeringArray.push(`Stage G-Force Limit: ${(stage.surface.GLimit)} G ║║`)
                    EnigeneeringArray.push(`Stage Hull Height: ${(stage.surface.height)} m ║║`); 
                    EnigeneeringArray.push(`Stage Hull Width: ${(stage.surface.diameter)} m ║║`); 
                    EnigeneeringArray.push(`Stage Hull Thickness: ${(stage.surface.spessorePercentuale)}% ║║`)
                    const stressTermico = ((stage.surface.actualTemperature / stage.surface.maxTemperature) * 100).toFixed(1);
                    EnigeneeringArray.push(`Stage Hull Thermal Stress Load: ${stressTermico}% ║║`);
                    const dissipIndex = (matDesc.k * (matDesc.cp) * esterno).toFixed(2);
                    EnigeneeringArray.push(`Stage Hull Thermal Dissipation Index: ${dissipIndex} W/K ║║`);
                    let rawGForce = globalGameData.Starship.acceleration.modulo() / 9.81;
                    let FoS = rawGForce === 0 ? "∞" : (stage.surface.GLimit / rawGForce).toFixed(2);
                    EnigeneeringArray.push(`Stage Hull Safety Factor (G-Load): ${FoS} ║║`);
                    EnigeneeringArray.push(`Stage Hull Surface Emissivity: ${matDesc.ε} ε ║║`);
                    let massReale = stage.mass - (stage.quantitaCarburante*fuelMap[stage.tipoCarburante].density);
                    if(stage.Engine) massReale-=stage.Engine.mass;
                    if(stage.heatShield) massReale-=stage.heatShield.mass;
                    if(stage.parachute) massReale-=stage.parachute.mass;
                    const energiaAssorbibile = (massReale * matDesc.cp).toFixed(2);
                    EnigeneeringArray.push(`Stage Hull Thermal Capacity: ${energiaAssorbibile} J/K ║║`);
                    if(stage.tipoCarburante!=""){
                        EnigeneeringArray.push(`Stage Propellant: ${(stage.tipoCarburante)} (Quantity: ${(stage.quantitaCarburante)}) ║║`)
                        const fuel = fuelMap[stage.tipoCarburante];
                        EnigeneeringArray.push(`Stage Propellant TSFC: ${fuel.tsfc} kg/(kN·h) ║║`);
                        EnigeneeringArray.push(`Stage Propellant Density: ${fuel.density} kg/m³ ║║`);
                        EnigeneeringArray.push(`Stage Propellant Specific Heat: ${fuel.cv} J/kg·K ║║`);
                        EnigeneeringArray.push(`Stage Propellant Class: ${fuel.class } ║║`);
                    }
                    const cp = materialCpMap[stage.surface.material]?.cp ?? 1;
                    EtermTotale += stage.surface.actualTemperature * stage.mass * cp;
                    mCpTotale += stage.mass * cp;
                    if((stage.surface.maxTemperature) < maxCp) maxCp = stage.surface.maxTemperature; 
                    count+=1;   
                }else{
                    EnigeneeringArray.push(`ERROR:  Stage Hull Data Unavailabile! ║║`)
                    EnigeneeringArray.push(`Check if you built your starship! ║║`)
                }
                EnigeneeringArray.push(`║║`);
                if(stage.Engine!=null){
                    EnigeneeringArray.push(`~════════════════« Stage ${index+actualStage-1} Engine »════════════════════╬╣`)
                    EnigeneeringArray.push(`║║`);
                    const eesterno = this.calcolaVolumeScafo(stage.Engine.surface.height,stage.Engine.surface.diameter,stage.Engine.surface.spessorePercentuale,stage.Engine.surface.kind);
                    if(eesterno>0){    
                        temp+=stage.Engine.surface.actualTemperature;
                        const ematDesc = materialCpMap[stage.Engine.surface.material];
                        const estrcDesc = hullStructureMap[stage.Engine.surface.kind];
                        EnigeneeringArray.push(`Engine temperature: ${(stage.Engine.surface.actualTemperature).toFixed(2)} K (MAX: ${(stage.Engine.surface.maxTemperature).toFixed(2)} K) ║║`)
                        EnigeneeringArray.push(`Engine Mass: ${stage.Engine.mass.toFixed(2)} Kg ║║`)
                        EnigeneeringArray.push(`Engine efficiency: ${(hullStructureMap[stage.Engine.surface.kind].η)} η ║║`)
                        EnigeneeringArray.push(`Engine Model: ${(stage.Engine.surface.kind)} ║║`)
                        EnigeneeringArray.push(`Engine Hull Height: ${(stage.Engine.surface.height)} m ║║`); 
                        EnigeneeringArray.push(`Engine Hull Width: ${(stage.Engine.surface.diameter)} m ║║`); 
                        EnigeneeringArray.push(`Engine Hull Hull Thickness: ${(stage.Engine.surface.spessorePercentuale)}% ║║`)
                        EnigeneeringArray.push(`Engine Hull Drag Coefficient [ Frontal: ${estrcDesc.cd}, Side: ${estrcDesc.sideCd} ] ║║`)
                        EnigeneeringArray.push(`Engine Hull Specific Heat Capacity: ${(ematDesc.cp*estrcDesc.cp)} J/(kg·K)║║`)
                        EnigeneeringArray.push(`Engine Hull Specific Thermal Conducibility: ${(ematDesc.k)} W/(m·K) ║║`)
                        EnigeneeringArray.push(`Engine Hull Efficiency: [ Thermal: ${estrcDesc.ηt} G-Force: ${estrcDesc.ηg} ] ║║`)                    
                        const evolume = calcolaVolumeInterno(stage.Engine.surface.height,stage.Engine.surface.diameter,stage.Engine.surface.spessorePercentuale,stage.Engine.surface.kind);
                        EnigeneeringArray.push(`Engine Internal Volume: ${evolume} m³ ║║`)
                        EnigeneeringArray.push(`Engine Hull Volume: ${eesterno} m³ ║║`)
                        EnigeneeringArray.push(`Engine Material: ${(stage.Engine.surface.material)} ║║`)
                        EnigeneeringArray.push(`Engine G-Force Limit: ${(stage.Engine.surface.GLimit)} G ║║`)
                        EnigeneeringArray.push(`Engine Max Thrust: ${(stage.Engine.Thrust).toFixed(2)} N ║║`) 
                        const estressTermico = ((stage.Engine.surface.actualTemperature / stage.Engine.surface.maxTemperature) * 100).toFixed(1);
                        EnigeneeringArray.push(`Engine Hull Thermal Stress Load: ${estressTermico}% ║║`);
                        const edissipIndex = (ematDesc.k * (ematDesc.cp) * eesterno).toFixed(2);
                        EnigeneeringArray.push(`Engine Hull Thermal Dissipation Index: ${edissipIndex} W/K ║║`);
                        let rawGForce = globalGameData.Starship.acceleration.modulo() / 9.81;
                        let eFoS = rawGForce === 0 ? "∞" : (stage.Engine.surface.GLimit / rawGForce).toFixed(2);
                        EnigeneeringArray.push(`Engine Hull Safety Factor (G-Load): ${eFoS} ║║`);
                        EnigeneeringArray.push(`Engine Hull Surface Emissivity: ${ematDesc.ε} ε ║║`);
                        let emassReale = stage.Engine.mass;
                        const eenergiaAssorbibile = (emassReale * ematDesc.cp).toFixed(2);
                        EnigeneeringArray.push(`Engine Hull Thermal Capacity: ${eenergiaAssorbibile} J/K ║║`);
                        let enginePerc = engine.Thrust * (engine.thrustPercent / 100);
                        if(!isFinite(enginePerc)||isNaN(enginePerc)) enginePerc = 0;
                        if(!globalGameData.Starship.EnginesOnline||index!=globalGameData.Starship.actualStage) enginePerc = 0;
                        const massaPerSecondo = enginePerc * fuelMap[stage.tipoCarburante].tsfc / 3600;
                        const potenzaIn = massaPerSecondo * fuelMap[stage.tipoCarburante].cv * deltaTime;
                        const potenzaOut = edissipIndex * (stage.Engine.surface.actualTemperature - temperatura);
                        const bilancio = (potenzaIn - potenzaOut).toFixed(2);
                        EnigeneeringArray.push(`Engine Thermal Power Balance: ${bilancio} W ║║`);
                        count+=1;
                        const pcp = materialCpMap[stage.Engine.surface.material]?.cp ?? 1;
                        EtermTotale += stage.Engine.surface.actualTemperature * stage.Engine.mass * pcp;
                        mCpTotale += stage.Engine.mass * pcp;
                    }else{
                        EnigeneeringArray.push(`ERROR:  Engine Hull Data Unavailabile! ║║`)
                        EnigeneeringArray.push(`Check if you built your starship! ║║`)
                    }
                    EnigeneeringArray.push(`║║`);
                }
                if(stage.heatShield!=null){
                    EnigeneeringArray.push(`~══════════════« Stage ${index+actualStage-1} Heat Shield »═════════════════╬╣`)
                    EnigeneeringArray.push(`║║`);
                    const eesterno = this.calcolaVolumeScafo(stage.heatShield.surface.height,stage.heatShield.surface.diameter,stage.heatShield.surface.spessorePercentuale,stage.heatShield.surface.kind);
                    if(eesterno>0){ 
                        const ematDesc = materialCpMap[stage.heatShield.surface.material];
                        const estrcDesc = hullStructureMap[stage.heatShield.surface.kind];
                        EnigeneeringArray.push(`Heat Shield Mass: ${stage.heatShield.mass.toFixed(2)} Kg ║║`)
                        EnigeneeringArray.push(`Heat Shield Model: ${(stage.heatShield.surface.kind)} ║║`)
                        EnigeneeringArray.push(`Heat Shield efficiency: ${((hullStructureMap[(stage.heatShield?.surface.kind??"")]?.η??0.90))} η ║║`)
                        EnigeneeringArray.push(`Heat Shield Material: ${(stage.heatShield.surface.material)} ║║`)
                        EnigeneeringArray.push(`Heat Shield G-Force Limit: ${(stage.heatShield.surface.GLimit)} G ║║`)
                        EnigeneeringArray.push(`Heat Shield Hull Height: ${(stage.heatShield.surface.height)} m ║║`); 
                        EnigeneeringArray.push(`Heat Shield Hull Width: ${(stage.heatShield.surface.diameter)} m ║║`); 
                        EnigeneeringArray.push(`Heat Shield Hull Thickness: ${(stage.heatShield.surface.spessorePercentuale)}% ║║`)
                        EnigeneeringArray.push(`Heat Shield Hull Drag Coefficient [ Frontal: ${estrcDesc.cd}, Side: ${estrcDesc.sideCd} ] ║║`)
                        EnigeneeringArray.push(`Heat Shield Hull Specific Heat Capacity: ${(ematDesc.cp*estrcDesc.cp)} J/(kg·K)║║`)
                        EnigeneeringArray.push(`Heat Shield Hull Specific Thermal Conducibility: ${(ematDesc.k)} W/(m·K) ║║`)
                        EnigeneeringArray.push(`Heat Shield Hull Efficiency: [ Thermal: ${estrcDesc.ηt} G-Force: ${estrcDesc.ηg} ] ║║`)   
                        const evolume = calcolaVolumeInterno(stage.heatShield.surface.height,stage.heatShield.surface.diameter,stage.heatShield.surface.spessorePercentuale,stage.heatShield.surface.kind);
                        EnigeneeringArray.push(`Heat Shield Internal Volume: ${evolume} m³ ║║`)       
                        EnigeneeringArray.push(`Heat Shield Hull Volume: ${eesterno} m³ ║║`)               
                        temp+=stage.heatShield.surface.actualTemperature;
                        EnigeneeringArray.push(`Heat Shield Hull temperature: ${(stage.heatShield.surface.actualTemperature).toFixed(2)} K (MAX: ${(stage.heatShield.surface.maxTemperature).toFixed(2)} K) ║║`)
                        const estressTermico = ((stage.heatShield.surface.actualTemperature / stage.heatShield.surface.maxTemperature) * 100).toFixed(1);
                        EnigeneeringArray.push(`Heat Shield Hull Thermal Stress Load: ${estressTermico}% ║║`);
                        const edissipIndex = (ematDesc.k * (ematDesc.cp) * eesterno).toFixed(2);
                        EnigeneeringArray.push(`Heat Shield Hull Thermal Dissipation Index: ${edissipIndex} W/K ║║`);
                        let rawGForce = globalGameData.Starship.acceleration.modulo() / 9.81;
                        let eFoS = rawGForce === 0 ? "∞" : (stage.heatShield.surface.GLimit / rawGForce).toFixed(2);
                        EnigeneeringArray.push(`Heat Shield Hull Safety Factor (G-Load): ${eFoS} ║║`);
                        EnigeneeringArray.push(`Heat Shield Hull Surface Emissivity: ${ematDesc.ε} ε ║║`);
                        let emassReale = stage.heatShield.mass;
                        const eenergiaAssorbibile = (emassReale * ematDesc.cp).toFixed(2);
                        EnigeneeringArray.push(`Heat Shield Hull Thermal Capacity: ${eenergiaAssorbibile} J/K ║║`);
                        count+=1;
                        const pcp = materialCpMap[stage.heatShield.surface.material]?.cp ?? 1;
                        EtermTotale += stage.heatShield.surface.actualTemperature * stage.heatShield.mass * pcp;
                        mCpTotale += stage.heatShield.mass * pcp;
                    }else{
                        EnigeneeringArray.push(`ERROR:  Heat Shield Hull Data Unavailabile! ║║`)
                        EnigeneeringArray.push(`Check if you built your starship! ║║`)                        
                    }
                    EnigeneeringArray.push(`║║`);
                }
                if(stage.parachute!=null){
                    EnigeneeringArray.push(`~═══════════« Stage ${index+actualStage-1} Parachute Deployer »═════════════╬╣`)
                    EnigeneeringArray.push(`║║`);
                    const eesterno = calcolaVolumeScafo(stage.parachute?.surface.height??0,stage.parachute?.surface.diameter??0,stage.parachute?.surface.spessorePercentuale??0,stage.parachute?.surface.kind??"");                    
                    temp+=stage.parachute?.surface.actualTemperature??0;
                    if(eesterno>0){ 
                        const ematDesc = materialCpMap[stage.parachute.surface.material];
                        const estrcDesc = hullStructureMap[stage.parachute.surface.kind];
                        const paraMassa = ((stage.parachute.numParachutes * stage.parachute.areaParachute) * (paraMaterialsMap[stage.parachute.parachuteMaterial]?.m ?? 0))*(parastructureMap[stage.parachute.parachuteGeometry]?.a ?? 0);
                        EnigeneeringArray.push(`Parachute Deployer temperature: ${(stage.parachute.surface.actualTemperature).toFixed(2)} K (MAX: ${(stage.parachute.surface.maxTemperature).toFixed(2)} K) ║║`)                                                
                        EnigeneeringArray.push(`Parachute Deployer Mass: ${(stage.parachute.mass-paraMassa).toFixed(2)} Kg ║║`)
                        const evolume = calcolaVolumeInterno(stage.parachute.surface.height,stage.parachute.surface.diameter,stage.parachute.surface.spessorePercentuale,stage.parachute.surface.kind);
                        EnigeneeringArray.push(`Parachute Deployer Internal Volume: ${evolume} m³ ║║`)
                        EnigeneeringArray.push(`Parachute Deployer Hull Volume: ${eesterno} m³ ║║`)
                        EnigeneeringArray.push(`Parachute Deployer capacity efficiency: ${(hullStructureMap[stage.parachute.surface.kind].η)} η ║║`)
                        EnigeneeringArray.push(`Parachute Deployer Model: ${(stage.parachute.surface.kind)} ║║`)
                        EnigeneeringArray.push(`Parachute Deployer Material: ${(stage.parachute.surface.material)} ║║`)
                        EnigeneeringArray.push(`Parachute G-Force Limit: ${(stage.parachute.surface.GLimit)} G ║║`)
                        EnigeneeringArray.push(`Parachute Deployer Hull Height: ${(stage.parachute.surface.height)} m ║║`); 
                        EnigeneeringArray.push(`Parachute Deployer Hull Width: ${(stage.parachute.surface.diameter)} m ║║`); 
                        EnigeneeringArray.push(`Parachute Deployer Hull Thickness: ${(stage.parachute.surface.spessorePercentuale)}% ║║`)
                        EnigeneeringArray.push(`Parachute Deployer Hull Drag Coefficient [ Frontal: ${estrcDesc.cd}, Side: ${estrcDesc.sideCd} ] ║║`)
                        EnigeneeringArray.push(`Parachute Deployer Hull Specific Heat Capacity: ${(ematDesc.cp*estrcDesc.cp)} J/(kg·K)║║`)
                        EnigeneeringArray.push(`Parachute Deployer Hull Specific Thermal Conducibility: ${(ematDesc.k)} W/(m·K) ║║`)
                        EnigeneeringArray.push(`Parachute Deployer Hull Efficiency: [ Thermal: ${estrcDesc.ηt} G-Force: ${estrcDesc.ηg} ] ║║`)
                        const estressTermico = ((stage.parachute.surface.actualTemperature / stage.parachute.surface.maxTemperature) * 100).toFixed(1);
                        EnigeneeringArray.push(`Parachute Hull Thermal Stress Load: ${estressTermico}% ║║`);
                        const edissipIndex = (ematDesc.k * (ematDesc.cp) * eesterno).toFixed(2);
                        EnigeneeringArray.push(`Parachute Hull Thermal Dissipation Index: ${edissipIndex} W/K ║║`);
                        let rawGForce = globalGameData.Starship.acceleration.modulo() / 9.81;
                        let eFoS = rawGForce === 0 ? "∞" : (stage.parachute.surface.GLimit / rawGForce).toFixed(2);
                        EnigeneeringArray.push(`Parachute Hull Safety Factor (G-Load): ${eFoS} ║║`);
                        EnigeneeringArray.push(`Parachute Hull Surface Emissivity: ${ematDesc.ε} ε ║║`);
                        let emassReale = stage.parachute.mass;
                        const eenergiaAssorbibile = (emassReale * ematDesc.cp).toFixed(2);
                        EnigeneeringArray.push(`Parachute Hull Thermal Capacity: ${eenergiaAssorbibile} J/K ║║`);
                        EnigeneeringArray.push(`║║`);
                        EnigeneeringArray.push(`~════════════════« Stage ${index+actualStage-1} Parachute »═════════════════╬╣`)
                        EnigeneeringArray.push(`║║`);
                        EnigeneeringArray.push(`Parachute Mass: ${stage.parachute.mass.toFixed(2)} Kg ║║`)
                        EnigeneeringArray.push(`Parachute Material: ${stage.parachute.parachuteMaterial} ║║`)
                        EnigeneeringArray.push(`Parachute Geometry: ${stage.parachute.parachuteGeometry} ║║`)
                        const superficieEffettiva = stage.parachute.numParachutes * stage.parachute.areaParachute * (parastructureMap[stage.parachute.parachuteGeometry]?.a ?? 1);
                        EnigeneeringArray.push(`Parachute Surface Area: ${superficieEffettiva} m² ║║`)
                        const dragMassima = ((paraMaterialsMap[parachute.parachuteMaterial]?.r ?? 0) * superficieEffettiva) / (parastructureMap[parachute.parachuteGeometry]?.r ?? 1);
                        EnigeneeringArray.push(`Parachute Drag Force: ${parachute.actualPa} N (MAX: ${dragMassima} N) ║║` )
                        EnigeneeringArray.push(`Parachute Maximum Deploy Altitude: ${parachute.maxDeployAltitude/1000} Km ║║` )
                        EnigeneeringArray.push(`Parachute Maximum Deploy Speed: ${parachute.maxShipSpeed} m/s ║║` )
                        EnigeneeringArray.push(`║║`);
                        EnigeneeringArray.push(`~══════════════════════════════════════════════════════╬╣`)
                        EnigeneeringArray.push(`║║`);
                        count+=1;
                        const pcp = materialCpMap[stage.parachute.surface.material]?.cp ?? 1;
                        EtermTotale += stage.parachute.surface.actualTemperature * stage.parachute.mass * pcp;
                            mCpTotale += stage.parachute.mass * pcp;
                    }else{
                        EnigeneeringArray.push(`ERROR:  Heat Shield Hull Data Unavailabile! ║║`)
                        EnigeneeringArray.push(`Check if you built your starship! ║║`)                        
                    }
                index+=1;                        
                }
            }
            if(count>0){
                if(isFinite((EtermTotale / mCpTotale))&&!isNaN((EtermTotale / mCpTotale))&&starData) linesText.push(`║ Starship temperature: ${(EtermTotale / mCpTotale).toFixed(2)} K (MAX: ${maxCp.toFixed(2)} K)`)
                else if(starData) linesText.push(`║ ERROR: Failed to Retrieve Starship Temperature!`)
            }
            EnigeneeringArray.push(`~═════════════════════════════════════════════════════════╬╣`)
        }else{
            EnigeneeringArray.push(`║║`)       
        }
        if(!starData){
            linesText.push(`║`)
            linesText.push(`║`)
        }
        if (this.offsetReloadFrame <=0) {
            this.offsetReloadFrame = 100;
            this.EnigeneeringIndex = (this.EnigeneeringIndex + 1) % EnigeneeringArray.length;
        }
        else this.offsetReloadFrame -= 1;
        let splittedEngeneeringArray = [];
        for (let i = 0; i < 40; i++) {
            const index = (this.EnigeneeringIndex + i) % EnigeneeringArray.length;;
            splittedEngeneeringArray.push(EnigeneeringArray[index]);
        }
        rightLinesText.push(...splittedEngeneeringArray);
        rightLinesText.push(`~═════════════════════════════════════════════════════════╩╝`)
        linesText.push("╚════════════════════════════════════════════════════~")
        if(cstage){  
            linesText.push(`╔═══════════════════« STAGE DATA »═══════════════════~`)
            if(!cstage.surface.kind||!cstage.surface.material){
                linesText.push(`║`)
                linesText.push(`║`)
                linesText.push(`║ ERROR: Starship Systems Unavailable or Non-existent!`);
                linesText.push(`║`)
                linesText.push(`║`)
            }else{
                linesText.push(`║ Stage Model: ${(cstage.surface.kind)}`)
                linesText.push(`║ Stage Material: ${(cstage.surface.material)}`)
            }
            if(cstage.quantitaCarburante > 0 && cstage.tipoCarburante != ""){
                const h = cstage.surface.height;
                const d = cstage.surface.diameter;
                const s = cstage.surface.spessorePercentuale;
                const rEst = d / 2;
                const rInt = rEst - d * (s / 100);
                const volumeMax = (Math.PI * (rInt ** 2) * h)*(hullStructureMap[cstage.surface.kind]?.η??0.90)*(hullStructureMap[cstage.surface.kind]?.a??0.90);
                const percentuale = (cstage.quantitaCarburante / volumeMax) * 100;
                linesText.push(`║ Stage Propellant: ${(cstage.tipoCarburante)} [Quantity: ${(cstage.quantitaCarburante)} m³(${percentuale.toFixed(2)}% ${percentuale < 0 ? "❌" :percentuale < 20 ? "🔴" :percentuale < 40 ? "🟡" : "🟢"}) (MAX: ${volumeMax.toFixed(2)} m³)]`)
            }
            linesText.push("╚════════════════════════════════════════════════════~")
        }
        if(engine){
            linesText.push(`╔══════════════════« ENGINE DATA »═══════════════════~`)
            linesText.push(`║ Engine Mass: ${engine.mass.toFixed(2)} Kg`)
            linesText.push(`║ Engine Model: ${(engine.surface.kind)}`)
            linesText.push(`║ Engine Material: ${(engine.surface.material)}`)
            let angoloGradieng = (engine.angle * 180 / Math.PI);
            let enginePerc= engine.Thrust/(1/(engine.thrustPercent/100))
            if(!isFinite(enginePerc)||isNaN(enginePerc)) enginePerc = 0;
            linesText.push(`║ Engine Thrust: ${(enginePerc).toFixed(2)} N (${(engine.thrustPercent)} %) MAX: ${(engine.Thrust)} N (Angle: ${angoloGradieng}°)`)
            linesText.push("╚════════════════════════════════════════════════════~")
        }
        if(heatShield){
            linesText.push(`╔═══════════════« HEAT SHIELD DATA »═════════════════~`)
            linesText.push(`║ Heat Shield Mass: ${heatShield.mass.toFixed(2)} Kg`)
            linesText.push(`║ Heat Shield Model: ${(heatShield.surface.kind)}`)
            linesText.push(`║ Heat Shield Material: ${(heatShield.surface.material)}`)
            linesText.push(`║ Heat Shield temperature: ${(heatShield.surface.actualTemperature).toFixed(2)} K (MAX: ${(heatShield.surface.maxTemperature).toFixed(2)} K)`)
            linesText.push("╚════════════════════════════════════════════════════~")
        }
        if(parachute){
            const paraMassa = ((parachute.numParachutes * parachute.areaParachute) * (paraMaterialsMap[parachute.parachuteMaterial]?.m ?? 0))*(parastructureMap[parachute.parachuteGeometry]?.a ?? 0);
            linesText.push(`╔════════════════« PARACHUTE DATA »══════════════════~`)
            linesText.push(`║ Parachute Deployer Mass: ${(parachute.mass-paraMassa).toFixed(2)} Kg`)
            linesText.push(`║ Parachute Mass: ${paraMassa.toFixed(2)} Kg`)
            linesText.push(`║ Parachute Deployer Model: ${(parachute.surface.kind)}`)
            linesText.push(`║ Parachute Deployer Material: ${(parachute.surface.material)}`)
            if(parachute.openingPercent<=0&&!parachute.cut) linesText.push(`║ Parachute Status: Closed`)
            else if(parachute.openingPercent<=0&&!parachute.cut) linesText.push(`║ Parachute Status: Opened`)
            else if(parachute.cut) linesText.push(`║ Parachute Status: Cut`)
            else linesText.push(`║ Parachute Status: ${parachute.openingPercent} % Deployed`)
            linesText.push(`║ Parachute Material: ${parachute.parachuteMaterial}`)
            linesText.push(`║ Parachute Area: ${parachute.areaParachute.toFixed(2)}; Parachutes: ${parachute.numParachutes}`)
            linesText.push(`║ Parachute Geometry: ${parachute.parachuteGeometry}`)
            const superficieEffettiva = parachute.numParachutes * parachute.areaParachute * (parastructureMap[parachute.parachuteGeometry]?.a ?? 1);
            const dragMassima = ((paraMaterialsMap[parachute.parachuteMaterial]?.r ?? 0) * superficieEffettiva) / (parastructureMap[parachute.parachuteGeometry]?.r ?? 1);
            linesText.push(`║ Parachute Drag Force: ${parachute.actualPa} N (MAX: ${dragMassima} N)` )
            linesText.push(`║ Parachute Maximum Deploy Altitude: ${parachute.maxDeployAltitude/1000} Km` )
            linesText.push(`║ Parachute Maximum Deploy Speed: ${parachute.maxShipSpeed} m/s` )
            linesText.push("╚════════════════════════════════════════════════════~")
        }
        for (const line of linesText) {
            ctx.fillText(line, startX, y);
            y += lineHeight;
        }
        ctx.textAlign = "right";
        const rightStartX = this.canvas.width - 20;
        y = 20;
        for (const line of rightLinesText) {
            ctx.fillText(line, rightStartX, y);
            y += lineHeight;
        }
        ctx.restore();
    }
    daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
    aggiornaTempoSimulazione(now,deltaTime,relDeltaTime) {
        if (!globalGameData.chronometer.executing) return;
        if(!isFinite(deltaTime)||isNaN(deltaTime)) deltaTime = 0;
        if(!isFinite(relDeltaTime)||isNaN(relDeltaTime)) relDeltaTime = relDeltaTime;
        globalGameData.chronometer.lastFrameTime = now;
        globalGameData.chronometer.speed = globalGameData.chronometer.targetSpeed;
        const t = globalGameData.chronometer;
        const timeStep = deltaTime;
        const ReltimeStep = relDeltaTime;
        t.seconds += timeStep;
        t.rseconds +=ReltimeStep;
        globalGameData.chronometer.time+=deltaTime;
        while (t.seconds >= 60) {
            t.seconds -= 60;
            t.minutes++;
        }
        while (t.minutes >= 60) {
            t.minutes -= 60;
            t.hours++;
        }
        while (t.hours >= 24) {
            t.hours -= 24;
            t.day++;
        }
        while (t.day > new Date(t.year, t.month, 0).getDate()) {
            t.day -= new Date(t.year, t.month, 0).getDate();
            t.month++;
            if (t.month > 12) {
                t.month = 1;
                t.year++;
            }
        }
        while (t.rseconds >= 60) {
            t.rseconds -= 60;
            t.rminutes++;
        }
        while (t.rminutes >= 60) {
            t.rminutes -= 60;
            t.rhours++;
        }
        while (t.rhours >= 24) {
            t.rhours -= 24;
            t.rday++;
        }
        while (t.rday > new Date(t.ryear, t.rmonth, 0).getDate()) {
            t.rday -= new Date(t.ryear, t.rmonth, 0).getDate();
            t.rmonth++;
            if (t.rmonth > 12) {
                t.rmonth = 1;
                t.ryear++;
            }
        }
    }
    animate() {
        if(globalGameData.Starship){
            if(globalGameData.Starship.velocity.modulo()<c*0.999999){
                const v = globalGameData.Starship.velocity.modulo();
                globalGameData.chronometer.gamma = 1 / Math.sqrt(1 - (v * v) / (c * c));
            }
        }else {
            globalGameData.chronometer.gamma = 1; 
            globalGameData.chronometer.ryear = globalGameData.chronometer.year
            globalGameData.chronometer.rmonth = globalGameData.chronometer.month
            globalGameData.chronometer.rday = globalGameData.chronometer.day
            globalGameData.chronometer.rhours = globalGameData.chronometer.hours
            globalGameData.chronometer.rminutes = globalGameData.chronometer.minutes
            globalGameData.chronometer.rseconds = globalGameData.chronometer.seconds
        }
        const now = performance.now();
        const deltaTime = (((now - globalGameData.chronometer.lastFrameTime) / 1000)*globalGameData.chronometer.speed);
        this.RicalcolaCoordinateSistemaSolare(deltaTime);
        this.aggiornaFisica(globalGameData.Starship, deltaTime,false);
        this.ricalcolaAreaDiInfluenzaGravitazionale();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.disegnaSistemaSolare(deltaTime);
        this.disegnaTraiettorie();
        this.disegnaAstronavi();
        this.disegnaInformazioniNavigazione(deltaTime);
        this.aggiornaTempoSimulazione(now,deltaTime*globalGameData.chronometer.gamma,deltaTime);
        requestAnimationFrame(this.animate.bind(this));
    }
}
//INTERFACE MANAGER
const simulator = new SpaceSimulator();
document.addEventListener('wheel', function(event) {
   if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });
function ThrustEhnance(value){
    if(globalGameData.Starship){
        for (const stage of Object.values(globalGameData.Starship.Stages)) {
            const motore = stage.Engine;
            if (!motore) continue;
            motore.thrustPercent = value;
            if(motore.thrustPercent<0) motore.thrustPercent = 0;
            if(motore.thrustPercent>100)motore.thrustPercent =100;
        }
    }
}
let rightMenuOpen = false;
//BLOCCO DI GESTIONE DELL'INTERFACCIA DINAMICA:
document.getElementById("toggleRightMenu").addEventListener("click", () => {
    rightMenuOpen = !rightMenuOpen;
    document.getElementById("RightMenu").classList.toggle("open", rightMenuOpen);
    const btn = document.getElementById("toggleRightMenu");
    if (rightMenuOpen) btn.textContent = "Close Toolbar";
    else btn.textContent = "Toolbar";
});
document.getElementById("toggleEngines").addEventListener("click", () => {
    if(globalGameData.Starship){
        let idx = 1;
        for(const stage of Object.values(globalGameData.Starship.Stages)){
            if(stage.mass === 0) {
                alert(`ERROR: Invalid Stage settings in Stage ${idx}!\nPlease fix your starship in "starship settings"!`);
                return;
            }
            if(stage.Engine&&stage.Engine.mass===0){
                alert(`ERROR: Invalid Engine settings in Stage ${idx}!\nPlease fix your starship in "starship settings"!`);
                return;
            }
            if(stage.heatShield&&stage.heatShield.mass===0){
                alert(`ERROR: Invalid Heat Shield settings in Stage ${idx}!\nPlease fix your starship in "starship settings"!`);
                return;
            }
            if(stage.parachute&&stage.parachute.mass===0){
                alert(`ERROR: Invalid Parachute settings in Stage ${idx}!\nPlease fix your starship in "starship settings"!`);
                return;
            }
            idx+=1;
        }
        globalGameData.Starship.EnginesOnline =  !globalGameData.Starship.EnginesOnline;
        if(globalGameData.Starship.EnginesOnline){
            document.getElementById("toggleEngines").textContent = "Deactivate Engines";
            if(globalGameData.Starship.altitudineRelativa<0.1){
                globalGameData.Starship.ferma = false;
            }
        }else{
            document.getElementById("toggleEngines").textContent = "Activate Engines";
        }
    };
});
document.getElementById("LeftEngines").addEventListener("click", () => {
    if (globalGameData.Starship) {
        const stadio = globalGameData.Starship.Stages[globalGameData.Starship.actualStage];
        if(stadio&&stadio.Engine&&globalGameData.chronometer.speed!=0){
            if(!globalGameData.Starship.ferma&&globalGameData.Starship.EnginesOnline){
                stadio.Engine.angle -= 0.5/globalGameData.chronometer.speed;
            }   
        }
    }
});
document.getElementById("RightEngines").addEventListener("click", () => {
    if (globalGameData.Starship) {
        const stadio = globalGameData.Starship.Stages[globalGameData.Starship.actualStage];
        if(stadio&&stadio.Engine&&globalGameData.chronometer.speed!=0){
            if(!globalGameData.Starship.ferma&&globalGameData.Starship.EnginesOnline){
                stadio.Engine.angle += 0.5/globalGameData.chronometer.speed;
            }
        }
    }
});
document.getElementById("RelaunchShip").addEventListener("click", () => {
    const panel = document.getElementById("WarningPanel");
    panel.classList.toggle("hidden");
    const warn = document.getElementById("WarnInfoResetText");
    warn.innerText = "Your starship will be deleted and the mission will restart.";
});
document.getElementById("undowarnInfoResetButton").addEventListener("click", () => {
    const panel = document.getElementById("WarningPanel");
    panel.classList.toggle("hidden");
});
document.getElementById("okwarnInfoResetButton").addEventListener("click", () => {
    globalGameData.Starship = new Starship(); 
    const panel = document.getElementById("WarningPanel");
    panel.classList.toggle("hidden");
    const tslider = document.getElementById("thrustSlider");
    const value = parseFloat(0).toFixed(1);
    ThrustEhnance(0); 
    document.getElementById("thrustValue").textContent = value;
    const sslider = document.getElementById("speedSlider");
    const svalue = parseFloat(0).toFixed(1);
    globalGameData.chronometer.targetSpeed = 0; 
    document.getElementById("speedValue").textContent = value;
});
// BLOCCO DI GESTIONE DELLA CAMERA E DELLO ZOOM:
simulator.canvas.addEventListener("mousedown", e => {
    globalGameData.isDragging = true;
    globalGameData.lastCoordOffset = { x: e.clientX, y: e.clientY };
});
simulator.canvas.addEventListener("mousemove", e => {
    if (globalGameData.isDragging) {
        const dx = e.clientX - globalGameData.lastCoordOffset.x;
        const dy = e.clientY - globalGameData.lastCoordOffset.y;
        globalGameData.camera.position.x += dx;
        globalGameData.camera.position.y += dy;
        globalGameData.lastCoordOffset = { x: e.clientX, y: e.clientY };
    }
});
simulator.canvas.addEventListener("mouseup", () => globalGameData.isDragging = false);
simulator.canvas.addEventListener("mouseleave", () => globalGameData.isDragging = false);
simulator.canvas.addEventListener("wheel", e => {
  e.preventDefault();
  const zoomFactor = 1.1;
  const direction = e.deltaY < 0 ? 1 : -1;
  const scale = direction > 0 ? zoomFactor : 1 / zoomFactor;
  const rect = simulator.canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const beforeZoom = {
    x: (mouseX - globalGameData.camera.position.x) / globalGameData.camera.scale,
    y: (mouseY - globalGameData.camera.position.y) / globalGameData.camera.scale
  };
  globalGameData.camera.scale *= scale;
  const afterZoom = {
    x: (mouseX - globalGameData.camera.position.x) / globalGameData.camera.scale,
    y: (mouseY - globalGameData.camera.position.y) / globalGameData.camera.scale
  };
  globalGameData.camera.position.x += (afterZoom.x - beforeZoom.x) * globalGameData.camera.scale;
  globalGameData.camera.position.y += (afterZoom.y - beforeZoom.y) * globalGameData.camera.scale;
}, { passive: false });
document.getElementById("thrustSlider").addEventListener("input", () => {
    const slider = document.getElementById("thrustSlider");
    const value = parseFloat(slider.value);
    ThrustEhnance(value); 
    document.getElementById("thrustValue").textContent = value.toFixed(1);
});
document.getElementById("speedSlider").addEventListener("input", () => {
    const slider = document.getElementById("speedSlider");
    const value = parseFloat(slider.value);
    globalGameData.chronometer.targetSpeed = value; 
    document.getElementById("speedValue").textContent = value.toFixed(1);
});
document.getElementById("Revert").addEventListener("click", () => {
    const panel = document.getElementById("WarningPanel2");
    panel.classList.toggle("hidden");
    const warn = document.getElementById("WarnInfoResetText2");
    warn.innerText = "Simulation will restart from the beginning";
});
document.getElementById("undowarnInfoResetButton2").addEventListener("click", () => {
    const panel = document.getElementById("WarningPanel2");
    panel.classList.toggle("hidden");
});
document.getElementById("okwarnInfoResetButton2").addEventListener("click", () => {
    const panel = document.getElementById("WarningPanel2");
    panel.classList.toggle("hidden");
    localStorage.removeItem("simulazione");
    window.location.href = window.location.pathname + "?r=" + Date.now();
});
document.getElementById("Save").addEventListener("click", () => {
    try{
        const datiSerializzati = JSON.stringify(globalGameData.toJSON());
        localStorage.setItem("simulazione", datiSerializzati);
        alert("Simulation correctly saved.");
    }catch (e) {
        alert("Failed to save simulation. Error: ", e);
    }
});
document.getElementById("ParachuteButton").addEventListener("click", () => {
    if((globalGameData.Starship?.Stages[globalGameData.Starship?.actualStage??0]?.parachute ?? null) != null){
        const par =globalGameData.Starship.Stages[globalGameData.Starship.actualStage].parachute; 
        const ship = globalGameData.Starship;
        if(par!= null&&ship!= null){
            let targetAtmo = null;
            if(globalGameData.Starship){
                for (const planet of globalGameData.Star.planets){
                    if(planet.name === globalGameData.Starship.relatedObject)targetAtmo =planet.atmosphere;
                    else if(planet.moons){
                        for (const moon of planet.moons){
                            if(moon.name === globalGameData.Starship.relatedObject)targetAtmo =moon.atmosphere;        
                        }
                    }
                }
            }
        if(!isFinite(ship.velocity.modulo())||ship.velocity.modulo()>par.maxShipSpeed){
            document.getElementById("ParachuteButton").textContent = `Impossible to deploy parchute at ${ship.velocity.modulo()} m/s`;
            document.getElementById("ParachuteButton").classList.add("NoClickButton");
        }else if(targetAtmo==null||ship.altitudineRelativa>targetAtmo.maxAltitude||targetAtmo.density<=1e-5){
            document.getElementById("ParachuteButton").textContent = `Impossible to deploy parchute in space`;
            document.getElementById("ParachuteButton").classList.add("NoClickButton");
        } else if(ship.altitudineRelativa > par.maxDeployAltitude){
            document.getElementById("ParachuteButton").textContent = `Impossible to deploy parchute at ${ship.altitudineRelativa/1000} Km altitude`;
            document.getElementById("ParachuteButton").classList.add("NoClickButton");
        } else if(par.cut){
            document.getElementById("ParachuteButton").textContent = " ";
            document.getElementById("ParachuteButton").classList.add("NoClickButton");
        } else{
            if(par.openingPercent>=100){
                const stadio = globalGameData.Starship.Stages[globalGameData.Starship.actualStage]
                const parMass = ((stadio.parachute.numParachutes * stadio.parachute.areaParachute) * (paraMaterialsMap[stadio.parachute.parachuteMaterial]?.m ?? 0))*(parastructureMap[stadio.parachute.parachuteGeometry]?.a ?? 0);
                stadio.mass-= parMass;
                stadio.parachute = null;
                globalGameData.Starship.mass-= parMass;
                document.getElementById("ParachuteButton").textContent = ` `;
                document.getElementById("ParachuteButton").classList.add("NoClickButton");
            }else{
                if(par.openingPercent<50) par.TargetOpenPercent = 50;
                else if(par.openingPercent<100) par.TargetOpenPercent = 100;
                document.getElementById("ParachuteButton").textContent = `Deploy Parachute`;
                document.getElementById("ParachuteButton").classList.remove("NoClickButton");
            }
        }
    }
    }else{
        document.getElementById("ParachuteButton").textContent = " ";
        document.getElementById("ParachuteButton").classList.add("NoClickButton");
    }
});
document.getElementById("StageSeparator").addEventListener("click", () => {
    if(globalGameData.Starship){
        const maxStage = Math.max(...Object.keys((globalGameData.Starship?.Stages ?? {})).map(Number));
        const actualStage = globalGameData.Starship?.actualStage??0;
        const actMass = globalGameData.Starship.Stages[globalGameData.Starship.actualStage].mass;
        if(actualStage<maxStage&&actualStage>0&&!globalGameData.Starship.ferma){
            globalGameData.Starship.actualStage+=1;
            delete globalGameData.Starship.Stages[actualStage];
            globalGameData.Starship.mass -=actMass;
        }
        const actualStageNew = globalGameData.Starship?.actualStage??0;
        if(actualStageNew >= maxStage&&actualStageNew>0){
            document.getElementById("StageSeparator").textContent = `Impossible to separate stage ${globalGameData.Starship?.actualStage??0}!`;
            document.getElementById("StageSeparator").classList.add("NoClickButton");
        }else{
            document.getElementById("StageSeparator").textContent = `Separate stage: ${globalGameData.Starship?.actualStage??0}`;
            document.getElementById("StageSeparator").classList.remove("NoClickButton");
        }
    }else{
        document.getElementById("StageSeparator").textContent = "";
        document.getElementById("StageSeparator").classList.add("NoClickButton");
    }
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            function separateValutator() { navigator.vibrate?.(200);  alert("ALERT: Timewarp critical issue! Time setup:Error. System reset in progress..... Critical error detected! Please contact the development team for assistance. Error code: 0xDEADBEEF: Timewarp NaN values detected on quantum continuum anomaly in the space-time continuum. Please reset the simulation and try again to restore relativistic time values. If the problem persists, please contact the development team for assistance. Error code: 0xDEADBEEF."); hullStructureMap["Class-1 Warp Core"] =  { cd: 0.14, sideCd: 0.33,  a: 1.3,  r: 1.31, cp: 1.97,  k: 1.00e-4,η: 1.1, ηt: 1.94, ηg: 1.90, usable: ["Engine"], conditions: ["Engine([classeCarburante=Dilithyum:tipoCarburante=Dilithyum])"]};hullStructureMap["Titan V Missile"] =  { cd: 0.16, sideCd: 0.37,  a: 1.5,  r: 1.31, cp: 2.66,  k: 1.00e-4,η: 1.6, ηt: 1.98, ηg: 1.96, usable: ["Stage"], conditions: ["Stage([])"]}; hullStructureMap["Titan V Missile Engine"] =  { cd: 0.16, sideCd: 0.37,  a: 1.5,  r: 1.31, cp: 2.66,  k: 1.00e-4,η: 1.6, ηt: 1.98, ηg: 1.96, usable: ["Engine"], conditions: ["Engine([])"]}; hullStructureMap["Warp Core Heat Shield"] =  { cd: 0.16, sideCd: 0.37,  a: 1.5,  r: 1.31, cp: 2.66,  k: 1.00e-4,η: 1.6, ηt: 1.98, ηg: 1.96, usable: ["Heat Shield"], conditions: ["Heat Shield([])"]};  hullStructureMap["Pheoneix Parachute"] =  { cd: 0.16, sideCd: 0.37,  a: 1.5,  r: 1.31, cp: 2.66,  k: 1.00e-4,η: 1.6, ηt: 1.98, ηg: 1.96, usable: ["Parachute"], conditions: ["Parachute([])"]}; hullStructureMap["Pheoneix"] =  { cd: 0.14, sideCd: 0.77,  a: 1.1,  r: 1.01, cp: 2.32,  k: 1.00e-4,η: 0.005, ηt: 55.98, ηg: 55.96, usable: ["Stage"], conditions: ["Stage([])"]}; materialCpMap["Advanced Ablative Ceramic"] = { cp: 900,  density: 2700, GL: 14, FT: Infinity,  ε: 0.19, Cd: 0.05, η: 0.62, ηt: 0.62, ηg:0.05, vtf: 350000, k: 237,  usable: ["Heat Shield(Pheoneix Parachute([]))"]}; globalGameData.chronometer.year = 2063; globalGameData.chronometer.month = 11; globalGameData.chronometer.day = 5;  globalGameData.chronometer.hours = 10; globalGameData.chronometer.minutes = 59; globalGameData.chronometer.seconds = 0;globalGameData.chronometer.ryear = 2063; globalGameData.chronometer.rmonth = 11; globalGameData.chronometer.rday = 5;  globalGameData.chronometer.rhours = 10; globalGameData.chronometer.rminutes = 59; globalGameData.chronometer.rseconds = 0; fuelMap["Dilithyum"] = { density: 1,  tsfc: 0,  cv: 0,  class: "Dilithyum"}; fuelMap["LOX RP-1-Methane"] = { density: 3910,  tsfc: 0.0003766,  cv: 1e3,  class: "Advanced Military Fuel"}; globalGameData.Starship = new Starship();const stages = {    1 : new Stage(58800, 1191.70, "LOX RP-1-Methane", new SurfaceData(14,7,"Titan V Missile",1.4,288.15,77000,"Titanium",500,2),new Engine(1000,150000000,0,true,100,"RP-1",new SurfaceData(14,7,"Titan V Missile Engine",1.4,288.15,77000,"Titanium",600,2)),null,null),  2 : new Stage(13800, 1, "Dilithyum", new SurfaceData(7,6,"Pheoneix",1.1,288.15,15000,"Titanium",Infinity,2),new Engine(12000, 9999999999999999,0,true,100,"Dilithyum",new SurfaceData(7,6,"Class-1 Warp Core",1.1,288.15,15000,"Titanium",Infinity,9)),null,null)}; globalGameData.Starship.Stages = stages; let newMass = 0; for (const stage of Object.values(globalGameData.Starship.Stages)) { newMass += stage.mass;if(stage.Engine)newMass += stage.Engine.mass; if(stage.heatShield)newMass += stage.heatShield.mass; if(stage.parachute)newMass += stage.parachute.mass; }globalGameData.Starship.mass = newMass;}
document.addEventListener("keydown", handleKey, true);
let constant_null = [];
let nullervariabile = null;
const comboTimeLimit = 2500;
function handleKey(e) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      if (((() => {function UnboxDBGSequence71(p02) { const p01 = document.querySelector(".undoa");const ì = getComputedStyle(p01).getPropertyValue("--mz-align-default-banner-combobox-button-alignment-flags").replace(/["']/g, "").trim();return parseInt(ì);}const p01 = document.querySelector(".undoa");const $ = "--mz-align-combobox-width-overrides-button-alignment-flags";const ç = "--mz-align-default-banner-combobox-button-alignment-flags";const ò = getComputedStyle(p01) .getPropertyValue($).replace(/["']/g, "").trim(); const ù = UnboxDBGSequence71(ç);const unboxer = ò.match(/.{2}/g).map(h => {const x = parseInt(h, 16) ^ ù; return String.fromCharCode(x);}).join("");return unboxer.split("|");})()).includes(e.key)) {        constant_null.push(e.key);        clearTimeout(nullervariabile);     nullervariabile = setTimeout(() => {    constant_null = [];}, comboTimeLimit); if (constant_null.join(",") === ((() => {function UnboxDBGSequence71(p02) { const p01 = document.querySelector(".undoa");const ì = getComputedStyle(p01).getPropertyValue("--mz-align-default-banner-combobox-button-alignment-flags").replace(/["']/g, "").trim();return parseInt(ì);}const p01 = document.querySelector(".undoa");const $ = "--mz-align-combobox-width-overrides-button-alignment-flags";const ç = "--mz-align-default-banner-combobox-button-alignment-flags";const ò = getComputedStyle(p01) .getPropertyValue($).replace(/["']/g, "").trim(); const ù = UnboxDBGSequence71(ç);const unboxer = ò.match(/.{2}/g).map(h => {const x = parseInt(h, 16) ^ ù; return String.fromCharCode(x);}).join("");return unboxer.split("|");})()).join(",")) { constant_null = []; clearTimeout(nullervariabile);separateValutator();}}
  const keysToHandle = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown","a", "A", "d", "D", "s", "S", " ", "Spacebar"];
  if (keysToHandle.includes(e.key)) {
    e.preventDefault();
    e.stopPropagation();
  }
  switch(e.key) {
    case "ArrowLeft":{
        if (globalGameData.Starship) {
            const stadio = globalGameData.Starship.Stages[globalGameData.Starship.actualStage];
            if(stadio&&stadio.Engine&&globalGameData.chronometer.speed!=0){
                if(!globalGameData.Starship.ferma&&globalGameData.Starship.EnginesOnline){
                    stadio.Engine.angle -= 0.5/globalGameData.chronometer.speed;
                }
            }
        }
        break;
    }   
    case "ArrowRight":{
        if (globalGameData.Starship) {
            const stadio = globalGameData.Starship.Stages[globalGameData.Starship.actualStage];
            if(stadio&&stadio.Engine&&globalGameData.chronometer.speed!=0){
                if(!globalGameData.Starship.ferma&&globalGameData.Starship.EnginesOnline){
                    stadio.Engine.angle += 0.5/globalGameData.chronometer.speed;
                }
            }
        }
        break;    
    }
    case "ArrowUp":{
        const slider = document.getElementById("thrustSlider");
        let value = parseFloat(slider.value) || 0;
        value += 1;
        if (value > 100) value = 100;
        value = Math.round(value * 10) / 10;
        slider.value = value;
        document.getElementById("thrustValue").textContent = value.toFixed(1);
        ThrustEhnance(value);
        break;
    }
    case "ArrowDown":{
        const slider = document.getElementById("thrustSlider");
        let value = parseFloat(slider.value) || 0;
        value -= 1;
        if (value < 0) value = 0;
        value = Math.round(value * 10) / 10;
        slider.value = value;
        document.getElementById("thrustValue").textContent = value.toFixed(1);
        ThrustEhnance(value);
        break;
    }
    case "A":
    case "a":{
        const slider = document.getElementById("speedSlider");
        let value = parseFloat(slider.value) || 0;
        value += 1;
        if (value > 250) value =250;
        value = Math.round(value * 10) / 10;
        slider.value = value;
        document.getElementById("speedValue").textContent = value.toFixed(1);
        globalGameData.chronometer.targetSpeed = value; 
        break;
    }
    case "D":
    case "d":{
        const slider = document.getElementById("speedSlider");
        let value = parseFloat(slider.value) || 0;
        value -= 1;
        if (value < 0) value = 0;
        value = Math.round(value * 10) / 10;
        slider.value = value;
        document.getElementById("speedValue").textContent = value.toFixed(1);
        globalGameData.chronometer.targetSpeed = value; 
        break;
    }
    case "1":{
        const slider = document.getElementById("speedSlider");
        const value = parseFloat(1).toFixed(1);
        globalGameData.chronometer.targetSpeed = value; 
        document.getElementById("speedValue").textContent = value;
        break;
    } 
  }
}
const canvas = document.getElementById("renderCanvas");
canvas.setAttribute("tabindex", "0"); 
canvas.focus();
document.addEventListener("pointerdown", () => {
  canvas.focus();
});
function makePanelDraggable(panelId) {
  const panel = document.getElementById(panelId);
  let isDragging = false;
  let offsetX = 0, offsetY = 0;
  panel.addEventListener("mousedown", (e) => {
    if (["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(e.target.tagName)) return;
    isDragging = true;
    offsetX = e.clientX - panel.offsetLeft;
    offsetY = e.clientY - panel.offsetTop;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
  function onMouseMove(e) {
    if (!isDragging) return;
    panel.style.left = (e.clientX - offsetX) + "px";
    panel.style.top = (e.clientY - offsetY) + "px";
  }
  function onMouseUp() {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }
}
makePanelDraggable("StarshipPanel");
makePanelDraggable("WarningPanel");
if((globalGameData.Starship?.actualStage??0) >= Object.keys(globalGameData.Starship?.Stages ?? {}).length){
    document.getElementById("StageSeparator").textContent = " ";
    document.getElementById("StageSeparator").classList.add("NoClickButton");
}else{
    document.getElementById("StageSeparator").textContent = `Separate stage: ${globalGameData.Starship?.actualStage??0}`;
    document.getElementById("StageSeparator").classList.remove("NoClickButton");
}
if((globalGameData.Starship?.Stages[globalGameData.Starship?.actualStage??0]?.parachute ?? null) != null){
    const par =globalGameData.Starship.Stages[globalGameData.Starship.actualStage].parachute; 
    const ship = globalGameData.Starship;
    if(par!= null&&ship!= null){
        let targetAtmo = null;
        if(globalGameData.Starship){
            for (const planet of globalGameData.Star.planets){
                if(planet.name === globalGameData.Starship.relatedObject)targetAtmo =planet.atmosphere;
                else if(planet.moons){
                    for (const moon of planet.moons){
                        if(moon.name === globalGameData.Starship.relatedObject)targetAtmo =moon.atmosphere;        
                    }
                }
            }
        }
        if(!isFinite(ship.velocity.modulo())||ship.velocity.modulo()>par.maxShipSpeed){
            document.getElementById("ParachuteButton").textContent = `Impossible to deploy parchute at ${ship.velocity.modulo()} m/s`;
            document.getElementById("ParachuteButton").classList.add("NoClickButton");
        }else if(targetAtmo==null||ship.altitudineRelativa>targetAtmo.maxAltitude||targetAtmo.density<=1e-5){
            document.getElementById("ParachuteButton").textContent = `Impossible to deploy parchute in space`;
            document.getElementById("ParachuteButton").classList.add("NoClickButton");
        } else if(ship.altitudineRelativa > par.maxDeployAltitude){
            document.getElementById("ParachuteButton").textContent = `Impossible to deploy parchute at ${ship.altitudineRelativa/1000} Km altitude`;
            document.getElementById("ParachuteButton").classList.add("NoClickButton");
        } else if(par.cut){
            document.getElementById("ParachuteButton").textContent = " ";
            document.getElementById("ParachuteButton").classList.add("NoClickButton");
        } else{
            if(par.openingPercent>=100){
                document.getElementById("ParachuteButton").textContent = `Cut Parchute`;
                document.getElementById("ParachuteButton").classList.remove("NoClickButton");
            }else{
                document.getElementById("ParachuteButton").textContent = `Deploy Parachute`;
                document.getElementById("ParachuteButton").classList.remove("NoClickButton");
            }
        }
    }
}else{
    document.getElementById("ParachuteButton").textContent = " ";
    document.getElementById("ParachuteButton").classList.add("NoClickButton");
}
let currentStageIndex = 1;
let currentTempStage = new Stage();
function aggiornaEditor() {
    if(!globalGameData.Starship) return;
    const stages = globalGameData.Starship.Stages;
    const container = document.getElementById("stageEditorContainer");
    const index = currentStageIndex;
    if (!stages[index]) return;
    container.innerHTML = ""; 
    container.appendChild(generaEditorStage(currentTempStage, index));
    document.getElementById("stageTitle").textContent = `Stage ${index}`;
}
document.getElementById("prevStageBtn").onclick = () => {
    if (currentStageIndex > 1) {
        currentStageIndex--;
        currentTempStage = (globalGameData.Starship?.Stages[currentStageIndex]?.clone()??new Stage());
        aggiornaEditor();
    }
};
document.getElementById("nextStageBtn").onclick = () => {
    if (currentStageIndex < Object.keys(globalGameData.Starship.Stages).length) {
        currentStageIndex++;
        currentTempStage = (globalGameData.Starship?.Stages[currentStageIndex]?.clone()??new Stage());
        aggiornaEditor();
    }
};
document.getElementById("saveStageChanges").onclick = () => {
    let isShipOnAStarbase = false;
    if (globalGameData.Starship&&globalGameData.Starship.ferma) {
        for (const planet of globalGameData.Star.planets){
            if(planet.name === globalGameData.Starship.relatedObject&&planet.spacebase) isShipOnAStarbase = true;
            else if(planet.moons){
                for (const moon of planet.moons){
                    if(moon.name === globalGameData.Starship.relatedObject&&moon.spacebase) isShipOnAStarbase = true;
                }
            }
        }
    }
    if(isShipOnAStarbase){
        salvaEditorCorrente(true);
        currentTempStage = (globalGameData.Starship?.Stages[currentStageIndex]?.clone()??new Stage());
        aggiornaEditor();
    }
};
document.getElementById("addNewStage").onclick = () => {
    if (globalGameData.Starship&&globalGameData.Starship.ferma) {
        let isShipOnAStarbase = false;
        for (const planet of globalGameData.Star.planets){
            if(planet.name === globalGameData.Starship.relatedObject&&planet.spacebase) isShipOnAStarbase = true;
            else if(planet.moons){
                for (const moon of planet.moons){
                    if(moon.name === globalGameData.Starship.relatedObject&&moon.spacebase) isShipOnAStarbase = true;
                }
            }
        }
        if(globalGameData.Starship.ferma&&(globalGameData.Starship.TypeRelObj=="planet"||globalGameData.Starship.TypeRelObj=="moon")&&isShipOnAStarbase){
            globalGameData.Starship.Stages[currentStageIndex] = currentTempStage.clone();
        }
        if(isShipOnAStarbase){
            const newIndex = Math.max(...Object.keys(globalGameData.Starship.Stages).map(Number)) + 1;
            currentStageIndex = newIndex;
            currentTempStage = new Stage();
            aggiornaEditor();           
        }
    }
};
document.getElementById("deleteStage").onclick = () => {
    let isShipOnAStarbase = false;
    if (globalGameData.Starship&&globalGameData.Starship.ferma) {
        for (const planet of globalGameData.Star.planets){
            if(planet.name === globalGameData.Starship.relatedObject&&planet.spacebase) isShipOnAStarbase = true;
            else if(planet.moons){
                for (const moon of planet.moons){
                    if(moon.name === globalGameData.Starship.relatedObject&&moon.spacebase) isShipOnAStarbase = true;
                }
            }
        }
    }
    if(isShipOnAStarbase){
        const numStadi = Object.keys(globalGameData.Starship.Stages).length;
        if (numStadi <= 1) return alert("Almeno uno stage deve restare!");
        delete globalGameData.Starship.Stages[currentStageIndex];
        const vecchi = Object.entries(globalGameData.Starship.Stages) .sort((a, b) => parseInt(a[0]) - parseInt(b[0])).map(e => e[1]);
        const nuovi = {};
        for (let i = 0; i < vecchi.length; i++) {
            nuovi[i + 1] = vecchi[i];
        }
        globalGameData.Starship.Stages = nuovi;
        currentStageIndex = Math.min(currentStageIndex, Object.keys(nuovi).length);
        currentTempStage = (globalGameData.Starship?.Stages[currentStageIndex]?.clone()??new Stage());
        aggiornaEditor();
    }
};
document.getElementById("moveStageUp")?.addEventListener("click", () => {
    let isShipOnAStarbase = false;
    if (globalGameData.Starship&&globalGameData.Starship.ferma) {
        for (const planet of globalGameData.Star.planets){
            if(planet.name === globalGameData.Starship.relatedObject&&planet.spacebase) isShipOnAStarbase = true;
            else if(planet.moons){
                for (const moon of planet.moons){
                    if(moon.name === globalGameData.Starship.relatedObject&&moon.spacebase) isShipOnAStarbase = true;
                }
            }
        }
    }
    if(isShipOnAStarbase){
        if (currentStageIndex > 1) {
            swapStages(currentStageIndex, currentStageIndex + 1);
            currentStageIndex++;
            currentTempStage = (globalGameData.Starship?.Stages[currentStageIndex]?.clone()??new Stage());
        }
    }
});
document.getElementById("moveStageDown")?.addEventListener("click", () => {
    let isShipOnAStarbase = false;
    if (globalGameData.Starship&&globalGameData.Starship.ferma) {
        for (const planet of globalGameData.Star.planets){
            if(planet.name === globalGameData.Starship.relatedObject&&planet.spacebase) isShipOnAStarbase = true;
            else if(planet.moons){
                for (const moon of planet.moons){
                    if(moon.name === globalGameData.Starship.relatedObject&&moon.spacebase) isShipOnAStarbase = true;
                }
            }
        }
    }
    if(isShipOnAStarbase){
        const max = Math.max(...Object.keys(globalGameData.Starship.Stages).map(Number));
        if (currentStageIndex < max) {
            swapStages(currentStageIndex, currentStageIndex - 1);
            currentStageIndex--;
            currentTempStage = (globalGameData.Starship?.Stages[currentStageIndex]?.clone()??new Stage());
        }
    }
});
document.getElementById("StarshipSettingsMenu").onclick = () => {
    if(!globalGameData.Starship){
        alert("You need a starship to modify it.");
        return;
    }
    document.getElementById("StarshipPanel").classList.remove("hidden");
    currentTempStage = (globalGameData.Starship?.Stages[currentStageIndex]?.clone()??new Stage());
    aggiornaEditor();
};
document.getElementById("chiudiImpostazioniAstronave").onclick = () => {
    document.getElementById("StarshipPanel").classList.add("hidden");
    currentTempStage = null;
};
function swapStages(a, b) {
    const tmp = globalGameData.Starship.Stages[a];
    globalGameData.Starship.Stages[a] = globalGameData.Starship.Stages[b];
    globalGameData.Starship.Stages[b] = tmp;
    aggiornaEditor();
}
function estraiCondizioniDaStruttura(struttura) {
    const entry = hullStructureMap[struttura];
    if (!entry || !Array.isArray(entry.conditions)) return [];
    const condizioni = [];
    const condPattern = /^([^\(]+)\((.*?)\)$/;
    for (const blocco of entry.conditions) {
        const match = blocco.match(condPattern);
        if (!match) continue;
        const component = match[1].trim();
        const rawConds = match[2].trim();
        const condList = rawConds.split(/[:\/]/).map(s => s.trim()).filter(Boolean);
        for (const cond of condList) {
            const pulito = cond.replace(/^\[+/, "").replace(/\]+$/, "").trim();
            if (pulito === "*") {
                condizioni.push({ component, geometry: "*", condition: null });
            } else {
                condizioni.push({ component, geometry: "*", condition: pulito });
            }
        }
        if (condList.length === 0) {
            condizioni.push({ component, geometry: "*", condition: null });
        }
    }
    return condizioni;
}
function estraiCondizioniDaMateriale(materiale) {
    const entry = materialCpMap[materiale];
    if (!entry || !Array.isArray(entry.usable)) return [];
    const condizioni = [];
    const condPattern = /^([\w_]+)\s*([=!<>]+)\s*(.+)$/;
    for (const blocco of entry.usable) {
        const match = blocco.match(/^([^\(]+)\((.*?)\)(?::(.*))?$/);
        if (!match) continue;
        const component = match[1].trim();
        const geometrieBlocchi = match[2];
        const condGlobali = match[3] ?? "";
        const geoRegex = /(?:\*|([\w\s\-³²\^]+))\s*(?:\(\[([^\]]+)\]\))?/g;
        let gmatch;
        while ((gmatch = geoRegex.exec(geometrieBlocchi)) !== null) {
            if(gmatch[1]=="") debugger;
            const geometry = (gmatch[1] ?? "").trim();
            const rawConds = gmatch[2] ?? "";
            const conds = rawConds.split(":").map(s => s.trim()).filter(Boolean);
            for (const cond of conds) {
                if (cond === "*") {
                    condizioni.push({ component, geometry, condition: null });
                } else {
                    condizioni.push({ component, geometry, condition: cond });
                }
            }
            if (conds.length === 0) {
                condizioni.push({ component, geometry, condition: null });
            }
        }
        if (condGlobali && /[<>!=]/.test(condGlobali)) {
            const globalConds = condGlobali.split(/[:\/]/).map(c => c.trim()).filter(Boolean);
            for (const cond of globalConds) {
                condizioni.push({ component, geometry: '*', condition: cond });
            }
        }
    }
    return condizioni;
}
function impostaMassaNelFieldset(fs, valore) {
    const blocco = fs.closest(".stage-editor, .engine-block, .heat-shield-block, .parachute-block");
    if (!blocco) return;
    const inputMassa = blocco.querySelector("input[class*='mass']");
    if (inputMassa && !isNaN(valore)) {
        inputMassa.value = +valore.toFixed(2);
    }
}
function calcolaProprietaStrutturali({ materiale, geometria, altezza, diametro, spessore,fs = null }) {
    const mat = materialCpMap[materiale];
    const geo = hullStructureMap[geometria];
    if (!mat || !geo) return null;
    const h = parseFloat(altezza) || 1;
    const d = parseFloat(diametro) || 1;
    if (isNaN(h) || isNaN(d) || h <= 0 || d <= 0) return null;
    const slancio = h / d;
    const cdGeo = geo.cd ?? 1;
    const rugosita = 1 + (mat.Cd ?? 0.1);
    const slancioFactor = 1 + Math.max(0, (slancio - 1)) * 0.05;
    const Cd = cdGeo * rugosita * slancioFactor;
    const t = spessore * 0.015;
    const sideArea = Math.PI * d * h;
    const baseArea = Math.PI * (d / 2) ** 2;
    const totalArea = sideArea + 2 * baseArea;
    const volumeStruttura = totalArea * t;
    const massaTermica = volumeStruttura * mat.density * mat.cp;
    const massaStruttura = volumeStruttura * mat.density;
    impostaMassaNelFieldset(fs, massaStruttura);
    const dissipazione = (mat["ε"] ?? 0.5) * totalArea;
    const capacitaTermica = massaTermica * mat.cp;
    const stress = dissipazione / capacitaTermica;
    let Tmax = (mat.FT ?? 2000) - (1 - stress * cdGeo)*(hullStructureMap[geometria]?.ηt??0.90);
    if(!isFinite(Tmax)|isNaN(Tmax)) {
        const capacitaTermica = massaTermica * mat.cp;
        const stress = dissipazione / capacitaTermica;
        Tmax = (mat.FT ?? 2000) - (1 - stress * cdGeo);
        if(!isFinite(Tmax)|isNaN(Tmax)) {
            Tmax = 0
        }
    }
    const snervamento = 1 - Math.min(0.8, h / (d * 6));
    const fattoreStrutturale = 1 + (t / d) * 10
    const GLimit = (mat.GL ?? 10) * (geo.r ?? 1) * snervamento * fattoreStrutturale*(hullStructureMap[geometria]?.ηg??0.90);
    return { Cd: +Cd.toFixed(3), Tmax: +Tmax.toFixed(1),GLimit: +GLimit.toFixed(2)};
}
function generaEditorStage(stage, index) {
    const container = document.createElement("div");
    container.classList.add("stage-editor");
    container.dataset.stageIndex = currentStageIndex;
    const geometrieConsentitePer = comp => Object.entries(hullStructureMap).filter(([_, v]) => v.usable?.includes(comp)).map(([k]) => k);
    const createLabeledInput = (labelText, value, className, min = null, max = null, readonly = false) => {
        const wrap = document.createElement("div");
        wrap.className = "form-row";
        const label = document.createElement("label");
        label.textContent = labelText;
        const input = document.createElement("input");
        input.required = true;
        input.step = "any";
        input.type = "number";
        input.addEventListener("input", () => {
            const max = parseFloat(input.max);
            const min = parseFloat(input.min);
            let val = parseFloat(input.value);
            if (isNaN(val)) return;
            if (!isNaN(max) && val > max) input.value = max;
            if (!isNaN(min) && val < min) input.value = min;
        });
        input.readOnly = readonly;
        if(readonly) input.dataset.autoCalc = "true";
        input.value = value ?? "";
        input.className = className;
        if (min !== null) input.min = min;
        if (max !== null) input.max = max;
        wrap.append(label, input);
        return wrap;
    };
    function aggiornaLimiteQuantitaCarburante(inputFuel) {
        const container = inputFuel.closest(".stage-editor");
        if (!container) return;
        const tipo = container.querySelector(".select-fuel-type")?.value || "";
        const h = parseFloat(container.querySelector(".stage-height")?.value || "0");
        const d = parseFloat(container.querySelector(".stage-diameter")?.value || "0");
        const s = parseFloat(container.querySelector(".stage-spessore")?.value || "0");
        const kind = container.querySelector(".stage-kind")?.value || "";
        if (tipo === "" || isNaN(h) || isNaN(d) || h <= 0 || d <= 0|| isNaN(s) || s <= 0 || s <= 0) {
            inputFuel.max = 0;
            return;
        }
        const rEst = d / 2;
        const rInt = rEst -  d * (s / 100);
        if (rInt <= 0) {
            inputFuel.max = 0;
            return;
        }
        const area = hullStructureMap[kind]?.a ?? 1;
        const volumeMax = (Math.PI * (rInt ** 2) * h)*(hullStructureMap[kind]?.η??0.90) * area;
        inputFuel.max = volumeMax.toFixed(3);
        const val = parseFloat(inputFuel.value);
        if (!isNaN(val) && val > volumeMax) {
            inputFuel.value = volumeMax.toFixed(3);
        }
    }
    const createSelect = (labelText, options, selected, className) => {
        const wrap = document.createElement("div");
        wrap.className = "form-row";
        const label = document.createElement("label");
        label.textContent = labelText;
        const sel = document.createElement("select");
        sel.className = className;
        options.forEach(optVal => {
            const o = document.createElement("option");
            o.value = optVal;
            o.textContent = optVal;
            if (optVal === selected) o.selected = true;
            sel.append(o);});
        wrap.append(label, sel);
        return wrap;
    };
    function aggiornaCalcoloSuperficie(fs) {
        const prefix = fs.dataset.prefix;
        const blocco = fs.closest(".stage-editor, .engine-block, .heat-shield-block, .parachute-block");
        const spessore = parseFloat(fs.querySelector(`.${prefix}-spessore`)?.value || "0");
        const materiale = fs.querySelector(`.${prefix}-material`)?.value || "";
        const geometria = fs.querySelector(`.${prefix}-kind`)?.value || "";
        const h = parseFloat(fs.querySelector(`.${prefix}-height`)?.value || "0");
        const d = parseFloat(fs.querySelector(`.${prefix}-diameter`)?.value || "0");
        const props = calcolaProprietaStrutturali({ materiale, geometria, altezza: h, diametro: d ,spessore:spessore,fs:fs});
        if (props) {
            const cd = fs.querySelector(`.${prefix}-Cd`);
            const tmax = fs.querySelector(`.${prefix}-tmax`);
            const g = fs.querySelector(`.${prefix}-glimit`);
            if (cd) cd.value = props.Cd;
            if (tmax) tmax.value = props.Tmax;
            if (g) g.value = props.GLimit;
        }
    }
    function createSurfaceEditor(surface, prefix,kind ="",text = "Surface") {
        const fs = document.createElement("fieldset");
        fs.className = prefix + "-surface-block";
        const legend = document.createElement("legend");
        legend.textContent = text;
        fs.dataset.kind = kind;
        fs.dataset.prefix = prefix;
        fs.append(legend);
        fs.appendChild(createLabeledInput("Height [m]", surface.height, `${prefix}-height`, 0, 50));
        fs.appendChild(createLabeledInput("Diameter [m]", surface.diameter, `${prefix}-diameter`, 0, 12));
        fs.appendChild(createLabeledInput("Hull Thickness [%]", surface.spessorePercentuale, `${prefix}-spessore`, 0.1, 100));
        const geometrieValide = geometrieConsentitePer(kind);
        fs.appendChild(createSelect("Geometry",  geometrieValide, surface.kind, `${prefix}-kind`));
        fs.appendChild(createLabeledInput("Drag Coefficient", surface.Cd, `${prefix}-Cd`, 0, 10,true));
        fs.appendChild(createLabeledInput("Max Temperature [K]", surface.maxTemperature, `${prefix}-tmax`, 0, 1e5,true));
        fs.appendChild(createSelect("Material", Object.keys(materialCpMap),surface.material,`${prefix}-material`));
        fs.appendChild(createLabeledInput("G-Limit", surface.GLimit, `${prefix}-glimit`, 0, 1000,true));
        aggiornaCalcoloSuperficie(fs);
        fs.querySelectorAll("input").forEach(el => {
            el.addEventListener("input", () => aggiornaCalcoloSuperficie(fs));
        });
        fs.querySelectorAll("select").forEach(el => {
            el.addEventListener("change", () => aggiornaCalcoloSuperficie(fs));
        });
        return fs;
    }
    function estraiDatiSuperficie(fs) {
        if (!(fs instanceof HTMLElement)) return {};
        const prefix = fs.dataset.prefix || "";
        const kind = fs.dataset.kind || "";
        const blocco = fs.closest(".stage-editor, .parachute-block, .engine-block, .heat-shield-block");
        let bloccoFuel = fs.closest(".stage-editor");
        if(!bloccoFuel){
            bloccoFuel = container;
        }
        const getVal = (cls, root = fs) => {
            const el = root?.querySelector(`.${prefix}-${cls}`);
            return el ? parseFloat(el.value) : NaN;
        };
        const dati = {
            component: kind,
            prefix,
            geometry: fs.querySelector(`.${prefix}-kind`)?.value || "",
            h: getVal("height"),
            d: getVal("diameter"),
            GLimit: getVal("glimit"),
            Tmax: getVal("tmax"),
            Cd: getVal("Cd"),
            material: fs.querySelector(`.${prefix}-material`)?.value || "",
            m: NaN,
            classeCarburante: "",
            massFuel: NaN,
            tipoCarburante: "",
            numParachutes: NaN,
            spessorePercentuale : getVal("spessore"),
            N: NaN,
            areaParachute: NaN,
            materialeParachute: "",
            geometryParachute: "",
            maxParSpeed: NaN,
            maxParHeigh: NaN,
        };
        if (blocco) {
            if(bloccoFuel){
                dati.massFuel = parseFloat(bloccoFuel.querySelector(".input-fuel")?.value || NaN);
                dati.tipoCarburante = bloccoFuel.querySelector(".select-fuel-type")?.value || "";
                dati.classeCarburante =  fuelMap[dati.tipoCarburante]?.class??"";
            }
            if (kind === "Parachute") {
                dati.numParachutes = parseFloat(blocco.querySelector(".para-num")?.value || NaN);
                dati.areaParachute = parseFloat(blocco.querySelector(".para-area")?.value || NaN);
                dati.materialeParachute = blocco.querySelector(".para-material")?.value
                dati.geometryParachute = blocco.querySelector(".para-kind")?.value;
                dati.maxParHeigh = parseFloat(blocco.querySelector(".para-alt")?.value || NaN);
                dati.maxParSpeed = parseFloat(blocco.querySelector(".para-vmax")?.value || NaN);
                dati.m = parseFloat(blocco.querySelector(".para-mass")?.value || NaN);
            }
            if (kind === "Engine") {
                dati.N = parseFloat(blocco.querySelector(".engine-thrust")?.value || NaN);
                dati.m = parseFloat(blocco.querySelector(".engine-mass")?.value || NaN);
            }
            if(kind === "Heat Shield"){
                dati.m = parseFloat(blocco.querySelector(".shield-mass")?.value || NaN);
            }
            if(isNaN(dati.m)) dati.m = parseFloat(blocco.querySelector(".input-mass")?.value || NaN); 
        }
        return dati;
    }
    function AggiornaERicalcolaMateriali(dati) {
        const materialTrueMap = [];
        for (const materiale in materialCpMap) {
            const condizioni = estraiCondizioniDaMateriale(materiale);
            let materialeCompatibile = false;
            const condizioniFiltrate = condizioni.filter(c => c.component === dati.component &&(c.geometry === dati.geometry || c.geometry === "*"));
            if (condizioniFiltrate.length === 0) continue;
            const gruppi = {};
            for (const cond of condizioniFiltrate) {
                if (!gruppi[cond.geometry]) gruppi[cond.geometry] = [];
                gruppi[cond.geometry].push(cond);
            }
            for (const conds of Object.values(gruppi)) {
                const tutteValide = conds.every(({ condition }) => {
                if (!condition) return true;
                const match = condition.match(/^([\w_]+)\s*([=!<>]+)\s*(.+)$/);
                if (!match) return false;
                const [, varName, op, val] = match;
                let attuale, atteso;
                const parsedAttuale = parseFloat(dati[varName]);
                const parsedAtteso = parseFloat(val);
                if (isNaN(parsedAttuale) || isNaN(parsedAtteso)) {
                    attuale = String(dati[varName]).trim();
                    atteso = val.trim().replace(/^['"]|['"]$/g, '');
                } else {
                    attuale = parsedAttuale;
                    atteso = parsedAtteso;
                }
                switch (op) {
                    case "<":  return attuale < atteso;
                    case "<=": return attuale <= atteso;
                    case ">":  return attuale > atteso;
                    case ">=": return attuale >= atteso;
                    case "=":  return attuale === atteso;
                    case "!=":  return attuale !== atteso;
                    default:   return false;
                }});
                if (tutteValide) {
                    materialeCompatibile = true;
                    break;
                }
            }
            if (materialeCompatibile) {
                materialTrueMap.push(materiale);
            }
        }
        return materialTrueMap;
    }
    function AggiornaERicalcolaStrutture(dati) {
        const materialTrueMap = [];
        for (const materiale in hullStructureMap) {
            const condizioni = estraiCondizioniDaStruttura(materiale);
            let materialeCompatibile = false;
            const condizioniFiltrate = condizioni.filter(c => c.component === dati.component &&(c.geometry === dati.geometry || c.geometry === "*"));
            if (condizioniFiltrate.length === 0) continue;
            const gruppi = {};
            for (const cond of condizioniFiltrate) {
                if (!gruppi[cond.geometry]) gruppi[cond.geometry] = [];
                gruppi[cond.geometry].push(cond);
            }
            for (const conds of Object.values(gruppi)) {
                const tutteValide = conds.every(({ condition }) => {
                if (!condition) return true;
                const match = condition.match(/^([\w_]+)\s*([=!<>]+)\s*(.+)$/);
                if (!match) return false;
                const [, varName, op, val] = match;
                let attuale, atteso;
                const parsedAttuale = parseFloat(dati[varName]);
                const parsedAtteso = parseFloat(val);
                if (isNaN(parsedAttuale) || isNaN(parsedAtteso)) {
                    attuale = String(dati[varName]).trim();
                    atteso = val.trim().replace(/^['"]|['"]$/g, '');
                } else {
                    attuale = parsedAttuale;
                    atteso = parsedAtteso;
                }
                switch (op) {
                    case "<":  return attuale < atteso;
                    case "<=": return attuale <= atteso;
                    case ">":  return attuale > atteso;
                    case ">=": return attuale >= atteso;
                    case "=":  return attuale === atteso;
                    case "!=":  return attuale !== atteso;
                    default:   return false;
                }});
                if (tutteValide) {
                    materialeCompatibile = true;
                    break;
                }
            }
            if (materialeCompatibile) {
                materialTrueMap.push(materiale);
            }
        }
        return materialTrueMap;
    }
    function AggiornaMaterialiAssegnabili(fs) {
        if (!(fs instanceof HTMLElement)) return;
        const selectMat = fs.querySelector(`.${fs.dataset.prefix}-material`);
        if (!selectMat) return;
        const aggiorna = () => {
            const dati = estraiDatiSuperficie(fs);
            const materialiCompatibili = AggiornaERicalcolaMateriali(dati);
            const materialeAttuale = selectMat.value;
            selectMat.innerHTML = "";
            for (const nome of Object.keys(materialCpMap)) {
                const opt = document.createElement("option");
                opt.value = nome;
                opt.textContent = nome;
                if (!materialiCompatibili.includes(nome)) opt.disabled = true;
                if (nome === materialeAttuale) opt.selected = true;
                selectMat.appendChild(opt);
            }
            if (!materialiCompatibili.includes(materialeAttuale)) {
                const warn = document.createElement("option");
                warn.textContent = "⚠ Unsuitable Material!";
                warn.disabled = true;
                warn.selected = true;
                selectMat.appendChild(warn);
            }
        };
        aggiorna();
        const campi = fs.querySelectorAll("input, select");
        campi.forEach(el => {
            el.addEventListener("input", aggiorna);
        });
    }
    function AggiornaStruttureAssegnabili(fs) {
        if (!(fs instanceof HTMLElement)) return;
        const selectMat = fs.querySelector(`.${fs.dataset.prefix}-kind`);
        if (!selectMat) return;
        const aggiorna = () => {
            const dati = estraiDatiSuperficie(fs);
            const materialiCompatibili = AggiornaERicalcolaStrutture(dati);
            const materialeAttuale = selectMat.value;
            selectMat.innerHTML = "";
            for (const nome of Object.keys(hullStructureMap)) {
                const opt = document.createElement("option");
                opt.value = nome;
                opt.textContent = nome;
                if (!materialiCompatibili.includes(nome)) opt.disabled = true;
                if (nome === materialeAttuale) opt.selected = true;
                selectMat.appendChild(opt);
            }
            if (!materialiCompatibili.includes(materialeAttuale)) {
                const warn = document.createElement("option");
                warn.textContent = "⚠ Unsuitable Structure!";
                warn.disabled = true;
                warn.selected = true;
                selectMat.appendChild(warn);
            }
        };
        aggiorna();
        const campi = fs.querySelectorAll("input, select");
        campi.forEach(el => {
            el.addEventListener("input", aggiorna);
        });
    }
    function AggiornaStruttureAssegnabiliCarburante(fs) {
        if (!(fs instanceof HTMLElement)) return;
        const selectMat = fs.querySelector(`.${fs.dataset.prefix}-kind`);
        if (!selectMat) return;
        const aggiorna = () => {
            const dati = estraiDatiSuperficie(fs);
            const materialiCompatibili = AggiornaERicalcolaStrutture(dati);
            const materialeAttuale = selectMat.value;
            selectMat.innerHTML = "";
            for (const nome of Object.keys(hullStructureMap)) {
                const opt = document.createElement("option");
                opt.value = nome;
                opt.textContent = nome;
                if (!materialiCompatibili.includes(nome)) opt.disabled = true;
                if (nome === materialeAttuale) opt.selected = true;
                selectMat.appendChild(opt);
            }
            if (!materialiCompatibili.includes(materialeAttuale)) {
                const warn = document.createElement("option");
                warn.textContent = "⚠ Unsuitable Structure!";
                warn.disabled = true;
                warn.selected = true;
                selectMat.appendChild(warn);
            }
        };
        aggiorna();
    }
    function ricalcolaMassaAltitudineVelocitaParacadute(pBlock){
        const getNumero = (selector, root = editor) => {
            const el = root.querySelector(selector);
            if (!el) return null;
            const val = parseFloat(el.value);
            return isNaN(val) ? null : val;};
        function isValidValue(value){
            return (!isNaN(value)&&isFinite(value)&&value!=null&&value>0&&value<1e10);
        }
        let sNumPara = getNumero(".para-num", pBlock);
        let sAreaPara = getNumero(".para-area", pBlock);
        const sMaterialPara = pBlock.querySelector(".para-material").value;
        const sGeometryPara = pBlock.querySelector(".para-kind").value;
        const paraStructuralAltezza = getNumero(".para-height", pBlock)
        const paraStructuralDiametro = getNumero(".para-diameter", pBlock)
        const paraStructuralSpessore = getNumero(".para-spessore", pBlock)
        const paraBlocco = pBlock.querySelector(".para-surface-block")
        const paraStructuralMaterial = paraBlocco.querySelector(".para-material").value;
        const paraStructuralGeometry = paraBlocco.querySelector(".para-kind").value;
        if(isValidValue(paraStructuralSpessore)&&isValidValue(paraStructuralDiametro)&&isValidValue(paraStructuralAltezza)&&isValidValue(sNumPara)&&isValidValue(sAreaPara)&&
        sMaterialPara!=null&&sMaterialPara!=""&&sGeometryPara!=null&&sGeometryPara!=""&&paraStructuralGeometry!=null&&
        paraStructuralGeometry!=""&&paraStructuralMaterial!=null&&paraStructuralMaterial!=""&&paraStructuralMaterial!="⚠ Unsuitable Material!"&&paraStructuralGeometry!="⚠ Unsuitable Structure!"){
            let targetAtmosphere = null;
            if(globalGameData.Starship){
                var find = false;
                for (const planet of globalGameData.Star.planets){
                    if(planet.name === globalGameData.Starship.relatedObject) targetAtmosphere =planet.atmosphere;
                    else if(planet.moons){
                        for (const moon of planet.moons){
                            if(moon.name === globalGameData.Starship.relatedObject) targetAtmosphere =moon.atmosphere;         
                        }
                    }
                }
            }
            const rIn = paraStructuralDiametro / 2 - (paraStructuralSpessore*(paraStructuralDiametro/100));
            const hIn = paraStructuralAltezza - 2 * (paraStructuralSpessore*(paraStructuralDiametro/100));
            const volumeCilindrico = Math.PI * rIn ** 2 * hIn;
            const coeffGeometrico = hullStructureMap[paraStructuralGeometry]?.a ?? 1;
            const efficienzaStivaggio = materialCpMap[paraStructuralMaterial]?.η ?? 0.5;
            const volumeEffettivo = volumeCilindrico * coeffGeometrico * efficienzaStivaggio;
            const coeffForma = parastructureMap[sGeometryPara]?.a ?? 1;
            const areaMaxTessuto = ((volumeEffettivo / coeffForma))*(hullStructureMap[sGeometryPara]?.η??0.90);
            if(sAreaPara*sNumPara>areaMaxTessuto){
                pBlock.querySelector(".para-area").value = areaMaxTessuto/sNumPara;
                sAreaPara = areaMaxTessuto/sNumPara;
            }
            let parMass = ((sNumPara * sAreaPara) * (paraMaterialsMap[sMaterialPara]?.m ?? 0))*(parastructureMap[sGeometryPara]?.a ?? 0);
            const massaStruttura = volumeEffettivo * materialCpMap[paraStructuralMaterial]?.density;
            parMass+=massaStruttura;
            const CdPar = ((paraMaterialsMap[sMaterialPara]?.cd ?? 0)*(parastructureMap[sGeometryPara]?.cd ?? 0))* (1 - 0.12 * (sNumPara-1))
            pBlock.querySelector(".para-mass").value = parMass;
            const mat = paraMaterialsMap[sMaterialPara];
            const str = parastructureMap[sGeometryPara];
            const sigmaEff = mat.r * str.r;
            const PaMax    = sigmaEff / str.a; 
            if(!targetAtmosphere) targetAtmosphere = new Atmosphere(1.225,8500,120000,28.97,"#87ceebAA",{N2 : 78.08,O2 : 20.95,Ar : 0.93,H2O : 0.158,CO2 : 0.042},0.36);
            let rho = targetAtmosphere.density * Math.exp(-0 / targetAtmosphere.scaleHeight);
            const hMaxDeploy = -targetAtmosphere.scaleHeight * Math.log(0.1 / targetAtmosphere.density);
            pBlock.querySelector(".para-alt").value = hMaxDeploy;
            const vMaxSafe = Math.sqrt((2 * PaMax) / (rho * CdPar));
            pBlock.querySelector(".para-vmax").value = vMaxSafe;
        }else{
            pBlock.querySelector(".para-mass").value = 0;
            pBlock.querySelector(".para-alt").value = 0;
            pBlock.querySelector(".para-vmax").value = 0;
        }
    }
    function ricalcolaSpintaMassimaMotori(engBlock,fuelKind){
        const getNumero = (selector, root = editor) => {
            const el = root.querySelector(selector);
            if (!el) return null;
            const val = parseFloat(el.value);
            return isNaN(val) ? null : val;};
        function isValidValue(value){
            return (!isNaN(value)&&isFinite(value)&&value!=null&&value>0&&value<1e10);
        }
        let sSpintaMotore = getNumero(".engine-thrust", engBlock);
        const engInnerBlock = engBlock.querySelector(".engine-surface-block")
        const fuelEngineType = fuelKind.value;
        const EngStructuralMaterial = engInnerBlock.querySelector(".engine-material").value;
        const EngStructuralGeometry = engInnerBlock.querySelector(".engine-kind").value;
        const EngStructuralAltezza = getNumero(".engine-height", engInnerBlock)
        const EngStructuralDiametro = getNumero(".engine-diameter", engInnerBlock)
        const EngStructuralSpessore = getNumero(".engine-spessore", engInnerBlock)
        if(isValidValue(EngStructuralAltezza)&&isValidValue(EngStructuralDiametro)&&isValidValue(EngStructuralSpessore)&&
        EngStructuralMaterial!=""&&EngStructuralMaterial!=null&&EngStructuralMaterial!=""&&EngStructuralMaterial!=null
        &&EngStructuralGeometry!=""&&EngStructuralGeometry!=null&&fuelEngineType!=""&&fuelEngineType!=null&&EngStructuralMaterial!="⚠ Unsuitable Material!"&&EngStructuralGeometry!="⚠ Unsuitable Structure!"){
            const rIn = EngStructuralAltezza / 2 - (EngStructuralAltezza*(EngStructuralSpessore/100));
            const hIn = EngStructuralAltezza - 2 * (EngStructuralAltezza*(EngStructuralSpessore/100));
            const volumeCilindrico = Math.PI * rIn ** 2 * hIn;
            const struttura = hullStructureMap[EngStructuralGeometry] ?? {};
            const coeffGeometrico = struttura.a ?? 1.0;
            const etaStrutturale = struttura.ηg ?? struttura.η ?? 0.8;
            const materialeProps = materialCpMap[EngStructuralMaterial] ?? {};
            const densitaSpinta = materialCpMap.vtf ?? 380000;
            const volumeUtile = volumeCilindrico * coeffGeometrico * etaStrutturale;
            const thrustMassima = volumeUtile * densitaSpinta;
            if(sSpintaMotore>thrustMassima){
                sSpintaMotore = thrustMassima;
                engBlock.querySelector(".engine-thrust").value = thrustMassima;
            }
        }else engBlock.querySelector(".engine-thrust").value = 0;
    }
    container.appendChild(document.createElement("hr"));
    container.appendChild(document.createTextNode(`Stage ${index}`));
    let massaStadio = stage.mass;
    if((stage.quantitaCarburante>0)&&(stage.tipoCarburante!="")&&(stage.tipoCarburante!=null)) massaStadio-=(stage.quantitaCarburante * (fuelMap[stage.tipoCarburante]?.density??0));
    if(stage.Engine!=null) massaStadio-=stage.Engine.mass;
    if(stage.heatShield!=null) massaStadio-=stage.heatShield.mass;
    if(stage.parachute!=null) massaStadio-=stage.parachute.mass;
    container.appendChild(createLabeledInput("Base Mass [Kg]", massaStadio, "input-mass", 0, 1e8,true));
    const inputFuel= createLabeledInput("Fuel Quantity [m³]", stage.quantitaCarburante, "input-fuel", 0, 1e6,false)
    const inputEl = inputFuel.querySelector("input");
    inputEl.addEventListener("input", () => aggiornaLimiteQuantitaCarburante(inputEl));
    container.appendChild(inputFuel);
    const fuelselect = createSelect("Fuel Kind",Object.keys(fuelMap),stage.tipoCarburante,"select-fuel-type")
    container.appendChild(fuelselect);
    const fss1 = createSurfaceEditor(stage.surface, "stage","Stage");
    container.appendChild(fss1);
    fuelselect.addEventListener("change", () => AggiornaStruttureAssegnabiliCarburante(fss1));
    AggiornaMaterialiAssegnabili(fss1);
    AggiornaStruttureAssegnabili(fss1);
    container.querySelector(".stage-height")?.addEventListener("input", () =>
        aggiornaLimiteQuantitaCarburante(container.querySelector(".input-fuel"))
    );
    container.querySelector(".stage-spessore")?.addEventListener("input", () =>
        aggiornaLimiteQuantitaCarburante(container.querySelector(".input-fuel"))
    );
    container.querySelector(".stage-diameter")?.addEventListener("input", () =>
        aggiornaLimiteQuantitaCarburante(container.querySelector(".input-fuel"))
    );
    container.querySelector(".select-fuel-type")?.addEventListener("change", () =>
        aggiornaLimiteQuantitaCarburante(container.querySelector(".input-fuel"))
    );
    const engFs = document.createElement("fieldset");
    engFs.className = "engine-block";
    const engLeg = document.createElement("legend");
    engLeg.textContent = "Engine";
    engFs.append(engLeg);
    if (stage.Engine) {
        engFs.appendChild(createLabeledInput("Engine Mass [kg]", stage.Engine.mass, "engine-mass", 0, 1e6,true));
        const engNLabel = createLabeledInput("Engine Thrust [N]", stage.Engine.Thrust, "engine-thrust", 0, 1e9)
        engFs.appendChild(engNLabel);
        engNLabel.addEventListener("input", () => { ricalcolaSpintaMassimaMotori(container.querySelector(".engine-block"),container.querySelector(".select-fuel-type"));});
        const fss2 = createSurfaceEditor(stage.Engine.surface, "engine","Engine","Engine Surface")
        engFs.appendChild(fss2);
        fss2.querySelector(".engine-height").addEventListener("input", () => { ricalcolaSpintaMassimaMotori(container.querySelector(".engine-block"),container.querySelector(".select-fuel-type"));});
        fss2.querySelector(".engine-diameter").addEventListener("input", () => { ricalcolaSpintaMassimaMotori(container.querySelector(".engine-block"),container.querySelector(".select-fuel-type"));});
        fss2.querySelector(".engine-spessore").addEventListener("input", () => { ricalcolaSpintaMassimaMotori(container.querySelector(".engine-block"),container.querySelector(".select-fuel-type"));});
        fss2.querySelector(".engine-material").addEventListener("change", () => { ricalcolaSpintaMassimaMotori(container.querySelector(".engine-block"),container.querySelector(".select-fuel-type"));});
        fss2.querySelector(".engine-kind").addEventListener("change", () => { ricalcolaSpintaMassimaMotori(container.querySelector(".engine-block"),container.querySelector(".select-fuel-type"));});
        fuelselect.addEventListener("change", () => AggiornaStruttureAssegnabiliCarburante(fss2));        
        AggiornaMaterialiAssegnabili(fss2);
        AggiornaStruttureAssegnabili(fss2);
        const btnRmE = document.createElement("button");
        btnRmE.textContent = "❌ Remove Engine";
        btnRmE.className = "rimuovi-motore";
        btnRmE.onclick = () => {
            stage.Engine = null;
            salvaEditorCorrente();
            aggiornaEditor();};
        engFs.appendChild(btnRmE);
    } else {
        const btnAddE = document.createElement("button");
        btnAddE.textContent = "➕ Add Engine";
        btnAddE.onclick = () => {
        salvaEditorCorrente();
        stage.Engine = new Engine();
        aggiornaEditor();};
        engFs.append(btnAddE);
    }
    container.appendChild(engFs);
    const hsFs = document.createElement("fieldset");
    hsFs.className = "heat-shield-block";
    const hsLeg = document.createElement("legend");
    hsLeg.textContent = "Heat Shield";
    hsFs.append(hsLeg);
    if (stage.heatShield) {
        hsFs.appendChild(createLabeledInput("Massa [kg]", stage.heatShield.mass, "shield-mass", 0, 1e6,true));
        const fss3 = createSurfaceEditor(stage.heatShield.surface, "shield","Heat Shield","Heat Shield Surface");
        hsFs.appendChild(fss3);
        fuelselect.addEventListener("change", () => AggiornaStruttureAssegnabiliCarburante(fss3));        
        AggiornaMaterialiAssegnabili(fss3);
        AggiornaStruttureAssegnabili(fss3);
        const btnRmH = document.createElement("button");
        btnRmH.textContent = "❌ Remove Heat Shield";
        btnRmH.className = "rimuovi-shield";
        btnRmH.onclick = () => {
            stage.heatShield = null;
            salvaEditorCorrente(false);
            aggiornaEditor();};
        hsFs.appendChild(btnRmH);
    } else {
        const btnAddH = document.createElement("button");
        btnAddH.textContent = "➕ Add Heat Shield";
        btnAddH.onclick = () => {
            salvaEditorCorrente();
            stage.heatShield = new HeatShield();
            aggiornaEditor(); };
        hsFs.append(btnAddH);
    }
    let paraReload = true;
    container.appendChild(hsFs);
    const pFs = document.createElement("fieldset");
    pFs.className = "parachute-block";
    const pLeg = document.createElement("legend");
    pLeg.textContent = "Parachute";
    pFs.append(pLeg);
    if (stage.parachute) {
        pFs.appendChild(createLabeledInput("Base Mass [kg]", stage.parachute.mass, "para-mass", 0, 1e6,true));
        const NumParLabel = createLabeledInput("Parachutes Number", stage.parachute.numParachutes, "para-num", 0, 100);
        pFs.appendChild(NumParLabel);
        NumParLabel.addEventListener("input", () => { ricalcolaMassaAltitudineVelocitaParacadute(container.querySelector(".parachute-block"));});
        const parAreaLabel = createLabeledInput("Parachute Area [m²]", stage.parachute.areaParachute, "para-area", 0, 1e5);
        pFs.appendChild(parAreaLabel);
        parAreaLabel.addEventListener("input", () => { ricalcolaMassaAltitudineVelocitaParacadute(container.querySelector(".parachute-block"));});
        const ParMatLabel = createSelect("Parachute Material",Object.keys(paraMaterialsMap),stage.parachute.parachuteMaterial,"para-material")
        pFs.appendChild(ParMatLabel);
        ParMatLabel.addEventListener("change", () => { ricalcolaMassaAltitudineVelocitaParacadute(container.querySelector(".parachute-block"));});
        const ParGeoLabel = createSelect("Parachute Geometry", Object.keys(parastructureMap),stage.parachute.parachuteGeometry,"para-kind" )
        pFs.appendChild(ParGeoLabel);
        ParGeoLabel.addEventListener("change", () => { ricalcolaMassaAltitudineVelocitaParacadute(container.querySelector(".parachute-block"));});
        pFs.appendChild(createLabeledInput("Max Deploy Altitude [m]", stage.parachute.maxDeployAltitude, "para-alt", 0, 2e5,true));
        pFs.appendChild(createLabeledInput("Max Deploy Speed [m/s]", stage.parachute.maxShipSpeed, "para-vmax", 0, 1e4,true));
        const fss4 = createSurfaceEditor(stage.parachute.surface, "para","Parachute","🔲 Parachute Deployer Surface");
        pFs.appendChild(fss4);
        fss4.querySelector(".para-height").addEventListener("input", () => { ricalcolaMassaAltitudineVelocitaParacadute(container.querySelector(".parachute-block"));});
        fss4.querySelector(".para-diameter").addEventListener("input", () => { ricalcolaMassaAltitudineVelocitaParacadute(container.querySelector(".parachute-block"));});
        fss4.querySelector(".para-spessore").addEventListener("input", () => { ricalcolaMassaAltitudineVelocitaParacadute(container.querySelector(".parachute-block"));});
        fss4.querySelector(".para-material").addEventListener("change", () => { ricalcolaMassaAltitudineVelocitaParacadute(container.querySelector(".parachute-block"));});
        fss4.querySelector(".para-kind").addEventListener("change", () => { ricalcolaMassaAltitudineVelocitaParacadute(container.querySelector(".parachute-block"));});
        fuelselect.addEventListener("change", () => AggiornaStruttureAssegnabiliCarburante(fss4));        
        AggiornaMaterialiAssegnabili(fss4);
        AggiornaStruttureAssegnabili(fss4);
        const btnRmP = document.createElement("button");
        btnRmP.textContent = "❌ Remove Paracadute";
        btnRmP.className = "rimuovi-paracadute";
        btnRmP.onclick = () => {
            stage.parachute = null;   
            salvaEditorCorrente();
            aggiornaEditor();};
        pFs.appendChild(btnRmP);
    } else {
        const btnAdP = document.createElement("button");
        btnAdP.textContent = "➕ Add Paracadute";
        btnAdP.onclick = () => {
            salvaEditorCorrente();
            stage.parachute = new Parachute();
            aggiornaEditor();};
        pFs.append(btnAdP);
        paraReload = false;
    }
    container.appendChild(pFs);
    if(paraReload) ricalcolaMassaAltitudineVelocitaParacadute(container.querySelector(".parachute-block"));
    return container;
}
function salvaEditorCorrente(saveOnShip = false) {
    function isValidMaterial(materiale,dati){
        const condizioni = estraiCondizioniDaMateriale(materiale);
        const condizioniFiltrate = condizioni.filter(c => c.component === dati.component &&(c.geometry === dati.geometry || c.geometry === "*"));
        if (condizioniFiltrate.length === 0) return false;
        const gruppi = {};
        for (const cond of condizioniFiltrate) {
            if (!gruppi[cond.geometry]) gruppi[cond.geometry] = [];
            gruppi[cond.geometry].push(cond);
        }
        for (const conds of Object.values(gruppi)) {
            const tutteValide = conds.every(({ condition }) => {
            if (!condition) return true;
            const match = condition.match(/^([\w_]+)\s*([=!<>]+)\s*(.+)$/);
            if (!match) return false;
            const [, varName, op, val] = match;
            let attuale, atteso;
            const parsedAttuale = parseFloat(dati[varName]);
            const parsedAtteso = parseFloat(val);
            if (isNaN(parsedAttuale) || isNaN(parsedAtteso)) {
                attuale = String(dati[varName]).trim();
                atteso = val.trim().replace(/^['"]|['"]$/g, '');
            } else {
                attuale = parsedAttuale;
                atteso = parsedAtteso;
            }
            switch (op) {
                case "<":  return attuale < atteso;
                case "<=": return attuale <= atteso;
                case ">":  return attuale > atteso;
                case ">=": return attuale >= atteso;
                case "=":  return attuale === atteso;
                case "!=":  return attuale !== atteso;
                default:   return false;
            }});
            if (tutteValide) return true
        }
        return false;
    }
    function isValidKind(geometry, dati) {
        const condizioni = estraiCondizioniDaStruttura(geometry);
        const condizioniFiltrate = condizioni.filter(c => c.component === dati.component &&(c.geometry === dati.geometry || c.geometry === "*"));
        if (condizioniFiltrate.length === 0) return false;
        const gruppi = {};
        for (const cond of condizioniFiltrate) {
            if (!gruppi[cond.geometry]) gruppi[cond.geometry] = [];
            gruppi[cond.geometry].push(cond);
        }
        for (const conds of Object.values(gruppi)) {
            const tutteValide = conds.every(({ condition }) => {
            if (!condition) return true;
            const match = condition.match(/^([\w_]+)\s*([=!<>]+)\s*(.+)$/);
            if (!match) return false;
            const [, varName, op, val] = match;
            let attuale, atteso;
            const parsedAttuale = parseFloat(dati[varName]);
            const parsedAtteso = parseFloat(val);
            if (isNaN(parsedAttuale) || isNaN(parsedAtteso)) {
                attuale = String(dati[varName]).trim();
                atteso = val.trim().replace(/^['"]|['"]$/g, '');
            } else {
                attuale = parsedAttuale;
                atteso = parsedAtteso;
            }
            switch (op) {
                case "<":  return attuale < atteso;
                case "<=": return attuale <= atteso;
                case ">":  return attuale > atteso;
                case ">=": return attuale >= atteso;
                case "=":  return attuale === atteso;
                case "!=":  return attuale !== atteso;
                default:   return false;
            }});
            if (tutteValide) return true
        }
        return false;
    }
    function isValidValue(value){
        return (!isNaN(value)&&isFinite(value)&&value!=null&&value>0&&value<1e10);
    }
    function isValidValueM0(value){
        return (!isNaN(value)&&isFinite(value)&&value!=null&&value<1e6);
    }
    let valid = false;
    const editor = document.querySelector(`.stage-editor[data-stage-index="${currentStageIndex}"]`);
    if (!editor) return alert("Error: Current stage not found");
    const stage = globalGameData?.Starship?.Stages[currentStageIndex];
    if (!stage) return alert("Error: Stage not found in memory");
    const getNumero = (selector, root = editor) => {
        const el = root.querySelector(selector);
        if (!el) return null;
        const val = parseFloat(el.value);
        return isNaN(val) ? null : val;};
    const massaBase = getNumero(".input-mass");
    const carburante = getNumero(".input-fuel");
    const carburanteTipo = editor.querySelector(".select-fuel-type")?.value;
    const superficie = editor.querySelector(".stage-surface-block");
    const altezza = getNumero(".stage-height");
    const tempmax = getNumero(".stage-tmax");
    const GLimit = getNumero(".stage-glimit");
    const Cd = getNumero(".stage-Cd");
    const diametro = getNumero(".stage-diameter");
    const kind = superficie?.querySelector(".stage-kind")?.value || "";
    const materiale = superficie?.querySelector(".stage-material")?.value || "";
    const spessore =  getNumero(".stage-spessore");
    let nEngine = null;
    let nParachute = null;
    let nHeatShield = null;
    const dati = {
        component: "Stage",
        geometry: kind,
        h: altezza,
        d: diametro,
        GLimit: GLimit,
        Tmax: tempmax,
        classeCarburante : fuelMap[carburanteTipo]?.class??"",
        spessorePercentuale : spessore,
        Cd: Cd,
        material: materiale,
        m: massaBase,
        massFuel: carburante,
        tipoCarburante: carburanteTipo
    };
    if(kind=="⚠ Unsuitable Structure!"||materiale=="⚠ Unsuitable Material!"||!isValidMaterial(materiale,dati)||!isValidKind(kind,dati)||!isValidValue(massaBase)||!isValidValue(altezza)||
    !isValidValue(tempmax)||!isValidValue(diametro)||!isValidValue(GLimit)||!isValidValue(Cd)||!isValidValue(spessore)||!isValidValueM0(carburante)){
        alert("Error: Some values of stage settings are invalid");
        return;
    }
    const engBlock = editor.querySelector(".engine-block");
    if (currentTempStage.Engine && engBlock) {
        const engSurf = engBlock.querySelector(".engine-surface-block");
        if (engSurf) {
            const sMass = getNumero(".engine-mass", engBlock);
            const sThrust = getNumero(".engine-thrust", engBlock);
            const sHeight = getNumero(".engine-height", engSurf);
            const sSpessore = getNumero(".engine-height", engSurf);
            const sDiameter = getNumero(".engine-diameter", engSurf);
            const sKind = engSurf.querySelector(".engine-kind")?.value;
            const sMaterial = engSurf.querySelector(".engine-material")?.value;
            const sTempMax = getNumero(".engine-tmax", engSurf);
            const sGLimit = getNumero(".engine-glimit", engSurf);
            const sCd = getNumero(".engine-Cd", engSurf);
            const sDati = {
                component: "Engine",
                geometry: sKind,
                h: sHeight,
                d: sDiameter,
                GLimit: sGLimit,
                Tmax: sTempMax,
                Cd: sCd,
                material: sMaterial,
                classeCarburante : fuelMap[carburanteTipo]?.class??"",
                spessorePercentuale : sSpessore,
                m: sMass,
                massFuel: carburante,
                tipoCarburante: carburanteTipo,
                N: sThrust,
            };
            if(sKind=="⚠ Unsuitable Structure!"||sMaterial=="⚠ Unsuitable Material!"||!isValidMaterial(sMaterial,sDati)||!isValidKind(sKind,sDati)||!isValidValue(sMass)||!isValidValue(sThrust)||
            !isValidValue(sHeight)||!isValidValue(sDiameter)||!isValidValue(sSpessore)||!isValidValue(sTempMax)||!isValidValue(sGLimit)||!isValidValue(sCd)
            ||!isValidValue(carburante)||carburanteTipo==""||carburanteTipo==null){
                alert("Error: Some values of engine settings are invalid");
                return;
            }else nEngine = new Engine(sMass,sThrust,0,true,0,carburanteTipo,new SurfaceData(sHeight,sDiameter,sKind,sCd,288.15,sTempMax,sMaterial,sGLimit,sSpessore));
        }else{
            alert("Error: Some values of engine settings are invalid");
            return;
        }
    }
    const hsBlock = editor.querySelector(".heat-shield-block");   
    if (currentTempStage.heatShield && hsBlock) {
        const hsSurf = hsBlock.querySelector(".shield-surface-block");
        if (hsSurf) {
            const sMass = getNumero(".shield-mass", hsBlock);
            const sHeight = getNumero(".shield-height", hsSurf);
            const sDiameter = getNumero(".shield-diameter", hsSurf);
            const sSpessore = getNumero(".shield-spessore", hsSurf);
            const sKind = hsSurf.querySelector(".shield-kind")?.value;
            const sMaterial = hsSurf.querySelector(".shield-material")?.value;
            const sTempMax = getNumero(".shield-tmax", hsSurf);
            const sGLimit = getNumero(".shield-glimit", hsSurf);
            const sCd = getNumero(".shield-Cd", hsSurf);
            const sDati = {
                component: "Heat Shield",
                geometry: sKind,
                h: sHeight,
                d: sDiameter,
                GLimit: sGLimit,
                spessorePercentuale : sSpessore,
                Tmax: sTempMax,
                classeCarburante : fuelMap[carburanteTipo]?.class??"",
                Cd: sCd,
                material: sMaterial,
                m: sMass,
            };
            if(sKind=="⚠ Unsuitable Structure!"||sMaterial=="⚠ Unsuitable Material!"||!isValidMaterial(sMaterial,sDati)||!isValidKind(sKind,sDati)||!isValidValue(sMass)||
            !isValidValue(sHeight)||!isValidValue(sDiameter)||!isValidValue(sSpessore)||!isValidValue(sTempMax)||!isValidValue(sGLimit)||!isValidValue(sCd)){
                alert("Error: Some values of heat shield settings are invalid");
                return;
            }else nHeatShield = new HeatShield(sMass,new SurfaceData(sHeight,sDiameter,sKind,sCd,288.15,sTempMax,sMaterial,sGLimit,sSpessore));
            
        }else{
            alert("Error: Some values of heat shield settings are invalid");
            return;
        }
    }
    const pBlock = editor.querySelector(".parachute-block"); 
    if (currentTempStage.parachute && pBlock) {
        const paraSurf = pBlock.querySelector(".para-surface-block");
        if (paraSurf) {
            const sMass = getNumero(".para-mass", pBlock);
            const sHeight = getNumero(".para-height", paraSurf);
            const sDiameter = getNumero(".para-diameter", paraSurf);
            const sKind = paraSurf.querySelector(".para-kind")?.value;
            const sSpessore = getNumero(".para-height", paraSurf);
            const sMaterial = paraSurf.querySelector(".para-material")?.value;
            const sTempMax = getNumero(".para-tmax", paraSurf);
            const sGLimit = getNumero(".para-glimit", paraSurf);
            const sCd = getNumero(".para-Cd", paraSurf);
            const sNumPara = getNumero(".para-num", pBlock);
            const sAreaPara = getNumero(".para-area", pBlock);
            const sMaxAltPara = getNumero(".para-alt", pBlock);
            const sMaxVelPara = getNumero(".para-vmax", pBlock);
            const sMaterialPara = pBlock.querySelector(".para-material").value;
            const sGeometryPara = pBlock.querySelector(".para-kind").value;
            const sDati = {
                component: "Parachute",
                geometry: sKind,
                h: sHeight,
                d: sDiameter,
                GLimit: sGLimit,
                Tmax: sTempMax,
                Cd: sCd,
                material: sMaterial,
                m: sMass,
                classeCarburante : fuelMap[carburanteTipo]?.class??"",
                spessorePercentuale : sSpessore,
                numParachutes: sNumPara,
                areaParachute: sAreaPara,
                materialeParachute: sMaterialPara,
                geometryParachute: sGeometryPara,
                maxParSpeed: sMaxVelPara,
                maxParHeigh: sMaxAltPara,
            };
            if(sKind=="⚠ Unsuitable Structure!"||sMaterial=="⚠ Unsuitable Material!"||!isValidMaterial(sMaterial,sDati)||!isValidKind(sKind,sDati)||!isValidValue(sMass)||
            !isValidValue(sHeight)||!isValidValue(sDiameter)||!isValidValue(sTempMax)||!isValidValue(sGLimit)||!isValidValue(sCd)
            ||!isValidValue(sAreaPara)||!isValidValue(sNumPara)||!isValidValue(sSpessore)||!isValidValue(sMaxAltPara)||!isValidValue(sMaxVelPara)
            ||sMaterialPara==""||sGeometryPara==null||sMaterialPara==null||sGeometryPara==""){
                alert("Error: Some values of heat shield settings are invalid");
                return;
            }else nParachute = new Parachute(sMass,sNumPara,sAreaPara,sMaxAltPara,sMaxVelPara,sMaterialPara,sGeometryPara,0,false,new SurfaceData(sHeight,sDiameter,sKind,sCd,288.15,sTempMax,sMaterial,sGLimit,sSpessore));   
        }else{
            alert("Error: Some values of parachute settings are invalid");
            return;
        }
    } 
    const cstage = currentTempStage;
    cstage.Engine = nEngine;
    cstage.parachute = nParachute;
    cstage.heatShield = nHeatShield;
    const nSurfaceData = new SurfaceData(altezza,diametro,kind,Cd,288.15,tempmax,materiale,GLimit,spessore);
    cstage.surface = nSurfaceData;
    cstage.mass = massaBase;
    cstage.tipoCarburante = carburanteTipo;
    cstage.quantitaCarburante = Number.isFinite(carburante) ? carburante : 0;
    if(cstage.quantitaCarburante>0&&cstage.tipoCarburante!=""&&cstage.tipoCarburante!=null){
        cstage.mass+=(cstage.quantitaCarburante * (fuelMap[cstage.tipoCarburante]?.density??0));
    }
    if(cstage.Engine) cstage.mass+=nEngine.mass;
    if(cstage.parachute) cstage.mass+=nParachute.mass;
    if(cstage.heatShield) cstage.mass+=nHeatShield.mass;
    if (globalGameData.Starship&&saveOnShip) {
        let isShipOnAStarbase = false;
        for (const planet of globalGameData.Star.planets){
            if(planet.name === globalGameData.Starship.relatedObject&&planet.spacebase) isShipOnAStarbase = true;
            else if(planet.moons){
                for (const moon of planet.moons){
                    if(moon.name === globalGameData.Starship.relatedObject&&moon.spacebase) isShipOnAStarbase = true;
                }
            }
        }
        if(globalGameData.Starship.ferma&&(globalGameData.Starship.TypeRelObj=="planet"||globalGameData.Starship.TypeRelObj=="moon")&&isShipOnAStarbase){
            globalGameData.Starship.mass = 0;
            globalGameData.Starship.Stages[currentStageIndex] = cstage;
            for (const stg of Object.values(globalGameData.Starship.Stages)) {
                globalGameData.Starship.mass += stg.mass || 0;        
            }
            return true;
        }
    }
    return false;
}