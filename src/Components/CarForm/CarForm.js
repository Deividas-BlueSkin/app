import { useState } from "react";

export default function CarForm() {

    const Cars =[]
    const [cars, setCars] = useState(Cars)
    
    const [brand,setBrand] = useState('Hog')
    const [model,setModel] = useState('R27')
    const [engine,setEngine] = useState('diesel')
    const [baseCost,setBaseCost] = useState(2000)
    const [km,setKm] = useState(3000)
    
    const colors = ['juoda', 'raudona', 'mėlyna', 'sidabrinė', 'balta', 'special blue', 'other']
    const [color,setColor] = useState(colors[0])
    const [customColor,setCustomColor] = useState('')

    let dataCollector = {}

    const onSubmit = (event)=>{
        event.preventDefault()

        dataCollector = {
            brand,
            model,
            engine,
            baseCost,
            km,
            color,
            customColor,
        }
        setCars(prevState => [dataCollector, ...prevState])

    }

    //     2.1. Jei variklis 'electric' prie bazinės kainos pridėti 10000€. 
    //     2.2. Jei variklis 'hybrid' prie bazinės kainos pridėti 7500€.
    //     2.3. Jei variklis 'diesel' prie bazinės kainos pridėti 5000€.
    //     2.4. Jei variklis 'petrol' prie bazinės kainos prideti nereikia nieko.

    const engines = {
        electric: 10000,
        hybrid: 7500,
        diesel: 5000,
        petrol: 0,
    }

    // 3.1. Jeigu rida daugiau nei 0, tai kaina sumažėja 10%.
    //     3.2. Jeigu rida daugiau nei 20000, tai kaina sumažėja 15%.
    //     3.3. Jeigu rida daugiau nei 50000, tai kaina sumažėja 20%.
    //     3.4. Jeigu rida daugiau nei 100000, tai kaina sumažėja 30%.
    //     3.5. Jeigu rida daugiau nei 400000, tai kaina sumažėja 50%.

    const discounts = [
        {
            distance: 0,
            percent:10,
        },
        {
            distance: 20000,
            percent:15,
        },
        {
            distance: 50000,
            percent:20,
        },
        {
            distance: 100000,
            percent:30,
        },
        {
            distance: 400000,
            percent:50,
        },    
    ]

    const CarListEl = cars.map((obj, i)=>{
        
        let engineCost = Object.entries(engines).filter((entry)=>{
            // let key = entry[0]
            // if(key === obj.engine) return entry
            return entry[0] === obj.engine
        })[0][1]
        
        let discount = discounts.filter((entry)=>{
            // if( obj.km > entry.distance) return entry
            return obj.km > entry.distance
        }).pop().percent
        
        const finalColor = obj.customColor==="" ? obj.color : obj.customColor

        //     4.1. Automobilio spalva pagal nutylėjimą yra juoda.
        //     4.2. Jeigu nurodyta spalva yra 'special blue', tai automobilio kaina turi padidėti 500€.
        //     4.3. Jeigu nurodytos spalvos nėra tarp bazinių spalvų, tai automobilio kaina turėtų padidėti 3000€.
        let colorCost = 0 
        if(obj.color === "special blue") colorCost = 500
        if(obj.color === "other") colorCost = 3000

        const costNum = Math.round((Number(obj.baseCost)+Number(engineCost+Number(colorCost)))/(1-Number(discount)/100))

        return (
            <div key={i}>
                <p>{`Car brand: ${obj.brand}, model: ${obj.model}, engine: ${obj.engine}, base cost: ${obj.baseCost}, 
                final cost: ${costNum}, driven distance: ${obj.km}, color: ${finalColor}`}</p>
            </div>
        )
    })
    

    return (
        <div>
            <form id="car_form" onSubmit={onSubmit}>
                <div key={0}>
                    <label htmlFor="brand">Brand:</label>
                    <input 
                    id="brand" 
                    type="text" 
                    name="brand" 
                    value={brand}
                    onChange={event => setBrand(event.target.value)}
                    />
                </div>

                {brand!=='' &&(
                <div key={1}>
                    <label htmlFor="model">Model:</label>
                    <input 
                    id="model" 
                    type="text" 
                    name="model" 
                    value={model}
                    onChange={event=>setModel(event.target.value)}
                    />
                </div>
                )}

                <div key={2}>
                    <label htmlFor="engine">Engine:</label>
                    <input 
                    id="engine" 
                    type="text" 
                    name="engine" 
                    value={engine}
                    onChange={event=>setEngine(event.target.value)}
                    />
                </div>

                <div key={3}>
                    <label htmlFor="baseCost">BaseCost:</label>
                    <input 
                    id="baseCost" 
                    type="number" 
                    name="baseCost" 
                    value={baseCost}
                    onChange={event=>setBaseCost(event.target.value)}
                    />
                </div>

                <div key={4}>
                    <label htmlFor="km">Km:</label>
                    <input 
                    id="km" 
                    type="number" 
                    name="km" 
                    value={km}
                    onChange={event=>setKm(event.target.value)}
                    />
                </div>

                <div key={5}>
                    
                    <label htmlFor="color">Color:</label>
                    <select id="color" name="color" value={color} onChange={event=>setColor(event.target.value)}>

                        {colors.map((item,i)=>( 
                            <option key={i} value={item}> {item} </option>    
                        ))}
                    </select>
                    
                    {color==="other"  && (
                        <>
                            <label htmlFor="customColor"></label>
                            <input 
                            id="customColor" 
                            type="text" 
                            name="customColor" 
                            value={customColor}
                            onChange={event=>setCustomColor(event.target.value)}
                            />
                        </>
                    )}
                </div>

                <input type="submit"/>
            </form>
            {CarListEl}
        </div>
    )
}

