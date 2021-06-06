const aplicacion = document.querySelector('.pj');
const imge = document.querySelector('#image');
const status = document.querySelector('#status')
const species = document.querySelector('#species')
const btnS = document.querySelector('#next')
const btnA = document.querySelector('#prev')
const url = 'https://rickandmortyapi.com/api/character/'
const origen = document.querySelector('#origen')

const obtenerDatos = (apiURL) => {
    return fetch(apiURL) //hago peticion que devuelve una promesa
    .then(res => res.json()) //la promesa la resuelvo con then y nos da usa respuesta,esa respuesta la parseo a json
    .then(data => { //una vez que se resuelve la promesa anterior capturamos los datos
        imprimirDatos(data)
        imprimirPagina(data.info)
    })
    .catch(err => console.log(err))
}
const imprimirDatos = (datos,e) => {
    let html = '';
    aplicacion.innerHTML = html;
    datos.results.forEach(pjs => { //despues de iterar pjs es un objeto con todas las propiedades
        let p = document.createElement('p');
        let nombres = pjs.name
        p.setAttribute('id', pjs.id);
        p.innerHTML = pjs.name;
        aplicacion.appendChild(p);
        p.addEventListener('click', () => {
            imge.innerHTML = `<img src="https://rickandmortyapi.com/api/character/avatar/${pjs.id}.jpeg" />`
            status.innerHTML = `El personaje se encuentra: ${pjs.status}`
            species.innerHTML = `Es de la especie tipo: ${pjs.species}`
            origen.innerHTML = `Su origen es: ${pjs.origin.name}`
        })
    });
};

const imprimirPagina = (data) => {
    console.log('aoe')
    let sePuedeP = data.prev == null ? 'disabled' : '';
    let sePuedeN = data.next == null ? 'disabled' : '';
    let html = `<button id="btn" ${sePuedeP} onclick="obtenerDatos('${data.prev}')">Previous</button>`
    html += `<button id="btn" ${sePuedeN} onclick="obtenerDatos('${data.next}')">Next</button>`
    document.querySelector('.botones').innerHTML = html;
}

obtenerDatos(url)

