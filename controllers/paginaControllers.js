import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => { //req - lo que enviamos:  res - lo que express nos responde
    
    // consultar 3 viajes del modelo viaje

    const promiseDB = [];
    promiseDB.push( Viaje.findAll({limit: 3}) );
    promiseDB.push( Testimonial.findAll({limit: 3}) );

    try{
        // const viajes = await Viaje.findAll({limit: 3});
        // const testimoniales = await Testimonial.findAll({limit: 3});
        // al tener dos await hay que esperar a que termine uno para que se ejecute el siguiente
        // para resolver ese problema se puede utilizar un promise para ejecutar los dos await al mismo tiempo

        const resultado = await Promise.all(promiseDB);

        // res.render('inicio', {
        //     pagina: 'Inicio',
        //     clase: 'home',
        //     viajes
        // });

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });


    }catch(error){
        console.log(error)
    }

}

const paginaNosotros = (req, res) => { //req - lo que enviamos:  res - lo que express nos responde
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => { //req - lo que enviamos:  res - lo que express nos responde
    
    //consultar base de datos
    const viajes = await Viaje.findAll();
    console.log(viajes);
    
    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes,
    });
}

const paginaTestimoniales = async (req, res) => { //req - lo que enviamos:  res - lo que express nos responde
    
    try{
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    }catch(error){
        console.log(error);
    }
    
    
}


// muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    
    const {slug} = req.params;

    try{

        const viaje = await Viaje.findOne({where : {slug}});

        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })

    }catch(error){
        console.log(error);
    }
}


export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}