// 1.1. Sukurti formą, kurioje galima įrašyti automobilio:
//     1.1. Brand'ą
//     1.2. Modelį
//     1.3. Variklio tipą (electric, diesel, petrol, hybrid)
//     1.4. Bazinę kainą
//     1.5. Kilometražą
//     1.6. Spalvą (juoda, raudona, mėlyna, sidabrinė, balta, 'special blue', 'other')
//         1.6.1. Jeigu pasirenkama spalva yra 'other', tai sukurti papildomą text tipo input elementą, kuriame reikia įrašyti spalvą.
//     1.7. Nuorodą į automobilio nuotrauką
// 1.2. Formos submit metu, informaciją surinkti ir atvaizduoti automobilio HTML elementą ekrane.

// 2. Automobilio HTML elemente, papildomai pridėti kainą už papildomas paslaugas ir galutinę kainą pagal šiuos kriterijus:
//     2.1. Jei variklis 'electric' prie bazinės kainos pridėti 10000€. 
//     2.2. Jei variklis 'hybrid' prie bazinės kainos pridėti 7500€.
//     2.3. Jei variklis 'diesel' prie bazinės kainos pridėti 5000€.
//     2.4. Jei variklis 'petrol' prie bazinės kainos prideti nereikia nieko.

// 3. Pridėti nuolaidą kainai už automobilio kilometražą:
//     3.1. Jeigu rida daugiau nei 0, tai kaina sumažėja 10%.
//     3.2. Jeigu rida daugiau nei 20000, tai kaina sumažėja 15%.
//     3.3. Jeigu rida daugiau nei 50000, tai kaina sumažėja 20%.
//     3.4. Jeigu rida daugiau nei 100000, tai kaina sumažėja 30%.
//     3.5. Jeigu rida daugiau nei 400000, tai kaina sumažėja 50%.

// 4. Pridėti papildomą kainą už pasirinktą spalvą:
//     4.1. Automobilio spalva pagal nutylėjimą yra juoda.
//     4.2. Jeigu nurodyta spalva yra 'special blue', tai automobilio kaina turi padidėti 500€.
//     4.3. Jeigu nurodytos spalvos nėra tarp bazinių spalvų, tai automobilio kaina turėtų padidėti 3000€.
       
// 5. Formoje pridėti laukelį nuolaidai įvesti. Jis nėra privalomas, tačiau jeigu nuolaida yra įvesta, galutinėje automobilio kainoje ji turi būti įvardinta.

// ATVAIZDAVIMAS:

// Automobilio kaina:
// 1. Bazinė kaina.

// 2. Papildomos paslaugos:
// 2.1. Variklio tipas.
// 2.2. Spalva.
// 2.3. Viso už papildomas paslaugas (variklio tipo kaina + spalvos kaina)

// 3. Kainos sumažėjimas:
// 3.1. Dėl kilometražo.
// 3.2. Nuolaida.
// 3.3. Viso kainos sumažėjimas (kilometražo nuolaida + nuolaida)

// 4. Galutinė kaina (Bazinė kaina + papildomos paslaugos - nuolaidos)

// 5. PVM.

// 6. Galutinė kaina su PVM.