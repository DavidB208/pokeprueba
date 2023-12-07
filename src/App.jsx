//Components
import {Button} from "./components/Button";
import {Card} from "./components/Card";

//Styles
import './sass/App.scss';

//Icons
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";

//Hooks
import { useState, useEffect } from "react";


const App = () =>{

    const [pokeId, setPokeId] = useState(1)
    const [pokeEvos, setPokeEvos] = useState([])

    useEffect(()=>{
        getEvolutions(pokeId)
    }, [pokeId])

    async function getEvolutions (id) {
        const response = await fetch (`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
        const data = await response.json()

        let pokeEvoArr = []

        let pokeL1 = data.chain.species.name
        let pokeL1Img = await getPokeImg(pokeL1)
        pokeEvoArr.push([pokeL1, pokeL1Img])

        if(data.chain.evolves_to.length !== 0){
            let pokeL2 = data.chain.evolves_to[0].species.name
            let pokeL2Img = await getPokeImg(pokeL2)
            pokeEvoArr.push([pokeL2, pokeL2Img])

            if(data.chain.evolves_to[0].evolves_to.length !== 0){
                let pokeL3 = data.chain.evolves_to[0].evolves_to[0].species.name
                let pokeL3Img = await getPokeImg(pokeL3)
                pokeEvoArr.push([pokeL3, pokeL3Img])
            }
        }
        setPokeEvos(pokeEvoArr)
    }

    async function getPokeImg(name){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        const data = await response.json()
        return data.sprites.other['official-artwork'].front_default
    }

    function preClick(){
        (pokeId === 1)?
        setPokeId(1):
        setPokeId(pokeId - 1)
    }

    function nextClick(){
        setPokeId(pokeId + 1)
    }

    return(
        <div className="app">
            <div className={`card-container card${pokeEvos.length}`}>
                {pokeEvos.map(pokemon =>
                    <Card
                        key = {pokemon[0]}
                        name = {pokemon[0]}
                        img = {pokemon[1]}
                    />
                )}
            </div>
            <div className = "buttons-container">
                <Button
                    icon={<TiArrowLeftOutline />}
                    handleClick={preClick}
                />

                <Button
                    icon={<TiArrowRightOutline />}
                    handleClick={nextClick}
                />
            </div>
            
        </div>
    )
}

export {App}