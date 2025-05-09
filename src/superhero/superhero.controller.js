import axios from "axios";
import https from "https";
import { superheroes } from "../helpers/list-hero.js";

export const superHero = async (req, res) => {
    const path = process.env.API_URL;
    const key = process.env.API_KEY;

    try {
        const { uid } = req.params;

        const url = `${path}/${key}/${uid}`;

        const agent = new https.Agent({
            rejectUnauthorized: false 
        });

        const response = await axios.get(url, {
            httpsAgent: agent  
        });

        const dataSuper = response.data

        if (response.data && response.data.response === 'success') {
            return res.status(200).json({
                superHero: {
                    id: dataSuper.id,
                    name: dataSuper.name,
                    Powerstats:{
                        powerstats: dataSuper.powerstats
                    },
                    Biography:{
                        ['full-name']: dataSuper.biography['full-name'],
                        ['place-of-birth']: dataSuper.biography['place-of-birth'],
                        publisher: dataSuper.biography.publisher
                    },
                    Appearance: {
                        gender: dataSuper.appearance.gender,
                        race: dataSuper.appearance.race,
                        height: [
                            dataSuper.appearance.height
                        ],
                        weight: [
                            dataSuper.appearance.weight
                        ]
                    },
                    Work: {
                        occupation: dataSuper.work.occupation
                    },
                    Image:{
                        image: dataSuper.image.url
                    }

                }
            });
        } else {
            return res.status(400).json({
                msg: 'Error al encontrar el superhéroe',
                details: response.data,  
            });
        }
    } catch (e) {
        console.error(e);  

        return res.status(500).json({
            msg: 'Se produjo un error al buscar el superhéroe',
            error: e.message || 'Error desconocido',
        });
    }
};


export const getSuperhero = async (req, res) =>{
    try{
        const heros = superheroes; // Lista de superhéroes

        // Devuelve los héroes en la respuesta
        res.status(200).json({
            success: true,
            message: "Heroes that exist",
            superHero: heros
        });


    }catch(e){
        return res.status(500).json({
            msg: 'Se produjo un error al buscar el superhéroe',
        })
    }
}