import axios from "axios"
import { useEffect, useState } from "react"
import BasicSelect from "../Components/BasicSelect"
import BasicTextFields from "../Components/TextField"
import CustomizedTable from "../Components/CustomizedTable"
import loadingImage from "../Images/Misc/loading.gif"

export default function Table() {
    const [pokemon, setPokemon] = useState([])
    const [display, setDisplay] = useState([])
    const url = "https://pokeapi.co/api/v2/pokemon?limit=1008"
    const [sortedBy, setSortedBy] = useState("idInc")
    const [region, setRegion] = useState("All")
    const [type1, setType1] = useState("All")
    const [type2, setType2] = useState("All")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        async function getInfo(name, url) {
            const response = await axios.get(url)
            const data = response.data

            let pokemon = {
                id: null,
                image: null,
                name: null,
                types: [],
                abilities: [],
                stats: {
                    hp: null,
                    attack: null,
                    defense: null,
                    "special-attack": null,
                    "special-defense": null,
                    speed: null,
                    BST: 0,
                },
                //url: null,
            }
            pokemon.id = data.id
            pokemon.image = data.sprites.other.home.front_default
            /*
            pokemon.image =
                data.sprites.versions["generation-v"][
                    "black-white"
                ].animated.front_default
            */
            pokemon.name = capitalize(name)
            const numTypes = data.types.length
            pokemon.types.push(capitalize(data.types[0].type.name))
            if (numTypes === 2) {
                pokemon.types.push(capitalize(data.types[1].type.name))
            }
            data.abilities.forEach((ability) => {
                pokemon.abilities.push(capitalize(ability.ability.name))
            })
            data.stats.forEach((stat) => {
                pokemon.stats[stat.stat.name] = stat.base_stat
                pokemon.stats.BST += stat.base_stat
            })

            // pokemon.url = url
            return pokemon
        }

        async function updatePage() {
            let res = await axios.get(url)
            const pokemons = await Promise.all(
                res.data.results.map(async (p) => {
                    return await getInfo(p.name, p.url)
                })
            )
            setPokemon(pokemons)
            setDisplay(pokemons)
            setLoading(false)
        }

        updatePage()
    }, [])

    useEffect(() => {
        const first = regions[region][0]
        const last = regions[region][1]
        let newPokemon = [...pokemon].filter((p) => {
            return p.id >= first && p.id <= last
        })
        if (type1 !== "All") {
            newPokemon = newPokemon.filter((p) => {
                for (const t of p.types) {
                    if (t === type1) {
                        return true
                    }
                }
                return false
            })
        }
        if (type2 !== "All") {
            newPokemon = newPokemon.filter((p) => {
                for (const t of p.types) {
                    if (t === type2) {
                        return true
                    }
                }
                return false
            })
        }
        setDisplay(newPokemon)
    }, [region, type1, type2])

    function changeRegion(region) {
        setRegion(region)
    }

    function changeType1(type) {
        setType1(type)
    }

    function changeType2(type) {
        setType2(type)
    }

    function capitalize(string) {
        return string[0].toUpperCase() + string.slice(1)
    }

    function sortByID() {
        let sortedByID = [...display]
        if (sortedBy !== "idInc") {
            setSortedBy("idInc")
            sortedByID.sort((a, b) => {
                return a.id > b.id ? 1 : -1
            })
        } else {
            setSortedBy("idDec")
            sortedByID.sort((a, b) => {
                return a.id < b.id ? 1 : -1
            })
        }
        setDisplay(sortedByID)
    }

    function sortByName() {
        let sortedByName = [...display]
        if (sortedBy !== "nameInc") {
            setSortedBy("nameInc")
            sortedByName.sort((a, b) => {
                return a.name > b.name ? 1 : -1
            })
        } else {
            setSortedBy("nameDec")
            sortedByName.sort((a, b) => {
                return a.name < b.name ? 1 : -1
            })
        }
        setDisplay(sortedByName)
    }

    function sortByHP() {
        let sortedByHP = [...display]
        if (sortedBy !== "HPInc") {
            setSortedBy("HPInc")
            sortedByHP.sort((a, b) => {
                return a.stats.hp > b.stats.hp ? 1 : -1
            })
        } else {
            setSortedBy("HPDec")
            sortedByHP.sort((a, b) => {
                return a.stats.hp < b.stats.hp ? 1 : -1
            })
        }
        setDisplay(sortedByHP)
    }

    function sortByAtk() {
        let sortedByAtk = [...display]
        if (sortedBy !== "AtkInc") {
            setSortedBy("AtkInc")
            sortedByAtk.sort((a, b) => {
                return a.stats.attack > b.stats.attack ? 1 : -1
            })
        } else {
            setSortedBy("AtkDec")
            sortedByAtk.sort((a, b) => {
                return a.stats.attack < b.stats.attack ? 1 : -1
            })
        }
        setDisplay(sortedByAtk)
    }

    function sortByDef() {
        let sortedByDef = [...display]
        if (sortedBy !== "DefInc") {
            setSortedBy("DefInc")
            sortedByDef.sort((a, b) => {
                return a.stats.defense > b.stats.defense ? 1 : -1
            })
        } else {
            setSortedBy("DefDec")
            sortedByDef.sort((a, b) => {
                return a.stats.defense < b.stats.defense ? 1 : -1
            })
        }
        setDisplay(sortedByDef)
    }

    function sortBySAtk() {
        let sortedBySAtk = [...display]
        if (sortedBy !== "SAtkInc") {
            setSortedBy("SAtkInc")
            sortedBySAtk.sort((a, b) => {
                return a.stats["special-attack"] > b.stats["special-attack"]
                    ? 1
                    : -1
            })
        } else {
            setSortedBy("SAtkDec")
            sortedBySAtk.sort((a, b) => {
                return a.stats["special-attack"] < b.stats["special-attack"]
                    ? 1
                    : -1
            })
        }
        setDisplay(sortedBySAtk)
    }

    function sortBySDef() {
        let sortedBySDef = [...display]
        if (sortedBy !== "SDefInc") {
            setSortedBy("SDefInc")
            sortedBySDef.sort((a, b) => {
                return a.stats["special-defense"] > b.stats["special-defense"]
                    ? 1
                    : -1
            })
        } else {
            setSortedBy("SDefDec")
            sortedBySDef.sort((a, b) => {
                return a.stats["special-defense"] < b.stats["special-defense"]
                    ? 1
                    : -1
            })
        }
        setDisplay(sortedBySDef)
    }

    function sortBySpeed() {
        let sortedBySpeed = [...display]
        if (sortedBy !== "SpeedInc") {
            setSortedBy("SpeedInc")
            sortedBySpeed.sort((a, b) => {
                return a.stats.speed > b.stats.speed ? 1 : -1
            })
        } else {
            setSortedBy("SpeedDec")
            sortedBySpeed.sort((a, b) => {
                return a.stats.speed < b.stats.speed ? 1 : -1
            })
        }
        setDisplay(sortedBySpeed)
    }

    function sortByBST() {
        let sortedByBST = [...display]
        if (sortedBy !== "BSTInc") {
            setSortedBy("BSTInc")
            sortedByBST.sort((a, b) => {
                return a.stats.BST > b.stats.BST ? 1 : -1
            })
        } else {
            setSortedBy("BSTDec")
            sortedByBST.sort((a, b) => {
                return a.stats.BST < b.stats.BST ? 1 : -1
            })
        }
        setDisplay(sortedByBST)
    }

    function choosePokemon(poke) {
        if (!poke) {
            setDisplay([])
            return
        }
        poke = poke.toLowerCase()
        poke = capitalize(poke)
        const newDisplay = pokemon.filter((p) => {
            return p.name.startsWith(poke)
        })
        setDisplay(newDisplay)
    }

    function chooseAbility(ability) {
        if (!ability) {
            setDisplay([])
            return
        }
        ability = ability.toLowerCase()
        ability = capitalize(ability)
        const newDisplay = pokemon.filter((p) => {
            for (const abil of p.abilities) {
                if (abil.startsWith(ability)) {
                    return true
                }
            }
            return false
        })
        setDisplay(newDisplay)
    }

    const headers = [
        { name: "#", sort: sortByID },
        { name: "", sort: null },
        { name: "Name", sort: sortByName },
        { name: "Types", sort: null },
        { name: "Abilities", sort: null },
        { name: "HP", sort: sortByHP },
        { name: "Atk", sort: sortByAtk },
        { name: "Def", sort: sortByDef },
        { name: "S.Atk", sort: sortBySAtk },
        { name: "S.Def", sort: sortBySDef },
        { name: "Speed", sort: sortBySpeed },
        { name: "BST", sort: sortByBST },
        // { name: "URL", sort: null },
    ]

    const regions = {
        All: [1, 905],
        Kanto: [1, 151],
        Johto: [152, 251],
        Hoenn: [252, 386],
        Sinnoh: [387, 493],
        Unova: [494, 649],
        Kalos: [650, 721],
        Alola: [722, 809],
        "Galar/Hisui": [810, 905],
    }

    const regionList = [
        "All",
        "Kanto",
        "Johto",
        "Hoenn",
        "Sinnoh",
        "Unova",
        "Kalos",
        "Alola",
        "Galar/Hisui",
    ]

    const typeList = [
        "All",
        "Normal",
        "Fire",
        "Water",
        "Grass",
        "Electric",
        "Ice",
        "Fighting",
        "Poison",
        "Ground",
        "Flying",
        "Psychic",
        "Bug",
        "Rock",
        "Ghost",
        "Dark",
        "Dragon",
        "Steel",
        "Fairy",
    ]

    return (
        <div>
            {loading ? (
                <div
                    style={{
                        position: "relative",
                        width: "100vw",
                        height: "100vh",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={loadingImage}
                        alt="loading"
                        width="100%"
                        height="100%"
                    ></img>
                </div>
            ) : (
                <div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <BasicTextFields
                            text="Enter Pokemon"
                            onSubmit={choosePokemon}
                            options={pokemon
                                .map((p) => p.name)
                                .sort((a, b) => {
                                    return a > b ? 1 : -1
                                })}
                        ></BasicTextFields>
                        <BasicTextFields
                            text="Enter Ability"
                            onSubmit={chooseAbility}
                            options={[
                                ...new Set(
                                    pokemon.flatMap((p) => [...p.abilities])
                                ),
                            ].sort((a, b) => {
                                return a > b ? 1 : -1
                            })}
                        ></BasicTextFields>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <BasicSelect
                            label="Region"
                            change={changeRegion}
                            list={regionList}
                        ></BasicSelect>
                        <BasicSelect
                            label="Type 1"
                            change={changeType1}
                            list={typeList}
                        ></BasicSelect>
                        <BasicSelect
                            label="Type 2"
                            change={changeType2}
                            list={typeList}
                        ></BasicSelect>
                    </div>
                    <CustomizedTable
                        headers={headers}
                        pokemon={display}
                    ></CustomizedTable>
                </div>
            )}
        </div>
    )
}
